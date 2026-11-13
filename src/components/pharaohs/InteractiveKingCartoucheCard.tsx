import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  X, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Layers,
  Feather,
  Flame,
  Award
} from 'lucide-react';
import { PharaohKingEntry, EpigraphicCartoucheStyle } from '../../types';
import { getKingEpigraphicStyle } from '../../data/pharaohsData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

interface InteractiveKingCartoucheCardProps {
  king: PharaohKingEntry;
  onClose?: () => void;
  onNextKing?: () => void;
  onPrevKing?: () => void;
  onOpenCartoucheMaker?: () => void;
}

export const InteractiveKingCartoucheCard: React.FC<InteractiveKingCartoucheCardProps> = ({
  king,
  onClose,
  onNextKing,
  onPrevKing,
  onOpenCartoucheMaker
}) => {
  const [activeCartoucheType, setActiveCartoucheType] = useState<'prenomen' | 'nomen'>('prenomen');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [selectedGlyphIndex, setSelectedGlyphIndex] = useState<number | null>(null);

  const epigraphic: EpigraphicCartoucheStyle = king.epigraphicStyle || getKingEpigraphicStyle(king);

  // Active cartouche data based on toggle
  const activeGlyphs = activeCartoucheType === 'prenomen' 
    ? king.cartouche.prenomenHieroglyphs 
    : (king.cartouche.nomenHieroglyphs || king.cartouche.prenomenHieroglyphs);

  const activeReading = activeCartoucheType === 'prenomen'
    ? king.cartouche.prenomenReadingAr
    : (king.cartouche.nomenReadingAr || king.cartouche.prenomenReadingAr);

  const activeMeaning = activeCartoucheType === 'prenomen'
    ? king.cartouche.prenomenMeaningAr
    : (king.cartouche.nomenMeaningAr || king.cartouche.prenomenMeaningAr);

  const activeTranslit = activeCartoucheType === 'prenomen'
    ? king.cartouche.prenomenTransliteration
    : (king.cartouche.nomenTransliteration || king.cartouche.prenomenTransliteration);

  // Audio speech
  const handlePlayAudio = () => {
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
      return;
    }

    setIsAudioPlaying(true);
    soundFX.playAncientChime(580);

    const speechText = `الخرطوشة الملكية لـ ${king.commonNameAr}، في ${king.dynastyAr}. ${activeCartoucheType === 'prenomen' ? 'اسم العرش والتتويج نيسو-بيتي' : 'اسم الولادة سا-رع'}: ${activeReading}. ومعناه: ${activeMeaning}. الأسلوب الكتابي لعصره: ${epigraphic.eraStyleNameAr}.`;
    
    scribeAudio.speakText(speechText, {
      id: `cartouche-${king.id}-${activeCartoucheType}`,
      onEnd: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false)
    });
  };

  // Copy cartouche
  const handleCopy = () => {
    const text = activeCartoucheType === 'prenomen' 
      ? `𓍹${king.cartouche.prenomenHieroglyphs}𓍺` 
      : `𓍹${king.cartouche.nomenHieroglyphs}𓍺`;
    navigator.clipboard.writeText(text);
    soundFX.playSuccessSound();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Split glyphs for interactive inspection
  const glyphTokens = activeGlyphs.split(/\s+/).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] border-2 border-amber-500 rounded-3xl shadow-2xl overflow-hidden my-auto text-right"
        dir="rtl"
      >
        
        {/* Top Header Bar with King Name and Close Button */}
        <div className="bg-gradient-to-r from-amber-950 via-[#2A180E] to-stone-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-amber-600/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold font-mono">
                {king.dynastyAr} • {king.reignPeriodBce}
              </span>
              <span className="text-xs text-amber-200/70 font-mono hidden sm:inline">
                ({epigraphic.frameType.toUpperCase()})
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-100 font-display-eg">
              {king.commonNameAr}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {onPrevKing && (
              <button
                onClick={onPrevKing}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
                title="الملك السابق"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            {onNextKing && (
              <button
                onClick={onNextKing}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
                title="الملك التالي"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/30 text-white transition-colors mr-2"
                title="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Cartouche Type Selector (Throne Name vs Birth Name) */}
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFX.playClickSound();
                  setActiveCartoucheType('prenomen');
                  setSelectedGlyphIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeCartoucheType === 'prenomen'
                    ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-400'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>اسم التتويج والعرش (نِسُو-بِيتِي 𓇓𓏏)</span>
              </button>

              {king.cartouche.nomenHieroglyphs && (
                <button
                  onClick={() => {
                    soundFX.playClickSound();
                    setActiveCartoucheType('nomen');
                    setSelectedGlyphIndex(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    activeCartoucheType === 'nomen'
                      ? 'bg-amber-900 text-white shadow-xs ring-2 ring-amber-400'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>اسم الولادة والشخصي (سَا-رَع 𓅭𓇳)</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePlayAudio}
                className={`p-2 rounded-xl transition-all ${
                  isAudioPlaying ? 'bg-amber-800 text-white animate-pulse' : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
                }`}
                title="استمع لنطق الخرطوشة وألقاب الملك"
              >
                {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                title="نسخ الخرطوشة الهيروغليفية"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* REALISTIC ERA-SPECIFIC CARTOUCHE VISUALIZER BOX */}
          <div className="relative rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-lg border-2 transition-all duration-300 overflow-hidden">
            
            {/* Visualizer Background Skin based on Epigraphic Style */}
            {epigraphic.frameType === 'serekh' && (
              /* Archaic Grey Slate / Schist Style for King Narmer */
              <div className="absolute inset-0 bg-gradient-to-b from-[#2F353B] via-[#1E2226] to-[#121517] border-stone-600"></div>
            )}

            {epigraphic.frameType === 'old_kingdom_limestone' && (
              /* Fine White Tura Limestone with incised chisel shadows for Old Kingdom */
              <div className="absolute inset-0 bg-[#F5F2EB] bg-gradient-to-b from-[#FAF8F3] via-[#EFECE2] to-[#E3DFCE] border-amber-300"></div>
            )}

            {epigraphic.frameType === 'middle_kingdom_papyrus' && (
              /* Classic Papyrus & Ochre for Middle Kingdom */
              <div className="absolute inset-0 bg-[#F4EBD9] bg-gradient-to-r from-[#ECE2CD] via-[#F8F1E3] to-[#E5D7BF] border-amber-400"></div>
            )}

            {epigraphic.frameType === 'new_kingdom_gold' && (
              /* Brilliant Gold & Lapis Lazuli for New Kingdom */
              <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border-amber-500"></div>
            )}

            {epigraphic.frameType === 'amarna_sunken' && (
              /* Sunken relief with radiant Aten sun rays for Akhenaten */
              <div className="absolute inset-0 bg-gradient-to-b from-[#FEF3C7] via-[#FDE68A] to-[#F59E0B]/20 border-amber-500"></div>
            )}

            {epigraphic.frameType === 'late_period_basalt' && (
              /* Dark Basalt / Black Granite for Late Period & Kushite */
              <div className="absolute inset-0 bg-gradient-to-b from-[#18181B] via-[#27272A] to-[#09090B] border-stone-700"></div>
            )}

            {epigraphic.frameType === 'ptolemaic_floral' && (
              /* High-relief floral sandstone for Cleopatra VII */
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/40 border-amber-400"></div>
            )}

            {/* Content Foreground */}
            <div className="relative z-10 w-full flex flex-col items-center space-y-4">
              
              {/* Era Style Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs bg-amber-500/20 text-amber-900 border border-amber-400/40">
                <Feather className="w-3.5 h-3.5 text-amber-700" />
                <span>{epigraphic.eraStyleNameAr}</span>
              </div>

              {/* SPECIFIC ERA FRAME: SEREKH OR SHENU CARTOUCHE */}
              {epigraphic.frameType === 'serekh' ? (
                /* SEREKH (واجهة القصر الملكي يعلوها الصقر حورس) */
                <div className="relative my-4 flex flex-col items-center">
                  {/* Horus Falcon on top of Serekh */}
                  <div className="text-5xl font-hieroglyphs text-amber-400 drop-shadow-md select-none -mb-2 z-10 animate-pulse">
                    𓅃
                  </div>
                  
                  {/* Serekh Frame Container */}
                  <div className="w-56 sm:w-64 border-4 border-amber-400 bg-black/70 rounded-xl p-4 shadow-2xl relative text-center">
                    <div className="text-[10px] text-amber-300 font-mono tracking-widest uppercase border-b border-amber-500/40 pb-1">
                      SEREKH // واجهة القصر الملكي
                    </div>

                    {/* Glyphs inside Serekh chamber */}
                    <div className="py-4 flex items-center justify-center gap-2">
                      {glyphTokens.map((glyph, idx) => (
                        <span 
                          key={idx}
                          onClick={() => setSelectedGlyphIndex(idx)}
                          className={`text-4xl sm:text-5xl font-hieroglyphs cursor-pointer transition-transform hover:scale-125 select-none ${
                            selectedGlyphIndex === idx ? 'text-amber-300 scale-125 drop-shadow-lg' : 'text-amber-100'
                          }`}
                        >
                          {glyph}
                        </span>
                      ))}
                    </div>

                    {/* Palace Facade Recessed Paneling (Niched Brickwork) */}
                    <div className="border-t-2 border-amber-400 pt-1 flex justify-around">
                      <div className="w-3 h-8 bg-amber-500/30 border border-amber-400/60"></div>
                      <div className="w-3 h-8 bg-amber-500/30 border border-amber-400/60"></div>
                      <div className="w-3 h-8 bg-amber-500/30 border border-amber-400/60"></div>
                      <div className="w-3 h-8 bg-amber-500/30 border border-amber-400/60"></div>
                      <div className="w-3 h-8 bg-amber-500/30 border border-amber-400/60"></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SHENU ROYAL OVAL CARTOUCHE (حبل الشنو البيضاوي ذو العقدة الأفقية) */
                <div className="relative my-3 flex flex-col items-center">
                  
                  {/* Amarna Sun Disk Rays overlay for Akhenaten */}
                  {epigraphic.frameType === 'amarna_sunken' && (
                    <div className="text-4xl text-amber-600 font-hieroglyphs mb-1 animate-pulse">
                      𓇳 𓋹
                    </div>
                  )}

                  {/* Oval Cartouche with Shenu Knotted Border */}
                  <div className={`relative px-8 sm:px-12 py-3 sm:py-4 rounded-full border-4 shadow-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 ${
                    epigraphic.frameType === 'new_kingdom_gold'
                      ? 'border-amber-400 bg-gradient-to-r from-amber-950 via-[#1e1b18] to-amber-950 text-amber-200 ring-4 ring-amber-400/40'
                      : epigraphic.frameType === 'old_kingdom_limestone'
                      ? 'border-amber-800 bg-white/90 text-stone-900 ring-2 ring-stone-300'
                      : epigraphic.frameType === 'late_period_basalt'
                      ? 'border-stone-400 bg-black/90 text-stone-200 ring-2 ring-stone-600'
                      : 'border-amber-700 bg-amber-50 text-amber-950 ring-2 ring-amber-300'
                  }`}>
                    
                    {/* Left Loop of Shenu */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3.5 h-10 border-2 border-inherit rounded-r-full bg-inherit"></div>

                    {/* Glyphs list */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                      {glyphTokens.map((glyph, idx) => (
                        <span 
                          key={idx}
                          onClick={() => setSelectedGlyphIndex(idx)}
                          className={`text-3xl sm:text-5xl font-hieroglyphs cursor-pointer transition-transform hover:scale-125 select-none ${
                            selectedGlyphIndex === idx ? 'text-amber-400 scale-125 drop-shadow-md' : ''
                          }`}
                          title={`انقر لفحص الرمز رقم ${idx + 1}`}
                        >
                          {glyph}
                        </span>
                      ))}
                    </div>

                    {/* Right Knot of Shenu (العقدة الأفقية للخرطوشة) */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3.5 h-12 bg-inherit border-2 border-inherit rounded-l-md flex items-center justify-center">
                      <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                    </div>

                  </div>

                </div>
              )}

              {/* Transliteration & Phonetic Reading */}
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold font-display-eg">
                  {activeReading}
                </div>
                <div className="text-xs sm:text-sm font-mono text-stone-600" dir="ltr">
                  [{activeTranslit}]
                </div>
                <div className="text-xs sm:text-sm font-serif-ar text-amber-900 font-bold max-w-md mx-auto pt-1">
                  المعنى: « {activeMeaning} »
                </div>
              </div>

            </div>

          </div>

          {/* SCRIBAL TECHNIQUE & HISTORICAL INSIGHTS CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Material & Epigraphic Style */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>وسيط الكتابة والأسلوب الأثري:</span>
              </div>
              <div className="text-xs text-stone-700 font-serif-ar leading-relaxed">
                <strong>الوسيط المعتمد:</strong> {epigraphic.writingMediumAr}
              </div>
              <p className="text-xs text-stone-600 font-serif-ar leading-relaxed">
                {epigraphic.scribalTechniqueAr}
              </p>
            </div>

            {/* Box 2: Royal Calligrapher's Note */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-300 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>ملاحظة الخطاط الملكي لعصر الأسرة:</span>
              </div>
              <p className="text-xs text-amber-950 font-serif-ar leading-relaxed">
                {epigraphic.calligraphyNoteAr}
              </p>
            </div>

          </div>

          {/* Action Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <div className="text-xs text-stone-500 font-serif-ar flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              <span>انقر على أي رمز هيروغليفي داخل الخرطوشة لتكبيره وتأمل تفاصيل نقشه.</span>
            </div>

            <div className="flex items-center gap-2">
              {onOpenCartoucheMaker && (
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                    onOpenCartoucheMaker();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>اصنع خرطوشتك بهذا الأسلوب</span>
                </button>
              )}

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
                >
                  إغلاق
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
