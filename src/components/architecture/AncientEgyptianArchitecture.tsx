import React, { useState } from 'react';
import { 
  Landmark, 
  Sparkles, 
  Layers, 
  Compass, 
  Volume2, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight,
  BookOpen,
  Eye,
  Columns
} from 'lucide-react';
import { ARCHITECTURE_BUILDING_TYPES, ARCHITECTURAL_ELEMENTS_GLOSSARY } from '../../data/architectureData';
import { ArchitectureCategory, ArchitectureBuildingType, ArchitectureComponentHotspot } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

export const AncientEgyptianArchitecture: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ArchitectureCategory>('pyramids');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('pyr-comp-1');
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'schematic' | 'comparison' | 'examples' | 'glossary'>('schematic');

  const currentType: ArchitectureBuildingType = 
    ARCHITECTURE_BUILDING_TYPES.find(b => b.id === activeCategory) || ARCHITECTURE_BUILDING_TYPES[0];

  const activeComponent: ArchitectureComponentHotspot = 
    currentType.keyComponents.find(c => c.id === selectedComponentId) || currentType.keyComponents[0];

  // Switch category
  const handleSelectCategory = (cat: ArchitectureCategory) => {
    soundFX.playClickSound();
    setActiveCategory(cat);
    const targetType = ARCHITECTURE_BUILDING_TYPES.find(b => b.id === cat);
    if (targetType && targetType.keyComponents[0]) {
      setSelectedComponentId(targetType.keyComponents[0].id);
    }
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
    }
  };

  // Select component hotspot
  const handleSelectComponent = (comp: ArchitectureComponentHotspot) => {
    soundFX.playClickSound();
    setSelectedComponentId(comp.id);
  };

  // Audio narration
  const handlePlayNarration = () => {
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
      return;
    }

    setIsNarrating(true);
    soundFX.playAncientChime(540);
    scribeAudio.speakText(currentType.audioNarrationScript, {
      id: `arch-${currentType.id}`,
      onEnd: () => setIsNarrating(false),
      onError: () => setIsNarrating(false)
    });
  };

  // Pronounce glossary item
  const handlePronounceGlossary = (text: string) => {
    soundFX.playClickSound();
    scribeAudio.speakText(text);
  };

  return (
    <div className="space-y-10 text-right" dir="rtl">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-300/80 bg-gradient-to-r from-amber-950 via-[#26190e] to-stone-900 text-white p-6 sm:p-10 shadow-xl space-y-4">
        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>العمارة المصرية القديمة (Ancient Egyptian Architecture)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 font-display-eg tracking-tight">
            فلسفة البناء وهندسة الخلود: مقارنة الأهرامات والمعابد الجنائزية ومعابد الآلهة
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-serif-ar max-w-3xl">
            لم تكن المباني في مصر القديمة مجرد جدران وأحجار، بل كانت تعبيراً كونياً دقيقاً عن رحلة الروح وفلسفة خلق العالم. استكشف الفروق الجوهرية بين الأهرامات، والمعابد الجنائزية (معابد ملايين السنين)، ومعابد العبادة الرسمية للأرباب من خلال المخططات المعمارية والمصطلحات الهيروغليفية الأصلية.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handlePlayNarration}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                isNarrating
                  ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300/40'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/50'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isNarrating ? 'animate-bounce text-stone-950' : 'text-amber-400'}`} />
              <span>{isNarrating ? 'جارٍ السرد الصوتي المعماري...' : 'استمع للشرح الصوتي للنوع المعماري'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark Hieroglyph */}
        <div className="absolute left-6 bottom-4 opacity-10 pointer-events-none text-8xl font-hieroglyphs select-none">
          𓉴 𓉗 𓉢
        </div>
      </div>

      {/* Building Type Selector Tabs (Three Primary Classes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ARCHITECTURE_BUILDING_TYPES.map((building) => {
          const isSelected = building.id === activeCategory;
          return (
            <button
              key={building.id}
              onClick={() => handleSelectCategory(building.id)}
              className={`p-5 rounded-2xl border text-right transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                isSelected
                  ? 'bg-amber-950 text-white border-amber-500 ring-2 ring-amber-400/80 shadow-lg scale-[1.01]'
                  : 'bg-white hover:bg-amber-50/60 text-stone-800 border-[#E8DFC9] hover:border-amber-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {building.badgeAr}
                  </span>
                  <span className="font-hieroglyphs text-xl text-amber-400 font-bold">
                    {building.hieroglyphName}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold font-display-eg">
                  {building.titleAr}
                </h3>

                <p className={`text-xs leading-relaxed font-serif-ar line-clamp-2 ${
                  isSelected ? 'text-amber-100/80' : 'text-stone-600'
                }`}>
                  {building.summaryAr}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-300/20 flex items-center justify-between text-[11px] font-medium">
                <span className={isSelected ? 'text-amber-300' : 'text-stone-600'}>
                  الاسم القديم: <strong className="font-bold">{building.pronunciationAr}</strong> ({building.transliteration})
                </span>
                <span className={`transition-transform group-hover:translate-x-1 ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                  عرض المخطط ➔
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-navigation View Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveViewMode('schematic')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeViewMode === 'schematic'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Columns className="w-4 h-4" />
            <span>المخطط الهندسي التفاعلي (Blueprint)</span>
          </button>

          <button
            onClick={() => setActiveViewMode('comparison')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeViewMode === 'comparison'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>مصفوفة المقارنة الجوهرية (Comparison Matrix)</span>
          </button>

          <button
            onClick={() => setActiveViewMode('examples')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeViewMode === 'examples'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>نماذج معمارية خالدة ({currentType.famousExamples.length})</span>
          </button>

          <button
            onClick={() => setActiveViewMode('glossary')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeViewMode === 'glossary'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>معجم العمارة الهيروغليفي</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          النوع الحالي: {currentType.titleEn}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE ARCHITECTURAL SCHEMATIC (BLUEPRINT) */}
      {activeViewMode === 'schematic' && (
        <div className="space-y-8">
          
          {/* Blueprint Canvas Container */}
          <div className="bg-[#1C2028] border-2 border-amber-600/50 rounded-3xl p-5 sm:p-8 text-amber-50 shadow-2xl relative overflow-hidden">
            
            {/* Blueprint Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-700">
              <div className="space-y-1">
                <div className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>ARCHITECTURAL SCHEMATIC // EGYPTIAN ROYAL BLUEPRINT</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display-eg">
                  {currentType.titleAr} — مسار التكوين المعماري
                </h3>
              </div>

              <div className="text-xs text-stone-400 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700 font-mono">
                {currentType.diagramDescriptionAr}
              </div>
            </div>

            {/* SVG SCHEMATIC DIAGRAM BASED ON CURRENT ACTIVE TYPE */}
            <div className="py-6 sm:py-8 overflow-x-auto flex justify-center items-center">
              
              {/* DIAGRAM 1: PYRAMID COMPLEX (المجمع الهرمي الرباعي) */}
              {activeCategory === 'pyramids' && (
                <div className="w-full max-w-4xl min-w-[700px]">
                  <svg viewBox="0 0 900 360" className="w-full h-auto drop-shadow-md select-none font-sans">
                    {/* Background Grid Pattern */}
                    <defs>
                      <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2B3442" strokeWidth="0.8" />
                      </pattern>
                      <linearGradient id="pyr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>
                      <linearGradient id="nile-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#0369A1" />
                      </linearGradient>
                    </defs>

                    <rect width="900" height="360" fill="url(#blueprint-grid)" rx="16" />

                    {/* Nile River Basin at Far Right (East) */}
                    <rect x="750" y="40" width="120" height="280" rx="8" fill="url(#nile-grad)" opacity="0.85" />
                    <text x="810" y="180" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="bold">شاطئ النيل / القناة</text>
                    <text x="810" y="200" textAnchor="middle" fill="#BAE6FD" fontSize="10">وصول الموكب الملكي</text>

                    {/* 1. Valley Temple */}
                    <g 
                      onClick={() => handleSelectComponent(currentType.keyComponents[0])}
                      className="cursor-pointer group"
                    >
                      <rect 
                        x="640" y="110" width="90" height="140" rx="6" 
                        fill={selectedComponentId === 'pyr-comp-1' ? '#0891B2' : '#334155'} 
                        stroke={selectedComponentId === 'pyr-comp-1' ? '#38BDF8' : '#64748B'} 
                        strokeWidth="2.5" 
                      />
                      <text x="685" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">معبد الوادي</text>
                      <text x="685" y="190" textAnchor="middle" fill="#38BDF8" fontSize="10 font-hieroglyphs">𓉗𓅱𓏏 𓈗</text>
                      <circle cx="685" cy="220" r="10" fill="#0284C7" />
                      <text x="685" y="224" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">1</text>
                    </g>

                    {/* 2. Causeway (الطريق الصاعد) */}
                    <g 
                      onClick={() => handleSelectComponent(currentType.keyComponents[1])}
                      className="cursor-pointer group"
                    >
                      <path 
                        d="M 640 180 L 450 180" 
                        stroke={selectedComponentId === 'pyr-comp-2' ? '#F59E0B' : '#94A3B8'} 
                        strokeWidth="16" 
                        strokeDasharray="4 2"
                      />
                      <rect 
                        x="480" y="165" width="130" height="30" rx="4"
                        fill={selectedComponentId === 'pyr-comp-2' ? '#D97706' : '#1E293B'} 
                        stroke="#F59E0B" strokeWidth="1.5"
                      />
                      <text x="545" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">الطريق الصاعد المسقوف</text>
                      <circle cx="545" cy="210" r="10" fill="#D97706" />
                      <text x="545" y="214" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">2</text>
                    </g>

                    {/* 3. Mortuary Temple (المعبد الجنائزي الشرقي) */}
                    <g 
                      onClick={() => handleSelectComponent(currentType.keyComponents[2])}
                      className="cursor-pointer group"
                    >
                      <rect 
                        x="340" y="115" width="90" height="130" rx="6" 
                        fill={selectedComponentId === 'pyr-comp-3' ? '#D97706' : '#334155'} 
                        stroke={selectedComponentId === 'pyr-comp-3' ? '#FBBF24' : '#64748B'} 
                        strokeWidth="2.5" 
                      />
                      <text x="385" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">المعبد الجنائزي</text>
                      <text x="385" y="190" textAnchor="middle" fill="#FBBF24" fontSize="10 font-hieroglyphs">𓉗𓂓</text>
                      <circle cx="385" cy="220" r="10" fill="#B45309" />
                      <text x="385" y="224" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">3</text>
                    </g>

                    {/* 4. The Main Pyramid (الهرم الأكبر) */}
                    <g 
                      onClick={() => handleSelectComponent(currentType.keyComponents[3])}
                      className="cursor-pointer group"
                    >
                      {/* Pyramid Triangle */}
                      <polygon 
                        points="180,40 50,300 310,300" 
                        fill={selectedComponentId === 'pyr-comp-4' ? 'url(#pyr-grad)' : '#475569'} 
                        stroke={selectedComponentId === 'pyr-comp-4' ? '#FDE68A' : '#94A3B8'} 
                        strokeWidth="3" 
                      />
                      {/* Golden Capstone Benben */}
                      <polygon points="180,40 168,65 192,65" fill="#FBBF24" stroke="#FFF" strokeWidth="1" />
                      
                      {/* Internal Chambers Cross-section simulation */}
                      <path d="M 90 270 L 180 170" stroke="#FDE68A" strokeWidth="2.5" />
                      <rect x="160" y="150" width="40" height="25" rx="3" fill="#B45309" stroke="#FDE68A" strokeWidth="1.5" />
                      <text x="180" y="167" textAnchor="middle" fill="#FFF" fontSize="9">حجرة الدفن</text>

                      <text x="180" y="240" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="extrabold">الهرم الملكي</text>
                      <text x="180" y="260" textAnchor="middle" fill="#FDE68A" fontSize="12 font-hieroglyphs">𓉴</text>

                      <circle cx="180" cy="285" r="10" fill="#B45309" />
                      <text x="180" y="289" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">4</text>
                    </g>

                    {/* 5. Queens Pyramids & Solar Boats */}
                    <g 
                      onClick={() => handleSelectComponent(currentType.keyComponents[4])}
                      className="cursor-pointer group"
                    >
                      <polygon points="270,250 240,310 300,310" fill="#64748B" stroke="#CBD5E1" strokeWidth="1.5" />
                      <ellipse cx="230" cy="80" rx="40" ry="16" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="230" y="85" textAnchor="middle" fill="#FCD34D" fontSize="10">حفر مراكب الشمس 𓊛</text>
                      <circle cx="230" cy="50" r="10" fill="#78350F" />
                      <text x="230" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">5</text>
                    </g>

                    {/* Compass / Orientation indicator */}
                    <g transform="translate(60, 50)">
                      <circle cx="20" cy="20" r="18" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                      <text x="20" y="14" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="bold">شمال</text>
                      <text x="32" y="24" textAnchor="middle" fill="#94A3B8" fontSize="8">شرق</text>
                      <text x="8" y="24" textAnchor="middle" fill="#94A3B8" fontSize="8">غرب</text>
                      <path d="M 20 6 L 20 34" stroke="#F59E0B" strokeWidth="1.5" />
                    </g>

                  </svg>
                </div>
              )}

              {/* DIAGRAM 2: MORTUARY TEMPLE (معبد ملايين السنين الجنائزي - مثل الدير البحري والرامسيوم) */}
              {activeCategory === 'mortuary_temples' && (
                <div className="w-full max-w-4xl min-w-[700px]">
                  <svg viewBox="0 0 900 360" className="w-full h-auto drop-shadow-md select-none font-sans">
                    <rect width="900" height="360" fill="url(#blueprint-grid)" rx="16" />

                    {/* Mountain Cliff at Far Left (The Theban Peak - El-Qurn) */}
                    <path d="M 0 0 L 160 0 L 140 360 L 0 360 Z" fill="#3E2723" opacity="0.8" />
                    <text x="70" y="170" textAnchor="middle" fill="#D7CCC8" fontSize="12" fontWeight="bold">جبل طيبة الغربي</text>
                    <text x="70" y="190" textAnchor="middle" fill="#BCAAA4" fontSize="10">(وادي الملوك خفيةً)</text>

                    {/* 5. Inner Sanctuary Carved into Cliff */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[4])} className="cursor-pointer">
                      <rect 
                        x="130" y="120" width="80" height="120" rx="4"
                        fill={selectedComponentId === 'mor-comp-5' ? '#B45309' : '#4E342E'}
                        stroke={selectedComponentId === 'mor-comp-5' ? '#FBBF24' : '#8D6E63'}
                        strokeWidth="2.5"
                      />
                      <text x="170" y="175" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">قدس الأقداس</text>
                      <text x="170" y="195" textAnchor="middle" fill="#FBBF24" fontSize="10">آمون ورع والملك</text>
                      <circle cx="170" cy="220" r="10" fill="#B45309" />
                      <text x="170" y="224" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">5</text>
                    </g>

                    {/* 4. Deities Chapels (مقاصير حتحور وأنوبيس) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[3])} className="cursor-pointer">
                      <rect x="225" y="60" width="90" height="70" rx="4" fill="#374151" stroke="#F59E0B" strokeWidth="1.5" />
                      <text x="270" y="95" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="bold">مقصورة حتحور</text>

                      <rect x="225" y="230" width="90" height="70" rx="4" fill="#374151" stroke="#F59E0B" strokeWidth="1.5" />
                      <text x="270" y="265" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="bold">مقصورة أنوبيس</text>

                      <circle cx="270" cy="180" r="10" fill="#78350F" />
                      <text x="270" y="184" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">4</text>
                    </g>

                    {/* 3. Hypostyle Hall (صالة الأعمدة الملكية) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[2])} className="cursor-pointer">
                      <rect 
                        x="330" y="90" width="130" height="180" rx="6"
                        fill={selectedComponentId === 'mor-comp-3' ? '#0D9488' : '#1E293B'}
                        stroke={selectedComponentId === 'mor-comp-3' ? '#2DD4BF' : '#64748B'}
                        strokeWidth="2.5"
                      />
                      {/* Pillar grid dots */}
                      <circle cx="360" cy="120" r="5" fill="#2DD4BF" />
                      <circle cx="395" cy="120" r="5" fill="#2DD4BF" />
                      <circle cx="430" cy="120" r="5" fill="#2DD4BF" />
                      <circle cx="360" cy="180" r="5" fill="#2DD4BF" />
                      <circle cx="395" cy="180" r="5" fill="#2DD4BF" />
                      <circle cx="430" cy="180" r="5" fill="#2DD4BF" />
                      <circle cx="360" cy="240" r="5" fill="#2DD4BF" />
                      <circle cx="395" cy="240" r="5" fill="#2DD4BF" />
                      <circle cx="430" cy="240" r="5" fill="#2DD4BF" />

                      <text x="395" y="150" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">صالة الأعمدة</text>
                      <circle cx="395" cy="215" r="10" fill="#0F766E" />
                      <text x="395" y="219" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">3</text>
                    </g>

                    {/* 2. Osiride Sun Court (الفناء المفتوح بتماثيل أوزيريس) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[1])} className="cursor-pointer">
                      <rect 
                        x="480" y="70" width="160" height="220" rx="6"
                        fill={selectedComponentId === 'mor-comp-2' ? '#B45309' : '#334155'}
                        stroke={selectedComponentId === 'mor-comp-2' ? '#FBBF24' : '#64748B'}
                        strokeWidth="2.5"
                      />
                      <text x="560" y="170" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="bold">فناء التماثيل الأوزيرية</text>
                      <text x="560" y="195" textAnchor="middle" fill="#FDE68A" fontSize="11 font-hieroglyphs">𓅱𓋴𓐍𓏏 𓊹</text>
                      <circle cx="560" cy="240" r="10" fill="#B45309" />
                      <text x="560" y="244" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">2</text>
                    </g>

                    {/* 1. Monumental Pylon (الصرح المزدوج) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[0])} className="cursor-pointer">
                      {/* Pylon North Tower */}
                      <polygon points="660,60 740,75 730,155 650,150" fill={selectedComponentId === 'mor-comp-1' ? '#D97706' : '#475569'} stroke="#F59E0B" strokeWidth="2" />
                      {/* Pylon South Tower */}
                      <polygon points="650,210 730,205 740,285 660,300" fill={selectedComponentId === 'mor-comp-1' ? '#D97706' : '#475569'} stroke="#F59E0B" strokeWidth="2" />
                      {/* Central Gateway */}
                      <rect x="710" y="155" width="25" height="50" fill="#1E293B" stroke="#FBBF24" strokeWidth="2" />
                      <text x="760" y="185" textAnchor="start" fill="#FBBF24" fontSize="12" fontWeight="bold">الصرح الملكي</text>
                      <circle cx="700" cy="180" r="10" fill="#D97706" />
                      <text x="700" y="184" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">1</text>
                    </g>

                    {/* Causeway / Avenue leading to Valley */}
                    <line x1="735" y1="180" x2="880" y2="180" stroke="#94A3B8" strokeWidth="6" strokeDasharray="6 4" />
                    <text x="830" y="205" textAnchor="middle" fill="#94A3B8" fontSize="10">نحو سهل طيبة والنيل</text>

                  </svg>
                </div>
              )}

              {/* DIAGRAM 3: CULT TEMPLE (معبد الإله الكلاسيكي ذو المحور المستقيم - مثل الكرنك وإدفو) */}
              {activeCategory === 'cult_temples' && (
                <div className="w-full max-w-4xl min-w-[700px]">
                  <svg viewBox="0 0 900 360" className="w-full h-auto drop-shadow-md select-none font-sans">
                    <rect width="900" height="360" fill="url(#blueprint-grid)" rx="16" />

                    {/* Progression Axis Arrow (من النور والاتساع نحو الظلام والقداسة العظمى) */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
                      </marker>
                    </defs>
                    <line x1="860" y1="335" x2="80" y2="335" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="470" y="350" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold">
                      محور القداسة المستقيم: يرتفع منسوب الأرض وينخفض السقف وتشتد العتمة نحو قدس الأقداس ➔
                    </text>

                    {/* 1. Avenue of Sphinxes (طريق الكباش) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[0])} className="cursor-pointer">
                      <rect x="760" y="120" width="110" height="120" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                      {/* Sphinx dots */}
                      <circle cx="780" cy="135" r="4" fill="#F59E0B" />
                      <circle cx="815" cy="135" r="4" fill="#F59E0B" />
                      <circle cx="850" cy="135" r="4" fill="#F59E0B" />
                      <circle cx="780" cy="225" r="4" fill="#F59E0B" />
                      <circle cx="815" cy="225" r="4" fill="#F59E0B" />
                      <circle cx="850" cy="225" r="4" fill="#F59E0B" />
                      <text x="815" y="175" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="bold">طريق الكباش</text>
                      <circle cx="815" cy="195" r="9" fill="#B45309" />
                      <text x="815" y="199" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">1</text>
                    </g>

                    {/* 2. Great Pylon (الصرح العظيم) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[1])} className="cursor-pointer">
                      <polygon points="680,60 740,70 730,150 670,145" fill={selectedComponentId === 'cult-comp-2' ? '#D97706' : '#475569'} stroke="#F59E0B" strokeWidth="2" />
                      <polygon points="670,215 730,210 740,290 680,300" fill={selectedComponentId === 'cult-comp-2' ? '#D97706' : '#475569'} stroke="#F59E0B" strokeWidth="2" />
                      <rect x="715" y="150" width="20" height="60" fill="#0F172A" stroke="#FBBF24" strokeWidth="2" />
                      <text x="705" y="185" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">الصرح</text>
                      <circle cx="705" cy="40" r="9" fill="#D97706" />
                      <text x="705" y="44" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">2</text>
                    </g>

                    {/* 3. Peristyle Sun Court (الفناء المكشوف) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[2])} className="cursor-pointer">
                      <rect 
                        x="510" y="75" width="150" height="210" rx="6"
                        fill={selectedComponentId === 'cult-comp-3' ? '#B45309' : '#334155'}
                        stroke={selectedComponentId === 'cult-comp-3' ? '#FBBF24' : '#64748B'}
                        strokeWidth="2.5"
                      />
                      <text x="585" y="175" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">الفناء المكشوف المضاء</text>
                      <text x="585" y="195" textAnchor="middle" fill="#FDE68A" fontSize="10 font-hieroglyphs">𓅱𓋴𓐍𓏏</text>
                      <circle cx="585" cy="235" r="9" fill="#B45309" />
                      <text x="585" y="239" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">3</text>
                    </g>

                    {/* 4. Great Hypostyle Hall (صالة الأعمدة الكبرى) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[3])} className="cursor-pointer">
                      <rect 
                        x="340" y="85" width="155" height="190" rx="6"
                        fill={selectedComponentId === 'cult-comp-4' ? '#0F766E' : '#1E293B'}
                        stroke={selectedComponentId === 'cult-comp-4' ? '#2DD4BF' : '#64748B'}
                        strokeWidth="2.5"
                      />
                      {/* Forest of columns */}
                      <circle cx="365" cy="110" r="4.5" fill="#2DD4BF" />
                      <circle cx="395" cy="110" r="4.5" fill="#2DD4BF" />
                      <circle cx="425" cy="110" r="4.5" fill="#2DD4BF" />
                      <circle cx="455" cy="110" r="4.5" fill="#2DD4BF" />
                      <circle cx="365" cy="180" r="5" fill="#5EEAD4" />
                      <circle cx="395" cy="180" r="5" fill="#5EEAD4" />
                      <circle cx="425" cy="180" r="5" fill="#5EEAD4" />
                      <circle cx="455" cy="180" r="5" fill="#5EEAD4" />
                      <circle cx="365" cy="250" r="4.5" fill="#2DD4BF" />
                      <circle cx="395" cy="250" r="4.5" fill="#2DD4BF" />
                      <circle cx="425" cy="250" r="4.5" fill="#2DD4BF" />
                      <circle cx="455" cy="250" r="4.5" fill="#2DD4BF" />

                      <text x="415" y="145" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">صالة الأعمدة الكبرى</text>
                      <text x="415" y="165" textAnchor="middle" fill="#5EEAD4" fontSize="10">غابة البردي الأزلية</text>
                      <circle cx="415" cy="210" r="9" fill="#0D9488" />
                      <text x="415" y="214" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">4</text>
                    </g>

                    {/* 5. Barque Sanctuary (مقصورة الزورق المقدس) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[4])} className="cursor-pointer">
                      <rect 
                        x="200" y="105" width="125" height="150" rx="4"
                        fill={selectedComponentId === 'cult-comp-5' ? '#D97706' : '#334155'}
                        stroke={selectedComponentId === 'cult-comp-5' ? '#FBBF24' : '#64748B'}
                        strokeWidth="2"
                      />
                      <text x="262" y="170" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">مقصورة الزورق</text>
                      <text x="262" y="190" textAnchor="middle" fill="#FCD34D" fontSize="11 font-hieroglyphs">𓊛 𓊹</text>
                      <circle cx="262" cy="220" r="9" fill="#B45309" />
                      <text x="262" y="224" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">5</text>
                    </g>

                    {/* 6. Sanctum Sanctorum (قدس الأقداس والناووس) */}
                    <g onClick={() => handleSelectComponent(currentType.keyComponents[5])} className="cursor-pointer">
                      <rect 
                        x="70" y="115" width="115" height="130" rx="4"
                        fill={selectedComponentId === 'cult-comp-6' ? '#7C2D12' : '#0F172A'}
                        stroke={selectedComponentId === 'cult-comp-6' ? '#F87171' : '#64748B'}
                        strokeWidth="2.5"
                      />
                      <rect x="95" y="145" width="35" height="45" rx="3" fill="#B91C1C" stroke="#FBBF24" strokeWidth="1.5" />
                      <text x="112" y="172" textAnchor="middle" fill="#FFF" fontSize="9 font-hieroglyphs">𓊹</text>
                      <text x="150" y="165" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontWeight="bold">قدس الأقداس</text>
                      <text x="150" y="185" textAnchor="middle" fill="#FDE68A" fontSize="9 font-hieroglyphs">𓂦𓂦𓏥</text>
                      <circle cx="127" cy="215" r="9" fill="#991B1B" />
                      <text x="127" y="219" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">6</text>
                    </g>

                  </svg>
                </div>
              )}

            </div>

            {/* Instruction tooltip */}
            <div className="flex items-center justify-between text-xs text-amber-300/80 pt-2 border-t border-stone-800">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                <span>انقر على أي رقم أو جزء في المخطط الهندسي أعلاه لعرض بطاقته المعمارية ووظيفته الطقسية.</span>
              </span>
              <span className="font-mono text-cyan-400">انقر على الأرقام من 1 إلى {currentType.keyComponents.length}</span>
            </div>

          </div>

          {/* ACTIVE COMPONENT SPOTLIGHT CARD */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
                    عنصر معماري رقم {activeComponent.id.split('-').pop()}
                  </span>
                  <span className="font-hieroglyphs text-lg text-amber-800">
                    {activeComponent.hieroglyph}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
                  {activeComponent.nameAr} ({activeComponent.nameEn})
                </h4>
              </div>

              <div className="text-left font-mono text-xs bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                <div className="text-stone-500">النطق الصوتي القديم:</div>
                <div className="text-amber-900 font-bold text-sm">
                  {activeComponent.pronunciationAr} ({activeComponent.transliteration})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h5 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Columns className="w-4 h-4 text-amber-700" />
                  <span>الوصف والخصائص الهندسية:</span>
                </h5>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar">
                  {activeComponent.descriptionAr}
                </p>
              </div>

              <div className="space-y-2 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <h5 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>الوظيفة اللاهوتية والدينية والرمزية:</span>
                </h5>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-serif-ar">
                  {activeComponent.theologicalRoleAr}
                </p>
              </div>
            </div>

            {/* Quick Component Switcher Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 ml-2">انتقل السريع بين العناصر:</span>
              {currentType.keyComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => handleSelectComponent(comp)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    comp.id === activeComponent.id
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {comp.nameAr}
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: CORE COMPARISON MATRIX (مصفوفة المقارنة الجوهرية بين الأنواع الثلاثة) */}
      {activeViewMode === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
                مصفوفة الفروق الجوهرية بين الأهرامات والمعابد الجنائزية ومعابد الآلهة
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
                جدول مقارنة مقارن يوضح التمايز الديني والجغرافي والطبقي بين صروح الحضارة المصرية.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-amber-950 text-white border-b-2 border-amber-600">
                    <th className="p-3.5 font-bold rounded-tr-xl">وجه المقارنة</th>
                    <th className="p-3.5 font-bold">1. الأهرامات الملكية (مِر)</th>
                    <th className="p-3.5 font-bold">2. المعابد الجنائزية (حوت-كا)</th>
                    <th className="p-3.5 font-bold rounded-tl-xl">3. معابد الآلهة (حوت-نِثِر)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-serif-ar">
                  <tr className="hover:bg-amber-50/50">
                    <td className="p-3.5 font-bold text-amber-950 bg-stone-50">الغرض الرئيسي</td>
                    <td className="p-3.5 text-stone-800">مقبرة ملكية وحفظ مومياء الفرعون وسُلّم لصعود روحه للسماء.</td>
                    <td className="p-3.5 text-stone-800">تخليد بطولات الملك وتقديم القرابين المستمرة لروحه (الكا) المتحدة بالآلهة.</td>
                    <td className="p-3.5 text-stone-800">مسكن الإله الأرضي وحفظ توازن نظام الكون (ماعت) عبر طقوس يومية سرية.</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50">
                    <td className="p-3.5 font-bold text-amber-950 bg-stone-50">الموقع الجغرافي</td>
                    <td className="p-3.5 text-stone-800 font-bold text-amber-900">البر الغربي حصراً (أرض الغروب والدخول للعالم الآخر).</td>
                    <td className="p-3.5 text-stone-800 font-bold text-amber-900">البر الغربي بطيبة (منفصلة تماماً عن المقبرة في وادي الملوك).</td>
                    <td className="p-3.5 text-stone-800 font-bold text-amber-900">البر الشرقي غالباً (أرض الشروق والحياة والمدن) أو مراكز مقدسة.</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50">
                    <td className="p-3.5 font-bold text-amber-950 bg-stone-50">درجة الحرمة والولوج</td>
                    <td className="p-3.5 text-stone-800">محرمة ومغلقة تماماً بعد الدفن بكتل الغرانيت؛ لا يدخلها بشر.</td>
                    <td className="p-3.5 text-stone-800">مفتوحة لكهنة الأوقاف والنبلاء في الاحتفالات كعيد الوادي الجميل.</td>
                    <td className="p-3.5 text-stone-800">شديدة الطبقية؛ الشعب خارجاً، والكهنة في البهو، وقدس الأقداس للملك ورئيس الكهنة فقط.</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50">
                    <td className="p-3.5 font-bold text-amber-950 bg-stone-50">التطور عبر العصور</td>
                    <td className="p-3.5 text-stone-800">مصطبة طينية ➔ هرم مدرج ➔ هرم منحني ➔ هرم أملس كامل (عصر بناة الأهرام).</td>
                    <td className="p-3.5 text-stone-800">معبد صغير ملتصق بالهرم ➔ معبد تذكاري مستقل وشاهق يسمى "معبد ملايين السنين".</td>
                    <td className="p-3.5 text-stone-800">أكواخ وبوص ➔ محاور حجرية كبرى في الدولة الحديثة ➔ معابد بطلمية ذات سراديب وأسقف كاملة.</td>
                  </tr>

                  <tr className="hover:bg-amber-50/50">
                    <td className="p-3.5 font-bold text-amber-950 bg-stone-50">أبرز النماذج</td>
                    <td className="p-3.5 text-stone-800">خوفو، زوسر بسقارة، سنفرو بدهشور، خفرع، منكاورع.</td>
                    <td className="p-3.5 text-stone-800">حتشبسوت بالدير البحري، الرامسيوم، مدينة هابو لرمسيس الثالث.</td>
                    <td className="p-3.5 text-stone-800">الكرنك، الأقصر، إدفو (حورس)، دندرة (حتحور)، فيلة (إيزيس).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: FAMOUS HISTORICAL MONUMENT EXAMPLES */}
      {activeViewMode === 'examples' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
              أعظم النماذج الأثرية المحفوظة: {currentType.titleAr}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
              شواهد حجرية حية تقف شاهدة على عبقرية المهندس والمعمار المصري القديم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentType.famousExamples.map((ex) => (
              <div 
                key={ex.id}
                className="bg-white border border-[#E8DFC9] rounded-2xl p-6 shadow-xs hover:border-amber-400 transition-all space-y-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-800 font-bold">
                    <span>{ex.dynastyAndEraAr}</span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{ex.locationAr}</span>
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-stone-900 font-display-eg">
                    {ex.nameAr}
                  </h4>
                </div>

                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs text-stone-800 font-serif-ar space-y-1">
                  <div>
                    <strong>الملك الباني:</strong> {ex.builderKingAr}
                  </div>
                  {ex.architectNameAr && (
                    <div className="text-amber-900 font-bold">
                      <strong>المهندس المعماري:</strong> {ex.architectNameAr}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar">
                  {ex.distinctionAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: HIEROGLYPHIC ARCHITECTURAL GLOSSARY */}
      {activeViewMode === 'glossary' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
              معجم مصطلحات العمارة المصرية القديمة (Architectural Vocabulary)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
              المصطلحات الأصيلة التي كان يستخدمها المعماريون الفراعنة (مثل سنموت وإمحوتب وحم-إيونو) في تصميم المنشآت.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARCHITECTURAL_ELEMENTS_GLOSSARY.map((term, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E8DFC9] rounded-2xl p-4 shadow-xs hover:border-amber-400 transition-all space-y-3 text-right"
              >
                <div className="flex items-center justify-between">
                  <span className="font-hieroglyphs text-3xl text-amber-700">
                    {term.hieroglyph}
                  </span>
                  <button
                    onClick={() => handlePronounceGlossary(`${term.termAr}: ${term.meaningAr}`)}
                    className="p-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                    title="استمع للنطق"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-stone-900 font-display-eg">
                    {term.termAr}
                  </h4>
                  <div className="text-xs font-mono text-stone-500">
                    النقحرة: {term.transliteration}
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-serif-ar pt-1 border-t border-stone-100">
                  {term.meaningAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
