export type PronunciationDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface PronunciationSyllable {
  text: string;
  translit: string;
  articulationTipAr: string;
}

export interface PronunciationChallengeWord {
  id: string;
  difficulty: PronunciationDifficulty;
  difficultyLabelAr: string;
  hieroglyphs: string;
  gardinerCodes: string[];
  transliteration: string;
  ipaApprox: string;
  reconstructedAr: string;
  meaningAr: string;
  englishMeaning: string;
  expectedSyllables: number;
  consonantSkeleton: string[];
  acceptedVariantsAr: string[];
  syllables: PronunciationSyllable[];
  articulationCoachAr: string;
  historicalNoteAr: string;
}

export const PRONUNCIATION_WORDS: PronunciationChallengeWord[] = [
  // ==========================================
  // BEGINNER (المستوى المبتدئ - مقاطع قصيرة)
  // ==========================================
  {
    id: 'pron-mw',
    difficulty: 'beginner',
    difficultyLabelAr: 'مبتدئ',
    hieroglyphs: '𓈖𓈗',
    gardinerCodes: ['N35', 'N35A'],
    transliteration: 'mw',
    ipaApprox: '/muː/',
    reconstructedAr: 'مُو',
    meaningAr: 'ماء / مياه',
    englishMeaning: 'Water',
    expectedSyllables: 1,
    consonantSkeleton: ['م', 'و'],
    acceptedVariantsAr: ['مو', 'موه', 'ماو', 'ماء', 'موا', 'ميو', 'موء'],
    syllables: [
      { text: 'مُو', translit: 'muː', articulationTipAr: 'ميم مضمومة ممدودة بوضوح كصوت الموج' }
    ],
    articulationCoachAr: 'اضمم شفتيك مع مدّ الواو بعد الميم في مقطع واحد مستقر (مُـــو).',
    historicalNoteAr: 'تُعدّ «مُو» من أقدم الكلمات الأفروآسيوية المشتركة مع «ماء / موه» في العربية.'
  },
  {
    id: 'pron-ra',
    difficulty: 'beginner',
    difficultyLabelAr: 'مبتدئ',
    hieroglyphs: '𓇳',
    gardinerCodes: ['N5'],
    transliteration: 'rꜥ',
    ipaApprox: '/riːʕ/',
    reconstructedAr: 'رَع',
    meaningAr: 'الشمس / النهار',
    englishMeaning: 'Sun / Ra',
    expectedSyllables: 1,
    consonantSkeleton: ['ر', 'ع'],
    acceptedVariantsAr: ['رع', 'راع', 'ريع', 'را', 'رعا'],
    syllables: [
      { text: 'رَع', translit: 'rꜥ', articulationTipAr: 'راء مفتوحة يعقبها وقف حلقي واضح بحرف العين' }
    ],
    articulationCoachAr: 'انطق راءً صريحة مفتوحة ثم أغلق المقطع بصوت العين الحلقية الصريحة (رَعْ) ولا تُملها إلى هاء.',
    historicalNoteAr: 'حرف العين (𓂝) في المصرية القديمة يطابق العين العربية تماماً في النطق الحلقي.'
  },
  {
    id: 'pron-ta',
    difficulty: 'beginner',
    difficultyLabelAr: 'مبتدئ',
    hieroglyphs: '𓇿',
    gardinerCodes: ['N16'],
    transliteration: 'tꜣ',
    ipaApprox: '/tɑː/',
    reconstructedAr: 'تَا',
    meaningAr: 'الأرض / اليابسة',
    englishMeaning: 'Earth / Land',
    expectedSyllables: 1,
    consonantSkeleton: ['ت', 'ا'],
    acceptedVariantsAr: ['تا', 'تاء', 'تاه', 'طا', 'طاه'],
    syllables: [
      { text: 'تَا', translit: 'tɑː', articulationTipAr: 'تاء ممدودة بألف مفتوحة صافية' }
    ],
    articulationCoachAr: 'مقطع قصير مباشر: تاء مرققة مع فتح الفم بمدّ الألف مدّاً متوسطاً (تَــا).',
    historicalNoteAr: 'تظهر الكلمة في اسم مصر المحبب لدى أهلها «تَا مَرِي» أي الأرض الحبيبة.'
  },
  {
    id: 'pron-ib',
    difficulty: 'beginner',
    difficultyLabelAr: 'مبتدئ',
    hieroglyphs: '𓄣',
    gardinerCodes: ['F34'],
    transliteration: 'jb',
    ipaApprox: '/ʔib/',
    reconstructedAr: 'إِب',
    meaningAr: 'القلب / الفؤاد / الضمير',
    englishMeaning: 'Heart / Mind',
    expectedSyllables: 1,
    consonantSkeleton: ['ا', 'ب'],
    acceptedVariantsAr: ['إب', 'اب', 'يب', 'ئب', 'إيب', 'ايب'],
    syllables: [
      { text: 'إِب', translit: 'ʔib', articulationTipAr: 'همزة مكسورة يتبعها باء ساكنة شفوية' }
    ],
    articulationCoachAr: 'ابدأ بهمزة مكسورة قصيرة واضحة (إِ) ثم أغلق الشفتين بباء صريحة (بْ).',
    historicalNoteAr: 'ترتبط كلمة «إب» بجذر «لُبّ» في العربية الدال على القلب والعقل الواعي.'
  },
  {
    id: 'pron-pr',
    difficulty: 'beginner',
    difficultyLabelAr: 'مبتدئ',
    hieroglyphs: '𓉐𓂋',
    gardinerCodes: ['O1', 'D21'],
    transliteration: 'pr',
    ipaApprox: '/piːr/',
    reconstructedAr: 'بِر',
    meaningAr: 'بيت / دار / منزل',
    englishMeaning: 'House / Estate',
    expectedSyllables: 1,
    consonantSkeleton: ['ب', 'ر'],
    acceptedVariantsAr: ['بر', 'بير', 'بئر', 'بار', 'فر', 'بره'],
    syllables: [
      { text: 'بِر', translit: 'pir', articulationTipAr: 'باء شفوية مكسورة مع راء واضحة' }
    ],
    articulationCoachAr: 'انطق الباء بضغط شفوي خفيف (مثل p/ب) مكسورة ثم اختم براء واضحة (بِرْ).',
    historicalNoteAr: 'من هذه الكلمة مع «عَا» (العظيم) اشتُق اللقب الشهير «بر-عا» أي فرعون.'
  },

  // ==========================================
  // INTERMEDIATE (المستوى المتوسط - كلمات كلاسيكية)
  // ==========================================
  {
    id: 'pron-ankh',
    difficulty: 'intermediate',
    difficultyLabelAr: 'متوسط',
    hieroglyphs: '𓋹𓈖𓐍',
    gardinerCodes: ['S34', 'N35', 'Aa1'],
    transliteration: 'ꜥnḫ',
    ipaApprox: '/ʕanx/',
    reconstructedAr: 'عَنْخ',
    meaningAr: 'حياة / خلود',
    englishMeaning: 'Life (Ankh)',
    expectedSyllables: 1,
    consonantSkeleton: ['ع', 'ن', 'خ'],
    acceptedVariantsAr: ['عنخ', 'انخ', 'عنح', 'عنغ', 'عن خ', 'أنخ', 'عنخو'],
    syllables: [
      { text: 'عَنْخ', translit: 'ʕanx', articulationTipAr: 'عين مفتوحة + نون ساكنة + خاء حلقية واضحة في الختام' }
    ],
    articulationCoachAr: 'أخرج العين الحلقية أولاً بوضوح، ثم مرّ على النون واختم بصوت الخاء الاحتكاكي (عَنْخْ) دون إسقاط الخاء.',
    historicalNoteAr: 'يتميز المتحدث العربي بقدرته الفطرية على نطق «عَنْخ» بدقة لوجود صوتي العين والخاء في العربية.'
  },
  {
    id: 'pron-nefer',
    difficulty: 'intermediate',
    difficultyLabelAr: 'متوسط',
    hieroglyphs: '𓄤𓆑𓂋',
    gardinerCodes: ['F35', 'I9', 'D21'],
    transliteration: 'nfr',
    ipaApprox: '/ˈnaːfir/',
    reconstructedAr: 'نِفِر',
    meaningAr: 'جميل / حسن / طيّب',
    englishMeaning: 'Beautiful / Good',
    expectedSyllables: 2,
    consonantSkeleton: ['ن', 'ف', 'ر'],
    acceptedVariantsAr: ['نفر', 'نفير', 'نفره', 'نفار', 'نيفر', 'نوفير'],
    syllables: [
      { text: 'نِـ', translit: 'ni', articulationTipAr: 'نون مكسورة خفيفة في البداية' },
      { text: 'ـفِر', translit: 'fir', articulationTipAr: 'فاء واضحة يتبعها راء مرققة' }
    ],
    articulationCoachAr: 'قسّم الكلمة إلى مقطعين خفيفين متساويين: (نِـ - فِرْ)، مع توضيح الفاء بين النون والراء.',
    historicalNoteAr: 'تشكّل الكلمة قلب اسم الملكة «نِفِرتيتي» أي (الجميلة أتت).'
  },
  {
    id: 'pron-hotep',
    difficulty: 'intermediate',
    difficultyLabelAr: 'متوسط',
    hieroglyphs: '𓊵𓏏𓊪',
    gardinerCodes: ['R4', 'X1', 'Q3'],
    transliteration: 'ḥtp',
    ipaApprox: '/ˈħoːtɛp/',
    reconstructedAr: 'حُتُب',
    meaningAr: 'سلام / رضا / سكينة',
    englishMeaning: 'Peace / Offering',
    expectedSyllables: 2,
    consonantSkeleton: ['ح', 'ت', 'ب'],
    acceptedVariantsAr: ['حتب', 'حوتب', 'حطب', 'حوتيب', 'حطوب', 'حتوب', 'هوتب'],
    syllables: [
      { text: 'حُـ', translit: 'ħu', articulationTipAr: 'حاء حلقية مضمومة من وسط الحلق' },
      { text: 'ـتُب', translit: 'tub', articulationTipAr: 'تاء مضمومة تختم بباء/پاء شفوية' }
    ],
    articulationCoachAr: 'ابدأ بحاء حلقية صافية (حُـ) وليس هاءً، ثم انطق المقطع الثاني بضغط لطيف على الباء (ـتُبْ).',
    historicalNoteAr: 'تظهر في أسماء الحكماء والملوك مثل «إمحوتب» (الذي أتى في سلام) و«أمنحتب».'
  },
  {
    id: 'pron-iah',
    difficulty: 'intermediate',
    difficultyLabelAr: 'متوسط',
    hieroglyphs: '𓇋𓂝𓎛𓇹',
    gardinerCodes: ['M17', 'D36', 'V28', 'N11'],
    transliteration: 'jꜥḥ',
    ipaApprox: '/jɑːʕaħ/',
    reconstructedAr: 'إِيَاح',
    meaningAr: 'القمر / الهلال',
    englishMeaning: 'Moon / Crescent',
    expectedSyllables: 2,
    consonantSkeleton: ['ا', 'ي', 'ح'],
    acceptedVariantsAr: ['إياح', 'اياح', 'ياح', 'إياعح', 'اياحة', 'ياحه'],
    syllables: [
      { text: 'إِ', translit: 'ʔi', articulationTipAr: 'همزة مكسورة سريعة' },
      { text: 'يَاح', translit: 'jaːħ', articulationTipAr: 'ياء مفتوحة ممدودة تنتهي بحاء حلقية واضحة' }
    ],
    articulationCoachAr: 'انطق المقطع الأول قصيراً (إِ) ثم مدّ الياء واختم بحاء حلقية صريحة (يَاحْ) كما في «وحوي يا وحوي إياحه».',
    historicalNoteAr: 'توارثها المصريون عبر آلاف السنين في أغنية هلال رمضان الشعبية.'
  },
  {
    id: 'pron-maat',
    difficulty: 'intermediate',
    difficultyLabelAr: 'متوسط',
    hieroglyphs: '𓌳𓐙𓂝𓏏𓆄',
    gardinerCodes: ['U1', 'Aa11', 'D36', 'X1', 'H6'],
    transliteration: 'mꜣꜥt',
    ipaApprox: '/ˈmɑːʕat/',
    reconstructedAr: 'مَاعَت',
    meaningAr: 'الحق / العدل / النظام الكوني',
    englishMeaning: 'Truth / Cosmic Justice',
    expectedSyllables: 2,
    consonantSkeleton: ['م', 'ع', 'ت'],
    acceptedVariantsAr: ['ماعت', 'معات', 'ماعط', 'ماعه', 'معت', 'ماعات'],
    syllables: [
      { text: 'مَا', translit: 'mɑː', articulationTipAr: 'ميم مفتوحة ممدودة' },
      { text: 'عَت', translit: 'ʕat', articulationTipAr: 'عين مفتوحة تنتهي بتاء صريحة' }
    ],
    articulationCoachAr: 'امدد المقطع الأول (مَــا) ثم أخرج العين الحلقية بوضوح متبوعةً بتاء النهاية (عَتْ).',
    historicalNoteAr: 'يرمز لها بريشة النعامة 𓆄 التي يوزن أمامها قلب الإنسان في محكمة الأبدية.'
  },

  // ==========================================
  // ADVANCED (المستوى المتقدم - تراكيب وألقاب)
  // ==========================================
  {
    id: 'pron-iteru',
    difficulty: 'advanced',
    difficultyLabelAr: 'متقدم',
    hieroglyphs: '𓇋𓏏𓂋𓅱𓈗',
    gardinerCodes: ['M17', 'X1', 'D21', 'G43', 'N35A'],
    transliteration: 'jtrw',
    ipaApprox: '/jatˈruː/',
    reconstructedAr: 'إِتْرُو',
    meaningAr: 'النهر العظيم (نهر النيل)',
    englishMeaning: 'The Great River (Nile)',
    expectedSyllables: 2,
    consonantSkeleton: ['ا', 'ت', 'ر', 'و'],
    acceptedVariantsAr: ['إترو', 'اترو', 'يترو', 'إيترو', 'اتيرو', 'ترعه'],
    syllables: [
      { text: 'إِتْـ', translit: 'ʔit', articulationTipAr: 'همزة مكسورة مع تاء ساكنة واضحة' },
      { text: 'ـرُو', translit: 'ruː', articulationTipAr: 'راء مضمومة ممدودة' }
    ],
    articulationCoachAr: 'قف لحظة خاطفة على التاء الساكنة (إِتْـ) ثم افتح المقطع الثاني براء مضمومة ممدودة (ـرُو).',
    historicalNoteAr: 'تطور لفظها في الريف المصري إلى كلمة «تِرْعَة» للإشارة إلى قنوات مياه النيل.'
  },
  {
    id: 'pron-per-aa',
    difficulty: 'advanced',
    difficultyLabelAr: 'متقدم',
    hieroglyphs: '𓉐𓉻',
    gardinerCodes: ['O1', 'O29'],
    transliteration: 'pr-ꜥꜣ',
    ipaApprox: '/pirˈʕɑː/',
    reconstructedAr: 'بِر-عَا',
    meaningAr: 'البيت العظيم (أصل كلمة فرعون)',
    englishMeaning: 'Great House (Pharaoh)',
    expectedSyllables: 2,
    consonantSkeleton: ['ب', 'ر', 'ع'],
    acceptedVariantsAr: ['برعا', 'بر عا', 'بيرعا', 'فرعا', 'فرعون', 'براعا'],
    syllables: [
      { text: 'بِر', translit: 'pir', articulationTipAr: 'البيت: باء مكسورة ثم راء' },
      { text: 'عَا', translit: 'ʕɑː', articulationTipAr: 'العظيم: عين حلقية مفتوحة وممدودة' }
    ],
    articulationCoachAr: 'اربط الكلمتين بسلاسة دون فصل طويل: (بِرْ - عَــا) مع إبراز العين الممدودة في المقطع الثاني.',
    historicalNoteAr: 'تحولت تاريخياً عبر اللغات السامية من «بِر-عَا» إلى «فِرْعَوْن» مع إبدال الباء فاءً.'
  },
  {
    id: 'pron-sedjem',
    difficulty: 'advanced',
    difficultyLabelAr: 'متقدم',
    hieroglyphs: '𓋴𓆓𓅓𓄔',
    gardinerCodes: ['S29', 'I10', 'G17', 'F21'],
    transliteration: 'sḏm',
    ipaApprox: '/ˈsaːdʒim/',
    reconstructedAr: 'سِجِم',
    meaningAr: 'سَمِعَ / أصغى / أطاع',
    englishMeaning: 'To Hear / Listen',
    expectedSyllables: 2,
    consonantSkeleton: ['س', 'ج', 'م'],
    acceptedVariantsAr: ['سجم', 'سدم', 'سيجم', 'سجيم', 'صجم', 'اسمع'],
    syllables: [
      { text: 'سِـ', translit: 'si', articulationTipAr: 'سين مكسورة مرققة' },
      { text: 'ـجِم', translit: 'dʒim', articulationTipAr: 'جيم معطشة ثم ميم ختامية' }
    ],
    articulationCoachAr: 'انطق السين واضحة ثم عطّش الجيم (مثل dʒ / ج) واختم بميم مطبقة الشفتين (سِـ - جِمْ).',
    historicalNoteAr: 'القالب الأهم في النحو المصري الكلاسيكي وتُختم الكلمة برمز أذن البقرة 𓄔 كمخصص للسمع.'
  },
  {
    id: 'pron-amun',
    difficulty: 'advanced',
    difficultyLabelAr: 'متقدم',
    hieroglyphs: '𓇋𓏠𓈖𓀭',
    gardinerCodes: ['M17', 'Y5', 'N35', 'A40'],
    transliteration: 'jmn',
    ipaApprox: '/ʔaˈmuːn/',
    reconstructedAr: 'أَمُون',
    meaningAr: 'الخفي / المحتجب (آمون)',
    englishMeaning: 'The Hidden One (Amun)',
    expectedSyllables: 2,
    consonantSkeleton: ['ا', 'م', 'ن'],
    acceptedVariantsAr: ['أمون', 'امون', 'آمون', 'إمن', 'امن', 'إيمون'],
    syllables: [
      { text: 'أَ', translit: 'ʔa', articulationTipAr: 'همزة مفتوحة سريعة' },
      { text: 'مُون', translit: 'muːn', articulationTipAr: 'ميم مضمومة ممدودة مع نون ساكنة' }
    ],
    articulationCoachAr: 'خفّف المقطع الأول (أَ) واضغط بالنبرة الصوتية على المقطع الثاني الممدود (مُـــونْ).',
    historicalNoteAr: 'بقيت الكلمة في التراث الديني والأسماء الملكية مثل توت عنخ آمون وأمنمحات.'
  },
  {
    id: 'pron-hotep-di-nesu',
    difficulty: 'advanced',
    difficultyLabelAr: 'متقدم',
    hieroglyphs: '𓊵𓏙𓇓',
    gardinerCodes: ['R4', 'X8', 'M23'],
    transliteration: 'ḥtp dj nsw',
    ipaApprox: '/ˈħoːtɛp diː ˈniːsuː/',
    reconstructedAr: 'حُتُب دِي نِسُو',
    meaningAr: 'قربان يمنحه الملك',
    englishMeaning: 'An offering given by the King',
    expectedSyllables: 5,
    consonantSkeleton: ['ح', 'ت', 'ب', 'د', 'ي', 'ن', 'س', 'و'],
    acceptedVariantsAr: ['حتب دي نسو', 'حوتب دي نسو', 'حتب دينسو', 'حطب دي نسو', 'حتب دي نيسو'],
    syllables: [
      { text: 'حُتُب', translit: 'ħoːtɛp', articulationTipAr: 'قربان وسلام (مقطعان)' },
      { text: 'دِي', translit: 'diː', articulationTipAr: 'يمنحه / يعطي (دال ممدودة بالياء)' },
      { text: 'نِسُو', translit: 'niːsuː', articulationTipAr: 'الملك (نون مكسورة + سين مضمومة)' }
    ],
    articulationCoachAr: 'انطقها بثلاث وقفات إيقاعية متزنة: (حُتُبْ) — (دِي) — (نِسُو)، مع الانتباه لتقديم الملك شرفياً في الرسم لا في النطق.',
    historicalNoteAr: 'تُعدّ أشهر جملة افتتاحية على اللوحات الحجرية الجنائزية عبر كل العصور الفرعونية.'
  }
];
