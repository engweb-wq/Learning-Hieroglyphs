import React, { useState, useEffect, useRef } from 'react';
import { 
  History, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Scroll, 
  Sparkles, 
  Calendar, 
  Layers, 
  Compass, 
  Eye, 
  Feather,
  Info
} from 'lucide-react';
import { TIMELINE_ERAS, GLYPH_EVOLUTION_LIST } from '../../data/timelineData';
import { ScriptTimelineEra, GlyphEvolutionComparison } from '../../types';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';

interface LanguageTimelineProps {
  onOpenTimeMachine?: () => void;
}

export const LanguageTimeline: React.FC<LanguageTimelineProps> = ({ onOpenTimeMachine }) => {
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [selectedGlyphId, setSelectedGlyphId] = useState<string>(GLYPH_EVOLUTION_LIST[0].id);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeEra: ScriptTimelineEra = TIMELINE_ERAS[selectedEraIndex];
  const activeGlyph: GlyphEvolutionComparison = 
    GLYPH_EVOLUTION_LIST.find((g) => g.id === selectedGlyphId) || GLYPH_EVOLUTION_LIST[0];

  // Auto-play timeline progression
  useEffect(() => {
    if (isPlayingAuto) {
      autoPlayTimerRef.current = setInterval(() => {
        setSelectedEraIndex((prev) => {
          const nextIndex = (prev + 1) % TIMELINE_ERAS.length;
          soundFX.playClickSound();
          return nextIndex;
        });
      }, 4500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlayingAuto]);

  const handleSelectEra = (index: number) => {
    soundFX.playClickSound();
    setSelectedEraIndex(index);
    if (isPlayingAuto) setIsPlayingAuto(false);
  };

  const handleNextEra = () => {
    soundFX.playClickSound();
    setSelectedEraIndex((prev) => Math.min(prev + 1, TIMELINE_ERAS.length - 1));
  };

  const handlePrevEra = () => {
    soundFX.playClickSound();
    setSelectedEraIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleAutoPlay = () => {
    soundFX.playAncientChime(580);
    setIsPlayingAuto(!isPlayingAuto);
  };

  const handlePlayNarrative = () => {
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
      return;
    }

    soundFX.playAncientChime(520);
    setIsNarrating(true);
    scribeAudio.speakText(activeEra.audioNarrative, {
      id: `timeline-${activeEra.id}`,
      onEnd: () => setIsNarrating(false),
      onError: () => setIsNarrating(false),
    });
  };

  const handlePlayGlyphSound = (glyph: GlyphEvolutionComparison) => {
    soundFX.playAncientChime(640);
    scribeAudio.speakText(`صوت الرمز: ${glyph.soundAr}. النطق المقابل هو ${glyph.transliteration}`, {
      id: `glyph-sound-${glyph.id}`,
    });
  };

  return (
    <div className="space-y-12 text-right">
      
      {/* Section Header */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-amber-700" />
              <span>خريطة التطور التاريخي للكتابة المصرية القديمة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              من نقوش الأهرام الصخرية إلى حبر البردي واللسان الحي
            </h2>
          </div>

          {/* Autoplay & Navigation Stepper controls */}
          <div className="flex items-center gap-2">
            {onOpenTimeMachine && (
              <button
                type="button"
                onClick={onOpenTimeMachine}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white border border-amber-500/50"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>دخول آلة الزمن ⏳</span>
              </button>
            )}

            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs ${
                isPlayingAuto 
                  ? 'bg-amber-600 text-white animate-pulse' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
              }`}
            >
              {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAuto ? 'إيقاف الجولة' : 'العرض التلقائي'}</span>
            </button>

            <button
              onClick={handlePrevEra}
              disabled={selectedEraIndex === 0}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-35 disabled:cursor-not-allowed text-stone-700 transition-colors"
              title="العصر السابق (أقدم)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextEra}
              disabled={selectedEraIndex === TIMELINE_ERAS.length - 1}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-35 disabled:cursor-not-allowed text-stone-700 transition-colors"
              title="العصر التالي (أحدث)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar max-w-4xl">
          شهدت اللغة المصرية القديمة على مدى أكثر من 3500 عام تحولاً بصرياً مدهشاً؛ فبدأت برموز نحتية تصويرية دقيقة على جدران الأهرامات، ثم اختزلها الكتبة في خطوط هيراطية رشيقة لتسريع الكتابة على ورق البردي، ثم بلغت أوج التجريد بالخط الديموطيقي، وصولاً إلى استقرار حروفها في الأبجدية القبطية وكلماتنا العامية المعاصرة. حرّك المؤشر الزمني بالأسفل لتشهد هذا التحول التاريخي!
        </p>

        {/* Interactive Chronological Timeline Scrubber Bar */}
        <div className="pt-6 pb-2">
          {/* Custom Track Slider */}
          <div className="relative mb-8">
            {/* Background connecting bar */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-stone-200 rounded-full" />
            
            {/* Active progress fill */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 right-0 h-2 bg-gradient-to-l from-amber-800 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${(selectedEraIndex / (TIMELINE_ERAS.length - 1)) * 100}%` }}
            />

            {/* Stepper nodes */}
            <div className="relative flex justify-between items-center z-10">
              {TIMELINE_ERAS.map((era, index) => {
                const isActive = index === selectedEraIndex;
                const isPassed = index <= selectedEraIndex;
                return (
                  <button
                    key={era.id}
                    onClick={() => handleSelectEra(index)}
                    className="group flex flex-col items-center focus:outline-none"
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-md ${
                        isActive
                          ? 'bg-amber-900 text-white ring-4 ring-amber-300 scale-110'
                          : isPassed
                          ? 'bg-amber-600 text-white hover:scale-105'
                          : 'bg-white text-stone-500 border-2 border-stone-300 hover:border-amber-400'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="mt-2 text-center">
                      <div className={`text-xs font-bold transition-colors whitespace-nowrap ${
                        isActive ? 'text-amber-950 scale-105' : 'text-stone-600 group-hover:text-stone-900'
                      }`}>
                        {index === 0 && 'الدولة القديمة'}
                        {index === 1 && 'الدولة الوسطى'}
                        {index === 2 && 'الدولة الحديثة'}
                        {index === 3 && 'العصر المتأخر'}
                        {index === 4 && 'المرحلة القبطية'}
                      </div>
                      <div className="text-[11px] text-stone-600 font-mono hidden sm:block">
                        {era.approximateYears.split(' - ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Native Range Slider for Smooth Scrubbing */}
          <div className="flex items-center gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
            <span className="text-xs font-bold text-amber-900 whitespace-nowrap">
              مؤشر الزمن (اسحب للتنقل السريع):
            </span>
            <input
              type="range"
              min={0}
              max={TIMELINE_ERAS.length - 1}
              step={1}
              value={selectedEraIndex}
              onChange={(e) => handleSelectEra(Number(e.target.value))}
              className="w-full accent-amber-800 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <span className="text-xs font-mono font-bold text-amber-950 px-2.5 py-1 bg-white rounded-lg border border-amber-200 shadow-2xs whitespace-nowrap">
              {activeEra.approximateYears}
            </span>
          </div>
        </div>

      </div>

      {/* Active Era Spotlight Card */}
      <div className="bg-gradient-to-br from-[#FAF5E8] via-white to-[#F5EEDB] border-2 border-amber-800/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Background decorative hieroglyph watermark */}
        <div className="absolute top-2 left-6 text-8xl font-hieroglyphs opacity-10 select-none pointer-events-none text-amber-950">
          {activeEra.glyphSample.split(' ')[0] || '𓇓'}
        </div>

        {/* Era Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-800 text-white text-xs font-bold font-mono">
                العصر {selectedEraIndex + 1} من {TIMELINE_ERAS.length}
              </span>
              <span className="text-xs font-semibold text-stone-600">
                الفترة الزمنية: {activeEra.timePeriodAr}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display-eg">
              {activeEra.eraNameAr}
            </h3>
            
            <div className="text-sm font-medium text-amber-800 font-sans">
              نوع الخط السائد: <strong className="font-bold text-stone-900">{activeEra.scriptNameAr}</strong>
            </div>
          </div>

          {/* Audio narration button for the era */}
          <button
            onClick={handlePlayNarrative}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all whitespace-nowrap self-start md:self-center ${
              isNarrating 
                ? 'bg-amber-700 text-white ring-4 ring-amber-300' 
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-300'
            }`}
          >
            <Volume2 className={`w-5 h-5 text-amber-600 ${isNarrating ? 'animate-bounce' : ''}`} />
            <span>{isNarrating ? 'جارٍ سرد قصة العصر...' : 'استمع للتعليق الصوتي التاريخي'}</span>
          </button>
        </div>

        {/* Grid: Era Script Description & Artifact Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Era Script Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-700" />
                <span>طبيعة الخط وتطوره في هذا العصر:</span>
              </h4>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar bg-white/70 p-4 rounded-2xl border border-amber-200/50">
                {activeEra.scriptDescriptionAr}
              </p>
            </div>

            {/* Writing mediums */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-amber-700" />
                <span>أدوات وخامات التدوين المستخدمة:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeEra.writingMediums.map((medium, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100/70 border border-amber-200/80 rounded-lg text-xs font-bold text-amber-950"
                  >
                    {medium}
                  </span>
                ))}
              </div>
            </div>

            {/* Key script features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>أبرز الخصائص اللغوية والكتابية:</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                {activeEra.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white/60 p-2.5 rounded-xl border border-stone-200/60">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="font-serif-ar">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Artifact Spotlight & Script Sample (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Archaeological Artifact Card */}
            <div className="bg-amber-950 text-amber-50 p-6 rounded-2xl border-2 border-amber-700/40 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>الشاهد الأثري الأبرز لهذا العصر</span>
                </span>
                <span className="font-mono">{activeEra.yearBCE > 0 ? `${activeEra.yearBCE} ق.م` : 'العصر الميلادي'}</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display-eg leading-snug">
                {activeEra.archaeologicalFamousArtifact}
              </h4>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif-ar">
                {activeEra.artifactDescription}
              </p>
            </div>

            {/* Script Inscription Sample */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-3 text-center shadow-2xs">
              <div className="text-xs font-bold text-stone-500">
                عينة من نقوش وكتابات العصر:
              </div>
              <div className="py-3 px-4 bg-amber-50/80 rounded-xl border border-amber-200/80 font-hieroglyphs text-3xl sm:text-4xl text-amber-950 tracking-wider">
                {activeEra.glyphSample}
              </div>
              <p className="text-xs text-stone-600 font-serif-ar">
                نظام الكتابة كان يتكيف دائماً مع سرعة الكاتب وخامة السطح المكتوب عليه.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Glyph Morphing Visualizer (محاكي التحول البصري للرمز) */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-700" />
              <span>محاكي التحول البصري للرمز (Symbol Morphing Visualizer)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
              شاهد كيف تحول رسم الرمز باليد عبر 3000 عام
            </h3>
          </div>

          <button
            onClick={() => handlePlayGlyphSound(activeGlyph)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-xl text-xs sm:text-sm font-bold transition-colors self-start sm:self-center"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>نطق الرمز: {activeGlyph.soundAr}</span>
          </button>
        </div>

        {/* Glyph Selector Tabs */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-stone-600">
            اختر أحد الرموز الستة الكبرى لمتابعة تحوله عبر العصور:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {GLYPH_EVOLUTION_LIST.map((glyph) => {
              const isSelected = glyph.id === selectedGlyphId;
              return (
                <button
                  key={glyph.id}
                  onClick={() => {
                    soundFX.playClickSound();
                    setSelectedGlyphId(glyph.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-900 text-white shadow-sm ring-2 ring-amber-400'
                      : 'bg-stone-100 hover:bg-amber-50 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span className="font-hieroglyphs text-lg">{glyph.oldKingdomHieroglyph}</span>
                  <span>{glyph.nameAr.split(' ')[0]} ({glyph.transliteration})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Step Visual Evolution Strip for the Active Glyph */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>مسار تطور رمز «{activeGlyph.nameAr}» عبر المحطات الخمس:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            
            {/* Step 1: Old Kingdom */}
            <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
              selectedEraIndex === 0 
                ? 'bg-amber-100/90 border-amber-800 ring-2 ring-amber-400 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200'
            }`}>
              <div className="text-xs font-bold text-amber-900">1. الدولة القديمة</div>
              <div className="text-[11px] text-stone-500">نحت غائر تفصيلي</div>
              <div className="h-20 flex items-center justify-center font-hieroglyphs text-4xl sm:text-5xl text-amber-950">
                {activeGlyph.oldKingdomHieroglyph}
              </div>
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 py-1 rounded-md border border-stone-200">
                رسم تصويري كامل
              </div>
            </div>

            {/* Step 2: Middle Kingdom */}
            <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
              selectedEraIndex === 1 
                ? 'bg-amber-100/90 border-amber-800 ring-2 ring-amber-400 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200'
            }`}>
              <div className="text-xs font-bold text-amber-900">2. الدولة الوسطى</div>
              <div className="text-[11px] text-stone-500">هيروغليفية معيارية</div>
              <div className="h-20 flex items-center justify-center font-hieroglyphs text-4xl sm:text-5xl text-amber-950">
                {activeGlyph.middleKingdomHieroglyph}
              </div>
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 py-1 rounded-md border border-stone-200">
                تناسق هندسي ومربعات
              </div>
            </div>

            {/* Step 3: Hieratic (New Kingdom) */}
            <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
              selectedEraIndex === 2 
                ? 'bg-amber-100/90 border-amber-800 ring-2 ring-amber-400 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200'
            }`}>
              <div className="text-xs font-bold text-amber-900">3. الخط الهيراطيقي</div>
              <div className="text-[11px] text-stone-500">ضربة قلم متصلة</div>
              <div className="h-20 flex items-center justify-center text-xs font-serif-ar text-amber-950 font-bold px-2 leading-relaxed bg-amber-50/50 rounded-lg">
                {activeGlyph.hieraticScript}
              </div>
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 py-1 rounded-md border border-stone-200">
                حبر البردي السريع
              </div>
            </div>

            {/* Step 4: Demotic */}
            <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
              selectedEraIndex === 3 
                ? 'bg-amber-100/90 border-amber-800 ring-2 ring-amber-400 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200'
            }`}>
              <div className="text-xs font-bold text-amber-900">4. الخط الديموطيقي</div>
              <div className="text-[11px] text-stone-500">شديد التجريد والاختزال</div>
              <div className="h-20 flex items-center justify-center text-xs font-serif-ar text-stone-800 font-bold px-2 leading-relaxed bg-stone-100/70 rounded-lg">
                {activeGlyph.demoticScript}
              </div>
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 py-1 rounded-md border border-stone-200">
                خط المعاملات الشعبية
              </div>
            </div>

            {/* Step 5: Coptic & Living Heritage */}
            <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
              selectedEraIndex === 4 
                ? 'bg-amber-100/90 border-amber-800 ring-2 ring-amber-400 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200'
            }`}>
              <div className="text-xs font-bold text-amber-900">5. الحرف القبطي / الحي</div>
              <div className="text-[11px] text-stone-500">الجسر اللغوي المعاصر</div>
              <div className="h-20 flex items-center justify-center font-bold text-2xl sm:text-3xl text-amber-950 font-serif">
                {activeGlyph.copticScript}
              </div>
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 py-1 rounded-md border border-stone-200">
                صوت حي في لساننا اليوم
              </div>
            </div>

          </div>

          {/* Morphing evolution note */}
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-950">
                شرح مسار التحول اللغوي لهذا الرمز:
              </span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif-ar">
                {activeGlyph.evolutionNote}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Side-by-Side Glyph Evolution Matrix (مصفوفة المقارنة الشاملة) */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-amber-800">
            مصفوفة التطور المقارنة (Glyph Evolution Matrix)
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
            جدول المقارنة الفورية لكل الرموز عبر العصور الخمسة
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
            العمود المظلل باللون الذهبي يمثل العصر المحدد حالياً في شريط التمرير الزمني بالأعلى. انقر على أي سطر لمعاينته في المحاكي.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-2xs">
          <table className="w-full text-right text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300">
                <th className="p-3.5">الرمز والمعنى</th>
                <th className="p-3.5">الصوت</th>
                <th className={`p-3.5 transition-colors ${selectedEraIndex === 0 ? 'bg-amber-200/90 text-amber-950 border-x-2 border-amber-700' : ''}`}>
                  الدولة القديمة
                </th>
                <th className={`p-3.5 transition-colors ${selectedEraIndex === 1 ? 'bg-amber-200/90 text-amber-950 border-x-2 border-amber-700' : ''}`}>
                  الدولة الوسطى
                </th>
                <th className={`p-3.5 transition-colors ${selectedEraIndex === 2 ? 'bg-amber-200/90 text-amber-950 border-x-2 border-amber-700' : ''}`}>
                  الهيراطيقي
                </th>
                <th className={`p-3.5 transition-colors ${selectedEraIndex === 3 ? 'bg-amber-200/90 text-amber-950 border-x-2 border-amber-700' : ''}`}>
                  الديموطيقي
                </th>
                <th className={`p-3.5 transition-colors ${selectedEraIndex === 4 ? 'bg-amber-200/90 text-amber-950 border-x-2 border-amber-700' : ''}`}>
                  القبطي / المعاصر
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {GLYPH_EVOLUTION_LIST.map((g) => {
                const isSelected = g.id === selectedGlyphId;
                return (
                  <tr
                    key={g.id}
                    onClick={() => {
                      soundFX.playClickSound();
                      setSelectedGlyphId(g.id);
                    }}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/80 font-medium' : 'hover:bg-stone-50'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-amber-950 flex items-center gap-2">
                      <span className="font-hieroglyphs text-xl">{g.oldKingdomHieroglyph}</span>
                      <span>{g.nameAr}</span>
                    </td>
                    <td className="p-3.5 font-mono text-amber-800">{g.transliteration}</td>
                    
                    {/* Old Kingdom Col */}
                    <td className={`p-3.5 font-hieroglyphs text-2xl text-center transition-colors ${
                      selectedEraIndex === 0 ? 'bg-amber-100/80 font-bold border-x-2 border-amber-700' : ''
                    }`}>
                      {g.oldKingdomHieroglyph}
                    </td>

                    {/* Middle Kingdom Col */}
                    <td className={`p-3.5 font-hieroglyphs text-2xl text-center transition-colors ${
                      selectedEraIndex === 1 ? 'bg-amber-100/80 font-bold border-x-2 border-amber-700' : ''
                    }`}>
                      {g.middleKingdomHieroglyph}
                    </td>

                    {/* Hieratic Col */}
                    <td className={`p-3.5 text-xs text-stone-700 transition-colors ${
                      selectedEraIndex === 2 ? 'bg-amber-100/80 font-bold border-x-2 border-amber-700' : ''
                    }`}>
                      {g.hieraticScript}
                    </td>

                    {/* Demotic Col */}
                    <td className={`p-3.5 text-xs text-stone-700 transition-colors ${
                      selectedEraIndex === 3 ? 'bg-amber-100/80 font-bold border-x-2 border-amber-700' : ''
                    }`}>
                      {g.demoticScript}
                    </td>

                    {/* Coptic Col */}
                    <td className={`p-3.5 font-bold text-amber-900 transition-colors ${
                      selectedEraIndex === 4 ? 'bg-amber-100/80 font-bold border-x-2 border-amber-700' : ''
                    }`}>
                      {g.copticScript}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational Historical Insights Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold text-amber-400">
              أسرار وخبايا مدرسة الكتبة الفراعنة 📜
            </span>
            <h4 className="text-xl sm:text-2xl font-bold font-display-eg">
              لماذا احتاج الكاتب المصري إلى ثلاثة خطوط مختلفة؟
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar">
              لم تكن الخطوط المصرية منفصلة، بل تكاملت كمنظومة واحدة: الهيروغليفية كانت «خط الأبدية» لنقش الصلوات على جدران المعابد الحجرية، والهيراطيقية كانت «خط الإدارة والأدب» لتدوين رسائل الفرعون السريعة بالمداد على البردي، أما الديموطيقية فكانت «خط الشعب» لتسجيل عقود البيع والزواج والمعاملات اليومية!
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button
              onClick={() => {
                soundFX.playAncientChime(520);
                setSelectedEraIndex(3); // Jump to Demotic Rosetta Stone era
              }}
              className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md text-center"
            >
              انتقل لقصة حجر رشيد والخط الديموطيقي ➔
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
