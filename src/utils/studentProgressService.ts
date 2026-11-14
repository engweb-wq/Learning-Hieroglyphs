import { StudentProgressData, ScribeRank, AchievementBadge, LearningLessonModule } from '../types';
import { soundFX } from './soundEffects';

export const SCRIBE_RANKS: ScribeRank[] = [
  {
    id: 'rank-apprentice',
    level: 1,
    titleAr: 'تلميذ كاتب مبتدئ',
    titleHieroglyphs: '𓀀 𓏞',
    minPoints: 0,
    maxPoints: 149,
    descriptionAr: 'يخطو خطواته الأولى في مدرسة المعبد؛ يتعلم الإمساك بقلم البوص ونقش الحروف الأبجدية على ألواح الفخار والحجر الجيري.',
    privilegeAr: 'الوصول لدروس الحروف الأساسية والقاموس المصور الصغير',
    badgeIcon: '𓀀'
  },
  {
    id: 'rank-scribe-tablets',
    level: 2,
    titleAr: 'كاتب الألواح والبردي',
    titleHieroglyphs: '𓏞 𓏛',
    minPoints: 150,
    maxPoints: 399,
    descriptionAr: 'أتقن رسم العلامات الأحادية والثنائية، وسُمح له بحمل محبرة الكاتب المصنوعة من خشب الأبنوس والمدادين الأسود والأحمر.',
    privilegeAr: 'فتح ألعاب الذاكرة الموقوتة وصانع الخراطيش الملكية المتقدم',
    badgeIcon: '𓏞'
  },
  {
    id: 'rank-per-ankh',
    level: 3,
    titleAr: 'كاتب بيت الحياة (بر-عنخ)',
    titleHieroglyphs: '𓉐 𓋹 𓏞',
    minPoints: 400,
    maxPoints: 799,
    descriptionAr: 'كاتب متمكن يعمل في دار الوثائق الكبرى والعلوم؛ يقرأ نصوص الأدب الكلاسيكي وبرديات الطب وعلم الفلك.',
    privilegeAr: 'الوصول لفك شفرات البرديات النادرة والمبارزات السريعة',
    badgeIcon: '𓉐'
  },
  {
    id: 'rank-royal-scribe',
    level: 4,
    titleAr: 'الكاتب الملكي المشرف',
    titleHieroglyphs: '𓇓 𓏞 𓄤',
    minPoints: 800,
    maxPoints: 1499,
    descriptionAr: 'من كبار مسؤولي البلاط الفرعوني؛ يحرر المراسيم الملكية ويصيغ خراطيش الفراعنة الذهبية ويوجه معاهد الكتبة في طيبة ومنف.',
    privilegeAr: 'تاج الكاتب الملكي الذهبي ولقب الشرف في حلبة المبارزات',
    badgeIcon: '𓇓'
  },
  {
    id: 'rank-high-sage',
    level: 5,
    titleAr: 'الحكيم الأعظم ومستشار الفرعون',
    titleHieroglyphs: '𓊹 𓇓 𓀔',
    minPoints: 1500,
    maxPoints: 999999,
    descriptionAr: 'أعلى رتبة علمية وثقافية في مصر القديمة (على خطى المهندس الحكيم إمحوتب)؛ خبير في أسرار اللاهوت والهندسة واللغة الخالدة.',
    privilegeAr: 'خاتم الحكمة الأبدي وعضوية مجلس كبار حكماء مصر',
    badgeIcon: '👑'
  }
];

export const ALL_ACHIEVEMENT_BADGES: Omit<AchievementBadge, 'isUnlocked' | 'unlockedAt'>[] = [
  {
    id: 'badge-ankh-first-steps',
    titleAr: 'مفتاح المعرفة الأول',
    hieroglyph: '𓋹',
    descriptionAr: 'الحصول على أول 100 نقطة كاتب في رحلة التعلم.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 50,
    requirementText: 'اجمع 100 نقطة كاتب',
    ancientLore: 'كان رمز عنخ أول تميمة يحملها الكاتب في عنقه تيمناً بالحياة والبركة.'
  },
  {
    id: 'badge-thoth-pen',
    titleAr: 'ريشة الإله تحوت',
    hieroglyph: '𓏞',
    descriptionAr: 'إكمال 3 دروس تعليمية وممارسة رسم الرموز بالفرشاة.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 60,
    requirementText: 'أكمل 3 دروس تعليمية بنجاح',
    ancientLore: 'تحوت هو إله الحكمة والكتابة، صانع الحروف وسيد المداد المقدس.'
  },
  {
    id: 'badge-royal-cartouche',
    titleAr: 'صائغ الخرطوشة الملكية',
    hieroglyph: '𓇓',
    descriptionAr: 'صياغة اسمك في خرطوشة فرعونية ملكية ومشاركتها.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 40,
    requirementText: 'أنشئ أول خرطوشة ملكية باسمك',
    ancientLore: 'الخرطوشة (شنو) حبل سحري بيضاوي يحيط باسم الملك لحمايته من الأذى.'
  },
  {
    id: 'badge-owl-wisdom',
    titleAr: 'حكمة البومة (صوت الميم)',
    hieroglyph: '𓅓',
    descriptionAr: 'الاستماع لنطق 20 حرفاً وكلمة في القاموس الصوتي.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 45,
    requirementText: 'استمع للنطق الصوتي لـ 20 كلمة',
    ancientLore: 'البومة هي الطائر الوحيد الذي رُسم وجهه مواجهاً للناظر تعبيراً عن اليقظة.'
  },
  {
    id: 'badge-flash-champion',
    titleAr: 'فارس الذاكرة الموقوتة',
    hieroglyph: '⚡',
    descriptionAr: 'تحقيق أكثر من 150 نقطة في لعبة الذاكرة السريعة.',
    category: 'games',
    categoryAr: 'الألعاب والتحديات',
    pointsReward: 75,
    requirementText: 'حقق 150 نقطة في لعبة الذاكرة الموقوتة',
    ancientLore: 'كان يُشترط في كاتب الفرعون سرعة البديهة وحفظ آلاف الرموز في لمح البصر.'
  },
  {
    id: 'badge-papyrus-master',
    titleAr: 'سيد بيت الحياة (بر-عنخ)',
    hieroglyph: '𓉐',
    descriptionAr: 'فحص وفك شفرات 3 برديات تاريخية في معرض البرديات.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 80,
    requirementText: 'ادرس 3 برديات في معرض البرديات',
    ancientLore: 'بيت الحياة كان مركز حفظ أثمن المخطوطات والخرائط الفلكية والطبية.'
  },
  {
    id: 'badge-living-words',
    titleAr: 'حارس التراث الحي',
    hieroglyph: '📜',
    descriptionAr: 'استكشاف 15 كلمة مصرية قديمة لا تزال حية في العامية المعاصرة.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 50,
    requirementText: 'استكشف 15 كلمة من الكلمات الحية المشتركة',
    ancientLore: 'اللسان المصري لم يمت قط، بل واصل التدفق في أكلاتنا وأمثالنا الشعبية.'
  },
  {
    id: 'badge-versus-champion',
    titleAr: 'بطل حلبة مبارزة الكتبة',
    hieroglyph: '⚔️',
    descriptionAr: 'الفوز في مبارزة تنافسية في وضع تحدي الأصدقاء.',
    category: 'community',
    categoryAr: 'التنافس والأصدقاء',
    pointsReward: 100,
    requirementText: 'فز في مبارزة واحدة على الأقل في تحدي الأصدقاء',
    ancientLore: 'مناظرات الكتبة في باحة المعبد كانت المناسبة العلمية الأرفع شأناً في مصر.'
  },
  {
    id: 'badge-timeline-scholar',
    titleAr: 'مؤرخ العصور الخمسة',
    hieroglyph: '⏳',
    descriptionAr: 'استعراض تطور الخط في الخريطة الزمنية حتى المرحلة القبطية.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 60,
    requirementText: 'أكمل التنقل عبر العصور الخمسة في الخريطة الزمنية',
    ancientLore: 'تحول الخط من النحت الصخري إلى حبر البردي واللسان الحي عبر 3500 عام.'
  },
  {
    id: 'badge-video-artist',
    titleAr: 'فنان ريشة البوص المتحركة',
    hieroglyph: '🎬',
    descriptionAr: 'مشاهدة وممارسة 5 مقاطع فيديو في قاموس الفيديو التفاعلي.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 70,
    requirementText: 'شاهد وتدرب على 5 مقاطع في قاموس الفيديو',
    ancientLore: 'رسم الرمز بقلم البوص المشطوف فن هندسي يجمع بين الموسيقى والتشكيل.'
  },
  {
    id: 'badge-sacred-fauna',
    titleAr: 'عالم كائنات النيل المقدسة',
    hieroglyph: '𓅃',
    descriptionAr: 'استكشاف دلالات ونطق رموز الحيوانات والطيور الـ 16 في القاموس المصور.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 85,
    requirementText: 'استكشف رموز الحيوانات والطيور ودلالاتها الأثرية',
    ancientLore: 'كان الصقر حورس والبومة إم وأبو منجل تحوت تجسيدات إلهية للأصوات والعلوم.'
  },
  {
    id: 'badge-weekly-quest-master',
    titleAr: 'تاج الكاتب الأسبوعي المذهب',
    hieroglyph: '👑',
    descriptionAr: 'إكمال جدول المهام التعليمية الأسبوعية والمواظبة على طقس التعلم اليومي.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 150,
    requirementText: 'أكمل جميع مهام جدول التعلم الأسبوعي',
    ancientLore: 'المثابرة اليومية هي ركيزة النجاح في مدارس الكتبة الملكية منذ عهد خوفو.'
  },
  {
    id: 'badge-sacred-flora',
    titleAr: 'سيد حدائق اللوتس والبردي (𓆸)',
    hieroglyph: '𓆸',
    descriptionAr: 'استكشاف رموز النباتات والزهور ودلالاتها في النصوص الجنائزية واليومية.',
    category: 'learning',
    categoryAr: 'مسار التعلم',
    pointsReward: 90,
    requirementText: 'استكشف رموز النباتات والزهور في معجم الفلورا المصرية',
    ancientLore: 'اللوتس الأزرق وبردي الدلتا كانا رمزي الانبعاث والشباب المتجدد في مصر القديمة.'
  },
  {
    id: 'badge-gardner-master',
    titleAr: 'سيد طريقة جاردنر وقواعد الاتجاه (𓏞)',
    hieroglyph: '𓏞',
    descriptionAr: 'إتقان صياغة الجمل الهيروغليفية بأكواد جاردنر والتحقق من اتجاه النظر للرموز.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 120,
    requirementText: 'أتقن صياغة جمل كاملة وتأكد من اتجاه القراءة الأثري',
    ancientLore: 'كان كاتب البلاط يتقن كتابة نفس الجملة من اليمين أو اليسار دون الإخلال بوجه الكائنات.'
  },
  {
    id: 'badge-pharaohs-historian',
    titleAr: 'مؤرخ ملوك وفراعنة النيل (👑)',
    hieroglyph: '👑',
    descriptionAr: 'استكشاف سيرة وخراطيش ملوك مصر القديمة قبل الميلاد من نعرمر إلى كليوباترا.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 130,
    requirementText: 'استكشف سير وخراطيش ملوك الفراعنة في سجل الملوك',
    ancientLore: 'كان الفرعون وسيطاً بين السماء والأرض وحامياً لنظام ماعت الكوني من الفوضى.'
  },
  {
    id: 'badge-architecture-master',
    titleAr: 'مهندس صروح الخلود (🏛️)',
    hieroglyph: '𓉴',
    descriptionAr: 'استكشاف الفروق الجوهرية بين الأهرامات، والمعابد الجنائزية، ومعابد الآلهة ومخططاتها المعمارية.',
    category: 'mastery',
    categoryAr: 'الإتقان والمهارة',
    pointsReward: 130,
    requirementText: 'استكشف مخططات العمارة المصرية القديمة ومصطلحاتها',
    ancientLore: 'كان المعمار المصري مثل إمحوتب وسنموت ينحت الحجر ليتطابق مع حركة النجوم والأفق الأزلي.'
  }
];

export const INITIAL_LESSON_MODULES: LearningLessonModule[] = [
  {
    id: 'mod-alphabet',
    titleAr: 'الحروف الهيروغليفية الأحادية (24 حرفاً)',
    targetMode: 'kids',
    categoryAr: 'الأساسيات الأبجدية',
    estimatedMinutes: 15,
    pointsReward: 80,
    descriptionAr: 'تعرف على الرموز التصويرية التي تمثل الأصوات الأبجدية الأساسية مع النطق الصوتي.',
    isCompleted: true,
    totalItems: 24,
    completedItems: 24
  },
  {
    id: 'mod-dictionary-50',
    titleAr: 'القاموس المصور الشامل (50 مفردة أساسية)',
    targetMode: 'dictionary',
    categoryAr: 'المفردات اللغوية',
    estimatedMinutes: 25,
    pointsReward: 120,
    descriptionAr: 'قاموس مصور يغطي مفردات الطبيعة والجسد والأسرة والحيوانات مع النطق والأصل العربي.',
    isCompleted: true,
    totalItems: 50,
    completedItems: 38
  },
  {
    id: 'mod-living-words',
    titleAr: 'الكلمات الحية المشتركة مع العامية',
    targetMode: 'heritage',
    categoryAr: 'التراث واللسان الحي',
    estimatedMinutes: 20,
    pointsReward: 100,
    descriptionAr: 'استكشاف الأصول الفرعونية لألفاظنا اليومية: فول مدمس، تاتا، كاني وماني، إمبو، وحوي...',
    isCompleted: true,
    totalItems: 20,
    completedItems: 16
  },
  {
    id: 'mod-timeline-evolution',
    titleAr: 'الخريطة الزمنية وتطور الخطوط',
    targetMode: 'timeline',
    categoryAr: 'التاريخ وعلم الخطوط',
    estimatedMinutes: 15,
    pointsReward: 90,
    descriptionAr: 'متابعة تحول الرموز من الدولة القديمة للهيراطيقية والديموطيقية والقبطية.',
    isCompleted: false,
    totalItems: 5,
    completedItems: 3
  },
  {
    id: 'mod-famous-papyri',
    titleAr: 'معرض البرديات والوثائق النبوية وفك شفراتها',
    targetMode: 'papyri',
    categoryAr: 'المخطوطات الأثرية',
    estimatedMinutes: 35,
    pointsReward: 160,
    descriptionAr: 'قراءة وتحليل برديات آني وسنوهي وإيبور وأنستاسي السادسة ولوحة المجاعة والبهنسا وقمران مع الترجمة الفورية.',
    isCompleted: false,
    totalItems: 11,
    completedItems: 2
  },
  {
    id: 'mod-video-dictionary',
    titleAr: 'قاموس الفيديو التفاعلي ومخارج النطق',
    targetMode: 'video_dict',
    categoryAr: 'التعلم البصري والسمعي',
    estimatedMinutes: 20,
    pointsReward: 110,
    descriptionAr: 'مقاطع فيديو خطوة بخطوة لرسم الرموز بقلم البوص وتشريح مخارج الأصوات.',
    isCompleted: false,
    totalItems: 12,
    completedItems: 4
  },
  {
    id: 'mod-cartouche-master',
    titleAr: 'صانع الخرطوشة الملكية وكتابة الأسماء',
    targetMode: 'adults',
    categoryAr: 'الفنون الملكية والتطبيق',
    estimatedMinutes: 10,
    pointsReward: 70,
    descriptionAr: 'صياغة اسمك بالحروف الهيروغليفية داخل الخرطوش الملكي المذهب مع التنزيل والمشاركة.',
    isCompleted: true,
    totalItems: 1,
    completedItems: 1
  },
  {
    id: 'mod-ai-scanner',
    titleAr: 'ماسح النقوش الأثرية بالذكاء الاصطناعي',
    targetMode: 'scanner',
    categoryAr: 'البحث الأثري والرؤية الحاسوبية',
    estimatedMinutes: 15,
    pointsReward: 90,
    descriptionAr: 'مسح صور النقوش، فك شفرة أكواد جاردنر، وتحديد اتجاه القراءة مع التزام الأمانة العلمية الصارمة.',
    isCompleted: false,
    totalItems: 4,
    completedItems: 1
  },
  {
    id: 'mod-ai-tutor',
    titleAr: 'مجلس المعلم الفرعوني عمر سليم',
    targetMode: 'tutor',
    categoryAr: 'الحوار اللغوي وتدريبات بيت الحياة',
    estimatedMinutes: 25,
    pointsReward: 120,
    descriptionAr: 'محاورة المعلم عمر سليم، التمرس في قواعد الجمل، وحل التمارين التفاعلية الموثقة أكاديمياً.',
    isCompleted: false,
    totalItems: 5,
    completedItems: 2
  },
  {
    id: 'mod-antonyms',
    titleAr: 'معجم المتضادات والثنائيات الكونية',
    targetMode: 'dictionary',
    categoryAr: 'المفردات والنظام اللغوي',
    estimatedMinutes: 20,
    pointsReward: 95,
    descriptionAr: 'استكشاف الكلمات الهيروغليفية المتناقضة وتوظيفها في الجمل البسيطة وحل تحدي المتضادات.',
    isCompleted: false,
    totalItems: 12,
    completedItems: 3
  },
  {
    id: 'mod-sacred-fauna',
    titleAr: 'رموز الحيوانات والطيور المقدسة (16 كائناً)',
    targetMode: 'dictionary',
    categoryAr: 'عالم الحيوان والرمزية الدينية',
    estimatedMinutes: 20,
    pointsReward: 100,
    descriptionAr: 'دراسة رمزية الحيوانات والطيور في نصوص الأهرام وكتاب الموتى مع النطق والمدلولات الثقافية.',
    isCompleted: false,
    totalItems: 16,
    completedItems: 6
  },
  {
    id: 'mod-sacred-flora',
    titleAr: 'رموز النباتات والزهور المقدسة (14 نبتة وزهرة)',
    targetMode: 'dictionary',
    categoryAr: 'عالم النبات والرموز الكونية',
    estimatedMinutes: 20,
    pointsReward: 100,
    descriptionAr: 'دراسة رمزية اللوتس، البردي، الجميز، والكتان في النصوص الجنائزية وكتاب الموتى والحياة اليومية.',
    isCompleted: false,
    totalItems: 14,
    completedItems: 4
  },
  {
    id: 'mod-gardner-sentences',
    titleAr: 'مختبر كتابة الجمل بطريقة جاردنر وفحص الاتجاه',
    targetMode: 'adults',
    categoryAr: 'التدوين الأكاديمي والتحليل',
    estimatedMinutes: 20,
    pointsReward: 110,
    descriptionAr: 'صياغة الجمل الكاملة بأكواد جاردنر المعيارية مع التحقق التلقائي من قاعدة وجوه الكائنات.',
    isCompleted: false,
    totalItems: 5,
    completedItems: 2
  },
  {
    id: 'mod-pharaohs-chronicle',
    titleAr: 'سجل ملوك وفراعنة مصر القديمة قبل الميلاد',
    targetMode: 'pharaohs',
    categoryAr: 'التاريخ الملكي والخراطيش',
    estimatedMinutes: 25,
    pointsReward: 120,
    descriptionAr: 'التعرف على خراطيش وسير 20+ من أعظم ملوك مصر القديمة، آثارهم الخالدة، والاستماع لنطق أسمائهم.',
    isCompleted: false,
    totalItems: 20,
    completedItems: 8
  },
  {
    id: 'mod-architecture',
    titleAr: 'مختبر العمارة المصرية القديمة ومخططات المعابد',
    targetMode: 'architecture',
    categoryAr: 'الهندسة وفلسفة الخلود',
    estimatedMinutes: 20,
    pointsReward: 125,
    descriptionAr: 'استكشاف الفروق بين الأهرامات ومعابد ملايين السنين الجنائزية ومعابد الآلهة، مع فحص المخططات التفاعلية.',
    isCompleted: false,
    totalItems: 12,
    completedItems: 4
  }
];

const STORAGE_KEY = 'egyptian_scribe_student_progress_v2';

const DEFAULT_PROGRESS: StudentProgressData = {
  studentName: 'الكاتب أحمد',
  avatarIcon: '𓇓',
  totalScribePoints: 345,
  dailyStreakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['mod-alphabet', 'mod-dictionary-50', 'mod-living-words', 'mod-cartouche-master'],
  gameHighScores: {
    flashMemory: 180,
    speedQuiz: 210,
    wordBuilder: 140,
    memoryCards: 160,
    versusWins: 2,
    royalExamScore: 100,
    templeRunes: 120,
    stoneCarving: 150,
    symbolRecognition: 0,
    wordAssembly: 0,
    meaningDecoder: 0,
    pronunciationChallenge: 0,
    lostSymbolsForest: 0
  },
  unlockedBadgeIds: [
    'badge-ankh-first-steps',
    'badge-thoth-pen',
    'badge-royal-cartouche',
    'badge-owl-wisdom',
    'badge-living-words'
  ],
  recentActivityLog: [
    {
      id: 'act-1',
      actionAr: 'إكمال جولة في لعبة الذاكرة الموقوتة بنجاح',
      points: 45,
      timestamp: 'منذ ساعتين',
      category: 'ألعاب الكاتب'
    },
    {
      id: 'act-2',
      actionAr: 'فك شفرة مقطع من بردية آني (كتاب الموتى)',
      points: 30,
      timestamp: 'اليوم صباحاً',
      category: 'معرض البرديات'
    },
    {
      id: 'act-3',
      actionAr: 'ممارسة رسم رمز «عنخ» في قاموس الفيديو',
      points: 25,
      timestamp: 'أمس',
      category: 'قاموس الفيديو'
    },
    {
      id: 'act-4',
      actionAr: 'إنشاء خرطوشة ملكية بالاسم الشخصي',
      points: 50,
      timestamp: 'منذ يومين',
      category: 'صانع الخرطوشة'
    }
  ]
};

class StudentProgressManager {
  private listeners: Set<(data: StudentProgressData) => void> = new Set();
  private cache: StudentProgressData | null = null;

  constructor() {
    this.load();
  }

  private load(): StudentProgressData {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cache = { ...DEFAULT_PROGRESS, ...parsed };
        return this.cache!;
      }
    } catch {
      // fallback
    }

    this.cache = { ...DEFAULT_PROGRESS };
    this.save();
    return this.cache;
  }

  private save() {
    if (typeof window === 'undefined' || !this.cache) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
    } catch {
      // ignore quota
    }
    this.notify();
  }

  private notify() {
    if (!this.cache) return;
    this.listeners.forEach((fn) => fn(this.cache!));
  }

  public subscribe(listener: (data: StudentProgressData) => void): () => void {
    this.listeners.add(listener);
    if (this.cache) listener(this.cache);
    return () => this.listeners.delete(listener);
  }

  public getProgress(): StudentProgressData {
    if (!this.cache) this.load();
    return this.cache!;
  }

  public addPoints(amount: number, reasonAr: string, category = 'التعلم الذاتي'): StudentProgressData {
    const current = this.getProgress();
    const newTotal = current.totalScribePoints + amount;

    const newLogItem = {
      id: `act-${Date.now()}`,
      actionAr: reasonAr,
      points: amount,
      timestamp: 'الآن',
      category
    };

    // Check if new badges unlocked
    const newUnlockedBadgeIds = [...current.unlockedBadgeIds];
    if (newTotal >= 100 && !newUnlockedBadgeIds.includes('badge-ankh-first-steps')) {
      newUnlockedBadgeIds.push('badge-ankh-first-steps');
    }

    this.cache = {
      ...current,
      totalScribePoints: newTotal,
      unlockedBadgeIds: newUnlockedBadgeIds,
      recentActivityLog: [newLogItem, ...current.recentActivityLog.slice(0, 9)]
    };

    this.save();
    if (amount >= 25) {
      soundFX.playTaskCompletedFanfare();
    } else if (amount > 0) {
      soundFX.playSuccessSound();
    }
    return this.cache;
  }

  public recordGameScore(gameKey: keyof StudentProgressData['gameHighScores'], score: number): StudentProgressData {
    const current = this.getProgress();
    const currentBest = current.gameHighScores[gameKey] || 0;
    const newBest = Math.max(currentBest, score);

    const pointsEarned = Math.floor(score * 0.25);
    const newBadgeIds = [...current.unlockedBadgeIds];

    if (gameKey === 'flashMemory' && score >= 150 && !newBadgeIds.includes('badge-flash-champion')) {
      newBadgeIds.push('badge-flash-champion');
    }
    if (gameKey === 'versusWins' && score >= 1 && !newBadgeIds.includes('badge-versus-champion')) {
      newBadgeIds.push('badge-versus-champion');
    }

    this.cache = {
      ...current,
      totalScribePoints: current.totalScribePoints + pointsEarned,
      gameHighScores: {
        ...current.gameHighScores,
        [gameKey]: newBest
      },
      unlockedBadgeIds: newBadgeIds,
      recentActivityLog: [
        {
          id: `act-${Date.now()}`,
          actionAr: `تحقيق رقم قياسي جديد (${score} نقطة) في الألعاب التنافسية`,
          points: pointsEarned,
          timestamp: 'الآن',
          category: 'ألعاب الكاتب'
        },
        ...current.recentActivityLog.slice(0, 8)
      ]
    };

    this.save();
    if (score > 0) {
      soundFX.playTaskCompletedFanfare();
    }
    return this.cache;
  }

  public completeLesson(lessonId: string): StudentProgressData {
    const current = this.getProgress();
    if (current.completedLessons.includes(lessonId)) return current;

    const mod = INITIAL_LESSON_MODULES.find((m) => m.id === lessonId);
    const reward = mod ? mod.pointsReward : 50;

    const newCompleted = [...current.completedLessons, lessonId];
    const newBadgeIds = [...current.unlockedBadgeIds];

    if (newCompleted.length >= 3 && !newBadgeIds.includes('badge-thoth-pen')) {
      newBadgeIds.push('badge-thoth-pen');
    }
    if (lessonId === 'mod-famous-papyri' && !newBadgeIds.includes('badge-papyrus-master')) {
      newBadgeIds.push('badge-papyrus-master');
    }
    if (lessonId === 'mod-video-dictionary' && !newBadgeIds.includes('badge-video-artist')) {
      newBadgeIds.push('badge-video-artist');
    }
    if (lessonId === 'mod-timeline-evolution' && !newBadgeIds.includes('badge-timeline-scholar')) {
      newBadgeIds.push('badge-timeline-scholar');
    }

    this.cache = {
      ...current,
      totalScribePoints: current.totalScribePoints + reward,
      completedLessons: newCompleted,
      unlockedBadgeIds: newBadgeIds,
      recentActivityLog: [
        {
          id: `act-${Date.now()}`,
          actionAr: `إكمال درس «${mod?.titleAr || 'درس فرعوني'}» بنجاح`,
          points: reward,
          timestamp: 'الآن',
          category: 'مسار التعلم'
        },
        ...current.recentActivityLog.slice(0, 8)
      ]
    };

    this.save();
    soundFX.playTaskCompletedFanfare();
    return this.cache;
  }

  public updateStudentProfile(name: string, avatar: string): StudentProgressData {
    const current = this.getProgress();
    this.cache = {
      ...current,
      studentName: name.trim() || current.studentName,
      avatarIcon: avatar || current.avatarIcon
    };
    this.save();
    return this.cache;
  }

  public getCurrentRank(points: number): ScribeRank {
    for (let i = SCRIBE_RANKS.length - 1; i >= 0; i--) {
      if (points >= SCRIBE_RANKS[i].minPoints) {
        return SCRIBE_RANKS[i];
      }
    }
    return SCRIBE_RANKS[0];
  }

  public getNextRank(points: number): ScribeRank | null {
    const current = this.getCurrentRank(points);
    const nextIdx = SCRIBE_RANKS.findIndex((r) => r.id === current.id) + 1;
    if (nextIdx < SCRIBE_RANKS.length) {
      return SCRIBE_RANKS[nextIdx];
    }
    return null;
  }

  public resetProgress(): StudentProgressData {
    this.cache = { ...DEFAULT_PROGRESS };
    this.save();
    return this.cache;
  }
}

export const studentProgress = new StudentProgressManager();
