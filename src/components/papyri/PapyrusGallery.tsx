import React, { useState } from 'react';
import { 
  Scroll, 
  Search, 
  Volume2, 
  Sparkles, 
  Eye, 
  Award, 
  CheckCircle, 
  RotateCcw, 
  Info, 
  HelpCircle,
  MapPin,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Compass,
  Bookmark,
  Scale,
  MessageSquare,
  Wand2
} from 'lucide-react';
import { FAMOUS_PAPYRI } from '../../data/papyriData';
import { PapyrusItem, PapyrusWordSegment } from '../../types';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';
import { BookOfTheDeadSection } from './BookOfTheDeadSection';
import { RosettaStoneExplorer } from './RosettaStoneExplorer';
import { ResurrectionJourney } from './ResurrectionJourney';

type DisplayTranslationMode = 'all' | 'arabic' | 'transliteration' | 'phonetic' | 'english';
type CategoryFilter = 'all' | 'funerary' | 'literature' | 'medicine_science' | 'history_royalty' | 'prophetic_parallels';
type ExhibitionWing = 'papyri' | 'book_of_the_dead' | 'rebirth_journey' | 'rosetta_stone';

export const PapyrusGallery: React.FC = () => {
  const [activeWing, setActiveWing] = useState<ExhibitionWing>('papyri');
  const [selectedPapyrusId, setSelectedPapyrusId] = useState<string>(FAMOUS_PAPYRI[0].id);
  const [activeSegment, setActiveSegment] = useState<PapyrusWordSegment | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [translationMode, setTranslationMode] = useState<DisplayTranslationMode>('all');
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  
  // Westcar Papyrus state
  const [activeWonderStoryIdx, setActiveWonderStoryIdx] = useState<number>(0);
  const [isNarratingDialog, setIsNarratingDialog] = useState<boolean>(false);

  // Interactive mini-challenge state
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activePapyrus: PapyrusItem = 
    FAMOUS_PAPYRI.find((p) => p.id === selectedPapyrusId) || FAMOUS_PAPYRI[0];

  // Filtered list based on search and category
  const filteredPapyri = FAMOUS_PAPYRI.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      item.titleAr.includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.dynastyAndEraAr.includes(q) ||
      item.currentMuseumLocation.includes(q) ||
      item.arabicTranslation.includes(q) ||
      (item.biblicalPropheticConnection && item.biblicalPropheticConnection.toLowerCase().includes(q)) ||
      (item.academicConsensusNote && item.academicConsensusNote.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleSelectPapyrus = (papyrus: PapyrusItem) => {
    soundFX.playClickSound();
    setSelectedPapyrusId(papyrus.id);
    setActiveSegment(null);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setActiveWonderStoryIdx(0);
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
    }
    if (isNarratingDialog) {
      scribeAudio.stop();
      setIsNarratingDialog(false);
    }
  };

  const handlePlayWestcarDialog = () => {
    if (isNarratingDialog) {
      scribeAudio.stop();
      setIsNarratingDialog(false);
      return;
    }
    if (!activePapyrus.khufuAndMagiciansDialogAr) return;

    soundFX.playAncientChime(520);
    setIsNarratingDialog(true);
    const script = activePapyrus.khufuAndMagiciansDialogAr
      .map(line => `${line.characterAr}: ${line.quoteAr}`)
      .join('. ');

    scribeAudio.speakText(script, {
      id: 'westcar-khufu-dialog',
      onEnd: () => setIsNarratingDialog(false),
      onError: () => setIsNarratingDialog(false)
    });
  };

  const handlePlayFullNarration = () => {
    if (isNarrating) {
      scribeAudio.stop();
      setIsNarrating(false);
      return;
    }

    soundFX.playAncientChime(520);
    setIsNarrating(true);
    scribeAudio.speakText(activePapyrus.audioNarrationText, {
      id: `papyrus-${activePapyrus.id}`,
      onEnd: () => setIsNarrating(false),
      onError: () => setIsNarrating(false),
    });
  };

  const handlePlaySegmentPronunciation = (seg: PapyrusWordSegment) => {
    soundFX.playClickSound();
    setActiveSegment(seg);
    scribeAudio.speakText(`${seg.pronunciationAr}.. وتعني: ${seg.meaningAr}`, {
      id: `seg-${seg.id}`,
    });
  };

  const getGlyphSizeClass = () => {
    switch (fontSize) {
      case 'xlarge':
        return 'text-4xl sm:text-5xl md:text-6xl';
      case 'large':
        return 'text-3xl sm:text-4xl md:text-5xl';
      case 'normal':
      default:
        return 'text-2xl sm:text-3xl md:text-4xl';
    }
  };

  // Quick challenge question generator based on the active papyrus
  const challengeQuestion = {
    prompt: `ما معنى العبارة أو الكلمة الرئيسية في هذه البردية: «${activePapyrus.segments[0]?.glyphs || ''}»؟`,
    correctIndex: 0,
    options: [
      activePapyrus.segments[0]?.meaningAr || 'فاتحة وبداية الكتاب المقدس',
      'اسم إله الحصاد والنيل في الدلتا',
      'نوع الحبر الأسود المصنوع من السخام'
    ]
  };

  return (
    <div className="space-y-10 text-right">
      
      {/* Top Exhibition Wings Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#FAF6EE] border-2 border-amber-300/80 rounded-3xl shadow-xs">
        <button
          type="button"
          onClick={() => {
            soundFX.playClickSound();
            setActiveWing('papyri');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeWing === 'papyri'
              ? 'bg-amber-950 text-white ring-2 ring-amber-400 shadow-md scale-102'
              : 'text-stone-700 hover:text-amber-950 hover:bg-amber-100/70'
          }`}
        >
          <Scroll className="w-4 h-4 text-amber-400" />
          <span>معرض البرديات والمخطوطات ({FAMOUS_PAPYRI.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClickSound();
            setActiveWing('book_of_the_dead');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeWing === 'book_of_the_dead'
              ? 'bg-amber-950 text-white ring-2 ring-amber-400 shadow-md scale-102'
              : 'text-stone-700 hover:text-amber-950 hover:bg-amber-100/70'
          }`}
        >
          <Scale className="w-4 h-4 text-amber-400" />
          <span>نصوص الأبدية: كتاب الموتى ⚖️</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClickSound();
            setActiveWing('rebirth_journey');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeWing === 'rebirth_journey'
              ? 'bg-amber-950 text-white ring-2 ring-amber-400 shadow-md scale-102'
              : 'text-stone-700 hover:text-amber-950 hover:bg-amber-100/70'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>رحلة البعث: فك النقوش</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClickSound();
            setActiveWing('rosetta_stone');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activeWing === 'rosetta_stone'
              ? 'bg-amber-950 text-white ring-2 ring-amber-400 shadow-md scale-102'
              : 'text-stone-700 hover:text-amber-950 hover:bg-amber-100/70'
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>حجر رشيد: مفتاح الأسرار 🔍</span>
        </button>
      </div>

      {/* Conditionally Render Other Wings */}
      {activeWing === 'book_of_the_dead' && <BookOfTheDeadSection />}
      {activeWing === 'rebirth_journey' && <ResurrectionJourney />}
      {activeWing === 'rosetta_stone' && <RosettaStoneExplorer />}

      {/* Classic Papyri Gallery Wing */}
      {activeWing === 'papyri' && (
        <div className="space-y-12">
          {/* Header & Curatorial Introduction Banner */}
          <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-1.5">
              <Scroll className="w-4 h-4 text-amber-700" />
              <span>معرض المخطوطات والبرديات الفرعونية الخالدة (Papyrus Gallery)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              كنوز البردي المصري: قراءة فورية وترجمة حية للنصوص الأصلية
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayFullNarration}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap ${
                isNarrating 
                  ? 'bg-amber-700 text-white ring-4 ring-amber-300' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isNarrating ? 'animate-bounce text-amber-200' : 'text-amber-700'}`} />
              <span>{isNarrating ? 'جارٍ سرد الرواية التاريخية...' : 'استمع للشرح الصوتي للبردية'}</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar max-w-4xl">
          كان ورق البردي أعظم هدايا النيل للإنسانية، وسر خلود العلوم والآداب والطب المصري القديم. اختر إحدى البرديات التاريخية الكبرى أدناه لتستعرض نصها الهيروغليفي الأصلي المكتوب بالمداد الأسود والمغرة الحمراء، مع الترجمة الفورية كلمة بكلمة وتحليل السياق التاريخي ومكان حفظها في كبرى متاحف العالم.
        </p>

        {/* Filter & Search Bar */}
        <div className="pt-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              جميع البرديات ({FAMOUS_PAPYRI.length})
            </button>

            <button
              onClick={() => setSelectedCategory('funerary')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'funerary'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              طقوس الخلود والعالم الآخر
            </button>

            <button
              onClick={() => setSelectedCategory('literature')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'literature'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              الأدب والشعر والملاحم
            </button>

            <button
              onClick={() => setSelectedCategory('medicine_science')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'medicine_science'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              الطب والرياضيات والعلوم
            </button>

            <button
              onClick={() => setSelectedCategory('history_royalty')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'history_royalty'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              تاريخ الملوك والأنساب
            </button>

            <button
              onClick={() => setSelectedCategory('prophetic_parallels')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'prophetic_parallels'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>وثائق وسياق الأنبياء (5)</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="ابحث عن بردية أو متحف أو كلمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <Search className="w-4 h-4 text-stone-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Methodological Notice Banner for Prophetic Parallels */}
      {selectedCategory === 'prophetic_parallels' && (
        <div className="bg-amber-950 border border-amber-500/50 text-amber-100 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-md">
          <Bookmark className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-amber-200 block text-sm">
              ملاحظة منهجية وتاريخية في دراسة برديات ونقوش العصر النبوي:
            </span>
            <p className="text-amber-100/90 leading-relaxed font-serif-ar">
              يفرّق علماء الآثار والتاريخ بين التشابه السردي في هذه البرديات وبين الإثبات الأثري المباشر؛ فأسماء الأنبياء لا ترد صراحة في البرديات الفرعونية القديمة، ولكن هذه النصوص تقدم صورة حية للبيئة التاريخية والاجتماعية والجغرافية التي عاصرها الأنبياء في مصر والشام.
            </p>
          </div>
        </div>
      )}

      {/* Papyrus Selector Cards Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-600">
          <span>اختر البردية لمعاينتها في جهاز الفحص والترجمة:</span>
          <span>{filteredPapyri.length} مخطوطة متاحة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {filteredPapyri.map((papyrus) => {
            const isSelected = papyrus.id === activePapyrus.id;
            return (
              <button
                key={papyrus.id}
                onClick={() => handleSelectPapyrus(papyrus)}
                className={`p-4 rounded-2xl border transition-all text-right flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-amber-950 text-white border-amber-800 ring-2 ring-amber-400 shadow-md scale-[1.02]'
                    : 'bg-white hover:bg-amber-50/70 text-stone-800 border-[#E8DFC9] hover:border-amber-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className={`text-[11px] font-bold ${isSelected ? 'text-amber-300' : 'text-amber-800'}`}>
                    {papyrus.categoryAr}
                  </div>
                  <h4 className="font-bold text-sm leading-snug font-display-eg line-clamp-2">
                    {papyrus.titleAr}
                  </h4>
                  <div className={`text-[11px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {papyrus.approximateDateBCE}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/40 flex items-center justify-between text-[11px]">
                  <span className={`font-hieroglyphs text-base truncate max-w-[100px] ${isSelected ? 'text-amber-200' : 'text-amber-950'}`}>
                    {papyrus.hieroglyphicText.slice(0, 8)}
                  </span>
                  <span className={`font-medium ${isSelected ? 'text-amber-300' : 'text-stone-600'}`}>
                    فحص البردية ➔
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Papyrus Showcase & Interactive Decoder Canvas */}
      <div className="bg-gradient-to-b from-[#F5EEDB] via-[#FAF6ED] to-[#FAF5E8] border-2 border-amber-800/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Curatorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-200/80 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-800 text-white text-xs font-bold">
                {activePapyrus.categoryAr}
              </span>
              <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{activePapyrus.dynastyAndEraAr} ({activePapyrus.approximateDateBCE})</span>
              </span>
              <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>{activePapyrus.currentMuseumLocation}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display-eg">
              {activePapyrus.titleAr}
            </h3>
            
            <div className="text-xs sm:text-sm text-stone-600 font-sans">
              <span>العنوان الأكاديمي الدولي: </span>
              <strong className="text-stone-800 font-semibold">{activePapyrus.titleEn}</strong>
              <span className="mx-2">·</span>
              <span>الأبعاد: {activePapyrus.lengthAndDimensions}</span>
            </div>
          </div>

          {/* Font Controls & Translation View Switcher */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <div className="bg-white/80 p-1 rounded-xl border border-amber-200 flex items-center gap-1">
              <span className="text-[11px] font-bold text-stone-500 px-2">حجم الخط:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${fontSize === 'normal' ? 'bg-amber-800 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              >
                عادي
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${fontSize === 'large' ? 'bg-amber-800 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              >
                كبير
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${fontSize === 'xlarge' ? 'bg-amber-800 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              >
                مكبر
              </button>
            </div>
          </div>
        </div>

        {/* Realistic Ancient Egyptian Papyrus Canvas */}
        <div className="relative rounded-2xl border-4 border-amber-900/40 bg-[#EFE3C8] shadow-inner p-6 sm:p-8 space-y-6 overflow-hidden">
          
          {/* Subtle reed fiber crosshatch watermark texture */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none select-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #9C6615 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #9C6615 0px, transparent 1px, transparent 4px)'
            }}
          />

          {/* Rubric Header Banner (Title in Ancient Red Ink) */}
          {activePapyrus.hieroglyphicHeadingRed && (
            <div className="relative z-10 flex items-center justify-between bg-red-950/10 border-r-4 border-red-700 pr-3 py-1.5 rounded-l-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-bold text-red-900 font-mono">
                  عنوان التعويذة بالمداد الأحمر (Rubrication):
                </span>
              </div>
              <span className="font-hieroglyphs text-red-900 text-xl tracking-widest">
                {activePapyrus.hieroglyphicHeadingRed}
              </span>
            </div>
          )}

          {/* Interactive Hieroglyphic Excerpt with Segment Chips */}
          <div className="relative z-10 space-y-4">
            <div className="text-xs font-bold text-amber-950/80 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-800" />
                <span>انقر على أي مقطع هيروغليفي لفحصه لغوياً وصوتياً:</span>
              </span>
              <span className="text-[11px] text-stone-600 font-mono">
                {activePapyrus.segments.length} مقاطع محللة
              </span>
            </div>

            {/* Clickable Word Segment Flow */}
            <div className="flex flex-wrap gap-2.5 items-center justify-start p-4 bg-white/70 rounded-xl border border-amber-300/80 shadow-2xs">
              {activePapyrus.segments.map((seg) => {
                const isActive = activeSegment?.id === seg.id;
                return (
                  <button
                    key={seg.id}
                    onClick={() => handlePlaySegmentPronunciation(seg)}
                    className={`group relative p-2.5 rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-amber-900 text-white border-amber-950 ring-3 ring-amber-400 scale-105 shadow-md'
                        : seg.isRedInk
                        ? 'bg-red-50 hover:bg-red-100 text-red-900 border-red-300'
                        : 'bg-[#FAF6EE] hover:bg-amber-100/80 text-stone-900 border-amber-200'
                    }`}
                  >
                    <span className={`font-hieroglyphs ${getGlyphSizeClass()} tracking-wide transition-transform group-hover:scale-105`}>
                      {seg.glyphs}
                    </span>
                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-amber-200' : 'text-amber-900'}`}>
                      {seg.transliteration}
                    </span>
                    <span className={`text-[10px] whitespace-nowrap px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200/80 text-stone-700'
                    }`}>
                      {seg.pronunciationAr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Word Segment Live Inspection Card */}
          {activeSegment ? (
            <div className="relative z-10 bg-white border-2 border-amber-700 rounded-2xl p-5 shadow-md space-y-3 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-hieroglyphs text-3xl sm:text-4xl text-amber-950 p-2 bg-amber-50 rounded-xl border border-amber-200">
                    {activeSegment.glyphs}
                  </span>
                  <div>
                    <h5 className="font-bold text-stone-900 text-base">
                      {activeSegment.meaningAr}
                    </h5>
                    <div className="text-xs font-mono text-amber-800">
                      النطق الصوتي: <strong>{activeSegment.pronunciationAr}</strong> ({activeSegment.transliteration})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-950 rounded-lg text-xs font-bold">
                    {activeSegment.grammaticalRole}
                  </span>
                  <button
                    onClick={() => handlePlaySegmentPronunciation(activeSegment)}
                    className="p-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white transition-colors"
                    title="استمع لصوت هذا المقطع"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div>
                  <span className="font-bold text-stone-500">المعنى الإنجليزي: </span>
                  <span className="font-serif italic">{activeSegment.meaningEn}</span>
                </div>
                {activeSegment.gardinerCodes && (
                  <div>
                    <span className="font-bold text-stone-500">رموز جاردنر (Gardiner): </span>
                    <span className="font-mono text-amber-900 font-bold">{activeSegment.gardinerCodes.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative z-10 p-3 bg-amber-100/50 rounded-xl border border-amber-200 text-center text-xs text-stone-600 font-serif-ar">
              💡 انقر على أي رمز أو كلمة هيروغليفية في المخطوطة أعلاه لعرض تحليلها النحوي وتفاصيلها الصوتية.
            </div>
          )}

          {/* Instant Multi-Layered Translation Suite */}
          <div className="relative z-10 bg-white/95 rounded-2xl p-6 border border-amber-300 space-y-5 shadow-xs">
            
            {/* Translation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>الترجمة الفورية للنص الكامل:</span>
              </span>

              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setTranslationMode('all')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${translationMode === 'all' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  عرض شامل
                </button>
                <button
                  onClick={() => setTranslationMode('arabic')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${translationMode === 'arabic' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  العربية فقط
                </button>
                <button
                  onClick={() => setTranslationMode('phonetic')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${translationMode === 'phonetic' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  النطق الصوتي
                </button>
                <button
                  onClick={() => setTranslationMode('english')}
                  className={`px-3 py-1 rounded-md font-bold transition-colors ${translationMode === 'english' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Arabic Literary Translation */}
            {(translationMode === 'all' || translationMode === 'arabic') && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-800">الترجمة العربية الدقيقة:</div>
                <p className="text-base sm:text-lg text-stone-900 font-bold font-serif-ar leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                  {activePapyrus.arabicTranslation}
                </p>
              </div>
            )}

            {/* Phonetic & Transliteration Layer */}
            {(translationMode === 'all' || translationMode === 'phonetic' || translationMode === 'transliteration') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="text-xs font-bold text-stone-600">النطق الصوتي بالحروف العربية:</div>
                  <div className="text-xs sm:text-sm text-stone-800 font-serif leading-relaxed">
                    {activePapyrus.phoneticReadingAr}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="text-xs font-bold text-stone-600">النقحرة الأكاديمية (Transliteration):</div>
                  <div className="text-xs sm:text-sm text-amber-950 font-mono italic leading-relaxed">
                    {activePapyrus.transliteration}
                  </div>
                </div>
              </div>
            )}

            {/* English Academic Translation */}
            {(translationMode === 'all' || translationMode === 'english') && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-600">English Scholarly Translation:</div>
                <p className="text-xs sm:text-sm text-stone-700 font-serif italic leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  {activePapyrus.englishTranslation}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Historical Context & Archaeological Significance (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Historical Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>السياق التاريخي والظروف السياسية والاجتماعية:</span>
              </h4>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar">
                {activePapyrus.historicalContext}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>القيمة الأثرية ومكانة البردية في علم المصريات:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar">
                {activePapyrus.archaeologicalSignificance}
              </p>
            </div>

            {/* Biblical & Prophetic Parallels Special Scholarly Section */}
            {activePapyrus.biblicalPropheticConnection && (
              <div className="bg-gradient-to-br from-amber-950 via-[#26180c] to-stone-900 text-amber-50 p-6 rounded-2xl border-2 border-amber-500/60 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-amber-700/50 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>سياق الأنبياء والتقاطعات التاريخية</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    توثيق مقارن
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h5 className="text-xs font-bold text-amber-200">
                    ارتباط البردية بقصص وسياق الأنبياء عليهم السلام:
                  </h5>
                  <p className="text-sm text-amber-100/95 leading-relaxed font-serif-ar">
                    {activePapyrus.biblicalPropheticConnection}
                  </p>
                </div>

                {activePapyrus.academicConsensusNote && (
                  <div className="pt-3 border-t border-amber-800/60 space-y-1.5">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>الرأي الأكاديمي ورؤية علماء المصريات والتاريخ:</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-serif-ar">
                      {activePapyrus.academicConsensusNote}
                    </p>
                  </div>
                )}

                {activePapyrus.methodologicalNote && (
                  <div className="bg-amber-900/40 border border-amber-400/40 rounded-xl p-3.5 text-xs text-amber-200 leading-relaxed font-serif-ar flex items-start gap-2.5">
                    <Bookmark className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300 block mb-0.5">ملاحظة منهجية وتاريخية:</span>
                      <span>{activePapyrus.methodologicalNote}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Scribe Secrets & Rare Curatorial Fact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Curator Fun Fact Card */}
            <div className="bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 p-6 rounded-2xl border-2 border-amber-600/40 shadow-md space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Info className="w-4 h-4" />
                <span>سر من أسرار صناعة البردي والكتبة</span>
              </div>
              <h5 className="font-bold text-white text-base font-display-eg">
                معلومة متحفية نادرة
              </h5>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif-ar">
                {activePapyrus.funCuratorialFact}
              </p>
            </div>

            {/* Quick Scribe Deciphering Challenge */}
            <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 border-b border-stone-200 pb-2">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>تحدي الكاتب: فك شفرة البردية</span>
                </span>
                <span className="text-[11px] text-stone-500 font-mono">+20 نقطة كاتب</span>
              </div>

              <div className="text-xs sm:text-sm font-bold text-stone-900 font-serif-ar">
                {challengeQuestion.prompt}
              </div>

              <div className="space-y-2">
                {challengeQuestion.options.map((opt, idx) => {
                  const isChosen = quizSelectedOption === idx;
                  const isCorrect = idx === challengeQuestion.correctIndex;
                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => {
                        soundFX.playClickSound();
                        setQuizSelectedOption(idx);
                        setQuizSubmitted(true);
                        if (isCorrect) {
                          soundFX.playSuccessSound();
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl border text-right text-xs transition-all flex items-center justify-between ${
                        quizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : isChosen
                            ? 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-stone-50 border-stone-200 opacity-60'
                          : isChosen
                          ? 'bg-amber-100 border-amber-700'
                          : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                      }`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="pt-2 flex items-center justify-between">
                  <span className={`text-xs font-bold ${quizSelectedOption === challengeQuestion.correctIndex ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {quizSelectedOption === challengeQuestion.correctIndex 
                      ? '✓ أحسنت! إجابة صحيحة أيها الكاتب الماهر!' 
                      : 'حاول مجدداً للتعرف على أسرار هذه البردية.'}
                  </span>
                  <button
                    onClick={() => {
                      setQuizSelectedOption(null);
                      setQuizSubmitted(false);
                    }}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة المحاولة</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Westcar Papyrus Special Exhibition: 5 Tales of Wonder & Khufu-Dedi Dialogue */}
        {activePapyrus.talesOfWonder && activePapyrus.talesOfWonder.length > 0 && (
          <div className="border-t-2 border-amber-300 pt-8 space-y-8 animate-fadeIn">
            
            {/* Literary Significance Header */}
            <div className="bg-gradient-to-r from-amber-950 via-[#361E10] to-stone-900 text-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-lg space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <Wand2 className="w-4 h-4 text-amber-400" />
                  <span>الأهمية الأدبية والتاريخية لبردية وستكار</span>
                </div>
                <span className="text-xs font-mono text-amber-300 bg-amber-900/50 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                  أقدم أنطولوجيا خيالية في التاريخ
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-amber-100 font-display-eg">
                خوفو والسحرة: عجائب بلاط الأهرامات والقصص الخمس الخالدة
              </h4>

              <p className="text-xs sm:text-sm text-stone-200 font-serif-ar leading-relaxed">
                {activePapyrus.literarySignificanceDeepAr || activePapyrus.historicalContext}
              </p>
            </div>

            {/* 5 Tales of Wonder Selector & Story Showcase */}
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>موسوعة الخوارق: القصص الخمس المروية أمام الفرعون خوفو</span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-stone-900 font-display-eg">
                    اختر إحدى القصص الخمس لقراءة تفاصيل المعجزة السحرية:
                  </h5>
                </div>
                <span className="text-xs font-mono text-stone-500 font-bold">5 قصص خوارق</span>
              </div>

              {/* Story Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {activePapyrus.talesOfWonder.map((tale, idx) => {
                  const isActive = activeWonderStoryIdx === idx;
                  return (
                    <button
                      key={tale.number}
                      type="button"
                      onClick={() => {
                        soundFX.playClickSound();
                        setActiveWonderStoryIdx(idx);
                      }}
                      className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-amber-900 text-white border-amber-950 ring-2 ring-amber-400 shadow-sm'
                          : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                        <span>القصة #{tale.number}</span>
                        <span>{idx === 0 ? '🐊' : idx === 1 ? '🌊' : idx === 2 ? '🦆' : idx === 3 ? '👑' : '🌾'}</span>
                      </div>
                      <div className="text-xs font-bold font-serif-ar line-clamp-2">
                        {tale.titleAr}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Story Card */}
              {activePapyrus.talesOfWonder[activeWonderStoryIdx] && (
                <div className="bg-[#FAF6EE] border border-amber-300 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3">
                    <div className="space-y-1">
                      <h4 className="text-lg sm:text-xl font-bold text-amber-950 font-display-eg">
                        {activePapyrus.talesOfWonder[activeWonderStoryIdx].titleAr}
                      </h4>
                      <div className="text-xs text-amber-900 font-serif-ar">
                        الراوي: <strong>{activePapyrus.talesOfWonder[activeWonderStoryIdx].storytellerAr}</strong>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-200/80 text-amber-950 px-3 py-1 rounded-full font-bold">
                      حكاية رقم #{activePapyrus.talesOfWonder[activeWonderStoryIdx].number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-stone-700">مضمون القصة ومجريات الأحداث:</div>
                    <p className="text-sm sm:text-base text-stone-800 font-serif-ar leading-relaxed bg-white p-4 rounded-xl border border-amber-200/60 shadow-2xs">
                      {activePapyrus.talesOfWonder[activeWonderStoryIdx].plotAr}
                    </p>
                  </div>

                  <div className="p-3.5 bg-amber-100/70 rounded-xl border border-amber-300 space-y-1">
                    <div className="text-xs font-bold text-amber-900">المعجزة السحرية والخارقة:</div>
                    <p className="text-xs sm:text-sm text-stone-800 font-serif-ar">
                      {activePapyrus.talesOfWonder[activeWonderStoryIdx].magicTrickAr}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-200/80 text-xs text-stone-600 font-serif-ar leading-relaxed">
                    <strong className="text-amber-900">المغزى والدلالة الأخلاقية: </strong>
                    {activePapyrus.talesOfWonder[activeWonderStoryIdx].moralAr}
                  </div>
                </div>
              )}
            </div>

            {/* Spotlight on Khufu and the Magicians Dialogue */}
            {activePapyrus.khufuAndMagiciansDialogAr && (
              <div className="bg-gradient-to-br from-[#20150d] via-[#2d1b11] to-[#1a110a] text-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/50 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-700/60 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span>النص الدرامي المسرحي الأصلي</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-display-eg">
                      محاورة خوفو والساحر ديدي في البلاط الملكي 🎭
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlayWestcarDialog}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-center shrink-0 ${
                      isNarratingDialog
                        ? 'bg-amber-600 text-white ring-4 ring-amber-400 animate-pulse'
                        : 'bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-500/50'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>{isNarratingDialog ? 'إيقاف تمثيل المحاورة' : 'استمع للحوار الدرامي بين خوفو وديدي'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activePapyrus.khufuAndMagiciansDialogAr.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        line.characterAr.includes('خوفو')
                          ? 'bg-amber-950/60 border-amber-500/50 mr-0 ml-4 sm:ml-12'
                          : line.characterAr.includes('ديدي')
                          ? 'bg-stone-900/80 border-amber-400/40 mr-4 sm:mr-12 ml-0'
                          : 'bg-black/40 border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className={line.characterAr.includes('خوفو') ? 'text-amber-300 font-display-eg' : 'text-amber-400 font-display-eg'}>
                          {line.characterAr}
                        </span>
                        <span className="text-[11px] text-stone-400 italic font-serif-ar">
                          ({line.roleAr})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-100 font-serif-ar leading-relaxed">
                        {line.quoteAr}
                      </p>
                      {line.hieroglyphsSample && (
                        <div className="mt-2 pt-2 border-t border-amber-800/40 text-amber-300/80 font-hieroglyphs text-base text-left" dir="ltr">
                          {line.hieroglyphsSample}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-amber-300/80 font-serif-ar border-t border-amber-800/60">
                  💡 تبرز هذه المحاورة حكمة الساحر ديدي وإنسانيته برفضه تجربة قطع الرأس على سجين بشري مفضلاً إوزة القصر، مع اعتراف الملك خوفو بحكمته.
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  )}

</div>
  );
};
