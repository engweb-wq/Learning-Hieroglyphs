import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  History, 
  Scroll, 
  Video, 
  PenTool, 
  Swords, 
  ArrowRight, 
  RotateCcw, 
  Star, 
  ShieldCheck, 
  Crown, 
  Check, 
  ExternalLink,
  Edit2,
  Info
} from 'lucide-react';
import { 
  studentProgress, 
  SCRIBE_RANKS, 
  ALL_ACHIEVEMENT_BADGES, 
  INITIAL_LESSON_MODULES 
} from '../../utils/studentProgressService';
import { 
  StudentProgressData, 
  ScribeRank, 
  AchievementBadge, 
  LearningLessonModule, 
  AudienceMode 
} from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { DailyQuestsSchedule } from './DailyQuestsSchedule';

interface StudentProgressDashboardProps {
  onSelectMode: (mode: AudienceMode) => void;
  onOpenCartouche: () => void;
}

const AVATARS = ['𓇓', '𓅃', '𓋹', '𓅓', '𓆑', '𓀀'];

export const StudentProgressDashboard: React.FC<StudentProgressDashboardProps> = ({
  onSelectMode,
  onOpenCartouche
}) => {
  const [progressData, setProgressData] = useState<StudentProgressData>(() => studentProgress.getProgress());
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(progressData.studentName);

  // Subscribe to reactive updates from studentProgress service
  useEffect(() => {
    const unsubscribe = studentProgress.subscribe((updated) => {
      setProgressData(updated);
    });
    return () => unsubscribe();
  }, []);

  const currentRank: ScribeRank = studentProgress.getCurrentRank(progressData.totalScribePoints);
  const nextRank: ScribeRank | null = studentProgress.getNextRank(progressData.totalScribePoints);

  // Progress to next rank calculation
  const pointsInCurrentLevel = progressData.totalScribePoints - currentRank.minPoints;
  const levelSpan = nextRank ? (nextRank.minPoints - currentRank.minPoints) : 1000;
  const progressPercent = nextRank 
    ? Math.min(Math.round((pointsInCurrentLevel / levelSpan) * 100), 100)
    : 100;

  const pointsNeeded = nextRank ? Math.max(0, nextRank.minPoints - progressData.totalScribePoints) : 0;

  // Completed lessons stats
  const completedLessonsCount = progressData.completedLessons.length;
  const totalLessonsCount = INITIAL_LESSON_MODULES.length;
  const lessonsCompletionPercent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  // Badges calculation
  const fullBadges = ALL_ACHIEVEMENT_BADGES.map((b) => ({
    ...b,
    isUnlocked: progressData.unlockedBadgeIds.includes(b.id)
  }));
  const unlockedBadgesCount = fullBadges.filter(b => b.isUnlocked).length;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      soundFX.playClickSound();
      studentProgress.updateStudentProfile(nameInput.trim(), progressData.avatarIcon);
      setIsEditingName(false);
    }
  };

  const handleSelectAvatar = (av: string) => {
    soundFX.playClickSound();
    studentProgress.updateStudentProfile(progressData.studentName, av);
  };

  const handleSimulateAddPoints = (amount: number, reason: string) => {
    soundFX.playSuccessSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    studentProgress.addPoints(amount, reason, 'تجربة وتحفيز');
  };

  const handleToggleLessonComplete = (lesson: LearningLessonModule) => {
    const isAlreadyCompleted = progressData.completedLessons.includes(lesson.id);
    if (!isAlreadyCompleted) {
      soundFX.playSuccessSound();
      studentProgress.completeLesson(lesson.id);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundFX.playClickSound();
      // Navigate to the lesson
      onSelectMode(lesson.targetMode);
    }
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين إحصائيات ونقاط الكاتب إلى وضع البداية؟')) {
      soundFX.playClickSound();
      studentProgress.resetProgress();
    }
  };

  return (
    <div className="space-y-12 text-right">
      
      {/* Hero Student Profile & Scribe Rank Banner */}
      <div className="bg-gradient-to-br from-[#FAF5E8] via-white to-[#F5EEDB] border-2 border-amber-800/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
        
        {/* Background Hieroglyphic Seal */}
        <div className="absolute top-2 left-6 text-9xl font-hieroglyphs opacity-10 select-none pointer-events-none text-amber-950">
          {currentRank.badgeIcon}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 border-b border-amber-200/80 pb-6">
          
          {/* Avatar & Student Name */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-900 text-amber-100 border-4 border-amber-400 shadow-md flex items-center justify-center font-hieroglyphs text-4xl sm:text-5xl shrink-0">
                {progressData.avatarIcon}
              </div>
              
              {/* Quick Avatar Switcher Dropdown on hover/click */}
              <div className="absolute -bottom-2 -left-2 flex gap-1 bg-white p-1 rounded-xl shadow-md border border-stone-200">
                {AVATARS.slice(0, 3).map((av) => (
                  <button
                    key={av}
                    onClick={() => handleSelectAvatar(av)}
                    className="w-5 h-5 flex items-center justify-center font-hieroglyphs text-xs hover:bg-amber-100 rounded"
                    title="تغيير الشعار"
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-800 text-white text-xs font-bold font-mono">
                  المستوى {currentRank.level}
                </span>
                
                {/* Daily Streak Flame */}
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-300 text-orange-950 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600 animate-pulse" />
                  <span>{progressData.dailyStreakDays} أيام متتالية</span>
                </div>
              </div>

              {/* Student Name */}
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2.5 py-1 text-base font-bold bg-white border border-amber-400 rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1.5 bg-amber-800 text-white rounded-lg hover:bg-amber-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
                      {progressData.studentName}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-stone-600 hover:text-amber-800 transition-colors"
                      title="تعديل الاسم"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Scribe Rank Title */}
              <div className="text-sm sm:text-base font-bold text-amber-900 font-serif-ar flex items-center gap-2">
                <span>الرتبة الأثرية: <strong>{currentRank.titleAr}</strong></span>
                <span className="font-hieroglyphs text-lg text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-300/60">
                  {currentRank.titleHieroglyphs}
                </span>
              </div>
            </div>
          </div>

          {/* Points & Level Progression Card */}
          <div className="bg-white/95 p-5 rounded-2xl border-2 border-amber-300 shadow-2xs space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600">
              <span>التقدم نحو الرتبة التالية</span>
              <span className="font-mono text-amber-900">{progressPercent}%</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div
                className="h-full bg-gradient-to-l from-amber-800 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="text-xs text-stone-700 leading-snug">
              {nextRank ? (
                <>
                  تحتاج إلى <strong className="font-mono font-bold text-amber-950">{pointsNeeded}</strong> نقطة إضافية لبلوغ رتبة:
                  <div className="font-bold text-amber-900 font-display-eg mt-0.5">
                    «{nextRank.titleAr}» ({nextRank.badgeIcon})
                  </div>
                </>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>بلغت أعلى درجات الحكمة والخلود!</span>
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Rank Lore & Privileges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>وصف مكانة رتبتك الحالية:</span>
            </span>
            <p className="text-stone-700 font-serif-ar leading-relaxed">
              {currentRank.descriptionAr}
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60 space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>الامتيازات والصلاحيات الملكية المتاحة:</span>
            </span>
            <p className="text-stone-700 font-serif-ar leading-relaxed">
              {currentRank.privilegeAr}
            </p>
          </div>
        </div>

      </div>

      {/* Daily Quests & Learning Rituals Schedule (جدول المهام والتحديات اليومية والأسبوعية) */}
      <DailyQuestsSchedule onSelectMode={onSelectMode} />

      {/* 4 Interactive Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Points */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-2 text-right">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>مجموع نقاط الكاتب</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-hieroglyphs text-lg">
              𓋹
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-900 font-mono tabular-nums">
            {progressData.totalScribePoints}
          </div>
          <div className="text-[11px] text-stone-500 font-serif-ar">
            تجمع عبر الألعاب، القاموس، وفحص البرديات
          </div>
        </div>

        {/* Card 2: Completed Lessons */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-2 text-right">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>الدروس المكتملة</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ✓
            </span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-900 font-mono tabular-nums">
            {completedLessonsCount} / {totalLessonsCount}
          </div>
          <div className="text-[11px] text-stone-500 font-serif-ar">
            {lessonsCompletionPercent}% من المنهج التعليمي الشامل
          </div>
        </div>

        {/* Card 3: Top Game Score */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-2 text-right">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>أعلى رقم قياسي في الألعاب</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-700" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-900 font-mono tabular-nums">
            {progressData.gameHighScores.speedQuiz}
          </div>
          <div className="text-[11px] text-stone-500 font-serif-ar">
            في تحدي سرعة الكاتب (6 ألعاب متاحة)
          </div>
        </div>

        {/* Card 4: Unlocked Badges */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-2xs space-y-2 text-right">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>الأوسمة والتمائم الملكية</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-700" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-amber-900 font-mono tabular-nums">
            {unlockedBadgesCount} / {fullBadges.length}
          </div>
          <div className="text-[11px] text-stone-500 font-serif-ar">
            تمائم ذهبية توثق إنجازاتك
          </div>
        </div>

      </div>

      {/* Learning Path & Curriculum Modules Roadmap */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>خريطة المسار التعليمي (Scribe Curriculum Roadmap)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
              منهج مدرسة الكاتب المصري خطوة بخطوة
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateAddPoints(50, 'إكمال ممارسة سريعة للرموز')}
              className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>+50 نقطة كاتب (تجربة فورية)</span>
            </button>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-3">
          {INITIAL_LESSON_MODULES.map((mod, index) => {
            const isCompleted = progressData.completedLessons.includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'bg-[#FAF8F3] border-emerald-300/80' 
                    : 'bg-white border-stone-200 hover:border-amber-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-stone-800">{mod.titleAr}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {mod.categoryAr}
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        ~{mod.estimatedMinutes} دقيقة · +{mod.pointsReward} نقطة
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-serif-ar leading-relaxed">
                      {mod.descriptionAr}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleToggleLessonComplete(mod)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-amber-900 hover:bg-amber-800 text-white shadow-xs'
                    }`}
                  >
                    <span>{isCompleted ? 'مكتمل ✓ (مراجعة)' : 'ابدأ الدرس الآن'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Game High Scores & Competitions Record */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-700" />
              <span>سجل بطولات وألعاب الكاتب (Game High Scores)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
              أرقامك القياسية ومستوياتك التنافسية
            </h3>
          </div>

          <button
            onClick={() => onSelectMode('games')}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs self-start sm:self-center"
          >
            الانتقال لساحة الألعاب (6 ألعاب) ➔
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Game New: Stone Carving */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 to-amber-50 border-2 border-amber-400 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="flex items-center gap-1.5">
                <span>🔨 نقش الحجر الملكي</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-700 text-white rounded-md font-bold">جديد</span>
              </span>
              <span className="text-amber-900 font-mono text-base font-extrabold">
                {progressData.gameHighScores.stoneCarving || 0} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-700 font-serif-ar">
              اختيار الأداة النحاتية الصحيحة وطرق الحجر لنحت الرموز الهيروغليفية في الصخور الملكية.
            </p>
          </div>

          {/* Game: Temple Runes Decipher */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-300 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="flex items-center gap-1.5">
                <span>🗝️ فك طلاسم المعبد</span>
              </span>
              <span className="text-amber-900 font-mono text-base font-extrabold">
                {progressData.gameHighScores.templeRunes || 0} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-700 font-serif-ar">
              ترتيب أحجار الجمل الهيروغليفية لفك مزلاج الصرح وفتح بوابة المعبد الكبرى.
            </p>
          </div>

          {/* Game 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>تحدي الذاكرة الموقوتة</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.flashMemory} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              اختبار التعرف السريع على الرموز في 3 إلى 6 ثوانٍ مع 3 قلوب.
            </p>
          </div>

          {/* Game 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>سباق مفردات الكاتب السريع</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.speedQuiz} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              مؤقت 45 ثانية لتخمين معاني الكلمات مع مضاعف الإجابات المتتالية.
            </p>
          </div>

          {/* Game 3 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>لغز تركيب وبناء الكلمات</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.wordBuilder} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              ترتيب الحروف الهيروغليفية لتشكيل الكلمات الصحيحة.
            </p>
          </div>

          {/* Game 4 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>تقليب بطاقات الكرنك التذكارية</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.memoryCards} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              مطابقة الرمز الهيروغليفي بصورته التوضيحية بأقل عدد من الحركات.
            </p>
          </div>

          {/* Game 5 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>انتصارات مبارزة الأصدقاء</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.versusWins} انتصار
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              الفوز في الغرف التنافسية الفورية ضد الأصدقاء أو الكاتب أمنحتب.
            </p>
          </div>

          {/* Game 6 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>امتحان الكاتب الملكي</span>
              <span className="text-amber-800 font-mono text-base font-extrabold">
                {progressData.gameHighScores.royalExamScore} نقطة
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif-ar">
              الامتحان الشامل لقياس المعارف الأثرية والتاريخية واللغوية.
            </p>
          </div>

        </div>

      </div>

      {/* Royal Badges & Achievements Cabinet */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              <span>معرض الأوسمة والتمائم الملكية (Royal Badges Cabinet)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
              أوسمة الإنجاز والتميز ({unlockedBadgesCount} مفتوح من {fullBadges.length})
            </h3>
          </div>

          <span className="text-xs text-stone-500 font-serif-ar hidden sm:block">
            انقر على أي وسام لقراءة قصته الأثرية
          </span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {fullBadges.map((badge) => {
            const isUnlocked = badge.isUnlocked;
            return (
              <button
                key={badge.id}
                onClick={() => {
                  soundFX.playClickSound();
                  setSelectedBadge(badge);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
                  isUnlocked
                    ? 'bg-amber-50/80 border-amber-500/80 hover:border-amber-700 shadow-2xs hover:scale-105'
                    : 'bg-stone-50/60 border-stone-200 opacity-50 grayscale hover:grayscale-0'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-hieroglyphs text-2xl shadow-xs ${
                  isUnlocked ? 'bg-amber-800 text-amber-200' : 'bg-stone-200 text-stone-400'
                }`}>
                  {badge.hieroglyph}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-stone-900 line-clamp-1">
                    {badge.titleAr}
                  </h4>
                  <div className="text-[10px] text-stone-500 line-clamp-1 font-serif-ar">
                    {badge.requirementText}
                  </div>
                </div>

                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isUnlocked ? 'bg-amber-200/70 text-amber-950' : 'bg-stone-200 text-stone-600'
                }`}>
                  {isUnlocked ? '✓ مفتوح' : `+${badge.pointsReward} نقطة`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Badge Lore Drawer */}
        {selectedBadge && (
          <div className="p-5 bg-gradient-to-r from-amber-900 to-stone-900 text-white rounded-2xl shadow-md space-y-2 animate-fadeIn border-2 border-amber-600/40">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>القصة الأثرية لوسام «{selectedBadge.titleAr}»:</span>
              </span>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-stone-300 hover:text-white"
              >
                ✕ إغلاق
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 font-serif-ar leading-relaxed">
              {selectedBadge.ancientLore}
            </p>
            <div className="text-[11px] text-amber-200/90 pt-1 font-mono">
              شرط الحصول: {selectedBadge.requirementText}
            </div>
          </div>
        )}

      </div>

      {/* Recent Activity Log & Reset Footer */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <History className="w-4 h-4 text-amber-700" />
            <span>سجل الأنشطة والنقاط الأخيرة</span>
          </span>

          <button
            onClick={handleReset}
            className="text-xs text-stone-600 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين التقدم</span>
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {progressData.recentActivityLog.slice(0, 5).map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="font-medium text-stone-800">{log.actionAr}</span>
                <span className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                  {log.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold font-mono text-emerald-800">+{log.points} نقطة</span>
                <span className="text-[11px] text-stone-600">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
