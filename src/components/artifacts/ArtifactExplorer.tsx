import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  Volume2,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  BookOpen,
  Compass,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import {
  RARE_ARTIFACTS_COLLECTION,
  RareArtifactEntry,
  ArtifactCategory,
  ArtifactGlyphSegment,
  ArtifactSurfaceTheme
} from '../../data/artifactsExplorerData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

const SURFACE_BACK_STYLES: Record<
  ArtifactSurfaceTheme,
  { containerClass: string; glyphClass: string; metaClass: string; chipActive: string; chipIdle: string }
> = {
  lapis: {
    containerClass: 'bg-gradient-to-br from-[#172554] via-[#1E3A8A] to-[#0F172A] border-[#D4AF37]/60 text-amber-100',
    glyphClass: 'text-[#FDE68A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]',
    metaClass: 'text-amber-200/80',
    chipActive: 'bg-amber-400 text-stone-950 border-amber-300',
    chipIdle: 'bg-white/10 hover:bg-white/20 text-amber-100 border-amber-300/30'
  },
  limestone: {
    containerClass: 'bg-gradient-to-br from-[#F4EFE2] via-[#EBE2CE] to-[#DFD3B8] border-[#BFA87E] text-stone-900',
    glyphClass: 'text-stone-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]',
    metaClass: 'text-stone-600',
    chipActive: 'bg-amber-800 text-white border-amber-900',
    chipIdle: 'bg-white/75 hover:bg-white text-stone-800 border-stone-300'
  },
  alabaster: {
    containerClass: 'bg-gradient-to-br from-[#FAF3E0] via-[#F2E4C4] to-[#E6D0A3] border-[#C9A86A] text-stone-900',
    glyphClass: 'text-[#1E293B] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]',
    metaClass: 'text-amber-900/75',
    chipActive: 'bg-amber-900 text-amber-50 border-amber-950',
    chipIdle: 'bg-white/70 hover:bg-white text-stone-900 border-amber-700/25'
  },
  bronze: {
    containerClass: 'bg-gradient-to-br from-[#3F2E21] via-[#2C2017] to-[#1C140E] border-[#B45309]/70 text-amber-100',
    glyphClass: 'text-[#5EEAD4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]',
    metaClass: 'text-amber-200/75',
    chipActive: 'bg-teal-400 text-stone-950 border-teal-300',
    chipIdle: 'bg-white/10 hover:bg-white/15 text-amber-100 border-amber-500/35'
  },
  basalt: {
    containerClass: 'bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#0C0A09] border-stone-600 text-stone-100',
    glyphClass: 'text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]',
    metaClass: 'text-stone-400',
    chipActive: 'bg-amber-500 text-stone-950 border-amber-400',
    chipIdle: 'bg-white/10 hover:bg-white/15 text-stone-200 border-stone-600'
  },
  faience: {
    containerClass: 'bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#115E59] border-[#042F2E] text-white',
    glyphClass: 'text-stone-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]',
    metaClass: 'text-teal-100/85',
    chipActive: 'bg-stone-950 text-teal-200 border-stone-800',
    chipIdle: 'bg-white/20 hover:bg-white/30 text-stone-950 border-stone-900/25'
  }
};

export const ArtifactExplorer: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<ArtifactCategory | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [exploredArtifactIds, setExploredArtifactIds] = useState<string[]>([]);
  const [imageLoadFailedMap, setImageLoadFailedMap] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const filteredArtifacts =
    categoryFilter === 'all'
      ? RARE_ARTIFACTS_COLLECTION
      : RARE_ARTIFACTS_COLLECTION.filter((item) => item.category === categoryFilter);

  const currentArtifact: RareArtifactEntry =
    filteredArtifacts[selectedIndex % Math.max(1, filteredArtifacts.length)] || RARE_ARTIFACTS_COLLECTION[0];

  const activeSegment: ArtifactGlyphSegment =
    currentArtifact.glyphSegments.find((s) => s.id === selectedSegmentId) || currentArtifact.glyphSegments[0];

  const backTheme = SURFACE_BACK_STYLES[currentArtifact.surfaceTheme];

  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((activeId) => {
      setIsSpeaking(activeId === `artifact-audio-${currentArtifact.id}`);
    });
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, [currentArtifact.id]);

  const handleSelectArtifact = (idx: number) => {
    soundFX.playClickSound();
    scribeAudio.stop();
    setSelectedIndex(idx);
    setIsFlipped(false);
    setIsZoomed(false);
    setSelectedSegmentId(null);
  };

  const handleFlipArtifact = () => {
    const nextFlipped = !isFlipped;
    soundFX.playAncientChime(nextFlipped ? 620 : 480);
    setIsFlipped(nextFlipped);
    setIsZoomed(false);

    if (nextFlipped && !exploredArtifactIds.includes(currentArtifact.id)) {
      setExploredArtifactIds((prev) => [...prev, currentArtifact.id]);
      setSelectedSegmentId(currentArtifact.glyphSegments[0]?.id || null);
      studentProgress.addPoints(
        20,
        `قلب وقراءة نقوش قطعة «${currentArtifact.titleAr}»`,
        'مستكشف القطع الأثرية'
      );
    }
  };

  const handleSelectSegment = (seg: ArtifactGlyphSegment) => {
    soundFX.playClickSound();
    setSelectedSegmentId(seg.id);
    scribeAudio.speakText(`${seg.phoneticAr} .. وتعني: ${seg.meaningAr}`, {
      id: `artifact-seg-${seg.id}`,
      rate: 0.88
    });
  };

  const handlePlayFullInscription = () => {
    soundFX.playAncientChime(540);
    scribeAudio.speakText(currentArtifact.audioScript, {
      id: `artifact-audio-${currentArtifact.id}`,
      rate: 0.9
    });
  };

  const handleStepArtifact = (direction: 'prev' | 'next') => {
    if (filteredArtifacts.length <= 1) return;
    const total = filteredArtifacts.length;
    const nextIdx =
      direction === 'next' ? (selectedIndex + 1) % total : (selectedIndex - 1 + total) % total;
    handleSelectArtifact(nextIdx);
  };

  const handleCategoryChange = (cat: ArtifactCategory | 'all') => {
    soundFX.playClickSound();
    scribeAudio.stop();
    setCategoryFilter(cat);
    setSelectedIndex(0);
    setIsFlipped(false);
    setIsZoomed(false);
    setSelectedSegmentId(null);
  };

  const hasImageError = Boolean(imageLoadFailedMap[currentArtifact.id]);

  return (
    <section id="artifact-explorer" className="space-y-6 text-right animate-fadeIn">
      {/* Editorial Curatorial Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-amber-800 flex flex-wrap items-center gap-2">
              <span>متحف النماذج التخيلية</span>
              <span aria-hidden="true">·</span>
              <span>قطع أثرية مولدة بالصور</span>
              <span aria-hidden="true">·</span>
              <span>فحص النقوش الخلفية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              مستكشف القطع الأثرية النادرة
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl font-serif-ar leading-relaxed">
              تصفح نماذج تخيلية عالية الدقة لقطع أثرية مستلهمة من كنوز مصر القديمة، واستخدم زر قلب القطعة لمعاينة الوجه الخلفي وقراءة النقوش الهيروغليفية المحفورة كلمة بكلمة.
            </p>
          </div>

          <div className="flex items-center gap-4 border border-[#E8DFC9] bg-[#FAF7F0] px-4 py-3 rounded-2xl shrink-0">
            <div>
              <div className="text-xs font-semibold text-stone-500">القطع التي فُحصت نقوشها</div>
              <div className="text-xl font-extrabold font-mono text-amber-900 tabular-nums">
                {exploredArtifactIds.length}/{RARE_ARTIFACTS_COLLECTION.length}
              </div>
            </div>
            <div className="h-8 w-px bg-[#E8DFC9]" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-stone-500">حالة العرض</div>
              <div className="text-sm font-bold text-stone-800">
                {isFlipped ? 'وجه النقوش الخلفي' : 'الواجهة الأمامية'}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1 self-start overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'كل القطع (6)' },
              { id: 'amulets', label: 'تمائم وأختام' },
              { id: 'steles', label: 'لوحات ونقوش' },
              { id: 'vessels', label: 'أوانٍ وقرابين' },
              { id: 'funerary', label: 'رموز الخلود' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id as ArtifactCategory | 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  categoryFilter === tab.id
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => handleStepArtifact('prev')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابقة</span>
            </button>
            <span className="text-xs font-mono text-stone-500 tabular-nums px-1">
              {(selectedIndex % Math.max(1, filteredArtifacts.length)) + 1}/{filteredArtifacts.length}
            </span>
            <button
              type="button"
              onClick={() => handleStepArtifact('next')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Exhibition Stage (7 cols 3D Flip Viewport + 5 cols Accession & Inscription Reader) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive 3D Artifact Flip Stage */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-4">
          {/* Top Stage Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
            <div className="text-xs font-mono text-stone-500">
              {currentArtifact.accessionCode} · {currentArtifact.categoryLabelAr}
            </div>

            <div className="flex items-center gap-2">
              {!isFlipped && (
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClickSound();
                    setIsZoomed((z) => !z);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-700 transition-colors whitespace-nowrap shrink-0"
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span>{isZoomed ? 'تصغير' : 'تكبير التفاصيل'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleFlipArtifact}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs whitespace-nowrap shrink-0"
              >
                <RotateCw className={`w-4 h-4 transition-transform duration-300 ${isFlipped ? 'rotate-180' : ''}`} />
                <span>{isFlipped ? 'عرض الواجهة الأمامية' : 'اقلب القطعة لقراءة النقوش'}</span>
              </button>
            </div>
          </div>

          {/* 3D Perspective Flip Card */}
          <div
            className="relative w-full min-h-[400px] sm:min-h-[450px]"
            style={{ perspective: '1400px' }}
          >
            <div
              className="relative w-full h-full min-h-[400px] sm:min-h-[450px] transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* FRONT FACE: Museum Photograph */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[#E2D5B8] bg-stone-900"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: isFlipped ? 'none' : 'auto'
                }}
              >
                {hasImageError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F5EEDB] to-[#E8DFC9] text-stone-800 space-y-3">
                    <Compass className="w-12 h-12 text-amber-800" />
                    <div className="text-lg font-extrabold font-display-eg">{currentArtifact.titleAr}</div>
                    <p className="text-xs text-stone-600 max-w-sm">{currentArtifact.materialAr}</p>
                  </div>
                ) : (
                  <img
                    src={currentArtifact.imageUrl}
                    alt={currentArtifact.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImageLoadFailedMap((prev) => ({ ...prev, [currentArtifact.id]: true }))
                    }
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                    }`}
                    onClick={() => setIsZoomed((z) => !z)}
                  />
                )}

                {/* Measured contrast scrim at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 sm:p-6 text-right pointer-events-none">
                  <div className="text-xs font-mono text-amber-300/90 mb-1">
                    {currentArtifact.eraAr}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-display-eg">
                    {currentArtifact.titleAr}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                    {currentArtifact.subtitleAr}
                  </p>
                </div>
              </div>

              {/* BACK FACE: Carved Hieroglyphic Inscription Reverse */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto ${backTheme.containerClass}`}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  pointerEvents: isFlipped ? 'auto' : 'none'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className={`font-semibold ${backTheme.metaClass}`}>
                    {currentArtifact.inscriptionLocationAr}
                  </span>
                  <span className={`font-mono ${backTheme.metaClass}`}>
                    اتجاه القراءة: {currentArtifact.readingDirectionAr}
                  </span>
                </div>

                {/* Main Carved Inscription Display */}
                <div className="my-4 p-5 sm:p-6 rounded-2xl bg-black/15 border border-current/15 text-center space-y-3">
                  <div
                    className={`text-4xl sm:text-5xl md:text-6xl font-hieroglyphs tracking-widest leading-relaxed select-text ${backTheme.glyphClass}`}
                    dir="rtl"
                  >
                    {currentArtifact.hieroglyphicInscription}
                  </div>
                  <div className="text-sm sm:text-base font-bold">
                    النطق المعاد بناؤه: {currentArtifact.phoneticReadingAr}
                  </div>
                  <div className={`text-xs font-mono ${backTheme.metaClass}`} dir="ltr">
                    {currentArtifact.transliteration}
                  </div>
                </div>

                {/* Interactive Clickable Carved Segments */}
                <div className="space-y-2.5">
                  <div className={`text-xs font-bold ${backTheme.metaClass}`}>
                    انقر على أي مقطع منقوش لقراءة رمزه ومعناه:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentArtifact.glyphSegments.map((seg) => {
                      const isSelected = activeSegment?.id === seg.id;
                      return (
                        <button
                          key={seg.id}
                          type="button"
                          onClick={() => handleSelectSegment(seg)}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-2 ${
                            isSelected ? backTheme.chipActive : backTheme.chipIdle
                          }`}
                        >
                          <span className="font-hieroglyphs text-xl leading-none">{seg.glyphs}</span>
                          <span>{seg.phoneticAr}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flip Back Footer */}
                <div className="pt-4 mt-2 border-t border-current/15 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePlayFullInscription}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'جاري قراءة النقش...' : 'استمع لقراءة النقش'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFlipArtifact}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black/25 hover:bg-black/40 text-current text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>عودة للواجهة الأمامية</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companion Museum Accession & Epigraphic Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            {/* Museum Accession Metadata List */}
            <div>
              <div className="text-xs font-semibold text-amber-800 mb-2">
                بطاقة الجرد الأثري والمخطوط
              </div>
              <dl className="divide-y divide-stone-200/80 border-y border-stone-200/80 text-xs sm:text-sm">
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <dt className="text-stone-500 font-semibold shrink-0">رقم السجل</dt>
                  <dd className="font-mono font-bold text-stone-900 tabular-nums text-left">
                    {currentArtifact.accessionCode}
                  </dd>
                </div>
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <dt className="text-stone-500 font-semibold shrink-0">العصر والطراز</dt>
                  <dd className="font-semibold text-stone-800 text-left">{currentArtifact.eraAr}</dd>
                </div>
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <dt className="text-stone-500 font-semibold shrink-0">الخامة</dt>
                  <dd className="text-stone-800 text-left">{currentArtifact.materialAr}</dd>
                </div>
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <dt className="text-stone-500 font-semibold shrink-0">الأبعاد التقديرية</dt>
                  <dd className="font-mono text-stone-700 tabular-nums text-left">
                    {currentArtifact.dimensionsCm}
                  </dd>
                </div>
                <div className="py-2.5 flex items-start justify-between gap-4">
                  <dt className="text-stone-500 font-semibold shrink-0">المرجع الإبداعي</dt>
                  <dd className="text-stone-700 text-left">{currentArtifact.provenanceAr}</dd>
                </div>
              </dl>
            </div>

            {isFlipped ? (
              /* Epigraphic Reading Details (When Flipped) */
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#FAF5E8] border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <span>ترجمة النقش الكاملة</span>
                    </span>
                    <button
                      type="button"
                      onClick={handlePlayFullInscription}
                      className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>نطق صوتي</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-extrabold text-stone-900 font-serif-ar leading-relaxed">
                    «{currentArtifact.translationAr}»
                  </p>
                  <p className="text-xs text-stone-500 font-mono" dir="ltr">
                    {currentArtifact.englishTranslation}
                  </p>
                </div>

                {/* Selected Sign Breakdown */}
                {activeSegment && (
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl font-hieroglyphs text-amber-900">
                          {activeSegment.glyphs}
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-stone-900">
                            {activeSegment.phoneticAr}
                          </div>
                          <div className="text-xs font-mono text-stone-500">
                            Gardiner: {activeSegment.gardiner} · {activeSegment.transliteration}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectSegment(activeSegment)}
                        className="p-2 rounded-lg bg-white border border-stone-200 hover:border-amber-400 text-amber-800"
                        title="استمع لنطق المقطع"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-stone-800 pt-1">
                      المعنى: {activeSegment.meaningAr}
                    </div>
                    <div className="text-xs text-stone-500">
                      الدور اللغوي: {activeSegment.grammarRoleAr}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Front Curatorial Story + Primary Flip CTA */
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-stone-800">القصة المتحفية والنقشية:</div>
                  <p className="text-sm text-stone-700 font-serif-ar leading-relaxed">
                    {currentArtifact.curatorialStoryAr}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-3">
                  <div className="text-xs text-stone-700 leading-relaxed">
                    تحمل هذه القطعة نقشاً هيروغليفياً نادراً على وجهها الخلفي ({currentArtifact.inscriptionLocationAr}). اقلب القطعة لكشف الرموز وقراءة ترجمتها.
                  </div>
                  <button
                    type="button"
                    onClick={handleFlipArtifact}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>اقلب القطعة الآن لقراءة النقوش</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>
              {exploredArtifactIds.includes(currentArtifact.id) ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم فحص وقراءة نقوش هذه القطعة</span>
                </span>
              ) : (
                <span>اقلب القطعة لكسب +20 نقطة كاتب</span>
              )}
            </span>
            <span className="font-mono tabular-nums">{currentArtifact.readingDirectionAr}</span>
          </div>
        </div>
      </div>

      {/* Museum Gallery Catalog Selector */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-extrabold text-stone-900 font-display-eg">
            معرض القطع الأثرية النادرة ({filteredArtifacts.length})
          </h3>
          <span className="text-xs text-stone-500">انقر على أي قطعة لمعاينتها وقلبها</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArtifacts.map((artifact, idx) => {
            const isSelected = artifact.id === currentArtifact.id;
            const isDecoded = exploredArtifactIds.includes(artifact.id);
            const thumbFailed = Boolean(imageLoadFailedMap[artifact.id]);

            return (
              <button
                key={artifact.id}
                type="button"
                onClick={() => handleSelectArtifact(idx)}
                className={`group rounded-2xl overflow-hidden border text-right transition-all flex items-stretch ${
                  isSelected
                    ? 'bg-[#FAF5E8] border-amber-700 ring-1 ring-amber-700/40'
                    : 'bg-white border-stone-200 hover:border-amber-400'
                }`}
              >
                <div className="w-28 shrink-0 bg-stone-200 relative overflow-hidden">
                  {thumbFailed ? (
                    <div className="w-full h-full flex items-center justify-center bg-[#EBE2CE] text-amber-900">
                      <Compass className="w-6 h-6" />
                    </div>
                  ) : (
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.titleAr}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageLoadFailedMap((prev) => ({ ...prev, [artifact.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between gap-1.5">
                  <div>
                    <div className="text-[11px] font-mono text-stone-500">
                      {artifact.accessionCode} · {artifact.categoryLabelAr}
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 leading-snug mt-0.5">
                      {artifact.titleAr}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-hieroglyphs text-base text-amber-900">
                      {artifact.hieroglyphicInscription.split(' ').slice(0, 3).join(' ')}
                    </span>
                    {isDecoded && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>مقروءة</span>
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
