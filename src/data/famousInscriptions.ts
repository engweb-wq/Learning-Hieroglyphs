import { InscriptionItem } from '../types';

export const FAMOUS_INSCRIPTIONS: InscriptionItem[] = [
  {
    id: 'ankh-udja-seneb',
    titleAr: 'صيغة البركة الملكية: عَنخ، وِجَا، سَنَب',
    titleEn: 'Ankh, Udja, Seneb (Life, Prosperity, Health)',
    period: 'الدولة القديمة والوسطى والحديثة',
    glyphs: '𓋹𓍑𓋴',
    transliteration: 'ꜥnḫ, wḏꜣ, snb (Ꜥ.w.s)',
    translationAr: 'حياة، ورخاءٌ وفلاح، وصحةٌ وسلامة عافية',
    contextHistorical: 'العبارة الأكثر تكراراً في الحضارة المصرية القديمة، كانت تختتم بها أسماء الفراعنة والرسائل الملكية والخطابات بين الأصدقاء كأمنية مباركة بدوام الحياة والصحة والازدهار.',
    breakdown: [
      { glyph: '𓋹', sound: 'عنخ (ꜥnḫ)', meaning: 'الحياة والخلود' },
      { glyph: '𓍑', sound: 'وِجا (wḏꜣ)', meaning: 'الفلاح والازدهار والسلامة' },
      { glyph: '𓋴', sound: 'سنب (snb)', meaning: 'صحة الجسد والعافية' }
    ]
  },
  {
    id: 'hotep-di-nesu',
    titleAr: 'صيغة القرابين: حُتُب دِي نِيسُو',
    titleEn: 'Hetep di nesu (An offering which the king gives)',
    period: 'نقوش المعابد والمقابر الجنائزية',
    glyphs: '𓊵𓏙𓇓𓏏𓊹',
    transliteration: 'ḥtp-dj-nsw',
    translationAr: 'قربانٌ يمنحه الملك للإله، ليفيض به على صاحب المقبرة',
    contextHistorical: 'مفتاح قراءة النقوش الجنائزية على لوحات المقابر وموائد القرابين. يمثل الاعتقاد بأن الملك وسيط بين الشعب والآلهة لضمان استمرار الحياة في العالم الآخر.',
    breakdown: [
      { glyph: '𓊵', sound: 'حتب (ḥtp)', meaning: 'قربان / سلام / رضا' },
      { glyph: '𓏙', sound: 'دي (dj)', meaning: 'يمنح أو يعطي' },
      { glyph: '𓇓𓏏', sound: 'نيسو (nsw)', meaning: 'الملك / فرعون مصر العليا' }
    ]
  },
  {
    id: 'maat-cosmic-order',
    titleAr: 'عقيدة ماعت: الحق والعدل والنظام الكوني',
    titleEn: 'Maat: Cosmic Harmony & Truth',
    period: 'كافة عصور مصر القديمة',
    glyphs: '𓌳𓐙𓂝𓏏𓆄',
    transliteration: 'mꜣꜥ.t (Maat)',
    translationAr: 'الحق، الصدق، العدل، والانسجام مع سنن الكون',
    contextHistorical: 'جوهر الفلسفة الأخلاقية المصرية، وترمز لها ريشة النعامة فوق الرأس. في محكمة الموتى، كان يوزن قلب المتوفى مقابل ريشة ماعت لمعرفة نقاء سريرته وعدم ارتكابه للظلم.',
    breakdown: [
      { glyph: '𓌳', sound: 'ما (mꜣ)', meaning: 'الرؤية والوضوح (مخرز النحات)' },
      { glyph: '𓂝', sound: 'عا (ꜥ)', meaning: 'الذراع والفعل الصادق' },
      { glyph: '𓏏', sound: 'ت (t)', meaning: 'علامة التأنيث' },
      { glyph: '𓆄', sound: 'ريشة ماعت', meaning: 'مخصص ريشة النعامة رمز التوازن' }
    ]
  },
  {
    id: 'neb-tawy',
    titleAr: 'لقب الفرعون: نِب تاوي (سيد الأرضين)',
    titleEn: 'Neb Tawy (Lord of the Two Lands)',
    period: 'الألقاب الملكية الفرعونية الخمسة',
    glyphs: '𓎟𓇿𓇿',
    transliteration: 'nb tꜣ.wy',
    translationAr: 'سيد الأرضين (مصر العليا ومصر السفلى)',
    contextHistorical: 'وحدة مصر بين الشمال (الدلتا) والجنوب (الصعيد) كانت الأساس المقدس لشرعية الحكم الفرعوني بعد توحيد الملك مينا (نعرمر) للقطرين عام 3200 ق.م.',
    breakdown: [
      { glyph: '𓎟', sound: 'نِب (nb)', meaning: 'سيد أو مالك أو حامي' },
      { glyph: '𓇿𓇿', sound: 'تاوي (tꜣ.wy)', meaning: 'الأرضان (علامة مثنى شريطي الأرض)' }
    ]
  }
];
