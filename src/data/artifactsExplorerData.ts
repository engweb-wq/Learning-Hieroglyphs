export type ArtifactCategory = 'amulets' | 'steles' | 'vessels' | 'funerary';

export type ArtifactSurfaceTheme = 'lapis' | 'limestone' | 'alabaster' | 'bronze' | 'basalt' | 'faience';

export interface ArtifactGlyphSegment {
  id: string;
  glyphs: string;
  gardiner: string;
  transliteration: string;
  phoneticAr: string;
  meaningAr: string;
  grammarRoleAr: string;
}

export interface RareArtifactEntry {
  id: string;
  accessionCode: string;
  titleAr: string;
  subtitleAr: string;
  category: ArtifactCategory;
  categoryLabelAr: string;
  eraAr: string;
  provenanceAr: string;
  materialAr: string;
  dimensionsCm: string;
  imageUrl: string;
  imageAlt: string;
  surfaceTheme: ArtifactSurfaceTheme;
  inscriptionLocationAr: string;
  readingDirectionAr: string;
  hieroglyphicInscription: string;
  transliteration: string;
  phoneticReadingAr: string;
  translationAr: string;
  englishTranslation: string;
  curatorialStoryAr: string;
  audioScript: string;
  glyphSegments: ArtifactGlyphSegment[];
}

export const RARE_ARTIFACTS_COLLECTION: RareArtifactEntry[] = [
  {
    id: 'artifact-winged-lapis-scarab',
    accessionCode: 'ACC.IM.18.041',
    titleAr: 'الجعران الملكي المجنح من اللازورد والذهب',
    subtitleAr: 'تميمة قلب نادرة مجنحة برأس شمس النهار المذهب',
    category: 'amulets',
    categoryLabelAr: 'تمائم وأختام',
    eraAr: 'الدولة الحديثة · الأسرة الثامنة عشرة',
    provenanceAr: 'نموذج تخيلي مستوحى من كنوز طيبة الغربية',
    materialAr: 'حجر اللازورد المطعّم بخيوط الذهب عيار 24',
    dimensionsCm: '14.8 × 7.6 × 3.2 سم',
    imageUrl: '/src/assets/images/artifact_lapis_scarab_1794668027374.jpg',
    imageAlt: 'نموذج تخيلي لجعران مصري ملكي مجنح منحوت من حجر اللازورد ومطعم بالذهب',
    surfaceTheme: 'lapis',
    inscriptionLocationAr: 'الوجه السفلي المسطح للتميمة (قاعدة الجعران)',
    readingDirectionAr: 'من اليمين إلى اليسار ←',
    hieroglyphicInscription: '𓆣 𓇳 𓎟 𓋹 𓆓𓏏',
    transliteration: 'ḫpr-rꜥ nb ꜥnḫ ḏt',
    phoneticReadingAr: 'خِپِر-رَع نِب عَنْخ جِت',
    translationAr: 'تجلي شمس الصباح (خبر-رع)، ربّ الحياة الأبدية إلى الأبد',
    englishTranslation: 'Manifestation of Ra, Lord of Life Eternally',
    curatorialStoryAr:
      'يمزج هذا النموذج التخيلي بين لون اللازورد السماوي المستورد قديماً من أعالي بدخشان ورمز الخنفساء «خبر» الدالّ على التحول والانبعاث مع شروق كل شمس جديدة. كان هذا الصنف من الجعارين المجنحة يُنقش على قاعدته دعاء الحماية والخلود ليُتلى عند تقليب التميمة في يد الكاهن أو الكاتب.',
    audioScript:
      'الجعران الملكي المجنح من اللازورد والذهب. النقش الموجود على قاعدته يقرأ: خِپِر رَع نِب عَنْخ جِت، ومعناه: تجلي شمس الصباح، ربّ الحياة الأبدية.',
    glyphSegments: [
      {
        id: 'seg-scarab-1',
        glyphs: '𓆣',
        gardiner: 'L1',
        transliteration: 'ḫpr',
        phoneticAr: 'خِپِر',
        meaningAr: 'يتحول / يتجلّى / الوجود المتجدد',
        grammarRoleAr: 'علامة ثلاثية وجذر فعلي'
      },
      {
        id: 'seg-scarab-2',
        glyphs: '𓇳',
        gardiner: 'N5',
        transliteration: 'rꜥ',
        phoneticAr: 'رَع',
        meaningAr: 'قرص الشمس / رع',
        grammarRoleAr: 'أيديوجرام ومخصص فلكي'
      },
      {
        id: 'seg-scarab-3',
        glyphs: '𓎟',
        gardiner: 'V30',
        transliteration: 'nb',
        phoneticAr: 'نِب',
        meaningAr: 'ربّ / سيّد / كلّ',
        grammarRoleAr: 'علامة ثنائية وصفة إضافة'
      },
      {
        id: 'seg-scarab-4',
        glyphs: '𓋹',
        gardiner: 'S34',
        transliteration: 'ꜥnḫ',
        phoneticAr: 'عَنْخ',
        meaningAr: 'الحياة',
        grammarRoleAr: 'علامة ثلاثية ومصدر'
      },
      {
        id: 'seg-scarab-5',
        glyphs: '𓆓𓏏',
        gardiner: 'I10 + X1',
        transliteration: 'ḏt',
        phoneticAr: 'جِت',
        meaningAr: 'الأبدية / سرمدياً',
        grammarRoleAr: 'ظرف زمان مقدس'
      }
    ]
  },
  {
    id: 'artifact-limestone-solar-stele',
    accessionCode: 'ACC.IM.19.104',
    titleAr: 'لوحة النور والقربان الجيرية',
    subtitleAr: 'مسلة نذرية صغيرة بنقش غائر ملوّن بأكاسيد المغرة والأزرق المصري',
    category: 'steles',
    categoryLabelAr: 'لوحات ونقوش',
    eraAr: 'الدولة الحديثة · عصر الرعامسة',
    provenanceAr: 'نموذج تخيلي مستوحى من محاجر طرة ودير المدينة',
    materialAr: 'حجر جيري كريمي ناعم الحبيبات بآثار تلوين معدني',
    dimensionsCm: '24.0 × 15.5 × 4.0 سم',
    imageUrl: '/src/assets/images/artifact_limestone_stele_1794668026608.jpg',
    imageAlt: 'نموذج تخيلي للوحة حجرية مصرية قديمة مستديرة القمة بنقوش غائرة ملونة',
    surfaceTheme: 'limestone',
    inscriptionLocationAr: 'النقش الوقفي المحفور على ظهر اللوحة الجيرية',
    readingDirectionAr: 'من اليمين إلى اليسار ←',
    hieroglyphicInscription: '𓊵 𓏙 𓇓 𓇋𓅓𓈖 𓇳 𓏙 𓋹 𓅓 𓊵𓏏𓊪',
    transliteration: 'ḥtp dỉ nsw ỉmn-rꜥ dỉ ꜥnḫ m ḥtp',
    phoneticReadingAr: 'حُتُب دِي نِسُو إِيمِن-رَع دِي عَنْخ إِم حُتُب',
    translationAr: 'قربانٌ يقدمه الملك لآمون-رع، عسى أن يمنح حياةً في سلام وطمأنينة',
    englishTranslation: 'An offering which the King gives to Amun-Ra, giving life in peace',
    curatorialStoryAr:
      'تُعد اللوحات المقوّسة القمة من أشهر وثائق التعبّد الشخصي لدى الكتبة والحرفيين؛ إذ يعلوها قرص الشمس المجنّح للحماية، بينما يُنقش على الظهر الصيغة الكلاسيكية لقربان الملك والذكرى الطيبة لتظلّ دعوة السلام مقروءة على مرّ العصور.',
    audioScript:
      'لوحة النور والقربان الجيرية. على ظهرها نُقشت صيغة القربان الملكية: حُتُب دِي نِسُو إِيمِن رَع دِي عَنْخ إِم حُتُب، ومعناها: قربان يقدمه الملك لآمون رع ليهب حياةً في سلام.',
    glyphSegments: [
      {
        id: 'seg-stele-1',
        glyphs: '𓊵',
        gardiner: 'R4',
        transliteration: 'ḥtp',
        phoneticAr: 'حُتُب',
        meaningAr: 'قربان / سلام / رضا',
        grammarRoleAr: 'مبتدأ صيغة القربان'
      },
      {
        id: 'seg-stele-2',
        glyphs: '𓏙 𓇓',
        gardiner: 'X8 + M23',
        transliteration: 'dỉ nsw',
        phoneticAr: 'دِي نِسُو',
        meaningAr: 'يعطي الملك (بتقديم شرفي للفظ الملك)',
        grammarRoleAr: 'تقديم شرفي ملكي'
      },
      {
        id: 'seg-stele-3',
        glyphs: '𓇋𓅓𓈖 𓇳',
        gardiner: 'M17 + G17 + N35 + N5',
        transliteration: 'ỉmn-rꜥ',
        phoneticAr: 'إِيمِن-رَع',
        meaningAr: 'آمون-رع (الخفيّ المشرق)',
        grammarRoleAr: 'اسم علم مركب'
      },
      {
        id: 'seg-stele-4',
        glyphs: '𓏙 𓋹',
        gardiner: 'X8 + S34',
        transliteration: 'dỉ ꜥnḫ',
        phoneticAr: 'دِي عَنْخ',
        meaningAr: 'يمنح الحياة',
        grammarRoleAr: 'فعل دعائي ومفعول به'
      },
      {
        id: 'seg-stele-5',
        glyphs: '𓅓 𓊵𓏏𓊪',
        gardiner: 'G17 + R4 + X1 + Q3',
        transliteration: 'm ḥtp',
        phoneticAr: 'إِم حُتُب',
        meaningAr: 'في سلام وأمان',
        grammarRoleAr: 'جار ومجرور'
      }
    ]
  },
  {
    id: 'artifact-alabaster-scribe-vessel',
    accessionCode: 'ACC.IM.12.019',
    titleAr: 'إناء الكاتب من المرمر المصري الشفاف',
    subtitleAr: 'جرة دهون وعطور احتفالية بعروق الكالسيت الذهبية وخرطوشة محفورة',
    category: 'vessels',
    categoryLabelAr: 'أوانٍ وقرابين',
    eraAr: 'الدولة الوسطى · الأسرة الثانية عشرة',
    provenanceAr: 'نموذج تخيلي مستوحى من محاجر حتنوب بالمنيا',
    materialAr: 'مرمر مصري (كالسيت مخطط) محفور ومحشو بصبغة اللازورد الداكن',
    dimensionsCm: '21.5 × 12.0 × 12.0 سم',
    imageUrl: '/src/assets/images/artifact_alabaster_vessel_1794668029707.jpg',
    imageAlt: 'نموذج تخيلي لإناء مرمر مصري قديم شفاف تتخلله خطوط هيروغليفية محفورة بالمداد الداكن',
    surfaceTheme: 'alabaster',
    inscriptionLocationAr: 'الشريط الخلفي المحفور حول بدن الإناء الألباستري',
    readingDirectionAr: 'عمودي من الأعلى إلى الأسفل ↓',
    hieroglyphicInscription: '𓉐 𓋹 𓏞 𓈖 𓊹 𓄤 𓅓𓂋𓏏',
    transliteration: 'pr-ꜥnḫ sš n nṯr nfr mꜣꜥt',
    phoneticReadingAr: 'بِر-عَنْخ سِش إِن نِتِر نِفِر مَاعَت',
    translationAr: 'دار الحياة (بيت العلم): كاتبُ الحاكم الطيب وحافظُ نظام ماعت (العدل والحق)',
    englishTranslation: 'House of Life: Scribe of the Good Ruler and Keeper of Maat',
    curatorialStoryAr:
      'كان المرمر المصري الشفاف يُنحت يدوياً ليحفظ الزيوت العطرية النفيسة المستخدمة في دهان البرديات وحفظها من التلف، وحفر على هذا النموذج التخيلي لقب «كاتب بيت الحياة» في إشارة إلى المؤسسة العلمية التي تخرج منها أطباء مصر وخطاطوها.',
    audioScript:
      'إناء الكاتب من المرمر المصري الشفاف. يُقرأ النقش الخلفي عمودياً: بِر عَنْخ سِش إِن نِتِر نِفِر مَاعَت، أي: بيت الحياة، كاتب الحاكم الطيب وحافظ الحق والعدل.',
    glyphSegments: [
      {
        id: 'seg-vessel-1',
        glyphs: '𓉐 𓋹',
        gardiner: 'O1 + S34',
        transliteration: 'pr-ꜥnḫ',
        phoneticAr: 'بِر-عَنْخ',
        meaningAr: 'بيت الحياة (دار الوثائق والعلوم)',
        grammarRoleAr: 'مركب إضافي مكاني'
      },
      {
        id: 'seg-vessel-2',
        glyphs: '𓏞',
        gardiner: 'Y3',
        transliteration: 'sš',
        phoneticAr: 'سِش',
        meaningAr: 'الكاتب / الخطاط (رمزه المحبرة والقلم)',
        grammarRoleAr: 'اسم فاعل ومخصص مهني'
      },
      {
        id: 'seg-vessel-3',
        glyphs: '𓈖',
        gardiner: 'N35',
        transliteration: 'n',
        phoneticAr: 'إِن',
        meaningAr: 'لـِ / تابع لـِ',
        grammarRoleAr: 'حرف إضافة'
      },
      {
        id: 'seg-vessel-4',
        glyphs: '𓊹 𓄤',
        gardiner: 'R8 + F35',
        transliteration: 'nṯr nfr',
        phoneticAr: 'نِتِر نِفِر',
        meaningAr: 'المبجّل الطيّب / الملك الصالح',
        grammarRoleAr: 'موصوف وصفة'
      },
      {
        id: 'seg-vessel-5',
        glyphs: '𓅓𓂋𓏏',
        gardiner: 'G17 + D21 + X1',
        transliteration: 'mꜣꜥt / mrt',
        phoneticAr: 'مَاعَت / مِرِت',
        meaningAr: 'العدل والتناغم الكوني',
        grammarRoleAr: 'اسم معنوي'
      }
    ]
  },
  {
    id: 'artifact-wedjat-bronze-amulet',
    accessionCode: 'ACC.IM.21.088',
    titleAr: 'تميمة عين ودجات الصدرية المرصعة',
    subtitleAr: 'صدْرية حماية برونزية مطعمة بالفيروز والعقيق الأحمر والذهب',
    category: 'amulets',
    categoryLabelAr: 'تمائم وأختام',
    eraAr: 'عصر الانتقال الثالث · الأسرة الحادية والعشرون',
    provenanceAr: 'نموذج تخيلي مستوحى من مقتنيات تانيس (صان الحجر)',
    materialAr: 'برونز عتيق مرصع بالفيروز والعقيق والذهب المجدول',
    dimensionsCm: '11.4 × 9.2 × 1.5 سم',
    imageUrl: '/src/assets/images/artifact_wedjat_amulet_1794668028727.jpg',
    imageAlt: 'نموذج تخيلي لتميمة عين حورس ودجات من البرونز المعتق والفيروز والعقيق',
    surfaceTheme: 'bronze',
    inscriptionLocationAr: 'اللوح البرونزي الخلفي أسفل مشبك التعليق',
    readingDirectionAr: 'من اليمين إلى اليسار ←',
    hieroglyphicInscription: '𓂀 𓅃 𓋹 𓍑 𓋴',
    transliteration: 'wḏꜣt ḥr ꜥnḫ wḏꜣ snb',
    phoneticReadingAr: 'وِجَات حُور عَنْخ وُجَا سِنِب',
    translationAr: 'عينُ حورس السليمةُ المكتملة: حياةٌ، ورخاءٌ، وصحةٌ كاملة',
    englishTranslation: 'The Sound Eye of Horus: Life, Prosperity, and Health',
    curatorialStoryAr:
      'تربط هذه الصدرية بين رمز البصيرة والشفاء «ودجات» (والتي تعني السليمة المبرّأة من العيب) وثلاثية الدعاء المصري الشهير «عنخ-ودجا-سنب» التي كان الكتبة يختمون بها الرسائل الملكية.',
    audioScript:
      'تميمة عين ودجات الصدرية المرصعة. نُقش على ظهرها البرونزي: وِجَات حُور عَنْخ وُجَا سِنِب، ومعناها: عين حورس السليمة، حياةٌ وعافية وصحة.',
    glyphSegments: [
      {
        id: 'seg-wedjat-1',
        glyphs: '𓂀',
        gardiner: 'D10',
        transliteration: 'wḏꜣt',
        phoneticAr: 'وِجَات',
        meaningAr: 'العين السليمة الكاملة (عين حورس)',
        grammarRoleAr: 'أيديوجرام رمزي'
      },
      {
        id: 'seg-wedjat-2',
        glyphs: '𓅃',
        gardiner: 'G5',
        transliteration: 'ḥr',
        phoneticAr: 'حُور',
        meaningAr: 'حورس (الصقر السماوي)',
        grammarRoleAr: 'مضاف إليه'
      },
      {
        id: 'seg-wedjat-3',
        glyphs: '𓋹',
        gardiner: 'S34',
        transliteration: 'ꜥnḫ',
        phoneticAr: 'عَنْخ',
        meaningAr: 'حياة',
        grammarRoleAr: 'صيغة دعاء ثلاثية'
      },
      {
        id: 'seg-wedjat-4',
        glyphs: '𓍑',
        gardiner: 'U28',
        transliteration: 'wḏꜣ',
        phoneticAr: 'وُجَا',
        meaningAr: 'سلامة / رخاء / عافية',
        grammarRoleAr: 'علامة ثنائية دعائية'
      },
      {
        id: 'seg-wedjat-5',
        glyphs: '𓋴',
        gardiner: 'S29',
        transliteration: 'snb',
        phoneticAr: 'سِنِب',
        meaningAr: 'صحة وشفاء (اختصار 𓋴𓈖𓃀)',
        grammarRoleAr: 'علامة اختصار تقليدية'
      }
    ]
  },
  {
    id: 'artifact-black-basalt-nile-tablet',
    accessionCode: 'ACC.IM.26.312',
    titleAr: 'لوح النيل واللوتس من البازلت الأسود المصقول',
    subtitleAr: 'بلاطة نذرية محفورة بأمواج النيل وأعمدة نبات اللوتس بإزميل دقيق',
    category: 'steles',
    categoryLabelAr: 'لوحات ونقوش',
    eraAr: 'العصر المتأخر · الأسرة السادسة والعشرون (الصاوية)',
    provenanceAr: 'نموذج تخيلي مستوحى من إحياء التراث الكلاسيكي في صا الحجر',
    materialAr: 'بازلت أسود مصقول بنقش غائر حاد الحواف',
    dimensionsCm: '22.0 × 20.5 × 2.8 سم',
    imageUrl: '/src/assets/images/artifact_basalt_tablet_1794668029546.jpg',
    imageAlt: 'نموذج تخيلي للوح من البازلت الأسود المصقول محفور بأمواج النيل وأزهار اللوتس والنقوش الهيروغليفية',
    surfaceTheme: 'basalt',
    inscriptionLocationAr: 'الوجه الخلفي التأسيسي للوحة البازلتية',
    readingDirectionAr: 'من اليمين إلى اليسار ←',
    hieroglyphicInscription: '𓈗 𓆸 𓇋𓏏𓂋𓅱 𓅓 𓎛𓂝𓊪𓏭 𓋹',
    transliteration: 'mw sšn ỉtrw m ḥꜥpỉ ꜥnḫ',
    phoneticReadingAr: 'مُو سِشِن إِتْرُو إِم حَعپِي عَنْخ',
    translationAr: 'ماءُ النيل وزهرةُ اللوتس في النهر العظيم تتجدد بفيضان النيل الحي',
    englishTranslation: 'Water and lotus of the Great River living in the Nile inundation',
    curatorialStoryAr:
      'يعكس البازلت الأسود شديد الصلابة براعة النحاتين في العصر الصاوي الذين أعادوا إحياء خطوط الدولة القديمة الدقيقة، مع الاحتفاء بمفردتي الماء «مُو» والنهر «إترو» المرتبطتين بحياة المصريين الزراعية واللغوية.',
    audioScript:
      'لوح النيل واللوتس من البازلت الأسود المصقول. نُقش على ظهره: مُو سِشِن إِتْرُو إِم حَعپِي عَنْخ، أي: ماء وزهرة لوتس في النهر العظيم تحيا بفيضان النيل.',
    glyphSegments: [
      {
        id: 'seg-basalt-1',
        glyphs: '𓈗',
        gardiner: 'N35A',
        transliteration: 'mw',
        phoneticAr: 'مُو',
        meaningAr: 'ماء / أمواج متلاطمة',
        grammarRoleAr: 'أيديوجرام ومخصص سوائل'
      },
      {
        id: 'seg-basalt-2',
        glyphs: '𓆸',
        gardiner: 'M9',
        transliteration: 'sšn',
        phoneticAr: 'سِشِن',
        meaningAr: 'زهرة اللوتس (التجدد والنقاء)',
        grammarRoleAr: 'اسم نباتي وأيديوجرام'
      },
      {
        id: 'seg-basalt-3',
        glyphs: '𓇋𓏏𓂋𓅱',
        gardiner: 'M17 + X1 + D21 + G43',
        transliteration: 'ỉtrw',
        phoneticAr: 'إِتْرُو',
        meaningAr: 'النهر العظيم (نهر النيل)',
        grammarRoleAr: 'اسم علم جغرافي'
      },
      {
        id: 'seg-basalt-4',
        glyphs: '𓅓 𓎛𓂝𓊪𓏭',
        gardiner: 'G17 + V28 + D36 + Q3 + Z4',
        transliteration: 'm ḥꜥpỉ',
        phoneticAr: 'إِم حَعپِي',
        meaningAr: 'في فيضان النيل المبارك',
        grammarRoleAr: 'جار ومجرور'
      },
      {
        id: 'seg-basalt-5',
        glyphs: '𓋹',
        gardiner: 'S34',
        transliteration: 'ꜥnḫ',
        phoneticAr: 'عَنْخ',
        meaningAr: 'حي / مانح للحياة',
        grammarRoleAr: 'صفة أو حال'
      }
    ]
  },
  {
    id: 'artifact-faience-scribe-shabti',
    accessionCode: 'ACC.IM.19.205',
    titleAr: 'تمثال أوشابتي الكاتب من الفيانس الفيروزي',
    subtitleAr: 'تمثال مجيب نادر مزجج بالفيروز اللامع وبشرائط كتابية سوداء',
    category: 'funerary',
    categoryLabelAr: 'رموز الخلود',
    eraAr: 'الدولة الحديثة · أواخر الأسرة الثامنة عشرة',
    provenanceAr: 'نموذج تخيلي مستوحى من آثار سقارة ومنف',
    materialAr: 'فيانس مصري مزجج بالفيروز وطلاء أكسيد المنغنيز الأسود',
    dimensionsCm: '19.6 × 5.8 × 4.9 سم',
    imageUrl: '/src/assets/images/artifact_faience_ushabti_1794668030440.jpg',
    imageAlt: 'نموذج تخيلي لتمثال أوشابتي من الفيانس الفيروزي المزين بنقوش هيروغليفية سوداء',
    surfaceTheme: 'faience',
    inscriptionLocationAr: 'العمود الظهري (الدعامة الخلفية للتمثال)',
    readingDirectionAr: 'عمودي من الأعلى إلى الأسفل ↓',
    hieroglyphicInscription: '𓋴𓆓𓅓 𓂋𓈖 𓆑 𓅓 𓂝𓏏 𓇓 𓅱𓊃𓂋',
    transliteration: 'sḏm rn.f m mꜣꜥt nsw wsr',
    phoneticReadingAr: 'سِجِم رِن-إِف إِم مَاعَت نِسُو وُسِر',
    translationAr: 'يُسمع اسمه بالحق والصدق في بلاط الخلود بعزمٍ وقوة',
    englishTranslation: 'His name is heard in truth and strength',
    curatorialStoryAr:
      'تمتاز تماثيل الفيانس الفيروزي بلونها السماوي الذي يرمز إلى التجدد كزرقة النيل وصفاء السماء؛ وعند قلب هذا التمثال التخيلي يظهر على عمود الظهر دعاء «إبقاء الاسم مسموعاً بالحق»، إذ كان المصري القديم يرى أن ترديد الاسم يهب صاحبه الخلود.',
    audioScript:
      'تمثال أوشابتي الكاتب من الفيانس الفيروزي. نُقش على عموده الخلفي: سِجِم رِن إِف إِم مَاعَت نِسُو وُسِر، ومعناها: يُسمع اسمه بالحق والصدق في قوة وعزم.',
    glyphSegments: [
      {
        id: 'seg-faience-1',
        glyphs: '𓋴𓆓𓅓',
        gardiner: 'S29 + I10 + G17 (F21)',
        transliteration: 'sḏm',
        phoneticAr: 'سِجِم',
        meaningAr: 'يسمع / يُصغي',
        grammarRoleAr: 'فعل مضارع مبني للمجهول/المعلوم'
      },
      {
        id: 'seg-faience-2',
        glyphs: '𓂋𓈖 𓆑',
        gardiner: 'D21 + N35 + I9',
        transliteration: 'rn.f',
        phoneticAr: 'رِن-إِف',
        meaningAr: 'اسمه',
        grammarRoleAr: 'اسم + ضمير متصل (هـ)'
      },
      {
        id: 'seg-faience-3',
        glyphs: '𓅓 𓂝𓏏',
        gardiner: 'G17 + D36 + X1',
        transliteration: 'm mꜣꜥt',
        phoneticAr: 'إِم مَاعَت',
        meaningAr: 'بالحق والصدق',
        grammarRoleAr: 'جار ومجرور'
      },
      {
        id: 'seg-faience-4',
        glyphs: '𓇓',
        gardiner: 'M23',
        transliteration: 'nsw',
        phoneticAr: 'نِسُو',
        meaningAr: 'الملك / البلاط السماوي',
        grammarRoleAr: 'اسم شرفي'
      },
      {
        id: 'seg-faience-5',
        glyphs: '𓅱𓊃𓂋',
        gardiner: 'G43 + O34 + D21 (F12)',
        transliteration: 'wsr',
        phoneticAr: 'وُسِر',
        meaningAr: 'قوة / عزم / نفوذ',
        grammarRoleAr: 'جذر ثلاثي'
      }
    ]
  }
];
