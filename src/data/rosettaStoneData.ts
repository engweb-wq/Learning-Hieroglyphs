export interface RosettaScriptBand {
  id: 'hieroglyphic' | 'demotic' | 'greek';
  nameAr: string;
  nameEn: string;
  linesCount: number;
  descriptionAr: string;
  audienceAr: string;
  positionOnStone: 'top' | 'middle' | 'bottom';
  sampleSnippet: string;
  fontSizeClass: string;
  scriptColor: string;
  characteristicsAr: string[];
}

export interface RosettaComparativeKeyword {
  id: string;
  conceptAr: string;
  hieroglyphic: string;
  hieroglyphicTranslit: string;
  demoticDescriptionAr: string;
  greekText: string;
  greekTranslit: string;
  deciphermentSignificanceAr: string;
  isCartouche?: boolean;
}

export const ROSETTA_STONE_INFO = {
  discoveryYear: 1799,
  discoveryLocationAr: 'قلعة قايتباي (برج رشيد) - مصب فرع رشيد في الدلتا',
  discovererAr: 'الضابط الفرنسي بيير فرانسوا بوشار أثناء الحملة الفرنسية',
  dateDecreeBCE: '27 مارس 196 ق.م (العهد البطلمي)',
  monumentTypeAr: 'لوحة نذرية من الجرانوديوريت الأسود (Stela)',
  dimensions: 'الارتفاع: 112.3 سم | العرض: 75.7 سم | السُمك: 28.4 سم | الوزن: ~760 كجم',
  currentMuseum: 'المتحف البريطاني - لندن (القاعة 4، القطعة EA 24)',
  decreeIssuerAr: 'مجمع كهنة مصر المجتمعين في منف لتكريم الملك بطليموس الخامس إبيفانس بمناسبة مرور عام على تتويجه',
  keyBreakthroughScientistAr: 'عالم المصريات الفرنسي جان فرانسوا شامبليون (1822) والفيزيائي الإنجليزي توماس يونغ',
  historicalSignificanceAr: 'المفتاح الذهبي الأوحد الذي فتح أبواب الحضارة المصرية القديمة أمام البشرية بعد أكثر من 1400 عام من الصمت والغموض والنسيان منذ إغلاق آخر معابد إيزيس في فيلة عام 452 ميلادية.'
};

export const ROSETTA_SCRIPT_BANDS: RosettaScriptBand[] = [
  {
    id: 'hieroglyphic',
    nameAr: 'الخط الهيروغليفي المقدس (Hieroglyphic)',
    nameEn: 'Sacred Monumental Script',
    linesCount: 14,
    positionOnStone: 'top',
    audienceAr: 'لغة الآلهة والكهنة والخلود (مدو-نِثر)',
    descriptionAr: 'يحتل الجزء العلوي من الحجر (وهو الأكثر تعرضاً للكسر والتلف، تبقى منه 14 سطراً). استُخدم لنقش المراسيم الدينية في المعابد بحروف تصويرية فخمة لتقرأها الآلهة وكبار الكهنة.',
    sampleSnippet: '𓊪𓏏𓅱𓃭𓅓𓇋𓋴 𓋹𓆓𓏏 𓌻𓊪𓏏𓎛 𓊹𓊹𓊹 𓈖 𓆎𓅓𓏏',
    fontSizeClass: 'text-2xl sm:text-3xl font-hieroglyphs',
    scriptColor: 'text-amber-200',
    characteristicsAr: [
      'خط تصويري رمزي وصوتي في آن واحد',
      'يحتوي على الخراطيش الملكية البيضاوية (شنو)',
      '14 سطراً محطمة الزوايا واليمين',
      'الخط الذي قاد شامبليون لمطابقة حروف الأسماء الملكية'
    ]
  },
  {
    id: 'demotic',
    nameAr: 'الخط الديموطيقي الشعبي (Demotic)',
    nameEn: 'Popular Everyday Script',
    linesCount: 32,
    positionOnStone: 'middle',
    audienceAr: 'لغة الشعب المصري والمعاملات اليومية والإدارية',
    descriptionAr: 'يحتل الجزء الأوسط (وهو الأكثر اكتمالاً وحفظاً، ويضم 32 سطراً). خط اختزالي سريع ومترابط كان يستخدمه عامة المصريين والكتبة في تدوين العقود والرسائل والحسابات.',
    sampleSnippet: 'p-t-w-l-m-y-s ꜥnḫ-ḏt mr-ptḥ nṯr.w n kmt (سِش شَعْت)',
    fontSizeClass: 'text-sm sm:text-base font-serif-ar',
    scriptColor: 'text-stone-300',
    characteristicsAr: [
      'أكمل نصوص الحجر الثلاثة وأقلها تلفاً',
      'كتابة متصلة ومجردة بالكامل من اليمين لليسار',
      '32 سطراً كانت همزة الوصل الأولى لتوماس يونغ',
      'تُمثل التطور الطبيعي للهيراطيقية المتأخرة'
    ]
  },
  {
    id: 'greek',
    nameAr: 'الخط اليوناني القديم (Ancient Greek)',
    nameEn: 'Administrative Hellenistic Script',
    linesCount: 54,
    positionOnStone: 'bottom',
    audienceAr: 'لغة البلاط الملكي والأسرة البطلمية الحاكمة',
    descriptionAr: 'يحتل الجزء السفلي من اللوحة (54 سطراً، منها 27 سطراً كاملة الحفظ). كُتب باليونانية القديمة لأن البطالمة الذين حكموا مصر بعد الإسكندر الأكبر كانوا يتحدثون اليونانية، وكان مفتاح قراءة المعنى الأساسي للمرسوم.',
    sampleSnippet: 'ΒΑΣΙΛΕΥΟΝΤΟΣ ΤΟΥ ΝΕΟΥ ΚΑΙ ΠΑΡΑΛΑΒΟΝΤΟΣ ΤΗΝ ΒΑΣΙΛΕΙΑΝ ΠΑΡΑ ΤΟΥ ΠΑΤΡΟΣ ΠΤΟΛΕΜΑΙΟΥ...',
    fontSizeClass: 'text-xs sm:text-sm font-mono',
    scriptColor: 'text-emerald-200',
    characteristicsAr: [
      '54 سطراً مدونة بحروف يونانية كبيرة (Majuscule)',
      'النص الذي تُرجم فورياً وعرف العلماء من خلاله محتوى المرسوم',
      'أكد أن النصوص الثلاثة تحكي ذات المرسوم الملكي كلمة بكلمة',
      'وفر الأساس المقارن لفك رموز الهيروغليفية والديموطيقية'
    ]
  }
];

export const ROSETTA_COMPARATIVE_KEYWORDS: RosettaComparativeKeyword[] = [
  {
    id: 'kw-ptolemy',
    conceptAr: 'اسم الملك بطليموس (Ptolemy)',
    hieroglyphic: '𓍹𓊪𓏏𓅱𓃭𓅓𓇋𓋴𓍺',
    hieroglyphicTranslit: 'p - t - w - l - m - y - s',
    demoticDescriptionAr: 'علامات ديموطيقية متصلة محاطة بقوسين دائريين تمثل الحروف الصوتية لاسم الملك الأجنبي',
    greekText: 'ΠΤΟΛΕΜΑΙΟΣ',
    greekTranslit: 'Ptolemaios',
    deciphermentSignificanceAr: 'أعظم مفتاح في تاريخ فك الرموز! لاحظ شامبليون أن الخرطوشة الهيروغليفية تتكرر في نفس مواضع اسم (بطليموس) في النص اليوناني، فأثبت أن الهيروغليفية تكتب أسماء الملوك بحروف صوتية أبجدية وليست رموزاً باطنية صامتة!',
    isCartouche: true
  },
  {
    id: 'kw-cleopatra',
    conceptAr: 'اسم الملكة كليوباترا (Cleopatra)',
    hieroglyphic: '𓍹𓈎𓃭𓇋𓍯𓊪𓄿𓏏𓂋𓄿𓍺',
    hieroglyphicTranslit: 'k - l - i - w - p - ꜣ - t - r - ꜣ',
    demoticDescriptionAr: 'الاسم الملكي الصوتي المحفوظ في مسلة فيلة ثنائية اللغة',
    greekText: 'ΚΛΕΟΠΑΤΡΑ',
    greekTranslit: 'Kleopatra',
    deciphermentSignificanceAr: 'المقارنة الحاسمة التي أكدت النظرية؛ طابق شامبليون حروف (P, T, O, L) المشتركة بين خرطوشتي بطليموس وكليوباترا، فتطابقت الرموز الأربعة كالبصمة، فصرخ صيحته الشهيرة: "لقد أمسكت بالسر!"',
    isCartouche: true
  },
  {
    id: 'kw-gods',
    conceptAr: 'الآلهة والأرباب المقدسة (Gods)',
    hieroglyphic: '𓊹𓊹𓊹',
    hieroglyphicTranslit: 'nṯrw',
    demoticDescriptionAr: 'رسم تجريدي اختزالي لعلامات الأعلام الثلاثة الدالة على جمع الآلهة',
    greekText: 'ΘΕΟΙ',
    greekTranslit: 'Theoi',
    deciphermentSignificanceAr: 'تكرار رمز العلم المقدس (نثر 𓊹) ثلاث مرات للدلالة على صيغة الجمع التثليثي، وطابقها لفظ (ثيوي) في اليونانية.'
  },
  {
    id: 'kw-egypt',
    conceptAr: 'مصر (الأرض الخصبة المباركة)',
    hieroglyphic: '𓆎𓅓𓏏 𓊖',
    hieroglyphicTranslit: 'kmt',
    demoticDescriptionAr: 'كلمة كيمت المحفوظة في القبطية حتى اليوم بمعنى مصر وأرضها السوداء الخصبة',
    greekText: 'ΑΙΓΥΠΤΟΣ',
    greekTranslit: 'Aigyptos',
    deciphermentSignificanceAr: 'الرمز التصويري لقطعة الجلد المتقاطعة مع مخصص المدينة (نيوت 𓊖) دل على مصر الخصبة وقابلها اسم (إيجيبتوس) باليونانية.'
  },
  {
    id: 'kw-forever',
    conceptAr: 'الخلود والحياة الأبدية (Living Forever)',
    hieroglyphic: '𓋹𓆓𓏏 𓌻𓊪𓏏𓎛',
    hieroglyphicTranslit: 'ꜥnḫ-ḏt mr-ptḥ',
    demoticDescriptionAr: 'صيغة التمني الملكية الرسمية الشائعة في ختام ألقاب الفراعنة',
    greekText: 'ΑΙΩΝΟΒΙΟΣ ΗΓΑΠΗΜΕΝΟΣ ΥΠΟ ΤΟΥ ΦΘΑ',
    greekTranslit: 'Aionobios Egapemenos Hypo Tou Phtha',
    deciphermentSignificanceAr: 'ترجمة حرفية دقيقة: "حيٌّ إلى الأبد، محبوب الإله بتاح"؛ ربطت بين الرمز المقدس عنخ وجت ومر، وفتحت الطريق لفهم بقية الألقاب الملكية.'
  }
];
