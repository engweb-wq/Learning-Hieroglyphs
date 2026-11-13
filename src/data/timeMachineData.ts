export interface EraEvolutionSample {
  wordKey: string;
  nameAr: string;
  conceptAr: string;
  transliteration: string;
  gardinerCode: string;
  oldKingdomStyle: {
    hieroglyphs: string;
    styleTitleAr: string;
    descriptionAr: string;
    mediumAr: string;
    textureClass: string;
  };
  middleKingdomStyle: {
    hieroglyphs: string;
    styleTitleAr: string;
    descriptionAr: string;
    mediumAr: string;
    textureClass: string;
  };
  newKingdomStyle: {
    hieroglyphs: string;
    styleTitleAr: string;
    descriptionAr: string;
    mediumAr: string;
    textureClass: string;
  };
}

export interface TimeMachineEra {
  id: 'old_kingdom' | 'middle_kingdom' | 'new_kingdom';
  nameAr: string;
  eraBadgeAr: string;
  dynastiesAr: string;
  approximateYearsBCE: string;
  capitalCityAr: string;
  famousPharaohs: string[];
  themeColors: {
    primary: string;
    secondary: string;
    border: string;
    bgGradient: string;
    textAccent: string;
  };
  writingEvolutionSummaryAr: string;
  scribalStyleCharacteristics: {
    titleAr: string;
    descriptionAr: string;
    icon: string;
  }[];
  scribalMediums: {
    nameAr: string;
    roleAr: string;
  }[];
  scribalToolsUsed: string[];
  royalCartoucheStyle: {
    titleAr: string;
    sampleHieroglyphs: string;
    kingNameAr: string;
    techniqueDescriptionAr: string;
  };
  famousMonumentalInscription: {
    titleAr: string;
    sourceMonumentAr: string;
    hieroglyphs: string;
    transliteration: string;
    translationAr: string;
    analysisAr: string;
  };
  audioNarrativeScript: string;
  timeQuiz: {
    questionAr: string;
    inscriptionSnippet: string;
    clueAr: string;
    options: {
      id: string;
      labelAr: string;
      isCorrect: boolean;
      explanationAr: string;
    }[];
  };
}

export const TIME_MACHINE_ERAS: TimeMachineEra[] = [
  {
    id: 'old_kingdom',
    nameAr: 'عصر الدولة القديمة (بناة الأهرام والنحت الصرحي)',
    eraBadgeAr: 'الأسرات 3 - 6 (~2686 - 2181 ق.م)',
    dynastiesAr: 'الأسرات الثالثة حتى السادسة',
    approximateYearsBCE: '2686 - 2181 ق.م',
    capitalCityAr: 'منف (إنب-حدج / الجدار الأبيض)',
    famousPharaohs: ['زوسر', 'سنفرو', 'خوفو', 'خفرع', 'منقرع', 'أوناس'],
    themeColors: {
      primary: 'from-[#4A3B2C] to-[#2E2419]',
      secondary: 'bg-[#F4EFEA]',
      border: 'border-[#C7B79E]',
      bgGradient: 'bg-gradient-to-b from-[#F7F3ED] to-[#EBE2D3]',
      textAccent: 'text-amber-900'
    },
    writingEvolutionSummaryAr: 'في الدولة القديمة، كان الخط الهيروغليفي فناً نحتياً تصويرياً ضخماً؛ رُسمت الرموز بنسب طبيعية بالغة الدقة تحاكي عيون الصقور وتجاعيد الزواحف، مع نحت غائر عميق في الحجر الجيري والجرانيت، وظهرت أقدم النصوص الدينية المسجلة (نصوص الأهرام).',
    scribalStyleCharacteristics: [
      {
        titleAr: 'النحت التصويري الفائق (Monumental Relief)',
        descriptionAr: 'كل رمز كان تحفة نحتية كاملة؛ ريش الطيور وتفاصيل أجساد الحيوانات تُنحت بدقة تشريحية لا نظير لها.',
        icon: '𓅃'
      },
      {
        titleAr: 'مرونة الاتجاه الصرحي (Boustrphdon & Symmetry)',
        descriptionAr: 'كان اتجاه الكتابة يخضع للتناغم المعماري في المعابد؛ يُكتب من اليمين أو اليسار أو في أعمدة رأسية بحسب واجهة تماثيل الآلهة.',
        icon: '𓇓'
      },
      {
        titleAr: 'الخراطيش والسرخ المبكر (Serekh & Early Cartouche)',
        descriptionAr: 'ظهور واجهة القصر الملكي (السرخ) المتوج بحورس، تلاه ابتكار حبل "شنو" البيضاوي لحماية أسماء الملوك كخوفو وخفرع.',
        icon: '𓊁'
      },
      {
        titleAr: 'نصوص الأهرام الطقسية (Pyramid Texts)',
        descriptionAr: 'أقدم المتون الدينية في التاريخ؛ نُقشت على جدران هرم أوناس وطُليت باللون الأخضر المزرق دلالة على البعث والفيضان.',
        icon: '𓉐'
      }
    ],
    scribalMediums: [
      { nameAr: 'حجر طرة الجيري الأبيض', roleAr: 'السطح الأرقى للنحت الغائر والبارز المطلي' },
      { nameAr: 'جرانيت أسوان الوردي', roleAr: 'للأبواب الوهمية والمسلات والتماثيل الضخمة' },
      { nameAr: 'ألواح خشب الأرز المصقول', roleAr: 'لحفظ السجلات الملكية المبكرة ومصاطب النبلاء' },
      { nameAr: 'شقفات الحجر (أوستراكا مبكرة)', roleAr: 'لتدريب تلامذة الكتبة على المقاييس' }
    ],
    scribalToolsUsed: ['إزميل البرونز والنحاس المقسى', 'مطرقة الخشب الصلب (السنط)', 'أكاسيد الملاكيت والأزوريت للتلوين', 'قصبات الترسيم بالمغرة الحمراء'],
    royalCartoucheStyle: {
      titleAr: 'أسلوب السرخ والخرطوشة المبكرة لملوك الأهرام',
      sampleHieroglyphs: '𓐍𓅱𓆑𓅱',
      kingNameAr: 'الملك خوفو (خنوم-خوف-وي)',
      techniqueDescriptionAr: 'نقش صلب غائر بحواف حادة وعقدة شنو دائرية سميكة تلتف حول الرموز لتشكل درعاً سحرياً أبدياً.'
    },
    famousMonumentalInscription: {
      titleAr: 'تعويذة الصعود إلى السماء من نصوص هرم أوناس (سقارة)',
      sourceMonumentAr: 'جدران غرفة الدفن بهرم أوناس، الأسرة الخامسة',
      hieroglyphs: '𓊹 𓇓 𓏏 𓂝 𓈖 𓐍 𓊪 𓂋 𓅓 𓇳',
      transliteration: 'nṯr nsw ꜥnḫ ḫpr m rꜥ',
      translationAr: 'الملك المقدس حيٌّ، وقد تجلّى في موكب رع العظيم في الأفق الأبدي',
      analysisAr: 'تتميز الجملة بالبساطة النحوية والتأكيد على ألوهية الفرعون واتحاده بقرص الشمس رع.'
    },
    audioNarrativeScript: 'في عصر الدولة القديمة، لم تكن الهيروغليفية مجرد كتابة، بل كانت نصوصاً حية منحوتة في قلب الصخر؛ يمسك النحات بإزميله ليخلد سيرة بناة الأهرام على جدران سقارة والجيزة بمهابة وجلال.',
    timeQuiz: {
      questionAr: 'ما السمة البصرية الأكثر تمييزاً لخطوط ونقوش عصر الدولة القديمة؟',
      inscriptionSnippet: '𓊹 𓇓 𓏏 𓅃',
      clueAr: 'تأمل دقة تفاصيل ريش الصقر وعيون الكائنات المنحوتة في الصخر.',
      options: [
        {
          id: 'opt1',
          labelAr: 'نحت تصويري تفصيلي دقيق يحاكي تشريح الكائنات الحية في الصخر',
          isCorrect: true,
          explanationAr: 'صحيح! تميزت الدولة القديمة بالكمال النحتي حيث عومل كل رمز هيروغليفي كتمثال مصغر.'
        },
        {
          id: 'opt2',
          labelAr: 'خطوط متصلة مائلة ومجردة بالمداد السريع على ورق البردي',
          isCorrect: false,
          explanationAr: 'هذا يصف الخط الهيراطيقي الذي ساد لاحقاً في الدولة الحديثة.'
        },
        {
          id: 'opt3',
          labelAr: 'حروف يونانية مقتبسة مع سبعة حروف ديموطيقية',
          isCorrect: false,
          explanationAr: 'هذا يصف المرحلة القبطية المتأخرة بعد القرن الأول الميلادي.'
        }
      ]
    }
  },
  {
    id: 'middle_kingdom',
    nameAr: 'العصر الكلاسيكي الذهبي (الدولة الوسطى)',
    eraBadgeAr: 'الأسرات 11 - 13 (~2055 - 1650 ق.م)',
    dynastiesAr: 'الأسرات الحادية عشرة حتى الثالثة عشرة',
    approximateYearsBCE: '2055 - 1650 ق.م',
    capitalCityAr: 'طيبة (الأقصر) ثم إثت-تاوي (اللشت)',
    famousPharaohs: ['منتوحتب الثاني', 'أمنمحات الأول', 'سنوسرت الأول', 'سنوسرت الثالث', 'أمنمحات الثالث'],
    themeColors: {
      primary: 'from-[#4D3319] to-[#2B1B0C]',
      secondary: 'bg-[#FAF3E0]',
      border: 'border-[#D4AF37]',
      bgGradient: 'bg-gradient-to-b from-[#FDF9F0] to-[#F5EAD4]',
      textAccent: 'text-amber-800'
    },
    writingEvolutionSummaryAr: 'تُعتبر لغة الدولة الوسطى (المصرية الكلاسيكية) أسمى مراحل اللغة فصاحة وتناسقاً؛ فيها وُضعت القواعد النحوية المعيارية ونُظمت الرموز داخل مربعات هندسية (Cadrat) متوازنة، وكتبت روائع الأدب كقصة سنوهي والفلاح الفصيح.',
    scribalStyleCharacteristics: [
      {
        titleAr: 'التناغم الرياضي والمربعات (Square Cadrat)',
        descriptionAr: 'ترتيب العلامات الهيروغليفية داخل كتل مربعة خيالية متناسقة تمنع وجود فراغات قبيحة بين الحروف.',
        icon: '𓏞'
      },
      {
        titleAr: 'النضج الأدبي والبلاغي (Classical Golden Age)',
        descriptionAr: 'ازدهار أدب الحكمة والتعاليم والفلسفة، وأصبحت لغة هذا العصر النموذج التعليمي الرسمي لآلاف السنين.',
        icon: '📜'
      },
      {
        titleAr: 'المخصصات الدلالية الدقيقة (Determinatives Mastery)',
        descriptionAr: 'تحديد دقيق للمخصصات في نهاية كل كلمة لتوضيح المعنى وتفريق الكلمات المشتركة صوتياً.',
        icon: '𓀀'
      },
      {
        titleAr: 'صيغ النذور الملكية الثابتة (ḥtp-dỉ-nsw)',
        descriptionAr: 'استقرار صيغة القرابين الملكية (حتب دي نيسو) كصيغة رسمية مقدسة على اللوحات الجنائزية.',
        icon: '𓊵'
      }
    ],
    scribalMediums: [
      { nameAr: 'ورق البردي المصقول النقي', roleAr: 'لتدوين المخطوطات الأدبية والطبية والفلكية' },
      { nameAr: 'المداد الكربوني الأسود والمغرة الحمراء', roleAr: 'لتمييز عناوين الفصول وعلامات الترقيم' },
      { nameAr: 'ألواح الخشب المغطاة بالجص (Gesso)', roleAr: 'لتمارين المدارس ونسخ الحكايات الكلاسيكية' },
      { nameAr: 'لوحات الحجر الجيري النذرية', roleAr: 'لتسجيل السير الذاتية للنبلاء في أبيدوس' }
    ],
    scribalToolsUsed: ['ريش البوص المشطوفة بدقة', 'محبرة الكاتب المزدوجة (أسود/أحمر)', 'سكين كشط البردي العاجي', 'حبل القياس الكتاني المضفر'],
    royalCartoucheStyle: {
      titleAr: 'الخرطوشة الكلاسيكية المتوازنة لسنوسرت',
      sampleHieroglyphs: '𓇳𓐍𓂝𓂓𓅱',
      kingNameAr: 'الملك سنوسرت الثالث (خع-كاو-رع)',
      techniqueDescriptionAr: 'تناسق هندسي بديع بين قرص الشمس ورمز خع وأذرع الكا الثلاث، مع نسب قياسية معيارية.'
    },
    famousMonumentalInscription: {
      titleAr: 'مفتتح قصة سنوهي الكلاسيكية (مخطوطة برلين 3022)',
      sourceMonumentAr: 'بردية برلين الملكية، عصر سنوسرت الأول',
      hieroglyphs: '𓂋𓊪𓂝 𓄂𓂝 𓋴𓌢𓈖𓌅 𓅓 𓄤 𓆑',
      transliteration: 'r-pꜥt ḥꜣtj-ꜥ s-nht m nfr.f',
      translationAr: 'الأمير الوراثي والحاكم الإقليمي سنوهي، في تمام بهائه وعافيته',
      analysisAr: 'قمة الفصاحة الأدبية المصرية؛ تميزت بتوازن العبارات واستخدام الألقاب الشرفية بأوزان إيقاعية موسيقية.'
    },
    audioNarrativeScript: 'في الدولة الوسطى، تحولت اللغة إلى سيمفونية منضبطة؛ ألزم الكتبة أنفسهم بمربعات هندسية دقيقة، وأبدعوا أدباً عالمياً خالداً جعل لغتهم المعيار الذهبي لكل أجيال الكتبة اللاحقين.',
    timeQuiz: {
      questionAr: 'ما الابتكار التنظيمي الأبرز الذي رسخه كتبة الدولة الوسطى في رسم النصوص؟',
      inscriptionSnippet: '𓊵 𓏙 𓇓 𓏏',
      clueAr: 'فكر في كيفية تجميع العلامات لملء الفراغ بشكل مربع متناسق.',
      options: [
        {
          id: 'opt1',
          labelAr: 'نظام المربعات الهندسية المتوازنة (Cadrat) لمنع الفراغات وتوحيد المقاييس',
          isCorrect: true,
          explanationAr: 'صحيح تماماً! اعتمد الكتبة تجميع العلامات رأسياً وأفقياً داخل مربعات بصرية متناغمة.'
        },
        {
          id: 'opt2',
          labelAr: 'إلغاء المخصصات الدلالية والاكتفاء بالحروف الصوتية فقط',
          isCorrect: false,
          explanationAr: 'بالعكس، زادت أهمية ودقة المخصصات في الدولة الوسطى لتوضيح المعاني.'
        },
        {
          id: 'opt3',
          labelAr: 'الكتابة من اليسار إلى اليمين فقط كما في اللغات الأوروبية',
          isCorrect: false,
          explanationAr: 'ظلت الكتابة المصرية مرنة الاتجاه مع تفضيل الاتجاه من اليمين إلى اليسار.'
        }
      ]
    }
  },
  {
    id: 'new_kingdom',
    nameAr: 'عصر الإمبراطورية الكبرى (الدولة الحديثة)',
    eraBadgeAr: 'الأسرات 18 - 20 (~1550 - 1069 ق.م)',
    dynastiesAr: 'الأسرات الثامنة عشرة حتى العشرين',
    approximateYearsBCE: '1550 - 1069 ق.م',
    capitalCityAr: 'طيبة (الأقصر) وعاصمة العمارنة (أخت-آتون)',
    famousPharaohs: ['أحمس الأول', 'حتشبسوت', 'تحتمس الثالث', 'إخناتون', 'توت عنخ آمون', 'رمسيس الثاني'],
    themeColors: {
      primary: 'from-[#1A2634] to-[#0D1520]',
      secondary: 'bg-[#EDF3F9]',
      border: 'border-[#3B82F6]',
      bgGradient: 'bg-gradient-to-b from-[#FAF8F5] to-[#E8EDF5]',
      textAccent: 'text-amber-900'
    },
    writingEvolutionSummaryAr: 'شهدت الدولة الحديثة ثورة كتابية كبرى مع اتساع الإمبراطورية؛ ازدهر الخط الهيراطيقي السريع كخط يومي وإداري، ونُفذت النقوش الهيروغليفية في المعابد ببهجة ملونة فخمة مرصعة بالذهب واللازورد، مع نصوص كتاب الموتى المصورة وثورة فن العمارنة الشمسي.',
    scribalStyleCharacteristics: [
      {
        titleAr: 'سيادة الخط الهيراطيقي السريع (Cursive Hieratic)',
        descriptionAr: 'تحول خط الكتبة اليومي إلى كتابة انسيابية متصلة بالقلم البوصي السريع لتدوين آلاف السجلات العسكرية والبرديات.',
        icon: '𓏞'
      },
      {
        titleAr: 'الفخامة الإمبراطورية الملونة (Polychrome Monumental)',
        descriptionAr: 'نحت عميق ممتلئ بألوان زاهية كالأزرق المصري والأصفر الذهبي في معابد الكرنك ووادي الملوك.',
        icon: '𓆃'
      },
      {
        titleAr: 'كتاب الموتى المصور (Book of the Dead Vignettes)',
        descriptionAr: 'ظهور لفائف البردي الجنائزية الطويلة المزدانة برسوم توضيحية كاملة لمحكمة أوزيريس ووزن القلب.',
        icon: '⚖️'
      },
      {
        titleAr: 'ثورة العمارنة الواقعية (Amarna Sunken Art)',
        descriptionAr: 'في عهد إخناتون، تحررت الخطوط والنقوش لتصبح أكثر انسيابية وتصويراً لأشعة الشمس الممتدة بأيادٍ تمسك مفتاح الحياة.',
        icon: '𓇳'
      }
    ],
    scribalMediums: [
      { nameAr: 'ورق البردي الفاخر الطويل (حتى 25 متراً)', roleAr: 'لكتاب الموتى والتقارير الدبلوماسية الملكية' },
      { nameAr: 'شقفات الأوستراكا الحجرية والفخارية', roleAr: 'لرسائل عمال دير المدينة ومذكراتهم اليومية' },
      { nameAr: 'الحجر الرملي النوبي الضخم', roleAr: 'لصروح معابد الكرنك والأقصر وأبو سمبل' },
      { nameAr: 'ألواح الذهب والبرونز المطروق', roleAr: 'للخراطيش والتمائم الجنائزية الملكية' }
    ],
    scribalToolsUsed: ['أقلام بوص عريضة مشطوفة بزوايا مائلة', 'ألواح ألوان خشبية متعددة العيون (6 ألوان)', 'أوعية الماء لتخفيف الأصباغ', 'أختام الطين الملكية الرسمية'],
    royalCartoucheStyle: {
      titleAr: 'الخرطوشة الإمبراطورية المذهبة لرمسيس العظيم',
      sampleHieroglyphs: '𓇳𓄊𓁧𓈘𓈖𓇳',
      kingNameAr: 'رمسيس الثاني (وسر-ماعت-رع ستب-إن-رع)',
      techniqueDescriptionAr: 'إطار شنو ملكي فخم مرصع بالذهب واللازورد، يعكس مكانة فرعون مصر كحاكم لإمبراطورية عالمية كبرى.'
    },
    famousMonumentalInscription: {
      titleAr: 'ترنيمة آتون الكبرى المنقوشة في تل العمارنة',
      sourceMonumentAr: 'مقبرة الوزير آي بتل العمارنة، عهد إخناتون',
      hieroglyphs: '𓅱𓃀𓈖 𓎢 𓄤 𓂋 𓅓 𓈌 𓏏 𓈖 𓊪 𓏏',
      transliteration: 'wbn.k nfr m ꜣḫt nt pt',
      translationAr: 'ما أبهى إشراقك في أفق السماء، يا آتون الحي، مبدع الحياة!',
      analysisAr: 'تعكس التطور اللغوي في الدولة الحديثة؛ حيث اقتربت لغة النصوص الدينية من لغة الحديث اليومية الحية وعبرت عن مشاعر الوجد الطبيعي.'
    },
    audioNarrativeScript: 'مع بزوغ شمس الدولة الحديثة، اتسعت آفاق مصر لتصبح إمبراطورية عظمى؛ أطلق الكتبة العنان لأقلامهم في الخط الهيراطيقي الرشيق، وزينوا مقابر وادي الملوك بأبهى الألوان التي تحدت الزمن لثلاثة آلاف عام.',
    timeQuiz: {
      questionAr: 'ما الخط السريع المتصل الذي استخدمه كتبة الدولة الحديثة لتدوين السجلات والبرديات اليومية؟',
      inscriptionSnippet: '𓏞 𓋹 𓍑 𓋴',
      clueAr: 'خط كهنوتي رشيق كُتب بالقلم البوصي المشطوف بالحبرين الأسود والأحمر.',
      options: [
        {
          id: 'opt1',
          labelAr: 'الخط الهيراطيقي الكهنوتي (Hieratic)',
          isCorrect: true,
          explanationAr: 'أحسنت! كان الخط الهيراطيقي هو خط التدوين السريع والمعاملات الرسمية في الدولة الحديثة.'
        },
        {
          id: 'opt2',
          labelAr: 'الخط المسماري البابلي',
          isCorrect: false,
          explanationAr: 'اقتصر المسماري على المراسلات الدبلوماسية مع ممالك آسيا فقط في رسائل تل العمارنة.'
        },
        {
          id: 'opt3',
          labelAr: 'الخط اللاتيني القديم',
          isCorrect: false,
          explanationAr: 'لم يظهر اللاتيني في مصر إلا في عهد الرومان بعد سقوط دولة البطالمة.'
        }
      ]
    }
  }
];

export const EVOLUTION_SAMPLES: EraEvolutionSample[] = [
  {
    wordKey: 'ankh',
    nameAr: 'مفتاح الحياة (عَنخ)',
    conceptAr: 'الحياة الأبدية، النفس الإلهي، والبركة',
    transliteration: 'ꜥnḫ',
    gardinerCode: 'S34',
    oldKingdomStyle: {
      hieroglyphs: '𓋹',
      styleTitleAr: 'حفر غائر بحواف خشنة بارزة',
      descriptionAr: 'نحت عميق على الحجر الجيري بمسافات واسعة وتفاصيل العقدة العريضة.',
      mediumAr: 'حجر طرة الجيري',
      textureClass: 'bg-[#F4EFEA] border-[#CFC5B4] text-stone-900'
    },
    middleKingdomStyle: {
      hieroglyphs: '𓋹',
      styleTitleAr: 'رسم معياري داخل مربع (Cadrat)',
      descriptionAr: 'تناسب رياضي دقيق بين العروة العلوية والمقبضين والقائم الرأسي.',
      mediumAr: 'ورق بردي بحبر أسود كربوني',
      textureClass: 'bg-[#FAF3E0] border-[#D4AF37] text-amber-950 font-bold'
    },
    newKingdomStyle: {
      hieroglyphs: '𓋹',
      styleTitleAr: 'نقش مذهب وخط هيراطيقي سريع',
      descriptionAr: 'زخرفة بالذهب واللازورد في النقش الصرحي، أو اختزال رقيق بضربة قلم هيراطية.',
      mediumAr: 'حجر رملي مطلي بالذهب واللازورد',
      textureClass: 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-500 text-amber-950 font-black'
    }
  },
  {
    wordKey: 'horus_falcon',
    nameAr: 'صقر حورس (حُور)',
    conceptAr: 'الملكية الحامية، التحليق في الأفق، والعدالة',
    transliteration: 'ḥr',
    gardinerCode: 'G5',
    oldKingdomStyle: {
      hieroglyphs: '𓅃',
      styleTitleAr: 'تفصيل تشريحي دقيق للريش والمخالب',
      descriptionAr: 'نحت كل ريشة في الجناح، مع عين حورس البارزة ووقفة الصقر المهيبة.',
      mediumAr: 'جرانيت وأردواز صلب',
      textureClass: 'bg-[#EAE5D9] border-[#B8AA93] text-stone-950'
    },
    middleKingdomStyle: {
      hieroglyphs: '𓅃',
      styleTitleAr: 'تناسق الخطوط الكلاسيكية المستقيمة',
      descriptionAr: 'تبسيط هندسي محكم لنسب الرأس مع الجذع والقدمين ليتناسب مع بقية العلامات.',
      mediumAr: 'بردي مصقول ومسلات كلاسيكية',
      textureClass: 'bg-[#FAF3E0] border-[#D4AF37] text-amber-950'
    },
    newKingdomStyle: {
      hieroglyphs: '𓅃',
      styleTitleAr: 'صقر الشمس الملون وأشعة آتون',
      descriptionAr: 'ألوان زاهية براقة (أزرق سماوي وأحمر طوبي)، وخطوط هيراطية سريعة الحركة.',
      mediumAr: 'جدران المقابر الملونة بوادي الملوك',
      textureClass: 'bg-gradient-to-r from-sky-50 to-amber-100 border-sky-400 text-stone-900'
    }
  },
  {
    wordKey: 'ra_sun',
    nameAr: 'قرص الشمس (رَع)',
    conceptAr: 'النور الأبدي، طاقة الخلق، والإشراق اليومي',
    transliteration: 'rꜥ',
    gardinerCode: 'N5',
    oldKingdomStyle: {
      hieroglyphs: '𓇳',
      styleTitleAr: 'دائرة صلبة غائرة بنقطة مركزية بارزة',
      descriptionAr: 'نقش مباشر في الحجر مع نقطة وسطية عميقة تمثل مركز الدائرة الفلكية.',
      mediumAr: 'حجر جيري مطلي بأكسيد الحديد الأحمر',
      textureClass: 'bg-[#F4EFEA] border-[#CFC5B4] text-red-950'
    },
    middleKingdomStyle: {
      hieroglyphs: '𓇳',
      styleTitleAr: 'استدارة متناهية الدقة بالفرجار المصري',
      descriptionAr: 'ضبط هندسي للمركز ليتطابق مع مخصصات الوقت والنهار والضوء.',
      mediumAr: 'بردي وحبر أحمر نقي',
      textureClass: 'bg-[#FAF3E0] border-[#D4AF37] text-amber-900'
    },
    newKingdomStyle: {
      hieroglyphs: '𓇳',
      styleTitleAr: 'قرص آتون الشمسي المشع بالأيادي',
      descriptionAr: 'في عهد إخناتون، أحيط القرص بأشعة تمتد كأذرع حانية تمنح مفتاح الحياة للبشر.',
      mediumAr: 'ألواح الحجر الرملي بتل العمارنة',
      textureClass: 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border-amber-400 text-amber-950 font-bold'
    }
  },
  {
    wordKey: 'scribe_kit',
    nameAr: 'عدة وأدوات الكاتب (سِش)',
    conceptAr: 'الحكمة، التدوين المقدس، ومحبرة تحوت',
    transliteration: 'sš',
    gardinerCode: 'Y3',
    oldKingdomStyle: {
      hieroglyphs: '𓏞',
      styleTitleAr: 'تفصيل خيوط الجلد وحامل الأقلام البوصية',
      descriptionAr: 'نحت الحبل الجلدي المجدول الواصل بين لوحة الحبر وأسطوانة حفظ الريش.',
      mediumAr: 'مصاطب سقارة وجدران مقبرة تي',
      textureClass: 'bg-[#F4EFEA] border-[#CFC5B4] text-stone-900'
    },
    middleKingdomStyle: {
      hieroglyphs: '𓏞',
      styleTitleAr: 'الرمز المعياري المعتمد في بيت الحياة',
      descriptionAr: 'رمز متوازن يجمع المحبرة الدائرية المزدوجة ومقلمة القصب وحقيبة الصبغة.',
      mediumAr: 'برديات الأدب الكلاسيكي',
      textureClass: 'bg-[#FAF3E0] border-[#D4AF37] text-amber-950'
    },
    newKingdomStyle: {
      hieroglyphs: '𓏞',
      styleTitleAr: 'خط هيراطيقي انسيابي متصل بحركة يد واحدة',
      descriptionAr: 'اختزال العلامة إلى ثلاثة خطوط هيراطية رشيقة يخطها الكاتب في نصف ثانية.',
      mediumAr: 'أوستراكا دير المدينة وبرديات الإدارة',
      textureClass: 'bg-gradient-to-r from-stone-100 to-amber-100 border-stone-400 text-stone-900'
    }
  }
];
