import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Trophy,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  GraduationCap,
  Layers,
  Scroll,
  Copy,
  Check,
  Zap,
  MessageSquare,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { TutorLevel, TutorChatMessage, TutorQuizChallenge } from '../../types';
import { PREDEFINED_TUTOR_TOPICS, PredefinedTutorTopic } from '../../data/tutorKnowledge';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { soundFX } from '../../utils/soundEffects';
import { studentProgress } from '../../utils/studentProgressService';
import confetti from 'canvas-confetti';

export const AIEgyptianTutor: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<TutorLevel>('intermediate');
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<{ [quizId: string]: { selectedOptId: string; isCorrect: boolean } }>({});

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial welcome message from Scribe Omar Selim
  const [messages, setMessages] = useState<TutorChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'tutor',
      text: `إم-حوتيب 𓊵 أيها الكاتب النجيب!
أنا معلمك "عمر سليم"، كاتب بيت الحياة (Per-Ankh) ومستشارك اللغوي في مدرسة الكاتب المصري القديم.
يسعدني أن أصحبك في رحلة استكشاف أسرار لغة أجدادنا العظماء؛ سلني ما شئت عن:
- أصوات الحروف الأحادية والثنائية والثلاثية وأكواد قائمة جاردنر (Gardiner Codes).
- قواعد الجمل والتركيب والنحو الكلاسيكي (Middle Egyptian).
- قراءة الخراطيش الملكية وأسماء الفراعنة مع قاعدة التقديم الشرفي.
- الكلمات المصرية القديمة الحية التي ننطقها كل يوم في بلادنا.
- أو اطلب مني في أي وقت: «اختبرني يا معلم عمر» لأمنحك تمريناً لغوياً تفاعلياً تكسب به نقاط كاتب جديدة! 📜`,
      timestamp: 'الآن',
      level: 'intermediate',
      hieroglyphsSample: '𓇓 𓏞 𓊵 𓋹 𓄤',
      gardinerCodes: ['M23', 'Y3', 'R4', 'S34', 'F35'],
    },
  ]);

  // Subscribe to speech synthesis state
  useEffect(() => {
    const unsubscribe = scribeAudio.subscribe((id) => {
      setActivePlayingId(id);
    });
    return () => {
      unsubscribe();
      scribeAudio.stop();
    };
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle sending a message to server-side Gemini endpoint
  const handleSendMessage = async (userQuery?: string, isQuizRequest = false) => {
    const textToSend = (userQuery || inputText).trim();
    if (!textToSend || isLoading) return;

    soundFX.playClickSound();

    const userMsg: TutorChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'الآن',
      level: selectedLevel,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Check if this matches a predefined topic for instant offline/fast answer
      const matchedTopic = PREDEFINED_TUTOR_TOPICS.find(
        (t) => t.promptText === textToSend || t.titleAr === textToSend
      );

      if (matchedTopic && !isQuizRequest) {
        // Natural brief delay for authentic conversation rhythm
        await new Promise((resolve) => setTimeout(resolve, 600));
        const tutorReply: TutorChatMessage = {
          id: `tutor_${Date.now()}`,
          sender: 'tutor',
          text: matchedTopic.presetAnswer.replyText,
          timestamp: 'الآن',
          level: selectedLevel,
          hieroglyphsSample: matchedTopic.presetAnswer.hieroglyphsSample,
          gardinerCodes: matchedTopic.presetAnswer.gardinerCodes,
          quiz: matchedTopic.presetAnswer.quiz,
        };
        setMessages((prev) => [...prev, tutorReply]);
        soundFX.playAncientChime(520);
        setIsLoading(false);
        return;
      }

      // Call server endpoint
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          level: selectedLevel,
          generateQuiz: isQuizRequest || textToSend.includes('اختبر') || textToSend.includes('تمرين') || textToSend.includes('سؤال'),
          history: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'تعذر التواصل مع المعلم عمر سليم في بيت الحياة.');
      }

      const tutorData = data.data;

      const tutorReply: TutorChatMessage = {
        id: `tutor_${Date.now()}`,
        sender: 'tutor',
        text: tutorData.replyText,
        timestamp: 'الآن',
        level: selectedLevel,
        hieroglyphsSample: tutorData.hieroglyphsSample,
        gardinerCodes: tutorData.gardinerCodes,
        quiz: tutorData.quiz,
      };

      setMessages((prev) => [...prev, tutorReply]);
      soundFX.playAncientChime(520);
    } catch (err: unknown) {
      console.error('Tutor chat error:', err);
      // Fallback response with scholarly dignity
      const fallbackReply: TutorChatMessage = {
        id: `tutor_err_${Date.now()}`,
        sender: 'tutor',
        text: `عذراً أيها الكاتب النبيل، يبدو أن رياح النيل عطلت وصول البردية مؤقتاً! 
يمكنك تجربة أحد الأسئلة السريعة بالأعلى حول الحروف الأحادية، أو علامة العنخ 𓋹، أو الكلمات المشتركة مع لساننا المعاصر.`,
        timestamp: 'الآن',
        level: selectedLevel,
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio speech synthesis of tutor reply
  const handlePlayAudio = (message: TutorChatMessage) => {
    if (activePlayingId === message.id) {
      scribeAudio.stop();
      return;
    }
    soundFX.playAncientChime(580);
    // Strip markdown formatting for speech
    const cleanSpeech = message.text.replace(/[*#_`]/g, '').slice(0, 320);
    scribeAudio.speakText(cleanSpeech, { id: message.id });
  };

  // Copy message text to clipboard
  const handleCopyText = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    soundFX.playClickSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Interactive Quiz Option Click
  const handleAnswerQuiz = (msgId: string, quiz: TutorQuizChallenge, optionId: string) => {
    if (answeredQuizzes[msgId]) return; // already answered

    const chosen = quiz.options.find((o) => o.id === optionId);
    const isCorrect = !!chosen?.isCorrect;

    setAnsweredQuizzes((prev) => ({
      ...prev,
      [msgId]: { selectedOptId: optionId, isCorrect },
    }));

    if (isCorrect) {
      soundFX.playSuccessSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#16a34a', '#9333ea'],
      });
      studentProgress.addPoints(
        quiz.pointsReward || 25,
        `حل اختبار تفاعلي مع المعلم عمر سليم: ${quiz.questionAr.slice(0, 30)}...`,
        'مساعد الكاتب الذكي'
      );
    } else {
      soundFX.playClickSound();
    }
  };

  // Reset chat conversation
  const handleResetChat = () => {
    soundFX.playClickSound();
    setMessages([
      {
        id: 'msg_welcome_reset',
        sender: 'tutor',
        text: `إم-حوتيب مجدداً أيها الكاتب! طويت البرديات السابقة وفتحت لك رقعة بردية بيضاء جديدة؛ فيم ترغب أن نبدأ مدارستنا اليوم؟ 𓏞`,
        timestamp: 'الآن',
        level: selectedLevel,
        hieroglyphsSample: '𓏞 𓏛 𓊵',
      },
    ]);
    setAnsweredQuizzes({});
  };

  return (
    <div className="space-y-8 animate-fadeIn" dir="rtl">
      {/* Tutor Persona Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DFC9] bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 text-white p-6 sm:p-8 shadow-lg">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar & Title */}
          <div className="md:col-span-8 space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>المعلم الأكاديمي والكاتب الملكي المشرف (AI Tutor)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display-eg text-amber-100 flex items-center gap-3">
              <span>المعلم الفرعوني الذكي «عمر سليم»</span>
              <span className="text-2xl font-hieroglyphs text-amber-400">𓇓 𓏞 𓄤</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar max-w-2xl">
              رئيس كتبة بيت الحياة (Per-Ankh)؛ يحاورك ويفسر لك دلالات الرموز وقواعد النحو وتاريخ البرديات والنقائش بدقة علمية محققة، مع توليد تمارين واختبارات قصيرة فورية تمنحك «نقاط كاتب»!
            </p>

            {/* Scientific Academic Integrity Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-200">
              <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>اعتماد علمي: قائمة جاردنر ومعاجم علم المصريات المعتمدة</span>
              </span>
              <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>تمييز دقيق بين الأصول اللغوية المؤكدة والفرضيات المقترحة</span>
              </span>
            </div>
          </div>

          {/* Level Switcher in Header */}
          <div className="md:col-span-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>مستوى الشرح والعمق:</span>
              </span>
              <span className="text-[11px] font-normal text-stone-300">
                {selectedLevel === 'beginner' && 'مبسط للصغار والمبتدئين'}
                {selectedLevel === 'intermediate' && 'تلميذ كاتب (متوسط)'}
                {selectedLevel === 'advanced' && 'باحث متقدم (أكاديمي)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 bg-stone-900/80 p-1 rounded-xl">
              <button
                onClick={() => {
                  setSelectedLevel('beginner');
                  soundFX.playClickSound();
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedLevel === 'beginner'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                مبتدئ
              </button>
              <button
                onClick={() => {
                  setSelectedLevel('intermediate');
                  soundFX.playClickSound();
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedLevel === 'intermediate'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                متوسط
              </button>
              <button
                onClick={() => {
                  setSelectedLevel('advanced');
                  soundFX.playClickSound();
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedLevel === 'advanced'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                متقدم
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Egyptian Hieroglyphs Background Watermark */}
        <div className="absolute left-6 bottom-2 opacity-10 text-8xl font-hieroglyphs pointer-events-none select-none text-amber-300 hidden md:block">
          𓏞 𓊵 𓋹 𓇳 𓆓 𓅓
        </div>
      </div>

      {/* Suggested Topic Starter Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
            <span>أسئلة وموضوعات مقترحة لبدء الحوار مع المعلم عمر:</span>
          </span>
          <button
            onClick={() => handleSendMessage('أيها المعلم عمر سليم، اختبرني الآن بتمرين لغوي قصير وممتع في اللغة المصرية القديمة!', true)}
            className="text-amber-900 hover:text-amber-700 flex items-center gap-1 text-xs font-bold bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors border border-amber-300"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>اختبرني يا معلم عمر (تمرين تفاعلي) 🎯</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PREDEFINED_TUTOR_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSendMessage(topic.promptText)}
              disabled={isLoading}
              className="p-3 rounded-2xl bg-white border border-[#E8DFC9] hover:border-amber-500 hover:bg-amber-50/50 transition-all text-right shadow-2xs group flex items-start gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-950 flex items-center justify-center text-xl font-hieroglyphs shrink-0 group-hover:scale-105 transition-transform">
                {topic.glyphIcon}
              </span>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  {topic.categoryAr}
                </span>
                <span className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-900">
                  {topic.titleAr}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interaction Log Box */}
      <div className="bg-white rounded-3xl border border-[#E8DFC9] shadow-sm overflow-hidden flex flex-col min-h-[520px]">
        {/* Chat Control Header */}
        <div className="bg-[#FAF7F0] border-b border-[#E8DFC9] px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center font-hieroglyphs text-lg shadow-xs">
              𓏞
            </span>
            <div>
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>مجلس المعلم «عمر سليم»</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="متصل وجاهز للتعليم" />
              </div>
              <span className="text-[11px] text-stone-500">دار الوثائق وعلوم بيت الحياة (Per-Ankh)</span>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1 text-xs text-stone-600 hover:text-amber-900 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg transition-colors"
            title="بدء محادثة جديدة"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>لوح جديد</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[600px] bg-[#FAF7F0]/40">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            const isPlaying = activePlayingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {/* Scribe Avatar for Tutor */}
                {isTutor && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-800 to-amber-950 text-amber-200 flex items-center justify-center text-xl font-hieroglyphs shrink-0 shadow-sm border border-amber-600/40">
                    𓏞
                  </div>
                )}

                {/* Message Papyrus Balloon */}
                <div
                  className={`max-w-2xl rounded-3xl p-4 sm:p-5 space-y-3.5 shadow-2xs text-right leading-relaxed font-serif-ar ${
                    isTutor
                      ? 'bg-white border border-[#E8DFC9] text-stone-800'
                      : 'bg-amber-900 text-white rounded-br-xs'
                  }`}
                >
                  {/* Sender Name Bar */}
                  <div className="flex items-center justify-between text-[11px] border-b pb-2 border-stone-200/60">
                    <span className={`font-bold ${isTutor ? 'text-amber-900' : 'text-amber-200'}`}>
                      {isTutor ? 'المعلم عمر سليم (كاتب بيت الحياة)' : 'أنت (تلميذ الكاتب)'}
                    </span>
                    <span className={isTutor ? 'text-stone-400' : 'text-amber-200/70'}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Main Message Body */}
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Hieroglyphic Display Card if included in answer */}
                  {msg.hieroglyphsSample && (
                    <div className="p-3.5 rounded-2xl bg-[#F5EEDB] border border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3 text-stone-900">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-amber-800 block">
                          رموز هيروغليفية منتقاة:
                        </span>
                        <div className="text-2xl sm:text-3xl font-hieroglyphs text-amber-950 tracking-widest">
                          {msg.hieroglyphsSample}
                        </div>
                      </div>

                      {msg.gardinerCodes && msg.gardinerCodes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {msg.gardinerCodes.map((code) => (
                            <span
                              key={code}
                              className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-950 border border-amber-300"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Mini-Quiz Card if generated */}
                  {msg.quiz && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400/80 text-stone-900 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                        <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-700" />
                          <span>تمرين الكاتب التفاعلي (+{msg.quiz.pointsReward} نقطة)</span>
                        </span>
                        {msg.quiz.hieroglyphDisplay && (
                          <span className="text-2xl font-hieroglyphs text-amber-950 px-2 py-0.5 bg-white rounded border border-amber-300">
                            {msg.quiz.hieroglyphDisplay}
                          </span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-stone-900">
                        {msg.quiz.questionAr}
                      </div>

                      {/* Quiz Options */}
                      <div className="space-y-2">
                        {msg.quiz.options.map((opt) => {
                          const state = answeredQuizzes[msg.id];
                          const isSelected = state?.selectedOptId === opt.id;
                          const hasAnswered = !!state;

                          let btnStyle = 'bg-white hover:bg-amber-100/60 border-stone-200 text-stone-800';
                          if (hasAnswered) {
                            if (opt.isCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                            } else {
                              btnStyle = 'bg-white/50 border-stone-200 text-stone-400 opacity-70';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleAnswerQuiz(msg.id, msg.quiz!, opt.id)}
                              disabled={hasAnswered}
                              className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm text-right transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{opt.textAr}</span>
                              {hasAnswered && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Quiz Explanation Reveal */}
                      {answeredQuizzes[msg.id] && (
                        <div
                          className={`p-3 rounded-xl text-xs space-y-1 ${
                            answeredQuizzes[msg.id].isCorrect
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                              : 'bg-stone-100 border border-stone-300 text-stone-800'
                          }`}
                        >
                          <div className="font-bold">
                            {answeredQuizzes[msg.id].isCorrect ? 'أحسنت يا كاتب المستقبل! 🎉' : 'حاول التذكر في المرة القادمة!'}
                          </div>
                          <p>{msg.quiz.explanationAr}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scribe Action Buttons for Tutor Messages */}
                  {isTutor && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200/70 text-xs">
                      <button
                        onClick={() => handlePlayAudio(msg)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-amber-900 hover:bg-amber-100/80 transition-colors font-bold"
                        title="استمع إلى نطق المعلم عمر"
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                            <span>إيقاف الصوت</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                            <span>استمع للمعلم 🔊</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
                        title="نسخ الشرح"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isTutor && (
                  <div className="w-10 h-10 rounded-2xl bg-stone-800 text-amber-300 flex items-center justify-center text-sm font-bold shrink-0 shadow-sm border border-stone-700">
                    أنت
                  </div>
                )}
              </div>
            );
          })}

          {/* Scribe Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-10 h-10 rounded-2xl bg-amber-900 text-amber-200 flex items-center justify-center text-xl font-hieroglyphs shrink-0 shadow-sm animate-pulse">
                𓏞
              </div>
              <div className="bg-white border border-[#E8DFC9] p-4 rounded-3xl rounded-bl-xs text-xs text-stone-600 flex items-center gap-2 shadow-2xs font-serif-ar">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-700 animate-bounce" />
                <span className="inline-block w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-amber-700 animate-bounce [animation-delay:0.4s]" />
                <span>المعلم «عمر سليم» يغمّس قلم البوص في المداد الأحمر ويبحث في برديات بيت الحياة...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips Bar */}
        <div className="bg-[#FAF7F0] border-t border-[#E8DFC9] px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 font-bold whitespace-nowrap text-[11px]">
            اقتراحات سريعة:
          </span>
          <button
            onClick={() => handleSendMessage('ما هي الحروف الأحادية الـ 24 الأكثر استخداماً؟')}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-900 whitespace-nowrap transition-colors"
          >
            الحروف الأحادية 𓅓𓃀
          </button>
          <button
            onClick={() => handleSendMessage('كيف كان يكتب المصريون الأفعال والماضي؟')}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-900 whitespace-nowrap transition-colors"
          >
            الأفعال والماضي 𓂋𓂝
          </button>
          <button
            onClick={() => handleSendMessage('اختبرني يا معلم عمر في ترجمة نقش فرعوني!', true)}
            className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-bold hover:bg-amber-200 whitespace-nowrap transition-colors"
          >
            تحدي ترجمة جديد 🎯
          </button>
        </div>

        {/* Input Bar Form */}
        <div className="p-4 bg-white border-t border-[#E8DFC9]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب سؤالك للمعلم عمر سليم (عن الحروف، المعاني، القواعد، أو النقوش)..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-all font-serif-ar"
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`p-3 rounded-2xl text-white font-bold transition-all flex items-center justify-center shrink-0 shadow-sm ${
                isLoading || !inputText.trim()
                  ? 'bg-stone-300 cursor-not-allowed'
                  : 'bg-amber-900 hover:bg-amber-800 active:scale-95'
              }`}
              title="إرسال السؤال"
            >
              <Send className="w-5 h-5 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
