import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Edit3, 
  Sparkles, 
  Globe, 
  Play, 
  Square, 
  Music, 
  Languages, 
  Check, 
  Info,
  BookOpen
} from 'lucide-react';
import { UNILITERAL_HIEROGLYPHS } from '../../data/hieroglyphsData';
import { ALPHABET_SPEECH_DATA, SPEECH_LANGUAGES, SpeechLanguage } from '../../data/alphabetSpeechData';
import { HieroglyphSign } from '../../types';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';

interface KidsAlphabetGridProps {
  onSelectForDrawing: (sign: HieroglyphSign) => void;
}

export const KidsAlphabetGrid: React.FC<KidsAlphabetGridProps> = ({ onSelectForDrawing }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSign, setActiveSign] = useState<HieroglyphSign | null>(UNILITERAL_HIEROGLYPHS[0]);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<SpeechLanguage>('ar');
  const [isAutoPlayingAll, setIsAutoPlayingAll] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => {
      setActivePlayingId(id);
    });
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

  const categories = [
    { id: 'all', label: 'جميع الحروف (24)' },
    { id: 'birds', label: 'طيور محلقة 🦅' },
    { id: 'animals', label: 'حيوانات وكائنات 🦁' },
    { id: 'body', label: 'أجزاء الجسم 👁️' },
    { id: 'nature', label: 'نباتات وطبيعة النيل 🌾' },
    { id: 'tools', label: 'أدوات وبيوت 🏺' },
  ];

  const filteredSigns = selectedCategory === 'all'
    ? UNILITERAL_HIEROGLYPHS
    : UNILITERAL_HIEROGLYPHS.filter(s => s.category === selectedCategory);

  const handlePlayLetterSound = (sign: HieroglyphSign, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveSign(sign);

    if (activePlayingId === sign.id) {
      scribeAudio.stop();
      setIsAutoPlayingAll(false);
      return;
    }

    scribeAudio.speakSign(sign, {
      id: sign.id,
      mode: 'kids',
      lang: selectedLang
    });
  };

  const handlePlayWordSound = (sign: HieroglyphSign, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveSign(sign);
    const wordId = `word-${sign.id}`;

    if (activePlayingId === wordId) {
      scribeAudio.stop();
      return;
    }

    scribeAudio.speakSampleWord(sign.id, {
      id: wordId,
      lang: selectedLang,
      mode: 'kids'
    });
  };

  // Sequential audio tour for kids to hear all letters
  const handleToggleAutoPlayTour = () => {
    if (isAutoPlayingAll) {
      scribeAudio.stop();
      setIsAutoPlayingAll(false);
      return;
    }

    setIsAutoPlayingAll(true);
    playSequentialLetter(0);
  };

  const playSequentialLetter = (index: number) => {
    if (index >= filteredSigns.length) {
      setIsAutoPlayingAll(false);
      soundFX.playSuccessSound();
      return;
    }

    const sign = filteredSigns[index];
    setAutoPlayIndex(index);
    setActiveSign(sign);

    scribeAudio.speakSign(sign, {
      id: sign.id,
      mode: 'kids',
      lang: selectedLang,
      onEnd: () => {
        // Schedule next letter with pleasant pause
        setTimeout(() => {
          playSequentialLetter(index + 1);
        }, 500);
      },
      onError: () => {
        setIsAutoPlayingAll(false);
      }
    });
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Auditory Learning & Language Bar */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-stone-100 p-4 sm:p-5 rounded-3xl border border-amber-300/80 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-900 flex items-center gap-1.5 justify-start">
              <Languages className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>التعلم السمعي متعدد اللغات بتقنية Web Speech API</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg mt-0.5">
              جدول حروف الفراعنة الناطق للصغار
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-serif-ar">
              استمع إلى نطق الحروف والكلمات الهيروغليفية بأصوات واضحة باللغات العربية والإنجليزية والفرنسية!
            </p>
          </div>

          {/* Sequential Autoplay Button */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={handleToggleAutoPlayTour}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                isAutoPlayingAll
                  ? 'bg-rose-700 hover:bg-rose-800 text-white animate-pulse'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
              }`}
            >
              {isAutoPlayingAll ? (
                <>
                  <Square className="w-4 h-4 text-rose-200 fill-current" />
                  <span>إيقاف الجولة الصوتية ({autoPlayIndex + 1}/{filteredSigns.length})</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-amber-300 fill-current" />
                  <span>جولة نطق الحروف المتتابعة 🎵</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Multi-language Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-amber-200/60">
          <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5 ml-2">
            <Globe className="w-3.5 h-3.5 text-amber-800" />
            <span>لغة النطق الصوتي:</span>
          </span>

          {SPEECH_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setSelectedLang(lang.id);
                  scribeAudio.setPreferredLanguage(lang.id);
                  soundFX.playClickSound();
                  if (activeSign) {
                    scribeAudio.speakSign(activeSign, {
                      id: activeSign.id,
                      mode: 'kids',
                      lang: lang.id
                    });
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-900 text-white shadow-xs scale-102 ring-2 ring-amber-500/50'
                    : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.labelAr}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-300 mr-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filters Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-2xl max-w-full overflow-x-auto self-start">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              soundFX.playClickSound();
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-amber-800 text-white shadow-xs font-bold'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Cards with Audio Feedback */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSigns.map(sign => {
          const isLetterPlaying = activePlayingId === sign.id;
          const isWordPlaying = activePlayingId === `word-${sign.id}`;
          const isAnyPlaying = isLetterPlaying || isWordPlaying;
          const isSelected = activeSign?.id === sign.id;
          const speechData = ALPHABET_SPEECH_DATA[sign.id];

          return (
            <div
              key={sign.id}
              onClick={() => handlePlayLetterSound(sign)}
              className={`group relative p-4 rounded-2xl bg-white border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center select-none ${
                isAnyPlaying
                  ? 'border-amber-700 shadow-xl scale-105 bg-amber-50/90 ring-4 ring-amber-400/50'
                  : isSelected
                  ? 'border-amber-600 shadow-md bg-amber-50/40'
                  : 'border-[#EAE2D0] hover:border-amber-500 hover:shadow-md'
              }`}
            >
              {/* Top Arabic Letter Badge + Status */}
              <div className="w-full flex items-center justify-between mb-1">
                <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm border transition-all ${
                  isAnyPlaying
                    ? 'bg-amber-800 text-white border-amber-900 animate-bounce'
                    : 'bg-amber-100 text-amber-900 border-amber-200'
                }`}>
                  {sign.arabicLetter}
                </div>

                <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                  {sign.gardiner}
                </span>
              </div>

              {/* Big Hieroglyphic Glyph */}
              <div className="text-6xl my-2 text-stone-900 font-hieroglyphs transition-transform group-hover:scale-110 duration-200 select-none">
                {sign.char}
              </div>

              {/* Sign Meaning & Rhyme */}
              <div className="space-y-1 w-full">
                <div className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                  {sign.meaningAr}
                </div>
                <div className="text-[11px] text-amber-800 font-serif-ar leading-tight line-clamp-2 min-h-[28px]">
                  {sign.kidMnemonicAr}
                </div>
              </div>

              {/* Egyptian Sample Word Badge */}
              {speechData && (
                <div className="mt-2 w-full p-2 rounded-xl bg-stone-50 border border-stone-200/70 text-right space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-stone-500">
                    <span>كلمة هيروغليفية:</span>
                    <span className="font-hieroglyphs text-stone-900 text-sm">
                      {speechData.sampleWord.hieroglyphs}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-900">
                      {speechData.sampleWord.readingAr}
                    </span>
                    <span className="text-stone-500 text-[10px] truncate max-w-[80px]">
                      {speechData.sampleWord.meaningAr}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Action Buttons (Dual Speech & Draw) */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 w-full flex items-center justify-center gap-1.5">
                {/* Pronounce Letter Button */}
                <button
                  type="button"
                  onClick={(e) => handlePlayLetterSound(sign, e)}
                  className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 text-[11px] font-bold ${
                    isLetterPlaying
                      ? 'bg-amber-800 text-white shadow-xs ring-2 ring-amber-500'
                      : 'bg-amber-100/80 hover:bg-amber-200 text-amber-900'
                  }`}
                  title="استمع لنطق الحرف باللغة المختارة"
                >
                  {isLetterPlaying ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>إيقاف</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>الحرف</span>
                    </>
                  )}
                </button>

                {/* Pronounce Egyptian Word Button */}
                {speechData && (
                  <button
                    type="button"
                    onClick={(e) => handlePlayWordSound(sign, e)}
                    className={`py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 text-[11px] font-bold ${
                      isWordPlaying
                        ? 'bg-emerald-800 text-white shadow-xs ring-2 ring-emerald-500'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}
                    title="استمع لنطق الكلمة المصرية القديمة"
                  >
                    <span>𓋹</span>
                    <span>الكلمة</span>
                  </button>
                )}

                {/* Draw Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectForDrawing(sign);
                    soundFX.playClickSound();
                  }}
                  className="p-1.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                  title="ارسم هذا الحرف بالفرشاة"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Active Card Spotlight Drawer */}
      {activeSign && (
        <div className="p-5 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 text-right animate-fadeIn">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-hieroglyphs text-amber-900 bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-inner">
              {activeSign.char}
            </span>
            <div className="space-y-1">
              <div className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>حرف ({activeSign.arabicLetter}) بالمصرية: {activeSign.meaningAr}</span>
                <span className="text-xs font-mono text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
                  جاردنر: {activeSign.gardiner}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {activeSign.transliteration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed max-w-xl">
                💡 <strong className="text-amber-900">سر الرسم للصغار:</strong> {activeSign.kidFunFact}
              </p>
              {ALPHABET_SPEECH_DATA[activeSign.id] && (
                <div className="text-xs text-stone-600 font-serif-ar">
                  كلمة فرعونية تبدأ به: <strong className="text-emerald-900">{ALPHABET_SPEECH_DATA[activeSign.id].sampleWord.readingAr}</strong> ({ALPHABET_SPEECH_DATA[activeSign.id].sampleWord.meaningAr})
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={() => handlePlayLetterSound(activeSign)}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold transition-colors border border-amber-300"
            >
              <Volume2 className="w-4 h-4 text-amber-800" />
              <span>نطق الحرف ({selectedLang.toUpperCase()})</span>
            </button>

            {ALPHABET_SPEECH_DATA[activeSign.id] && (
              <button
                onClick={() => handlePlayWordSound(activeSign)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl text-xs font-bold transition-colors border border-emerald-300"
              >
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>نطق الكلمة ({ALPHABET_SPEECH_DATA[activeSign.id].sampleWord.readingAr})</span>
              </button>
            )}

            <button
              onClick={() => onSelectForDrawing(activeSign)}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold whitespace-nowrap transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>تدرب على رسمه</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
