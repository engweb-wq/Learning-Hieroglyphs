import { PharaohKingEntry } from '../types';

export const PHARAOHS_ERA_FILTERS = [
  { id: 'all', labelAr: 'جميع ملوك الفراعنة (26)', period: '3100 – 30 ق.م' },
  { id: 'early_dynastic', labelAr: 'العصر العتيق والتوحيد (الأسرات 1-2)', period: '3100 – 2686 ق.م' },
  { id: 'old_kingdom', labelAr: 'عصر بناة الأهرام (الدولة القديمة 3-6)', period: '2686 – 2181 ق.م' },
  { id: 'middle_kingdom', labelAr: 'عصر النهضة والازدهار (الدولة الوسطى 11-12)', period: '2055 – 1650 ق.م' },
  { id: 'new_kingdom', labelAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة 18-20)', period: '1550 – 1069 ق.م' },
  { id: 'late_period', labelAr: 'العصور المتأخرة والنهضة الصاوية (21-26)', period: '1069 – 332 ق.م' },
  { id: 'ptolemaic', labelAr: 'العصر البطلمي قبل الميلاد', period: '305 – 30 ق.م' }
];

export const ANCIENT_EGYPTIAN_KINGS: PharaohKingEntry[] = [
  {
    id: 'king-narmer',
    commonNameAr: 'الملك نعرمر (مينا موحد القطرين)',
    commonNameEn: 'King Narmer (Menes)',
    reignPeriodBce: 'حوالي 3100 – 3050 ق.م',
    dynastyNumber: 1,
    dynastyAr: 'الأسرة الأولى',
    eraCategory: 'early_dynastic',
    eraCategoryAr: 'العصر العتيق والتوحيد',
    approximateYearsReigned: 50,
    cartouche: {
      prenomenHieroglyphs: '𓈖 𓂋 𓈘 𓂋',
      prenomenTransliteration: 'Nꜥr-mr',
      prenomenReadingAr: 'نَعْر-مِر',
      prenomenMeaningAr: 'السلور القاتل المفترس (المحارب الذي لا يُقهر)',
      nomenHieroglyphs: '𓏠 𓈖 𓇋',
      nomenTransliteration: 'Mnj',
      nomenReadingAr: 'مِينِي (مينا)',
      nomenMeaningAr: 'المؤسس الراسخ الثابت'
    },
    horusNameAr: 'حورس السلور المحارب (نعر-مر)',
    summaryBioAr: 'الملك المؤسس لأول دولة مركزية موحدة في التاريخ البشري، وحد التاجين (الأبيض للجنوب والأحمر للشمال)، وأنشأ أول عاصمة موحدة لمصر «إنب-حدج» (الجدار الأبيض - منف).',
    keyAchievementsAr: [
      'توحيد القطرين (مصر العليا ومصر السفلى) في دولة واحدة متماسكة.',
      'تأسيس عاصمة منف التاريخية عند رأس الدلتا.',
      'تدوين صلاية نعرمر الشهيرة كأول وثيقة سياسية وتاريخية مسجلة بالهيروغليفية.'
    ],
    famousMonumentsAr: ['صلاية نعرمر بالمتحف المصري', 'رأس مقمعة نعرمر الملكية', 'مقبرة أم الجعاب بأبيدوس'],
    burialPlaceAr: 'جبانة أم الجعاب الملكية - أبيدوس',
    mummyStatusAr: 'لم تكتشف مومياؤه نظراً لقدم العصر العتيق',
    famousInscriptionSnippet: {
      hieroglyphs: '𓇓 𓏏 𓈖 𓂋 𓈘 𓂋 𓅃',
      transliteration: 'Nsw nꜥr-mr Ḥr',
      translationAr: 'ملك الجنوب والشمال نعرمر حورس المنتصر',
      sourceAr: 'صلاية نعرمر - الكوم الأحمر (نخن)'
    },
    audioSpeechScript: 'الملك نعرمر أو مينا، موحد القطرين ومؤسس الأسرة الأولى حوالي عام 3100 قبل الميلاد. صاحب صلاية نعرمر الخالدة وأول من جمع بين التاج الأبيض الصعيدي والتاج الأحمر البحري.'
  },
  {
    id: 'king-djoser',
    commonNameAr: 'الملك زوسر (نثر-إخت)',
    commonNameEn: 'King Djoser (Netjerikhet)',
    reignPeriodBce: 'حوالي 2670 – 2650 ق.م',
    dynastyNumber: 3,
    dynastyAr: 'الأسرة الثالثة',
    eraCategory: 'old_kingdom',
    eraCategoryAr: 'عصر بناة الأهرام (الدولة القديمة)',
    approximateYearsReigned: 20,
    cartouche: {
      prenomenHieroglyphs: '𓊹 𓂋 𓄡 𓏏',
      prenomenTransliteration: 'Nṯr-j-ḫ.t',
      prenomenReadingAr: 'نِتِر-إِخِت',
      prenomenMeaningAr: 'جسد الإله المقدس / الإلهي في هيئته',
      nomenHieroglyphs: '𓂦 𓋴 𓂋',
      nomenTransliteration: 'Ḏsr',
      nomenReadingAr: 'جُوسِر / زوسر',
      nomenMeaningAr: 'المقدس / السامي / المرفع'
    },
    horusNameAr: 'حورس نثر-إخت',
    summaryBioAr: 'صاحب النقلة المعمارية الأعظم في تاريخ البشرية؛ أمر وزيره ومهندسه العبقري «إمحوتب» بتشييد هرم سقارة المدرج، وهو أول بناء حجري ضخم شيده الإنسان في التاريخ.',
    keyAchievementsAr: [
      'بناء هرم سقارة المدرج (6 مصاطب حجرية بارتفاع 62 متراً).',
      'تأمين حدود مصر الجنوبية عند الشلال الأول والتوسع في مناجم النحاس والفيروز بسيناء.',
      'صاحب «لوحة المجاعة» الشهيرة بجزيرة سهيل بأسوان.'
    ],
    famousMonumentsAr: ['مجموعة هرم سقارة المدرج', 'تمثال زوسر الحجري بالسرداب', 'لوحة المجاعة بجزيرة سهيل'],
    burialPlaceAr: 'الهرم المدرج - سقارة',
    mummyStatusAr: 'عُثر على أجزاء من رفات ومومياء داخل بئر الهرم بسقارة',
    famousInscriptionSnippet: {
      hieroglyphs: '𓊹 𓂋 𓄡 𓏏 𓐍𓂝 𓅓 𓋹',
      transliteration: 'Nṯr-j-ḫ.t ḫꜥ m ꜥnḫ',
      translationAr: 'نثر-إخت المشرق بالحياة والخلود',
      sourceAr: 'نقوش سراديب هرم سقارة المدرج'
    },
    audioSpeechScript: 'الملك زوسر، باني أول هرم حجري في تاريخ البشرية بسقارة على يد مهندسه الفذ إمحوتب، مؤسس المجد المعماري للدولة القديمة.'
  },
  {
    id: 'king-sneferu',
    commonNameAr: 'الملك سنفرو (نب-ماعت)',
    commonNameEn: 'King Sneferu (Nebmaat)',
    reignPeriodBce: 'حوالي 2613 – 2589 ق.م',
    dynastyNumber: 4,
    dynastyAr: 'الأسرة الرابعة',
    eraCategory: 'old_kingdom',
    eraCategoryAr: 'عصر بناة الأهرام (الدولة القديمة)',
    approximateYearsReigned: 24,
    cartouche: {
      prenomenHieroglyphs: '𓎟 𓌷 𓂝 𓏏',
      prenomenTransliteration: 'Nb-Mꜣꜥ.t',
      prenomenReadingAr: 'نِب-مَاعِت',
      prenomenMeaningAr: 'سيد الحق والعدل الإلهي',
      nomenHieroglyphs: '𓋴 𓄤 𓆑 𓂋 𓅱',
      nomenTransliteration: 'Snfr-w',
      nomenReadingAr: 'سِنِفْرُو',
      nomenMeaningAr: 'صانع الجمال / الذي يجعل الأمور جميلة وبديعة'
    },
    horusNameAr: 'حورس نب-ماعت',
    summaryBioAr: 'مؤسس الأسرة الرابعة وأعظم بناة الأهرام في التاريخ من حيث كتلة الأحجار المشيدة؛ بنى 3 أهرامات عملاقة (هرم ميدوم، والهرم المنحني، والهرم الأحمر بدهشور)، ولُقِّب بالملك المحسن المحبوب لعدله ورعايته لشعبه.',
    keyAchievementsAr: [
      'تشييد الهرم الأحمر بدهشور (أول هرم أملس حقيقي متكامل الهندسة في التاريخ).',
      'إرسال أسطول تجاري مكون من 40 سفينة إلى بيبلوس (لبنان) لجلب أخشاب الأرز.',
      'تأمين حدود مصر الغربية والجنوبية ومناجم الفيروز بوادي المغارة بسيناء.'
    ],
    famousMonumentsAr: ['الهرم الأحمر بدهشور', 'الهرم المنحني بدهشور', 'هرم ميدوم'],
    burialPlaceAr: 'الهرم الأحمر - دهشور',
    mummyStatusAr: 'عُثر على بقايا عظام محنطة داخل غرفة دفن الهرم الأحمر',
    famousInscriptionSnippet: {
      hieroglyphs: '𓋴 𓄤 𓆑 𓂋 𓅱 𓎟 𓌷 𓂝 𓏏 𓋹',
      transliteration: 'Snfrw nb Mꜣꜥ.t ꜥnḫ',
      translationAr: 'سنفرو سيد العدل حي للأبد',
      sourceAr: 'نقوش معبد الوادي بالهرم المنحني بدهشور'
    },
    audioSpeechScript: 'الملك سنفرو، مؤسس الأسرة الرابعة وباني الهرم الأحمر بدهشور، لُقب بالملك المحبوب المحسن لما عُرف عنه من عدالة وتسامح مع شعبه.'
  },
  {
    id: 'king-khufu',
    commonNameAr: 'الملك خوفو (خنوم-خوف-وي)',
    commonNameEn: 'King Khufu (Cheops)',
    greekName: 'خوفو / Cheops',
    reignPeriodBce: 'حوالي 2589 – 2566 ق.م',
    dynastyNumber: 4,
    dynastyAr: 'الأسرة الرابعة',
    eraCategory: 'old_kingdom',
    eraCategoryAr: 'عصر بناة الأهرام (الدولة القديمة)',
    approximateYearsReigned: 23,
    cartouche: {
      prenomenHieroglyphs: '𓐍 𓈖 𓅱 𓅓 𓐍 𓅱 𓆑 𓅱',
      prenomenTransliteration: 'ẖnm-ḫw.f-wj',
      prenomenReadingAr: 'خْنُوم-خُوف-وِي',
      prenomenMeaningAr: 'المعبود خنوم هو الذي يحميني ويحفظني',
      nomenHieroglyphs: '𓐍 𓅱 𓆑 𓅱',
      nomenTransliteration: 'Ḫw.f-wj',
      nomenReadingAr: 'خُوفُو',
      nomenMeaningAr: 'المحمي بحفظ الإله'
    },
    horusNameAr: 'حورس مجدو (صاحب التاج العظيم)',
    summaryBioAr: 'باني الهرم الأكبر بالجيزة، المعجزة الوحيدة الباقية من عجائب الدنيا السبع القديمة. وظف إمكانات مصر الهندسية والاقتصادية لتشييد أعظم صرح حجري عرفه التاريخ، وعُثر له على مركب الشمس الأسطوري وتمثال عاجي مصغر بالمتحف المصري.',
    keyAchievementsAr: [
      'بناء الهرم الأكبر بالجيزة (2.3 مليون كتلة حجرية بارتفاع أصلي 146 متراً).',
      'صناعة مركب الشمس الملكي بدقة نجارة وهندسة بحرية غير مسبوقة.',
      'تنشيط التجارة الدولية مع بلاد الشام ومحاجر النوبة والجرانيت بأسوان.'
    ],
    famousMonumentsAr: ['الهرم الأكبر بالجيزة', 'مركب خوفو الشمسي', 'تمثال خوفو العاجي الصغير'],
    burialPlaceAr: 'غرفة الملك بالهرم الأكبر - الجيزة',
    mummyStatusAr: 'فُقدت مومياؤه في العصور القديمة وبقي تابوته الجرانيتي بالهرم',
    famousInscriptionSnippet: {
      hieroglyphs: '𓐍 𓅱 𓆑 𓅱 𓊹 𓉻 𓋹 𓆓 𓏏',
      transliteration: 'Ḫwfw nṯr ꜥꜣ ꜥnḫ ḏ.t',
      translationAr: 'خوفو الإله العظيم حي إلى الأبدية',
      sourceAr: 'غرافيتي حجرات تخفيف الضغط بالهرم الأكبر'
    },
    audioSpeechScript: 'الملك خوفو، صاحب الهرم الأكبر بالجيزة المعجزة المعمارية الخالدة لعجائب الدنيا السبع، ابن الملك سنفرو والملكة حتب حرس.'
  },
  {
    id: 'king-khafre',
    commonNameAr: 'الملك خفرع (وسر-إب)',
    commonNameEn: 'King Khafre (Chephren)',
    greekName: 'خفرع / Chephren',
    reignPeriodBce: 'حوالي 2558 – 2532 ق.م',
    dynastyNumber: 4,
    dynastyAr: 'الأسرة الرابعة',
    eraCategory: 'old_kingdom',
    eraCategoryAr: 'عصر بناة الأهرام (الدولة القديمة)',
    approximateYearsReigned: 26,
    cartouche: {
      prenomenHieroglyphs: '𓅱 𓋴 𓂋 𓇋 𓃀 𓂋 𓂝',
      prenomenTransliteration: 'Wsr-jb-Rꜥ',
      prenomenReadingAr: 'وِسِر-إِب-رَع',
      prenomenMeaningAr: 'قوي الفؤاد مثل الإله رع',
      nomenHieroglyphs: '𓈍 𓂝 𓆑 𓂋 𓂝',
      nomenTransliteration: 'Ḫꜥ.f-Rꜥ',
      nomenReadingAr: 'خَع-فْ-رَع',
      nomenMeaningAr: 'مشرق وظاهر في المجد مثل رع'
    },
    horusNameAr: 'حورس وسر-إب',
    summaryBioAr: 'باني الهرم الثاني بهضبة الجيزة وصاحب تمثال «أبو الهول العظيم» حارس الأهرامات المنحوت من صخرة حية برأس إنسان وجسد أسد رمزاً للحكمة والقوة الخارقة، بالإضافة لمعبد الوادي المصنوع من كتل الجرانيت الوردي المصقول.',
    keyAchievementsAr: [
      'نحت تمثال أبو الهول العظيم (حور-إم-أخت) كأضخم تمثال منحوت في العالم القديم.',
      'تشييد الهرم الثاني بالجيزة الذي يحتفظ بجزء من كسوته الكلسية البيضاء بقمته.',
      'بناء معبد الوادي بالجرانيت الأسواني وحجر الديوريت الفاخر.'
    ],
    famousMonumentsAr: ['الهرم الثاني بالجيزة', 'تمثال أبو الهول العظيم', 'تمثال خفرع الشهير مع صقر حورس بالديوريت'],
    burialPlaceAr: 'الهرم الثاني - الجيزة',
    mummyStatusAr: 'لم يعثر على موميائه وبقي تابوته الجرانيتي الضخم داخل غرفة الدفن',
    famousInscriptionSnippet: {
      hieroglyphs: '𓈍 𓂝 𓆑 𓂋 𓂝 𓊹 𓄤 𓎟 𓈍 𓂝 𓅱',
      transliteration: 'Ḫꜥ.f-Rꜥ nṯr nfr nb ḫꜥ.w',
      translationAr: 'خفرع الإله الطيب رب التيجان والمشارق',
      sourceAr: 'قاعدة تمثال خفرع من حجر الديوريت الأخضر'
    },
    audioSpeechScript: 'الملك خفرع، باني الهرم الثاني ونحات تمثال أبو الهول العظيم حارس هضبة الجيزة، وصاحب التحفة الفنية تمثال خفرع والصقر حورس.'
  },
  {
    id: 'king-menkaure',
    commonNameAr: 'الملك منكاورع (كا-كاو-رع)',
    commonNameEn: 'King Menkaure (Mykerinos)',
    greekName: 'ميكرينوس / Mycerinus',
    reignPeriodBce: 'حوالي 2532 – 2503 ق.م',
    dynastyNumber: 4,
    dynastyAr: 'الأسرة الرابعة',
    eraCategory: 'old_kingdom',
    eraCategoryAr: 'عصر بناة الأهرام (الدولة القديمة)',
    approximateYearsReigned: 28,
    cartouche: {
      prenomenHieroglyphs: '𓏠 𓈖 𓂓 𓂓 𓂓 𓂋 𓂝',
      prenomenTransliteration: 'Mn-kꜣ.w-Rꜥ',
      prenomenReadingAr: 'مِن-كَا-و-رَع',
      prenomenMeaningAr: 'خالدة هي أرواح الإله رع وطاقاته الحيوية',
      nomenHieroglyphs: '𓏠 𓈖 𓂓 𓅱 𓂋 𓂝',
      nomenTransliteration: 'Mn-kꜣ.w-Rꜥ',
      nomenReadingAr: 'مِنكاورَع',
      nomenMeaningAr: 'الأرواح الثابتة الباقية لرع'
    },
    horusNameAr: 'حورس كا-نتر',
    summaryBioAr: 'باني الهرم الثالث بالجيزة المكسو في نصفه السفلي بكتل الجرانيت الأحمر الأسواني الفاخر. عُرف بالعدل والرحمة وإعادة فتح المعابد للصلوات والطقوس، واشتُهر بمجموعات تماثيل «ثلاثيات منكاورع» الرائعة مع الإلهة حتحور.',
    keyAchievementsAr: [
      'بناء الهرم الثالث بالجيزة مع كسوة جرانيتية ملكية فاخرة.',
      'نحت ثلاثيات منكاورع الخالدة بحجر الشست الرمادي الناعم.',
      'إصلاحات اجتماعية ودينية اشتهرت في نصوص المؤرخين القدماء.'
    ],
    famousMonumentsAr: ['الهرم الثالث بالجيزة', 'ثلاثيات منكاورع مع حتحور بالمتحف المصري وبوسطن', 'معبد الوادي لمنكاورع'],
    burialPlaceAr: 'الهرم الثالث - الجيزة',
    mummyStatusAr: 'عُثر على تابوت خشبي وعظام محنطة نقلت إلى المتحف البريطاني',
    famousInscriptionSnippet: {
      hieroglyphs: '𓏠 𓈖 𓂓 𓅱 𓂋 𓂝 𓌻 𓂋 𓎛 𓏏 𓎛 𓂋',
      transliteration: 'Mn-kꜣ.w-Rꜥ mry Ḥw.t-Ḥr',
      translationAr: 'منكاورع المحبوب لدى الإلهة حتحور',
      sourceAr: 'ثلاثيات منكاورع من معبد الوادي بالجيزة'
    },
    audioSpeechScript: 'الملك منكاورع، باني الهرم الثالث بالجيزة وصاحب الثلاثيات المنحوتة البديعة مع الإلهة حتحور، عُرف في التراث المصري بحكمته وتواضعه.'
  },
  {
    id: 'king-mentuhotep-ii',
    commonNameAr: 'الملك منتوحوتب الثاني (نب-حبت-رع)',
    commonNameEn: 'King Mentuhotep II (Nebhepetre)',
    reignPeriodBce: 'حوالي 2055 – 2004 ق.م',
    dynastyNumber: 11,
    dynastyAr: 'الأسرة الحادية عشرة',
    eraCategory: 'middle_kingdom',
    eraCategoryAr: 'عصر النهضة والازدهار (الدولة الوسطى)',
    approximateYearsReigned: 51,
    cartouche: {
      prenomenHieroglyphs: '𓎟 𓎛 𓊪 𓏏 𓂋 𓂝',
      prenomenTransliteration: 'Nb-ḥp.t-Rꜥ',
      prenomenReadingAr: 'نِب-حَبْت-رَع',
      prenomenMeaningAr: 'سيد المجداف الإلهي لرع',
      nomenHieroglyphs: '𓏠 𓈖 𓍿 𓅱 𓊵 𓏏 𓊪',
      nomenTransliteration: 'Mnṯw-ḥtp',
      nomenReadingAr: 'مَنْتُو-حُتِب',
      nomenMeaningAr: 'الإله منتو (إله الحرب) راضٍ ومسرور'
    },
    horusNameAr: 'حورس س-عنخ-إب-تاوي (محيي قلبي الأرضين)',
    summaryBioAr: 'مؤسس الدولة الوسطى والموحد الثاني لمصر؛ أنهى عصر الانتقال الأول وأعاد توحيد البلاد تحت حكم طيبة (الأقصر) بعد حرب طويلة، وشيد معبده الجنائزي الرائع بالدير البحري.',
    keyAchievementsAr: [
      'إعادة توحيد مصر وإنهاء عقود التفكك والنزاع الإقليمي.',
      'نقل مركز الثقل الحضاري والسياسي إلى طيبة (الأقصر).',
      'تشييد معبد الدير البحري الفريد بمدرجاته الصخرية البديعة.'
    ],
    famousMonumentsAr: ['المعبد الجنائزي بالدير البحري', 'تمثال منتوحوتب الثاني من الحجر الرملي الأسود', 'نقوش شط الرجال'],
    burialPlaceAr: 'مقبرة باب الحصان بالدير البحري - طيبة الغربية',
    mummyStatusAr: 'عُثر على موميائه ملفوفة بأكفان الكتان الملكي في الدير البحري',
    famousInscriptionSnippet: {
      hieroglyphs: '𓋴 𓋹 𓄣 𓇿 𓇿 𓎟 𓎛 𓊪 𓏏 𓂋 𓂝',
      transliteration: 'S-ꜥnḫ-jb-tꜣ.wj Nb-ḥp.t-Rꜥ',
      translationAr: 'محيي قلبي الأرضين، نب-حبت-رع',
      sourceAr: 'لوحات النصر بجبل السلسلة وشط الرجال'
    },
    audioSpeechScript: 'الملك منتوحوتب الثاني، الموحد الثاني لمصر ومؤسس الدولة الوسطى الزاهرة، جعل من طيبة عاصمة مجيدة وبنى صرحه بالدير البحري.'
  },
  {
    id: 'king-senusret-iii',
    commonNameAr: 'الملك سنوسرت الثالث (خع-كاو-رع)',
    commonNameEn: 'King Senusret III (Sesostris III)',
    greekName: 'سيزوستريس / Sesostris',
    reignPeriodBce: 'حوالي 1878 – 1839 ق.م',
    dynastyNumber: 12,
    dynastyAr: 'الأسرة الثانية عشرة',
    eraCategory: 'middle_kingdom',
    eraCategoryAr: 'عصر النهضة والازدهار (الدولة الوسطى)',
    approximateYearsReigned: 39,
    cartouche: {
      prenomenHieroglyphs: '𓈍 𓂝 𓂓 𓂓 𓂓 𓂋 𓂝',
      prenomenTransliteration: 'Ḫꜥ-kꜣ.w-Rꜥ',
      prenomenReadingAr: 'خَع-كَا-و-رَع',
      prenomenMeaningAr: 'المشرقة هي تجليات وأرواح الإله رع',
      nomenHieroglyphs: '𓊃 𓈖 𓄿 𓍯 𓋴 𓂋 𓏏',
      nomenTransliteration: 'Z-n-Wsrt',
      nomenReadingAr: 'سَن-وِسْرِت (سنوسرت)',
      nomenMeaningAr: 'رجل الإلهة وسرت القوية'
    },
    horusNameAr: 'حورس نثر-خبرو',
    summaryBioAr: 'المحارب الصارم والإداري العبقري؛ ألغى نفوذ حكام الأقاليم الوراثي وربط مصر كلها بسلطة مركزية حازمة. شق قناة صخرية عند الجندل الأول لتسهيل عبور الأساطيل الحربية، وبنى شبكة قلاع حصينة في النوبة (سمنة وقمنة).',
    keyAchievementsAr: [
      'شق أول قناة ملاحية عند الشلال الأول (قناة سيزوستريس).',
      'تشييد حصون سمنة وقمنة وبوهين العسكرية لحماية حدود مصر الجنوبية.',
      'القضاء على الإقطاع ونفوذ حكام الأقاليم المتمردين وتأسيس بيروقراطية كفؤة.'
    ],
    famousMonumentsAr: ['حصن وقلاع سمنة وقمنة بالنوبة', 'هرم سنوسرت الثالث بدهشور', 'تماثيله الجرانيتية ذات الملامح الوقورة الصارمة'],
    burialPlaceAr: 'هرم دهشور الشمالي',
    mummyStatusAr: 'عُثر على مجوهرات أميراته الفاخرة بدهشور بالمتحف المصري',
    famousInscriptionSnippet: {
      hieroglyphs: '𓂝 𓎛 𓂝 𓏤 𓂋 𓇾 𓇾 𓈖 𓈞 𓊃',
      transliteration: 'ꜥḥꜥ r tꜣ-stj n ḥm=f',
      translationAr: 'أقام الحدود الجنوبية لمصر لحمايتها أبد الدهر',
      sourceAr: 'لوحة الحدود الشهيرة بقلعة سمنة'
    },
    audioSpeechScript: 'الملك سنوسرت الثالث، المحارب العظيم وشاق القنوات المائية بالجنادل، باني حصون النوبة وصاحب التماثيل المعبرة عن هيبة الحكم والمسؤولية.'
  },
  {
    id: 'king-ahmose-i',
    commonNameAr: 'الملك أحمس الأول (نب-بحتي-رع قاهر الهكسوس)',
    commonNameEn: 'King Ahmose I (Nebpehtyre)',
    reignPeriodBce: 'حوالي 1550 – 1525 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 25,
    cartouche: {
      prenomenHieroglyphs: '𓎟 𓄖 𓏏 𓏭 𓂋 𓂝',
      prenomenTransliteration: 'Nb-pḥ.tj-Rꜥ',
      prenomenReadingAr: 'نِب-بَحْتِي-رَع',
      prenomenMeaningAr: 'سيد القوة والبطش الموهوب من رع',
      nomenHieroglyphs: '𓇋 𓂝 𓎛 𓄟 𓋴',
      nomenTransliteration: 'Jꜥḥ-ms',
      nomenReadingAr: 'يَعْح-مِس (أحمس)',
      nomenMeaningAr: 'وُلِد القمر / وليد إله القمر'
    },
    horusNameAr: 'حورس عا-خبرو (عظيم التجليات)',
    summaryBioAr: 'بطل التحرير القومي ومؤسس الأسرة الثامنة عشرة والإمبراطورية المصرية العظمى؛ استكمل كفاح والده سقنن رع وأخيه كامس، وطارد الهكسوس بالعجلات الحربية وسحق معاقلهم في أواريس وشاروهين بفلسطين.',
    keyAchievementsAr: [
      'طرد الهكسوس نهائياً من أرض مصر وتحرير كامل الدلتا.',
      'تحديث الجيش المصري وإدخال سلاح العجلات الحربية والسهام المركبة.',
      'تأسيس عصر الدولة الحديثة أعظم إمبراطوريات الشرق القديم.'
    ],
    famousMonumentsAr: ['لوحة العاصفة بالكرنك', 'هرم أحمس التذكاري بأبيدوس', 'فأس وخنجر أحمس الذهبي بالمتحف المصري'],
    burialPlaceAr: 'خبيئة الدير البحري (مقبرة TT320)',
    mummyStatusAr: 'موميائه المحفوظة ببراعة معروضة بالمتحف القومي للحضارة المصرية بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓇋 𓂝 𓎛 𓄟 𓋴 𓎟 𓄖 𓏏 𓏭 𓂋 𓂝 𓋹',
      transliteration: 'Jꜥḥ-ms nb-pḥ.tj-Rꜥ ꜥnḫ',
      translationAr: 'أحمس سيد البأس والانتصار حي للأبد',
      sourceAr: 'نقوش سيرة القائد أحمس بن إبانا بالكب'
    },
    audioSpeechScript: 'الملك أحمس الأول، قاهر الهكسوس وموحد الديار، مؤسس الأسرة الثامنة عشرة وباني فجر الإمبراطورية المصرية الحديثة.'
  },
  {
    id: 'queen-hatshepsut',
    commonNameAr: 'الملكة حتشبسوت (ماعت-كا-رع)',
    commonNameEn: 'Queen Hatshepsut (Maatkare)',
    reignPeriodBce: 'حوالي 1479 – 1458 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 21,
    cartouche: {
      prenomenHieroglyphs: '𓌷 𓂝 𓏏 𓂓 𓂋 𓂝',
      prenomenTransliteration: 'Mꜣꜥ.t-kꜣ-Rꜥ',
      prenomenReadingAr: 'مَاعِت-كَا-رَع',
      prenomenMeaningAr: 'العدالة والحق هي جوهر وقرين الإله رع',
      nomenHieroglyphs: '𓎛 𓏏 𓈙 𓊪 𓋴 𓅱 𓏏',
      nomenTransliteration: 'Ḥꜣ.t-šps.wt',
      nomenReadingAr: 'حَات-شِبْسُوت',
      nomenMeaningAr: 'درة الأميرات / أولى السيدات النبيلات'
    },
    horusNameAr: 'حورس وسرت-كاو (قوية الأرواح)',
    summaryBioAr: 'أعظم ملكات العالم القديم حكمت مصر كفرعون كامل السيادة باللحية المستعارة والتاج المزدوج. اتسم عصرها بالسلام والازدهار الاقتصادي الباهر، وشيدت معبد الدير البحري الفريد، وأرسلت أسطولها التجاري الشهير لبلاد بونت.',
    keyAchievementsAr: [
      'تسيير البعثة البحرية التجارية الكبرى إلى بلاد بونت (الصومال/إريتريا) لجلب البخور والأبنوس والذهب.',
      'تشييد معبد الدير البحري (جسر-جسرو) الأيقونة المعمارية الخالدة بالأقصر.',
      'نصب مسلتين عظيمتين من الجرانيت الوردي في قلب معبد الكرنك.'
    ],
    famousMonumentsAr: ['معبد الدير البحري بالأقصر', 'مسلة حتشبسوت بالكرنك', 'المقصورة الحمراء بالكرنك'],
    burialPlaceAr: 'المقبرة KV20 بوادي الملوك',
    mummyStatusAr: 'عُثر على موميائها في المقبرة KV60 ومعروضة بمتحف الحضارة',
    famousInscriptionSnippet: {
      hieroglyphs: '𓌷 𓂝 𓏏 𓂓 𓂋 𓂝 𓊹 𓏏 𓄤 𓂋 𓏏',
      transliteration: 'Mꜣꜥ.t-kꜣ-Rꜥ nṯr.t nfr.t',
      translationAr: 'ماعت-كا-رع المعبودة الطيبة العادلة',
      sourceAr: 'نقوش بعثة بونت بمعبد الدير البحري'
    },
    audioSpeechScript: 'الملكة حتشبسوت، السيدة التي حكمت إمبراطورية الفراعنة بحكمة واقتدار، راعية التجارة والفنون وبانية صرح الدير البحري الباهر.'
  },
  {
    id: 'king-thutmose-iii',
    commonNameAr: 'الملك تحتمس الثالث (من-خبر-رع نابليون الشرق)',
    commonNameEn: 'King Thutmose III (Menkheperre)',
    reignPeriodBce: 'حوالي 1479 – 1425 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 54,
    cartouche: {
      prenomenHieroglyphs: '𓏠 𓈖 𓆣 𓂋 𓂋 𓂝',
      prenomenTransliteration: 'Mn-ḫpr-Rꜥ',
      prenomenReadingAr: 'مِن-خِبِر-رَع',
      prenomenMeaningAr: 'ثابت وباقٍ هو تجلي الإله رع وصيرورته',
      nomenHieroglyphs: '𓅝 𓄟 𓋴',
      nomenTransliteration: 'Ḏḥwtj-ms',
      nomenReadingAr: 'تَحُوت-مِس (تحتمس)',
      nomenMeaningAr: 'مولود الإله تحوت (إله الحكمة)'
    },
    horusNameAr: 'حورس كا-نخت خع-إم-واست (الثور القوي المشرق في طيبة)',
    summaryBioAr: 'أعظم قائد واستراتيجي عسكري في تاريخ مصر والشرق الأدنى القديم؛ خاض 17 حملة حربية منتصرة دون أي هزيمة، وقاد معركة مجدو التاريخية بحنكة تكتيكية باهرة، وبسط حدود الإمبراطورية من الفرات شمالاً حتى الشلال الرابع جنوباً.',
    keyAchievementsAr: [
      'الانتصار الساحق في معركة مجدو (أول معركة عسكرية موثقة تفصيلياً بالتاريخ).',
      'توسيع حدود مصر لتشمل بلاد الشام وفلسطين والنوبة حتى الشلال الرابع.',
      'بناء صالة الأجداد ومعبد الأخ-منو (حديقة الحيوان والنباتات المنقوشة) بالكرنك.'
    ],
    famousMonumentsAr: ['صالة الأعمدة الأخ-منو بالكرنك', 'مسلات تحتمس الثالث بلندن ونيويورك وإسطنبول', 'مقبرة KV34 بوادي الملوك'],
    burialPlaceAr: 'المقبرة KV34 بوادي الملوك',
    mummyStatusAr: 'موميائه المحفوظة معروضة بقاعة المومياوات بمتحف الحضارة بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓏠 𓈖 𓆣 𓂋 𓂋 𓂝 𓎟 𓐍 𓂝 𓅱 𓎡 𓈖 𓎛 𓎛',
      transliteration: 'Mn-ḫpr-Rꜥ nb ḫꜥ.w kꜣ nḥḥ',
      translationAr: 'من-خبر-رع رب الفتوحات والخلود الأبدي',
      sourceAr: 'حوليات تحتمس الثالث على جدران معبد الكرنك'
    },
    audioSpeechScript: 'الملك تحتمس الثالث، القائد العسكري الأسطوري الذي وسع حدود الإمبراطورية المصرية حتى الفرات وخاض 17 معركة ظافرة دون انكسار.'
  },
  {
    id: 'king-amenhotep-iii',
    commonNameAr: 'الملك أمنحتب الثالث (نب-ماعت-رع الفرعون الشمس)',
    commonNameEn: 'King Amenhotep III (The Magnificent)',
    reignPeriodBce: 'حوالي 1391 – 1353 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 38,
    cartouche: {
      prenomenHieroglyphs: '𓎟 𓌷 𓂝 𓏏 𓂋 𓂝',
      prenomenTransliteration: 'Nb-Mꜣꜥ.t-Rꜥ',
      prenomenReadingAr: 'نِب-مَاعِت-رَع',
      prenomenMeaningAr: 'رع هو رب الحق والعدل الإلهي',
      nomenHieroglyphs: '𓇋 𓏠 𓈖 𓊵 𓏏 𓊪',
      nomenTransliteration: 'Jmn-ḥtp',
      nomenReadingAr: 'آمُون-حُتِب (أمنحتب)',
      nomenMeaningAr: 'الإله آمون راضٍ ومسرور'
    },
    horusNameAr: 'حورس كا-نخت خع-إم-ماعت',
    summaryBioAr: 'سيد العصر الذهبي للثروة والدبلوماسية والعمائر الفاخرة، تدفقت في عهده كنوز العالم القديم وتزوج الملكة تي العظيمة، شيد معبد الأقصر الباهر وتمثالي ممنون العملاقين ومعبد سلب بالنوبة.',
    keyAchievementsAr: [
      'بناء الجزء الأكبر من معبد الأقصر بصالة أعمدته البردية الشاهقة.',
      'تشييد تمثالي ممنون العملاقين بارتفاع 18 متراً عند مدخل معبده الجنائزي.',
      'إدارة أوسع شبكة علاقات دبلوماسية في العالم وثقتها «رسائل تل العمارنة».'
    ],
    famousMonumentsAr: ['تمثالا ممنون بطيبة الغربية', 'معبد الأقصر', 'معبد صلب بالنوبة'],
    burialPlaceAr: 'المقبرة WV22 بوادي الملوك الغربي',
    mummyStatusAr: 'موميائه معروضة بالمتحف القومي للحضارة المصرية بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓎟 𓌷 𓂝 𓏏 𓂋 𓂝 𓋹 𓈖 𓎛 𓎛 𓇳',
      transliteration: 'Nb-Mꜣꜥ.t-Rꜥ ꜥnḫ nḥḥ',
      translationAr: 'نب-ماعت-رع حي في رحاب الخلود الأبدي',
      sourceAr: 'جعارين الزواج الدبلوماسي لأمنحتب الثالث'
    },
    audioSpeechScript: 'الملك أمنحتب الثالث، فرعون العصر الذهبي والرخاء اللامحدود، صاحب تمثالي ممنون ومعبد الأقصر وزوج الملكة تي القوية.'
  },
  {
    id: 'king-akhenaten',
    commonNameAr: 'الملك إخناتون (أمنحتب الرابع - مصلح العمارنة)',
    commonNameEn: 'King Akhenaten (Amenhotep IV)',
    reignPeriodBce: 'حوالي 1353 – 1336 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 17,
    cartouche: {
      prenomenHieroglyphs: '𓄤 𓆣 𓂋 𓅱 𓂋 𓂝 𓌡 𓈖 𓂋 𓂝',
      prenomenTransliteration: 'Nfr-ḫpr.w-Rꜥ wꜥ-n-Rꜥ',
      prenomenReadingAr: 'نَفْر-خِبِرُو-رَع وَع-إن-رَع',
      prenomenMeaningAr: 'بديعة هي تجليات رع، الفريد المختار لرع',
      nomenHieroglyphs: '𓇋 𓐍 𓈖 𓇋 𓏏 𓈖 𓇳',
      nomenTransliteration: 'Ꜣḫ-n-Jtn',
      nomenReadingAr: 'آخ-إن-آتُون (إخناتون)',
      nomenMeaningAr: 'المخلص النافع لقرص الشمس آتون'
    },
    horusNameAr: 'حورس كا-نخت مري-آتون',
    summaryBioAr: 'صاحب أول ثورة دينية وفلسفية وفنية موثقة في التاريخ؛ دعا إلى عبادة الإله الواحد الممثل في قرص الشمس «آتون» وأشعتها المنتهية بأيادٍ تهب الحياة للبشر، وأسس عاصمته الجديدة «أخت-آتون» (تل العمارنة بالمنيا) وتزوج الملكة الفاتنة نفرتيتي.',
    keyAchievementsAr: [
      'إطلاق الدعوة الآتونية التوحيدية وتأليف نشيد آتون الخالد.',
      'تأسيس عاصمة تل العمارنة وبناء المعابد المفتوحة للشمس بلا سقوف.',
      'إحداث ثورة فنية عبرت عن الواقعية التعبيرية والمشاعر الإنسانية الحميمية.'
    ],
    famousMonumentsAr: ['مدينة أخت-آتون (تل العمارنة)', 'لوحات الحدود الأربعة عشرة بالمنيا', 'تماثيل إخناتون بالكرنك العمارني'],
    burialPlaceAr: 'المقبرة الملكية بوادي العمارنة بالمنيا',
    mummyStatusAr: 'ترجح تحاليل الحمض النووي أن مومياء المقبرة KV55 بوادي الملوك تعود له',
    famousInscriptionSnippet: {
      hieroglyphs: '𓇋 𓏏 𓈖 𓇳 𓋹 𓎟 𓇿 𓇿 𓌷 𓂝 𓏏',
      transliteration: 'Jtn ꜥnḫ nb tꜣ.wj m Mꜣꜥ.t',
      translationAr: 'آتون الحي رب الأرضين القائم بالحق والجمال',
      sourceAr: 'نشيد آتون الأكبر على جدران مقبرة آي بالعمارنة'
    },
    audioSpeechScript: 'الملك إخناتون، الفرعون الموحد وناظم نشيد الشمس، نقل العاصمة لتل العمارنة وأحدث ثورة فكرية وفنية غير مسبوقة.'
  },
  {
    id: 'king-tutankhamun',
    commonNameAr: 'الملك توت عنخ آمون (الفرعون الذهبي)',
    commonNameEn: 'King Tutankhamun (The Golden Pharaoh)',
    reignPeriodBce: 'حوالي 1332 – 1323 ق.م',
    dynastyNumber: 18,
    dynastyAr: 'الأسرة الثامنة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 9,
    cartouche: {
      prenomenHieroglyphs: '𓎟 𓆣 𓂋 𓅱 𓂋 𓂝',
      prenomenTransliteration: 'Nb-ḫpr.w-Rꜥ',
      prenomenReadingAr: 'نِب-خِبِرُو-رَع',
      prenomenMeaningAr: 'رب التجليات والصيرورات المباركة للإله رع',
      nomenHieroglyphs: '𓏏 𓅱 𓏏 𓋹 𓇋 𓏠 𓈖 𓋾 𓉺 𓇓',
      nomenTransliteration: 'Twt-ꜥnḫ-Jmn ḥqꜣ-Jwnw-šmꜥ',
      nomenReadingAr: 'تُوت-عَنْخ-آمُون حِقَا-إيونو-شِمَع',
      nomenMeaningAr: 'الصورة الحية للإله آمون، حاكم أون الجنوبية (طيبة)'
    },
    horusNameAr: 'حورس كا-نخت توت-مسوت',
    summaryBioAr: 'الملك الأكثر شهرة في العالم؛ تولى العرش وهو فتى في التاسعة وأعاد الديانة التقليدية وطيبة، وتوفي في التاسعة عشرة من عمره. اكتشف هوارد كارتر مقبرته عام 1922 كاملة بكنوزها الذهبية التي تجاوزت 5000 قطعة مبهرة.',
    keyAchievementsAr: [
      'إصدار «مرسوم العودة» وإعادة فتح معابد الآلهة وإعمار طيبة والكرنك.',
      'الحفاظ على كنوز مقبرته (KV62) بكامل بهائها الأسطوري لأكثر من 3300 عام.',
      'قناع توت عنخ آمون الذهبي الخالص بوزن 11 كجم كأشهر أيقونة في تاريخ الحضارات.'
    ],
    famousMonumentsAr: ['المقبرة KV62 بوادي الملوك', 'القناع الذهبي والتابوت الذهبي الخالص بالمتحف المصري الكبير', 'كرسي العرش المذهب'],
    burialPlaceAr: 'المقبرة KV62 بوادي الملوك - الأقصر',
    mummyStatusAr: 'موميائه لا تزال مستقرة داخل مقبرته الأصلية بوادي الملوك بالأقصر',
    famousInscriptionSnippet: {
      hieroglyphs: '𓏏 𓅱 𓏏 𓋹 𓇋 𓏠 𓈖 𓎟 𓆣 𓂋 𓅱 𓂋 𓂝 𓋹',
      transliteration: 'Twt-ꜥnḫ-Jmn Nb-ḫpr.w-Rꜥ ꜥnḫ',
      translationAr: 'توت عنخ آمون نب-خبرو-رع حي للأبد',
      sourceAr: 'التابوت الذهبي الأوسط - مقبرة KV62'
    },
    audioSpeechScript: 'الملك توت عنخ آمون، الفرعون الذهبي الذي أسر عقول العالم باكتشاف مقبرته السليمة بوادي الملوك وقناعه الذهبي البديع.'
  },
  {
    id: 'king-seti-i',
    commonNameAr: 'الملك سيتي الأول (من-ماعت-رع)',
    commonNameEn: 'King Seti I (Menmaatre)',
    reignPeriodBce: 'حوالي 1290 – 1279 ق.م',
    dynastyNumber: 19,
    dynastyAr: 'الأسرة التاسعة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 11,
    cartouche: {
      prenomenHieroglyphs: '𓏠 𓈖 𓌷 𓂝 𓏏 𓂋 𓂝',
      prenomenTransliteration: 'Mn-Mꜣꜥ.t-Rꜥ',
      prenomenReadingAr: 'مِن-مَاعِت-رَع',
      prenomenMeaningAr: 'ثابت وراسخ هو حق وعدل الإله رع',
      nomenHieroglyphs: '𓊃 𓏏 𓐍 𓇋 𓌻 𓈖 𓊪 𓏏 𓎛',
      nomenTransliteration: 'Stḫj mry-n-Ptḥ',
      nomenReadingAr: 'سِتِي مِرِي-إن-پِتَاح',
      nomenMeaningAr: 'رجل الإله ست، المحبوب لدى بتاح'
    },
    horusNameAr: 'حورس كا-نخت خع-إم-واست س-عنخ-تاوي',
    summaryBioAr: 'فارس وقائد محنك وفنان الدولة الحديثة؛ والد رمسيس الثاني، استعاد سيطرة مصر على بلاد الشام وبنى صالة الأعمدة الكبرى بالكرنك ونقوش معبد أبيدوس التي تعد قمة النحت البارز في مصر القديمة، وصاحب أطول وأجمل مقبرة بوادي الملوك.',
    keyAchievementsAr: [
      'بناء صالة الأعمدة الكبرى بمعبد الكرنك (134 عموداً عملاقاً كغابة حجرية مقدسة).',
      'تشييد معبد أبيدوس العظيم وصاحب قائمة ملوك أبيدوس التاريخية.',
      'حفر مقبرته الأسطورية بوادي الملوك (KV17) المنقوشة بكتب العالم الآخر كاملة.'
    ],
    famousMonumentsAr: ['معبد سيتي الأول بأبيدوس', 'صالة الأعمدة الكبرى بالكرنك', 'مقبرة KV17 بوادي الملوك'],
    burialPlaceAr: 'المقبرة KV17 (مقبرة بلزوني) بوادي الملوك',
    mummyStatusAr: 'موميائه من أروع المومياوات حفظاً معروضة بمتحف الحضارة بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓏠 𓈖 𓌷 𓂝 𓏏 𓂋 𓂝 𓊹 𓄤 𓎟 𓇿 𓇿',
      transliteration: 'Mn-Mꜣꜥ.t-Rꜥ nṯr nfr nb tꜣ.wj',
      translationAr: 'من-ماعت-رع الإله الطيب سيد الأرضين',
      sourceAr: 'جدران بهو الأعمدة بمعبد أبيدوس'
    },
    audioSpeechScript: 'الملك سيتي الأول، المحارب المقدام وباني صالة الأعمدة الخارقة بالكرنك، صاحب معبد أبيدوس وأجمل نقوش الفن المصري الكلاسيكي.'
  },
  {
    id: 'king-ramesses-ii',
    commonNameAr: 'الملك رمسيس الثاني (الأكبر - وسر-ماعت-رع ستب-إن-رع)',
    commonNameEn: 'King Ramesses II (Ramesses The Great)',
    greekName: 'أوزيماندياس / Ozymandias',
    reignPeriodBce: 'حوالي 1279 – 1213 ق.م',
    dynastyNumber: 19,
    dynastyAr: 'الأسرة التاسعة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 66,
    cartouche: {
      prenomenHieroglyphs: '𓇳 𓅱 𓋴 𓂋 𓌷 𓂝 𓏏 𓇳 𓄥 𓈖',
      prenomenTransliteration: 'Wsr-Mꜣꜥ.t-Rꜥ stp-n-Rꜥ',
      prenomenReadingAr: 'وِسِر-مَاعِت-رَع سِتِب-إن-رَع',
      prenomenMeaningAr: 'قوي بعدالة الإله رع، المختار والمصطفى من رع',
      nomenHieroglyphs: '𓂋 𓂝 𓄟 𓋴 𓋴 𓌻 𓈖 𓇋 𓏠 𓈖',
      nomenTransliteration: 'Rꜥ-ms-sw mry-Jmn',
      nomenReadingAr: 'رَع-مِس-سُو مِرِي-آمُون (رمسيس)',
      nomenMeaningAr: 'رع أنجبه، المحبوب لدى الإله آمون'
    },
    horusNameAr: 'حورس كا-نخت مري-ماعت (الثور القوي محب العدل)',
    summaryBioAr: 'أشهر وأقوى فراعنة مصر؛ حكم 66 عاماً وعاش حتى جاوز التسعين، خاض معركة قادش الكبرى ضد الحيثيين وأبرم أول معاهدة سلام مكتوبة في التاريخ، بنى معبدي أبو سمبل والرامسيوم وتزوج الملكة الفاتنة نفرتاري.',
    keyAchievementsAr: [
      'خوض معركة قادش وإبرام أول معاهدة سلام مكتوبة في التاريخ مع ملك الحيثيين.',
      'نحت معبدي أبو سمبل الخالدين في صخور النوبة وظاهرة تعامد الشمس.',
      'بناء العاصمة الجديدة «بر-رمسيس» بالدلتا وتشييد معبد الرامسيوم الضخم بطيبة.'
    ],
    famousMonumentsAr: ['معبدا أبو سمبل الكبير والصغير', 'معبد الرامسيوم بطيبة', 'صرح وتماثيل معبد الأقصر'],
    burialPlaceAr: 'المقبرة KV7 بوادي الملوك',
    mummyStatusAr: 'موميائه الملكية الشهيرة معروضة بالمتحف القومي للحضارة المصرية بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓇳 𓅱 𓋴 𓂋 𓌷 𓂝 𓏏 𓇳 𓄥 𓈖 𓂋 𓂝 𓄟 𓋴 𓋴 𓋹',
      transliteration: 'Wsr-Mꜣꜥ.t-Rꜥ stp-n-Rꜥ Rꜥ-ms-sw ꜥnḫ',
      translationAr: 'وسر-ماعت-رع ستب-إن-رع، رمسيس محبوب آمون حي للأبد',
      sourceAr: 'واجهة معبد أبو سمبل الكبير بالنوبة'
    },
    audioSpeechScript: 'الملك رمسيس الثاني الأكبر، فرعون المجد والخلود، باني معبدي أبو سمبل وبطل معركة قادش وأول معاهدة سلام في التاريخ الإنساني.'
  },
  {
    id: 'king-merneptah',
    commonNameAr: 'الملك مرنبتاح (با-إن-رع مري-آمون)',
    commonNameEn: 'King Merneptah (Baenre)',
    reignPeriodBce: 'حوالي 1213 – 1203 ق.م',
    dynastyNumber: 19,
    dynastyAr: 'الأسرة التاسعة عشرة',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 10,
    cartouche: {
      prenomenHieroglyphs: '𓃀 𓄿 𓈖 𓂋 𓂝 𓌻 𓈖 𓇋 𓏠 𓈖',
      prenomenTransliteration: 'Bꜣ-n-Rꜥ mry-Jmn',
      prenomenReadingAr: 'بَا-إن-رَع مِرِي-آمُون',
      prenomenMeaningAr: 'روح الإله رع، المحبوب لدى آمون',
      nomenHieroglyphs: '𓌻 𓈖 𓊪 𓏏 𓎛 𓊵 𓏏 𓊪 𓁷 𓂋 𓌷 𓂝 𓏏',
      nomenTransliteration: 'Mr-n-Ptḥ ḥtp-ḥr-Mꜣꜥ.t',
      nomenReadingAr: 'مِر-إن-پِتَاح حُتِب-حِر-مَاعِت',
      nomenMeaningAr: 'محبوب الإله بتاح، المستريح على الحق والعدل'
    },
    horusNameAr: 'حورس كا-نخت حع-إم-ماعت',
    summaryBioAr: 'الابن الثالث عشر لرمسيس الثاني، تولى العرش في سن متقدمة وواجه بشجاعة غارات الليبيين وشعوب البحر وأنقذ مصر من الغزو، وصاحب «لوحة النصر» الشهيرة المعروضة بالمتحف المصري.',
    keyAchievementsAr: [
      'صد غزو تحالف شعوب البحر والليبيين وإنقاذ الدلتا في السنة الخامسة من حكمه.',
      'تخليد انتصاراته في لوحة النصر (لوحة مرنبتاح الشهيرة).',
      'تأمين طرق التجارة والسيادة المصرية في بلاد الشام وسيناء.'
    ],
    famousMonumentsAr: ['لوحة النصر (لوحة إسرائيل) بالمتحف المصري', 'قصره الملكي بمنف', 'مقبرة KV8 بوادي الملوك'],
    burialPlaceAr: 'المقبرة KV8 بوادي الملوك',
    mummyStatusAr: 'موميائه معروضة بقاعة المومياوات بمتحف الحضارة بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓃀 𓄿 𓈖 𓂋 𓂝 𓌻 𓈖 𓇋 𓏠 𓈖 𓎟 𓈍 𓂝 𓅱',
      transliteration: 'Bꜣ-n-Rꜥ mry-Jmn nb ḫꜥ.w',
      translationAr: 'با-إن-رع محبوب آمون رب الانتصارات',
      sourceAr: 'لوحة النصر لمرنبتاح - المتحف المصري بالتحرير'
    },
    audioSpeechScript: 'الملك مرنبتاح، ابن رمسيس الثاني وقاهر تحالف شعوب البحر في الدلتا، صاحب لوحة النصر التاريخية الخالدة.'
  },
  {
    id: 'king-ramesses-iii',
    commonNameAr: 'الملك رمسيس الثالث (وسر-ماعت-رع مري-آمون)',
    commonNameEn: 'King Ramesses III',
    reignPeriodBce: 'حوالي 1184 – 1153 ق.م',
    dynastyNumber: 20,
    dynastyAr: 'الأسرة العشرون',
    eraCategory: 'new_kingdom',
    eraCategoryAr: 'عصر الإمبراطورية والمجد (الدولة الحديثة)',
    approximateYearsReigned: 31,
    cartouche: {
      prenomenHieroglyphs: '𓇳 𓅱 𓋴 𓂋 𓌷 𓂝 𓏏 𓌻 𓈖 𓇋 𓏠 𓈖',
      prenomenTransliteration: 'Wsr-Mꜣꜥ.t-Rꜥ mry-Jmn',
      prenomenReadingAr: 'وِسِر-مَاعِت-رَع مِرِي-آمُون',
      prenomenMeaningAr: 'قوي بعدل رع، المحبوب لدى آمون',
      nomenHieroglyphs: '𓂋 𓂝 𓄟 𓋴 𓋴 𓋾 𓉺 𓇓',
      nomenTransliteration: 'Rꜥ-ms-sw ḥqꜣ-Jwnw',
      nomenReadingAr: 'رَع-مِس-سُو حِقَا-إيونو',
      nomenMeaningAr: 'رمسيس حاكم أون'
    },
    horusNameAr: 'حورس كا-نخت عا-نسوت',
    summaryBioAr: 'آخر الفراعنة المحاربين العظام في الدولة الحديثة؛ أنقذ مصر وحوض البحر المتوسط من كارثة غزو «شعوب البحر» وسحقهم في معارك برية وبحرية تاريخية، وبنى معبد مدينة هابو الحصين غرب طيبة.',
    keyAchievementsAr: [
      'الانتصار في أول معركة بحرية موثقة في التاريخ وسحق أساطيل شعوب البحر.',
      'بناء معبد مدينة هابو الجنائزي الضخم بنقوشه الملونة وأبراجه الشبيهة بالقلاع السورية.',
      'توثيق سجلات وهبات الدولة في أطول بردية بالتاريخ (بردية هاريس الكبرى - 41 متراً).'
    ],
    famousMonumentsAr: ['معبد مدينة هابو بطيبة الغربية', 'بردية هاريس الكبرى بالمتحف البريطاني', 'مقبرة KV11 بوادي الملوك'],
    burialPlaceAr: 'المقبرة KV11 بوادي الملوك',
    mummyStatusAr: 'موميائه معروضة بالمتحف القومي للحضارة المصرية بالفسطاط',
    famousInscriptionSnippet: {
      hieroglyphs: '𓇳 𓅱 𓋴 𓂋 𓌷 𓂝 𓏏 𓂋 𓂝 𓄟 𓋴 𓋴 𓎟 𓈍 𓂝 𓅱',
      transliteration: 'Wsr-Mꜣꜥ.t-Rꜥ Rꜥ-ms-sw nb ḫꜥ.w',
      translationAr: 'وسر-ماعت-رع رمسيس الثالث رب الظفر والخلود',
      sourceAr: 'نقوش المعركة البحرية بمعبد مدينة هابو'
    },
    audioSpeechScript: 'الملك رمسيس الثالث، آخر الفراعنة المحاربين العظام، قاهر شعوب البحر في المعركة البحرية الشهيرة وباني معبد مدينة هابو الحصين.'
  },
  {
    id: 'king-shoshenq-i',
    commonNameAr: 'الملك شوشنق الأول (حدج-خبر-رع ستب-إن-رع)',
    commonNameEn: 'King Shoshenq I (Shishak)',
    reignPeriodBce: 'حوالي 945 – 924 ق.م',
    dynastyNumber: 22,
    dynastyAr: 'الأسرة الثانية والعشرون',
    eraCategory: 'late_period',
    eraCategoryAr: 'العصور المتأخرة والنهضة الصاوية',
    approximateYearsReigned: 21,
    cartouche: {
      prenomenHieroglyphs: '𓌉 𓆣 𓂋 𓂋 𓂝 𓄥 𓈖 𓂋 𓂝',
      prenomenTransliteration: 'Ḥḏ-ḫpr-Rꜥ stp-n-Rꜥ',
      prenomenReadingAr: 'حِدْج-خِبِر-رَع سِتِب-إن-رَع',
      prenomenMeaningAr: 'المضيء هو تجلي رع، المختار من رع',
      nomenHieroglyphs: '𓈙 𓈙 𓈖 𓈎 𓌻 𓈖 𓇋 𓏠 𓈖',
      nomenTransliteration: 'Ššnq mry-Jmn',
      nomenReadingAr: 'شُوشِنْق مِرِي-آمُون',
      nomenMeaningAr: 'شوشنق محبوب الإله آمون'
    },
    horusNameAr: 'حورس كا-نخت خع-إم-واست',
    summaryBioAr: 'مؤسس الأسرة الثانية والعشرين؛ أعاد هيبة مصر الخارجية بحملته العسكرية الكبرى على بلاد الشام وفلسطين التي سجلها على جدران «بوابة بوباسطة» بمعبد الكرنك، واشتهر في النصوص القديمة باسم شيشق.',
    keyAchievementsAr: [
      'إعادة توحيد أقاليم مصر وربط طيبة والوجه البحري بحكم مركزي قوي.',
      'شن الحملة العسكرية الكبرى على فلسطين في السنة العشرين من حكمه.',
      'تشييد بوابة بوباسطة العظيمة بالكرنك المسجل عليها أسماء أكثر من 150 مدينة خضعت له.'
    ],
    famousMonumentsAr: ['بوابة بوباسطة بمعبد الكرنك', 'آثار تانيس (صان الحجر) بالشرقية', 'مقبرته بجبانة تانيس الملكية'],
    burialPlaceAr: 'الجبانة الملكية بتانيس (صان الحجر) بالشرقية',
    mummyStatusAr: 'عُثر على مقتنياته الذهبية وحليّه بجبانة تانيس بالمتحف المصري',
    famousInscriptionSnippet: {
      hieroglyphs: '𓈙 𓈙 𓈖 𓈎 𓌻 𓈖 𓇋 𓏠 𓈖 𓋹 𓆓 𓏏',
      transliteration: 'Ššnq mry-Jmn ꜥnḫ ḏ.t',
      translationAr: 'شوشنق محبوب آمون حي إلى أبد الآبدين',
      sourceAr: 'بوابة بوباسطة - الفناء الأول بمعبد الكرنك'
    },
    audioSpeechScript: 'الملك شوشنق الأول، مؤسس الأسرة الثانية والعشرين، قاد حملته الظافرة إلى بلاد الشام وسجل مدنها على بوابة بوباسطة بالكرنك.'
  },
  {
    id: 'king-piye',
    commonNameAr: 'الملك بعنخي (بيا موحد مصر والنوبة)',
    commonNameEn: 'King Piye (Piankhi)',
    reignPeriodBce: 'حوالي 747 – 716 ق.م',
    dynastyNumber: 25,
    dynastyAr: 'الأسرة الخامسة والعشرون (الكوشية)',
    eraCategory: 'late_period',
    eraCategoryAr: 'العصور المتأخرة والنهضة الصاوية',
    approximateYearsReigned: 31,
    cartouche: {
      prenomenHieroglyphs: '𓇳 𓅱 𓋴 𓂋 𓌷 𓂝 𓏏',
      prenomenTransliteration: 'Wsr-Mꜣꜥ.t-Rꜥ',
      prenomenReadingAr: 'وِسِر-مَاعِت-رَع',
      prenomenMeaningAr: 'قوي بعدالة الإله رع',
      nomenHieroglyphs: '𓊪 𓇋 𓋹 𓈖 𓐍 𓇋',
      nomenTransliteration: 'P-ꜥnḫ-j',
      nomenReadingAr: 'بِيَانْخِي / بِيَا',
      nomenMeaningAr: 'الحي المبارك / واهب الحياة'
    },
    horusNameAr: 'حورس س-ما-تاوي (جامع القطرين)',
    summaryBioAr: 'الملك الكوشي البار الذي زحف شمالاً لتوحيد مصر وحماية المعابد من التفكك، واعتبر نفسه حامي الإله آمون وتقاليد مصر العريقة. دوّن ملحمته في «لوحة النصر» الشهيرة بجبل البركل التي تعد قمة في الأدب العسكري والأخلاقي وحب الخيول.',
    keyAchievementsAr: [
      'توحيد وادي النيل كاملاً من الشلال الرابع حتى شواطئ البحر المتوسط.',
      'تدوين لوحة النصر بجبل البركل (نص ملحمي يجمع بين البراعة الحربية والتقوى الدينية).',
      'إحياء تقاليد بناء الأهرامات الملكية وإعمار معبد آمون بالبركل والكرنك.'
    ],
    famousMonumentsAr: ['لوحة نصر بعنخي بمتحف القاهرة', 'هرم بعنخي في الكرو بالنوبة', 'معبد آمون بجبل البركل'],
    burialPlaceAr: 'جبانة الكرو بالنوبة (تحت هرم ملكي)',
    mummyStatusAr: 'دفن في الكرو مع مدافن مخصصة لخيوله الحربية النبيلة',
    famousInscriptionSnippet: {
      hieroglyphs: '𓊪 𓇋 𓋹 𓈖 𓐍 𓇋 𓎟 𓇿 𓇿 𓌻 𓈖 𓇋 𓏠 𓈖',
      transliteration: 'Pj mry-Jmn nb tꜣ.wj',
      translationAr: 'بيا محبوب آمون سيد الأرضين والعدل',
      sourceAr: 'لوحة النصر بجبل البركل بالنوبة'
    },
    audioSpeechScript: 'الملك بعنخي أو بيا، موحد مصر والنوبة ومؤسس مجد الأسرة الخامسة والعشرين، صاحب لوحة النصر العظيمة وحامي تقاليد معابد آمون.'
  },
  {
    id: 'king-taharqa',
    commonNameAr: 'الملك طهارقة (نفر-تم-خع-رع)',
    commonNameEn: 'King Taharqa',
    reignPeriodBce: 'حوالي 690 – 664 ق.م',
    dynastyNumber: 25,
    dynastyAr: 'الأسرة الخامسة والعشرون (الكوشية)',
    eraCategory: 'late_period',
    eraCategoryAr: 'العصور المتأخرة والنهضة الصاوية',
    approximateYearsReigned: 26,
    cartouche: {
      prenomenHieroglyphs: '𓄤 𓏏 𓅓 𓐍 𓂝 𓂋 𓂝',
      prenomenTransliteration: 'Nfr-tm-ḫꜥ-Rꜥ',
      prenomenReadingAr: 'نَفْر-تُم-خَع-رَع',
      prenomenMeaningAr: 'جميل هو الإله نفرتوم المشرق مع رع',
      nomenHieroglyphs: '𓏏 𓎛 𓂋 𓈎',
      nomenTransliteration: 'T-h-r-q',
      nomenReadingAr: 'طَهَارْقَا (طهارقة)',
      nomenMeaningAr: 'طهارقة المحارب القوي'
    },
    horusNameAr: 'حورس قاي-خعو (سامي المشارق)',
    summaryBioAr: 'الملك الباني وأشهر ملوك الأسرة الخامسة والعشرين؛ شهد عهده طفرة عمرانية كبرى في معابد الكرنك وسنم والكوة، واشتهر بعمود طهارقة الشاهق (21 متراً) في فناء الكرنك، وخاض حروباً دفاعية ضارية ضد الإمبراطورية الآشورية.',
    keyAchievementsAr: [
      'تشييد صرح وعمود طهارقة الأيقوني الشهير في الفناء الأول بمعبد الكرنك.',
      'نهضة زراعية وتجارية كبرى بفضل فيضان النيل الاستثنائي في سنته السادسة.',
      'بناء أضخم هرم في بلاد النوبة بمنطقة نوري بارتفاع جاوز 50 متراً.'
    ],
    famousMonumentsAr: ['عمود طهارقة بمعبد الكرنك', 'هرم طهارقة بنوري بالنوبة', 'تمثال طهارقة برأس الكبش الآموني بالمتحف البريطاني'],
    burialPlaceAr: 'هرم نوري الملكي بالنوبة',
    mummyStatusAr: 'عُثر على تماثيل أوشابتي فاخرة ومقتنيات ذهبية داخل مقبرته بنوري',
    famousInscriptionSnippet: {
      hieroglyphs: '𓄤 𓏏 𓅓 𓐍 𓂝 𓂋 𓂝 𓏏 𓎛 𓂋 𓈎 𓋹',
      transliteration: 'Nfr-tm-ḫꜥ-Rꜥ Thrq ꜥnḫ',
      translationAr: 'نفر-تم-خع-رع طهارقة حي إلى الأبد',
      sourceAr: 'لوحات فيضان السنة السادسة بالكرنك والكوة'
    },
    audioSpeechScript: 'الملك طهارقة، الملك الباني صاحب العمود الشهير في فناء معبد الكرنك وهرم نوري، دافع عن مصر وحافظ على تراثها المعماري والديني.'
  },
  {
    id: 'king-psamtik-i',
    commonNameAr: 'الملك بسماتيك الأول (واح-إب-رع محرر مصر)',
    commonNameEn: 'King Psamtik I (Wahibre)',
    reignPeriodBce: 'حوالي 664 – 610 ق.م',
    dynastyNumber: 26,
    dynastyAr: 'الأسرة السادسة والعشرون (الصاوية)',
    eraCategory: 'late_period',
    eraCategoryAr: 'العصور المتأخرة والنهضة الصاوية',
    approximateYearsReigned: 54,
    cartouche: {
      prenomenHieroglyphs: '𓅱 𓄤 𓄣 𓂋 𓂝',
      prenomenTransliteration: 'Wꜣḥ-jb-Rꜥ',
      prenomenReadingAr: 'وَاح-إِب-رَع',
      prenomenMeaningAr: 'ثابت وراسخ هو فؤاد الإله رع',
      nomenHieroglyphs: '𓊪 𓋴 𓅓 𓍿 𓎡',
      nomenTransliteration: 'P-s-m-ṯ-k',
      nomenReadingAr: 'بِسْمَاتِيك (بسماتيك الأول)',
      nomenMeaningAr: 'رجل الإله متك / المحمي'
    },
    horusNameAr: 'حورس عا-إب (عظيم الفؤاد والهمة)',
    summaryBioAr: 'مؤسس عصر «النهضة الصاوية» ومحرر مصر من الاحتلال الآشوري؛ اتخذ من مدينة سايس (صا الحجر بالغربية) عاصمة لمصر، وشهد عهده عودة مجيدة لفنون وعمارة الدولة القديمة ونصوص الأهرام وتأسيس أول أسطول بحري على البحر المتوسط.',
    keyAchievementsAr: [
      'طرد الحاميات الآشورية وإعادة توحيد مصر كاملة تحت حكم وطني موحد.',
      'إطلاق عصر النهضة الصاوية ومحاكاة فنون وأدب الدولة القديمة والوسطى.',
      'إنشاء مدينة نقراطيس التجارية بالدلتا وتأسيس أسطول حربي متطور.'
    ],
    famousMonumentsAr: ['تمثال بسماتيك الأول العملاق المكتشف بالمطرية (عين شمس)', 'آثار صا الحجر (سايس) بالغربية', 'نقوش معبد الموت بسقارة'],
    burialPlaceAr: 'الجبانة الملكية في صا الحجر (سايس) بالدلتا',
    mummyStatusAr: 'فُقدت مقابر ملوك سايس بسبب فيضانات الدلتا والمياه الجوفية',
    famousInscriptionSnippet: {
      hieroglyphs: '𓅱 𓄤 𓄣 𓂋 𓂝 𓊪 𓋴 𓅓 𓍿 𓎡 𓋹 𓆓 𓏏',
      transliteration: 'Wꜣḥ-jb-Rꜥ Psmtk ꜥnḫ ḏ.t',
      translationAr: 'واح-إب-رع بسماتيك حي للأبد',
      sourceAr: 'تمثال بسماتيك الأول العملاق المكتشف بسوق الخميس بالمطرية'
    },
    audioSpeechScript: 'الملك بسماتيك الأول، محرر مصر من الآشوريين ومؤسس الأسرة السادسة والعشرين الصاوية، قاد نهضة وطنية أعادت مجد فنون الأجداد.'
  },
  {
    id: 'queen-cleopatra-vii',
    commonNameAr: 'الملكة كليوباترا السابعة (فيلوباتور - آخر ملوك مصر قبل الميلاد)',
    commonNameEn: 'Queen Cleopatra VII Philopator',
    reignPeriodBce: '51 – 30 ق.م',
    dynastyNumber: 32,
    dynastyAr: 'الأسرة البطلمية',
    eraCategory: 'ptolemaic',
    eraCategoryAr: 'العصر البطلمي قبل الميلاد',
    approximateYearsReigned: 21,
    cartouche: {
      prenomenHieroglyphs: '𓈎 𓃭 𓍯 𓊪 𓂧 𓂋 𓄿 𓏏',
      prenomenTransliteration: 'Ql-w-p-d-r-ꜣ-t',
      prenomenReadingAr: 'كْلِيُوبَاتْرَا (كليوباترا)',
      prenomenMeaningAr: 'فخر أبيها ومجده (Philopator)',
      nomenHieroglyphs: '𓈖 𓏏 𓂋 𓏏 𓌻 𓂋 𓇋 𓏏 𓋴 𓏏 𓇋 𓏏 𓊃',
      nomenTransliteration: 'Nṯr.t mr.t-jt=s',
      nomenReadingAr: 'نِتِرِت مِريت-إِتِس',
      nomenMeaningAr: 'المعبودة المحبة لأبيها ووطنها'
    },
    horusNameAr: 'حورس الإلهة إيزيس الجديدة (ني-إيزيس)',
    summaryBioAr: 'آخر ملوك مصر القديمة المستقلة قبل الميلاد؛ تميزت بالذكاء السياسي والدبلوماسي الفذ وتحدثت تسع لغات وكانت الوحيدة من حكام البطالمة التي تعلمت اللغة المصرية القديمة وتحدثت بها لشعبها. شيدت معبد دندرة الباهر وتحالفت مع يوليوس قيصر وماركوس أنطونيوس.',
    keyAchievementsAr: [
      'الملكة الوحيدة من البطالمة التي أتقنت وتحدثت باللغة المصرية القديمة الهيروغليفية.',
      'إكمال بناء وتزيين معبد حتحور الأسطوري بدندرة ونقش خراطيشها على جدرانه.',
      'الدفاع المستميت عن استقلال مصر السياسي في مواجهة التوسع الروماني حتى وفاتها عام 30 ق.م.'
    ],
    famousMonumentsAr: ['نقوش كليوباترا وابنها قيصرون على جدار معبد دندرة', 'المسلة الملكية بجزيرة فيلة', 'آثار الإسكندرية الغارقة بالميناء الشرقي'],
    burialPlaceAr: 'مقبرة ملكية بالإسكندرية أو تابوزيريس ماجنا (لا تزال مجهولة)',
    mummyStatusAr: 'لم تكتشف مقبرتها حتى الآن وتعد أعظم ألغاز علم الآثار الحديث',
    famousInscriptionSnippet: {
      hieroglyphs: '𓈎 𓃭 𓍯 𓊪 𓂧 𓂋 𓄿 𓏏 𓊹 𓏏 𓌷 𓂝 𓏏',
      transliteration: 'Qlw-p-d-r-ꜣ nṯr.t mr.t-jt=s',
      translationAr: 'كليوباترا المعبودة المحبة لوالدها ولوطنها',
      sourceAr: 'الجدار الخلفي لمعبد دندرة بقنا'
    },
    audioSpeechScript: 'الملكة كليوباترا السابعة، آخر ملوك مصر المستقلة قبل الميلاد، الحاكمة الذكية التي أتقنت اللغة المصرية القديمة وحمت سيادة وادي النيل حتى عام 30 قبل الميلاد.'
  }
];

export function getKingEpigraphicStyle(king: PharaohKingEntry): import('../types').EpigraphicCartoucheStyle {
  if (king.id === 'king-narmer') {
    return {
      frameType: 'serekh',
      eraStyleNameAr: 'أسلوب السَّرَخ الحوري الملكي (العصر العتيق والأسرات المبكرة)',
      writingMediumAr: 'حجر الشست الأخضر والأردواز الأسود المصقول',
      scribalTechniqueAr: 'نقش بارز دقيق بحواف حادة، يوضع الاسم الملكي داخل واجهة القصر المحصن (السرخ 𓊁) ويعلوه الصقر حورس مباشرة حاملاً السيادة الإلهية، وذلك قبل اختراع حبل الشنو البيضاوي بمئات السنين.',
      calligraphyNoteAr: 'كُتب الاسم بعلامتي السلور القاتل (نعر 𓈖𓂋) والإزميل الحاد (مر 𓈘𓂋) بأبعاد واقعية كبرى تعكس هيبة الملك الفاتح وموحد القطرين.'
    };
  }

  if (king.id === 'king-akhenaten') {
    return {
      frameType: 'amarna_sunken',
      eraStyleNameAr: 'أسلوب العمارنة الواقعي ذو الخطوط المنحنية وأشعة آتون',
      writingMediumAr: 'حجر الكلس النقي والألباستر بمحاجر تل العمارنة',
      scribalTechniqueAr: 'نقش غائر مبتكر يبتعد عن الخطوط الهندسية الصارمة، محاطاً بأشعة الشمس الممتدة بأيادٍ بشرية تهب علامة الحياة (عنخ 𓋹) للخرطوشة الملكية مباشرة.',
      calligraphyNoteAr: 'إلغاء اسم الإله آمون واستبداله بقرص الشمس آتون، مع إدخال حركة حيوية عفوية في كتابة الرموز الهيروغليفية.'
    };
  }

  if (king.id === 'king-tutankhamun') {
    return {
      frameType: 'new_kingdom_gold',
      eraStyleNameAr: 'أسلوب مقتنيات المقبرة الذهبية المطعمة باللازورد (وادي الملوك)',
      writingMediumAr: 'الذهب الخالص عيار 22، واللازورد الأفغاني، والمرمر المصري',
      scribalTechniqueAr: 'صياغة ملكية فاخرة مرصعة بالعقيق والأحجار الكريمة، تجسد عودة عبادة آمون واستقرار الدولة بعد ثورة العمارنة، مع خرطوشة بيضاوية ذات عقدة محكمة مشدودة.',
      calligraphyNoteAr: 'اسم (توت-عنخ-آمون حِقا-إيونو-شِمعو) يجمع بين الصورة الحية لآمون ولقب حاكم هليوبوليس الجنوبية.'
    };
  }

  if (king.eraCategory === 'old_kingdom') {
    return {
      frameType: 'old_kingdom_limestone',
      eraStyleNameAr: 'أسلوب النقش الغائر على الحجر الجيري الناصع (عصر بناة الأهرام)',
      writingMediumAr: 'الحجر الجيري الأبيض الناصع المستخرج من محاجر طرة بالمعادي',
      scribalTechniqueAr: 'حفر غائر عميق ومنتظم الزوايا ابتكره مهندسو الدولة القديمة، مع حبل الشنو البيضاوي ذي العقدة الأفقية العريضة التي تمثل الحماية الكونية الأبدية للاسم الملكي.',
      calligraphyNoteAr: 'خطوط صارمة متناسقة ومهيبة تتطابق مع فلسفة خلود الأهرامات الكبرى في الجيزة وسقارة ودهشور.'
    };
  }

  if (king.eraCategory === 'middle_kingdom') {
    return {
      frameType: 'middle_kingdom_papyrus',
      eraStyleNameAr: 'أسلوب عصر النهضة والخط الكلاسيكي المتوازن (الدولة الوسطى)',
      writingMediumAr: 'الحجر الجيري الملون ولفائف البردي الطيبة بالمداد الأسود والمغرة الحمراء',
      scribalTechniqueAr: 'العصر الذهبي للغة المصرية الفصحى الكلاسيكية؛ توازن صوتي مثالي ونسب هندسية دقيقة لرموز الطيور والحيوانات مع قلم البوص المشطوف.',
      calligraphyNoteAr: 'استقرار القواعد المعيارية للكتبة الملكيين وتفصيل العلامات الثلاثية والثنائية بدقة متناهية.'
    };
  }

  if (king.eraCategory === 'new_kingdom') {
    return {
      frameType: 'new_kingdom_gold',
      eraStyleNameAr: 'أسلوب النقش الإمبراطوري الرعامسي الغائر والمطلي بالذهب',
      writingMediumAr: 'الجرانيت الوردي بأسوان وصخور معابد الكرنك والأقصر وأبو سمبل',
      scribalTechniqueAr: 'حفر غائر عميق جداً يصل إلى عدة سنتيمترات لمنع أي طمس، مكسو برقائق الذهب ومطعم بالألوان الملكية على الصروح والمسلات العملاقة.',
      calligraphyNoteAr: 'ظهور الألقاب العسكرية والفتوحات الكبرى وتكرار اسم رع وآمون في خراطيش التتويج للتأكيد على الشرعية والسيادة.'
    };
  }

  if (king.eraCategory === 'late_period') {
    return {
      frameType: 'late_period_basalt',
      eraStyleNameAr: 'أسلوب النهضة الكوشية والساوية المنحوت على البازلت',
      writingMediumAr: 'الجرانيت الرمادي فائق الصلابة وحجر البازلت الأسود',
      scribalTechniqueAr: 'إحياء واثق لتقاليد الدولة القديمة المصمتة، مع إضافة الكوبرا المزدوجة في خراطيش الملوك النوبيين كرمز لسيادة كوش ومصر معاً.',
      calligraphyNoteAr: 'دقة فائقة في صقل الحجارة البركانية الصعبة بمطارق الديوريت ونقوش غائرة متقنة الصنعة.'
    };
  }

  // Default / Ptolemaic
  return {
    frameType: 'ptolemaic_floral',
    eraStyleNameAr: 'أسلوب النقش البطلمي البارز المزخرف (High Relief)',
    writingMediumAr: 'الحجر الرملي بمعبد دندرة وإدفو ومحاجر جبل السلسلة',
    scribalTechniqueAr: 'نقش بارز ممتلئ وتفاصيل تزيينية لتيجان اللوتس والريش، مع استخدام علامات صوتية دقيقة لنقحرة الأسماء اليونانية داخل الخرطوشة الهيروغليفية.',
    calligraphyNoteAr: 'خرطوشة كليوباترا الشهيرة التي اعتمد عليها فرانسوا شامبليون كحجر زاوية لحل شفرة حجر رشيد واستعادة قراءة الهيروغليفية!'
  };
}

