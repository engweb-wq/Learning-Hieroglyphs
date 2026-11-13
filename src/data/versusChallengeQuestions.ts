export interface VersusQuestion {
  id: string;
  type: 'glyphs' | 'heritage';
  question: string;
  glyphDisplay?: string;
  promptWord?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  bonusSpeedTip: string;
}

export const VERSUS_QUESTIONS: VersusQuestion[] = [
  // CATEGORY 1: HIEROGLYPH SYMBOL TRANSLATIONS (ترجمة الرموز الهيروغليفية)
  {
    id: 'vg-1',
    type: 'glyphs',
    question: 'ما هو النطق والمعنى الدقيق للرمز الهيروغليفي الموضح؟',
    glyphDisplay: '𓋹',
    options: [
      { id: 'o1', text: 'عَنخ (ꜥnḫ) - الحياة والخلود', isCorrect: true },
      { id: 'o2', text: 'حُتُب (ḥtp) - السلام والقرابين', isCorrect: false },
      { id: 'o3', text: 'نِفِر (nfr) - الجمال والكمال', isCorrect: false },
      { id: 'o4', text: 'بِر (pr) - البيت والقصر', isCorrect: false }
    ],
    explanation: 'العنخ (𓋹) هو مفتاح الحياة وعقدة سير الصندل، رمز الخلود ودوام العافية.',
    bonusSpeedTip: 'رمز سير الصندل الذي لا غنى للمسافر عنه في الحياة!'
  },
  {
    id: 'vg-2',
    type: 'glyphs',
    question: 'الرمز التصويري لطائر البومة الحكيم يمثل في الأبجدية الهيروغليفية صوت:',
    glyphDisplay: '𓅓',
    options: [
      { id: 'o1', text: 'صوت الميم (m)', isCorrect: true },
      { id: 'o2', text: 'صوت الباء (b)', isCorrect: false },
      { id: 'o3', text: 'صوت الراء (r)', isCorrect: false },
      { id: 'o4', text: 'صوت الشين (š)', isCorrect: false }
    ],
    explanation: 'البومة (𓅓) تمثل صوت الميم، وهي الطائر الوحيد الذي يُرسم بوجهه الكامل للأمام.',
    bonusSpeedTip: 'تذكر: بومة = ميم!'
  },
  {
    id: 'vg-3',
    type: 'glyphs',
    question: 'ماذا يمثل رمز «القدم والساق الواقفة» في الأصوات الهيروغليفية؟',
    glyphDisplay: '𓃀',
    options: [
      { id: 'o1', text: 'صوت الباء (b) ومفهوم الموطئ والمكان', isCorrect: true },
      { id: 'o2', text: 'صوت القاف (q)', isCorrect: false },
      { id: 'o3', text: 'صوت التاء (t)', isCorrect: false },
      { id: 'o4', text: 'صوت الكاف (k)', isCorrect: false }
    ],
    explanation: 'الساق والقدم (𓃀) تنطق باء، ومنها كلمة «بو» بمعنى مكان أو موضع.',
    bonusSpeedTip: 'الساق تخطو وتبدأ بحرف الباء!'
  },
  {
    id: 'vg-4',
    type: 'glyphs',
    question: 'رمز «حية الطريشة المقرنة» يمثل حرف:',
    glyphDisplay: '𓆑',
    options: [
      { id: 'o1', text: 'صوت الفاء (f) وضمير الغائب «هو/له»', isCorrect: true },
      { id: 'o2', text: 'صوت السين (s)', isCorrect: false },
      { id: 'o3', text: 'صوت الحاء (ḥ)', isCorrect: false },
      { id: 'o4', text: 'صوت النون (n)', isCorrect: false }
    ],
    explanation: 'أفعى الطريشة (𓆑) تنطق فاء، وانتقلت للقبطية بذات الشكل كحرف «فاي Ϥ».',
    bonusSpeedTip: 'القرنان كأنهما نقطتا الفاء!'
  },
  {
    id: 'vg-5',
    type: 'glyphs',
    question: 'رمز «رغيف الخبز فوق حصير القصب» يعني في المصرية القديمة:',
    glyphDisplay: '𓊵',
    options: [
      { id: 'o1', text: 'حُتُب (ḥtp) - السلام والرضا والقرابين', isCorrect: true },
      { id: 'o2', text: 'سِشَن (sšn) - زهرة اللوتس', isCorrect: false },
      { id: 'o3', text: 'مُو (mw) - ماء النيل', isCorrect: false },
      { id: 'o4', text: 'رَع (rꜥ) - قرص الشمس', isCorrect: false }
    ],
    explanation: 'حتب (𓊵) تعني السلام والقربان، ومنها تحية «إم حتب = في سلام».',
    bonusSpeedTip: 'حصير الخبز هو رمز الضيافة والسلام!'
  },
  {
    id: 'vg-6',
    type: 'glyphs',
    question: 'المسقط الأفقي لجدران البيت ومدخله المنفتح ينطق:',
    glyphDisplay: '𓉐',
    options: [
      { id: 'o1', text: 'بِر (pr) - البيت والقصر والدار', isCorrect: true },
      { id: 'o2', text: 'نِب (nb) - السيد والمالك', isCorrect: false },
      { id: 'o3', text: 'خِبر (ḫpr) - الصيرورة والتحول', isCorrect: false },
      { id: 'o4', text: 'ماعت (mꜣꜥ.t) - العدل والنظام', isCorrect: false }
    ],
    explanation: 'البيت (𓉐) ينطق «بِر»، ومنه لقب «بر-عا» أي البيت الكبير الذي حرفه اليونانيون إلى فرعون.',
    bonusSpeedTip: 'أصل كلمة فرعون: بر-عا!'
  },
  {
    id: 'vg-7',
    type: 'glyphs',
    question: 'رمز «التموجات المائية الثلاثة» يرمز إلى:',
    glyphDisplay: '𓈗',
    options: [
      { id: 'o1', text: 'مُو (mw) - الماء العذب والفيضان والشرب', isCorrect: true },
      { id: 'o2', text: 'طَمِي النيل الأسود الخصيب', isCorrect: false },
      { id: 'o3', text: 'أشرعة السفن في مهب الريح', isCorrect: false },
      { id: 'o4', text: 'الأرض المحروثة بالثيران', isCorrect: false }
    ],
    explanation: 'الماء (𓈗) ينطق «مُو»، وهو أصل كلمة ماء بالسامية والعربية، وكلمة «إمبو» لشرب الماء عند الأطفال.',
    bonusSpeedTip: 'تموجات النهر = ماء / مو!'
  },
  {
    id: 'vg-8',
    type: 'glyphs',
    question: 'رمز «قرص الشمس ذو النقطة المركزية» هو:',
    glyphDisplay: '𓇳',
    options: [
      { id: 'o1', text: 'رَع (rꜥ) - الشمس وضياء النهار والوقت', isCorrect: true },
      { id: 'o2', text: 'إياح (jꜥḥ) - الهلال والقمر', isCorrect: false },
      { id: 'o3', text: 'سبا (sbꜣ) - نجمة الصباح والتعليم', isCorrect: false },
      { id: 'o4', text: 'شنو (šn.w) - الخرطوشة الملكية الدائرية', isCorrect: false }
    ],
    explanation: 'قرص الشمس (𓇳) ينطق «رع»، وهو إله الشمس ورمز وضح النهار وساعات اليوم.',
    bonusSpeedTip: 'دائرة النور والشمس هي رع!'
  },
  {
    id: 'vg-9',
    type: 'glyphs',
    question: 'رمز «بركة الماء المستطيلة» تحول في الخط الديموطيقي والقبطي إلى حرف:',
    glyphDisplay: '𓈙',
    options: [
      { id: 'o1', text: 'صوت الشين وحرف «شاي Ϣ» القبطي', isCorrect: true },
      { id: 'o2', text: 'صوت الدال وحرف «دلتا»', isCorrect: false },
      { id: 'o3', text: 'صوت الهاء وحرف «هوري Ϩ»', isCorrect: false },
      { id: 'o4', text: 'صوت الواو وحرف «واو»', isCorrect: false }
    ],
    explanation: 'بركة الماء (𓈙) تنطق شيناً (š)، وأخذت القبطية رسمها مباشرة ليصبح حرف الشاي (Ϣ).',
    bonusSpeedTip: 'بركة شين = شاي القبطية!'
  },
  {
    id: 'vg-10',
    type: 'glyphs',
    question: 'ما هي القراءة الصحيحة للشعار الملكي التمائمي الشهير «𓋹𓍑𓋴»؟',
    glyphDisplay: '𓋹𓍑𓋴',
    options: [
      { id: 'o1', text: 'عَنخ، وِجَا، سَنَب (حياة، ورخاء، وصحة عافية)', isCorrect: true },
      { id: 'o2', text: 'نِيسُو، بِيْتِي، نِب (ملك مصر وسيد الأرضين)', isCorrect: false },
      { id: 'o3', text: 'حُتُب، دِي، نِيسُو (قربان يمنحه الفرعون)', isCorrect: false },
      { id: 'o4', text: 'مَاعَت، خِرو، جِت (صادق القول إلى الأبد)', isCorrect: false }
    ],
    explanation: 'عنخ، وجا، سنب (ꜥ.w.s) هي أمنية البركة الملكية الثلاثية الشهيرة (حياة، رخاء، صحة).',
    bonusSpeedTip: 'أشهر ثلاثية بركة فرعونية!'
  },

  // CATEGORY 2: SHARED WORDS & LIVING HERITAGE (استنتاج معاني الكلمات المشتركة)
  {
    id: 'vh-1',
    type: 'heritage',
    question: 'ما هو الأصل التاريخي الحقيقي لوصف طبق «الفول المِدَمِّس»؟',
    promptWord: 'فول مِدَمِّس',
    options: [
      { id: 'o1', text: 'من الفعل المصري القديم (tms / طمس) بمعنى طمر ودفن في الجمر والتراب', isCorrect: true },
      { id: 'o2', text: 'نسبة إلى اسم تاجر يوناني في الإسكندرية', isCorrect: false },
      { id: 'o3', text: 'كلمة عثمانية تعني الغليان الطويل', isCorrect: false },
      { id: 'o4', text: 'تحريف لكلمة فرنسية تعني المهروس', isCorrect: false }
    ],
    explanation: 'طَمَسَ / تَمَسَ في الهيروغليفية والقبطية (تومس) تعني طمر ودفن الشيء في الرماد أو الجمر.',
    bonusSpeedTip: 'تومس = مدفون في مستوقد الجمر!'
  },
  {
    id: 'vh-2',
    type: 'heritage',
    question: 'عندما تشجع الأمهات أطفالهن قائلات: «تاتا تاتا خطي العتبة».. ما المعنى الأصلي؟',
    promptWord: 'تاتا تاتا',
    options: [
      { id: 'o1', text: 'من المصرية القديمة (ta-ta): امشِ، اخطُ ببطء وحذر خطوة بخطوة', isCorrect: true },
      { id: 'o2', text: 'من كلمة إيطالية تعني الوداع', isCorrect: false },
      { id: 'o3', text: 'أصوات عشوائية لا أصل لغوياً لها', isCorrect: false },
      { id: 'o4', text: 'اختصار لكلمة تعال هنا', isCorrect: false }
    ],
    explanation: '«تاتا» (𓏏𓄿𓏏𓄿) اسم فعل مصري قديم مكرر يحث الرضيع على الخطو بثبات.',
    bonusSpeedTip: 'تاتا تاتا = خطوة خطوة!'
  },
  {
    id: 'vh-3',
    type: 'heritage',
    question: 'المثل الشعبي الشهير «فلان حكالي كاني وماني».. ما هو أصل «كاني وماني» عند الفراعنة؟',
    promptWord: 'كاني وماني',
    options: [
      { id: 'o1', text: 'السمن والعسل (كاني = السمن الطبيعي، وماني = عسل النحل المصفى)', isCorrect: true },
      { id: 'o2', text: 'اسم ساحرين مشهورين في عصر الهكسوس', isCorrect: false },
      { id: 'o3', text: 'نوعان من أقمشة الكتان الفاخر', isCorrect: false },
      { id: 'o4', text: 'مدينتان تاريخيتان في الصعيد والدلتا', isCorrect: false }
    ],
    explanation: '«كاني» في القبطية والمصرية تعني الزبد والسمن، و«ماني» تعني عسل النحل. وكان يقال للمماطل: أتعدني بالسمن والعسل؟! ثم تحولت للثرثرة الفارغة.',
    bonusSpeedTip: 'كاني وماني = سمن وعسل!'
  },
  {
    id: 'vh-4',
    type: 'heritage',
    question: 'ترنيمة الأطفال الرمضانية الخالدة «وحوي يا وحوي إياحه».. ما تفسيرها اللغوي؟',
    promptWord: 'وحوي يا وحوي إياحه',
    options: [
      { id: 'o1', text: 'أهلاً أهلاً بك يا قمر / هلال السماء (وحوي = أهلاً، وإياح = القمر)', isCorrect: true },
      { id: 'o2', text: 'أشعلوا القناديل في بهو المعبد', isCorrect: false },
      { id: 'o3', text: 'استعدوا لبدء موسم زراعة القمح', isCorrect: false },
      { id: 'o4', text: 'أغنية لانتصار الجيش على الأعداء', isCorrect: false }
    ],
    explanation: '«واح وي» تعني أهلاً أو حللت سهلاً، و«إياح» (jꜥḥ) تعني الهلال والقمر، وكانت ترنيمة ابتهاج بالقمر الجديد.',
    bonusSpeedTip: 'وحوي = أهلاً، إياح = القمر!'
  },
  {
    id: 'vh-5',
    type: 'heritage',
    question: 'عندما تدعو الأم رضيعها للطعام بقولها: «كُل مَمْ».. ما أصل هذه الكلمة؟',
    promptWord: 'مَمْ',
    options: [
      { id: 'o1', text: 'من الفعل المصري القديم «وَنَمْ» (wnm) بمعنى أكل وتغذى', isCorrect: true },
      { id: 'o2', text: 'من اللاتينية mamma', isCorrect: false },
      { id: 'o3', text: 'صوت اختراع حديث للرسوم المتحركة', isCorrect: false },
      { id: 'o4', text: 'من كلمة مائدة', isCorrect: false }
    ],
    explanation: '«ونم» في الهيروغليفية تعني الأكل، تحولت في القبطية إلى «أوم / مم» وظلت كلمة تغذية الصغار لآلاف السنين.',
    bonusSpeedTip: 'ونم = أكل وطعام!'
  },
  {
    id: 'vh-6',
    type: 'heritage',
    question: 'صوت «طَشّة الملوخية بالثوم والكزبرة».. ما هو أصل لفظ «طَشّ» في المعجم المصري؟',
    promptWord: 'طَشّة / طَشّ',
    options: [
      { id: 'o1', text: 'من الفعل الفرعوني (tš) بمعنى رشّ السائل الحار مع صوت الأزيز', isCorrect: true },
      { id: 'o2', text: 'كلمة فارسية من المطبخ العباسي', isCorrect: false },
      { id: 'o3', text: 'من الإنجليزية dash', isCorrect: false },
      { id: 'o4', text: 'مشتقة من اسم الطاسة النحاسية', isCorrect: false }
    ],
    explanation: '«طش» (tš) فعل صوتي مصري قديم يعني سكب السائل وإحداث فوران وأزيز حار.',
    bonusSpeedTip: 'طش = صوت فوران الثوم والسمن!'
  },
  {
    id: 'vh-7',
    type: 'heritage',
    question: 'عندما يقال للطفل الصغير عندما يلمس شيئاً ملوثاً: «كِخّ يا حبيبي».. ما أصل «كِخّ»؟',
    promptWord: 'كِخّ',
    options: [
      { id: 'o1', text: 'من المصرية القديمة (kḫ / kꜣḥ): قذارة، دنس، وتراب نجس', isCorrect: true },
      { id: 'o2', text: 'من التركية العثمانية', isCorrect: false },
      { id: 'o3', text: 'حرف هجائي مهجور', isCorrect: false },
      { id: 'o4', text: 'صوت السعال', isCorrect: false }
    ],
    explanation: '«كِخ» في اللسان المصري القديم تعني النجس أو الوسخ الذي يحذر الصغير من ملامسته.',
    bonusSpeedTip: 'كِخ = قذارة ودنس!'
  },
  {
    id: 'vh-8',
    type: 'heritage',
    question: 'عندما يُقال في العامية: «الأكل خِلِص بَحّ».. ما المعنى الفرعوني لكلمة «بَحّ»؟',
    promptWord: 'بَحّ',
    options: [
      { id: 'o1', text: 'من المصرية القديمة (pꜣḥ): نفد، انتهى تماماً، وجفّ الوعاء', isCorrect: true },
      { id: 'o2', text: 'من بحة الصوت وخشونته', isCorrect: false },
      { id: 'o3', text: 'اختصار لكلمة بحر', isCorrect: false },
      { id: 'o4', text: 'كلمة فرنسية pas', isCorrect: false }
    ],
    explanation: '«بَح» لفظ فرعوني يعني نفاد الشيء وفراغ الصحن، واستقر في العامية للدلالة على الانتهاء التام.',
    bonusSpeedTip: 'بَح = نفد وانتهى الوعاء!'
  },
  {
    id: 'vh-9',
    type: 'heritage',
    question: 'عندما تطلب الأم من الصغير شرب الماء فتقول: «تشرب إمبو؟».. ما معنى «إمبو»؟',
    promptWord: 'إمبو',
    options: [
      { id: 'o1', text: 'من الهيروغليفية (eb / eb-w): أراد ماءً، وعطش، وارتوى بالماء العذب', isCorrect: true },
      { id: 'o2', text: 'من صوت فقاعات الماء', isCorrect: false },
      { id: 'o3', text: 'مشتقة من اسم نبع مياه روماني', isCorrect: false },
      { id: 'o4', text: 'اختصار لكلمة أنبوب', isCorrect: false }
    ],
    explanation: '«إب / إبو» تعني العطش وطلب الشرب، ومنها بالقبطية «إب-وو» أي اشرب ماء.',
    bonusSpeedTip: 'إمبو = شرب الماء وارتواء!'
  },
  {
    id: 'vh-10',
    type: 'heritage',
    question: 'ما هو أصل اسم مدينة «أسوان» العريقة في أقصى جنوب مصر؟',
    promptWord: 'أسوان',
    options: [
      { id: 'o1', text: 'من المصرية القديمة «سونو / سوان» (swnw) بمعنى السوق ومركز التجارة', isCorrect: true },
      { id: 'o2', text: 'نسبة إلى نهر أسوان الجبلي', isCorrect: false },
      { id: 'o3', text: 'من الكلمة العربية الأسوان أي الحزين', isCorrect: false },
      { id: 'o4', text: 'اسم قائد جيش بطلمي', isCorrect: false }
    ],
    explanation: '«سونو» (swnw) تعني السوق التجاري الكبرى؛ حيث كانت بوابة التبادل التجاري لمصر مع بلاد النوبة وإفريقيا.',
    bonusSpeedTip: 'سونو = سوق التجارة الكبرى!'
  }
];
