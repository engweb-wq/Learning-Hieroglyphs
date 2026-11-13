import { HieroglyphSign, MultiLiteralSign } from '../types';

export const UNILITERAL_HIEROGLYPHS: HieroglyphSign[] = [
  {
    id: 'a1',
    char: '𓄿',
    gardiner: 'G1',
    arabicLetter: 'أ',
    arabicSound: 'ألف (همزة خفيفة / آ)',
    transliteration: 'ꜣ (Alef)',
    meaningAr: 'عقاب مصري (طائر الرخمة)',
    meaningEn: 'Egyptian Vulture',
    category: 'birds',
    categoryAr: 'طيور',
    kidMnemonicAr: 'طائر العقاب بجناحيه يطير، وينطق مثل الألف عند الهدير!',
    kidFunFact: 'طائر الرخمة كان مقدساً ورمزاً للأمومة والحماية عند الفراعنة.',
    detailsAdultAr: 'حرف أحادي يمثل الوقف الحنجري (Glottal Stop) ويقابله في السامية الألف، رمزه جاردنر G1.',
    soundPronunciation: 'ألف'
  },
  {
    id: 'i1',
    char: '𓇋',
    gardiner: 'M17',
    arabicLetter: 'ي',
    arabicSound: 'ياء / إي',
    transliteration: 'j / i (Yod)',
    meaningAr: 'ورقة زهرة الغاب (القصب)',
    meaningEn: 'Flowering Reed',
    category: 'nature',
    categoryAr: 'نباتات وطبيعة',
    kidMnemonicAr: 'ورقة بردي خضراء نضرة، صوتها الياء كقطرة مطر!',
    kidFunFact: 'كان المصريون يقطعون قصب البردي لصنع أوراق الكتابة والأقلام.',
    detailsAdultAr: 'حرف صامت شبه علة (Palatal Approximant) يطابق الياء العربية، جاردنر M17.',
    soundPronunciation: 'ياء'
  },
  {
    id: 'a2',
    char: '𓂝',
    gardiner: 'D36',
    arabicLetter: 'ع',
    arabicSound: 'عين',
    transliteration: 'ꜥ (Ayin)',
    meaningAr: 'الذراع والساعد الممتد',
    meaningEn: 'Forearm',
    category: 'body',
    categoryAr: 'أجزاء الجسم',
    kidMnemonicAr: 'ذراع قوية تصنع الخير، وصوتها عين ناصعة كالنور!',
    kidFunFact: 'استخدم الفراعنة الذراع كوحدة لقياس المسافات تسمى (المحر أو الذراع الملكي).',
    detailsAdultAr: 'حرف حلقي احتكاكي مجهور صريح يطابق تماماً حرف العين في اللغة العربية، جاردنر D36.',
    soundPronunciation: 'عين'
  },
  {
    id: 'w1',
    char: '𓅱',
    gardiner: 'G43',
    arabicLetter: 'و',
    arabicSound: 'واو',
    transliteration: 'w (Waw)',
    meaningAr: 'فرخ السمان (كتكوت السمان)',
    meaningEn: 'Quail Chick',
    category: 'birds',
    categoryAr: 'طيور',
    kidMnemonicAr: 'كتكوت السمان الصغير يزقزق واو واو!',
    kidFunFact: 'كتاكيت السمان كانت توجد بكثرة في حقول القمح المصرية القديمة.',
    detailsAdultAr: 'حرف شفوي شمعي نصف صامت يطابق الواو العربية، جاردنر G43.',
    soundPronunciation: 'واو'
  },
  {
    id: 'b1',
    char: '𓃀',
    gardiner: 'D58',
    arabicLetter: 'ب',
    arabicSound: 'باء',
    transliteration: 'b',
    meaningAr: 'القدم والساق',
    meaningEn: 'Foot and Leg',
    category: 'body',
    categoryAr: 'أجزاء الجسم',
    kidMnemonicAr: 'قدم تمشي خطوة بخطوة، وصوتها باء تفتح الباب!',
    kidFunFact: 'تمثل القدم الحركة والسعي، ومنها كلمات الذهاب والوصول.',
    detailsAdultAr: 'صامت انفجاري شفوي مجهور يطابق الباء العربية بدقة، جاردنر D58.',
    soundPronunciation: 'باء'
  },
  {
    id: 'p1',
    char: '𓊪',
    gardiner: 'Q3',
    arabicLetter: 'پ',
    arabicSound: 'پاء (P ثقيلة)',
    transliteration: 'p',
    meaningAr: 'حصير من البردي أو كرسي',
    meaningEn: 'Reed Stool / Mat',
    category: 'tools',
    categoryAr: 'أدوات وأثاث',
    kidMnemonicAr: 'كرسي أو حصير نجلس عليه، وصوته پاء ناعمة كالهواء!',
    kidFunFact: 'المقاعد الخشبية والحصائر كانت من أساسيات البيت المصري القديم.',
    detailsAdultAr: 'صامت انفجاري شفوي مهموس (p)، جاردنر Q3.',
    soundPronunciation: 'پاء'
  },
  {
    id: 'f1',
    char: '𓆑',
    gardiner: 'I9',
    arabicLetter: 'ف',
    arabicSound: 'فاء',
    transliteration: 'f',
    meaningAr: 'الأفعى ذات القرنين (حية الطريشة)',
    meaningEn: 'Horned Viper',
    category: 'animals',
    categoryAr: 'حيوانات وزواحف',
    kidMnemonicAr: 'حية رملية لطيفة في الرسم، تنطق فاء كالفراشة!',
    kidFunFact: 'حية المقرنة كانت ترسم في النصوص الدينية أحياناً مقطوعة الرأس لحماية القارئ من لدغتها سحرياً!',
    detailsAdultAr: 'صامت احتكاكي أسناني شفوي مهموس يطابق الفاء العربية، وهو ضمير الغائب المذكر (هو / له)، جاردنر I9.',
    soundPronunciation: 'فاء'
  },
  {
    id: 'm1',
    char: '𓅓',
    gardiner: 'G17',
    arabicLetter: 'م',
    arabicSound: 'ميم',
    transliteration: 'm',
    meaningAr: 'البومة الحكيمة',
    meaningEn: 'Owl',
    category: 'birds',
    categoryAr: 'طيور',
    kidMnemonicAr: 'بومة جميلة تسهر في الليل، صوتها ميم نقي وعميق!',
    kidFunFact: 'البومة هي الرمز الوحيد بين الطيور الذي يرسم وجهه للأمام بكامل عينيه، بينما باقي الطيور ترسم جانبياً.',
    detailsAdultAr: 'صامت أنفي شفوي مجهور يطابق الميم العربية، ويعني أيضاً حرف الجر "في" أو "بواسطة"، جاردنر G17.',
    soundPronunciation: 'ميم'
  },
  {
    id: 'n1',
    char: '𓈖',
    gardiner: 'N35',
    arabicLetter: 'ن',
    arabicSound: 'نون',
    transliteration: 'n',
    meaningAr: 'تموجات مياه نهر النيل',
    meaningEn: 'Water Ripple',
    category: 'nature',
    categoryAr: 'نباتات وطبيعة',
    kidMnemonicAr: 'موجة ماء تجري وتغني، وصوتها نون مثل النهر!',
    kidFunFact: 'نهر النيل كان شريان الحياة في مصر القديمة وسماه الفراعنة "إيترو عا" (النهر العظيم).',
    detailsAdultAr: 'صامت أنفي لثوي مجهور يطابق النون، ويعني أيضاً حرف الجر "لـِ" للملكية أو الاتجاه، جاردنر N35.',
    soundPronunciation: 'نون'
  },
  {
    id: 'r1',
    char: '𓂋',
    gardiner: 'D21',
    arabicLetter: 'ر',
    arabicSound: 'راء',
    transliteration: 'r',
    meaningAr: 'الفم المفتوح',
    meaningEn: 'Mouth',
    category: 'body',
    categoryAr: 'أجزاء الجسم',
    kidMnemonicAr: 'فم مبتسم يحكي حكاية، وصوته راء كالرعد الرنان!',
    kidFunFact: 'كلمة الفم بالمصرية القديمة هي "رَ" (ra) وهي نفس الكلمة التي تعني أيضاً جزء وكسر رياضي!',
    detailsAdultAr: 'صامت تكراري لثوي مجهور يطابق الراء العربية، جاردنر D21.',
    soundPronunciation: 'راء'
  },
  {
    id: 'h1',
    char: '𓉔',
    gardiner: 'O4',
    arabicLetter: 'هـ',
    arabicSound: 'هاء',
    transliteration: 'h',
    meaningAr: 'فناء أو باحة المنزل المغلقة',
    meaningEn: 'Reed Shelter / Courtyard',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'بيت صغير له فناء واسع، وصوته هاء كنسيم الصباح!',
    kidFunFact: 'بيوت الفراعنة كانت تصمم بفناء داخلي يحمي من حرارة شمس الصحراء.',
    detailsAdultAr: 'صامت احتكاكي حنجري مهموس يطابق الهاء العربية تماماً، جاردنر O4.',
    soundPronunciation: 'هاء'
  },
  {
    id: 'h2',
    char: '𓎛',
    gardiner: 'V28',
    arabicLetter: 'ح',
    arabicSound: 'حاء',
    transliteration: 'ḥ (Heth)',
    meaningAr: 'ضفيرة أو حبل من الكتان المفتول',
    meaningEn: 'Twisted Flax Wick',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'حبل كتان مشدود بقوة، صوته حاء دافئة كالحب!',
    kidFunFact: 'الكتان المصري القديم كان أشهر أقمشة العالم لنعومته وجمال لونه الأبيض.',
    detailsAdultAr: 'صامت احتكاكي حلقي مهموس يطابق الحاء العربية الفصحى، جاردنر V28.',
    soundPronunciation: 'حاء'
  },
  {
    id: 'kh1',
    char: '𓐍',
    gardiner: 'Aa1',
    arabicLetter: 'خ',
    arabicSound: 'خاء',
    transliteration: 'ḫ (Kha)',
    meaningAr: 'المشيمة أو مصفاة الأعشاب المنقوشة',
    meaningEn: 'Placenta / Sieve',
    category: 'symbols',
    categoryAr: 'رموز وعلوم',
    kidMnemonicAr: 'دائرة مخططة كالمصفاة، وصوتها خاء مثل خبز شهي!',
    kidFunFact: 'رمز جاردنر Aa1 يمثل المشيمة دليلاً على الولادة والتجدد والبدايات.',
    detailsAdultAr: 'صامت احتكاكي طبقي خلفي مهموس يطابق الخاء العربية، جاردنر Aa1.',
    soundPronunciation: 'خاء'
  },
  {
    id: 'kh2',
    char: '𓄡',
    gardiner: 'F32',
    arabicLetter: 'خـ',
    arabicSound: 'خاء مرققة / حبل حلقي',
    transliteration: 'ẖ',
    meaningAr: 'بطن حيوان وذيل ممتد',
    meaningEn: 'Belly of Mammal with Teats',
    category: 'animals',
    categoryAr: 'حيوانات وزواحف',
    kidMnemonicAr: 'بطن حيوان مع ذيله الرشيق، ينطق خاء ناعمة!',
    kidFunFact: 'استخدم هذا الرمز للتعبير عن بطن الشيء أو داخله (ẖt).',
    detailsAdultAr: 'صامت احتكاكي حنكي مهموس يماثل نطق ich-Laut في الألمانية، جاردنر F32.',
    soundPronunciation: 'خاء'
  },
  {
    id: 's1',
    char: '𓊃',
    gardiner: 'O34',
    arabicLetter: 'ز / س',
    arabicSound: 'زاي / سين (ترباس)',
    transliteration: 'z / s',
    meaningAr: 'ترباس أو مزلاج الباب الخشبي',
    meaningEn: 'Door Bolt',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'ترباس قوي يقفل الباب بأمان، صوته زاي أو سين!',
    kidFunFact: 'الأبواب المصرية القديمة كانت تقفل بمزلاج خشبي محكم مزين برؤوس أسود.',
    detailsAdultAr: 'صامت احتكاكي أسناني مجهور تحول لاحقاً للسين في الدولة الوسطى والحديثة، جاردنر O34.',
    soundPronunciation: 'زاي'
  },
  {
    id: 's2',
    char: '𓋴',
    gardiner: 'S29',
    arabicLetter: 'س',
    arabicSound: 'سين',
    transliteration: 's',
    meaningAr: 'قطعة قماش مطوية',
    meaningEn: 'Folded Cloth',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'ثوب مطوي بعناية وأناقة، صوته سين كالسحاب!',
    kidFunFact: 'الملابس الملكية كانت تصنع من أرق وأرقى أنواع الكتان المطوي ببراعة.',
    detailsAdultAr: 'صامت صفيري لثوي مهموس يطابق السين، جاردنر S29.',
    soundPronunciation: 'سين'
  },
  {
    id: 'sh1',
    char: '𓈙',
    gardiner: 'N37',
    arabicLetter: 'ش',
    arabicSound: 'شين',
    transliteration: 'š (Shin)',
    meaningAr: 'بركة أو حوض ماء مستطيل',
    meaningEn: 'Water Pool',
    category: 'nature',
    categoryAr: 'نباتات وطبيعة',
    kidMnemonicAr: 'بركة ماء صافية تسبح فيها الأسماك، صوتها شين كالشمس المشرقة!',
    kidFunFact: 'حدائق الفراعنة كانت تتوسطها دائماً برك مستطيلة تزهر فيها زهور اللوتس العطرة.',
    detailsAdultAr: 'صامت احتكاكي غاري لثوي مهموس يطابق الشين في العربية والساميات، جاردنر N37.',
    soundPronunciation: 'شين'
  },
  {
    id: 'q1',
    char: '𓈎',
    gardiner: 'N29',
    arabicLetter: 'ق',
    arabicSound: 'قاف',
    transliteration: 'q / ḳ (Qaf)',
    meaningAr: 'منحدر التل أو الربوة الرملية',
    meaningEn: 'Hill-slope',
    category: 'nature',
    categoryAr: 'نباتات وطبيعة',
    kidMnemonicAr: 'تل رملي عالٍ نطل منه، صوته قاف قوية كالقلعة!',
    kidFunFact: 'التلال الرملية كانت تمثل التل الأزلي الذي نشأ منه الكون في أساطير خلق الفراعنة.',
    detailsAdultAr: 'صامت لهوي انفجاري مهموس يطابق القاف العربية الكلاسيكية، جاردنر N29.',
    soundPronunciation: 'قاف'
  },
  {
    id: 'k1',
    char: '𓎡',
    gardiner: 'V31',
    arabicLetter: 'ك',
    arabicSound: 'كاف',
    transliteration: 'k',
    meaningAr: 'سلة من الخوص بمقبض',
    meaningEn: 'Basket with Handle',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'سلة جميلة نجمع فيها التين والعنب، صوتها كاف!',
    kidFunFact: 'كانت تصنع السلال من سعف النخيل بنفس الطريقة المستخدمة في صعيد مصر والواحات حتى اليوم.',
    detailsAdultAr: 'صامت طبقي انفجاري مهموس، وهو أيضاً ضمير المخاطب المذكر (أنتَ / لَكَ)، جاردنر V31.',
    soundPronunciation: 'كاف'
  },
  {
    id: 'g1',
    char: '𓎼',
    gardiner: 'W11',
    arabicLetter: 'ج / ق',
    arabicSound: 'جيم قاهرية (G جيم صلبة)',
    transliteration: 'g',
    meaningAr: 'قاعدة أو مسند لجرار الماء الفخارية',
    meaningEn: 'Ring Stand for Jars',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'قاعدة فخارية تحفظ جرة العصير، صوتها جيم مصرية قوية!',
    kidFunFact: 'لأن قيعان الجرار الفخارية كانت دائرية أو مدببة، كانت توضع فوق هذا الحامل لتبقى ثابتة.',
    detailsAdultAr: 'صامت طبقي انفجاري مجهور (Hard G) كما في الجيم المصرية العامية، جاردنر W11.',
    soundPronunciation: 'جيم'
  },
  {
    id: 't1',
    char: '𓏏',
    gardiner: 'X1',
    arabicLetter: 'ت',
    arabicSound: 'تاء',
    transliteration: 't',
    meaningAr: 'رغيف خبز نصف دائري',
    meaningEn: 'Bread Loaf',
    category: 'food',
    categoryAr: 'طعام وأدوات',
    kidMnemonicAr: 'رغيف خبز طازج وشهي، صوته تاء مثل تفاحة!',
    kidFunFact: 'الخبز كان الطعام الأساسي للمصريين القدماء، والتاء في نهاية الكلمة علامة التأنيث تماماً كالعربية!',
    detailsAdultAr: 'صامت أسناني انفجاري مهموس يطابق التاء، وهو علامة التأنيث المؤكدة بالمصرية القديمة، جاردنر X1.',
    soundPronunciation: 'تاء'
  },
  {
    id: 'tch1',
    char: '𓍿',
    gardiner: 'V13',
    arabicLetter: 'تش / ث',
    arabicSound: 'تش / تاء مرققة (ث)',
    transliteration: 'ṯ (Tj)',
    meaningAr: 'حبل تقييد الحيوانات (عقال)',
    meaningEn: 'Tethering Rope',
    category: 'tools',
    categoryAr: 'عمارة وأدوات',
    kidMnemonicAr: 'حبل منسوج يلتف برقة، صوته تش أو ثاء كالثوب!',
    kidFunFact: 'كان الرعاة يستخدمون هذا الحبل المجدول لربط الماشية برفق في المراعي الخضراء.',
    detailsAdultAr: 'صامت حنكي أسناني، تحول لاحقاً للتاء في العصور المتأخرة، جاردنر V13.',
    soundPronunciation: 'تش'
  },
  {
    id: 'd1',
    char: '𓂧',
    gardiner: 'D46',
    arabicLetter: 'د',
    arabicSound: 'دال',
    transliteration: 'd',
    meaningAr: 'كف اليد الممدودة',
    meaningEn: 'Hand',
    category: 'body',
    categoryAr: 'أجزاء الجسم',
    kidMnemonicAr: 'كف يد مفتوح يسلم ويبارك، صوته دال!',
    kidFunFact: 'كف اليد كان يرمز للعطاء والفعل والكتابة عند الفراعنة.',
    detailsAdultAr: 'صامت أسناني انفجاري مجهور يطابق الدال العربية، جاردنر D46.',
    soundPronunciation: 'دال'
  },
  {
    id: 'dj1',
    char: '𓆓',
    gardiner: 'I10',
    arabicLetter: 'ج / ض',
    arabicSound: 'دج (جيم معطشة فصيحة)',
    transliteration: 'ḏ (Dj)',
    meaningAr: 'أفعى الكوبرا الملكية (الصل الفرعوني)',
    meaningEn: 'Uraeus / Cobra',
    category: 'animals',
    categoryAr: 'حيوانات وزواحف',
    kidMnemonicAr: 'كوبرا ملكية تحرس التاج، صوتها جيم معطشة جميلة!',
    kidFunFact: 'الكوبرا الملكية كانت تزين تيجان ملوك الفراعنة كرمز للحماية والمهابة الإلهية.',
    detailsAdultAr: 'صامت انفجاري احتكاكي مجهور (dʒ) وهو الجيم الفصيحة، مثل كلمة "جد" (ḏd) وتعني الثبات والخلود، جاردنر I10.',
    soundPronunciation: 'جيم معطشة'
  }
];

export const MULTI_LITERAL_SIGNS: MultiLiteralSign[] = [
  {
    id: 'ml1',
    char: '𓋹',
    gardiner: 'S34',
    type: 'triliteral',
    transliteration: 'ꜥnḫ (Ankh)',
    arabicSound: 'عنخ',
    meaningAr: 'الحياة والخلود (مفتاح الحياة)',
    usageExample: 'عنخ وِجا سنب (حياة، رخاء، صحة)',
    explanationAr: 'رمز ثلاثي الصوت شهير جداً يمثل سير الصندل أو مرآة ذات مقبض، ويرمز لسر الحياة والوجود.'
  },
  {
    id: 'ml2',
    char: '𓊵',
    gardiner: 'R4',
    type: 'triliteral',
    transliteration: 'ḥtp (Hotep)',
    arabicSound: 'حُتُب / حوتب',
    meaningAr: 'السلام، الرضا، القربان',
    usageExample: 'أمنحتب (آمون راضٍ)، إمحوتب (الذي أتى في سلام)',
    explanationAr: 'رغيف خبز فوق حصير القربان، ويعبر عن السلام والاطمئنان والسكينة.'
  },
  {
    id: 'ml3',
    char: '𓄤',
    gardiner: 'F35',
    type: 'triliteral',
    transliteration: 'nfr (Nefer)',
    arabicSound: 'نفر',
    meaningAr: 'الجمال، الكمال، الخير والسرور',
    usageExample: 'نفرتيتي (الجميلة أقبلت)، نفرتاري (أحلاهن)',
    explanationAr: 'رسم القصبة الهوائية والقلب، رمز الصحة والجمال والصفاء.'
  },
  {
    id: 'ml4',
    char: '𓇳',
    gardiner: 'N5',
    type: 'biliteral',
    transliteration: 'rꜥ (Ra)',
    arabicSound: 'رع',
    meaningAr: 'الشمس وإله الشمس ونهار اليوم',
    usageExample: 'رمسيس (رع هو الذي ولده)، حور محب',
    explanationAr: 'قرص الشمس مع نقطة في وسطه، وهو الرمز الأساسي للنور واليوم والشمس.'
  },
  {
    id: 'ml5',
    char: '𓌻',
    gardiner: 'U7',
    type: 'biliteral',
    transliteration: 'mr (Mer)',
    arabicSound: 'مِر',
    meaningAr: 'الحب والعشق والمحبوب',
    usageExample: 'مريت آمون (محبوبة آمون)، ميريت بتاح',
    explanationAr: 'فأس زراعية تقلب التربة للخصوبة، ترمز للحب والارتباط بالأرض.'
  },
  {
    id: 'ml6',
    char: '𓎟',
    gardiner: 'V30',
    type: 'biliteral',
    transliteration: 'nb (Neb)',
    arabicSound: 'نِب',
    meaningAr: 'سيد، مالك، أو "كل وجميع"',
    usageExample: 'نب تاوي (سيد الأرضين، لقب الفرعون)',
    explanationAr: 'سلة خوص منسوجة دائرية، تعبر عن السيادة والشمول.'
  },
  {
    id: 'ml7',
    char: '𓉐',
    gardiner: 'O1',
    type: 'biliteral',
    transliteration: 'pr (Per)',
    arabicSound: 'بِر / بير',
    meaningAr: 'بيت، منزل، أو القصر',
    usageExample: 'بر عا (البيت الكبير، ومنها كلمة فرعون!)',
    explanationAr: 'مخطط أرضي لبيت بجدران ومدخل مفتوح، وأصل كلمة فرعون المشتقة من "بر-عا" أي القصر العظيم.'
  },
  {
    id: 'ml8',
    char: '𓌢',
    gardiner: 'T22',
    type: 'biliteral',
    transliteration: 'sn (Sen)',
    arabicSound: 'سِن',
    meaningAr: 'أخ، رفيق، شقيق، اثنين',
    usageExample: 'سن-ن-موت (شقيق الإلهة موت)',
    explanationAr: 'نصل سهم من حجر الصوان، يرمز للثنائية والرفقة الأخوية.'
  }
];

export const DETERMINATIVES_LIST = [
  {
    char: '𓀀',
    gardiner: 'A1',
    meaningAr: 'رجل / مذكر / مهنة',
    exampleAr: 'يوضع بعد أسماء الرجال والكتّاب والجنود'
  },
  {
    char: '𓁐',
    gardiner: 'B1',
    meaningAr: 'امرأة / مؤنث / أمومة',
    exampleAr: 'يوضع بعد أسماء السيدات والملكات والمهن النسائية'
  },
  {
    char: '𓊹',
    gardiner: 'R8',
    meaningAr: 'إله / مقدس / معبد',
    exampleAr: 'راية المعبد تعني صفة القداسة والطقوس'
  },
  {
    char: '𓊖',
    gardiner: 'O49',
    meaningAr: 'مدينة / قرية / وطن',
    exampleAr: 'تقاطع طرق داخل بلدة مستديرة، يوضع بعد أسماء المدن كطيبة ومنف'
  },
  {
    char: '𓂻',
    gardiner: 'D54',
    meaningAr: 'حركة / مشي / قدوم',
    exampleAr: 'ساقان تمشيان للأمام، تدل على أفعال السفر والذهاب والرجوع'
  },
  {
    char: '𓀁',
    gardiner: 'A2',
    meaningAr: 'كلام / تفكير / أكل / شرب',
    exampleAr: 'رجل يضع يده على فمه، يوضع بعد أفعال الكلام والتمني والجوع'
  },
  {
    char: '𓈗',
    gardiner: 'N35A',
    meaningAr: 'ماء / سوائل / إبحار',
    exampleAr: 'ثلاثة تموجات ماء تخصص الكلمات المرتبطة بالنيل والشراب والأمطار'
  },
  {
    char: '𓆱',
    gardiner: 'M3',
    meaningAr: 'شجرة / خشب / نبات',
    exampleAr: 'غصن شجرة يوضع بعد أسماء الأخشاب والسفن المصنوعة من الخشب'
  }
];

// Helper to map Arabic letter to best matching Egyptian Hieroglyphic sign
export function getHieroglyphForArabicChar(arChar: string): HieroglyphSign | undefined {
  const norm = arChar.trim();
  if (!norm) return undefined;
  
  // Direct matches
  const match = UNILITERAL_HIEROGLYPHS.find(h => h.arabicLetter === norm || h.arabicLetter.includes(norm));
  if (match) return match;

  // Normalized phonetic fallback
  const map: Record<string, string> = {
    'ا': 'أ', 'إ': 'أ', 'آ': 'أ', 'ء': 'أ',
    'ى': 'ي', 'ئ': 'ي',
    'ة': 'ت',
    'ؤ': 'و',
    'ذ': 'ز',
    'ظ': 'ز',
    'ص': 'س',
    'ض': 'د',
    'ط': 'ت',
    'غ': 'خ',
    'لا': 'ر'
  };

  const mappedChar = map[norm] || norm;
  return UNILITERAL_HIEROGLYPHS.find(h => h.arabicLetter === mappedChar);
}

// Convert an Arabic name into an array of hieroglyphic signs for cartouches
export function convertNameToHieroglyphs(name: string): HieroglyphSign[] {
  const letters = name.replace(/\s+/g, '').split('');
  const result: HieroglyphSign[] = [];

  for (const letter of letters) {
    const glyph = getHieroglyphForArabicChar(letter);
    if (glyph) {
      result.push(glyph);
    }
  }

  return result;
}
