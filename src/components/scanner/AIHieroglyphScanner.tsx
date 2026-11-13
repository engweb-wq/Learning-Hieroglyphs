import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Layers,
  Info,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { ScannerAnalysisResult, DetectedGlyph, ScanReadingDirection, GlyphEpistemicStatus } from '../../types';
import { SCANNER_SAMPLE_INSCRIPTIONS, ScannerSampleInscription } from '../../data/scannerSamples';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';
import confetti from 'canvas-confetti';

export const AIHieroglyphScanner: React.FC = () => {
  // Input mode: upload file, live camera, or curated sample
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'samples'>('samples');
  const [imagePreview, setImagePreview] = useState<string | null>(SCANNER_SAMPLE_INSCRIPTIONS[0].thumbnailUrl);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [userNotes, setUserNotes] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<ScannerSampleInscription | null>(SCANNER_SAMPLE_INSCRIPTIONS[0]);

  // Analysis status
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ScannerAnalysisResult | null>(SCANNER_SAMPLE_INSCRIPTIONS[0].presetAnalysis);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'tentative_or_eroded'>('all');

  // Audio & UI
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [hasAwardedPoints, setHasAwardedPoints] = useState<boolean>(false);

  // Camera handling
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Subscribe to speech synthesis state
  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => {
      setActivePlayingId(id);
    });
    return () => {
      unsubscribe();
      stopCamera();
      scribeAudio.stop();
    };
  }, []);

  // Stop camera stream safely
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start live camera
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      soundFX.playClickSound();
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      setCameraError('تعذر فتح الكاميرا. يرجى التأكد من منح الإذن للمتصفح أو استخدام خيار رفع صورة من جهازك.');
      setIsCameraActive(false);
    }
  };

  // Capture frame from video to canvas and export base64
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreview(dataUrl);
    setImageBase64(dataUrl);
    setMimeType('image/jpeg');
    setSelectedSample(null);
    stopCamera();
    soundFX.playSuccessSound();
  };

  // Handle image file selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAnalysisError('يرجى اختيار ملف صورة صالح (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setImagePreview(res);
      setImageBase64(res);
      setMimeType(file.type || 'image/jpeg');
      setSelectedSample(null);
      setAnalysisError(null);
      soundFX.playClickSound();
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setImagePreview(res);
      setImageBase64(res);
      setMimeType(file.type || 'image/jpeg');
      setSelectedSample(null);
      setAnalysisError(null);
      soundFX.playClickSound();
    };
    reader.readAsDataURL(file);
  };

  // Select a curated archaeological sample
  const handleSelectSample = (sample: ScannerSampleInscription) => {
    setSelectedSample(sample);
    setImagePreview(sample.thumbnailUrl);
    setImageBase64(null);
    setAnalysisResult(sample.presetAnalysis);
    setAnalysisError(null);
    soundFX.playAncientChime(520);
  };

  // Trigger Gemini multimodal computer vision analysis
  const handleRunAnalysis = async () => {
    if (!imagePreview && !imageBase64) {
      setAnalysisError('يرجى اختيار صورة نقش هيروغليفي أولاً.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    soundFX.playAncientChime(440);

    try {
      // If user selected a preset and hasn't changed it, use its accurate scholarly analysis
      if (selectedSample && !imageBase64) {
        // Simulate real analysis pause for pedagogical realism
        await new Promise((resolve) => setTimeout(resolve, 800));
        setAnalysisResult(selectedSample.presetAnalysis);
        celebrateSuccess();
        setIsAnalyzing(false);
        return;
      }

      // Call server-side endpoint with base64 image payload
      const response = await fetch('/api/scanner/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imageBase64 || imagePreview,
          mimeType,
          userNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'تعذر تحليل النقش عبر خادم الرؤية الحاسوبية.');
      }

      const result: ScannerAnalysisResult = data.data;
      setAnalysisResult(result);
      celebrateSuccess();
    } catch (err: unknown) {
      console.error('Scan analysis error:', err);
      const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء معالجة الصورة.';
      setAnalysisError(msg);

      // Graceful fallback: If it's a sample or user image, offer sample baseline
      if (selectedSample) {
        setAnalysisResult(selectedSample.presetAnalysis);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const celebrateSuccess = () => {
    soundFX.playSuccessSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#9333ea', '#2563eb', '#16a34a'],
    });

    if (!hasAwardedPoints) {
      studentProgress.addPoints(45, 'فحص وقراءة نقش أثري عبر ماسح الذكاء الاصطناعي', 'البحث الأثري');
      setHasAwardedPoints(true);
    }
  };

  // Audio pronunciation for individual glyph
  const handlePlayGlyphSound = (glyph: DetectedGlyph) => {
    if (activePlayingId === glyph.id) {
      scribeAudio.stop();
      return;
    }
    soundFX.playAncientChime(580);
    const textToSpeak = `الرمز الهيروغليفي: ${glyph.arabicSound}.. كود جاردنر: ${glyph.gardiner}.. النقحرة: ${glyph.transliteration}.. المعنى: ${glyph.meaningAr}`;
    scribeAudio.speakText(textToSpeak, { id: glyph.id });
  };

  // Full inscription audio playback
  const handlePlayFullSentence = () => {
    if (!analysisResult) return;
    const phraseId = 'full_sentence_audio';
    if (activePlayingId === phraseId) {
      scribeAudio.stop();
      return;
    }
    soundFX.playAncientChime(640);
    const sentenceText = `النطق الصوتي للنقش: ${analysisResult.phoneticTranscriptionAr}.. الترجمة العربية: ${analysisResult.literalTranslationAr}`;
    scribeAudio.speakText(sentenceText, { id: phraseId });
  };

  // Copy full transcription to clipboard
  const handleCopyTranscription = () => {
    if (!analysisResult) return;
    const text = `الرموز: ${analysisResult.glyphs.map((g) => g.char).join('')}
النقحرة الصوتية: ${analysisResult.transliterationLine}
النطق بالعربية: ${analysisResult.phoneticTranscriptionAr}
الترجمة: ${analysisResult.literalTranslationAr}
اتجاه القراءة: ${analysisResult.readingDirection === 'rtl' ? 'من اليمين إلى اليسار' : 'من اليسار إلى اليمين'}
المصدر: مدرسة الكاتب المصري (AI Hieroglyph Scanner)`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    soundFX.playClickSound();
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Filter glyphs based on epistemic status
  const displayedGlyphs = analysisResult?.glyphs.filter((glyph) => {
    if (filterStatus === 'confirmed') return glyph.epistemicStatus === 'confirmed';
    if (filterStatus === 'tentative_or_eroded') return glyph.epistemicStatus !== 'confirmed';
    return true;
  }) || [];

  return (
    <div className="space-y-10 animate-fadeIn" dir="rtl">
      {/* Hero & Introduction */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 space-y-4 max-w-4xl text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>ماسح الرؤية الحاسوبية والذكاء الاصطناعي الأثري (Multimodal Vision)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display-eg text-amber-100 tracking-tight">
            ماسح النقوش الهيروغليفية الذكي (AI Hieroglyph Scanner)
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-serif-ar max-w-3xl">
            التقط أو ارفع صورة لنقش فرعوني أو جدارية أو خرطوشة ملكية؛ يقوم نموذج الرؤية الحاسوبية بالتعرف على العلامات وتحديد أكواد قائمة جاردنر الدقيقة، واستنتاج اتجاه القراءة حسب وجوه الكائنات الحية، مع الالتزام الصارم بالأمانة الأكاديمية وعدم اختلاق أي نصوص للأجزاء التالفة.
          </p>

          {/* Academic Integrity Manifesto Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">ضمان الأمانة العلمية: تمييز صارم بين الرموز المؤكدة والقراءات المحتملة</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>لا اختلاق أو تخمين للنقوش المتآكلة والمفقودة [...]</span>
            </div>
          </div>
        </div>

        {/* Ambient Egyptian Hieroglyphs Background Watermark */}
        <div className="absolute left-6 bottom-4 opacity-10 text-8xl font-hieroglyphs pointer-events-none select-none text-amber-300 hidden md:block">
          𓇳 𓊵 𓅓 𓋹 𓎟 𓆣
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Input & Capture Station (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8DFC9] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8DFC9] pb-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-800" />
                <span>مصدر النقش الأثري</span>
              </h3>
              <span className="text-xs text-stone-500">اختر الوسيلة المناسبة لك</span>
            </div>

            {/* Input Method Selector Segmented Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#F5EEDB] p-1.5 rounded-2xl">
              <button
                onClick={() => {
                  setActiveTab('samples');
                  stopCamera();
                  soundFX.playClickSound();
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'samples'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>عينات أثرية</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('upload');
                  stopCamera();
                  soundFX.playClickSound();
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>رفع صورة</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('camera');
                  startCamera();
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'camera'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>الكاميرا الحية</span>
              </button>
            </div>

            {/* Tab 1: Curated Samples Selection */}
            {activeTab === 'samples' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-stone-600">
                  اختر نقشاً أثرياً معتمداً للتجربة والتحليل الفوري:
                </div>
                <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {SCANNER_SAMPLE_INSCRIPTIONS.map((sample) => {
                    const isSelected = selectedSample?.id === sample.id;
                    return (
                      <div
                        key={sample.id}
                        onClick={() => handleSelectSample(sample)}
                        className={`p-3 rounded-2xl border text-right cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/20'
                            : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{sample.titleAr}</span>
                            {sample.id === 'sample_eroded_fragment' && (
                              <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-bold">
                                اختبار التآكل
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">{sample.eraAr}</div>
                        </div>

                        <div className="shrink-0 text-xl font-hieroglyphs px-2 py-1 rounded bg-amber-100 text-amber-950 border border-amber-300">
                          {sample.svgBadge}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Upload Image File */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-2"
                >
                  <Upload className="w-8 h-8 text-amber-700 mx-auto" />
                  <div className="text-xs sm:text-sm font-bold text-stone-800">
                    اسحب وأفلت صورة النقش هنا أو انقر للاختيار
                  </div>
                  <div className="text-[11px] text-stone-500">
                    ندعم صيغ JPEG, PNG, WebP (حتى 20 ميجابايت)
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Live Camera Viewfinder */}
            {activeTab === 'camera' && (
              <div className="space-y-3">
                {cameraError ? (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
                    <p className="font-semibold">{cameraError}</p>
                    <button
                      onClick={startCamera}
                      className="text-xs font-bold text-amber-900 underline"
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-amber-700">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Camera Overlay Target Frame */}
                    <div className="absolute inset-6 border border-amber-400/70 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                      <div className="flex justify-between text-[10px] text-amber-300 font-mono">
                        <span>[وجه النقش]</span>
                        <span>AI ACTIVE</span>
                      </div>
                      <div className="text-center text-[11px] text-amber-200 bg-black/60 py-1 px-2 rounded mx-auto backdrop-blur-xs">
                        ضع الرموز الهيروغليفية داخل هذا الإطار
                      </div>
                      <div className="flex justify-between text-[10px] text-amber-300 font-mono">
                        <span>4K OCR</span>
                        <span>GARDINER LIST</span>
                      </div>
                    </div>

                    {/* Capture Shutter Button */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                      <button
                        onClick={capturePhoto}
                        className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs transition-transform transform active:scale-95"
                      >
                        <Camera className="w-4 h-4" />
                        <span>التقاط صورة النقش</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Preview Window */}
            {imagePreview && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span>معاينة النقش المُراد مسحه:</span>
                  {selectedSample && (
                    <span className="text-[11px] text-amber-800 font-bold">
                      {selectedSample.titleAr}
                    </span>
                  )}
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-[#E8DFC9] bg-stone-900 max-h-56">
                  <img
                    src={imagePreview}
                    alt="صورة النقش الهيروغليفي للتحليل"
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-amber-300 text-[10px] px-2.5 py-1 rounded-md border border-amber-500/30">
                    جاهز للمسح البصري
                  </div>
                </div>
              </div>
            )}

            {/* User Notes Input (Optional context) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                ملاحظات أثرية إضافية (اختياري):
              </label>
              <input
                type="text"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="مثال: لوحة من الحجر الجيري أو نقش مقبرة طيبة..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing || (!imagePreview && !imageBase64)}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  isAnalyzing
                    ? 'bg-amber-950/70 cursor-wait'
                    : 'bg-amber-900 hover:bg-amber-800 active:scale-[0.99]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>جارٍ تحليل النقش واستخراج أكواد جاردنر...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>تحليل النقش واكتشاف الرموز 🚀</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {analysisError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">تنبيه المسح:</p>
                  <p>{analysisError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Egyptological Analysis Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              
              {/* Top Banner: Reading Direction & Confidence Gauge */}
              <div className="bg-white rounded-3xl border border-[#E8DFC9] p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFC9] pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-800 tracking-wider">
                      نتائج الفحص والتحليل البصري
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display-eg">
                      {analysisResult.isHieroglyphicFound ? 'تم التعرف على نقوش مصرية قديمة بنجاح' : 'لم يتم تأكيد وجود هيروغليفية مقروءة'}
                    </h3>
                  </div>

                  {/* Confidence Badge */}
                  <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
                    <span className="text-xs text-stone-600 font-medium">معدل الثقة الإجمالي:</span>
                    <span className="font-mono font-extrabold text-amber-950 text-base">
                      {analysisResult.overallConfidence}%
                    </span>
                  </div>
                </div>

                {/* Reading Direction Detailed Indicator */}
                <div className="p-4 rounded-2xl bg-[#F5EEDB]/70 border border-[#E8DFC9] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                      <Compass className="w-4 h-4 text-amber-800" />
                      <span>اتجاه القراءة المعتمد (Reading Direction):</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900 text-white text-xs font-bold">
                      {analysisResult.readingDirection === 'rtl' && (
                        <>
                          <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                          <span>من اليمين إلى اليسار (RTL)</span>
                        </>
                      )}
                      {analysisResult.readingDirection === 'ltr' && (
                        <>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                          <span>من اليسار إلى اليمين (LTR)</span>
                        </>
                      )}
                      {(analysisResult.readingDirection === 'column_rtl' || analysisResult.readingDirection === 'column_ltr') && (
                        <>
                          <ArrowDown className="w-3.5 h-3.5 text-amber-300" />
                          <span>أعمدة رأسية</span>
                        </>
                      )}
                      {analysisResult.readingDirection === 'uncertain' && (
                        <span>غير محدد / علامات منفردة</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-serif-ar">
                    {analysisResult.readingDirectionExplanationAr}
                  </p>
                </div>

                {/* Academic Integrity & Erosion Assessment Alert */}
                {analysisResult.isPartiallyEroded ? (
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>تقييم الأمانة العلمية: يوجد تآكل أو أجزاء مفقودة بالنقش</span>
                    </div>
                    <p className="leading-relaxed font-serif-ar">
                      {analysisResult.academicIntegrityNoteAr}
                    </p>
                    {analysisResult.damageAnalysisAr && (
                      <p className="text-[11px] text-stone-600 bg-white/70 p-2 rounded-lg border border-amber-200">
                        <strong>تقرير التلف:</strong> {analysisResult.damageAnalysisAr}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>سلامة السطح:</strong> جميع العلامات مطابقة لقائمة جاردنر المعيارية وحالة النقش واضحة دون فقد نصوص.
                    </span>
                  </div>
                )}

                {/* Full Phrase Transcription & Meaning Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-amber-950 text-white space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <span className="text-xs font-semibold text-amber-300">
                      القراءة الشاملة للنقش (Transcription & Translation)
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePlayFullSentence}
                        className="flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                        title="استمع للنطق الصوتي الكامل للنقش"
                      >
                        {activePlayingId === 'full_sentence_audio' ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>إيقاف</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>استمع للنقش 🔊</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopyTranscription}
                        className="flex items-center gap-1 text-xs font-bold text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition-colors"
                        title="نسخ التفريغ والترجمة"
                      >
                        {copiedText ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hieroglyphic Unicode Display */}
                  <div className="text-3xl sm:text-4xl text-amber-200 font-hieroglyphs tracking-widest text-center py-2 overflow-x-auto">
                    {analysisResult.glyphs.map((g) => g.char).join(' ')}
                  </div>

                  {/* Scientific Transliteration & Phonetics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/30 p-3 rounded-xl border border-stone-800">
                    <div>
                      <span className="text-stone-400 block text-[11px]">النقحرة الصوتية اللاتينية:</span>
                      <span className="font-serif italic text-amber-300 text-sm font-semibold">
                        {analysisResult.transliterationLine}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[11px]">النطق الصوتي التقريبي بالعربية:</span>
                      <span className="font-bold text-white text-sm">
                        {analysisResult.phoneticTranscriptionAr}
                      </span>
                    </div>
                  </div>

                  {/* Literal Arabic Translation */}
                  <div className="space-y-1">
                    <span className="text-xs text-stone-400 font-medium">الترجمة العربية الدقيقة:</span>
                    <p className="text-base sm:text-lg font-bold text-amber-100 font-serif-ar leading-relaxed">
                      «{analysisResult.literalTranslationAr}»
                    </p>
                  </div>

                  {/* Archaeological Context */}
                  <div className="text-xs text-stone-300 border-t border-stone-800 pt-3 font-serif-ar leading-relaxed">
                    <strong className="text-amber-400">السياق الأثري والتاريخي:</strong> {analysisResult.historicalContextAr}
                  </div>
                </div>
              </div>

              {/* Detected Glyphs Breakdown Station */}
              <div className="bg-white rounded-3xl border border-[#E8DFC9] p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFC9] pb-3">
                  <div>
                    <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-800" />
                      <span>الرموز المكتشفة وأكواد جاردنر ({analysisResult.glyphs.length} رموز)</span>
                    </h4>
                    <span className="text-xs text-stone-500">
                      مرتبة حسب تسلسل القراءة من البداية إلى النهاية
                    </span>
                  </div>

                  {/* Epistemic Status Filter Pill Controls */}
                  <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                        filterStatus === 'all'
                          ? 'bg-amber-800 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      الكل ({analysisResult.glyphs.length})
                    </button>
                    <button
                      onClick={() => setFilterStatus('confirmed')}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                        filterStatus === 'confirmed'
                          ? 'bg-amber-800 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      مؤكدة فقط ({analysisResult.glyphs.filter((g) => g.epistemicStatus === 'confirmed').length})
                    </button>
                    <button
                      onClick={() => setFilterStatus('tentative_or_eroded')}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                        filterStatus === 'tentative_or_eroded'
                          ? 'bg-amber-800 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      محتملة / تالفة ({analysisResult.glyphs.filter((g) => g.epistemicStatus !== 'confirmed').length})
                    </button>
                  </div>
                </div>

                {/* Glyphs Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {displayedGlyphs.map((glyph, index) => {
                    const isPlaying = activePlayingId === glyph.id;

                    // Epistemic badge colors
                    const statusConfig = {
                      confirmed: {
                        label: 'مؤكد',
                        bg: 'bg-emerald-50',
                        text: 'text-emerald-700',
                        border: 'border-emerald-200',
                      },
                      tentative: {
                        label: 'قراءة محتملة',
                        bg: 'bg-amber-50',
                        text: 'text-amber-800',
                        border: 'border-amber-300',
                      },
                      eroded: {
                        label: 'تالف / غير مؤكد',
                        bg: 'bg-rose-50',
                        text: 'text-rose-700',
                        border: 'border-rose-200',
                      },
                    }[glyph.epistemicStatus];

                    return (
                      <div
                        key={glyph.id || index}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          glyph.epistemicStatus === 'tentative'
                            ? 'bg-amber-50/40 border-amber-200/90'
                            : 'bg-[#FAF7F0] border-[#E8DFC9] hover:border-amber-400'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Large Glyph Display */}
                          <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8DFC9] flex items-center justify-center text-3xl font-hieroglyphs text-amber-950 shadow-2xs shrink-0">
                            {glyph.char}
                          </div>

                          <div className="flex-1 space-y-1 text-right">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300">
                                {glyph.gardiner}
                              </span>

                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                              >
                                {statusConfig.label} ({glyph.confidence}%)
                              </span>
                            </div>

                            <div className="text-xs font-extrabold text-stone-900">
                              {glyph.arabicSound}
                              <span className="font-serif italic font-normal text-stone-500 mr-1.5">
                                ({glyph.transliteration})
                              </span>
                            </div>

                            <div className="text-[11px] text-stone-600 line-clamp-1">
                              {glyph.meaningAr}
                            </div>
                          </div>
                        </div>

                        {/* Additional Epigraphic Details */}
                        <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500">
                          <span className="bg-stone-200/60 px-2 py-0.5 rounded text-[10px] font-medium text-stone-700">
                            {glyph.glyphType === 'uniliteral' && 'أحادي صوتي'}
                            {glyph.glyphType === 'biliteral' && 'ثنائي صوتي'}
                            {glyph.glyphType === 'triliteral' && 'ثلاثي صوتي'}
                            {glyph.glyphType === 'determinative' && 'مخصص تصنيفي'}
                            {glyph.glyphType === 'ideogram' && 'رمز فكري (أيديوجرام)'}
                            {glyph.glyphType === 'uncertain' && 'غير محسوم'}
                          </span>

                          <button
                            onClick={() => handlePlayGlyphSound(glyph)}
                            className="flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors"
                          >
                            {isPlaying ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                                <span>إيقاف</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                                <span>نطق الرمز</span>
                              </>
                            )}
                          </button>
                        </div>

                        {glyph.notesAr && (
                          <div className="text-[10px] text-amber-900 bg-amber-100/60 p-2 rounded-lg font-serif-ar">
                            <strong>ملاحظة أثرية:</strong> {glyph.notesAr}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-[#E8DFC9] p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-3xl mx-auto font-hieroglyphs">
                𓁹
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-display-eg">
                جاهز لمسح نقوشك الأثرية
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-serif-ar">
                قم باختيار عينة أثرية من القائمة الجانبية أو التقط نقشاً بكاميرتك وانقر على «تحليل النقش واكتشاف الرموز» لبدء المعالجة البصرية بالذكاء الاصطناعي.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
