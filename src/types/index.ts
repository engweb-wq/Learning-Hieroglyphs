export type AudienceMode = 'kids' | 'adults' | 'dictionary' | 'shared_roots' | 'pronunciation' | 'artifacts' | 'riddles' | 'grammar' | 'games' | 'heritage' | 'timeline' | 'papyri' | 'video_dict' | 'progress' | 'scanner' | 'tutor' | 'pharaohs' | 'architecture' | 'timemachine' | 'stone_engraving';

export interface RoyalCartouche {
  prenomenHieroglyphs: string; // اسم التتويج / العرش (نسو-بيتي)
  prenomenTransliteration: string;
  prenomenReadingAr: string;
  prenomenMeaningAr: string;
  nomenHieroglyphs: string; // اسم الولادة الشخصي (سا-رع)
  nomenTransliteration: string;
  nomenReadingAr: string;
  nomenMeaningAr: string;
}

export interface EpigraphicCartoucheStyle {
  eraStyleNameAr: string; // e.g. "أسلوب السَّرَخ الحوري المنحوت على الأردواز"
  writingMediumAr: string; // e.g. "حجر الشست الأخضر والأردواز"
  scribalTechniqueAr: string; // e.g. "نقش بارز بحواف حادة يعلوه الصقر حورس مباشرة..."
  frameType: 'serekh' | 'old_kingdom_limestone' | 'middle_kingdom_papyrus' | 'new_kingdom_gold' | 'amarna_sunken' | 'late_period_basalt' | 'ptolemaic_floral';
  calligraphyNoteAr: string; // ملحوظة الخطاط الملكي عن تطور الحروف في هذا العصر
}

export interface PharaohKingEntry {
  id: string;
  commonNameAr: string;
  commonNameEn: string;
  greekName?: string;
  reignPeriodBce: string;
  dynastyNumber: number;
  dynastyAr: string;
  eraCategory: 'early_dynastic' | 'old_kingdom' | 'middle_kingdom' | 'new_kingdom' | 'late_period' | 'ptolemaic';
  eraCategoryAr: string;
  approximateYearsReigned: number;
  cartouche: RoyalCartouche;
  epigraphicStyle?: EpigraphicCartoucheStyle;
  horusNameAr?: string;
  nebtyNameAr?: string;
  goldenHorusNameAr?: string;
  summaryBioAr: string;
  keyAchievementsAr: string[];
  famousMonumentsAr: string[];
  burialPlaceAr: string;
  mummyStatusAr: string;
  famousInscriptionSnippet?: {
    hieroglyphs: string;
    transliteration: string;
    translationAr: string;
    sourceAr: string;
  };
  audioSpeechScript: string;
}

export type TutorLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TutorQuizChallenge {
  questionAr: string;
  hieroglyphDisplay?: string;
  options: { id: string; textAr: string; isCorrect: boolean }[];
  explanationAr: string;
  pointsReward: number;
}

export interface TutorChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  level: TutorLevel;
  hieroglyphsSample?: string;
  gardinerCodes?: string[];
  quiz?: TutorQuizChallenge;
}

export interface HieroglyphAntonymWord {
  hieroglyphs: string;
  transliteration: string;
  arabicTransliteration: string;
  arabicMeaning: string;
  englishMeaning: string;
  gardinerCodes: string[];
  grammaticalTypeAr: string;
  pronunciationSound: string;
}

export interface AntonymPair {
  id: string;
  themeAr: string;
  themeEn: string;
  category: 'cosmic' | 'moral' | 'life_death' | 'physical' | 'actions' | 'state';
  categoryAr: string;
  wordA: HieroglyphAntonymWord;
  wordB: HieroglyphAntonymWord;
  philosophicalInsightAr: string;
  exampleSentence: {
    hieroglyphs: string;
    transliteration: string;
    arabicPhonetics: string;
    arabicTranslation: string;
    englishTranslation: string;
    grammarNoteAr: string;
  };
}

export interface SacredFaunaEntry {
  id: string;
  glyph: string;
  gardinerCode: string;
  nameAr: string;
  nameEn: string;
  transliteration: string;
  phoneticReadingAr: string;
  category: 'birds' | 'mammals' | 'reptiles_insects';
  categoryAr: string;
  grammaticalRoleAr: string;
  culturalSignificanceAr: string;
  mythologicalAssociationAr: string;
  samplePhrase: {
    hieroglyphs: string;
    transliteration: string;
    translationAr: string;
  };
}

export interface SacredFloraEntry {
  id: string;
  glyph: string;
  gardinerCode: string;
  nameAr: string;
  nameEn: string;
  transliteration: string;
  phoneticReadingAr: string;
  category: 'funerary' | 'daily_life' | 'divine_offering';
  categoryAr: string;
  culturalSignificanceAr: string;
  funeraryMeaningAr: string;
  dailyLifeMeaningAr: string;
  mythologicalAssociationAr: string;
  samplePhrase: {
    hieroglyphs: string;
    transliteration: string;
    translationAr: string;
    sourceContextAr: string;
  };
}

export interface DailyQuestTask {
  id: string;
  dayNameAr: string;
  titleAr: string;
  descriptionAr: string;
  categoryAr: string;
  targetMode: AudienceMode;
  estimatedMinutes: number;
  pointsReward: number;
  isCompleted: boolean;
  actionLabelAr: string;
}

export type ScanReadingDirection = 'rtl' | 'ltr' | 'column_rtl' | 'column_ltr' | 'uncertain';
export type GlyphEpistemicStatus = 'confirmed' | 'tentative' | 'eroded';

export interface DetectedGlyph {
  id: string;
  char: string;
  gardiner: string;
  transliteration: string;
  arabicSound: string;
  meaningAr: string;
  meaningEn?: string;
  categoryAr: string;
  glyphType: 'uniliteral' | 'biliteral' | 'triliteral' | 'determinative' | 'ideogram' | 'uncertain';
  confidence: number; // 0 - 100
  epistemicStatus: GlyphEpistemicStatus;
  facingDirection?: 'right' | 'left' | 'neutral';
  notesAr?: string;
}

export interface ScannerAnalysisResult {
  isHieroglyphicFound: boolean;
  readingDirection: ScanReadingDirection;
  readingDirectionExplanationAr: string;
  overallConfidence: number; // 0 - 100
  glyphs: DetectedGlyph[];
  transliterationLine: string;
  phoneticTranscriptionAr: string;
  literalTranslationAr: string;
  historicalContextAr: string;
  damageAnalysisAr?: string;
  isPartiallyEroded: boolean;
  academicIntegrityNoteAr: string;
}


export interface ScribeRank {
  id: string;
  level: number;
  titleAr: string;
  titleHieroglyphs: string;
  minPoints: number;
  maxPoints: number;
  descriptionAr: string;
  privilegeAr: string;
  badgeIcon: string;
}

export interface AchievementBadge {
  id: string;
  titleAr: string;
  hieroglyph: string;
  descriptionAr: string;
  category: 'learning' | 'games' | 'mastery' | 'community';
  categoryAr: string;
  pointsReward: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  requirementText: string;
  ancientLore: string;
}

export interface LearningLessonModule {
  id: string;
  titleAr: string;
  targetMode: AudienceMode;
  categoryAr: string;
  estimatedMinutes: number;
  pointsReward: number;
  descriptionAr: string;
  isCompleted: boolean;
  totalItems: number;
  completedItems: number;
}

export interface StudentProgressData {
  studentName: string;
  avatarIcon: string;
  totalScribePoints: number;
  dailyStreakDays: number;
  lastActiveDate: string;
  completedLessons: string[];
  gameHighScores: {
    flashMemory: number;
    speedQuiz: number;
    wordBuilder: number;
    memoryCards: number;
    versusWins: number;
    royalExamScore: number;
    templeRunes?: number;
    stoneCarving?: number;
    symbolRecognition?: number;
    wordAssembly?: number;
    meaningDecoder?: number;
    pronunciationChallenge?: number;
  };
  unlockedBadgeIds: string[];
  recentActivityLog: {
    id: string;
    actionAr: string;
    points: number;
    timestamp: string;
    category: string;
  }[];
}

export interface VideoStrokeStep {
  stepNumber: number;
  instructionAr: string;
  penPosition: { x: number; y: number };
  scribeTipAr: string;
}

export interface VideoDictionaryEntry {
  id: string;
  glyph: string;
  gardiner: string;
  wordAr: string;
  wordEn: string;
  transliteration: string;
  pronunciationAr: string;
  phoneticType: string;
  category: 'nature' | 'spiritual' | 'anatomy' | 'letters' | 'daily_life';
  categoryAr: string;
  meaningAr: string;
  meaningEn: string;
  videoDurationSec: number;
  drawingSteps: VideoStrokeStep[];
  phoneticGuide: {
    articulationPlace: string;
    acousticDescriptionAr: string;
    modernArabicComparison: string;
    sampleUsageSentence: string;
  };
  narratorScript: string;
  sharedArabicRootNote?: string;
  svgOutline: string; // SVG path data for drawing simulation
}

export interface PapyrusWordSegment {
  id: string;
  glyphs: string;
  transliteration: string;
  pronunciationAr: string;
  meaningAr: string;
  meaningEn: string;
  grammaticalRole: string;
  gardinerCodes?: string[];
  isRedInk?: boolean;
}

export interface PapyrusItem {
  id: string;
  titleAr: string;
  titleEn: string;
  dynastyAndEraAr: string;
  approximateDateBCE: string;
  currentMuseumLocation: string;
  lengthAndDimensions: string;
  category: 'literature' | 'medicine_science' | 'funerary' | 'history_royalty' | 'prophetic_parallels';
  categoryAr: string;
  scriptType: string;
  hieroglyphicText: string;
  hieroglyphicHeadingRed?: string;
  transliteration: string;
  phoneticReadingAr: string;
  arabicTranslation: string;
  englishTranslation: string;
  historicalContext: string;
  archaeologicalSignificance: string;
  biblicalPropheticConnection?: string;
  academicConsensusNote?: string;
  methodologicalNote?: string;
  scribeOrAuthor: string;
  audioNarrationText: string;
  segments: PapyrusWordSegment[];
  funCuratorialFact: string;
  talesOfWonder?: {
    number: number;
    titleAr: string;
    storytellerAr: string;
    plotAr: string;
    magicTrickAr: string;
    moralAr: string;
  }[];
  literarySignificanceDeepAr?: string;
  khufuAndMagiciansDialogAr?: {
    characterAr: string;
    roleAr: string;
    quoteAr: string;
    hieroglyphsSample?: string;
  }[];
}

export interface GlyphEvolutionComparison {
  id: string;
  nameAr: string;
  soundAr: string;
  transliteration: string;
  oldKingdomHieroglyph: string; // Detailed pictorial glyph
  middleKingdomHieroglyph: string; // Classical standardized glyph
  hieraticScript: string; // Cursive script representation / unicode / stylized svg
  demoticScript: string; // Abstracted rapid cursive representation
  copticScript: string; // Coptic letter (e.g. Ⲙ, Ϥ, Ϣ...)
  evolutionNote: string;
}

export interface ScriptTimelineEra {
  id: string;
  eraNameAr: string;
  eraNameEn: string;
  timePeriodAr: string;
  approximateYears: string;
  yearBCE: number; // For slider sorting & positioning
  scriptNameAr: string;
  scriptDescriptionAr: string;
  writingMediums: string[];
  keyFeatures: string[];
  archaeologicalFamousArtifact: string;
  artifactDescription: string;
  glyphSample: string;
  audioNarrative: string;
}

export interface HieroglyphSign {
  id: string;
  char: string; // Unicode glyph e.g. 𓅓
  gardiner: string; // e.g. G17
  arabicLetter: string; // e.g. م
  arabicSound: string; // e.g. ميم
  transliteration: string; // e.g. m
  meaningAr: string; // e.g. بومة
  meaningEn: string; // e.g. Owl
  category: 'birds' | 'animals' | 'body' | 'nature' | 'tools' | 'symbols' | 'food';
  categoryAr: string;
  kidMnemonicAr: string; // Fun rhyme or clue for kids
  kidFunFact: string;
  detailsAdultAr: string; // Scientific/historical linguistic note
  svgPath?: string; // High clarity SVG path fallback
  soundPronunciation: string; // Text to speak via speech synthesis
}

export interface MultiLiteralSign {
  id: string;
  char: string;
  gardiner: string;
  type: 'biliteral' | 'triliteral' | 'determinative';
  transliteration: string;
  arabicSound: string;
  meaningAr: string;
  usageExample: string;
  explanationAr: string;
}

export interface LivingWord {
  id: string;
  colloquialArabic: string; // e.g. "مَمْ"
  hieroglyphSigns: string; // e.g. 𓃹𓈖𓅓
  ancientTransliteration: string; // e.g. wnm
  ancientMeaning: string; // e.g. أكل / طعام
  category: 'food' | 'family_kids' | 'daily_life' | 'tools_home' | 'proverbs_chants' | 'prophetic_heritage';
  categoryAr: string;
  historicalEvolution: string; // Detailed historical path from hieroglyphs -> demotic -> coptic -> colloquial
  exampleUsageToday: string;
  funFact: string;
  tags: string[];
}

export interface InscriptionItem {
  id: string;
  titleAr: string;
  titleEn: string;
  period: string;
  glyphs: string;
  transliteration: string;
  translationAr: string;
  contextHistorical: string;
  breakdown: { glyph: string; sound: string; meaning: string }[];
}

export interface DictionaryWord {
  id: string;
  hieroglyphs: string; // Unicode glyph sequence e.g. 𓉐𓂋
  transliteration: string; // e.g. "pr", "mw", "rꜥ", "ḥtp"
  arabicTransliteration: string; // e.g. "بِر", "مُو", "رَع"
  arabicMeaning: string; // e.g. "بيت / دار"
  englishMeaning: string; // e.g. "House / Home"
  iconName: string; // e.g. 'home', 'droplet', 'sun'
  category: 'nature' | 'body' | 'family' | 'animals' | 'food' | 'home_tools' | 'actions' | 'spiritual' | 'prophetic_heritage';
  categoryAr: string;
  hasSharedArabicRoot: boolean;
  arabicSharedRootNote: string; // Comparative root explanation
  exampleUsage: string;
}

export interface QuizQuestion {
  id: string;
  forMode: 'kids' | 'adults';
  question: string;
  glyphDisplay?: string;
  imageVisual?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export type ArchitectureCategory = 'pyramids' | 'mortuary_temples' | 'cult_temples';

export interface ArchitectureComponentHotspot {
  id: string;
  nameAr: string;
  nameEn: string;
  hieroglyph: string;
  transliteration: string;
  pronunciationAr: string;
  descriptionAr: string;
  theologicalRoleAr: string;
  svgHighlightId: string;
}

export interface ArchitectureBuildingType {
  id: ArchitectureCategory;
  titleAr: string;
  titleEn: string;
  hieroglyphName: string;
  transliteration: string;
  pronunciationAr: string;
  badgeAr: string;
  summaryAr: string;
  corePurposeAr: string;
  geographicalOrientationAr: string;
  accessRulesAr: string;
  architecturalEvolutionAr: string;
  diagramDescriptionAr: string;
  keyComponents: ArchitectureComponentHotspot[];
  famousExamples: {
    id: string;
    nameAr: string;
    dynastyAndEraAr: string;
    locationAr: string;
    builderKingAr: string;
    architectNameAr?: string;
    distinctionAr: string;
  }[];
  audioNarrationScript: string;
  comparisonPoints: {
    purpose: string;
    location: string;
    sanctity: string;
    evolution: string;
  };
}

export type SharedRootRelationType = 'afro_asiatic_cognate' | 'phonetic_semantic' | 'cultural_heritage';

export type SharedRootDomain = 'nature' | 'body_life' | 'actions_senses' | 'society_home' | 'heritage_titles';

export interface SharedRootUsageExample {
  hieroglyphs: string;
  transliteration: string;
  phoneticAr: string;
  arabicTranslation: string;
  arabicParallelSentence: string;
}

export interface SharedRootEntry {
  id: string;
  hieroglyphs: string;
  gardinerCodes: string[];
  transliteration: string;
  approximatePronunciationAr: string;
  arabicMeaning: string;
  englishMeaning: string;
  arabicCognate: string;
  arabicRoot: string;
  consonantBridge: {
    egyptian: string;
    arabic: string;
    noteAr?: string;
  }[];
  relationType: SharedRootRelationType;
  relationLabelAr: string;
  domain: SharedRootDomain;
  domainLabelAr: string;
  similarityExplanationAr: string;
  phoneticLawSummaryAr: string;
  examples: SharedRootUsageExample[];
}

