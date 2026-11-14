import { PronunciationChallengeWord } from '../data/pronunciationChallengeData';

export interface AcousticCaptureMetrics {
  durationMs: number;
  peakRms: number;
  avgRms: number;
  detectedSyllables: number;
  activeSpeechRatio: number; // 0..1 fraction of frames above noise gate
}

export interface PhonemeDiagnostic {
  consonant: string;
  status: 'matched' | 'close' | 'missed';
}

export interface PronunciationEvaluationResult {
  overallScore: number; // 0 - 100
  phonemeScore: number; // 0 - 100
  syllableScore: number; // 0 - 100
  clarityScore: number; // 0 - 100
  verdictTitleAr: string;
  verdictLevel: 'royal' | 'proficient' | 'developing' | 'retry';
  transcriptNormalized: string;
  rawTranscript: string;
  analysisMode: 'speech_and_acoustics' | 'acoustics_only';
  phonemeDiagnostics: PhonemeDiagnostic[];
  feedbackHeadlineAr: string;
  feedbackDetailsAr: string[];
  coachTipAr: string;
}

/**
 * Normalizes Arabic text for phonetic comparison by stripping diacritics,
 * unifying hamza/alef forms, and removing whitespace/punctuation.
 */
export function normalizeArabicPhonetics(input: string): string {
  return input
    .trim()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // Strip harakat & tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/پ/g, 'ب')
    .replace(/[^\u0621-\u064A0-9\s-]/g, '')
    .replace(/[-\s]+/g, '');
}

/**
 * Collapses Arabic letters into broad articulatory phoneme classes so minor
 * Web Speech Recognition transcription drift (e.g. ت vs ط, س vs ص, ح vs هـ)
 * receives partial phonetic credit instead of harsh zero penalties.
 */
function toPhoneticClass(ch: string): string {
  const map: Record<string, string> = {
    'ا': 'A',
    'و': 'U',
    'ي': 'I',
    'ع': 'A_PHAR',
    'ح': 'H_PHAR',
    'ه': 'H_PHAR',
    'خ': 'KH',
    'غ': 'KH',
    'ق': 'K',
    'ك': 'K',
    'ت': 'T',
    'ط': 'T',
    'د': 'D',
    'ض': 'D',
    'س': 'S',
    'ص': 'S',
    'ث': 'S',
    'ج': 'J',
    'ش': 'SH',
    'ب': 'B',
    'ف': 'F',
    'م': 'M',
    'ن': 'N',
    'ر': 'R',
    'ل': 'L',
    'ز': 'Z'
  };
  return map[ch] || ch;
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function computeStringSimilarity(a: string, b: string): number {
  if (!a && !b) return 100;
  if (!a || !b) return 0;
  const maxLen = Math.max(a.length, b.length);
  const dist = levenshteinDistance(a, b);
  return Math.max(0, Math.round(((maxLen - dist) / maxLen) * 100));
}

/**
 * Evaluates user's spoken pronunciation combining Web Speech transcript matching
 * and Web Audio API acoustic telemetry (syllable bursts, vocal energy, duration).
 */
export function evaluatePronunciation(params: {
  target: PronunciationChallengeWord;
  rawTranscript: string;
  speechConfidence?: number;
  acousticMetrics: AcousticCaptureMetrics;
}): PronunciationEvaluationResult {
  const { target, rawTranscript, speechConfidence = 0.85, acousticMetrics } = params;
  const normalizedInput = normalizeArabicPhonetics(rawTranscript);
  const hasTranscript = normalizedInput.length > 0;

  // 1. Clarity Score from real acoustic RMS & speech activity
  let clarityScore = 0;
  if (acousticMetrics.durationMs < 200 || acousticMetrics.peakRms < 0.015) {
    clarityScore = 20;
  } else {
    const energyComponent = Math.min(1, acousticMetrics.peakRms / 0.14) * 55;
    const sustainComponent = Math.min(1, acousticMetrics.activeSpeechRatio / 0.35) * 45;
    clarityScore = Math.max(25, Math.min(100, Math.round(energyComponent + sustainComponent)));
  }

  // 2. Syllable Rhythm Score comparing detected acoustic peaks vs expected syllables
  const targetSyl = Math.max(1, target.expectedSyllables);
  const detectedSyl = Math.max(acousticMetrics.peakRms >= 0.02 ? 1 : 0, acousticMetrics.detectedSyllables);
  const sylDiff = Math.abs(targetSyl - detectedSyl);
  let syllableScore = 100;
  if (detectedSyl === 0) {
    syllableScore = 20;
  } else if (sylDiff === 0) {
    syllableScore = 100;
  } else if (sylDiff === 1) {
    syllableScore = targetSyl === 1 ? 78 : 82;
  } else {
    syllableScore = Math.max(35, 100 - sylDiff * 24);
  }

  // 3. Phoneme & Variant Similarity Score
  let phonemeScore = 0;
  const phonemeDiagnostics: PhonemeDiagnostic[] = [];

  if (hasTranscript) {
    const normalizedTargets = [
      normalizeArabicPhonetics(target.reconstructedAr),
      ...target.acceptedVariantsAr.map(normalizeArabicPhonetics)
    ];

    // Direct & phonetic-class best similarity across accepted variants
    let bestSim = 0;
    const inputClasses = [...normalizedInput].map(toPhoneticClass).join('|');

    for (const candidate of normalizedTargets) {
      const exactSim = computeStringSimilarity(normalizedInput, candidate);
      const candidateClasses = [...candidate].map(toPhoneticClass).join('|');
      const classSim = computeStringSimilarity(inputClasses, candidateClasses);
      const combined = Math.round(exactSim * 0.65 + classSim * 0.35);
      if (combined > bestSim) bestSim = combined;
      if (normalizedInput === candidate) {
        bestSim = 100;
        break;
      }
    }

    // Consonant skeleton check (did user pronounce each core consonant in order?)
    const inputChars = [...normalizedInput];
    const inputClassList = inputChars.map(toPhoneticClass);
    let matchedCount = 0;
    let closeCount = 0;

    target.consonantSkeleton.forEach((cons) => {
      const normCons = normalizeArabicPhonetics(cons);
      if (inputChars.includes(normCons)) {
        phonemeDiagnostics.push({ consonant: cons, status: 'matched' });
        matchedCount++;
      } else if (inputClassList.includes(toPhoneticClass(normCons))) {
        phonemeDiagnostics.push({ consonant: cons, status: 'close' });
        closeCount++;
      } else {
        phonemeDiagnostics.push({ consonant: cons, status: 'missed' });
      }
    });

    const skeletonRatio =
      target.consonantSkeleton.length > 0
        ? ((matchedCount + closeCount * 0.7) / target.consonantSkeleton.length) * 100
        : bestSim;

    const confBoost = speechConfidence > 0 ? Math.min(6, Math.round(speechConfidence * 6)) : 0;
    phonemeScore = Math.min(100, Math.round(bestSim * 0.65 + skeletonRatio * 0.35 + (bestSim >= 75 ? confBoost : 0)));
  } else {
    // Acoustic-only fallback (no Web Speech transcript captured)
    target.consonantSkeleton.forEach((cons) => {
      phonemeDiagnostics.push({
        consonant: cons,
        status: clarityScore >= 60 ? 'close' : 'missed'
      });
    });
    phonemeScore = Math.round(clarityScore * 0.55 + syllableScore * 0.45);
  }

  // Overall weighted score
  const overallScore = hasTranscript
    ? Math.round(phonemeScore * 0.62 + syllableScore * 0.22 + clarityScore * 0.16)
    : Math.round(syllableScore * 0.52 + clarityScore * 0.48);

  // Verdict & Immediate Personalized Feedback
  let verdictLevel: PronunciationEvaluationResult['verdictLevel'] = 'retry';
  let verdictTitleAr = 'حاول مجدداً بصوت أوضح';
  let feedbackHeadlineAr = 'لم نلتقط نطقاً واضحاً يطابق الكلمة المستهدفة.';

  if (overallScore >= 88) {
    verdictLevel = 'royal';
    verdictTitleAr = 'إتقان ملكي فصيح';
    feedbackHeadlineAr = `نطق متقن ومطابق للصوت المعاد بناؤه لكلمة «${target.reconstructedAr}»!`;
  } else if (overallScore >= 72) {
    verdictLevel = 'proficient';
    verdictTitleAr = 'نطق جيد جداً ومفهوم';
    feedbackHeadlineAr = `أداء قريب جداً من النطق الصحيح لكلمة «${target.reconstructedAr}».`;
  } else if (overallScore >= 52) {
    verdictLevel = 'developing';
    verdictTitleAr = 'قريب — يحتاج لضبط المخرج';
    feedbackHeadlineAr = `التقطنا محاولة واعدة؛ راجع المخارج المظللة أدناه لتقترب أكثر من «${target.reconstructedAr}».`;
  }

  const feedbackDetailsAr: string[] = [];

  if (acousticMetrics.peakRms < 0.025) {
    feedbackDetailsAr.push('مستوى الصوت منخفض نسبياً؛ اقترب قليلاً من الميكروفون وانطق الكلمة بنبرة مسموعة.');
  } else if (clarityScore >= 75) {
    feedbackDetailsAr.push('وضوح الصوت واستقرار النبرة جيدان جداً ومناسبان للتحليل.');
  }

  if (hasTranscript) {
    const missedConsonants = phonemeDiagnostics.filter((d) => d.status === 'missed').map((d) => d.consonant);
    const closeConsonants = phonemeDiagnostics.filter((d) => d.status === 'close').map((d) => d.consonant);

    if (missedConsonants.length === 0 && closeConsonants.length === 0) {
      feedbackDetailsAr.push('تطابقت جميع الصوامت الأساسية للكلمة مع النطق المصري المعاد بناؤه.');
    } else {
      if (missedConsonants.length > 0) {
        feedbackDetailsAr.push(
          `تأكد من إبراز هذه الأصوات بوضوح أكبر: (${missedConsonants.join(' ، ')}) عند النطق.`
        );
      }
      if (closeConsonants.length > 0) {
        feedbackDetailsAr.push(
          `أصوات قريبة التقطت بنطق مقارب: (${closeConsonants.join(' ، ')})؛ حاول ضبط مخرجها بدقة.`
        );
      }
    }
  } else {
    feedbackDetailsAr.push(
      'تم التحليل بناءً على الموجة الصوتية وإيقاع المقاطع فقط لعدم توفر نص منطوق من محرك التعرف على الكلام في هذا المتصفح.'
    );
  }

  if (sylDiff === 0 && detectedSyl > 0) {
    feedbackDetailsAr.push(
      `عدد المقاطع الصوتية متطابق (${detectedSyl} ${targetSyl === 1 ? 'مقطع' : 'مقاطع'}) مع الإيقاع المرجعي.`
    );
  } else if (detectedSyl > targetSyl) {
    feedbackDetailsAr.push(
      `مددت الكلمة إلى ${detectedSyl} مقاطع بينما تتكون الكلمة المرجعية من ${targetSyl} ${targetSyl === 1 ? 'مقطع واحد' : 'مقاطع'}.`
    );
  } else if (detectedSyl < targetSyl) {
    feedbackDetailsAr.push(
      `قسّم الكلمة إلى ${targetSyl} مقاطع أوضح كما في التقطيع الصوتي أدناه.`
    );
  }

  return {
    overallScore,
    phonemeScore,
    syllableScore,
    clarityScore,
    verdictTitleAr,
    verdictLevel,
    transcriptNormalized: normalizedInput,
    rawTranscript: rawTranscript.trim(),
    analysisMode: hasTranscript ? 'speech_and_acoustics' : 'acoustics_only',
    phonemeDiagnostics,
    feedbackHeadlineAr,
    feedbackDetailsAr,
    coachTipAr: target.articulationCoachAr
  };
}
