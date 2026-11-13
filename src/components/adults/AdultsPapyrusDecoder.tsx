import React, { useState } from 'react';
import { FAMOUS_INSCRIPTIONS } from '../../data/famousInscriptions';
import { InscriptionItem } from '../../types';
import { 
  Volume2, VolumeX, ArrowRightLeft, Sparkles, BookOpen, Layers, 
  PenTool, Copy, Check, RefreshCw, Send, ArrowRight
} from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { translateSentenceToHieroglyphs, SentenceTranslationResult } from '../../utils/hieroglyphSentenceTranslator';

export const AdultsPapyrusDecoder: React.FC = () => {
  const [activeDecoderMode, setActiveDecoderMode] = useState<'custom' | 'historical'>('custom');
  
  // Historical inscription state
  const [selectedItem, setSelectedItem] = useState<InscriptionItem>(FAMOUS_INSCRIPTIONS[0]);
  const [readingDirection, setReadingDirection] = useState<'rtl' | 'ltr' | 'vertical'>('rtl');

  // Custom sentence translator state
  const [customInputText, setCustomInputText] = useState('مصر أرض السلام والخير');
  const [translationResult, setTranslationResult] = useState<SentenceTranslationResult>(() => 
    translateSentenceToHieroglyphs('مصر أرض السلام والخير')
  );
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const sampleSentences = [
    'مصر أرض السلام والخير',
    'الحياة والمحبة والجمال',
    'عنخ وِجا سنب',
    'الصدق والعدل أساس الملك',
    'أنا كاتب مصري في دار الحياة',
    'نور الشمس يضيء الأرض'
  ];

  const handleTranslateSentence = (text: string) => {
    setCustomInputText(text);
    const result = translateSentenceToHieroglyphs(text);
    setTranslationResult(result);
    soundFX.playClickSound();
  };

  const handlePlayHistoricalAudio = (item: InscriptionItem) => {
    soundFX.playAncientChime(520);
    scribeAudio.speakText(
      `${item.titleAr}.. بالهيروغليفية المصرية القديمة: ${item.transliteration}.. وترجمتها: ${item.translationAr}`
    );
  };

  const handlePlayCustomSentenceAudio = () => {
    if (isPlayingAudio) {
      scribeAudio.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    soundFX.playAncientChime(580);

    const speechScript = `الجملة: ${translationResult.originalSentence}.. نطقها بالهيروغليفية: ${translationResult.fullPhoneticArabic}.. التفريغ الصوتي: ${translationResult.fullTransliteration}`;
    
    scribeAudio.speakText(speechScript, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleCopyGlyphs = () => {
    if (!translationResult.fullGlyphs) return;
    navigator.clipboard.writeText(translationResult.fullGlyphs);
    setCopied(true);
    soundFX.playSuccessSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm space-y-8 text-right">
      
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>نظام التدوين وقراءة ونقش الهيروغليفية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
            محلل ومترجم النقوش والبرديات
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            أدخل جملتك الخاصة ليحولها الكاتب إلى نصوص هيروغليفية أصيلة بالخط الملكي مع عرض النطق الصوتي وتفصيل كل رمز.
          </p>
        </div>

        {/* Decoder Mode Switcher */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl border border-stone-300 self-start sm:self-auto">
          <button
            onClick={() => setActiveDecoderMode('custom')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeDecoderMode === 'custom'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-amber-300" />
            <span>محرر ومترجم الجمل الحية</span>
          </button>
          <button
            onClick={() => setActiveDecoderMode('historical')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeDecoderMode === 'historical'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>نقوش وبرديات تاريخية شهيرة</span>
          </button>
        </div>
      </div>

      {/* Reading Direction and Golden Rule Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-xs sm:text-sm text-stone-800 font-serif-ar leading-relaxed">
          <strong className="text-amber-900 font-bold block">القاعدة الذهبية لقراءة الهيروغليفية:</strong>
          <span>
            «انظر دائماً إلى وجوه الحيوانات والطيور والبشر في النقش؛ اقرأ في اتجاه مواجهة وجوههم كأنك تمشي نحوهم! فإذا كانت تنظر لليمين، فالقراءة من اليمين لليسار كما في لغتنا العربية.»
          </span>
        </div>

        {/* Direction Controls */}
        <div className="shrink-0 flex items-center gap-1.5 bg-white p-1 rounded-xl border border-amber-200">
          <span className="text-[11px] font-bold text-stone-600 px-2 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3" />
            <span>الاتجاه:</span>
          </span>
          <button
            onClick={() => setReadingDirection('rtl')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
              readingDirection === 'rtl' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            يمين ← يسار
          </button>
          <button
            onClick={() => setReadingDirection('ltr')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
              readingDirection === 'ltr' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            يسار ← يمين
          </button>
          <button
            onClick={() => setReadingDirection('vertical')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
              readingDirection === 'vertical' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            عمودي ↓
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FEATURE A: CUSTOM SENTENCE SCRIBE & DECODER */}
      {/* ======================================================== */}
      {activeDecoderMode === 'custom' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Input Box */}
          <div className="p-5 rounded-2xl bg-[#FAF5E8] border border-[#E8DFC9] space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-stone-900 block">
                أدخل أي جملة قصيرة أو عبارة بالعربية:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customInputText}
                  maxLength={60}
                  onChange={(e) => handleTranslateSentence(e.target.value)}
                  placeholder="اكتب هنا مثلاً: السلام والمحبة، مصر أرض الخير، الحياة والخلود، أنا كاتب مصري..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 bg-white text-stone-900 font-bold text-base sm:text-lg focus:outline-none focus:border-amber-700 transition-all text-right shadow-xs"
                />
                {customInputText && (
                  <button
                    onClick={() => handleTranslateSentence('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                  >
                    مسح
                  </button>
                )}
              </div>
            </div>

            {/* Presets suggestions */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-stone-500">جمل مقترحة للتجربة الفورية:</div>
              <div className="flex flex-wrap gap-1.5">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTranslateSentence(s)}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white border border-stone-200 hover:bg-amber-100 hover:border-amber-300 text-stone-800 transition-colors shadow-2xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rendered Hieroglyphic Papyrus / Stela */}
          {translationResult.words.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FDF9F0] border-2 border-[#E5DAC0] cartouche-shadow space-y-6">
              
              {/* Main Hieroglyphs Inscription Display (Using Noto Sans Egyptian Hieroglyphs) */}
              <div className="relative p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col items-center justify-center space-y-4">
                
                {/* Header Tag */}
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  النقش الهيروغليفي بالخط الملكي (Noto Sans Egyptian Hieroglyphs)
                </div>

                {/* The Rendered Glyphs */}
                <div
                  className={`text-5xl sm:text-6xl md:text-7xl font-hieroglyphs text-stone-900 tracking-wider py-4 select-all flex items-center justify-center gap-6 flex-wrap ${
                    readingDirection === 'vertical' ? 'flex-col' : 'flex-row'
                  }`}
                  style={{
                    transform: readingDirection === 'ltr' ? 'scaleX(-1)' : 'none'
                  }}
                >
                  {translationResult.words.map((w, idx) => (
                    <span 
                      key={idx} 
                      className="hover:text-amber-800 transition-colors inline-block"
                      title={`${w.wordAr}: ${w.meaningAr}`}
                    >
                      {w.glyphs}
                    </span>
                  ))}
                </div>

                {/* Phonetic Transliteration & Meaning Strip */}
                <div className="w-full pt-4 border-t border-stone-100 text-center space-y-1.5">
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-900 tracking-wide">
                    التفريغ الصوتي العلمي: {translationResult.fullTransliteration}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-stone-900 font-serif-ar">
                    النطق بالمصرية القديمة: «{translationResult.fullPhoneticArabic}»
                  </div>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={handlePlayCustomSentenceAudio}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isPlayingAudio
                        ? 'bg-amber-800 text-white ring-2 ring-amber-500'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-200 animate-pulse" />
                        <span>إيقاف الصوت</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-amber-800" />
                        <span>استمع للنطق الصوتي الكامل للجملة</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyGlyphs}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors border border-stone-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">تم نسخ الرموز!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span>نسخ الرموز الهيروغليفية</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Word-by-Word Anatomical Decomposition */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-900">
                  التحليل المعجمي والصوتي لكل كلمة في الجملة:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {translationResult.words.map((part, pIdx) => (
                    <div 
                      key={pIdx}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2 text-right"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="text-xs font-bold text-stone-900">{part.wordAr}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          part.isLexicalMatch 
                            ? 'bg-emerald-100 text-emerald-900' 
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {part.isLexicalMatch ? 'كلمة معجمية أصيلة' : 'نقحرة صوتية'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-hieroglyphs text-stone-900 p-2 bg-[#FAF5E8] rounded-xl border border-amber-200">
                          {part.glyphs}
                        </span>
                        <div>
                          <div className="text-xs font-mono font-bold text-amber-900">{part.transliteration}</div>
                          <div className="text-xs font-bold text-stone-800 mt-0.5">{part.phoneticArabic}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{part.meaningAr}</div>
                        </div>
                      </div>

                      {/* Sign-by-sign components */}
                      {part.signsBreakdown.length > 0 && (
                        <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500 space-y-1">
                          <div className="font-semibold text-stone-700">مكونات الرموز:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {part.signsBreakdown.map((s, sIdx) => (
                              <span key={sIdx} className="bg-stone-50 border border-stone-200 px-1.5 py-0.5 rounded">
                                {s.char} [{s.gardiner}]: {s.meaning}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* FEATURE B: FAMOUS HISTORICAL INSCRIPTIONS DECODER */}
      {/* ======================================================== */}
      {activeDecoderMode === 'historical' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Inscription Tabs */}
          <div className="flex flex-wrap gap-2">
            {FAMOUS_INSCRIPTIONS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  soundFX.playClickSound();
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  selectedItem.id === item.id
                    ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-stone-100'
                }`}
              >
                {item.titleAr.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Inscription Inspection Stage */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FBF7EE] border-2 border-[#E5DAC0] space-y-6">
            
            {/* Main Monolith Display */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {selectedItem.period}
              </div>

              {/* Large Rendered Inscription Glyphs */}
              <div
                className={`text-6xl sm:text-7xl font-hieroglyphs text-stone-900 tracking-widest my-2 select-none flex items-center justify-center gap-6 ${
                  readingDirection === 'vertical' ? 'flex-col' : 'flex-row'
                }`}
                style={{
                  transform: readingDirection === 'ltr' ? 'scaleX(-1)' : 'none'
                }}
              >
                {selectedItem.glyphs}
              </div>

              <div className="text-center space-y-1">
                <div className="text-lg sm:text-xl font-bold font-mono text-amber-900">
                  {selectedItem.transliteration}
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 font-serif-ar">
                  «{selectedItem.translationAr}»
                </div>
              </div>

              <button
                onClick={() => handlePlayHistoricalAudio(selectedItem)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للنطق المصري القديم والشرح</span>
              </button>
            </div>

            {/* Word-by-word anatomical breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-900">التحليل التفصيلي لكل رمز في العبارة:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedItem.breakdown.map((part, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 flex items-center gap-3">
                    <span className="text-4xl font-hieroglyphs text-stone-900 p-2 bg-stone-50 rounded-lg border border-stone-100">
                      {part.glyph}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-stone-900">{part.sound}</div>
                      <div className="text-xs text-stone-600 mt-0.5">{part.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Context Narrative */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-ar space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span>السياق التاريخي والطقسي:</span>
              </span>
              <p>{selectedItem.contextHistorical}</p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
