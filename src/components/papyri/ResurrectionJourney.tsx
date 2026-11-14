import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  HelpCircle,
  Lock,
  RotateCcw,
  Sparkles,
  Unlock,
  Volume2,
  XCircle
} from 'lucide-react';
import { RESURRECTION_JOURNEY_STAGES, RebirthFragmentChallenge } from '../../data/resurrectionJourneyData';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';

const STORAGE_KEY = 'egyptian_scribe_rebirth_journey_v1';

interface SavedJourneyState {
  solvedFragmentIds: string[];
  activeStageIndex: number;
}

export const ResurrectionJourney: React.FC = () => {
  const [solvedFragmentIds, setSolvedFragmentIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedJourneyState>;
        if (Array.isArray(parsed.solvedFragmentIds)) {
          return parsed.solvedFragmentIds;
        }
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [activeStageIndex, setActiveStageIndex] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedJourneyState>;
        if (
          typeof parsed.activeStageIndex === 'number' &&
          parsed.activeStageIndex >= 0 &&
          parsed.activeStageIndex < RESURRECTION_JOURNEY_STAGES.length
        ) {
          return parsed.activeStageIndex;
        }
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [attemptStatus, setAttemptStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [justUnlockedFragmentId, setJustUnlockedFragmentId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const state: SavedJourneyState = { solvedFragmentIds, activeStageIndex };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [solvedFragmentIds, activeStageIndex]);

  const totalFragmentsCount = RESURRECTION_JOURNEY_STAGES.reduce(
    (sum, s) => sum + s.fragments.length,
    0
  );
  const overallSolvedCount = solvedFragmentIds.length;
  const overallProgressPercent = Math.round((overallSolvedCount / totalFragmentsCount) * 100);
  const isEntireJourneyCompleted = overallSolvedCount >= totalFragmentsCount;

  const isStageUnlocked = (stageIdx: number): boolean => {
    if (stageIdx === 0) return true;
    const prevStage = RESURRECTION_JOURNEY_STAGES[stageIdx - 1];
    return prevStage.fragments.every((f) => solvedFragmentIds.includes(f.id));
  };

  const isStageCompleted = (stageIdx: number): boolean => {
    const st = RESURRECTION_JOURNEY_STAGES[stageIdx];
    return st.fragments.every((f) => solvedFragmentIds.includes(f.id));
  };

  const currentStage = RESURRECTION_JOURNEY_STAGES[activeStageIndex];
  const stageSolvedCount = currentStage.fragments.filter((f) =>
    solvedFragmentIds.includes(f.id)
  ).length;
  const stageCompleted = stageSolvedCount === currentStage.fragments.length;

  // The active fragment to solve next in this stage (first unsolved one)
  const activeFragment: RebirthFragmentChallenge | null =
    currentStage.fragments.find((f) => !solvedFragmentIds.includes(f.id)) ?? null;

  const handleSelectStage = (idx: number) => {
    if (!isStageUnlocked(idx)) return;
    setActiveStageIndex(idx);
    setSelectedOptionId(null);
    setAttemptStatus('idle');
    setFeedbackMessage('');
    setShowHint(false);
    soundFX.playPapyrusRustle();
  };

  const handleSubmitOption = (optionId: string) => {
    if (!activeFragment || attemptStatus === 'correct') return;

    const chosen = activeFragment.options.find((o) => o.id === optionId);
    if (!chosen) return;

    setSelectedOptionId(optionId);

    if (chosen.isCorrect) {
      setAttemptStatus('correct');
      setFeedbackMessage(chosen.feedbackAr);
      setShowHint(false);

      const alreadySolved = solvedFragmentIds.includes(activeFragment.id);
      if (!alreadySolved) {
        const nextSolved = [...solvedFragmentIds, activeFragment.id];
        setSolvedFragmentIds(nextSolved);
        setJustUnlockedFragmentId(activeFragment.id);

        // Award points and play stone-unlock + fanfare
        studentProgress.addPoints(
          currentStage.pointsPerFragment,
          `فك نقش «${activeFragment.arabicMeaning}» في رحلة البعث`,
          'رحلة البعث'
        );

        const stageNowComplete = currentStage.fragments.every((f) =>
          nextSolved.includes(f.id)
        );
        if (stageNowComplete) {
          soundFX.playStoneDoorSlide();
          studentProgress.addPoints(
            currentStage.stageBonusPoints,
            `إتمام محطة «${currentStage.titleAr}» من كتاب الموتى`,
            'رحلة البعث'
          );
        }

        const allDone = nextSolved.length >= totalFragmentsCount;
        if (allDone) {
          studentProgress.completeLesson('mod-rebirth-journey');
        }
      }
    } else {
      setAttemptStatus('wrong');
      setFeedbackMessage(chosen.feedbackAr);
      soundFX.playClickSound();
    }
  };

  const handleAdvanceAfterCorrect = () => {
    setSelectedOptionId(null);
    setAttemptStatus('idle');
    setFeedbackMessage('');
    setShowHint(false);
    setJustUnlockedFragmentId(null);
  };

  const handleGoToNextStage = () => {
    if (activeStageIndex + 1 < RESURRECTION_JOURNEY_STAGES.length && isStageUnlocked(activeStageIndex + 1)) {
      handleSelectStage(activeStageIndex + 1);
    }
  };

  const handleResetJourney = () => {
    setSolvedFragmentIds([]);
    setActiveStageIndex(0);
    setSelectedOptionId(null);
    setAttemptStatus('idle');
    setFeedbackMessage('');
    setShowHint(false);
    setJustUnlockedFragmentId(null);
    soundFX.playStonePolish();
  };

  return (
    <section className="space-y-8 text-right" dir="rtl">
      {/* Header & Overall Journey Progress */}
      <div className="rounded-3xl bg-gradient-to-br from-[#F5EEDB] via-[#FAF7F0] to-amber-50 border border-[#E8DFC9] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>مسار تعليمي تفاعلي</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>نصوص كتاب الموتى (الخروج إلى النهار)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              رحلة البعث: فك رموز كتاب الموتى خطوة بخطوة
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar">
              تدرّج مع الروح في خمس محطات مهيبة داخل العالم الآخر؛ في كل محطة تنكشف لك أجزاء جديدة من النقش الهيروغليفي الأصلي كلما فككت الجزء الذي يسبقه بنجاح.
            </p>
          </div>

          {/* Progress Box */}
          <div className="bg-white border border-[#E8DFC9] rounded-2xl p-5 min-w-[270px] lg:min-w-[320px] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600">
              <span>تقدّمك في مسار البعث</span>
              <span className="font-mono tabular-nums text-amber-900">
                {overallSolvedCount} / {totalFragmentsCount} نقش ({overallProgressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-700 transition-all duration-500"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs font-semibold text-stone-600">
                {isEntireJourneyCompleted
                  ? 'اكتملت الرحلة ووصلت لحقول القصب ✓'
                  : `المحطة الحالية: ${currentStage.stageNumber} من ${RESURRECTION_JOURNEY_STAGES.length}`}
              </span>
              <button
                type="button"
                onClick={handleResetJourney}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الرحلة</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Progressive Path Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {RESURRECTION_JOURNEY_STAGES.map((stage, idx) => {
          const unlocked = isStageUnlocked(idx);
          const completed = isStageCompleted(idx);
          const active = idx === activeStageIndex;
          const stageDoneCount = stage.fragments.filter((f) =>
            solvedFragmentIds.includes(f.id)
          ).length;

          return (
            <button
              key={stage.id}
              type="button"
              disabled={!unlocked}
              onClick={() => handleSelectStage(idx)}
              className={`text-right rounded-2xl p-4 border transition-all flex flex-col justify-between gap-2.5 ${
                active
                  ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-md'
                  : completed
                  ? 'bg-emerald-50 text-stone-900 border-emerald-300 hover:border-emerald-500'
                  : unlocked
                  ? 'bg-white text-stone-900 border-[#E8DFC9] hover:border-amber-500 shadow-xs'
                  : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-bold font-mono tabular-nums ${
                    active ? 'text-amber-200' : completed ? 'text-emerald-800' : 'text-amber-800'
                  }`}
                >
                  المحطة {stage.stageNumber}
                </span>
                {completed ? (
                  <CheckCircle2
                    className={`w-4 h-4 ${active ? 'text-emerald-300' : 'text-emerald-700'}`}
                  />
                ) : unlocked ? (
                  <Unlock className={`w-4 h-4 ${active ? 'text-amber-300' : 'text-amber-700'}`} />
                ) : (
                  <Lock className="w-4 h-4 text-stone-400" />
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold leading-snug">{stage.titleAr}</div>
                <span
                  className={`font-hieroglyphs text-2xl leading-none select-none ${
                    active ? 'text-amber-300' : unlocked ? 'text-amber-800' : 'text-stone-400'
                  }`}
                >
                  {stage.symbolHieroglyph}
                </span>
              </div>

              <div
                className={`text-[11px] font-medium font-mono tabular-nums ${
                  active ? 'text-amber-200' : 'text-stone-500'
                }`}
              >
                {unlocked
                  ? `${stageDoneCount} / ${stage.fragments.length} أجزاء مفتوحة`
                  : 'مغلقة — أكمل المحطة السابقة'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Zone Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Right Interactive Stage Canvas: Progressive Papyrus Inscription Wall (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#E8DFC9] p-6 sm:p-7 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-stone-100">
            <div>
              <div className="text-xs font-semibold text-amber-800 flex items-center gap-2">
                <span>{currentStage.chapterRefAr}</span>
                <span aria-hidden="true" className="text-amber-400">·</span>
                <span>{currentStage.guardianDeityAr}</span>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 font-display-eg mt-1">
                لوح النقش المقدس — {currentStage.titleAr}
              </h3>
            </div>
            <div className="text-xs font-bold font-mono tabular-nums text-stone-600">
              {stageSolvedCount} / {currentStage.fragments.length} مقاطع مكشوفة
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed font-serif-ar bg-[#FAF7F0] border border-[#E8DFC9] rounded-2xl p-4">
            {currentStage.introNarrativeAr}
          </p>

          {/* Progressive Inscription Fragments */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-600">
              تسلسل مقاطع النقش (تنفتح تلقائياً عند كل إجابة صحيحة):
            </div>

            <div className="space-y-3">
              {currentStage.fragments.map((frag, fragIdx) => {
                const isSolved = solvedFragmentIds.includes(frag.id);
                const isCurrentTarget =
                  !isSolved &&
                  (fragIdx === 0 ||
                    solvedFragmentIds.includes(currentStage.fragments[fragIdx - 1].id));
                const isSealed = !isSolved && !isCurrentTarget;
                const isNewlyUnlocked = justUnlockedFragmentId === frag.id;

                return (
                  <div
                    key={frag.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                      isNewlyUnlocked
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                        : isSolved
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : isCurrentTarget
                        ? 'bg-amber-50/70 border-amber-500 shadow-xs'
                        : 'bg-stone-100/80 border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <span className="font-mono tabular-nums text-stone-700">
                          الجزء {frag.order}
                        </span>
                        <span aria-hidden="true" className="text-stone-400">·</span>
                        {isSolved ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>تم فك النقش وفتحه</span>
                          </span>
                        ) : isCurrentTarget ? (
                          <span className="inline-flex items-center gap-1 text-amber-800">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>الجزء النشط الآن — بانتظار فك الشفرة</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-stone-500">
                            <Lock className="w-3.5 h-3.5" />
                            <span>مختوم — أجب عن الجزء السابق لفتحه</span>
                          </span>
                        )}
                      </div>

                      {!isSealed && (
                        <button
                          type="button"
                          onClick={() => soundFX.speakArabic(frag.audioPronunciationText)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E8DFC9] hover:border-amber-500 text-xs font-bold text-amber-900 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>استمع للنطق</span>
                        </button>
                      )}
                    </div>

                    {isSealed ? (
                      <div className="py-4 px-3 rounded-xl bg-stone-200/70 border border-dashed border-stone-300 flex items-center justify-center gap-3 text-stone-500 text-xs font-semibold">
                        <Lock className="w-4 h-4" />
                        <span>نقش حجري محجوب — سيظهر بمجرد حل التحدي السابق</span>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl border border-[#E8DFC9] px-4 py-3">
                          <span className="font-hieroglyphs text-4xl sm:text-5xl text-amber-950 tracking-wider leading-none select-all">
                            {frag.hieroglyphs}
                          </span>
                          <div className="text-left sm:text-right space-y-0.5">
                            <div className="text-xs font-mono text-stone-500">
                              {frag.gardinerCodes.join(' · ')}
                            </div>
                            <div className="text-xs font-bold text-amber-800">
                              النطق التقريبي: {frag.phoneticReadingAr.split('(')[0].trim()}
                            </div>
                          </div>
                        </div>

                        {isSolved ? (
                          <div className="text-xs sm:text-sm space-y-1 pt-1">
                            <div className="font-bold text-emerald-900">
                              المعنى المكشوف: {frag.arabicMeaning}
                            </div>
                            <p className="text-stone-700 leading-relaxed">
                              {frag.grammarAndSymbolNoteAr}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-stone-600 leading-relaxed">
                            ملاحظة الكاتب: {frag.grammarAndSymbolNoteAr}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete Illuminated Spell Footer once Stage is Completed */}
          {stageCompleted && (
            <div className="rounded-2xl bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 p-6 space-y-3 shadow-md">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>النقش الكامل للمحطة بعد الفتح</span>
                </span>
                <button
                  type="button"
                  onClick={() => soundFX.speakArabic(currentStage.fullSpellTranslationAr)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-100 text-xs font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>قراءة التعويذة</span>
                </button>
              </div>
              <div className="font-hieroglyphs text-3xl sm:text-4xl text-amber-300 tracking-wide leading-relaxed">
                {currentStage.fullSpellHieroglyphs}
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {currentStage.fullSpellTranslationAr}
              </p>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {currentStage.completionBlessingAr}
              </p>
            </div>
          )}
        </div>

        {/* Right/Bottom Control & Challenge Deck (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-[#E8DFC9] p-6 sm:p-7 space-y-5 shadow-xs">
          {activeFragment ? (
            <>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <BookOpen className="w-4 h-4" />
                  <span>تحدي فتح الجزء {activeFragment.order} من {currentStage.fragments.length}</span>
                </div>
                <span className="text-xs font-bold font-mono tabular-nums text-emerald-800">
                  +{currentStage.pointsPerFragment} نقطة
                </span>
              </div>

              <div className="text-center py-4 px-3 rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] space-y-2">
                <div className="font-hieroglyphs text-5xl text-amber-950 leading-none">
                  {activeFragment.hieroglyphs}
                </div>
                <div className="text-xs font-mono text-stone-500">
                  {activeFragment.transliteration} · {activeFragment.gardinerCodes.join(' - ')}
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {activeFragment.questionAr}
              </h4>

              <div className="space-y-2.5">
                {activeFragment.options.map((opt) => {
                  const isPicked = selectedOptionId === opt.id;
                  const showCorrect = isPicked && attemptStatus === 'correct' && opt.isCorrect;
                  const showWrong = isPicked && attemptStatus === 'wrong' && !opt.isCorrect;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={attemptStatus === 'correct'}
                      onClick={() => handleSubmitOption(opt.id)}
                      className={`w-full text-right p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between gap-3 ${
                        showCorrect
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                          : showWrong
                          ? 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-[#FAF7F0]/70 hover:bg-amber-50 border-[#E8DFC9] text-stone-800'
                      }`}
                    >
                      <span>{opt.textAr}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                      {showWrong && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Dual-coded Feedback Callout */}
              {attemptStatus !== 'idle' && feedbackMessage && (
                <div
                  className={`rounded-2xl p-4 border text-xs sm:text-sm space-y-3 ${
                    attemptStatus === 'correct'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2 font-bold">
                    {attemptStatus === 'correct' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                    )}
                    <p className="leading-relaxed">{feedbackMessage}</p>
                  </div>

                  {attemptStatus === 'correct' && (
                    <button
                      type="button"
                      onClick={handleAdvanceAfterCorrect}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>متابعة إلى الجزء التالي من النقش</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Scribe Hint Control */}
              <div className="pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showHint ? 'إخفاء تلميح الكاتب' : 'أحتاج تلميحاً من الكاتب الملكي'}</span>
                </button>
                {showHint && (
                  <p className="mt-2 text-xs text-stone-700 bg-amber-50 border border-amber-200 rounded-xl p-3 leading-relaxed">
                    {activeFragment.hintAr}
                  </p>
                )}
              </div>
            </>
          ) : (
            /* Stage Completed Summary & Next Stage CTA */
            <div className="space-y-5 py-2">
              <div className="flex items-center gap-2 text-emerald-800 text-sm font-extrabold">
                <CheckCircle2 className="w-5 h-5" />
                <span>تم فتح جميع نقوش هذه المحطة بالكامل!</span>
              </div>

              <div className="rounded-2xl bg-[#FAF7F0] border border-[#E8DFC9] p-5 space-y-2 text-center">
                <div className="font-hieroglyphs text-5xl text-amber-900">
                  {currentStage.symbolHieroglyph}
                </div>
                <div className="text-base font-bold text-stone-900">{currentStage.titleAr}</div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {currentStage.completionBlessingAr}
                </p>
              </div>

              {activeStageIndex + 1 < RESURRECTION_JOURNEY_STAGES.length ? (
                <button
                  type="button"
                  onClick={handleGoToNextStage}
                  className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>
                    الانتقال إلى المحطة {activeStageIndex + 2}:{' '}
                    {RESURRECTION_JOURNEY_STAGES[activeStageIndex + 1].titleAr}
                  </span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              ) : (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 space-y-3">
                  <div className="text-sm font-extrabold text-emerald-900">
                    لقد أتممت رحلة البعث كاملة!
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    فككت جميع نقوش كتاب الموتى عبر المحطات الخمس، وتأهلت لعبور حقول القصب الأبدية بلقب «صادق القول».
                  </p>
                  <button
                    type="button"
                    onClick={handleResetJourney}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إعادة خوض الرحلة من البداية</span>
                  </button>
                </div>
              )}

              {activeStageIndex > 0 && (
                <button
                  type="button"
                  onClick={() => handleSelectStage(activeStageIndex - 1)}
                  className="w-full py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 flex items-center justify-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>مراجعة المحطة السابقة</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
