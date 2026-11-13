import { ScannerAnalysisResult } from '../types';

export interface ScannerSampleInscription {
  id: string;
  titleAr: string;
  titleEn: string;
  eraAr: string;
  sourceMuseumAr: string;
  thumbnailUrl: string;
  svgBadge: string;
  difficultyAr: string;
  descriptionAr: string;
  presetAnalysis: ScannerAnalysisResult;
}

export const SCANNER_SAMPLE_INSCRIPTIONS: ScannerSampleInscription[] = [
  {
    id: 'sample_tut_cartouche',
    titleAr: 'خرطوشة الملك توت عنخ آمون (نب-خبرو-رع)',
    titleEn: 'Tutankhamun Royal Throne Cartouche',
    eraAr: 'الأسرة الثامنة عشرة - الدولة الحديثة (حوالي 1332 ق.م)',
    sourceMuseumAr: 'المتحف المصري الكبير / مقبرة وادي الملوك KV62',
    thumbnailUrl: '/src/assets/images/hero_hieroglyph_papyrus_1794200391875.jpg',
    svgBadge: '𓇳𓏠𓆣',
    difficultyAr: 'خرطوشة ملكية واضحة ومؤكدة',
    descriptionAr: 'خرطوشة ذهبية تمثل اسم تتويج الفرعون الشاب، وتُظهر قاعدة التقديم الشرفي لاسم الإله رع.',
    presetAnalysis: {
      isHieroglyphicFound: true,
      readingDirection: 'rtl',
      readingDirectionExplanationAr: 'الرموز تُقرأ من اليمين إلى اليسار (وفي الخراطيش من الأعلى للأسفل)، حيث يقدم اسم قرص الشمس (رع) تقديساً شرفياً مع الحفاظ على الترتيب الصوتي للملك.',
      overallConfidence: 98,
      glyphs: [
        {
          id: 'glyph_1',
          char: '𓇳',
          gardiner: 'N5',
          transliteration: 'rꜥ',
          arabicSound: 'رَع',
          meaningAr: 'قرص الشمس / المعبود رع (تقديم شرفي)',
          categoryAr: 'السماء والأجرام',
          glyphType: 'ideogram',
          confidence: 99,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'قاعدة التقديم الشرفي (Honorific Transposition): يُكتب اسم الإله أولاً احتراماً، لكنه يُقرأ في نهاية الاسم.'
        },
        {
          id: 'glyph_2',
          char: '𓎟',
          gardiner: 'V30',
          transliteration: 'nb',
          arabicSound: 'نِب',
          meaningAr: 'سيد / رب / مالك / كل',
          categoryAr: 'سلال وأوعية',
          glyphType: 'biliteral',
          confidence: 97,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'علامة ثنائية الصوت تمثل سلة مجدولة من الخوص، جذر مشترك مع كلمة نبي/نوبة/صاحب.'
        },
        {
          id: 'glyph_3',
          char: '𓆣',
          gardiner: 'L1',
          transliteration: 'ḫpr',
          arabicSound: 'خِبر',
          meaningAr: 'الجعران المقدس / التحول، الصيرورة، الوجود',
          categoryAr: 'حشرات ولافقاريات',
          glyphType: 'triliteral',
          confidence: 98,
          epistemicStatus: 'confirmed',
          facingDirection: 'right',
          notesAr: 'علامة ثلاثية الصوت. يرمز الجعران إلى الشمس الوليدة وتجدد الحياة الأبدية.'
        },
        {
          id: 'glyph_4',
          char: '𓏥',
          gardiner: 'Z2',
          transliteration: 'w (plural)',
          arabicSound: 'و (علامة الجمع)',
          meaningAr: 'ثلاث شرطات رأسية تشير إلى جمع الاسم (خِبرو)',
          categoryAr: 'أرقام وإشارات كتابية',
          glyphType: 'determinative',
          confidence: 96,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'محدد نحوي للجمع في اللغة المصرية الكلاسيكية.'
        }
      ],
      transliterationLine: 'nb-ḫpr.w-rꜥ',
      phoneticTranscriptionAr: 'نِبْ-خِپْرو-رَع (نِب خِبِرو رَع)',
      literalTranslationAr: 'سيد تجليات وظهورات رع',
      historicalContextAr: 'اسم التتويج (Prenomen) للفرعون توت عنخ آمون منقوش داخل خرطوشة بيضاوية مقدسة (Shenu) تحميه من قوى الفناء والشرور.',
      damageAnalysisAr: 'النقش محفوظ بحالة ممتازة دون أي تلف سطحي أو علامات ممسوحة.',
      isPartiallyEroded: false,
      academicIntegrityNoteAr: 'جميع الرموز الأربعة واضحة بنسبة 100% ومطابقة لسجلات وادي الملوك وقائمة جاردنر الرسمية.'
    }
  },
  {
    id: 'sample_offering_formula',
    titleAr: 'لوحة صيغة القرابين الملكية (حتب-دي-نسو)',
    titleEn: 'Royal Offering Formula Stela (Htp-dj-nsw)',
    eraAr: 'الدولة الوسطى - الأسرة الثانية عشرة (حوالي 1900 ق.م)',
    sourceMuseumAr: 'المتحف المصري بالتحرير / لوحة جنائزية من أبيدوس',
    thumbnailUrl: '/src/assets/images/hero_hieroglyph_papyrus_1794200391875.jpg',
    svgBadge: '𓊵𓏙𓇓𓏏',
    difficultyAr: 'صيغة كلاسيكية معيارية',
    descriptionAr: 'الصيغة الجنائزية الأشهر على الإطلاق في مصر القديمة التي تطلب من الملك والإله أوزيريس منح القرابين لروح المتوفى.',
    presetAnalysis: {
      isHieroglyphicFound: true,
      readingDirection: 'rtl',
      readingDirectionExplanationAr: 'النقش يقرأ من اليمين إلى اليسار، فالكائنات الحية تنظر نحو اليمين (وجهة البداية)، والترتيب الأفقي يتبع القواعد النحوية للدولة الوسطى.',
      overallConfidence: 95,
      glyphs: [
        {
          id: 'glyph_off_1',
          char: '𓊵',
          gardiner: 'R4',
          transliteration: 'ḥtp',
          arabicSound: 'حُتِب',
          meaningAr: 'قربان / رضى / سلام واستقرار',
          categoryAr: 'معابد وشعائر',
          glyphType: 'triliteral',
          confidence: 96,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'يمثل رغيف خبز مستقر فوق حصير قرابين منسوج.'
        },
        {
          id: 'glyph_off_2',
          char: '𓏙',
          gardiner: 'X8',
          transliteration: 'dj',
          arabicSound: 'دي',
          meaningAr: 'يعطي / يهب (فعل منح)',
          categoryAr: 'أدوات وحلي',
          glyphType: 'biliteral',
          confidence: 94,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'رغيف خبز مخروطي يرمز للعطاء والهبة الملكية.'
        },
        {
          id: 'glyph_off_3',
          char: '𓇓',
          gardiner: 'M23',
          transliteration: 'nsw',
          arabicSound: 'نِسُو',
          meaningAr: 'الملك (حاكم مصر العليا)',
          categoryAr: 'نباتات وزهور',
          glyphType: 'biliteral',
          confidence: 95,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'نبات السعد الملكي الأخضر الذي كان شعاراً لملوك الصعيد.'
        },
        {
          id: 'glyph_off_4',
          char: '𓏏',
          gardiner: 'X1',
          transliteration: 't',
          arabicSound: 'ت',
          meaningAr: 'متمم صوتي ومؤنث للكلمة الملكية',
          categoryAr: 'طعام ومخبوزات',
          glyphType: 'uniliteral',
          confidence: 97,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral'
        },
        {
          id: 'glyph_off_5',
          char: '𓊹',
          gardiner: 'R8',
          transliteration: 'nṯr',
          arabicSound: 'نِثِر',
          meaningAr: 'الإله / المعبود المقدس',
          categoryAr: 'معابد ورموز مقدسة',
          glyphType: 'triliteral',
          confidence: 93,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'راية المعبد الملفوفة بكتان أحمر، أصل مشترك مع كلمة نتر / طاهر.'
        },
        {
          id: 'glyph_off_6',
          char: '𓉻',
          gardiner: 'O29',
          transliteration: 'ꜥꜣ',
          arabicSound: 'عا',
          meaningAr: 'العظيم / الجليل',
          categoryAr: 'مبانٍ وعمارة',
          glyphType: 'biliteral',
          confidence: 95,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'وتد خشبي ضخم يرفع سقف الخيمة الكبرى.'
        }
      ],
      transliterationLine: 'ḥtp-dj-nsw nṯr-ꜥꜣ',
      phoneticTranscriptionAr: 'حُتِبْ-دي-نِسُو نِثِر-عا',
      literalTranslationAr: 'قربان يعطيه الملك للإله العظيم',
      historicalContextAr: 'افتتاحية الصلوات الجنائزية، حيث يعتبر الملك وسيطاً بين البشر والآلهة لضمان استمرار تدفق الأطعمة والشراب والزهور للروح في العالم الآخر.',
      damageAnalysisAr: 'حواف الحجر الجيري بها شقوق طفيفة لا تؤثر على وضوح الرموز الأثرية.',
      isPartiallyEroded: false,
      academicIntegrityNoteAr: 'النص مكتمل ومطابق لآلاف اللوحات المحفوظة في المتاحف العالمية دون أي غموض لغوي.'
    }
  },
  {
    id: 'sample_eroded_fragment',
    titleAr: 'نقش أثري متآكل جزئياً (اختبار الأمانة العلمية)',
    titleEn: 'Weathered Relief with Eroded Lacuna (Epistemic Caution Test)',
    eraAr: 'عصر الانتقال الثالث (حوالي 850 ق.م)',
    sourceMuseumAr: 'موقع كرانك الأثري / كتلة جدارية تعرضت لعوامل التعرية',
    thumbnailUrl: '/src/assets/images/hero_hieroglyph_papyrus_1794200391875.jpg',
    svgBadge: '𓅃𓊹[...]𓇿',
    difficultyAr: 'نقش متضرر يتطلب التمييز بين المؤكد والمجهول',
    descriptionAr: 'نموذج تطبيقي حاسم يوضح التزام الذكاء الاصطناعي بالأمانة العلمية: يتعرف على الرموز السليمة ويرفض اختلاق ترجمة للأجزاء المفقودة.',
    presetAnalysis: {
      isHieroglyphicFound: true,
      readingDirection: 'rtl',
      readingDirectionExplanationAr: 'صقر حورس ينظر إلى اليمين بوضوح، مما يثبت أن اتجاه القراءة هو من اليمين إلى اليسار.',
      overallConfidence: 71,
      glyphs: [
        {
          id: 'glyph_er_1',
          char: '𓅃',
          gardiner: 'G5',
          transliteration: 'ḥr.w',
          arabicSound: 'حُور',
          meaningAr: 'المعبود حورس الصقر السماوي (البعيد / العالي)',
          categoryAr: 'طيور وجوارح',
          glyphType: 'ideogram',
          confidence: 96,
          epistemicStatus: 'confirmed',
          facingDirection: 'right',
          notesAr: 'العلامة واضحة ومنقوشة بنحت غائر عميق سليم.'
        },
        {
          id: 'glyph_er_2',
          char: '𓊹',
          gardiner: 'R8',
          transliteration: 'nṯr',
          arabicSound: 'نِثِر',
          meaningAr: 'إله / معبود',
          categoryAr: 'معابد ورموز',
          glyphType: 'triliteral',
          confidence: 91,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'عمود الراية مكتمل مع بقاء جزء من القماش العلوي.'
        },
        {
          id: 'glyph_er_3',
          char: '𓎟',
          gardiner: 'V30',
          transliteration: 'nb (?)',
          arabicSound: 'نِب (ترجيح احتمالي)',
          meaningAr: 'سيد أو رب (قراءة مرجحة وليست قطعية)',
          categoryAr: 'سلال وأوعية',
          glyphType: 'biliteral',
          confidence: 62,
          epistemicStatus: 'tentative',
          facingDirection: 'neutral',
          notesAr: 'قراءة محتملة: النصف السفلي من السلة متآكل بفعل الرطوبة، ويحتمل أن تكون علامة حجر العتب (W10) أو السلة (V30).'
        },
        {
          id: 'glyph_er_4',
          char: '𓇿',
          gardiner: 'N16',
          transliteration: 'tꜣ',
          arabicSound: 'تا',
          meaningAr: 'الأرض / القطر',
          categoryAr: 'أرض وجغرافيا',
          glyphType: 'ideogram',
          confidence: 88,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'شريط الأرض المنقط يظهر بوضوح تحت السلة المحتملة.'
        }
      ],
      transliterationLine: 'ḥr.w nṯr [nb?] tꜣ [...]',
      phoneticTranscriptionAr: 'حُور نِثِر [نِب؟] تا [...]',
      literalTranslationAr: 'حورس، الإله [سيد؟] الأرض [...] (النص مبتور)',
      historicalContextAr: 'جزء من إهداء جداري لمعبد حورس. يظهر كسر صخري أدى لفقدان اللقب الكامل للإله واسم الملك المتبرع.',
      damageAnalysisAr: 'تآكل سطحي شديد بطول 14 سم في المنتصف أدى لمحو علامتين هيروغليفيتين تماماً، مع تآكل جزئي في الرمز الثالث.',
      isPartiallyEroded: true,
      academicIntegrityNoteAr: 'تنبيه أمانة علمية: التزم النظام بعدم تخمين أو اختلاق الرموز المفقودة داخل الأقواس المعقوفة [...] وفقاً للضوابط الأكاديمية لعلم الآثار المصرية.'
    }
  },
  {
    id: 'sample_scribe_title',
    titleAr: 'لقب كاتب السجلات الملكية (سش كمت)',
    titleEn: 'Royal Egyptian Scribe Title (Seshem-Kemet)',
    eraAr: 'الدولة القديمة - عهد بناة الأهرام (حوالي 2500 ق.م)',
    sourceMuseumAr: 'مقبرة الوزير تي بسقارة',
    thumbnailUrl: '/src/assets/images/kids_egyptian_scribe_1794200392208.jpg',
    svgBadge: '𓏞𓈖𓆎𓏏',
    difficultyAr: 'لقب كاتب مهني شهير',
    descriptionAr: 'اللقب الفخري الذي كان يعتز به الحكماء والوزراء في مصر القديمة كرمز للعلم وتدوين المعرفة.',
    presetAnalysis: {
      isHieroglyphicFound: true,
      readingDirection: 'rtl',
      readingDirectionExplanationAr: 'محددات الكائنات والرموز تواجه اليمين، مما يشير إلى القراءة من اليمين لليسار.',
      overallConfidence: 94,
      glyphs: [
        {
          id: 'glyph_sc_1',
          char: '𓏞',
          gardiner: 'Y3',
          transliteration: 'sš',
          arabicSound: 'سِش',
          meaningAr: 'كاتب / يكتب / مدوّن السجلات الرسمية',
          categoryAr: 'أدوات الكتابة والفنون',
          glyphType: 'ideogram',
          confidence: 97,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'تمثل لوحة ألوان الكاتب المزودة بتجويفين للحبر الأسود والأحمر، ومقلمة الغاب، وقربة الماء الصغيرة.'
        },
        {
          id: 'glyph_sc_2',
          char: '𓈖',
          gardiner: 'N35',
          transliteration: 'n',
          arabicSound: 'إن',
          meaningAr: 'حرف إضافة (لـ / الخاص بـ)',
          categoryAr: 'ماء وسوائل',
          glyphType: 'uniliteral',
          confidence: 96,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'تموج مياه النيل العذب، جذر مشترك مع "نهر / نيل".'
        },
        {
          id: 'glyph_sc_3',
          char: '𓆎',
          gardiner: 'I6',
          transliteration: 'km',
          arabicSound: 'كِم',
          meaningAr: 'الأسود / الطمي الخصب / كمت (أرض مصر)',
          categoryAr: 'زواحف ومقاييس',
          glyphType: 'biliteral',
          confidence: 93,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'قطعة من جلد التمساح ذات الحراشف المنظمة ترمز للسواد والخصوبة.'
        },
        {
          id: 'glyph_sc_4',
          char: '𓏏',
          gardiner: 'X1',
          transliteration: 't',
          arabicSound: 'ت',
          meaningAr: 'تاء التأنيث لاسم الدولة (كمت)',
          categoryAr: 'طعام ومخبوزات',
          glyphType: 'uniliteral',
          confidence: 95,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral'
        },
        {
          id: 'glyph_sc_5',
          char: '𓊖',
          gardiner: 'O49',
          transliteration: 'niwt (det)',
          arabicSound: 'نِيوت (مخصص)',
          meaningAr: 'مخصص تصنيفي للمدن والبلدان والأقاليم المأهولة',
          categoryAr: 'مبانٍ ومدن',
          glyphType: 'determinative',
          confidence: 92,
          epistemicStatus: 'confirmed',
          facingDirection: 'neutral',
          notesAr: 'يمثل تقاطع طريقين رئيسيين داخل مدينة دائرية محصنة.'
        }
      ],
      transliterationLine: 'sš n kmt (niwt)',
      phoneticTranscriptionAr: 'سِشْ نْ كِمِتْ',
      literalTranslationAr: 'كاتب أرض مصر (كمت)',
      historicalContextAr: 'مهنة الكاتب المصري كانت أرقى المهن في الدولة القديمة، وكان الكتبة يعفون من الضرائب والأعمال الشاقة تقديراً لعلومهم.',
      damageAnalysisAr: 'النقش محفوظ بعناية فائقة وتظهر فيه حتى تفاصيل خيوط لوحة الألوان.',
      isPartiallyEroded: false,
      academicIntegrityNoteAr: 'قراءة محققة بالكامل ومطابقة للنصوص البردية في عصر الأهرامات.'
    }
  }
];
