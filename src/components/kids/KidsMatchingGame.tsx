import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Check, Sparkles, Volume2 } from 'lucide-react';
import { UNILITERAL_HIEROGLYPHS } from '../../data/hieroglyphsData';
import { HieroglyphSign } from '../../types';
import { soundFX } from '../../utils/soundEffects';

interface MatchItem {
  id: string;
  sign: HieroglyphSign;
  type: 'glyph' | 'meaning';
  text: string;
  isMatched: boolean;
}

export const KidsMatchingGame: React.FC = () => {
  const [glyphCards, setGlyphCards] = useState<MatchItem[]>([]);
  const [meaningCards, setMeaningCards] = useState<MatchItem[]>([]);
  const [selectedGlyph, setSelectedGlyph] = useState<MatchItem | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<MatchItem | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  // Initialize a round with 4 random signs
  const startNewRound = () => {
    // Pick 4 diverse signs
    const shuffled = [...UNILITERAL_HIEROGLYPHS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    const glyphs: MatchItem[] = selected.map(s => ({
      id: `glyph-${s.id}`,
      sign: s,
      type: 'glyph' as const,
      text: s.char,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    const meanings: MatchItem[] = selected.map(s => ({
      id: `meaning-${s.id}`,
      sign: s,
      type: 'meaning' as const,
      text: `${s.meaningAr} (صوت ${s.arabicLetter})`,
      isMatched: false,
    })).sort(() => 0.5 - Math.random());

    setGlyphCards(glyphs);
    setMeaningCards(meanings);
    setSelectedGlyph(null);
    setSelectedMeaning(null);
    setMatchedPairs([]);
  };

  useEffect(() => {
    startNewRound();
  }, [round]);

  const handleSelectGlyph = (item: MatchItem) => {
    if (item.isMatched) return;
    soundFX.playClickSound();
    setSelectedGlyph(item);

    // If meaning is already selected, check match
    if (selectedMeaning) {
      checkMatch(item, selectedMeaning);
    }
  };

  const handleSelectMeaning = (item: MatchItem) => {
    if (item.isMatched) return;
    soundFX.playClickSound();
    setSelectedMeaning(item);

    // If glyph is already selected, check match
    if (selectedGlyph) {
      checkMatch(selectedGlyph, item);
    }
  };

  const checkMatch = (glyph: MatchItem, meaning: MatchItem) => {
    if (glyph.sign.id === meaning.sign.id) {
      // MATCH!
      soundFX.playSuccessSound();
      soundFX.speakArabic(`صحيح! ${glyph.sign.meaningAr}`);
      const newMatched = [...matchedPairs, glyph.sign.id];
      setMatchedPairs(newMatched);
      setScore(prev => prev + 10);

      setGlyphCards(prev => prev.map(c => c.sign.id === glyph.sign.id ? { ...c, isMatched: true } : c));
      setMeaningCards(prev => prev.map(c => c.sign.id === glyph.sign.id ? { ...c, isMatched: true } : c));
      setSelectedGlyph(null);
      setSelectedMeaning(null);

      // Check if all 4 matched
      if (newMatched.length === 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#1A365D', '#C25E3E', '#F59E0B']
        });
      }
    } else {
      // MISMATCH
      setTimeout(() => {
        setSelectedGlyph(null);
        setSelectedMeaning(null);
      }, 700);
    }
  };

  const isRoundCompleted = matchedPairs.length === 4;

  return (
    <div className="p-6 rounded-2xl bg-amber-900/5 border border-amber-800/20 text-right space-y-6">
      
      {/* Title & Score Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-800">تحدي الذاكرة والذكاء</div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
            لعبة توصيل الرمز بصاحبه
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            اضغط على الرمز الهيروغليفي ثم اضغط على اسمه الصحيح لتكسب النجوم!
          </p>
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-mono tabular-nums text-lg">{score}</span>
            <span className="text-xs text-stone-500 font-normal">نقطة</span>
          </div>
          <span className="text-stone-300">|</span>
          <button
            onClick={() => {
              setRound(r => r + 1);
              soundFX.playClickSound();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-amber-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>جولة جديدة</span>
          </button>
        </div>
      </div>

      {/* Game Stage: Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Column 1: Glyphs */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-900 mb-2">1. اختر الرمز الهيروغليفي:</div>
          <div className="grid grid-cols-2 gap-3">
            {glyphCards.map((item) => {
              const isSelected = selectedGlyph?.id === item.id;
              return (
                <button
                  key={item.id}
                  disabled={item.isMatched}
                  onClick={() => handleSelectGlyph(item)}
                  className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[110px] ${
                    item.isMatched
                      ? 'bg-amber-100/50 border-amber-400 text-stone-400 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-amber-100 border-amber-700 shadow-md scale-102 ring-2 ring-amber-500'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-sm'
                  }`}
                >
                  <span className="text-5xl font-hieroglyphs select-none text-stone-900">
                    {item.text}
                  </span>
                  {item.isMatched && (
                    <span className="mt-1 flex items-center gap-1 text-[11px] text-amber-800 font-bold">
                      <Check className="w-3 h-3" /> تم التوصيل
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Meanings */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-900 mb-2">2. اختر المعنى والصوت المطابق:</div>
          <div className="space-y-2.5">
            {meaningCards.map((item) => {
              const isSelected = selectedMeaning?.id === item.id;
              return (
                <button
                  key={item.id}
                  disabled={item.isMatched}
                  onClick={() => handleSelectMeaning(item)}
                  className={`w-full p-3.5 rounded-xl border-2 transition-all text-right flex items-center justify-between ${
                    item.isMatched
                      ? 'bg-amber-100/50 border-amber-400 text-stone-400 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-amber-100 border-amber-700 shadow-md ring-2 ring-amber-500'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-50 text-amber-800 font-bold text-xs flex items-center justify-center border border-amber-200">
                      {item.sign.arabicLetter}
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      {item.text}
                    </span>
                  </div>
                  {item.isMatched ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-xs text-stone-400">اختر</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Victory Callout when finished */}
      {isRoundCompleted && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300 animate-bounce" />
            <div>
              <div className="text-sm font-bold">برافو يا كاتب المستقبل! أتممت التحدي ببراعة! 🎉</div>
              <div className="text-xs text-amber-200">حصلت على 40 نقطة جديدة في رصيدك الأثري.</div>
            </div>
          </div>
          <button
            onClick={() => setRound(r => r + 1)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            العب جولة أخرى بأشكال جديدة
          </button>
        </div>
      )}

    </div>
  );
};
