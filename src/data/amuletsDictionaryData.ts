export type AmuletCategory = 'protection' | 'rebirth' | 'eternity';

export interface MagicAmuletEntry {
  id: string;
  accessionNumber: string;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  imageAltAr: string;
  hieroglyph: string;
  fullWordHieroglyphs: string;
  gardinerCode: string;
  transliteration: string;
  pronunciationAr: string;
  category: AmuletCategory;
  categoryAr: string;
  materialAr: string;
  colorSymbolismAr: string;
  hieroglyphicMeaningAr: string;
  linguisticFunctionAr: string;
  historicalSymbolismAr: string;
  placementAndRitualAr: string;
  bookOfTheDeadRefAr: string;
  sampleInscription: {
    hieroglyphs: string;
    transliteration: string;
    phoneticAr: string;
    translationAr: string;
  };
  audioScriptAr: string;
}

export const MAGIC_AMULETS_DICTIONARY: MagicAmuletEntry[] = [
  {
    id: 'amulet-ankh',
    accessionNumber: 'AMU.EG.01',
    nameAr: 'تميمة «عنخ» (مفتاح الحياة الأبدية)',
    nameEn: 'Ankh — Key of Eternal Life',
    imageUrl: '/src/assets/images/amulet_ankh_life_1794671259320.jpg',
    imageAltAr: 'تميمة عنخ مصرية قديمة من الذهب المطروق والفيروز التركوازي',
    hieroglyph: '𓋹',
    fullWordHieroglyphs: '𓋹 𓈖 𓐍',
    gardinerCode: 'S34',
    transliteration: 'ꜥnḫ',
    pronunciationAr: 'عَنخ',
    category: 'eternity',
    categoryAr: 'الخلود والثبات',
    materialAr: 'الذهب الإلكتروني والفيروز التركوازي',
    colorSymbolismAr: 'الذهب يرمز إلى لحم الآلهة الخالد، والتركواز إلى بهجة النور والحياة المتجددة.',
    hieroglyphicMeaningAr:
      'تمثل في اللغة الهيروغليفية كلمة «الحياة» وفعل «يحيا»، كما تُعد علامة ثلاثية الأصوات تُقرأ (ع-ن-خ) وتُستتبع غالباً بالمتممين الصوتيين النون (𓈖) والخاء (𓐍).',
    linguisticFunctionAr:
      'علامة ثلاثية الأصوات (Triliteral Phonogram: ꜥ-n-ḫ) وإيديوغرام مباشر لكلمة الحياة والنَفَس والعيش.',
    historicalSymbolismAr:
      'تُعد أعظم رمز للوجود المستمر في الحضارة المصرية؛ في المشاهد الجدارية يمد الآلهة تميمة العنخ نحو أنف الملك ليمنحوه نَفَس الخلود، كما ارتبطت بنهر النيل الذي يجلب الحياة لوادي مصر.',
    placementAndRitualAr:
      'تُصنع على هيئة مرايا ومباخر وتمائم تُعلّق على الصدر لحفظ الحيوية في الدنيا والآخرة.',
    bookOfTheDeadRefAr: 'متكررة في صلوات الإحياء الملكية وفصول النجاة لرد نَفَس الحياة للروح.',
    sampleInscription: {
      hieroglyphs: '𓂞 𓋹 𓈖 𓊃',
      transliteration: 'dj.j ꜥnḫ n s',
      phoneticAr: 'دي إي عنخ إن إس',
      translationAr: '«أمنح الحياة الأبدية للمرء المبارك.»'
    },
    audioScriptAr:
      'تميمة عنخ، وتُنطق عَنخ بكسرٍ خفيف أو فتح العين الساكنة. كود جاردنر S34، وهي الرمز الهيروغليفي الأسمى للحياة والنفس الخالد.'
  },
  {
    id: 'amulet-wedjat',
    accessionNumber: 'AMU.EG.02',
    nameAr: 'تميمة «أوجات» (عين حورس السليمة)',
    nameEn: 'Wedjat — Eye of Horus',
    imageUrl: '/src/assets/images/amulet_wedjat_eye_1794671259910.jpg',
    imageAltAr: 'تميمة عين حورس أوجات منحوتة من اللازورد الأزرق بإطار ذهبي',
    hieroglyph: '𓂀',
    fullWordHieroglyphs: '𓅱 𓆓 𓄿 𓏏 𓂀',
    gardinerCode: 'D10',
    transliteration: 'wḏꜣt',
    pronunciationAr: 'أُوجات / وَجات',
    category: 'protection',
    categoryAr: 'الحماية والشفاء',
    materialAr: 'حجر اللازورد الملكي والذهب المشغول',
    colorSymbolismAr: 'زرقة اللازورد الداكنة تعكس سماء الليل الحامية والقدسية السماوية.',
    hieroglyphicMeaningAr:
      'تُشتق من الجذر (و-ج-أ / wḏꜣ) الذي يعني «السليم، المعافى، الكامل». وهي في اللغة الهيروغليفية رمز للشفاء واكتمال الجسد والوقاية من الشرور.',
    linguisticFunctionAr:
      'إيديوغرام ومحدد تصنيفي (Determinative) في كلمات السلامة والعافية، كما استُخدمت أجزاء العين الستة في الكتابة الرياضية لتدوين كسور الحبوب (1/2 إلى 1/64).',
    historicalSymbolismAr:
      'تستمد قدسيتها من أسطورة الصراع بين حورس وست، حيث استعاد تحوت عين حورس المجروحة وأعاد لها اكتمالها؛ فصارت التميمة الواقية الأولى للملوك وعامة الناس والبحارة على مقدمة السفن.',
    placementAndRitualAr:
      'توضع فوق شق التحنيط في الجانب الأيسر من الجسد لالتئام الجرح سحرياً، وتُلبس كقلادة للحماية اليومية.',
    bookOfTheDeadRefAr: 'الفصل 167 من كتاب الموتى — تعويذة إحضار عين أوجات السليمة.',
    sampleInscription: {
      hieroglyphs: '𓅱𓆓𓄿 𓁷𓂋 𓂀',
      transliteration: 'wḏꜣ ḥr wḏꜣt',
      phoneticAr: 'أُوجا حور أُوجات',
      translationAr: '«لتكن عين حورس السليمة درع عافية واكتمال.»'
    },
    audioScriptAr:
      'تميمة أوجات، أي عين حورس السليمة المعافاة، كود جاردنر D10. اسمها مشتق من الجذر المصري أوجا بمعنى السلامة والشفاء التام.'
  },
  {
    id: 'amulet-scarab',
    accessionNumber: 'AMU.EG.03',
    nameAr: 'تميمة «خِبري» (جعران القلب والتحول)',
    nameEn: 'Heart Scarab — Khepri',
    imageUrl: '/src/assets/images/amulet_scarab_khepri_1794671261287.jpg',
    imageAltAr: 'تميمة جعران القلب منحوتة من حجر البازلت الأخضر الداكن بسلك ذهبي',
    hieroglyph: '𓆣',
    fullWordHieroglyphs: '𓆣 𓂋 𓇳',
    gardinerCode: 'L1',
    transliteration: 'ḫpr / ḫprj',
    pronunciationAr: 'خِبر / خِبري',
    category: 'rebirth',
    categoryAr: 'البعث والتجدد',
    materialAr: 'البازلت الأخضر والسربنتين بإطار ذهبي',
    colorSymbolismAr: 'اللون الأخضر الصخري يجمع بين صلابة الأبدية وخضرة البعث والنمو.',
    hieroglyphicMeaningAr:
      'يعبر الرمز الثلاثي (𓆣) عن الفعل المحوري «خِبر» أي «يتشكل، يصير، يخلق، ينبعث من جديد». ومنه صيغت أسماء ملوك مثل «خفرع» و«توت عنخ آمون (نب خبرو رع)».',
    linguisticFunctionAr:
      'علامة ثلاثية الأصوات (Triliteral: ḫ-p-r) تدل على التحول الوجودي والخلق الذاتي المستمر.',
    historicalSymbolismAr:
      'شبه المصريون دفع خنفساء الجعران لكرة الطين بدفع الإله «خبري» لقرص شمس الفجر عبر الأفق؛ فأصبح الجعران برهاناً حياً على التجدد اليومي والبعث بعد الموت.',
    placementAndRitualAr:
      'يُنقش على قاعدته المسطحة نص التعويذة 30B ويُوضع مباشرة فوق قلب المومياء لمنع القلب من الشهادة ضد صاحبه.',
    bookOfTheDeadRefAr: 'الفصل 30B من كتاب الموتى — تعويذة جعران القلب أمام ميزان ماعت.',
    sampleInscription: {
      hieroglyphs: '𓆣 𓂋 𓅓 𓇳',
      transliteration: 'ḫpr m rꜥ',
      phoneticAr: 'خِبر إم رَع',
      translationAr: '«يتحول وينبعث متجدداً مثل شمس الفجر رع.»'
    },
    audioScriptAr:
      'تميمة الجعران خِبري، كود جاردنر L1. تُقرأ خِبر وتعني التحول والتكوّن والانبعاث المتجدد مع كل فجر.'
  },
  {
    id: 'amulet-djed',
    accessionNumber: 'AMU.EG.04',
    nameAr: 'تميمة «عمود الجِد» (الاستقرار والثبات)',
    nameEn: 'Djed Pillar — Stability & Osiris',
    imageUrl: '/src/assets/images/amulet_djed_pillar_1794671260991.jpg',
    imageAltAr: 'تميمة عمود الجد من الفيانس الأزرق السماوي المطعم بالذهب',
    hieroglyph: '𓊽',
    fullWordHieroglyphs: '𓊽 𓂧',
    gardinerCode: 'R11',
    transliteration: 'ḏd',
    pronunciationAr: 'جِد / دْجِد',
    category: 'eternity',
    categoryAr: 'الخلود والثبات',
    materialAr: 'الفيانس المزجج الأزرق وأشرطة الذهب',
    colorSymbolismAr: 'الأزرق الفيروزي المطعم بالذهب يرمز لاستقرار السماء ودوام الملك والعمود الفقري.',
    hieroglyphicMeaningAr:
      'علامة ثنائية الصوت (ḏ-d) تُقرأ «جِد»، وتدل في اللغة المصرية على معاني «الثبات، الدوام، الصلابة، الاستقرار»، وتسبقها أو تتبعها الدال (𓂧) كمتمم صوتي.',
    linguisticFunctionAr:
      'علامة ثنائية الأصوات (Biliteral: ḏd) وإيديوغرام للاستقرار الأبدي، وترد كثيراً في الصيغ الختامية: «عنخ، أوجا، سنب — حياة، عافية، ثبات».',
    historicalSymbolismAr:
      'يمثل رمزياً العمود الفقري للإله أوزيريس أو حزمة سيقان قصب مشدودة في أربعة طوابق. كان «طقس إقامة عمود الجد» احتفالاً ملكياً كبيراً يؤكد ثبات الدولة والنظام الكوني.',
    placementAndRitualAr:
      'تُرصّ تحت العمود الفقري للمومياء أو تُعلّق في الرقبة لتثبيت فقرات الجسد وبعثه منتصباً.',
    bookOfTheDeadRefAr: 'الفصل 155 من كتاب الموتى — تعويذة عمود الجد الذهبي في رقبة المبجل.',
    sampleInscription: {
      hieroglyphs: '𓊽 𓂧 𓆓 𓏏',
      transliteration: 'ḏd ḏt',
      phoneticAr: 'جِد جِت',
      translationAr: '«ثباتٌ ودوامٌ راسخ إلى أبد الآبدين.»'
    },
    audioScriptAr:
      'تميمة عمود الجِد، وتنطق جِد، كود جاردنر R11. ترمز إلى العمود الفقري لأوزيريس وإلى الثبات والرسوخ الأبدي.'
  },
  {
    id: 'amulet-tyet',
    accessionNumber: 'AMU.EG.05',
    nameAr: 'تميمة «تِيِت» (عقدة إيزيس الحمراء)',
    nameEn: 'Tyet — Knot of Isis',
    imageUrl: '/src/assets/images/amulet_tyet_isis_1794671261318.jpg',
    imageAltAr: 'تميمة عقدة إيزيس تيت منحوتة من حجر العقيق الأحمر المصقول',
    hieroglyph: '𓋿',
    fullWordHieroglyphs: '𓏏 𓇋 𓏏 𓋿',
    gardinerCode: 'V39',
    transliteration: 'tjt',
    pronunciationAr: 'تِيِت',
    category: 'protection',
    categoryAr: 'الحماية والشفاء',
    materialAr: 'العقيق الأحمر الشفاف واليشب الأحمر',
    colorSymbolismAr: 'الأحمر القاني في العقيق يرمز لقوة الحياة ودم الحماية الأمومية لإيزيس.',
    hieroglyphicMeaningAr:
      'تُقرأ في الهيروغليفية «تِيِت»، وترتبط لغوياً بفكرة «الربط، الحفظ، السند والحماية»، وتشبه في تصميمها عقدة حزام ثوب إيزيس المقدس وعلامة عنخ بذراعين متدليتين.',
    linguisticFunctionAr:
      'إيديوغرام ومحدد تصنيفي خاص بعقدة إيزيس، ويظهر في النقوش الجدارية كرفيق موازٍ لعمود الجد (𓊽) ليمثلا معاً تكامل القوة الذكرية والأنثوية.',
    historicalSymbolismAr:
      'تُعرف بـ «عقدة إيزيس» ورمز رعايتها السحرية؛ إذ تحيط الروح بحصن من الحماية من أي قوى ظلامية عند بوابات العالم الآخر، وتشترط نصوص البردي نحتها من حجر أحمر صلب.',
    placementAndRitualAr:
      'تُنحت من العقيق الأحمر وتُربط بخيط الجميز حول عنق المومياء مع تلاوة التعويذة 156.',
    bookOfTheDeadRefAr: 'الفصل 156 من كتاب الموتى — تعويذة عقدة تيت من العقيق الأحمر.',
    sampleInscription: {
      hieroglyphs: '𓊃 𓄿 𓏏 𓋿 𓊨𓏏',
      transliteration: 'zꜣt tjt ꜣst',
      phoneticAr: 'زات تِيِت آسِت',
      translationAr: '«حماية عقدة تيت التي وهبتها إيزيس الحانية.»'
    },
    audioScriptAr:
      'تميمة تِيِت أو عقدة إيزيس، كود جاردنر V39. تُنحت تقليدياً من العقيق الأحمر لمنح الروح الحماية الأمومية الكاملة.'
  },
  {
    id: 'amulet-wadj',
    accessionNumber: 'AMU.EG.06',
    nameAr: 'تميمة «واج» (ساق البردي والنماء الأخضر)',
    nameEn: 'Wadj — Papyrus Column of Renewal',
    imageUrl: '/src/assets/images/amulet_wadj_papyrus_1794671262205.jpg',
    imageAltAr: 'تميمة عمود البردي الأخضر واج منحوتة من حجر الفيلدسبار الأمازوني الأخضر',
    hieroglyph: '𓇅',
    fullWordHieroglyphs: '𓅱 𓄿 𓆓 𓇅',
    gardinerCode: 'M13',
    transliteration: 'wꜣḏ',
    pronunciationAr: 'وَاج / أُوج',
    category: 'rebirth',
    categoryAr: 'البعث والتجدد',
    materialAr: 'حجر الأمازونيت الأخضر (الفيلدسبار)',
    colorSymbolismAr: 'الخضرة النضرة للأمازونيت تحاكي اخضرار الدلتا وشباب الروح الدائم.',
    hieroglyphicMeaningAr:
      'تُقرأ «واج» وتعني حرفياً في المصرية القديمة «أخضر، نضر، مزدهر، فتي، متعافٍ». وتُستخدم للتعبير عن اللون الأخضر والخصوبة والازدهار.',
    linguisticFunctionAr:
      'علامة ثلاثية الأصوات (Triliteral: w-ꜣ-ḏ) وإيديوغرام للنماء والاخضرار، وبها سمي وجه مصر البحري (أرض البردي) و«الاخضرار الكبير» (البحر المتوسط).',
    historicalSymbolismAr:
      'يمثل نبات البردي الذي ينمو في مستنقعات الدلتا بشموخ دائم، وارتبط بالإلهة «واجيت» حامية الشمال؛ حملته النساء كرمز للشباب المتجدد، ووُضع مع الموتى كي تظل أجسادهم نضرة لا تذبل.',
    placementAndRitualAr:
      'تُعلق حول الحلق أو الصدر وتُرافق بتعويذة ازدهار البردي في الفصول 159 و160 من كتاب الموتى.',
    bookOfTheDeadRefAr: 'الفصلان 159 و160 من كتاب الموتى — تعويذة عمود البردي من الفيلدسبار الأخضر.',
    sampleInscription: {
      hieroglyphs: '𓇅 𓆓 𓎛 𓂝 𓅱',
      transliteration: 'wꜣḏ ḥꜥw',
      phoneticAr: 'واج حَعو',
      translationAr: '«ليزدهر الجسد بنضارة الشباب المتجدد.»'
    },
    audioScriptAr:
      'تميمة وَاج، وهي عمود البردي الأخضر، كود جاردنر M13. تعني في الهيروغليفية النضارة والاخضرار والتجدد الدائم.'
  }
];
