export type GrammarCategoryId = 'verbal' | 'adjectival' | 'nominal' | 'prepositions_pronouns';

export type SyntaxRoleType = 'verb' | 'subject' | 'object' | 'adjective' | 'particle';

export interface GrammarSymbolToken {
  id: string;
  glyphs: string;
  gardiner: string;
  transliteration: string;
  phoneticAr: string;
  meaningAr: string;
  roleType: SyntaxRoleType;
  roleLabelAr: string;
  signCompositionAr: string;
  grammarExplanationAr: string;
  arabicComparisonAr: string;
}

export interface GrammarExampleSentence {
  id: string;
  titleAr: string;
  hieroglyphs: string;
  transliteration: string;
  phoneticReadingAr: string;
  translationAr: string;
  structurePatternAr: string;
  syntaxNoteAr: string;
  tokens: GrammarSymbolToken[];
}

export interface GrammarRuleSection {
  id: GrammarCategoryId;
  titleAr: string;
  subtitleAr: string;
  formulaStepsAr: { roleType: SyntaxRoleType; labelAr: string }[];
  coreRuleAr: string;
  keyTakeawayAr: string;
  examples: GrammarExampleSentence[];
}

export interface GrammarQuickCheck {
  id: string;
  questionAr: string;
  sentenceGlyphs: string;
  highlightedGlyph: string;
  phoneticAr: string;
  translationAr: string;
  options: { id: string; textAr: string; isCorrect: boolean }[];
  explanationAr: string;
}

export const SYNTAX_ROLE_STYLES: Record<
  SyntaxRoleType,
  { cardBg: string; border: string; text: string; roleTagBg: string }
> = {
  verb: {
    cardBg: 'bg-amber-50/90',
    border: 'border-amber-400',
    text: 'text-amber-950',
    roleTagBg: 'bg-amber-800 text-white'
  },
  subject: {
    cardBg: 'bg-sky-50/90',
    border: 'border-sky-400',
    text: 'text-sky-950',
    roleTagBg: 'bg-sky-800 text-white'
  },
  object: {
    cardBg: 'bg-emerald-50/90',
    border: 'border-emerald-400',
    text: 'text-emerald-950',
    roleTagBg: 'bg-emerald-800 text-white'
  },
  adjective: {
    cardBg: 'bg-violet-50/90',
    border: 'border-violet-400',
    text: 'text-violet-950',
    roleTagBg: 'bg-violet-800 text-white'
  },
  particle: {
    cardBg: 'bg-stone-100',
    border: 'border-stone-400',
    text: 'text-stone-900',
    roleTagBg: 'bg-stone-700 text-white'
  }
};

export const SIMPLIFIED_GRAMMAR_SECTIONS: GrammarRuleSection[] = [
  {
    id: 'verbal',
    titleAr: '1. الجملة الفعلية (الفعل أولاً)',
    subtitleAr: 'كيف يرتب المصري القديم الفعل والفاعل والمفعول به؟',
    formulaStepsAr: [
      { roleType: 'verb', labelAr: '① الفعل أولاً' },
      { roleType: 'subject', labelAr: '② الفاعل' },
      { roleType: 'object', labelAr: '③ المفعول به' }
    ],
    coreRuleAr:
      'تشبه الجملة الفعلية في المصرية الكلاسيكية الجملة الفعلية العربية تماماً؛ فهي تبدأ بـ«الفعل»، يليه «الفاعل»، ثم «المفعول به» (VSO). وعادةً ما يحمل الفعل في نهايته «مخصصاً» يوضح طبيعة الحدث كالعين أو الذراع أو القدمين.',
    keyTakeawayAr: 'الترتيب الذهبي: فعل ← فاعل ← مفعول به (مثل: يسمعُ الابنُ الكلامَ).',
    examples: [
      {
        id: 'ex-verbal-scribe',
        titleAr: 'يفعل / يعدّ الكاتبُ كتاباً',
        hieroglyphs: '𓁹 𓏞 𓏛',
        transliteration: 'ỉrỉ sš mḏꜣt',
        phoneticReadingAr: 'إِيرِي سِش مِجَات',
        translationAr: 'يصنعُ (يعدّ) الكاتبُ كتاباً مخطوطاً',
        structurePatternAr: 'فعل (إيري) + فاعل (سِش) + مفعول به (مِجَات)',
        syntaxNoteAr:
          'لاحظ أن كل رمز في الجملة يؤدي وظيفة محددة: العين للفعل، محبرة البوص للفاعل (الكاتب)، ولفافة البردي للمفعول به (الكتاب).',
        tokens: [
          {
            id: 'tok-v1-1',
            glyphs: '𓁹',
            gardiner: 'D4',
            transliteration: 'ỉrỉ',
            phoneticAr: 'إِيرِي',
            meaningAr: 'يفعل / يصنع / يعدّ',
            roleType: 'verb',
            roleLabelAr: 'فعل مضارع/ماضٍ (جاء أول الجملة)',
            signCompositionAr: 'رمز العين (D4) يُستخدم هنا كعلامة صوتية ومفهومية لجذر الفعل «إير» (صنع/عمل).',
            grammarExplanationAr: 'تصدر الجملة لأنه الحدث الرئيسي، كما في العربية: «يكتبُ الكاتبُ».',
            arabicComparisonAr: 'بداية الجملة بالفعل مطابقة لنظام الجملة الفعلية في اللغة العربية الفصحى.'
          },
          {
            id: 'tok-v1-2',
            glyphs: '𓏞',
            gardiner: 'Y3',
            transliteration: 'sš',
            phoneticAr: 'سِش',
            meaningAr: 'الكاتب',
            roleType: 'subject',
            roleLabelAr: 'فاعل (مَن قام بالفعل)',
            signCompositionAr: 'لوحة ألوان الكاتب ومقلمة البوص وإبريق الماء (Y3) تدل مباشرة على كلمة الكاتب.',
            grammarExplanationAr: 'جاء مباشرة بعد الفعل ليحدد الشخص الذي يقوم بكتابة أو إعداد المخطوط.',
            arabicComparisonAr: 'مقابل لفظة الفاعل المرفوع بعد الفعل مباشرة.'
          },
          {
            id: 'tok-v1-3',
            glyphs: '𓏛',
            gardiner: 'Y1',
            transliteration: 'mḏꜣt',
            phoneticAr: 'مِجَات',
            meaningAr: 'كتاب / لفافة بردي',
            roleType: 'object',
            roleLabelAr: 'مفعول به (ما وقع عليه الفعل)',
            signCompositionAr: 'لفافة بردي مربوطة ومختومة (Y1) تعمل أيديوجراماً للكتاب والوثيقة.',
            grammarExplanationAr: 'تأخر إلى الموضع الثالث لأن المفعول به الاسم يتبع الفاعل في الترتيب القياسي.',
            arabicComparisonAr: 'يؤدي دور المفعول به المنصوب في نهاية الجملة.'
          }
        ]
      },
      {
        id: 'ex-verbal-hear',
        titleAr: 'يسمعُ الابنُ الكلامَ',
        hieroglyphs: '𓋴𓆓𓅓 𓅭 𓌃𓂧𓏏',
        transliteration: 'sḏm zꜣ mdw.t',
        phoneticReadingAr: 'سِجِم زَا مِدُوت',
        translationAr: 'يسمعُ (يُصغي) الابنُ إلى الكلامِ',
        structurePatternAr: 'فعل (سِجِم) + فاعل (زَا) + مفعول به (مِدُوت)',
        syntaxNoteAr:
          'الفعل «سِجِم» من أشهر أفعال القواعد المصرية، حتى إن علماء المصريات يطلقون على صيغة الفعل القياسية اسم صيغة (سجم-إف sḏm.f).',
        tokens: [
          {
            id: 'tok-v2-1',
            glyphs: '𓋴𓆓𓅓',
            gardiner: 'S29 + I10 + G17',
            transliteration: 'sḏm',
            phoneticAr: 'سِجِم',
            meaningAr: 'يسمع / يُصغي / يطيع',
            roleType: 'verb',
            roleLabelAr: 'فعل (صيغة سجم الأساسية)',
            signCompositionAr: 'القماش المطوي (س) + الأفعى (ج) + البومة (م) تشكّل معاً الجذر الصوتي الثلاثي س-ج-م.',
            grammarExplanationAr: 'يفتتح الجملة الفعلية ويحدد فعل السمع والطاعة.',
            arabicComparisonAr: 'يشترك في الجذر الدلالي للمعنى والترتيب الفعلي مع العربية (يسمعُ الابنُ).'
          },
          {
            id: 'tok-v2-2',
            glyphs: '𓅭',
            gardiner: 'G39',
            transliteration: 'zꜣ',
            phoneticAr: 'زَا',
            meaningAr: 'الابن',
            roleType: 'subject',
            roleLabelAr: 'فاعل (الاسم القائم بالفعل)',
            signCompositionAr: 'البطة العائمة (G39) علامة ثنائية الصوت تُقرأ «زا» وتعني الابن.',
            grammarExplanationAr: 'وقع بعد الفعل مباشرة لبيان أن الابن هو المستمع.',
            arabicComparisonAr: 'فاعل الجملة يأتي ثانياً بعد الفعل.'
          },
          {
            id: 'tok-v2-3',
            glyphs: '𓌃𓂧𓏏',
            gardiner: 'S43 + D46 + X1',
            transliteration: 'mdw.t',
            phoneticAr: 'مِدُوت',
            meaningAr: 'الكلام / القول',
            roleType: 'object',
            roleLabelAr: 'مفعول به (مسموع)',
            signCompositionAr: 'عصا الكلام (S43) + اليد «د» (D46) + رغيف التاء (X1) الدال على المصدر المؤنث.',
            grammarExplanationAr: 'المفعول به الذي يقع عليه فعل السمع في ختام الجملة.',
            arabicComparisonAr: 'تاء الخاتمة «.t» في الهيروغليفية تقابل تاء التأنيث والمصدر في العربية (مثل: كلمة).'
          }
        ]
      },
      {
        id: 'ex-verbal-king',
        titleAr: 'يمنحُ الملكُ السلامَ (التقديم الشرفي)',
        hieroglyphs: '𓏙 𓇓 𓊵𓏏𓊪',
        transliteration: 'dỉ nsw ḥtp',
        phoneticReadingAr: 'دِي نِسُو حُتُب',
        translationAr: 'يعطي الملكُ السلامَ والرضا',
        structurePatternAr: 'فعل (دِي) + فاعل (نِسُو) + مفعول به (حُتُب)',
        syntaxNoteAr:
          'في النقوش الحجرية الحقيقية غالباً ما يُرسم نبات الملك (𓇓) أولاً من باب التوقير البصري فقط، لكنه يُقرأ نحوياً بعد الفعل: «دِي نِسُو»!',
        tokens: [
          {
            id: 'tok-v3-1',
            glyphs: '𓏙',
            gardiner: 'X8',
            transliteration: 'dỉ',
            phoneticAr: 'دِي',
            meaningAr: 'يعطي / يهب / يمنح',
            roleType: 'verb',
            roleLabelAr: 'فعل دعاء أو عطاء',
            signCompositionAr: 'رغيف مخروطي (X8) يمثل جذر الفعل «إعطاء».',
            grammarExplanationAr: 'هو الفعل الافتتاحي في مئات الآلاف من نصوص القرابين والمعابد.',
            arabicComparisonAr: 'يشبه صيغ الدعاء الفعلية في العربية: «وهبَ الملكُ...».'
          },
          {
            id: 'tok-v3-2',
            glyphs: '𓇓',
            gardiner: 'M23',
            transliteration: 'nsw',
            phoneticAr: 'نِسُو',
            meaningAr: 'الملك',
            roleType: 'subject',
            roleLabelAr: 'فاعل (صاحب العطاء)',
            signCompositionAr: 'نبات السوت الملكي (M23) هو شعار ملوك مصر العليا ولقب الملك.',
            grammarExplanationAr: 'فاعل الجملة رغم أن الكاتب قد يرسمه قبل الفعل أحياناً احتراماً (تقديم شرفي).',
            arabicComparisonAr: 'يظهر هنا حس الاحترام البروتوكولي في ترتيب الرسم دون تغيير القاعدة النحوية.'
          },
          {
            id: 'tok-v3-3',
            glyphs: '𓊵𓏏𓊪',
            gardiner: 'R4 + X1 + Q3',
            transliteration: 'ḥtp',
            phoneticAr: 'حُتُب',
            meaningAr: 'السلام / الرضا / القربان',
            roleType: 'object',
            roleLabelAr: 'مفعول به',
            signCompositionAr: 'حصير القربان (R4) يتلوه رغيف التاء (X1) والمقعد باء (Q3) كمتممات صوتية لكلمة «حتب».',
            grammarExplanationAr: 'يكمل معنى العطاء ليكون السلام والرضا هو الشيء الممنوح.',
            arabicComparisonAr: 'تؤكد العلامات الأخيرة الصوت كما تؤكد الحركات نهاية الكلمة العربية.'
          }
        ]
      }
    ]
  },
  {
    id: 'adjectival',
    titleAr: '2. جمل الوصف والنعت',
    subtitleAr: 'الفرق الدقيق بين «البيتُ جميلٌ» (جملة تامة) و«بيتٌ جميلٌ» (نعت)',
    formulaStepsAr: [
      { roleType: 'adjective', labelAr: '① الصفة أولاً (في الخبر)' },
      { roleType: 'subject', labelAr: '② الموصوف ثانياً' }
    ],
    coreRuleAr:
      'في اللغة المصرية القديمة قاعدة بصرية ذكية جداً: عندما تصف شيئاً في جملة خبرية كاملة («البيتُ جميلٌ»)، تتقدّم الصفةُ أولاً: «نِفِر بِر» (جميلٌ البيتُ). أما إذا أردت مجرد وصف جزئي (نعت: «سيدةٌ جميلةٌ»)، يأتي الاسم أولاً وتتبعه الصفة مع علامة التأنيث (.t) إن كان مؤنثاً!',
    keyTakeawayAr: 'تقدُّم الصفة = جملة خبرية كاملة | تأخّر الصفة وتطابقها = نعت ملازم للاسم.',
    examples: [
      {
        id: 'ex-adj-house',
        titleAr: 'جملة وصفية خبرية: هذا البيتُ جميلٌ',
        hieroglyphs: '𓄤 𓉐 𓊪𓈖',
        transliteration: 'nfr pr pn',
        phoneticReadingAr: 'نِفِر بِر پِن',
        translationAr: 'جميلٌ هذا البيتُ (هذا البيتُ جميلٌ)',
        structurePatternAr: 'خبر وصفي مقدّم (نِفِر) + موصوف/مبتدأ (بِر) + اسم إشارة (پِن)',
        syntaxNoteAr:
          'بدأت الجملة بالصفة «نفر» أولاً، مما يحوّلها تلقائياً إلى جملة تامة المعنى بمعنى: «البيت جميل» دون الحاجة لفعل «يكون»!',
        tokens: [
          {
            id: 'tok-a1-1',
            glyphs: '𓄤',
            gardiner: 'F35',
            transliteration: 'nfr',
            phoneticAr: 'نِفِر',
            meaningAr: 'جميلٌ / طيّبٌ',
            roleType: 'adjective',
            roleLabelAr: 'خبر وصفي متقدّم (صفة)',
            signCompositionAr: 'علامة القلب والقصبة الهوائية (F35) هي أشهر صفة في الهيروغليفية.',
            grammarExplanationAr: 'تقدّم الصفة في بداية الجملة يعني أنك تخبر السامع بأن الشيء جميل، ولا تتغير إلى المؤنث هنا حتى لو كان الموصوف مؤنثاً.',
            arabicComparisonAr: 'يقابل أسلوب التقديم العربي أحياناً: «جميلٌ هذا البيتُ».'
          },
          {
            id: 'tok-a1-2',
            glyphs: '𓉐',
            gardiner: 'O1',
            transliteration: 'pr',
            phoneticAr: 'بِر',
            meaningAr: 'البيت / الدار',
            roleType: 'subject',
            roleLabelAr: 'الموصوف (المبتدأ المؤخر)',
            signCompositionAr: 'مخطط مستطيل لدار بمدخل مفتوح (O1) ينطق «بِر» ويعني البيت.',
            grammarExplanationAr: 'جاء بعد الصفة ليكون الموضوع الذي نصفه بالجمال.',
            arabicComparisonAr: 'المبتدأ المؤخر الذي يُخبر عنه بالصفة الأولى.'
          },
          {
            id: 'tok-a1-3',
            glyphs: '𓊪𓈖',
            gardiner: 'Q3 + N35',
            transliteration: 'pn',
            phoneticAr: 'پِن',
            meaningAr: 'هذا (اسم إشارة للمذكر)',
            roleType: 'particle',
            roleLabelAr: 'اسم إشارة (يأتي بعد الاسم)',
            signCompositionAr: 'المقعد (پ) + تموج الماء (ن) يشكلان اسم الإشارة القريب «هذا».',
            grammarExplanationAr: 'أسماء الإشارة في المصرية القديمة تتبع الاسم المشار إليه عكس العربية.',
            arabicComparisonAr: 'في العربية نقول «هذا البيت»؛ أما في المصرية فنقول «البيتُ هذا» (بِر پِن).'
          }
        ]
      },
      {
        id: 'ex-adj-lady',
        titleAr: 'النعت المتطابق: سيدةٌ جميلةٌ (الاسم أولاً)',
        hieroglyphs: '𓊃𓏏 𓁐 𓄤𓏏',
        transliteration: 'st nfr.t',
        phoneticReadingAr: 'سِت نِفْرِت',
        translationAr: 'امرأةٌ (سيدةٌ) جميلةٌ',
        structurePatternAr: 'اسم موصوف مؤنث (سِت) + نعت متأخر مؤنث (نِفْرِت)',
        syntaxNoteAr:
          'عندما تأخر الوصف بعد الاسم، تطابق معه في التأنيث فأُضيف رغيف الخبز 𓏏 (.t) إلى نهاية الاسم وإلى نهاية الصفة تماماً كالتاء المربوطة!',
        tokens: [
          {
            id: 'tok-a2-1',
            glyphs: '𓊃𓏏 𓁐',
            gardiner: 'O34 + X1 + B1',
            transliteration: 'st',
            phoneticAr: 'سِت',
            meaningAr: 'السيدة / المرأة',
            roleType: 'subject',
            roleLabelAr: 'الاسم الموصوف (مؤنث)',
            signCompositionAr: 'مزلاج الباب (س) + رغيف التاء للتأنيث (.t) + مخصص المرأة الجالسة (B1).',
            grammarExplanationAr: 'تقدّم الاسم لأنه الموصوف في تركيب النعت، وعلامة (B1) لا تُنطق بل توضح أن الكلمة أنثى.',
            arabicComparisonAr: 'مماثل لترتيب العربية في النعت: «امرأةٌ ...» (الاسم قبل النعت).'
          },
          {
            id: 'tok-a2-2',
            glyphs: '𓄤𓏏',
            gardiner: 'F35 + X1',
            transliteration: 'nfr.t',
            phoneticAr: 'نِفْرِت',
            meaningAr: 'جميلةٌ',
            roleType: 'adjective',
            roleLabelAr: 'نعت متأخر مطابق في التأنيث',
            signCompositionAr: 'علامة الحسن «نِفِر» مضافاً إليها رغيف الخبز 𓏏 كعلامة تأنيث.',
            grammarExplanationAr: 'أُضيفت التاء (.t) لأن النعت يتبع المنعوت في الجنس والعدد (كما في اسم الملكة نفرتاري ونفرتيتي).',
            arabicComparisonAr: 'مطابقة تامة للعربية: امرأةٌ جميلةٌ (التاء في آخر الكلمتين).'
          }
        ]
      },
      {
        id: 'ex-adj-nile',
        titleAr: 'جملة وصفية: نهرُ النيلِ عظيمٌ',
        hieroglyphs: '𓅨𓂋 𓇋𓏏𓂋𓅱',
        transliteration: 'wr ỉtrw',
        phoneticReadingAr: 'وِر إِتْرُو',
        translationAr: 'عظيمٌ النهرُ (النيلُ عظيمٌ)',
        structurePatternAr: 'صفة خبرية مقدمة (وِر) + موصوف (إِتْرُو)',
        syntaxNoteAr:
          'جملة قصيرة بليغة تُثبت أن النعت إذا صار خبراً قُدّم في أول الكلام دون أدوات ربط.',
        tokens: [
          {
            id: 'tok-a3-1',
            glyphs: '𓅨𓂋',
            gardiner: 'G36 + D21',
            transliteration: 'wr',
            phoneticAr: 'وِر',
            meaningAr: 'عظيمٌ / كبيرٌ / جليلٌ',
            roleType: 'adjective',
            roleLabelAr: 'خبر وصفي مقدّم',
            signCompositionAr: 'طائر السنونو (G36) مع الفم (D21) كمتمم صوتي لحرف الراء.',
            grammarExplanationAr: 'صدارة الصفة تصنع جملة خبرية كاملة: «عظيمٌ هو...».',
            arabicComparisonAr: 'يشبه أسلوب التعجب والمدح العربي: «عظيمٌ نهرُ النيل».'
          },
          {
            id: 'tok-a3-2',
            glyphs: '𓇋𓏏𓂋𓅱',
            gardiner: 'M17 + X1 + D21 + G43',
            transliteration: 'ỉtrw',
            phoneticAr: 'إِتْرُو',
            meaningAr: 'النهر العظيم (النيل)',
            roleType: 'subject',
            roleLabelAr: 'الموصوف',
            signCompositionAr: 'ورقة الغاب (إ) + رغيف الخبز (ت) + الفم (ر) + فرخ السمان (و).',
            grammarExplanationAr: 'الاسم الذي نُسند إليه صفة العظمة.',
            arabicComparisonAr: 'بقيت الكلمة في التراث القبطي (إيور / يار) بمعنى النهر والترعة.'
          }
        ]
      }
    ]
  },
  {
    id: 'nominal',
    titleAr: '3. الجملة الاسمية وأداة الربط (پُو)',
    subtitleAr: 'كيف يقول المصري القديم «القلبُ هو المرشدُ» دون فعل «يكون»؟',
    formulaStepsAr: [
      { roleType: 'subject', labelAr: '① المبتدأ' },
      { roleType: 'particle', labelAr: '② أداة الربط (پُو = هو)' },
      { roleType: 'adjective', labelAr: '③ الخبر الاسمي' }
    ],
    coreRuleAr:
      'لربط اسمٍ باسمٍ آخر (مبتدأ وخبر معرفين أو حقيقتين ثابتتين)، يستخدم المصري القديم الكلمة السحرية «پُو» (𓊪𓅱) التي تعمل تماماً مثل ضمير الفصل «هو / هي / هم» في اللغة العربية!',
    keyTakeawayAr: 'المبتدأ + پُو (هو) + الخبر = جملة اسمية تقريرية واضحة.',
    examples: [
      {
        id: 'ex-nom-heart',
        titleAr: 'القلبُ هو المرشدُ',
        hieroglyphs: '𓄣 𓊪𓅱 𓋴𓌞𓅓',
        transliteration: 'ỉb pw sšm',
        phoneticReadingAr: 'إِبْ پُو سِشِم',
        translationAr: 'القلبُ هو المرشدُ (الضميرُ دليلُ الإنسان)',
        structurePatternAr: 'مبتدأ (إِبْ) + ضمير فصل (پُو) + خبر (سِشِم)',
        syntaxNoteAr:
          'أداة «پُو» لا تتغير صيغتها سواء كان المبتدأ مذكراً أو مؤنثاً أو جمعاً في العصر الكلاسيكي!',
        tokens: [
          {
            id: 'tok-n1-1',
            glyphs: '𓄣',
            gardiner: 'F34',
            transliteration: 'ỉb',
            phoneticAr: 'إِبْ',
            meaningAr: 'القلب / الفؤاد',
            roleType: 'subject',
            roleLabelAr: 'مبتدأ',
            signCompositionAr: 'رمز القلب البشري (F34) يقرأ «إِب».',
            grammarExplanationAr: 'يمثل المبتدأ أو الفكرة الرئيسية في الجملة الاسمية.',
            arabicComparisonAr: 'يقابل كلمة «لُبّ» و«قلب» في العربية السامية المشتركة.'
          },
          {
            id: 'tok-n1-2',
            glyphs: '𓊪𓅱',
            gardiner: 'Q3 + G43',
            transliteration: 'pw',
            phoneticAr: 'پُو',
            meaningAr: 'هو / هي (ضمير ربط)',
            roleType: 'particle',
            roleLabelAr: 'ضمير فصل وربط بين المبتدأ والخبر',
            signCompositionAr: 'المقعد (پ) + فرخ السمان (و).',
            grammarExplanationAr: 'يربط المبتدأ بالخبر ويفيد التوكيد والتعريف مثل «هو» في: «العلمُ هو النورُ».',
            arabicComparisonAr: 'مطابق وظيفياً لضمير الفصل في النحو العربي.'
          },
          {
            id: 'tok-n1-3',
            glyphs: '𓋴𓌞𓅓',
            gardiner: 'S29 + T18 + G17',
            transliteration: 'sšm',
            phoneticAr: 'سِشِم',
            meaningAr: 'المرشد / القائد',
            roleType: 'adjective',
            roleLabelAr: 'خبر الجملة الاسمية',
            signCompositionAr: 'القماش (س) + عصا التوجيه (ش) + البومة (م).',
            grammarExplanationAr: 'يخبر عن وظيفة القلب بوصفه الدليل الذي يهدي صاحبه.',
            arabicComparisonAr: 'خبر مرفوع يتمّ به معنى الجملة الاسمية.'
          }
        ]
      }
    ]
  },
  {
    id: 'prepositions_pronouns',
    titleAr: '4. حروف الجر والضمائر المتصلة',
    subtitleAr: 'كيف تضيف «ـهُ»، «ـكَ»، و«في / لـِ» إلى الكلمة الهيروغليفية؟',
    formulaStepsAr: [
      { roleType: 'subject', labelAr: '① الاسم أو الفعل' },
      { roleType: 'particle', labelAr: '② الضمير المتصل (ـك / ـه) أو حرف الجر' }
    ],
    coreRuleAr:
      'كما نصل في العربية الضمائر بآخر الاسم مثل «بيتُـهُ» و«اسمُـكَ»، يفعل المصري القديم الشيء ذاته بإلصاق أفعى (𓆑 = ـهُ) أو سلة (𓎡 = ـكَ) بنهاية الكلمة! أما حروف الجر فتأتي قبل الاسم مثل: 𓅓 (في/بـ) و𓈖 (لـِ).',
    keyTakeawayAr: '𓆑 = ـهُ | 𓎡 = ـكَ | 𓅓 = في/بـ | 𓈖 = لـِ.',
    examples: [
      {
        id: 'ex-prep-house',
        titleAr: 'بيتُهُ في سلامٍ وعافية',
        hieroglyphs: '𓉐 𓆑 𓅓 𓊵𓏏𓊪',
        transliteration: 'pr.f m ḥtp',
        phoneticReadingAr: 'بِر-إِف إِم حُتُب',
        translationAr: 'بيتُهُ في سلامٍ وطمأنينة',
        structurePatternAr: 'اسم (بِر) + ضمير متصل (إِف = ـهُ) + حرف جر (إِم = في) + مجرور (حُتُب)',
        syntaxNoteAr:
          'يتصل الضمير بالاسم مباشرة فيعبر عن الملكية، ثم يربط حرف الجر «إم» (البومة) الاسم بحالة السلام.',
        tokens: [
          {
            id: 'tok-p1-1',
            glyphs: '𓉐',
            gardiner: 'O1',
            transliteration: 'pr',
            phoneticAr: 'بِر',
            meaningAr: 'بيت',
            roleType: 'subject',
            roleLabelAr: 'اسم مضاف (مبتدأ)',
            signCompositionAr: 'مخطط البيت (O1).',
            grammarExplanationAr: 'الاسم الأساسي الذي يضاف إليه الضمير المتصل.',
            arabicComparisonAr: 'يقابل الاسم المضاف قبل ضمير الغائب.'
          },
          {
            id: 'tok-p1-2',
            glyphs: '𓆑',
            gardiner: 'I9',
            transliteration: '.f',
            phoneticAr: 'ـإِف',
            meaningAr: 'ـهُ (ضمير الغائب المذكر)',
            roleType: 'particle',
            roleLabelAr: 'ضمير متصل للملكية',
            signCompositionAr: 'الأفعى المقرنة (I9) تمثل صوت الفاء وهي الضمير المتصل للغائب.',
            grammarExplanationAr: 'تُكتب بعد الاسم مباشرة لتعطي معنى «بيته» أو «كتابه».',
            arabicComparisonAr: 'تماماً كهاء الغائب المتصلة في العربية: «بيتُـهُ».'
          },
          {
            id: 'tok-p1-3',
            glyphs: '𓅓',
            gardiner: 'G17',
            transliteration: 'm',
            phoneticAr: 'إِم',
            meaningAr: 'في / بـِ',
            roleType: 'particle',
            roleLabelAr: 'حرف جر ومكان/حال',
            signCompositionAr: 'البومة (G17) بصوت الميم.',
            grammarExplanationAr: 'أشهر حرف جر مصري، يفيد الظرفية أو الحال قبل الاسم.',
            arabicComparisonAr: 'مثل حرف الجر «في» أو الباء العربية.'
          },
          {
            id: 'tok-p1-4',
            glyphs: '𓊵𓏏𓊪',
            gardiner: 'R4 + X1 + Q3',
            transliteration: 'ḥtp',
            phoneticAr: 'حُتُب',
            meaningAr: 'سلام / أمان',
            roleType: 'object',
            roleLabelAr: 'اسم مجرور بحرف الجر',
            signCompositionAr: 'حصير القربان والمتممات الصوتية.',
            grammarExplanationAr: 'الاسم الواقع بعد حرف الجر «إم» ليُتم الخبر شبه الجملة.',
            arabicComparisonAr: 'يشكّل مع «إم» شبه جملة خبر: «في سلامٍ».'
          }
        ]
      },
      {
        id: 'ex-prep-name',
        titleAr: 'اسمُكَ جميلٌ',
        hieroglyphs: '𓄤 𓂋𓈖 𓎡',
        transliteration: 'nfr rn.k',
        phoneticReadingAr: 'نِفِر رِن-إِك',
        translationAr: 'جميلٌ اسمُكَ (اسمُكَ جميلٌ)',
        structurePatternAr: 'صفة خبرية (نِفِر) + اسم (رِن) + ضمير المخاطب (ـإِك)',
        syntaxNoteAr:
          'تجمع هذه الجملة القصيرة قاعدتين معاً: جملة الوصف (تقدّم الصفة «نفر») + الضمير المتصل «ـك» للمخاطب!',
        tokens: [
          {
            id: 'tok-p2-1',
            glyphs: '𓄤',
            gardiner: 'F35',
            transliteration: 'nfr',
            phoneticAr: 'نِفِر',
            meaningAr: 'جميلٌ / حسنٌ',
            roleType: 'adjective',
            roleLabelAr: 'خبر وصفي مقدّم',
            signCompositionAr: 'علامة الجمال والحسن (F35).',
            grammarExplanationAr: 'تصدر الجملة لأنه خبر وصفي.',
            arabicComparisonAr: '«جميلٌ» في محل خبر مقدم.'
          },
          {
            id: 'tok-p2-2',
            glyphs: '𓂋𓈖',
            gardiner: 'D21 + N35',
            transliteration: 'rn',
            phoneticAr: 'رِن',
            meaningAr: 'اسم',
            roleType: 'subject',
            roleLabelAr: 'اسم مضاف (مبتدأ مؤخر)',
            signCompositionAr: 'الفم (ر) + تموج الماء (ن) = رِن (الاسم).',
            grammarExplanationAr: 'من الكلمات الأساسية في التراث الجنائزي والشخصي.',
            arabicComparisonAr: 'يقابل المبتدأ المؤخر «اسمُ...».'
          },
          {
            id: 'tok-p2-3',
            glyphs: '𓎡',
            gardiner: 'V31',
            transliteration: '.k',
            phoneticAr: 'ـإِك',
            meaningAr: 'ـكَ (ضمير المخاطب المفرد)',
            roleType: 'particle',
            roleLabelAr: 'ضمير متصل للمخاطب',
            signCompositionAr: 'السلة ذات المقبض (V31) بصوت الكاف.',
            grammarExplanationAr: 'نفس صوت الكاف العربي للمخاطب تماماً («رِن-إِك» = «اسمُ-كَ»)!',
            arabicComparisonAr: 'تطابق صوتي ونحوي مذهل بين المصرية القديمة والعربية في كاف المخاطب (.k = ـكَ)!'
          }
        ]
      }
    ]
  }
];

export const GRAMMAR_QUICK_CHECKS: GrammarQuickCheck[] = [
  {
    id: 'gqc-1',
    questionAr: 'في الجملة الوصفية «𓄤 𓉐 𓊪𓈖» (نِفِر بِر پِن = هذا البيتُ جميلٌ)، لماذا جاءت علامة «𓄤» في أول الجملة؟',
    sentenceGlyphs: '𓄤 𓉐 𓊪𓈖',
    highlightedGlyph: '𓄤',
    phoneticAr: 'نِفِر',
    translationAr: 'هذا البيتُ جميلٌ',
    options: [
      { id: 'o1', textAr: 'لأن الصفة الخبرية تأتي أول الجملة لتعطي معنى تاماً (جميلٌ البيتُ)', isCorrect: true },
      { id: 'o2', textAr: 'لأنها فعل مضارع بمعنى يسكن', isCorrect: false },
      { id: 'o3', textAr: 'لأنها حرف جر بمعنى داخل', isCorrect: false }
    ],
    explanationAr: 'صحيح! في الجملة الوصفية الخبرية تتقدّم الصفة أول الجملة («نِفِر بِر» = جميلٌ البيت) دون الحاجة لفعل «يكون».'
  },
  {
    id: 'gqc-2',
    questionAr: 'في الجملة الفعلية «𓋴𓆓𓅓 𓅭 𓌃𓂧𓏏» (سِجِم زَا مِدُوت = يسمعُ الابنُ الكلامَ)، ما هي وظيفة رمز البطة «𓅭»؟',
    sentenceGlyphs: '𓋴𓆓𓅓 𓅭 𓌃𓂧𓏏',
    highlightedGlyph: '𓅭',
    phoneticAr: 'زَا',
    translationAr: 'يسمعُ الابنُ الكلامَ',
    options: [
      { id: 'o1', textAr: 'مفعول به في آخر الجملة', isCorrect: false },
      { id: 'o2', textAr: 'فاعل الجملة (الابن) وقد جاء بعد الفعل مباشرة', isCorrect: true },
      { id: 'o3', textAr: 'ضمير متصل للمخاطب', isCorrect: false }
    ],
    explanationAr: 'أحسنت! تتبع الجملة الفعلية ترتيب (فعل + فاعل + مفعول)، لذلك فالكلمة الثانية «𓅭» (الابن) هي الفاعل.'
  },
  {
    id: 'gqc-3',
    questionAr: 'ما وظيفة السلة ذات المقبض «𓎡» في آخر كلمة «𓂋𓈖 𓎡» (رِن-إِك)؟',
    sentenceGlyphs: '𓄤 𓂋𓈖 𓎡',
    highlightedGlyph: '𓎡',
    phoneticAr: 'ـإِك',
    translationAr: 'اسمُكَ جميلٌ',
    options: [
      { id: 'o1', textAr: 'مخصص يدل على الطعام', isCorrect: false },
      { id: 'o2', textAr: 'ضمير متصل للمخاطب بمعنى «ـكَ» (اسمُكَ)', isCorrect: true },
      { id: 'o3', textAr: 'حرف نفي في آخر الكلام', isCorrect: false }
    ],
    explanationAr: 'رائع! رمز السلة (V31) بصوت الكاف يعمل تماماً مثل كاف المخاطب العربية المتصلة بالاسم (رِن-إِك = اسمُكَ).'
  }
];
