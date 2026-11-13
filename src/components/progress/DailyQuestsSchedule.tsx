import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Trophy,
  Sparkles,
  Zap,
  ArrowRight,
  BookOpen,
  Crown,
  Flame,
  Award,
  ChevronLeft,
  Bell,
  Check,
  Star
} from 'lucide-react';
import {
  TODAY_FOCUS_LESSON,
  TODAY_QUICK_CHALLENGE,
  WEEKLY_SCRIBE_QUESTS,
  DailyFocusLesson,
  DailyQuickChallenge
} from '../../data/dailyQuestsData';
import { DailyQuestTask, AudienceMode } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';
import confetti from 'canvas-confetti';

interface DailyQuestsScheduleProps {
  onSelectMode: (mode: AudienceMode) => void;
}

export const DailyQuestsSchedule: React.FC<DailyQuestsScheduleProps> = ({ onSelectMode }) => {
  const [weeklyQuests, setWeeklyQuests] = useState<DailyQuestTask[]>(WEEKLY_SCRIBE_QUESTS);
  const [isTodayLessonDone, setIsTodayLessonDone] = useState<boolean>(false);
  const [isTodayChallengeDone, setIsTodayChallengeDone] = useState<boolean>(false);
  const [showWeeklyCelebrationToast, setShowWeeklyCelebrationToast] = useState<boolean>(false);
  const [hasClaimedWeeklyReward, setHasClaimedWeeklyReward] = useState<boolean>(false);

  const completedCount = weeklyQuests.filter((q) => q.isCompleted).length;
  const totalQuests = weeklyQuests.length;
  const progressPercent = Math.round((completedCount / totalQuests) * 100);
  const isAllWeeklyComplete = completedCount === totalQuests;

  // Toggle day quest completion
  const handleToggleQuest = (questId: string) => {
    soundFX.playClickSound();
    setWeeklyQuests((prev) => {
      const updated = prev.map((q) => {
        if (q.id === questId) {
          const nextState = !q.isCompleted;
          if (nextState) {
            soundFX.playSuccessSound();
            studentProgress.addPoints(q.pointsReward, `إكمال مهمة يوم ${q.dayNameAr}: ${q.titleAr}`, 'المهام الأسبوعية');
          }
          return { ...q, isCompleted: nextState };
        }
        return q;
      });

      // Check if newly completed all 7
      const newCompleted = updated.filter((q) => q.isCompleted).length;
      if (newCompleted === totalQuests && !hasClaimedWeeklyReward) {
        triggerWeeklyCelebration();
      }

      return updated;
    });
  };

  // Complete Today's Focus Lesson
  const handleCompleteTodayLesson = () => {
    if (isTodayLessonDone) return;
    setIsTodayLessonDone(true);
    soundFX.playSuccessSound();
    studentProgress.addPoints(TODAY_FOCUS_LESSON.pointsReward, `إنجاز درس اليوم: ${TODAY_FOCUS_LESSON.titleAr}`, 'المهام اليومية');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#16a34a', '#2563eb'],
    });
  };

  // Complete Today's Quick Challenge
  const handleCompleteTodayChallenge = () => {
    if (isTodayChallengeDone) return;
    setIsTodayChallengeDone(true);
    soundFX.playSuccessSound();
    studentProgress.addPoints(TODAY_QUICK_CHALLENGE.pointsReward, `إنجاز تحدي اليوم: ${TODAY_QUICK_CHALLENGE.titleAr}`, 'المهام اليومية');
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#ea580c'],
    });
  };

  // Trigger weekly celebration toast
  const triggerWeeklyCelebration = () => {
    setShowWeeklyCelebrationToast(true);
    setHasClaimedWeeklyReward(true);
    soundFX.playSuccessSound();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#9333ea', '#16a34a', '#ea580c'],
    });
    studentProgress.addPoints(100, 'مكافأة إتمام مهام الأسبوع الـ 7 كاملة (تاج الكاتب الأسبوعي)', 'إنجاز أسبوعي كبرى');
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* Visual Weekly Achievement Toast Banner */}
      {showWeeklyCelebrationToast && (
        <div className="relative rounded-2xl p-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 shadow-lg border-2 border-amber-300 animate-bounce flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-300 flex items-center justify-center text-2xl font-hieroglyphs shrink-0 shadow-md">
              👑
            </span>
            <div className="space-y-0.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                إنجاز ملكي عظيم في مدرسة الكاتب! 🎉
              </div>
              <h4 className="text-base sm:text-lg font-black font-display-eg text-stone-950">
                تم إكمال جميع مهام الأسبوع الـ 7 كاملة بنجاح!
              </h4>
              <p className="text-xs text-amber-950/90 font-serif-ar">
                استحققت وسام «تاج الكاتب الأسبوعي المذهب 𓋹» ومكافأة كبرى قدرها <strong>+100 نقطة كاتب</strong> أضيفت إلى حسابك!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowWeeklyCelebrationToast(false)}
            className="px-4 py-2 bg-stone-950 hover:bg-stone-900 text-amber-300 font-bold rounded-xl text-xs transition-colors shrink-0 shadow-sm"
          >
            استلام ومتابعة ✕
          </button>
        </div>
      )}

      {/* Main Quests Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFC9] pb-4">
        <div>
          <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>جدول المهام والطقوس التعليمية (Daily & Weekly Scribe Quests)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg mt-0.5">
            جدول مهام الكاتب و«درس اليوم» لتشجيع الاستمرارية
          </h3>
        </div>

        {/* Weekly Completion Progress Pill */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-300 px-4 py-2 rounded-2xl self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs font-bold text-stone-700">إنجاز الأسبوع:</div>
            <div className="text-xs text-amber-900 font-mono font-bold">
              {completedCount} من {totalQuests} مهام ({progressPercent}%)
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-950 font-bold flex items-center justify-center font-mono">
            {completedCount}/7
          </div>
        </div>
      </div>

      {/* Row 1: Today's Focus Lesson & Today's Quick Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Card 1: Today's Focus Lesson (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border-2 border-amber-500/80 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[11px] font-bold border border-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                <span>درس اليوم الموصى به</span>
                <span className="text-amber-800">· ~{TODAY_FOCUS_LESSON.estimatedMinutes} دقائق</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-display-eg">
                {TODAY_FOCUS_LESSON.titleAr}
              </h4>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl font-hieroglyphs text-amber-950 shrink-0 shadow-2xs">
              {TODAY_FOCUS_LESSON.glyphIcon}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar">
            {TODAY_FOCUS_LESSON.descriptionAr}
          </p>

          {/* Key Takeaways */}
          <div className="space-y-1.5 bg-white/80 p-3 rounded-2xl border border-amber-200/80 text-xs text-stone-800 font-serif-ar">
            <strong className="text-amber-900 block text-[11px]">أهم ما ستتعلمه في درس اليوم:</strong>
            <ul className="space-y-1 pr-4 list-disc text-stone-700">
              {TODAY_FOCUS_LESSON.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>المكافأة: +{TODAY_FOCUS_LESSON.pointsReward} نقطة كاتب</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectMode(TODAY_FOCUS_LESSON.targetMode)}
                className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>بدء درس اليوم في مجلس المعلم 🚀</span>
              </button>

              <button
                onClick={handleCompleteTodayLesson}
                disabled={isTodayLessonDone}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border flex items-center gap-1.5 ${
                  isTodayLessonDone
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-white hover:bg-emerald-50 text-stone-700 border-stone-300'
                }`}
              >
                {isTodayLessonDone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>مكتمل ✓</span>
                  </>
                ) : (
                  <span>تحديد كمكتمل</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Quick Challenge (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#E8DFC9] bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-950 text-[11px] font-bold border border-rose-200">
                  <Zap className="w-3.5 h-3.5 text-rose-600" />
                  <span>تحدي اليوم السريع ⚡</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 font-display-eg">
                  {TODAY_QUICK_CHALLENGE.titleAr}
                </h4>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl font-hieroglyphs text-amber-950 shrink-0">
                {TODAY_QUICK_CHALLENGE.glyphIcon}
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-serif-ar bg-stone-50 p-3 rounded-2xl border border-stone-200">
              {TODAY_QUICK_CHALLENGE.shortGoalAr}
            </p>

            <div className="text-[11px] text-amber-900 font-serif-ar bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <strong>تلميح الكاتب:</strong> {TODAY_QUICK_CHALLENGE.hintAr}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
            <span className="text-xs font-bold text-amber-900">
              +{TODAY_QUICK_CHALLENGE.pointsReward} نقطة
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectMode(TODAY_QUICK_CHALLENGE.targetMode)}
                className="px-3.5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
              >
                خوض التحدي 🎯
              </button>

              <button
                onClick={handleCompleteTodayChallenge}
                disabled={isTodayChallengeDone}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  isTodayChallengeDone
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border-stone-200'
                }`}
              >
                {isTodayChallengeDone ? 'أُنجز ✓' : 'تم'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: 7-Day Weekly Scribe Schedule Grid */}
      <div className="bg-white rounded-3xl border border-[#E8DFC9] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-800" />
              <span>جدول الأيام السبعة للأسبوع (Weekly 7-Day Scribe Schedule)</span>
            </h4>
            <span className="text-xs text-stone-500">
              أكمل المهام اليومية المتنوعة لبناء عادة التعلم المستمرة ونيل مكافأة الأسبوع
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-48 space-y-1">
            <div className="flex justify-between text-[11px] text-stone-600 font-mono">
              <span>تقدم الأسبوع:</span>
              <span className="font-bold text-amber-900">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-800 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 7 Days Quests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {weeklyQuests.map((quest) => {
            return (
              <div
                key={quest.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 text-right ${
                  quest.isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 ring-1 ring-emerald-500/10'
                    : 'bg-[#FAF7F0] border-[#E8DFC9] hover:border-amber-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-900">
                      {quest.dayNameAr}
                    </span>

                    <button
                      onClick={() => handleToggleQuest(quest.id)}
                      className={`p-1 rounded-full transition-colors ${
                        quest.isCompleted
                          ? 'text-emerald-700 hover:text-emerald-900'
                          : 'text-stone-400 hover:text-stone-700'
                      }`}
                      title={quest.isCompleted ? 'مكتمل - انقر للإلغاء' : 'انقر للتحديد كمكتمل'}
                    >
                      {quest.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs font-bold text-stone-900 line-clamp-2">
                    {quest.titleAr}
                  </div>

                  <div className="text-[11px] text-stone-500 line-clamp-2 font-serif-ar">
                    {quest.descriptionAr}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-900">
                    +{quest.pointsReward} ن
                  </span>

                  <button
                    onClick={() => onSelectMode(quest.targetMode)}
                    className="text-[10px] font-bold text-amber-900 hover:text-amber-700 underline"
                  >
                    {quest.actionLabelAr}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Completion Banner / Call to Action */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700 font-serif-ar">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>حافز الاستمرارية:</strong> إكمال مهام الأيام السبعة يفتح لك «تاج الكاتب الأسبوعي» ويمنحك 100 نقطة إضافية لرفع رتبتك!
            </span>
          </div>

          {!isAllWeeklyComplete ? (
            <span className="text-amber-900 font-bold self-start sm:self-auto">
              متبقي {totalQuests - completedCount} مهام لإكمال الأسبوع
            </span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1 self-start sm:self-auto">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>أتممت جميع مهام الأسبوع! 👑</span>
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
