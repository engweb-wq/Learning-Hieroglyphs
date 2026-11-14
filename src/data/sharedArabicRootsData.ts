import { SharedRootEntry } from '../types';

export interface PhoneticCorrespondenceLaw {
  id: string;
  egyptianSign: string;
  egyptianTranslit: string;
  arabicLetter: string;
  titleAr: string;
  explanationAr: string;
  samplePairAr: string;
}

export const PHONETIC_CORRESPONDENCE_LAWS: PhoneticCorrespondenceLaw[] = [
  {
    id: 'law-ayin',
    egyptianSign: '𓂝',
    egyptianTranslit: 'ꜥ (D36)',
    arabicLetter: 'ع',
    titleAr: 'تطابق العين الحلقية الصريحة',
    explanationAr: 'حرف العين الحلقي في المصرية القديمة يطابق حرف «ع» في العربية واللغات السامية، وهو دليل قوي على الأصل الأفروآسيوي الواحد.',
    samplePairAr: '𓋹 عنخ / 𓂝𓈖𓐍 ↔ عيش / نفس · 𓎝𓃀 ↔ عب / طهر'
  },
  {
    id: 'law-ha',
    egyptianSign: '𓎛',
    egyptianTranslit: 'ḥ (V28)',
    arabicLetter: 'ح',
    titleAr: 'تطابق الحاء الحلقية المهموسة',
    explanationAr: 'الفتيلة المجدولة (ḥ) في الهيروغليفية تقابل حرف «ح» الخالص في العربية، وتحتفظ بالكثير من جذور الحياة والسكينة والحدود.',
    samplePairAr: '𓊵 حتب ↔ حطّ / هدوء · 𓎛𓆰𓈖𓏏 ↔ حِنطة / قمح'
  },
  {
    id: 'law-water-mem',
    egyptianSign: '𓅓 / 𓈖',
    egyptianTranslit: 'm (G17)',
    arabicLetter: 'م',
    titleAr: 'ثبات صوت الميم في الأسماء الأساسية',
    explanationAr: 'الألفاظ التأسيسية كالماء والموت والضمير احتفظت بصوت الميم ثابتاً منذ عصر ما قبل الأسرات وحتى العربية الفصحى.',
    samplePairAr: '𓈗 مُو ↔ ماء · 𓅓𓏏 مُوت ↔ موت'
  },
  {
    id: 'law-liquid-shift',
    egyptianSign: '𓂋 / 𓃀',
    egyptianTranslit: 'r / b ↔ ل',
    arabicLetter: 'ل / ر',
    titleAr: 'الإبدال الصوتي بين (ر/ب) واللام',
    explanationAr: 'لم يكن للمصرية الكلاسيكية رمز مستقل لحرف اللام، فاستعاضت عنه أحياناً بالراء أو الهمزة أو الياء في كلمات تتطابق جذرياً مع العربية.',
    samplePairAr: '𓄣 إب ↔ لُبّ (القلب) · 𓄓 نَس ↔ لِسان'
  },
  {
    id: 'law-yod',
    egyptianSign: '𓇋',
    egyptianTranslit: 'j / y (M17)',
    arabicLetter: 'ي / أ',
    titleAr: 'توافق الياء والهمزة في البدايات',
    explanationAr: 'قصب الغاب (j) يؤدي وظيفة الياء والهمزة الابتدائية في صياغة الأفعال والأسماء، ويقابلهما مباشرة في الجذور الثلاثية العربية.',
    samplePairAr: '𓇋𓏠𓈖 إمن ↔ يمين · 𓇋𓅱𓅓 يم ↔ يمّ (بحر)'
  }
];

export const SHARED_ARABIC_ROOTS_DATA: SharedRootEntry[] = [
  {
    id: 'root-mw-maa',
    hieroglyphs: '𓈖𓈗',
    gardinerCodes: ['N35', 'N35A'],
    transliteration: 'mw',
    approximatePronunciationAr: 'مُو (أو مَو)',
    arabicMeaning: 'ماء، مياه جارية، سائل الحياة',
    englishMeaning: 'Water',
    arabicCognate: 'مَاء / مَوْه',
    arabicRoot: 'م - و - هـ',
    consonantBridge: [
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم شفوية ثابتة' },
      { egyptian: 'w (𓅱)', arabic: 'و / ا', noteAr: 'واو مدية (ماء أصله مَوَه)' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'أجمع علماء اللسانيات المقارنة على أن كلمة «مُو» المصرية وكلمة «مَاء» العربية (وجمعها مِياه وأصل جذرها مَوَه) تنحدران من جذر أفروآسيوي واحد هو (ma-/mw-) الدال على السائل الأول للحياة.',
    phoneticLawSummaryAr: 'تطابق تام لصوت الميم والواو الممدودة (mw ↔ مَوْ/ماء).',
    examples: [
      {
        hieroglyphs: '𓈗 𓈖 𓇋𓏏𓂋𓅱 𓉻',
        transliteration: 'mw n jtrw ꜥꜣ',
        phoneticAr: 'مُو إن إتْرُو عَا',
        arabicTranslation: 'ماءُ النهرِ العظيم (مياه النيل)',
        arabicParallelSentence: 'يُقال في العربية: «ماءُ النهرِ العذبِ يجري في الوادي».'
      },
      {
        hieroglyphs: '𓂞 𓏤 𓈗 𓈖 𓋴𓈙𓏞',
        transliteration: 'dj mw n sš',
        phoneticAr: 'دِي مُو إن سِش',
        arabicTranslation: 'أعطِ ماءً للكاتب',
        arabicParallelSentence: 'ولا يزال الأطفال في مصر يطلبون الشرب بكلمة «إمبو» الموروثة من اللفظ نفسه.'
      }
    ]
  },
  {
    id: 'root-jb-lubb',
    hieroglyphs: '𓄣',
    gardinerCodes: ['F34'],
    transliteration: 'jb',
    approximatePronunciationAr: 'إِب (بهمزة مكسورة)',
    arabicMeaning: 'قلب، فؤاد، عقل وضمير باطني',
    englishMeaning: 'Heart / Mind / Inner Self',
    arabicCognate: 'لُبّ (أَلْبَاب)',
    arabicRoot: 'ل - ب - ب',
    consonantBridge: [
      { egyptian: 'j (𓇋)', arabic: 'ل', noteAr: 'إبدال تاريخي من اللام إلى الياء/الهمزة' },
      { egyptian: 'b (𓃀)', arabic: 'ب', noteAr: 'باء شفوية مطابقة تماماً' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'body_life',
    domainLabelAr: 'الجسم والروح',
    similarityExplanationAr: 'تعني «إب» في الهيروغليفية مركز الإحساس والعقل والضمير الذي يُوزن يوم الحساب؛ وهي مطابقة في الدلالة والجذر لكلمة «لُبّ» العربية (أصحاب الألباب = أصحاب العقول والقلوب الواعية) مع تحوّل اللام القديمة إلى همزة/ياء في المصرية.',
    phoneticLawSummaryAr: 'توافق الجذر الثنائي (l-b ↔ j-b) في الدلالة على مركز العقل والشعور.',
    examples: [
      {
        hieroglyphs: '𓄤 𓄣',
        transliteration: 'nfr jb',
        phoneticAr: 'نِفِر إِب',
        arabicTranslation: 'طيّبُ القلب / سعيدُ الفؤاد',
        arabicParallelSentence: 'في العربية: «فلانٌ نقيُّ اللُّبِّ وسليمُ القلبِ».'
      },
      {
        hieroglyphs: '𓂝𓃀 𓄣 𓎡',
        transliteration: 'ꜥb jb.k',
        phoneticAr: 'عَب إِبِك',
        arabicTranslation: 'طهّر قلبَك / نقِّ ضميرَك',
        arabicParallelSentence: 'يُقال في الوعظ العربي: «زكِّ لبَّك وصفِّ سريرتك».'
      }
    ]
  },
  {
    id: 'root-jmn-yamin',
    hieroglyphs: '𓇋𓏠𓈖𓏏',
    gardinerCodes: ['M17', 'Y5', 'N35', 'X1'],
    transliteration: 'jmnt / jmn',
    approximatePronunciationAr: 'إِمِن / إِمِنْت',
    arabicMeaning: 'اليمين، الجانب الأيمن، الغرب (حيث تغرب الشمس إذا واجهت الجنوب)',
    englishMeaning: 'Right Side / West',
    arabicCognate: 'يَمِين / أَيْمَن',
    arabicRoot: 'ي - م - ن',
    consonantBridge: [
      { egyptian: 'j (𓇋)', arabic: 'ي', noteAr: 'تطابق الياء الابتدائية' },
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم أصلية' },
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون أصلية' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'تطابق ثلاثي كامل الحروف (j-m-n ↔ ي-م-ن)! كان المصري يتجه ببصره نحو منبع النيل (الجنوب)، فكان الجانب الأيمن عن يمينه هو الغرب، ولهذا دلت «إمنت» على اليمين وعلى الغرب معاً، تماماً كما تحمل «اليمن/اليمين» دلالة الجهة والبركة في العربية.',
    phoneticLawSummaryAr: 'تطابق صامت ثلاثي تام (j-m-n ↔ ي-م-ن) في الجهة الجغرافية.',
    examples: [
      {
        hieroglyphs: '𓇋𓏠𓈖𓏏 𓄤𓏏',
        transliteration: 'jmnt nfrt',
        phoneticAr: 'إِمِنْت نِفْرِت',
        arabicTranslation: 'الجانب الأيمن الجميل (الغرب المبارك)',
        arabicParallelSentence: 'في العربية: «أصحابُ الميمنةِ» و«تيمَّنَ بالجهةِ اليُمنى».'
      }
    ]
  },
  {
    id: 'root-mwt-mawt',
    hieroglyphs: '𓅓𓏏𓏱',
    gardinerCodes: ['G17', 'X1', 'A14'],
    transliteration: 'mwt / mt',
    approximatePronunciationAr: 'مُوت / مِت',
    arabicMeaning: 'مات، الموت، الوفاة',
    englishMeaning: 'To Die / Death',
    arabicCognate: 'مَوْت / مَاتَ',
    arabicRoot: 'م - و - ت',
    consonantBridge: [
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم متطابقة' },
      { egyptian: 'w (𓅱)', arabic: 'و', noteAr: 'علة وسطى متطابقة' },
      { egyptian: 't (𓏏)', arabic: 'ت', noteAr: 'تاء أصلية متطابقة' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'body_life',
    domainLabelAr: 'الجسم والروح',
    similarityExplanationAr: 'من أوضح الشواهد القاطعة في علم اللغة المقارن؛ فالفعل والاسم «مُوت» (mwt) في الهيروغليفية يطابق لفظاً ومعنىً وصوامتَ كلمة «مَوْت» في العربية (م-و-ت) دون أدنى تحريف في الأصوات الثلاثة!',
    phoneticLawSummaryAr: 'تطابق ثلاثي كامل بلا إبدال (m-w-t ↔ م-و-ت).',
    examples: [
      {
        hieroglyphs: '𓂜 𓅓𓏏 𓆑',
        transliteration: 'n mt.f',
        phoneticAr: 'إن مُوتِف',
        arabicTranslation: 'لن يموتَ (حياته خالدة)',
        arabicParallelSentence: 'في العربية: «حيٌّ لا يموتُ ذكرُه عبرَ الزمانِ».'
      }
    ]
  },
  {
    id: 'root-sn-thin',
    hieroglyphs: '𓌢𓈖𓀀',
    gardinerCodes: ['T22', 'N35', 'A1'],
    transliteration: 'sn',
    approximatePronunciationAr: 'سِن',
    arabicMeaning: 'أخ، قرين، رقم اثنان، رفيق',
    englishMeaning: 'Brother / Companion / Two',
    arabicCognate: 'ثِنْي / ثَانٍ / صِنْو',
    arabicRoot: 'ث - ن - ي / ص - ن - و',
    consonantBridge: [
      { egyptian: 's (𓋴)', arabic: 'ث / ص', noteAr: 'تقارب صفيـري لأسنان اللسان' },
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون متطابقة' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'في المصرية القديمة تدل كلمة «سِن» على الأخ وعلى العدد اثنين (snwj) معاً لأن الأخ هو "ثانيك" وقرينك في الحياة. وفي العربية الفصحى يُسمّى الأخ والمثيل «صِنْو» (كما في الحديث: عمُّ الرجل صِنْوُ أبيه) ويرتبط صوتياً بجذر «ث-ن-ي» للعدد اثنين.',
    phoneticLawSummaryAr: 'تقارب صفيري (s ↔ ص/ث) مع ثبات النون في الدلالة على القرين والثاني.',
    examples: [
      {
        hieroglyphs: '𓌢𓈖 𓇋 𓌻𓂋𓇋𓇋',
        transliteration: 'sn.j mrjj',
        phoneticAr: 'سِنِي مِريي',
        arabicTranslation: 'أخي الحبيب / صِنْو روحي المحبوب',
        arabicParallelSentence: 'في العربية: «أخي هو صِنْوِي وشريكي في السَّرَّاءِ والضَّرَّاءِ».'
      }
    ]
  },
  {
    id: 'root-rn-rann',
    hieroglyphs: '𓂋𓈖',
    gardinerCodes: ['D21', 'N35'],
    transliteration: 'rn',
    approximatePronunciationAr: 'رِن',
    arabicMeaning: 'الاسم، الذِّكر، اللقب المنطوق',
    englishMeaning: 'Name / Renown',
    arabicCognate: 'رَنَّ / رَنِين (الصوت المسموع)',
    arabicRoot: 'ر - ن - ن',
    consonantBridge: [
      { egyptian: 'r (𓂋)', arabic: 'ر', noteAr: 'راء متطابقة' },
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون متطابقة' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'كان الاسم «رِن» في الفكر المصري يعني بقاء الإنسان حياً ما دام صوته وذكراه يترددان؛ وهو يلتقي مع الجذر العربي «رَنَّ / رَنِين» الدال على تردّد الصوت وصداه في الأسماع (رَنَّ ذِكرُه في الآفاق).',
    phoneticLawSummaryAr: 'توافق الصامتين (r-n ↔ ر-ن) في دلالة الصوت المنطوق والصدى.',
    examples: [
      {
        hieroglyphs: '𓋹 𓂋𓈖 𓎡',
        transliteration: 'ꜥnḫ rn.k',
        phoneticAr: 'عَنْخ رِنِك',
        arabicTranslation: 'ليحيَ اسمُك / ليُخلَّد ذِكرُك',
        arabicParallelSentence: 'في العربية: «يرنُّ اسمُه في سجلِّ الخالدين».'
      }
    ]
  },
  {
    id: 'root-jch-iah',
    hieroglyphs: '𓇋𓂝𓎛𓇹',
    gardinerCodes: ['M17', 'D36', 'V28', 'N11'],
    transliteration: 'jꜥḥ',
    approximatePronunciationAr: 'إِيَاح / يَاح',
    arabicMeaning: 'القمر، الهلال المضيء',
    englishMeaning: 'Moon / Crescent',
    arabicCognate: 'يَاح / وَهَج / وَحَوي إيَّاحه',
    arabicRoot: 'ي - ح / و - هـ - ج',
    consonantBridge: [
      { egyptian: 'j (𓇋)', arabic: 'ي', noteAr: 'ياء ابتدائية' },
      { egyptian: 'ꜥ (𓂝)', arabic: 'ع / همزة مد', noteAr: 'عين حلقية خُففت في التوارث' },
      { egyptian: 'ḥ (𓎛)', arabic: 'ح', noteAr: 'حاء حلقية متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'بقيت الكلمة حيةً على ألسنة المصريين والعرب في أنشودة رمضان الشهيرة «وحوي يا وحوي إيَّاحه»؛ إذ تعني «وَحْوِي» (أهلاً/أشرقتَ) و«إيَّاح» (يا قمر)، وقد دخلت في اسم الملكة البطلة «إياح حتب» (القمر راضٍ) وأحمس (وليد القمر).',
    phoneticLawSummaryAr: 'بقاء الجذر الصوتي (jꜥḥ ↔ إيَّاح) في الموروث الشعبي العربي المصري.',
    examples: [
      {
        hieroglyphs: '𓅱𓎛𓅱𓇋 𓇋𓂝𓎛',
        transliteration: 'wꜣḥ-wy jꜥḥ',
        phoneticAr: 'وَاحْوِي إِيَاح',
        arabicTranslation: 'أهلاً ومرحباً بإطلالةِ الهلالِ يا قمر',
        arabicParallelSentence: 'الأنشودة المتوارثة: «وحوي يا وحوي إياحه، رحت يا شعبان جيت يا رمضان».'
      }
    ]
  },
  {
    id: 'root-pr-aa-faraon',
    hieroglyphs: '𓉐𓉻',
    gardinerCodes: ['O1', 'O29'],
    transliteration: 'pr-ꜥꜣ',
    approximatePronunciationAr: 'بِر-عَا (تطورت إلى فِرْعَوْن)',
    arabicMeaning: 'البيت العظيم، القصر الملكي، ثم لقب الملك الحاكم',
    englishMeaning: 'Great House / Pharaoh',
    arabicCognate: 'فِرْعَوْن',
    arabicRoot: 'تطور تاريخي من التركيب الثنائي',
    consonantBridge: [
      { egyptian: 'p (𓊪)', arabic: 'ف', noteAr: 'تحوّل P الشفوية إلى فاء في العربية' },
      { egyptian: 'r (𓂋)', arabic: 'ر', noteAr: 'راء ثابتة' },
      { egyptian: 'ꜥ (𓂝)', arabic: 'ع', noteAr: 'عين حلقية ثابتة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'heritage_titles',
    domainLabelAr: 'الألقاب والتراث التاريخي',
    similarityExplanationAr: 'كانت «بر-عا» تعني حرفياً «البيت العظيم» أي القصر الإداري للحكم، ثم أُطلقت في الدولة الحديثة على شخص الحاكم نفسه؛ ومنها انتقلت عبر اللغات السامية إلى العربية بلفظ «فِرْعَوْن» مع تحوّل الباء المهموسة (p) إلى (ف) وإلحاق الواو والنون للتعظيم.',
    phoneticLawSummaryAr: 'انتقال مباشر مع قاعدة الإبدال الطبيعي (p → ف، ꜥ → ع).',
    examples: [
      {
        hieroglyphs: '𓉐𓉻 𓋹 𓍑 𓋴',
        transliteration: 'pr-ꜥꜣ ꜥnḫ wḏꜣ snb',
        phoneticAr: 'بِرْعَا عَنْخ وَجَا سِنِب',
        arabicTranslation: 'القصرُ العظيمُ (فرعون)، له الحياةُ والازدهارُ والصحةُ',
        arabicParallelSentence: 'في العربية الفصحى والتاريخ: «أصدرَ فرعونُ مرسوماً ملكياً في منف».'
      }
    ]
  },
  {
    id: 'root-tbt-tabut',
    hieroglyphs: '𓍿𓃀𓏏𓊭',
    gardinerCodes: ['V13', 'D58', 'X1', 'Q6'],
    transliteration: 'ṯbt / ḏbꜣt',
    approximatePronunciationAr: 'تِبِت / جَبات',
    arabicMeaning: 'صندوق خشبي، تابوت محكم الإغلاق',
    englishMeaning: 'Wooden Chest / Coffin',
    arabicCognate: 'تَابُوت',
    arabicRoot: 'ت - ب - ت',
    consonantBridge: [
      { egyptian: 'ṯ (𓍿)', arabic: 'ت', noteAr: 'تحوّلت التاء المعطشة إلى تاء صريحة' },
      { egyptian: 'b (𓃀)', arabic: 'ب', noteAr: 'باء متطابقة' },
      { egyptian: 't (𓏏)', arabic: 'ت', noteAr: 'تاء ختامية متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'heritage_titles',
    domainLabelAr: 'الألقاب والتراث التاريخي',
    similarityExplanationAr: 'ورد اللفظ في المصرية القديمة لوصف الصندوق الخشبي المصنوع لحفظ الثياب أو الأشياء الثمينة أو المومياء، وانتقل إلى القبطية بصيغة (Taibi) وإلى العربية واللغات السامية بصيغة «تَابُوت» محتفظاً بصوامته الأساسية (ت - ب - ت).',
    phoneticLawSummaryAr: 'تطابق الصوامت (ṯ-b-t ↔ ت-ب-ت) في اسم الصندوق الخشبي.',
    examples: [
      {
        hieroglyphs: '𓍿𓃀𓏏𓊭 𓈖 𓂝𓈙',
        transliteration: 'ṯbt n ꜥš',
        phoneticAr: 'تِبِت إن عَش',
        arabicTranslation: 'تابوتٌ / صندوقٌ من خشبِ الأَرْزِ',
        arabicParallelSentence: 'في العربية الفصحى والقرآن: «أنِ اقْذِفِيهِ فِي التَّابُوتِ».'
      }
    ]
  },
  {
    id: 'root-ywm-yamm',
    hieroglyphs: '𓇋𓇋𓅱𓅓𓈗',
    gardinerCodes: ['M17', 'M17', 'G43', 'G17', 'N35A'],
    transliteration: 'ym / ywm',
    approximatePronunciationAr: 'يَم / يُومَا',
    arabicMeaning: 'البحر، النهر المتسع، اللُّجة المائية العظيمة',
    englishMeaning: 'Sea / Great River',
    arabicCognate: 'يَمّ',
    arabicRoot: 'ي - م - م',
    consonantBridge: [
      { egyptian: 'y (𓇋𓇋)', arabic: 'ي', noteAr: 'ياء متطابقة' },
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم متطابقة' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'تطابق تام بين «يَم» في المصرية المتأخرة و«اليَمّ» في العربية والكنعانية والآرامية، حيث استُعمل اللفظ للدلالة على البحر المتوسط وعلى اتساع النيل وقت الفيضان عندما يغدو كالبحر.',
    phoneticLawSummaryAr: 'تطابق صوتي ودلالي كامل (ym ↔ يَمّ).',
    examples: [
      {
        hieroglyphs: '𓇋𓅱𓅓𓈗 𓉻',
        transliteration: 'ym ꜥꜣ',
        phoneticAr: 'يَم عَا',
        arabicTranslation: 'اليَمُّ العظيمُ (البحر الكبير)',
        arabicParallelSentence: 'في العربية الفصحى: «خاضوا أمواجَ اليَمِّ الهادرِ».'
      }
    ]
  },
  {
    id: 'root-cnkh-ish',
    hieroglyphs: '𓋹𓈖𓐍',
    gardinerCodes: ['S34', 'N35', 'Aa1'],
    transliteration: 'ꜥnḫ',
    approximatePronunciationAr: 'عَنْخ',
    arabicMeaning: 'حياة، نفسٌ حيّ، عاش وحيا',
    englishMeaning: 'Life / To Live',
    arabicCognate: 'عَيْش / نَفَس / نَخْوة الحياة',
    arabicRoot: 'ع - ن - خ (تقارب حلقي مع ع-ي-ش)',
    consonantBridge: [
      { egyptian: 'ꜥ (𓂝)', arabic: 'ع', noteAr: 'صوت العين المبدوءة بالحيوية' },
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون النفس والتنفس' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'body_life',
    domainLabelAr: 'الجسم والروح',
    similarityExplanationAr: 'أشهر كلمة في الحضارة المصرية؛ يجمع علماء اللسانيات أنها تعبّر عن النفس المتردّد في الصدر والحياة المستمرة، وتشترك في البداية الحلقية بالعين والنون مع عائلة ألفاظ التنفس والانتعاش والعيش في اللغات الأفروآسيوية.',
    phoneticLawSummaryAr: 'اشتراك صوت العين الحلقي (ꜥ ↔ ع) في مفاهيم الحياة والعيش.',
    examples: [
      {
        hieroglyphs: '𓋹 𓍑 𓋴',
        transliteration: 'ꜥnḫ wḏꜣ snb',
        phoneticAr: 'عَنْخ وَجَا سِنِب',
        arabicTranslation: 'حياةٌ وفلاحٌ وصحةٌ (دعاء الخلود والسلامة)',
        arabicParallelSentence: 'مما يقابله في تحايا العرب: «طِبتَ حياً ومعافىً سالماً».'
      }
    ]
  },
  {
    id: 'root-nfr-nafr',
    hieroglyphs: '𓄤𓆑𓂋',
    gardinerCodes: ['F35', 'I9', 'D21'],
    transliteration: 'nfr',
    approximatePronunciationAr: 'نِفِر',
    arabicMeaning: 'جميل، حسن، تام، سعيد، نضر',
    englishMeaning: 'Good / Beautiful / Complete',
    arabicCognate: 'نَضْرَة / نَفَرَ الحُسنُ (تألق)',
    arabicRoot: 'ن - ف - ر / ن - ض - ر',
    consonantBridge: [
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون متطابقة' },
      { egyptian: 'f (𓆑)', arabic: 'ف', noteAr: 'فاء متطابقة' },
      { egyptian: 'r (𓂋)', arabic: 'ر', noteAr: 'راء متطابقة' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'body_life',
    domainLabelAr: 'الجسم والروح',
    similarityExplanationAr: 'ترسم بالقلب والقصبة الهوائية للدلالة على الجمال الكامل والصحة والحظ السعيد؛ وتتقارب في دلالتها وصوامتها (ن-ف-ر) مع معاني النضارة والنفير إلى الخير والاكتمال البهي في العربية (نفرتيتي = الجميلة أتت).',
    phoneticLawSummaryAr: 'ثبات النون والفاء والراء (n-f-r ↔ ن-ف-ر) في صفات البهاء.',
    examples: [
      {
        hieroglyphs: '𓄤 𓉐',
        transliteration: 'pr nfr',
        phoneticAr: 'بِر نِفِر',
        arabicTranslation: 'البيتُ الجميلُ / الدارُ السعيدةُ',
        arabicParallelSentence: 'يُقال في العربية: «دارٌ نضرةُ الجمالِ بهيَّةُ المظهر».'
      }
    ]
  },
  {
    id: 'root-htp-hutt',
    hieroglyphs: '𓊵𓏏𓊪',
    gardinerCodes: ['R4', 'X1', 'Q3'],
    transliteration: 'ḥtp',
    approximatePronunciationAr: 'حُتُب / حَوْتَب',
    arabicMeaning: 'سلام، هدوء، رضا، وضع القربان واستقرار',
    englishMeaning: 'Peace / Rest / Offering',
    arabicCognate: 'حَطَّ (هدأ واستقر) / طَابَ',
    arabicRoot: 'ح - ط - ب / ح - ط - ط',
    consonantBridge: [
      { egyptian: 'ḥ (𓎛)', arabic: 'ح', noteAr: 'حاء حلقية متطابقة' },
      { egyptian: 't (𓏏)', arabic: 'ت / ط', noteAr: 'تقارب الأسنان' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'تدل «حُتب» أساساً على وضع الشيء في سكينة واستقرار، ومنها غروب الشمس واستقرارها في الأفق (حُتب رع) وسكينة النفس ورضاها؛ وهو ما يتلاقى دلالياً وصوتياً مع جذر «حَطَّ» و«استقرَّ» وهدوء البال في العربية.',
    phoneticLawSummaryAr: 'تلاقي الحاء الحلقية والتاء/الطاء في دلالة الاستقرار والسكينة.',
    examples: [
      {
        hieroglyphs: '𓅓 𓊵',
        transliteration: 'm ḥtp',
        phoneticAr: 'إم حُتُب',
        arabicTranslation: 'في سلامٍ وأمانٍ وطمأنينةٍ',
        arabicParallelSentence: 'في العربية: «عدتُ إلى دياري في سلامٍ وسكينة».'
      }
    ]
  },
  {
    id: 'root-ta-thara',
    hieroglyphs: '𓇿',
    gardinerCodes: ['N16'],
    transliteration: 'tꜣ',
    approximatePronunciationAr: 'تَا',
    arabicMeaning: 'أرض، يابسة، تراب ووطن',
    englishMeaning: 'Earth / Land / Soil',
    arabicCognate: 'ثَرَى / تُراب',
    arabicRoot: 'ث - ر - ي / ت - ر - ب',
    consonantBridge: [
      { egyptian: 't (𓏏)', arabic: 'ت / ث', noteAr: 'صوت أسناني مشترك' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'الرمز يُصوّر شريط الأرض المستوي بحبيبات الرمل الثلاث تحته؛ ويربط لغويون بين صوت التاء الثقيلة الممدودة في «تَا» وألفاظ الأرض والتراب والثرى في اللغات السامية والعربية.',
    phoneticLawSummaryAr: 'تلاقي الصوت الأسناني (t ↔ ت/ث) في جذور الأرض والتراب.',
    examples: [
      {
        hieroglyphs: '𓇿 𓌻𓂋𓇋',
        transliteration: 'tꜣ mrj',
        phoneticAr: 'تَا مَرِي',
        arabicTranslation: 'الأرضُ الحبيبةُ (اسم مصر الكلاسيكي)',
        arabicParallelSentence: 'في العربية: «ثَرَى الوطنِ العزيزِ وأرضُه الطيبة».'
      }
    ]
  },
  {
    id: 'root-sba-saba',
    hieroglyphs: '𓋴𓃀𓄿𓇼',
    gardinerCodes: ['S29', 'D58', 'G1', 'N14'],
    transliteration: 'sbꜣ',
    approximatePronunciationAr: 'سَبَا',
    arabicMeaning: 'نجم السماء، وكذلك: يعلّم ويرشد ويهتدي',
    englishMeaning: 'Star / To Teach / Guidance',
    arabicCognate: 'سَبَا / هِدَايَة بالنجم',
    arabicRoot: 'س - ب - أ / س - ب - ب',
    consonantBridge: [
      { egyptian: 's (𓋴)', arabic: 'س', noteAr: 'سين متطابقة' },
      { egyptian: 'b (𓃀)', arabic: 'ب', noteAr: 'باء متطابقة' },
      { egyptian: 'ꜣ (𓄿)', arabic: 'أ / ا', noteAr: 'همزة/ألف متطابقة' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'الرابط الفلسفي البليغ في الهيروغليفية أن «النجم» و«التعليم» يُكتبان بالجذر نفسه «سَبَا»؛ لأن المعلم يهدي تلميذه كما يهدي النجم المسافرين في ظلمات الليل. ويتطابق اللفظ صوتياً (س-ب-أ) مع الجذر القديم الدال على المسير والاهتداء والعلو.',
    phoneticLawSummaryAr: 'تطابق الصوامت الثلاثة (s-b-ꜣ ↔ س-ب-أ).',
    examples: [
      {
        hieroglyphs: '𓋴𓃀𓄿𓇼 𓋴𓈙𓏞',
        transliteration: 'sbꜣ sš',
        phoneticAr: 'سَبَا سِش',
        arabicTranslation: 'علَّمَ الكتابةَ / أرشدَ كالنجمِ الساطع',
        arabicParallelSentence: 'في العربية: «بالنجمِ هم يهتدون، وبالمعلمِ يستنيرون».'
      }
    ]
  },
  {
    id: 'root-d-yad',
    hieroglyphs: '𓂧 / 𓂝',
    gardinerCodes: ['D46', 'D36'],
    transliteration: 'ḏrt / d',
    approximatePronunciationAr: 'دِت / ذِرِت (اليد)',
    arabicMeaning: 'يد، كف، ذراع ممتدة',
    englishMeaning: 'Hand / Palm',
    arabicCognate: 'يَد / ذِرَاع',
    arabicRoot: 'ي - د - ي / ذ - ر - ع',
    consonantBridge: [
      { egyptian: 'd (𓂧)', arabic: 'د', noteAr: 'دال صريحة في كلمة دت (يد)' },
      { egyptian: 'ḏ-r (𓂧𓂋)', arabic: 'ذ-ر', noteAr: 'جذر الذراع والكف' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'body_life',
    domainLabelAr: 'الجسم والروح',
    similarityExplanationAr: 'صوت الدال (𓂧) في الهيروغليفية مُستمد مباشرة من رسم «كفّ اليد» لأن كلمة اليد في المصرية المبكرة كانت «دِت / دِي»؛ وهي تلتقي مع الجذر الأفروآسيوي والسامي «يَد» في العربية، كما يلتقي اللفظ الآخر «ذِرِت» مع «ذِراع».',
    phoneticLawSummaryAr: 'ثبات الدال في الجذر الثنائي القديم لليد (d-t ↔ ي-د).',
    examples: [
      {
        hieroglyphs: '𓅓 𓂧𓂋𓏏 𓎡',
        transliteration: 'm ḏrt.k',
        phoneticAr: 'إم دِرْتِك',
        arabicTranslation: 'في يدِك / بذراعِك',
        arabicParallelSentence: 'في العربية: «الأمرُ في يدِك وبذراعِك القويّة».'
      }
    ]
  },
  {
    id: 'root-shnwt-shouna',
    hieroglyphs: '𓍲𓈖𓅱𓏏𓊖',
    gardinerCodes: ['V7', 'N35', 'G43', 'X1', 'O51'],
    transliteration: 'šnwt',
    approximatePronunciationAr: 'شَنُوت (تطورت إلى شُونَة)',
    arabicMeaning: 'صومعة الغلال ومستودع القمح والذرة',
    englishMeaning: 'Granary / Grain Storehouse',
    arabicCognate: 'شُونَة',
    arabicRoot: 'ش - و - ن (توارث مصري)',
    consonantBridge: [
      { egyptian: 'š (𓈙)', arabic: 'ش', noteAr: 'شين متطابقة' },
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'من أقدم المصطلحات الإدارية والزراعية التي انتقلت من الهيروغليفية (شَنوت) إلى القبطية (شوون) ثم إلى اللغة العربية المتداولة في مصر والشام بلفظ «شُونة» للدلالة على مخزن الغلال والحبوب.',
    phoneticLawSummaryAr: 'انتقال مباشر عبر القبطية بصوامت الشين والنون (šnwt → شُونة).',
    examples: [
      {
        hieroglyphs: '𓍲𓈖𓅱𓏏𓊖 𓇓',
        transliteration: 'šnwt nsw',
        phoneticAr: 'شَنُوت نِسُو',
        arabicTranslation: 'شُونةُ / صومعةُ غلالِ الملك',
        arabicParallelSentence: 'في الاستخدام المعاصر: «توريد محصول القمح إلى شونة الغلال».'
      }
    ]
  },
  {
    id: 'root-jtrw-tiraa',
    hieroglyphs: '𓇋𓏏𓂋𓅱𓈗',
    gardinerCodes: ['M17', 'X1', 'D21', 'G43', 'N35A'],
    transliteration: 'jtrw',
    approximatePronunciationAr: 'إِتْرُو / يِيرُو',
    arabicMeaning: 'النهر الكبير (نهر النيل)، مجرى الماء الرئيسي',
    englishMeaning: 'River (The Nile)',
    arabicCognate: 'تِرْعَة / يُور (مجرى مائي)',
    arabicRoot: 'ت - ر - ع',
    consonantBridge: [
      { egyptian: 't (𓏏)', arabic: 'ت', noteAr: 'تاء أصلية' },
      { egyptian: 'r (𓂋)', arabic: 'ر', noteAr: 'راء أصلية' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'كان اسم نهر النيل في المصرية القديمة «إترو عا» (النهر العظيم)؛ ومع حذف الهمزة الأولى وتطور النطق في الريف المصري تحوّل اللفظ إلى «تِرِي / تِرعة» ليُطلق على القنوات المائية المتفرعة من النيل.',
    phoneticLawSummaryAr: 'حفظ الصامتين (t-r ↔ ت-ر) في تسمية المجاري المائية النيلية.',
    examples: [
      {
        hieroglyphs: '𓇋𓏏𓂋𓅱𓈗 𓂝𓄿',
        transliteration: 'jtrw ꜥꜣ',
        phoneticAr: 'إِتْرُو عَا',
        arabicTranslation: 'النهرُ العظيمُ (نهر النيل الخالد)',
        arabicParallelSentence: 'في العربية المصرية: «تتفرع الترعُ الخصبة من نهر النيل».'
      }
    ]
  },
  {
    id: 'root-shm-sham',
    hieroglyphs: '𓈙𓅓𓂻',
    gardinerCodes: ['N37', 'G17', 'D54'],
    transliteration: 'šm',
    approximatePronunciationAr: 'شَم / شِم',
    arabicMeaning: 'مشى، سار، انطلق في الطريق',
    englishMeaning: 'To Walk / Go',
    arabicCognate: 'مَشَى (قلب مكاني) / شَمَّرَ بالسير',
    arabicRoot: 'م - ش - ي / ش - م - م',
    consonantBridge: [
      { egyptian: 'š (𓈙)', arabic: 'ش', noteAr: 'شين متطابقة' },
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم متطابقة بقلب مكاني (شَم ↔ مَشَى)' }
    ],
    relationType: 'afro_asiatic_cognate',
    relationLabelAr: 'تطابق أفروآسيوي أصيل',
    domain: 'actions_senses',
    domainLabelAr: 'الأفعال والحواس',
    similarityExplanationAr: 'ظاهرة لغوية مدهشة تُعرف بالقلب المكاني (Metathesis) في اللغات الأفروآسيوية؛ فالفعل «شَم» (š-m) في الهيروغليفية المرسوم بقدمين تسيران للأمام 𓂻 يطابق تماماً الصامتين في الفعل العربي «مَشَى» (م-ش)!',
    phoneticLawSummaryAr: 'ظاهرة القلب المكاني بين الجذرين الثنائيين (š-m ↔ م-ش).',
    examples: [
      {
        hieroglyphs: '𓈙𓅓𓂻 𓁷𓂋 𓍯𓏏𓈐',
        transliteration: 'šm ḥr wꜣt',
        phoneticAr: 'شِم حِر وَات',
        arabicTranslation: 'امشِ / سِرْ على الطريقِ القويم',
        arabicParallelSentence: 'في العربية: «مَشَى المسافرُ على الطريقِ السويّ».'
      }
    ]
  },
  {
    id: 'root-hkm-hakam',
    hieroglyphs: '𓎛𓈎𓄿𓋾',
    gardinerCodes: ['V28', 'N29', 'G1', 'S38'],
    transliteration: 'ḥqꜣ',
    approximatePronunciationAr: 'حِقَا / حَكَا',
    arabicMeaning: 'حَكَمَ، ساد، ملكَ، صولجان الحكم (ومنها حِكاية / سحر الكلمة)',
    englishMeaning: 'Ruler / To Govern',
    arabicCognate: 'حَكَمَ / حَقّ',
    arabicRoot: 'ح - ك - م / ح - ق - ق',
    consonantBridge: [
      { egyptian: 'ḥ (𓎛)', arabic: 'ح', noteAr: 'حاء حلقية متطابقة' },
      { egyptian: 'q (𓈎)', arabic: 'ق / ك', noteAr: 'قاف لهوية متطابقة' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: '«حِقَا» في الهيروغليفية هي السيادة والحكم بالسلطة المشروعة (ويرمز لها بعصا الراعي المعقوفة 𓋾). وتتقارب صوامتها الحلقية واللَّهَوِيّة (ح - ق) مع الجذر العربي «حَقَّ» و«حَكَمَ» الدال على إقرار العدل والسيادة.',
    phoneticLawSummaryAr: 'اشتراك الحاء والقاف (ḥ-q ↔ ح-ق/ك) في مفاهيم القيادة والحكم.',
    examples: [
      {
        hieroglyphs: '𓋾 𓈉𓈉𓈉',
        transliteration: 'ḥqꜣ ḫꜣswt',
        phoneticAr: 'حِقَا خَاسُوت',
        arabicTranslation: 'حُكّامُ البلادِ الأجنبية (أصل تسمية الهكسوس)',
        arabicParallelSentence: 'في العربية: «حاكمُ الأقاليمِ وصاحبُ الحقِّ والسلطان».'
      }
    ]
  },
  {
    id: 'root-nbw-nubia',
    hieroglyphs: '𓎟𓃀𓅱𓋞',
    gardinerCodes: ['V30', 'D58', 'G43', 'S12'],
    transliteration: 'nbw',
    approximatePronunciationAr: 'نُوب / نَبُو',
    arabicMeaning: 'الذهب الخالص، المعدن النفيس',
    englishMeaning: 'Gold',
    arabicCognate: 'النُّوبَة (أرض الذهب)',
    arabicRoot: 'ن - و - ب',
    consonantBridge: [
      { egyptian: 'n (𓈖)', arabic: 'ن', noteAr: 'نون متطابقة' },
      { egyptian: 'b (𓃀)', arabic: 'ب', noteAr: 'باء متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'heritage_titles',
    domainLabelAr: 'الألقاب والتراث التاريخي',
    similarityExplanationAr: 'أطلق المصريون القدماء اسم «نُوب» على الذهب لأنهم استخرجوه بوفرة من أقاليم الجنوب؛ فسميت المنطقة في الجغرافيا العربية والتاريخية «بلاد النوبة» أي «بلاد الذهب»، وظلت الكلمة حية في أسماء الأعلام واللقب الذهبي للملك (حور نوب).',
    phoneticLawSummaryAr: 'تطابق الصوامت (n-b-w ↔ ن-و-ب) في الاسم الجغرافي التاريخي.',
    examples: [
      {
        hieroglyphs: '𓋞 𓄤',
        transliteration: 'nbw nfr',
        phoneticAr: 'نُوب نِفِر',
        arabicTranslation: 'الذهبُ النقيُّ الفاخرُ',
        arabicParallelSentence: 'في كتب التاريخ العربية: «بلادُ النوبةِ أرضُ معادنِ الذهبِ والزمرد».'
      }
    ]
  },
  {
    id: 'root-kahk-kahk',
    hieroglyphs: '𓂓𓎡𓏒',
    gardinerCodes: ['D28', 'V31', 'X4'],
    transliteration: 'kḥkḥ / kk',
    approximatePronunciationAr: 'كَعْك / كَحْك',
    arabicMeaning: 'أقراص الخبز المعجونة بالسمن والعسل والمنقوشة في الأعياد',
    englishMeaning: 'Sweet Festive Cake',
    arabicCognate: 'كَحْك / كَعْك',
    arabicRoot: 'ك - ع - ك',
    consonantBridge: [
      { egyptian: 'k (𓎡)', arabic: 'ك', noteAr: 'كاف الأولى متطابقة' },
      { egyptian: 'ḥ (𓎛)', arabic: 'ح / ع', noteAr: 'حلقية وسطى متبادلة بين ح وع' },
      { egyptian: 'k (𓎡)', arabic: 'ك', noteAr: 'كاف ثانية متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'ظهرت نقوش إعداد هذا الخبز في مقبرة الوزير رخميرع بالأسرة الثامنة عشرة وهو يُحشَى بالعسل والتمر ويُنقش بختم الشمس؛ وانتقل الاسم نفسه «كحك / كعك» إلى المعاجم العربية والمطبخ العربي حتى اليوم.',
    phoneticLawSummaryAr: 'حفظ الجذر الثلاثي المكرر (k-ḥ-k ↔ ك-ح/ع-ك).',
    examples: [
      {
        hieroglyphs: '𓂓𓎡𓏒 𓈖 𓎛𓃀𓍴',
        transliteration: 'kḥkḥ n ḥb',
        phoneticAr: 'كَحْك إن حِب',
        arabicTranslation: 'كحكُ العيدِ والاحتفالِ',
        arabicParallelSentence: 'في العربية الدارجة والفصحى: «صنعَ الخبازُ أقراصَ الكعكِ للعيد».'
      }
    ]
  },
  {
    id: 'root-sbk-tamseh',
    hieroglyphs: '𓅭𓃀𓆊',
    gardinerCodes: ['G39', 'D58', 'I3'],
    transliteration: 'msḥ',
    approximatePronunciationAr: 'مِسَاح (وبالقبطية إمساح ← تمساح)',
    arabicMeaning: 'التمساح النيلي',
    englishMeaning: 'Crocodile',
    arabicCognate: 'تِمْسَاح',
    arabicRoot: 'ت - م - س - ح',
    consonantBridge: [
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم أصلية' },
      { egyptian: 's (𓋴)', arabic: 'س', noteAr: 'سين أصلية' },
      { egyptian: 'ḥ (𓎛)', arabic: 'ح', noteAr: 'حاء حلقية متطابقة' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'nature',
    domainLabelAr: 'الطبيعة والكون',
    similarityExplanationAr: 'تُكتب كلمة التمساح في الهيروغليفية «مِسَاح» (msḥ)، ولما دخلت القبطية سبقتها أداة التعريف المؤنثة أو المذكرة (T- / P-) فأصبحت «إمساح / تِمْسَاح»، ومنها دخلت إلى اللغة العربية مباشرة بلفظ «تِمْسَاح»!',
    phoneticLawSummaryAr: 'حفظ الثلاثي (m-s-ḥ ↔ م-س-ح) مع تاء التعريف القبطية السابقة.',
    examples: [
      {
        hieroglyphs: '𓅓𓋴𓎛𓆊 𓅓 𓇋𓏏𓂋𓅱𓈗',
        transliteration: 'msḥ m jtrw',
        phoneticAr: 'مِسَاح إم إِتْرُو',
        arabicTranslation: 'التمساحُ يسبحُ في النهرِ',
        arabicParallelSentence: 'في العربية الفصحى: «التمساحُ النيليُّ من أقدمِ زواحفِ وادي النيل».'
      }
    ]
  },
  {
    id: 'root-fote-fouta',
    hieroglyphs: '𓆑𓅱𓏏𓍱',
    gardinerCodes: ['I9', 'G43', 'X1', 'S28'],
    transliteration: 'fwt / fōte',
    approximatePronunciationAr: 'فُوت / فُوطَة',
    arabicMeaning: 'قماش الكتان للمسح والتجفيف، منشفة',
    englishMeaning: 'Wiping Cloth / Towel',
    arabicCognate: 'فُوطَة',
    arabicRoot: 'ف - و - ط',
    consonantBridge: [
      { egyptian: 'f (𓆑)', arabic: 'ف', noteAr: 'فاء متطابقة' },
      { egyptian: 'w (𓅱)', arabic: 'و', noteAr: 'واو مدية متطابقة' },
      { egyptian: 't (𓏏)', arabic: 'ط', noteAr: 'تفخيم التاء إلى طاء في العربية' }
    ],
    relationType: 'cultural_heritage',
    relationLabelAr: 'انتقال ثقافي وتراثي',
    domain: 'society_home',
    domainLabelAr: 'المجتمع والبيت',
    similarityExplanationAr: 'تعود إلى الفعل المصري القديم والقبطي «فوتي» بمعنى المسح والتجفيف بالنسج الكتاني؛ وقد شاعت كلمة «فوطة» في العربية المعاصرة بمعناها ذاته مع تفخيم التاء إلى طاء عند التعريب.',
    phoneticLawSummaryAr: 'تطابق (f-w-t ↔ ف-و-ط) مع تفخيم التاء إلى طاء.',
    examples: [
      {
        hieroglyphs: '𓆑𓅱𓏏𓍱 𓈖 𓊪𓈎𓏏',
        transliteration: 'fwt n pqt',
        phoneticAr: 'فُوت إن بِقِت',
        arabicTranslation: 'فوطةٌ / قطعةُ مسحٍ من الكتانِ الملكي النقي',
        arabicParallelSentence: 'في العربية اليومية: «ناوِلني الفوطةَ القطنيةَ النظيفة».'
      }
    ]
  },
  {
    id: 'root-sdm-sama',
    hieroglyphs: '𓋴𓆓𓅓𓄔',
    gardinerCodes: ['S29', 'I10', 'G17', 'F21'],
    transliteration: 'sḏm',
    approximatePronunciationAr: 'سِجِم / سِدِم',
    arabicMeaning: 'سَمِعَ، أصغى، أنصت، أطاع',
    englishMeaning: 'To Hear / Listen / Obey',
    arabicCognate: 'سَمِعَ / صَمَّ / صَدَى',
    arabicRoot: 'س - م - ع (جذر حسي مشترك)',
    consonantBridge: [
      { egyptian: 's (𓋴)', arabic: 'س', noteAr: 'سين متطابقة' },
      { egyptian: 'm (𓅓)', arabic: 'م', noteAr: 'ميم متطابقة' }
    ],
    relationType: 'phonetic_semantic',
    relationLabelAr: 'تقارب صوتي ودلالي',
    domain: 'actions_senses',
    domainLabelAr: 'الأفعال والحواس',
    similarityExplanationAr: 'فعل السمع والإصغاء الأساسي في المصرية القديمة ويُختم برسم أُذن البقرة 𓄔. يربط لغويون بين الصامتين (س - م) في «سِجِم» و«سَمِعَ» في الساميات والعربية حيث يحمل الحرفان دلالة تلقي الصوت والطاعة ("سمعاً وطاعة").',
    phoneticLawSummaryAr: 'اشتراك السين والميم (s-…-m ↔ س-م) في دلالة السمع والإصغاء.',
    examples: [
      {
        hieroglyphs: '𓄔 𓂝𓏲 𓋴𓌃',
        transliteration: 'sḏm mdw',
        phoneticAr: 'سِجِم مِدو',
        arabicTranslation: 'اسمعِ الكلامَ / أصغِ إلى الحديث',
        arabicParallelSentence: 'في العربية: «أنصتْ وسمعَ القولَ بإمعان».'
      }
    ]
  }
];

export const SHARED_ROOT_DOMAINS = [
  { id: 'all', nameAr: 'كل المجالات' },
  { id: 'nature', nameAr: 'الطبيعة والكون' },
  { id: 'body_life', nameAr: 'الجسم والروح' },
  { id: 'actions_senses', nameAr: 'الأفعال والحواس' },
  { id: 'society_home', nameAr: 'المجتمع والبيت' },
  { id: 'heritage_titles', nameAr: 'الألقاب والتراث التاريخي' }
] as const;

export const SHARED_ROOT_RELATIONS = [
  { id: 'all', nameAr: 'كل الروابط اللغوية' },
  { id: 'afro_asiatic_cognate', nameAr: 'تطابق أفروآسيوي أصيل' },
  { id: 'phonetic_semantic', nameAr: 'تقارب صوتي ودلالي' },
  { id: 'cultural_heritage', nameAr: 'انتقال ثقافي وتراثي' }
] as const;
