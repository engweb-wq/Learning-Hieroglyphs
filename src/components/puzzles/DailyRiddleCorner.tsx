import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Puzzle,
  Lightbulb,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Calendar,
  Sparkles,
  Lock,
  Unlock,
  Flame,
  Trophy,
  BookOpen
} from 'lucide-react';
import {
  DAILY_WISDOM_PUZZLES,
  DailyWisdomPuzzle,
  getDailyPuzzleForDate
} from '../../data/dailyPuzzleData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

const RIDDLE_STORAGE_KEY = 'egyptian_scribe_daily_riddles_v1';

interface RiddlePersistedState {
  solvedPuzzleIds: string[];
  lastDailySolvedDate: string | null;
  dailyStreak: number;
}

function loadRiddleState(): RiddlePersistedState {
  if (typeof window === 'undefined') {
    return { solvedPuzzleIds: [], lastDailySolvedDate: null, dailyStreak: 0 };
  }
  try {
    const raw = localStorage.getItem(RIDDLE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        solvedPuzzleIds: Array.isArray(parsed.solvedPuzzleIds) ? parsed.solvedPuzzleIds : [],
        lastDailySolvedDate: parsed.lastDailySolvedDate || null,
        dailyStreak: typeof parsed.dailyStreak === 'number' ? parsed.dailyStreak : 0
      };
    }
  } catch {
    // ignore storage errors
  }
  return { solvedPuzzleIds: [], lastDailySolvedDate: null, dailyStreak: 0 };
}

function shuffleDeterministic(items: string[], seedStr: string): string[] {
  const arr = [...items];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 2147483647;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const DailyRiddleCorner: React.FC = () => {
  const dailyInfo = useMemo(() => getDailyPuzzleForDate(), []);
  const [activePuzzleId, setActivePuzzleId] = useState<string>(dailyInfo.puzzle.id);
  const [persisted, setPersisted] = useState<RiddlePersistedState>(() => loadRiddleState());

  // Per-attempt interactive state
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [revealedTokenIds, setRevealedTokenIds] = useState<string[]>([]);
  const [audioHintUsed, setAudioHintUsed] = useState(false);
  const [slotHintUsedCount, setSlotHintUsedCount] = useState(0);
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'partial' | 'solved';
    matchedIndices: number[];
    messageAr: string;
  }>({ status: 'idle', matchedIndices: [], messageAr: '' });
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number>(0);

  const currentPuzzle: DailyWisdomPuzzle = useMemo(
    () => DAILY_WISDOM_PUZZLES.find((p) => p.id === activePuzzleId) || dailyInfo.puzzle,
    [activePuzzleId, dailyInfo.puzzle]
  );

  const isTodaysPuzzle = currentPuzzle.id === dailyInfo.puzzle.id;
  const isAlreadySolved = persisted.solvedPuzzleIds.includes(currentPuzzle.id);

  // Build deterministic shuffled word bank for the current puzzle
  const wordBank = useMemo(() => {
    const allWords = [
      ...currentPuzzle.tokens.map((t) => t.targetWordAr),
      ...currentPuzzle.distractorWordsAr
    ];
    return shuffleDeterministic(allWords, currentPuzzle.id);
  }, [currentPuzzle]);

  // Reset workspace when switching puzzles
  useEffect(() => {
    setSlots(Array(currentPuzzle.tokens.length).fill(null));
    setRevealedTokenIds([]);
    setAudioHintUsed(false);
    setSlotHintUsedCount(0);
    setCheckResult({ status: 'idle', matchedIndices: [], messageAr: '' });
    setLastEarnedPoints(0);
    scribeAudio.stop();
  }, [currentPuzzle]);

  const savePersisted = (next: RiddlePersistedState) => {
    setPersisted(next);
    try {
      localStorage.setItem(RIDDLE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const totalHintsUsed =
    revealedTokenIds.length + (audioHintUsed ? 1 : 0) + slotHintUsedCount;

  const potentialPoints = Math.max(25, 60 - totalHintsUsed * 10);

  // Progressive Hint 1: Reveal meaning of ONE unrevealed hieroglyph symbol
  const handleRevealNextSymbol = (specificTokenId?: string) => {
    if (checkResult.status === 'solved') return;

    const nextToken = specificTokenId
      ? currentPuzzle.tokens.find((t) => t.id === specificTokenId && !revealedTokenIds.includes(t.id))
      : currentPuzzle.tokens.find((t) => !revealedTokenIds.includes(t.id));

    if (!nextToken) return;

    soundFX.playAncientChime(580);
    setRevealedTokenIds((prev) => [...prev, nextToken.id]);
    scribeAudio.speakText(
      `تلميح الرمز: ينطق ${nextToken.phoneticAr}، ويعني ${nextToken.targetWordAr}`,
      { id: `riddle-hint-${nextToken.id}`, rate: 0.9 }
    );
  };

  // Progressive Hint 2: Play phonetic pronunciation of the Ancient Egyptian inscription
  const handlePlayPhoneticHint = () => {
    soundFX.playAncientChime(520);
    setAudioHintUsed(true);
    scribeAudio.speakText(`النطق المصري القديم للحكمة: ${currentPuzzle.phoneticReadingAr}`, {
      id: `riddle-audio-hint-${currentPuzzle.id}`,
      rate: 0.82
    });
  };

  // Progressive Hint 3: Lock one correct word into its target slot
  const handlePlaceOneWordHint = () => {
    if (checkResult.status === 'solved') return;

    const targetIdx = currentPuzzle.tokens.findIndex(
      (token, idx) => slots[idx] !== token.targetWordAr
    );
    if (targetIdx === -1) return;

    const targetToken = currentPuzzle.tokens[targetIdx];
    soundFX.playClickSound();

    const updated = [...slots];
    // Clear the word if user had placed it in a wrong slot earlier
    for (let i = 0; i < updated.length; i++) {
      if (updated[i] === targetToken.targetWordAr) {
        updated[i] = null;
      }
    }
    updated[targetIdx] = targetToken.targetWordAr;
    setSlots(updated);

    if (!revealedTokenIds.includes(targetToken.id)) {
      setRevealedTokenIds((prev) => [...prev, targetToken.id]);
    }
    setSlotHintUsedCount((c) => c + 1);
    setCheckResult({ status: 'idle', matchedIndices: [], messageAr: '' });
  };

  const handleSelectBankWord = (word: string) => {
    if (checkResult.status === 'solved') return;
    if (slots.includes(word)) return;

    const firstEmptyIdx = slots.findIndex((s) => s === null);
    if (firstEmptyIdx === -1) return;

    soundFX.playClickSound();
    const updated = [...slots];
    updated[firstEmptyIdx] = word;
    setSlots(updated);
    setCheckResult({ status: 'idle', matchedIndices: [], messageAr: '' });
  };

  const handleClearSlot = (idx: number) => {
    if (checkResult.status === 'solved') return;
    if (!slots[idx]) return;
    soundFX.playClickSound();
    const updated = [...slots];
    updated[idx] = null;
    setSlots(updated);
    setCheckResult({ status: 'idle', matchedIndices: [], messageAr: '' });
  };

  const handleResetWorkspace = () => {
    soundFX.playClickSound();
    setSlots(Array(currentPuzzle.tokens.length).fill(null));
    setCheckResult({ status: 'idle', matchedIndices: [], messageAr: '' });
  };

  const handleVerifyDecoding = () => {
    if (slots.some((s) => s === null)) {
      setCheckResult({
        status: 'partial',
        matchedIndices: [],
        messageAr: 'أكمل ملء جميع الخانات بالكلمات المناسبة أولاً قبل التحقق من فك الشفرة.'
      });
      return;
    }

    const matched: number[] = [];
    currentPuzzle.tokens.forEach((token, idx) => {
      if (slots[idx] === token.targetWordAr) {
        matched.push(idx);
      }
    });

    if (matched.length === currentPuzzle.tokens.length) {
      soundFX.playSuccessSound();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 } });

      // Reveal all symbols on completion
      setRevealedTokenIds(currentPuzzle.tokens.map((t) => t.id));

      const earned = isAlreadySolved ? 0 : potentialPoints;
      setLastEarnedPoints(earned);

      setCheckResult({
        status: 'solved',
        matchedIndices: matched,
        messageAr: `أحسنت يا كاتب الحكمة! نجحت في فك شفرة «${currentPuzzle.titleAr}» بالكامل.`
      });

      if (!isAlreadySolved) {
        studentProgress.addPoints(
          earned,
          `فك شفرة حكمة «${currentPuzzle.titleAr}» في ركن الألغاز`,
          'ركن الألغاز اليومي'
        );

        const nextSolvedIds = [...persisted.solvedPuzzleIds, currentPuzzle.id];
        let nextStreak = persisted.dailyStreak;
        let nextDate = persisted.lastDailySolvedDate;

        if (isTodaysPuzzle && persisted.lastDailySolvedDate !== dailyInfo.dateKey) {
          nextStreak = persisted.dailyStreak + 1;
          nextDate = dailyInfo.dateKey;
        }

        savePersisted({
          solvedPuzzleIds: nextSolvedIds,
          lastDailySolvedDate: nextDate,
          dailyStreak: nextStreak
        });
      }

      scribeAudio.speakText(currentPuzzle.audioScript, {
        id: `riddle-win-${currentPuzzle.id}`,
        rate: 0.9
      });
    } else {
      soundFX.playClickSound();
      setCheckResult({
        status: 'partial',
        matchedIndices: matched,
        messageAr:
          matched.length > 0
            ? `تقدم رائع! أصبتَ في ${matched.length} من ${currentPuzzle.tokens.length} مواضع — جرّب استبدال المواضع المظللة أو الاستعانة بكشف معنى رمز واحد.`
            : 'الترتيب أو اختيار الكلمات غير مطابق بعد. اضغط على «اكشف معنى رمز واحد» في قائمة التلميحات لمساعدتك.'
      });
    }
  };

  const remainingUnrevealedCount = currentPuzzle.tokens.filter(
    (t) => !revealedTokenIds.includes(t.id)
  ).length;

  return (
    <section id="daily-riddle-corner" className="space-y-6 text-right animate-fadeIn">
      {/* Header & Daily Streak Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-amber-800 flex flex-wrap items-center gap-2">
              <span>ركن الألغاز اليومي</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-mono tabular-nums">{dailyInfo.dateKey}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>{isTodaysPuzzle ? 'لغز اليوم المختار' : 'لغز من الأرشيف'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              {currentPuzzle.titleAr}
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl font-serif-ar leading-relaxed">
              فكّ شفرة هذا النقش الهيروغليفي القصير لتكتشف حكمة مصرية قديمة؛ وإذا تعثرت، استخدم التلميحات التدريجية لكشف معنى رمز واحد خطوة بخطوة.
            </p>
          </div>

          {/* Achievement & Streak Counters */}
          <div className="flex items-center gap-4 border border-[#E8DFC9] bg-[#FAF7F0] px-4 py-3 rounded-2xl shrink-0">
            <div>
              <div className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>سلسلة الأيام</span>
              </div>
              <div className="text-xl font-extrabold font-mono text-amber-900 tabular-nums">
                {persisted.dailyStreak} {persisted.dailyStreak === 1 ? 'يوم' : 'أيام'}
              </div>
            </div>
            <div className="h-8 w-px bg-[#E8DFC9]" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>ألغاز مفكوكة</span>
              </div>
              <div className="text-xl font-extrabold font-mono text-emerald-800 tabular-nums">
                {persisted.solvedPuzzleIds.length}/{DAILY_WISDOM_PUZZLES.length}
              </div>
            </div>
          </div>
        </div>

        {/* Puzzle Switcher (Today's Puzzle + Practice Archive) */}
        <div className="flex items-center gap-2 pt-4 border-t border-stone-100 overflow-x-auto pb-1">
          {DAILY_WISDOM_PUZZLES.map((p) => {
            const isActive = p.id === currentPuzzle.id;
            const isToday = p.id === dailyInfo.puzzle.id;
            const isDone = persisted.solvedPuzzleIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setActivePuzzleId(p.id);
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-800 text-white border-amber-900'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
                }`}
              >
                <span>{isToday ? '★ لغز اليوم' : p.numberLabel}</span>
                {isDone && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Zone Decoding Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT/MAIN STAGE (7 cols): Carved Hieroglyph Tokens + Sentence Assembly */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-6">
          {/* Carved Inscription Tablet */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 border-b border-stone-100 pb-3">
              <span className="font-semibold text-amber-900">{currentPuzzle.sourceWisdomAr}</span>
              <span className="font-mono">{currentPuzzle.eraAr}</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F5EEDB] to-[#EBE0C6] border border-[#D4C39C] space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold flex items-center gap-1.5">
                  <Puzzle className="w-4 h-4 text-amber-800" />
                  <span>النقش الهيروغليفي (رتّب معاني الرموز من اليمين لليسار):</span>
                </span>
                <span className="font-mono text-[11px] text-stone-500">يمين ← يسار</span>
              </div>

              {/* Token Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" dir="rtl">
                {currentPuzzle.tokens.map((token, idx) => {
                  const isRevealed =
                    revealedTokenIds.includes(token.id) || checkResult.status === 'solved';

                  return (
                    <div
                      key={token.id}
                      className={`p-3.5 rounded-xl border text-center flex flex-col justify-between gap-2 transition-colors ${
                        isRevealed
                          ? 'bg-white border-amber-500 shadow-2xs'
                          : 'bg-[#FAF7F0]/90 border-[#D8CAA8]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                        <span>#{idx + 1}</span>
                        <span>{token.gardiner.split('+')[0].trim()}</span>
                      </div>

                      <div className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900 py-1 select-none leading-tight">
                        {token.glyphs}
                      </div>

                      {isRevealed ? (
                        <div className="space-y-0.5 pt-1 border-t border-amber-100">
                          <div className="text-xs font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                            <Unlock className="w-3 h-3" />
                            <span>{token.targetWordAr}</span>
                          </div>
                          <div className="text-[11px] font-mono text-amber-800">
                            {token.phoneticAr}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRevealNextSymbol(token.id)}
                          disabled={checkResult.status === 'solved'}
                          className="pt-1.5 border-t border-stone-200/80 text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Lock className="w-3 h-3" />
                          <span>اكشف هذا الرمز</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sentence Assembly Slots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>تركيب ترجمة الحكمة (اضغط على الخانة لإزالة الكلمة):</span>
              {slots.some((s) => s !== null) && checkResult.status !== 'solved' && (
                <button
                  type="button"
                  onClick={handleResetWorkspace}
                  className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-800 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إفراغ الخانات</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" dir="rtl">
              {currentPuzzle.tokens.map((_, idx) => {
                const filledWord = slots[idx];
                const isSlotCorrect =
                  checkResult.status !== 'idle' && checkResult.matchedIndices.includes(idx);
                const isSlotWrong =
                  checkResult.status === 'partial' &&
                  filledWord !== null &&
                  !checkResult.matchedIndices.includes(idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!filledWord || checkResult.status === 'solved'}
                    onClick={() => handleClearSlot(idx)}
                    className={`min-h-[60px] p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      isSlotCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                        : isSlotWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                        : filledWord
                        ? 'bg-[#FAF5E8] border-amber-700 text-amber-950 font-bold hover:border-rose-500'
                        : 'bg-stone-50 border-dashed border-stone-300 text-stone-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-stone-400 mb-0.5">
                      الرمز #{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm leading-snug">
                      {filledWord || 'اختر كلمة...'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Word Bank Pool */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-stone-700">
              بنك الكلمات المحتملة (اختر بالترتيب الصحيح):
            </div>
            <div className="flex flex-wrap gap-2">
              {wordBank.map((word) => {
                const isUsed = slots.includes(word);
                return (
                  <button
                    key={word}
                    type="button"
                    disabled={isUsed || checkResult.status === 'solved'}
                    onClick={() => handleSelectBankWord(word)}
                    className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                      isUsed
                        ? 'bg-stone-100 border-stone-200 text-stone-400 line-through cursor-not-allowed'
                        : 'bg-white border-stone-300 text-stone-800 hover:border-amber-700 hover:bg-amber-50/50 shadow-2xs'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Feedback + Primary Action */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            {checkResult.status !== 'idle' && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-start gap-2.5 ${
                  checkResult.status === 'solved'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                {checkResult.status === 'solved' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                )}
                <span>{checkResult.messageAr}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-stone-500">
                المكافأة المتاحة:{' '}
                <strong className="font-mono text-amber-900 tabular-nums">
                  {isAlreadySolved ? 'تم تحصيل المكافأة' : `+${potentialPoints} نقطة كاتب`}
                </strong>
              </div>

              <button
                type="button"
                disabled={checkResult.status === 'solved'}
                onClick={handleVerifyDecoding}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 disabled:bg-emerald-700 text-white text-sm font-bold transition-colors shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {checkResult.status === 'solved' ? 'تم فك الشفرة بنجاح' : 'تحقق من فك الشفرة'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT/COMPANION DECK (5 cols): Progressive Hints Ladder & Wisdom Reflection */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-6">
          {checkResult.status === 'solved' ? (
            /* Victory Wisdom Scroll Card */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>إنجاز فك الشفرة</span>
                  </span>
                  {lastEarnedPoints > 0 && (
                    <span className="font-mono text-sm font-black text-emerald-800 tabular-nums">
                      +{lastEarnedPoints} نقطة كاتب
                    </span>
                  )}
                </div>

                <div className="text-lg sm:text-xl font-extrabold text-stone-900 font-serif-ar leading-relaxed">
                  «{currentPuzzle.fullWisdomTranslationAr}»
                </div>

                <div className="text-xs text-stone-700 space-y-1 pt-2 border-t border-emerald-200/80">
                  <div>
                    <span className="font-bold">النطق المعاد بناؤه:</span>{' '}
                    {currentPuzzle.phoneticReadingAr}
                  </div>
                  <div className="font-mono text-stone-500" dir="ltr">
                    {currentPuzzle.transliteration}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-2.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>تأملات في الحكمة المصرية القديمة:</span>
                </div>
                <p className="text-sm text-stone-800 font-serif-ar leading-relaxed">
                  {currentPuzzle.wisdomReflectionAr}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  scribeAudio.speakText(currentPuzzle.audioScript, {
                    id: `riddle-replay-${currentPuzzle.id}`,
                    rate: 0.9
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع لقراءة الحكمة كاملة</span>
              </button>
            </div>
          ) : (
            /* Progressive Hints Ladder */
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>نظام التلميحات التدريجية</span>
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 font-display-eg">
                  تدرّج في كشف الرموز خطوة بخطوة
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  ابدأ بالاعتماد على ذاكرتك، وعند الحاجة استخدم التلميح الأول لكشف رمز واحد فقط لتكمل البقية بنفسك.
                </p>
              </div>

              {/* Tier 1: Reveal 1 Symbol Meaning */}
              <div className="p-4 rounded-2xl bg-[#FAF5E8] border border-amber-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span>1. كشف معنى رمز واحد</span>
                  <span className="font-mono text-amber-800 tabular-nums">
                    متبقي {remainingUnrevealedCount}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  يكشف لك الدلالة الصوتية والمعجمية لرمز هيروغليفي واحد في اللوحة مع شرح سر رسمه.
                </p>
                <button
                  type="button"
                  disabled={remainingUnrevealedCount === 0}
                  onClick={() => handleRevealNextSymbol()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 disabled:bg-stone-300 text-white text-xs font-bold transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>
                    {remainingUnrevealedCount === 0
                      ? 'تم كشف جميع الرموز'
                      : 'اكشف معنى رمز واحد الآن'}
                  </span>
                </button>
              </div>

              {/* Revealed Clues Feed */}
              {revealedTokenIds.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-stone-700">تلميحات الرموز المكشوفة:</div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {currentPuzzle.tokens
                      .filter((t) => revealedTokenIds.includes(t.id))
                      .map((token) => (
                        <div
                          key={token.id}
                          className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-stone-900">
                            <span className="flex items-center gap-2">
                              <span className="font-hieroglyphs text-lg">{token.glyphs}</span>
                              <span>= {token.targetWordAr}</span>
                            </span>
                            <span className="font-mono text-amber-800">{token.phoneticAr}</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">{token.symbolHintAr}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Tier 2 & 3: Audio Hint + Place One Word */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handlePlayPhoneticHint}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-right space-y-1 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span>2. تلميح صوتي</span>
                  </div>
                  <div className="text-[11px] text-stone-500">سماع نطق النقش بالهيروغليفية</div>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOneWordHint}
                  className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-right space-y-1 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Sparkles className="w-4 h-4 text-amber-800" />
                    <span>3. تثبيت كلمة</span>
                  </div>
                  <div className="text-[11px] text-stone-500">وضع كلمة واحدة في موضعها الصحيح</div>
                </button>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>
              التلميحات المستخدمة:{' '}
              <strong className="font-mono text-stone-800 tabular-nums">{totalHintsUsed}</strong>
            </span>
            <span>{currentPuzzle.numberLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
