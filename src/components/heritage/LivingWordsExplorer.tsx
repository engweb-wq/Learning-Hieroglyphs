import React, { useState } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Clock, Heart, Share2, HelpCircle } from 'lucide-react';
import { LIVING_WORDS, LIVING_WORDS_CATEGORIES } from '../../data/livingWordsData';
import { LivingWord } from '../../types';
import { soundFX } from '../../utils/soundEffects';

export const LivingWordsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedWord, setSelectedWord] = useState<LivingWord | null>(null);
  const [dailyFactIndex, setDailyFactIndex] = useState(0);

  const filteredWords = LIVING_WORDS.filter(w => {
    const matchesCategory = activeCategory === 'all' || w.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      w.colloquialArabic.toLowerCase().includes(query) ||
      w.ancientMeaning.toLowerCase().includes(query) ||
      w.historicalEvolution.toLowerCase().includes(query) ||
      w.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handlePlayWord = (word: LivingWord) => {
    soundFX.playAncientChime(500);
    soundFX.speakArabic(`${word.colloquialArabic}.. أصلها المصري القديم: ${word.ancientMeaning}`);
  };

  const currentDailyFact = LIVING_WORDS[dailyFactIndex % LIVING_WORDS.length];

  return (
    <section id="heritage" className="space-y-8 text-right">
      
      {/* Featured Header with Heritage Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-2">
              <span>تراث لغوي خالد عبر آلاف السنين</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>لسان أجدادنا ينطق معنا</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display-eg leading-tight text-amber-100">
              كلمات مصرية قديمة لا زلنا نستخدمها حتى اليوم!
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-serif-ar max-w-xl">
              هل تعلم أنك عندما تقول «فول مدمس»، أو تدعو طفلك لتناول «المَمْ»، أو تهتف «كاني وماني»، أو تنشد «وحوي يا وحوي» في رمضان؛ فإنك تتحدث بلغة الفراعنة دون أن تشعر؟
            </p>

            {/* Daily trivia widget */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>هل تعلم عن: {currentDailyFact.colloquialArabic}؟</span>
                </span>
                <button
                  onClick={() => setDailyFactIndex(prev => prev + 1)}
                  className="hover:underline text-[11px] text-stone-200"
                >
                  كلمة أخرى ↻
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-normal">
                {currentDailyFact.funFact}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[280px]">
            <img
              src="/src/assets/images/living_words_heritage_1794200392571.jpg"
              alt="نقوش هيروغليفية وأواني الفخار وقدرة الفول المدمس المصرية التراثية"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DFC9] shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كلمة عامية (مثال: مدمس، طشة، كاني، تاتا، وحوي، شبشب...)"
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white text-right"
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

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {LIVING_WORDS_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat.nameAr}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>عرض {filteredWords.length} كلمة متوارثة وموثقة في المعاجم الأثرية</span>
        <span>اضغط على أي بطاقة لسماع النطق واكتشاف رحلتها التاريخية</span>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            onClick={() => setSelectedWord(word)}
            className="group relative p-5 rounded-2xl bg-white border border-[#E8DFC9] hover:border-amber-600 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header: Category and Hieroglyphic Glyph */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-3">
                <span className="text-xs font-semibold text-amber-800">
                  {word.categoryAr}
                </span>
                <span className="text-2xl font-hieroglyphs text-stone-800 group-hover:scale-115 transition-transform select-none">
                  {word.hieroglyphSigns}
                </span>
              </div>

              {/* Main Word Titles */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {word.colloquialArabic}
                </h3>
                <div className="text-xs text-stone-500 flex items-center gap-1.5 font-mono">
                  <span>الأصل القديم:</span>
                  <span className="text-amber-900 font-bold font-sans">{word.ancientMeaning}</span>
                  <span>({word.ancientTransliteration})</span>
                </div>
              </div>

              {/* Historical Evolution Preview */}
              <p className="text-xs sm:text-sm text-stone-600 mt-3 font-serif-ar leading-relaxed line-clamp-3">
                {word.historicalEvolution}
              </p>

              {/* Modern Example Tag */}
              <div className="mt-3 p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-700">
                <span className="font-bold text-amber-900 ml-1">في لساننا اليوم:</span>
                <span className="italic">"{word.exampleUsageToday}"</span>
              </div>
            </div>

            {/* Footer with Audio and details trigger */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayWord(word);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors text-xs font-semibold"
                aria-label={`استمع لنطق ${word.colloquialArabic}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>استمع للأصل</span>
              </button>

              <span className="text-xs font-bold text-amber-800 group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                <span>التفاصيل الأثرية</span>
                <span aria-hidden="true">←</span>
              </span>
            </div>

          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
          <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <div className="text-base font-bold text-stone-800">لم نجد كلمة مطابقة لبحثك</div>
          <p className="text-xs text-stone-500">جرب البحث بكلمة أخرى مثل: فول، مَم، طشة، كاني، شونة، أو اختر تصنيفاً من الأعلى.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-4 py-2 bg-amber-800 text-white rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors"
          >
            إعادة تعيين البحث
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-900/20 max-h-[90vh] overflow-y-auto space-y-6 text-right animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-800">{selectedWord.categoryAr}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                  {selectedWord.colloquialArabic}
                </h3>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Hieroglyphic Sign Banner */}
            <div className="p-5 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-500">الرمز الهيروغليفي الأصلي:</div>
                <div className="text-4xl font-hieroglyphs text-stone-900 mt-1 select-none">
                  {selectedWord.hieroglyphSigns}
                </div>
              </div>
              <div className="text-left">
                <div className="text-xs text-stone-500">التفريغ الصوتي:</div>
                <div className="text-base font-bold font-mono text-amber-900">{selectedWord.ancientTransliteration}</div>
                <div className="text-xs text-stone-700">{selectedWord.ancientMeaning}</div>
              </div>
            </div>

            {/* Linguistic Story */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span>الرحلة اللغوية عبر العصور:</span>
              </h4>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar bg-stone-50 p-4 rounded-xl border border-stone-200">
                {selectedWord.historicalEvolution}
              </p>
            </div>

            {/* Did you know callout */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>معلومة أثرية موثقة:</span>
              </span>
              <p className="leading-relaxed">{selectedWord.funFact}</p>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <button
                onClick={() => handlePlayWord(selectedWord)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للشرح الصوتي</span>
              </button>

              <button
                onClick={() => setSelectedWord(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
