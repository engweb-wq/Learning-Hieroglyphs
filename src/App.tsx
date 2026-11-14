/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { AudienceMode, HieroglyphSign } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KidsAlphabetGrid } from './components/kids/KidsAlphabetGrid';
import { KidsDrawingCanvas } from './components/kids/KidsDrawingCanvas';
import { KidsMatchingGame } from './components/kids/KidsMatchingGame';
import { KidsCartoucheMaker } from './components/kids/KidsCartoucheMaker';
import { VisualDictionary } from './components/dictionary/VisualDictionary';
import { GamesHub } from './components/games/GamesHub';
import { AdultsAlphabetTable } from './components/adults/AdultsAlphabetTable';
import { AdultsPapyrusDecoder } from './components/adults/AdultsPapyrusDecoder';
import { GardnerSentenceWriter } from './components/adults/GardnerSentenceWriter';
import { LivingWordsExplorer } from './components/heritage/LivingWordsExplorer';
import { LanguageTimeline } from './components/timeline/LanguageTimeline';
import { EgyptianTimeMachine } from './components/timemachine/EgyptianTimeMachine';
import { PapyrusGallery } from './components/papyri/PapyrusGallery';
import { VideoDictionary } from './components/video/VideoDictionary';
import { StudentProgressDashboard } from './components/progress/StudentProgressDashboard';
import { AIHieroglyphScanner } from './components/scanner/AIHieroglyphScanner';
import { AIEgyptianTutor } from './components/tutor/AIEgyptianTutor';
import { PharaohsChronicle } from './components/pharaohs/PharaohsChronicle';
import { AncientEgyptianArchitecture } from './components/architecture/AncientEgyptianArchitecture';
import { StoneEngravingStudio } from './components/engraving/StoneEngravingStudio';
import { PronunciationChallenge } from './components/pronunciation/PronunciationChallenge';
import { InteractiveScribeQuiz } from './components/quiz/InteractiveScribeQuiz';
import { Footer } from './components/Footer';
import { Sparkles, BookOpen, Languages, PenTool, Zap, Award, History, Scroll, Video, Trophy, Eye, GraduationCap, Crown, Landmark, Hammer, Mic } from 'lucide-react';
import { UNILITERAL_HIEROGLYPHS } from './data/hieroglyphsData';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AudienceMode>('dictionary');
  const [drawingSign, setDrawingSign] = useState<HieroglyphSign>(UNILITERAL_HIEROGLYPHS[7]); // Owl (m)
  const drawingSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSelectForDrawing = (sign: HieroglyphSign) => {
    setDrawingSign(sign);
    if (drawingSectionRef.current) {
      drawingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCartouche = () => {
    const el = document.getElementById('cartouche');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      
      {/* Top Bar (adheres to Top Bar Contract) */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        onOpenCartouche={handleOpenCartouche}
      />

      {/* Hero Section */}
      <HeroSection
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        onStartCartouche={handleOpenCartouche}
      />

      {/* Mode Navigation Bar */}
      <div className="sticky top-18 z-30 bg-[#F5EEDB]/90 backdrop-blur-md border-b border-[#E8DFC9] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="text-xs font-bold text-stone-600 hidden sm:block whitespace-nowrap">
            القسم المفتوح الآن:
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMode('progress')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'progress'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>لوحة تقدم الكاتب 🏆</span>
            </button>

            <button
              onClick={() => setCurrentMode('dictionary')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                currentMode === 'dictionary'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>القاموس المصور (50 كلمة)</span>
            </button>

            <button
              onClick={() => setCurrentMode('shared_roots')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                currentMode === 'shared_roots'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>قاموس الجذور العربية</span>
            </button>

            <button
              onClick={() => setCurrentMode('games')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                currentMode === 'games'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>ألعاب الكاتب التفاعلية</span>
            </button>

            <button
              onClick={() => setCurrentMode('pronunciation')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                currentMode === 'pronunciation'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>تحدي النطق</span>
            </button>

            <button
              onClick={() => setCurrentMode('heritage')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'heritage'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>الكلمات الحية المشتركة</span>
            </button>

            <button
              onClick={() => setCurrentMode('timeline')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'timeline'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>خريطة زمنية للغة</span>
            </button>

            <button
              onClick={() => setCurrentMode('timemachine')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'timemachine'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>آلة الزمن (عصور الكتابة) ⏳</span>
            </button>

            <button
              onClick={() => setCurrentMode('video_dict')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'video_dict'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>قاموس الفيديو التفاعلي</span>
            </button>

            <button
              onClick={() => setCurrentMode('scanner')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'scanner'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>ماسح النقوش 👁️</span>
            </button>

            <button
              onClick={() => setCurrentMode('tutor')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'tutor'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>المعلم عمر سليم 🎓</span>
            </button>

            <button
              onClick={() => setCurrentMode('papyri')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'papyri'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Scroll className="w-4 h-4 text-amber-400" />
              <span>معرض البرديات الشهيرة</span>
            </button>

            <button
              onClick={() => setCurrentMode('kids')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'kids'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>عالم الصغار</span>
            </button>

            <button
              onClick={() => setCurrentMode('adults')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'adults'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>أكاديمية الكبار</span>
            </button>

            <button
              onClick={() => setCurrentMode('pharaohs')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'pharaohs'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>ملوك مصر قبل الميلاد 👑</span>
            </button>

            <button
              onClick={() => setCurrentMode('architecture')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'architecture'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>العمارة المصرية 🏛️</span>
            </button>

            <button
              onClick={() => setCurrentMode('stone_engraving')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentMode === 'stone_engraving'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200'
              }`}
            >
              <Hammer className="w-4 h-4 text-amber-400" />
              <span>لوح النقش الحجري</span>
            </button>
          </div>

          <a
            href="#cartouche"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 whitespace-nowrap"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>صانع الخرطوشة</span>
          </a>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 w-full">
        
        {/* VISUAL DICTIONARY & SHARED ROOTS */}
        {(currentMode === 'dictionary' || currentMode === 'shared_roots') && (
          <div className="space-y-14 animate-fadeIn">
            <VisualDictionary initialSubTab={currentMode === 'shared_roots' ? 'shared_roots' : 'words'} />
          </div>
        )}

        {/* 3 INTERACTIVE GAMES SUITE */}
        {currentMode === 'games' && (
          <div className="space-y-14 animate-fadeIn">
            <GamesHub />
          </div>
        )}

        {/* KIDS MODE CONTAINER */}
        {currentMode === 'kids' && (
          <div className="space-y-14 animate-fadeIn">
            
            {/* Friendly Kids Mascot Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-100 via-[#FAF4E6] to-amber-50 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="md:col-span-8 p-6 sm:p-10 space-y-3 text-right">
                  <span className="text-xs font-bold text-amber-800 tracking-wider">
                    مرحباً بكم في مدرسة الفراعنة الصغار! 🌟
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
                    تعلم الكتابة مثل الملك الصغير توت عنخ آمون!
                  </h2>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar max-w-xl">
                    المصريون القدماء كانوا يرسمون أصوات الحروف على شكل طيور جميلة، أسود شجاعة، وأمواج ماء النيل الرقراقة. انقر على الحروف لتسمع صوتها وارسمها بنفسك!
                  </p>
                </div>
                <div className="md:col-span-4 h-48 md:h-full min-h-[220px] relative">
                  <img
                    src="/src/assets/images/kids_egyptian_scribe_1794200392208.jpg"
                    alt="كاتب مصري صغير يتعلم الهيروغليفية بالبردي والألوان"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Kids Alphabet Cards */}
            <KidsAlphabetGrid onSelectForDrawing={handleSelectForDrawing} />

            {/* Drawing & Tracing Stage */}
            <div ref={drawingSectionRef}>
              <KidsDrawingCanvas
                currentSign={drawingSign}
                onSignChange={setDrawingSign}
              />
            </div>

            {/* Memory & Matching Game */}
            <KidsMatchingGame />

            {/* Kids Cartouche Maker */}
            <KidsCartoucheMaker />

          </div>
        )}

        {/* ADULTS & RESEARCHERS MODE CONTAINER */}
        {currentMode === 'adults' && (
          <div className="space-y-14 animate-fadeIn">
            
            {/* Academic Introduction */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] space-y-3 text-right shadow-xs">
              <span className="text-xs font-bold text-amber-800">
                علم المصريات واللسانيات القديمة (Egyptology)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display-eg">
                نظام الكتابة الهيروغليفية الكلاسيكي (Middle Egyptian)
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar">
                تعتبر لغة الدولة الوسطى النموذج المعياري للغة المصرية الكلاسيكية. يعتمد النظام على مزيج عبقري بين الرموز الصوتية الصامتة (Phonograms) والمحددات التصنيفية (Determinatives) والرموز الفكرية (Ideograms). تصفح الجداول أدناه للتعرف على كود جاردنر الدقيق وقواعد قراءة البرديات.
              </p>
            </div>

            {/* Comprehensive Table */}
            <AdultsAlphabetTable />

            {/* Gardner Sentence Writing Lab & Direction Verification */}
            <GardnerSentenceWriter />

            {/* Directional Reading & Inscription Decoder */}
            <AdultsPapyrusDecoder />

            {/* Royal Cartouche Studio */}
            <KidsCartoucheMaker />

          </div>
        )}

        {/* LIVING WORDS HERITAGE SECTION */}
        {currentMode === 'heritage' && (
          <div className="space-y-14 animate-fadeIn">
            <LivingWordsExplorer />
          </div>
        )}

        {/* LANGUAGE TIMELINE & SCRIPT EVOLUTION SECTION */}
        {currentMode === 'timeline' && (
          <div className="space-y-14 animate-fadeIn">
            <LanguageTimeline onOpenTimeMachine={() => setCurrentMode('timemachine')} />
          </div>
        )}

        {/* EGYPTIAN TIME MACHINE SECTION */}
        {currentMode === 'timemachine' && (
          <div className="space-y-14 animate-fadeIn">
            <EgyptianTimeMachine />
          </div>
        )}

        {/* FAMOUS PAPYRUS GALLERY & LIVE TRANSLATION SECTION */}
        {currentMode === 'papyri' && (
          <div className="space-y-14 animate-fadeIn">
            <PapyrusGallery />
          </div>
        )}

        {/* INTERACTIVE VIDEO DICTIONARY SECTION */}
        {currentMode === 'video_dict' && (
          <div className="space-y-14 animate-fadeIn">
            <VideoDictionary />
          </div>
        )}

        {/* AI HIEROGLYPH SCANNER SECTION */}
        {currentMode === 'scanner' && (
          <div className="space-y-14 animate-fadeIn">
            <AIHieroglyphScanner />
          </div>
        )}

        {/* AI ANCIENT EGYPTIAN TUTOR "OMAR SELIM" */}
        {currentMode === 'tutor' && (
          <div className="space-y-14 animate-fadeIn">
            <AIEgyptianTutor />
          </div>
        )}

        {/* STUDENT PROGRESS DASHBOARD */}
        {currentMode === 'progress' && (
          <div className="space-y-14 animate-fadeIn">
            <StudentProgressDashboard
              onSelectMode={setCurrentMode}
              onOpenCartouche={handleOpenCartouche}
            />
          </div>
        )}

        {/* ANCIENT EGYPTIAN KINGS & PHARAOHS BCE */}
        {currentMode === 'pharaohs' && (
          <div className="space-y-14 animate-fadeIn">
            <PharaohsChronicle onOpenCartoucheMaker={handleOpenCartouche} />
          </div>
        )}

        {/* ANCIENT EGYPTIAN ARCHITECTURE (PYRAMIDS, MORTUARY & CULT TEMPLES) */}
        {currentMode === 'architecture' && (
          <div className="space-y-14 animate-fadeIn">
            <AncientEgyptianArchitecture />
          </div>
        )}

        {/* VIRTUAL STONE ENGRAVING STUDIO */}
        {currentMode === 'stone_engraving' && (
          <div className="space-y-14 animate-fadeIn">
            <StoneEngravingStudio />
          </div>
        )}

        {/* INTERACTIVE MICROPHONE PRONUNCIATION CHALLENGE */}
        {currentMode === 'pronunciation' && (
          <div className="space-y-14 animate-fadeIn">
            <PronunciationChallenge />
          </div>
        )}

        {/* INTERACTIVE SCRIBE QUIZ (Always accessible anchor) */}
        <InteractiveScribeQuiz currentMode={currentMode} />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
