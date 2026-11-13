/**
 * Hieroglyphic Sentence Translator & Phonetic Transliteration Engine
 * Converts Arabic short sentences and phrases into Ancient Egyptian Hieroglyphs
 * with Gardiner code breakdown, academic transliteration, and phonetic reading.
 */

import { UNILITERAL_HIEROGLYPHS, getHieroglyphForArabicChar } from '../data/hieroglyphsData';

export interface TranslatedWordPart {
  wordAr: string;
  glyphs: string;
  transliteration: string;
  phoneticArabic: string;
  meaningAr: string;
  isLexicalMatch: boolean;
  signsBreakdown: { char: string; gardiner: string; sound: string; meaning: string }[];
}

export interface SentenceTranslationResult {
  originalSentence: string;
  fullGlyphs: string;
  fullTransliteration: string;
  fullPhoneticArabic: string;
  words: TranslatedWordPart[];
}

// Curated Lexicon of Ancient Egyptian words with accurate hieroglyphs and transliterations
const EGYPTIAN_LEXICON: Record<string, {
  glyphs: string;
  transliteration: string;
  phoneticArabic: string;
  meaningAr: string;
  signs: { char: string; gardiner: string; sound: string; meaning: string }[];
}> = {
  // Greetings, Virtues & Formulas
  'حياة': {
    glyphs: '𓋹',
    transliteration: 'ꜥnḫ',
    phoneticArabic: 'عَنْخ',
    meaningAr: 'الحياة والخلود',
    signs: [{ char: '𓋹', gardiner: 'S34', sound: 'ꜥnḫ (عنخ)', meaning: 'مفتاح الحياة والخلود' }]
  },
  'الحياة': {
    glyphs: '𓋹',
    transliteration: 'ꜥnḫ',
    phoneticArabic: 'عَنْخ',
    meaningAr: 'الحياة والخلود',
    signs: [{ char: '𓋹', gardiner: 'S34', sound: 'ꜥnḫ (عنخ)', meaning: 'مفتاح الحياة والخلود' }]
  },
  'سلام': {
    glyphs: '𓊵',
    transliteration: 'ḥtp',
    phoneticArabic: 'حُتُب',
    meaningAr: 'سلام ورضا وقربان',
    signs: [{ char: '𓊵', gardiner: 'R4', sound: 'ḥtp (حتب)', meaning: 'رغيف قربان على حصير السلام' }]
  },
  'السلام': {
    glyphs: '𓊵',
    transliteration: 'ḥtp',
    phoneticArabic: 'حُتُب',
    meaningAr: 'سلام ورضا',
    signs: [{ char: '𓊵', gardiner: 'R4', sound: 'ḥtp (حتب)', meaning: 'رغيف قربان على حصير السلام' }]
  },
  'حب': {
    glyphs: '𓌻',
    transliteration: 'mr',
    phoneticArabic: 'مِر',
    meaningAr: 'المحبة والعشق والود',
    signs: [{ char: '𓌻', gardiner: 'U7', sound: 'mr (مِر)', meaning: 'فأس حراثة الأرض رمز المحبة' }]
  },
  'المحبة': {
    glyphs: '𓌻',
    transliteration: 'mr',
    phoneticArabic: 'مِر',
    meaningAr: 'المحبة والود',
    signs: [{ char: '𓌻', gardiner: 'U7', sound: 'mr (مِر)', meaning: 'فأس حراثة الأرض رمز المحبة' }]
  },
  'جمال': {
    glyphs: '𓄤',
    transliteration: 'nfr',
    phoneticArabic: 'نِفِر',
    meaningAr: 'الجمال والخير والكمال',
    signs: [{ char: '𓄤', gardiner: 'F35', sound: 'nfr (نفر)', meaning: 'القلب والقصبة الهوائية رمز الجمال' }]
  },
  'الجمال': {
    glyphs: '𓄤',
    transliteration: 'nfr',
    phoneticArabic: 'نِفِر',
    meaningAr: 'الجمال والحسن',
    signs: [{ char: '𓄤', gardiner: 'F35', sound: 'nfr (نفر)', meaning: 'القلب والقصبة الهوائية رمز الجمال' }]
  },
  'خير': {
    glyphs: '𓄤',
    transliteration: 'nfr',
    phoneticArabic: 'نِفِر',
    meaningAr: 'الخير والبركة',
    signs: [{ char: '𓄤', gardiner: 'F35', sound: 'nfr (نفر)', meaning: 'رمز الخير والكمال' }]
  },
  'الخير': {
    glyphs: '𓄤',
    transliteration: 'nfr',
    phoneticArabic: 'نِفِر',
    meaningAr: 'الخير والبركة',
    signs: [{ char: '𓄤', gardiner: 'F35', sound: 'nfr (نفر)', meaning: 'رمز الخير والكمال' }]
  },
  'حق': {
    glyphs: '𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'mꜣꜥt',
    phoneticArabic: 'مَاعَت',
    meaningAr: 'الحق والصدق والنظام الكوني',
    signs: [
      { char: '𓌳', gardiner: 'U1', sound: 'mꜣ', meaning: 'مخرز النحات (الرؤية)' },
      { char: '𓂝', gardiner: 'D36', sound: 'ꜥ', meaning: 'الساعد والفعل الصادق' },
      { char: '𓏏', gardiner: 'X1', sound: 't', meaning: 'تاء التأنيث' },
      { char: '𓆄', gardiner: 'C10', sound: 'ماعت', meaning: 'ريشة النعامة مخصص العدل' }
    ]
  },
  'العدل': {
    glyphs: '𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'mꜣꜥt',
    phoneticArabic: 'مَاعَت',
    meaningAr: 'العدل والإنصاف',
    signs: [{ char: '𓌳𓐙𓂝𓏏𓆄', gardiner: 'C10', sound: 'mꜣꜥt (ماعت)', meaning: 'ريشة ماعت رمز ميزان الحق' }]
  },
  'صدق': {
    glyphs: '𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'mꜣꜥt',
    phoneticArabic: 'مَاعَت',
    meaningAr: 'الصدق والاستقامة',
    signs: [{ char: '𓌳𓐙𓂝𓏏𓆄', gardiner: 'C10', sound: 'mꜣꜥt (ماعت)', meaning: 'رمز الصدق والحق' }]
  },
  'الصدق': {
    glyphs: '𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'mꜣꜥt',
    phoneticArabic: 'مَاعَت',
    meaningAr: 'الصدق والاستقامة',
    signs: [{ char: '𓌳𓐙𓂝𓏏𓆄', gardiner: 'C10', sound: 'mꜣꜥt (ماعت)', meaning: 'رمز الصدق والحق' }]
  },
  'صحة': {
    glyphs: '𓋴𓈖𓃀',
    transliteration: 'snb',
    phoneticArabic: 'سَنَب',
    meaningAr: 'الصحة والعافية',
    signs: [{ char: '𓋴𓈖𓃀', gardiner: 'S29-N35-D58', sound: 'snb (سنب)', meaning: 'رمز العافية والسلامة' }]
  },
  'الصحة': {
    glyphs: '𓋴𓈖𓃀',
    transliteration: 'snb',
    phoneticArabic: 'سَنَب',
    meaningAr: 'الصحة والعافية',
    signs: [{ char: '𓋴𓈖𓃀', gardiner: 'S29-N35-D58', sound: 'snb (سنب)', meaning: 'رمز العافية والسلامة' }]
  },
  'رخاء': {
    glyphs: '𓍑',
    transliteration: 'wḏꜣ',
    phoneticArabic: 'وِجَا',
    meaningAr: 'الفلاح والازدهار والرخاء',
    signs: [{ char: '𓍑', gardiner: 'U28', sound: 'wḏꜣ (وِجا)', meaning: 'مسواك الأمان والازدهار' }]
  },
  'فلاح': {
    glyphs: '𓍑',
    transliteration: 'wḏꜣ',
    phoneticArabic: 'وِجَا',
    meaningAr: 'الفلاح والنجاح',
    signs: [{ char: '𓍑', gardiner: 'U28', sound: 'wḏꜣ (وِجا)', meaning: 'رمز النجاح والسلامة' }]
  },
  'خلود': {
    glyphs: '𓆓𓏏𓇿',
    transliteration: 'ḏt',
    phoneticArabic: 'دْجِت',
    meaningAr: 'الأبدية والخلود التام',
    signs: [{ char: '𓆓𓏏𓇿', gardiner: 'I10-X1-N16', sound: 'ḏt (دجت)', meaning: 'الأبدية والدوام الشمسي' }]
  },
  'الخلود': {
    glyphs: '𓆓𓏏𓇿',
    transliteration: 'ḏt',
    phoneticArabic: 'دْجِت',
    meaningAr: 'الأبدية والخلود',
    signs: [{ char: '𓆓𓏏𓇿', gardiner: 'I10-X1-N16', sound: 'ḏt (دجت)', meaning: 'رمز الأبدية' }]
  },

  // Places, Egypt & Elements
  'مصر': {
    glyphs: '𓆎𓅓𓏏𓊖',
    transliteration: 'kmt',
    phoneticArabic: 'كِيمِيت',
    meaningAr: 'مصر (الأرض السوداء الخصبة)',
    signs: [
      { char: '𓆎', gardiner: 'I6', sound: 'km', meaning: 'جلد التمساح الأسود (الخصوبة)' },
      { char: '𓅓', gardiner: 'G17', sound: 'm', meaning: 'بومة (معين صوتي)' },
      { char: '𓏏', gardiner: 'X1', sound: 't', meaning: 'تاء التأنيث' },
      { char: '𓊖', gardiner: 'O49', sound: 'نيوت', meaning: 'مخصص المدينة والوطن' }
    ]
  },
  'أرض': {
    glyphs: '𓇿',
    transliteration: 'tꜣ',
    phoneticArabic: 'تَا',
    meaningAr: 'الأرض والتربة والبلاد',
    signs: [{ char: '𓇿', gardiner: 'N16', sound: 'tꜣ (تا)', meaning: 'شريط الأرض المحروثة' }]
  },
  'الأرض': {
    glyphs: '𓇿',
    transliteration: 'tꜣ',
    phoneticArabic: 'تَا',
    meaningAr: 'الأرض والتربة',
    signs: [{ char: '𓇿', gardiner: 'N16', sound: 'tꜣ (تا)', meaning: 'شريط الأرض والوطن' }]
  },
  'سماء': {
    glyphs: '𓊪𓏏𓇯',
    transliteration: 'pt',
    phoneticArabic: 'بِت',
    meaningAr: 'السماء وقبة الفضاء',
    signs: [{ char: '𓊪𓏏𓇯', gardiner: 'N1', sound: 'pt (بت)', meaning: 'سقف السماء المرصع بالنجوم' }]
  },
  'السماء': {
    glyphs: '𓊪𓏏𓇯',
    transliteration: 'pt',
    phoneticArabic: 'بِت',
    meaningAr: 'السماء',
    signs: [{ char: '𓊪𓏏𓇯', gardiner: 'N1', sound: 'pt (بت)', meaning: 'قبة السماء' }]
  },
  'نيل': {
    glyphs: '𓇋𓏏𓂋𓅱𓈗',
    transliteration: 'jtrw',
    phoneticArabic: 'إِتْرُو',
    meaningAr: 'نهر النيل العظيم',
    signs: [{ char: '𓇋𓏏𓂋𓅱𓈗', gardiner: 'M17-X1-D21-G43-N35A', sound: 'jtrw', meaning: 'النهر العظيم شريان الحياة' }]
  },
  'النيل': {
    glyphs: '𓇋𓏏𓂋𓅱𓈗',
    transliteration: 'jtrw',
    phoneticArabic: 'إِتْرُو',
    meaningAr: 'نهر النيل العظيم',
    signs: [{ char: '𓇋𓏏𓂋𓅱𓈗', gardiner: 'M17-X1-D21-G43-N35A', sound: 'jtrw', meaning: 'النهر العظيم' }]
  },
  'نهر': {
    glyphs: '𓇋𓏏𓂋𓅱𓈗',
    transliteration: 'jtrw',
    phoneticArabic: 'إِتْرُو',
    meaningAr: 'النهر ومجرى الماء',
    signs: [{ char: '𓇋𓏏𓂋𓅱𓈗', gardiner: 'N35A', sound: 'jtrw', meaning: 'المجرى المائي العذب' }]
  },
  'شمس': {
    glyphs: '𓇳',
    transliteration: 'rꜥ',
    phoneticArabic: 'رَع',
    meaningAr: 'الشمس وإله النور والنهار',
    signs: [{ char: '𓇳', gardiner: 'N5', sound: 'rꜥ (رع)', meaning: 'قرص الشمس مع نقطة الضياء' }]
  },
  'الشمس': {
    glyphs: '𓇳',
    transliteration: 'rꜥ',
    phoneticArabic: 'رَع',
    meaningAr: 'الشمس',
    signs: [{ char: '𓇳', gardiner: 'N5', sound: 'rꜥ (رع)', meaning: 'قرص الشمس المشرق' }]
  },
  'قمر': {
    glyphs: '𓇋𓂝𓎛',
    transliteration: 'jꜥḥ',
    phoneticArabic: 'إِيَاح',
    meaningAr: 'القمر والهلال المنير',
    signs: [{ char: '𓇋𓂝𓎛', gardiner: 'N11', sound: 'jꜥḥ (إياح)', meaning: 'الهلال والقمر المشرق' }]
  },
  'القمر': {
    glyphs: '𓇋𓂝𓎛',
    transliteration: 'jꜥḥ',
    phoneticArabic: 'إِيَاح',
    meaningAr: 'القمر',
    signs: [{ char: '𓇋𓂝𓎛', gardiner: 'N11', sound: 'jꜥḥ (إياح)', meaning: 'القمر' }]
  },
  'نور': {
    glyphs: '𓇶',
    transliteration: 'ḥḏr / šsp',
    phoneticArabic: 'شِسِب',
    meaningAr: 'النور والإشراق والضياء',
    signs: [{ char: '𓇶', gardiner: 'N8', sound: 'šsp', meaning: 'أشعة الشمس المشرقة' }]
  },
  'النور': {
    glyphs: '𓇶',
    transliteration: 'ḥḏr / šsp',
    phoneticArabic: 'شِسِب',
    meaningAr: 'النور والضياء',
    signs: [{ char: '𓇶', gardiner: 'N8', sound: 'šsp', meaning: 'أشعة النور الساطعة' }]
  },
  'ماء': {
    glyphs: '𓈖𓈗',
    transliteration: 'mw',
    phoneticArabic: 'مُو',
    meaningAr: 'الماء العذب',
    signs: [{ char: '𓈖𓈗', gardiner: 'N35-N35A', sound: 'mw (مو)', meaning: 'موجة الماء ومخصص المياه' }]
  },
  'الماء': {
    glyphs: '𓈖𓈗',
    transliteration: 'mw',
    phoneticArabic: 'مُو',
    meaningAr: 'الماء',
    signs: [{ char: '𓈖𓈗', gardiner: 'N35-N35A', sound: 'mw (مو)', meaning: 'موجة الماء العذب' }]
  },
  'ذهب': {
    glyphs: '𓎟𓃀𓅱𓋞',
    transliteration: 'nbw',
    phoneticArabic: 'نُوب',
    meaningAr: 'الذهب الخالص',
    signs: [{ char: '𓎟𓃀𓅱𓋞', gardiner: 'S12', sound: 'nbw (نوب)', meaning: 'طوق الذهب وقلادة الزينة' }]
  },
  'الذهب': {
    glyphs: '𓎟𓃀𓅱𓋞',
    transliteration: 'nbw',
    phoneticArabic: 'نُوب',
    meaningAr: 'الذهب',
    signs: [{ char: '𓎟𓃀𓅱𓋞', gardiner: 'S12', sound: 'nbw (نوب)', meaning: 'الذهب الخالص' }]
  },
  'بيت': {
    glyphs: '𓉐',
    transliteration: 'pr',
    phoneticArabic: 'بِر',
    meaningAr: 'البيت والقصر والدار',
    signs: [{ char: '𓉐', gardiner: 'O1', sound: 'pr (بر)', meaning: 'مخطط البيت مع المدخل' }]
  },
  'البيت': {
    glyphs: '𓉐',
    transliteration: 'pr',
    phoneticArabic: 'بِر',
    meaningAr: 'البيت والدار',
    signs: [{ char: '𓉐', gardiner: 'O1', sound: 'pr (بر)', meaning: 'مخطط البيت' }]
  },

  // Titles, People & Grammar
  'ملك': {
    glyphs: '𓇓𓏏',
    transliteration: 'nsw',
    phoneticArabic: 'نِيسُو',
    meaningAr: 'الملك والفرعون الحاكم',
    signs: [{ char: '𓇓𓏏', gardiner: 'M23-X1', sound: 'nsw (نيسو)', meaning: 'نبات السعف الملكي وعلامة الملك' }]
  },
  'الملك': {
    glyphs: '𓇓𓏏',
    transliteration: 'nsw',
    phoneticArabic: 'نِيسُو',
    meaningAr: 'الملك الحاكم',
    signs: [{ char: '𓇓𓏏', gardiner: 'M23-X1', sound: 'nsw (نيسو)', meaning: 'رمز الملك الحاكم' }]
  },
  'سيد': {
    glyphs: '𓎟',
    transliteration: 'nb',
    phoneticArabic: 'نِب',
    meaningAr: 'سيد ومالك وكل',
    signs: [{ char: '𓎟', gardiner: 'V30', sound: 'nb (نِب)', meaning: 'سلة الخوص رمز السيادة' }]
  },
  'السيد': {
    glyphs: '𓎟',
    transliteration: 'nb',
    phoneticArabic: 'نِب',
    meaningAr: 'السيد والمالك',
    signs: [{ char: '𓎟', gardiner: 'V30', sound: 'nb (نِب)', meaning: 'رمز السيادة' }]
  },
  'رب': {
    glyphs: '𓎟',
    transliteration: 'nb',
    phoneticArabic: 'نِب',
    meaningAr: 'الرب والسيد الحامي',
    signs: [{ char: '𓎟', gardiner: 'V30', sound: 'nb (نِب)', meaning: 'رمز السيادة والربوبية' }]
  },
  'كاتب': {
    glyphs: '𓏞𓀀',
    transliteration: 'sš',
    phoneticArabic: 'سِش',
    meaningAr: 'الكاتب الحكيم والمدون',
    signs: [{ char: '𓏞𓀀', gardiner: 'Y3-A1', sound: 'sš (سش)', meaning: 'عدة الكاتب الفرعوني' }]
  },
  'الكاتب': {
    glyphs: '𓏞𓀀',
    transliteration: 'sš',
    phoneticArabic: 'سِش',
    meaningAr: 'الكاتب الحكيم',
    signs: [{ char: '𓏞𓀀', gardiner: 'Y3-A1', sound: 'sš (سش)', meaning: 'محبرة وقلم الكاتب' }]
  },
  'عظيم': {
    glyphs: '𓅨',
    transliteration: 'wr',
    phoneticArabic: 'وِر',
    meaningAr: 'العظيم والجليل والكبير',
    signs: [{ char: '𓅨', gardiner: 'G36', sound: 'wr (ور)', meaning: 'طائر الخطاف رمز العظمة' }]
  },
  'العظيم': {
    glyphs: '𓅨',
    transliteration: 'wr',
    phoneticArabic: 'وِر',
    meaningAr: 'العظيم والجليل',
    signs: [{ char: '𓅨', gardiner: 'G36', sound: 'wr (ور)', meaning: 'رمز العظمة والكبرياء' }]
  },
  'قوي': {
    glyphs: '𓄊𓋴𓂋',
    transliteration: 'wsr',
    phoneticArabic: 'وِسِر',
    meaningAr: 'القوي والشجاع والمقتدر',
    signs: [{ char: '𓄊', gardiner: 'F12', sound: 'wsr (وسر)', meaning: 'رأس ابن آوى رمز البأس والقوة' }]
  },
  'القوة': {
    glyphs: '𓄊𓋴𓂋',
    transliteration: 'wsr',
    phoneticArabic: 'وِسِر',
    meaningAr: 'القوة والبأس',
    signs: [{ char: '𓄊', gardiner: 'F12', sound: 'wsr (وسر)', meaning: 'رمز القوة والبأس' }]
  },
  'أنا': {
    glyphs: '𓀀',
    transliteration: 'jnk',
    phoneticArabic: 'إِينِك',
    meaningAr: 'ضمير المتكلم (أنا)',
    signs: [{ char: '𓀀', gardiner: 'A1', sound: 'jnk (إينك)', meaning: 'رجل جالس مخصص المتكلم' }]
  },
  'في': {
    glyphs: '𓅓',
    transliteration: 'm',
    phoneticArabic: 'إِم',
    meaningAr: 'حرف الجر (في / بواسطة)',
    signs: [{ char: '𓅓', gardiner: 'G17', sound: 'm (إم)', meaning: 'البومة الحكيمة كحرف جر' }]
  },
  'و': {
    glyphs: '𓎛𓈖𓂝',
    transliteration: 'ḥnꜥ',
    phoneticArabic: 'حِنَع',
    meaningAr: 'حرف العطف (مع / و)',
    signs: [{ char: '𓎛𓈖𓂝', gardiner: 'V28-N35-D36', sound: 'ḥnꜥ', meaning: 'حبل الكتان وذراع المعية' }]
  }
};

/**
 * Translates a word: Checks lexicon first, then falls back to phonetic uniliterals
 */
export function translateWordToHieroglyphs(word: string): TranslatedWordPart {
  const cleanWord = word.trim().replace(/[.,!؟،؛]/g, '');
  if (!cleanWord) {
    return {
      wordAr: '',
      glyphs: '',
      transliteration: '',
      phoneticArabic: '',
      meaningAr: '',
      isLexicalMatch: false,
      signsBreakdown: []
    };
  }

  // 1. Direct lexical match
  if (EGYPTIAN_LEXICON[cleanWord]) {
    const lex = EGYPTIAN_LEXICON[cleanWord];
    return {
      wordAr: cleanWord,
      glyphs: lex.glyphs,
      transliteration: lex.transliteration,
      phoneticArabic: lex.phoneticArabic,
      meaningAr: lex.meaningAr,
      isLexicalMatch: true,
      signsBreakdown: lex.signs
    };
  }

  // 2. Strip common prefixes like 'و' (and)
  if (cleanWord.startsWith('و') && cleanWord.length > 2 && EGYPTIAN_LEXICON[cleanWord.slice(1)]) {
    const rootLex = EGYPTIAN_LEXICON[cleanWord.slice(1)];
    return {
      wordAr: cleanWord,
      glyphs: `𓎛𓈖𓂝 ${rootLex.glyphs}`,
      transliteration: `ḥnꜥ ${rootLex.transliteration}`,
      phoneticArabic: `وَ ${rootLex.phoneticArabic}`,
      meaningAr: `و ${rootLex.meaningAr}`,
      isLexicalMatch: true,
      signsBreakdown: [
        { char: '𓎛𓈖𓂝', gardiner: 'V28', sound: 'ḥnꜥ (حنع)', meaning: 'حرف العطف "و / مع"' },
        ...rootLex.signs
      ]
    };
  }

  // 3. Fallback: Phonetic Uniliteral Transliteration letter-by-letter
  const letters = cleanWord.split('');
  const glyphsList: string[] = [];
  const translitList: string[] = [];
  const phoneticList: string[] = [];
  const breakdown: { char: string; gardiner: string; sound: string; meaning: string }[] = [];

  for (const char of letters) {
    const sign = getHieroglyphForArabicChar(char);
    if (sign) {
      glyphsList.push(sign.char);
      translitList.push(sign.transliteration.split(' ')[0]);
      phoneticList.push(sign.arabicLetter);
      breakdown.push({
        char: sign.char,
        gardiner: sign.gardiner,
        sound: `${sign.arabicLetter} (${sign.transliteration.split(' ')[0]})`,
        meaning: sign.meaningAr
      });
    }
  }

  return {
    wordAr: cleanWord,
    glyphs: glyphsList.join(''),
    transliteration: translitList.join('·'),
    phoneticArabic: phoneticList.join('-'),
    meaningAr: `نقحرة صوتية بالهيروغليفية لكلمة «${cleanWord}»`,
    isLexicalMatch: false,
    signsBreakdown: breakdown
  };
}

/**
 * Translates a complete short sentence or phrase into hieroglyphic notation
 */
export function translateSentenceToHieroglyphs(sentence: string): SentenceTranslationResult {
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  const parts: TranslatedWordPart[] = [];

  for (const w of words) {
    parts.push(translateWordToHieroglyphs(w));
  }

  const fullGlyphs = parts.map(p => p.glyphs).join('   ');
  const fullTransliteration = parts.map(p => p.transliteration).join(' ');
  const fullPhoneticArabic = parts.map(p => p.phoneticArabic).join(' · ');

  return {
    originalSentence: sentence,
    fullGlyphs,
    fullTransliteration,
    fullPhoneticArabic,
    words: parts
  };
}
