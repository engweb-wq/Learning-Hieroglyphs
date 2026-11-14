import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, Sparkles, Timer, RotateCcw, CheckCircle2, XCircle, 
  HelpCircle, Zap, Star, ShieldCheck, Flame, Award, ArrowRight, PenTool,
  Heart, Clock, Brain, Volume2, AlertCircle, KeyRound, Landmark, Hammer
} from 'lucide-react';
import { DICTIONARY_50_WORDS } from '../../data/dictionary50Words';
import { UNILITERAL_HIEROGLYPHS } from '../../data/hieroglyphsData';
import { DictionaryWord } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';
import { TempleRunesGame } from './TempleRunesGame';
import { StoneCarvingGame } from './StoneCarvingGame';
import { ThreeCoreGamesAcademy } from './ThreeCoreGamesAcademy';

type ActiveGame = 'core_academy' | 'stone_carving' | 'temple_runes' | 'flash_memory' | 'speed' | 'builder' | 'memory';

// ============================================================
// GAME 4: وضع تحدي الذاكرة الموقوتة (Timed Flash Memory Challenge)
// ============================================================
interface FlashCardQuestion {
  id: string;
  type: 'glyph_to_sound' | 'sound_to_glyph';
  targetWord: DictionaryWord;
  promptText: string;
  promptDisplay: string; // The glyph or the sound shown on the flashcard
  options: {
    id: string;
    display: string;
    isCorrect: boolean;
    sublabel?: string;
  }[];
}

const FlashMemoryGame: React.FC = () => {
  const [level, setLevel] = useState<1 | 2 | 3>(1); // 1 = 6s, 2 = 4.5s, 3 = 3s
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questions, setQuestions] = useState<FlashCardQuestion[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'game_over' | 'victory'>('playing');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong' | 'timeout'>('idle');
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);

  // Time limit based on difficulty level
  const getTimeLimitForLevel = (lvl: 1 | 2 | 3) => {
    switch (lvl) {
      case 1: return 6; // 6 seconds
      case 2: return 4.5; // 4.5 seconds
      case 3: return 3; // 3 seconds (Extreme challenge!)
    }
  };

  // Generate 8 questions tailored for the selected level
  const buildQuestionsForLevel = (lvl: 1 | 2 | 3) => {
    const shuffled = [...DICTIONARY_50_WORDS].sort(() => 0.5 - Math.random()).slice(0, 8);
    const qs: FlashCardQuestion[] = shuffled.map((target, idx) => {
      // Alternate question type: even = identify sound from glyph, odd = identify glyph from sound
      const qType: 'glyph_to_sound' | 'sound_to_glyph' = idx % 2 === 0 ? 'glyph_to_sound' : 'sound_to_glyph';
      
      const optionCount = lvl === 1 ? 3 : 4;
      const otherWords = DICTIONARY_50_WORDS.filter(w => w.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, optionCount - 1);

      if (qType === 'glyph_to_sound') {
        const correctOpt = {
          id: target.id,
          display: `${target.arabicTransliteration} (${target.transliteration})`,
          sublabel: target.arabicMeaning,
          isCorrect: true
        };
        const wrongOpts = otherWords.map(w => ({
          id: w.id,
          display: `${w.arabicTransliteration} (${w.transliteration})`,
          sublabel: w.arabicMeaning,
          isCorrect: false
        }));
        const all = [correctOpt, ...wrongOpts].sort(() => 0.5 - Math.random());

        return {
          id: `q-${idx}`,
          type: qType,
          targetWord: target,
          promptText: 'تذكر النطق الصوتي الصحيح لهذا الرمز الهيروغليفي:',
          promptDisplay: target.hieroglyphs,
          options: all
        };
      } else {
        // Sound to Glyph
        const correctOpt = {
          id: target.id,
          display: target.hieroglyphs,
          sublabel: target.transliteration,
          isCorrect: true
        };
        const wrongOpts = otherWords.map(w => ({
          id: w.id,
          display: w.hieroglyphs,
          sublabel: w.transliteration,
          isCorrect: false
        }));
        const all = [correctOpt, ...wrongOpts].sort(() => 0.5 - Math.random());

        return {
          id: `q-${idx}`,
          type: qType,
          targetWord: target,
          promptText: `تذكر الرمز الهيروغليفي المطابق لـ: ${target.arabicMeaning} (${target.arabicTransliteration})`,
          promptDisplay: `${target.arabicTransliteration} - ${target.arabicMeaning}`,
          options: all
        };
      }
    });

    setQuestions(qs);
    setCurrentQIndex(0);
    setLives(3);
    setScore(0);
    setStreak(0);
    setTimeLeft(getTimeLimitForLevel(lvl));
    setGameState('playing');
    setFeedback('idle');
    setSelectedOptId(null);
  };

  useEffect(() => {
    buildQuestionsForLevel(level);
  }, [level]);

  // Countdown Timer
  useEffect(() => {
    if (gameState !== 'playing' || feedback !== 'idle' || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.5) {
          handleTimeout();
          return 0;
        }
        return Math.max(0, Number((prev - 0.5).toFixed(1)));
      });
    }, 500);

    return () => clearInterval(timer);
  }, [currentQIndex, feedback, gameState, questions, level]);

  const handleTimeout = () => {
    soundFX.playClickSound();
    setFeedback('timeout');
    setStreak(0);
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setTimeout(() => setGameState('game_over'), 1000);
    } else {
      setTimeout(advanceNextCard, 1100);
    }
  };

  const handleSelectOption = (opt: { id: string; display: string; isCorrect: boolean }) => {
    if (feedback !== 'idle' || gameState !== 'playing') return;
    setSelectedOptId(opt.id);

    if (opt.isCorrect) {
      soundFX.playSuccessSound();
      setFeedback('correct');
      const basePoints = level === 1 ? 20 : level === 2 ? 35 : 50;
      const speedBonus = Math.round(timeLeft * 5);
      const comboMultiplier = streak >= 3 ? 2 : 1;
      const totalEarned = (basePoints + speedBonus) * comboMultiplier;

      setScore(s => s + totalEarned);
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Streak combo bonus: earn a life back if lost
      if (newStreak === 4 && lives < 3) {
        setLives(l => Math.min(3, l + 1));
      }

      if (newStreak >= 5) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      setTimeout(advanceNextCard, 900);
    } else {
      soundFX.playClickSound();
      setFeedback('wrong');
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => setGameState('game_over'), 1000);
      } else {
        setTimeout(advanceNextCard, 1100);
      }
    }
  };

  const advanceNextCard = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(i => i + 1);
      setTimeLeft(getTimeLimitForLevel(level));
      setFeedback('idle');
      setSelectedOptId(null);
    } else {
      setGameState('victory');
      studentProgress.recordGameScore('flashMemory', score);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const currentCard = questions[currentQIndex];

  // Play audio pronunciation for the active flashcard
  const handlePlayCurrentCardAudio = () => {
    if (!currentCard) return;
    soundFX.playAncientChime(560);
    scribeAudio.speakText(
      `الرمز الهيروغليفي: ${currentCard.targetWord.arabicTransliteration}.. ومعناه: ${currentCard.targetWord.arabicMeaning}`
    );
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm space-y-6 text-right">
      
      {/* Header and Level Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
            <Brain className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>وضع تحدي الذاكرة الموقوتة</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
            تحدي الذاكرة السريعة للرموز والنطق
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            تظهر لك بطاقة خاطفة؛ استرجع الرمز أو النطق الصحيح في ثوانٍ معدودة قبل نفاد الوقت!
          </p>
        </div>

        {/* Level Buttons */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start sm:self-auto">
          <span className="text-xs font-bold text-stone-600 px-1">المستوى:</span>
          <button
            onClick={() => setLevel(1)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              level === 1 ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            مبتدئ (6 ثوانٍ)
          </button>
          <button
            onClick={() => setLevel(2)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              level === 2 ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            متقدم (4.5 ث)
          </button>
          <button
            onClick={() => setLevel(3)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              level === 3 ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            ناري (3 ث) 🔥
          </button>
        </div>
      </div>

      {/* Lives & Score Bar */}
      <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
        
        {/* Lives Counter (Hearts) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-600">الفرص المتبقية:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(heartIdx => (
              <Heart
                key={heartIdx}
                className={`w-5 h-5 transition-transform ${
                  heartIdx <= lives
                    ? 'text-red-500 fill-red-500 scale-110'
                    : 'text-stone-300 stroke-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timer Bar & Streak */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
            <Clock className={`w-4 h-4 ${timeLeft <= 2 ? 'text-red-600 animate-spin' : 'text-amber-700'}`} />
            <span className={`font-mono text-base font-black tabular-nums ${timeLeft <= 2 ? 'text-red-600' : 'text-stone-900'}`}>
              {timeLeft} ث
            </span>
          </div>

          {streak >= 2 && (
            <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200 animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>تتالي: ×{streak}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-950 px-3.5 py-1.5 rounded-xl border border-amber-300 font-bold text-xs">
            <Trophy className="w-4 h-4 text-amber-700" />
            <span className="font-mono text-base tabular-nums">{score}</span>
          </div>
        </div>

      </div>

      {/* Main Flashcard Stage */}
      {gameState === 'playing' && currentCard ? (
        <div className="space-y-6">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>البطاقة {currentQIndex + 1} من {questions.length}</span>
            <span className="text-amber-800">{currentCard.targetWord.categoryAr}</span>
          </div>

          {/* Time Remaining Visual Bar */}
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                timeLeft <= 2 ? 'bg-red-600' : 'bg-amber-600'
              }`}
              style={{ width: `${(timeLeft / getTimeLimitForLevel(level)) * 100}%` }}
            />
          </div>

          {/* Big Flashcard Box */}
          <div className={`relative p-8 sm:p-10 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 ${
            feedback === 'correct'
              ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200'
              : feedback === 'wrong' || feedback === 'timeout'
              ? 'bg-red-50 border-red-400 ring-4 ring-red-200'
              : 'bg-[#FAF5E8] border-amber-300/80 shadow-md'
          }`}>
            
            <div className="text-xs font-bold text-stone-600">
              {currentCard.promptText}
            </div>

            {/* Display on flashcard */}
            {currentCard.type === 'glyph_to_sound' ? (
              <span className="text-7xl sm:text-8xl font-hieroglyphs text-stone-900 select-none py-2 inline-block">
                {currentCard.promptDisplay}
              </span>
            ) : (
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif-ar py-2 inline-block">
                {currentCard.promptDisplay}
              </span>
            )}

            <button
              onClick={handlePlayCurrentCardAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 hover:bg-white text-stone-700 rounded-lg text-xs font-bold border border-stone-200 transition-colors shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>استمع للتلميح الصوتي</span>
            </button>

            {/* Feedback alert badge */}
            {feedback === 'timeout' && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                انتهى الوقت! ⏳
              </div>
            )}
            {feedback === 'correct' && (
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                إجابة سريعة صحيحة! ✓
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                ذاكرة غير دقيقة! ✗
              </div>
            )}

          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCard.options.map(opt => {
              const isSelected = selectedOptId === opt.id;
              let style = 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/40';

              if (feedback !== 'idle') {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (isSelected) {
                  style = 'bg-red-50 border-red-500 text-red-950 font-bold';
                } else {
                  style = 'bg-stone-50 border-stone-200 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={feedback !== 'idle'}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex items-center justify-between cursor-pointer ${style}`}
                >
                  <div>
                    {currentCard.type === 'glyph_to_sound' ? (
                      <div>
                        <div className="text-base font-bold text-stone-900">{opt.display}</div>
                        {opt.sublabel && <div className="text-xs text-stone-500 mt-0.5">{opt.sublabel}</div>}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-hieroglyphs text-stone-900 select-none">
                          {opt.display}
                        </span>
                        {opt.sublabel && <span className="text-xs font-mono text-stone-500">{opt.sublabel}</span>}
                      </div>
                    )}
                  </div>

                  {feedback !== 'idle' && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {feedback !== 'idle' && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      ) : gameState === 'game_over' ? (
        /* Game Over Screen */
        <div className="text-center py-10 space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-red-100 border border-red-300 text-red-600 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            𓐍
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-stone-900">
              نفدت الفرص! لا تستسلم يا كاتب المستقبل!
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              تحدي الذاكرة يحتاج إلى تركيز خاطف؛ تدرب مجدداً لتتقن استرجاع الرموز في لمح البصر.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-xs mx-auto">
            <div className="text-xs text-stone-500 font-bold">النقاط المحققة</div>
            <div className="text-3xl font-black text-amber-900 font-mono tabular-nums my-1">{score}</div>
          </div>

          <button
            onClick={() => buildQuestionsForLevel(level)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة التحدي من جديد</span>
          </button>
        </div>
      ) : (
        /* Victory Screen */
        <div className="text-center py-10 space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            𓋹
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              نصر أثري رائع! اجتزت تحدي الذاكرة بنجاح! 🏆
            </h4>
            <p className="text-sm text-stone-600">
              ذاكرة بصرية وصوتية خارقة تؤهلك لرتبة حارس مخطوطات دار الحياة الملكية!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-xs mx-auto">
            <div className="text-xs text-stone-500 font-bold">مجموع النقاط النهائي</div>
            <div className="text-4xl font-black text-amber-900 font-mono tabular-nums my-1">{score}</div>
            <div className="text-xs text-emerald-700 font-bold">حافظت على {lives} فرص باقية!</div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => buildQuestionsForLevel(level)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة اللعب في هذا المستوى</span>
            </button>
            {level < 3 && (
              <button
                onClick={() => setLevel(prev => (prev + 1) as 1 | 2 | 3)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>الانتقال للمستوى الأعلى 🔥</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// GAME 1: Scribe Speed Vocabulary Challenge
// ==========================================
interface SpeedQuestion {
  word: DictionaryWord;
  options: { id: string; text: string; isCorrect: boolean }[];
}

const SpeedGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);

  // Generate 10 randomized speed questions
  const generateQuestions = () => {
    const shuffled = [...DICTIONARY_50_WORDS].sort(() => 0.5 - Math.random()).slice(0, 10);
    const qs: SpeedQuestion[] = shuffled.map(w => {
      const others = DICTIONARY_50_WORDS.filter(x => x.id !== w.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const allOpts = [
        { id: w.id, text: `${w.arabicMeaning} (${w.arabicTransliteration})`, isCorrect: true },
        ...others.map(o => ({ id: o.id, text: `${o.arabicMeaning} (${o.arabicTransliteration})`, isCorrect: false }))
      ].sort(() => 0.5 - Math.random());

      return { word: w, options: allOpts };
    });

    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(12);
    setIsGameOver(false);
    setSelectedOptionId(null);
    setAnsweredState('idle');
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isGameOver || answeredState !== 'idle' || questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex, answeredState, isGameOver, questions]);

  const handleTimeout = () => {
    soundFX.playClickSound();
    setAnsweredState('wrong');
    setStreak(0);
    setTimeout(goToNextQuestion, 1200);
  };

  const handleSelectOption = (opt: { id: string; text: string; isCorrect: boolean }) => {
    if (answeredState !== 'idle') return;
    setSelectedOptionId(opt.id);

    if (opt.isCorrect) {
      soundFX.playSuccessSound();
      setAnsweredState('correct');
      const multiplier = streak >= 3 ? 3 : streak >= 1 ? 2 : 1;
      const pts = (10 + timeLeft) * multiplier;
      setScore(s => s + pts);
      setStreak(st => st + 1);

      if (streak + 1 === 5) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      soundFX.playClickSound();
      setAnsweredState('wrong');
      setStreak(0);
    }

    setTimeout(goToNextQuestion, 1100);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(i => i + 1);
      setTimeLeft(12);
      setSelectedOptionId(null);
      setAnsweredState('idle');
    } else {
      setIsGameOver(true);
      studentProgress.recordGameScore('speedQuiz', score);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    }
  };

  const currentQ = questions[currentQuestionIndex];

  const getLevelTitle = () => {
    if (score >= 250) return { title: 'كاتب دار الحياة الملكي 👑', color: 'text-amber-800' };
    if (score >= 160) return { title: 'كبير كتبة المعبد 📜', color: 'text-blue-900' };
    if (score >= 80) return { title: 'كاتب البرديات الماهر ✒️', color: 'text-amber-700' };
    return { title: 'كاتب مبتدئ واعد 🌱', color: 'text-stone-700' };
  };

  if (questions.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6 text-right">
      
      {/* Game Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 justify-end">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>لعبة سرعة المفردات للكاتب</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900">
            تحدي الرموز والمفردات السريع
          </h3>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-4 bg-stone-50 px-4 py-2 rounded-xl border border-stone-200">
          <div className="flex items-center gap-1 text-xs font-bold">
            <Timer className="w-4 h-4 text-amber-700" />
            <span className={`font-mono text-base tabular-nums ${timeLeft <= 4 ? 'text-red-600 animate-pulse' : 'text-stone-900'}`}>
              {timeLeft} ث
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>حماس: ×{streak >= 3 ? 3 : streak >= 1 ? 2 : 1}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-base tabular-nums">{score}</span>
          </div>
        </div>
      </div>

      {!isGameOver && currentQ ? (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold">
            <span>السؤال {currentQuestionIndex + 1} من {questions.length}</span>
            <span className="text-amber-800">{currentQ.word.categoryAr}</span>
          </div>

          <div className="p-8 rounded-2xl bg-[#FAF5E8] border-2 border-amber-300/80 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-7xl font-hieroglyphs text-stone-900 select-none animate-fadeIn">
              {currentQ.word.hieroglyphs}
            </span>
            <div className="text-xs text-stone-500 font-mono">
              ما هو المعنى الصحيح لهذا الرمز الهيروغليفي؟
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedOptionId === opt.id;
              let style = 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-white';

              if (answeredState !== 'idle') {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (isSelected) {
                  style = 'bg-red-50 border-red-500 text-red-950 font-bold';
                } else {
                  style = 'bg-stone-50 border-stone-200 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={answeredState !== 'idle'}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border-2 transition-all text-right font-medium text-sm flex items-center justify-between ${style}`}
                >
                  <span>{opt.text}</span>
                  {answeredState !== 'idle' && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {answeredState !== 'idle' && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="text-center py-8 space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            𓋹
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-stone-900">
              انتهى التحدي السريع!
            </h4>
            <div className={`text-base font-bold mt-1 ${getLevelTitle().color}`}>
              رتبتك المستحقة: {getLevelTitle().title}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-xs mx-auto">
            <div className="text-xs text-stone-500 font-bold">مجموع النقاط المحرزة</div>
            <div className="text-4xl font-extrabold text-amber-900 font-mono tabular-nums my-1">
              {score}
            </div>
            <div className="text-xs text-amber-800">
              كلما زادت سرعتك، تضاعفت نقاط الحماس!
            </div>
          </div>

          <button
            onClick={generateQuestions}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>العب جولة جديدة بمفردات أخرى</span>
          </button>
        </div>
      )}

    </div>
  );
};

// ==========================================
// GAME 2: Hieroglyph Word Builder Puzzle
// ==========================================
interface BuilderPuzzle {
  arabicWord: string;
  meaning: string;
  transliteration: string;
  solutionGlyphs: { char: string; name: string }[];
  scrambledGlyphs: { id: string; char: string; name: string }[];
  explanation: string;
}

const BUILDER_PUZZLES: BuilderPuzzle[] = [
  {
    arabicWord: 'بَيْت (قصر / دار)',
    meaning: 'بيت أو قصر (أصل كلمة فرعون)',
    transliteration: 'pr (بِر)',
    solutionGlyphs: [
      { char: '𓉐', name: 'مخطط البيت (pr)' },
      { char: '𓂋', name: 'الفم كمعين صوتي (r)' }
    ],
    scrambledGlyphs: [
      { id: 'b1', char: '𓂋', name: 'الفم (r)' },
      { id: 'b2', char: '𓈖', name: 'ماء (n)' },
      { id: 'b3', char: '𓉐', name: 'مخطط البيت (pr)' },
      { id: 'b4', char: '𓏏', name: 'خبز (t)' }
    ],
    explanation: 'تتكون كلمة "بر" (بيت) من الرمز الثنائي لمخطط البيت 𓉐 متبوعاً بحرف الفم 𓂋 كمعين صوتي يؤكد النطق!'
  },
  {
    arabicWord: 'مَاء (مياه النيل العذب)',
    meaning: 'الماء والحياة',
    transliteration: 'mw (مُو)',
    solutionGlyphs: [
      { char: '𓈖', name: 'تموج الماء (n)' },
      { char: '𓈗', name: 'مخصص المياه الثلاثية' }
    ],
    scrambledGlyphs: [
      { id: 'm1', char: '𓈗', name: 'مخصص المياه' },
      { id: 'm2', char: '𓅓', name: 'بومة (m)' },
      { id: 'm3', char: '𓈖', name: 'تموج الماء (n)' },
      { id: 'm4', char: '𓃀', name: 'قدم (b)' }
    ],
    explanation: 'كلمة "مُو" (ماء) المشتركة تماماً مع العربية، تنتهي بمخصص تموجات الماء الثلاثية 𓈗 لتأكيد المعنى السائل!'
  },
  {
    arabicWord: 'حُبّ (عشق ومحبة)',
    meaning: 'المحبة والوئام',
    transliteration: 'mr (مِر)',
    solutionGlyphs: [
      { char: '𓌻', name: 'فأس حراثة الأرض (mr)' },
      { char: '𓂋', name: 'الفم المتمم (r)' }
    ],
    scrambledGlyphs: [
      { id: 'mr1', char: '𓌻', name: 'فأس الحراثة (mr)' },
      { id: 'mr2', char: '𓇳', name: 'شمس (rꜥ)' },
      { id: 'mr3', char: '𓂋', name: 'فم (r)' },
      { id: 'mr4', char: '𓊵', name: 'سلام (ḥtp)' }
    ],
    explanation: 'رمز الفأس الزراعية 𓌻 يعبر عن الحب لأن تقليب الأرض بالحب يثمر الخير، ومنها اسم مريت آمون ونفرتاري المحبوبة.'
  },
  {
    arabicWord: 'سَلاَم (قربان ورضا)',
    meaning: 'السلام والاطمئنان والقرابين',
    transliteration: 'ḥtp (حُتُب)',
    solutionGlyphs: [
      { char: '𓊵', name: 'رغيف القربان على الحصير (ḥtp)' },
      { char: '𓏏', name: 'رغيف الخبز (t)' },
      { char: '𓊪', name: 'مقعد البردي (p)' }
    ],
    scrambledGlyphs: [
      { id: 'h1', char: '𓊪', name: 'مقعد (p)' },
      { id: 'h2', char: '𓊵', name: 'حصير القربان (ḥtp)' },
      { id: 'h3', char: '𓏏', name: 'خبز (t)' },
      { id: 'h4', char: '𓆑', name: 'حية (f)' }
    ],
    explanation: 'كلمة "حتب" (السلام) تكتب برمز حصير القربان 𓊵 يعقبه الخبز 𓏏 والمقعد 𓊪 كمتممات صوتية تؤكد نطق الحروف الثلاثية.'
  }
];

const WordBuilderGame: React.FC = () => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [assembledGlyphs, setAssembledGlyphs] = useState<{ id: string; char: string; name: string }[]>([]);
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentPuzzle = BUILDER_PUZZLES[puzzleIndex];

  const handleAddGlyph = (glyph: { id: string; char: string; name: string }) => {
    if (isSuccess) return;
    soundFX.playClickSound();
    const newAssembled = [...assembledGlyphs, glyph];
    setAssembledGlyphs(newAssembled);

    if (newAssembled.length === currentPuzzle.solutionGlyphs.length) {
      const isCorrect = newAssembled.every((g, idx) => g.char === currentPuzzle.solutionGlyphs[idx].char);
      if (isCorrect) {
        soundFX.playSuccessSound();
        setIsSuccess(true);
        setScore(s => s + 50);
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      } else {
        soundFX.playClickSound();
      }
    }
  };

  const handleRemoveGlyph = (index: number) => {
    if (isSuccess) return;
    soundFX.playClickSound();
    setAssembledGlyphs(prev => prev.filter((_, i) => i !== index));
  };

  const handleNextPuzzle = () => {
    if (puzzleIndex + 1 < BUILDER_PUZZLES.length) {
      setPuzzleIndex(i => i + 1);
      setAssembledGlyphs([]);
      setIsSuccess(false);
    } else {
      setPuzzleIndex(0);
      setAssembledGlyphs([]);
      setIsSuccess(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6 text-right">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 justify-end">
            <PenTool className="w-4 h-4 text-amber-600" />
            <span>لعبة تركيب الكلمات الهيروغليفية</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900">
            ركّب حجارة الرموز لتكوين الكلمة
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            اختر الرموز الصحيحة بالترتيب الدقيق لتجميع الكلمة المصرية القديمة!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-stone-700">مجموع النقاط:</span>
          <span className="text-lg font-black font-mono text-amber-900 tabular-nums">{score}</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#FBF7EE] border border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-stone-500 font-bold">المطلوب تركيب كلمة:</span>
          <h4 className="text-2xl font-black text-amber-950 mt-1">
            {currentPuzzle.arabicWord}
          </h4>
          <div className="text-xs text-stone-600 mt-0.5 font-mono">
            النطق الصوتي: {currentPuzzle.transliteration}
          </div>
        </div>

        <div className="text-xs text-stone-500 bg-white px-3 py-2 rounded-xl border border-stone-200">
          <span>اللغز {puzzleIndex + 1} من {BUILDER_PUZZLES.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-stone-700">لوحة التركيب (اضغط على الرمز لإلغائه):</div>
        <div className="min-h-[110px] p-4 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 flex items-center justify-center gap-4 flex-wrap">
          {assembledGlyphs.length === 0 ? (
            <span className="text-xs text-stone-400">
              اضغط على حجارة الرموز أدناه لوضعها هنا بالترتيب الصحيح...
            </span>
          ) : (
            assembledGlyphs.map((glyph, idx) => (
              <button
                key={idx}
                onClick={() => handleRemoveGlyph(idx)}
                className="group relative p-3 bg-white rounded-xl border-2 border-amber-700 shadow-sm flex flex-col items-center justify-center hover:border-red-500 transition-all cursor-pointer"
                title="اضغط للحذف"
              >
                <span className="text-4xl font-hieroglyphs text-stone-900 select-none">
                  {glyph.char}
                </span>
                <span className="text-[10px] text-stone-500 mt-1">{glyph.name}</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-stone-700">حجارة الرموز المتاحة:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentPuzzle.scrambledGlyphs.map(g => (
            <button
              key={g.id}
              onClick={() => handleAddGlyph(g)}
              disabled={isSuccess}
              className="p-4 rounded-xl bg-white border-2 border-stone-200 hover:border-amber-600 hover:shadow-md transition-all flex flex-col items-center justify-center text-center cursor-pointer disabled:opacity-50"
            >
              <span className="text-5xl font-hieroglyphs text-stone-900 select-none mb-1">
                {g.char}
              </span>
              <span className="text-xs font-semibold text-stone-600">{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>أحسنت! ركّبت الكلمة ببراعة كاتب محترف (+50 نقطة)</span>
          </div>
          <p className="text-xs font-serif-ar leading-relaxed text-emerald-900">
            💡 {currentPuzzle.explanation}
          </p>
          <div className="pt-1 flex justify-end">
            <button
              onClick={handleNextPuzzle}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>انتقل للغز التالي</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// GAME 3: Karnak Papyrus Memory Card Flip
// ==========================================
interface MemoryCard {
  uniqueId: string;
  pairId: string;
  content: string;
  type: 'glyph' | 'meaning';
  isFlipped: boolean;
  isMatched: boolean;
}

const KarnakMemoryGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium'>('easy');

  const setupCards = (diff: 'easy' | 'medium') => {
    const pairCount = diff === 'easy' ? 4 : 6;
    const selectedWords = [...DICTIONARY_50_WORDS].sort(() => 0.5 - Math.random()).slice(0, pairCount);

    const deck: MemoryCard[] = [];
    selectedWords.forEach((word) => {
      deck.push({
        uniqueId: `g-${word.id}`,
        pairId: word.id,
        content: word.hieroglyphs,
        type: 'glyph',
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        uniqueId: `m-${word.id}`,
        pairId: word.id,
        content: word.arabicMeaning,
        type: 'meaning',
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(deck.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMoves(0);
    setMatchedCount(0);
  };

  useEffect(() => {
    setupCards(difficulty);
  }, [difficulty]);

  const handleCardClick = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;
    soundFX.playClickSound();

    const newCards = cards.map(c => c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c);
    setCards(newCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        soundFX.playSuccessSound();
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, isMatched: true } : c));
          setFlippedCards([]);
          setMatchedCount(cnt => {
            const nextCnt = cnt + 1;
            const totalPairs = difficulty === 'easy' ? 4 : 6;
            if (nextCnt === totalPairs) {
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            }
            return nextCnt;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.uniqueId === first.uniqueId || c.uniqueId === second.uniqueId) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const totalPairs = difficulty === 'easy' ? 4 : 6;
  const isWon = matchedCount === totalPairs;

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6 text-right">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 justify-end">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ذاكرة معبد الكرنك والبرديات</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900">
            مطابقة بطاقات الذاكرة الفرعونية
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setDifficulty('easy')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                difficulty === 'easy' ? 'bg-amber-800 text-white' : 'text-stone-700'
              }`}
            >
              سهل (4 أزواج)
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                difficulty === 'medium' ? 'bg-amber-800 text-white' : 'text-stone-700'
              }`}
            >
              متوسط (6 أزواج)
            </button>
          </div>

          <div className="text-xs font-bold text-stone-600 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
            المحاولات: <span className="font-mono tabular-nums text-amber-900">{moves}</span>
          </div>
        </div>
      </div>

      <div className={`grid gap-3 ${difficulty === 'easy' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3 sm:grid-cols-4'}`}>
        {cards.map(card => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uniqueId}
              disabled={card.isMatched}
              onClick={() => handleCardClick(card)}
              className={`h-28 sm:h-32 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-3 cursor-pointer ${
                card.isMatched
                  ? 'bg-amber-50/50 border-amber-300 opacity-60'
                  : isRevealed
                  ? 'bg-amber-50 border-amber-700 shadow-md ring-2 ring-amber-400 rotate-0'
                  : 'bg-gradient-to-br from-amber-900 to-stone-900 border-amber-800 hover:border-amber-500 shadow-xs'
              }`}
            >
              {isRevealed ? (
                <div className="flex flex-col items-center justify-center text-center">
                  {card.type === 'glyph' ? (
                    <span className="text-5xl font-hieroglyphs text-stone-900 select-none">
                      {card.content}
                    </span>
                  ) : (
                    <span className="text-sm sm:text-base font-bold text-amber-950 font-serif-ar">
                      {card.content}
                    </span>
                  )}
                  {card.isMatched && (
                    <span className="text-[10px] text-emerald-700 font-bold mt-1">
                      تم التطابق ✓
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-2xl text-amber-300/80 font-hieroglyphs">𓇓</span>
                  <div className="text-[10px] text-amber-200 font-bold mt-1">الكرنك</div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {isWon && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div>
            <div className="font-bold text-sm">مبروك! أتممت مطابقة الذاكرة في {moves} محاولة فقط! 🏆</div>
            <div className="text-xs text-amber-200">ذاكرة بصرية ثاقبة تليق بكتبة معبد الكرنك العظيم.</div>
          </div>
          <button
            onClick={() => setupCards(difficulty)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            العب مرة أخرى ببطاقات جديدة
          </button>
        </div>
      )}

    </div>
  );
};

// ==========================================
// MAIN GAMES HUB CONTAINER
// ==========================================
export const GamesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveGame>('core_academy');

  return (
    <div id="games" className="space-y-6 text-right">
      
      {/* Games Suite Tab Navigation */}
      <div className="p-6 rounded-3xl bg-[#FAF5E8] border border-[#E8DFC9] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>ألعاب تعليمية تفاعلية للكبار والصغار</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              ألعاب الكاتب الفرعوني
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              ابدأ بالألعاب التعليمية الثلاث للصغار والكبار (الرموز، بناء الكلمات، المعاني)، أو خُض تحديات نقش الحجر وفك طلاسم المعبد.
            </p>
          </div>

          {/* Game Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-stone-200 shadow-xs self-start sm:self-auto max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => setActiveTab('core_academy')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'core_academy' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>الألعاب الثلاث (صغار وكبار)</span>
            </button>

            <button
              onClick={() => setActiveTab('stone_carving')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'stone_carving' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Hammer className="w-3.5 h-3.5 text-amber-300" />
              <span>نقش الحجر</span>
            </button>

            <button
              onClick={() => setActiveTab('temple_runes')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'temple_runes' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300" />
              <span>فك طلاسم المعبد</span>
            </button>

            <button
              onClick={() => setActiveTab('flash_memory')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'flash_memory' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-amber-300" />
              <span>الذاكرة الموقوتة</span>
            </button>

            <button
              onClick={() => setActiveTab('speed')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'speed' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>سرعة المفردات</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'builder' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-amber-300" />
              <span>تركيب الكلمات</span>
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'memory' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ذاكرة الكرنك</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Game Display */}
      {activeTab === 'core_academy' && <ThreeCoreGamesAcademy />}
      {activeTab === 'stone_carving' && <StoneCarvingGame />}
      {activeTab === 'temple_runes' && <TempleRunesGame />}
      {activeTab === 'flash_memory' && <FlashMemoryGame />}
      {activeTab === 'speed' && <SpeedGame />}
      {activeTab === 'builder' && <WordBuilderGame />}
      {activeTab === 'memory' && <KarnakMemoryGame />}

    </div>
  );
};
