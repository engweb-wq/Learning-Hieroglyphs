import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Eye,
  Blocks,
  BookOpenCheck,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Sparkles,
  Flame,
  HelpCircle,
  ArrowLeft,
  UserCheck,
  GraduationCap,
  Play
} from 'lucide-react';
import {
  GameAudienceTier,
  SYMBOL_RECOGNITION_QUESTIONS,
  WORD_BUILDING_PUZZLES,
  MEANING_CHALLENGE_QUESTIONS
} from '../../data/threeCoreGamesData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

type CoreGameId = 'symbol_recognition' | 'word_building' | 'meaning_understanding';
type GameScreenState = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface PlacedTile {
  id: string;
  glyph: string;
  labelAr: string;
  soundAr: string;
}

export const ThreeCoreGamesAcademy: React.FC = () => {
  const [audienceTier, setAudienceTier] = useState<GameAudienceTier>('kids');
  const [activeGame, setActiveGame] = useState<CoreGameId>('symbol_recognition');

  // ==========================================================
  // GAME 1: SYMBOL RECOGNITION STATE (التعرف على الرموز)
  // ==========================================================
  const [symState, setSymState] = useState<GameScreenState>('TITLE_MENU');
  const [symIdx, setSymIdx] = useState(0);
  const [symScore, setSymScore] = useState(0);
  const [symStreak, setSymStreak] = useState(0);
  const [symCorrectCount, setSymCorrectCount] = useState(0);
  const [symSelectedOpt, setSymSelectedOpt] = useState<string | null>(null);
  const [symFeedback, setSymFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [symShowClue, setSymShowClue] = useState(false);

  const symQuestions = SYMBOL_RECOGNITION_QUESTIONS.filter((q) => q.tier === audienceTier);
  const currentSymQ = symQuestions[symIdx];

  // ==========================================================
  // GAME 2: WORD BUILDING STATE (بناء الكلمات)
  // ==========================================================
  const [wbState, setWbState] = useState<GameScreenState>('TITLE_MENU');
  const [wbIdx, setWbIdx] = useState(0);
  const [wbPlaced, setWbPlaced] = useState<PlacedTile[]>([]);
  const [wbScore, setWbScore] = useState(0);
  const [wbCorrectCount, setWbCorrectCount] = useState(0);
  const [wbFeedback, setWbFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [wbSlotErrors, setWbSlotErrors] = useState<boolean[]>([]);
  const [wbShowHint, setWbShowHint] = useState(false);

  const wbPuzzles = WORD_BUILDING_PUZZLES.filter((p) => p.tier === audienceTier);
  const currentWbPuzzle = wbPuzzles[wbIdx];

  // ==========================================================
  // GAME 3: MEANING UNDERSTANDING STATE (فهم المعاني الأساسية)
  // ==========================================================
  const [mnState, setMnState] = useState<GameScreenState>('TITLE_MENU');
  const [mnIdx, setMnIdx] = useState(0);
  const [mnScore, setMnScore] = useState(0);
  const [mnStreak, setMnStreak] = useState(0);
  const [mnCorrectCount, setMnCorrectCount] = useState(0);
  const [mnSelectedOpt, setMnSelectedOpt] = useState<string | null>(null);
  const [mnFeedback, setMnFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const mnQuestions = MEANING_CHALLENGE_QUESTIONS.filter((q) => q.tier === audienceTier);
  const currentMnQ = mnQuestions[mnIdx];

  // Reset active games cleanly when switching audience tier (Kids vs Adults)
  useEffect(() => {
    scribeAudio.stop();
    setSymState('TITLE_MENU');
    setSymIdx(0);
    setSymScore(0);
    setSymStreak(0);
    setSymCorrectCount(0);
    setSymSelectedOpt(null);
    setSymFeedback('idle');
    setSymShowClue(false);

    setWbState('TITLE_MENU');
    setWbIdx(0);
    setWbPlaced([]);
    setWbScore(0);
    setWbCorrectCount(0);
    setWbFeedback('idle');
    setWbSlotErrors([]);
    setWbShowHint(false);

    setMnState('TITLE_MENU');
    setMnIdx(0);
    setMnScore(0);
    setMnStreak(0);
    setMnCorrectCount(0);
    setMnSelectedOpt(null);
    setMnFeedback('idle');
  }, [audienceTier]);

  useEffect(() => {
    return () => {
      scribeAudio.stop();
    };
  }, []);

  // ==========================================================
  // GAME 1 HANDLERS
  // ==========================================================
  const startSymGame = () => {
    soundFX.playAncientChime(540);
    setSymIdx(0);
    setSymScore(0);
    setSymStreak(0);
    setSymCorrectCount(0);
    setSymSelectedOpt(null);
    setSymFeedback('idle');
    setSymShowClue(false);
    setSymState('PLAYING');
  };

  const handleSymAnswer = (opt: { id: string; isCorrect: boolean }) => {
    if (symFeedback !== 'idle' || !currentSymQ) return;
    setSymSelectedOpt(opt.id);

    if (opt.isCorrect) {
      soundFX.playSuccessSound();
      const nextStreak = symStreak + 1;
      const pts = (audienceTier === 'kids' ? 20 : 30) + (nextStreak >= 3 ? 10 : 0);
      setSymScore((s) => s + pts);
      setSymStreak(nextStreak);
      setSymCorrectCount((c) => c + 1);
      setSymFeedback('correct');
      if (nextStreak >= 3) {
        confetti({ particleCount: 40, spread: 55, origin: { y: 0.65 } });
      }
    } else {
      soundFX.playClickSound();
      setSymStreak(0);
      setSymFeedback('wrong');
    }
  };

  const nextSymQuestion = () => {
    soundFX.playClickSound();
    if (symIdx + 1 < symQuestions.length) {
      setSymIdx((i) => i + 1);
      setSymSelectedOpt(null);
      setSymFeedback('idle');
      setSymShowClue(false);
    } else {
      setSymState('ROUND_SUMMARY');
      studentProgress.recordGameScore('symbolRecognition', symScore);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 } });
    }
  };

  // ==========================================================
  // GAME 2 HANDLERS
  // ==========================================================
  const startWbGame = () => {
    soundFX.playAncientChime(520);
    setWbIdx(0);
    setWbPlaced([]);
    setWbScore(0);
    setWbCorrectCount(0);
    setWbFeedback('idle');
    setWbSlotErrors([]);
    setWbShowHint(false);
    setWbState('PLAYING');
  };

  const handlePlaceTile = (tile: PlacedTile) => {
    if (wbFeedback === 'correct' || !currentWbPuzzle) return;
    if (wbPlaced.length >= currentWbPuzzle.slots.length) return;
    if (wbPlaced.some((t) => t.id === tile.id)) return;

    soundFX.playClickSound();
    const nextPlaced = [...wbPlaced, tile];
    setWbPlaced(nextPlaced);
    setWbFeedback('idle');
    setWbSlotErrors([]);

    // Auto-check immediately when all target slots are filled
    if (nextPlaced.length === currentWbPuzzle.slots.length) {
      const slotChecks = currentWbPuzzle.slots.map((slot, i) => nextPlaced[i]?.glyph === slot.glyph);
      const isAllCorrect = slotChecks.every(Boolean);

      if (isAllCorrect) {
        soundFX.playSuccessSound();
        setWbFeedback('correct');
        setWbSlotErrors([]);
        setWbScore((s) => s + (audienceTier === 'kids' ? 30 : 40));
        setWbCorrectCount((c) => c + 1);
        confetti({ particleCount: 55, spread: 60, origin: { y: 0.6 } });
        scribeAudio.speakText(
          `${currentWbPuzzle.targetPronunciationAr}.. وتعني ${currentWbPuzzle.targetMeaningAr}`
        );
      } else {
        soundFX.playTempleRumble();
        setWbFeedback('wrong');
        setWbSlotErrors(slotChecks.map((ok) => !ok));
      }
    }
  };

  const handleRemovePlacedTile = (indexToRemove: number) => {
    if (wbFeedback === 'correct') return;
    soundFX.playClickSound();
    setWbPlaced((prev) => prev.filter((_, i) => i !== indexToRemove));
    setWbFeedback('idle');
    setWbSlotErrors([]);
  };

  const nextWbPuzzle = () => {
    soundFX.playClickSound();
    if (wbIdx + 1 < wbPuzzles.length) {
      setWbIdx((i) => i + 1);
      setWbPlaced([]);
      setWbFeedback('idle');
      setWbSlotErrors([]);
      setWbShowHint(false);
    } else {
      setWbState('ROUND_SUMMARY');
      studentProgress.recordGameScore('wordAssembly', wbScore);
      confetti({ particleCount: 95, spread: 75, origin: { y: 0.55 } });
    }
  };

  // ==========================================================
  // GAME 3 HANDLERS
  // ==========================================================
  const startMnGame = () => {
    soundFX.playAncientChime(500);
    setMnIdx(0);
    setMnScore(0);
    setMnStreak(0);
    setMnCorrectCount(0);
    setMnSelectedOpt(null);
    setMnFeedback('idle');
    setMnState('PLAYING');
  };

  const handleMnAnswer = (opt: { id: string; isCorrect: boolean }) => {
    if (mnFeedback !== 'idle' || !currentMnQ) return;
    setMnSelectedOpt(opt.id);

    if (opt.isCorrect) {
      soundFX.playSuccessSound();
      const nextStreak = mnStreak + 1;
      const pts = (audienceTier === 'kids' ? 25 : 35) + (nextStreak >= 3 ? 15 : 0);
      setMnScore((s) => s + pts);
      setMnStreak(nextStreak);
      setMnCorrectCount((c) => c + 1);
      setMnFeedback('correct');
      if (nextStreak >= 3) {
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.65 } });
      }
    } else {
      soundFX.playClickSound();
      setMnStreak(0);
      setMnFeedback('wrong');
    }
  };

  const nextMnQuestion = () => {
    soundFX.playClickSound();
    if (mnIdx + 1 < mnQuestions.length) {
      setMnIdx((i) => i + 1);
      setMnSelectedOpt(null);
      setMnFeedback('idle');
    } else {
      setMnState('ROUND_SUMMARY');
      studentProgress.recordGameScore('meaningDecoder', mnScore);
      confetti({ particleCount: 95, spread: 75, origin: { y: 0.55 } });
    }
  };

  return (
    <div className="space-y-6 text-right">
      {/* Unified Header + Kids / Adults Tier Switcher + 3 Games Tabs */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-2">
              <span>أكاديمية الألعاب التفاعلية</span>
              <span aria-hidden="true">·</span>
              <span>للمبتدئين الصغار والدارسين الكبار</span>
            </div>
            <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg text-balance">
              الألعاب التعليمية الثلاث لتعلم الهيروغليفية
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
              اختر مستواك (صغار أو كبار) ثم تنقّل بين الألعاب الثلاث: التعرف على الرموز، بناء الكلمات، وفهم المعاني الأساسية مع تغذية راجعة فورية.
            </p>
          </div>

          {/* Audience Level Toggle: Kids vs Adults */}
          <div className="flex flex-col items-start lg:items-end gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-stone-500">الفئة العمرية والمستوى التعليمي:</span>
            <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setAudienceTier('kids');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  audienceTier === 'kids'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>مسار الصغار (مبسط)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setAudienceTier('adults');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  audienceTier === 'adults'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>مسار الكبار (أكاديمي)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Game Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => {
              soundFX.playClickSound();
              setActiveGame('symbol_recognition');
            }}
            className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 ${
              activeGame === 'symbol_recognition'
                ? 'bg-[#FAF5E8] border-amber-700 shadow-xs'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeGame === 'symbol_recognition'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-stone-200 text-amber-800'
              }`}
            >
              <Eye className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-amber-800">اللعبة 01 · صياد الرموز</div>
              <div className="text-sm font-extrabold text-stone-900 mt-0.5">التعرف على الرموز</div>
              <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                {audienceTier === 'kids' ? 'طابق الأشكال بالأصوات والصور' : 'رموز جاردنر والأصوات الحلقية'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClickSound();
              setActiveGame('word_building');
            }}
            className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 ${
              activeGame === 'word_building'
                ? 'bg-[#FAF5E8] border-amber-700 shadow-xs'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeGame === 'word_building'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-stone-200 text-amber-800'
              }`}
            >
              <Blocks className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-amber-800">اللعبة 02 · ورشة الكاتب</div>
              <div className="text-sm font-extrabold text-stone-900 mt-0.5">بناء الكلمات الهيروغليفية</div>
              <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                {audienceTier === 'kids' ? 'ركّب الحروف والمخصصات خطوة بخطوة' : 'الثنائيات والمتممات الصوتية والمخصص'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClickSound();
              setActiveGame('meaning_understanding');
            }}
            className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 ${
              activeGame === 'meaning_understanding'
                ? 'bg-[#FAF5E8] border-amber-700 shadow-xs'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                activeGame === 'meaning_understanding'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-stone-200 text-amber-800'
              }`}
            >
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-amber-800">اللعبة 03 · فك الدلالة</div>
              <div className="text-sm font-extrabold text-stone-900 mt-0.5">فهم المعاني الأساسية</div>
              <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                {audienceTier === 'kids' ? 'اكتشف معاني الجمل اليومية والتحايا' : 'التقديم الشرفي والصيغ الملكية'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* =================================================================
          GAME 1 STAGE: SYMBOL RECOGNITION (التعرف على الرموز)
         ================================================================= */}
      {activeGame === 'symbol_recognition' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-6">
          {symState === 'TITLE_MENU' && (
            <div className="py-6 max-w-xl mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF5E8] border border-amber-300 text-4xl font-hieroglyphs text-amber-900 flex items-center justify-center mx-auto">
                𓅓
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800">
                  اللعبة 01 · {audienceTier === 'kids' ? 'مستوى الصغار' : 'مستوى الكبار'}
                </div>
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  صيّاد الرموز الهيروغليفية
                </h4>
                <p className="text-sm text-stone-600 font-serif-ar leading-relaxed">
                  {audienceTier === 'kids'
                    ? 'تعرّف على الطيور والحيوانات وأدوات الحياة المصرية القديمة واربط كل شكل بالصوت والحرف الصحيح مع تلميحات سمعية وبصرية ممتعة.'
                    : 'اختبر مهارتك الأكاديمية في تمييز رموز قائمة جاردنر، القيم الصوتية الأحادية والثنائية، ووظيفة المخصّصات التصنيفية في النصوص الكلاسيكية.'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-stone-600">
                <span>عدد الأسئلة: <strong className="font-mono text-stone-900 tabular-nums">{symQuestions.length}</strong></span>
                <span aria-hidden="true">·</span>
                <span>تغذية راجعة فورية لكل إجابة</span>
              </div>
              <button
                type="button"
                onClick={startSymGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow-sm"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ اللعبة الآن</span>
              </button>
            </div>
          )}

          {symState === 'PLAYING' && currentSymQ && (
            <div className="space-y-6">
              {/* HUD Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3 text-xs font-bold text-stone-700">
                  <span>
                    الرمز{' '}
                    <span className="font-mono text-amber-900 tabular-nums">
                      {symIdx + 1}/{symQuestions.length}
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{audienceTier === 'kids' ? 'مسار الصغار' : 'مسار الكبار'}</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  {symStreak >= 2 && (
                    <span className="flex items-center gap-1 text-amber-800">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="font-mono tabular-nums">تتالي ×{symStreak}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-stone-900">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>النقاط:</span>
                    <span className="font-mono text-base text-amber-900 tabular-nums">{symScore}</span>
                  </span>
                </div>
              </div>

              {/* Glyph Stage */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col items-center text-center space-y-3">
                <div className="text-xs font-semibold text-stone-500">
                  كود جاردنر: <span className="font-mono text-stone-800">{currentSymQ.gardinerCode}</span>
                </div>
                <div className="text-7xl sm:text-8xl font-hieroglyphs text-stone-900 select-none py-1">
                  {currentSymQ.glyph}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 max-w-xl">
                  {currentSymQ.questionPromptAr}
                </h4>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playAncientChime(560);
                      scribeAudio.speakText(currentSymQ.audioHintScriptAr);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استمع للتلميح الصوتي</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClickSound();
                      setSymShowClue((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>{symShowClue ? 'إخفاء المساعدة' : 'مساعدة ذكية'}</span>
                  </button>
                </div>

                {symShowClue && (
                  <div className="text-xs text-amber-950 bg-white/90 px-4 py-2 rounded-xl border border-amber-200 max-w-lg animate-fadeIn">
                    {currentSymQ.clueAr}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSymQ.options.map((opt) => {
                  const isSelected = symSelectedOpt === opt.id;
                  let optStyle = 'bg-white border-stone-200 hover:border-amber-500 hover:bg-amber-50/30';
                  if (symFeedback !== 'idle') {
                    if (opt.isCorrect) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      optStyle = 'bg-stone-50 border-stone-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={symFeedback !== 'idle'}
                      onClick={() => handleSymAnswer(opt)}
                      className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <div>
                        <div className="text-sm sm:text-base font-bold text-stone-900">{opt.labelAr}</div>
                        {opt.sublabelAr && (
                          <div className="text-xs text-stone-500 mt-0.5">{opt.sublabelAr}</div>
                        )}
                      </div>
                      {symFeedback !== 'idle' && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {symFeedback !== 'idle' && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Banner */}
              {symFeedback !== 'idle' && (
                <div
                  className={`p-5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                    symFeedback === 'correct'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {symFeedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{currentSymQ.feedbackCorrectAr}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>{currentSymQ.feedbackWrongAr}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-serif-ar text-stone-800">
                    {currentSymQ.academicOrFunFactAr}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={nextSymQuestion}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                    >
                      <span>{symIdx + 1 < symQuestions.length ? 'الرمز التالي' : 'عرض النتيجة النهائية'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {symState === 'ROUND_SUMMARY' && (
            <div className="py-8 text-center space-y-5 max-w-md mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center mx-auto text-3xl font-hieroglyphs">
                𓋹
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  أتممت جولة التعرف على الرموز!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  أجبتَ عن{' '}
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    {symCorrectCount}/{symQuestions.length}
                  </span>{' '}
                  رموز بدقة، وحصدت <span className="font-mono font-bold text-amber-900 tabular-nums">{symScore}</span> نقطة.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startSymGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>العب مرة أخرى</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGame('word_building')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <span>انتقل للعبة بناء الكلمات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =================================================================
          GAME 2 STAGE: WORD BUILDING (بناء الكلمات)
         ================================================================= */}
      {activeGame === 'word_building' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-6">
          {wbState === 'TITLE_MENU' && (
            <div className="py-6 max-w-xl mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF5E8] border border-amber-300 text-4xl font-hieroglyphs text-amber-900 flex items-center justify-center mx-auto">
                𓉐
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800">
                  اللعبة 02 · {audienceTier === 'kids' ? 'مستوى الصغار' : 'مستوى الكبار'}
                </div>
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  ورشة بناء الكلمات الهيروغليفية
                </h4>
                <p className="text-sm text-stone-600 font-serif-ar leading-relaxed">
                  {audienceTier === 'kids'
                    ? 'اجمع أحجار الرموز بالترتيب الصحيح لتبني كلمات مثل «بيت» و«ماء» و«شمس» و«قمر»، واسمع نطق الكلمة فور اكتمالها!'
                    : 'ركّب المفردات المصرية الكلاسيكية بوضع العلامة الثنائية أو الثلاثية أولاً ثم المتممات الصوتية والمخصّص التصنيفي مع تشخيص فوري لكل خانة.'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-stone-600">
                <span>عدد الكلمات: <strong className="font-mono text-stone-900 tabular-nums">{wbPuzzles.length}</strong></span>
                <span aria-hidden="true">·</span>
                <span>تحقق فوري خانة بخانة</span>
              </div>
              <button
                type="button"
                onClick={startWbGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow-sm"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ ورشة البناء</span>
              </button>
            </div>
          )}

          {wbState === 'PLAYING' && currentWbPuzzle && (
            <div className="space-y-6">
              {/* HUD */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3 text-xs font-bold text-stone-700">
                  <span>
                    الكلمة{' '}
                    <span className="font-mono text-amber-900 tabular-nums">
                      {wbIdx + 1}/{wbPuzzles.length}
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>عدد الرموز المطلوبة: <span className="font-mono tabular-nums">{currentWbPuzzle.slots.length}</span></span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>النقاط:</span>
                  <span className="font-mono text-base text-amber-900 tabular-nums">{wbScore}</span>
                </div>
              </div>

              {/* Target Meaning Prompt */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-500">المطلوب بناء الكلمة الهيروغليفية لـ:</span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-display-eg">
                    {currentWbPuzzle.targetMeaningAr}
                  </h4>
                  <div className="text-xs text-stone-700">
                    النطق التقريبي:{' '}
                    <span className="font-bold text-amber-900">{currentWbPuzzle.targetPronunciationAr}</span>{' '}
                    <span className="font-mono text-stone-500">({currentWbPuzzle.transliteration})</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playAncientChime(540);
                      scribeAudio.speakText(
                        `ابْنِ كلمة ${currentWbPuzzle.targetMeaningAr}.. نطقها ${currentWbPuzzle.targetPronunciationAr}`
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>اسمع النطق</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClickSound();
                      setWbShowHint((h) => !h);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>{wbShowHint ? 'إخفاء الإرشاد' : 'كيف أرتبها؟'}</span>
                  </button>
                </div>
              </div>

              {wbShowHint && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 animate-fadeIn">
                  {currentWbPuzzle.hintAr}
                </div>
              )}

              {/* Assembly Slots Board */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>خانات التركيب (رتّب من الأول للأخير — انقر على الخانة لإزالة الرمز):</span>
                  {wbPlaced.length > 0 && wbFeedback !== 'correct' && (
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClickSound();
                        setWbPlaced([]);
                        setWbFeedback('idle');
                        setWbSlotErrors([]);
                      }}
                      className="text-xs text-rose-700 hover:underline font-semibold"
                    >
                      تفريغ الخانات
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentWbPuzzle.slots.map((slot, slotIndex) => {
                    const placed = wbPlaced[slotIndex];
                    const hasError = wbFeedback === 'wrong' && wbSlotErrors[slotIndex];
                    const isSlotRight = wbFeedback === 'correct' || (wbFeedback === 'wrong' && !wbSlotErrors[slotIndex]);

                    return (
                      <button
                        key={slotIndex}
                        type="button"
                        disabled={!placed || wbFeedback === 'correct'}
                        onClick={() => placed && handleRemovePlacedTile(slotIndex)}
                        className={`min-h-[112px] p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center ${
                          placed
                            ? wbFeedback === 'correct'
                              ? 'bg-emerald-50 border-emerald-500'
                              : hasError
                              ? 'bg-rose-50 border-rose-500'
                              : isSlotRight && wbFeedback === 'wrong'
                              ? 'bg-emerald-50/70 border-emerald-400'
                              : 'bg-white border-amber-700 hover:border-rose-500 cursor-pointer'
                            : 'bg-stone-50 border-dashed border-stone-300'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-stone-500 mb-1">
                          الخانة <span className="font-mono tabular-nums">{slotIndex + 1}</span>
                        </div>
                        {placed ? (
                          <>
                            <span className="text-4xl font-hieroglyphs text-stone-900 select-none">
                              {placed.glyph}
                            </span>
                            <span className="text-[11px] font-semibold text-stone-700 mt-1">
                              {placed.labelAr} ({placed.soundAr})
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] text-stone-400 px-1">
                            {audienceTier === 'kids' ? `صوت: ${slot.soundAr}` : slot.roleAr}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Available Glyph Tiles Pool */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-700">أحجار الرموز المتاحة:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentWbPuzzle.tilePool.map((tile) => {
                    const isAlreadyPlaced = wbPlaced.some((p) => p.id === tile.id);
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        disabled={isAlreadyPlaced || wbFeedback === 'correct'}
                        onClick={() => handlePlaceTile(tile)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center ${
                          isAlreadyPlaced
                            ? 'bg-stone-100 border-stone-200 opacity-40 cursor-not-allowed'
                            : 'bg-white border-stone-200 hover:border-amber-600 hover:shadow-sm cursor-pointer'
                        }`}
                      >
                        <span className="text-5xl font-hieroglyphs text-stone-900 select-none mb-1">
                          {tile.glyph}
                        </span>
                        <span className="text-xs font-bold text-stone-800">{tile.labelAr}</span>
                        <span className="text-[11px] font-mono text-amber-800 mt-0.5">{tile.soundAr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Immediate Diagnostic Feedback */}
              {wbFeedback === 'wrong' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>الترتيب يحتاج لتعديل في الخانات المظللة بالأحمر — انقر على الرمز الخاطئ لإزالته وإعادة المحاولة!</span>
                  </div>
                  <p className="text-xs text-stone-700">
                    إرشاد: {currentWbPuzzle.hintAr}
                  </p>
                </div>
              )}

              {wbFeedback === 'correct' && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      بناء متقن! ركّبتَ كلمة «{currentWbPuzzle.targetMeaningAr}» بنجاح
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif-ar leading-relaxed text-stone-800">
                    {currentWbPuzzle.successExplanationAr}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={nextWbPuzzle}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                    >
                      <span>{wbIdx + 1 < wbPuzzles.length ? 'الكلمة التالية' : 'إنهاء الورشة وعرض النتيجة'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {wbState === 'ROUND_SUMMARY' && (
            <div className="py-8 text-center space-y-5 max-w-md mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center mx-auto text-3xl font-hieroglyphs">
                𓏞
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  أكملت ورشة بناء الكلمات بنجاح!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  بنيتَ{' '}
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    {wbCorrectCount}/{wbPuzzles.length}
                  </span>{' '}
                  كلمات هيروغليفية كاملة، وحققت{' '}
                  <span className="font-mono font-bold text-amber-900 tabular-nums">{wbScore}</span> نقطة.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startWbGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الورشة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGame('meaning_understanding')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <span>انتقل للعبة فهم المعاني الأساسية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =================================================================
          GAME 3 STAGE: UNDERSTANDING BASIC MEANINGS (فهم المعاني الأساسية)
         ================================================================= */}
      {activeGame === 'meaning_understanding' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-6">
          {mnState === 'TITLE_MENU' && (
            <div className="py-6 max-w-xl mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF5E8] border border-amber-300 text-4xl font-hieroglyphs text-amber-900 flex items-center justify-center mx-auto">
                𓄤
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-800">
                  اللعبة 03 · {audienceTier === 'kids' ? 'مستوى الصغار' : 'مستوى الكبار'}
                </div>
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  تحدي فهم المعاني الأساسية والسياق
                </h4>
                <p className="text-sm text-stone-600 font-serif-ar leading-relaxed">
                  {audienceTier === 'kids'
                    ? 'اقرأ التعبيرات الهيروغليفية اليومية مثل «طيب القلب» و«الأرض المحبوبة» و«في سلام»، واختر معناها الحقيقي مع شرح ممتع لكل عبارة.'
                    : 'حلّل الصيغ التذكارية والألقاب الملكية الشهيرة وقواعد التقديم الشرفي والمثنّى لتستنبط المعنى الكامل للنص الأثري.'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-stone-600">
                <span>عدد الجولات: <strong className="font-mono text-stone-900 tabular-nums">{mnQuestions.length}</strong></span>
                <span aria-hidden="true">·</span>
                <span>شواهد تاريخية وتفسير فوري</span>
              </div>
              <button
                type="button"
                onClick={startMnGame}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow-sm"
              >
                <Play className="w-4 h-4" />
                <span>ابدأ تحدي المعاني</span>
              </button>
            </div>
          )}

          {mnState === 'PLAYING' && currentMnQ && (
            <div className="space-y-6">
              {/* HUD */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3 text-xs font-bold text-stone-700">
                  <span>
                    العبارة{' '}
                    <span className="font-mono text-amber-900 tabular-nums">
                      {mnIdx + 1}/{mnQuestions.length}
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{currentMnQ.categoryLabelAr}</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  {mnStreak >= 2 && (
                    <span className="flex items-center gap-1 text-amber-800">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="font-mono tabular-nums">تتالي ×{mnStreak}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-stone-900">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>النقاط:</span>
                    <span className="font-mono text-base text-amber-900 tabular-nums">{mnScore}</span>
                  </span>
                </div>
              </div>

              {/* Phrase Display Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col items-center text-center space-y-3">
                <div className="text-5xl sm:text-6xl font-hieroglyphs text-stone-900 select-none leading-relaxed">
                  {currentMnQ.hieroglyphs}
                </div>
                <div className="text-sm font-bold text-amber-900">
                  النطق: {currentMnQ.phoneticAr}{' '}
                  <span className="font-mono text-xs text-stone-500">({currentMnQ.transliteration})</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 max-w-xl">
                  {currentMnQ.questionPromptAr}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playAncientChime(520);
                    scribeAudio.speakText(`العبارة الهيروغليفية تُقرأ: ${currentMnQ.phoneticAr}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>استمع للنطق المصري</span>
                </button>
              </div>

              {/* Meaning Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentMnQ.options.map((opt) => {
                  const isSelected = mnSelectedOpt === opt.id;
                  let optStyle = 'bg-white border-stone-200 hover:border-amber-500 hover:bg-amber-50/30';
                  if (mnFeedback !== 'idle') {
                    if (opt.isCorrect) {
                      optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      optStyle = 'bg-stone-50 border-stone-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={mnFeedback !== 'idle'}
                      onClick={() => handleMnAnswer(opt)}
                      className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <span className="text-sm sm:text-base font-bold text-stone-900">{opt.meaningAr}</span>
                      {mnFeedback !== 'idle' && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {mnFeedback !== 'idle' && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Semantic Feedback */}
              {mnFeedback !== 'idle' && (
                <div
                  className={`p-5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                    mnFeedback === 'correct'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {mnFeedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{currentMnQ.immediateFeedbackCorrectAr}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>{currentMnQ.immediateFeedbackWrongAr}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-serif-ar leading-relaxed text-stone-800">
                    {currentMnQ.culturalContextAr}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={nextMnQuestion}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                    >
                      <span>{mnIdx + 1 < mnQuestions.length ? 'العبارة التالية' : 'عرض الحصيلة النهائية'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {mnState === 'ROUND_SUMMARY' && (
            <div className="py-8 text-center space-y-5 max-w-md mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center mx-auto text-3xl font-hieroglyphs">
                𓊵
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                  أتممت تحدي فهم المعاني الأساسية!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  ترجمتَ{' '}
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">
                    {mnCorrectCount}/{mnQuestions.length}
                  </span>{' '}
                  عبارات بدقة، وربحت{' '}
                  <span className="font-mono font-bold text-amber-900 tabular-nums">{mnScore}</span> نقطة.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startMnGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة التحدي</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGame('symbol_recognition')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <span>العودة للعبة الرموز</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
