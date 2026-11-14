import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trees,
  Timer,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Flame,
  Play,
  Layers
} from 'lucide-react';
import { UNILITERAL_HIEROGLYPHS } from '../../data/hieroglyphsData';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';

type GameState = 'TITLE_MENU' | 'PREVIEWING' | 'PLAYING' | 'VICTORY' | 'GAME_OVER';
type GridPresetId = '4x3' | '4x4' | '5x4';
type PlayMode = 'memory_flip' | 'open_matrix';

interface GridPreset {
  id: GridPresetId;
  labelAr: string;
  pairsCount: number;
  timeSeconds: number;
  colsClass: string;
}

const GRID_PRESETS: Record<GridPresetId, GridPreset> = {
  '4x3': {
    id: '4x3',
    labelAr: 'مصفوفة 4×3 (6 أزواج · 60 ث)',
    pairsCount: 6,
    timeSeconds: 60,
    colsClass: 'grid-cols-3 sm:grid-cols-4'
  },
  '4x4': {
    id: '4x4',
    labelAr: 'مصفوفة 4×4 (8 أزواج · 75 ث)',
    pairsCount: 8,
    timeSeconds: 75,
    colsClass: 'grid-cols-4'
  },
  '5x4': {
    id: '5x4',
    labelAr: 'مصفوفة 5×4 (10 أزواج · 90 ث)',
    pairsCount: 10,
    timeSeconds: 90,
    colsClass: 'grid-cols-4 sm:grid-cols-5'
  }
};

interface MatrixTile {
  uid: string;
  pairId: string;
  kind: 'glyph' | 'phonetic';
  glyphChar: string;
  gardiner: string;
  arabicLetter: string;
  arabicSound: string;
  transliteration: string;
  pronunciationSpeech: string;
  isMatched: boolean;
}

export const LostSymbolsForestGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [presetId, setPresetId] = useState<GridPresetId>('4x3');
  const [playMode, setPlayMode] = useState<PlayMode>('memory_flip');
  const [speakOnTap, setSpeakOnTap] = useState<boolean>(true);

  const [tiles, setTiles] = useState<MatrixTile[]>([]);
  const [selectedTileIds, setSelectedTileIds] = useState<string[]>([]);
  const [mismatchTileIds, setMismatchTileIds] = useState<string[]>([]);
  const [hintTileIds, setHintTileIds] = useState<string[]>([]);
  const [hintsLeft, setHintsLeft] = useState<number>(2);

  const [previewSeconds, setPreviewSeconds] = useState<number>(4);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    () => studentProgress.getProgress().gameHighScores.lostSymbolsForest || 0
  );

  const timersRef = useRef<number[]>([]);

  const clearScheduledTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearScheduledTimers();
    };
  }, []);

  const preset = GRID_PRESETS[presetId];

  const startRound = (targetPresetId: GridPresetId = presetId, targetMode: PlayMode = playMode) => {
    clearScheduledTimers();
    const cfg = GRID_PRESETS[targetPresetId];
    const pickedSigns = [...UNILITERAL_HIEROGLYPHS]
      .sort(() => Math.random() - 0.5)
      .slice(0, cfg.pairsCount);

    const deck: MatrixTile[] = [];
    pickedSigns.forEach((sign) => {
      deck.push({
        uid: `glyph-${sign.id}`,
        pairId: sign.id,
        kind: 'glyph',
        glyphChar: sign.char,
        gardiner: sign.gardiner,
        arabicLetter: sign.arabicLetter,
        arabicSound: sign.arabicSound,
        transliteration: sign.transliteration.split(' ')[0],
        pronunciationSpeech: sign.soundPronunciation,
        isMatched: false
      });
      deck.push({
        uid: `phon-${sign.id}`,
        pairId: sign.id,
        kind: 'phonetic',
        glyphChar: sign.char,
        gardiner: sign.gardiner,
        arabicLetter: sign.arabicLetter,
        arabicSound: sign.arabicSound,
        transliteration: sign.transliteration.split(' ')[0],
        pronunciationSpeech: sign.soundPronunciation,
        isMatched: false
      });
    });

    setTiles(deck.sort(() => Math.random() - 0.5));
    setSelectedTileIds([]);
    setMismatchTileIds([]);
    setHintTileIds([]);
    setHintsLeft(2);
    setTimeLeft(cfg.timeSeconds);
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setMatchedPairsCount(0);

    if (targetMode === 'memory_flip') {
      setPreviewSeconds(4);
      setGameState('PREVIEWING');
      soundFX.playSistrumShake();
    } else {
      setGameState('PLAYING');
      soundFX.playPapyrusRustle();
    }
  };

  // Preview countdown (Memory Flip mode)
  useEffect(() => {
    if (gameState !== 'PREVIEWING') return;
    if (previewSeconds <= 0) {
      setGameState('PLAYING');
      soundFX.playPapyrusRustle();
      return;
    }
    const id = window.setTimeout(() => {
      setPreviewSeconds((s) => s - 1);
    }, 1000);
    return () => window.clearTimeout(id);
  }, [gameState, previewSeconds]);

  // Active Game Countdown Timer
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearScheduledTimers();
          setGameState('GAME_OVER');
          soundFX.playTempleRumble();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [gameState]);

  const handleTileClick = (tile: MatrixTile) => {
    if (gameState !== 'PLAYING') return;
    if (tile.isMatched) return;
    if (mismatchTileIds.length > 0) return;
    if (selectedTileIds.includes(tile.uid)) return;
    if (selectedTileIds.length >= 2) return;

    if (speakOnTap) {
      soundFX.speakArabic(tile.pronunciationSpeech, 1.0);
    } else {
      soundFX.playClickSound();
    }

    const nextSelected = [...selectedTileIds, tile.uid];
    setSelectedTileIds(nextSelected);

    if (nextSelected.length === 2) {
      setAttempts((a) => a + 1);
      const first = tiles.find((t) => t.uid === nextSelected[0]);
      const second = tiles.find((t) => t.uid === nextSelected[1]);
      if (!first || !second) return;

      if (first.pairId === second.pairId) {
        // Phonetic Pair Match!
        soundFX.playSuccessSound();
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        const pairPoints = 30 + (nextStreak >= 2 ? nextStreak * 10 : 0);
        const updatedScore = score + pairPoints;
        setScore(updatedScore);

        const nextTiles = tiles.map((t) =>
          t.pairId === first.pairId ? { ...t, isMatched: true } : t
        );
        setTiles(nextTiles);
        setSelectedTileIds([]);
        setHintTileIds([]);

        const nextMatchedCount = matchedPairsCount + 1;
        setMatchedPairsCount(nextMatchedCount);

        if (nextMatchedCount >= preset.pairsCount) {
          const timeBonus = timeLeft * 4;
          const finalTotal = updatedScore + timeBonus;
          setScore(finalTotal);
          setGameState('VICTORY');
          studentProgress.recordGameScore('lostSymbolsForest', finalTotal);
          setBestScore((prev) => Math.max(prev, finalTotal));
          confetti({ particleCount: 95, spread: 75, origin: { y: 0.55 } });
        }
      } else {
        // Mismatch: brief highlight before resetting
        setStreak(0);
        setMismatchTileIds(nextSelected);
        const tId = window.setTimeout(() => {
          setSelectedTileIds([]);
          setMismatchTileIds([]);
        }, 650);
        timersRef.current.push(tId);
      }
    }
  };

  const handleUseForestHint = () => {
    if (gameState !== 'PLAYING' || hintsLeft <= 0) return;
    const unmatchedTile = tiles.find((t) => !t.isMatched);
    if (!unmatchedTile) return;
    const pairIds = tiles
      .filter((t) => t.pairId === unmatchedTile.pairId)
      .map((t) => t.uid);

    setHintsLeft((h) => h - 1);
    setHintTileIds(pairIds);
    soundFX.playSistrumShake();

    const tId = window.setTimeout(() => {
      setHintTileIds([]);
    }, 1600);
    timersRef.current.push(tId);
  };

  const isCriticalTime = gameState === 'PLAYING' && timeLeft <= 15;

  return (
    <section
      className="rounded-3xl bg-white border border-[#E8DFC9] p-6 sm:p-8 space-y-6 shadow-sm text-right"
      dir="rtl"
    >
      {/* Top Game Title & HUD Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-stone-100">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
            <Trees className="w-4 h-4 text-emerald-700" />
            <span>مصفوفة الذاكرة البصرية والصوتية</span>
            <span aria-hidden="true" className="text-emerald-400">·</span>
            <span>تحدي الزمن</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
            غابة الرموز التائهة
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            ابحث في المصفوفة الشبكية عن كل رمز هيروغليفي وزوجه الصوتي المطابق له (مثل 𓅓 مع الصوت «ميم») قبل نفاد الوقت.
          </p>
        </div>

        {/* Unobtrusive Live Metrics Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-[#FAF7F0] px-4 py-3 rounded-2xl border border-[#E8DFC9]">
          <div className="flex items-center gap-1.5">
            <Timer
              className={`w-4 h-4 ${isCriticalTime ? 'text-rose-600' : 'text-amber-800'}`}
            />
            <span
              className={`font-mono text-base font-extrabold tabular-nums ${
                isCriticalTime ? 'text-rose-700' : 'text-stone-900'
              }`}
            >
              {timeLeft} ث
            </span>
            {isCriticalTime && (
              <span className="text-[11px] font-bold text-rose-700 inline-flex items-center gap-0.5">
                <AlertTriangle className="w-3 h-3" />
                <span>وقت حرج</span>
              </span>
            )}
          </div>

          <span className="text-stone-300">|</span>

          <div className="text-xs font-bold text-stone-700">
            الأزواج:{' '}
            <span className="font-mono text-sm text-emerald-800 tabular-nums">
              {matchedPairsCount} / {preset.pairsCount}
            </span>
          </div>

          <span className="text-stone-300">|</span>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="font-mono tabular-nums">×{streak}</span>
          </div>

          <span className="text-stone-300">|</span>

          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-base tabular-nums text-amber-900">{score}</span>
          </div>
        </div>
      </div>

      {/* Controls Row (Difficulty, Visual Mode, Sound Toggle, Hint) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F0]/70 p-3.5 rounded-2xl border border-[#E8DFC9]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Matrix Size Presets */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-stone-200 gap-1">
            {(Object.keys(GRID_PRESETS) as GridPresetId[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setPresetId(key);
                  if (gameState !== 'TITLE_MENU') {
                    startRound(key, playMode);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  presetId === key
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {GRID_PRESETS[key].labelAr}
              </button>
            ))}
          </div>

          {/* Visual Memory Mode Selector */}
          <div className="inline-flex p-1 bg-white rounded-xl border border-stone-200 gap-1">
            <button
              type="button"
              onClick={() => {
                setPlayMode('memory_flip');
                if (gameState !== 'TITLE_MENU') {
                  startRound(presetId, 'memory_flip');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                playMode === 'memory_flip'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ذاكرة مقلوبة (لمحة 4 ث)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlayMode('open_matrix');
                if (gameState !== 'TITLE_MENU') {
                  startRound(presetId, 'open_matrix');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                playMode === 'open_matrix'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>مصفوفة مكشوفة</span>
            </button>
          </div>
        </div>

        {/* Utility Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSpeakOnTap((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              speakOnTap
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-stone-200 text-stone-600'
            }`}
          >
            {speakOnTap ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{speakOnTap ? 'نطق الرمز مفعّل' : 'نطق صامت'}</span>
          </button>

          {gameState === 'PLAYING' && (
            <button
              type="button"
              disabled={hintsLeft <= 0}
              onClick={handleUseForestHint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold disabled:opacity-45 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-amber-800" />
              <span>كشاف الغابة ({hintsLeft})</span>
            </button>
          )}

          {gameState !== 'TITLE_MENU' && (
            <button
              type="button"
              onClick={() => startRound(presetId, playMode)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>جولة جديدة</span>
            </button>
          )}
        </div>
      </div>

      {/* GAME STATE: TITLE MENU */}
      {gameState === 'TITLE_MENU' && (
        <div className="rounded-3xl bg-gradient-to-br from-[#133829] via-[#194633] to-[#0D271D] text-amber-50 p-8 sm:p-10 text-center space-y-6 border border-emerald-900">
          <div className="font-hieroglyphs text-6xl text-amber-300 tracking-widest select-none">
            𓆰 𓅓 𓂋 𓈖 𓆭
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h4 className="text-2xl sm:text-3xl font-extrabold font-display-eg text-white">
              أهلاً بك في غابة الرموز التائهة
            </h4>
            <p className="text-sm text-emerald-100/90 leading-relaxed font-serif-ar">
              تحدّى ذاكرتك البصرية! تضيء المصفوفة لأربع ثوانٍ كي تحفظ مواقع الرموز الهيروغليفية وأصواتها، ثم تنطوي أوراق الغابة ليبدأ السباق مع الزمن لجمع كل زوج متطابق.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-right">
            <div className="rounded-2xl bg-white/10 border border-white/15 p-4 space-y-1">
              <div className="text-xs font-bold text-amber-300">1. احفظ المواقع</div>
              <p className="text-xs text-emerald-100">
                في نمط الذاكرة المقلوبة، تظل المصفوفة مكشوفة 4 ثوانٍ لتثبيت أماكن الأزواج.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-4 space-y-1">
              <div className="text-xs font-bold text-amber-300">2. طابق الرمز بصوته</div>
              <p className="text-xs text-emerald-100">
                انقر على بطاقة الرمز الهيروغليفي ثم بطاقة الصوت العربي المطابق له.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/15 p-4 space-y-1">
              <div className="text-xs font-bold text-amber-300">3. اكسب مكافأة السرعة</div>
              <p className="text-xs text-emerald-100">
                أعلى رقم قياسي لك: <span className="font-mono tabular-nums font-bold text-white">{bestScore}</span> نقطة.
              </p>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => startRound(presetId, playMode)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-base font-extrabold shadow-md transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ابدأ تحدي الغابة الآن</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME STATE: PREVIEWING OR PLAYING */}
      {(gameState === 'PREVIEWING' || gameState === 'PLAYING') && (
        <div className="space-y-4">
          {gameState === 'PREVIEWING' ? (
            <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-amber-950">
                <Eye className="w-5 h-5 text-amber-700" />
                <span>احفظ أماكن الرموز والأصوات في المصفوفة! ستنغلق البطاقات خلال:</span>
              </div>
              <div className="font-mono text-xl font-black tabular-nums text-amber-900 bg-white px-4 py-1.5 rounded-xl border border-amber-300">
                {previewSeconds} ث
              </div>
            </div>
          ) : (
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isCriticalTime ? 'bg-rose-600' : 'bg-emerald-700'
                }`}
                style={{ width: `${(timeLeft / preset.timeSeconds) * 100}%` }}
              />
            </div>
          )}

          {/* Matrix Grid Arena */}
          <div className="p-4 sm:p-6 rounded-3xl bg-[#143628] border border-emerald-950 shadow-inner">
            <div className={`grid gap-3 ${preset.colsClass}`}>
              {tiles.map((tile) => {
                const isSelected = selectedTileIds.includes(tile.uid);
                const isMismatch = mismatchTileIds.includes(tile.uid);
                const isHinted = hintTileIds.includes(tile.uid);
                const isRevealed =
                  playMode === 'open_matrix' ||
                  gameState === 'PREVIEWING' ||
                  tile.isMatched ||
                  isSelected ||
                  isMismatch ||
                  isHinted;

                return (
                  <button
                    key={tile.uid}
                    type="button"
                    disabled={gameState !== 'PLAYING' || tile.isMatched}
                    onClick={() => handleTileClick(tile)}
                    className={`h-24 sm:h-28 rounded-2xl border-2 p-2.5 transition-all duration-200 flex flex-col items-center justify-center text-center select-none ${
                      tile.isMatched
                        ? 'bg-emerald-50/90 border-emerald-400 opacity-65'
                        : isMismatch
                        ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300'
                        : isHinted
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-[1.03]'
                        : isSelected
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 scale-[1.02]'
                        : isRevealed
                        ? 'bg-[#FAF7F0] hover:bg-white border-[#E8DFC9] hover:border-amber-400 shadow-xs cursor-pointer'
                        : 'bg-[#1D4B37] hover:bg-[#235941] border-emerald-700/70 hover:border-amber-400 cursor-pointer shadow-xs'
                    }`}
                  >
                    {isRevealed ? (
                      tile.kind === 'glyph' ? (
                        <div className="space-y-1">
                          <span className="font-hieroglyphs text-4xl sm:text-5xl text-stone-900 leading-none block">
                            {tile.glyphChar}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 block">
                            {tile.gardiner}
                          </span>
                          {tile.isMatched && (
                            <span className="text-[10px] font-bold text-emerald-800 inline-flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>متطابق</span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-xl sm:text-2xl font-extrabold text-amber-900 block leading-none">
                            {tile.arabicLetter}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold text-stone-800 block leading-tight">
                            {tile.arabicSound.split('(')[0].trim()}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 block">
                            /{tile.transliteration}/
                          </span>
                        </div>
                      )
                    ) : (
                      <div className="space-y-1 text-amber-300/80">
                        <span className="font-hieroglyphs text-2xl sm:text-3xl block leading-none">
                          𓆭
                        </span>
                        <span className="text-[10px] font-bold text-emerald-100/80 block">
                          رمز خفي
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME STATE: VICTORY */}
      {gameState === 'VICTORY' && (
        <div className="rounded-3xl bg-emerald-50 border border-emerald-300 p-8 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto text-3xl font-hieroglyphs shadow-sm">
            𓋹
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>اكتملت مصفوفة غابة الرموز بنجاح!</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              بطل الذاكرة الصوتية في الغابة المقدسة
            </h4>
            <p className="text-sm text-stone-700">
              طابقت جميع الأزواج ({preset.pairsCount} أزواج) في {attempts} محاولة مع بقاء {timeLeft} ثانية!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            <div className="rounded-2xl bg-white border border-emerald-200 p-4">
              <div className="text-xs text-stone-500 font-bold">النتيجة النهائية</div>
              <div className="text-3xl font-black text-emerald-800 font-mono tabular-nums mt-1">
                {score}
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-emerald-200 p-4">
              <div className="text-xs text-stone-500 font-bold">الوقت المتبقي</div>
              <div className="text-3xl font-black text-amber-900 font-mono tabular-nums mt-1">
                {timeLeft} ث
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-emerald-200 p-4">
              <div className="text-xs text-stone-500 font-bold">أعلى رقم قياسي</div>
              <div className="text-3xl font-black text-stone-900 font-mono tabular-nums mt-1">
                {bestScore}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startRound(presetId, playMode)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>العب جولة جديدة</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME STATE: GAME OVER */}
      {gameState === 'GAME_OVER' && (
        <div className="rounded-3xl bg-rose-50 border border-rose-300 p-8 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-rose-700 text-white flex items-center justify-center mx-auto text-3xl font-hieroglyphs shadow-sm">
            𓂜
          </div>
          <div className="space-y-1.5">
            <h4 className="text-2xl font-extrabold text-stone-900 font-display-eg">
              انتهى الوقت داخل غابة الرموز!
            </h4>
            <p className="text-sm text-stone-700">
              تمكنت من مطابقة <span className="font-mono font-bold tabular-nums">{matchedPairsCount}</span> من أصل{' '}
              <span className="font-mono font-bold tabular-nums">{preset.pairsCount}</span> أزواج وحصدت{' '}
              <span className="font-mono font-bold tabular-nums">{score}</span> نقطة.
            </p>
          </div>

          <button
            type="button"
            onClick={() => startRound(presetId, playMode)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-sm font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>حاول مرة أخرى</span>
          </button>
        </div>
      )}
    </section>
  );
};
