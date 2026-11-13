import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  History, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Feather, 
  Hammer, 
  Scroll, 
  CheckCircle2, 
  HelpCircle, 
  Crown, 
  Landmark, 
  ArrowRight,
  Eye,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { 
  TIME_MACHINE_ERAS, 
  TimeMachineEra, 
  EVOLUTION_SAMPLES, 
  EraEvolutionSample 
} from '../../data/timeMachineData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

export const EgyptianTimeMachine: React.FC = () => {
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const activeEra: TimeMachineEra = TIME_MACHINE_ERAS[selectedEraIndex] || TIME_MACHINE_ERAS[0];

  // Active Symbol for evolution comparison
  const [selectedSampleKey, setSelectedSampleKey] = useState<string>(EVOLUTION_SAMPLES[0].wordKey);
  const activeSample: EraEvolutionSample = 
    EVOLUTION_SAMPLES.find(s => s.wordKey === selectedSampleKey) || EVOLUTION_SAMPLES[0];

  // Audio narration state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Time Traveler Quiz state
  const [quizAnsweredId, setQuizAnsweredId] = useState<string | null>(null);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState<boolean>(false);

  // Switch Era with time warp audio
  const handleSelectEra = (index: number) => {
    if (index === selectedEraIndex) return;
    soundFX.playStoneDoorSlide();
    soundFX.playAncientChime(560);
    setSelectedEraIndex(index);
    setQuizAnsweredId(null);
    setQuizScoreAwarded(false);
  };

  const handleNextEra = () => {
    if (selectedEraIndex < TIME_MACHINE_ERAS.length - 1) {
      handleSelectEra(selectedEraIndex + 1);
    }
  };

  const handlePrevEra = () => {
    if (selectedEraIndex > 0) {
      handleSelectEra(selectedEraIndex - 1);
    }
  };

  // Toggle Audio Narration
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      soundFX.playAncientChime(520);
      scribeAudio.speakText(activeEra.audioNarrativeScript, {
        id: `time-machine-${activeEra.id}`,
        onEnd: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false)
      });
    }
  };

  // Handle Quiz selection
  const handleQuizChoice = (optionId: string, isCorrect: boolean) => {
    setQuizAnsweredId(optionId);
    if (isCorrect) {
      soundFX.playSuccessSound();
      if (!quizScoreAwarded) {
        studentProgress.addPoints(50, `إتقان أساليب كتابة ${activeEra.nameAr}`, 'التعلم الذاتي');
        setQuizScoreAwarded(true);
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch {
          // ignore
        }
      }
    } else {
      soundFX.playTempleRumble();
    }
  };

  return (
    <div className="space-y-10 text-right select-none" dir="rtl">
      
      {/* Time Machine Celestial Portal Cockpit */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-r from-[#1E110A] via-[#2D1B10] to-[#120B07] text-white p-6 sm:p-10 shadow-2xl space-y-6">
        
        {/* Decorative Constellations & Eye of Horus background */}
        <div className="absolute left-6 top-4 text-9xl font-hieroglyphs text-amber-500/10 pointer-events-none select-none">
          𓇳 𓁹 𓋹
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <History className="w-4 h-4 text-amber-400" />
              <span>مقصورة السفر عبر الزمن (The Egyptian Chrono-Portal)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-100 font-display-eg tracking-tight">
              آلة الزمن: رحلة تطور الخط الهيروغليفي عبر 2000 عام ⏳
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
              تنقّل بين العصور الذهبية الثلاثة لمصر القديمة؛ وشاهد كيف تحولت الكتابة من نحت صخري صرحي يخلد ملوك الأهرام، إلى أدب كلاسيكي منضبط في مربعات، ثم إلى خط هيراطيقي سريع ونقوش إمبراطورية مذهبة!
            </p>
          </div>

          {/* Audio narration button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all self-start md:self-center ${
              isAudioPlaying 
                ? 'bg-amber-600 text-white ring-4 ring-amber-400 animate-pulse' 
                : 'bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50'
            }`}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4 text-amber-200" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span>{isAudioPlaying ? 'إيقاف السرد الصوتي' : 'استمع لراوي العصر'}</span>
          </button>
        </div>

        {/* 3 Major Eras Time-Dial Buttons */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-amber-500/30">
          {TIME_MACHINE_ERAS.map((era, idx) => {
            const isActive = idx === selectedEraIndex;

            return (
              <button
                key={era.id}
                type="button"
                onClick={() => handleSelectEra(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-right transition-all border flex flex-col justify-between relative group ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-600 to-amber-800 border-amber-300 text-white shadow-xl scale-[1.02] ring-2 ring-amber-400/50'
                    : 'bg-black/40 hover:bg-black/60 border-amber-900/60 text-amber-200/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-amber-950/70 text-amber-200' : 'bg-stone-900 text-stone-400'
                  }`}>
                    {era.approximateYearsBCE}
                  </span>
                  
                  <span className="text-xl">
                    {idx === 0 ? '🏛️' : idx === 1 ? '📜' : '👑'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-extrabold font-display-eg">
                    {era.nameAr.split(' (')[0]}
                  </h3>
                  <div className={`text-xs mt-0.5 font-serif-ar ${isActive ? 'text-amber-100' : 'text-stone-400'}`}>
                    {era.eraBadgeAr}
                  </div>
                </div>

                {isActive && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                    <span>العصر المفعل في آلة الزمن</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Chronological Slider Stepper */}
        <div className="relative z-10 flex items-center justify-between text-xs text-amber-300 pt-2">
          <button
            onClick={handlePrevEra}
            disabled={selectedEraIndex === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            <span>العصر الأقدم</span>
          </button>

          <span className="font-mono text-amber-200">
            {selectedEraIndex + 1} / {TIME_MACHINE_ERAS.length} عصور تاريخية كبرى
          </span>

          <button
            onClick={handleNextEra}
            disabled={selectedEraIndex === TIME_MACHINE_ERAS.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span>العصر الأحدث</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Era Showcase: Visual Inscription Canvas & Scribal Workshop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Authentic Era Inscription & Monumental Inscription (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Era Writing Atmosphere Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-6 ${activeEra.themeColors.bgGradient} ${activeEra.themeColors.border}`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-300/80 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-900 block font-mono">
                  {activeEra.dynastiesAr} | العاصمة: {activeEra.capitalCityAr}
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg mt-1">
                  {activeEra.nameAr}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {activeEra.famousPharaohs.slice(0, 3).map((king, i) => (
                  <span key={i} className="text-[11px] font-bold bg-white/80 border border-amber-300 px-2.5 py-0.5 rounded-lg text-amber-950">
                    {king}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-stone-800 font-serif-ar leading-relaxed bg-white/60 p-4 rounded-2xl border border-stone-200">
              {activeEra.writingEvolutionSummaryAr}
            </p>

            {/* Visual Monumental Inscription Sample of this Era */}
            <div className="p-5 rounded-2xl bg-[#23150B] text-white border-2 border-amber-500/40 shadow-inner space-y-3 text-center">
              <div className="flex items-center justify-between text-xs text-amber-300">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeEra.famousMonumentalInscription.titleAr}</span>
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  {activeEra.famousMonumentalInscription.sourceMonumentAr}
                </span>
              </div>

              {/* Inscription Hieroglyphs */}
              <div className="py-3 text-3xl sm:text-5xl font-hieroglyphs text-amber-200 tracking-widest drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)] select-none">
                {activeEra.famousMonumentalInscription.hieroglyphs}
              </div>

              <div className="text-xs text-amber-100 font-bold font-serif-ar">
                « {activeEra.famousMonumentalInscription.translationAr} »
              </div>

              <div className="text-[11px] text-stone-300 font-mono" dir="ltr">
                {activeEra.famousMonumentalInscription.transliteration}
              </div>

              <p className="text-[11px] text-stone-400 font-serif-ar pt-2 border-t border-amber-900/60 leading-relaxed">
                <strong>التحليل الإبيغرافي:</strong> {activeEra.famousMonumentalInscription.analysisAr}
              </p>
            </div>

            {/* Scribal Style Characteristics 4 Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-800" />
                <span>الخصائص الفنية والكتابية المميزة لعصر {activeEra.nameAr.split(' (')[0]}:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeEra.scribalStyleCharacteristics.map((char, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/90 border border-stone-200/90 shadow-2xs space-y-1">
                    <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <span className="text-base font-hieroglyphs">{char.icon}</span>
                      <span>{char.titleAr}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 font-serif-ar leading-relaxed">
                      {char.descriptionAr}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Time Traveler Quiz Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-amber-950 text-white border-2 border-amber-500/40 shadow-md space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <span className="font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>تحدي مسافر الزمن: فحص أسلوب التدوين</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-200 bg-amber-900/80 px-2 py-0.5 rounded-md border border-amber-600/50">
                +50 XP
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-100 font-serif-ar">
                {activeEra.timeQuiz.questionAr}
              </h4>
              <div className="text-center py-2 text-2xl font-hieroglyphs text-amber-300 select-none">
                {activeEra.timeQuiz.inscriptionSnippet}
              </div>
              <p className="text-[11px] text-amber-200/80 font-serif-ar">
                💡 تلميح: {activeEra.timeQuiz.clueAr}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {activeEra.timeQuiz.options.map(opt => {
                const isSelected = quizAnsweredId === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleQuizChoice(opt.id, opt.isCorrect)}
                    className={`w-full p-3 rounded-xl text-right text-xs transition-all border ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-100'
                          : 'bg-rose-950 border-rose-500 text-rose-100'
                        : 'bg-stone-900/80 hover:bg-stone-800 border-amber-900/60 text-stone-200'
                    }`}
                  >
                    <div className="font-bold">{opt.labelAr}</div>
                    {isSelected && (
                      <div className="text-[11px] mt-1 pt-1 border-t border-white/20 font-serif-ar">
                        {opt.explanationAr}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Scribal Mediums & Evolution Side-by-Side (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Royal Cartouche Style for this Era */}
          <div className="p-5 rounded-3xl bg-[#FAF5E8] border border-[#E8DFC9] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
              <span className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-700" />
                <span>{activeEra.royalCartoucheStyle.titleAr}</span>
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                {activeEra.royalCartoucheStyle.kingNameAr}
              </span>
            </div>

            <div className="text-center py-3 bg-white rounded-2xl border border-amber-200 shadow-inner">
              <span className="text-3xl sm:text-4xl font-hieroglyphs text-stone-950 tracking-wider select-none">
                𓍹{activeEra.royalCartoucheStyle.sampleHieroglyphs}𓍺
              </span>
            </div>

            <p className="text-xs text-stone-700 font-serif-ar leading-relaxed">
              {activeEra.royalCartoucheStyle.techniqueDescriptionAr}
            </p>
          </div>

          {/* Scribal Mediums & Tools Card */}
          <div className="p-5 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-amber-700" />
                <span>خامات التدوين الأساسية في {activeEra.nameAr.split(' (')[0]}:</span>
              </h4>
            </div>

            <div className="space-y-2">
              {activeEra.scribalMediums.map((med, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs flex items-center justify-between">
                  <span className="font-bold text-stone-900">{med.nameAr}</span>
                  <span className="text-[11px] text-stone-600 font-serif-ar">{med.roleAr}</span>
                </div>
              ))}
            </div>

            {/* Tools list */}
            <div className="pt-2 border-t border-stone-200 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-amber-700" />
                <span>أدوات الكاتب والنحات:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeEra.scribalToolsUsed.map((tool, i) => (
                  <span key={i} className="text-[11px] bg-amber-50 text-amber-950 border border-amber-200 px-2 py-0.5 rounded-md">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Symbol Evolution Morphing Card */}
          <div className="p-5 rounded-3xl bg-white border-2 border-amber-400 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-900 font-bold border-b border-stone-200 pb-3">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-700" />
                <span>المقارن البصري: تطور الرمز عبر العصور الثلاثة</span>
              </span>
            </div>

            {/* Symbol Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {EVOLUTION_SAMPLES.map(sample => {
                const isSelected = sample.wordKey === selectedSampleKey;
                return (
                  <button
                    key={sample.wordKey}
                    type="button"
                    onClick={() => {
                      soundFX.playClickSound();
                      setSelectedSampleKey(sample.wordKey);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isSelected 
                        ? 'bg-amber-900 text-white shadow-xs' 
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <span className="font-hieroglyphs">{sample.oldKingdomStyle.hieroglyphs}</span>
                    <span>{sample.nameAr.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Symbol Concept */}
            <div className="text-xs text-stone-600 font-serif-ar">
              <strong>الدلالة المقدسة:</strong> {activeSample.conceptAr} ({activeSample.transliteration} - {activeSample.gardinerCode})
            </div>

            {/* 3 Eras Side-by-Side Cards */}
            <div className="space-y-3 pt-1">
              
              {/* Old Kingdom Style */}
              <div className={`p-3 rounded-2xl border transition-all ${
                selectedEraIndex === 0 ? 'ring-2 ring-amber-500 shadow-md' : 'opacity-85'
              } ${activeSample.oldKingdomStyle.textureClass}`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>1. الدولة القديمة (نحت صخري)</span>
                  <span className="text-[10px] opacity-75">{activeSample.oldKingdomStyle.mediumAr}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-hieroglyphs select-none">
                    {activeSample.oldKingdomStyle.hieroglyphs}
                  </span>
                  <p className="text-[11px] font-serif-ar max-w-[210px] text-right">
                    {activeSample.oldKingdomStyle.descriptionAr}
                  </p>
                </div>
              </div>

              {/* Middle Kingdom Style */}
              <div className={`p-3 rounded-2xl border transition-all ${
                selectedEraIndex === 1 ? 'ring-2 ring-amber-500 shadow-md' : 'opacity-85'
              } ${activeSample.middleKingdomStyle.textureClass}`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>2. الدولة الوسطى (مربعات معيارية)</span>
                  <span className="text-[10px] opacity-75">{activeSample.middleKingdomStyle.mediumAr}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-hieroglyphs select-none">
                    {activeSample.middleKingdomStyle.hieroglyphs}
                  </span>
                  <p className="text-[11px] font-serif-ar max-w-[210px] text-right">
                    {activeSample.middleKingdomStyle.descriptionAr}
                  </p>
                </div>
              </div>

              {/* New Kingdom Style */}
              <div className={`p-3 rounded-2xl border transition-all ${
                selectedEraIndex === 2 ? 'ring-2 ring-amber-500 shadow-md' : 'opacity-85'
              } ${activeSample.newKingdomStyle.textureClass}`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>3. الدولة الحديثة (إمبراطوري / هيراطيقي)</span>
                  <span className="text-[10px] opacity-75">{activeSample.newKingdomStyle.mediumAr}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-hieroglyphs select-none">
                    {activeSample.newKingdomStyle.hieroglyphs}
                  </span>
                  <p className="text-[11px] font-serif-ar max-w-[210px] text-right">
                    {activeSample.newKingdomStyle.descriptionAr}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Historical Educational Footer */}
      <div className="p-5 rounded-2xl bg-[#F7F4EB] border border-[#E8DFC9] flex items-start gap-3 text-xs text-stone-700 leading-relaxed font-serif-ar">
        <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-1">
            فلسفة التطور الكتابي في الحضارة المصرية (Living Scribal Evolution):
          </strong>
          لم تكن أشكال الحروف المصرية القديمة جامدة، بل كانت كائناً حياً يتنفس مع متطلبات كل عصر. ففي الدولة القديمة كانت الكتابة رسالة للأبدية موجهة للآلهة، وفي الدولة الوسطى أصبحت نموذجاً للأدب الرفيع والتناغم المجتمعي، وفي الدولة الحديثة تحولت إلى لغة إمبراطورية عالمية تضبط الجيوش وتزين المعابد وتحفظ أسرار محاكمة الموتى.
        </div>
      </div>

    </div>
  );
};
