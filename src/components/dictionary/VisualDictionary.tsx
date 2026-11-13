import React, { useState } from 'react';
import { 
  Search, Volume2, Sparkles, BookOpen, Filter, Check, Info,
  Droplets, Sun, Moon, Cloud, Globe, Waves, Mountain, Coins, Shield,
  Heart, Eye, Hand, MessageSquare, Footprints, Smile, UserCheck, Box,
  ShieldAlert, Activity, User, Users, UserPlus, Baby, HeartHandshake,
  Crown, Award, PenTool, Flame, Building, Home, Cookie, Utensils,
  GlassWater, Soup, Coffee, Cake, FlameKindling, Wheat, Shirt,
  Feather, Bird, AlertTriangle, Fish, SunMedium, SmilePlus, Scale,
  ArrowRightLeft, Flower2
} from 'lucide-react';
import { DICTIONARY_50_WORDS, DICTIONARY_CATEGORIES } from '../../data/dictionary50Words';
import { DictionaryWord } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { EgyptianAntonymsSection } from './EgyptianAntonymsSection';
import { AnimalsBirdsDictionary } from './AnimalsBirdsDictionary';
import { PlantsFloraDictionary } from './PlantsFloraDictionary';

// Icon Map resolver
const getIconComponent = (name: string) => {
  const map: Record<string, React.ElementType> = {
    Droplets, Sun, Moon, Cloud, Globe, Waves, Mountain, Coins, Shield,
    Heart, Eye, Hand, MessageSquare, Footprints, Smile, UserCheck, Box,
    ShieldAlert, Activity, User, Users, UserPlus, Baby, HeartHandshake,
    Crown, Award, PenTool, Flame, Building, Home, Cookie, Utensils,
    GlassWater, Soup, Coffee, Cake, FlameKindling, Wheat, Shirt,
    Feather, Bird, AlertTriangle, Fish, SunMedium, SmilePlus, Scale
  };
  return map[name] || Sparkles;
};

export const VisualDictionary: React.FC = () => {
  const [dictSubTab, setDictSubTab] = useState<'words' | 'antonyms' | 'fauna' | 'flora'>('words');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeWord, setActiveWord] = useState<DictionaryWord | null>(null);

  const filteredWords = DICTIONARY_50_WORDS.filter(word => {
    const matchesCategory = selectedCategory === 'all'
      ? true
      : selectedCategory === 'shared'
      ? word.hasSharedArabicRoot
      : word.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      word.arabicMeaning.toLowerCase().includes(query) ||
      word.arabicTransliteration.toLowerCase().includes(query) ||
      word.transliteration.toLowerCase().includes(query) ||
      word.arabicSharedRootNote.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handlePlayWord = (word: DictionaryWord) => {
    soundFX.playAncientChime(560);
    soundFX.speakArabic(`${word.arabicTransliteration}.. تعني ${word.arabicMeaning}.. ${word.arabicSharedRootNote}`);
  };

  const sharedRootCount = DICTIONARY_50_WORDS.filter(w => w.hasSharedArabicRoot).length;

  return (
    <div id="dictionary" className="space-y-8 text-right">
      
      {/* Sub-Section Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-4">
        <div className="inline-flex p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300 gap-2 max-w-full overflow-x-auto">
          <button
            onClick={() => {
              setDictSubTab('words');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              dictSubTab === 'words'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>القاموس المصور (50 كلمة أساسية)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('antonyms');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              dictSubTab === 'antonyms'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>معجم المتضادات والثنائيات (12 زوجاً)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('fauna');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              dictSubTab === 'fauna'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Bird className="w-4 h-4 text-amber-300" />
            <span>رموز الحيوانات والطيور (16 كائناً)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('flora');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              dictSubTab === 'flora'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Flower2 className="w-4 h-4 text-emerald-300" />
            <span>رموز النباتات والزهور (جديد 𓆸 14 نبتة)</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          {dictSubTab === 'words' && '50 كلمة مع الجذور المشتركة'}
          {dictSubTab === 'antonyms' && '12 ثنائية متناقضة مع شواهد نحوية'}
          {dictSubTab === 'fauna' && '16 كائناً مقدساً ودلالاتها الرمزية والأسطورية'}
          {dictSubTab === 'flora' && '14 نبتة وزهرة مقدسة ودلالاتها في النصوص الجنائزية واليومية'}
        </div>
      </div>

      {/* Render Antonyms Section */}
      {dictSubTab === 'antonyms' && <EgyptianAntonymsSection />}

      {/* Render Animals & Birds Section */}
      {dictSubTab === 'fauna' && <AnimalsBirdsDictionary />}

      {/* Render Plants & Flowers Section */}
      {dictSubTab === 'flora' && <PlantsFloraDictionary />}

      {/* Render 50 Core Words Section */}
      {dictSubTab === 'words' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>قاموس الكاتب المصور الشامل (50 كلمة)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              معجم المفردات الأساسية والجذور المشتركة
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl font-serif-ar">
              استكشف 50 كلمة مصرية قديمة أساسية مصحوبة بأيقونات توضيحية ونطق صوتي وشرح لجذورها العميقة المشتركة مع اللغة العربية واللهجات المعاصرة.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl self-start sm:self-auto">
            <span className="text-2xl font-black font-mono text-amber-900 tabular-nums">50</span>
            <div className="text-xs text-amber-950 font-bold leading-tight">
              <div>كلمة مصورة</div>
              <div className="text-amber-800 font-normal">منها {sharedRootCount} بجذر مشترك ⭐</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-stone-100">
          
          {/* Search Input (5 cols) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالمعنى (ماء، شمس، حب، بيت...) أو بالنطق..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white text-right"
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

          {/* Category Tabs (7 cols) */}
          <div className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {DICTIONARY_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Words Grid (50 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredWords.map((word) => {
          const IconComp = getIconComponent(word.iconName);
          const isSelected = activeWord?.id === word.id;

          return (
            <div
              key={word.id}
              onClick={() => {
                setActiveWord(word);
                handlePlayWord(word);
              }}
              className={`group p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-700 shadow-lg bg-amber-50/40 ring-1 ring-amber-500'
                  : 'border-[#EAE2D0] hover:border-amber-500 hover:shadow-md'
              }`}
            >
              <div>
                {/* Card Top: Category and Illustrated Icon */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500">
                      {word.categoryAr}
                    </span>
                  </div>

                  {word.hasSharedArabicRoot && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                      جذر مشترك ⭐
                    </span>
                  )}
                </div>

                {/* Big Hieroglyph Unicode Glyph */}
                <div className="text-center my-3">
                  <span className="text-5xl font-hieroglyphs text-stone-900 select-none group-hover:scale-110 transition-transform inline-block">
                    {word.hieroglyphs}
                  </span>
                </div>

                {/* Word Transliteration & Meaning */}
                <div className="text-center space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-800">
                    {word.arabicTransliteration} ({word.transliteration})
                  </div>
                  <div className="text-base font-bold text-stone-900">
                    {word.arabicMeaning}
                  </div>
                  <div className="text-xs text-stone-500 italic">
                    {word.englishMeaning}
                  </div>
                </div>

                {/* Shared root note snippet */}
                <p className="text-xs text-stone-600 mt-2.5 pt-2 border-t border-stone-100 font-serif-ar leading-relaxed line-clamp-2">
                  {word.arabicSharedRootNote}
                </p>
              </div>

              {/* Action row */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayWord(word);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold text-[11px] transition-colors"
                  aria-label="استمع للنطق"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>انطق الكلمة</span>
                </button>

                <span className="text-[11px] font-bold text-amber-800 group-hover:underline">
                  تفاصيل أكثر ←
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-2">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <div className="text-sm font-bold text-stone-800">لم يتم العثور على كلمات مطابقة لبحثك</div>
          <p className="text-xs text-stone-500">جرب البحث بكلمة شمس، ماء، بيت، خبز، حب، أو اختر تصنيفاً آخر.</p>
        </div>
      )}

        </div>
      )}

      {/* Active Word Modal / Drawer */}
      {activeWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-900/20 max-h-[90vh] overflow-y-auto space-y-6 text-right animate-fadeIn">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-800">{activeWord.categoryAr}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                  {activeWord.arabicMeaning}
                </h3>
                <div className="text-xs text-stone-500 italic mt-0.5">{activeWord.englishMeaning}</div>
              </div>
              <button
                onClick={() => setActiveWord(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Glyph Box */}
            <div className="p-6 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-7xl font-hieroglyphs text-stone-900 select-none">
                {activeWord.hieroglyphs}
              </span>
              <div className="text-sm font-mono font-bold text-amber-900">
                النطق الفرعوني: {activeWord.arabicTransliteration} ({activeWord.transliteration})
              </div>
            </div>

            {/* Shared Root Note */}
            <div className="space-y-1.5 bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
              <strong className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>الجذر المشترك والصلة باللغة العربية:</span>
              </strong>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif-ar">
                {activeWord.arabicSharedRootNote}
              </p>
            </div>

            {/* Example sentence */}
            <div className="space-y-1 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700">
              <div className="font-bold text-stone-900">مثال من النصوص المصرية القديمة:</div>
              <div className="italic text-amber-900 font-serif-ar text-sm">{activeWord.exampleUsage}</div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between border-t border-stone-200 pt-3">
              <button
                onClick={() => handlePlayWord(activeWord)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للنطق الصوتي</span>
              </button>

              <button
                onClick={() => setActiveWord(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
