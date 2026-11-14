import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Square,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trophy,
  AudioWaveform,
  ArrowLeft,
  Info,
  Sparkles,
  Ear
} from 'lucide-react';
import {
  PRONUNCIATION_WORDS,
  PronunciationChallengeWord,
  PronunciationDifficulty
} from '../../data/pronunciationChallengeData';
import {
  AcousticCaptureMetrics,
  PronunciationEvaluationResult,
  evaluatePronunciation
} from '../../utils/pronunciationAnalyzer';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((ev: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export const PronunciationChallenge: React.FC = () => {
  const [difficulty, setDifficulty] = useState<PronunciationDifficulty | 'all'>('all');
  const [wordIndex, setWordIndex] = useState(0);
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'analyzing' | 'evaluated'>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [speechRecognitionFailedNotice, setSpeechRecognitionFailedNotice] = useState<string | null>(null);

  const [evaluation, setEvaluation] = useState<PronunciationEvaluationResult | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingUserClip, setIsPlayingUserClip] = useState(false);

  const [sessionScore, setSessionScore] = useState(0);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [masteredWordIds, setMasteredWordIds] = useState<string[]>([]);

  // Live refs for clean Web Audio & SpeechRecognition lifecycle
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Acoustic measurement refs during capture
  const transcriptRef = useRef<string>('');
  const confidenceRef = useRef<number>(0);
  const captureStartTimeRef = useRef<number>(0);
  const peakRmsRef = useRef<number>(0);
  const rmsSumRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const activeFramesRef = useRef<number>(0);
  const syllableCountRef = useRef<number>(0);
  const inSyllableBurstRef = useRef<boolean>(false);
  const lastBurstTimeRef = useRef<number>(0);
  const isStoppingRef = useRef<boolean>(false);

  const filteredWords =
    difficulty === 'all'
      ? PRONUNCIATION_WORDS
      : PRONUNCIATION_WORDS.filter((w) => w.difficulty === difficulty);

  const currentWord: PronunciationChallengeWord =
    filteredWords[wordIndex % Math.max(1, filteredWords.length)] || PRONUNCIATION_WORDS[0];

  useEffect(() => {
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const hasSR = Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
    setSpeechRecognitionSupported(hasSR);

    return () => {
      cleanupCaptureResources();
      scribeAudio.stop();
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
        userAudioPlayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  // Reset attempt state when changing word or difficulty
  useEffect(() => {
    setWordIndex(0);
  }, [difficulty]);

  const clearCurrentResult = () => {
    setEvaluation(null);
    setLiveTranscript('');
    setMicError(null);
    setSpeechRecognitionFailedNotice(null);
    setRecordingState('idle');
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    setIsPlayingUserClip(false);
    if (recordedAudioUrl) {
      setRecordedAudioUrl(null);
    }
  };

  const cleanupCaptureResources = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const drawIdleCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#FAF5E8';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#D6C7A9';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
  };

  useEffect(() => {
    if (recordingState === 'idle') {
      drawIdleCanvas();
    }
  }, [recordingState, currentWord.id]);

  const runLiveWaveformLoop = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const timeData = new Float32Array(analyser.fftSize);
    const freqData = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      if (!analyserRef.current) return;

      analyser.getFloatTimeDomainData(timeData);
      analyser.getByteFrequencyData(freqData);

      // Compute instant RMS energy
      let sumSq = 0;
      for (let i = 0; i < timeData.length; i++) {
        sumSq += timeData[i] * timeData[i];
      }
      const rms = Math.sqrt(sumSq / timeData.length);
      const now = performance.now();

      frameCountRef.current += 1;
      rmsSumRef.current += rms;
      if (rms > peakRmsRef.current) {
        peakRmsRef.current = rms;
      }

      const speechThreshold = 0.022;
      if (rms > speechThreshold) {
        activeFramesRef.current += 1;
      }

      // Syllable burst detection (envelope peak with 145ms cooldown)
      const burstHigh = 0.036;
      const burstLow = 0.018;
      if (!inSyllableBurstRef.current && rms >= burstHigh && now - lastBurstTimeRef.current >= 145) {
        inSyllableBurstRef.current = true;
        syllableCountRef.current += 1;
        lastBurstTimeRef.current = now;
      } else if (inSyllableBurstRef.current && rms < burstLow) {
        inSyllableBurstRef.current = false;
      }

      // Draw crisp frequency + energy bar spectrum
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#FAF5E8';
      ctx.fillRect(0, 0, w, h);

      const barCount = 36;
      const gap = 4;
      const barWidth = (w - gap * (barCount + 1)) / barCount;
      const step = Math.max(1, Math.floor(freqData.length / 2 / barCount));

      for (let i = 0; i < barCount; i++) {
        const val = freqData[i * step] / 255;
        const barH = Math.max(6, val * (h - 20));
        const x = gap + i * (barWidth + gap);
        const y = (h - barH) / 2;

        ctx.fillStyle = rms > speechThreshold ? '#92400E' : '#C9B896';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 3);
        ctx.fill();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  const finalizeAnalysis = () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;
    setRecordingState('analyzing');

    // Stop speech recognition gracefully so final result can flush
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }

    // Small settle window (320ms) for SpeechRecognition final onresult & MediaRecorder onstop
    setTimeout(() => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      recognitionRef.current = null;

      const durationMs = Math.max(0, performance.now() - captureStartTimeRef.current);
      const frames = Math.max(1, frameCountRef.current);
      const acousticMetrics: AcousticCaptureMetrics = {
        durationMs,
        peakRms: peakRmsRef.current,
        avgRms: rmsSumRef.current / frames,
        detectedSyllables: syllableCountRef.current,
        activeSpeechRatio: activeFramesRef.current / frames
      };

      const result = evaluatePronunciation({
        target: currentWord,
        rawTranscript: transcriptRef.current,
        speechConfidence: confidenceRef.current,
        acousticMetrics
      });

      setEvaluation(result);
      setRecordingState('evaluated');
      setAttemptsCount((c) => c + 1);

      if (result.overallScore >= 88) {
        soundFX.playSuccessSound();
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      } else if (result.overallScore >= 72) {
        soundFX.playSuccessSound();
      } else {
        soundFX.playClickSound();
      }

      if (result.overallScore >= 70) {
        const earned = result.overallScore >= 88 ? 25 : 15;
        setSessionScore((s) => s + earned);
        if (!masteredWordIds.includes(currentWord.id)) {
          setMasteredWordIds((prev) => [...prev, currentWord.id]);
        }
        studentProgress.addPoints(
          earned,
          `إتقان نطق كلمة «${currentWord.reconstructedAr}» (${result.overallScore}%)`,
          'تحدي النطق'
        );
        studentProgress.recordGameScore('pronunciationChallenge', sessionScore + earned);
      }
    }, 340);
  };

  const startMicrophoneChallenge = async () => {
    scribeAudio.stop();
    clearCurrentResult();

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setMicError('متصفحك الحالي لا يدعم الوصول إلى الميكروفون عبر واجهة Web Audio.');
      return;
    }

    isStoppingRef.current = false;
    transcriptRef.current = '';
    confidenceRef.current = 0;
    peakRmsRef.current = 0;
    rmsSumRef.current = 0;
    frameCountRef.current = 0;
    activeFramesRef.current = 0;
    syllableCountRef.current = 0;
    inSyllableBurstRef.current = false;
    lastBurstTimeRef.current = 0;
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Setup MediaRecorder to let user hear their own voice beside the reference
      if (typeof MediaRecorder !== 'undefined') {
        try {
          const recorder = new MediaRecorder(stream);
          mediaRecorderRef.current = recorder;
          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };
          recorder.onstop = () => {
            if (audioChunksRef.current.length > 0) {
              const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
              const url = URL.createObjectURL(blob);
              setRecordedAudioUrl(url);
            }
          };
          recorder.start();
        } catch {
          // MediaRecorder optional fallback
        }
      }

      // Setup Web Speech Recognition concurrently (ar-EG)
      const win = window as unknown as {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };
      const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

      if (SpeechRec) {
        try {
          const recognition = new SpeechRec();
          recognition.lang = 'ar-EG';
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.maxAlternatives = 3;

          recognition.onresult = (event) => {
            let bestText = '';
            let bestConf = 0;

            for (let i = 0; i < event.results.length; i++) {
              const res = event.results[i];
              if (res[0]) {
                bestText += (bestText ? ' ' : '') + res[0].transcript;
                if (res[0].confidence > bestConf) {
                  bestConf = res[0].confidence;
                }
              }
            }

            transcriptRef.current = bestText.trim();
            confidenceRef.current = bestConf;
            setLiveTranscript(bestText.trim());
          };

          recognition.onerror = (err) => {
            if (err.error === 'not-allowed' || err.error === 'service-not-allowed') {
              setSpeechRecognitionFailedNotice(
                'خدمة التعرف على الكلام غير مفعّلة في هذا المتصفح؛ تم الاعتماد على تحليل الموجة والمقاطع الصوتية.'
              );
            }
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch {
          setSpeechRecognitionFailedNotice(
            'تعذر تشغيل محرك التعرف التلقائي على الكلام؛ سيجري تحليل الموجة الصوتية وإيقاع المقاطع.'
          );
        }
      }

      captureStartTimeRef.current = performance.now();
      setRecordingState('recording');
      runLiveWaveformLoop();

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => Number((prev + 0.1).toFixed(1)));
      }, 100);

      // Automatically stop after 6 seconds for snappy single-word evaluation
      autoStopTimerRef.current = setTimeout(() => {
        finalizeAnalysis();
      }, 6000);
    } catch (err) {
      cleanupCaptureResources();
      setRecordingState('idle');
      const errName = err instanceof Error ? err.name : '';
      if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
        setMicError(
          'تم رفض إذن الميكروفون. اسمح للمتصفح باستخدام الميكروفون من أيقونة القفل في شريط العنوان ثم أعد المحاولة.'
        );
      } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
        setMicError('لم يتم العثور على ميكروفون متصل بهذا الجهاز.');
      } else {
        setMicError('تعذر بدء تسجيل الميكروفون. تأكد من توصيل الميكروفون والسماح بالوصول الصوتي.');
      }
    }
  };

  const handlePlayReferenceAudio = (slowMode = false) => {
    soundFX.playAncientChime(540);
    const rate = slowMode ? 0.65 : 0.88;
    const script = slowMode
      ? currentWord.syllables.map((s) => s.text.replace(/[ـ-]/g, '')).join(' .. ')
      : `${currentWord.reconstructedAr} .. وتعني: ${currentWord.meaningAr}`;

    scribeAudio.speakText(script, {
      id: `pron-ref-${currentWord.id}-${slowMode ? 'slow' : 'normal'}`,
      rate
    });
  };

  const handlePlayUserRecording = () => {
    if (!recordedAudioUrl) return;
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }
    const audio = new Audio(recordedAudioUrl);
    userAudioPlayerRef.current = audio;
    setIsPlayingUserClip(true);
    audio.onended = () => setIsPlayingUserClip(false);
    audio.onerror = () => setIsPlayingUserClip(false);
    audio.play().catch(() => setIsPlayingUserClip(false));
  };

  const handleSelectWord = (idx: number) => {
    if (recordingState === 'recording') return;
    soundFX.playClickSound();
    clearCurrentResult();
    setWordIndex(idx);
  };

  const handleNextWord = () => {
    soundFX.playClickSound();
    clearCurrentResult();
    setWordIndex((prev) => (prev + 1) % filteredWords.length);
  };

  return (
    <section id="pronunciation-challenge" className="space-y-6 text-right animate-fadeIn">
      {/* Header & Difficulty Filter */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-2">
              <span>مختبر النطق الصوتي</span>
              <span aria-hidden="true">·</span>
              <span>تحليل فوري عبر الميكروفون</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              تحدي النطق الهيروغليفي
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl font-serif-ar leading-relaxed">
              استمع إلى النطق المعاد بناؤه للكلمة المصرية القديمة، ثم استخدم الميكروفون لتنطقها بصوتك واحصل على تقييم فوري لمخارج الحروف وإيقاع المقاطع.
            </p>
          </div>

          {/* Stats & Progress */}
          <div className="flex items-center gap-4 border border-[#E8DFC9] bg-[#FAF7F0] px-4 py-3 rounded-2xl shrink-0">
            <div>
              <div className="text-xs font-semibold text-stone-500">الكلمات المتقنة</div>
              <div className="text-xl font-extrabold font-mono text-amber-900 tabular-nums">
                {masteredWordIds.length}/{PRONUNCIATION_WORDS.length}
              </div>
            </div>
            <div className="h-8 w-px bg-[#E8DFC9]" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-stone-500">نقاط الجلسة</div>
              <div className="text-xl font-extrabold font-mono text-emerald-700 tabular-nums flex items-center gap-1">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>{sessionScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Selector + Word Picker Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1 self-start">
            {[
              { id: 'all', label: 'كل المستويات (15)' },
              { id: 'beginner', label: 'مبتدئ (5)' },
              { id: 'intermediate', label: 'متوسط (5)' },
              { id: 'advanced', label: 'متقدم (5)' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                disabled={recordingState === 'recording'}
                onClick={() => {
                  soundFX.playClickSound();
                  clearCurrentResult();
                  setDifficulty(lvl.id as PronunciationDifficulty | 'all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  difficulty === lvl.id
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {filteredWords.map((w, idx) => {
              const isActive = w.id === currentWord.id;
              const isMastered = masteredWordIds.includes(w.id);
              return (
                <button
                  key={w.id}
                  type="button"
                  disabled={recordingState === 'recording'}
                  onClick={() => handleSelectWord(idx)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FAF5E8] border-amber-700 text-amber-950'
                      : isMastered
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400'
                  }`}
                >
                  <span className="font-hieroglyphs text-base">{w.hieroglyphs}</span>
                  <span>{w.reconstructedAr}</span>
                  {isMastered && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Browser SpeechRecognition Compatibility Info */}
      {!speechRecognitionSupported && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <span>
            محرك التعرف الآلي على الكلام (Web Speech Recognition) غير متاح في هذا المتصفح؛ سيعمل الميكروفون لتحليل الموجة الصوتية وإيقاع المقاطع وإتاحة الاستماع المباشر لتسجيلك مقارنةً بالنطق المرجعي.
          </span>
        </div>
      )}

      {/* Main Two-Zone Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT/TOP STAGE (7 cols): Target Word + Syllables + Live Mic Recorder */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-6">
          {/* Word Prompt Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 border-b border-stone-100 pb-3">
              <div>
                <span>المستوى: </span>
                <span className="text-amber-800 font-bold">{currentWord.difficultyLabelAr}</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span className="font-mono">Gardiner: {currentWord.gardinerCodes.join(', ')}</span>
              </div>
              <div className="font-mono tabular-nums">
                {wordIndex + 1}/{filteredWords.length}
              </div>
            </div>

            {/* Big Hieroglyph + Reconstructed Pronunciation Card */}
            <div className="p-6 rounded-2xl bg-[#FAF5E8] border border-amber-200 text-center space-y-3">
              <div className="text-6xl sm:text-7xl font-hieroglyphs text-stone-900 select-none leading-tight">
                {currentWord.hieroglyphs}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-stone-500">النطق المصري المعاد بناؤه:</div>
                <div className="text-3xl font-extrabold text-amber-950 font-display-eg">
                  {currentWord.reconstructedAr}
                </div>
                <div className="text-xs font-mono text-amber-800">
                  {currentWord.transliteration} · IPA {currentWord.ipaApprox}
                </div>
                <div className="text-sm font-bold text-stone-800 pt-1">
                  المعنى: {currentWord.meaningAr} ({currentWord.englishMeaning})
                </div>
              </div>

              {/* Reference Audio Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePlayReferenceAudio(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>استمع للنطق المعاد بناؤه</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayReferenceAudio(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <Ear className="w-4 h-4 text-amber-800" />
                  <span>نطق المقاطع ببطء</span>
                </button>
              </div>
            </div>

            {/* Syllables Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">
                التقطيع الصوتي للكلمة ({currentWord.expectedSyllables}{' '}
                {currentWord.expectedSyllables === 1 ? 'مقطع' : 'مقاطع'}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentWord.syllables.map((syl, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-base font-extrabold text-amber-950">{syl.text}</span>
                      <span className="text-xs font-mono text-stone-500 mr-2">[{syl.translit}]</span>
                    </div>
                    <span className="text-xs text-stone-600">{syl.articulationTipAr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Microphone Capture & Real-time Waveform Box */}
          <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">
                <AudioWaveform className="w-4 h-4 text-amber-800" />
                <span>
                  {recordingState === 'recording'
                    ? 'جاري الاستماع إلى نطقك عبر الميكروفون...'
                    : recordingState === 'analyzing'
                    ? 'جاري تحليل الصوت والمقاطع...'
                    : 'سجّل نطقك الآن للمقارنة الفورية'}
                </span>
              </span>
              <span className="font-mono text-amber-900 tabular-nums">
                {recordingState === 'recording' ? `${recordingSeconds.toFixed(1)} / 6.0 ث` : 'المدة: 6.0 ث كحد أقصى'}
              </span>
            </div>

            {/* Real-time Audio Waveform Canvas */}
            <div className="rounded-xl overflow-hidden border border-[#E2D5B8] bg-[#FAF5E8]">
              <canvas
                ref={canvasRef}
                width={640}
                height={88}
                className="w-full h-22 block"
              />
            </div>

            {/* Live transcript preview during recording */}
            {recordingState === 'recording' && (
              <div className="text-xs text-stone-600 text-center min-h-5">
                {liveTranscript ? (
                  <span>
                    النطق الملتقط لحظياً: <strong className="text-amber-950">«{liveTranscript}»</strong>
                  </span>
                ) : (
                  <span>انطق كلمة «{currentWord.reconstructedAr}» بوضوح الآن...</span>
                )}
              </div>
            )}

            {/* Mic Error Banner */}
            {micError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-950 flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{micError}</span>
              </div>
            )}

            {/* Primary Record / Stop CTA */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {recordingState !== 'recording' && recordingState !== 'analyzing' ? (
                <button
                  type="button"
                  onClick={startMicrophoneChallenge}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow-sm"
                >
                  <Mic className="w-4 h-4" />
                  <span>{evaluation ? 'أعد تسجيل نطقك' : 'ابدأ تسجيل النطق بالميكروفون'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={recordingState === 'analyzing'}
                  onClick={finalizeAnalysis}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-sm font-bold transition-colors shadow-sm disabled:opacity-60"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>{recordingState === 'analyzing' ? 'جاري التحليل...' : 'إيقاف وتحليل النطق'}</span>
                </button>
              )}

              {recordedAudioUrl && recordingState !== 'recording' && (
                <button
                  type="button"
                  onClick={handlePlayUserRecording}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-amber-800" />
                  <span>{isPlayingUserClip ? 'جاري تشغيل صوتك...' : 'استمع لتسجيلك'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT/BOTTOM DECK (5 cols): Immediate Evaluation Feedback & Articulation Coach */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-6">
          {evaluation ? (
            <div className="space-y-5 animate-fadeIn">
              {/* Verdict Header */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  evaluation.verdictLevel === 'royal' || evaluation.verdictLevel === 'proficient'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : evaluation.verdictLevel === 'developing'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-extrabold text-base">
                    {evaluation.verdictLevel === 'royal' || evaluation.verdictLevel === 'proficient' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : evaluation.verdictLevel === 'developing' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <span>{evaluation.verdictTitleAr}</span>
                  </div>
                  <div className="text-3xl font-black font-mono tabular-nums">
                    {evaluation.overallScore}%
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-serif-ar leading-relaxed">
                  {evaluation.feedbackHeadlineAr}
                </p>
              </div>

              {speechRecognitionFailedNotice && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  {speechRecognitionFailedNotice}
                </div>
              )}

              {/* What Microphone Heard vs Target */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 font-semibold">النطق المرجعي المعاد بناؤه:</span>
                  <span className="font-bold text-amber-950 text-sm">{currentWord.reconstructedAr}</span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-stone-200/70 pt-2">
                  <span className="text-stone-500 font-semibold">ما التقطه الميكروفون:</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {evaluation.rawTranscript ? `«${evaluation.rawTranscript}»` : 'تحليل موجي (دون نص)'}
                  </span>
                </div>
              </div>

              {/* 3 Sub-Metrics Bars */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-700">تفاصيل الدقة الصوتية:</div>
                {[
                  { label: 'دقة المخارج والحروف', value: evaluation.phonemeScore },
                  { label: 'توازن المقاطع الصوتية', value: evaluation.syllableScore },
                  { label: 'وضوح الصوت ومستواه', value: evaluation.clarityScore }
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-700">{metric.label}</span>
                      <span className="font-mono font-bold text-stone-900 tabular-nums">{metric.value}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          metric.value >= 75
                            ? 'bg-emerald-600'
                            : metric.value >= 55
                            ? 'bg-amber-600'
                            : 'bg-rose-600'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Phoneme-by-Phoneme Consonant Diagnostic */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-700">تحليل الصوامت الأساسية للكلمة:</div>
                <div className="flex flex-wrap gap-2">
                  {evaluation.phonemeDiagnostics.map((item, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                        item.status === 'matched'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : item.status === 'close'
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-rose-50 border-rose-300 text-rose-900'
                      }`}
                    >
                      <span className="text-sm">{item.consonant}</span>
                      <span className="text-[11px] font-medium">
                        {item.status === 'matched' ? 'مطابق' : item.status === 'close' ? 'قريب' : 'خافت'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Coaching Notes */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-2">
                <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>التغذية الراجعة ونصيحة المخرج:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700 font-serif-ar leading-relaxed list-disc pr-4">
                  {evaluation.feedbackDetailsAr.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-[#E8DFC9] text-xs font-semibold text-amber-950">
                  توجيه الأداء: {evaluation.coachTipAr}
                </div>
              </div>
            </div>
          ) : (
            /* Pre-evaluation Articulation Guide State */
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-800">دليل النطق قبل التسجيل</div>
                <h3 className="text-xl font-extrabold text-stone-900 font-display-eg">
                  كيف تنطق «{currentWord.reconstructedAr}» بدقة؟
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF5E8] border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-950">توجيه مخارج الحروف:</div>
                <p className="text-sm text-stone-800 font-serif-ar leading-relaxed">
                  {currentWord.articulationCoachAr}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs font-bold text-stone-800">الصوامت المستهدفة في التحليل:</div>
                <div className="flex flex-wrap gap-2">
                  {currentWord.consonantSkeleton.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-sm font-extrabold text-amber-900"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="text-xs font-bold text-stone-800">معلومة أثرية:</div>
                <p className="text-xs text-stone-600 font-serif-ar leading-relaxed">
                  {currentWord.historicalNoteAr}
                </p>
              </div>

              <div className="text-xs text-stone-500 pt-2">
                اضغط على «ابدأ تسجيل النطق بالميكروفون» ثم انطق الكلمة بوضوح للحصول على تحليل فوري لنطقك.
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold text-stone-500">
              المحاولات: <span className="font-mono text-stone-800 tabular-nums">{attemptsCount}</span>
            </div>

            <div className="flex items-center gap-2">
              {evaluation && (
                <button
                  type="button"
                  onClick={clearCurrentResult}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>مسح النتيجة</span>
                </button>
              )}

              <button
                type="button"
                disabled={recordingState === 'recording'}
                onClick={handleNextWord}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                <span>الكلمة التالية</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
