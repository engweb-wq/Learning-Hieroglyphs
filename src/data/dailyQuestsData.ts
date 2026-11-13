import { DailyQuestTask, AudienceMode } from '../types';

export interface DailyFocusLesson {
  id: string;
  titleAr: string;
  taglineAr: string;
  categoryAr: string;
  glyphIcon: string;
  estimatedMinutes: number;
  pointsReward: number;
  targetMode: AudienceMode;
  descriptionAr: string;
  keyTakeaways: string[];
}

export interface DailyQuickChallenge {
  id: string;
  titleAr: string;
  shortGoalAr: string;
  glyphIcon: string;
  pointsReward: number;
  targetMode: AudienceMode;
  hintAr: string;
}

export const TODAY_FOCUS_LESSON: DailyFocusLesson = {
  id: 'lesson_today_ankh_transposition',
  titleAr: 'أسرار علامة العنخ 𓋹 وقاعدة التقديم الشرفي',
  taglineAr: 'درس اليوم الموصى به لترقية رتبتك إلى «كاتب بيت الحياة»',
  categoryAr: 'علم الرموز وقواعد الخراطيش',
  glyphIcon: '𓋹',
  estimatedMinutes: 5,
  pointsReward: 40,
  targetMode: 'tutor',
  descriptionAr: 'تعرف على القيمة الصوتية لعلامة العنخ الثلاثية (S34) وكيف كان يكتب الكاتب المصري اسم الإله أو الملك أولاً تقديماً شرفياً في الخراطيش الملكية.',
  keyTakeaways: [
    'العنخ 𓋹 علامة ثلاثية الصوت تمثل رباط الصندل الجلدي أو حزام الحياة',
    'التقديم الشرفي: يكتب [رع] أولاً في الخرطوشة، لكنه يقرأ في آخر الاسم النحوي',
    'العبارة الشهيرة «عنخ ودجا سنب» 𓋹𓍑𓋴 تعني حياة ورخاء وصحة للفرعون'
  ]
};

export const TODAY_QUICK_CHALLENGE: DailyQuickChallenge = {
  id: 'challenge_today_antonyms',
  titleAr: 'تحدي المتضادات الكونية السريع',
  shortGoalAr: 'اختر متضاد علامة النور والضياء 𓌉𓆓 في معجم المتضادات',
  glyphIcon: '𓌉',
  pointsReward: 35,
  targetMode: 'dictionary',
  hintAr: 'تذكر أن نقيض النور (حج/وبن) هو الظلام الدامس وعتمة السماء (ككو 𓎡𓎡𓅱).'
};

export const WEEKLY_SCRIBE_QUESTS: DailyQuestTask[] = [
  {
    id: 'quest_sat',
    dayNameAr: 'السبت',
    titleAr: 'إتقان 5 حروف أحادية جديدة بالصوت',
    descriptionAr: 'استمع إلى النطق الصوتي الدقيق لخمسة حروف صامتة في جدول الأبجدية الأحادية.',
    categoryAr: 'الحروف والأصوات',
    targetMode: 'dictionary',
    estimatedMinutes: 5,
    pointsReward: 25,
    isCompleted: true,
    actionLabelAr: 'فتح جدول الحروف'
  },
  {
    id: 'quest_sun',
    dayNameAr: 'الأحد',
    titleAr: 'خوض جولة في لعبة فلاش الذاكرة السريعة',
    descriptionAr: 'تحد نفسك في الربط بين الرمز الهيروغليفي ونطقه قبل نفاد العداد الموقوت.',
    categoryAr: 'ألعاب الكاتب',
    targetMode: 'games',
    estimatedMinutes: 4,
    pointsReward: 30,
    isCompleted: true,
    actionLabelAr: 'دخول ساحة الألعاب'
  },
  {
    id: 'quest_mon',
    dayNameAr: 'الإثنين',
    titleAr: 'اكتشاف 3 كلمات حية مشتركة مع العامية',
    descriptionAr: 'تعرف على أصول كلمات مثل «مَمْ» و«فول مدمس» و«تاتا» في قسم التراث الحي.',
    categoryAr: 'التراث والجذور',
    targetMode: 'heritage',
    estimatedMinutes: 6,
    pointsReward: 25,
    isCompleted: true,
    actionLabelAr: 'استكشاف الكلمات الحية'
  },
  {
    id: 'quest_tue',
    dayNameAr: 'الثلاثاء',
    titleAr: 'محاورة المعلم عمر سليم وحل تمرين نحوي',
    descriptionAr: 'اسأل المعلم عمر سليم في بيت الحياة وحل الاختبار القصير التفاعلي المصاحب.',
    categoryAr: 'الحوار والتعليم الذكي',
    targetMode: 'tutor',
    estimatedMinutes: 7,
    pointsReward: 35,
    isCompleted: true,
    actionLabelAr: 'مجلس المعلم عمر'
  },
  {
    id: 'quest_wed',
    dayNameAr: 'الأربعاء',
    titleAr: 'فحص نقش أثري عبر ماسح الذكاء الاصطناعي',
    descriptionAr: 'استخدم كاميرتك أو اختر عينة من خرطوشة توت عنخ آمون واستخرج أكواد جاردنر.',
    categoryAr: 'الرؤية الحاسوبية',
    targetMode: 'scanner',
    estimatedMinutes: 6,
    pointsReward: 35,
    isCompleted: false,
    actionLabelAr: 'تشغيل ماسح النقوش'
  },
  {
    id: 'quest_thu',
    dayNameAr: 'الخميس',
    titleAr: 'قراءة فقرة هيروغليفية من معرض البرديات',
    descriptionAr: 'تأمل السطور المكتوبة بالمدادين الأسود والأحمر واستمع للترجمة الفورية.',
    categoryAr: 'البرديات القديمة',
    targetMode: 'papyri',
    estimatedMinutes: 8,
    pointsReward: 30,
    isCompleted: false,
    actionLabelAr: 'تصفح البرديات'
  },
  {
    id: 'quest_fri',
    dayNameAr: 'الجمعة',
    titleAr: 'مراجعة معجم المتضادات والثنائيات الكونية',
    descriptionAr: 'تأمل ثنائية ماعت وإسفت (الحق والباطل) وأتقن توظيفها في الجمل البسيطة.',
    categoryAr: 'المتضادات اللغوية',
    targetMode: 'dictionary',
    estimatedMinutes: 6,
    pointsReward: 40,
    isCompleted: false,
    actionLabelAr: 'معجم المتضادات'
  }
];
