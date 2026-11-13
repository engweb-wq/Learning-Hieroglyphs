import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  Filter, 
  Info, 
  BookOpen, 
  Sparkles, 
  Globe, 
  Gauge, 
  Languages, 
  Check, 
  Play, 
  Square 
} from 'lucide-react';
import { UNILITERAL_HIEROGLYPHS, MULTI_LITERAL_SIGNS, DETERMINATIVES_LIST } from '../../data/hieroglyphsData';
import { ALPHABET_SPEECH_DATA, SPEECH_LANGUAGES, SpeechLanguage } from '../../data/alphabetSpeechData';
import { HieroglyphSign } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

export const AdultsAlphabetTable: React.FC = () => {
  const [tab, setTab] = useState<'uniliteral' | 'multiliteral' | 'determinatives'>('uniliteral');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSign, setSelectedSign] = useState<HieroglyphSign | null>(UNILITERAL_HIEROGLYPHS[0]);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<SpeechLanguage>('ar');
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Subscribe to audio state
  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => {
      setActivePlayingId(id);
    });
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

  const filteredUniliterals = UNILITERAL_HIEROGLYPHS.filter(s => {
    const q = searchTerm.trim().toLowerCase();
    const speech = ALPHABET_SPEECH_DATA[s.id];
    return !q || 
      s.arabicLetter.includes(q) ||
      s.arabicSound.toLowerCase().includes(q) ||
      s.gardiner.toLowerCase().includes(q) ||
      s.transliteration.toLowerCase().includes(q) ||
      s.meaningAr.toLowerCase().includes(q) ||
      (speech && (
        speech.sampleWord.readingAr.toLowerCase().includes(q) ||
        speech.sampleWord.meaningAr.toLowerCase().includes(q) ||
        speech.sampleWord.transliteration.toLowerCase().includes(q)
      ));
  });

  const handlePlaySignSound = (sign: HieroglyphSign, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedSign(sign);

    if (activePlayingId === sign.id) {
      scribeAudio.stop();
      return;
    }

    scribeAudio.speakSign(sign, {
      id: sign.id,
      mode: 'adults',
      lang: selectedLang,
      rate: speechRate
    });
  };

  const handlePlayWordSound = (signId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const wordId = `word-${signId}`;

    if (activePlayingId === wordId) {
      scribeAudio.stop();
      return;
    }

    scribeAudio.speakSampleWord(signId, {
      id: wordId,
      lang: selectedLang,
      mode: 'adults',
      rate: speechRate
    });
  };

  const handlePlayMultiLiteral = (sign: { id: string; arabicSound: string; meaningAr: string; transliteration: string; char: string; gardiner: string }) => {
    if (activePlayingId === sign.id) {
      scribeAudio.stop();
      return;
    }

    soundFX.playAncientChime(560);
    let speechText = '';
    if (selectedLang === 'en') {
      speechText = `Hieroglyphic sign ${sign.gardiner}, sound ${sign.transliteration}, meaning: ${sign.arabicSound}.`;
    } else if (selectedLang === 'fr') {
      speechText = `Signe hiéroglyphique ${sign.gardiner}, translittération ${sign.transliteration}, valeur: ${sign.arabicSound}.`;
    } else {
      speechText = `الرمز الهيروغليفي ${sign.arabicSound}.. كود جاردنر ${sign.gardiner}.. تفريغه الصوتي: ${sign.transliteration}.. ويعني: ${sign.meaningAr}`;
    }

    scribeAudio.speakText(speechText, {
      id: sign.id,
      lang: selectedLang,
      rate: speechRate
    });
  };

  const handlePlayDeterminative = (det: { gardiner: string; meaningAr: string; char: string; exampleAr?: string }, index: number) => {
    const id = `det-${index}`;
    if (activePlayingId === id) {
      scribeAudio.stop();
      return;
    }

    soundFX.playAncientChime(490);
    let speechText = '';
    if (selectedLang === 'en') {
      speechText = `Determinative ${det.gardiner}, silent classifier indicating: ${det.meaningAr}.`;
    } else if (selectedLang === 'fr') {
      speechText = `Déterminatif ${det.gardiner}, classificateur sémantique indiquant: ${det.meaningAr}.`;
    } else {
      speechText = `المخصص الدلالي كود جاردنر ${det.gardiner}.. دلالته: ${det.meaningAr}.. وهو رمز صامت يوضع في نهاية الكلمات لتحديد المعنى الدقيق`;
    }

    scribeAudio.speakText(speechText, {
      id,
      lang: selectedLang,
      rate: speechRate
    });
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-start">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>الأكاديمية العلمية للغة المصرية القديمة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
            معجم الرموز والأبجدية مع النطق الصوتي متعدد اللغات
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-serif-ar">
            نظام صوتي متكامل مدعوم بـ Web Speech API لنطق الحروف والكلمات الهيروغليفية بالعربية والإنجليزية والفرنسية، بالإضافة إلى النطق الفونيتيكي الأكوستيكي.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-2xl border border-stone-300 self-start sm:self-auto max-w-full overflow-x-auto">
          <button
            onClick={() => {
              setTab('uniliteral');
              soundFX.playClickSound();
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              tab === 'uniliteral' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            الأبجدية الأحادية (24 حرفاً)
          </button>
          <button
            onClick={() => {
              setTab('multiliteral');
              soundFX.playClickSound();
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              tab === 'multiliteral' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            رموز ثنائية وثلاثية
          </button>
          <button
            onClick={() => {
              setTab('determinatives');
              soundFX.playClickSound();
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              tab === 'determinatives' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            المخصصات الدلالية
          </button>
        </div>
      </div>

      {/* Auditory Controls & Multi-Language Settings Bar */}
      <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Language Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5 ml-2">
              <Globe className="w-4 h-4 text-amber-800" />
              <span>لغة التعلم الصوتي:</span>
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
                    if (selectedSign) {
                      scribeAudio.speakSign(selectedSign, {
                        id: selectedSign.id,
                        mode: 'adults',
                        lang: lang.id,
                        rate: speechRate
                      });
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.labelAr}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                </button>
              );
            })}
          </div>

          {/* Speech Speed Controller */}
          <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-200 w-full lg:w-auto justify-end">
            <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-amber-700" />
              <span>سرعة الإلقاء:</span>
            </span>
            {[
              { rate: 0.8, label: '0.8x متأنٍ' },
              { rate: 0.95, label: '1.0x عادي' },
              { rate: 1.15, label: '1.2x سريع' },
            ].map(item => (
              <button
                key={item.rate}
                onClick={() => {
                  setSpeechRate(item.rate);
                  soundFX.playClickSound();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  Math.abs(speechRate - item.rate) < 0.05
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1: Uniliterals Table */}
      {tab === 'uniliteral' && (
        <div className="space-y-4">
          
          {/* Search bar & Live audio status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالحرف (ب، م، أ...)، كود جاردنر (G1, M17...)، الكلمة النموذجية، أو المعنى..."
                className="w-full pr-9 pl-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700 text-right text-stone-800"
              />
            </div>

            {activePlayingId && (
              <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl border border-amber-300 text-xs font-bold self-start sm:self-auto animate-pulse">
                <Volume2 className="w-4 h-4 text-amber-800" />
                <span>جاري تشغيل النطق الصوتي ({selectedLang.toUpperCase()})...</span>
                <button
                  onClick={() => scribeAudio.stop()}
                  className="mr-2 text-xs text-amber-950 underline hover:text-red-700 font-bold"
                >
                  إيقاف
                </button>
              </div>
            )}
          </div>

          {/* Academic Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
            <table className="w-full text-right text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                  <th className="p-3.5 whitespace-nowrap">الرمز</th>
                  <th className="p-3.5 whitespace-nowrap">جاردنر</th>
                  <th className="p-3.5 whitespace-nowrap">المقابل العربي</th>
                  <th className="p-3.5 whitespace-nowrap font-mono">النقحرة</th>
                  <th className="p-3.5 whitespace-nowrap">ما يمثله الرمز</th>
                  <th className="p-3.5 whitespace-nowrap">كلمة فرعونية تطبيقية 𓋹</th>
                  <th className="p-3.5 whitespace-nowrap">الوصف الأكاديمي</th>
                  <th className="p-3.5 whitespace-nowrap text-center">الاستماع الصوتي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUniliterals.map((sign) => {
                  const isLetterPlaying = activePlayingId === sign.id;
                  const isWordPlaying = activePlayingId === `word-${sign.id}`;
                  const isAnyPlaying = isLetterPlaying || isWordPlaying;
                  const isSelected = selectedSign?.id === sign.id;
                  const speechData = ALPHABET_SPEECH_DATA[sign.id];

                  return (
                    <tr
                      key={sign.id}
                      onClick={() => handlePlaySignSound(sign)}
                      className={`hover:bg-amber-50/70 transition-all cursor-pointer group ${
                        isAnyPlaying 
                          ? 'bg-amber-100/70 ring-2 ring-inset ring-amber-500' 
                          : isSelected 
                          ? 'bg-amber-50/50' 
                          : ''
                      }`}
                      title="اضغط على الصف لسماع النطق الصوتي"
                    >
                      {/* Hieroglyphic Glyph */}
                      <td className="p-3.5 text-3xl font-hieroglyphs text-stone-900 select-none group-hover:scale-115 transition-transform">
                        {sign.char}
                      </td>

                      {/* Gardiner Code */}
                      <td className="p-3.5 font-mono font-bold text-amber-900 text-xs">
                        {sign.gardiner}
                      </td>

                      {/* Arabic Letter & Sound */}
                      <td className="p-3.5 font-bold text-stone-900">
                        {sign.arabicLetter} ({sign.arabicSound})
                      </td>

                      {/* Transliteration */}
                      <td className="p-3.5 font-mono text-stone-700 font-semibold" dir="ltr">
                        {sign.transliteration}
                      </td>

                      {/* Sign Meaning */}
                      <td className="p-3.5 text-stone-800 font-medium">
                        {sign.meaningAr}
                      </td>

                      {/* Sample Word Column */}
                      <td className="p-3.5">
                        {speechData ? (
                          <div className="flex items-center gap-2">
                            <span className="font-hieroglyphs text-lg text-stone-900 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                              {speechData.sampleWord.hieroglyphs}
                            </span>
                            <div className="text-[11px] leading-tight">
                              <span className="font-bold text-amber-950 block">
                                {speechData.sampleWord.readingAr}
                              </span>
                              <span className="text-stone-500 text-[10px]">
                                {speechData.sampleWord.meaningAr}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => handlePlayWordSound(sign.id, e)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isWordPlaying
                                  ? 'bg-emerald-800 text-white shadow-xs'
                                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                              title="استمع لنطق الكلمة المصرية القديمة"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-stone-400 text-xs">-</span>
                        )}
                      </td>

                      {/* Scientific Linguistic Note */}
                      <td className="p-3.5 text-stone-600 text-xs max-w-xs leading-relaxed font-serif-ar">
                        {sign.detailsAdultAr}
                      </td>

                      {/* Dual Speech Buttons (Letter & Word) */}
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handlePlaySignSound(sign, e)}
                            className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                              isLetterPlaying
                                ? 'bg-amber-800 text-white shadow-xs ring-2 ring-amber-500 scale-105'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                            }`}
                            title={isLetterPlaying ? 'إيقاف الصوت' : 'استمع لنطق الحرف باللغة المحددة'}
                          >
                            {isLetterPlaying ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                                <span className="text-[11px]">إيقاف</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                                <span className="text-[11px]">نطق الحرف</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Sign Detailed Spotlight Drawer */}
          {selectedSign && (
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-hieroglyphs text-amber-900 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 shadow-inner">
                    {selectedSign.char}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-stone-900">
                        حرف {selectedSign.arabicLetter} ({selectedSign.arabicSound})
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        كود جاردنر: {selectedSign.gardiner}
                      </span>
                      <span className="text-xs font-mono text-stone-600">
                        النقحرة: {selectedSign.transliteration}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1 font-serif-ar">
                      ما يمثله الرمز أثرياً: <strong className="text-stone-800">{selectedSign.meaningAr}</strong> ({selectedSign.meaningEn})
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
                  <button
                    onClick={() => handlePlaySignSound(selectedSign)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    <Volume2 className="w-4 h-4 text-amber-200" />
                    <span>نطق الحرف بالعلمية ({selectedLang.toUpperCase()})</span>
                  </button>

                  {ALPHABET_SPEECH_DATA[selectedSign.id] && (
                    <button
                      onClick={() => handlePlayWordSound(selectedSign.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-200" />
                      <span>نطق الكلمة: {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.readingAr}</span>
                    </button>
                  )}
                </div>
              </div>

              {ALPHABET_SPEECH_DATA[selectedSign.id] && (
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="font-bold text-stone-600 block mb-0.5">الكلمة الهيروغليفية والشاهد:</span>
                    <span className="font-hieroglyphs text-lg text-amber-950">
                      {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.hieroglyphs}
                    </span>
                    <div className="text-stone-500 text-[11px] font-serif-ar mt-0.5">
                      {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.sourceContextAr}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-stone-600 block mb-0.5">النطق والمعنى بالعربية:</span>
                    <span className="font-bold text-emerald-900">
                      {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.readingAr}
                    </span>
                    <span className="text-stone-600 mr-2">
                      = {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.meaningAr}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-stone-600 block mb-0.5">English & French:</span>
                    <div className="text-stone-700 text-[11px] font-mono">
                      EN: {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.readingEn} ({ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.meaningEn})
                    </div>
                    <div className="text-stone-700 text-[11px] font-mono">
                      FR: {ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.readingFr} ({ALPHABET_SPEECH_DATA[selectedSign.id].sampleWord.meaningFr})
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Educational Note */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-stone-700 font-serif-ar leading-relaxed flex items-center justify-between">
            <div>
              💡 <strong className="text-amber-900">ملاحظة علمية للصوتيات:</strong> الأبجدية المصرية القديمة هي أبجدية صامتة (Abjad)، تشتمل على 24 صامتاً أساسياً، منها أصوات حلقية مطابقة للعربية كالعين (𓂝) والحاء (𓎛) والخاء (𓐍)، وأصوات شبه علة تقابل الألف والياء والواو. تدعم المنصة محاكاة نطق الحروف والكلمات بلغات متعددة عبر Web Speech API لتثبيت الذاكرة السمعية.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Multiliterals */}
      {tab === 'multiliteral' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MULTI_LITERAL_SIGNS.map(sign => {
            const isPlaying = activePlayingId === sign.id;
            return (
              <div
                key={sign.id}
                onClick={() => handlePlayMultiLiteral(sign)}
                className={`p-5 rounded-2xl bg-white border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isPlaying
                    ? 'border-amber-700 shadow-md bg-amber-50/60 ring-2 ring-amber-400'
                    : 'border-stone-200 hover:border-amber-600 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                    <span className="text-[11px] font-bold text-amber-800 uppercase">
                      {sign.type === 'triliteral' ? 'علامة ثلاثية الصوت' : 'علامة ثنائية الصوت'}
                    </span>
                    <span className="font-mono text-xs text-stone-500">[{sign.gardiner}]</span>
                  </div>

                  <div className="text-center my-3">
                    <span className="text-6xl font-hieroglyphs text-stone-900 select-none inline-block">
                      {sign.char}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-bold text-stone-900">
                      {sign.arabicSound} ({sign.transliteration})
                    </div>
                    <div className="text-xs text-amber-900 font-bold">
                      المعنى: {sign.meaningAr}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 font-serif-ar leading-relaxed">
                    {sign.explanationAr}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayMultiLiteral(sign);
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
                      isPlaying ? 'bg-amber-800 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'جاري النطق...' : `استمع (${selectedLang.toUpperCase()})`}</span>
                  </button>

                  <span className="text-[11px] text-stone-400 font-mono">
                    {sign.usageExample.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Determinatives */}
      {tab === 'determinatives' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-serif-ar">
            <strong className="text-amber-900">ما هي المخصصات الدلالية (Determinatives)؟</strong>
            <p className="mt-1">
              علامات صامتة لا تُنطق، يضعها الكاتب في نهاية الكلمة لتحديد تصنيفها الدلالي بدقة. اضغط على أي بطاقة لسماع الشرح الصوتي الخاص بها باللغة المختارة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {DETERMINATIVES_LIST.map((det, i) => {
              const detId = `det-${i}`;
              const isPlaying = activePlayingId === detId;
              return (
                <div 
                  key={i} 
                  onClick={() => handlePlayDeterminative(det, i)}
                  className={`p-4 rounded-2xl bg-white border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    isPlaying ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-400' : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
                      <span>{det.gardiner}</span>
                      <span>مخصص دلالي</span>
                    </div>
                    <div className="text-5xl font-hieroglyphs text-stone-900 text-center my-2 select-none">
                      {det.char}
                    </div>
                    <div className="text-sm font-bold text-stone-900 text-center mt-2">
                      {det.meaningAr}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                    <span className="text-[11px] font-serif-ar">{det.exampleAr}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayDeterminative(det, i);
                      }}
                      className="p-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                      title="استمع للشرح الصوتي"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
