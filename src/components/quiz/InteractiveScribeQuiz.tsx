import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Swords, UserCheck } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizQuestion, AudienceMode } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { FriendsChallengeArena } from './FriendsChallengeArena';
import { studentProgress } from '../../utils/studentProgressService';

interface InteractiveScribeQuizProps {
  currentMode: AudienceMode;
}

export const InteractiveScribeQuiz: React.FC<InteractiveScribeQuizProps> = ({ currentMode }) => {
  const [activeQuizTab, setActiveQuizTab] = useState<'solo' | 'friends'>('solo');
  const [quizAudience, setQuizAudience] = useState<'kids' | 'adults'>(currentMode === 'kids' ? 'kids' : 'adults');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestions = QUIZ_QUESTIONS.filter(q => q.forMode === quizAudience);
  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
    soundFX.playClickSound();
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const selectedOption = currentQ.options.find(o => o.id === selectedOptionId);
    if (selectedOption?.isCorrect) {
      soundFX.playSuccessSound();
      setScore(prev => prev + 25);
    } else {
      soundFX.playClickSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      studentProgress.recordGameScore('royalExamScore', score);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm space-y-6 text-right">
      
      {/* Quiz Top Tabs: Solo Mode vs Friends Challenge Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>امتحان الكاتب الملكي وحلبة المبارزة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
            اختبر معلوماتك وتحدَّ أصدقاءك في الهيروغليفية
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            اختر بين الاختبار الفردي لتقييم مستواك، أو أنشئ غرفة مبارزة فورية مع أصدقائك في ترجمة الرموز والكلمات المشتركة.
          </p>
        </div>

        {/* Solo vs Friends Challenge Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 self-start sm:self-auto">
          <button
            onClick={() => {
              soundFX.playClickSound();
              setActiveQuizTab('solo');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeQuizTab === 'solo' 
                ? 'bg-amber-800 text-white shadow-xs' 
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>الاختبار الفردي</span>
          </button>

          <button
            onClick={() => {
              soundFX.playAncientChime(520);
              setActiveQuizTab('friends');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeQuizTab === 'friends' 
                ? 'bg-amber-800 text-white shadow-xs ring-2 ring-amber-400' 
                : 'bg-amber-100/70 text-amber-950 hover:bg-amber-100 border border-amber-300/80'
            }`}
          >
            <Swords className="w-4 h-4 text-amber-700" />
            <span>تحدي الأصدقاء ⚔️</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FRIENDS CHALLENGE ARENA */}
      {activeQuizTab === 'friends' ? (
        <FriendsChallengeArena />
      ) : (
        /* TAB 2: SOLO SCRIBE QUIZ */
        <div className="space-y-6">
          
          {/* Sub-header with Audience Level Switcher */}
          <div className="flex items-center justify-between bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80">
            <span className="text-xs font-bold text-amber-950">
              اختر الفئة المستهدفة للاختبار الفردي:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setQuizAudience('kids'); handleRestartQuiz(); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  quizAudience === 'kids' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                مستوى الصغار
              </button>
              <button
                onClick={() => { setQuizAudience('adults'); handleRestartQuiz(); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  quizAudience === 'adults' ? 'bg-amber-800 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                مستوى الكبار والباحثين
              </button>
            </div>
          </div>

      {!quizFinished ? (
        <div className="space-y-6">
          
          {/* Progress Bar & Question Counter */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-600">
            <span>السؤال {currentQuestionIndex + 1} من {activeQuestions.length}</span>
            <span className="font-mono tabular-nums text-amber-900">النقاط الحالية: {score}</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-800 transition-all duration-300 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Display Card */}
          <div className="p-6 rounded-2xl bg-[#FAF6ED] border border-amber-200/80 space-y-4">
            
            {/* Optional Glyph prompt */}
            {currentQ.glyphDisplay && (
              <div className="flex justify-center">
                <span className="text-6xl sm:text-7xl font-hieroglyphs text-stone-900 bg-white px-6 py-3 rounded-2xl border border-amber-200 shadow-sm select-none">
                  {currentQ.glyphDisplay}
                </span>
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-bold text-stone-900 text-center font-serif-ar leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'bg-white border-stone-200 hover:border-amber-400 hover:bg-stone-50';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                } else if (isSelected) {
                  btnClass = 'bg-rose-50 border-rose-500 text-rose-950';
                } else {
                  btnClass = 'bg-stone-50 border-stone-200 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'bg-amber-100 border-amber-700 text-amber-950 font-bold ring-2 ring-amber-500';
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-right flex items-center justify-between ${btnClass}`}
                >
                  <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mr-2" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mr-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on submit */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-800 space-y-1 font-serif-ar leading-relaxed animate-fadeIn">
              <strong className="text-amber-900 flex items-center gap-1.5 font-sans font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>الشرح التاريخي واللغوي:</span>
              </strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Quiz Action Control */}
          <div className="pt-2 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-sm shadow-sm transition-all"
              >
                تأكيد الإجابة
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>السؤال التالي</span>
                <span aria-hidden="true">←</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Final Score Screen */
        <div className="py-8 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
            𓇓
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              مبروك! أنهيت امتحان الكاتب الملكي بنجاح!
            </h3>
            <p className="text-sm text-stone-600">
              لقد أحرزت نتيجة متميزة تثبت شغفك بالحضارة المصرية العريقة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-xs mx-auto">
            <div className="text-xs text-stone-500 font-bold">مجموع النقاط المحققة</div>
            <div className="text-4xl font-extrabold text-amber-900 font-mono tabular-nums my-1">
              {score} / {activeQuestions.length * 25}
            </div>
            <div className="text-xs text-amber-800 font-semibold">
              لقب الشرف: «كاتب دار الحياة المعتمد»
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-sm font-bold shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة الاختبار من جديد</span>
          </button>
        </div>
      )}
      </div>
      )}

    </section>
  );
};
