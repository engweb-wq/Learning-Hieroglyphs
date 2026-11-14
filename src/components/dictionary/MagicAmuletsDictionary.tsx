import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Volume2,
  Shield,
  BookOpen,
  Gem,
  CheckCircle2,
  Scroll,
  MousePointerClick
} from 'lucide-react';
import {
  MAGIC_AMULETS_DICTIONARY,
  AmuletCategory,
  MagicAmuletEntry
} from '../../data/amuletsDictionaryData';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';

type CategoryFilter = 'all' | AmuletCategory;

const STORAGE_KEY = 'egyptian_scribe_explored_amulets_v1';

export const MagicAmuletsDictionary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedAmuletId, setSelectedAmuletId] = useState<string>(
    MAGIC_AMULETS_DICTIONARY[0].id
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [exploredIds, setExploredIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [MAGIC_AMULETS_DICTIONARY[0].id];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [MAGIC_AMULETS_DICTIONARY[0].id];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exploredIds));
    } catch {
      // ignore
    }
  }, [exploredIds]);

  const filteredAmulets =
    selectedCategory === 'all'
      ? MAGIC_AMULETS_DICTIONARY
      : MAGIC_AMULETS_DICTIONARY.filter((a) => a.category === selectedCategory);

  const activeAmulet: MagicAmuletEntry =
    MAGIC_AMULETS_DICTIONARY.find((a) => a.id === selectedAmuletId) ||
    MAGIC_AMULETS_DICTIONARY[0];

  const handleSelectAmulet = (amulet: MagicAmuletEntry) => {
    setSelectedAmuletId(amulet.id);
    soundFX.playTempleGong();

    if (!exploredIds.includes(amulet.id)) {
      const nextExplored = [...exploredIds, amulet.id];
      setExploredIds(nextExplored);
      studentProgress.addPoints(
        15,
        `دراسة دلالة «${amulet.nameAr}» في قاموس التمائم`,
        'قاموس التمائم'
      );
      if (nextExplored.length === MAGIC_AMULETS_DICTIONARY.length) {
        studentProgress.completeLesson('mod-magic-amulets');
      }
    }
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    const matches =
      cat === 'all'
        ? MAGIC_AMULETS_DICTIONARY
        : MAGIC_AMULETS_DICTIONARY.filter((a) => a.category === cat);
    if (matches.length > 0 && !matches.some((m) => m.id === selectedAmuletId)) {
      setSelectedAmuletId(matches[0].id);
    }
  };

  return (
    <section className="space-y-8 text-right" dir="rtl">
      {/* Curatorial Section Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#F5EEDB] via-[#FAF7F0] to-amber-50 border border-[#E8DFC9] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-2">
              <Gem className="w-4 h-4 text-amber-700" />
              <span>معجم أثري مصور</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>التمائم المصرية ودلالاتها الهيروغليفية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              قاموس التمائم السحرية عند المصريين القدماء
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar">
              لم تكن التميمة مجرد حلية للزينة، بل «كلمة هيروغليفية مجسمة» تُنحت من أحجار مخصوصة لحمل معناها السحري واللغوي. انقر على أي تميمة أدناه لاستكشاف دلالتها اللغوية ورمزيتها التاريخية.
            </p>
          </div>

          <div className="bg-white border border-[#E8DFC9] rounded-2xl p-5 min-w-[260px] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600">
              <span>التمائم المدروسة</span>
              <span className="font-mono tabular-nums text-amber-900">
                {exploredIds.length} / {MAGIC_AMULETS_DICTIONARY.length}
              </span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-800 transition-all duration-300"
                style={{
                  width: `${Math.round(
                    (exploredIds.length / MAGIC_AMULETS_DICTIONARY.length) * 100
                  )}%`
                }}
              />
            </div>
            <div className="text-[11px] font-medium text-stone-500 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-amber-700" />
              <span>انقر على أي صورة تميمة لعرض بطاقتها المتحفية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#F5EEDB] border border-[#E8DFC9] rounded-2xl">
          {[
            { id: 'all' as CategoryFilter, label: 'جميع التمائم (6)' },
            { id: 'protection' as CategoryFilter, label: 'الحماية والشفاء' },
            { id: 'rebirth' as CategoryFilter, label: 'البعث والتجدد' },
            { id: 'eternity' as CategoryFilter, label: 'الخلود والثبات' }
          ].map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-semibold text-stone-500">
          التميمة المعروضة الآن: <strong className="text-stone-900">{activeAmulet.nameAr}</strong>
        </div>
      </div>

      {/* Asymmetric Two-Column Layout: Clickable Visual Gallery (5 cols) + Curatorial Accession Detail (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Amulets Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
          {filteredAmulets.map((amulet) => {
            const isSelected = amulet.id === activeAmulet.id;
            const isExplored = exploredIds.includes(amulet.id);
            const hasImgError = imageErrors[amulet.id];

            return (
              <button
                key={amulet.id}
                type="button"
                onClick={() => handleSelectAmulet(amulet)}
                className={`group text-right rounded-2xl border overflow-hidden transition-all flex flex-col bg-white ${
                  isSelected
                    ? 'border-amber-700 ring-2 ring-amber-500/40 shadow-md'
                    : 'border-[#E8DFC9] hover:border-amber-400 shadow-xs'
                }`}
              >
                <div className="relative aspect-square w-full bg-[#EFE9DC] overflow-hidden">
                  {hasImgError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-stone-200 p-4 text-center">
                      <span className="font-hieroglyphs text-6xl text-amber-900 leading-none">
                        {amulet.hieroglyph}
                      </span>
                      <span className="text-xs font-bold text-stone-700 mt-2">
                        {amulet.nameAr}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={amulet.imageUrl}
                      alt={amulet.imageAltAr}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [amulet.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 right-2.5 left-2.5 flex items-end justify-between text-white">
                    <span className="font-hieroglyphs text-3xl text-amber-300 leading-none drop-shadow">
                      {amulet.hieroglyph}
                    </span>
                    <span className="text-[11px] font-mono text-amber-100/90">
                      {amulet.gardinerCode}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-extrabold text-stone-900 leading-snug">
                      {amulet.nameAr.replace(/تميمة /, '')}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5">
                      <span>{amulet.pronunciationAr}</span>
                      <span aria-hidden="true">·</span>
                      <span>{amulet.categoryAr}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-amber-800' : 'text-stone-500'}>
                      {isSelected ? 'قيد العرض الآن' : 'انقر للتفاصيل'}
                    </span>
                    {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Curatorial Accession Detail Viewer (7 cols) */}
        <article className="lg:col-span-7 rounded-3xl bg-white border border-[#E8DFC9] overflow-hidden shadow-xs">
          {/* Top Accession Visual Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-[#E8DFC9] bg-[#FAF7F0]">
            <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:min-h-[260px] bg-stone-200">
              {imageErrors[activeAmulet.id] ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 to-stone-200 p-6">
                  <span className="font-hieroglyphs text-7xl text-amber-900">
                    {activeAmulet.hieroglyph}
                  </span>
                </div>
              ) : (
                <img
                  src={activeAmulet.imageUrl}
                  alt={activeAmulet.imageAltAr}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [activeAmulet.id]: true }))
                  }
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="sm:col-span-7 p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-stone-500 flex flex-wrap items-center gap-2">
                  <span>{activeAmulet.accessionNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>كود جاردنر {activeAmulet.gardinerCode}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-bold text-amber-800">
                    {activeAmulet.categoryAr}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg leading-snug">
                  {activeAmulet.nameAr}
                </h3>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="px-4 py-2 rounded-2xl bg-white border border-[#E8DFC9] flex items-center gap-3">
                    <span className="font-hieroglyphs text-4xl text-amber-900 leading-none">
                      {activeAmulet.fullWordHieroglyphs}
                    </span>
                    <div className="text-xs">
                      <div className="font-mono font-bold text-stone-800">
                        /{activeAmulet.transliteration}/
                      </div>
                      <div className="text-amber-800 font-bold">
                        النطق: {activeAmulet.pronunciationAr}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => soundFX.speakArabic(activeAmulet.audioScriptAr)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>استمع للشرح والنطق</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-stone-600 pt-3 border-t border-[#E8DFC9] space-y-1">
                <div>
                  <strong className="text-stone-900">مادة الصنع التقليدية:</strong>{' '}
                  {activeAmulet.materialAr}
                </div>
                <div>
                  <strong className="text-stone-900">دلالة اللون والخامة:</strong>{' '}
                  {activeAmulet.colorSymbolismAr}
                </div>
              </div>
            </div>
          </div>

          {/* Linguistic & Historical Analysis Columns */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* Hieroglyphic Language Meaning */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-amber-900">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>الدلالة في اللغة الهيروغليفية</span>
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-serif-ar">
                {activeAmulet.hieroglyphicMeaningAr}
              </p>
              <div className="text-xs text-stone-600 bg-[#FAF7F0] border border-[#E8DFC9] rounded-xl p-3">
                <strong className="text-stone-900">الوظيفة الكتابية: </strong>
                {activeAmulet.linguisticFunctionAr}
              </div>
            </div>

            <div className="border-t border-stone-100" />

            {/* Historical & Religious Symbolism */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-stone-900">
                <Shield className="w-4 h-4 text-amber-700" />
                <span>الرمزية التاريخية والعقائدية</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-serif-ar">
                {activeAmulet.historicalSymbolismAr}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-1">
                  <div className="font-bold text-stone-900">موضع التميمة والطقوس</div>
                  <p className="text-stone-600 leading-relaxed">
                    {activeAmulet.placementAndRitualAr}
                  </p>
                </div>
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 space-y-1">
                  <div className="font-bold text-stone-900 flex items-center gap-1">
                    <Scroll className="w-3.5 h-3.5 text-amber-800" />
                    <span>المرجع الجنائزي</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {activeAmulet.bookOfTheDeadRefAr}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100" />

            {/* Sample Inscription Using the Amulet Glyph */}
            <div className="rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>شاهد هيروغليفي يضم رمز التميمة</span>
                </div>
                <div className="font-hieroglyphs text-3xl text-stone-900">
                  {activeAmulet.sampleInscription.hieroglyphs}
                </div>
                <div className="text-xs font-mono text-stone-500">
                  /{activeAmulet.sampleInscription.transliteration}/ ·{' '}
                  {activeAmulet.sampleInscription.phoneticAr}
                </div>
                <div className="text-sm font-bold text-stone-900">
                  {activeAmulet.sampleInscription.translationAr}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  soundFX.speakArabic(
                    `${activeAmulet.sampleInscription.phoneticAr}.. ${activeAmulet.sampleInscription.translationAr}`
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8DFC9] hover:border-amber-500 text-xs font-bold text-amber-900 shrink-0 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>نطق الشاهد</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
