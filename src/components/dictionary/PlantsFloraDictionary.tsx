import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Search,
  BookOpen,
  Filter,
  Check,
  Flower2,
  Leaf,
  Sun,
  Moon,
  Scroll,
  Info,
  ChevronDown,
  ChevronUp,
  FlameKindling
} from 'lucide-react';
import { SACRED_FLORA_LIST, SACRED_FLORA_CATEGORIES } from '../../data/plantsFloraData';
import { SacredFloraEntry } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

export const PlantsFloraDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'funerary' | 'daily_life' | 'divine_offering'>('all');
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(SACRED_FLORA_LIST[0].id);

  const filteredFlora = SACRED_FLORA_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.nameAr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.gardinerCode.toLowerCase().includes(q) ||
      item.transliteration.toLowerCase().includes(q) ||
      item.phoneticReadingAr.toLowerCase().includes(q) ||
      item.culturalSignificanceAr.toLowerCase().includes(q) ||
      item.funeraryMeaningAr.toLowerCase().includes(q) ||
      item.dailyLifeMeaningAr.toLowerCase().includes(q) ||
      item.mythologicalAssociationAr.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const handlePlaySound = (item: SacredFloraEntry) => {
    if (activePlayingId === item.id) {
      scribeAudio.stop();
      setActivePlayingId(null);
      return;
    }
    setActivePlayingId(item.id);
    soundFX.playAncientChime(540);
    const textToSpeak = `رمز ${item.nameAr}.. كود جاردنر ${item.gardinerCode}.. نطقه: ${item.phoneticReadingAr}.. في النصوص الجنائزية: ${item.funeraryMeaningAr}.. وفي الحياة اليومية: ${item.dailyLifeMeaningAr}`;
    scribeAudio.speakText(textToSpeak, { id: item.id });
  };

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-900/30 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white p-6 sm:p-10 shadow-lg space-y-4">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <Flower2 className="w-4 h-4 text-emerald-400" />
            <span>عالم النبات والزهور في مصر القديمة (Flora Aegyptiaca)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-100 font-display-eg tracking-tight">
            معجم رموز النباتات والزهور في اللغة المصرية القديمة
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
            رأى المصري القديم في خضرة الوادي ونباتات النيل تجسيداً لقانون الخلق والبعث؛ فلم تكن الزهور مجرد زينة، بل كانت رموزاً خالدة للولادة المتجددة: زهرة اللوتس الزرقاء تنبثق فجراً من الماء كالشمس الوليدة، وعيدان البردي ترمز للنضارة الأبدية، وشجرة الجميز تسكنها ربة السماء لتسقي الأرواح، وسنابل القمح في أسرّة أوزيريس تعلن قيامة الحياة من صميم الموت.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-emerald-200">
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-emerald-500/30">
              𓆸 14 نبتة وزهرة مقدسة من القسم M في قائمة جاردنر
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-emerald-500/30">
              مقارنة تحليلية: المعنى في النصوص الجنائزية مقابل الحياة اليومية
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-emerald-500/30">
              نطق صوتي وشواهد موثقة من كتاب الموتى ونقوش المقابر
            </span>
          </div>
        </div>

        {/* Hieroglyphic Watermark Background */}
        <div className="absolute left-6 bottom-3 opacity-10 text-8xl font-hieroglyphs pointer-events-none select-none text-emerald-300 hidden md:block">
          𓆸 𓇅 𓆭 𓆱 𓇚 𓆼
        </div>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الزهرة، الرمز الهيروغليفي، كود جاردنر (M9, M13)، أو الدلالة الجنائزية..."
              className="w-full pr-10 pl-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-stone-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
            />
          </div>

          {/* Result Count */}
          <div className="text-xs font-bold text-stone-500 flex items-center gap-1.5 self-end sm:self-center">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span>عرض {filteredFlora.length} من أصل 14 نبتة مقدسة</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-600 flex items-center gap-1 ml-2">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            <span>سياق النص:</span>
          </span>
          {SACRED_FLORA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                soundFX.playClickSound();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.labelAr}
            </button>
          ))}
        </div>
      </div>

      {/* Flora Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFlora.map((flora) => {
          const isExpanded = expandedId === flora.id;
          const isPlaying = activePlayingId === flora.id;

          return (
            <div
              key={flora.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-md ${
                isExpanded
                  ? 'border-emerald-600/70 ring-1 ring-emerald-600/20'
                  : 'border-[#E8DFC9] hover:border-emerald-300'
              }`}
            >
              {/* Card Top Banner / Summary */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Glyph Display Tile */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-stone-100 border border-emerald-200/80 flex items-center justify-center text-4xl font-hieroglyphs text-emerald-950 shadow-inner group-hover:scale-105 transition-transform">
                      {flora.glyph}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                          جاردنر: {flora.gardinerCode}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                          {flora.transliteration}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-stone-900 font-display-eg mt-1">
                        {flora.nameAr}
                      </h3>
                      <div className="text-xs text-stone-500 font-serif-ar mt-0.5">
                        النطق الفونيتيكي: <span className="text-emerald-900 font-bold">{flora.phoneticReadingAr}</span>
                      </div>
                    </div>
                  </div>

                  {/* Audio & Expand Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePlaySound(flora)}
                      title={isPlaying ? 'إيقاف الصوت' : 'استمع للشرح والنطق الصوتي'}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isPlaying
                          ? 'bg-emerald-700 text-white animate-pulse'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        setExpandedId(isExpanded ? null : flora.id);
                        soundFX.playClickSound();
                      }}
                      className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      title={isExpanded ? 'طي التفاصيل' : 'عرض التفاصيل الجنائزية واليومية'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Cultural Significance Highlight */}
                <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-stone-100">
                  {flora.culturalSignificanceAr}
                </p>

                {/* Quick Dual-Context Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 space-y-1">
                    <span className="font-bold text-amber-900 flex items-center gap-1">
                      <Moon className="w-3 h-3 text-amber-700" />
                      <span>في العالم الآخر والجنائز:</span>
                    </span>
                    <p className="text-stone-600 line-clamp-2">
                      {flora.funeraryMeaningAr}
                    </p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 space-y-1">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <Sun className="w-3 h-3 text-emerald-700" />
                      <span>في الحياة اليومية والمعيشة:</span>
                    </span>
                    <p className="text-stone-600 line-clamp-2">
                      {flora.dailyLifeMeaningAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded In-Depth Section */}
              {isExpanded && (
                <div className="border-t border-emerald-100 bg-[#FCFBF8] p-5 space-y-4 animate-fadeIn">
                  {/* Detailed Funerary Text Meaning */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                      <Scroll className="w-4 h-4 text-amber-700" />
                      <span>المعنى الثقافي والتأويلي في النصوص الجنائزية وكتاب الموتى:</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-serif-ar bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      {flora.funeraryMeaningAr}
                    </p>
                  </div>

                  {/* Detailed Daily Life Usage */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      <span>الاستخدام الحياتي، الاقتصادي، والطب الفرعوني:</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-serif-ar bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60">
                      {flora.dailyLifeMeaningAr}
                    </p>
                  </div>

                  {/* Mythological Association */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>الارتباط العقائدي والأسطوري بالآلهة:</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-serif-ar">
                      {flora.mythologicalAssociationAr}
                    </p>
                  </div>

                  {/* Ancient Inscription & Sample Usage */}
                  <div className="mt-3 p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-stone-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                        <span>الشاهد الأثري والنقش القديم الموثق:</span>
                      </span>
                      <span className="text-stone-400 font-mono text-[10px]">
                        {flora.samplePhrase.sourceContextAr}
                      </span>
                    </div>

                    <div className="text-xl sm:text-2xl font-hieroglyphs text-emerald-950 text-center py-2 bg-stone-50 rounded-lg border border-dashed border-stone-300">
                      {flora.samplePhrase.hieroglyphs}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="text-stone-800 font-serif-ar font-bold">
                        « {flora.samplePhrase.translationAr} »
                      </div>
                      <div className="font-mono text-stone-500 text-[11px]" dir="ltr">
                        {flora.samplePhrase.transliteration}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFlora.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300 space-y-3">
          <Flower2 className="w-10 h-10 text-stone-400 mx-auto" />
          <p className="text-stone-600 font-bold">لم نجد أي نبتة أو زهرة تطابق بحثك</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-emerald-800 font-bold underline hover:text-emerald-950"
          >
            إعادة تعيين مرشحات البحث
          </button>
        </div>
      )}

      {/* Educational Footer Note on Egyptian Botany */}
      <div className="p-5 rounded-2xl bg-[#F7F4EB] border border-[#E8DFC9] flex items-start gap-3 text-xs text-stone-700 leading-relaxed font-serif-ar">
        <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 block mb-1">
            فلسفة النبات والزهر في الفكر المصري القديم:
          </strong>
          لم يكن المصريون يعبدون النباتات لذاتها، بل كانوا يتدبرون فيها تجليات الحكمة الإلهية ونظام (ماعت) الكوني؛ فالنبات يموت في الخريف ليعود إلى الحياة مع فيضان النيل في الربيع، مما جعل الزهور والنباتات الدليل الطبيعي الأكثر إقناعاً لديهم على حتمية البعث بعد الموت وخلود الروح في رحاب الأبدية.
        </div>
      </div>
    </div>
  );
};
