// Data for the 3 Core Interactive Educational Games targeting Kids (صغار) and Adults (كبار)

export type GameAudienceTier = 'kids' | 'adults';

// ==========================================
// GAME 1: Symbol Recognition (التعرف على الرموز)
// ==========================================
export interface SymbolRecognitionQuestion {
  id: string;
  tier: GameAudienceTier;
  glyph: string;
  gardinerCode: string;
  questionPromptAr: string;
  audioHintScriptAr: string;
  clueAr: string;
  options: {
    id: string;
    labelAr: string;
    sublabelAr?: string;
    isCorrect: boolean;
  }[];
  feedbackCorrectAr: string;
  feedbackWrongAr: string;
  academicOrFunFactAr: string;
}

export const SYMBOL_RECOGNITION_QUESTIONS: SymbolRecognitionQuestion[] = [
  // KIDS TIER (8 questions)
  {
    id: 'sym-k-1',
    tier: 'kids',
    glyph: '𓅓',
    gardinerCode: 'G17',
    questionPromptAr: 'ما اسم هذا الطائر الحكيم، وما الحرف الذي ينطقه؟',
    audioHintScriptAr: 'طائر يطير ليلاً بوجه دائري، وصوته حرف الميم',
    clueAr: 'ينام في النهار ويبدأ به اسم «مصر» ومَمْ!',
    options: [
      { id: 'a', labelAr: 'البومة — حرف الميم (م)', isCorrect: true },
      { id: 'b', labelAr: 'التمساح — حرف التاء (ت)', isCorrect: false },
      { id: 'c', labelAr: 'قرص الشمس — كلمة رَع', isCorrect: false },
      { id: 'd', labelAr: 'تموج الماء — حرف النون (ن)', isCorrect: false }
    ],
    feedbackCorrectAr: 'رائع! البومة 𓅓 هي أشهر علامة لحرف الميم (m).',
    feedbackWrongAr: 'حاول مجدداً في المرة القادمة: انظر إلى شكل البومة؛ إنها تمثل حرف الميم (م)!',
    academicOrFunFactAr: 'البومة هي الطائر الوحيد الذي رسمه المصريون القدماء ينظر إليك مباشرة للأمام!'
  },
  {
    id: 'sym-k-2',
    tier: 'kids',
    glyph: '𓈖',
    gardinerCode: 'N35',
    questionPromptAr: 'إلى أي شيء يشير هذا الخط المتموج الجميل؟',
    audioHintScriptAr: 'موجة ماء صغيرة تنطق مثل حرف النون في نهر النيل',
    clueAr: 'يشبه أمواج النيل الصغير ويبدأ به اسم «نيل»!',
    options: [
      { id: 'a', labelAr: 'قرص الشمس الساطع', isCorrect: false },
      { id: 'b', labelAr: 'موجة الماء — حرف النون (ن)', isCorrect: true },
      { id: 'c', labelAr: 'رغيف الخبز — حرف التاء (ت)', isCorrect: false },
      { id: 'd', labelAr: 'الأسد الشجاع — حرف اللام (ل)', isCorrect: false }
    ],
    feedbackCorrectAr: 'أحسنت يا بطل! موجة الماء 𓈖 تنطق بحرف النون (n).',
    feedbackWrongAr: 'تذكر شكل الأمواج الزرقاء: الخط المتعرج 𓈖 يمثل موجة الماء وحرف النون (ن).',
    academicOrFunFactAr: 'عندما يرسم المصري ثلاث موجات فوق بعضها 𓈗 فإنها تعني «مُو» أي الماء الكثير!'
  },
  {
    id: 'sym-k-3',
    tier: 'kids',
    glyph: '𓃀',
    gardinerCode: 'D58',
    questionPromptAr: 'أي جزء من جسم الإنسان يظهر في هذا الرمز؟',
    audioHintScriptAr: 'عضو نمشي ونقفز به، وصوته حرف الباء',
    clueAr: 'نرتدي فيها الحذاء أو الشبشب ونمشي بها!',
    options: [
      { id: 'a', labelAr: 'اليد والكف — حرف الدال (د)', isCorrect: false },
      { id: 'b', labelAr: 'الفم — حرف الراء (ر)', isCorrect: false },
      { id: 'c', labelAr: 'القدم والساق — حرف الباء (ب)', isCorrect: true },
      { id: 'd', labelAr: 'العين الواسعة — حرف العين (ع)', isCorrect: false }
    ],
    feedbackCorrectAr: 'ممتاز! رسم القدم والساق 𓃀 يعبر عن حرف الباء (b).',
    feedbackWrongAr: 'لاحظ شكل الكعب وأصابع القدم في الرمز 𓃀؛ إنها القدم وتنطق حرف الباء (ب)!',
    academicOrFunFactAr: 'في الهيروغليفية، الكلمات التي تدل على المشي والجري تنتهي دائماً برمز قدمين تمشيان!'
  },
  {
    id: 'sym-k-4',
    tier: 'kids',
    glyph: '𓇳',
    gardinerCode: 'N5',
    questionPromptAr: 'ماذا يمثل هذا الرمز المضيء في السماء؟',
    audioHintScriptAr: 'تشرق كل صباح لتعطينا الدفء والنور وتُقرأ رَع',
    clueAr: 'اسمها في المصرية القديمة «رَع»!',
    options: [
      { id: 'a', labelAr: 'قرص الشمس (رَع)', isCorrect: true },
      { id: 'b', labelAr: 'رغيف الخبز الساخن', isCorrect: false },
      { id: 'c', labelAr: 'مخطط البيت', isCorrect: false },
      { id: 'd', labelAr: 'زهرة اللوتس', isCorrect: false }
    ],
    feedbackCorrectAr: 'نجم متألق! الدائرة وبداخلها نقطة 𓇳 هي قرص الشمس «رَع».',
    feedbackWrongAr: 'انظر للنقطة المضيئة في وسط الدائرة 𓇳؛ إنها الشمس المشرقة «رَع»!',
    academicOrFunFactAr: 'يدخل رمز الشمس «رَع» في أسماء فراعنة عظام مثل «رمسيس» أي (رَع هو الذي ولده).'
  },
  {
    id: 'sym-k-5',
    tier: 'kids',
    glyph: '𓋹',
    gardinerCode: 'S34',
    questionPromptAr: 'ماذا يُسمى هذا الرمز الشهير الذي يحمله الفراعنة؟',
    audioHintScriptAr: 'مفتاح عنخ الذي يرمز للحياة السعيدة',
    clueAr: 'يسمى «مفتاح الحياة» وينطق «عَنْخ»!',
    options: [
      { id: 'a', labelAr: 'قارب في النيل', isCorrect: false },
      { id: 'b', labelAr: 'مفتاح الحياة «عَنْخ»', isCorrect: true },
      { id: 'c', labelAr: 'هرم مدرج', isCorrect: false },
      { id: 'd', labelAr: 'زهرة البردي', isCorrect: false }
    ],
    feedbackCorrectAr: 'عبقري! إنه رمز «عَنْخ» 𓋹 أشهر علامة للحياة والأبدية في مصر القديمة.',
    feedbackWrongAr: 'هذا هو رمز «عَنْخ» 𓋹 المعروف بمفتاح الحياة في كل المعابد المصرية!',
    academicOrFunFactAr: 'كان المصريون يصنعون المرايا على شكل علامة عنخ لأنهم رأوا في الوجه انعكاس الحياة!'
  },
  {
    id: 'sym-k-6',
    tier: 'kids',
    glyph: '𓂋',
    gardinerCode: 'D21',
    questionPromptAr: 'ما اسم هذا الرمز وما الحرف الذي يمثله؟',
    audioHintScriptAr: 'ننطق ونتذوق به الطعام اللذيذ، وصوته حرف الراء',
    clueAr: 'يشبه الفم المفتوح قليلاً وينطق حرف الراء!',
    options: [
      { id: 'a', labelAr: 'العين — حرف الألف', isCorrect: false },
      { id: 'b', labelAr: 'الفم — حرف الراء (ر)', isCorrect: true },
      { id: 'c', labelAr: 'ورقة شجر — حرف الياء', isCorrect: false },
      { id: 'd', labelAr: 'سلة قصب — حرف الكاف', isCorrect: false }
    ],
    feedbackCorrectAr: 'أصبت! رسم الفم 𓂋 ينطق دائماً حرف الراء (r).',
    feedbackWrongAr: 'الشكل البيضاوي هو رسم الفم 𓂋، وكان المصريون ينطقونه مثل حرف الراء (ر)!',
    academicOrFunFactAr: 'كلمة فم في المصرية القديمة كانت تُنطق «رَا»، ولذلك اختاروا رسم الفم ليعبّر عن صوت الراء!'
  },
  {
    id: 'sym-k-7',
    tier: 'kids',
    glyph: '𓅱',
    gardinerCode: 'G43',
    questionPromptAr: 'هذا الكتكوت الصغير يزقزق بأي حرف؟',
    audioHintScriptAr: 'فرخ السمان الصغير ينطق واو واو',
    clueAr: 'أرجله رفيعة ومنقاره صغير، صوته «واو»!',
    options: [
      { id: 'a', labelAr: 'فرخ السمان — حرف الواو (و)', isCorrect: true },
      { id: 'b', labelAr: 'طائر العقاب — حرف الألف (أ)', isCorrect: false },
      { id: 'c', labelAr: 'الحية — حرف الفاء (ف)', isCorrect: false },
      { id: 'd', labelAr: 'البومة — حرف الميم (م)', isCorrect: false }
    ],
    feedbackCorrectAr: 'برافو! كتكوت السمان اللطيف 𓅱 يمثل حرف الواو (w).',
    feedbackWrongAr: 'هذا الصغير هو فرخ السمان 𓅱 ويمثل صوت الواو (و)!',
    academicOrFunFactAr: 'للفرخ السمان مكانة مشهورة؛ فإذا جاء في آخر الكلمة قد يدل أحياناً على صيغة الجمع!'
  },
  {
    id: 'sym-k-8',
    tier: 'kids',
    glyph: '𓉐',
    gardinerCode: 'O1',
    questionPromptAr: 'ماذا ترى من الأعلى في هذا الرسم الهندسي؟',
    audioHintScriptAr: 'مخطط بيت مفتوح الباب من الأسفل وينطق بِر',
    clueAr: 'تعيش فيه العائلة وله باب مفتوح من الأسفل!',
    options: [
      { id: 'a', labelAr: 'صندوق مجوهرات', isCorrect: false },
      { id: 'b', labelAr: 'مقعد خشبي', isCorrect: false },
      { id: 'c', labelAr: 'مخطط البيت / الدار (بِر)', isCorrect: true },
      { id: 'd', labelAr: 'رغيف خبز', isCorrect: false }
    ],
    feedbackCorrectAr: 'مهندس صغير ذكي! الرمز 𓉐 هو مخطط البيت «بِر» من الأعلى.',
    feedbackWrongAr: 'لاحظ الفتحة في الضلع السفلي؛ إنها باب الغرفة، والرمز يعني «البيت» (بِر)!',
    academicOrFunFactAr: 'من كلمة «بِر» (البيت) مع «عَا» (العظيم) جاء لقب «فرعون» أي البيت العظيم!'
  },

  // ADULTS TIER (8 questions)
  {
    id: 'sym-a-1',
    tier: 'adults',
    glyph: '𓂝',
    gardinerCode: 'D36',
    questionPromptAr: 'ما القيمة الصوتية الدقيقة وكود جاردنر لرمز الذراع والساعد؟',
    audioHintScriptAr: 'ذراع وساعد ممدود يطابق العين العربية',
    clueAr: 'صامت حلقي احتكاكي مجهور نادر في اللغات الأوروبية ومطابق للعربية.',
    options: [
      { id: 'a', labelAr: 'ꜥ (حرف العين) — كود D36', sublabelAr: 'أحادي حلقي مجهور', isCorrect: true },
      { id: 'b', labelAr: 'ꜣ (الألف / الهمزة) — كود G1', sublabelAr: 'أحادي حنجري', isCorrect: false },
      { id: 'c', labelAr: 'd (الدال) — كود D46', sublabelAr: 'كف اليد', isCorrect: false },
      { id: 'd', labelAr: 'k (الكاف) — كود V31', sublabelAr: 'سلة بمقبض', isCorrect: false }
    ],
    feedbackCorrectAr: 'دقة أكاديمية ممتازة! رمز الذراع D36 𓂝 هو حرف العين (ꜥ) المطابق تماماً للعين العربية.',
    feedbackWrongAr: 'رمز الذراع 𓂝 هو D36 ويمثل صوت العين الحلقية (ꜥ)، بينما كف اليد 𓂧 هو D46 (d).',
    academicOrFunFactAr: 'سُمّيت الكلمة المصرية للذراع «عَ»، ولذلك اشتق منها العرب واللغويون تطابق العين في «عنخ» و«إياح».'
  },
  {
    id: 'sym-a-2',
    tier: 'adults',
    glyph: '𓏛',
    gardinerCode: 'Y1',
    questionPromptAr: 'ما الوظيفة النحوية الأساسية لرمز «لفافة البردي المختومة» عند مجيئه في نهاية الكلمة؟',
    audioHintScriptAr: 'لفافة بردي مربوطة برباط وتأتي غالباً في آخر الكلمات المجردة',
    clueAr: 'لا يُنطق صوتياً، بل يصنّف المعنى في الكلمات الذهنية.',
    options: [
      { id: 'a', labelAr: 'مخصّص تصنيفي للأفكار المجردة والكتابة والمعرفة', sublabelAr: 'Determinative (Y1)', isCorrect: true },
      { id: 'b', labelAr: 'حرف أحادي يُنطق (ر)', sublabelAr: 'Phonogram', isCorrect: false },
      { id: 'c', labelAr: 'ضمير ملكية للمتكلم المفرد', sublabelAr: 'Suffix Pronoun', isCorrect: false },
      { id: 'd', labelAr: 'أداة جمع ثلاثية للمباني', sublabelAr: 'Plural Determinative', isCorrect: false }
    ],
    feedbackCorrectAr: 'تحليل دقيق! لفافة البردي Y1 𓏛 تأتي كمخصّص صامت لكل ما يرتبط بالعلم والفكر والتجريد.',
    feedbackWrongAr: 'علامة Y1 𓏛 لا تُنطق بل تعمل كمخصّص تصنيفي (Determinative) في نهاية الكلمات المجردة والمكتوبة.',
    academicOrFunFactAr: 'كلمات مثل «سِش» (كتابة) و«مَاعَت» (حق) و«رِخ» (معرفة) تختتم غالباً بلفافة البردي Y1!'
  },
  {
    id: 'sym-a-3',
    tier: 'adults',
    glyph: '𓆑',
    gardinerCode: 'I9',
    questionPromptAr: 'بالإضافة لكون الأفعى ذات القرنين صوت الفاء (f)، ما وظيفتها النحوية الشائعة في نهاية الأسماء والأفعال؟',
    audioHintScriptAr: 'الأفعى المقرنة تنطق فاء وتعمل كضمير متصل مهم',
    clueAr: 'تُضاف في آخر كلمة «إِب» لتصبح «إِبِف» أو «سِش» لتصبح «سِشِف».',
    options: [
      { id: 'a', labelAr: 'أداة نفي للجملة الاسمية', isCorrect: false },
      { id: 'b', labelAr: 'ضمير الغائب المذكر المفرد (هو / هُ)', sublabelAr: 'Suffix Pronoun (.f)', isCorrect: true },
      { id: 'c', labelAr: 'علامة التأنيث في الأسماء', isCorrect: false },
      { id: 'd', labelAr: 'حرف جر بمعنى «في»', isCorrect: false }
    ],
    feedbackCorrectAr: 'إجابة أستاذ متمكن! رمز الحية I9 𓆑 هو الضمير المتصل (.f) بمعنى «هو / له».',
    feedbackWrongAr: 'تعمل 𓆑 (f) كضمير غائب مذكر مفرد متصل: مثل «بر.ف» أي (بيته) و«رن.ف» أي (اسمه)!',
    academicOrFunFactAr: 'لدرء خطر لدغة الأفعى سحرياً داخل المقابر، كان الكهنة يرسمون 𓆑 مقطوعة الرأس في نصوص الأهرام!'
  },
  {
    id: 'sym-a-4',
    tier: 'adults',
    glyph: '𓌳',
    gardinerCode: 'U1',
    questionPromptAr: 'ما القيمة الصوتية الثنائية لرمز «المنجل الزراعي» (U1) المستخدم في كلمة الحق «ماعت»؟',
    audioHintScriptAr: 'منجل حصاد القمح يمثل مقطعا ثنائيا يدخل في كتابة الحق والعدل',
    clueAr: 'يتبعه غالباً العين 𓂝 والتاء 𓏏 وريشة النعامة.',
    options: [
      { id: 'a', labelAr: 'حُتُب (ḥtp)', isCorrect: false },
      { id: 'b', labelAr: 'عَنْخ (ꜥnḫ)', isCorrect: false },
      { id: 'c', labelAr: 'مَا (mꜣ)', sublabelAr: 'علامة ثنائية (Biliteral)', isCorrect: true },
      { id: 'd', labelAr: 'نِفِر (nfr)', isCorrect: false }
    ],
    feedbackCorrectAr: 'برافو! المنجل U1 𓌳 علامة ثنائية صوتها (mꜣ) وتشكل بداية كلمة «ماعت» (mꜣꜥt) وكلمة «يرى» (mꜣꜣ).',
    feedbackWrongAr: 'المنجل 𓌳 (U1) ينطق ثنائياً (mꜣ - مَا)، وبه تبدأ الكلمة الشهيرة «ماعت» (الحق والعدل)!',
    academicOrFunFactAr: 'استخدم المنجل كذلك في فعل الرؤية «مَاآ» (mꜣꜣ) بفضل التشابه الصوتي بين المنجل والرؤية الواضحة.'
  },
  {
    id: 'sym-a-5',
    tier: 'adults',
    glyph: '𓊵',
    gardinerCode: 'R4',
    questionPromptAr: 'ما نوع هذا الرمز في تصنيف الإشارات الهيروغليفية، وما قيمته الصوتية الكاملة؟',
    audioHintScriptAr: 'رغيف قربان فوق حصيرة البردي يقرأ حتب',
    clueAr: 'يحوي 3 صوامت في علامة واحدة؛ يُكمل غالباً بـ 𓏏 و 𓊪.',
    options: [
      { id: 'a', labelAr: 'علامة ثلاثية (Triliteral) تقرأ ḥtp — سلام/رضا', isCorrect: true },
      { id: 'b', labelAr: 'علامة أحادية تقرأ p — مقعد', isCorrect: false },
      { id: 'c', labelAr: 'علامة ثنائية تقرأ pr — بيت', isCorrect: false },
      { id: 'd', labelAr: 'مخصّص صامت للخبز فقط', isCorrect: false }
    ],
    feedbackCorrectAr: 'إتقان كامل! علامة R4 𓊵 علامة ثلاثية (Triliteral) تمثل الأصوات الثلاثة (ḥ-t-p) بمعنى السلام والرضا.',
    feedbackWrongAr: 'علامة R4 𓊵 ثلاثية الصوامت وتنطق «ḥtp» (حُتب)، وتأتي مع 𓏏 𓊪 كمتممات صوتية!',
    academicOrFunFactAr: 'يأتي رغيف الخبز فوق حصيرة في R4 تجسيداً لمذبح القرابين الذي يجلب الرضا والهدوء.'
  },
  {
    id: 'sym-a-6',
    tier: 'adults',
    glyph: '𓐍',
    gardinerCode: 'Aa1',
    questionPromptAr: 'أي صوت حلقي دقيق يمثله رمز «المِشيمة / الدائرة المخططة» (Aa1)؟',
    audioHintScriptAr: 'دائرة مخططة بخطوط أفقية تنطق خاء مهموسة',
    clueAr: 'يُختم به اسم «عنخ» 𓋹𓈖𓐍 وتبدأ به كلمة «خِفِر / خوبر».',
    options: [
      { id: 'a', labelAr: 'خ (ḫ / kh)', sublabelAr: 'احتكاكي طبقي مهموس', isCorrect: true },
      { id: 'b', labelAr: 'ش (š / sh)', sublabelAr: 'بركة ماء', isCorrect: false },
      { id: 'c', labelAr: 'ح (ḥ)', sublabelAr: 'فتيلة مجدولة', isCorrect: false },
      { id: 'd', labelAr: 'ق (q)', sublabelAr: 'منحدر جبلي', isCorrect: false }
    ],
    feedbackCorrectAr: 'سديد! رمز Aa1 𓐍 يطابق حرف الخاء العربية (ḫ) كما في «عَنْخ» و«خوفو».',
    feedbackWrongAr: 'الدائرة المخططة Aa1 𓐍 هي حرف الخاء (ḫ)، وتختلف عن الهاء المربعة (h) والفتيلة (ḥ).',
    academicOrFunFactAr: 'اسم الملك «خوفو» (𓐍𓅱𓆑𓅱) يبدأ مباشرة بهذا الرمز 𓐍 (ḫ-w-f-w)!'
  },
  {
    id: 'sym-a-7',
    tier: 'adults',
    glyph: '𓇓',
    gardinerCode: 'M23',
    questionPromptAr: 'ما اللقب الملكي الذي تشير إليه نبتة البردي المميزة لمصر العليا «سو» (M23)؟',
    audioHintScriptAr: 'نبات السعد الجنوبي يرمز لملك مصر العليا ويدخل في لقب نسو بيتي',
    clueAr: 'تقترن دائماً بالنحلة 𓆤 في تقديم أسماء الفراعنة.',
    options: [
      { id: 'a', labelAr: 'كاهن معبد آمون', isCorrect: false },
      { id: 'b', labelAr: 'ملك مصر العليا — نِسُو (nsw)', isCorrect: true },
      { id: 'c', labelAr: 'أمير الأقاليم الشمالية فقط', isCorrect: false },
      { id: 'd', labelAr: 'رئيس الكتبة الملكيين', isCorrect: false }
    ],
    feedbackCorrectAr: 'ممتاز! نبتة M23 𓇓 تقرأ «سو / نِسُو» وتشير إلى ملك مصر العليا (الصعيد) وتُقرن بالنحلة للشمال.',
    feedbackWrongAr: 'نبات السعد 𓇓 (M23) يقرأ «nsw» بمعنى ملك مصر العليا، ومع النحلة «nswt-bjtj» = ملك الوجهين.',
    academicOrFunFactAr: 'على رأس كل لوحة ملكية تقريباً يظهر اللقب المزدوج 𓇓𓆤 «نسو-بيتي» قبل الخرطوشة!'
  },
  {
    id: 'sym-a-8',
    tier: 'adults',
    glyph: '𓂻',
    gardinerCode: 'D54',
    questionPromptAr: 'عندما ترى «ساقين متجهتين للأمام» (D54) في نهاية فعل مصري، ما المعنى العام الذي تفرضه كمخصص؟',
    audioHintScriptAr: 'ساقان تسيران للأمام تدلان على الحركة والذهاب والقدوم',
    clueAr: 'تظهر في أفعال مثل «شِم» (يمشي) و«إي» (يأتي) و«بِر» (يخرج).',
    options: [
      { id: 'a', labelAr: 'الكتابة والتسجيل', isCorrect: false },
      { id: 'b', labelAr: 'أفعال الطعام والشراب', isCorrect: false },
      { id: 'c', labelAr: 'أفعال الحركة والانتقال والمشي', sublabelAr: 'Motion Determinative', isCorrect: true },
      { id: 'd', labelAr: 'الظواهر السماوية والشمسية', isCorrect: false }
    ],
    feedbackCorrectAr: 'فهم بليغ! المخصّص D54 𓂻 يحدّد أي فعل يرتبط بالحركة والمشي والمجيء والانطلاق.',
    feedbackWrongAr: 'الساقان المتحركتان 𓂻 هما مخصّص الحركة؛ إذا وضعتا خلف الفعل دلتا على السير أو التقدم أو الخروج!',
    academicOrFunFactAr: 'إذا انعكس اتجاه الساقين أو أُضيف ساقان تراجعيتان، دلّ ذلك على التراجع أو الرجوع!'
  }
];

// ==========================================
// GAME 2: Word Building (بناء الكلمات)
// ==========================================
export interface WordBuildingPuzzle {
  id: string;
  tier: GameAudienceTier;
  targetMeaningAr: string;
  targetPronunciationAr: string;
  transliteration: string;
  hintAr: string;
  slots: {
    glyph: string;
    roleAr: string;
    soundAr: string;
  }[];
  tilePool: {
    id: string;
    glyph: string;
    labelAr: string;
    soundAr: string;
  }[];
  successExplanationAr: string;
}

export const WORD_BUILDING_PUZZLES: WordBuildingPuzzle[] = [
  // KIDS TIER (6 puzzles)
  {
    id: 'wb-k-1',
    tier: 'kids',
    targetMeaningAr: 'بَيْت (منزل ودار)',
    targetPronunciationAr: 'بِر',
    transliteration: 'pr',
    hintAr: 'ابدأ بمخطط البيت المفتوح من أسفل، ثم أضف الفم (ر) لتأكيد نهاية النطق!',
    slots: [
      { glyph: '𓉐', roleAr: 'مخطط البيت (بِر)', soundAr: 'بِر' },
      { glyph: '𓂋', roleAr: 'الفم (ر) يؤكد آخر الكلمة', soundAr: 'ر' }
    ],
    tilePool: [
      { id: 'k1-1', glyph: '𓂋', labelAr: 'الفم', soundAr: 'ر' },
      { id: 'k1-2', glyph: '𓅓', labelAr: 'البومة', soundAr: 'م' },
      { id: 'k1-3', glyph: '𓉐', labelAr: 'مخطط البيت', soundAr: 'بِر' },
      { id: 'k1-4', glyph: '𓈖', labelAr: 'موجة ماء', soundAr: 'ن' }
    ],
    successExplanationAr: 'أحسنت! وضعنا أولاً مخطط البيت 𓉐 ثم الفم 𓂋 كمتمم صوتي، فننطقها «بِر» بمعنى البيت.'
  },
  {
    id: 'wb-k-2',
    tier: 'kids',
    targetMeaningAr: 'مَاء (مياه النيل)',
    targetPronunciationAr: 'مُو',
    transliteration: 'mw',
    hintAr: 'ابدأ بموجة الماء الصغيرة 𓈖 ثم ثلاث موجات كاملة 𓈗 لتدل على كثرة الماء!',
    slots: [
      { glyph: '𓈖', roleAr: 'موجة بداية الصوت', soundAr: 'ن / مُو' },
      { glyph: '𓈗', roleAr: 'ثلاث موجات ماء', soundAr: 'مخصص الماء' }
    ],
    tilePool: [
      { id: 'k2-1', glyph: '𓈗', labelAr: 'مياه ثلاثية', soundAr: 'ماء' },
      { id: 'k2-2', glyph: '𓇳', labelAr: 'الشمس', soundAr: 'رع' },
      { id: 'k2-3', glyph: '𓈖', labelAr: 'موجة واحدة', soundAr: 'ن' },
      { id: 'k2-4', glyph: '𓃀', labelAr: 'القدم', soundAr: 'ب' }
    ],
    successExplanationAr: 'رائع! «مُو» هي كلمة الماء القديمة المشتركة مع كلمة «ماء / موه» في لغتنا العربية!'
  },
  {
    id: 'wb-k-3',
    tier: 'kids',
    targetMeaningAr: 'شَمْس (إله الشمس والنور)',
    targetPronunciationAr: 'رَع',
    transliteration: 'rꜥ',
    hintAr: 'ننطق حرف الراء (الفم) أولاً، ثم العين (الذراع)، ثم نرسم قرص الشمس نفسه!',
    slots: [
      { glyph: '𓂋', roleAr: 'حرف الراء (الفم)', soundAr: 'ر' },
      { glyph: '𓂝', roleAr: 'حرف العين (الذراع)', soundAr: 'ع' },
      { glyph: '𓇳', roleAr: 'علامة قرص الشمس', soundAr: 'مخصص الشمس' }
    ],
    tilePool: [
      { id: 'k3-1', glyph: '𓂝', labelAr: 'الذراع', soundAr: 'ع' },
      { id: 'k3-2', glyph: '𓇳', labelAr: 'قرص الشمس', soundAr: 'شمس' },
      { id: 'k3-3', glyph: '𓅱', labelAr: 'كتكوت السمان', soundAr: 'و' },
      { id: 'k3-4', glyph: '𓂋', labelAr: 'الفم', soundAr: 'ر' }
    ],
    successExplanationAr: 'مذهل! ركّبتَ كلمة «رَع» 𓂋𓂝𓇳؛ حرف ر + حرف ع + رمز الشمس الساطعة!'
  },
  {
    id: 'wb-k-4',
    tier: 'kids',
    targetMeaningAr: 'قَمَر (هلال الليل)',
    targetPronunciationAr: 'إِيَاح',
    transliteration: 'jꜥḥ',
    hintAr: 'ركّب الحروف بالترتيب: ورقة الغاب (ي) + الذراع (ع) + الفتيلة (ح) ثم الهلال 𓇹!',
    slots: [
      { glyph: '𓇋', roleAr: 'ورقة الغاب (ي)', soundAr: 'إي' },
      { glyph: '𓂝', roleAr: 'الذراع (ع)', soundAr: 'ع / ا' },
      { glyph: '𓎛', roleAr: 'الفتيلة (ح)', soundAr: 'ح' },
      { glyph: '𓇹', roleAr: 'رسم الهلال', soundAr: 'قمر' }
    ],
    tilePool: [
      { id: 'k4-1', glyph: '𓎛', labelAr: 'فتيلة مجدولة', soundAr: 'ح' },
      { id: 'k4-2', glyph: '𓇹', labelAr: 'هلال القمر', soundAr: 'قمر' },
      { id: 'k4-3', glyph: '𓇋', labelAr: 'ورقة القصب', soundAr: 'ي' },
      { id: 'k4-4', glyph: '𓂝', labelAr: 'الذراع', soundAr: 'ع' }
    ],
    successExplanationAr: 'تستحق التاج! «إياح» هي القمر التي نغني لها في رمضان: «وحوي يا وحوي إياحه»!'
  },
  {
    id: 'wb-k-5',
    tier: 'kids',
    targetMeaningAr: 'جَمِيل / طَيِّب',
    targetPronunciationAr: 'نِفِر',
    transliteration: 'nfr',
    hintAr: 'ابدأ بالعلامة الكبرى «نِفِر» 𓄤، ثم أضف الفاء (الأفعى) والراء (الفم) لتأكيد قراءتها!',
    slots: [
      { glyph: '𓄤', roleAr: 'الرمز الثلاثي نِفِر', soundAr: 'نِفِر' },
      { glyph: '𓆑', roleAr: 'الأفعى (ف)', soundAr: 'ف' },
      { glyph: '𓂋', roleAr: 'الفم (ر)', soundAr: 'ر' }
    ],
    tilePool: [
      { id: 'k5-1', glyph: '𓂋', labelAr: 'الفم', soundAr: 'ر' },
      { id: 'k5-2', glyph: '𓄤', labelAr: 'رمز نِفِر', soundAr: 'نِفِر' },
      { id: 'k5-3', glyph: '𓅓', labelAr: 'البومة', soundAr: 'م' },
      { id: 'k5-4', glyph: '𓆑', labelAr: 'الأفعى', soundAr: 'ف' }
    ],
    successExplanationAr: 'جميل جداً! كلمة «نِفِر» هي أصل اسم الملكة نفرتيتي ومعناها الجميل الحسن الطيب!'
  },
  {
    id: 'wb-k-6',
    tier: 'kids',
    targetMeaningAr: 'الاسم المنطوق',
    targetPronunciationAr: 'رِن',
    transliteration: 'rn',
    hintAr: 'ركّب صوت الراء (الفم) ثم صوت النون (موجة الماء)!',
    slots: [
      { glyph: '𓂋', roleAr: 'الفم (ر)', soundAr: 'ر' },
      { glyph: '𓈖', roleAr: 'موجة الماء (ن)', soundAr: 'ن' }
    ],
    tilePool: [
      { id: 'k6-1', glyph: '𓈖', labelAr: 'موجة ماء', soundAr: 'ن' },
      { id: 'k6-2', glyph: '𓃀', labelAr: 'القدم', soundAr: 'ب' },
      { id: 'k6-3', glyph: '𓂋', labelAr: 'الفم', soundAr: 'ر' },
      { id: 'k6-4', glyph: '𓏏', labelAr: 'رغيف الخبز', soundAr: 'ت' }
    ],
    successExplanationAr: 'ممتاز يا كاتب المستقبل! 𓂋𓈖 تُقرأ «رِن» وتعني الاسم الذي يرنّ في الأسماع!'
  },

  // ADULTS TIER (6 puzzles)
  {
    id: 'wb-a-1',
    tier: 'adults',
    targetMeaningAr: 'السلام والرضا والقربان (ḥtp)',
    targetPronunciationAr: 'حُتُب',
    transliteration: 'ḥtp',
    hintAr: 'ابدأ بالثلاثي R4 𓊵، ثم أضف المتممين الصوتيين (t + p) بالترتيب!',
    slots: [
      { glyph: '𓊵', roleAr: 'ثلاثي القربان (ḥtp)', soundAr: 'ḥtp' },
      { glyph: '𓏏', roleAr: 'متمم صوتي (t)', soundAr: 't' },
      { glyph: '𓊪', roleAr: 'متمم صوتي (p)', soundAr: 'p' }
    ],
    tilePool: [
      { id: 'a1-1', glyph: '𓊪', labelAr: 'مقعد البردي Q3', soundAr: 'p' },
      { id: 'a1-2', glyph: '𓊵', labelAr: 'ثلاثي حتب R4', soundAr: 'ḥtp' },
      { id: 'a1-3', glyph: '𓂝', labelAr: 'الذراع D36', soundAr: 'ꜥ' },
      { id: 'a1-4', glyph: '𓏏', labelAr: 'الخبز X1', soundAr: 't' }
    ],
    successExplanationAr: 'قراءة أثرية دقيقة! في الهيروغليفية لا يُكرر نطق المتممات 𓏏𓊪، بل تأتي لتأكيد آخر حرفين من الثلاثي 𓊵 (ḥ-t-p).'
  },
  {
    id: 'wb-a-2',
    tier: 'adults',
    targetMeaningAr: 'الحياة والخلود (ꜥnḫ)',
    targetPronunciationAr: 'عَنْخ',
    transliteration: 'ꜥnḫ',
    hintAr: 'ابدأ بثلاثي عنخ S34، ثم أضف المتممين الصوتيين (n + ḫ)!',
    slots: [
      { glyph: '𓋹', roleAr: 'ثلاثي الحياة (ꜥnḫ)', soundAr: 'ꜥnḫ' },
      { glyph: '𓈖', roleAr: 'متمم صوتي (n)', soundAr: 'n' },
      { glyph: '𓐍', roleAr: 'متمم صوتي (ḫ)', soundAr: 'ḫ' }
    ],
    tilePool: [
      { id: 'a2-1', glyph: '𓐍', labelAr: 'دائرة مخططة Aa1', soundAr: 'ḫ' },
      { id: 'a2-2', glyph: '𓋹', labelAr: 'ثلاثي عنخ S34', soundAr: 'ꜥnḫ' },
      { id: 'a2-3', glyph: '𓎛', labelAr: 'الفتيلة V28', soundAr: 'ḥ' },
      { id: 'a2-4', glyph: '𓈖', labelAr: 'الماء N35', soundAr: 'n' }
    ],
    successExplanationAr: 'صحيح! التركيب المعياري لكلمة «عنخ» هو 𓋹𓈖𓐍؛ الثلاثي متبوعاً بالنون والخاء كمتممين صوتيين.'
  },
  {
    id: 'wb-a-3',
    tier: 'adults',
    targetMeaningAr: 'فرعون / البيت العظيم (pr-ꜥꜣ)',
    targetPronunciationAr: 'بِر-عَا',
    transliteration: 'pr-ꜥꜣ',
    hintAr: 'ركّب الاسم «بيت» 𓉐 متبوعاً بالصفة «عظيم» (عمود القصر 𓉻)!',
    slots: [
      { glyph: '𓉐', roleAr: 'بيت (pr)', soundAr: 'pr' },
      { glyph: '𓉻', roleAr: 'عمود عظيم (ꜥꜣ)', soundAr: 'ꜥꜣ' }
    ],
    tilePool: [
      { id: 'a3-1', glyph: '𓉻', labelAr: 'عمود القصر O29', soundAr: 'ꜥꜣ' },
      { id: 'a3-2', glyph: '𓇳', labelAr: 'الشمس N5', soundAr: 'rꜥ' },
      { id: 'a3-3', glyph: '𓉐', labelAr: 'مخطط البيت O1', soundAr: 'pr' },
      { id: 'a3-4', glyph: '𓅓', labelAr: 'البومة G17', soundAr: 'm' }
    ],
    successExplanationAr: 'أصبت! في نظام الصفة والموصوف المصري، تأتي الصفة (عَا 𓉻) بعد الموصوف (بِر 𓉐) لتُقرأ «بر-عا» أي فرعون!'
  },
  {
    id: 'wb-a-4',
    tier: 'adults',
    targetMeaningAr: 'الحق والعدل والنظام الكوني (mꜣꜥt)',
    targetPronunciationAr: 'مَاعَت',
    transliteration: 'mꜣꜥt',
    hintAr: 'المنجل (mꜣ) + الذراع (ꜥ) + الخبز (t) + مخصّص ريشة النعامة 𓆄!',
    slots: [
      { glyph: '𓌳', roleAr: 'المنجل الثنائي (mꜣ)', soundAr: 'mꜣ' },
      { glyph: '𓂝', roleAr: 'الذراع (ꜥ)', soundAr: 'ꜥ' },
      { glyph: '𓏏', roleAr: 'تاء التأنيث (t)', soundAr: 't' },
      { glyph: '𓆄', roleAr: 'مخصّص ريشة الحقيقة', soundAr: 'مخصص ماعت' }
    ],
    tilePool: [
      { id: 'a4-1', glyph: '𓏏', labelAr: 'الخبز X1', soundAr: 't' },
      { id: 'a4-2', glyph: '𓌳', labelAr: 'المنجل U1', soundAr: 'mꜣ' },
      { id: 'a4-3', glyph: '𓆄', labelAr: 'ريشة النعام H6', soundAr: 'مخصص' },
      { id: 'a4-4', glyph: '𓂝', labelAr: 'الذراع D36', soundAr: 'ꜥ' }
    ],
    successExplanationAr: 'براعة نحوية! تجمع كلمة «ماعت» بين الثنائي mꜣ والمتمم ꜥ وتاء التأنيث t، وتُختتم بريشة ماعت (H6).'
  },
  {
    id: 'wb-a-5',
    tier: 'adults',
    targetMeaningAr: 'سَمِعَ / أنصت (sḏm)',
    targetPronunciationAr: 'سِجِم',
    transliteration: 'sḏm',
    hintAr: 'ركّب الحروف الثلاثة: القماش المطوي (s) + الكوبرا (ḏ) + البومة (m) ثم مخصص الأذن!',
    slots: [
      { glyph: '𓋴', roleAr: 'القماش المطوي (s)', soundAr: 's' },
      { glyph: '𓆓', roleAr: 'الكوبرا (ḏ)', soundAr: 'ḏ' },
      { glyph: '𓅓', roleAr: 'البومة (m)', soundAr: 'm' },
      { glyph: '𓄔', roleAr: 'مخصّص الأذن (سمع)', soundAr: 'مخصص السمع' }
    ],
    tilePool: [
      { id: 'a5-1', glyph: '𓅓', labelAr: 'البومة G17', soundAr: 'm' },
      { id: 'a5-2', glyph: '𓄔', labelAr: 'أذن البقرة F21', soundAr: 'مخصص' },
      { id: 'a5-3', glyph: '𓋴', labelAr: 'قماش مطوي S29', soundAr: 's' },
      { id: 'a5-4', glyph: '𓆓', labelAr: 'حية الكوبرا I10', soundAr: 'ḏ' }
    ],
    successExplanationAr: 'فعل محوري في النحو المصري الكلاسيكي! التصريف (sḏm.f) هو القالب الشهير للماضي والمضارع في كتب القواعد.'
  },
  {
    id: 'wb-a-6',
    tier: 'adults',
    targetMeaningAr: 'كبير / عظيم (wr)',
    targetPronunciationAr: 'وِر',
    transliteration: 'wr',
    hintAr: 'عصفور السنونو (wr) متبوعاً بمتممه الصوتي حرف الراء (الفم)!',
    slots: [
      { glyph: '𓅨', roleAr: 'السنونو الثنائي (wr)', soundAr: 'wr' },
      { glyph: '𓂋', roleAr: 'متمم صوتي (r)', soundAr: 'r' }
    ],
    tilePool: [
      { id: 'a6-1', glyph: '𓂋', labelAr: 'الفم D21', soundAr: 'r' },
      { id: 'a6-2', glyph: '𓅨', labelAr: 'طائر السنونو G36', soundAr: 'wr' },
      { id: 'a6-3', glyph: '𓅭', labelAr: 'البطة G39', soundAr: 'sꜣ' },
      { id: 'a6-4', glyph: '𓈖', labelAr: 'الماء N35', soundAr: 'n' }
    ],
    successExplanationAr: 'صحيح! طائر السنونو 𓅨 (G36) يرمز للعظمة والكِبر (wr)، عكس العصفور الصغير 𓅪 (G37) الذي يرمز للصِغر!'
  }
];

// ==========================================
// GAME 3: Understanding Basic Meanings (فهم المعاني الأساسية)
// ==========================================
export interface MeaningChallengeQuestion {
  id: string;
  tier: GameAudienceTier;
  hieroglyphs: string;
  transliteration: string;
  phoneticAr: string;
  categoryLabelAr: string;
  questionPromptAr: string;
  options: {
    id: string;
    meaningAr: string;
    isCorrect: boolean;
  }[];
  immediateFeedbackCorrectAr: string;
  immediateFeedbackWrongAr: string;
  culturalContextAr: string;
}

export const MEANING_CHALLENGE_QUESTIONS: MeaningChallengeQuestion[] = [
  // KIDS TIER (6 questions)
  {
    id: 'mn-k-1',
    tier: 'kids',
    hieroglyphs: '𓄤 𓄣',
    transliteration: 'nfr jb',
    phoneticAr: 'نِفِر إِب',
    categoryLabelAr: 'مشاعر وأخلاق',
    questionPromptAr: 'إذا وصفنا شخصاً في معبد مصري بـ «نِفِر إِب»، فماذا نعني؟',
    options: [
      { id: 'a', meaningAr: 'طيّب القلب وسعيد الفؤاد', isCorrect: true },
      { id: 'b', meaningAr: 'خبز ساخن في الفرن', isCorrect: false },
      { id: 'c', meaningAr: 'نهر النيل وقت الفيضان', isCorrect: false },
      { id: 'd', meaningAr: 'جبل شاهق في الصحراء', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'رائع! 𓄤 تعني جميل/طيب و𓄣 هي القلب، فالمعنى: طيب القلب!',
    immediateFeedbackWrongAr: 'تلميح: العلامة الأولى 𓄤 تعني «جميل/طيب» والثانية 𓄣 هي رسم القلب!',
    culturalContextAr: 'كان المصريون يحبون الدعاء لبعضهم بجمال القلب وراحة الضمير.'
  },
  {
    id: 'mn-k-2',
    tier: 'kids',
    hieroglyphs: '𓇿 𓌻𓂋𓇋',
    transliteration: 'tꜣ mrj',
    phoneticAr: 'تَا مَرِي',
    categoryLabelAr: 'أرض ووطن',
    questionPromptAr: 'كان القدماء ينادون وطنهم «تا مري»، ما معنى هذه العبارة الجميلة؟',
    options: [
      { id: 'a', meaningAr: 'الصحراء المظلمة', isCorrect: false },
      { id: 'b', meaningAr: 'الأرض المحبوبة (مصر)', isCorrect: true },
      { id: 'c', meaningAr: 'قارب الصيد السريع', isCorrect: false },
      { id: 'd', meaningAr: 'السماء الممطرة', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'أحسنت يا محب التاريخ! «تَا» = الأرض، و«مَرِي» = المحبوبة!',
    immediateFeedbackWrongAr: '«تا» 𓇿 معناها الأرض، والفأس 𓌻 معناها الحب؛ فتكون الجملة «الأرض المحبوبة»!',
    culturalContextAr: 'كان «تا مري» من أحبّ الأسماء الشعرية لمصر في أناشيد الشعراء والكتبة.'
  },
  {
    id: 'mn-k-3',
    tier: 'kids',
    hieroglyphs: '𓈗 𓈖 𓇋𓏏𓂋𓅱',
    transliteration: 'mw n jtrw',
    phoneticAr: 'مُو إن إِتْرُو',
    categoryLabelAr: 'الطبيعة والحياة',
    questionPromptAr: 'ماذا تعني هذه العبارة المرسومة بأمواج النهر؟',
    options: [
      { id: 'a', meaningAr: 'تاج الفرعون الذهبي', isCorrect: false },
      { id: 'b', meaningAr: 'ماء النهر (مياه النيل)', isCorrect: true },
      { id: 'c', meaningAr: 'كتاب الحكمة القديمة', isCorrect: false },
      { id: 'd', meaningAr: 'ساعة المساء والنجوم', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'سريع البديهة! «مُو» = ماء، و«إترو» = النهر العظيم!',
    immediateFeedbackWrongAr: 'انظر إلى موجات الماء 𓈗 في أول الكلمة وآخرها؛ إنها «ماء النهر»!',
    culturalContextAr: 'نسب المصريون الخير والزراعة كلّها إلى فيضان «إترو عا» أي النهر العظيم.'
  },
  {
    id: 'mn-k-4',
    tier: 'kids',
    hieroglyphs: '𓅓 𓊵',
    transliteration: 'm ḥtp',
    phoneticAr: 'إِم حُتُب',
    categoryLabelAr: 'تحايا وسلام',
    questionPromptAr: 'يودّع الكاتبُ صديقَه بهذه الكلمتين 𓅓 𓊵؛ فماذا يتمنى له؟',
    options: [
      { id: 'a', meaningAr: 'في عاصفة قوية', isCorrect: false },
      { id: 'b', meaningAr: 'في سلام وأمان وطمأنينة', isCorrect: true },
      { id: 'c', meaningAr: 'في مطبخ القصر', isCorrect: false },
      { id: 'd', meaningAr: 'في مسابقة الجري', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'برافو! 𓅓 تعني «في»، و𓊵 تعني «سلام/أمان»!',
    immediateFeedbackWrongAr: 'البومة 𓅓 هنا حرف جر بمعنى «في»، و𓊵 «حتب» تعني «السلام»؛ فتكون «في سلام»!',
    culturalContextAr: 'تشبه تماماً قولنا اليوم للضيف المسافر: «اذهب في أمان الله وسلامه».'
  },
  {
    id: 'mn-k-5',
    tier: 'kids',
    hieroglyphs: '𓉐 𓄤',
    transliteration: 'pr nfr',
    phoneticAr: 'بِر نِفِر',
    categoryLabelAr: 'البيت والمجتمع',
    questionPromptAr: 'اكتشف معنى علامة البيت 𓉐 مع علامة الجمال 𓄤:',
    options: [
      { id: 'a', meaningAr: 'البيت الجميل / الدار السعيدة', isCorrect: true },
      { id: 'b', meaningAr: 'الحجر الصلب الثقيل', isCorrect: false },
      { id: 'c', meaningAr: 'صياد السمك في النيل', isCorrect: false },
      { id: 'd', meaningAr: 'الرياح الشمالية الباردة', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'تطابق ذكي! البيت «بِر» + الجميل «نِفِر» = البيت الجميل!',
    immediateFeedbackWrongAr: 'تذكر ترتيب الصفة في الهيروغليفية: البيت 𓉐 أولاً ثم صفة الجميل 𓄤، أي «البيت الجميل»!',
    culturalContextAr: 'يأتي الموصوف دائماً قبل الصفة في المصرية القديمة تماماً مثل اللغة العربية!'
  },
  {
    id: 'mn-k-6',
    tier: 'kids',
    hieroglyphs: '𓋹 𓍑 𓋴',
    transliteration: 'ꜥnḫ wḏꜣ snb',
    phoneticAr: 'عَنْخ، وَجَا، سِنِب',
    categoryLabelAr: 'تحايا ملكية',
    questionPromptAr: 'هذه الثلاثية المقدسة تُكتب بعد اسم الملك دائماً؛ ما معناها؟',
    options: [
      { id: 'a', meaningAr: 'ذهب، فضة، نحاس', isCorrect: false },
      { id: 'b', meaningAr: 'حياة، ازدهار، صحة', isCorrect: true },
      { id: 'c', meaningAr: 'فجر، ظهر، ليل', isCorrect: false },
      { id: 'd', meaningAr: 'صيف، شتاء، ربيع', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'عبقري! عنخ = حياة، وجا = رخاء/فلاح، سنب = صحة وعافية!',
    immediateFeedbackWrongAr: 'كل حرف هنا اختصار لدعاء ملكي شهير: 𓋹 حياة، 𓍑 ازدهار، 𓋴 صحة!',
    culturalContextAr: 'تُشبه قولنا اليوم عند ذكر الكبار: «أدام الله له العمر والعافية والخير».'
  },

  // ADULTS TIER (6 questions)
  {
    id: 'mn-a-1',
    tier: 'adults',
    hieroglyphs: '𓊵 𓏙 𓇓',
    transliteration: 'ḥtp dj nsw',
    phoneticAr: 'حُتُب دِي نِسُو',
    categoryLabelAr: 'صيغ النصوص الكلاسيكية',
    questionPromptAr: 'تتصدر هذه الصيغة مئات اللوحات الجنائزية؛ ما الترجمة العلمية الدقيقة لها؟',
    options: [
      { id: 'a', meaningAr: 'قربانٌ يمنحه الملك (تقدمة سلام يهبها الملك)', isCorrect: true },
      { id: 'b', meaningAr: 'حربٌ يشنّها الملك على الأعداء', isCorrect: false },
      { id: 'c', meaningAr: 'إحصاءٌ لعدد سفن النيل الملكية', isCorrect: false },
      { id: 'd', meaningAr: 'بناءُ هرمٍ من الحجر الجيري', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'تحليل سليم 100%! رغم أن كلمة «نِسُو» (ملك 𓇓) تُكتب أولاً للتعظيم الشرفي (Honorific Transposition)، إلا أن قراءتها «حُتب دي نِسو» = قربان يمنحه الملك.',
    immediateFeedbackWrongAr: 'انتبه لقاعدة «التقديم الشرفي»: رمز الملك 𓇓 يتصدر السطر احتراماً، لكن الصيغة تُقرأ (ḥtp dj nsw): قربان يمنحه الملك!',
    culturalContextAr: 'تُعد قاعدة التقديم الشرفي لاسم الإله أو الملك من أهم قواعد قراءة النقوش الأثرية.'
  },
  {
    id: 'mn-a-2',
    tier: 'adults',
    hieroglyphs: '𓅭 𓇳',
    transliteration: 'sꜣ rꜥ',
    phoneticAr: 'سَا رَع',
    categoryLabelAr: 'الألقاب الملكية الخمسة',
    questionPromptAr: 'تُسبق الخرطوشة الشخصية للفرعون بهاتين العلامتين (البطة وقرص الشمس)؛ ما معناهما؟',
    options: [
      { id: 'a', meaningAr: 'سيد السماء والنجوم', isCorrect: false },
      { id: 'b', meaningAr: 'ابنُ رَع (إله الشمس)', isCorrect: true },
      { id: 'c', meaningAr: 'قائدُ الجيش في النوبة', isCorrect: false },
      { id: 'd', meaningAr: 'طائر الفينيق الذهبي', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'صحيح! البطة (G39) صوتها ثنائياً «سَا» (sꜣ) وتعني «ابن»، ومع قرص الشمس تعني «ابن رع»!',
    immediateFeedbackWrongAr: 'البطة 𓅭 (G39) تمثل ثنائي النطق «سَا» بمعنى الابن، و𓇳 هو رع؛ فيكون اللقب الملكي الخامس «ابن رع»!',
    culturalContextAr: 'يأتي لقب «سا-رع» قبل خرطوشة اسم الولادة الشخصي مثل توت عنخ آمون أو خفرع.'
  },
  {
    id: 'mn-a-3',
    tier: 'adults',
    hieroglyphs: '𓎟 𓇿𓇿',
    transliteration: 'nb tꜣwj',
    phoneticAr: 'نِب تَاوِي',
    categoryLabelAr: 'الألقاب السياسية',
    questionPromptAr: 'عندما تُكرر علامة الأرض مرتين 𓇿𓇿 بعد السلة 𓎟، فما المقصود؟',
    options: [
      { id: 'a', meaningAr: 'صاحب الحقول المزروعة فقط', isCorrect: false },
      { id: 'b', meaningAr: 'سيدُ الأرضين (مصر العليا ومصر السفلى)', isCorrect: true },
      { id: 'c', meaningAr: 'سلة الحصاد الذهبية', isCorrect: false },
      { id: 'd', meaningAr: 'نهاية رحلة الشمس ليلاً', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'إجابة أثرية موفقة! السلة 𓎟 تقرأ «نِب» (سيد/مالك)، والمثنّى 𓇿𓇿 يقرأ «تَاوِي» أي الأرضين (الدلتا والصعيد)!',
    immediateFeedbackWrongAr: 'تكرار الرمز مرتين يدل على المثنّى في الهيروغليفية؛ فـ 𓎟 = سيد، و𓇿𓇿 = الأرضين (الوجه البحري والقبلي)!',
    culturalContextAr: 'يرمز هذا اللقب للوحدة الوطنية التاريخية التي أرساها الملك نعرمر (مينا) حوالي 3100 ق.م.'
  },
  {
    id: 'mn-a-4',
    tier: 'adults',
    hieroglyphs: '𓌻𓂋𓇋𓇋 𓇋𓏠𓈖',
    transliteration: 'mrj jmn',
    phoneticAr: 'مَرِي إِمِن',
    categoryLabelAr: 'ألقاب الخراطيش',
    questionPromptAr: 'يظهر هذا التعبير داخل خراطيش رمسيس الثاني وأسماء الملوك؛ ما معناه الدقيق؟',
    options: [
      { id: 'a', meaningAr: 'محبوبُ الإله آمون', isCorrect: true },
      { id: 'b', meaningAr: 'باني معبد طيبة', isCorrect: false },
      { id: 'c', meaningAr: 'الكاتب الأعظم للنصوص', isCorrect: false },
      { id: 'd', meaningAr: 'حارس نهر النيل', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'بديع! الجذر «مر» 𓌻 (محبوب/حبيب) مع اسم آمون 𓇋𓏠𓈖 = محبوب آمون (مري آمون)!',
    immediateFeedbackWrongAr: 'الفأس الزراعية 𓌻 تعني «يحب / محبوب» (mrj)، و𓇋𓏠𓈖 هو اسم آمون؛ فالمعنى «محبوب آمون»!',
    culturalContextAr: 'غالباً ما يُكتب اسم المعبود أولاً بالتقديم الشرفي داخل الخرطوشة تعظيماً له.'
  },
  {
    id: 'mn-a-5',
    tier: 'adults',
    hieroglyphs: '𓋹 𓆓𓏏 𓇿',
    transliteration: 'ꜥnḫ ḏt',
    phoneticAr: 'عَنْخ جِت',
    categoryLabelAr: 'الخلود والأبدية',
    questionPromptAr: 'بماذا تُختم اللوحات الملكية عند كتابة 𓋹 𓆓𓏏 𓇿؟',
    options: [
      { id: 'a', meaningAr: 'منحِه الحياةَ أبد الدهر (حياً إلى الأبد)', isCorrect: true },
      { id: 'b', meaningAr: 'تُرك المعبدُ قبل الغروب', isCorrect: false },
      { id: 'c', meaningAr: 'انتهى موسمُ الفيضان', isCorrect: false },
      { id: 'd', meaningAr: 'جُمعت ضرائبُ الأقاليم', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'دقة متناهية! «جِت» 𓆓𓏏𓇿 تعني الأبدية الزمنية المستمرة، وبجوارها «عنخ» = حياً إلى الأبد.',
    immediateFeedbackWrongAr: 'الكلمة 𓆓𓏏𓇿 تُقرأ «جِت» وتعني «الأبد / الأبدية»؛ فتُقرأ العبارة «عَنْخ جِت» أي حياً إلى الأبد!',
    culturalContextAr: 'يفرّق المصريون بين نوعين من الأبدية: «نِحِح» (الزمن الدوري المتجدد كالشمس) و«جِت» (الخلود الثابت).'
  },
  {
    id: 'mn-a-6',
    tier: 'adults',
    hieroglyphs: '𓇋𓂋𓇋 𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'jrj mꜣꜥt',
    phoneticAr: 'إِرِي مَاعَت',
    categoryLabelAr: 'الأخلاق والحكم',
    questionPromptAr: 'ما الوصية المركزية التي تلخّص واجب الملك والقاضي في عبارة «إري ماعت»؟',
    options: [
      { id: 'a', meaningAr: 'أَقِمِ الحقَّ واعمَلْ بالعدل والنظام', isCorrect: true },
      { id: 'b', meaningAr: 'اجمعْ ذهبَ الصحراء الشرقية', isCorrect: false },
      { id: 'c', meaningAr: 'سافرْ بالسفنِ نحو البحرِ الأحمر', isCorrect: false },
      { id: 'd', meaningAr: 'ازرعِ القمحَ في فصلِ الحصاد', isCorrect: false }
    ],
    immediateFeedbackCorrectAr: 'فهم راسخ! الفعل 𓇋𓂋𓇋 «إِري» يعني «يعمل / يفعل»، ومع «ماعت» = أقم العدل والحق.',
    immediateFeedbackWrongAr: 'الفعل «إِري» (العين 𓁹 أو القصبة والراء) معناه «اعمل/اصنع»، و«ماعت» هي الحق والعدل؛ أي «اعمل بالحق»!',
    culturalContextAr: 'تكررت هذه العبارة في تعاليم الحكماء بتاح حتب وأمنموبي كجوهر للأخلاق المصرية القديمة.'
  }
];
