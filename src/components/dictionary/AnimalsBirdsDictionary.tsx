import React, { useState, useEffect } from 'react';
import {
  Bird,
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Feather,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SACRED_FAUNA_DATA } from '../../data/animalsBirdsData';
import { SacredFaunaEntry } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

export const AnimalsBirdsDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'birds' | 'mammals' | 'reptiles_insects'>('all');
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(SACRED_FAUNA_DATA[0].id);

  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => setActivePlayingId(id));
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

  const categories = [
    { id: 'all', nameAr: 'جميع الكائنات (16)' },
    { id: 'birds', nameAr: 'طيور مقدسة 🦅' },
    { id: 'mammals', nameAr: 'ثدييات وحيوانات برية 🦁' },
    { id: 'reptiles_insects', nameAr: 'زواحف وحشرات ومائيات 🐊' },
  ];

  const filteredFauna = SACRED_FAUNA_DATA.filter((item) => {
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
      item.mythologicalAssociationAr.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const handlePlaySound = (item: SacredFaunaEntry) => {
    if (activePlayingId === item.id) {
      scribeAudio.stop();
      setActivePlayingId(null);
      return;
    }
    setActivePlayingId(item.id);
    soundFX.playAncientChime(580);
    const textToSpeak = `رمز ${item.nameAr}.. كود جاردنر ${item.gardinerCode}.. نطقه بالمصرية القديمة: ${item.phoneticReadingAr}.. دلالته الثقافية: ${item.culturalSignificanceAr}`;
    scribeAudio.speakText(textToSpeak, {
      id: item.id,
      onEnd: () => setActivePlayingId(null),
      onError: () => setActivePlayingId(null),
    });
  };

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-10 shadow-lg space-y-4">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Bird className="w-4 h-4 text-amber-400" />
            <span>عالم الحيوان والطير في مصر القديمة (Fauna & Sacred Creatures)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-display-eg tracking-tight">
            معجم رموز الحيوانات والطيور في اللغة المصرية القديمة
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
            لم تكن الحيوانات والطيور في الهيروغليفية مجرد حروف صامتة، بل كانت نافذة لتأمل صفات الطبيعة وقوى الكون: صقر حورس المحلق رمز السيادة والانتصار، وبومة الحظيرة رمز اليقظة في دياجير الظلام، والجعران رمز الصيرورة وتجدد الحياة. استكشف المعاني الثقافية والأسطورية لكل رمز وكيف وُظِّف في صياغة الجمل والأسماء.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200">
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-amber-500/30">
              16 كائناً مقدساً مع قائمة جاردنر المعيارية
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-amber-500/30">
              نطق صوتي وشواهد استخدام من المعابد والبرديات
            </span>
          </div>
        </div>

        {/* Hieroglyphic Watermark Background */}
        <div className="absolute left-6 bottom-3 opacity-10 text-8xl font-hieroglyphs pointer-events-none select-none text-amber-300 hidden md:block">
          𓅃 𓅓 𓃬 𓆣 𓆗 𓅞
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-[#E8DFC9] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الحيوان (صقر، بومة، أسد، تمساح) أو كود جاردنر..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white text-right font-serif-ar"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  soundFX.playClickSound();
                }}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fauna Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredFauna.map((fauna) => {
          const isPlaying = activePlayingId === fauna.id;
          const isExpanded = expandedId === fauna.id;

          return (
            <div
              key={fauna.id}
              className={`rounded-3xl border transition-all duration-300 p-5 sm:p-6 space-y-4 ${
                isExpanded
                  ? 'bg-white border-amber-600/80 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-white border-[#E8DFC9] hover:border-amber-400 shadow-2xs'
              }`}
            >
              {/* Card Header: Category & Gardiner Pill */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-950 border border-amber-300">
                    {fauna.gardinerCode}
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">
                    {fauna.categoryAr}
                  </span>
                </div>

                <button
                  onClick={() => handlePlaySound(fauna)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
                  title="استمع للنطق والشرح الصوتي"
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                      <span>إيقاف</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>استمع للنطق 🔊</span>
                    </>
                  )}
                </button>
              </div>

              {/* Symbol Showcase & Name */}
              <div className="flex items-start gap-4">
                {/* Giant Hieroglyphic Sign Box */}
                <div className="w-20 h-20 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex items-center justify-center text-5xl font-hieroglyphs text-amber-950 shrink-0 shadow-2xs hover:scale-105 transition-transform select-none">
                  {fauna.glyph}
                </div>

                {/* Identity & Transliteration */}
                <div className="space-y-1 text-right flex-1">
                  <h3 className="text-lg font-bold text-stone-900 font-display-eg">
                    {fauna.nameAr}
                  </h3>
                  <div className="text-xs font-mono font-bold text-amber-900">
                    {fauna.phoneticReadingAr}
                    <span className="font-serif italic font-normal text-stone-500 mr-1.5">
                      ({fauna.transliteration})
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 italic">
                    {fauna.nameEn}
                  </div>
                  <div className="text-[11px] text-stone-600 bg-stone-100/80 px-2 py-0.5 rounded-md inline-block mt-1">
                    {fauna.grammaticalRoleAr}
                  </div>
                </div>
              </div>

              {/* Cultural & Expressive Significance */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-1.5 text-xs text-stone-700 leading-relaxed font-serif-ar">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>المعنى الثقافي والتعبيري عند الفراعنة:</span>
                </div>
                <p>{fauna.culturalSignificanceAr}</p>
              </div>

              {/* Mythological & Religious Association */}
              <div className="text-xs text-stone-600 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 font-serif-ar">
                <strong className="text-amber-900">الربط العقائدي والأسطوري:</strong>{' '}
                {fauna.mythologicalAssociationAr}
              </div>

              {/* Expandable Usage Phrase Accordion */}
              <div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : fauna.id)}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-900 bg-stone-50 hover:bg-stone-100 p-2.5 rounded-xl border border-stone-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>شاهد استخدام الرمز في النصوص والنقوش القديمة</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-amber-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-amber-700" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2.5 p-3.5 rounded-xl bg-white border border-amber-200 space-y-2 animate-fadeIn text-center">
                    <div className="text-2xl font-hieroglyphs text-amber-950 py-1 tracking-widest">
                      {fauna.samplePhrase.hieroglyphs}
                    </div>
                    <div className="text-xs font-serif italic text-stone-500">
                      {fauna.samplePhrase.transliteration}
                    </div>
                    <div className="text-xs font-bold text-amber-950 font-serif-ar">
                      «{fauna.samplePhrase.translationAr}»
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
