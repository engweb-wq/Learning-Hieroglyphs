export interface RebirthFragmentChallenge {
  id: string;
  order: number;
  hieroglyphs: string;
  gardinerCodes: string[];
  transliteration: string;
  phoneticReadingAr: string;
  arabicMeaning: string;
  grammarAndSymbolNoteAr: string;
  questionAr: string;
  hintAr: string;
  options: {
    id: string;
    textAr: string;
    isCorrect: boolean;
    feedbackAr: string;
  }[];
  audioPronunciationText: string;
}

export interface RebirthStage {
  id: string;
  stageNumber: number;
  titleAr: string;
  egyptianNameAr: string;
  chapterRefAr: string;
  guardianDeityAr: string;
  symbolHieroglyph: string;
  introNarrativeAr: string;
  completionBlessingAr: string;
  fullSpellHieroglyphs: string;
  fullSpellTranslationAr: string;
  pointsPerFragment: number;
  stageBonusPoints: number;
  fragments: RebirthFragmentChallenge[];
}

export const RESURRECTION_JOURNEY_STAGES: RebirthStage[] = [
  {
    id: 'stage-1-awakening',
    stageNumber: 1,
    titleAr: 'بوابة الخروج إلى النهار',
    egyptianNameAr: 'بِرِت إم هِرو',
    chapterRefAr: 'التعويذة 1 و 17 — بردية آني',
    guardianDeityAr: 'أنوبيس حارس المقبرة وخِبري شمس الفجر',
    symbolHieroglyph: '𓇳',
    introNarrativeAr:
      'تبدأ رحلة الروح مع بزوغ أول خيوط النور؛ على الكاتب أن يفك شفرة عنوان كتاب الموتى الأصلي ليفتح أبواب الأبدية ويخرج إلى ضياء النهار.',
    completionBlessingAr:
      'انفتحت بوابة العالم السفلي الأولى، ونهضت الروح حرة تنظر إلى قرص الشمس المشرق عند الأفق.',
    fullSpellHieroglyphs: '𓂋𓏤𓏌𓅱 𓉐𓂋𓏏 𓅓 𓉔𓂋𓅱 𓇋𓏌𓎡 𓇳 𓅓 𓈌𓏏',
    fullSpellTranslationAr:
      '«فصول الخروج إلى النهار: أنا رع المشرق في الأفق الشرقي للسماء.»',
    pointsPerFragment: 20,
    stageBonusPoints: 30,
    fragments: [
      {
        id: 's1-f1',
        order: 1,
        hieroglyphs: '𓂋 𓏤 𓏌 𓅱',
        gardinerCodes: ['D21', 'Z1', 'W24', 'G43'],
        transliteration: 'rꜣ.w',
        phoneticReadingAr: 'رُو (فصول / أقوال)',
        arabicMeaning: 'فصول / تعاويذ / أقوال مقدسة',
        grammarAndSymbolNoteAr:
          'رمز الفم (𓂋) مع شرطة الدلالة (𓏤) يعني «فماً» أو «قولاً وتلاوةً»، والجمع بالواو (𓅱) يحوله إلى «أقوال وفصول».',
        questionAr: 'ما المعنى الدقيق لرمز الفم (𓂋) متبوعاً بالجمع (𓂋𓏤𓏌𓅱) في مستهل البردية؟',
        hintAr: 'لاحظ أن العلامة الأساسية هي شكل «الفم البشري» الذي تصدر منه التلاوة والكلمات.',
        audioPronunciationText: 'رُو.. وتعني الأقوال أو الفصول المقدسة التي يتلوها الكاتب.',
        options: [
          {
            id: 'a',
            textAr: 'فصول أو أقوال مقدسة (rꜣ.w)',
            isCorrect: true,
            feedbackAr: 'أحسنت! الفم يرمز للكلام والتلاوة، وهي أول كلمة في عنوان كتاب الموتى.'
          },
          {
            id: 'b',
            textAr: 'أهرامات الملك الخالدة',
            isCorrect: false,
            feedbackAr: 'رمز الهرم هو مثلث (𓉴)، أما هنا فنرى علامة الفم (𓂋).'
          },
          {
            id: 'c',
            textAr: 'مياه النيل وقت الفيضان',
            isCorrect: false,
            feedbackAr: 'الماء يُرسم بثلاث تموجات (𓈗)، بينما هذا النقش يفتتح الكلمة بعلامة الفم.'
          }
        ]
      },
      {
        id: 's1-f2',
        order: 2,
        hieroglyphs: '𓉐 𓂋 𓏏 𓂻',
        gardinerCodes: ['O1', 'D21', 'X1', 'D54'],
        transliteration: 'pr.t',
        phoneticReadingAr: 'بِرِت (الخروج والصعود)',
        arabicMeaning: 'الخروج والانطلاق',
        grammarAndSymbolNoteAr:
          'علامة البيت (𓉐 = بِر) تعطي الصوت الأولي، والساقان الماشيتان (𓂻) تعملان كمحدد تصنيفي للحركة والخروج.',
        questionAr: 'لماذا تنتهي هذه الكلمة برمز «الساقين الماشيتين» (𓂻)؟',
        hintAr: 'تذكر وظيفة المحددات التصنيفية (Determinatives) في نهاية الكلمات المصرية القديمة.',
        audioPronunciationText: 'بِرِت.. وتعني الخروج والانطلاق من القبر إلى الحياة.',
        options: [
          {
            id: 'a',
            textAr: 'لتدل على فعل الحركة والانطلاق والخروج',
            isCorrect: true,
            feedbackAr: 'دقيق جداً! الساقان الماشيتان تحددان أن الكلمة تعبر عن الخروج والحركة.'
          },
          {
            id: 'b',
            textAr: 'لتدل على الطيور المهاجرة فقط',
            isCorrect: false,
            feedbackAr: 'لا، الطيور تُحدد بصورة طائر؛ الساقان تدلان على المشي والحركة.'
          },
          {
            id: 'c',
            textAr: 'لتدل على كتابة اسم ملكي داخل خرطوشة',
            isCorrect: false,
            feedbackAr: 'الأسماء الملكية تُحاط بإطار الخرطوشة البيضاوي (𓍷).'
          }
        ]
      },
      {
        id: 's1-f3',
        order: 3,
        hieroglyphs: '𓅓 𓉔 𓂋 𓅱 𓇳',
        gardinerCodes: ['G17', 'O4', 'D21', 'G43', 'N5'],
        transliteration: 'm hrw',
        phoneticReadingAr: 'إم هِرو (إلى النهار)',
        arabicMeaning: 'في النهار / إلى ضياء النهار',
        grammarAndSymbolNoteAr:
          'البومة (𓅓) حرف الجر «في/إلى»، وتنتهي الكلمة بقرص الشمس (𓇳) كمحدد للزمن والضياء النهاري.',
        questionAr: 'ما المقصود بالتركيب «𓅓 𓉔𓂋𓅱 𓇳» المختوم بقرص الشمس؟',
        hintAr: 'علامة قرص الشمس في النهاية تشير للضوء واليوم المشرق، والبومة حرف الجر «في/إلى».',
        audioPronunciationText: 'إم هِرو.. أي إلى ضياء النهار المشرق.',
        options: [
          {
            id: 'a',
            textAr: 'إلى النهار (أي الخروج إلى النور)',
            isCorrect: true,
            feedbackAr: 'ممتاز! هكذا يكتمل الاسم الحقيقي لكتاب الموتى: «أقوال الخروج إلى النهار».'
          },
          {
            id: 'b',
            textAr: 'تحت ظلام الليل العميق',
            isCorrect: false,
            feedbackAr: 'الليل يحدد برمز السماء المتدلي منها نجم (𓇰)، أما قرص الشمس (𓇳) فيدل على النهار.'
          },
          {
            id: 'c',
            textAr: 'داخل قارب خشبي صغير',
            isCorrect: false,
            feedbackAr: 'القارب له رمز سفينة (𓊛)، بينما يظهر هنا قرص الشمس.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-2-heart-scarab',
    stageNumber: 2,
    titleAr: 'تعويذة جعران القلب وحفظ الضمير',
    egyptianNameAr: 'حِسب إِب إم مِتر',
    chapterRefAr: 'التعويذة 30B — تميمة الجعران الأخضر',
    guardianDeityAr: 'تحوت رب الحكمة وخِبري',
    symbolHieroglyph: '𓆣',
    introNarrativeAr:
      'تُنقش هذه الكلمات على جعران من الحجر الأخضر يوضع فوق صدر المتوفى، كي يظل القلب مطمئناً متماسكاً ولا ينقلب ضد صاحبه لحظة الحساب.',
    completionBlessingAr:
      'اطمأن الفؤاد وسكن الوجدان، وتوهجت تميمة الجعران الأخضر بالسلام الداخلي.',
    fullSpellHieroglyphs: '𓄣𓀀 𓈖 𓅐𓏏𓀀 𓅓 𓊢𓂝 𓂋𓀀 𓅓 𓏏𓂋',
    fullSpellTranslationAr:
      '«يا قلبي الذي من أمي، لا تقف شاهداً ضدي في المحاكمة!»',
    pointsPerFragment: 25,
    stageBonusPoints: 35,
    fragments: [
      {
        id: 's2-f1',
        order: 1,
        hieroglyphs: '𓄣 𓀀',
        gardinerCodes: ['F34', 'A1'],
        transliteration: 'jb.j',
        phoneticReadingAr: 'إِب-إي (قلبي)',
        arabicMeaning: 'قلبي (مركز الوعي والضمير)',
        grammarAndSymbolNoteAr:
          'العلامة الأولى (𓄣) هي صورة القلب المصري، والضمير المتصل (𓀀) في آخره يعني ياء المتكلم «ـي».',
        questionAr: 'ماذا يضيف الرمز البشري الجالس (𓀀) بعد علامة القلب (𓄣)؟',
        hintAr: 'في القواعد المصرية، الشخص الجالس في نهاية الاسم يعمل كضمير ملكية للمتكلم.',
        audioPronunciationText: 'إِب إي.. وتعني قلبي.',
        options: [
          {
            id: 'a',
            textAr: 'ضمير المتكلم (قلبي أنا)',
            isCorrect: true,
            feedbackAr: 'صحيح! الرمز (𓀀) يعني «أنا/لي»، فتصبح الكلمة «قلبي».'
          },
          {
            id: 'b',
            textAr: 'صيغة الجمع (قلوب كثيرة)',
            isCorrect: false,
            feedbackAr: 'الجمع يكتب بثلاث شرطات (𓏥)، أما هنا فلدينا علامة المتكلم المفرد.'
          },
          {
            id: 'c',
            textAr: 'حرف نفي بمعنى (بدون قلب)',
            isCorrect: false,
            feedbackAr: 'النفي يُكتب بالذراعين الممدودتين (𓂜)، وليس بالرجل الجالس.'
          }
        ]
      },
      {
        id: 's2-f2',
        order: 2,
        hieroglyphs: '𓈖 𓅐 𓏏 𓀀',
        gardinerCodes: ['N35', 'G14', 'X1', 'A1'],
        transliteration: 'n mwt.j',
        phoneticReadingAr: 'إن مُوت-إي (الذي من أمي)',
        arabicMeaning: 'الذي من أمي',
        grammarAndSymbolNoteAr:
          'النسر الأم (𓅐 = مُوت) يرمز للأمومة، وتتلوه التاء المربوطة (𓏏) للتأنيث ثم ياء المتكلم (𓀀).',
        questionAr: 'ما الكلمة التي يرمز لها طائر النسر المصري (𓅐) مع علامة التأنيث (𓏏)؟',
        hintAr: 'نطقها «مُوت» وتقابل في العربية معنى أقرب الناس للإنسان منذ ولادته.',
        audioPronunciationText: 'إن مُوت إي.. أي قلبي الذي ورثته عن أمي.',
        options: [
          {
            id: 'a',
            textAr: 'الأم (أمي)',
            isCorrect: true,
            feedbackAr: 'رائع! كان المصري يناجي قلبه قائلاً: «يا قلبي الذي من أمي».'
          },
          {
            id: 'b',
            textAr: 'البحر الواسع',
            isCorrect: false,
            feedbackAr: 'النسر (𓅐) يُقرأ «موت» ويعني الأم، ولا علاقة له بالبحر.'
          },
          {
            id: 'c',
            textAr: 'القمر المكتمل',
            isCorrect: false,
            feedbackAr: 'القمر يرمز له بالهلال (𓇹)، بينما النسر يرمز للأم.'
          }
        ]
      },
      {
        id: 's2-f3',
        order: 3,
        hieroglyphs: '𓅓 𓊢 𓂝 𓂋 𓀀',
        gardinerCodes: ['G17', 'P6', 'D36', 'D21', 'A1'],
        transliteration: 'm ꜥḥꜥ r.j',
        phoneticReadingAr: 'إم آحا إر-إي (لا تقف ضدي)',
        arabicMeaning: 'لا تقف ضدي / لا تعارضني',
        grammarAndSymbolNoteAr:
          'البومة (𓅓) قبل الفعل في بداية الجملة الطلبية تأتي كأداة نهي «لا تفعل»، والصاري المنتصب (𓊢) يعني «يقف».',
        questionAr: 'ماذا تعني العبارة «𓅓 𓊢𓂝 𓂋𓀀» في سياق مناجاة القلب؟',
        hintAr: 'الأداة (𓅓) هنا تفيد النهي، والصاري (𓊢) يعني الوقوف، و(𓂋𓀀) تعني ضدي.',
        audioPronunciationText: 'إم آحا إر إي.. أي لا تقف شاهداً ضدي.',
        options: [
          {
            id: 'a',
            textAr: 'لا تقف ضدي (نهي عن الشهادة بالضرر)',
            isCorrect: true,
            feedbackAr: 'ممتاز! هكذا يتضرع المتوفى لقلبه ألا ينقلب عليه أمام المحكمة الإلهية.'
          },
          {
            id: 'b',
            textAr: 'اجلس مع أصدقائي على النهر',
            isCorrect: false,
            feedbackAr: 'الصاري (𓊢) يدل على الوقوف، وأداة النهي (𓅓) تمنع الوقوف معارضاً.'
          },
          {
            id: 'c',
            textAr: 'اكتب اسمي بالذهب الخالص',
            isCorrect: false,
            feedbackAr: 'الذهب يرمز له بعقد النوب (𓋞)، غير موجود في هذا المقطع.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-3-gates-duat',
    stageNumber: 3,
    titleAr: 'حراس بوابات الدوات السرية',
    egyptianNameAr: 'سِباو نو دوات',
    chapterRefAr: 'التعويذة 144 — معرفة الأسماء السرية',
    guardianDeityAr: 'حراس البوابات السبع المقدسة',
    symbolHieroglyph: '𓉐',
    introNarrativeAr:
      'لا يفتح حراس العالم الآخر أبوابهم إلا لمن يثبت معرفته بالرموز السرية لاسم كل بوابة. فك شفرة عبارة العبور الآمن لتمر بسلام.',
    completionBlessingAr:
      'انفتح المصراع الحجري للبوابة السابعة! أفسح الحراس الطريق أمام الكاتب العارف بالأسرار.',
    fullSpellHieroglyphs: '𓇋𓏌𓎡 𓂋𓐍𓏛 𓂋𓈖 𓈖 𓊹 𓊪𓈖',
    fullSpellTranslationAr:
      '«إنني أعرف الاسم السري لهذا الحارس الإلهي!»',
    pointsPerFragment: 25,
    stageBonusPoints: 40,
    fragments: [
      {
        id: 's3-f1',
        order: 1,
        hieroglyphs: '𓇋 𓏌 𓎡',
        gardinerCodes: ['M17', 'W24', 'V31'],
        transliteration: 'jnk',
        phoneticReadingAr: 'إينِك (أنا)',
        arabicMeaning: 'أنا (ضمير منفصل للتوكيد)',
        grammarAndSymbolNoteAr:
          'يتكون من قصبة الإلف (𓇋) وإناء النون (𓏌) وسلة الكاف (𓎡)، ويُستعمل في النصوص الدينية لإعلان الهوية بثقة.',
        questionAr: 'ما الكلمة التي يكوّنها تتابع (𓇋 + 𓏌 + 𓎡) وتستهل بها جمل التعريف في كتاب الموتى؟',
        hintAr: 'يشبه في اللغة العربية ضمير المتكلم المنفصل «أنا» (وفي القبطية «أنوك»).',
        audioPronunciationText: 'إينِك.. وتعني أنا.',
        options: [
          {
            id: 'a',
            textAr: 'ضمير المتكلم: «أنا»',
            isCorrect: true,
            feedbackAr: 'أصبت! (إينك) تعني «أنا»، وهو جذر عريق في اللغات الأفروآسيوية.'
          },
          {
            id: 'b',
            textAr: 'صفة بمعنى: «شمس»',
            isCorrect: false,
            feedbackAr: 'الشمس هي «رع» وتكتب بقرص الشمس (𓇳).'
          },
          {
            id: 'c',
            textAr: 'فعل بمعنى: «نام»',
            isCorrect: false,
            feedbackAr: 'هذا ضمير اسمي منفصل وليس فعلاً.'
          }
        ]
      },
      {
        id: 's3-f2',
        order: 2,
        hieroglyphs: '𓂋 𓐍 𓏛',
        gardinerCodes: ['D21', 'Aa1', 'Y1'],
        transliteration: 'rḫ',
        phoneticReadingAr: 'رِخ (أعرف / عالم)',
        arabicMeaning: 'يعرف / يدرك بالعلم',
        grammarAndSymbolNoteAr:
          'تُختم بلفافة البردي المختومة (𓏛) وهي المحدد الأشهر للأفكار المجردة والمعرفة والكتابة.',
        questionAr: 'ما دلالة لفافة البردي (𓏛) في نهاية كلمة «𓂋𓐍𓏛»؟',
        hintAr: 'لفافة البردي تُلحق بالكلمات الدالة على الإدراك والعقل والمعرفة.',
        audioPronunciationText: 'رِخ.. وتعني يعرف ويدرك بالعلم.',
        options: [
          {
            id: 'a',
            textAr: 'المعرفة والعلم والإدراك العقلي',
            isCorrect: true,
            feedbackAr: 'دقة علمية رائعة! البردي هو رمز المعرفة المجردة، لذا فإن (رِخ) تعني «يعرف».'
          },
          {
            id: 'b',
            textAr: 'الطبخ وإعداد الخبز',
            isCorrect: false,
            feedbackAr: 'الأطعمة تُحدد برموز الأرغفة أو الجرار، وليس بلفافة البردي.'
          },
          {
            id: 'c',
            textAr: 'الصيد في المستنقعات',
            isCorrect: false,
            feedbackAr: 'المستنقعات والصيد تستخدم رموز البردي النامي أو الرمح.'
          }
        ]
      },
      {
        id: 's3-f3',
        order: 3,
        hieroglyphs: '𓂋 𓈖 𓈖 𓊹',
        gardinerCodes: ['D21', 'N35', 'N35', 'R8'],
        transliteration: 'rn n nṯr',
        phoneticReadingAr: 'رِن إن نِثِر (اسم الإله / الحارس)',
        arabicMeaning: 'اسم المعبود / الحارس المقدس',
        grammarAndSymbolNoteAr:
          'الفم والموجة (𓂋𓈖) تقرأ «رِن» أي الاسم، والراية (𓊹 = نِثِر) هي الرمز التقليدي للألوهية والقداسة.',
        questionAr: 'إلى ماذا تشير الراية المعقودة (𓊹 = نِثِر) في ختام هذا المقطع؟',
        hintAr: 'تُرفع الراية فوق المعابد للدلالة على الحضرة الإلهية المقدسة.',
        audioPronunciationText: 'رِن إن نِثِر.. أي اسم الإله أو الحارس المقدس.',
        options: [
          {
            id: 'a',
            textAr: 'المعبود / المقدس (نِثِر)',
            isCorrect: true,
            feedbackAr: 'ممتاز! وبذلك تفك شفرة الجملة كاملة: «أنا أعرف اسم هذا الحارس المقدس».'
          },
          {
            id: 'b',
            textAr: 'الأرض الصحراوية الجافة',
            isCorrect: false,
            feedbackAr: 'الصحراء يرمز لها بالتلال الرملية الثلاثة (𓈉).'
          },
          {
            id: 'c',
            textAr: 'الذهب والفضة',
            isCorrect: false,
            feedbackAr: 'المعادن لها رموزها الخاصة، أما الراية (𓊹) فهي رمز القداسة والألوهية.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-4-weighing-heart',
    stageNumber: 4,
    titleAr: 'قاعة الحقيقتين وميزان ماعت',
    egyptianNameAr: 'أُسِخت نِت ماعِتي',
    chapterRefAr: 'التعويذة 125 — الاعتراف الإنكاري العظيم',
    guardianDeityAr: 'أوزيريس وماعت وأنوبيس وتحوت',
    symbolHieroglyph: '𓌳',
    introNarrativeAr:
      'وصلت الروح إلى أقدس محطة: قاعة الحقيقتين. يوضع القلب في كفة وريشة ماعت في الكفة الأخرى. أجب بدقة لتثبت براءة الكاتب وتنال لقب «صادق الصوت».',
    completionBlessingAr:
      'توازنت كفتا الميزان تماماً مع ريشة ماعت! سجّل تحوت براءتك، ونطق الحضور باللقب الأقدس: «ماع-خرو»!',
    fullSpellHieroglyphs: '𓂜 𓁹𓈖𓀀 𓇋𓋴𓆑𓏏 𓅓 𓌳𓐍𓂝𓏏 𓐙𓊝',
    fullSpellTranslationAr:
      '«لم أقترف إثماً ولا ظلماً، بل عشت بالحق والعدالة؛ إنني صادق القول مبرأ!»',
    pointsPerFragment: 30,
    stageBonusPoints: 50,
    fragments: [
      {
        id: 's4-f1',
        order: 1,
        hieroglyphs: '𓂜 𓁹 𓈖 𓀀',
        gardinerCodes: ['D35', 'D4', 'N35', 'A1'],
        transliteration: 'nn jr.n.j',
        phoneticReadingAr: 'نِن إير-ن-إي (لم أفعل)',
        arabicMeaning: 'لم أفعل / لم أقترف (في الماضي)',
        grammarAndSymbolNoteAr:
          'الذراعان الممدودتان للأسفل (𓂜) أداة نفي قاطعة، والعين (𓁹) هي الجذر الثلاثي للفعل «يفعل/يصنع».',
        questionAr: 'ما وظيفة رمز الذراعين الممدودتين للأسفل (𓂜) في بداية جمل الاعتراف الـ 42؟',
        hintAr: 'تسمى الجمل «الاعتراف الإنكاري» لأن المتوفى ينفي بها عن نفسه أي ذنب.',
        audioPronunciationText: 'نِن إير ن إي.. وتعني لم أفعل ولم أقترف.',
        options: [
          {
            id: 'a',
            textAr: 'النفي القاطع (لم أفعل)',
            isCorrect: true,
            feedbackAr: 'أحسنت! يبدأ المتوفى كل فقرة بالنفي القاطع ليبرئ ذمته.'
          },
          {
            id: 'b',
            textAr: 'النداء والتعجب',
            isCorrect: false,
            feedbackAr: 'الذراعان بهذا الشكل تعبران عن الرفض والنفي (نِن).'
          },
          {
            id: 'c',
            textAr: 'تمني الهطول الغزير للمطر',
            isCorrect: false,
            feedbackAr: 'المطر والسماء لها رموز السماء الماطرة (𓇲).'
          }
        ]
      },
      {
        id: 's4-f2',
        order: 2,
        hieroglyphs: '𓇋 𓋴 𓆑 𓏏',
        gardinerCodes: ['M17', 'S29', 'I9', 'X1'],
        transliteration: 'jsft',
        phoneticReadingAr: 'إسِفِت (الظلم والفوضى)',
        arabicMeaning: 'الإثم والفوضى والظلم',
        grammarAndSymbolNoteAr:
          'مصطلح فلسفي محوري في الفكر المصري يمثل النقيض المباشر لـ «ماعت» (النظام والعدل).',
        questionAr: 'ماذا تعني كلمة «إسفت» (𓇋𓋴𓆑𓏏) التي ينفيها المتوفى عن نفسه في القاعة؟',
        hintAr: 'هي الكلمة المضادة لـ «ماعت» (العدالة والنظام الكوني).',
        audioPronunciationText: 'إسِفِت.. أي الظلم والفوضى والعدوان.',
        options: [
          {
            id: 'a',
            textAr: 'الظلم والفوضى والإثم',
            isCorrect: true,
            feedbackAr: 'رائع! «إسفت» هي نقيض العدالة، وبذلك يكون المعنى: «لم أقترف ظلماً».'
          },
          {
            id: 'b',
            textAr: 'الحكمة والعلم النافع',
            isCorrect: false,
            feedbackAr: 'بالعكس، الحكمة والعدل جزء من «ماعت»، أما «إسفت» فهي الفوضى والإثم.'
          },
          {
            id: 'c',
            textAr: 'الأزهار العطرة في الحديقة',
            isCorrect: false,
            feedbackAr: 'لا، السياق أخلاقي يتعلق بعدم ارتكاب الجور والإثم.'
          }
        ]
      },
      {
        id: 's4-f3',
        order: 3,
        hieroglyphs: '𓌳 𓐍 𓂝 𓏏',
        gardinerCodes: ['U1', 'Aa1', 'D36', 'X1'],
        transliteration: 'mꜣꜥt',
        phoneticReadingAr: 'ماعِت (الحق والعدالة)',
        arabicMeaning: 'الحق والعدل والاستقامة والنظام الكوني',
        grammarAndSymbolNoteAr:
          'يرمز لها بريشة النعامة الخفيفة التي يوزن القلب في كفة الميزان أمامها.',
        questionAr: 'ما رمز المعيار الأخلاقي الذي يوزن به القلب داخل قاعة الحساب؟',
        hintAr: 'توضع في الكفة المقابلة للقلب؛ خفيفة الوزن عظيمة القيمة الأخلاقية.',
        audioPronunciationText: 'ماعِت.. رمز الحق والعدالة والتوازن.',
        options: [
          {
            id: 'a',
            textAr: 'العدالة والحق (ماعت — ريشة الحق)',
            isCorrect: true,
            feedbackAr: 'صحيح تماماً! ريشة ماعت هي ميزان الحق والاستقامة.'
          },
          {
            id: 'b',
            textAr: 'ثقل من النحاس الصافي',
            isCorrect: false,
            feedbackAr: 'الميزان الأوزيري روحي لا يزن بالمعادن، بل بريشة الحق والعدالة.'
          },
          {
            id: 'c',
            textAr: 'حجر الهرم الأكبر',
            isCorrect: false,
            feedbackAr: 'الهرم مقبرة ملكية وليس كفة الوزن الأخلاقي.'
          }
        ]
      },
      {
        id: 's4-f4',
        order: 4,
        hieroglyphs: '𓐙 𓊝',
        gardinerCodes: ['Aa11', 'P8'],
        transliteration: 'mꜣꜥ-ḫrw',
        phoneticReadingAr: 'ماع-خِرو (صادق القول / المبرأ)',
        arabicMeaning: 'صادق القول والمبرأ في الحساب',
        grammarAndSymbolNoteAr:
          'يتكون من قاعدة الميزان (𓐙) ومجداف «خرو» أي الصوت/القول؛ ويُضاف بعد أسماء المبرئين في النصوص الجنائزية.',
        questionAr: 'ما اللقب الشرفي الخالد الذي يناله الناجي بعد تساوي كفتي الميزان؟',
        hintAr: 'ترجمته الحرفية «صادق الصوت» أو «صادق القول».',
        audioPronunciationText: 'ماع خِرو.. أي صادق القول والمبرأ أمام العدالة.',
        options: [
          {
            id: 'a',
            textAr: 'صادق القول / المبرأ في الحساب',
            isCorrect: true,
            feedbackAr: 'تهانينا! لقد اجتازت الروح قاعة الحقيقتين بلقب «صادق القول»!'
          },
          {
            id: 'b',
            textAr: 'أمير الجيوش الملكية',
            isCorrect: false,
            feedbackAr: 'الألقاب العسكرية خاصة بالحياة الدنيا، أما هنا فاللقب أخلاقي روحي.'
          },
          {
            id: 'c',
            textAr: 'نحات الحجر الجيري',
            isCorrect: false,
            feedbackAr: 'هذا اللقب يعلن البراءة والصدق في الحساب النهائي.'
          }
        ]
      }
    ]
  },
  {
    id: 'stage-5-fields-of-reeds',
    stageNumber: 5,
    titleAr: 'الوصول إلى حقول القصب الأبدية',
    egyptianNameAr: 'سِخت إيارو م حِتِب',
    chapterRefAr: 'التعويذة 110 — الفردوس المصري',
    guardianDeityAr: 'أوزيريس سيد الأبدية',
    symbolHieroglyph: '𓊵',
    introNarrativeAr:
      'المحطة الختامية في رحلة البعث: عبور القنوات الصافية إلى حقول القصب المباركة، حيث النماء والماء العذب والسلام الأبدي.',
    completionBlessingAr:
      'اكتملت رحلة البعث المقدسة بنجاح! دخلت الروح حقول القصب الأبدية حيث السلام والوفرة والخلود.',
    fullSpellHieroglyphs: '𓇏𓏏 𓇋𓄿𓂋𓅱 𓎛𓎿𓊃 𓅓 𓈗 𓊵𓏏𓊪',
    fullSpellTranslationAr:
      '«في حقول القصب المباركة، يرتوي بالماء العذب وينعم بالسلام الأبدي!»',
    pointsPerFragment: 30,
    stageBonusPoints: 60,
    fragments: [
      {
        id: 's5-f1',
        order: 1,
        hieroglyphs: '𓇏 𓏏 𓇋 𓄿 𓂋 𓅱',
        gardinerCodes: ['M20', 'X1', 'M17', 'G1', 'D21', 'G43'],
        transliteration: 'sḫt-jꜣrw',
        phoneticReadingAr: 'سِخت-إيارو (حقول القصب)',
        arabicMeaning: 'حقول القصب (جنة الخلود المصرية)',
        grammarAndSymbolNoteAr:
          'العلامة الأولى (𓇏) تصور سيقان قصب خضراء متلاصقة وتنطق «سِخت» أي الحقل المزدهر.',
        questionAr: 'ما المكان الذي تصفه العبارة «𓇏𓏏 𓇋𓄿𓂋𓅱» وتختم به خريطة التعويذة 110؟',
        hintAr: 'تتوسطها سيقان القصب الخضراء؛ وهي اسم الفردوس المصري في العالم الآخر.',
        audioPronunciationText: 'سِخت إيارو.. حقول القصب الفردوسية.',
        options: [
          {
            id: 'a',
            textAr: 'حقول القصب (الفردوس المصري الخالد)',
            isCorrect: true,
            feedbackAr: 'أحسنت! «سخت إيارو» هي الجنة الخضراء ذات القنوات النيلية الهادئة.'
          },
          {
            id: 'b',
            textAr: 'الصحراء الغربية القاحلة',
            isCorrect: false,
            feedbackAr: 'العلامة الأولى (𓇏) هي قصب أخضر يدل على الحقول الخصبة لا الصحراء.'
          },
          {
            id: 'c',
            textAr: 'ساحة المحكمة المغلقة',
            isCorrect: false,
            feedbackAr: 'قاعة المحكمة كانت المحطة الرابعة، أما هنا فنحن في الحقول الفردوسية.'
          }
        ]
      },
      {
        id: 's5-f2',
        order: 2,
        hieroglyphs: '𓎛 𓎿 𓊃 𓅓 𓈗',
        gardinerCodes: ['V28', 'W14', 'S29', 'G17', 'N35A'],
        transliteration: 'ḥz m mw',
        phoneticReadingAr: 'حِز إم مُو (الارتواء بالماء)',
        arabicMeaning: 'مبارك ومرتوٍ بالماء العذب النقي',
        grammarAndSymbolNoteAr:
          'الإناء المسكوب (𓎿) يدل على البركة والسكب الطاهر، والموجات الثلاث (𓈗) هي الكلمة الأبدية للماء «مُو».',
        questionAr: 'ماذا تعني الموجات الثلاث (𓈗) في ختام العبارة وما صلتها بالعربية؟',
        hintAr: 'نطقها المصري «مُو»، وهي من أشهر الكلمات المشتركة الدالة على سر الحياة.',
        audioPronunciationText: 'حِز إم مُو.. أي يرتوي بالماء العذب المبارك.',
        options: [
          {
            id: 'a',
            textAr: 'الماء العذب (مُو)، وتقارب كلمة «ماء / موية» العربية',
            isCorrect: true,
            feedbackAr: 'ممتاز! الماء العذب هو أول نعيم توصف به حقول الأبدية.'
          },
          {
            id: 'b',
            textAr: 'النار المتقدة في الأفران',
            isCorrect: false,
            feedbackAr: 'النار تكتب بشعلة (𓊮)، أما الموجات الثلاث فهي الماء دائماً.'
          },
          {
            id: 'c',
            textAr: 'الرياح العاصفة في الشتاء',
            isCorrect: false,
            feedbackAr: 'الرياح تُرسم بشراع منتفخ (𓊡)، وليس بأمواج الماء.'
          }
        ]
      },
      {
        id: 's5-f3',
        order: 3,
        hieroglyphs: '𓊵 𓏏 𓊪',
        gardinerCodes: ['R4', 'X1', 'Q3'],
        transliteration: 'ḥtp',
        phoneticReadingAr: 'حِتِب (سلام ورضوان)',
        arabicMeaning: 'السلام والرضا والطمأنينة',
        grammarAndSymbolNoteAr:
          'علامة «حِتِب» (𓊵) تمثل حصيراً موضوعاً عليه رغيف قربان؛ وهي أشهر كلمة ختامية للسكينة والسلام.',
        questionAr: 'ما المعنى الخاتم الذي تضفيه علامة «حِتِب» (𓊵𓏏𓊪) على ختام رحلة البعث؟',
        hintAr: 'تظهر أيضاً في أسماء ملوك مثل «أمنحتب» و«إمحوتب» وتعني السلام والرضا.',
        audioPronunciationText: 'حِتِب.. السلام والرضا والسكينة الأبدية.',
        options: [
          {
            id: 'a',
            textAr: 'السلام والرضا والسكينة الأبدية',
            isCorrect: true,
            feedbackAr: 'ختام مسك عظيم! نال الكاتب السلام والخلود في رحلة البعث.'
          },
          {
            id: 'b',
            textAr: 'الحرب والمعركة الفاصلة',
            isCorrect: false,
            feedbackAr: 'بالعكس تماماً، «حتب» هي رمز السلام والرضا والوفرة.'
          },
          {
            id: 'c',
            textAr: 'بناء السفن الضخمة',
            isCorrect: false,
            feedbackAr: 'بناء السفن يستخدم علامات القارب والمنشار، لا حصير القرابين.'
          }
        ]
      }
    ]
  }
];
