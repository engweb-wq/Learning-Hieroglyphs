import React, { useState, useEffect } from 'react';
import {
  Search,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Languages
} from 'lucide-react';
import {
  SHARED_ARABIC_ROOTS_DATA,
  PHONETIC_CORRESPONDENCE_LAWS,
  SHARED_ROOT_DOMAINS,
  SHARED_ROOT_RELATIONS
} from '../../data/sharedArabicRootsData';
import { SharedRootEntry, SharedRootRelationType } from '../../types';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

export const SharedArabicRootsDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRelation, setSelectedRelation] = useState<'all' | SharedRootRelationType>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [showPhoneticLaws, setShowPhoneticLaws] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<SharedRootEntry | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'lexicon' | 'matcher'>('lexicon');

  // Interactive Root Matcher Mini-Challenge State
  const [matcherIndex, setMatcherIndex] = useState(0);
  const [matcherOptions, setMatcherOptions] = useState<SharedRootEntry[]>([]);
  const [matcherSelectedId, setMatcherSelectedId] = useState<string | null>(null);
  const [matcherFeedback, setMatcherFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [matcherScore, setMatcherScore] = useState(0);
  const [matcherCorrectCount, setMatcherCorrectCount] = useState(0);

  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((activeId) => {
      setPlayingId(activeId);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const buildMatcherRound = (idx: number) => {
    const target = SHARED_ARABIC_ROOTS_DATA[idx % SHARED_ARABIC_ROOTS_DATA.length];
    const distractors = SHARED_ARABIC_ROOTS_DATA.filter((e) => e.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setMatcherOptions([target, ...distractors].sort(() => 0.5 - Math.random()));
    setMatcherSelectedId(null);
    setMatcherFeedback('idle');
  };

  useEffect(() => {
    buildMatcherRound(matcherIndex);
  }, [matcherIndex]);

  const filteredEntries = SHARED_ARABIC_ROOTS_DATA.filter((entry) => {
    const matchesRelation = selectedRelation === 'all' || entry.relationType === selectedRelation;
    const matchesDomain = selectedDomain === 'all' || entry.domain === selectedDomain;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      entry.arabicCognate.toLowerCase().includes(q) ||
      entry.arabicRoot.toLowerCase().includes(q) ||
      entry.arabicMeaning.toLowerCase().includes(q) ||
      entry.approximatePronunciationAr.toLowerCase().includes(q) ||
      entry.transliteration.toLowerCase().includes(q) ||
      entry.similarityExplanationAr.toLowerCase().includes(q);
    return matchesRelation && matchesDomain && matchesQuery;
  });

  const handlePlayEntryAudio = (entry: SharedRootEntry, includeExplanation = false) => {
    const audioId = `shared-root-${entry.id}`;
    if (playingId === audioId) {
      scribeAudio.stop();
      setPlayingId(null);
      return;
    }

    soundFX.playAncientChime(520);
    const script = includeExplanation
      ? `الكلمة الهيروغليفية ${entry.approximatePronunciationAr}.. وتعني ${entry.arabicMeaning}.. تقابلها في العربية كلمة ${entry.arabicCognate}.. ${entry.similarityExplanationAr}`
      : `${entry.approximatePronunciationAr}.. في العربية: ${entry.arabicCognate}.. والمعنى: ${entry.arabicMeaning}`;

    setPlayingId(audioId);
    scribeAudio.speakText(script, {
      id: audioId,
      rate: 0.9,
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  const handlePlayExampleAudio = (entry: SharedRootEntry, exampleIdx: number) => {
    const ex = entry.examples[exampleIdx];
    if (!ex) return;
    const audioId = `shared-root-ex-${entry.id}-${exampleIdx}`;
    if (playingId === audioId) {
      scribeAudio.stop();
      setPlayingId(null);
      return;
    }

    soundFX.playAncientChime(580);
    setPlayingId(audioId);
    scribeAudio.speakText(
      `بالمصرية القديمة: ${ex.phoneticAr}.. والمعنى: ${ex.arabicTranslation}`,
      {
        id: audioId,
        rate: 0.88,
        onEnd: () => setPlayingId(null),
        onError: () => setPlayingId(null)
      }
    );
  };

  const currentMatcherTarget = SHARED_ARABIC_ROOTS_DATA[matcherIndex % SHARED_ARABIC_ROOTS_DATA.length];

  const handleSelectMatcherOption = (opt: SharedRootEntry) => {
    if (matcherFeedback !== 'idle') return;
    setMatcherSelectedId(opt.id);

    if (opt.id === currentMatcherTarget.id) {
      soundFX.playSuccessSound();
      setMatcherFeedback('correct');
      setMatcherScore((prev) => prev + 25);
      setMatcherCorrectCount((prev) => prev + 1);
      studentProgress.addPoints(15, `مطابقة الجذر المشترك «${currentMatcherTarget.arabicCognate}»`, 'القاموس المقارن');
    } else {
      soundFX.playClickSound();
      setMatcherFeedback('wrong');
    }
  };

  return (
    <div id="shared-roots-dictionary" className="space-y-6 text-right animate-fadeIn">
      {/* Header Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-2">
              <span>اللسانيات الأفروآسيوية المقارنة</span>
              <span aria-hidden="true">·</span>
              <span>التقارب المصري العربي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
              قاموس الجذور المشتركة بين الهيروغليفية والعربية
            </h2>
            <p className="text-sm text-stone-600 max-w-3xl font-serif-ar leading-relaxed">
              استكشف الكلمات المصرية القديمة التي تشترك مع اللغة العربية في الجذر الأفروآسيوي أو التطابق الصوتي والدلالي؛ مع النطق التقريبي، الجذر الثلاثي المقابل، أمثلة الاستخدام، وشرح القوانين الصوتية الرابطة بين اللغتين.
            </p>
          </div>

          {/* Mode Toggle & Compact Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="text-right sm:text-left px-3 py-1.5 border border-[#E8DFC9] rounded-xl bg-[#FAF7F0]">
              <div className="text-xl font-extrabold font-mono text-amber-900 tabular-nums">
                {SHARED_ARABIC_ROOTS_DATA.length}
              </div>
              <div className="text-[11px] font-semibold text-stone-600">جذر ولفظ موثق</div>
            </div>

            <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setViewMode('lexicon');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'lexicon'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>تصفح المعجم</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setViewMode('matcher');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'matcher'
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>اختبر مطابقة الجذر</span>
              </button>
            </div>
          </div>
        </div>

        {/* Phonetic Correspondence Guide Toggle Strip */}
        <div className="border-t border-stone-100 pt-4">
          <button
            type="button"
            onClick={() => {
              soundFX.playClickSound();
              setShowPhoneticLaws((prev) => !prev);
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F5EEDB] border border-[#E8DFC9] text-right transition-colors"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950">
              <Languages className="w-4 h-4 text-amber-800 shrink-0" />
              <span>دليل قوانين التطابق الصوتي بين المصرية القديمة والعربية (5 قواعد مفتاحية)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 whitespace-nowrap shrink-0">
              <span>{showPhoneticLaws ? 'إخفاء القواعد' : 'عرض القواعد'}</span>
              {showPhoneticLaws ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showPhoneticLaws && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
              {PHONETIC_CORRESPONDENCE_LAWS.map((law) => (
                <div
                  key={law.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-900">{law.titleAr}</span>
                    <span className="text-sm font-mono font-bold text-stone-800 bg-white px-2.5 py-1 rounded-lg border border-stone-200 whitespace-nowrap shrink-0">
                      <span className="font-hieroglyphs text-base ml-1">{law.egyptianSign}</span>
                      <span>↔ {law.arabicLetter}</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-serif-ar">
                    {law.explanationAr}
                  </p>
                  <div className="text-[11px] font-semibold text-amber-950 bg-amber-50/70 px-2.5 py-1.5 rounded-lg border border-amber-200/70">
                    {law.samplePairAr}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search & Filters (Lexicon Mode) */}
        {viewMode === 'lexicon' && (
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search Box */}
              <div className="lg:col-span-5 relative">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالكلمة، الجذر العربي (م-و-هـ)، أو النطق (مُو، إب، مُوت)..."
                  className="w-full pr-10 pl-12 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white text-right"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    مسح
                  </button>
                )}
              </div>

              {/* Relation Type Filter */}
              <div className="lg:col-span-7 flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {SHARED_ROOT_RELATIONS.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClickSound();
                      setSelectedRelation(rel.id);
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedRelation === rel.id
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-700 bg-stone-100 hover:bg-stone-200'
                    }`}
                  >
                    {rel.nameAr}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Filter Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-stone-500 ml-1 whitespace-nowrap shrink-0">
                المجال الدلالي:
              </span>
              {SHARED_ROOT_DOMAINS.map((dom) => (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => {
                    soundFX.playClickSound();
                    setSelectedDomain(dom.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    selectedDomain === dom.id
                      ? 'bg-[#FAF5E8] border-amber-700 text-amber-950'
                      : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  {dom.nameAr}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================
          VIEW 1: INTERACTIVE LEXICON GRID
         ========================================= */}
      {viewMode === 'lexicon' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
            <span>
              عرض <span className="font-mono font-bold text-stone-800 tabular-nums">{filteredEntries.length}</span> من أصل{' '}
              <span className="font-mono font-bold text-stone-800 tabular-nums">{SHARED_ARABIC_ROOTS_DATA.length}</span> جذر مشترك موثق
            </span>
            <span>انقر على السماعة للاستماع أو على البطاقة لعرض المقارنة والأمثلة الكاملة</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntries.map((entry) => {
              const isPlaying = playingId === `shared-root-${entry.id}`;

              return (
                <article
                  key={entry.id}
                  className={`p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                    isPlaying
                      ? 'border-amber-700 ring-2 ring-amber-300 bg-amber-50/30'
                      : 'border-[#E8DFC9] hover:border-amber-600 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Unboxed Metadata Line + Audio Control */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div className="text-[11px] font-semibold text-stone-500 truncate">
                        <span className="text-amber-800">{entry.relationLabelAr}</span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span>{entry.domainLabelAr}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePlayEntryAudio(entry, false)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                          isPlaying
                            ? 'bg-amber-800 text-white border-amber-900'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                        }`}
                        aria-label={isPlaying ? `إيقاف نطق ${entry.arabicCognate}` : `استمع لنطق ${entry.arabicCognate}`}
                        title="استمع للنطق التقريبي والمقابل العربي"
                      >
                        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Hieroglyph + Approximate Pronunciation + Arabic Cognate Side-by-Side */}
                    <div className="grid grid-cols-12 items-center gap-3 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EAE2D0]">
                      <div className="col-span-5 text-center border-l border-[#E8DFC9] pl-2">
                        <div className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900 select-none leading-tight">
                          {entry.hieroglyphs}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-amber-900 mt-1">
                          {entry.approximatePronunciationAr}
                        </div>
                        <div className="text-[10px] font-mono text-stone-500">
                          {entry.transliteration} · {entry.gardinerCodes.join(', ')}
                        </div>
                      </div>

                      <div className="col-span-7 space-y-1 text-right pr-1">
                        <div className="text-[11px] font-semibold text-stone-500">المقابل في العربية:</div>
                        <div className="text-lg font-extrabold text-amber-950 font-display-eg leading-snug">
                          {entry.arabicCognate}
                        </div>
                        <div className="text-xs font-mono text-stone-600">
                          الجذر: <span className="font-bold text-stone-800">{entry.arabicRoot}</span>
                        </div>
                        <div className="text-xs text-stone-700 font-semibold">
                          المعنى: {entry.arabicMeaning}
                        </div>
                      </div>
                    </div>

                    {/* Consonant Correspondence Strip */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-amber-700" />
                        <span>تشابه الصوامت والجذر:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.consonantBridge.map((bridge, idx) => (
                          <div
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-mono text-stone-800 flex items-center gap-1.5"
                            title={bridge.noteAr}
                          >
                            <span className="font-bold">{bridge.egyptian}</span>
                            <span className="text-amber-700">↔</span>
                            <span className="font-bold text-amber-900 font-sans">{bridge.arabic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Concise Similarity Explanation */}
                    <p className="text-xs text-stone-700 font-serif-ar leading-relaxed line-clamp-3">
                      {entry.similarityExplanationAr}
                    </p>

                    {/* Primary Usage Example Preview */}
                    {entry.examples[0] && (
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-stone-700">مثال استخدام:</span>
                          <span className="font-hieroglyphs text-lg text-stone-900 select-none">
                            {entry.examples[0].hieroglyphs}
                          </span>
                        </div>
                        <div className="text-amber-900 font-semibold">
                          «{entry.examples[0].phoneticAr}» — {entry.examples[0].arabicTranslation}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-stone-500 truncate">
                      {entry.phoneticLawSummaryAr}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClickSound();
                        setSelectedEntry(entry);
                      }}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline whitespace-nowrap shrink-0"
                    >
                      الشرح والأمثلة ←
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredEntries.length === 0 && (
            <div className="p-10 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
              <BookOpen className="w-9 h-9 text-stone-400 mx-auto" />
              <div className="text-base font-bold text-stone-800">لم نعثر على جذور مطابقة لبحثك</div>
              <p className="text-xs text-stone-500">
                جرب البحث بكلمة مثل: ماء، لب، يمين، موت، فرعون، تابوت، أو أعد ضبط المرشحات.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRelation('all');
                  setSelectedDomain('all');
                }}
                className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                عرض جميع الجذور المشتركة
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================
          VIEW 2: INTERACTIVE ROOT MATCHER CHALLENGE
         ========================================= */}
      {viewMode === 'matcher' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="text-xs font-semibold text-amber-800">تدريب تفاعلي على الجذور المشتركة</div>
              <h3 className="text-xl font-extrabold text-stone-900 font-display-eg">
                اختبر معرفتك: طابق الكلمة الهيروغليفية بجذرها العربي
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-stone-700">
              <span>
                السؤال{' '}
                <span className="font-mono text-amber-900 tabular-nums">
                  {(matcherIndex % SHARED_ARABIC_ROOTS_DATA.length) + 1}/{SHARED_ARABIC_ROOTS_DATA.length}
                </span>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                إجابات صحيحة:{' '}
                <span className="font-mono text-emerald-700 tabular-nums">{matcherCorrectCount}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                النقاط: <span className="font-mono text-amber-900 tabular-nums">{matcherScore}</span>
              </span>
            </div>
          </div>

          {/* Target Prompt Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF5E8] border border-amber-200 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs font-semibold text-stone-600">
              {currentMatcherTarget.domainLabelAr} · {currentMatcherTarget.relationLabelAr}
            </span>
            <div className="text-6xl sm:text-7xl font-hieroglyphs text-stone-900 select-none">
              {currentMatcherTarget.hieroglyphs}
            </div>
            <div className="text-base font-bold text-amber-950">
              النطق التقريبي: {currentMatcherTarget.approximatePronunciationAr}{' '}
              <span className="font-mono text-sm text-amber-800">({currentMatcherTarget.transliteration})</span>
            </div>
            <div className="text-xs sm:text-sm text-stone-700">
              المعنى الأساسي: <span className="font-bold">{currentMatcherTarget.arabicMeaning}</span>
            </div>
            <button
              type="button"
              onClick={() => handlePlayEntryAudio(currentMatcherTarget, false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>استمع للنطق</span>
            </button>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-600">اختر الكلمة العربية والجذر المشترك المطابق:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matcherOptions.map((opt) => {
                const isSelected = matcherSelectedId === opt.id;
                const isTarget = opt.id === currentMatcherTarget.id;

                let btnClass =
                  'bg-white border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 text-stone-900';
                if (matcherFeedback !== 'idle') {
                  if (isTarget) {
                    btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-50 border-rose-500 text-rose-950';
                  } else {
                    btnClass = 'bg-stone-50 border-stone-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={matcherFeedback !== 'idle'}
                    onClick={() => handleSelectMatcherOption(opt)}
                    className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between gap-3 ${btnClass}`}
                  >
                    <div>
                      <div className="text-base font-extrabold">{opt.arabicCognate}</div>
                      <div className="text-xs font-mono text-stone-600 mt-0.5">
                        الجذر العربي: {opt.arabicRoot}
                      </div>
                    </div>
                    {matcherFeedback !== 'idle' && isTarget && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {matcherFeedback !== 'idle' && isSelected && !isTarget && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Immediate Linguistic Feedback */}
          {matcherFeedback !== 'idle' && (
            <div
              className={`p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                matcherFeedback === 'correct'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {matcherFeedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>تطابق صحيح! (+25 نقطة · +15 نقطة كاتب)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>
                      الجذر المطابق الصحيح هو «{currentMatcherTarget.arabicCognate}» ({currentMatcherTarget.arabicRoot})
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-serif-ar">
                {currentMatcherTarget.similarityExplanationAr}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs font-semibold text-stone-700">
                  القاعدة الصوتية: {currentMatcherTarget.phoneticLawSummaryAr}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClickSound();
                    setMatcherIndex((prev) => prev + 1);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  السؤال التالي ←
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end border-t border-stone-100 pt-3">
            <button
              type="button"
              onClick={() => {
                soundFX.playClickSound();
                setMatcherIndex(0);
                setMatcherScore(0);
                setMatcherCorrectCount(0);
                buildMatcherRound(0);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة بدء الاختبار</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================
          DETAIL MODAL
         ========================================= */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-900/20 max-h-[90vh] overflow-y-auto space-y-6 text-right animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs font-semibold text-amber-800">
                  {selectedEntry.relationLabelAr} · {selectedEntry.domainLabelAr}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 font-display-eg">
                  {selectedEntry.approximatePronunciationAr} ↔ {selectedEntry.arabicCognate}
                </h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  المعنى: {selectedEntry.arabicMeaning} ({selectedEntry.englishMeaning})
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  scribeAudio.stop();
                  setSelectedEntry(null);
                }}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-sm transition-colors"
                aria-label="إغلاق النافذة"
              >
                ✕
              </button>
            </div>

            {/* Hieroglyph & Consonant Bridge Comparison */}
            <div className="p-5 rounded-2xl bg-[#FAF5E8] border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="text-center space-y-1">
                <div className="text-xs font-semibold text-stone-500">الكتابة الهيروغليفية</div>
                <div className="text-6xl font-hieroglyphs text-stone-900 select-none">
                  {selectedEntry.hieroglyphs}
                </div>
                <div className="text-xs font-mono text-amber-900 font-bold">
                  {selectedEntry.transliteration} · Gardiner: {selectedEntry.gardinerCodes.join(', ')}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-700">تطابق الصوامت والجذر الثلاثي:</div>
                <div className="text-xs font-mono text-stone-600">
                  الجذر العربي: <span className="font-bold text-amber-950">{selectedEntry.arabicRoot}</span>
                </div>
                <div className="space-y-1.5">
                  {selectedEntry.consonantBridge.map((b, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white border border-amber-200/80 text-xs flex items-center justify-between gap-2"
                    >
                      <span className="font-mono font-bold text-stone-900">
                        {b.egyptian} ↔ {b.arabic}
                      </span>
                      {b.noteAr && <span className="text-[11px] text-stone-600">{b.noteAr}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparative Explanation */}
            <div className="space-y-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>أوجه التشابه اللغوي مع العربية:</span>
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-serif-ar">
                {selectedEntry.similarityExplanationAr}
              </p>
              <div className="text-xs font-semibold text-amber-950 pt-1">
                القاعدة الصوتية: {selectedEntry.phoneticLawSummaryAr}
              </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-3">
              <div className="text-sm font-bold text-stone-900">أمثلة الاستخدام في المصرية القديمة والعربية:</div>
              {selectedEntry.examples.map((ex, idx) => {
                const isExPlaying = playingId === `shared-root-ex-${selectedEntry.id}-${idx}`;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-3xl font-hieroglyphs text-stone-900 select-none">
                        {ex.hieroglyphs}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayExampleAudio(selectedEntry, idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          isExPlaying
                            ? 'bg-amber-800 text-white border-amber-900'
                            : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-200'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isExPlaying ? 'إيقاف المثال' : 'استمع للمثال'}</span>
                      </button>
                    </div>
                    <div className="text-xs font-mono text-amber-900 font-bold">
                      {ex.phoneticAr} ({ex.transliteration})
                    </div>
                    <div className="text-sm font-bold text-stone-900">{ex.arabicTranslation}</div>
                    <div className="text-xs text-stone-600 font-serif-ar">{ex.arabicParallelSentence}</div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-200 pt-4">
              <button
                type="button"
                onClick={() => handlePlayEntryAudio(selectedEntry, true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-colors ${
                  playingId === `shared-root-${selectedEntry.id}`
                    ? 'bg-rose-700 hover:bg-rose-600'
                    : 'bg-amber-800 hover:bg-amber-700'
                }`}
              >
                {playingId === `shared-root-${selectedEntry.id}` ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>إيقاف الشرح الصوتي</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>استمع للنطق والشرح المقارن كاملاً</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  scribeAudio.stop();
                  setSelectedEntry(null);
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
