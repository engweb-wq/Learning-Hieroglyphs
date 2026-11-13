import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  PenTool, 
  Activity, 
  Search, 
  Sliders, 
  Maximize2, 
  Minimize2, 
  CheckCircle, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Compass, 
  Feather,
  Eye,
  Eraser,
  Palette
} from 'lucide-react';
import { VIDEO_DICTIONARY_ENTRIES } from '../../data/videoDictionaryData';
import { VideoDictionaryEntry } from '../../types';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';

type VideoMode = 'drawing' | 'phonetics';
type CategoryFilter = 'all' | 'spiritual' | 'nature' | 'letters' | 'anatomy' | 'daily_life';

export const VideoDictionary: React.FC = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(VIDEO_DICTIONARY_ENTRIES[0].id);
  const [videoMode, setVideoMode] = useState<VideoMode>('drawing');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [isVoiceOverEnabled, setIsVoiceOverEnabled] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);

  // Drawing practice canvas state
  const practiceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingPractice, setIsDrawingPractice] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#1c1917'); // Egyptian black carbon ink
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [showGhostOutline, setShowGhostOutline] = useState<boolean>(true);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  const videoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeEntry: VideoDictionaryEntry = 
    VIDEO_DICTIONARY_ENTRIES.find((e) => e.id === selectedEntryId) || VIDEO_DICTIONARY_ENTRIES[0];

  const totalDuration = activeEntry.videoDurationSec;
  const progressPercent = Math.min((currentTimeSec / totalDuration) * 100, 100);

  // Filtered entries
  const filteredEntries = VIDEO_DICTIONARY_ENTRIES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.wordAr.includes(searchQuery) ||
      item.wordEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaningAr.includes(searchQuery) ||
      item.pronunciationAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Handle Play/Pause timeline ticker
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100 / playbackSpeed;
      videoTimerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            if (isLooping) {
              return 0;
            } else {
              setIsPlaying(false);
              return totalDuration;
            }
          }
          return next;
        });
      }, intervalMs);
    } else if (videoTimerRef.current) {
      clearInterval(videoTimerRef.current);
    }

    return () => {
      if (videoTimerRef.current) clearInterval(videoTimerRef.current);
    };
  }, [isPlaying, totalDuration, playbackSpeed, isLooping]);

  // When entry changes, reset player
  const handleSelectEntry = (entry: VideoDictionaryEntry) => {
    soundFX.playClickSound();
    setSelectedEntryId(entry.id);
    setCurrentTimeSec(0);
    setIsPlaying(true);
    setPracticeFeedback(null);
    clearPracticeCanvas();

    if (isVoiceOverEnabled) {
      soundFX.playAncientChime(540);
      scribeAudio.speakText(entry.narratorScript, {
        id: `vid-script-${entry.id}`,
      });
    }
  };

  const togglePlay = () => {
    soundFX.playClickSound();
    if (!isPlaying && currentTimeSec >= totalDuration) {
      setCurrentTimeSec(0);
    }
    setIsPlaying(!isPlaying);

    if (!isPlaying && isVoiceOverEnabled && currentTimeSec < 1) {
      scribeAudio.speakText(activeEntry.narratorScript, {
        id: `vid-script-${activeEntry.id}`,
      });
    }
  };

  const handleRestart = () => {
    soundFX.playClickSound();
    setCurrentTimeSec(0);
    setIsPlaying(true);
    if (isVoiceOverEnabled) {
      scribeAudio.speakText(activeEntry.narratorScript, {
        id: `vid-script-${activeEntry.id}`,
      });
    }
  };

  const handleScrub = (newTime: number) => {
    setCurrentTimeSec(newTime);
  };

  const handleHearPronunciation = () => {
    soundFX.playAncientChime(620);
    scribeAudio.speakText(
      `الكلمة: ${activeEntry.wordAr}.. النطق الصوتي: ${activeEntry.pronunciationAr}.. ${activeEntry.phoneticGuide.acousticDescriptionAr}`,
      { id: `voice-guide-${activeEntry.id}` }
    );
  };

  // Determine active stroke step based on current video time
  const stepsCount = activeEntry.drawingSteps.length;
  const currentStepIndex = Math.min(
    Math.floor((currentTimeSec / totalDuration) * stepsCount),
    stepsCount - 1
  );
  const activeStep = activeEntry.drawingSteps[currentStepIndex] || activeEntry.drawingSteps[0];

  // Practice Canvas interaction
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawingPractice(true);
    const canvas = practiceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingPractice) return;
    const canvas = practiceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawingPractice(false);
  };

  const clearPracticeCanvas = () => {
    const canvas = practiceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPracticeFeedback(null);
  };

  const handleVerifyPractice = () => {
    soundFX.playSuccessSound();
    setPracticeFeedback('أحسنت رسم الرمز ببراعة الكاتب المصري القديم! حصلت على 25 نقطة كاتب 🌟');
  };

  return (
    <div className="space-y-12 text-right">
      
      {/* Section Header */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-1.5">
              <Play className="w-4 h-4 text-amber-700 fill-amber-700" />
              <span>قاموس الفيديو التفاعلي للكلمات والرموز (Interactive Video Dictionary)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              شاهد كيف ترسم الرمز خطوة بخطوة واستمع لمخارج النطق الصوتي الأصيل
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleHearPronunciation}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm rounded-xl border border-amber-300 shadow-2xs transition-all whitespace-nowrap"
            >
              <Volume2 className="w-4 h-4 text-amber-800" />
              <span>استمع لنطق: {activeEntry.wordAr.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar max-w-4xl">
          أول قاموس بصري وسمعي متحرك للغة الهيروغليفية؛ يجمع بين مقاطع الفيديو التوضيحية المتحركة لمحاكاة رسم قلم البوص المصري بدقة، وعرض مخارج الحروف وتشريح النطق الصوتي، مع لوحة تدريب عملية تتيح لك ممارسة رسم الرمز بيدك فوراً!
        </p>

        {/* Categories & Search */}
        <div className="pt-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              الكل ({VIDEO_DICTIONARY_ENTRIES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('spiritual')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'spiritual'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              مفاهيم مقدسة
            </button>
            <button
              onClick={() => setSelectedCategory('nature')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'nature'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              كائنات الطبيعة
            </button>
            <button
              onClick={() => setSelectedCategory('letters')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'letters'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              الحروف الأبجدية
            </button>
            <button
              onClick={() => setSelectedCategory('anatomy')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'anatomy'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              أعضاء الجسد
            </button>
            <button
              onClick={() => setSelectedCategory('daily_life')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'daily_life'
                  ? 'bg-amber-900 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              العمارة والحياة
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="ابحث عن كلمة، رمز، أو نطق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            <Search className="w-4 h-4 text-stone-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Main Interactive Video Theater & Practice Lab */}
      <div className={`grid grid-cols-1 ${isTheaterMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-8 items-start`}>
        
        {/* Left Column: Interactive Video Player Stage (7 cols or full) */}
        <div className={`${isTheaterMode ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
          
          <div className="bg-stone-950 rounded-3xl overflow-hidden border-4 border-amber-900/60 shadow-xl relative text-white">
            
            {/* Top Video Header Overlay */}
            <div className="p-4 bg-gradient-to-b from-stone-950/90 to-transparent flex items-center justify-between relative z-20">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-hieroglyphs text-2xl text-amber-300">
                  {activeEntry.glyph}
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-amber-100 font-display-eg">
                    {activeEntry.wordAr}
                  </h3>
                  <div className="text-[11px] font-mono text-amber-300/80">
                    كود جاردنر: {activeEntry.gardiner} · النطق: {activeEntry.pronunciationAr} ({activeEntry.transliteration})
                  </div>
                </div>
              </div>

              {/* Mode Switcher inside Video Player */}
              <div className="flex items-center bg-stone-900/90 p-1 rounded-xl border border-stone-700">
                <button
                  onClick={() => setVideoMode('drawing')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    videoMode === 'drawing'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>فيديو الرسم ✍️</span>
                </button>
                <button
                  onClick={() => setVideoMode('phonetics')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    videoMode === 'phonetics'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>فيديو النطق 🎙️</span>
                </button>
              </div>
            </div>

            {/* Video Main Stage / Animation Canvas */}
            <div className="relative aspect-video w-full bg-[#E8DBB8] overflow-hidden flex items-center justify-center">
              
              {/* Authentic Reed papyrus texture watermark */}
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none select-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #8B5A14 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #8B5A14 0px, transparent 1px, transparent 4px)'
                }}
              />

              {/* Mode 1: Stroke-by-Stroke Drawing Video Mode */}
              {videoMode === 'drawing' ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none">
                  
                  {/* SVG Glyph Drawing Simulator with animated stroke dash offset */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                    
                    {/* Background faint guide glyph */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full absolute inset-0 opacity-15 stroke-amber-950 fill-none"
                      strokeWidth="6"
                    >
                      <path d={activeEntry.svgOutline} />
                    </svg>

                    {/* Active Inked Stroke Path (Animated stroke reveal) */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full absolute inset-0 stroke-stone-950 fill-none transition-all duration-300 drop-shadow-md"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: '400',
                        strokeDashoffset: `${400 - (progressPercent / 100) * 400}`,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                      }}
                    >
                      <path d={activeEntry.svgOutline} />
                    </svg>

                    {/* Animated Reed Pen Stylus following the active stroke */}
                    <div
                      className="absolute z-20 pointer-events-none transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${activeStep.penPosition.x}%`,
                        top: `${activeStep.penPosition.y}%`,
                      }}
                    >
                      <div className="relative">
                        {/* Glowing ink drop */}
                        <div className="w-4 h-4 rounded-full bg-amber-600/80 animate-ping absolute -top-1 -left-1" />
                        <div className="w-3 h-3 rounded-full bg-stone-900 border-2 border-amber-300 shadow-md" />
                        {/* Simulated Reed Pen */}
                        <div className="w-1.5 h-14 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-sm transform rotate-45 origin-bottom-left shadow-lg -mt-12 ml-1 border-r border-amber-900" />
                      </div>
                    </div>

                    {/* Unicode Giant Glyphs in Center as fallback & anchor */}
                    <div 
                      className="font-hieroglyphs text-8xl sm:text-9xl text-stone-900 pointer-events-none transition-opacity duration-500"
                      style={{ opacity: progressPercent > 80 ? 0.95 : 0.2 }}
                    >
                      {activeEntry.glyph}
                    </div>

                  </div>

                  {/* Active Drawing Step Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-600/40 text-right space-y-1 z-20">
                    <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>الخطوة {activeStep.stepNumber} من {stepsCount}:</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-200/80">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-50 font-serif-ar leading-snug">
                      {activeStep.instructionAr}
                    </p>
                    <div className="text-[11px] text-amber-400 font-serif-ar">
                      💡 سر الكاتب: {activeStep.scribeTipAr}
                    </div>
                  </div>

                </div>
              ) : (
                /* Mode 2: Phonetic Pronunciation & Vocal Wave Video Mode */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#2b1f13] via-[#3a2818] to-[#1f150b] text-white">
                  
                  {/* Vocal Wave Visualizer Bars */}
                  <div className="flex items-center gap-1.5 h-24 mb-4">
                    {[40, 65, 30, 85, 95, 60, 45, 80, 50, 70, 90, 40, 60, 35, 75].map((height, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 transition-all duration-150"
                        style={{
                          height: isPlaying ? `${Math.max(12, (height * (Math.sin(currentTimeSec * 5 + i) + 1.2)) / 2)}%` : '15%',
                        }}
                      />
                    ))}
                  </div>

                  {/* Phonetic Pronunciation Badge */}
                  <div className="text-center space-y-2 z-10">
                    <span className="font-hieroglyphs text-5xl sm:text-6xl text-amber-300 drop-shadow-md">
                      {activeEntry.glyph}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display-eg tracking-wide">
                      {activeEntry.pronunciationAr}
                    </div>
                    <div className="text-sm font-mono text-amber-400 bg-stone-900/60 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                      [{activeEntry.transliteration}] · {activeEntry.phoneticType}
                    </div>
                  </div>

                  {/* Articulatory Vocal Diagram Box */}
                  <div className="mt-4 p-3 bg-stone-900/80 rounded-xl border border-amber-600/30 text-right max-w-md w-full space-y-1">
                    <div className="text-[11px] font-bold text-amber-300">
                      مخرج الصوت: <strong className="text-white">{activeEntry.phoneticGuide.articulationPlace}</strong>
                    </div>
                    <p className="text-xs text-stone-200 font-serif-ar leading-relaxed">
                      {activeEntry.phoneticGuide.acousticDescriptionAr}
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* Video Controls Bar */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-3">
              
              {/* Scrubbable Progress Bar */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  step={0.1}
                  value={currentTimeSec}
                  onChange={(e) => handleScrub(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>00:{String(Math.floor(currentTimeSec)).padStart(2, '0')}</span>
                  <span>00:{String(totalDuration).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold transition-all shadow-md"
                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  {/* Restart */}
                  <button
                    onClick={handleRestart}
                    className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                    title="إعادة تشغيل المقطع من البداية"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Loop toggle */}
                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isLooping 
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-500/50' 
                        : 'bg-stone-900 text-stone-400 border border-stone-800'
                    }`}
                    title="تكرار الفيديو تلقائياً"
                  >
                    تكرار ⟳
                  </button>

                  {/* Voice-over toggle */}
                  <button
                    onClick={() => setIsVoiceOverEnabled(!isVoiceOverEnabled)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      isVoiceOverEnabled 
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-500/50' 
                        : 'bg-stone-900 text-stone-500 border border-stone-800'
                    }`}
                    title={isVoiceOverEnabled ? 'الشرح الصوتي مفعل' : 'الشرح الصوتي مكتوم'}
                  >
                    {isVoiceOverEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                </div>

                {/* Right controls: Playback Speed & Theater Mode */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-stone-900 rounded-xl p-1 border border-stone-800 text-xs">
                    {[0.5, 1, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                          playbackSpeed === spd 
                            ? 'bg-amber-600 text-white' 
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsTheaterMode(!isTheaterMode)}
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                    title={isTheaterMode ? 'عرض عادي' : 'عرض سينمائي موسع'}
                  >
                    {isTheaterMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Linguistic Commentary Card below Player */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC9] space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>التحليل اللغوي والمعنى التاريخي:</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar">
              {activeEntry.meaningAr} — {activeEntry.phoneticGuide.sampleUsageSentence}
            </p>
            {activeEntry.sharedArabicRootNote && (
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 font-serif-ar">
                🌱 <strong>الجذر المشترك واللسان الحي:</strong> {activeEntry.sharedArabicRootNote}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Practice Lab & Interactive Drawing Canvas (5 cols) */}
        {!isTheaterMode && (
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Scribe Practice Canvas */}
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-800/30 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5" />
                    <span>لوحة التدريب التفاعلية (Practice Pad)</span>
                  </span>
                  <h4 className="font-bold text-base text-stone-900 font-display-eg">
                    حاكي رسم الرمز بيدك الآن!
                  </h4>
                </div>

                <button
                  onClick={clearPracticeCanvas}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="مسح اللوحة"
                >
                  <Eraser className="w-4 h-4" />
                </button>
              </div>

              {/* Drawing Tools (Colors & Ghost outline) */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 font-bold text-[11px]">لون المداد:</span>
                  <button
                    onClick={() => setBrushColor('#1c1917')}
                    className={`w-6 h-6 rounded-full bg-stone-950 border-2 ${brushColor === '#1c1917' ? 'ring-2 ring-amber-400 scale-110' : 'border-stone-300'}`}
                    title="مداد كربوني أسود"
                  />
                  <button
                    onClick={() => setBrushColor('#b91c1c')}
                    className={`w-6 h-6 rounded-full bg-red-700 border-2 ${brushColor === '#b91c1c' ? 'ring-2 ring-amber-400 scale-110' : 'border-stone-300'}`}
                    title="مغرة حمراء ملكية"
                  />
                  <button
                    onClick={() => setBrushColor('#1e40af')}
                    className={`w-6 h-6 rounded-full bg-blue-800 border-2 ${brushColor === '#1e40af' ? 'ring-2 ring-amber-400 scale-110' : 'border-stone-300'}`}
                    title="أزرق لازوردي"
                  />
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 font-medium">
                  <input
                    type="checkbox"
                    checked={showGhostOutline}
                    onChange={(e) => setShowGhostOutline(e.target.checked)}
                    className="rounded accent-amber-800"
                  />
                  <span className="text-[11px]">شفافية إرشادية</span>
                </label>
              </div>

              {/* Interactive Canvas Stage */}
              <div className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-amber-300 bg-[#FAF6EE] overflow-hidden shadow-inner flex items-center justify-center">
                
                {/* Papyrus texture background */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none select-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #A26B1E 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #A26B1E 0px, transparent 1px, transparent 4px)'
                  }}
                />

                {/* Ghost Guide Outline */}
                {showGhostOutline && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="font-hieroglyphs text-9xl text-stone-300/60 scale-125">
                      {activeEntry.glyph}
                    </span>
                  </div>
                )}

                {/* Canvas element */}
                <canvas
                  ref={practiceCanvasRef}
                  width={340}
                  height={340}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair relative z-10 touch-none"
                />

                {/* Hint overlay */}
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-stone-400 pointer-events-none">
                  ارسم بإصبعك أو الماوس متتبعاً خطوات الفيديو
                </div>
              </div>

              {/* Verify Drawing & Score */}
              <div className="space-y-2">
                <button
                  onClick={handleVerifyPractice}
                  className="w-full py-2.5 px-4 bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>تحقق من إتقان رسم الرمز 🌟</span>
                </button>

                {practiceFeedback && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl text-xs font-bold text-center animate-fadeIn">
                    {practiceFeedback}
                  </div>
                )}
              </div>

            </div>

            {/* Quick Scribe Insight Card */}
            <div className="bg-amber-950 text-amber-50 p-5 rounded-2xl border-2 border-amber-700/40 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>كيف كان يتعلم الكاتب المصري الصغير؟</span>
              </span>
              <p className="text-xs text-amber-100/90 leading-relaxed font-serif-ar">
                كان تلاميذ مدرسة الكتبة يتدربون أولاً على شقفات الفخار والحجر الجيري (أوستراكا) لسنوات قبل أن يُسمح لهم بلمس ورق البردي النفيس، وكان المعلم يصحح ميل الحروف بالمداد الأحمر فوق كتابة التلميذ السوداء!
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Video Playlist / Grid Gallery of all entries */}
      <div className="bg-white border border-[#E8DFC9] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
              مكتبة مقاطع الفيديو التعليمية ({filteredEntries.length} مقطع)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-ar">
              انقر على أي بطاقة لتشغيل فيديو رسم الرمز ومخارج نطقه الصوتي فوراً
            </p>
          </div>
        </div>

        {/* Video Thumbnail Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEntries.map((entry) => {
            const isSelected = entry.id === activeEntry.id;
            return (
              <button
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className={`group p-4 rounded-2xl border transition-all text-right flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-amber-950 text-white border-amber-800 ring-2 ring-amber-400 shadow-md scale-[1.02]'
                    : 'bg-[#FAF8F5] hover:bg-amber-50/80 text-stone-800 border-stone-200 hover:border-amber-300'
                }`}
              >
                {/* Thumbnail Preview Area */}
                <div className={`relative h-28 rounded-xl overflow-hidden flex items-center justify-center border ${
                  isSelected ? 'bg-stone-900 border-amber-700/60' : 'bg-[#EFE5CB] border-amber-200'
                }`}>
                  <span className={`font-hieroglyphs text-5xl transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? 'text-amber-300' : 'text-amber-950'
                  }`}>
                    {entry.glyph}
                  </span>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 flex items-center justify-center transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Video duration badge */}
                  <div className="absolute bottom-1.5 left-1.5 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-200">
                    0:{String(entry.videoDurationSec).padStart(2, '0')}
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-1.5 right-1.5 bg-amber-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {entry.categoryAr.split(' ')[0]}
                  </div>
                </div>

                {/* Entry Meta */}
                <div className="space-y-1">
                  <h4 className="font-bold text-sm font-display-eg leading-snug">
                    {entry.wordAr}
                  </h4>
                  <div className={`text-xs font-mono ${isSelected ? 'text-amber-200' : 'text-amber-800'}`}>
                    النطق: <strong>{entry.pronunciationAr}</strong> ({entry.transliteration})
                  </div>
                  <p className={`text-[11px] line-clamp-1 font-serif-ar ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                    {entry.meaningAr}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                  isSelected ? 'border-amber-800/80 text-amber-300' : 'border-stone-200 text-stone-500'
                }`}>
                  <span>{entry.drawingSteps.length} خطوات رسم</span>
                  <span className="font-bold">شاهد الفيديو ➔</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
