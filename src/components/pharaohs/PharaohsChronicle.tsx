import React, { useState, useMemo } from 'react';
import { 
  Crown, 
  Sparkles, 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  BookOpen, 
  Landmark, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Info,
  ExternalLink,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ANCIENT_EGYPTIAN_KINGS, PHARAOHS_ERA_FILTERS, getKingEpigraphicStyle } from '../../data/pharaohsData';
import { PharaohKingEntry } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { InteractiveKingCartoucheCard } from './InteractiveKingCartoucheCard';

interface PharaohsChronicleProps {
  onOpenCartoucheMaker?: () => void;
}

export const PharaohsChronicle: React.FC<PharaohsChronicleProps> = ({ onOpenCartoucheMaker }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedKing, setSelectedKing] = useState<PharaohKingEntry | null>(ANCIENT_EGYPTIAN_KINGS[0]);
  const [activeModalKing, setActiveModalKing] = useState<PharaohKingEntry | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter Kings
  const filteredKings = useMemo(() => {
    return ANCIENT_EGYPTIAN_KINGS.filter((king) => {
      const matchesEra = selectedEra === 'all' || king.eraCategory === selectedEra;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q ||
        king.commonNameAr.toLowerCase().includes(q) ||
        king.commonNameEn.toLowerCase().includes(q) ||
        king.dynastyAr.toLowerCase().includes(q) ||
        king.reignPeriodBce.toLowerCase().includes(q) ||
        king.summaryBioAr.toLowerCase().includes(q) ||
        king.cartouche.prenomenReadingAr.toLowerCase().includes(q) ||
        king.cartouche.nomenReadingAr.toLowerCase().includes(q) ||
        king.famousMonumentsAr.some(m => m.toLowerCase().includes(q));

      return matchesEra && matchesQuery;
    });
  }, [selectedEra, searchQuery]);

  // Audio speech
  const handlePlayAudio = (king: PharaohKingEntry, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (activePlayingId === king.id) {
      scribeAudio.stop();
      setActivePlayingId(null);
      return;
    }

    setActivePlayingId(king.id);
    soundFX.playAncientChime(560);

    scribeAudio.speakText(king.audioSpeechScript, {
      id: king.id,
      onEnd: () => setActivePlayingId(null),
      onError: () => setActivePlayingId(null)
    });
  };

  // Copy Cartouche
  const handleCopyCartouche = (king: PharaohKingEntry, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const cartoucheText = `𓍹${king.cartouche.prenomenHieroglyphs}𓍺 ${king.cartouche.nomenHieroglyphs ? `𓍹${king.cartouche.nomenHieroglyphs}𓍺` : ''}`;
    navigator.clipboard.writeText(cartoucheText.trim());
    setCopiedId(king.id);
    soundFX.playSuccessSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Era-Specific Interactive Cartouche Modal
  const handleOpenCartoucheModal = (king: PharaohKingEntry, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playClickSound();
    setActiveModalKing(king);
  };

  const handleNextModalKing = () => {
    if (!activeModalKing) return;
    const currentIndex = filteredKings.findIndex(k => k.id === activeModalKing.id);
    const nextIndex = (currentIndex + 1) % filteredKings.length;
    setActiveModalKing(filteredKings[nextIndex]);
    soundFX.playClickSound();
  };

  const handlePrevModalKing = () => {
    if (!activeModalKing) return;
    const currentIndex = filteredKings.findIndex(k => k.id === activeModalKing.id);
    const prevIndex = (currentIndex - 1 + filteredKings.length) % filteredKings.length;
    setActiveModalKing(filteredKings[prevIndex]);
    soundFX.playClickSound();
  };

  return (
    <div className="space-y-8 text-right" dir="rtl">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-300/80 bg-gradient-to-r from-amber-950 via-[#2A1B0E] to-stone-900 text-white p-6 sm:p-10 shadow-xl space-y-4">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>سجل ملوك وفراعنة مصر القديمة قبل الميلاد (Chronicle of the Pharaohs BCE)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 font-display-eg tracking-tight">
            ملوك مصر القديمة قبل الميلاد: الخراطيش الملكية، السير، والآثار الخالدة
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
            من فجر التاريخ مع الملك نعرمر موحد القطرين حوالي عام 3100 قبل الميلاد، مروراً ببناة الأهرامات العظام، وقادة الإمبراطورية المحاربين كتحتمس الثالث ورمسيس الثاني، وصولاً إلى الملكة كليوباترا السابعة عام 30 قبل الميلاد: استكشف سيرة أعظم ملوك حكموا وادي النيل، واقرأ خراطيشهم الهيروغليفية واستمع لنطق أسمائهم الملكية.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200">
            <span className="bg-black/40 px-3 py-1 rounded-lg border border-amber-500/30 font-semibold">
              👑 20+ ملكاً وملكة من أعظم قادة الحضارة المصرية
            </span>
            <span className="bg-black/40 px-3 py-1 rounded-lg border border-amber-500/30 font-semibold">
              𓍹𓍺 خراطيش هيروغليفية حقيقية لاسم العرش واسم الولادة
            </span>
            <span className="bg-black/40 px-3 py-1 rounded-lg border border-amber-500/30 font-semibold">
              🔊 نطق صوتي موثق مع الشواهد الأثرية
            </span>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute left-6 bottom-4 opacity-10 text-9xl font-hieroglyphs pointer-events-none select-none text-amber-300 hidden md:block">
          𓇓 𓏏 𓈖 𓊹 𓌷 𓂝
        </div>
      </div>

      {/* Search Bar & Era Filter Tabs */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8DFC9] shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الملك (خوفو، رمسيس، حتشبسوت...)، الأسرة، الآثار (الأهرامات، أبو سمبل)، أو كود الخرطوشة..."
              className="w-full pr-10 pl-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-stone-200 rounded-2xl focus:outline-hidden focus:border-amber-600 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
            />
          </div>

          <div className="text-xs font-bold text-stone-500 flex items-center gap-1.5 self-end sm:self-center">
            <Crown className="w-4 h-4 text-amber-800" />
            <span>عرض {filteredKings.length} ملكاً وملكة</span>
          </div>
        </div>

        {/* Era Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full border-t border-stone-100 pt-3">
          <span className="text-xs font-bold text-stone-600 flex items-center gap-1 shrink-0 ml-1">
            <Filter className="w-3.5 h-3.5 text-amber-800" />
            <span>العصر التاريخي:</span>
          </span>

          {PHARAOHS_ERA_FILTERS.map((era) => {
            const isSelected = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => {
                  setSelectedEra(era.id);
                  soundFX.playClickSound();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{era.labelAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Kings Cards Grid & Detail Drawer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKings.map((king) => {
          const isSelected = selectedKing?.id === king.id;
          const isPlaying = activePlayingId === king.id;
          const isCopied = copiedId === king.id;
          const epigraphic = getKingEpigraphicStyle(king);

          return (
            <div
              key={king.id}
              onClick={() => {
                setSelectedKing(king);
                soundFX.playClickSound();
              }}
              className={`group bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-lg ${
                isSelected
                  ? 'border-amber-700 ring-2 ring-amber-400/50 bg-gradient-to-b from-amber-50/50 to-white'
                  : 'border-[#E8DFC9] hover:border-amber-500'
              }`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Header Tag with Dynasty and Era */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200/80">
                    {king.dynastyAr}
                  </span>

                  <span className="text-stone-500 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{king.reignPeriodBce}</span>
                  </span>
                </div>

                {/* King Names */}
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-display-eg group-hover:text-amber-900 transition-colors">
                    {king.commonNameAr}
                  </h3>
                  <div className="text-xs text-stone-500 font-mono mt-0.5" dir="ltr">
                    {king.commonNameEn}
                  </div>
                </div>

                {/* Royal Cartouche Box (الخرطوشة الملكية التفاعلية بأسلوب العصر) */}
                <div 
                  onClick={(e) => handleOpenCartoucheModal(king, e)}
                  className="p-3.5 rounded-2xl bg-gradient-to-b from-[#FDFBF7] to-[#F5EEDC] border-2 border-amber-300 hover:border-amber-500 text-center shadow-inner space-y-2 cursor-pointer group/cartouche transition-all hover:scale-[1.01]"
                  title="انقر لفحص الخرطوشة بالأسلوب الكتابي المعتمد في عصر هذا الملك 📜"
                >
                  <div className="text-[10px] font-bold text-amber-900 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-amber-800">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>الخرطوشة الملكية (شِنُو):</span>
                    </span>
                    <span className="font-mono text-[9px] text-stone-500">
                      {king.cartouche.prenomenReadingAr}
                    </span>
                  </div>

                  {/* Hieroglyphic Oval Cartouche Simulation */}
                  <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full border-2 max-w-full transition-transform group-hover/cartouche:scale-105 shadow-xs ${
                    epigraphic.frameType === 'serekh'
                      ? 'border-stone-700 bg-stone-900 text-amber-300'
                      : epigraphic.frameType === 'new_kingdom_gold'
                      ? 'border-amber-500 bg-amber-950 text-amber-200 ring-2 ring-amber-400/40'
                      : epigraphic.frameType === 'late_period_basalt'
                      ? 'border-stone-600 bg-stone-900 text-stone-200'
                      : 'border-amber-800 bg-white/90 text-stone-950'
                  }`}>
                    <span className="text-2xl sm:text-3xl font-hieroglyphs tracking-widest select-none">
                      𓍹{king.cartouche.prenomenHieroglyphs}𓍺
                    </span>
                  </div>

                  <div className="text-[10px] text-amber-800/90 font-mono truncate">
                    {epigraphic.eraStyleNameAr}
                  </div>

                  <div className="text-[11px] text-stone-700 font-serif-ar leading-tight">
                    معنى اسم التتويج: <strong className="text-amber-950 font-semibold">{king.cartouche.prenomenMeaningAr}</strong>
                  </div>

                  <div className="text-[10px] text-amber-900 font-bold bg-amber-100/70 py-0.5 px-2 rounded-md border border-amber-200/80 inline-flex items-center gap-1">
                    <span>فحص أسلوب عصر الملك</span>
                    <Sparkles className="w-3 h-3 text-amber-600" />
                  </div>
                </div>

                {/* Brief Bio Summary */}
                <p className="text-xs text-stone-600 font-serif-ar leading-relaxed line-clamp-3">
                  {king.summaryBioAr}
                </p>

                {/* Key Monuments Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                    <Landmark className="w-3 h-3 text-amber-800" />
                    <span>أهم الآثار والعمائر:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {king.famousMonumentsAr.slice(0, 2).map((mon, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md truncate max-w-[200px]"
                      >
                        {mon}
                      </span>
                    ))}
                    {king.famousMonumentsAr.length > 2 && (
                      <span className="text-[10px] text-amber-800 font-bold px-1 self-center">
                        +{king.famousMonumentsAr.length - 2}
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(king, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isPlaying
                      ? 'bg-amber-800 text-white animate-pulse'
                      : 'bg-amber-100/80 hover:bg-amber-200 text-amber-950'
                  }`}
                  title="استمع للموجز الصوتي لسيرة الملك"
                >
                  {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'إيقاف' : 'السيرة'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleOpenCartoucheModal(king, e)}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-colors border border-amber-300 flex items-center gap-1"
                    title="فحص الخرطوشة بالأسلوب الكتابي المعتمد في عصره"
                  >
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>فحص الخرطوشة</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopyCartouche(king, e)}
                    className="p-1.5 rounded-xl bg-white hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors"
                    title="نسخ الخرطوشة الهيروغليفية"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedKing(king);
                      soundFX.playClickSound();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-900 text-white text-xs font-bold hover:bg-amber-800 transition-colors"
                  >
                    التفاصيل
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredKings.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 space-y-3">
          <Crown className="w-12 h-12 text-stone-300 mx-auto" />
          <p className="text-stone-700 font-bold">لم نجد أي ملك أو فرعون يطابق كلمة بحثك</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedEra('all');
            }}
            className="text-xs text-amber-800 font-bold underline hover:text-amber-950"
          >
            إعادة تعيين مرشحات البحث
          </button>
        </div>
      )}

      {/* Selected King Comprehensive Spotlight Drawer */}
      {selectedKing && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-300/80 shadow-md space-y-6 animate-fadeIn">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  {selectedKing.dynastyAr}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {selectedKing.reignPeriodBce} (~{selectedKing.approximateYearsReigned} عاماً في الحكم)
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg mt-1">
                {selectedKing.commonNameAr}
              </h3>
              <div className="text-xs sm:text-sm text-stone-500 font-mono">
                {selectedKing.commonNameEn} {selectedKing.greekName && `(${selectedKing.greekName})`}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenCartoucheModal(selectedKing)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm border border-amber-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>فحص الخرطوشة بأسلوب عصر الملك 📜</span>
              </button>

              <button
                type="button"
                onClick={(e) => handlePlayAudio(selectedKing, e)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-amber-200" />
                <span>استمع للسيرة الملكية</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleCopyCartouche(selectedKing, e)}
                className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors border border-stone-200"
              >
                {copiedId === selectedKing.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>نسخ الخرطوشة</span>
              </button>

              {onOpenCartoucheMaker && (
                <button
                  type="button"
                  onClick={onOpenCartoucheMaker}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold transition-colors border border-amber-300"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>اكتب اسمك كالملوك</span>
                </button>
              )}
            </div>
          </div>

          {/* Dual Cartouches Grid (اسم التتويج واسم الولادة) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cartouche 1: Prenomen (Throne name) */}
            <div 
              onClick={() => handleOpenCartoucheModal(selectedKing)}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 space-y-2 cursor-pointer transition-all hover:shadow-md group"
              title="انقر لفتح بطاقة الملك التفاعلية وفحص الأسلوب الكتابي"
            >
              <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                <span>اسم التتويج والعرش (نِسُو-بِيتِي 𓇓𓏏):</span>
                <span className="font-mono text-[11px] text-stone-500 group-hover:text-amber-800">
                  {selectedKing.cartouche.prenomenTransliteration} 🔍
                </span>
              </div>

              <div className="text-center py-2 bg-white rounded-xl border border-amber-200 shadow-inner group-hover:border-amber-400">
                <span className="text-3xl sm:text-4xl font-hieroglyphs text-stone-900 select-none">
                  𓍹{selectedKing.cartouche.prenomenHieroglyphs}𓍺
                </span>
              </div>

              <div className="text-xs text-stone-700 font-serif-ar leading-relaxed">
                النطق: <strong className="text-amber-950 font-bold">{selectedKing.cartouche.prenomenReadingAr}</strong> — وتعني: « {selectedKing.cartouche.prenomenMeaningAr} »
              </div>
            </div>

            {/* Cartouche 2: Nomen (Birth name) */}
            <div 
              onClick={() => handleOpenCartoucheModal(selectedKing)}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 hover:border-amber-400 space-y-2 cursor-pointer transition-all hover:shadow-md group"
              title="انقر لفتح بطاقة الملك التفاعلية وفحص الأسلوب الكتابي"
            >
              <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                <span>اسم الولادة والشخصي (سَا-رَع 𓅭𓇳):</span>
                <span className="font-mono text-[11px] text-stone-500 group-hover:text-amber-800">
                  {selectedKing.cartouche.nomenTransliteration} 🔍
                </span>
              </div>

              <div className="text-center py-2 bg-white rounded-xl border border-amber-200 shadow-inner group-hover:border-amber-400">
                <span className="text-3xl sm:text-4xl font-hieroglyphs text-stone-900 select-none">
                  𓍹{selectedKing.cartouche.nomenHieroglyphs}𓍺
                </span>
              </div>

              <div className="text-xs text-stone-700 font-serif-ar leading-relaxed">
                النطق: <strong className="text-amber-950 font-bold">{selectedKing.cartouche.nomenReadingAr}</strong> — وتعني: « {selectedKing.cartouche.nomenMeaningAr} »
              </div>
            </div>

          </div>

          {/* In-Depth Bio & Historical Significance */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>السيرة والمكانة التاريخية في مسيرة الحضارة المصرية:</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200">
              {selectedKing.summaryBioAr}
            </p>
          </div>

          {/* Key Achievements Grid */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>أهم الإنجازات والفتوحات والإصلاحات الكبرى:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedKing.keyAchievementsAr.map((ach, idx) => (
                <div 
                  key={idx}
                  className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60 text-xs text-stone-800 font-serif-ar flex items-start gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Burial, Monuments & Mummy Status Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-200 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-700 block">المقبرة ومكان الدفن:</span>
              <p className="text-stone-600 font-serif-ar">{selectedKing.burialPlaceAr}</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-700 block">مصير المومياء الحالية:</span>
              <p className="text-stone-600 font-serif-ar">{selectedKing.mummyStatusAr}</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-700 block">أهم المعالم والآثار:</span>
              <p className="text-stone-600 font-serif-ar">{selectedKing.famousMonumentsAr.join('، ')}</p>
            </div>
          </div>

          {/* Famous Inscription Snippet if present */}
          {selectedKing.famousInscriptionSnippet && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>شاهد أثري ونقش مسجل من عهد الملك:</span>
                </span>
                <span className="text-stone-500 font-mono text-[10px]">
                  {selectedKing.famousInscriptionSnippet.sourceAr}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-hieroglyphs text-stone-900 text-center py-2 select-none">
                {selectedKing.famousInscriptionSnippet.hieroglyphs}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-xs">
                <span className="text-stone-800 font-bold font-serif-ar">
                  « {selectedKing.famousInscriptionSnippet.translationAr} »
                </span>
                <span className="font-mono text-stone-500 text-[11px]" dir="ltr">
                  {selectedKing.famousInscriptionSnippet.transliteration}
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Educational Footer on Egyptian Monarchy */}
      <div className="p-5 rounded-2xl bg-[#F7F4EB] border border-[#E8DFC9] flex items-start gap-3 text-xs text-stone-700 leading-relaxed font-serif-ar">
        <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-1">
            فلسفة الملكية الإلهية في مصر القديمة (نِسُو):
          </strong>
          لم يكن فرعون مجرد حاكم زمني، بل كان يُنظر إليه على أنه «ابن رع» والوسيط المقدس بين البشر وقوى السماء. كان واجبه الأعظم تطبيق مبدأ (ماعت) الكوني القائم على العدالة والنظام والتناغم، وحماية حدود مصر من قوى الفوضى (إسفت). الخرطوشة الملكية (شِنُو) حبل سحري أزلي بيضاوي يحيط باسم الملك ليحميه من قوى الشر في حياته وفي رحلته الأبدية.
        </div>
      </div>

      {/* Interactive Royal Cartouche Modal with Era-Specific Calligraphy & Medium */}
      {activeModalKing && (
        <InteractiveKingCartoucheCard
          king={activeModalKing}
          onClose={() => setActiveModalKing(null)}
          onNextKing={handleNextModalKing}
          onPrevKing={handlePrevModalKing}
          onOpenCartoucheMaker={onOpenCartoucheMaker}
        />
      )}

    </div>
  );
};
