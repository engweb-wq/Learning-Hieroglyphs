import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  Unlock, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  HelpCircle, 
  Flame, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  Eye, 
  Crown,
  Trophy,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import { TEMPLE_RUNES_LEVELS, TempleRunesLevel, TempleWordToken } from '../../data/templeRunesData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

export const TempleRunesGame: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const currentLevel: TempleRunesLevel = TEMPLE_RUNES_LEVELS[currentLevelIndex] || TEMPLE_RUNES_LEVELS[0];

  // Placed words on the altar pedestal
  const [placedTokens, setPlacedTokens] = useState<TempleWordToken[]>([]);
  // Available tokens in the bank (shuffled)
  const [availableTokens, setAvailableTokens] = useState<TempleWordToken[]>([]);

  // Door & Game states: 'locked' | 'opening' | 'opened'
  const [doorState, setDoorState] = useState<'locked' | 'opening' | 'opened'>('locked');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Initialize or reset level
  const initLevel = (levelIdx: number) => {
    const lvl = TEMPLE_RUNES_LEVELS[levelIdx];
    if (!lvl) return;

    // Combine correct words and distractors, then shuffle
    const allTokens = [...lvl.words, ...lvl.distractors].sort(() => Math.random() - 0.5);
    setPlacedTokens([]);
    setAvailableTokens(allTokens);
    setDoorState('locked');
    setValidationError(null);
    setShowHint(false);
    setIsVerifying(false);
  };

  useEffect(() => {
    initLevel(currentLevelIndex);
  }, [currentLevelIndex]);

  // Handle clicking a token from the bank to place it on the pedestal
  const handleSelectToken = (token: TempleWordToken) => {
    if (doorState !== 'locked') return;
    if (placedTokens.length >= currentLevel.words.length) {
      soundFX.playTempleRumble();
      setValidationError('اكتملت مساحات الكلمات على المحراب، تحقق من التعويذة أو انقر على حجر لإعادته');
      return;
    }

    soundFX.playClickSound();
    setValidationError(null);
    setPlacedTokens(prev => [...prev, token]);
    setAvailableTokens(prev => prev.filter(t => t.id !== token.id));
  };

  // Handle clicking a placed token to return it back to the bank
  const handleRemovePlacedToken = (token: TempleWordToken) => {
    if (doorState !== 'locked') return;
    soundFX.playClickSound();
    setValidationError(null);
    setPlacedTokens(prev => prev.filter(t => t.id !== token.id));
    setAvailableTokens(prev => [...prev, token]);
  };

  // Reset current placement
  const handleResetAltar = () => {
    soundFX.playClickSound();
    initLevel(currentLevelIndex);
  };

  // Pronounce an individual word
  const handlePronounceToken = (token: TempleWordToken, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playAncientChime(640);
    scribeAudio.speakText(`${token.readingAr}. ${token.meaningAr}`, {
      id: token.id
    });
  };

  // Verify decipherment spell
  const handleVerifySpell = () => {
    if (doorState !== 'locked' || isVerifying) return;

    if (placedTokens.length < currentLevel.words.length) {
      soundFX.playTempleRumble();
      setValidationError(`يرجى وضع جميع الكلمات الـ ${currentLevel.words.length} على المحراب أولاً`);
      return;
    }

    setIsVerifying(true);
    setValidationError(null);

    // Check if the placed tokens match the exact target sequence
    const isCorrect = placedTokens.every((token, idx) => token.id === currentLevel.words[idx]?.id);

    if (isCorrect) {
      // Trigger sounds: heavy stone slide rumble followed by success chime
      soundFX.playStoneDoorSlide();
      soundFX.playAncientChime(520);

      // Start door opening animation
      setDoorState('opening');

      setTimeout(() => {
        soundFX.playSuccessSound();
        setDoorState('opened');
        setIsVerifying(false);

        // Confetti celebration
        try {
          confetti({
            particleCount: 75,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }

        // Add score and record progress
        const earnedPoints = currentLevel.relic.points;
        setTotalScore(prev => prev + earnedPoints);
        studentProgress.addPoints(earnedPoints, `فك طلاسم ${currentLevel.templeNameAr}`, 'ألعاب الكاتب');
        studentProgress.recordGameScore('templeRunes', totalScore + earnedPoints);

        // Unlock next level if not already unlocked
        if (currentLevelIndex + 1 < TEMPLE_RUNES_LEVELS.length) {
          setUnlockedLevels(prev => Array.from(new Set([...prev, currentLevelIndex + 1])));
        }

        // Recite the blessing and full sentence
        scribeAudio.speakText(currentLevel.speechAudioScript, {
          id: `temple-${currentLevel.id}`,
          onEnd: () => setIsAudioPlaying(false),
          onError: () => setIsAudioPlaying(false)
        });
        setIsAudioPlaying(true);
      }, 1200);

    } else {
      // Wrong arrangement
      soundFX.playTempleRumble();
      setValidationError('الترتيب غير صحيح! تأمل في دلالة المبتدأ والخبر، أو استخدم تلميح الكاتب لإرشادك.');
      setIsVerifying(false);
    }
  };

  // Play / Stop full audio recitation
  const handleToggleFullAudio = () => {
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      soundFX.playAncientChime(540);
      scribeAudio.speakText(currentLevel.speechAudioScript, {
        id: `temple-${currentLevel.id}`,
        onEnd: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false)
      });
    }
  };

  // Advance to next temple
  const handleNextLevel = () => {
    if (currentLevelIndex + 1 < TEMPLE_RUNES_LEVELS.length) {
      soundFX.playClickSound();
      setCurrentLevelIndex(prev => prev + 1);
    }
  };

  // Go to previous temple
  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      soundFX.playClickSound();
      setCurrentLevelIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 text-right select-none" dir="rtl">
      
      {/* Game Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#2B180A] via-[#3D2512] to-[#1C1108] text-amber-50 border-2 border-amber-500/40 shadow-xl space-y-4 relative overflow-hidden">
        {/* Decorative hieroglyphic watermark */}
        <div className="absolute left-4 top-2 text-8xl font-hieroglyphs text-amber-500/10 pointer-events-none select-none">
          𓉐 𓊹 𓋹
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>مغامرة الكاتب الأثري: لغز المعابد المصرية</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-display-eg mt-2">
              لعبة فك طلاسم المعبد 🗝️
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl font-serif-ar leading-relaxed">
              تأمل النص الهيروغليفي المنقوش على جدار المعبد، ورتّب الأحجار بالترتيب النحوي والدلالي الصحيح لفتح مزلاج الباب واكتشاف الأثر المقدس في قدس الأقداس!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-950/60 p-3 rounded-2xl border border-amber-500/30">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-amber-300 block">نقاط الكاتب</span>
              <span className="text-lg font-bold text-amber-100">+{totalScore} XP</span>
            </div>
          </div>
        </div>

        {/* Level Navigation Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-xs relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">
              المعبد {currentLevel.levelNumber} من {TEMPLE_RUNES_LEVELS.length}:
            </span>
            <span className="text-amber-100 font-semibold">{currentLevel.templeNameAr}</span>
            <span className="text-[11px] text-amber-300/80 hidden sm:inline">({currentLevel.templeLocationAr})</span>
          </div>

          {/* Level Switcher Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevLevel}
              disabled={currentLevelIndex === 0}
              className={`p-1.5 rounded-lg border transition-all ${
                currentLevelIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-amber-900 text-amber-700'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-700'
              }`}
              title="المعبد السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="px-2 py-0.5 rounded-md bg-amber-950 font-mono text-[11px] text-amber-300 border border-amber-800">
              {currentLevelIndex + 1} / {TEMPLE_RUNES_LEVELS.length}
            </span>

            <button
              onClick={handleNextLevel}
              disabled={currentLevelIndex >= TEMPLE_RUNES_LEVELS.length - 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentLevelIndex >= TEMPLE_RUNES_LEVELS.length - 1
                  ? 'opacity-40 cursor-not-allowed border-amber-900 text-amber-700'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-700'
              }`}
              title="المعبد التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Virtual Temple Gate & Facade Arena */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#24170E] via-[#1B110B] to-[#120B07] border-4 border-[#8B5A2B] shadow-2xl p-4 sm:p-8 overflow-hidden">
        
        {/* Sandstone Pylon Lintel (العتّاب الحجري وبداية الصرح) */}
        <div className="relative z-10 mb-6 bg-gradient-to-b from-[#C29B62] via-[#A87E44] to-[#7F5B29] rounded-2xl p-4 border-2 border-[#E4C58E] shadow-lg text-center space-y-2">
          
          {/* Winged Sun Disk (Behedeti) Carving */}
          <div className="flex items-center justify-center gap-3 text-amber-950 select-none pb-1 border-b border-amber-900/30">
            <span className="text-2xl font-hieroglyphs">𓆃</span>
            <span className="text-xs font-bold font-serif-ar tracking-wider text-amber-950">
              بِهدِتي — قُرص الشَّمس المُجنَّح حامي الصَّرح المُقدَّس
            </span>
            <span className="text-2xl font-hieroglyphs">𓆃</span>
          </div>

          {/* Mystery Hieroglyphic Inscription Carved on the Wall */}
          <div className="p-3 bg-[#422915]/90 rounded-xl border border-amber-300/40 shadow-inner space-y-1">
            <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>النقش المسجل على حجر الصرح (Mystery Inscription):</span>
              </span>
              <button
                onClick={handleToggleFullAudio}
                className="text-amber-200 hover:text-white flex items-center gap-1 text-[11px] underline"
              >
                {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>استمع للنص الهيروغليفي</span>
              </button>
            </div>

            {/* Glowing Hieroglyphic Wall Display */}
            <div className="py-2 text-center">
              <span className="text-3xl sm:text-5xl font-hieroglyphs text-amber-200 tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                {currentLevel.targetSentenceHieroglyphs}
              </span>
            </div>

            {/* Clue and Translation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-amber-100 pt-1 border-t border-amber-500/30">
              <span className="font-serif-ar font-bold">
                المعنى المراد تكوينه: « <span className="text-amber-300 font-extrabold">{currentLevel.targetTranslationAr}</span> »
              </span>
              <span className="font-mono text-amber-300/80 text-[11px]" dir="ltr">
                {currentLevel.targetTransliteration}
              </span>
            </div>
          </div>
        </div>

        {/* Temple Gate Portal Architecture (Columns + Giant Double Doors) */}
        <div className="relative z-10 flex items-stretch justify-center gap-2 sm:gap-4 my-6">
          
          {/* Left Stone Pillar with Torch */}
          <div className="w-10 sm:w-16 bg-gradient-to-r from-[#634426] via-[#8C6339] to-[#54381E] rounded-xl border-2 border-amber-600/40 flex flex-col items-center justify-between py-4 shadow-md">
            <div className="flex flex-col items-center">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <div className="w-4 h-1.5 bg-stone-900 rounded-full mt-0.5" />
            </div>
            <div className="text-xs font-hieroglyphs text-amber-300/40 rotate-90 select-none">
              𓇓 𓏏 𓊹
            </div>
            <div className="text-[10px] font-bold text-amber-400/80 font-mono">
              إدفو
            </div>
          </div>

          {/* Center Gate Double Leaves (بوابة المعبد الكبرى) */}
          <div className="flex-1 max-w-2xl relative min-h-[220px] sm:min-h-[260px] rounded-2xl overflow-hidden border-4 border-[#784E25] shadow-2xl bg-black">
            
            {/* Background: Radiant Inner Sanctum (قدس الأقداس) when opened */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF2B2] via-[#E6B347] to-[#8C5E1E] flex flex-col items-center justify-center p-4 text-center text-stone-950 space-y-2">
              <div className="text-5xl sm:text-6xl animate-bounce">
                {currentLevel.relic.icon}
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-950 text-amber-100 rounded-full text-xs font-bold border border-amber-400 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>انفتحت بوابة قدس الأقداس!</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 font-display-eg">
                {currentLevel.relic.nameAr}
              </h4>
              <p className="text-xs text-stone-800 font-serif-ar max-w-md line-clamp-2">
                {currentLevel.relic.descriptionAr}
              </p>
              <div className="text-xs font-bold text-amber-900 bg-white/80 px-3 py-1 rounded-lg border border-amber-300">
                مكافأة الفتح: +{currentLevel.relic.points} نقطة كاتب
              </div>
            </div>

            {/* Door Leaf LEFT */}
            <div 
              className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#59391D] via-[#754E29] to-[#452C16] border-r-2 border-amber-900 transition-transform duration-1000 ease-in-out z-20 flex flex-col items-end justify-center p-4 ${
                doorState === 'opening' || doorState === 'opened' ? '-translate-x-full' : 'translate-x-0'
              }`}
            >
              {/* Hieroglyphic Relief Patterns */}
              <div className="space-y-4 text-amber-500/30 text-2xl font-hieroglyphs select-none text-left w-full pl-2">
                <div>𓊹 𓇓 𓏏</div>
                <div>𓋹 𓍑 𓋴</div>
                <div>𓁹 𓈖 𓊪</div>
              </div>
              {/* Left Door Handle Ring */}
              <div className="w-7 h-7 rounded-full border-4 border-amber-400/80 bg-amber-950/80 shadow-md mt-2 mr-1" />
            </div>

            {/* Door Leaf RIGHT */}
            <div 
              className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#59391D] via-[#754E29] to-[#452C16] border-l-2 border-amber-900 transition-transform duration-1000 ease-in-out z-20 flex flex-col items-start justify-center p-4 ${
                doorState === 'opening' || doorState === 'opened' ? 'translate-x-full' : 'translate-x-0'
              }`}
            >
              {/* Hieroglyphic Relief Patterns */}
              <div className="space-y-4 text-amber-500/30 text-2xl font-hieroglyphs select-none text-right w-full pr-2">
                <div>𓇳 𓅱 𓃀</div>
                <div>𓌳 𓐍 𓂝</div>
                <div>𓆎 𓅓 𓏏</div>
              </div>
              {/* Right Door Handle Ring */}
              <div className="w-7 h-7 rounded-full border-4 border-amber-400/80 bg-amber-950/80 shadow-md mt-2 ml-1" />
            </div>

            {/* Center Lock Seal (المزلاج والمحبس الذهبي في المنتصف) */}
            {doorState === 'locked' && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-2xl flex flex-col items-center justify-center text-amber-950 space-y-1 animate-pulse">
                  <Lock className="w-6 h-6 text-amber-950" />
                  <span className="text-[10px] font-bold tracking-tight">مزلاج الصرح مغلق</span>
                  <span className="text-[9px] font-mono text-amber-900">
                    ضع الكلمات بترتيبها
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Right Stone Pillar with Torch */}
          <div className="w-10 sm:w-16 bg-gradient-to-l from-[#634426] via-[#8C6339] to-[#54381E] rounded-xl border-2 border-amber-600/40 flex flex-col items-center justify-between py-4 shadow-md">
            <div className="flex flex-col items-center">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <div className="w-4 h-1.5 bg-stone-900 rounded-full mt-0.5" />
            </div>
            <div className="text-xs font-hieroglyphs text-amber-300/40 rotate-90 select-none">
              𓇳 𓌳 𓂝
            </div>
            <div className="text-[10px] font-bold text-amber-400/80 font-mono">
              طيبة
            </div>
          </div>

        </div>

        {/* Assembly Pedestal / Altar for Sentence Building (محراب صف الكلمات) */}
        <div className="relative z-10 bg-[#301C0D]/90 p-4 sm:p-5 rounded-2xl border-2 border-[#A87E44]/70 shadow-lg space-y-3">
          
          <div className="flex items-center justify-between text-xs text-amber-200">
            <span className="font-bold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>محراب صف الأحجار (رتّب الكلمات من اليمين إلى اليسار):</span>
            </span>

            <span className="font-mono text-amber-300">
              {placedTokens.length} / {currentLevel.words.length} أحجار
            </span>
          </div>

          {/* Pedestal Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 min-h-[95px] p-3 rounded-xl bg-[#1C1007]/80 border border-amber-800/60 shadow-inner">
            {Array.from({ length: currentLevel.words.length }).map((_, slotIdx) => {
              const token = placedTokens[slotIdx];

              if (token) {
                return (
                  <div
                    key={token.id}
                    onClick={() => handleRemovePlacedToken(token)}
                    className="p-2.5 rounded-xl bg-gradient-to-b from-[#F5DEB3] via-[#E6C280] to-[#C99E52] border-2 border-amber-200 shadow-md flex flex-col items-center justify-between cursor-pointer hover:scale-105 active:scale-95 transition-all text-amber-950 group"
                    title="انقر لإعادة الحجر إلى البنك"
                  >
                    <div className="w-full flex items-center justify-between text-[10px] text-amber-900/80 font-mono">
                      <span>#{slotIdx + 1}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-rose-700 font-bold">✕ إزالة</span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-hieroglyphs text-stone-900 py-1">
                      {token.hieroglyphs}
                    </div>

                    <div className="text-center w-full">
                      <div className="text-[11px] font-bold text-amber-950 truncate">
                        {token.readingAr}
                      </div>
                      <div className="text-[9px] text-stone-700 truncate font-serif-ar">
                        {token.meaningAr}
                      </div>
                    </div>
                  </div>
                );
              }

              // Empty slot indicator
              return (
                <div
                  key={slotIdx}
                  className="rounded-xl border-2 border-dashed border-amber-700/60 bg-[#28170B]/50 flex flex-col items-center justify-center p-3 text-amber-500/40 text-center space-y-1"
                >
                  <span className="text-xs font-mono font-bold">حجر #{slotIdx + 1}</span>
                  <span className="text-[10px]">فارغ</span>
                </div>
              );
            })}
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-600/70 text-rose-200 text-xs font-serif-ar flex items-center gap-2 animate-shake">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Action Buttons Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-900/60">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVerifySpell}
                disabled={doorState !== 'locked' || placedTokens.length !== currentLevel.words.length || isVerifying}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  doorState !== 'locked'
                    ? 'bg-emerald-800 text-white cursor-default'
                    : placedTokens.length === currentLevel.words.length
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-950 font-black scale-102 hover:scale-105 active:scale-95'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                }`}
              >
                {doorState === 'locked' ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>إطلاق تعويذة الفتح (فك الطلاسم)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>فُتحت البوابة بنجاح!</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetAltar}
                disabled={doorState !== 'locked' || placedTokens.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-900/80 hover:bg-stone-800 text-amber-200 rounded-xl text-xs font-semibold border border-amber-900/60 disabled:opacity-40 transition-colors"
                title="إعادة الأحجار للبنك"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ترتيب</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHint(prev => !prev)}
                className="flex items-center gap-1 px-3 py-2 bg-amber-900/50 hover:bg-amber-800/60 text-amber-300 rounded-xl text-xs font-semibold border border-amber-700/50 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHint ? 'إخفاء التلميح' : 'تلميح الكاتب الحكيم'}</span>
              </button>
            </div>
          </div>

          {/* Scribe's Hint Box */}
          {showHint && (
            <div className="p-3 bg-amber-950/70 border border-amber-600/50 rounded-xl text-xs text-amber-200 font-serif-ar space-y-1">
              <strong className="text-amber-300 block font-bold">💡 إرشاد الكاتب إمحوتب:</strong>
              <p>
                الحجر الأول يبدأ بـ: « <strong className="text-white">{currentLevel.words[0]?.readingAr} ({currentLevel.words[0]?.hieroglyphs})</strong> »، 
                والترتيب النحوي المعتمد: {currentLevel.words[0]?.clueAr || 'ابحث عن فاعل الجملة أو الرمز التقديمي'}.
              </p>
            </div>
          )}

        </div>

        {/* Bank of Scrambled Stones (أحجار الكلمات المنقوشة في باحة المعبد) */}
        <div className="relative z-10 mt-6 bg-[#26170B]/90 p-4 sm:p-5 rounded-2xl border border-amber-900 shadow-md space-y-3">
          
          <div className="flex items-center justify-between text-xs text-amber-300">
            <span className="font-bold flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>أحجار الكلمات المتاحة (انقر لوضع الحجر في المحراب):</span>
            </span>
            <span className="text-[11px] text-amber-400/80">
              {availableTokens.length} أحجار متبقية
            </span>
          </div>

          {availableTokens.length === 0 ? (
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-center text-xs text-stone-400 font-serif-ar">
              وضعت جميع الأحجار على المحراب. انقر على زر «إطلاق تعويذة الفتح» للتحقق من الحل!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableTokens.map((token) => (
                <div
                  key={token.id}
                  onClick={() => handleSelectToken(token)}
                  className="p-3 rounded-2xl bg-gradient-to-b from-[#EED9B3] via-[#D8B97E] to-[#B38F52] hover:from-[#FFF0D0] hover:to-[#C69F60] border-2 border-[#8B622B] shadow-lg flex flex-col items-center justify-between cursor-pointer hover:scale-105 active:scale-95 transition-all text-amber-950 relative group"
                >
                  {/* Gardiner Code Badge if present */}
                  <div className="w-full flex items-center justify-between text-[9px] font-mono text-amber-900/80">
                    <span>{token.gardinerCode || '𓏞'}</span>
                    <button
                      type="button"
                      onClick={(e) => handlePronounceToken(token, e)}
                      className="p-1 rounded-md hover:bg-amber-900/20 text-amber-900 transition-colors"
                      title="استمع لنطق الكلمة"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Hieroglyphs Display */}
                  <div className="text-3xl sm:text-4xl font-hieroglyphs text-stone-950 py-2 select-none">
                    {token.hieroglyphs}
                  </div>

                  {/* Phonetic & Translation */}
                  <div className="text-center w-full pt-1 border-t border-amber-900/20">
                    <div className="text-xs font-bold text-amber-950">
                      {token.readingAr}
                    </div>
                    <div className="text-[10px] text-stone-800 font-serif-ar truncate">
                      {token.meaningAr}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Unlocked Inner Sanctum Secrets Drawer (تفتح عند حل اللغز) */}
      {doorState === 'opened' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-400 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم فتح صرح {currentLevel.templeNameAr} بنجاح!</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                كنز قدس الأقداس: {currentLevel.relic.nameAr}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleFullAudio}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-amber-200" />
                <span>إعادة تلاوة ترنيمة الفتح</span>
              </button>

              {currentLevelIndex + 1 < TEMPLE_RUNES_LEVELS.length && (
                <button
                  type="button"
                  onClick={handleNextLevel}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <span>التقدم للمعبد التالي ➔</span>
                </button>
              )}
            </div>
          </div>

          {/* High Priest Blessing */}
          <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300 text-stone-900 space-y-1 font-serif-ar text-sm leading-relaxed">
            <strong className="text-amber-950 block font-bold">📜 ترنيمة وبركة كاهن المعبد الأكبر:</strong>
            <p className="italic text-stone-800">{currentLevel.relic.blessingAr}</p>
          </div>

          {/* Egyptological Grammar & Cultural Lore */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif-ar">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>التحليل النحوي للجملة (Grammar Breakdown):</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                {currentLevel.grammarBreakdownAr}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
                <Landmark className="w-4 h-4 text-amber-700" />
                <span>السياق الحضاري والتاريخي (Cultural Context):</span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                {currentLevel.culturalContextAr}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Educational Footer on Temple Inscriptions */}
      <div className="p-4 rounded-2xl bg-[#F7F4EB] border border-[#E8DFC9] flex items-start gap-3 text-xs text-stone-700 leading-relaxed font-serif-ar">
        <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-1">
            أسرار نقوش وبوابات المعابد المصرية (Coded Hieroglyphic Gates):
          </strong>
          لم تكن بوابات المعابد مجرد مداخل معمارية، بل كانت تُمثّل "أفق السماء" (آخت) التي تفصل عالم البشر الدنيوي عن حرم الآلهة المقدس. كان الكهنة يسجلون على العتبات والجدران نصوصاً مقدسة وتعاويذ لحفظ النظام الكوني (ماعت) وطرد قوى الفوضى.
        </div>
      </div>

    </div>
  );
};
