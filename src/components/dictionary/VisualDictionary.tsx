import React, { useState, useEffect } from 'react';
import { 
  Search, Volume2, VolumeX, Sparkles, BookOpen, Filter, Check, Info,
  Droplets, Sun, Moon, Cloud, Globe, Waves, Mountain, Coins, Shield,
  Heart, Eye, Hand, MessageSquare, Footprints, Smile, UserCheck, Box,
  ShieldAlert, Activity, User, Users, UserPlus, Baby, HeartHandshake,
  Crown, Award, PenTool, Flame, Building, Home, Cookie, Utensils,
  GlassWater, Soup, Coffee, Cake, FlameKindling, Wheat, Shirt,
  Feather, Bird, AlertTriangle, Fish, SunMedium, SmilePlus, Scale,
  ArrowRightLeft, Flower2, AudioWaveform, Gauge, Languages
} from 'lucide-react';
import { DICTIONARY_50_WORDS, DICTIONARY_CATEGORIES } from '../../data/dictionary50Words';
import { DictionaryWord } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import {
  scribeAudio,
  DictionaryPronunciationMode,
  DictionarySpeechPhase
} from '../../utils/speechSynthesisService';
import { EgyptianAntonymsSection } from './EgyptianAntonymsSection';
import { AnimalsBirdsDictionary } from './AnimalsBirdsDictionary';
import { PlantsFloraDictionary } from './PlantsFloraDictionary';
import { SharedArabicRootsDictionary } from './SharedArabicRootsDictionary';

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

interface VisualDictionaryProps {
  initialSubTab?: 'words' | 'shared_roots' | 'antonyms' | 'fauna' | 'flora';
}

export const VisualDictionary: React.FC<VisualDictionaryProps> = ({ initialSubTab = 'words' }) => {
  const [dictSubTab, setDictSubTab] = useState<'words' | 'shared_roots' | 'antonyms' | 'fauna' | 'flora'>(initialSubTab);

  useEffect(() => {
    setDictSubTab(initialSubTab);
  }, [initialSubTab]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeWord, setActiveWord] = useState<DictionaryWord | null>(null);

  // Web Speech API Interactive Audio State
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [speechPhase, setSpeechPhase] = useState<DictionarySpeechPhase>(null);
  const [pronunciationMode, setPronunciationMode] = useState<DictionaryPronunciationMode>('both');
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [includeRootNoteInAudio, setIncludeRootNoteInAudio] = useState<boolean>(false);
  const isSpeechSupported = scribeAudio.isSpeechSupported();

  // Keep local playing state synchronized with global ScribeAudioSynthesizer
  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((activeId) => {
      if (!activeId) {
        setPlayingWordId(null);
        setSpeechPhase(null);
      } else {
        setPlayingWordId(activeId);
      }
    });
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

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

  const handlePlayWord = (
    word: DictionaryWord,
    overrideOptions?: {
      mode?: DictionaryPronunciationMode;
      includeRootNote?: boolean;
      toggleIfActive?: boolean;
    }
  ) => {
    const audioKey = `dict-word-${word.id}`;
    const shouldToggle = overrideOptions?.toggleIfActive ?? true;

    if (shouldToggle && playingWordId === audioKey) {
      scribeAudio.stop();
      setPlayingWordId(null);
      setSpeechPhase(null);
      return;
    }

    setPlayingWordId(audioKey);
    scribeAudio.speakDictionaryWord(word, {
      id: audioKey,
      pronunciationMode: overrideOptions?.mode ?? pronunciationMode,
      rate: speechRate,
      includeRootNote: overrideOptions?.includeRootNote ?? includeRootNoteInAudio,
      onPhaseChange: (phase) => setSpeechPhase(phase),
      onEnd: () => {
        setPlayingWordId(null);
        setSpeechPhase(null);
      },
      onError: () => {
        setPlayingWordId(null);
        setSpeechPhase(null);
      }
    });
  };

  const handlePlayExampleSentence = (word: DictionaryWord) => {
    const exId = `dict-example-${word.id}`;
    if (playingWordId === exId) {
      scribeAudio.stop();
      setPlayingWordId(null);
      setSpeechPhase(null);
      return;
    }
    soundFX.playAncientChime(520);
    setPlayingWordId(exId);
    setSpeechPhase('arabic');
    scribeAudio.speakText(word.exampleUsage, {
      id: exId,
      rate: speechRate,
      onEnd: () => {
        setPlayingWordId(null);
        setSpeechPhase(null);
      },
      onError: () => {
        setPlayingWordId(null);
        setSpeechPhase(null);
      }
    });
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
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              dictSubTab === 'words'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>القاموس المصور (50 كلمة)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('shared_roots');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              dictSubTab === 'shared_roots'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Languages className="w-4 h-4 text-amber-300" />
            <span>الجذور المشتركة مع العربية</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('antonyms');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              dictSubTab === 'antonyms'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>معجم المتضادات (12 زوجاً)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('fauna');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              dictSubTab === 'fauna'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Bird className="w-4 h-4 text-amber-300" />
            <span>الحيوانات والطيور (16)</span>
          </button>

          <button
            onClick={() => {
              setDictSubTab('flora');
              soundFX.playClickSound();
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              dictSubTab === 'flora'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Flower2 className="w-4 h-4 text-emerald-300" />
            <span>النباتات والزهور (14)</span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          {dictSubTab === 'words' && '50 كلمة مع الجذور المشتركة'}
          {dictSubTab === 'shared_roots' && 'معجم الجذور الأفروآسيوية والعربية المشتركة مع أمثلة وقوانين صوتية'}
          {dictSubTab === 'antonyms' && '12 ثنائية متناقضة مع شواهد نحوية'}
          {dictSubTab === 'fauna' && '16 كائناً مقدساً ودلالاتها الرمزية والأسطورية'}
          {dictSubTab === 'flora' && '14 نبتة وزهرة مقدسة ودلالاتها في النصوص الجنائزية واليومية'}
        </div>
      </div>

      {/* Render Shared Arabic Roots Section */}
      {dictSubTab === 'shared_roots' && <SharedArabicRootsDictionary />}

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
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
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
                  استكشف 50 كلمة مصرية قديمة أساسية مع أيقونات توضيحية، واضغط على أيقونة السماعة لسماع إعادة بناء النطق بالمصرية القديمة متبوعاً بالمعنى العربي عبر تقنية تحويل النص إلى كلام.
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

            {/* Interactive Web Speech Audio Settings Bar */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-amber-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 ml-1">
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>وضع النطق التفاعلي:</span>
                </span>
                <div className="inline-flex bg-white p-1 rounded-xl border border-amber-200 gap-1">
                  <button
                    type="button"
                    onClick={() => { soundFX.playClickSound(); setPronunciationMode('both'); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      pronunciationMode === 'both'
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    مصرية قديمة + عربية
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundFX.playClickSound(); setPronunciationMode('egyptian'); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      pronunciationMode === 'egyptian'
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    المصرية القديمة فقط
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundFX.playClickSound(); setPronunciationMode('arabic'); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      pronunciationMode === 'arabic'
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    العربية فقط
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Speed Selector */}
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-amber-200">
                  <Gauge className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[11px] font-bold text-stone-600">السرعة:</span>
                  {[
                    { value: 0.75, label: 'بطيء' },
                    { value: 0.9, label: 'طبيعي' },
                    { value: 1.1, label: 'سريع' }
                  ].map((spd) => (
                    <button
                      key={spd.value}
                      type="button"
                      onClick={() => { soundFX.playClickSound(); setSpeechRate(spd.value); }}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                        speechRate === spd.value
                          ? 'bg-amber-100 text-amber-950 border border-amber-400'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {spd.label}
                    </button>
                  ))}
                </div>

                {/* Toggle Root Note Audio */}
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClickSound();
                    setIncludeRootNoteInAudio((prev) => !prev);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                    includeRootNoteInAudio
                      ? 'bg-amber-800 text-white border-amber-900'
                      : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${includeRootNoteInAudio ? 'opacity-100' : 'opacity-30'}`} />
                  <span>قراءة الجذر اللغوي</span>
                </button>

                {playingWordId && (
                  <button
                    type="button"
                    onClick={() => scribeAudio.stop()}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 text-[11px] font-bold transition-colors"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>إيقاف الصوت</span>
                  </button>
                )}
              </div>
            </div>

            {!isSpeechSupported && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-700" />
                <span>متصفحك الحالي لا يدعم ميزة تحويل النص إلى كلام (Web Speech API)؛ ستعمل المؤثرات الصوتية الفرعونية فقط.</span>
              </div>
            )}

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
              const isCurrentlySpeaking = playingWordId === `dict-word-${word.id}`;

              return (
                <div
                  key={word.id}
                  onClick={() => {
                    setActiveWord(word);
                    handlePlayWord(word, { toggleIfActive: false });
                  }}
                  className={`group p-4 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isCurrentlySpeaking
                      ? 'border-amber-600 shadow-lg bg-amber-50/70 ring-2 ring-amber-400'
                      : isSelected
                      ? 'border-amber-700 shadow-lg bg-amber-50/40 ring-1 ring-amber-500'
                      : 'border-[#EAE2D0] hover:border-amber-500 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Card Top: Category, Illustrated Icon, and Quick Speaker Icon */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2 gap-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-semibold text-stone-500 truncate">
                          {word.categoryAr}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {word.hasSharedArabicRoot && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                            جذر ⭐
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayWord(word);
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                            isCurrentlySpeaking
                              ? 'bg-amber-700 text-white border-amber-800 animate-pulse ring-2 ring-amber-300'
                              : 'bg-amber-50 hover:bg-amber-200 text-amber-900 border-amber-300'
                          }`}
                          aria-label={isCurrentlySpeaking ? `إيقاف نطق ${word.arabicMeaning}` : `نطق كلمة ${word.arabicMeaning} بالمصرية القديمة والعربية`}
                          title="اضغط للاستماع إلى النطق بالمصرية القديمة والعربية"
                        >
                          {isCurrentlySpeaking ? (
                            <AudioWaveform className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Big Hieroglyph Unicode Glyph */}
                    <div className="text-center my-3">
                      <span className="text-5xl font-hieroglyphs text-stone-900 select-none group-hover:scale-110 transition-transform inline-block">
                        {word.hieroglyphs}
                      </span>
                    </div>

                    {/* Word Transliteration & Meaning */}
                    <div className="text-center space-y-1">
                      <div
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md inline-block transition-colors ${
                          isCurrentlySpeaking && speechPhase === 'egyptian'
                            ? 'bg-amber-800 text-amber-100'
                            : 'text-amber-800'
                        }`}
                      >
                        {word.arabicTransliteration} ({word.transliteration})
                      </div>
                      <div
                        className={`text-base font-bold transition-colors ${
                          isCurrentlySpeaking && speechPhase === 'arabic'
                            ? 'text-amber-900 underline decoration-amber-500 decoration-2 underline-offset-4'
                            : 'text-stone-900'
                        }`}
                      >
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
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayWord(word);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition-all ${
                        isCurrentlySpeaking
                          ? 'bg-amber-800 text-white shadow-xs'
                          : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/70'
                      }`}
                      aria-label={`استمع لنطق ${word.arabicMeaning}`}
                    >
                      {isCurrentlySpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {speechPhase === 'egyptian'
                              ? 'ينطق بالمصرية القديمة...'
                              : speechPhase === 'arabic'
                              ? 'ينطق بالعربية...'
                              : 'جارٍ النطق...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 shrink-0" />
                          <span>نطق الكلمة</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-bold text-amber-800 group-hover:underline whitespace-nowrap">
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
                onClick={() => {
                  scribeAudio.stop();
                  setActiveWord(null);
                }}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm transition-colors"
                aria-label="إغلاق نافذة الكلمة"
              >
                ✕
              </button>
            </div>

            {/* Glyph & Interactive Phonetic Reconstruction Box */}
            <div className="p-6 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-7xl font-hieroglyphs text-stone-900 select-none">
                {activeWord.hieroglyphs}
              </span>
              <div className="text-sm font-mono font-bold text-amber-900">
                إعادة بناء النطق بالمصرية القديمة: {activeWord.arabicTransliteration} ({activeWord.transliteration})
              </div>

              {/* Dual-language individual pronunciation buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handlePlayWord(activeWord, { mode: 'egyptian', toggleIfActive: false })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    playingWordId === `dict-word-${activeWord.id}` && speechPhase === 'egyptian'
                      ? 'bg-amber-800 text-white border-amber-900 ring-2 ring-amber-400'
                      : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>بالمصرية القديمة: {activeWord.arabicTransliteration}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePlayWord(activeWord, { mode: 'arabic', toggleIfActive: false })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    playingWordId === `dict-word-${activeWord.id}` && speechPhase === 'arabic'
                      ? 'bg-amber-800 text-white border-amber-900 ring-2 ring-amber-400'
                      : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>بالعربية: {activeWord.arabicMeaning}</span>
                </button>
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
            <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700">
              <div className="flex items-center justify-between gap-2">
                <div className="font-bold text-stone-900">مثال من النصوص المصرية القديمة:</div>
                <button
                  type="button"
                  onClick={() => handlePlayExampleSentence(activeWord)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                    playingWordId === `dict-example-${activeWord.id}`
                      ? 'bg-amber-800 text-white border-amber-900'
                      : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{playingWordId === `dict-example-${activeWord.id}` ? 'إيقاف' : 'اسمع المثال'}</span>
                </button>
              </div>
              <div className="italic text-amber-900 font-serif-ar text-sm">{activeWord.exampleUsage}</div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-200 pt-3">
              <button
                type="button"
                onClick={() => handlePlayWord(activeWord, { mode: 'both', includeRootNote: true })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-colors ${
                  playingWordId === `dict-word-${activeWord.id}`
                    ? 'bg-rose-700 hover:bg-rose-600'
                    : 'bg-amber-800 hover:bg-amber-700'
                }`}
              >
                {playingWordId === `dict-word-${activeWord.id}` ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>إيقاف النطق الصوتي</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>استمع للنطق الكامل (مصرية قديمة + عربية)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  scribeAudio.stop();
                  setActiveWord(null);
                }}
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
