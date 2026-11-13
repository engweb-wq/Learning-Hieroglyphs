import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Hammer, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Info,
  ShieldCheck,
  Flame,
  Check,
  Layers,
  Feather,
  Wrench,
  Trophy,
  Zap
} from 'lucide-react';
import { 
  STONE_CARVING_MISSIONS, 
  StoneCarvingMission, 
  MASON_TOOLS, 
  MasonTool, 
  StoneType 
} from '../../data/stoneCarvingData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

interface StoneParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export const StoneCarvingGame: React.FC = () => {
  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const mission: StoneCarvingMission = STONE_CARVING_MISSIONS[currentMissionIdx] || STONE_CARVING_MISSIONS[0];

  // Active Tool Selected by user
  const [selectedToolId, setSelectedToolId] = useState<MasonTool['id']>('pointed_chisel');
  
  // Selected Zone to carve
  const [activeZoneIdx, setActiveZoneIdx] = useState<number>(0);

  // Strikes count per zone
  const [zoneStrikes, setZoneStrikes] = useState<Record<string, number>>({});

  // Question State before carving
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [questionFeedback, setQuestionFeedback] = useState<{ isCorrect: boolean; messageAr: string } | null>(null);

  // Carving State: 'question' | 'carving' | 'completed'
  const [missionState, setMissionState] = useState<'question' | 'carving' | 'completed'>('question');

  // Stone particles for visual chiseling effects
  const [particles, setParticles] = useState<StoneParticle[]>([]);
  const stoneRef = useRef<HTMLDivElement>(null);

  // Audio & Progress
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [totalCarvingPoints, setTotalCarvingPoints] = useState<number>(0);
  const [shakeStone, setShakeStone] = useState<boolean>(false);

  // Initialize mission
  useEffect(() => {
    setZoneStrikes({});
    setIsQuestionAnswered(false);
    setQuestionFeedback(null);
    setMissionState('question');
    setActiveZoneIdx(0);
    setParticles([]);
  }, [currentMissionIdx]);

  // Particle physics update
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.5, // gravity
            opacity: p.opacity - 0.04
          }))
          .filter(p => p.opacity > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles]);

  // Calculate overall progress across all zones
  const totalStrikesRequired = mission.carvingZones.reduce((acc, z) => acc + z.requiredStrikes, 0);
  const totalStrikesCompleted = mission.carvingZones.reduce((acc, z) => acc + (zoneStrikes[z.id] || 0), 0);
  const progressPercent = Math.min(100, Math.round((totalStrikesCompleted / totalStrikesRequired) * 100));

  // Answer initial tool choice question
  const handleAnswerQuestion = (toolId: MasonTool['id']) => {
    setSelectedToolId(toolId);

    if (toolId === mission.initialQuestion.targetToolId) {
      soundFX.playSuccessSound();
      setQuestionFeedback({
        isCorrect: true,
        messageAr: `إجابة عبقرية! ${mission.initialQuestion.explanationAr}`
      });
      setIsQuestionAnswered(true);
      setTimeout(() => {
        setMissionState('carving');
      }, 1400);
    } else {
      soundFX.playTempleRumble();
      setQuestionFeedback({
        isCorrect: false,
        messageAr: `اختيار غير دقيق لهذه المرحلة. تلميح المعلم: ${mission.initialQuestion.hintAr}`
      });
    }
  };

  // Trigger chisel / hammer strike on virtual stone
  const handleStoneStrike = (e: React.MouseEvent<HTMLDivElement>) => {
    if (missionState !== 'carving') return;

    const currentZone = mission.carvingZones[activeZoneIdx];
    if (!currentZone) return;

    const currentZoneDone = (zoneStrikes[currentZone.id] || 0) >= currentZone.requiredStrikes;
    if (currentZoneDone) {
      // Advance to next uncompleted zone if any
      const nextIdx = mission.carvingZones.findIndex(z => (zoneStrikes[z.id] || 0) < z.requiredStrikes);
      if (nextIdx !== -1) {
        setActiveZoneIdx(nextIdx);
      }
      return;
    }

    // Sound effect based on selected tool and stone type
    if (selectedToolId === 'pointed_chisel' || selectedToolId === 'flat_chisel') {
      soundFX.playChiselAndMalletCombo(mission.stoneType);
    } else if (selectedToolId === 'wooden_mallet' || selectedToolId === 'diorite_pounder') {
      soundFX.playMalletThud();
      soundFX.playChiselStrike(mission.stoneType);
    } else if (selectedToolId === 'polishing_sand') {
      soundFX.playStonePolish();
    } else {
      soundFX.playClickSound();
    }

    // Trigger visual stone tremor
    setShakeStone(true);
    setTimeout(() => setShakeStone(false), 120);

    // Spawn stone chip particles
    if (stoneRef.current) {
      const rect = stoneRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const particleColor = 
        mission.stoneType === 'limestone' ? '#EAE5D9' :
        mission.stoneType === 'sandstone' ? '#D6B178' :
        mission.stoneType === 'granite' ? '#C27D72' : '#333336';

      const newParticles: StoneParticle[] = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.8) * 8,
        size: Math.random() * 5 + 3,
        color: particleColor,
        opacity: 1
      }));

      setParticles(prev => [...prev.slice(-25), ...newParticles]);
    }

    // Update zone strikes
    const newCount = (zoneStrikes[currentZone.id] || 0) + 1;
    const updatedStrikes = { ...zoneStrikes, [currentZone.id]: newCount };
    setZoneStrikes(updatedStrikes);

    // If current zone is now finished, move to next
    if (newCount >= currentZone.requiredStrikes) {
      soundFX.playAncientChime(620);
      const nextIdx = mission.carvingZones.findIndex(z => (updatedStrikes[z.id] || 0) < z.requiredStrikes);
      if (nextIdx !== -1) {
        setActiveZoneIdx(nextIdx);
      }
    }

    // Check if entire mission is complete!
    const allDone = mission.carvingZones.every(z => (updatedStrikes[z.id] || 0) >= z.requiredStrikes);
    if (allDone) {
      setTimeout(() => {
        setMissionState('completed');
        soundFX.playSuccessSound();
        soundFX.playAncientChime(540);

        try {
          confetti({
            particleCount: 80,
            spread: 85,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }

        const pts = mission.pointsReward;
        setTotalCarvingPoints(prev => prev + pts);
        studentProgress.addPoints(pts, `نقش رمز ${mission.readingAr} على ${mission.stoneNameAr}`, 'ألعاب الكاتب');
        studentProgress.recordGameScore('stoneCarving', totalCarvingPoints + pts);

        // Speak audio script
        scribeAudio.speakText(mission.audioScript, {
          id: `stone-${mission.id}`,
          onEnd: () => setIsAudioPlaying(false),
          onError: () => setIsAudioPlaying(false)
        });
        setIsAudioPlaying(true);
      }, 500);
    }
  };

  // Toggle Audio Recitation
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      soundFX.playAncientChime(520);
      scribeAudio.speakText(mission.audioScript, {
        id: `stone-${mission.id}`,
        onEnd: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false)
      });
    }
  };

  // Next Mission
  const handleNextMission = () => {
    if (currentMissionIdx + 1 < STONE_CARVING_MISSIONS.length) {
      soundFX.playClickSound();
      setCurrentMissionIdx(prev => prev + 1);
    }
  };

  // Prev Mission
  const handlePrevMission = () => {
    if (currentMissionIdx > 0) {
      soundFX.playClickSound();
      setCurrentMissionIdx(prev => prev - 1);
    }
  };

  // Reset Carving
  const handleResetCarving = () => {
    soundFX.playClickSound();
    setZoneStrikes({});
    setActiveZoneIdx(0);
    setMissionState('carving');
  };

  return (
    <div className="space-y-6 text-right select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#291A10] via-[#3B2516] to-[#1C110A] text-amber-50 border-2 border-amber-600/40 shadow-xl space-y-4 relative overflow-hidden">
        
        {/* Subtle Hieroglyphic Watermark */}
        <div className="absolute left-6 top-3 text-8xl font-hieroglyphs text-amber-500/10 pointer-events-none">
          𓋹 𓏞 𓊹
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Hammer className="w-4 h-4 text-amber-400" />
              <span>ورشة النحات الملكي في دير المدينة (Royal Stone Sculptor Workshop)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-display-eg mt-2">
              لعبة نقش الحجر 𓋹🔨
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl font-serif-ar leading-relaxed">
              اختر الأداة النحاتية الصحيحة (الإزميل، المطرقة، أو حجر الصقل)، ووجّه ضرباتك لنقش الرموز الهيروغليفية المقدسة على الحجر الجيري والجرانيت مع محاكاة صوتية وبصرية واقعية!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-950/70 p-3 rounded-2xl border border-amber-500/30">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-amber-300 block">نقاط النحت</span>
              <span className="text-lg font-bold text-amber-100">+{totalCarvingPoints} XP</span>
            </div>
          </div>
        </div>

        {/* Mission Navigator Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-xs relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">
              المهمة {mission.levelNumber} من {STONE_CARVING_MISSIONS.length}:
            </span>
            <span className="text-amber-100 font-semibold">{mission.titleAr}</span>
            <span className="text-[11px] text-amber-300/80 hidden sm:inline">({mission.stoneNameAr})</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMission}
              disabled={currentMissionIdx === 0}
              className={`p-1.5 rounded-lg border transition-all ${
                currentMissionIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-amber-900 text-amber-700'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-700'
              }`}
              title="المهمة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="px-2 py-0.5 rounded-md bg-amber-950 font-mono text-[11px] text-amber-300 border border-amber-800">
              {currentMissionIdx + 1} / {STONE_CARVING_MISSIONS.length}
            </span>

            <button
              onClick={handleNextMission}
              disabled={currentMissionIdx >= STONE_CARVING_MISSIONS.length - 1}
              className={`p-1.5 rounded-lg border transition-all ${
                currentMissionIdx >= STONE_CARVING_MISSIONS.length - 1
                  ? 'opacity-40 cursor-not-allowed border-amber-900 text-amber-700'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-700'
              }`}
              title="المهمة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Sculptor Workshop Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Virtual Stone Slab & Carving Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Stone Slab Frame */}
          <div className="p-4 sm:p-6 rounded-3xl bg-[#24170D] border-4 border-[#8B5A2B] shadow-2xl space-y-4 relative">
            
            {/* Slab Header Info */}
            <div className="flex items-center justify-between text-xs text-amber-200 border-b border-amber-900/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="font-bold text-amber-300">{mission.stoneNameAr}</span>
                <span className="text-stone-400 text-[11px]">| {mission.reliefTypeAr}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-white underline"
                >
                  {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>نطق الرمز</span>
                </button>
              </div>
            </div>

            {/* The Actual Virtual Stone Slab */}
            <div 
              ref={stoneRef}
              onClick={handleStoneStrike}
              className={`relative min-h-[300px] sm:min-h-[360px] rounded-2xl p-6 sm:p-10 border-4 shadow-inner flex flex-col items-center justify-center cursor-crosshair overflow-hidden transition-all duration-75 select-none ${
                mission.stoneTextureCss
              } ${shakeStone ? 'scale-[0.99] translate-y-0.5' : 'hover:scale-[1.005]'}`}
              style={{
                boxShadow: mission.stoneType === 'basalt' 
                  ? 'inset 0 4px 20px rgba(0,0,0,0.9), 0 10px 25px rgba(0,0,0,0.6)'
                  : 'inset 0 4px 15px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.4)'
              }}
            >
              {/* Stone Surface Grain Texture Simulation */}
              <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* Red Ochre Guide Lines (شبكة التخطيط بالمغرة الحمراء) */}
              <div className="absolute inset-4 border border-rose-800/20 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-full h-[1px] bg-rose-800/15 absolute" />
                <div className="h-full w-[1px] bg-rose-800/15 absolute" />
              </div>

              {/* Dynamic Flying Stone Chips Particles */}
              {particles.map(p => (
                <div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none shadow-xs"
                  style={{
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    opacity: p.opacity,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}

              {/* Central Hieroglyph with Dynamic Sunken Relief Depth */}
              <div className="relative z-10 text-center space-y-2">
                <div 
                  className={`text-7xl sm:text-9xl font-hieroglyphs transition-all duration-300 ${mission.stoneColorClass}`}
                  style={{
                    // Realistic lighting: simulates deep incised carving with light from top-left
                    textShadow: progressPercent > 0 
                      ? mission.stoneType === 'basalt'
                        ? `1px 1px 2px rgba(255,255,255,0.2), -3px -3px 6px rgba(0,0,0,0.9), 0 0 ${progressPercent / 5}px rgba(0,0,0,0.8)`
                        : `2px 2px 3px rgba(255,255,255,0.7), -3px -3px 6px rgba(0,0,0,0.6), inset 0 2px 4px rgba(0,0,0,0.4)`
                      : 'none',
                    opacity: 0.35 + (progressPercent / 100) * 0.65,
                    filter: `drop-shadow(0 ${progressPercent / 15}px ${progressPercent / 10}px rgba(0,0,0,0.5))`
                  }}
                >
                  {mission.hieroglyph}
                </div>

                <div className="text-center font-bold text-xs sm:text-sm font-serif-ar opacity-85">
                  « {mission.readingAr} » — {mission.meaningAr} ({mission.gardinerCode})
                </div>
              </div>

              {/* Strike Instruction Overlay on Stone */}
              {missionState === 'carving' && (
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] bg-black/50 text-white px-3 py-1.5 rounded-xl backdrop-blur-xs pointer-events-none">
                  <span className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Hammer className="w-3.5 h-3.5 animate-bounce" />
                    <span>انقر على الحجر لتوجيه ضربة {MASON_TOOLS.find(t => t.id === selectedToolId)?.nameAr}!</span>
                  </span>
                  <span className="font-mono text-amber-200">
                    عمق النقش: {progressPercent}%
                  </span>
                </div>
              )}

              {/* Question Overlay when starting */}
              {missionState === 'question' && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 z-20">
                  <div className="p-3 bg-amber-500/20 rounded-full border border-amber-400">
                    <Hammer className="w-8 h-8 text-amber-300 animate-pulse" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-200 font-display-eg">
                    اختبار كبير النحاتين: اختيار الأداة المناسبة
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 font-serif-ar max-w-md">
                    {mission.initialQuestion.questionAr}
                  </p>

                  {/* Tool options for the question */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-md pt-2">
                    {MASON_TOOLS.slice(0, 6).map(tool => (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => handleAnswerQuestion(tool.id)}
                        className="p-2.5 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-600/60 hover:border-amber-400 text-xs font-bold text-amber-100 flex flex-col items-center gap-1 transition-all active:scale-95"
                      >
                        <span className="text-xl">{tool.icon}</span>
                        <span className="text-[11px] text-center">{tool.nameAr}</span>
                      </button>
                    ))}
                  </div>

                  {questionFeedback && (
                    <div className={`p-3 rounded-xl text-xs font-serif-ar max-w-md ${
                      questionFeedback.isCorrect ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-500' : 'bg-rose-950/90 text-rose-200 border border-rose-500 animate-shake'
                    }`}>
                      {questionFeedback.messageAr}
                    </div>
                  )}
                </div>
              )}

              {/* Completed Overlay */}
              {missionState === 'completed' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-20 animate-fadeIn">
                  <div className="text-5xl animate-bounce">
                    {mission.hieroglyph}
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>اكتمل نقش الحجر الملكي بنجاح!</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-amber-200 font-display-eg">
                    مباركٌ لك! نلت رتبة «نحات المعبد الماهر»
                  </h4>
                  <p className="text-xs text-amber-100 font-serif-ar max-w-md">
                    تم نحت وتفريغ وصقل رمز {mission.readingAr} على {mission.stoneNameAr} بأعلى درجات الإتقان وفق نسب ومقاييس ماعت.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleResetCarving}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-bold border border-amber-600/40"
                    >
                      إعادة نقش الرمز
                    </button>
                    {currentMissionIdx + 1 < STONE_CARVING_MISSIONS.length && (
                      <button
                        type="button"
                        onClick={handleNextMission}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-950 text-xs font-black shadow-md"
                      >
                        المهمة التالية ➔
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Carving Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-amber-300">
                <span className="font-bold flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>عمق وتجويف النقش الكلي (Carving Depth):</span>
                </span>
                <span className="font-mono font-bold text-amber-200">
                  {totalStrikesCompleted} / {totalStrikesRequired} ضربة ({progressPercent}%)
                </span>
              </div>

              <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden border border-amber-700/50 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-400 rounded-full transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

          </div>

          {/* Carving Zones Step Tracker */}
          <div className="p-4 rounded-2xl bg-[#1F140B] border border-amber-900/60 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>مراحل وتجاويف النقش (Sculpting Zones):</span>
              </span>
              <span className="text-[11px] text-stone-400">انقر لاختيار المرحلة المطلوب نحتها</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mission.carvingZones.map((zone, idx) => {
                const count = zoneStrikes[zone.id] || 0;
                const isZoneDone = count >= zone.requiredStrikes;
                const isCurrent = activeZoneIdx === idx;

                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZoneIdx(idx)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isZoneDone
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                        : isCurrent
                        ? 'bg-amber-900/60 border-amber-400 text-amber-100 shadow-xs'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isZoneDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {isZoneDone ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className="font-bold truncate max-w-[170px]">{zone.nameAr}</div>
                        <div className="text-[10px] opacity-75">{zone.guideAr}</div>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] font-bold">
                      {count} / {zone.requiredStrikes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Mason Tools Rack & Historical Lore (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Tool Rack (طاولة أدوات النحات) */}
          <div className="p-5 rounded-3xl bg-[#24170D] border-2 border-[#8B5A2B] shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-300 border-b border-amber-900/60 pb-3">
              <span className="font-bold flex items-center gap-1.5 text-sm">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>حقيبة أدوات النحات (Tool Rack):</span>
              </span>
              <span className="text-[11px] text-amber-400/80">اختر أداة لطرق الحجر بها</span>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {MASON_TOOLS.map(tool => {
                const isSelected = selectedToolId === tool.id;

                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => {
                      setSelectedToolId(tool.id);
                      soundFX.playClickSound();
                    }}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between space-y-2 relative group ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-600 to-amber-800 border-amber-300 text-white shadow-md scale-102'
                        : 'bg-stone-900/80 hover:bg-stone-800/90 border-stone-800 text-stone-300 hover:text-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl">{tool.icon}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-white text-amber-900 flex items-center justify-center text-[10px] font-black">
                          ✓
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-xs truncate">
                        {tool.nameAr}
                      </div>
                      <div className="text-[10px] opacity-75 font-serif-ar truncate">
                        {tool.ancientNameAr}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Details Card */}
            {(() => {
              const activeTool = MASON_TOOLS.find(t => t.id === selectedToolId);
              if (!activeTool) return null;

              return (
                <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-600/40 text-xs text-amber-100 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">{activeTool.icon}</span>
                      <span>{activeTool.nameAr} ({activeTool.nameEn})</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-900/80 border border-amber-500/40 font-mono">
                      {activeTool.category === 'chisel' ? 'إزميل حفر' : activeTool.category === 'mallet' ? 'مطرقة طرق' : 'تشطيب وصقل'}
                    </span>
                  </div>
                  <p className="text-stone-300 font-serif-ar text-[11px] leading-relaxed">
                    {activeTool.descriptionAr}
                  </p>
                  <div className="text-[10px] text-amber-300/90 font-serif-ar pt-1 border-t border-amber-900/50">
                    <strong>الاستخدام الأمثل:</strong> {activeTool.bestUsedForAr}
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Master Mason's Secret Advice (نصائح المعلم الحكيم) */}
          <div className="p-4 rounded-2xl bg-[#1C120A] border border-amber-900 text-xs text-amber-200/90 font-serif-ar space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>حكمة المعلم في مقابر وادي الملوك:</span>
            </div>
            <p className="leading-relaxed text-stone-300 text-[11px]">
              {mission.masonMasterTipAr}
            </p>
            <div className="pt-2 border-t border-amber-950 text-[10px] text-stone-400">
              <strong>تكليف المهمة:</strong> {mission.commissionBriefAr}
            </div>
          </div>

          {/* Stone Geological Facts Card */}
          <div className="p-4 rounded-2xl bg-[#1C120A] border border-amber-900 text-xs text-amber-200/90 font-serif-ar space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400" />
              <span>طبيعة الصخر: {mission.stoneNameAr}</span>
            </div>
            <p className="leading-relaxed text-stone-300 text-[11px]">
              {mission.stoneDescriptionAr}
            </p>
          </div>

        </div>

      </div>

      {/* Educational Historical Footer */}
      <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DFC9] flex items-start gap-3 text-xs text-stone-700 leading-relaxed font-serif-ar">
        <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-1">
            عبقرية النحاتين في مصر القديمة (Royal Sculptors of Ancient Egypt):
          </strong>
          كان النحاتون والفنانون يُسمّون «سَعنخ» (s-ꜥnḫ) أي "المحيون" أو "صانعو الحياة"، لأنهم بنقشهم الرموز الهيروغليفية على الصخور الصامتة ينفخون فيها الخلود لتتحدث عبر آلاف السنين. لم تكن الصخور مجرد مادة بناء، بل كانت سجلاً مقدساً لا يزول بزوال الأجيال.
        </div>
      </div>

    </div>
  );
};
