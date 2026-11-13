import React, { useState } from 'react';
import { 
  Scroll, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Scale, 
  ShieldCheck, 
  Heart, 
  Sun, 
  Flame, 
  BookOpen, 
  Feather, 
  ChevronRight, 
  ChevronLeft,
  Compass,
  Award,
  Layers,
  Info
} from 'lucide-react';
import { 
  BOOK_OF_THE_DEAD_OVERVIEW, 
  BOOK_OF_THE_DEAD_SPELLS, 
  BookOfTheDeadSpell 
} from '../../data/bookOfTheDeadData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';

export const BookOfTheDeadSection: React.FC = () => {
  const [selectedSpellId, setSelectedSpellId] = useState<string>(BOOK_OF_THE_DEAD_SPELLS[0].id);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  const activeSpell: BookOfTheDeadSpell = 
    BOOK_OF_THE_DEAD_SPELLS.find(s => s.id === selectedSpellId) || BOOK_OF_THE_DEAD_SPELLS[0];

  const handleSelectSpell = (spell: BookOfTheDeadSpell) => {
    soundFX.playClickSound();
    setSelectedSpellId(spell.id);
    setActiveSegmentIndex(null);
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
    }
  };

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      scribeAudio.stop();
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      soundFX.playAncientChime(520);
      scribeAudio.speakText(activeSpell.audioScript, {
        id: `botd-${activeSpell.id}`,
        onEnd: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false)
      });
    }
  };

  const handlePronounceSegment = (seg: { glyphs: string; transliteration: string; meaningAr: string }) => {
    soundFX.playClickSound();
    scribeAudio.speakText(`${seg.meaningAr}. النطق المقابل هو ${seg.transliteration}`, {
      id: `botd-seg-${seg.transliteration}`
    });
  };

  return (
    <div className="space-y-8 text-right select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#221208] via-[#331C0E] to-[#170C05] text-amber-50 border-2 border-amber-600/50 shadow-xl space-y-4 relative overflow-hidden">
        
        {/* Background Hieroglyphs Watermark */}
        <div className="absolute left-6 top-3 text-9xl font-hieroglyphs text-amber-500/10 pointer-events-none select-none">
          𓂋 𓏤 𓉐 𓂋 𓏏
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>نصوص الأبدية والخلود (Chapters of Coming Forth by Day)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 font-display-eg">
              كتاب الموتى: رُو نُو بِرِت إم هِرو ⚖️
            </h2>

            <div className="text-xs font-mono text-amber-300/90 font-bold">
              {BOOK_OF_THE_DEAD_OVERVIEW.originalNameHieroglyphs} — {BOOK_OF_THE_DEAD_OVERVIEW.originalNameTransliteration}
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-serif-ar leading-relaxed">
              {BOOK_OF_THE_DEAD_OVERVIEW.natureAndPurposeAr}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleAudio}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all self-start md:self-center ${
              isAudioPlaying 
                ? 'bg-amber-600 text-white ring-4 ring-amber-400 animate-pulse' 
                : 'bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50'
            }`}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4 text-amber-200" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span>{isAudioPlaying ? 'إيقاف التلاوة' : 'استمع لتلاوة التعويذة'}</span>
          </button>
        </div>

        {/* Spells Selector Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-amber-500/30">
          {BOOK_OF_THE_DEAD_SPELLS.map(spell => {
            const isActive = spell.id === selectedSpellId;

            return (
              <button
                key={spell.id}
                type="button"
                onClick={() => handleSelectSpell(spell)}
                className={`p-3 rounded-2xl text-right transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-600 to-amber-800 border-amber-300 text-white shadow-lg scale-102 ring-2 ring-amber-400/50'
                    : 'bg-black/40 hover:bg-black/60 border-amber-900/60 text-amber-200/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                  <span>فصل #{spell.chapterNumber}</span>
                  <span>{spell.chapterNumber === 125 ? '⚖️' : spell.chapterNumber === 30 ? '𓆣' : spell.chapterNumber === 17 ? '🌅' : '🌾'}</span>
                </div>
                <div className="text-xs font-bold font-serif-ar truncate">
                  {spell.titleAr.split(':')[1] || spell.titleAr}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Spell Inscription & Underworld Role Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Spell Papyrus Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Ancient Papyrus Scroll Canvas */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF4E6] border-2 border-[#D8C7A3] shadow-md space-y-6 relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-[#E0D0B0] pb-3 text-xs text-amber-950 font-bold">
              <span className="flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-amber-800" />
                <span>نص البردية الأصلية (التعويذة {activeSpell.chapterNumber}):</span>
              </span>
              <span className="font-mono text-stone-600">{activeSpell.titleTransliteration}</span>
            </div>

            {/* Hieroglyphic Display */}
            <div className="py-4 text-center bg-white/70 rounded-2xl border border-amber-200/80 shadow-inner space-y-2">
              <div className="text-3xl sm:text-5xl font-hieroglyphs text-stone-900 tracking-wider select-none leading-relaxed">
                {activeSpell.hieroglyphicText}
              </div>
              <div className="text-xs font-mono text-amber-900" dir="ltr">
                {activeSpell.transliteration}
              </div>
            </div>

            {/* Phonetic Pronunciation */}
            <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-200 text-xs text-stone-800 font-serif-ar">
              <strong>النطق الصوتي للمتوفى:</strong> {activeSpell.phoneticReadingAr}
            </div>

            {/* Arabic Translation */}
            <div className="p-4 bg-white rounded-2xl border border-amber-300 shadow-2xs space-y-1">
              <div className="text-[11px] font-bold text-amber-900">الترجمة العربية المعتمدة:</div>
              <p className="text-sm sm:text-base font-bold text-stone-900 font-serif-ar leading-relaxed">
                {activeSpell.arabicTranslation}
              </p>
            </div>

            {/* Key Segment Glyph Inspector */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-amber-800" />
                <span>الكلمات المفتاحية في التعويذة (انقر للفحص الصوتي):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeSpell.keySegments.map((seg, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePronounceSegment(seg)}
                    className="p-3 rounded-xl bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 cursor-pointer transition-all shadow-2xs space-y-1"
                  >
                    <div className="text-2xl font-hieroglyphs text-stone-900 text-center">
                      {seg.glyphs}
                    </div>
                    <div className="text-xs font-bold text-amber-950 text-center">
                      {seg.meaningAr}
                    </div>
                    <div className="text-[10px] text-stone-500 font-serif-ar text-center">
                      {seg.explanationAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Papyrus Vignette Art Description */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>المشهد الفني والمنمنمات المصورة (Vignette):</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 font-serif-ar leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200">
              {activeSpell.papyrusVignetteAr}
            </p>
          </div>

        </div>

        {/* Right Column: Theological Role in Afterlife (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Role in the Underworld Card */}
          <div className="p-5 rounded-3xl bg-amber-950 text-amber-50 border-2 border-amber-600/50 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>دور التعويذة في الرحلة للعالم الآخر</span>
              </span>
              <span className="font-mono">دوات (Duat)</span>
            </div>

            <h4 className="text-base font-bold text-white font-display-eg">
              {activeSpell.titleAr}
            </h4>

            <p className="text-xs sm:text-sm text-stone-200 font-serif-ar leading-relaxed">
              {activeSpell.theologicalRoleInAfterlife}
            </p>

            {activeSpell.amuletAssociated && (
              <div className="pt-2 border-t border-amber-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold">التميمة المرافقة:</span>
                <span className="text-amber-100 font-mono text-[11px]">{activeSpell.amuletAssociated}</span>
              </div>
            )}
          </div>

          {/* Judges / Gods Presiding */}
          {activeSpell.guardiansAndJudgesAr && (
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-800" />
                <span>الآلهة والقضاة الحاضرون في المشهد:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSpell.guardiansAndJudgesAr.map((judge, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-amber-50 text-amber-950 border border-amber-200 px-2.5 py-1 rounded-lg font-serif-ar"
                  >
                    {judge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Evolution Lineage Card */}
          <div className="p-4 rounded-2xl bg-[#FAF5E8] border border-[#E8DFC9] text-xs text-stone-700 font-serif-ar space-y-1.5">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              <span>تسلسل نصوص الخلود في مصر القديمة:</span>
            </div>
            <p className="leading-relaxed">
              {BOOK_OF_THE_DEAD_OVERVIEW.evolutionLineageAr}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
