import React, { useState, useEffect } from 'react';
import {
  Scale,
  Sparkles,
  Volume2,
  VolumeX,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  Trophy,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Layers,
  HelpCircle,
  Eye,
  RotateCcw
} from 'lucide-react';
import { EGYPTIAN_ANTONYM_PAIRS } from '../../data/antonymsData';
import { AntonymPair, HieroglyphAntonymWord } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';
import confetti from 'canvas-confetti';

export const EgyptianAntonymsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSentenceId, setExpandedSentenceId] = useState<string | null>(EGYPTIAN_ANTONYM_PAIRS[0].id);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => setActivePlayingId(id));
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

  // Mini quiz game state
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswerFeedback, setQuizAnswerFeedback] = useState<{ isCorrect: boolean; selectedWord: string } | null>(null);

  const categories = [
    { id: 'all', nameAr: 'جميع المتضادات' },
    { id: 'cosmic', nameAr: 'الكون والطبيعة' },
    { id: 'moral', nameAr: 'الأخلاق والنظام' },
    { id: 'life_death', nameAr: 'الحياة والوجود' },
    { id: 'physical', nameAr: 'الأحجام والأوصاف' },
    { id: 'actions', nameAr: 'الأفعال والحركة' },
    { id: 'state', nameAr: 'القوة والترتيب' },
  ];

  const filteredPairs = EGYPTIAN_ANTONYM_PAIRS.filter((pair) => {
    const matchesCat = selectedCategory === 'all' || pair.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      pair.themeAr.toLowerCase().includes(q) ||
      pair.wordA.arabicMeaning.toLowerCase().includes(q) ||
      pair.wordB.arabicMeaning.toLowerCase().includes(q) ||
      pair.wordA.transliteration.toLowerCase().includes(q) ||
      pair.wordB.transliteration.toLowerCase().includes(q) ||
      pair.exampleSentence.arabicTranslation.toLowerCase().includes(q);

    return matchesCat && matchesQuery;
  });

  const handlePlayWordSound = (word: HieroglyphAntonymWord, uniqueId: string) => {
    if (activePlayingId === uniqueId) {
      scribeAudio.stop();
      setActivePlayingId(null);
      return;
    }
    setActivePlayingId(uniqueId);
    soundFX.playAncientChime(560);
    scribeAudio.speakText(word.pronunciationSound, {
      id: uniqueId,
      onEnd: () => setActivePlayingId(null),
      onError: () => setActivePlayingId(null),
    });
  };

  const handlePlaySentenceSound = (pair: AntonymPair) => {
    const sId = `sent_${pair.id}`;
    if (activePlayingId === sId) {
      scribeAudio.stop();
      setActivePlayingId(null);
      return;
    }
    setActivePlayingId(sId);
    soundFX.playAncientChime(620);
    const textToSpeak = `الجملة المصرية: ${pair.exampleSentence.arabicPhonetics}.. ومعناها: ${pair.exampleSentence.arabicTranslation}`;
    scribeAudio.speakText(textToSpeak, {
      id: sId,
      onEnd: () => setActivePlayingId(null),
      onError: () => setActivePlayingId(null),
    });
  };

  // Quiz game handlers
  const currentQuizPair = EGYPTIAN_ANTONYM_PAIRS[quizQuestionIndex % EGYPTIAN_ANTONYM_PAIRS.length];
  // Generate 3 random choices: 1 correct opposite, 2 wrong opposites
  const quizOptions = React.useMemo(() => {
    const correct = currentQuizPair.wordB;
    const wrongs = EGYPTIAN_ANTONYM_PAIRS.filter((p) => p.id !== currentQuizPair.id).map((p) => p.wordB);
    const shuffledWrongs = [...wrongs].sort(() => 0.5 - Math.random()).slice(0, 2);
    return [correct, ...shuffledWrongs].sort(() => 0.5 - Math.random());
  }, [quizQuestionIndex]);

  const handleQuizAnswer = (chosenWord: HieroglyphAntonymWord) => {
    if (quizAnswerFeedback) return;
    const isCorrect = chosenWord.transliteration === currentQuizPair.wordB.transliteration;
    setQuizAnswerFeedback({ isCorrect, selectedWord: chosenWord.arabicMeaning });

    if (isCorrect) {
      soundFX.playSuccessSound();
      setQuizScore((prev) => prev + 1);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#16a34a', '#9333ea'],
      });
      studentProgress.addPoints(20, `إجابة صحيحة في تحدي متضادات اللغة المصرية: ${currentQuizPair.themeAr}`, 'القاموس اللغوي');
    } else {
      soundFX.playClickSound();
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizAnswerFeedback(null);
    setQuizQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-10" dir="rtl">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-[#FAF4E6] via-white to-amber-50/70 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <Scale className="w-4 h-4 text-amber-700" />
              <span>فلسفة التوازن والثنائيات الكونية (Duality & Opposites)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg tracking-tight">
              معجم المتضادات في اللغة المصرية القديمة
            </h2>

            <p className="text-sm sm:text-base text-stone-700 font-serif-ar leading-relaxed">
              آمن المصري القديم بأن الكون قائم على ثنائيات متكاملة ومتناقضة: لا يُعرَف النور إلا بوجود الظلام، ولا تكتمل العدالة (ماعت) إلا بدحر الباطل (إسفت). استكشف أشهر الكلمات المتضادة مع طريقة كتابتها ونطقها الصوتي وتوظيفها العملي في الجمل الأدبية والطقسية البسيطة.
            </p>
          </div>

          {/* Interactive Challenge Launcher Button */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsQuizMode(!isQuizMode);
                soundFX.playClickSound();
              }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition-all ${
                isQuizMode
                  ? 'bg-amber-900 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white hover:shadow-md'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>{isQuizMode ? 'العودة لتصفح المعجم 📜' : 'بدء تحدي المتضادات 🎯'}</span>
            </button>
            <div className="text-[11px] text-stone-500 text-center">
              12 ثنائية محققة أكاديمياً مع شواهد نحوية
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        {!isQuizMode && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 border-t border-[#E8DFC9]">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن متضاد (نور، موت، خير، حق، سماء، صعود...)"
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 text-right font-serif-ar shadow-2xs"
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

            {/* Category Filter Chips */}
            <div className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    soundFX.playClickSound();
                  }}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {cat.nameAr}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Quiz Mini-Game Mode */}
      {isQuizMode && (
        <div className="bg-white rounded-3xl border-2 border-amber-500/70 p-6 sm:p-10 shadow-md space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                اختبار معرفة المتضادات الفرعونية
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
                ما هو المتضاد الهيروغليفي الصحيح؟
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-300">
              <Trophy className="w-4 h-4 text-amber-700" />
              <span className="text-xs text-stone-700">النقاط:</span>
              <span className="font-mono font-bold text-amber-950">{quizScore * 20}</span>
            </div>
          </div>

          {/* Current Question Display */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Target Word to Oppose */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-[#F5EEDB] border border-[#E8DFC9] text-center space-y-3">
              <span className="text-xs font-bold text-amber-900">الكلمة المعروضة:</span>
              <div className="text-5xl font-hieroglyphs text-amber-950 py-2">
                {currentQuizPair.wordA.hieroglyphs}
              </div>
              <div className="space-y-0.5">
                <div className="text-lg font-bold text-stone-900">
                  {currentQuizPair.wordA.arabicMeaning}
                </div>
                <div className="text-xs font-serif italic text-amber-800">
                  {currentQuizPair.wordA.arabicTransliteration} ({currentQuizPair.wordA.transliteration})
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="md:col-span-2 flex justify-center text-amber-800">
              <ArrowRightLeft className="w-8 h-8 rotate-90 md:rotate-0" />
            </div>

            {/* Answer Options */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs font-bold text-stone-700 block">
                اختر الرمز المتضاد والمناقض لها في المعنى:
              </span>
              <div className="space-y-2">
                {quizOptions.map((opt) => {
                  const isSelected = quizAnswerFeedback?.selectedWord === opt.arabicMeaning;
                  const isRealCorrect = opt.transliteration === currentQuizPair.wordB.transliteration;

                  let btnStyle = 'bg-stone-50 hover:bg-amber-50 border-stone-200 text-stone-900';
                  if (quizAnswerFeedback) {
                    if (isRealCorrect) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                    } else {
                      btnStyle = 'bg-stone-100 text-stone-400 opacity-60 border-stone-200';
                    }
                  }

                  return (
                    <button
                      key={opt.transliteration}
                      onClick={() => handleQuizAnswer(opt)}
                      disabled={!!quizAnswerFeedback}
                      className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-hieroglyphs text-amber-950">
                          {opt.hieroglyphs}
                        </span>
                        <div>
                          <div className="text-sm font-bold">{opt.arabicMeaning}</div>
                          <div className="text-xs font-serif text-stone-500 italic">
                            {opt.arabicTransliteration} ({opt.transliteration})
                          </div>
                        </div>
                      </div>

                      {quizAnswerFeedback && isRealCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert and Next Question */}
              {quizAnswerFeedback && (
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs font-bold">
                    {quizAnswerFeedback.isCorrect ? (
                      <span className="text-emerald-700">إجابة ممتازة! ربحت +20 نقطة كاتب 🎉</span>
                    ) : (
                      <span className="text-rose-700">إجابة غير صحيحة، حاول التركيز أكثر!</span>
                    )}
                  </div>
                  <button
                    onClick={handleNextQuizQuestion}
                    className="bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
                  >
                    السؤال التالي ⬅️
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Antonyms Pairs List */}
      {!isQuizMode && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 px-1">
            <span>
              عرض {filteredPairs.length} من أصل {EGYPTIAN_ANTONYM_PAIRS.length} ثنائية متضادة:
            </span>
            <span className="text-amber-800 font-bold">
              انقر على أي رمز لسماع نطقه، أو انقر على «الجملة التوظيفية» لرؤية التركيب النحوي
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPairs.map((pair) => {
              const isExpanded = expandedSentenceId === pair.id;

              return (
                <div
                  key={pair.id}
                  className="bg-white rounded-3xl border border-[#E8DFC9] p-5 sm:p-7 shadow-xs hover:border-amber-400 transition-all space-y-6"
                >
                  {/* Pair Title & Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                        {pair.categoryAr}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display-eg flex items-center gap-2">
                        <span>{pair.themeAr}</span>
                        <span className="text-xs text-stone-500 font-normal">({pair.themeEn})</span>
                      </h3>
                    </div>

                    <div className="text-xs text-stone-500 font-mono bg-stone-100 px-2.5 py-1 rounded-lg">
                      ثنائية تقابلية
                    </div>
                  </div>

                  {/* Dual Word Cards Contrast Stage */}
                  <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                    
                    {/* Word A Card (Golden Light Aspect) - 5 cols */}
                    <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF5E8] border border-amber-300/80 shadow-2xs space-y-3 relative group">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                          الطرف الأول
                        </span>
                        <button
                          onClick={() => handlePlayWordSound(pair.wordA, `${pair.id}_A`)}
                          className="flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                          title="استمع للنطق الصوتي"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>نطق الكلمة</span>
                        </button>
                      </div>

                      {/* Giant Hieroglyphs Display */}
                      <div className="text-center py-2">
                        <div className="text-5xl font-hieroglyphs text-stone-950 group-hover:scale-105 transition-transform inline-block">
                          {pair.wordA.hieroglyphs}
                        </div>
                      </div>

                      {/* Transliteration & Meaning */}
                      <div className="text-center space-y-1">
                        <div className="text-xs font-mono font-bold text-amber-900">
                          {pair.wordA.arabicTransliteration}
                          <span className="font-serif italic font-normal text-stone-500 mr-1.5">
                            ({pair.wordA.transliteration})
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-stone-900 font-serif-ar">
                          {pair.wordA.arabicMeaning}
                        </div>
                        <div className="text-xs text-stone-500 italic">
                          {pair.wordA.englishMeaning}
                        </div>
                      </div>

                      {/* Gardiner Codes Pill Row */}
                      <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                        <span className="text-[10px] text-amber-900 font-bold">أكواد جاردنر:</span>
                        <div className="flex flex-wrap gap-1">
                          {pair.wordA.gardinerCodes.map((code) => (
                            <span
                              key={code}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle Opposing Badge - 1 col */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center my-1 md:my-0">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold text-xs shadow-xs">
                        <ArrowRightLeft className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 font-semibold">ضد</span>
                    </div>

                    {/* Word B Card (Dark Shadow Aspect) - 5 cols */}
                    <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#FBFBFA] to-[#F3EFE6] border border-stone-300 shadow-2xs space-y-3 relative group">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-stone-700 bg-stone-200/80 px-2.5 py-0.5 rounded-full border border-stone-300">
                          الطرف المتضاد
                        </span>
                        <button
                          onClick={() => handlePlayWordSound(pair.wordB, `${pair.id}_B`)}
                          className="flex items-center gap-1 text-xs font-bold text-stone-800 hover:text-stone-950 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-stone-200 transition-colors"
                          title="استمع للنطق الصوتي"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-stone-700" />
                          <span>نطق الكلمة</span>
                        </button>
                      </div>

                      {/* Giant Hieroglyphs Display */}
                      <div className="text-center py-2">
                        <div className="text-5xl font-hieroglyphs text-stone-950 group-hover:scale-105 transition-transform inline-block">
                          {pair.wordB.hieroglyphs}
                        </div>
                      </div>

                      {/* Transliteration & Meaning */}
                      <div className="text-center space-y-1">
                        <div className="text-xs font-mono font-bold text-stone-800">
                          {pair.wordB.arabicTransliteration}
                          <span className="font-serif italic font-normal text-stone-500 mr-1.5">
                            ({pair.wordB.transliteration})
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-stone-900 font-serif-ar">
                          {pair.wordB.arabicMeaning}
                        </div>
                        <div className="text-xs text-stone-500 italic">
                          {pair.wordB.englishMeaning}
                        </div>
                      </div>

                      {/* Gardiner Codes Pill Row */}
                      <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                        <span className="text-[10px] text-stone-700 font-bold">أكواد جاردنر:</span>
                        <div className="flex flex-wrap gap-1">
                          {pair.wordB.gardinerCodes.map((code) => (
                            <span
                              key={code}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-900 border border-stone-300"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Philosophical Ancient Duality Insight */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700 leading-relaxed font-serif-ar">
                    <strong className="text-amber-900">البعد الفلسفي والتاريخي:</strong> {pair.philosophicalInsightAr}
                  </div>

                  {/* Toggle Button for Example Sentence */}
                  <div>
                    <button
                      onClick={() => setExpandedSentenceId(isExpanded ? null : pair.id)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F5EEDB] hover:bg-[#EFE6CE] transition-colors text-xs font-bold text-amber-950"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-800" />
                        <span>توظيف المتضادات في جملة مصرية قديمة نموذجية</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-amber-800" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-amber-800" />
                      )}
                    </button>

                    {/* Sentence Accordion Details */}
                    {isExpanded && (
                      <div className="mt-3 p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-4 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                          <span className="text-xs font-bold text-amber-900">
                            الشاهد الأدبي والنحوي (Contextual Sentence):
                          </span>

                          <button
                            onClick={() => handlePlaySentenceSound(pair)}
                            className="flex items-center gap-1.5 text-xs font-bold text-white bg-amber-900 hover:bg-amber-800 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                            <span>استمع للجملة كاملة بالصوت 🔊</span>
                          </button>
                        </div>

                        {/* Large Hieroglyphic Sentence Unicode */}
                        <div className="text-3xl sm:text-4xl font-hieroglyphs text-amber-950 text-center py-2 tracking-widest overflow-x-auto">
                          {pair.exampleSentence.hieroglyphs}
                        </div>

                        {/* Phonetics & Scientific Transliteration */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-stone-200">
                          <div>
                            <span className="text-stone-400 text-[11px] block">النقحرة الصوتية اللاتينية:</span>
                            <span className="font-serif italic font-bold text-amber-900 text-sm">
                              {pair.exampleSentence.transliteration}
                            </span>
                          </div>

                          <div>
                            <span className="text-stone-400 text-[11px] block">النطق الصوتي بالعربية:</span>
                            <span className="font-bold text-stone-900 text-sm">
                              {pair.exampleSentence.arabicPhonetics}
                            </span>
                          </div>
                        </div>

                        {/* Sentence Translation */}
                        <div className="space-y-1">
                          <span className="text-xs text-stone-500 font-medium">الترجمة العربية الدقيقة:</span>
                          <div className="text-base sm:text-lg font-bold text-amber-950 font-serif-ar leading-relaxed">
                            «{pair.exampleSentence.arabicTranslation}»
                          </div>
                          <div className="text-xs text-stone-500 italic">
                            {pair.exampleSentence.englishTranslation}
                          </div>
                        </div>

                        {/* Grammar & Linguistic Rule Breakdown */}
                        <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-600 font-serif-ar leading-relaxed bg-white/60 p-3 rounded-xl">
                          <strong className="text-stone-900">الإعراب والقاعدة النحوية:</strong>{' '}
                          {pair.exampleSentence.grammarNoteAr}
                        </div>
                      </div>
                    )}
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
