import React, { useState } from 'react';
import {
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Info,
  Compass,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  Eye,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import {
  ROSETTA_STONE_INFO,
  ROSETTA_SCRIPT_BANDS,
  ROSETTA_COMPARATIVE_KEYWORDS,
  RosettaScriptBand,
  RosettaComparativeKeyword
} from '../../data/rosettaStoneData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

type ZoomScale = 1 | 1.5 | 2 | 2.5;
type SelectedBandFilter = 'all' | 'hieroglyphic' | 'demotic' | 'greek';

export const RosettaStoneExplorer: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<ZoomScale>(1);
  const [selectedBand, setSelectedBand] = useState<SelectedBandFilter>('all');
  const [isRubbingMode, setIsRubbingMode] = useState<boolean>(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<string>(ROSETTA_COMPARATIVE_KEYWORDS[0].id);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  const activeKeyword: RosettaComparativeKeyword =
    ROSETTA_COMPARATIVE_KEYWORDS.find((k) => k.id === selectedKeywordId) || ROSETTA_COMPARATIVE_KEYWORDS[0];

  const handleToggleAudio = () => {
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
      return;
    }

    soundFX.playAncientChime(520);
    setIsNarrating(true);
    const narrationText = `حجر رشيد، مفتاح الحضارة المصرية القديمة. اكتُشف عام 1799 في قلعة رشيد أثناء الحملة الفرنسية. نُقش عليه مرسوم منف الصادر عام 196 قبل الميلاد بثلاثة خطوط: الهيروغليفية المقدسة في الأعلى، والديموطيقية الشعبية في الوسط، واليونانية القديمة في الأسفل. في عام 1822، استطاع العبقري الفرنسي جان فرانسوا شامبليون فك شفرة الهيروغليفية من خلال مطابقة خراطيش الملوك مثل بطليموس وكليوباترا، معلناً للعالم أن الهيروغليفية خط يجمع بين الرمزية والصوت في آن واحد.`;

    scribeAudio.speakText(narrationText, {
      id: 'rosetta-stone-full',
      onEnd: () => setIsNarrating(false),
      onError: () => setIsNarrating(false)
    });
  };

  const handlePronounceKeyword = (kw: RosettaComparativeKeyword) => {
    soundFX.playClickSound();
    scribeAudio.speakText(`${kw.conceptAr}. بالنص الهيروغليفي تُقرأ: ${kw.hieroglyphicTranslit}، وباليونانية: ${kw.greekTranslit}`, {
      id: `kw-${kw.id}`
    });
  };

  const handleZoomChange = (newZoom: ZoomScale) => {
    soundFX.playClickSound();
    setZoomLevel(newZoom);
  };

  return (
    <div className="space-y-10 text-right select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#171618] via-[#222126] to-[#121214] border-2 border-stone-600/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-stone-100 relative overflow-hidden">
        {/* Subtle stone texture pattern */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #68646b 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-700/60 border border-stone-500/50 text-stone-300 text-xs font-bold">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>مختبر فك الرموز الأثرية (Decipherment Laboratory)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display-eg tracking-wide">
              حجر رشيد: مفتاح الأسرار وحل لغز الفراعنة 🔍
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
              {ROSETTA_STONE_INFO.historicalSignificanceAr}
            </p>

            {/* Quick Fact Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-stone-300">
              <span className="flex items-center gap-1 bg-stone-800/90 border border-stone-600/70 px-2.5 py-1 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{ROSETTA_STONE_INFO.dateDecreeBCE}</span>
              </span>
              <span className="flex items-center gap-1 bg-stone-800/90 border border-stone-600/70 px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>اكتشاف {ROSETTA_STONE_INFO.discoveryYear} ({ROSETTA_STONE_INFO.discoveryLocationAr})</span>
              </span>
              <span className="flex items-center gap-1 bg-stone-800/90 border border-stone-600/70 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>{ROSETTA_STONE_INFO.currentMuseum}</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all self-start lg:self-center shrink-0 ${
              isNarrating
                ? 'bg-amber-600 text-white ring-4 ring-amber-400/50 animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isNarrating ? <VolumeX className="w-4 h-4 text-amber-200" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span>{isNarrating ? 'إيقاف السرد الصوتي' : 'استمع لقصة فك شفرة الحجر'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Granodiorite Slab & Zoom Console */}
      <div className="bg-[#1C1B1E] border-2 border-stone-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Controls Toolbar: Zoom Selector, Script Filter & Rubbing Mode */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-700/80 pb-4">
          
          {/* Script Bands Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-400 ml-1">تحديد نطاق الخط:</span>
            <button
              onClick={() => { soundFX.playClickSound(); setSelectedBand('all'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBand === 'all'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              كامل الحجر (الخطوط الثلاثة)
            </button>
            <button
              onClick={() => { soundFX.playClickSound(); setSelectedBand('hieroglyphic'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBand === 'hieroglyphic'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              1. الهيروغليفية (أعلى)
            </button>
            <button
              onClick={() => { soundFX.playClickSound(); setSelectedBand('demotic'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBand === 'demotic'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              2. الديموطيقية (وسط)
            </button>
            <button
              onClick={() => { soundFX.playClickSound(); setSelectedBand('greek'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBand === 'greek'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              3. اليونانية (أسفل)
            </button>
          </div>

          {/* Interactive Zoom Level Selector & Charcoal Rubbing Switch */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Charcoal Rubbing Mode Toggle */}
            <button
              onClick={() => {
                soundFX.playClickSound();
                setIsRubbingMode(!isRubbingMode);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isRubbingMode
                  ? 'bg-stone-100 text-stone-900 border-white shadow-sm font-black'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
              title="طبعة الفحم والحبر الأبيض التي استخدمها العلماء الأوائل لدراسة النقوش"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>{isRubbingMode ? '✓ وضع طبعة الفحم (نشط)' : 'وضع طبعة الفحم (Rubbing)'}</span>
            </button>

            {/* Magnifier / Zoom selector */}
            <div className="bg-stone-800/90 p-1 rounded-xl border border-stone-700 flex items-center gap-1">
              <span className="text-[11px] text-stone-400 px-2 font-bold flex items-center gap-1">
                <Search className="w-3 h-3 text-amber-400" />
                <span>عدسة التكبير:</span>
              </span>
              {([1, 1.5, 2, 2.5] as ZoomScale[]).map((scale) => (
                <button
                  key={scale}
                  onClick={() => handleZoomChange(scale)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    zoomLevel === scale
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white hover:bg-stone-700'
                  }`}
                >
                  {scale}x
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* The Realistic Granodiorite Slab Simulation */}
        <div className="relative rounded-3xl overflow-hidden border-4 border-stone-700 shadow-2xl">
          
          {/* Slab Header Info Ribbon */}
          <div className="bg-stone-900/90 px-4 py-2 text-xs font-mono text-stone-400 flex items-center justify-between border-b border-stone-800">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>لوحة منف النذرية — حجر الجرانوديوريت الأسود (مستوى التكبير: {zoomLevel}x)</span>
            </span>
            <span>الأبعاد الفعلية: {ROSETTA_STONE_INFO.dimensions}</span>
          </div>

          {/* Stone Texture Canvas with Broken Top-Right Edge simulation */}
          <div
            className={`transition-all duration-300 p-6 sm:p-10 space-y-6 ${
              isRubbingMode
                ? 'bg-black text-white'
                : 'bg-gradient-to-b from-[#202024] via-[#1a191d] to-[#141316] text-stone-200'
            }`}
            style={{
              transform: `scale(${zoomLevel > 1 ? 1 : 1})`,
              transformOrigin: 'top center'
            }}
          >
            
            {/* Band 1: Hieroglyphic Section (Top) */}
            {(selectedBand === 'all' || selectedBand === 'hieroglyphic') && (
              <div className={`p-5 rounded-2xl border transition-all ${
                selectedBand === 'hieroglyphic'
                  ? 'border-amber-500 bg-amber-950/20 ring-2 ring-amber-400/30'
                  : 'border-stone-700/80 bg-stone-900/40 hover:border-amber-600/40'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs sm:text-sm font-bold text-amber-300 font-display-eg">
                      {ROSETTA_SCRIPT_BANDS[0].nameAr}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      {ROSETTA_SCRIPT_BANDS[0].linesCount} سطراً (أعلى الحجر - محطم الأطراف)
                    </span>
                  </div>
                  <span className="text-xs text-amber-200/80 font-serif-ar">
                    {ROSETTA_SCRIPT_BANDS[0].audienceAr}
                  </span>
                </div>

                <div 
                  className={`py-3 text-center tracking-widest font-hieroglyphs transition-all select-none ${
                    isRubbingMode ? 'text-white' : 'text-amber-200'
                  } ${
                    zoomLevel === 2.5
                      ? 'text-4xl sm:text-6xl leading-loose'
                      : zoomLevel === 2
                      ? 'text-3xl sm:text-5xl leading-relaxed'
                      : zoomLevel === 1.5
                      ? 'text-2xl sm:text-4xl leading-normal'
                      : 'text-xl sm:text-3xl'
                  }`}
                >
                  𓊪𓏏𓅱𓃭𓅓𓇋𓋴 𓋹𓆓𓏏 𓌻𓊪𓏏𓎛 𓊹𓊹𓊹 𓈖 𓆎𓅓𓏏 𓍹𓊪𓏏𓅱𓃭𓅓𓇋𓋴𓍺
                </div>

                <div className="mt-2 text-xs text-stone-400 font-serif-ar leading-relaxed">
                  {ROSETTA_SCRIPT_BANDS[0].descriptionAr}
                </div>
              </div>
            )}

            {/* Band 2: Demotic Section (Middle) */}
            {(selectedBand === 'all' || selectedBand === 'demotic') && (
              <div className={`p-5 rounded-2xl border transition-all ${
                selectedBand === 'demotic'
                  ? 'border-amber-500 bg-amber-950/20 ring-2 ring-amber-400/30'
                  : 'border-stone-700/80 bg-stone-900/40 hover:border-amber-600/40'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                    <span className="text-xs sm:text-sm font-bold text-stone-200 font-display-eg">
                      {ROSETTA_SCRIPT_BANDS[1].nameAr}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      {ROSETTA_SCRIPT_BANDS[1].linesCount} سطراً (وسط الحجر - كامل ومحفوظ)
                    </span>
                  </div>
                  <span className="text-xs text-stone-300 font-serif-ar">
                    {ROSETTA_SCRIPT_BANDS[1].audienceAr}
                  </span>
                </div>

                <div
                  className={`py-3 text-center font-serif-ar transition-all select-none tracking-wide ${
                    isRubbingMode ? 'text-stone-100 font-bold' : 'text-stone-300'
                  } ${
                    zoomLevel === 2.5
                      ? 'text-xl sm:text-2xl leading-relaxed'
                      : zoomLevel === 2
                      ? 'text-lg sm:text-xl'
                      : 'text-sm sm:text-base'
                  }`}
                  dir="rtl"
                >
                  {ROSETTA_SCRIPT_BANDS[1].sampleSnippet}
                </div>

                <div className="mt-2 text-xs text-stone-400 font-serif-ar leading-relaxed">
                  {ROSETTA_SCRIPT_BANDS[1].descriptionAr}
                </div>
              </div>
            )}

            {/* Band 3: Ancient Greek Section (Bottom) */}
            {(selectedBand === 'all' || selectedBand === 'greek') && (
              <div className={`p-5 rounded-2xl border transition-all ${
                selectedBand === 'greek'
                  ? 'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-400/30'
                  : 'border-stone-700/80 bg-stone-900/40 hover:border-emerald-600/40'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs sm:text-sm font-bold text-emerald-300 font-display-eg">
                      {ROSETTA_SCRIPT_BANDS[2].nameAr}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      {ROSETTA_SCRIPT_BANDS[2].linesCount} سطراً (أسفل الحجر - المفتاح المترجم)
                    </span>
                  </div>
                  <span className="text-xs text-emerald-200/80 font-serif-ar">
                    {ROSETTA_SCRIPT_BANDS[2].audienceAr}
                  </span>
                </div>

                <div
                  className={`py-3 text-center font-mono transition-all select-none tracking-wider ${
                    isRubbingMode ? 'text-emerald-100 font-bold' : 'text-emerald-200'
                  } ${
                    zoomLevel === 2.5
                      ? 'text-base sm:text-lg leading-relaxed'
                      : zoomLevel === 2
                      ? 'text-sm sm:text-base'
                      : 'text-xs sm:text-sm'
                  }`}
                  dir="ltr"
                >
                  {ROSETTA_SCRIPT_BANDS[2].sampleSnippet}
                </div>

                <div className="mt-2 text-xs text-stone-400 font-serif-ar leading-relaxed">
                  {ROSETTA_SCRIPT_BANDS[2].descriptionAr}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Comparative 3-Script Keyword Matcher (مختبر المقارنة اللغوية الثلاثية) */}
      <div className="bg-white border-2 border-amber-800/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>مختبر مقارنة الكلمات المفتاحية (Comparative Keyword Matching)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display-eg">
              كيف فك شامبليون الشفرة؟ مطابقة الحروف بين الخطوط الثلاثة
            </h3>
          </div>

          <div className="text-xs text-stone-500 font-mono">
            انقر على أي كلمة لاستعراض تطابقها في النصوص الثلاثة
          </div>
        </div>

        {/* Keyword Selection Chips */}
        <div className="flex flex-wrap gap-2">
          {ROSETTA_COMPARATIVE_KEYWORDS.map((kw) => {
            const isSelected = kw.id === selectedKeywordId;
            return (
              <button
                key={kw.id}
                onClick={() => {
                  soundFX.playClickSound();
                  setSelectedKeywordId(kw.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-950 ring-2 ring-amber-400 shadow-sm'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-300'
                }`}
              >
                {kw.isCartouche && <span className="text-amber-400">𓍹𓍺</span>}
                <span>{kw.conceptAr}</span>
              </button>
            );
          })}
        </div>

        {/* Active Keyword Tri-Script Display */}
        <div className="bg-gradient-to-br from-[#FAF6EE] to-[#F3ECE0] rounded-2xl border-2 border-amber-300 p-6 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-base sm:text-lg font-bold text-amber-950 font-display-eg">
                {activeKeyword.conceptAr}
              </h4>
              {activeKeyword.isCartouche && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-800 text-white text-[10px] font-bold">
                  خرطوشة ملكية (Cartouche)
                </span>
              )}
            </div>

            <button
              onClick={() => handlePronounceKeyword(activeKeyword)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>استمع للنطق الصوتي</span>
            </button>
          </div>

          {/* 3 Columns Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Hieroglyphic */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-2 text-center shadow-2xs">
              <div className="text-xs font-bold text-amber-900 uppercase">
                1. النص الهيروغليفي
              </div>
              <div className="text-3xl sm:text-4xl font-hieroglyphs text-stone-900 py-2">
                {activeKeyword.hieroglyphic}
              </div>
              <div className="text-xs font-mono text-amber-800 font-bold" dir="ltr">
                {activeKeyword.hieroglyphicTranslit}
              </div>
            </div>

            {/* 2. Demotic */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-2 text-center shadow-2xs">
              <div className="text-xs font-bold text-stone-600 uppercase">
                2. التدوين الديموطيقي الشعبي
              </div>
              <div className="text-sm sm:text-base font-serif-ar text-stone-800 py-3 leading-relaxed">
                {activeKeyword.demoticDescriptionAr}
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                (سِش شَعْت / الخط الاختزالي)
              </div>
            </div>

            {/* 3. Ancient Greek */}
            <div className="p-4 rounded-xl bg-white border border-emerald-300 space-y-2 text-center shadow-2xs">
              <div className="text-xs font-bold text-emerald-800 uppercase">
                3. النص اليوناني القديم
              </div>
              <div className="text-lg sm:text-xl font-mono text-emerald-950 font-bold py-2" dir="ltr">
                {activeKeyword.greekText}
              </div>
              <div className="text-xs font-serif text-stone-600 italic">
                {activeKeyword.greekTranslit}
              </div>
            </div>

          </div>

          {/* Decipherment breakthrough insight note */}
          <div className="bg-amber-950 text-amber-50 p-4 rounded-xl border border-amber-700/50 space-y-1.5 text-xs sm:text-sm font-serif-ar leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>الأهمية في فك الشفرة (The Breakthrough Insight):</span>
            </div>
            <p className="text-amber-100/90">
              {activeKeyword.deciphermentSignificanceAr}
            </p>
          </div>

        </div>

      </div>

      {/* Champollion's 1822 Eureka Moment & Timeline Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Card 1: Champollion's Breakthrough */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2D1B11] to-[#1F120B] text-amber-50 border-2 border-amber-600/40 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>14 سبتمبر 1822 — لحظة الاكتشاف الخالدة</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display-eg">
              «Je tiens mon affaire!» (لقد أمسكت بالسر!)
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
              ركض الشاب الفرنسي جان فرانسوا شامبليون إلى أكاديمية النقوش والآداب بباريس وألقى بأوراقه على مكتب أخيه صائحاً بكلمته التاريخية وسقط مغشياً عليه من فرط الإجهاد والتأثر! كان قد اكتشف بعد مقارنة خراطيش بطليموس وكليوباترا ورعمسيس أن الهيروغليفية ليست رموزاً فلسفية غامضة، بل نظام كتابة دقيق ومحكم يجمع في ذات النص بين:
            </p>
            <ul className="text-xs text-amber-200/90 space-y-1.5 list-disc list-inside font-serif-ar pt-1">
              <li><strong>العلامات الصوتية (Phonetic signs):</strong> حروف تنطق كأصوات مجردة.</li>
              <li><strong>العلامات التصويرية (Ideograms):</strong> رموز ترسم الشيء للدلالة عليه كلياً.</li>
              <li><strong>المخصصات (Determinatives):</strong> علامات صامتة في الختام تحدد المعنى الدقيق.</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-amber-800/60 text-[11px] text-amber-400 font-mono">
            «خط تركيبي، تصويري، رمزي، وصوتي في آن واحد، في جملة واحدة وفي كلمة واحدة!» — شامبليون
          </div>
        </div>

        {/* Card 2: Why 3 Scripts? The Historical Decree */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>سياق صدور المرسوم الملكي (مرسوم منف 196 ق.م)</span>
            </div>
            <h4 className="text-lg font-bold text-stone-900 font-display-eg">
              لماذا كُتب الحجر بثلاثة خطوط؟
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed">
              أصدر مجمع الكهنة في منف هذا المرسوم لشكر الملك بطليموس الخامس على إعفاء المعابد من الضرائب وتبرعه بالأموال للكهنة. ولضمان وصول المرسوم إلى كل فئات المجتمع في مصر البطلمية، أمر الكهنة بنقشه بالخطوط الثلاثة:
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-serif-ar">
                <strong>1. الهيروغليفية:</strong> لتقرأها الآلهة وكبار كهنة المعابد في كل أرجاء مصر.
              </div>
              <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 font-serif-ar">
                <strong>2. الديموطيقية:</strong> ليقرأها عامة الشعب المصري والموظفون والكتبة.
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-serif-ar">
                <strong>3. اليونانية:</strong> لغة البلاط الحاكم والجيش والأسرة المقدونية الحاكمة.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-serif-ar">
            💡 نص المرسوم في نهايته: «يُنقش هذا المرسوم على لوح من الحجر الصلب بحروف مقدسة، وشعبية، ويونانية».
          </div>
        </div>

      </div>

    </div>
  );
};
