export interface RiddleSymbolToken {
  id: string;
  glyphs: string;
  gardiner: string;
  transliteration: string;
  phoneticAr: string;
  targetWordAr: string;
  symbolHintAr: string;
}

export interface DailyWisdomPuzzle {
  id: string;
  numberLabel: string;
  titleAr: string;
  sourceWisdomAr: string;
  eraAr: string;
  hieroglyphicText: string;
  transliteration: string;
  phoneticReadingAr: string;
  fullWisdomTranslationAr: string;
  tokens: RiddleSymbolToken[];
  distractorWordsAr: string[];
  wisdomReflectionAr: string;
  audioScript: string;
}

export const DAILY_WISDOM_PUZZLES: DailyWisdomPuzzle[] = [
  {
    id: 'wisdom-ptahhotep-speech',
    numberLabel: 'لغز #01',
    titleAr: 'الكلمة الطيبة أندر من الزمرد',
    sourceWisdomAr: 'من تعاليم الوزير الحكيم بتاح حتب · الدولة القديمة',
    eraAr: 'الأسرة الخامسة · قرابة 2400 ق.م',
    hieroglyphicText: '𓌃𓂧𓏏 𓄤𓏏 𓂋 𓅱𓄿𓆓',
    transliteration: 'mdw.t nfr.t r wꜣḏ',
    phoneticReadingAr: 'مِدُوت نِفْرِت إِر وَاج',
    fullWisdomTranslationAr: 'الكلمة الجميلة أندرُ من حجر الزمرد الأخضر',
    tokens: [
      {
        id: 't1-1',
        glyphs: '𓌃𓂧𓏏',
        gardiner: 'S43 + D46 + X1',
        transliteration: 'mdw.t',
        phoneticAr: 'مِدُوت',
        targetWordAr: 'الكلمة',
        symbolHintAr: 'عصا الكلام المقدسة (S43) تدل على النطق والحديث والكلام.'
      },
      {
        id: 't1-2',
        glyphs: '𓄤𓏏',
        gardiner: 'F35 + X1',
        transliteration: 'nfr.t',
        phoneticAr: 'نِفْرِت',
        targetWordAr: 'الطيبة الجميلة',
        symbolHintAr: 'علامة القلب والقصبة الهوائية «نفر» (F35) تعني الحُسن والجمال والطيبة.'
      },
      {
        id: 't1-3',
        glyphs: '𓂋',
        gardiner: 'D21',
        transliteration: 'r',
        phoneticAr: 'إِر',
        targetWordAr: 'أثمنُ من',
        symbolHintAr: 'الفم (D21) يُستعمل هنا كحرف جر للمقارنة والتفضيل بمعنى «أكثر من».'
      },
      {
        id: 't1-4',
        glyphs: '𓅱𓄿𓆓',
        gardiner: 'G43 + G1 + M13',
        transliteration: 'wꜣḏ',
        phoneticAr: 'وَاج',
        targetWordAr: 'حجر الزمرد الأخضر',
        symbolHintAr: 'ساق البردي الخضراء (M13) ترمز إلى الخضرة والنضارة وحجر الزمرد الثمين.'
      }
    ],
    distractorWordsAr: ['قصر الملك', 'فيضان النهر'],
    wisdomReflectionAr:
      'يُعد بتاح حتب من أوائل الفلاسفة في التاريخ البشري؛ إذ علّم أن حسن البيان ولطف الحديث ليسا موهبة عابرة، بل كنز يفوق الأحجار الكريمة وقد يوجد على ألسنة البسطاء عند حجر الرحى.',
    audioScript:
      'من تعاليم بتاح حتب: مِدُوت نِفْرِت إِر وَاج، ومعناها: الكلمة الطيبة الجميلة أثمن وأندر من حجر الزمرد الأخضر.'
  },
  {
    id: 'wisdom-maat-eternal',
    numberLabel: 'لغز #02',
    titleAr: 'العدلُ باقٍ لا يزول',
    sourceWisdomAr: 'من مأثورات الحكمة الكلاسيكية · تعاليم بتاح حتب',
    eraAr: 'الدولة القديمة · الأسرة الخامسة',
    hieroglyphicText: '𓅓𓂝𓏏 𓅱𓂋𓏏 𓈖 𓆼𓄿𓅓 𓋴',
    transliteration: 'mꜣꜥt wrt mn.tỉ',
    phoneticReadingAr: 'مَاعَت وِرِت مِنْتِي',
    fullWisdomTranslationAr: 'الحقُّ والعدلُ عظيمٌ وثابتٌ على الدوام',
    tokens: [
      {
        id: 't2-1',
        glyphs: '𓆄𓏏',
        gardiner: 'H6 + X1',
        transliteration: 'mꜣꜥt',
        phoneticAr: 'مَاعَت',
        targetWordAr: 'العدل والحق',
        symbolHintAr: 'ريشة النعام (H6) هي شعار الإلهة ماعت ورمز التوازن والصدق والحق.'
      },
      {
        id: 't2-2',
        glyphs: '𓅨𓂋𓏏',
        gardiner: 'G36 + D21 + X1',
        transliteration: 'wrt',
        phoneticAr: 'وِرِت',
        targetWordAr: 'عظيم القدر',
        symbolHintAr: 'طائر السنونو (G36) يقرأ «ور» ويدل على العظمة والاتساع والجلال.'
      },
      {
        id: 't2-3',
        glyphs: '𓏠𓈖',
        gardiner: 'Y5 + N35',
        transliteration: 'mn',
        phoneticAr: 'مِن',
        targetWordAr: 'ثابتٌ وراسخ',
        symbolHintAr: 'لوحة لعبة السنت (Y5) تنطق «مِن» وتعني البقاء والرسوخ والثبات.'
      },
      {
        id: 't2-4',
        glyphs: '𓆓𓏏',
        gardiner: 'I10 + X1',
        transliteration: 'ḏt',
        phoneticAr: 'جِت',
        targetWordAr: 'إلى الأبد',
        symbolHintAr: 'الأفعى المتلوية مع رغيف التاء (I10 + X1) تشير إلى الاستمرار الأبدي.'
      }
    ],
    distractorWordsAr: ['صمت الصحراء', 'زهرة اللوتس'],
    wisdomReflectionAr:
      'كان مفهوم «ماعت» حجر الزاوية في الفكر المصري القديم؛ وهو النظام الذي يجمع بين صدق الكلمة، وعدالة القضاء، وتوازن الطبيعة.',
    audioScript:
      'حكمة بتاح حتب: مَاعَت وِرِت مِن جِت، ومعناها: العدل والحق عظيم وثابت إلى الأبد.'
  },
  {
    id: 'wisdom-heart-listen',
    numberLabel: 'لغز #03',
    titleAr: 'القلبُ هو من يقود الإنسان',
    sourceWisdomAr: 'من تعاليم الحكيم بتاح حتب والوصايا الأخلاقية',
    eraAr: 'الدولة الوسطى · قرابة 1950 ق.م',
    hieroglyphicText: '𓄣 𓊪𓅱 𓅓𓂧𓅱 𓈖 𓎟 𓆑',
    transliteration: 'ỉb pw sšm nb.f',
    phoneticReadingAr: 'إِبْ پُو سِشِم نِب-إِف',
    fullWisdomTranslationAr: 'القلبُ هو المرشدُ الحقيقي لصاحبه',
    tokens: [
      {
        id: 't3-1',
        glyphs: '𓄣',
        gardiner: 'F34',
        transliteration: 'ỉb',
        phoneticAr: 'إِبْ',
        targetWordAr: 'القلبُ',
        symbolHintAr: 'رمز الفؤاد (F34) يقرأ «إِب» ويمثل مركز الوعي والعقل والشعور في مصر القديمة.'
      },
      {
        id: 't3-2',
        glyphs: '𓊪𓅱',
        gardiner: 'Q3 + G43',
        transliteration: 'pw',
        phoneticAr: 'پُو',
        targetWordAr: 'هو',
        symbolHintAr: 'ضمير الفصل الكلاسيكي «پُو» يربط بين المبتدأ والخبر في الجمل الاسمية.'
      },
      {
        id: 't3-3',
        glyphs: '𓋴𓌞𓅓',
        gardiner: 'S29 + T18 + G17',
        transliteration: 'sšm',
        phoneticAr: 'سِشِم',
        targetWordAr: 'المرشدُ والقائد',
        symbolHintAr: 'يدل الفعل «سِشِم» على الإرشاد والهداية وقيادة الطريق الصواب.'
      },
      {
        id: 't3-4',
        glyphs: '𓎟 𓆑',
        gardiner: 'V30 + I9',
        transliteration: 'nb.f',
        phoneticAr: 'نِب-إِف',
        targetWordAr: 'لصاحبه',
        symbolHintAr: 'السلة «نِب» (صاحب/سيد) مع الأفعى المقرنة «ف» تعني صاحبه أو مالكه.'
      }
    ],
    distractorWordsAr: ['كتاب البردي', 'ثوب الكتان'],
    wisdomReflectionAr:
      'آمن المصريون أن القلب (إب) هو شاهد الإنسان يوم الحساب، وأن إصغاء المرء لضميره الحي يهديه إلى السكينة والرشاد.',
    audioScript:
      'حكمة القلب الواعي: إِبْ پُو سِشِم نِب إِف، ومعناها: القلب هو المرشد والقائد لصاحبه.'
  },
  {
    id: 'wisdom-scribe-immortality',
    numberLabel: 'لغز #04',
    titleAr: 'الكتاب خيرٌ من الهرم المنحوت',
    sourceWisdomAr: 'من بردية تشيستر بيتي الرابعة (مديح الكتبة)',
    eraAr: 'الدولة الحديثة · الأسرة التاسعة عشرة',
    hieroglyphicText: '𓏞 𓄤 𓂋 𓉴 𓅓 𓇋𓈖𓂋',
    transliteration: 'mḏꜣt nfr.t r mr m ỉnr',
    phoneticReadingAr: 'مِجَات نِفْرِت إِر مِر إِم إِينِر',
    fullWisdomTranslationAr: 'الكتابُ الحكيمُ أنفعُ وأبقى من هرمٍ مبني بالحجر',
    tokens: [
      {
        id: 't4-1',
        glyphs: '𓏛',
        gardiner: 'Y1',
        transliteration: 'mḏꜣt',
        phoneticAr: 'مِجَات',
        targetWordAr: 'الكتابُ المخطوط',
        symbolHintAr: 'لفافة البردي المختومة (Y1) ترمز إلى الكتاب والعلم والمعرفة المدونة.'
      },
      {
        id: 't4-2',
        glyphs: '𓄤 𓂋',
        gardiner: 'F35 + D21',
        transliteration: 'nfr r',
        phoneticAr: 'نِفِر إِر',
        targetWordAr: 'خيرٌ وأبقى من',
        symbolHintAr: 'تجمع «نِفِر» (حسن/نافع) مع «ر» (من) لتعطي صيغة التفضيل: خيرٌ من.'
      },
      {
        id: 't4-3',
        glyphs: '𓉴',
        gardiner: 'O24',
        transliteration: 'mr',
        phoneticAr: 'مِر',
        targetWordAr: 'هرمٍ مشيّد',
        symbolHintAr: 'شكل الهرم المثلث (O24) هو المخصص المباشر لكلمة الهرم في المصرية القديمة.'
      },
      {
        id: 't4-4',
        glyphs: '𓅓 𓇋𓈖𓂋',
        gardiner: 'G17 + M17 + N35 + D21',
        transliteration: 'm ỉnr',
        phoneticAr: 'إِم إِينِر',
        targetWordAr: 'من الحجر الصلب',
        symbolHintAr: 'البومة «إم» (بـ/من) مع «إينر» تعني المصنوع من الصخر والحجارة.'
      }
    ],
    distractorWordsAr: ['عربة الحرب', 'مجداف القارب'],
    wisdomReflectionAr:
      'نصّ خالد يفضّل فيه قدماء المصريين أثر العلم والكتب على القبور الضخمة؛ لأن الحجر يتآكل مع الدهر بينما تتناقل الأجيال حكمة الكتاب.',
    audioScript:
      'من مديح الكتبة: مِجَات نِفْرِت إِر مِر إِم إِينِر، ومعناها: الكتاب الحكيم خير وأبقى من هرم مبني بالحجر.'
  },
  {
    id: 'wisdom-silence-temple',
    numberLabel: 'لغز #05',
    titleAr: 'فضلُ الصمتِ عند الغضب',
    sourceWisdomAr: 'من تعاليم الحكيم أمنؤبي · عصر الدولة الحديثة',
    eraAr: 'الأسرة العشرون · قرابة 1100 ق.م',
    hieroglyphicText: '𓅯𓄿 𓎼𓂋 𓅓 𓉐 𓊹 𓅨𓂋',
    transliteration: 'pꜣ gr m pr-nṯr wr',
    phoneticReadingAr: 'پَا جِر إِم بِر-نِتِر وِر',
    fullWisdomTranslationAr: 'الإنسانُ الهادئُ الصموت في المعبدِ عظيمُ الشأن',
    tokens: [
      {
        id: 't5-1',
        glyphs: '𓅯𓄿',
        gardiner: 'G41 + G1',
        transliteration: 'pꜣ',
        phoneticAr: 'پَا',
        targetWordAr: 'المرءُ',
        symbolHintAr: 'أداة التعريف في المصرية المتأخرة «پَا» تشير إلى الشخص الموصوف.'
      },
      {
        id: 't5-2',
        glyphs: '𓎼𓂋',
        gardiner: 'W11 + D21',
        transliteration: 'gr',
        phoneticAr: 'جِر',
        targetWordAr: 'الهادئُ الصبور',
        symbolHintAr: 'الجذر «جِر» (W11+D21) يدل على الصمت الحكيم وضبط النفس والهدوء.'
      },
      {
        id: 't5-3',
        glyphs: '𓅓 𓉐𓊹',
        gardiner: 'G17 + O1 + R8',
        transliteration: 'm pr-nṯr',
        phoneticAr: 'إِم بِر-نِتِر',
        targetWordAr: 'في المعبدِ المقدس',
        symbolHintAr: 'مخطط البيت «بِر» مع علم المعبد «نِتِر» يعنيان بيت الإله أو المعبد.'
      },
      {
        id: 't5-4',
        glyphs: '𓅨𓂋',
        gardiner: 'G36 + D21',
        transliteration: 'wr',
        phoneticAr: 'وِر',
        targetWordAr: 'عظيمُ المكانة',
        symbolHintAr: 'طائر السنونو والفم (G36+D21) يعنيان الرفعة والوقار وعظيم المنزلة.'
      }
    ],
    distractorWordsAr: ['عاصفة البحر', 'ماء البئر'],
    wisdomReflectionAr:
      'يمجّد الحكيم أمنؤبي شخصية «الصموت المتّزن» (gr mꜣꜥ) الذي يملك غضبه، مشبّهاً إياه بشجرة خضراء مثمرة تنمو في رحاب المعبد.',
    audioScript:
      'من تعاليم أمنؤبي: پَا جِر إِم بِر نِتِر وِر، ومعناها: الإنسان الهادئ الصبور في المعبد عظيم المكانة.'
  },
  {
    id: 'wisdom-love-water-land',
    numberLabel: 'لغز #06',
    titleAr: 'العملُ الصالح يُطيل الذكر',
    sourceWisdomAr: 'من نقوش السير الذاتية للمقابر المصرية · الدولة الوسطى',
    eraAr: 'الأسرة الحادية عشرة · قرابة 2050 ق.م',
    hieroglyphicText: '𓇋𓂋𓇋 𓄤 𓅓 𓂋𓈖 𓋹',
    transliteration: 'ỉrỉ nfr m rn ꜥnḫ',
    phoneticReadingAr: 'إِيرِي نِفِر إِم رِن عَنْخ',
    fullWisdomTranslationAr: 'اصنعِ الخيرَ كي يبقى اسمُك حياً في الذاكرة',
    tokens: [
      {
        id: 't6-1',
        glyphs: '𓁹𓇋',
        gardiner: 'D4 + M17',
        transliteration: 'ỉrỉ',
        phoneticAr: 'إِيرِي',
        targetWordAr: 'اصنعْ واعملْ',
        symbolHintAr: 'العين (D4) تقرأ «إير» وتعني يفعل أو يصنع أو يُنجز عملاً.'
      },
      {
        id: 't6-2',
        glyphs: '𓄤',
        gardiner: 'F35',
        transliteration: 'nfr',
        phoneticAr: 'نِفِر',
        targetWordAr: 'الخيرَ والصلاح',
        symbolHintAr: 'علامة «نِفِر» هنا اسم معنوي يدل على الخير والعمل الحسن.'
      },
      {
        id: 't6-3',
        glyphs: '𓅓 𓂋𓈖',
        gardiner: 'G17 + D21 + N35',
        transliteration: 'm rn',
        phoneticAr: 'إِم رِن',
        targetWordAr: 'في اسمٍ',
        symbolHintAr: 'الفم والماء (D21 + N35) يكونان كلمة «رِن» أي الاسم والسمعة والذكر.'
      },
      {
        id: 't6-4',
        glyphs: '𓋹',
        gardiner: 'S34',
        transliteration: 'ꜥnḫ',
        phoneticAr: 'عَنْخ',
        targetWordAr: 'حيٍّ مخلّد',
        symbolHintAr: 'مفتاح الحياة «عنخ» (S34) يصف الاسم بأنه باقٍ وحيّ على ألسنة الناس.'
      }
    ],
    distractorWordsAr: ['سيف النحاس', 'ليلة شتاء'],
    wisdomReflectionAr:
      'اعتقد المصريون القدماء أن نطق اسم الإنسان بالخير هو «الحياة الثانية»؛ ولذا تنافس النبلاء والكتبة في تخليد أعمالهم الإحسانية.',
    audioScript:
      'حكمة السير الذاتية: إِيرِي نِفِر إِم رِن عَنْخ، ومعناها: اصنع الخير ليبقى اسمك حياً مخلداً.'
  },
  {
    id: 'wisdom-mother-respect',
    numberLabel: 'لغز #07',
    titleAr: 'برُّ الأم وحفظ جميلها',
    sourceWisdomAr: 'من تعاليم الكاتب الحكيم آني · الدولة الحديثة',
    eraAr: 'الأسرة الثامنة عشرة · قرابة 1350 ق.م',
    hieroglyphicText: '𓂞 𓌸𓂋𓏏 𓈖 𓅐𓏏 𓎡',
    transliteration: 'dỉ mrt n mwt.k',
    phoneticReadingAr: 'دِي مِرِت إِن مُوت-إِك',
    fullWisdomTranslationAr: 'امنحِ المحبةَ والوفاءَ لأمِّك التي ربتك',
    tokens: [
      {
        id: 't7-1',
        glyphs: '𓏙',
        gardiner: 'X8',
        transliteration: 'dỉ',
        phoneticAr: 'دِي',
        targetWordAr: 'امنحْ وأعطِ',
        symbolHintAr: 'المثلث المخروطي (X8) فعل أمر أو دعاء بمعنى أعطِ أو قدّم.'
      },
      {
        id: 't7-2',
        glyphs: '𓌻𓂋𓏏',
        gardiner: 'U7 + D21 + X1',
        transliteration: 'mrt',
        phoneticAr: 'مِرِت',
        targetWordAr: 'المحبةَ والمودة',
        symbolHintAr: 'فأس الحراثة «مِر» (U7) هي الأصل الكلاسيكي لكلمة الحب والوفاء.'
      },
      {
        id: 't7-3',
        glyphs: '𓈖',
        gardiner: 'N35',
        transliteration: 'n',
        phoneticAr: 'إِن',
        targetWordAr: 'لـِ / إلى',
        symbolHintAr: 'تموج الماء «ن» (N35) يستخدم هنا كحرف جر بمعنى «لـِ».'
      },
      {
        id: 't7-4',
        glyphs: '𓅐𓏏 𓎡',
        gardiner: 'G14 + X1 + V31',
        transliteration: 'mwt.k',
        phoneticAr: 'مُوت-إِك',
        targetWordAr: 'أمِّك',
        symbolHintAr: 'طائر الرخمة (G14) يقرأ «موت» ويعني الأم، والسلة (V31) كاف المخاطب.'
      }
    ],
    distractorWordsAr: ['بوابة المعبد', 'عسل النحل'],
    wisdomReflectionAr:
      'تُعد وصية الحكيم آني عن الأم من أرقّ النصوص الإنسانية في العالم القديم؛ إذ يذكّر ابنه بسهرها وتعليمها إياه المشي والكلام، داعياً إلى إكرامها مضاعفاً.',
    audioScript:
      'من تعاليم الحكيم آني: دِي مِرِت إِن مُوت إِك، ومعناها: امنح المحبة والوفاء لأمك.'
  },
  {
    id: 'wisdom-joy-today',
    numberLabel: 'لغز #08',
    titleAr: 'اتبِع فرحَ قلبك بالخير',
    sourceWisdomAr: 'من أنشودة عازف القيثارة · التراث الأدبي المصري',
    eraAr: 'الدولة الوسطى · قرابة 1900 ق.م',
    hieroglyphicText: '𓌞𓋴 𓄣 𓎡 𓅓 𓎛𓊵𓏏𓊪',
    transliteration: 'šms ỉb.k m ḥtp',
    phoneticReadingAr: 'شِمْس إِب-إِك إِم حُتُب',
    fullWisdomTranslationAr: 'اتبِعْ نداءَ قلبِك في سكينةٍ وسلام',
    tokens: [
      {
        id: 't8-1',
        glyphs: '𓌞𓋴',
        gardiner: 'T18 + S29',
        transliteration: 'šms',
        phoneticAr: 'شِمْس',
        targetWordAr: 'اتبِعْ ورافِق',
        symbolHintAr: 'علامة «شِمس» (T18) تعني السير وراء الشيء واتّباعه بإخلاص.'
      },
      {
        id: 't8-2',
        glyphs: '𓄣 𓎡',
        gardiner: 'F34 + V31',
        transliteration: 'ỉb.k',
        phoneticAr: 'إِب-إِك',
        targetWordAr: 'قلبَك',
        symbolHintAr: 'القلب «إِب» مضافاً إليه سلة المخاطب «إِك» يساوي قلبَك.'
      },
      {
        id: 't8-3',
        glyphs: '𓅓',
        gardiner: 'G17',
        transliteration: 'm',
        phoneticAr: 'إِم',
        targetWordAr: 'في',
        symbolHintAr: 'البومة (G17) هي حرف الجر الأكثر شيوعاً في الهيروغليفية بمعنى «في/بـ».'
      },
      {
        id: 't8-4',
        glyphs: '𓊵𓏏𓊪',
        gardiner: 'R4 + X1 + Q3',
        transliteration: 'ḥtp',
        phoneticAr: 'حُتُب',
        targetWordAr: 'سكينة وسلام',
        symbolHintAr: 'حصير القربان «حُتب» (R4) يعني الرضا والهدوء والسكينة والعيش السعيد.'
      }
    ],
    distractorWordsAr: ['عاصفة الرمل', 'نجم الفجر'],
    wisdomReflectionAr:
      'تعبر هذه العبارة الشهيرة «شِمس إبك» عن دعوة الحكماء المصريين إلى عيش الحاضر بامتنان وسلام نفسي، والوفاء للحياة الطيبة ما دام الإنسان على قيد الحياة.',
    audioScript:
      'من أناشيد التراث المصري: شِمْس إِب إِك إِم حُتُب، ومعناها: اتبع قلبك في سكينة وسلام.'
  }
];

/**
 * Deterministic selection of today's puzzle based on YYYY-MM-DD calendar date.
 */
export function getDailyPuzzleForDate(date = new Date()): {
  dateKey: string;
  puzzleIndex: number;
  puzzle: DailyWisdomPuzzle;
} {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const daysSinceEpoch = Math.floor(
    Date.UTC(year, date.getMonth(), date.getDate()) / (1000 * 60 * 60 * 24)
  );
  const puzzleIndex = Math.abs(daysSinceEpoch) % DAILY_WISDOM_PUZZLES.length;

  return {
    dateKey,
    puzzleIndex,
    puzzle: DAILY_WISDOM_PUZZLES[puzzleIndex]
  };
}
