export type StoneType = 'limestone' | 'sandstone' | 'granite' | 'basalt';

export interface MasonTool {
  id: 'pointed_chisel' | 'flat_chisel' | 'wooden_mallet' | 'diorite_pounder' | 'measuring_reed' | 'polishing_sand';
  nameAr: string;
  nameEn: string;
  ancientNameAr: string;
  icon: string;
  category: 'chisel' | 'mallet' | 'finishing';
  descriptionAr: string;
  bestUsedForAr: string;
  soundType: 'chisel' | 'mallet' | 'polish' | 'reed';
}

export const MASON_TOOLS: MasonTool[] = [
  {
    id: 'pointed_chisel',
    nameAr: 'الإزميل البرونزي المدبب',
    nameEn: 'Pointed Bronze Chisel',
    ancientNameAr: 'مِدَقّ الحواف (مِنْخ)',
    icon: '🗡️',
    category: 'chisel',
    descriptionAr: 'إزميل صلب مسنون الرأس من سبيكة البرونز المقسى، يُستخدم لحفر الأخاديد وتحديد الخطوط الخارجية الدقيقة للرمز.',
    bestUsedForAr: 'تحديد محيط الرمز وحفر الزوايا الضيقة والتفاصيل الدقيقة.',
    soundType: 'chisel'
  },
  {
    id: 'flat_chisel',
    nameAr: 'الإزميل العريض المسطح',
    nameEn: 'Flat Broad Chisel',
    ancientNameAr: 'إزميل التجويف والتسوية',
    icon: '🪓',
    category: 'chisel',
    descriptionAr: 'إزميل ذو نصل أفقي عريض، صُمم لتفريغ المساحات الداخلية الغائرة وإزالة الزوائد الحجرية بتناسق.',
    bestUsedForAr: 'تفريغ عمق النقش وتسوية قاع التجويف الحجري.',
    soundType: 'chisel'
  },
  {
    id: 'wooden_mallet',
    nameAr: 'المطرقة الخشبية الكروية',
    nameEn: 'Round Acacia Mallet',
    ancientNameAr: 'مِطرقَة خشب السَّنط',
    icon: '🔨',
    category: 'mallet',
    descriptionAr: 'مطرقة أسطوانية منحوتة من جذوع خشب السنط شديد الصلابة، تُعطي ضربات متوازنة تمتص الصدمات دون كسر الإزميل.',
    bestUsedForAr: 'طرق الإزميل البرونزي على الحجر الجيري والرملي.',
    soundType: 'mallet'
  },
  {
    id: 'diorite_pounder',
    nameAr: 'مطرقة الديوريت الصخرية',
    nameEn: 'Heavy Diorite Pounder',
    ancientNameAr: 'مِرجَم الديوريت القاسي',
    icon: '🪨',
    category: 'mallet',
    descriptionAr: 'كرة صخرية ثقيلة من حجر الديوريت فائق الكثافة، تُستخدم لدق الصخور النارية القاسية مثل الجرانيت والبازلت.',
    bestUsedForAr: 'نحت ودق صخور الجرانيت الصلبة ومسلات أسوان.',
    soundType: 'mallet'
  },
  {
    id: 'measuring_reed',
    nameAr: 'ريشة التخطيط بالمغرة الحمراء',
    nameEn: 'Red Ochre Grid Reed',
    ancientNameAr: 'قصبة الترسيم الملكي',
    icon: '🖌️',
    category: 'finishing',
    descriptionAr: 'قصبة نباتية تُغمس في صبغة المغرة الحمراء لتخطيط شبكة المربعات والنسب التشريحية قبل لمس الإزميل للحجر.',
    bestUsedForAr: 'رسم المسودة ومراجعة النسب القياسية للرمز.',
    soundType: 'reed'
  },
  {
    id: 'polishing_sand',
    nameAr: 'حجر السنفرة والصقل بالكوارتز',
    nameEn: 'Quartz Polishing Stone',
    ancientNameAr: 'حَجَر الصَّقْل والتَّنعيم',
    icon: '✨',
    category: 'finishing',
    descriptionAr: 'كتلة من الحجر الرملي المشبع بحبيبات الكوارتز الدقيقة والماء لصقل حواف النقش وإزالة الخدوش للحصول على ملمس ناعم كالحرير.',
    bestUsedForAr: 'المرحلة النهائية لصقل وتنعيم النقش وإبراز ظلاله.',
    soundType: 'polish'
  }
];

export interface CarvingZone {
  id: string;
  nameAr: string;
  descriptionAr: string;
  recommendedToolId: 'pointed_chisel' | 'flat_chisel' | 'wooden_mallet' | 'diorite_pounder' | 'polishing_sand';
  requiredStrikes: number;
  completedStrikes: number;
}

export interface StoneCarvingMission {
  id: string;
  levelNumber: number;
  titleAr: string;
  hieroglyph: string;
  readingAr: string;
  transliteration: string;
  meaningAr: string;
  gardinerCode: string;
  stoneType: StoneType;
  stoneNameAr: string;
  stoneTextureCss: string;
  stoneColorClass: string;
  stoneDescriptionAr: string;
  reliefTypeAr: string; // نقش غائر (Sunken) أو نقش بارز (Bas-Relief)
  commissionerAr: string;
  commissionBriefAr: string;
  audioScript: string;
  initialQuestion: {
    questionAr: string;
    targetToolId: 'pointed_chisel' | 'flat_chisel' | 'wooden_mallet' | 'diorite_pounder' | 'measuring_reed' | 'polishing_sand';
    hintAr: string;
    explanationAr: string;
  };
  carvingZones: {
    id: string;
    nameAr: string;
    guideAr: string;
    preferredToolId: 'pointed_chisel' | 'flat_chisel' | 'wooden_mallet' | 'diorite_pounder' | 'polishing_sand';
    requiredStrikes: number;
  }[];
  masonMasterTipAr: string;
  pointsReward: number;
}

export const STONE_CARVING_MISSIONS: StoneCarvingMission[] = [
  {
    id: 'mission-ankh-limestone',
    levelNumber: 1,
    titleAr: 'نقش مفتاح الحياة (عَنخ 𓋹) على الحجر الجيري',
    hieroglyph: '𓋹',
    readingAr: 'عَنخ',
    transliteration: 'ꜥnḫ',
    meaningAr: 'الحياة الأبدية والخلود والبركة',
    gardinerCode: 'S34',
    stoneType: 'limestone',
    stoneNameAr: 'حجر طُرَة الجيري الأبيض الملكي',
    stoneTextureCss: 'bg-[#F2ECE1] border-[#CFC5B4]',
    stoneColorClass: 'text-stone-800',
    stoneDescriptionAr: 'حجر ناعم ومثالي استُخرج من مقالع طرة، يتميز بمرونته العالية تحت نصل الإزميل وسهولة حفر الأخاديد البديعة عليه.',
    reliefTypeAr: 'نقش غائر في الحجر (Sunken Relief)',
    commissionerAr: 'كبير نحاتي البلاط بمعبد الكرنك',
    commissionBriefAr: 'أمر الوزير الملكي بنقش رمز عنخ المبارك على كتلة حجرية في مقصورة المعبد. اختر الأداة الصحيحة لبدء تخطيط وتفريغ الحواف.',
    audioScript: 'عَنخ. مفتاح الحياة الأبدية. رمز الخلود والبركة، منقوش على الحجر الجيري الأبيض.',
    initialQuestion: {
      questionAr: 'لبدء نحت الخطوط الخارجية الدقيقة لرمز عنخ على الحجر الجيري الطري، ما الأداة النحاتية الأنسب لحفر الأخاديد الحادة؟',
      targetToolId: 'pointed_chisel',
      hintAr: 'اختر أداة معدنية ذات رأس مدبب ومسنون لشق حواف الرمز بدقة.',
      explanationAr: 'الإزميل البرونزي المدبب هو الأداة المثالية لحفر خطوط المحيط الأولى قبل استخدام الأزاميل العريضة لتفريغ العمق.'
    },
    carvingZones: [
      {
        id: 'loop',
        nameAr: 'الحلقة العلوية البيضاوية (عروة مفتاح الحياة)',
        guideAr: 'انقر لنقر وتفريغ القوس العلوي المتصل للإزميل',
        preferredToolId: 'pointed_chisel',
        requiredStrikes: 3
      },
      {
        id: 'crossbar',
        nameAr: 'العارضة الأفقية (الكتفان والعقدة الوسطى)',
        guideAr: 'دق الخط الأفقي المتقاطع بتوازن لضبط الاستقامة',
        preferredToolId: 'flat_chisel',
        requiredStrikes: 3
      },
      {
        id: 'stem',
        nameAr: 'العمود الرأسي الممتد نحو القاعدة',
        guideAr: 'فرغ التجويف الرأسي العميق حتى قاع الحجر',
        preferredToolId: 'wooden_mallet',
        requiredStrikes: 4
      },
      {
        id: 'polish',
        nameAr: 'تنعيم وصقل حواف النقش بالكوارتز',
        guideAr: 'امسح الحجر بحبيبات الكوارتز لإزالة الرايش وإبراز الظل',
        preferredToolId: 'polishing_sand',
        requiredStrikes: 2
      }
    ],
    masonMasterTipAr: 'في الحجر الجيري، اضرب المطرقة بزاوية 45 درجة حتى لا يتشقق الحجر على طول خطوط الترقق الطبيعية.',
    pointsReward: 120
  },
  {
    id: 'mission-horus-sandstone',
    levelNumber: 2,
    titleAr: 'نقش صقر حورس الحامي (حُور 𓅃) على الحجر الرملي',
    hieroglyph: '𓅃',
    readingAr: 'حُور',
    transliteration: 'ḥr',
    meaningAr: 'الصقر حورس، العالي والمتسامي في الأفق',
    gardinerCode: 'G5',
    stoneType: 'sandstone',
    stoneNameAr: 'الحجر الرملي النوبي الذهبي (مقالع السلسلة)',
    stoneTextureCss: 'bg-[#E3C69D] border-[#BFA075]',
    stoneColorClass: 'text-amber-950',
    stoneDescriptionAr: 'حجر ذو قوام حبيبي متماسك استُخرج من جبل السلسلة، يحتاج إلى أزاميل عريضة ومطرقة خشبية متزنة لتجنب تفتت حوافه الرملية.',
    reliefTypeAr: 'نقش نصف بارز (Bas-Relief)',
    commissionerAr: 'رئيس فناني معبد إدفو العظيم',
    commissionBriefAr: 'يُراد نقش صورة الصقر حورس على جدار صرح معبد إدفو. دقة الجناحين والمخالب تتطلب مطرقة السنط لتوجيه ضربات الإزميل بحذر.',
    audioScript: 'حُور. صقر حورس الإلهي المتوج بالتاج المزدوج، حامي مصر والفرعون.',
    initialQuestion: {
      questionAr: 'عند طرق الإزميل على الحجر الرملي لتفريغ الخلفية المحيطة بريش صقر حورس، ما المطرقة التي استخدمها النحاتون للحصول على ضربة مرنة لا تكسر الحواف؟',
      targetToolId: 'wooden_mallet',
      hintAr: 'مطرقة أسطوانية مصنوعة من خشب محلي مصري صلب تمتص الارتداد.',
      explanationAr: 'مطرقة خشب السنط الكروية كانت الأداة المعتمدة لدى فناني دير المدينة في أعمال النحت الرقيقة لتفادي ارتداد الصدمة إلى الحجر.'
    },
    carvingZones: [
      {
        id: 'head-crown',
        nameAr: 'رأس الصقر والعين الإلهية الثاقبة',
        guideAr: 'انقر لنحت منقار الصقر الحاد وحاجب العين',
        preferredToolId: 'pointed_chisel',
        requiredStrikes: 3
      },
      {
        id: 'wings',
        nameAr: 'ريش الجناحين المطويين والجسد',
        guideAr: 'سوّي تفاصيل الريش المتراص بالإزميل العريض',
        preferredToolId: 'flat_chisel',
        requiredStrikes: 4
      },
      {
        id: 'claws',
        nameAr: 'المخالب الثابتة وقاعدة النصب',
        guideAr: 'ثبّت عمق المخالب الحجرية بضربات المطرقة',
        preferredToolId: 'wooden_mallet',
        requiredStrikes: 3
      },
      {
        id: 'polish',
        nameAr: 'صقل وتنعيم محيط الجناحين',
        guideAr: 'أزل الحبيبات الرملية الخشنة لتظهر تفاصيل الريش',
        preferredToolId: 'polishing_sand',
        requiredStrikes: 2
      }
    ],
    masonMasterTipAr: 'الحجر الرملي يتآكل بالاحتكاك السريع؛ حافظ على ترطيب سطح الحجر برذاذ الماء لمنع تصاعد الغبار الرملي.',
    pointsReward: 160
  },
  {
    id: 'mission-wedjat-granite',
    levelNumber: 3,
    titleAr: 'نقش عين حورس الودجات (وجَات 𓁹) على الجرانيت الوردي',
    hieroglyph: '𓁹',
    readingAr: 'وجَات',
    transliteration: 'wḏꜣt',
    meaningAr: 'العين السليمة المقدسة، رمز الشفاء والحماية التامة',
    gardinerCode: 'D10',
    stoneType: 'granite',
    stoneNameAr: 'جرانيت أسوان الوردي الإمبراطوري',
    stoneTextureCss: 'bg-[#C99187] border-[#A86F66]',
    stoneColorClass: 'text-stone-900',
    stoneDescriptionAr: 'من أقسى صخور الكوكب، صخر بلوري ناري يتكون من الفلسبار والكوارتز والميكا. يتطلب كرات ديوريت صخرية ثقيلة وصبر كبار البنائين.',
    reliefTypeAr: 'نقش غائر مصقول في الجرانيت',
    commissionerAr: 'مهندس المسلات الملكية في عهد حتشبسوت',
    commissionBriefAr: 'المسلة الملكية تتطلب نقش عين الودجات على قاعدة الجرانيت الناري. النحاس والبرونز العادي ينثني سريعاً هنا، لذا تحتاج لأدوات السحق الكثيفة!',
    audioScript: 'وجَات. عين حورس المقدسة، رمز التمام والشفاء والحماية من كل عين حاسدة.',
    initialQuestion: {
      questionAr: 'الجرانيت الوردي أشد صلابة من الأزاميل المعدنية العادية؛ ما الأداة الصخرية الثقيلة التي اعتمدها الفراعنة لدق وتفتيت الجرانيت الصلب؟',
      targetToolId: 'diorite_pounder',
      hintAr: 'صخر كروي أسود معتم شديد الكثافة استُخرج من صحراء النوبة.',
      explanationAr: 'كرات الديوريت الصخرية (Diorite Pounders) كانت تُستخدم لدق سطح الجرانيت وتكسير بلوراته بالصدمات المتتالية قبل التنعيم.'
    },
    carvingZones: [
      {
        id: 'pupil',
        nameAr: 'بؤبؤ العين والجفن العلوي المنحني',
        guideAr: 'دق خط القوس العلوي بحذر مع ثبات الضربة',
        preferredToolId: 'diorite_pounder',
        requiredStrikes: 4
      },
      {
        id: 'falcon-marking',
        nameAr: 'علامة دمعة الصقر السفلية المميزة',
        guideAr: 'نحت الامتداد الزخرفي لدمعة الصقر',
        preferredToolId: 'pointed_chisel',
        requiredStrikes: 3
      },
      {
        id: 'spiral-curl',
        nameAr: 'الضفيرة اللولبية الهندسية',
        guideAr: 'حفر الالتواء الحلزوني أسفل العين',
        preferredToolId: 'flat_chisel',
        requiredStrikes: 3
      },
      {
        id: 'quartz-buff',
        nameAr: 'صقل مرآة الجرانيت الكوارتزية',
        guideAr: 'حك السطح بمعجون رمل الكوارتز حتى يلمع كالزجاج',
        preferredToolId: 'polishing_sand',
        requiredStrikes: 3
      }
    ],
    masonMasterTipAr: 'دق الجرانيت فن يعتمد على ضربات إيقاعية عمودية متتالية؛ فتفتيت البلورات بالاحتكاك أسرع بكثير من محاولة قصه.',
    pointsReward: 200
  },
  {
    id: 'mission-khepri-basalt',
    levelNumber: 4,
    titleAr: 'نقش جعران التجدد (خِبرِر 𓆣) على البازلت الأسود',
    hieroglyph: '𓆣',
    readingAr: 'خِبرِر',
    transliteration: 'ḫprr',
    meaningAr: 'الجعران المقدس، رمز التجدد والولادة الدائمة وشروق الشمس',
    gardinerCode: 'L1',
    stoneType: 'basalt',
    stoneNameAr: 'البازلت الأسود البركاني الملكي',
    stoneTextureCss: 'bg-[#2B2B2E] border-[#424247]',
    stoneColorClass: 'text-stone-100',
    stoneDescriptionAr: 'صخر بركاني أسود داكن شديد التماسك، كان الفراعنة يختارونه لصناعة أرضيات المعابد والتماثيل الملكية الخالدة لعصيانه على عوامل الزمن.',
    reliefTypeAr: 'نقش مجسم فائق الدقة (High Polish Relief)',
    commissionerAr: 'كبير فناني بيت الحياة في منف',
    commissionBriefAr: 'حجر البازلت الصقيل ينتظر لمساتك لنقش جعران شروق الشمس. خطوط الأجنحة والمقابض تتطلب إزميلاً فائق الدقة وصقلاً نهائياً يبهر الأبصار.',
    audioScript: 'خِبرِر. الجعران المقدس رمز التجدد الذاتي وشروق الحياة من باطن الأرض.',
    initialQuestion: {
      questionAr: 'بعد الانتهاء من حفر أجنحة وأرجل الجعران على البازلت الأسود، ما الأداة والتقنية الضرورية لإكساب السطح ذلك البريق الأسود العاكس كالمرآة؟',
      targetToolId: 'polishing_sand',
      hintAr: 'فرك السطح بكتلة حجرية رملية دقيقة وحبيبات مائية ناعمة.',
      explanationAr: 'استخدم النحاتون كتلاً من الكوارتز ورمل الصحراء الناعم مع زيت الكتان لصقل البازلت حتى يكتسب لمعاناً مذهلاً يعكس الضوء.'
    },
    carvingZones: [
      {
        id: 'shell',
        nameAr: 'درع الجعران وقرص الشمس بين قرنيه',
        guideAr: 'نحت قبة الدرع الظهري المنحنية بدقة',
        preferredToolId: 'pointed_chisel',
        requiredStrikes: 4
      },
      {
        id: 'legs',
        nameAr: 'الأرجل الست المفصلية المسننة',
        guideAr: 'حفر تفرعات الأرجل الحساسة دون كسر النتوءات',
        preferredToolId: 'flat_chisel',
        requiredStrikes: 4
      },
      {
        id: 'base',
        nameAr: 'قاعدة البيضاوة والخرطوشة النذرية',
        guideAr: 'تفريغ عمق الإطار المحيط بالجعران',
        preferredToolId: 'wooden_mallet',
        requiredStrikes: 3
      },
      {
        id: 'mirror-polish',
        nameAr: 'الصقل الملكي الأسود العاكس',
        guideAr: 'صقل بلورات البازلت حتى يعكس نور الشمس',
        preferredToolId: 'polishing_sand',
        requiredStrikes: 3
      }
    ],
    masonMasterTipAr: 'في البازلت الأسود، أي خدش عشوائي يترك أثراً رمادياً واضحاً؛ كن دقيقاً كالمهندس ولا تدع الإزميل ينزلق عن خط الرسم.',
    pointsReward: 250
  }
];
