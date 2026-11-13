import { AntonymPair } from '../types';

export const EGYPTIAN_ANTONYM_PAIRS: AntonymPair[] = [
  {
    id: 'ant_light_dark',
    themeAr: 'النور في مواجهة الظلام',
    themeEn: 'Light vs Darkness',
    category: 'cosmic',
    categoryAr: 'الكون والطبيعة',
    wordA: {
      hieroglyphs: '𓌉𓆓𓇳',
      transliteration: 'ḥḏ (hedj)',
      arabicTransliteration: 'حِجْ / حِدْ',
      arabicMeaning: 'نور / ضياء / أبيض ومشرق',
      englishMeaning: 'Light / Bright / White',
      gardinerCodes: ['T3', 'I10', 'N5'],
      grammaticalTypeAr: 'اسم وصفة وفعل إضاءة',
      pronunciationSound: 'حِدْ، نور وضياء مشرق'
    },
    wordB: {
      hieroglyphs: '𓎡𓎡𓅱𓇰',
      transliteration: 'kkw (keku)',
      arabicTransliteration: 'كِكُو',
      arabicMeaning: 'ظلام دامس / عتمة ليلية',
      englishMeaning: 'Darkness / Gloom / Night shadow',
      gardinerCodes: ['V31', 'V31', 'G43', 'N2'],
      grammaticalTypeAr: 'اسم مع مخصص سماء الليل والنجوم',
      pronunciationSound: 'كِكُو، ظلام دامس'
    },
    philosophicalInsightAr: 'في الفكر المصري القديم، الظلام (ككو) هو حالة العدم البدائية التي سبقت الخلق (نون)، بينما النور (حج/وبن) يمثل انتصار رع كل صباح على قوى العدم والجمود.',
    exampleSentence: {
      hieroglyphs: '𓅱𓃀𓈖 𓇳 𓌉𓆓 𓅓 𓎡𓎡𓅱',
      transliteration: 'wbn rꜥ ḥḏ m kkw',
      arabicPhonetics: 'وِبِنْ رَعْ حِدْ إِمْ كِكُو',
      arabicTranslation: 'أشرق رع فأنار ضياؤه في قلب الظلام',
      englishTranslation: 'Ra rose and shone light within the darkness',
      grammarNoteAr: 'جملة فعلية بسيطة تبدأ بالفعل «wbn» (أشرق)، يليه الفاعل «rꜥ» (رع)، ثم الحال «ḥḏ» (مضيئاً/نوراً)، وشبه الجملة «m kkw» (في الظلام).'
    }
  },
  {
    id: 'ant_life_death',
    themeAr: 'الحياة في مواجهة الموت',
    themeEn: 'Life vs Death',
    category: 'life_death',
    categoryAr: 'الحياة والوجود',
    wordA: {
      hieroglyphs: '𓋹𓈖𓐍',
      transliteration: 'ꜥnḫ (ankh)',
      arabicTransliteration: 'عَنْخ',
      arabicMeaning: 'حياة / يحيا / بركة العيش',
      englishMeaning: 'Life / Living / To live',
      gardinerCodes: ['S34', 'N35', 'Aa1'],
      grammaticalTypeAr: 'رمز ثلاثي الصوت مع متممات',
      pronunciationSound: 'عَنْخ، رمز الحياة الأبدية'
    },
    wordB: {
      hieroglyphs: '𓅓𓅱𓏏𓀐',
      transliteration: 'mwt (mut)',
      arabicTransliteration: 'مُوت',
      arabicMeaning: 'موت / فناء / يموت',
      englishMeaning: 'Death / To die',
      gardinerCodes: ['G17', 'G43', 'X1', 'A14'],
      grammaticalTypeAr: 'اسم وفعل بمخصص الرجل الصريع',
      pronunciationSound: 'مُوت، جذر مشترك مع العربية'
    },
    philosophicalInsightAr: 'الموت عند قدماء المصريين لم يكن نهاية مطلقة للوجود، بل بوابة انتقال نحو «الحياة المتجددة» (عنخ وهِم) في حقول الإيارو الخالدة برفقة أوزيريس.',
    exampleSentence: {
      hieroglyphs: '𓏙 𓈖 𓎡 𓋹 𓅓 𓐍 𓏏 𓅓𓅱𓏏',
      transliteration: 'dj n.k ꜥnḫ m-ḫt mwt',
      arabicPhonetics: 'دي إن.ك عَنْخ إم-خِت مُوت',
      arabicTranslation: 'تُوهَب لك الحياة بعد الموت',
      englishTranslation: 'Life is given to you after death',
      grammarNoteAr: 'صيغة مبني للمجهول استعطافية «dj n.k» (يُعطى لك)، والمفعول «ꜥnḫ» (الحياة)، ومجرور بالظرف المركب «m-ḫt» (بعد) واسم «mwt» (الموت).'
    }
  },
  {
    id: 'ant_maat_isfet',
    themeAr: 'الحق والعدل في مواجهة الباطل والفوضى',
    themeEn: 'Truth/Cosmic Order vs Chaos/Falsehood',
    category: 'moral',
    categoryAr: 'الأخلاق والنظام الكوني',
    wordA: {
      hieroglyphs: '𓌳𓐙𓂝𓏏𓆄',
      transliteration: 'mꜣꜥ.t (ma\'at)',
      arabicTransliteration: 'مَاعِتْ',
      arabicMeaning: 'الحق / العدل / الصدق / النظام الكوني المتوازن',
      englishMeaning: 'Truth / Justice / Cosmic Order',
      gardinerCodes: ['U5', 'Aa11', 'D36', 'X1', 'C10'],
      grammaticalTypeAr: 'اسم مؤنث بريشة النعامة والميزان',
      pronunciationSound: 'مَاعِت، ركيزة الكون والعدالة'
    },
    wordB: {
      hieroglyphs: '𓇋𓊃𓆑𓏏𓅪',
      transliteration: 'jsf.t (isfet)',
      arabicTransliteration: 'إسْفِتْ',
      arabicMeaning: 'الباطل / الجور / الفوضى والظلم والشر',
      englishMeaning: 'Injustice / Chaos / Falsehood',
      gardinerCodes: ['M17', 'S29', 'I9', 'X1', 'G37'],
      grammaticalTypeAr: 'اسم مؤنث بمخصص الطائر السيئ',
      pronunciationSound: 'إسْفِت، الباطل والفوضى الهدامة'
    },
    philosophicalInsightAr: 'جوهر الفلسفة السياسية والدينية في مصر القديمة قائم على هذه الثنائية: واجب الفرعون والإنسان الفاضل هو إرساء «ماعت» وطرد ودحر «إسفت».',
    exampleSentence: {
      hieroglyphs: '𓂋𓂞 𓌳𓐙𓂝𓏏 𓅓 𓊨𓏏 𓇋𓊃𓆑𓏏',
      transliteration: 'rdj mꜣꜥ.t m s.t jsf.t',
      arabicPhonetics: 'رِدي مَاعِت إم سِت إسْفِت',
      arabicTranslation: 'وُضِعَ الحق والعدل في مكان الباطل والجور',
      englishTranslation: 'Truth is placed in the seat of injustice',
      grammarNoteAr: 'تعبير مصري كلاسيكي شهير في أدب الحكمة، حيث «s.t» تعني "مكان/عرش"، وتفيد الإحلال والانتصار الأخلاقي التام.'
    }
  },
  {
    id: 'ant_good_bad',
    themeAr: 'الخير والحسن في مواجهة الشر والقبح',
    themeEn: 'Goodness/Beauty vs Evil/Badness',
    category: 'moral',
    categoryAr: 'الأخلاق والنظام الكوني',
    wordA: {
      hieroglyphs: '𓄤𓆑𓂋',
      transliteration: 'nfr (nefer)',
      arabicTransliteration: 'نِفِرْ',
      arabicMeaning: 'خير / طيب / جميل ومكتمل',
      englishMeaning: 'Good / Beautiful / Perfect',
      gardinerCodes: ['F35', 'I9', 'D21'],
      grammaticalTypeAr: 'علامة ثلاثية تمثل القصبة الهوائية والقلب',
      pronunciationSound: 'نِفِر، الخير والجمال المكتمل'
    },
    wordB: {
      hieroglyphs: '𓃀𓇋𓈖𓅪',
      transliteration: 'bjn (bin)',
      arabicTransliteration: 'بِينْ',
      arabicMeaning: 'شر / سيئ / رديء ومؤذٍ',
      englishMeaning: 'Bad / Evil / Wretched',
      gardinerCodes: ['D58', 'M17', 'N35', 'G37'],
      grammaticalTypeAr: 'اسم وصفة بمخصص العصفور الصغير المريض',
      pronunciationSound: 'بِين، الشر والفساد'
    },
    philosophicalInsightAr: '«نفر» ليست مجرد جمال حسي بل تعبر عن الاكتمال الأخلاقي، بينما «بين» ترتبط بالمرض والنقص والأذى (رمز العصفور الضئيل المنبوذ G37).',
    exampleSentence: {
      hieroglyphs: '𓁹 𓄤 𓐍𓋴𓆑 𓃀𓇋𓈖',
      transliteration: 'jrj nfr ḫsf bjn',
      arabicPhonetics: 'إيري نِفِر خِسف بِين',
      arabicTranslation: 'اصنع الخير واقمع الشر',
      englishTranslation: 'Do good and repel evil',
      grammarNoteAr: 'صيغتا أمر متتاليتان: «jrj» (افعل/اصنع) مع المفعول «nfr» (الخير)، ثم «ḫsf» (ادفع/اطرد) مع المفعول «bjn» (الشر).'
    }
  },
  {
    id: 'ant_sky_earth',
    themeAr: 'السماء في مواجهة الأرض',
    themeEn: 'Sky/Heaven vs Earth/Land',
    category: 'cosmic',
    categoryAr: 'الكون والطبيعة',
    wordA: {
      hieroglyphs: '𓊪𓏏𓇯',
      transliteration: 'p.t (pet)',
      arabicTransliteration: 'بِتْ',
      arabicMeaning: 'سماء / قبة الفلك العليا',
      englishMeaning: 'Sky / Heaven',
      gardinerCodes: ['Q3', 'X1', 'N1'],
      grammaticalTypeAr: 'اسم مؤنث بمخصص قبة السماء المعلقة',
      pronunciationSound: 'بِت، السماء العالية'
    },
    wordB: {
      hieroglyphs: '𓇿𓈅',
      transliteration: 'tꜣ (ta)',
      arabicTransliteration: 'تَا',
      arabicMeaning: 'أرض / تربة / القطر الدنيوي',
      englishMeaning: 'Earth / Ground / Land',
      gardinerCodes: ['N16', 'N23'],
      grammaticalTypeAr: 'اسم مذكر يمثل شريط الأرض وحبات الرمل',
      pronunciationSound: 'تَا، الأرض والتراب'
    },
    philosophicalInsightAr: 'السماء والأرض هما تجلي الربين "نوت" (إلهة الفضاء المرصعة بالنجوم) و"جب" (إله الأرض)، ويفصل بينهما الهواء "شو" في مشهد كوني مهيب.',
    exampleSentence: {
      hieroglyphs: '𓇳 𓎟 𓊪𓏏 𓅃 𓎟 𓇿',
      transliteration: 'rꜥ nb p.t ḥr.w nb tꜣ',
      arabicPhonetics: 'رَعْ نِبْ بِت، حُور نِبْ تَا',
      arabicTranslation: 'رع رب السماء، وحورس سيد الأرض',
      englishTranslation: 'Ra is Lord of the sky, Horus is Lord of the earth',
      grammarNoteAr: 'جملتان اسميتان متوازيتان للإضافة الشرفية: «nb p.t» (رب السماء)، و«nb tꜣ» (رب الأرض).'
    }
  },
  {
    id: 'ant_great_small',
    themeAr: 'الكبير والعظيم في مواجهة الصغير والضئيل',
    themeEn: 'Great/Noble vs Small/Humble',
    category: 'physical',
    categoryAr: 'الأحجام والأوصاف',
    wordA: {
      hieroglyphs: '𓅨𓂋',
      transliteration: 'wr (wer)',
      arabicTransliteration: 'وِرْ',
      arabicMeaning: 'كبير / عظيم / ذو مكانة وشأن',
      englishMeaning: 'Great / Elder / Chief',
      gardinerCodes: ['G36', 'D21'],
      grammaticalTypeAr: 'صفة واسم تفضيل بطائر السنونو العظيم',
      pronunciationSound: 'وِر، العظيم صاحب الجلالة'
    },
    wordB: {
      hieroglyphs: '𓈙𓂋𓇋𓅪',
      transliteration: 'šrj (sheri)',
      arabicTransliteration: 'شِري',
      arabicMeaning: 'صغير / قليل / شاب صغير السن',
      englishMeaning: 'Small / Little / Child',
      gardinerCodes: ['N37', 'D21', 'M17', 'G37'],
      grammaticalTypeAr: 'صفة واسم للصغار والفتيان',
      pronunciationSound: 'شِري، الصغير والطفل'
    },
    philosophicalInsightAr: 'أدب الحكمة المصري القديم (مثل تعاليم بتاح حتب) يوصي الحكيم بأن يعامل الكبير والشريف بتوقير، وألا يحتقر الصغير أو الفقير لأن الحكمة لا حد لها.',
    exampleSentence: {
      hieroglyphs: '𓄔 𓈖 𓅨 𓈖 𓈙𓂋𓇋',
      transliteration: 'sḏm n wr n šrj',
      arabicPhonetics: 'سِجِمْ إنْ وِرْ إنْ شِري',
      arabicTranslation: 'استمع إلى الكبير وإلى الصغير على حد سواء',
      englishTranslation: 'Listen to the great and to the small alike',
      grammarNoteAr: 'الفعل «sḏm» (استمع) متعد بحرف الجر اللامي «n» للدلالة على شمول الإنصات والتواضع.'
    }
  },
  {
    id: 'ant_day_night',
    themeAr: 'النهار والوضوح في مواجهة الليل والسكون',
    themeEn: 'Daytime vs Nighttime',
    category: 'cosmic',
    categoryAr: 'الكون والطبيعة',
    wordA: {
      hieroglyphs: '𓉔𓂋𓅱𓇳',
      transliteration: 'hrw (heru)',
      arabicTransliteration: 'هِرُو',
      arabicMeaning: 'نهار / يوم مضيء بساعات الشمس',
      englishMeaning: 'Day / Daytime',
      gardinerCodes: ['O4', 'D21', 'G43', 'N5'],
      grammaticalTypeAr: 'اسم مذكر بمخصص قرص الشمس المضيء',
      pronunciationSound: 'هِرُو، ساعات النهار الساطعة'
    },
    wordB: {
      hieroglyphs: '𓎼𓂋𓎛𓇰',
      transliteration: 'grḥ (gereh)',
      arabicTransliteration: 'جِرِحْ',
      arabicMeaning: 'ليل / هجيع وسكون معتم',
      englishMeaning: 'Night / Nightfall',
      gardinerCodes: ['W11', 'D21', 'V28', 'N2'],
      grammaticalTypeAr: 'اسم مذكر بمخصص السماء المعتمة',
      pronunciationSound: 'جِرِحْ، الليل وسكون الظلام'
    },
    philosophicalInsightAr: 'قسم المصريون اليوم إلى 24 ساعة (12 للنهار و12 لليل)، واعتبروا رحلة الشمس الليلية في العالم السفلي رحلة تجدد روحي عظمى.',
    exampleSentence: {
      hieroglyphs: '𓅓 𓉔𓂋𓅱 𓂋 𓎼𓂋𓎛',
      transliteration: 'm hrw r grḥ',
      arabicPhonetics: 'إم هِرُو إر جِرِحْ',
      arabicTranslation: 'من النهار إلى الليل (ليلاً ونهاراً دون انقطاع)',
      englishTranslation: 'From day unto night (day and night continuously)',
      grammarNoteAr: 'تعبير زمني اصطلاحي مركب من حرفي الجر «m» (من/في) و«r» (إلى)، يفيد الاستمرار الدائم للعمل أو العبادة.'
    }
  },
  {
    id: 'ant_strong_weak',
    themeAr: 'القوة والمنعة في مواجهة الضعف والوهن',
    themeEn: 'Strong/Mighty vs Weak/Feeble',
    category: 'state',
    categoryAr: 'القوة والحالات الإنسانية',
    wordA: {
      hieroglyphs: '𓈖𓐍𓏏𓀜',
      transliteration: 'nḫt (nakht)',
      arabicTransliteration: 'نَخْتْ',
      arabicMeaning: 'قوي / منيع / بطل منتصر وشجاع',
      englishMeaning: 'Strong / Victorious / Champion',
      gardinerCodes: ['N35', 'Aa1', 'X1', 'A24'],
      grammaticalTypeAr: 'صفة واسم بمخصص الذراع والصولجان',
      pronunciationSound: 'نَخْتْ، القوي الشجاع المنيع'
    },
    wordB: {
      hieroglyphs: '𓃀𓂧𓈙𓅪',
      transliteration: 'bdš (bedesh)',
      arabicTransliteration: 'بَدِشْ',
      arabicMeaning: 'ضعيف / خائر القوى / واهن وعاجز',
      englishMeaning: 'Weak / Feeble / Despairing',
      gardinerCodes: ['D58', 'D46', 'N37', 'G37'],
      grammaticalTypeAr: 'صفة وحال بمخصص النقص والضعف',
      pronunciationSound: 'بَدِشْ، الواهن العاجز'
    },
    philosophicalInsightAr: '«نخت» هو لقب الفراعنة الأبطال والجنود الشجعان، في حين أن «بدش» تعبر عن انهيار العزيمة والضعف أمام هيبة الحق والنظام.',
    exampleSentence: {
      hieroglyphs: '𓈖𓐍𓏏 𓂝𓏭 𓃀𓂧𓈙 𓐍𓆑𓏏𓏭',
      transliteration: 'nḫt ꜥ.wj bdš ḫft.jw',
      arabicPhonetics: 'نَخْتْ عَاوي، بَدِشْ خِفْتِيو',
      arabicTranslation: 'قوي الساعدين، وعاجزون هم الأعداء',
      englishTranslation: 'Mighty of arms, enfeebled are the adversaries',
      grammarNoteAr: 'جملة وصفية شائعة في المراسيم الملكية؛ «ꜥ.wj» صيغة مثنى لكلمة ذراع، و«ḫft.jw» جمع تكسير لكلمة عدو.'
    }
  },
  {
    id: 'ant_first_last',
    themeAr: 'الأول والبدء في مواجهة الآخر والنهاية',
    themeEn: 'First/Beginning vs Last/End',
    category: 'state',
    categoryAr: 'الترتيب والأزمان',
    wordA: {
      hieroglyphs: '𓄂𓏏𓏤',
      transliteration: 'ḥꜣ.t (hat)',
      arabicTransliteration: 'حَاتْ',
      arabicMeaning: 'أول / بداية / طليعة ومقدمة الشيء',
      englishMeaning: 'Beginning / Front / Foremost',
      gardinerCodes: ['F4', 'X1', 'Z1'],
      grammaticalTypeAr: 'اسم مؤنث يمثل مقدمة الأسد الرابض',
      pronunciationSound: 'حَاتْ، البداية والمقدمة، جذر مشترك مع حاتحوت'
    },
    wordB: {
      hieroglyphs: '𓄖𓅱𓏭',
      transliteration: 'pḥ.wj (pehui)',
      arabicTransliteration: 'بِحْوِي',
      arabicMeaning: 'نهاية / مؤخرة / الخاتمة والعاقبة',
      englishMeaning: 'End / Rear / Final conclusion',
      gardinerCodes: ['F22', 'G43', 'Z4'],
      grammaticalTypeAr: 'اسم ومثنى يمثل مؤخرة السنوريات',
      pronunciationSound: 'بِحْوِي، الخاتمة والنهاية'
    },
    philosophicalInsightAr: 'استخدم الكاتب المصري مقدمة الأسد 𓄂 للبداية، وعجزه 𓄖 للنهاية، في تجسيد تصويري رائع لدورة الحياة والأحداث من الرأس إلى الذيل.',
    exampleSentence: {
      hieroglyphs: '𓅓 𓄂𓏏 𓂋 𓄖𓅱𓏭',
      transliteration: 'm ḥꜣ.t r pḥ.wj',
      arabicPhonetics: 'إم حَاتْ إر بِحْوِي',
      arabicTranslation: 'من البداية إلى الخاتمة (بتمامه وكماله)',
      englishTranslation: 'From the beginning unto the end',
      grammarNoteAr: 'تعبير استهلالي وختامي يوضع في نهايات البرديات الأدبية مثل قصة الملاح الغريق وحكاية سنوحي.'
    }
  },
  {
    id: 'ant_hot_cold',
    themeAr: 'الحار والساخن في مواجهة البارد والمنعش',
    themeEn: 'Hot/Burning vs Cool/Refreshing',
    category: 'physical',
    categoryAr: 'الأحجام والأوصاف',
    wordA: {
      hieroglyphs: '𓏏𓄿𓊮',
      transliteration: 'tꜣ (ta)',
      arabicTransliteration: 'تَا / تَاو',
      arabicMeaning: 'حار / ساخن / لهيب ملتهب',
      englishMeaning: 'Hot / Burning / Flame heat',
      gardinerCodes: ['X1', 'G1', 'Q7'],
      grammaticalTypeAr: 'اسم وصفة بمخصص شعلة النار الملتهبة',
      pronunciationSound: 'تَا، الحرارة واللهب الساخن'
    },
    wordB: {
      hieroglyphs: '𓏘𓃀𓎛𓈗',
      transliteration: 'qbḥ (qebeh)',
      arabicTransliteration: 'قِبْحْ',
      arabicMeaning: 'بارد / رطب / ماء عذب منعش ومطهر',
      englishMeaning: 'Cool / Refreshing / Pure water',
      gardinerCodes: ['W15', 'D58', 'V28', 'N35A'],
      grammaticalTypeAr: 'اسم وصفة بإناء السكب وقطرات الماء',
      pronunciationSound: 'قِبْحْ، الماء البارد المنعش'
    },
    philosophicalInsightAr: 'في بيئة مصر الصحراوية المشمسة، كانت البرودة «قبح» مرادفاً للراحة والقداسة والارتواء، ومنها اشتق اسم إلهة التطهير المائي "قبحوت".',
    exampleSentence: {
      hieroglyphs: '𓏘𓃀𓎛 𓈗 𓏏𓄿 𓊮',
      transliteration: 'qbḥ mw tꜣ ḫt',
      arabicPhonetics: 'قِبْحْ مُو، تَا خِتْ',
      arabicTranslation: 'باردٌ ومنعش هو الماء، ومشتعلةٌ وحارة هي النار',
      englishTranslation: 'Cool is the water, burning is the fire',
      grammarNoteAr: 'جملتان وصفيتان تقابليتان؛ الصفة تتقدم الموصوف «qbḥ mw» (بارد الماء) و«tꜣ ḫt» (حارة النار).'
    }
  },
  {
    id: 'ant_ascend_descend',
    themeAr: 'الصعود والارتقاء في مواجهة الهبوط والنزول',
    themeEn: 'Ascend/Rise vs Descend/Fall',
    category: 'actions',
    categoryAr: 'الأفعال والحركة',
    wordA: {
      hieroglyphs: '𓉐𓂋𓇋𓂻',
      transliteration: 'prj (peri)',
      arabicTransliteration: 'بِري',
      arabicMeaning: 'يصعد / يخرج / ينبثق ويرتفع',
      englishMeaning: 'To go up / To emerge / To ascend',
      gardinerCodes: ['O1', 'D21', 'M17', 'D54'],
      grammaticalTypeAr: 'فعل حركة بمخصص الأقدام المتحركة',
      pronunciationSound: 'بِري، الصعود والخروج للنور'
    },
    wordB: {
      hieroglyphs: '𓉔𓄿𓇋𓂻',
      transliteration: 'hꜣj (hay)',
      arabicTransliteration: 'هَاي',
      arabicMeaning: 'يهبط / ينزل / يتدلى لأسفل',
      englishMeaning: 'To descend / To go down / To fall',
      gardinerCodes: ['O4', 'G1', 'M17', 'D54'],
      grammaticalTypeAr: 'فعل حركة بمخصص الساقين في اتجاه النزول',
      pronunciationSound: 'هَاي، الهبوط والانحدار'
    },
    philosophicalInsightAr: 'عنوان كتاب الموتى الحقيقي هو «برت إم هرو» 𓉐𓂋𓏏𓅓𓉔𓂋𓅱 أي "الخروج والصعود إلى ضياء النهار"، فالصعود مرادف للخلود.',
    exampleSentence: {
      hieroglyphs: '𓉐𓂋 𓂋 𓊪𓏏 𓉔𓄿 𓂋 𓇿',
      transliteration: 'prj r p.t hꜣj r tꜣ',
      arabicPhonetics: 'بِري إر بِت، هَاي إر تَا',
      arabicTranslation: 'صعوداً إلى رحاب السماء، وهبوطاً إلى ثرى الأرض',
      englishTranslation: 'Ascending unto the sky, descending unto the earth',
      grammarNoteAr: 'صيغة مصدرية تدل على حرية الروح (البا) في التنقل بين العالم السماوي وقبر المتوفى على الأرض.'
    }
  },
  {
    id: 'ant_open_close',
    themeAr: 'الفتح في مواجهة الإغلاق والختم',
    themeEn: 'Open/Unveil vs Close/Seal',
    category: 'actions',
    categoryAr: 'الأفعال والحركة',
    wordA: {
      hieroglyphs: '𓃹𓈖𓉐',
      transliteration: 'wn (wen)',
      arabicTransliteration: 'وِنْ',
      arabicMeaning: 'يفتح / يشرع الأبواب / يكشف الستار',
      englishMeaning: 'To open / To reveal',
      gardinerCodes: ['E34', 'N35', 'O1'],
      grammaticalTypeAr: 'فعل متعد بمخصص البيت والمداخل',
      pronunciationSound: 'وِنْ، فتح الأبواب والستائر'
    },
    wordB: {
      hieroglyphs: '𓐍𓏏𓅓𓋩',
      transliteration: 'ḫtm (khetem)',
      arabicTransliteration: 'خِتِمْ',
      arabicMeaning: 'يغلق / يختم بالخاتم والصلصال',
      englishMeaning: 'To close / To seal with a ring',
      gardinerCodes: ['Aa1', 'X1', 'G17', 'S20'],
      grammaticalTypeAr: 'فعل واسم بخاتم الحبل والخرطوش',
      pronunciationSound: 'خِتِمْ، إغلاق الباب وختمه، أصل مشترك مع ختم'
    },
    philosophicalInsightAr: 'طقس فتح قدس الأقداس في المعبد فجراً كان يسمى «ون-عاوي» (فتح المصراعين) لرؤية المعبود، وعند الغروب يختم الكاهن الباب بصلصال طري وختم ملكي «ختم».',
    exampleSentence: {
      hieroglyphs: '𓃹𓈖 𓉻𓏭 𓐍𓏏𓅓 𓋴𓃀𓄿',
      transliteration: 'wn ꜥꜣ.wj ḫtm sbꜣ',
      arabicPhonetics: 'وِنْ عَاوي، خِتِمْ سَبَا',
      arabicTranslation: 'يُفتَح المصراعان، ويُغلَق ويُختَم الباب',
      englishTranslation: 'The two doors are opened, the portal is sealed',
      grammarNoteAr: '«ꜥꜣ.wj» مثنى لمصراعي الباب الخشبي الضخم، و«sbꜣ» بوابة المعبد المحروسة.'
    }
  }
];
