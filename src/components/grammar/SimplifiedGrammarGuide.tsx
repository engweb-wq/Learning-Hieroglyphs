import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpenCheck,
  Volume2,
  MousePointerClick,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  Languages,
  Layers,
  RotateCcw
} from 'lucide-react';
import {
  SIMPLIFIED_GRAMMAR_SECTIONS,
  GRAMMAR_QUICK_CHECKS,
  SYNTAX_ROLE_STYLES,
  GrammarCategoryId,
  GrammarRuleSection,
  GrammarExampleSentence,
  GrammarSymbolToken
} from '../../data/simplifiedGrammarData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

export const SimplifiedGrammarGuide: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<GrammarCategoryId>('verbal');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'lessons' | 'quick_check'>('lessons');

  // Quick Check drill state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeSection: GrammarRuleSection =
    SIMPLIFIED_GRAMMAR_SECTIONS.find((s) => s.id === activeCategoryId) ||
    SIMPLIFIED_GRAMMAR_SECTIONS[0];

  const activeExample: GrammarExampleSentence =
    activeSection.examples[selectedExampleIndex % activeSection.examples.length] ||
    activeSection.examples[0];

  const activeToken: GrammarSymbolToken =
    activeExample.tokens.find((t) => t.id === selectedTokenId) || activeExample.tokens[0];

  const handleSelectCategory = (id: GrammarCategoryId) => {
    soundFX.playClickSound();
    scribeAudio.stop();
    setActiveCategoryId(id);
    setSelectedExampleIndex(0);
    setSelectedTokenId(null);
    setViewMode('lessons');
  };

  const handleSelectExample = (idx: number) => {
    soundFX.playClickSound();
    scribeAudio.stop();
    setSelectedExampleIndex(idx);
    setSelectedTokenId(null);
  };

  const handleClickToken = (token: GrammarSymbolToken) => {
    soundFX.playAncientChime(560);
    setSelectedTokenId(token.id);
    scribeAudio.speakText(
      `${token.phoneticAr} .. معناه: ${token.meaningAr} .. ووظيفته: ${token.roleLabelAr}`,
      { id: `grammar-tok-${token.id}`, rate: 0.9 }
    );
  };

  const handlePlaySentenceAudio = () => {
    soundFX.playAncientChime(500);
    scribeAudio.speakText(
      `${activeExample.phoneticReadingAr} .. ومعناها بالعربية: ${activeExample.translationAr}`,
      { id: `grammar-sent-${activeExample.id}`, rate: 0.88 }
    );
  };

  const currentQuestion = GRAMMAR_QUICK_CHECKS[quizIndex];

  const handleAnswerQuiz = (optId: string, isCorrect: boolean) => {
    if (selectedOptionId !== null) return;
    setSelectedOptionId(optId);
    if (isCorrect) {
      soundFX.playSuccessSound();
      setCorrectCount((c) => c + 1);
    } else {
      soundFX.playClickSound();
    }
  };

  const handleNextQuiz = () => {
    soundFX.playClickSound();
    if (quizIndex + 1 < GRAMMAR_QUICK_CHECKS.length) {
      setQuizIndex((i) => i + 1);
      setSelectedOptionId(null);
    } else {
      setQuizCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      if (correctCount >= 2) {
        studentProgress.addPoints(
          25,
          `إتمام تدريب دليل القواعد المبسط (${correctCount}/${GRAMMAR_QUICK_CHECKS.length})`,
          'دليل القواعد المبسط'
        );
      }
    }
  };

  const handleResetQuiz = () => {
    soundFX.playClickSound();
    setQuizIndex(0);
    setSelectedOptionId(null);
    setCorrectCount(0);
    setQuizCompleted(false);
  };

  return (
    <section id="simplified-grammar-guide" className="space-y-6 text-right animate-fadeIn">
      {/* Header & Rule Navigation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-amber-800 flex flex-wrap items-center gap-2">
              <span>نحو اللغة المصرية الوسطى</span>
              <span aria-hidden="true">·</span>
              <span>شروح مرئية تفاعلية</span>
              <span aria-hidden="true">·</span>
              <span>مقارنة بالعربية الفصحى</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              دليل القواعد المبسط: كيف تبني جملة هيروغليفية؟
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl font-serif-ar leading-relaxed">
              تعلّم بنية الجمل المصرية القديمة الأساسية (جمل الفعل، جمل الوصف، الجمل الاسمية، والضمائر) عبر أمثلة مرئية؛ انقر على أي رمز داخل الجملة لتكتشف وظيفته النحوية وصوته.
            </p>
          </div>

          {/* Lessons vs Quick Check Toggle */}
          <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1 self-start shrink-0">
            <button
              type="button"
              onClick={() => {
                soundFX.playClickSound();
                setViewMode('lessons');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                viewMode === 'lessons'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>الشروح والأمثلة</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundFX.playClickSound();
                setViewMode('quick_check');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                viewMode === 'quick_check'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>اختبر فهمك (3 أسئلة)</span>
            </button>
          </div>
        </div>

        {/* 4 Grammar Topic Tabs */}
        {viewMode === 'lessons' && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
            {SIMPLIFIED_GRAMMAR_SECTIONS.map((section) => {
              const isActive = section.id === activeSection.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSelectCategory(section.id)}
                  className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FAF5E8] border-amber-700 text-amber-950'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400'
                  }`}
                >
                  {section.titleAr}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {viewMode === 'lessons' ? (
        <>
          {/* Visual Structural Formula Ribbon */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-display-eg">
                  {activeSection.titleAr}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  {activeSection.subtitleAr}
                </p>
              </div>

              {/* Visual Formula Blocks */}
              <div className="flex flex-wrap items-center gap-2" dir="rtl">
                {activeSection.formulaStepsAr.map((step, i) => {
                  const st = SYNTAX_ROLE_STYLES[step.roleType];
                  return (
                    <React.Fragment key={step.labelAr}>
                      <span
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${st.cardBg} ${st.border} ${st.text}`}
                      >
                        {step.labelAr}
                      </span>
                      {i < activeSection.formulaStepsAr.length - 1 && (
                        <ArrowLeft className="w-4 h-4 text-amber-800 shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[#E8DFC9]">
              <p className="md:col-span-8 text-sm text-stone-800 font-serif-ar leading-relaxed">
                {activeSection.coreRuleAr}
              </p>
              <div className="md:col-span-4 p-3.5 rounded-2xl bg-white border border-[#E2D5B8] text-xs font-bold text-amber-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="leading-relaxed">{activeSection.keyTakeawayAr}</span>
              </div>
            </div>
          </div>

          {/* Two-Zone Interactive Sandbox: Clickable Sentence Builder & Role Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT STAGE (7 cols): Clickable Visual Sentence */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-6">
              {/* Example Picker */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                    <MousePointerClick className="w-4 h-4 text-amber-800" />
                    <span>اختر مثالاً ثم انقر على أي رمز لتوضيح وظيفته:</span>
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {activeSection.examples.map((ex, idx) => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => handleSelectExample(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          idx === selectedExampleIndex % activeSection.examples.length
                            ? 'bg-amber-800 text-white'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        مثال {idx + 1}: {ex.titleAr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Hieroglyphic Preview Strip */}
                <div className="p-5 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-hieroglyphs text-stone-900 tracking-wide">
                      {activeExample.hieroglyphs}
                    </div>
                    <div className="text-sm font-extrabold text-amber-950">
                      «{activeExample.translationAr}»
                    </div>
                    <div className="text-xs text-stone-600">
                      النطق التقريبي: {activeExample.phoneticReadingAr}{' '}
                      <span className="font-mono text-stone-500">
                        ({activeExample.transliteration})
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlaySentenceAudio}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap self-start sm:self-center shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>استمع للجملة كاملة</span>
                  </button>
                </div>
              </div>

              {/* Interactive Clickable Word/Symbol Blocks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>تفكيك الجملة رمزاً برمز (رتّب النظر من اليمين إلى اليسار):</span>
                  <span className="font-mono text-stone-500">يمين ← يسار</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="rtl">
                  {activeExample.tokens.map((tok, idx) => {
                    const st = SYNTAX_ROLE_STYLES[tok.roleType];
                    const isSelected = activeToken.id === tok.id;

                    return (
                      <button
                        key={tok.id}
                        type="button"
                        onClick={() => handleClickToken(tok)}
                        className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-2.5 cursor-pointer ${
                          st.cardBg
                        } ${st.border} ${
                          isSelected
                            ? 'ring-3 ring-amber-600/40 shadow-md -translate-y-0.5'
                            : 'hover:shadow-sm opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="w-full flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-stone-500">#{idx + 1}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${st.roleTagBg}`}
                          >
                            {tok.roleType === 'verb'
                              ? 'فعل'
                              : tok.roleType === 'subject'
                              ? 'فاعل / موصوف'
                              : tok.roleType === 'object'
                              ? 'مفعول به'
                              : tok.roleType === 'adjective'
                              ? 'صفة / خبر'
                              : 'أداة / ضمير'}
                          </span>
                        </div>

                        <div className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900 py-1 select-none">
                          {tok.glyphs}
                        </div>

                        <div className="space-y-0.5">
                          <div className={`text-sm font-extrabold ${st.text}`}>
                            {tok.meaningAr}
                          </div>
                          <div className="text-xs font-mono text-stone-600">
                            {tok.phoneticAr} · {tok.gardiner}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900">ملاحظة تركيبية: </strong>
                {activeExample.syntaxNoteAr}
              </div>
            </div>

            {/* RIGHT DECK (5 cols): Active Symbol Function Inspector */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <div className="text-xs font-semibold text-amber-800">بطاقة وظيفة الرمز المختار</div>
                    <h4 className="text-lg font-extrabold text-stone-900 font-display-eg">
                      تحليل: «{activeToken.meaningAr}»
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClickToken(activeToken)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>نطق الرمز</span>
                  </button>
                </div>

                {/* Big Token Showcase */}
                <div
                  className={`p-5 rounded-2xl border-2 flex items-center justify-between gap-4 ${
                    SYNTAX_ROLE_STYLES[activeToken.roleType].cardBg
                  } ${SYNTAX_ROLE_STYLES[activeToken.roleType].border}`}
                >
                  <div className="text-5xl font-hieroglyphs text-stone-900 select-none">
                    {activeToken.glyphs}
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-xs font-mono text-stone-600">
                      Gardiner: {activeToken.gardiner}
                    </div>
                    <div className="text-base font-extrabold text-stone-900">
                      {activeToken.phoneticAr}{' '}
                      <span className="font-mono text-xs text-stone-600">
                        ({activeToken.transliteration})
                      </span>
                    </div>
                    <div className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/80 text-stone-900 border border-stone-300/70">
                      {activeToken.roleLabelAr}
                    </div>
                  </div>
                </div>

                {/* Structured Grammatical Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-xs font-bold text-amber-900">1. كيف رُسمت العلامة؟</div>
                    <p className="text-stone-700 font-serif-ar leading-relaxed">
                      {activeToken.signCompositionAr}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-xs font-bold text-amber-900">2. وظيفتها في هذه الجملة:</div>
                    <p className="text-stone-700 font-serif-ar leading-relaxed">
                      {activeToken.grammarExplanationAr}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF5E8] border border-amber-200 space-y-1">
                    <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-amber-800" />
                      <span>3. التناظر مع القواعد العربية:</span>
                    </div>
                    <p className="text-stone-800 font-serif-ar leading-relaxed">
                      {activeToken.arabicComparisonAr}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>البنية: {activeExample.structurePatternAr}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Interactive Quick Comprehension Check */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs max-w-3xl mx-auto space-y-6">
          {!quizCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <div className="text-xs font-semibold text-amber-800">تطبيق القواعد بالصور</div>
                  <h3 className="text-xl font-extrabold text-stone-900 font-display-eg">
                    تحديد وظيفة الرمز في الجملة
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-stone-500 tabular-nums">
                  {quizIndex + 1}/{GRAMMAR_QUICK_CHECKS.length}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF5E8] border border-amber-200 text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900">
                  {currentQuestion.sentenceGlyphs}
                </div>
                <div className="text-xs text-stone-600">
                  الرمز المستهدف:{' '}
                  <strong className="font-hieroglyphs text-2xl text-amber-900 mx-1">
                    {currentQuestion.highlightedGlyph}
                  </strong>
                  <span>({currentQuestion.phoneticAr})</span>
                </div>
                <div className="text-xs font-bold text-stone-700">
                  المعنى: «{currentQuestion.translationAr}»
                </div>
              </div>

              <p className="text-sm sm:text-base font-bold text-stone-900">
                {currentQuestion.questionAr}
              </p>

              <div className="space-y-2.5">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const showState = selectedOptionId !== null;
                  let style = 'bg-white border-stone-200 hover:border-amber-500 text-stone-800';
                  if (showState) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                    } else {
                      style = 'bg-stone-50 border-stone-200 text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={showState}
                      onClick={() => handleAnswerQuiz(opt.id, opt.isCorrect)}
                      className={`w-full p-4 rounded-xl border-2 text-right text-sm transition-colors flex items-center justify-between gap-3 ${style}`}
                    >
                      <span>{opt.textAr}</span>
                      {showState && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {showState && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOptionId !== null && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed">
                    {currentQuestion.explanationAr}
                  </p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuiz}
                      className="px-5 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
                    >
                      {quizIndex + 1 < GRAMMAR_QUICK_CHECKS.length
                        ? 'السؤال التالي'
                        : 'عرض النتيجة'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="text-5xl font-hieroglyphs text-amber-800">𓏞 𓋹</div>
              <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                أتممت تدريب القواعد المبسط!
              </h3>
              <p className="text-sm text-stone-600">
                أصبتَ في{' '}
                <strong className="font-mono text-amber-900 tabular-nums">
                  {correctCount}/{GRAMMAR_QUICK_CHECKS.length}
                </strong>{' '}
                أسئلة نحوية.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة التدريب</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('lessons')}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold"
                >
                  العودة إلى دروس القواعد
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
