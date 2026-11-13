export interface TempleWordToken {
  id: string;
  hieroglyphs: string;
  readingAr: string;
  transliteration: string;
  meaningAr: string;
  gardinerCode?: string;
  clueAr?: string;
}

export interface TempleRunesLevel {
  id: string;
  levelNumber: number;
  templeNameAr: string;
  templeLocationAr: string;
  deityNameAr: string;
  deityIcon: string;
  wallTexture: 'sandstone' | 'granite' | 'limestone' | 'lapis';
  storyIntroAr: string;
  targetSentenceHieroglyphs: string;
  targetTransliteration: string;
  targetTranslationAr: string;
  speechAudioScript: string;
  words: TempleWordToken[]; // The correct ordered tokens
  distractors: TempleWordToken[]; // Extra decoy words to challenge the scribe
  grammarBreakdownAr: string;
  culturalContextAr: string;
  relic: {
    nameAr: string;
    icon: string;
    descriptionAr: string;
    blessingAr: string;
    points: number;
  };
}

export const TEMPLE_RUNES_LEVELS: TempleRunesLevel[] = [
  {
    id: 'temple-edfu-ankh',
    levelNumber: 1,
    templeNameAr: 'صرح معبد حورس بإدفو',
    templeLocationAr: 'إدفو، أسوان',
    deityNameAr: 'حورس الصقر الحامي 𓅃',
    deityIcon: '𓅃',
    wallTexture: 'sandstone',
    storyIntroAr: 'تقف أمام البوابة الحجرية العظيمة لمعبد إدفو. على عتبة الباب، نُقشت تعويذة التمني الثلاثية التي كان يختم بها الملوك رسائلهم. رتّب الكلمات الثلاث بالترتيب الصحيح لفتح المزلاج الصخري.',
    targetSentenceHieroglyphs: '𓋹 𓍑 𓋴',
    targetTransliteration: 'ꜥnḫ wḏꜣ snb',
    targetTranslationAr: 'الحياة، والرخاء، والصحة',
    speechAudioScript: 'عنخ، وجا، سنب. الحياة، والرخاء، والصحة. التعويذة الملكية الثلاثية المباركة الخالدة.',
    words: [
      {
        id: 'w1',
        hieroglyphs: '𓋹',
        readingAr: 'عنخ',
        transliteration: 'ꜥnḫ',
        meaningAr: 'الحياة الأبدية',
        gardinerCode: 'S34',
        clueAr: 'رمز مفتاح الحياة أولاً'
      },
      {
        id: 'w2',
        hieroglyphs: '𓍑',
        readingAr: 'وجا',
        transliteration: 'wḏꜣ',
        meaningAr: 'الرخاء والسلامة',
        gardinerCode: 'U28',
        clueAr: 'رمز الرخاء والحماية ثانياً'
      },
      {
        id: 'w3',
        hieroglyphs: '𓋴',
        readingAr: 'سنب',
        transliteration: 'snb',
        meaningAr: 'الصحة والعافية',
        gardinerCode: 'S29',
        clueAr: 'رمز الصحة وقطعة القماش المطوية ثالثاً'
      }
    ],
    distractors: [
      {
        id: 'd1',
        hieroglyphs: '𓊹',
        readingAr: 'نثر',
        transliteration: 'nṯr',
        meaningAr: 'الإله المقدس',
        gardinerCode: 'R8'
      },
      {
        id: 'd2',
        hieroglyphs: '𓇳',
        readingAr: 'رع',
        transliteration: 'rꜥ',
        meaningAr: 'الشمس المضيئة',
        gardinerCode: 'N5'
      }
    ],
    grammarBreakdownAr: 'صيغة التمني الملكية الثلاثية المشهورة (ع. و. س)، وتُكتب اختصاراً بعد أسماء الملوك والنبلاء لدعاء الخلود وسلامة البدن وحفظ العرش.',
    culturalContextAr: 'كانت هذه العبارة تتردد في ختام كل برقية رسمية في الإمبراطورية المصرية، وتعادل في الثقافة المعاصرة تمني دوام الصحة وطول العمر.',
    relic: {
      nameAr: 'تميمة عنخ الذهبية المرصعة',
      icon: '𓋹',
      descriptionAr: 'تميمة مقدسة من الذهب الخالص كانت توضع في عنق الكاتب الملكي لحفظ جسده وبركته.',
      blessingAr: '«باسم حورس سيد السماء، انفتحت لك أبواب الأفق ونلت بركة الحياة والرخاء والصحة الأبدية!»',
      points: 100
    }
  },
  {
    id: 'temple-karnak-sun',
    levelNumber: 2,
    templeNameAr: 'قدس أقداس معبد الكرنك',
    templeLocationAr: 'طيبة (الأقصر)',
    deityNameAr: 'آمون-رع ملك الأرباب 𓇳',
    deityIcon: '𓇳',
    wallTexture: 'granite',
    storyIntroAr: 'في عمق صالة الأساطين الكبرى بالكرنك، يغلق باب الغرفة السرية بنقش ترنيمة الشروق. رتّب الجملة الهيروغليفية التي تصف بزوغ شمس رع فوق الأفق.',
    targetSentenceHieroglyphs: '𓇳 𓅱𓃀𓈖 𓅓 𓊪𓏏',
    targetTransliteration: 'rꜥ wbn m pt',
    targetTranslationAr: 'رع يشرق في السماء',
    speechAudioScript: 'رع أوبن إم بت. رع يشرق في السماء بنوره الساطع الذي يبدد الظلمات.',
    words: [
      {
        id: 'k1',
        hieroglyphs: '𓇳',
        readingAr: 'رع',
        transliteration: 'rꜥ',
        meaningAr: 'الإله رع (الشمس)',
        gardinerCode: 'N5',
        clueAr: 'الفاعل: الإله رع'
      },
      {
        id: 'k2',
        hieroglyphs: '𓅱𓃀𓈖',
        readingAr: 'أوبن',
        transliteration: 'wbn',
        meaningAr: 'يشرق ويسطع',
        gardinerCode: 'N5-D58-N35',
        clueAr: 'الفعل: يشرق بنوره'
      },
      {
        id: 'k3',
        hieroglyphs: '𓅓',
        readingAr: 'إم',
        transliteration: 'm',
        meaningAr: 'في / بداخل',
        gardinerCode: 'G17',
        clueAr: 'حرف الجر: في'
      },
      {
        id: 'k4',
        hieroglyphs: '𓊪𓏏',
        readingAr: 'بت',
        transliteration: 'pt',
        meaningAr: 'السماء (قبة الأفق)',
        gardinerCode: 'N1-X1',
        clueAr: 'المجرور: السماء'
      }
    ],
    distractors: [
      {
        id: 'kd1',
        hieroglyphs: '𓇾',
        readingAr: 'تا',
        transliteration: 'tꜣ',
        meaningAr: 'الأرض',
        gardinerCode: 'N16'
      },
      {
        id: 'kd2',
        hieroglyphs: '𓈗',
        readingAr: 'مو',
        transliteration: 'mw',
        meaningAr: 'الماء العذب',
        gardinerCode: 'N35A'
      }
    ],
    grammarBreakdownAr: 'جملة فعلية بسيطة مبدوءة باسم العلم الفاعل (رع) تلاه الفعل المضارع (أوبن) وشبه الجملة الجار والمجرور (إم بت = في السماء).',
    culturalContextAr: 'كانت هذه العبارة تُتلى مع أول خيط فجر يلامس قمة مسلات معبد الكرنك الذهبية إيذاناً ببدء الصلوات الصباحية وتطهير الكهنة.',
    relic: {
      nameAr: 'قرص رع الذهبي المجنح',
      icon: '𓆃',
      descriptionAr: 'لوحة نذرية منقوشة بالذهب واللازورد تمثل إشراقة قرص الشمس وتطهير العالم بالضياء.',
      blessingAr: '«أيها الكاتب الحكيم، أشرقت شمس رع في بهو قلبك، وانقشعت حجب الجهل إلى الأبد!»',
      points: 150
    }
  },
  {
    id: 'temple-thebes-maat',
    levelNumber: 3,
    templeNameAr: 'بهو ماعت بمجمع معابد طيبة',
    templeLocationAr: 'البر الشرقي، الأقصر',
    deityNameAr: 'ماعت سيدة الحق والعدل 𓌳',
    deityIcon: '𓌳',
    wallTexture: 'limestone',
    storyIntroAr: 'أمام صرح قاعة المحاكمة والعدالة، حُفر مبدأ الحكم الرشيد في مصر القديمة. رتّب الكلمات لتأكيد سيادة ماعت (الحق والتناغم والعدل) على ربوع الأرض.',
    targetSentenceHieroglyphs: '𓌳𓐍𓂝𓏏 𓋾𓈎𓏤 𓇾𓇾',
    targetTransliteration: 'mꜣꜥt ḥḳꜣ tꜣwy',
    targetTranslationAr: 'ماعت تحكم الأرضين بالعدل',
    speechAudioScript: 'ماعت حِقا تاوي. ماعت ربة الحق تحكم الأرضين مصر العليا والسفلى بالعدالة.',
    words: [
      {
        id: 'm1',
        hieroglyphs: '𓌳𓐍𓂝𓏏',
        readingAr: 'ماعت',
        transliteration: 'mꜣꜥt',
        meaningAr: 'العدالة والحق الإلهي',
        gardinerCode: 'Aa11-C10',
        clueAr: 'المبتدأ: ريشة ماعت والحق'
      },
      {
        id: 'm2',
        hieroglyphs: '𓋾𓈎𓏤',
        readingAr: 'حِقا',
        transliteration: 'ḥḳꜣ',
        meaningAr: 'تحكم وتسوس',
        gardinerCode: 'S38',
        clueAr: 'الفعل: صولجان الحكم والقيادة'
      },
      {
        id: 'm3',
        hieroglyphs: '𓇾𓇾',
        readingAr: 'تاوي',
        transliteration: 'tꜣwy',
        meaningAr: 'الأرضين (مصر العليا والسفلى)',
        gardinerCode: 'N16-N16',
        clueAr: 'المفعول به: قطعتي الأرض المزدوجتين'
      }
    ],
    distractors: [
      {
        id: 'md1',
        hieroglyphs: '𓅓𓂋',
        readingAr: 'مِر',
        transliteration: 'mr',
        meaningAr: 'يحب ويرضى',
        gardinerCode: 'U6'
      },
      {
        id: 'md2',
        hieroglyphs: '𓊃𓊃',
        readingAr: 'سيس',
        transliteration: 'ss',
        meaningAr: 'الفرس السريع',
        gardinerCode: 'E6'
      }
    ],
    grammarBreakdownAr: 'جملة اسمية ذات خبر فعلي: (ماعت) مبتدأ، يليه الفعل المتعدي (حِقا) بصيغة الحاضر المستمر، ثم المفعول به في صيغة المثنى (تاوي = الأرضان: الصعيد والدلتا).',
    culturalContextAr: 'كانت ماعت هي العمود الفقري للحضارة المصرية؛ بدونها تنهار الدولة وتسود الفوضى (إسفت). لذا كان الكاتب يقسم على إعلاء ماعت في كل سطر يدونه.',
    relic: {
      nameAr: 'ريشة ماعت العاجية الذهبية',
      icon: '𓆚',
      descriptionAr: 'ريشة النعامة الرمزية المنحوتة من العاج، رمز ميزان القلب والضمير الحي في محكمة أوزيريس.',
      blessingAr: '«طوبى لكاتبٍ نصر الحق، استقام ميزان قلبك ونلت شرف حراس العدالة المقدسة!»',
      points: 200
    }
  },
  {
    id: 'temple-abydos-offering',
    levelNumber: 4,
    templeNameAr: 'محراب القرابين بمعبد سيتي بأبيدوس',
    templeLocationAr: 'أبيدوس، سوهاج',
    deityNameAr: 'أوزيريس سيد الأبدية 𓁹',
    deityIcon: '𓁹',
    wallTexture: 'sandstone',
    storyIntroAr: 'في قدس أقداس معبد أبيدوس المهيب، تجد نقش صيغة القرابين الرسمية التي تتلوها الصلوات اليومية. رتّب الكلمات الأربع لتقديم القربان الملكي إلى الإله في بيته.',
    targetSentenceHieroglyphs: '𓊵𓏙 𓇓𓏏 𓊹 𓉐',
    targetTransliteration: 'ḥtp-dỉ-nsw nṯr pr',
    targetTranslationAr: 'قربان يقدمه الملك للإله في البيت المقدس',
    speechAudioScript: 'حتب دي نيسو نثر بير. هبة وقربان يقدمه الملك للإله المقدس في بيته العظيم.',
    words: [
      {
        id: 'o1',
        hieroglyphs: '𓊵𓏙',
        readingAr: 'حتب دي',
        transliteration: 'ḥtp-dỉ',
        meaningAr: 'قربان يُمنح / هبة',
        gardinerCode: 'R4-X8',
        clueAr: 'صيغة القربان وخبز التقدمة'
      },
      {
        id: 'o2',
        hieroglyphs: '𓇓𓏏',
        readingAr: 'نيسو',
        transliteration: 'nsw',
        meaningAr: 'الملك (الفرعون)',
        gardinerCode: 'M23-X1',
        clueAr: 'مقدم القربان: الملك'
      },
      {
        id: 'o3',
        hieroglyphs: '𓊹',
        readingAr: 'نثر',
        transliteration: 'nṯr',
        meaningAr: 'الإله المقدس',
        gardinerCode: 'R8',
        clueAr: 'المُهدى إليه: الإله'
      },
      {
        id: 'o4',
        hieroglyphs: '𓉐',
        readingAr: 'بير',
        transliteration: 'pr',
        meaningAr: 'البيت / المعبد',
        gardinerCode: 'O1',
        clueAr: 'المكان: البيت المقدس'
      }
    ],
    distractors: [
      {
        id: 'od1',
        hieroglyphs: '𓂋𓈖',
        readingAr: 'رن',
        transliteration: 'rn',
        meaningAr: 'الاسم الخالد',
        gardinerCode: 'D21-N35'
      },
      {
        id: 'od2',
        hieroglyphs: '𓈗',
        readingAr: 'مو',
        transliteration: 'mw',
        meaningAr: 'المياه',
        gardinerCode: 'N35A'
      }
    ],
    grammarBreakdownAr: 'صيغة (حتب-دي-نيسو) المركبة هي النمط اللغوي الأشهر في الإبيغرافيا المصرية؛ تعني حرفياً: "قربانٌ أعطاه الملك"، وهي ترخيص ملكي ديني لتقديم النذور وتخليد أسماء الموتى.',
    culturalContextAr: 'كان يعتقد أن الملك هو الكاهن الأكبر الأوحد في كل معابد مصر، وكل القرابين المقدمة تُمنح باسمه نيابة عن الشعب المصري بأسره.',
    relic: {
      nameAr: 'إناء الألباستر الملكي المقدس',
      icon: '🏺',
      descriptionAr: 'آنية طقسية مصقولة من حجر المرمر النقي لحفظ العطور الملكية السبعة المكرسة.',
      blessingAr: '«تقبلت قوى الخلود نذورك العطرة، وأضاءت شعلة الحياة في صحن المعبد الأبدي!»',
      points: 250
    }
  },
  {
    id: 'temple-memphis-scribe',
    levelNumber: 5,
    templeNameAr: 'قاعة الحكمة بمعبد بتاح بمنف',
    templeLocationAr: 'ميت رهينة (منف العاصمة الأولى)',
    deityNameAr: 'بتاح رب الفنون والصنائع 𓁱',
    deityIcon: '𓁱',
    wallTexture: 'granite',
    storyIntroAr: 'أنت الآن في عاصمة بناة الأهرام، داخل معبد بتاح وخزانة بيت الحياة. رتّب قسم التخرج الرسمي للكاتب الذي يعلن معرفته وإتقانه للغة الهيروغليفية المقدسة.',
    targetSentenceHieroglyphs: '𓀀 𓏞 𓂋𓐍 𓌃𓊹',
    targetTransliteration: 'jnk sš rḫ mdw-nṯr',
    targetTranslationAr: 'أنا كاتبٌ عليمٌ بالكلمات المقدسة',
    speechAudioScript: 'إينك سش رخ مِدو نِثر. أنا كاتب عليم بالكلمات الإلهية وأسرار الحكمة الخالدة.',
    words: [
      {
        id: 's1',
        hieroglyphs: '𓀀',
        readingAr: 'إينك',
        transliteration: 'jnk',
        meaningAr: 'ضمير المتكلم: أنا',
        gardinerCode: 'A1',
        clueAr: 'الضمير الشخصي: أنا'
      },
      {
        id: 's2',
        hieroglyphs: '𓏞',
        readingAr: 'سِش',
        transliteration: 'sš',
        meaningAr: 'الكاتب الحاذق',
        gardinerCode: 'Y3',
        clueAr: 'المهنة والشرف: الكاتب'
      },
      {
        id: 's3',
        hieroglyphs: '𓂋𓐍',
        readingAr: 'رِخ',
        transliteration: 'rḫ',
        meaningAr: 'العليم / الخبير',
        gardinerCode: 'D21-Aa1',
        clueAr: 'الصفة: الخبير العليم'
      },
      {
        id: 's4',
        hieroglyphs: '𓌃𓊹',
        readingAr: 'مِدو-نِثر',
        transliteration: 'mdw-nṯr',
        meaningAr: 'الكلمات المقدسة (الهيروغليفية)',
        gardinerCode: 'S43-R8',
        clueAr: 'الموضوع: الكلمات الإلهية'
      }
    ],
    distractors: [
      {
        id: 'sd1',
        hieroglyphs: '𓋴𓅓𓂋',
        readingAr: 'سمر',
        transliteration: 'smr',
        meaningAr: 'السمير والصديق',
        gardinerCode: 'S29-G17-D21'
      },
      {
        id: 'sd2',
        hieroglyphs: '𓇋𓏏𓆑',
        readingAr: 'إتف',
        transliteration: 'jt.f',
        meaningAr: 'أبوه',
        gardinerCode: 'M17-X1-I9'
      }
    ],
    grammarBreakdownAr: 'جملة اسمية تؤكد الهوية: (إينك = أنا) ضمير منفصل مستقل، و(سش = كاتب) خبر المبتدأ، موصوفاً بالنعت (رخ = عليم)، ومضافاً إليه المفعول المعرفي (مدو-نثر = كلمات الإله).',
    culturalContextAr: 'لم يكن لقب الكاتب وظيفة إدارية فحسب، بل كان أرفع وسام فكري يضمن لصاحبه تخليد اسمه ومصاحبة الملوك في سجلات التاريخ الأبدي.',
    relic: {
      nameAr: 'محبرة تحوت العاجية المرصعة',
      icon: '𓏞',
      descriptionAr: 'لوح كاتب حقيقي من العاج الطبيعي مع وعاءين للحبر الأسود الكربوني والأحمر المغري وريش البوص المسنون.',
      blessingAr: '«مرحباً بك في مجمع حكماء منف! لقد فككت طلاسم المعبد ونلت مرتبة الكاتب الأعظم!»',
      points: 300
    }
  },
  {
    id: 'temple-philae-nile',
    levelNumber: 6,
    templeNameAr: 'حرم إيزيس بجزيرة فيلة',
    templeLocationAr: 'فيلة، أسوان',
    deityNameAr: 'إيزيس سيدة السحر وحابي النيل 𓆇',
    deityIcon: '𓆇',
    wallTexture: 'sandstone',
    storyIntroAr: 'في لؤلؤة النيل جزيرة فيلة، تواجه الباب الأخير لأعظم خزائن الأسرار. رتّب ترنيمة فيضان النيل (حابي) الذي يهب النماء والخيرات لمصر.',
    targetSentenceHieroglyphs: '𓎛𓂝𓊪𓈗 𓂞 𓆓𓆑 𓈖 𓆎𓅓𓏏',
    targetTransliteration: 'ḥꜥpj dỉ ḏfꜣ n kmt',
    targetTranslationAr: 'حابي (النيل) يمنح الخيرات لمصر الخصبة',
    speechAudioScript: 'حابي دي جفا إن كيمت. النيل المقدس يمنح الزاد والوفرة والخيرات لمصر الحبيبة.',
    words: [
      {
        id: 'p1',
        hieroglyphs: '𓎛𓂝𓊪𓈗',
        readingAr: 'حابي',
        transliteration: 'ḥꜥpj',
        meaningAr: 'فيضان النيل المقدس',
        gardinerCode: 'V28-D36-Q3-N35A',
        clueAr: 'الفاعل: إله النيل حابي'
      },
      {
        id: 'p2',
        hieroglyphs: '𓂞',
        readingAr: 'دي',
        transliteration: 'dỉ',
        meaningAr: 'يهب ويمنح',
        gardinerCode: 'D37',
        clueAr: 'الفعل: اليد المانحة'
      },
      {
        id: 'p3',
        hieroglyphs: '𓆓𓆑',
        readingAr: 'جفا',
        transliteration: 'ḏfꜣ',
        meaningAr: 'الزاد والوفرة والخير',
        gardinerCode: 'I10-I9',
        clueAr: 'المفعول: الزاد والوفرة'
      },
      {
        id: 'p4',
        hieroglyphs: '𓈖',
        readingAr: 'إن',
        transliteration: 'n',
        meaningAr: 'لأجل / إلى',
        gardinerCode: 'N35',
        clueAr: 'حرف الجر: لأجل'
      },
      {
        id: 'p5',
        hieroglyphs: '𓆎𓅓𓏏',
        readingAr: 'كيمت',
        transliteration: 'kmt',
        meaningAr: 'مصر (الأرض السوداء)',
        gardinerCode: 'I6-G17-X1-O49',
        clueAr: 'المجرور: مصر الحبيبة كيمت'
      }
    ],
    distractors: [
      {
        id: 'pd1',
        hieroglyphs: '𓋹',
        readingAr: 'عنخ',
        transliteration: 'ꜥnḫ',
        meaningAr: 'الحياة',
        gardinerCode: 'S34'
      },
      {
        id: 'pd2',
        hieroglyphs: '𓇋𓏏𓂋𓅱',
        readingAr: 'إترو',
        transliteration: 'jtrw',
        meaningAr: 'النهر العظيم',
        gardinerCode: 'M17-X1-D21-G43-N35A'
      }
    ],
    grammarBreakdownAr: 'جملة فعلية كاملة في صيغة الفاعل المفرد: (حابي) الفاعل، (دي) الفعل المتعدي المانح، (جفا) المفعول المباشر، وشبه الجملة الجار والمجرور (إن كيمت = لمصر).',
    culturalContextAr: 'في معبد فيلة، كان الكهنة يراقبون مقياس النيل الصخري باحتفال سنوي مهيب؛ فارتفاع مياه حابي يعني وفرة المحاصيل وانتهاء الجفاف وعموم الرخاء.',
    relic: {
      nameAr: 'تاج إيزيس النجمي المذهب',
      icon: '👑',
      descriptionAr: 'تاج رمزي مرصع بقرص الشمس وقرني البقرة المقدسة مع تمائم اللازورد والعقيق، خاتم أسرار المعبد الأبدي.',
      blessingAr: '«مباركٌ أنت يا كاتب العصور! لقد انفتحت لك كافة أبواب المعابد، وأصبحت حارساً أزلياً لأسرار وادي النيل!»',
      points: 400
    }
  }
];
