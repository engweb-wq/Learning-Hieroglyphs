export type SpeechLanguage = 'ar' | 'en' | 'fr' | 'phonetic';

export interface AlphabetSampleWord {
  hieroglyphs: string;
  transliteration: string;
  readingAr: string;
  readingEn: string;
  readingFr: string;
  meaningAr: string;
  meaningEn: string;
  meaningFr: string;
  sourceContextAr: string;
}

export interface AlphabetSpeechEntry {
  signId: string;
  char: string;
  gardiner: string;
  arabicLetter: string;
  phoneticIpa: string;
  transliteration: string;
  names: {
    ar: { letter: string; signName: string; soundDesc: string };
    en: { letter: string; signName: string; soundDesc: string };
    fr: { letter: string; signName: string; soundDesc: string };
  };
  sampleWord: AlphabetSampleWord;
  speechScripts: {
    ar_kids: string;
    ar_adults: string;
    en_kids: string;
    en_adults: string;
    fr_kids: string;
    fr_adults: string;
    phonetic: string;
  };
}

export const SPEECH_LANGUAGES: { id: SpeechLanguage; labelAr: string; labelEn: string; flag: string; voiceLang: string }[] = [
  { id: 'ar', labelAr: 'العربية (المصرية والفصحى)', labelEn: 'Arabic (Egyptian / Classical)', flag: '🇪🇬', voiceLang: 'ar-EG' },
  { id: 'en', labelAr: 'الإنجليزية (علم المصريات الدولي)', labelEn: 'English (International Egyptology)', flag: '🇬🇧', voiceLang: 'en-US' },
  { id: 'fr', labelAr: 'الفرنسية (مدرسة شامبليون)', labelEn: 'French (Champollion Tradition)', flag: '🇫🇷', voiceLang: 'fr-FR' },
  { id: 'phonetic', labelAr: 'النطق الفونيتيكي الصوتي النقي', labelEn: 'Pure Phonetic Acoustic Articulation', flag: '𓋹', voiceLang: 'ar-EG' },
];

export const ALPHABET_SPEECH_DATA: Record<string, AlphabetSpeechEntry> = {
  a1: {
    signId: 'a1',
    char: '𓄿',
    gardiner: 'G1',
    arabicLetter: 'أ',
    phoneticIpa: '[ʔ] / [ɑː]',
    transliteration: 'ꜣ (Alef)',
    names: {
      ar: { letter: 'ألف', signName: 'عقاب مصري (طائر الرخمة)', soundDesc: 'همزة حنجرية خفيفة' },
      en: { letter: 'Alef', signName: 'Egyptian Vulture', soundDesc: 'Glottal stop' },
      fr: { letter: 'Aleph', signName: 'Vautour percnoptère', soundDesc: 'Coup de glotte doux' },
    },
    sampleWord: {
      hieroglyphs: '𓄿 𓊪 𓂧',
      transliteration: 'ꜣpd',
      readingAr: 'آبِد',
      readingEn: 'Aped',
      readingFr: 'Aped',
      meaningAr: 'طائر / بطة مائية',
      meaningEn: 'Waterfowl / Bird',
      meaningFr: 'Oiseau d’eau / Canard',
      sourceContextAr: 'قوائم الصيد والقرابين في معابد الدولة القديمة'
    },
    speechScripts: {
      ar_kids: 'حرف الألف، رمزه طائر الرخمة المصري اللطيف! وكلمة نموذجية: آبِد، وتعني طائر أو بطة النيل.',
      ar_adults: 'حرف الألف.. الرمز العلمي جاردنر G1.. يمثل طائر العقاب المصري الرخمة، صوته همزة حنجرية. ومثال ذلك كلمة آبِد، وتعني طائر أو طير الماء.',
      en_kids: 'Letter Alef, represented by the Egyptian Vulture! Example Egyptian word: Aped, which means waterfowl or bird.',
      en_adults: 'Hieroglyphic sign G1, transliterated as Alef. It depicts the Egyptian Vulture and represents a glottal stop. Example Egyptian word: Aped, meaning waterfowl or bird.',
      fr_kids: 'Lettre Aleph, représentée par le vautour percnoptère ! Mot égyptien modèle : Aped, qui signifie oiseau d’eau.',
      fr_adults: 'Hiéroglyphe G1, translittéré Aleph. Représente le vautour percnoptère égyptien, valeur phonétique coup de glotte. Mot modèle : Aped, signifiant oiseau ou canard.',
      phonetic: 'آ.. همزة حنجرية خفيفة.. آبِد'
    }
  },
  i1: {
    signId: 'i1',
    char: '𓇋',
    gardiner: 'M17',
    arabicLetter: 'ي',
    phoneticIpa: '[j] / [iː]',
    transliteration: 'j / i (Yod)',
    names: {
      ar: { letter: 'ياء / إي', signName: 'ورقة زهرة القصب النيلية', soundDesc: 'صوت الياء أو الكسرة الممدودة' },
      en: { letter: 'Yod / I', signName: 'Flowering Reed', soundDesc: 'Palatal approximant / Long I' },
      fr: { letter: 'Yod / I', signName: 'Roseau fleuri', soundDesc: 'Semi-voyelle palatale' },
    },
    sampleWord: {
      hieroglyphs: '𓇋 𓏏 𓈖',
      transliteration: 'jtn',
      readingAr: 'آتُون',
      readingEn: 'Aten',
      readingFr: 'Aton',
      meaningAr: 'قرص الشمس المشع',
      meaningEn: 'Sun Disc',
      meaningFr: 'Disque solaire',
      sourceContextAr: 'نصوص تل العمارنة ونشيد إخناتون'
    },
    speechScripts: {
      ar_kids: 'حرف الياء، رمزه قصبة النيل الخضراء الجميلة! وكلمة نموذجية: آتون، وتعني قرص الشمس المضيء.',
      ar_adults: 'حرف الياء أو إي.. الرمز جاردنر M17.. يمثل زهرة نبات القصب، صوته شبه علة حنكي. ومثال ذلك كلمة آتون، أي قرص الشمس المتألق.',
      en_kids: 'Letter Yod or I, represented by the flowering reed! Example Egyptian word: Aten, meaning the solar disc.',
      en_adults: 'Hieroglyph M17, transliterated as Yod. Depicts a flowering reed. Example ancient word: Aten, meaning the radiant sun disc.',
      fr_kids: 'Lettre Yod, représentée par le roseau fleuri ! Mot égyptien : Aton, le disque du soleil.',
      fr_adults: 'Hiéroglyphe M17, Yod. Roseau fleuri du Nil. Exemple de mot : Aton, le disque solaire flamboyant.',
      phonetic: 'إي.. ياء ممدودة.. آتُون'
    }
  },
  a2: {
    signId: 'a2',
    char: '𓂝',
    gardiner: 'D36',
    arabicLetter: 'ع',
    phoneticIpa: '[ʕ]',
    transliteration: 'ꜥ (Ayin)',
    names: {
      ar: { letter: 'عين', signName: 'الذراع والساعد البشري', soundDesc: 'صوت العين الحلقي الفصيح' },
      en: { letter: 'Ayin', signName: 'Forearm', soundDesc: 'Pharyngeal voiced fricative' },
      fr: { letter: 'Aïn', signName: 'Avant-bras tendu', soundDesc: 'Fricative pharyngale voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓂝 𓈖 𓐍',
      transliteration: 'ꜥnḫ',
      readingAr: 'عَنْخ',
      readingEn: 'Ankh',
      readingFr: 'Ânkh',
      meaningAr: 'الحياة والخلود',
      meaningEn: 'Life and Eternity',
      meaningFr: 'La Vie et l’éternité',
      sourceContextAr: 'مفتاح الحياة في أيدي الملوك والآلهة'
    },
    speechScripts: {
      ar_kids: 'حرف العين، رمزه ذراع قوية تصنع الخير! وكلمة نموذجية: عنخ، وتعني سر الحياة الأبدية.',
      ar_adults: 'حرف العين.. كود جاردنر D36.. يمثل الساعد البشري، صوته حلقي مطابق تماماً للعين العربية. ومثال ذلك الكلمة الأشهر: عَنْخ، أي الحياة والخلود.',
      en_kids: 'Letter Ayin, represented by the human forearm! Example Egyptian word: Ankh, meaning life and eternity.',
      en_adults: 'Hieroglyphic sign D36, Ayin. It represents the human forearm, pronounced as a pharyngeal consonant. Prime example: Ankh, the symbol of life.',
      fr_kids: 'Lettre Aïn, représentée par l’avant-bras ! Mot égyptien : Ânkh, le célèbre symbole de la vie.',
      fr_adults: 'Hiéroglyphe D36, Aïn. Représente l’avant-bras humain tendu. Mot emblématique : Ânkh, signifiant la vie éternelle.',
      phonetic: 'عَ.. عين حلقية صريحة.. عَنْخ'
    }
  },
  w1: {
    signId: 'w1',
    char: '𓅱',
    gardiner: 'G43',
    arabicLetter: 'و',
    phoneticIpa: '[w] / [uː]',
    transliteration: 'w (Waw)',
    names: {
      ar: { letter: 'واو', signName: 'فرخ السمان الصغير', soundDesc: 'صوت الواو الشفوي اللطيف' },
      en: { letter: 'Waw', signName: 'Quail Chick', soundDesc: 'Labio-velar approximant' },
      fr: { letter: 'Ouaw', signName: 'Poussin de caille', soundDesc: 'Semi-voyelle labio-vélaire' },
    },
    sampleWord: {
      hieroglyphs: '𓅱 𓂧 𓆓',
      transliteration: 'wḏꜣ',
      readingAr: 'وَجَا / وِجا',
      readingEn: 'Wedja',
      readingFr: 'Oudja',
      meaningAr: 'سليم، معافى، وصحيح',
      meaningEn: 'Whole, Sound, Healthy',
      meaningFr: 'Intègre, sain et prospère',
      sourceContextAr: 'دعاء البركة الملكية: عنخ-وجا-سنب'
    },
    speechScripts: {
      ar_kids: 'حرف الواو، رمزه كتكوت السمان اللطيف! وكلمة نموذجية: وَجَا، وتعني الصحة والسلامة.',
      ar_adults: 'حرف الواو.. جاردنر G43.. يمثل فرخ طائر السمان، صوته شفوي مجهور. ومثال ذلك كلمة وَجَا الواردة في التحية الملكية، وتعني سليم ومعافى.',
      en_kids: 'Letter Waw, represented by the sweet quail chick! Example Egyptian word: Wedja, meaning whole and healthy.',
      en_adults: 'Hieroglyphic sign G43, Waw. Depicts a young quail chick. Example word: Wedja, meaning sound, whole, and intact.',
      fr_kids: 'Lettre Ouaw, représentée par le poussin de caille ! Mot égyptien : Oudja, qui signifie sain et prospère.',
      fr_adults: 'Hiéroglyphe G43, Ouaw. Représente le poussin de caille. Mot modèle : Oudja, signifiant prospère et en parfaite santé.',
      phonetic: 'وَ.. واو شفوية لينة.. وَجَا'
    }
  },
  b1: {
    signId: 'b1',
    char: '𓃀',
    gardiner: 'D58',
    arabicLetter: 'ب',
    phoneticIpa: '[b]',
    transliteration: 'b',
    names: {
      ar: { letter: 'باء', signName: 'القدم والساق البشرية', soundDesc: 'صوت الباء الانفجاري المجهور' },
      en: { letter: 'B', signName: 'Foot and Leg', soundDesc: 'Voiced bilabial plosive' },
      fr: { letter: 'B', signName: 'Pied et jambe', soundDesc: 'Occlusive bilabiale voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓃀 𓄿',
      transliteration: 'bꜣ',
      readingAr: 'بَا',
      readingEn: 'Ba',
      readingFr: 'Ba',
      meaningAr: 'الروح والشخصية الحرة',
      meaningEn: 'Soul / Spiritual Essence',
      meaningFr: 'L’Âme / Essence spirituelle',
      sourceContextAr: 'طائر البا برأس إنسان في كتاب الموتى'
    },
    speechScripts: {
      ar_kids: 'حرف الباء، رمزه القدم التي تمشي وتسعى! وكلمة نموذجية: بَا، وتعني الروح الطيبة.',
      ar_adults: 'حرف الباء.. جاردنر D58.. يمثل الساق والقدم، صوته شفوي انفجاري يطابق الباء العربية بدقة. ومثال ذلك كلمة بَا، أي الروح الحرة الطليقة.',
      en_kids: 'Letter B, represented by the human foot and leg! Example Egyptian word: Ba, the human-headed soul.',
      en_adults: 'Hieroglyphic sign D58, representing letter B. Depicts a human lower leg and foot. Example word: Ba, the immortal soul in ancient Egyptian thought.',
      fr_kids: 'Lettre B, représentée par le pied et la jambe ! Mot égyptien : Ba, l’âme ailée à tête humaine.',
      fr_adults: 'Hiéroglyphe D58, lettre B. Jambe et pied humains. Mot représentatif : Ba, la composante spirituelle de l’âme voyageuse.',
      phonetic: 'بَ.. باء شفوية انفجارية.. بَا'
    }
  },
  p1: {
    signId: 'p1',
    char: '𓊪',
    gardiner: 'Q3',
    arabicLetter: 'پ',
    phoneticIpa: '[p]',
    transliteration: 'p',
    names: {
      ar: { letter: 'پاء', signName: 'حصير البردي ومقعد القصب', soundDesc: 'صوت الباء المهموسة (P)' },
      en: { letter: 'P', signName: 'Reed Stool / Mat', soundDesc: 'Voiceless bilabial plosive' },
      fr: { letter: 'P', signName: 'Natte ou siège de roseau', soundDesc: 'Occlusive bilabiale sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓊪 𓏏 𓎛',
      transliteration: 'Ptḥ',
      readingAr: 'بِتَاح',
      readingEn: 'Ptah',
      readingFr: 'Ptah',
      meaningAr: 'الإله بتاح، الخالق وسيد الحرفيين',
      meaningEn: 'Ptah, Creator God & Master of Crafts',
      meaningFr: 'Ptah, Dieu créateur et patron des artisans',
      sourceContextAr: 'لاهوت منف وحجر شبكة الشهير'
    },
    speechScripts: {
      ar_kids: 'حرف پاء، رمزه كرسي الحصير المريح! وكلمة نموذجية: بتاح، وهو الإله الخالق وسيد الفنانين.',
      ar_adults: 'حرف الباء المهموسة پ.. جاردنر Q3.. يمثل حصير البردي، صوته انفجاري شفوي مهموس. ومثال ذلك اسم الإله العظيم بتاح، راعي المعماريين والفنانين في منف.',
      en_kids: 'Letter P, represented by a reed mat or stool! Example Egyptian word: Ptah, the divine creator and artisan.',
      en_adults: 'Hieroglyph Q3, representing letter P. Depicts a woven reed stool. Prime example: Ptah, the patron deity of craft and architecture in Memphis.',
      fr_kids: 'Lettre P, représentée par la natte de roseau ! Mot égyptien : Ptah, le grand dieu bâtisseur.',
      fr_adults: 'Hiéroglyphe Q3, lettre P. Siège ou natte en vannerie de roseaux. Exemple prestigieux : Ptah, divinité créatrice memphite.',
      phonetic: 'پَ.. باء مهموسة حادة.. بِتَاح'
    }
  },
  f1: {
    signId: 'f1',
    char: '𓆑',
    gardiner: 'I9',
    arabicLetter: 'ف',
    phoneticIpa: '[f]',
    transliteration: 'f',
    names: {
      ar: { letter: 'فاء', signName: 'حية الطريشة الرملية ذات القرنين', soundDesc: 'صوت الفاء الاحتكاكي الأسناني' },
      en: { letter: 'F', signName: 'Horned Viper', soundDesc: 'Labiodental fricative' },
      fr: { letter: 'F', signName: 'Vipère cornue', soundDesc: 'Fricative labio-dentale sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓆑 𓈖 𓎡',
      transliteration: 'fnḫ',
      readingAr: 'فَنِخ',
      readingEn: 'Fenkh',
      readingFr: 'Fenkh',
      meaningAr: 'الصانع الحرفي والمبتكر',
      meaningEn: 'Craftsman / Builder',
      meaningFr: 'Artisan habile / Maçon',
      sourceContextAr: 'نقوش مقابر بناة الأهرامات بالجيزة'
    },
    speechScripts: {
      ar_kids: 'حرف الفاء، رمزه الأفعى الصغيرة ذات القرنين! وكلمة نموذجية: فَنِخ، وتعني الصانع الماهر.',
      ar_adults: 'حرف الفاء.. جاردنر I9.. يمثل أفعى الرمال المقرنة، صوته احتكاكي أسناني شفوي، ويستخدم كضمير للغائب المذكر. ومثال ذلك كلمة فَنِخ، أي الصانع البارع.',
      en_kids: 'Letter F, represented by the horned viper! Example Egyptian word: Fenkh, meaning a skilled artisan.',
      en_adults: 'Hieroglyphic sign I9, letter F. Depicts the desert horned viper. Example ancient word: Fenkh, designating a skillful craftsman.',
      fr_kids: 'Lettre F, représentée par la vipère cornue ! Mot égyptien : Fenkh, qui désigne un artisan ingénieux.',
      fr_adults: 'Hiéroglyphe I9, lettre F. Vipère cornue du désert. Sert aussi de pronom masculin singulier. Exemple : Fenkh, l’artisan bâtisseur.',
      phonetic: 'فَ.. فاء احتكاكية سنية شفوية.. فَنِخ'
    }
  },
  m1: {
    signId: 'm1',
    char: '𓅓',
    gardiner: 'G17',
    arabicLetter: 'م',
    phoneticIpa: '[m]',
    transliteration: 'm',
    names: {
      ar: { letter: 'ميم', signName: 'البومة المصرية الحكيمة', soundDesc: 'صوت الميم الأنفي الشفوي' },
      en: { letter: 'M', signName: 'Barn Owl', soundDesc: 'Bilabial nasal' },
      fr: { letter: 'M', signName: 'Chouette effraie', soundDesc: 'Nasale bilabiale voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓅓 𓅱 𓏏',
      transliteration: 'mwt',
      readingAr: 'مُوت',
      readingEn: 'Mout',
      readingFr: 'Mout',
      meaningAr: 'الأم الحنون والإلهة الحامية',
      meaningEn: 'Mother / Goddess Mut',
      meaningFr: 'Mère / Déesse protectrice Mout',
      sourceContextAr: 'معابد الكرنك وبرديات الأسرة'
    },
    speechScripts: {
      ar_kids: 'حرف الميم، رمزه البومة الساهرة بعينيها الواسعتين! وكلمة نموذجية: مُوت، وتعني الأم الحنون.',
      ar_adults: 'حرف الميم.. جاردنر G17.. يمثل البومة الوحيدة التي تُرسم بوجهها كاملاً، صوته أنفي شفوي، ويعني أيضاً حرف الجر في. ومثال ذلك كلمة مُوت، أي الأم.',
      en_kids: 'Letter M, represented by the watchful barn owl! Example Egyptian word: Mut, which means mother.',
      en_adults: 'Hieroglyph G17, letter M. Depicts the barn owl facing the viewer. Example word: Mut, signifying mother and the maternal deity of Thebes.',
      fr_kids: 'Lettre M, représentée par la chouette aux grands yeux ! Mot égyptien : Mout, signifiant mère.',
      fr_adults: 'Hiéroglyphe G17, lettre M. Chouette effraie vue de face. Exemple primordial : Mout, signifiant la mère et la grande déesse nourricière.',
      phonetic: 'مَ.. ميم شفوية أنفية رنانة.. مُوت'
    }
  },
  n1: {
    signId: 'n1',
    char: '𓈖',
    gardiner: 'N35',
    arabicLetter: 'ن',
    phoneticIpa: '[n]',
    transliteration: 'n',
    names: {
      ar: { letter: 'نون', signName: 'تموجات مياه نهر النيل المبارك', soundDesc: 'صوت النون الأنفي اللثوي' },
      en: { letter: 'N', signName: 'Water Ripple', soundDesc: 'Alveolar nasal' },
      fr: { letter: 'N', signName: 'Ondulation de l’eau', soundDesc: 'Nasale alvéolaire voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓈖 𓊹 𓂋',
      transliteration: 'nṯr',
      readingAr: 'نِتِر / نِثِر',
      readingEn: 'Netjer',
      readingFr: 'Netjer',
      meaningAr: 'الإله والطاهر والمقدس',
      meaningEn: 'God / Divine Spirit',
      meaningFr: 'Dieu / Esprit divin',
      sourceContextAr: 'نصوص الأهرام وكتاب الموتى'
    },
    speechScripts: {
      ar_kids: 'حرف النون، رمزه أمواج نهر النيل الصافية! وكلمة نموذجية: نِتِر، وتعني الإله الطاهر المقدس.',
      ar_adults: 'حرف النون.. جاردنر N35.. يمثل تموجات مياه النيل، صوته أنفي لثوي. ومثال ذلك الكلمة المحورية نِتِر، أي الإله المقدس والكائن الرباني.',
      en_kids: 'Letter N, represented by Nile water waves! Example Egyptian word: Netjer, meaning god or divine being.',
      en_adults: 'Hieroglyphic sign N35, letter N. Represents ripple of water. Prime example: Netjer, the foundational Egyptian word for god or divine entity.',
      fr_kids: 'Lettre N, représentée par les vagues de l’eau du Nil ! Mot égyptien : Netjer, qui signifie dieu.',
      fr_adults: 'Hiéroglyphe N35, lettre N. Ondulation de l’eau vive du Nil. Mot sacré capital : Netjer, désignant la divinité et le principe sacré.',
      phonetic: 'نَ.. نون لثوية أنفية.. نِتِر'
    }
  },
  r1: {
    signId: 'r1',
    char: '𓂋',
    gardiner: 'D21',
    arabicLetter: 'ر',
    phoneticIpa: '[ɾ] / [r]',
    transliteration: 'r',
    names: {
      ar: { letter: 'راء', signName: 'الفم البشري المبتسم', soundDesc: 'صوت الراء التكراري اللثوي' },
      en: { letter: 'R', signName: 'Human Mouth', soundDesc: 'Alveolar tap / trill' },
      fr: { letter: 'R', signName: 'Bouche humaine', soundDesc: 'Consonne battue alvéolaire' },
    },
    sampleWord: {
      hieroglyphs: '𓂋 𓂝',
      transliteration: 'Rꜥ',
      readingAr: 'رَع',
      readingEn: 'Ra',
      readingFr: 'Rê',
      meaningAr: 'الشمس وإله النور الأعظم',
      meaningEn: 'Sun God Ra',
      meaningFr: 'Dieu-Soleil Rê',
      sourceContextAr: 'متون الأهرام ونقوش معبد الشمس في هليوبوليس'
    },
    speechScripts: {
      ar_kids: 'حرف الراء، رمزه الفم الباسم الجميل! وكلمة نموذجية: رَع، وهو إله الشمس والنور.',
      ar_adults: 'حرف الراء.. جاردنر D21.. يمثل الفم البشري المفتوح، صوته تكراري لثوي مجهور. ومثال ذلك اسم إله الشمس الأكبر: رَع، أي النور الساطع.',
      en_kids: 'Letter R, represented by an open mouth! Example Egyptian word: Ra, the great Sun God.',
      en_adults: 'Hieroglyphic sign D21, letter R. Depicts a human mouth. Supreme example: Ra, the glorious sun and primordial creator in Heliopolis.',
      fr_kids: 'Lettre R, représentée par la bouche humaine ! Mot égyptien : Rê, le dieu tout-puissant du soleil.',
      fr_adults: 'Hiéroglyphe D21, lettre R. Représentation d’une bouche. Exemple éclatant : Rê, le souverain divin et astre solaire.',
      phonetic: 'رَ.. راء تكرارية لثوية رنانة.. رَع'
    }
  },
  h1: {
    signId: 'h1',
    char: '𓉔',
    gardiner: 'O4',
    arabicLetter: 'هـ',
    phoneticIpa: '[h]',
    transliteration: 'h',
    names: {
      ar: { letter: 'هاء', signName: 'باحة المنزل أو مأوى القصب', soundDesc: 'صوت الهاء الحنجري المهموس' },
      en: { letter: 'H', signName: 'Reed Shelter / Courtyard', soundDesc: 'Voiceless glottal fricative' },
      fr: { letter: 'H', signName: 'Abri de roseau ou cour', soundDesc: 'Fricative glottale sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓉔 𓂋 𓅱',
      transliteration: 'hrw',
      readingAr: 'هِرُو',
      readingEn: 'Heru / Herw',
      readingFr: 'Herou',
      meaningAr: 'اليوم وضوء النهار',
      meaningEn: 'Day / Daylight',
      meaningFr: 'Le Jour / Lumière diurne',
      sourceContextAr: 'تقويم الشهور ويوميات الكتبة في تل العمارنة'
    },
    speechScripts: {
      ar_kids: 'حرف الهاء، رمزه فناء البيت الهادئ! وكلمة نموذجية: هِرُو، وتعني اليوم الجميل ونور النهار.',
      ar_adults: 'حرف الهاء.. جاردنر O4.. يمثل باحة المنزل المفتوحة، صوته حنجري مهموس. ومثال ذلك كلمة هِرُو، أي النهار أو اليوم في الحسابات الفلكية.',
      en_kids: 'Letter H, represented by a reed courtyard! Example Egyptian word: Heru, meaning day or daylight.',
      en_adults: 'Hieroglyph O4, letter H. Depicts a reed shelter or courtyard. Example word: Heru, meaning daylight or a single day.',
      fr_kids: 'Lettre H, représentée par la cour de maison ! Mot égyptien : Herou, le jour et la lumière.',
      fr_adults: 'Hiéroglyphe O4, lettre H. Abri en roseau ou cour intérieure. Mot attesté : Herou, désignant le jour ou la clarté solaire.',
      phonetic: 'هَ.. هاء حنجرية نقية.. هِرُو'
    }
  },
  h2: {
    signId: 'h2',
    char: '𓎛',
    gardiner: 'V28',
    arabicLetter: 'ح',
    phoneticIpa: '[ħ]',
    transliteration: 'ḥ (Heth)',
    names: {
      ar: { letter: 'حاء', signName: 'فتيل الكتان المضفور الملتف', soundDesc: 'صوت الحاء الحلقي الصافي' },
      en: { letter: 'Heth (H-dot)', signName: 'Twisted Flax Wick', soundDesc: 'Pharyngeal voiceless fricative' },
      fr: { letter: 'Heth (H pointé)', signName: 'Mèche de lin tressée', soundDesc: 'Fricative pharyngale sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓎛 𓏏 𓊪',
      transliteration: 'ḥtp',
      readingAr: 'حُتِب / حوتب',
      readingEn: 'Hotep',
      readingFr: 'Hotep',
      meaningAr: 'السلام، الرضا، والقرابين',
      meaningEn: 'Peace, Offering, Contentment',
      meaningFr: 'Paix, offrande, plénitude',
      sourceContextAr: 'صيغ القرابين في كل المقابر والمعابد (حتب دي نسو)'
    },
    speechScripts: {
      ar_kids: 'حرف الحاء، رمزه فتيل الكتان المضيء! وكلمة نموذجية: حُوتِب، وتعني السلام والرضا الجميل.',
      ar_adults: 'حرف الحاء.. جاردنر V28.. يمثل جديلة الكتان الملتفة للإضاءة، صوته حلقي احتكاكي يطابق الحاء العربية بدقة. ومثال ذلك كلمة حُتِب، أي السلام والقرابين.',
      en_kids: 'Letter Heth, represented by twisted flax! Example Egyptian word: Hotep, which means peace and harmony.',
      en_adults: 'Hieroglyphic sign V28, letter Heth. Depicts twisted wick of flax. Celebrated example: Hotep, meaning peace, offering, and spiritual satisfaction.',
      fr_kids: 'Lettre Heth, représentée par la mèche de lin ! Mot égyptien : Hotep, signifiant la paix et l’offrande.',
      fr_adults: 'Hiéroglyphe V28, Heth pharyngal. Mèche de lin tressée. Terme illustre : Hotep, qui traduit la paix, la quiétude et l’offrande sacrée.',
      phonetic: 'حَ.. حاء حلقية عميقة.. حُتِب'
    }
  },
  kh1: {
    signId: 'kh1',
    char: '𓐍',
    gardiner: 'Aa1',
    arabicLetter: 'خ',
    phoneticIpa: '[x]',
    transliteration: 'ḫ (Kha)',
    names: {
      ar: { letter: 'خاء', signName: 'المشيمة أو كيس الجنين والولادة', soundDesc: 'صوت الخاء الطبقي الاحتكاكي' },
      en: { letter: 'Kha (Kh)', signName: 'Placenta / Sieve', soundDesc: 'Velar voiceless fricative' },
      fr: { letter: 'Kha', signName: 'Placenta ou tamis', soundDesc: 'Fricative vélaire sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓐍 𓂝',
      transliteration: 'ḫꜥ',
      readingAr: 'خَع',
      readingEn: 'Kha',
      readingFr: 'Kha',
      meaningAr: 'الإشراق والظهور في المجد',
      meaningEn: 'To Appear in Glory / Shine',
      meaningFr: 'Briller / Apparaître en gloire',
      sourceContextAr: 'أسماء الفراعنة كالملك خفرع وخع-إم-واست'
    },
    speechScripts: {
      ar_kids: 'حرف الخاء، رمزه كيس النماء والولادة! وكلمة نموذجية: خَع، وتعني الإشراق والطلوع البهي.',
      ar_adults: 'حرف الخاء.. جاردنر Aa1.. يمثل كيس المشيمة الحافظ للحياة، صوته طبقي احتكاكي يطابق الخاء العربية. ومثال ذلك كلمة خَع، أي الظهور في المجد والإشراق الشمسي.',
      en_kids: 'Letter Kha, symbol of birth! Example Egyptian word: Kha, meaning to shine and appear in glory.',
      en_adults: 'Hieroglyph Aa1, letter Kha. Represents the placenta or sieve. Classic example: Kha, meaning to rise, shine, or manifest in royal majesty.',
      fr_kids: 'Lettre Kha, symbole de la naissance ! Mot égyptien : Kha, qui signifie briller et rayonner.',
      fr_adults: 'Hiéroglyphe Aa1, lettre Kha vélaire. Représentation du placenta ou tamis. Mot clé : Kha, signifiant apparaître en majesté et resplendir.',
      phonetic: 'خَ.. خاء طبقية احتكاكية.. خَع'
    }
  },
  kh2: {
    signId: 'kh2',
    char: '𓄡',
    gardiner: 'F32',
    arabicLetter: 'خـ',
    phoneticIpa: '[ç]',
    transliteration: 'ẖ (Kha-soft)',
    names: {
      ar: { letter: 'خاء مرققة / حنكية', signName: 'بطن البقرة وذيلها', soundDesc: 'صوت الخاء الحنكية المهموسة' },
      en: { letter: 'Kha-underbar', signName: 'Animal Belly with Teats', soundDesc: 'Palatal voiceless fricative' },
      fr: { letter: 'Kha doux', signName: 'Ventre d’animal', soundDesc: 'Fricative palatale sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓄡 𓂋 𓂧',
      transliteration: 'ẖrd',
      readingAr: 'خِرِد',
      readingEn: 'Khered',
      readingFr: 'Khered',
      meaningAr: 'الطفل الصغير والوليد المحبوب',
      meaningEn: 'Child / Infant',
      meaningFr: 'Enfant / Nourrisson',
      sourceContextAr: 'نصوص التربية والتعليم في مقابر طيبة'
    },
    speechScripts: {
      ar_kids: 'حرف خاء الناعمة، رمزه بطن الحيوان! وكلمة نموذجية: خِرِد، وتعني الطفل الصغير الحبيب.',
      ar_adults: 'حرف الخاء الحنكية المرققة.. جاردنر F32.. يمثل بطن الحيوان، صوته حنكي ناعم. ومثال ذلك كلمة خِرِد، أي الطفل الرضيع أو الصغير.',
      en_kids: 'Letter soft Kha, represented by an animal belly! Example Egyptian word: Khered, meaning child.',
      en_adults: 'Hieroglyphic sign F32, palatal fricative Kha. Depicts an animal belly and teats. Example word: Khered, meaning child or youth.',
      fr_kids: 'Lettre Kha doux, représentée par le ventre d’animal ! Mot égyptien : Khered, qui signifie enfant.',
      fr_adults: 'Hiéroglyphe F32, Kha palatal. Ventre d’animal. Mot modèle : Khered, signifiant le jeune enfant ou adolescent.',
      phonetic: 'خِ.. خاء حنكية مرققة.. خِرِد'
    }
  },
  s1: {
    signId: 's1',
    char: '𓊃',
    gardiner: 'O34',
    arabicLetter: 'س',
    phoneticIpa: '[z] / [s]',
    transliteration: 'z / s (Bolt)',
    names: {
      ar: { letter: 'سين / زاي', signName: 'مزلاج الباب الخشبي المقفل', soundDesc: 'صوت السين أو الزاي الصفيري' },
      en: { letter: 'Z / S', signName: 'Door Bolt', soundDesc: 'Alveolar sibilant' },
      fr: { letter: 'Z / S', signName: 'Verrou de porte', soundDesc: 'Sifflante alvéolaire' },
    },
    sampleWord: {
      hieroglyphs: '𓊃 𓈖 𓃀',
      transliteration: 'snb / znb',
      readingAr: 'سِنِب',
      readingEn: 'Seneb',
      readingFr: 'Seneb',
      meaningAr: 'الصحة التامة والعافية',
      meaningEn: 'Health and Wellness',
      meaningFr: 'Santé et vigueur',
      sourceContextAr: 'التحية الملكية الثلاثية: عنخ-وجا-سنب'
    },
    speechScripts: {
      ar_kids: 'حرف السين، رمزه قفل الباب الخشبي! وكلمة نموذجية: سِنِب، وتعني الصحة التامة والنشاط.',
      ar_adults: 'حرف السين أو الزاي.. جاردنر O34.. يمثل مزلاج الباب الخشبي، صوته صفيري لثوي. ومثال ذلك كلمة سِنِب، أي الصحة والعافية.',
      en_kids: 'Letter S or Z, represented by a wooden door bolt! Example Egyptian word: Seneb, meaning health and vigor.',
      en_adults: 'Hieroglyphic sign O34, door bolt. Represents the sibilant consonant. Essential word: Seneb, meaning health, soundness, and vitality.',
      fr_kids: 'Lettre S ou Z, représentée par le verrou de porte ! Mot égyptien : Seneb, signifiant la bonne santé.',
      fr_adults: 'Hiéroglyphe O34, lettre S ou Z. Verrou de porte en bois. Mot célèbre : Seneb, symbolisant la parfaite santé physique.',
      phonetic: 'سَ.. سين صفيرية لثوية.. سِنِب'
    }
  },
  s2: {
    signId: 's2',
    char: '𓋴',
    gardiner: 'S29',
    arabicLetter: 'س',
    phoneticIpa: '[s]',
    transliteration: 's (Folded Cloth)',
    names: {
      ar: { letter: 'سين', signName: 'قطعة القماش الكتاني المطوية', soundDesc: 'صوت السين الصفيري المهموس' },
      en: { letter: 'S', signName: 'Folded Cloth', soundDesc: 'Voiceless alveolar sibilant' },
      fr: { letter: 'S', signName: 'Tissu plié', soundDesc: 'Sifflante alvéolaire sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓋴 𓈖',
      transliteration: 'sn',
      readingAr: 'سِن',
      readingEn: 'Sen',
      readingFr: 'Sen',
      meaningAr: 'الأخ والرفيق الوفي',
      meaningEn: 'Brother / Companion',
      meaningFr: 'Frère / Ami fidèle',
      sourceContextAr: 'نقوش المحبة الأسرية في برديات الحكمة'
    },
    speechScripts: {
      ar_kids: 'حرف السين الثاني، رمزه قطعة قماش ناعمة مطوية! وكلمة نموذجية: سِن، وتعني الأخ الحبيب.',
      ar_adults: 'حرف السين.. جاردنر S29.. يمثل نسيج القماش المطوي، صوته صفيري مهموس. ومثال ذلك كلمة سِن، أي الأخ أو الصاحب المخلص.',
      en_kids: 'Letter S, represented by folded cloth! Example Egyptian word: Sen, which means brother or companion.',
      en_adults: 'Hieroglyphic sign S29, folded cloth. Represents voiceless S. Example word: Sen, meaning brother, sibling, or trusted friend.',
      fr_kids: 'Lettre S, représentée par l’étoffe de lin pliée ! Mot égyptien : Sen, qui signifie frère.',
      fr_adults: 'Hiéroglyphe S29, tissu plié. Valeur phonétique S. Mot modèle : Sen, désignant le frère ou compagnon dévoué.',
      phonetic: 'سَ.. سين صفيرية نقية.. سِن'
    }
  },
  sh1: {
    signId: 'sh1',
    char: '𓈙',
    gardiner: 'N37',
    arabicLetter: 'ش',
    phoneticIpa: '[ʃ]',
    transliteration: 'š (Shin)',
    names: {
      ar: { letter: 'شين', signName: 'بركة الماء والبحيرة المستطيلة', soundDesc: 'صوت الشين الحنكي اللثوي' },
      en: { letter: 'Shin / Sh', signName: 'Water Basin / Pool', soundDesc: 'Postalveolar fricative' },
      fr: { letter: 'Chine / Ch', signName: 'Bassin d’eau rectangulaire', soundDesc: 'Fricative post-alvéolaire' },
    },
    sampleWord: {
      hieroglyphs: '𓈙 𓅓 𓂝',
      transliteration: 'šmꜥ',
      readingAr: 'شِمَع',
      readingEn: 'Shema',
      readingFr: 'Chéma',
      meaningAr: 'الصعيد وأرض مصر العليا',
      meaningEn: 'Upper Egypt / The South',
      meaningFr: 'La Haute-Égypte / Le Sud',
      sourceContextAr: 'الألقاب الملكية وجنوب وادي النيل'
    },
    speechScripts: {
      ar_kids: 'حرف الشين، رمزه بركة الماء الجميلة في الحديقة! وكلمة نموذجية: شِمَع، وتعني صعيد مصر المبارك.',
      ar_adults: 'حرف الشين.. جاردنر N37.. يمثل حوض أو بركة الماء المستطيلة في بساتين المعابد، صوته احتكاكي لثوي حنكي. ومثال ذلك كلمة شِمَع، أي مصر العليا وجنوب الوادي.',
      en_kids: 'Letter Shin, represented by a garden water pool! Example Egyptian word: Shema, meaning Upper Egypt.',
      en_adults: 'Hieroglyphic sign N37, letter Shin. Depicts an irrigation basin or pool. Example word: Shema, designating Upper Egypt and the southern land.',
      fr_kids: 'Lettre Ch, représentée par le bassin d’eau du jardin ! Mot égyptien : Chéma, la Haute-Égypte.',
      fr_adults: 'Hiéroglyphe N37, lettre Ch. Bassin d’eau rectangulaire. Mot fondamental : Chéma, la Haute-Égypte et le Midi nilotique.',
      phonetic: 'شَ.. شين حنكية احتكاكية.. شِمَع'
    }
  },
  q1: {
    signId: 'q1',
    char: '𓈎',
    gardiner: 'N29',
    arabicLetter: 'ق',
    phoneticIpa: '[q]',
    transliteration: 'q (Qaf)',
    names: {
      ar: { letter: 'قاف', signName: 'التل أو المنحدر الرملي الصاعد', soundDesc: 'صوت القاف اللهوي الفصيح' },
      en: { letter: 'Qaf / Q', signName: 'Sandy Hillside / Slope', soundDesc: 'Voiceless uvular plosive' },
      fr: { letter: 'Qaf', signName: 'Pente de colline sablonneuse', soundDesc: 'Occlusive uvulaire sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓈎 𓌃',
      transliteration: 'qd',
      readingAr: 'قِد',
      readingEn: 'Qed',
      readingFr: 'Qed',
      meaningAr: 'البناء، التشييد، وتشكيل الفخار',
      meaningEn: 'To Build, Construct, Shape',
      meaningFr: 'Bâtir, façonner, construire',
      sourceContextAr: 'نقوش بناء المعابد وصروح الأهرام'
    },
    speechScripts: {
      ar_kids: 'حرف القاف، رمزه تل رملي يصعد إلى قمة الجبل! وكلمة نموذجية: قِد، وتعني البناء والعمارة الجميلة.',
      ar_adults: 'حرف القاف.. جاردنر N29.. يمثل منحدر التل، صوته لهوي انفجاري يطابق القاف العربية تماماً. ومثال ذلك كلمة قِد، أي البناء والتشييد وتشكيل الطين.',
      en_kids: 'Letter Q, represented by a desert hillside! Example Egyptian word: Qed, which means to build and create.',
      en_adults: 'Hieroglyphic sign N29, letter Qaf. Depicts a sandy hillside slope. Example word: Qed, meaning to build, shape, or form architecture.',
      fr_kids: 'Lettre Q, représentée par la colline du désert ! Mot égyptien : Qed, qui signifie bâtir et créer.',
      fr_adults: 'Hiéroglyphe N29, Qaf uvulaire. Pente de colline sablonneuse. Mot archéologique : Qed, signifiant bâtir, modeler ou façonner.',
      phonetic: 'قَ.. قاف لهوية انفجارية صريحة.. قِد'
    }
  },
  k1: {
    signId: 'k1',
    char: '𓎡',
    gardiner: 'V31',
    arabicLetter: 'ك',
    phoneticIpa: '[k]',
    transliteration: 'k',
    names: {
      ar: { letter: 'كاف', signName: 'سلة الخوص ذات المقبض الواحد', soundDesc: 'صوت الكاف الطبقي المهموس' },
      en: { letter: 'K', signName: 'Basket with Handle', soundDesc: 'Voiceless velar plosive' },
      fr: { letter: 'K', signName: 'Corbeille à anse', soundDesc: 'Occlusive vélaire sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓎡 𓄿',
      transliteration: 'kꜣ',
      readingAr: 'كَا',
      readingEn: 'Ka',
      readingFr: 'Ka',
      meaningAr: 'القرين، الطاقة الحيوية، والروح الحارسة',
      meaningEn: 'Vital Spirit / Soul Double',
      meaningFr: 'Double spirituel / Énergie vitale',
      sourceContextAr: 'تمثال الكا الخشبي الشهير للملك حور بدهشور'
    },
    speechScripts: {
      ar_kids: 'حرف الكاف، رمزه سلة خوص صغيرة لها يد لطيفة! وكلمة نموذجية: كَا، وهو القرين والطاقة الحيوية.',
      ar_adults: 'حرف الكاف.. جاردنر V31.. يمثل سلة الخوص ذات المقبض، صوته طبقي انفجاري، ويستخدم كضمير المخاطب المذكر (أنت / لك). ومثال ذلك مفهوم كَا، أي الطاقة الحيوية والقرين الروحي.',
      en_kids: 'Letter K, represented by a handled wicker basket! Example Egyptian word: Ka, the vital life force.',
      en_adults: 'Hieroglyphic sign V31, letter K. Depicts a woven basket with a handle. Supreme example: Ka, the spiritual double and vital energy in Egyptian belief.',
      fr_kids: 'Lettre K, représentée par le panier à anse ! Mot égyptien : Ka, la force de vie et le double protecteur.',
      fr_adults: 'Hiéroglyphe V31, lettre K. Corbeille tressée à anse. Concept fondamental : Ka, l’énergie vitale immortelle de chaque être.',
      phonetic: 'كَ.. كاف طبقية انفجارية.. كَا'
    }
  },
  g1: {
    signId: 'g1',
    char: '𓎼',
    gardiner: 'W11',
    arabicLetter: 'ج',
    phoneticIpa: '[ɡ]',
    transliteration: 'g',
    names: {
      ar: { letter: 'جيم قاهرية / گاف', signName: 'حامل الجرة الفخارية الحجري', soundDesc: 'صوت الجيم غير المعطشة (G)' },
      en: { letter: 'G (Hard G)', signName: 'Ring Stand for Jars', soundDesc: 'Voiced velar plosive' },
      fr: { letter: 'G dur', signName: 'Support de jarre', soundDesc: 'Occlusive vélaire voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓎼 𓃀',
      transliteration: 'Gb',
      readingAr: 'جِب / كِب',
      readingEn: 'Geb',
      readingFr: 'Geb',
      meaningAr: 'إله الأرض والتربة الخصبة والنماء',
      meaningEn: 'Earth God Geb',
      meaningFr: 'Dieu de la Terre Geb',
      sourceContextAr: 'أسطورة الخلق الهليوبوليتية (جب ونوت)'
    },
    speechScripts: {
      ar_kids: 'حرف الجيم المصرية، رمزه حامل الجرار الفخارية! وكلمة نموذجية: جِب، وهو إله الأرض الطيبة.',
      ar_adults: 'حرف الجيم غير المعطشة جـ.. جاردنر W11.. يمثل قاعدة أو حامل جرة الماء، صوته طبقي مجهور مطابق للجيم المصرية المعاصرة. ومثال ذلك اسم إله الأرض العظيم جِب.',
      en_kids: 'Letter hard G, represented by a jar stand! Example Egyptian word: Geb, the friendly earth god.',
      en_adults: 'Hieroglyphic sign W11, hard G. Depicts a ring stand for vessels. Classic example: Geb, the great god of the earth and fertile soil.',
      fr_kids: 'Lettre G dur, représentée par le support de vase ! Mot égyptien : Geb, le dieu de la terre féconde.',
      fr_adults: 'Hiéroglyphe W11, lettre G dur. Support d’amphore ou de jarre. Exemple théologique : Geb, divinité de la terre et de la végétation.',
      phonetic: 'گَ.. جيم مصرية طبقية مجهورة.. جِب'
    }
  },
  t1: {
    signId: 't1',
    char: '𓏏',
    gardiner: 'X1',
    arabicLetter: 'ت',
    phoneticIpa: '[t]',
    transliteration: 't',
    names: {
      ar: { letter: 'تاء', signName: 'رغيف الخبز المستدير الشهي', soundDesc: 'صوت التاء الأسناني وعلامة التأنيث' },
      en: { letter: 'T', signName: 'Round Bread Loaf', soundDesc: 'Voiceless alveolar plosive' },
      fr: { letter: 'T', signName: 'Miche de pain ronde', soundDesc: 'Occlusive alvéolaire sourde' },
    },
    sampleWord: {
      hieroglyphs: '𓏏 𓄿',
      transliteration: 'tꜣ',
      readingAr: 'تَا',
      readingEn: 'Ta',
      readingFr: 'Ta',
      meaningAr: 'الأرض والوطن الطاهر',
      meaningEn: 'Land / Earth / Egypt',
      meaningFr: 'Terre / Pays / Égypte',
      sourceContextAr: 'اسم مصر الأثير: تا-مري (أرض المحبة)'
    },
    speechScripts: {
      ar_kids: 'حرف التاء، رمزه رغيف الخبز الساخن واللذيذ! وكلمة نموذجية: تَا، وتعني أرض مصر الطيبة.',
      ar_adults: 'حرف التاء.. جاردنر X1.. يمثل رغيف الخبز المستدير، صوته لثوي أسناني، وهو علامة التأنيث الدائمة في اللغة المصرية القديمة. ومثال ذلك كلمة تَا، أي الأرض والوطن.',
      en_kids: 'Letter T, represented by a fresh loaf of bread! Example Egyptian word: Ta, meaning the beloved land of Egypt.',
      en_adults: 'Hieroglyphic sign X1, letter T. Depicts a round loaf of bread, serving as the feminine ending marker. Example word: Ta, meaning earth or land.',
      fr_kids: 'Lettre T, représentée par la petite miche de pain ! Mot égyptien : Ta, la terre bien-aimée.',
      fr_adults: 'Hiéroglyphe X1, lettre T. Miche de pain ronde. Sert de marqueur du féminin. Mot essentiel : Ta, la terre, le pays ou le territoire.',
      phonetic: 'تَ.. تاء لثوية رقيقة.. تَا'
    }
  },
  th1: {
    signId: 'th1',
    char: '𓍿',
    gardiner: 'V13',
    arabicLetter: 'ث / تش',
    phoneticIpa: '[t͡ʃ] / [θ]',
    transliteration: 'ṯ (T-bar / Tj)',
    names: {
      ar: { letter: 'ثاء / تش', signName: 'عقال أو حبل قيد الماشية', soundDesc: 'صوت الثاء أو التاء الحنكية (تش)' },
      en: { letter: 'Tj / Th', signName: 'Hobble Rope for Cattle', soundDesc: 'Voiceless postalveolar affricate' },
      fr: { letter: 'Tj / Th', signName: 'Corde d’entrave à bétail', soundDesc: 'Affriquée post-alvéolaire' },
    },
    sampleWord: {
      hieroglyphs: '𓍿 𓎡 𓂋',
      transliteration: 'ṯkr',
      readingAr: 'ثِكِر / تشِكِر',
      readingEn: 'Theker',
      readingFr: 'Théker',
      meaningAr: 'الشعلة المتقدة والشرارة المضيئة',
      meaningEn: 'Spark / Flaming Torch',
      meaningFr: 'Étincelle / Torche ardente',
      sourceContextAr: 'نصوص الطقوس الليلية في معبد دندرة'
    },
    speechScripts: {
      ar_kids: 'حرف الثاء أو تش، رمزه حبل رعاية الحيوانات! وكلمة نموذجية: ثِكِر، وتعني شعلة النور المضيئة.',
      ar_adults: 'حرف الثاء أو تش.. جاردنر V13.. يمثل حبل ربط الماشية، صوته حنكي أسناني ممزوج. ومثال ذلك كلمة ثِكِر، أي الشعلة المضيئة أو القبس.',
      en_kids: 'Letter Tj or Th, represented by a rope hobble! Example Egyptian word: Theker, meaning spark or flaming torch.',
      en_adults: 'Hieroglyphic sign V13, palatal Tj. Depicts a tethering rope. Example word: Theker, meaning a bright spark or burning flame.',
      fr_kids: 'Lettre Tj ou Th, représentée par la cordelette ! Mot égyptien : Théker, l’étincelle brillante.',
      fr_adults: 'Hiéroglyphe V13, Tj palatalisé. Corde d’attache pour le bétail. Mot attesté : Théker, signifiant l’étincelle ou le flambeau.',
      phonetic: 'ثَ.. تاء معطشة تش.. ثِكِر'
    }
  },
  d1: {
    signId: 'd1',
    char: '𓂧',
    gardiner: 'D46',
    arabicLetter: 'د',
    phoneticIpa: '[d]',
    transliteration: 'd',
    names: {
      ar: { letter: 'دال', signName: 'الكف واليد البشرية المفتوحة', soundDesc: 'صوت الدال الأسناني المجهور' },
      en: { letter: 'D', signName: 'Human Hand', soundDesc: 'Voiced alveolar plosive' },
      fr: { letter: 'D', signName: 'Main humaine ouverte', soundDesc: 'Occlusive alvéolaire voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓂧 𓊽',
      transliteration: 'ḏd / dd',
      readingAr: 'دِيد / جِد',
      readingEn: 'Djed',
      readingFr: 'Djed',
      meaningAr: 'الثبات، الاستقرار، والخلود',
      meaningEn: 'Stability and Endurance',
      meaningFr: 'Stabilité et endurance éternelle',
      sourceContextAr: 'عمود الجد الأوزيري في معبد أبيدوس'
    },
    speechScripts: {
      ar_kids: 'حرف الدال، رمزه كف اليد التي تعطي وتبني! وكلمة نموذجية: جِد أو دِد، وتعني الثبات والصلابة.',
      ar_adults: 'حرف الدال.. جاردنر D46.. يمثل كف اليد البشرية الممدودة، صوته أسناني انفجاري. ومثال ذلك رمز وعمود جِد أو دِد، أي عمود الثبات والاستقرار الأبدي.',
      en_kids: 'Letter D, represented by an open helping hand! Example Egyptian word: Djed, symbol of strength and stability.',
      en_adults: 'Hieroglyphic sign D46, letter D. Depicts the human hand. Renowned example: Djed, the sacred pillar of enduring stability and resurrection.',
      fr_kids: 'Lettre D, représentée par la main humaine tendue ! Mot égyptien : Djed, symbole de stabilité et de force.',
      fr_adults: 'Hiéroglyphe D46, lettre D. Représente la main humaine ouverte. Exemple universel : Djed, le pilier sacré de la stabilité et de l’éternité.',
      phonetic: 'دَ.. دال لثوية انفجارية صريحة.. جِد'
    }
  },
  dj1: {
    signId: 'dj1',
    char: '𓆓',
    gardiner: 'I10',
    arabicLetter: 'ج / دج',
    phoneticIpa: '[d͡ʒ] / [ɟ]',
    transliteration: 'ḏ (Dj / Djadja)',
    names: {
      ar: { letter: 'جيم معطشة / دج', signName: 'حية الكوبرا الملكية المنتصبة', soundDesc: 'صوت الجيم المعطشة الفصيحة' },
      en: { letter: 'Dj (Djed)', signName: 'Uraeus / Cobra', soundDesc: 'Voiced postalveolar affricate' },
      fr: { letter: 'Dj', signName: 'Cobra dressé', soundDesc: 'Affriquée post-alvéolaire voisée' },
    },
    sampleWord: {
      hieroglyphs: '𓆓 𓏏',
      transliteration: 'ḏt',
      readingAr: 'جِت / دجِت',
      readingEn: 'Djet',
      readingFr: 'Djet',
      meaningAr: 'الأبدية والخلود المستمر في الزمان',
      meaningEn: 'Eternity / Everlasting Time',
      meaningFr: 'Éternité / Temps immuable',
      sourceContextAr: 'ثنائية الزمن الخالد: نحح وجت'
    },
    speechScripts: {
      ar_kids: 'حرف الجيم المعطشة دج، رمزه أفعى الكوبرا الملكية الشجاعة! وكلمة نموذجية: جِت، وتعني الأبدية التي لا تنتهي.',
      ar_adults: 'حرف الجيم المعطشة دج.. جاردنر I10.. يمثل حية الكوبرا المنتصبة، صوته حنكي مركب مجهور. ومثال ذلك كلمة جِت، أي الأبدية والخلود الزمني المستقر.',
      en_kids: 'Letter Dj, represented by the royal cobra! Example Egyptian word: Djet, meaning everlasting eternity.',
      en_adults: 'Hieroglyphic sign I10, letter Dj. Depicts the royal rearing cobra. Supreme example: Djet, the eternal, unchanging duration of cosmic existence.',
      fr_kids: 'Lettre Dj, représentée par le cobra royal dressé ! Mot égyptien : Djet, l’éternité infinie.',
      fr_adults: 'Hiéroglyphe I10, affriquée Dj. Cobra royal dressé prêt à défendre. Exemple théologique : Djet, la dimension cosmique de l’éternité immuable.',
      phonetic: 'دْجَ.. جيم معطشة مجهورة فصيحة.. جِت'
    }
  }
};
