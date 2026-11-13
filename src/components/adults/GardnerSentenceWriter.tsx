import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  PenTool, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Copy, 
  BookOpen, 
  Trophy, 
  Layers, 
  HelpCircle, 
  Eye, 
  Compass,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { 
  GARDNER_CATEGORIES, 
  CORE_GARDNER_SIGNS, 
  GARDNER_SENTENCE_CHALLENGES, 
  GardnerSentenceChallenge,
  analyzeHieroglyphicDirection,
  DirectionAnalysisResult
} from '../../data/gardnerTrainingData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

export const GardnerSentenceWriter: React.FC = () => {
  // Input state
  const [gardinerInput, setGardinerInput] = useState<string>('S34 G43 D46 G1 O34 N35 D58');
  const [userReadingDirection, setUserReadingDirection] = useState<'rtl' | 'ltr'>('ltr');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeChallenge, setActiveChallenge] = useState<GardnerSentenceChallenge | null>(GARDNER_SENTENCE_CHALLENGES[0]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [mirrorGlyphsVisual, setMirrorGlyphsVisual] = useState<boolean>(false);
  const [showCategoryPalette, setShowCategoryPalette] = useState<boolean>(true);

  // Parse input into clean tokens
  const parsedCodes = useMemo(() => {
    return gardinerInput
      .toUpperCase()
      .split(/[\s,\-]+/)
      .filter(token => token.trim().length > 0);
  }, [gardinerInput]);

  // Convert codes to Unicode Glyphs
  const { renderedGlyphs, transliterationList, unknownTokens } = useMemo(() => {
    const glyphs: string[] = [];
    const translits: string[] = [];
    const unknowns: string[] = [];

    parsedCodes.forEach(code => {
      const sign = CORE_GARDNER_SIGNS[code];
      if (sign) {
        glyphs.push(sign.char);
        translits.push(sign.transliteration);
      } else {
        unknowns.push(code);
      }
    });

    return {
      renderedGlyphs: glyphs.join(' '),
      transliterationList: translits.join(' '),
      unknownTokens: unknowns
    };
  }, [parsedCodes]);

  // Direction Analysis Engine
  const directionAnalysis: DirectionAnalysisResult = useMemo(() => {
    return analyzeHieroglyphicDirection(parsedCodes, userReadingDirection);
  }, [parsedCodes, userReadingDirection]);

  // Insert a Gardiner code from palette
  const handleInsertSign = (code: string) => {
    soundFX.playClickSound();
    setGardinerInput(prev => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${code}` : code;
    });
  };

  // Backspace last code
  const handleRemoveLastSign = () => {
    soundFX.playClickSound();
    setGardinerInput(prev => {
      const tokens = prev.trim().split(/[\s,\-]+/);
      tokens.pop();
      return tokens.join(' ');
    });
  };

  // Clear all
  const handleClear = () => {
    soundFX.playClickSound();
    setGardinerInput('');
  };

  // Copy Glyphs
  const handleCopyGlyphs = () => {
    if (!renderedGlyphs) return;
    navigator.clipboard.writeText(renderedGlyphs);
    setIsCopied(true);
    soundFX.playSuccessSound();
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Play audio pronunciation of the composed sentence
  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      scribeAudio.stop();
      setIsPlayingAudio(false);
      return;
    }

    if (!renderedGlyphs) return;

    setIsPlayingAudio(true);
    soundFX.playAncientChime(560);

    const speechText = `جملة هيروغليفية بطريقة جاردنر.. تفريغها الصوتي: ${transliterationList}.. عدد الرموز: ${parsedCodes.length}`;

    scribeAudio.speakText(speechText, {
      rate: 0.9,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  // Load a training challenge into the editor
  const handleLoadChallenge = (challenge: GardnerSentenceChallenge) => {
    setActiveChallenge(challenge);
    setGardinerInput(challenge.targetGardinerCodes.join(' '));
    setUserReadingDirection(challenge.correctReadingDirection);
    soundFX.playAncientChime(520);
  };

  // Verify the active challenge
  const handleVerifyActiveChallenge = () => {
    if (!activeChallenge) return;

    const normalizedCurrent = parsedCodes.join(' ').toUpperCase();
    const normalizedTarget = activeChallenge.targetGardinerCodes.join(' ').toUpperCase();

    const isMatch = normalizedCurrent === normalizedTarget;
    const isDirectionValid = directionAnalysis.isDirectionCompliant;

    if (isMatch && isDirectionValid) {
      soundFX.playSuccessSound();
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (!completedChallenges.includes(activeChallenge.id)) {
        setCompletedChallenges(prev => [...prev, activeChallenge.id]);
        studentProgress.addPoints(
          activeChallenge.pointsReward,
          `إتقان كتابة جملة جاردنر: ${activeChallenge.titleAr}`,
          'mastery'
        );
      }
    } else {
      soundFX.playAncientChime(380);
    }
  };

  // Filtered signs for the palette
  const filteredPaletteSigns = useMemo(() => {
    const allSigns = Object.values(CORE_GARDNER_SIGNS);
    if (selectedCategory === 'all') return allSigns;
    return allSigns.filter(s => s.categoryLetter === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-8 text-right" dir="rtl">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-10 shadow-lg space-y-4">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <PenTool className="w-4 h-4 text-amber-400" />
            <span>مختبر الكتبة الأكاديمي (Gardiner Composition Lab)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-display-eg tracking-tight">
            محرر كتابة الجمل الكاملة بطريقة جاردنر والتحقق التلقائي من اتجاه الرموز
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
            تعلم كيف كان كبار الكتبة يصوغون الجمل الكاملة باستخدام الأكواد المعيارية لقائمة السير آلان جاردنر (Sir Alan Gardiner). اكتب الأكواد أو اختر الرموز، وشاهد المحرك وهو <strong>يتحقق تلقائياً من اتجاه القراءة الصحيح</strong> استناداً إلى القاعدة الذهبية: «وجوه الكائنات الحية تواجه دائماً بداية السطر والقارئ يتقدم لملاقاتها!».
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200">
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-amber-500/30">
              ✓ فحص ذكي للرموز الحية (الطيور والبشر والحيوانات)
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-amber-500/30">
              ✓ تمييز اتجاه القراءة (RTL مقابل LTR)
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-amber-500/30">
              ✓ 5 تمارين أثرية تدريبية مع نقاط الكاتب
            </span>
          </div>
        </div>

        {/* Hieroglyphic Decorative Background */}
        <div className="absolute left-6 bottom-3 opacity-10 text-8xl font-hieroglyphs pointer-events-none select-none text-amber-300 hidden md:block">
          𓋹 𓅱 𓂧 𓄿 𓊃 𓈖 𓃀
        </div>
      </div>

      {/* Main Workspace Layout (Editor + Direction Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8DFC9] shadow-2xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-amber-800" />
                <h3 className="text-base font-extrabold text-stone-900 font-display-eg">
                  مساحة إدخال أكواد جاردنر (Gardiner Code Input)
                </h3>
              </div>

              {/* Direction Selector Switch */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setUserReadingDirection('rtl');
                    soundFX.playClickSound();
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    userReadingDirection === 'rtl'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="القراءة من اليمين إلى اليسار (الاتجاه التقليدي للبرديات)"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>يمين ⬅ يسار (RTL)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserReadingDirection('ltr');
                    soundFX.playClickSound();
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    userReadingDirection === 'ltr'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="القراءة من اليسار إلى اليمين (الجداريات المقابلة والكتب الحديثة)"
                >
                  <span>يسار ➡ يمين (LTR)</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>اكتب أكواد جاردنر مفصولة بمسافات (مثال: S34 G43 D46 G1 O34 N35 D58)</span>
                <span className="font-mono font-bold text-amber-900">{parsedCodes.length} رمزاً مدخلاً</span>
              </div>

              <textarea
                value={gardinerInput}
                onChange={(e) => setGardinerInput(e.target.value)}
                placeholder="اكتب أكواد جاردنر هنا... مثال: S34 G43 D46 G1"
                rows={3}
                className="w-full p-3.5 text-sm sm:text-base font-mono bg-[#FAF8F5] border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 placeholder-stone-400"
                dir="ltr"
              />

              {unknownTokens.length > 0 && (
                <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    أكواد غير متعرف عليها حالياً: <strong className="font-mono">{unknownTokens.join(', ')}</strong> (يمكنك اختيار الرموز من اللوحة بالأسفل)
                  </span>
                </div>
              )}
            </div>

            {/* Live Papyrus Render Preview */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-amber-800" />
                  <span>معاينة الجملة على لوح البردي الملكي:</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMirrorGlyphsVisual(!mirrorGlyphsVisual);
                      soundFX.playClickSound();
                    }}
                    className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                      mirrorGlyphsVisual
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                    title="عكس رسم الرموز أفقياً كما كان يفعل الكاتب على الجدران المتقابلة"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>تناظر المرآة (Mirror)</span>
                  </button>
                </div>
              </div>

              <div 
                className={`relative p-6 sm:p-8 rounded-2xl border-2 border-amber-200/90 shadow-inner bg-gradient-to-b from-[#FDFBF7] to-[#F5EEDC] text-center min-h-[120px] flex flex-col items-center justify-center transition-all ${
                  mirrorGlyphsVisual ? 'scale-x-[-1]' : ''
                }`}
                style={{ direction: userReadingDirection }}
              >
                {renderedGlyphs ? (
                  <div className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900 tracking-wider leading-relaxed select-none">
                    {renderedGlyphs}
                  </div>
                ) : (
                  <div className="text-stone-400 text-xs italic font-serif-ar">
                    (أدخل أكواد جاردنر أعلاه لتظهر الجملة الهيروغليفية هنا فوراً)
                  </div>
                )}
              </div>

              {/* Transliteration line */}
              {transliterationList && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono">
                  <div className="text-stone-600">
                    النقحرة الأكاديمية: <strong className="text-amber-950 text-sm font-semibold">{transliterationList}</strong>
                  </div>
                  <div className="text-stone-400 text-[11px]" dir="ltr">
                    Gardiner: {parsedCodes.join(' ')}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  disabled={!renderedGlyphs}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isPlayingAudio
                      ? 'bg-amber-800 text-white'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 disabled:opacity-40'
                  }`}
                  title="استمع للنطق الصوتي والتفريغ"
                >
                  {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>نطق الجملة</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyGlyphs}
                  disabled={!renderedGlyphs}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all disabled:opacity-40"
                  title="نسخ الرموز الهيروغليفية"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'تم النسخ!' : 'نسخ الرموز'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRemoveLastSign}
                  disabled={parsedCodes.length === 0}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium disabled:opacity-40"
                  title="حذف آخر رمز"
                >
                  تراجع ⌫
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={parsedCodes.length === 0}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-medium disabled:opacity-40"
                  title="مسح الكل"
                >
                  مسح
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Gardiner Palette (Accordion / Quick Picker) */}
          <div className="bg-white p-5 rounded-3xl border border-[#E8DFC9] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowCategoryPalette(!showCategoryPalette)}
                className="flex items-center gap-2 text-stone-900 font-extrabold text-sm font-display-eg hover:text-amber-800 transition-colors"
              >
                <span>لوحة رموز جاردنر السريعة (اضغط للإدراج)</span>
                {showCategoryPalette ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <span className="text-xs text-stone-500">
                {filteredPaletteSigns.length} رمزاً متاحاً
              </span>
            </div>

            {showCategoryPalette && (
              <div className="space-y-3 animate-fadeIn">
                {/* Category Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    الكل
                  </button>
                  {GARDNER_CATEGORIES.map(cat => (
                    <button
                      key={cat.code}
                      onClick={() => {
                        setSelectedCategory(cat.code);
                        soundFX.playClickSound();
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat.code
                          ? 'bg-amber-800 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                      title={cat.nameEn}
                    >
                      <span className="font-hieroglyphs">{cat.icon}</span>
                      <span>{cat.code}</span>
                    </button>
                  ))}
                </div>

                {/* Sign Cards Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1 border border-stone-200 rounded-2xl bg-stone-50/50">
                  {filteredPaletteSigns.map(sign => (
                    <button
                      key={sign.code}
                      type="button"
                      onClick={() => handleInsertSign(sign.code)}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-600 hover:shadow-xs transition-all flex flex-col items-center justify-between text-center group"
                      title={`${sign.meaningAr} [${sign.transliteration}]`}
                    >
                      <div className="text-2xl font-hieroglyphs text-stone-900 group-hover:scale-115 transition-transform">
                        {sign.char}
                      </div>
                      <div className="font-mono text-[10px] font-bold text-amber-900 mt-1">
                        {sign.code}
                      </div>
                      <div className="text-[9px] text-stone-500 font-serif-ar truncate max-w-full">
                        {sign.soundAr}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Direction Inspector & Training Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Automatic Direction Inspector Card */}
          <div className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-4 shadow-2xs ${
            directionAnalysis.isDirectionCompliant
              ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200'
              : 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300'
          }`}>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className={`w-5 h-5 ${
                  directionAnalysis.isDirectionCompliant ? 'text-emerald-700' : 'text-amber-800 animate-bounce'
                }`} />
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 font-display-eg">
                  فاحص اتجاه الرموز الأوتوماتيكي (Direction Inspector)
                </h3>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                directionAnalysis.isDirectionCompliant
                  ? 'bg-emerald-200/80 text-emerald-900'
                  : 'bg-amber-200 text-amber-950 font-bold'
              }`}>
                {directionAnalysis.isDirectionCompliant ? 'اتجاه سليم ✓' : 'تنبيه أثري ⚠️'}
              </span>
            </div>

            {/* Explanation box */}
            <p className="text-xs text-stone-800 font-serif-ar leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-stone-200/60">
              {directionAnalysis.explanationAr}
            </p>

            {/* Animate Sign Detection Details */}
            {directionAnalysis.detectedAnimateSigns.length > 0 ? (
              <div className="space-y-2 pt-1 border-t border-stone-200/60">
                <div className="text-[11px] font-bold text-stone-600 flex items-center justify-between">
                  <span>الرموز الحية الموجهة المكتشفة ({directionAnalysis.detectedAnimateSigns.length}):</span>
                  <span className="font-mono text-amber-900 text-[10px]">
                    {directionAnalysis.facingDirectionDetected === 'faces_left' ? 'تنظر لليسار ⬅️' : 'تنظر لليمين ➡️'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {directionAnalysis.detectedAnimateSigns.map((s, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-lg border border-stone-200 text-stone-800 font-serif-ar"
                    >
                      <span className="font-hieroglyphs text-base text-amber-900">{s.char}</span>
                      <span className="font-mono text-[10px] text-stone-500">[{s.code}]</span>
                      <span className="text-[10px]">{s.nameAr.split(' ')[0]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-stone-500 font-serif-ar italic">
                لم يتم إدخال رموز حية (طيور، حيوانات، أو بشر) بعد لتحديد اتجاه النظر.
              </div>
            )}

            {/* Fix Direction Quick Action */}
            {!directionAnalysis.isDirectionCompliant && (
              <button
                type="button"
                onClick={() => {
                  setUserReadingDirection(directionAnalysis.requiredReadingDirection);
                  soundFX.playSuccessSound();
                }}
                className="w-full py-2.5 px-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>ضبط الاتجاه تلقائياً إلى: {directionAnalysis.requiredReadingDirectionLabelAr}</span>
                <Check className="w-4 h-4 text-amber-300" />
              </button>
            )}

            {/* Academic Rule Quote */}
            <div className="text-[10px] text-stone-600 bg-stone-100/80 p-2.5 rounded-xl border border-stone-200/60 font-serif-ar leading-relaxed">
              {directionAnalysis.ruleCitationAr}
            </div>

          </div>

          {/* Training Challenges Card (مهام كتابة الجمل بطريقة جاردنر) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8DFC9] shadow-2xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-800" />
                <h3 className="text-base font-extrabold text-stone-900 font-display-eg">
                  تحديات كتابة الجمل المصرية (5 مهمات)
                </h3>
              </div>

              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                أُنجز {completedChallenges.length} / {GARDNER_SENTENCE_CHALLENGES.length}
              </span>
            </div>

            {/* Challenge Picker List */}
            <div className="space-y-2.5">
              {GARDNER_SENTENCE_CHALLENGES.map((chall) => {
                const isSelected = activeChallenge?.id === chall.id;
                const isDone = completedChallenges.includes(chall.id);

                return (
                  <div
                    key={chall.id}
                    onClick={() => handleLoadChallenge(chall)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-amber-800 bg-amber-50/70 shadow-xs ring-1 ring-amber-400'
                        : isDone
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-amber-950 font-display-eg">
                          {chall.level}. {chall.titleAr}
                        </span>
                        {isDone && (
                          <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            مكتمل ✓
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-amber-800 font-bold">
                        +{chall.pointsReward} 𓋹
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-serif-ar line-clamp-1">
                        « {chall.arabicMeaning} »
                      </span>
                      <span className="font-hieroglyphs text-stone-900 text-base">
                        {chall.targetGlyphs}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-amber-900 font-serif-ar">
                          💡 التلميح: {chall.hintAr}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerifyActiveChallenge();
                          }}
                          className="px-3 py-1 bg-amber-800 text-white rounded-lg font-bold hover:bg-amber-900 transition-colors shadow-xs"
                        >
                          تحقق من الحل
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
