export interface GardnerSignInfo {
  code: string;
  char: string;
  transliteration: string;
  soundAr: string;
  meaningAr: string;
  meaningEn: string;
  categoryLetter: string;
  categoryNameAr: string;
  facingDirection: 'left' | 'right' | 'neutral';
  isAnimate: boolean; // Humans, birds, mammals, reptiles that establish reading direction
}

export interface GardnerSentenceChallenge {
  id: string;
  level: number;
  titleAr: string;
  themeAr: string;
  arabicMeaning: string;
  englishMeaning: string;
  targetGardinerCodes: string[]; // e.g. ['D36', 'N35', 'Aa1']
  targetGlyphs: string; // e.g. '𓂝𓈖𓐍'
  transliteration: string;
  phoneticReadingAr: string;
  correctReadingDirection: 'rtl' | 'ltr';
  historicalContextAr: string;
  pointsReward: number;
  hintAr: string;
}

export const GARDNER_CATEGORIES: { code: string; nameAr: string; nameEn: string; icon: string }[] = [
  { code: 'A', nameAr: 'الإنسان ووظائفه (رجال)', nameEn: 'Man and his occupations', icon: '𓀀' },
  { code: 'B', nameAr: 'المرأة والولادة', nameEn: 'Woman and her occupations', icon: '𓁐' },
  { code: 'C', nameAr: 'الآلهة بهيئة آدمية', nameEn: 'Anthropomorphic deities', icon: '𓁧' },
  { code: 'D', nameAr: 'أجزاء الجسد البشري', nameEn: 'Parts of the human body', icon: '𓂝' },
  { code: 'E', nameAr: 'الثدييات والحيوانات', nameEn: 'Mammals', icon: '𓃭' },
  { code: 'F', nameAr: 'أجزاء الثدييات', nameEn: 'Parts of mammals', icon: '𓄣' },
  { code: 'G', nameAr: 'الطيور المقدسة', nameEn: 'Birds', icon: '𓅃' },
  { code: 'H', nameAr: 'أجزاء الطيور', nameEn: 'Parts of birds', icon: '𓆇' },
  { code: 'I', nameAr: 'الزواحف والبرمائيات', nameEn: 'Amphibious animals and reptiles', icon: '𓆗' },
  { code: 'M', nameAr: 'الأشجار والنباتات والزهور', nameEn: 'Trees and plants', icon: '𓆸' },
  { code: 'N', nameAr: 'السماء والأرض والمياه', nameEn: 'Sky, earth, water', icon: '𓇳' },
  { code: 'O', nameAr: 'المباني وأجزاؤها', nameEn: 'Buildings and parts of buildings', icon: '𓉐' },
  { code: 'R', nameAr: 'أثاث المعابد والقرابين', nameEn: 'Temple furniture and sacred emblems', icon: '𓊵' },
  { code: 'S', nameAr: 'التيجان والملابس والشارات', nameEn: 'Crowns, dress, staves', icon: '𓋹' },
  { code: 'U', nameAr: 'الزراعة والحرف والصيد', nameEn: 'Agriculture and crafts', icon: '𓌻' },
  { code: 'V', nameAr: 'الحبال والألياف والسلال', nameEn: 'Rope, fiber, baskets', icon: '𓍑' },
  { code: 'W', nameAr: 'الأواني الفخارية والحجرية', nameEn: 'Vessels of stone and earthenware', icon: '𓎼' },
  { code: 'X', nameAr: 'أرغفة الخبز والكعك', nameEn: 'Loaves and cakes', icon: '𓏏' },
  { code: 'Y', nameAr: 'الكتابة والألعاب والموسيقى', nameEn: 'Writings, games, music', icon: '𓏞' },
  { code: 'Z', nameAr: 'الخطوط والأشكال الهندسية', nameEn: 'Strokes and geometrical figures', icon: '𓏤' },
  { code: 'Aa', nameAr: 'علامات غير مصنفة', nameEn: 'Unclassified signs', icon: '𓐍' },
];

export const CORE_GARDNER_SIGNS: Record<string, GardnerSignInfo> = {
  // A: Humans
  'A1': { code: 'A1', char: '𓀀', transliteration: 's / z', soundAr: 'س / إنسان', meaningAr: 'رجل جالس (مخصص للرجل والإنسان والضمير أنا)', meaningEn: 'Seated man', categoryLetter: 'A', categoryNameAr: 'الإنسان', facingDirection: 'left', isAnimate: true },
  'A2': { code: 'A2', char: '𓀁', transliteration: 'wnm / swr', soundAr: 'ونم / سور', meaningAr: 'رجل يضع يده على فمه (الأكل والشرب والتفكير)', meaningEn: 'Man with hand to mouth', categoryLetter: 'A', categoryNameAr: 'الإنسان', facingDirection: 'left', isAnimate: true },
  'A40': { code: 'A40', char: '𓀭', transliteration: 'nṯr', soundAr: 'نِتِر', meaningAr: 'إله جالس (مخصص للمعبودات والملوك)', meaningEn: 'Seated god', categoryLetter: 'A', categoryNameAr: 'الإنسان', facingDirection: 'left', isAnimate: true },

  // D: Body
  'D21': { code: 'D21', char: '𓂋', transliteration: 'r', soundAr: 'رَ / راء', meaningAr: 'الفم المفتوح (صوت الراء، وحرف الجر نحو/إلى)', meaningEn: 'Mouth', categoryLetter: 'D', categoryNameAr: 'أجزاء الجسد', facingDirection: 'neutral', isAnimate: false },
  'D36': { code: 'D36', char: '𓂝', transliteration: 'ꜥ', soundAr: 'عَ / عين', meaningAr: 'الساعد البشري الممتد (صوت العين)', meaningEn: 'Forearm', categoryLetter: 'D', categoryNameAr: 'أجزاء الجسد', facingDirection: 'left', isAnimate: true },
  'D46': { code: 'D46', char: '𓂧', transliteration: 'd', soundAr: 'دَ / دال', meaningAr: 'اليد البشرية (صوت الدال)', meaningEn: 'Hand', categoryLetter: 'D', categoryNameAr: 'أجزاء الجسد', facingDirection: 'left', isAnimate: true },
  'D58': { code: 'D58', char: '𓃀', transliteration: 'b', soundAr: 'بَ / باء', meaningAr: 'القدم والساق (صوت الباء، والحركة)', meaningEn: 'Foot', categoryLetter: 'D', categoryNameAr: 'أجزاء الجسد', facingDirection: 'left', isAnimate: true },

  // E: Mammals
  'E1': { code: 'E1', char: '𓃾', transliteration: 'kꜣ', soundAr: 'كا', meaningAr: 'الثور (رمز القوة والوفرة والقرابين)', meaningEn: 'Bull', categoryLetter: 'E', categoryNameAr: 'الثدييات', facingDirection: 'left', isAnimate: true },
  'E22': { code: 'E22', char: '𓃭', transliteration: 'mꜣj / rw', soundAr: 'ماي / رو', meaningAr: 'الأسد الرابض (رمز الشجاعة والأفق)', meaningEn: 'Lion', categoryLetter: 'E', categoryNameAr: 'الثدييات', facingDirection: 'left', isAnimate: true },

  // G: Birds
  'G1': { code: 'G1', char: '𓄿', transliteration: 'ꜣ', soundAr: 'آ / ألف', meaningAr: 'عقاب الرخمة المصري (صوت الألف الحنجرية)', meaningEn: 'Egyptian Vulture', categoryLetter: 'G', categoryNameAr: 'الطيور', facingDirection: 'left', isAnimate: true },
  'G5': { code: 'G5', char: '𓅃', transliteration: 'Ḥr', soundAr: 'حور / حورس', meaningAr: 'الصقر حورس الملكي (رمز السيادة والفرعون)', meaningEn: 'Falcon', categoryLetter: 'G', categoryNameAr: 'الطيور', facingDirection: 'left', isAnimate: true },
  'G17': { code: 'G17', char: '𓅓', transliteration: 'm', soundAr: 'مَ / ميم', meaningAr: 'البومة المصرية (صوت الميم، وحرف الجر في)', meaningEn: 'Owl', categoryLetter: 'G', categoryNameAr: 'الطيور', facingDirection: 'left', isAnimate: true },
  'G26': { code: 'G26', char: '𓅝', transliteration: 'Ḏḥwtj', soundAr: 'تحوت', meaningAr: 'طائر أبو منجل المقدس (رمز الحكمة والكتابة)', meaningEn: 'Ibis', categoryLetter: 'G', categoryNameAr: 'الطيور', facingDirection: 'left', isAnimate: true },
  'G43': { code: 'G43', char: '𓅱', transliteration: 'w', soundAr: 'وَ / واو', meaningAr: 'فرخ السمان الصغير (صوت الواو)', meaningEn: 'Quail Chick', categoryLetter: 'G', categoryNameAr: 'الطيور', facingDirection: 'left', isAnimate: true },

  // I: Reptiles
  'I9': { code: 'I9', char: '𓆑', transliteration: 'f', soundAr: 'فَ / فاء', meaningAr: 'أفعى الطريشة المقرنة (صوت الفاء، وضمير هو)', meaningEn: 'Horned Viper', categoryLetter: 'I', categoryNameAr: 'الزواحف', facingDirection: 'left', isAnimate: true },
  'I10': { code: 'I10', char: '𓆓', transliteration: 'ḏ', soundAr: 'جَ / دج', meaningAr: 'الكوبرا الملكية (صوت الجيم المعطشة)', meaningEn: 'Cobra', categoryLetter: 'I', categoryNameAr: 'الزواحف', facingDirection: 'left', isAnimate: true },

  // M: Plants
  'M17': { code: 'M17', char: '𓇋', transliteration: 'j', soundAr: 'إي / ياء', meaningAr: 'ورقة زهرة القصب (صوت الياء أو الألف)', meaningEn: 'Flowering Reed', categoryLetter: 'M', categoryNameAr: 'النباتات', facingDirection: 'neutral', isAnimate: false },
  'M23': { code: 'M23', char: '𓇓', transliteration: 'nsw / swt', soundAr: 'نسو / سوت', meaningAr: 'نبات الحلفا الصعيدي (رمز ملك الصعيد)', meaningEn: 'Sedge plant', categoryLetter: 'M', categoryNameAr: 'النباتات', facingDirection: 'neutral', isAnimate: false },

  // N: Sky & Earth
  'N1': { code: 'N1', char: '𓇯', transliteration: 'pt', soundAr: 'بِت', meaningAr: 'قبة السماء المرصعة بالنجوم', meaningEn: 'Sky', categoryLetter: 'N', categoryNameAr: 'السماء والأرض', facingDirection: 'neutral', isAnimate: false },
  'N5': { code: 'N5', char: '𓇳', transliteration: 'Rꜥ / hrw', soundAr: 'رَع / هرو', meaningAr: 'قرص الشمس المشع (رمز النور واليوم ورع)', meaningEn: 'Sun disc', categoryLetter: 'N', categoryNameAr: 'السماء والأرض', facingDirection: 'neutral', isAnimate: false },
  'N16': { code: 'N16', char: '𓈅', transliteration: 'tꜣ', soundAr: 'تا', meaningAr: 'شريط الأرض والوطن مع حبات الرمل', meaningEn: 'Land with grains', categoryLetter: 'N', categoryNameAr: 'السماء والأرض', facingDirection: 'neutral', isAnimate: false },
  'N35': { code: 'N35', char: '𓈖', transliteration: 'n', soundAr: 'نَ / نون', meaningAr: 'تموجات ماء النيل (صوت النون، ولـِ)', meaningEn: 'Water ripple', categoryLetter: 'N', categoryNameAr: 'السماء والأرض', facingDirection: 'neutral', isAnimate: false },

  // O: Buildings
  'O1': { code: 'O1', char: '𓉐', transliteration: 'pr', soundAr: 'بِر', meaningAr: 'مخطط البيت والمعبد (بر-عنخ، بر-عا / فرعون)', meaningEn: 'House plan', categoryLetter: 'O', categoryNameAr: 'المباني', facingDirection: 'neutral', isAnimate: false },
  'O4': { code: 'O4', char: '𓉔', transliteration: 'h', soundAr: 'هَ / هاء', meaningAr: 'باحة المنزل أو مأوى القصب (صوت الهاء)', meaningEn: 'Reed shelter', categoryLetter: 'O', categoryNameAr: 'المباني', facingDirection: 'neutral', isAnimate: false },
  'O29': { code: 'O29', char: '𓉻', transliteration: 'ꜥꜣ', soundAr: 'عا', meaningAr: 'عمود خشبي ضخم (رمز العظمة والكبر)', meaningEn: 'Great column', categoryLetter: 'O', categoryNameAr: 'المباني', facingDirection: 'neutral', isAnimate: false },
  'O34': { code: 'O34', char: '𓊃', transliteration: 'z / s', soundAr: 'سَ / زاي', meaningAr: 'مزلاج الباب الخشبي المقفل (صوت السين)', meaningEn: 'Door bolt', categoryLetter: 'O', categoryNameAr: 'المباني', facingDirection: 'neutral', isAnimate: false },

  // R: Offerings
  'R4': { code: 'R4', char: '𓊵', transliteration: 'ḥtp', soundAr: 'حُتِب', meaningAr: 'رغيف على حصير البردي (رمز السلام والرضا والقربان)', meaningEn: 'Loaf on mat', categoryLetter: 'R', categoryNameAr: 'القرابين', facingDirection: 'neutral', isAnimate: false },
  'R8': { code: 'R8', char: '𓊹', transliteration: 'nṯr', soundAr: 'نِتِر', meaningAr: 'راية المعبد المقفلة بالقماش (رمز الإله والمقدس)', meaningEn: 'Cloth-wrapped pole', categoryLetter: 'R', categoryNameAr: 'القرابين', facingDirection: 'neutral', isAnimate: false },

  // S: Crowns & Regalia
  'S29': { code: 'S29', char: '𓋴', transliteration: 's', soundAr: 'سَ / سين', meaningAr: 'قطعة القماش الكتاني المطوي (صوت السين)', meaningEn: 'Folded cloth', categoryLetter: 'S', categoryNameAr: 'الملابس والتيجان', facingDirection: 'neutral', isAnimate: false },
  'S34': { code: 'S34', char: '𓋹', transliteration: 'ꜥnḫ', soundAr: 'عَنْخ', meaningAr: 'مفتاح الحياة والأبدية (رباط الصندل الملكي)', meaningEn: 'Ankh, Life', categoryLetter: 'S', categoryNameAr: 'الملابس والتيجان', facingDirection: 'neutral', isAnimate: false },
  'S42': { code: 'S42', char: '𓌂', transliteration: 'sḫm', soundAr: 'سِخِم', meaningAr: 'صولجان السلطة والقوة العظمى', meaningEn: 'Sekhem scepter', categoryLetter: 'S', categoryNameAr: 'الملابس والتيجان', facingDirection: 'neutral', isAnimate: false },

  // U: Agriculture & Crafts
  'U7': { code: 'U7', char: '𓌻', transliteration: 'mr', soundAr: 'مِر', meaningAr: 'فأس حراثة الأرض (رمز المحبة والود والعمل)', meaningEn: 'Hoe', categoryLetter: 'U', categoryNameAr: 'الزراعة والحرف', facingDirection: 'neutral', isAnimate: false },

  // V: Ropes & Baskets
  'V13': { code: 'V13', char: '𓍿', transliteration: 'ṯ', soundAr: 'ثَ / تش', meaningAr: 'عقال حبل ربط الماشية (صوت الثاء أو تش)', meaningEn: 'Tethering rope', categoryLetter: 'V', categoryNameAr: 'الحبال والألياف', facingDirection: 'neutral', isAnimate: false },
  'V28': { code: 'V28', char: '𓎛', transliteration: 'ḥ', soundAr: 'حَ / حاء', meaningAr: 'فتيل الكتان المضفور الملتف (صوت الحاء)', meaningEn: 'Twisted wick', categoryLetter: 'V', categoryNameAr: 'الحبال والألياف', facingDirection: 'neutral', isAnimate: false },
  'V30': { code: 'V30', char: '𓎟', transliteration: 'nb', soundAr: 'نِب', meaningAr: 'سلة الخوص العريضة (رمز السيادة، وتعني رب أو كل)', meaningEn: 'Basket, All, Lord', categoryLetter: 'V', categoryNameAr: 'الحبال والألياف', facingDirection: 'neutral', isAnimate: false },
  'V31': { code: 'V31', char: '𓎡', transliteration: 'k', soundAr: 'كَ / كاف', meaningAr: 'سلة الخوص ذات المقبض (صوت الكاف، وضمير أنت)', meaningEn: 'Basket with handle', categoryLetter: 'V', categoryNameAr: 'الحبال والألياف', facingDirection: 'left', isAnimate: false },

  // W: Vessels
  'W11': { code: 'W11', char: '𓎼', transliteration: 'g', soundAr: 'گَ / جيم', meaningAr: 'حامل الجرة الفخارية (صوت الجيم المصرية)', meaningEn: 'Jar stand', categoryLetter: 'W', categoryNameAr: 'الأواني', facingDirection: 'neutral', isAnimate: false },

  // X: Bread
  'X1': { code: 'X1', char: '𓏏', transliteration: 't', soundAr: 'تَ / تاء', meaningAr: 'رغيف الخبز المستدير (صوت التاء وعلامة التأنيث)', meaningEn: 'Bread loaf', categoryLetter: 'X', categoryNameAr: 'الخبز', facingDirection: 'neutral', isAnimate: false },
  'X8': { code: 'X8', char: '𓏙', transliteration: 'dj / rḏj', soundAr: 'دي / ردي', meaningAr: 'رغيف يقدم باليدين (رمز العطاء والهبة)', meaningEn: 'Giving loaf', categoryLetter: 'X', categoryNameAr: 'الخبز', facingDirection: 'left', isAnimate: true },

  // Y: Writings
  'Y3': { code: 'Y3', char: '𓏞', transliteration: 'sš', soundAr: 'سِش', meaningAr: 'محبرة الكاتب مع قلم البوص ووعاء الماء (رمز الكاتب والكتابة)', meaningEn: 'Scribe palette', categoryLetter: 'Y', categoryNameAr: 'الكتابة', facingDirection: 'neutral', isAnimate: false },

  // Z: Strokes
  'Z1': { code: 'Z1', char: '𓏤', transliteration: '1', soundAr: 'علامة فردية', meaningAr: 'شرطة عمودية (تفيد أن الرمز السابق يقرأ كمعنى حقيقي بذاته)', meaningEn: 'Stroke ideogram', categoryLetter: 'Z', categoryNameAr: 'الخطوط', facingDirection: 'neutral', isAnimate: false },
  'Z2': { code: 'Z2', char: '𓏥', transliteration: 'pl.', soundAr: 'ثلاث شرطات جمع', meaningAr: 'ثلاث شرطات رأسية دالة على الجمع', meaningEn: 'Plural strokes', categoryLetter: 'Z', categoryNameAr: 'الخطوط', facingDirection: 'neutral', isAnimate: false },

  // Aa: Unclassified
  'Aa1': { code: 'Aa1', char: '𓐍', transliteration: 'ḫ', soundAr: 'خَ / خاء', meaningAr: 'المشيمة أو كيس الجنين والولادة (صوت الخاء)', meaningEn: 'Placenta / Sieve', categoryLetter: 'Aa', categoryNameAr: 'غير مصنفة', facingDirection: 'neutral', isAnimate: false },
};

export const GARDNER_SENTENCE_CHALLENGES: GardnerSentenceChallenge[] = [
  {
    id: 'chall-ankh-wedja-seneb',
    level: 1,
    titleAr: 'التحية الملكية الثلاثية (عنخ وِجا سِنِب)',
    themeAr: 'صيغ البركة والدعاء الملكي',
    arabicMeaning: 'حياة، نضارة وصحة، وعافية مستدامة (التحية الرسمية لملوك وفراعنة مصر)',
    englishMeaning: 'Life, Prosperity, and Health (Ankh-Wedja-Seneb)',
    targetGardinerCodes: ['S34', 'G43', 'D46', 'G1', 'O34', 'N35', 'D58'],
    targetGlyphs: '𓋹 𓅱 𓂧 𓄿 𓊃 𓈖 𓃀',
    transliteration: 'ꜥnḫ wḏꜣ snb',
    phoneticReadingAr: 'عَنْخ - وِجَا - سِنِب',
    correctReadingDirection: 'rtl',
    historicalContextAr: 'أشهر صيغة دعاء في تاريخ مصر، كانت تختم بها الرسائل والقرارات الملكية متمنية للملك تمام العافية.',
    pointsReward: 50,
    hintAr: 'ابدأ بمفتاح الحياة (S34)، ثم فرخ السمان (G43) واليد (D46) والرخمة (G1)، واختم بسنب بمزلاج الباب (O34).'
  },
  {
    id: 'chall-ra-lord-of-sky',
    level: 2,
    titleAr: 'رع رب السماء (رَع نِب پِت)',
    themeAr: 'صفات وألقاب المعبودات الكونية',
    arabicMeaning: 'رع هو سيد السماء ونور الآفاق',
    englishMeaning: 'Ra, Lord of the Sky',
    targetGardinerCodes: ['D21', 'D36', 'N5', 'V30', 'N1'],
    targetGlyphs: '𓂋 𓂝 𓇳 𓎟 𓇯',
    transliteration: 'Rꜥ nb pt',
    phoneticReadingAr: 'رَع - نِب - پِت',
    correctReadingDirection: 'rtl',
    historicalContextAr: 'لقب مكرس لإله الشمس رع منقوش على أعتاب معابد الدولة الحديثة في الكرنك وهليوبوليس.',
    pointsReward: 60,
    hintAr: 'اكتب رع بالفم (D21) والساعد (D36) وقرص الشمس (N5)، ثم رب بالسلة (V30)، والسماء بقبتها (N1).'
  },
  {
    id: 'chall-hotep-di-nesu',
    level: 3,
    titleAr: 'صيغة القربان الملكي (حُتِب دِي نِسوت)',
    themeAr: 'النصوص الجنائزية والأبدية',
    arabicMeaning: 'قربان يهبه الملك لأوزيريس وأنوبيس ليعطي روح المتوفى كل خير وطعام',
    englishMeaning: 'An offering that the King gives',
    targetGardinerCodes: ['M23', 'X1', 'R4', 'X8'],
    targetGlyphs: '𓇓 𓏏 𓊵 𓏙',
    transliteration: 'ḥtp-dj-nsw',
    phoneticReadingAr: 'حُتِب - دِي - نِسوت (مع التقديم التشريفي)',
    correctReadingDirection: 'rtl',
    historicalContextAr: 'الافتتاحية الجنائزية الإلزامية على جميع لوحات المقابر المصرية منذ عصر بناة الأهرام وحتى العصر الروماني.',
    pointsReward: 70,
    hintAr: 'طبق التقديم التشريفي: نبات السوت (M23) ورغيف التاء (X1) للملك أولاً، ثم حتب (R4) وهبة العطاء (X8).'
  },
  {
    id: 'chall-ink-sesh-iqer',
    level: 4,
    titleAr: 'اعتزاز الكاتب (إنك سِش إِقِر م بِر-عنخ)',
    themeAr: 'فخر الكتبة ومكانة دار الحياة',
    arabicMeaning: 'أنا كاتب بارع خبير في بيت الحياة (بر-عنخ)',
    englishMeaning: 'I am an excellent scribe in the House of Life',
    targetGardinerCodes: ['M17', 'N35', 'V31', 'Y3', 'A1', 'G17', 'O1', 'S34'],
    targetGlyphs: '𓇋 𓈖 𓎡 𓏞 𓀀 𓅓 𓉐 𓋹',
    transliteration: 'jnk sš jqr m pr-ꜥnḫ',
    phoneticReadingAr: 'إِنِك سِش إِقِر م بِر-عَنْخ',
    correctReadingDirection: 'rtl',
    historicalContextAr: 'نقش فخري كان يضعه كبار الكتبة على تماثيلهم الجالسة متفاخرين بحفظ أسرار الحكمة في مراكز العلم.',
    pointsReward: 80,
    hintAr: 'اكتب الضمير إنك (M17 N35 V31)، ثم محبرة الكاتب (Y3) ومخصص الرجل (A1)، ثم في (G17)، وبيت الحياة (O1 S34).'
  },
  {
    id: 'chall-maat-over-isfet',
    level: 5,
    titleAr: 'قانون العدالة الكوني (مَاعِت تُدحِر الإسْفِت)',
    themeAr: 'الفلسفة الأخلاقية ونظام ماعت',
    arabicMeaning: 'الحق والعدل والنظام ينتصر على الفوضى والظلم',
    englishMeaning: 'Maat triumphs over chaos and injustice',
    targetGardinerCodes: ['U7', 'D21', 'X1', 'N16', 'R8'],
    targetGlyphs: '𓌻 𓂋 𓏏 𓈅 𓊹',
    transliteration: 'mryt tꜣ nṯr',
    phoneticReadingAr: 'مِرِيت تَا نِتِر',
    correctReadingDirection: 'rtl',
    historicalContextAr: 'المبدأ الجوهري للفلسفة المصرية: صراع ماعت (العدل والنظام) المستمر لتطهير البلاد من إسفت (الفوضى).',
    pointsReward: 90,
    hintAr: 'استخدم الفأس (U7)، الفم (D21)، التاء (X1)، شريط الأرض (N16)، وراية الإله (R8).'
  }
];

/**
 * Directional Analysis Utility
 * Inspects written glyphs and verifies if they face left or right,
 * and determines the mandatory historical reading direction.
 */
export interface DirectionAnalysisResult {
  totalGlyphs: number;
  animateGlyphsCount: number;
  facingDirectionDetected: 'faces_left' | 'faces_right' | 'neutral_or_none';
  requiredReadingDirection: 'rtl' | 'ltr';
  requiredReadingDirectionLabelAr: string;
  isDirectionCompliant: boolean;
  explanationAr: string;
  ruleCitationAr: string;
  detectedAnimateSigns: { code: string; char: string; nameAr: string }[];
}

export function analyzeHieroglyphicDirection(
  gardinerCodes: string[],
  userSelectedDirection: 'rtl' | 'ltr'
): DirectionAnalysisResult {
  let leftFacingCount = 0;
  let rightFacingCount = 0;
  const detectedAnimateSigns: { code: string; char: string; nameAr: string }[] = [];

  for (const rawCode of gardinerCodes) {
    const cleanCode = rawCode.trim().toUpperCase();
    const sign = CORE_GARDNER_SIGNS[cleanCode];

    if (sign && sign.isAnimate) {
      detectedAnimateSigns.push({
        code: sign.code,
        char: sign.char,
        nameAr: sign.meaningAr
      });

      if (sign.facingDirection === 'left') {
        leftFacingCount++;
      } else if (sign.facingDirection === 'right') {
        rightFacingCount++;
      }
    }
  }

  const totalAnimate = leftFacingCount + rightFacingCount;
  let facingDirectionDetected: 'faces_left' | 'faces_right' | 'neutral_or_none' = 'neutral_or_none';
  let requiredReadingDirection: 'rtl' | 'ltr' = 'rtl'; // Default prestige direction in ancient Egypt

  if (totalAnimate > 0) {
    if (leftFacingCount >= rightFacingCount) {
      facingDirectionDetected = 'faces_left';
      // In standard Unicode/Egyptology fonts: glyphs face left.
      // THE RULE: If glyphs face left, the reader reads from LEFT to RIGHT (into their faces).
      // If glyphs are flipped/face right (as in standard papyrus RTL), reader reads from RIGHT to LEFT.
      requiredReadingDirection = 'ltr';
    } else {
      facingDirectionDetected = 'faces_right';
      requiredReadingDirection = 'rtl';
    }
  }

  const isDirectionCompliant = totalAnimate === 0 || userSelectedDirection === requiredReadingDirection;

  let explanationAr = '';
  if (totalAnimate === 0) {
    explanationAr = 'النص المكتوب يحتوي على علامات محايدة الاتجاه (رموز هندسية، أدوات، وأوانٍ). يمكن قراءته وفق الاتجاه المختار.';
  } else if (isDirectionCompliant) {
    explanationAr = `ممتاز! اتجاه القراءة المختار (${userSelectedDirection === 'rtl' ? 'من اليمين إلى اليسار' : 'من اليسار إلى اليمين'}) يتطابق تماماً مع اتجاه وجوه الكائنات (${facingDirectionDetected === 'faces_left' ? 'تنظر لليسار' : 'تنظر لليمين'})؛ فالقارئ يواجه وجوه الرموز مباشرة.`;
  } else {
    explanationAr = `⚠️ تنبيه أثري: الرموز المصورة الحية (${detectedAnimateSigns.map(s => s.char).join(' ')}) تنظر نحو ${facingDirectionDetected === 'faces_left' ? 'اليسار ⬅️' : 'اليمين ➡️'}. القاعدة الذهبية لجاردنر تنص على أن القراءة تتم بمواجهة وجوه الكائنات، وبالتالي اتجاه القراءة الصحيح لهذا السطر يجب أن يكون ${requiredReadingDirection === 'ltr' ? 'من اليسار إلى اليمين (LTR)' : 'من اليمين إلى اليسار (RTL)'}.`;
  }

  return {
    totalGlyphs: gardinerCodes.length,
    animateGlyphsCount: totalAnimate,
    facingDirectionDetected,
    requiredReadingDirection,
    requiredReadingDirectionLabelAr: requiredReadingDirection === 'rtl' ? 'من اليمين إلى اليسار (RTL)' : 'من اليسار إلى اليمين (LTR)',
    isDirectionCompliant,
    explanationAr,
    ruleCitationAr: '«القاعدة الذهبية في اتجاه الهيروغليفية (Alan Gardiner, Egyptian Grammar § 16)»: يُقرأ السطر دائماً في اتجاه وجوه الحيوانات والطيور والبشر، فالقارئ يتقدم لملاقاة الوجوه ولا يقرأ من ظهورها قط.',
    detectedAnimateSigns
  };
}
