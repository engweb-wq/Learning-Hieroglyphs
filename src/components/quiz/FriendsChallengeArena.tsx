import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Swords, 
  Trophy, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Bot, 
  RotateCcw, 
  Share2, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { VERSUS_QUESTIONS, VersusQuestion } from '../../data/versusChallengeQuestions';
import { soundFX } from '../../utils/soundEffects';

interface PlayerInfo {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  isHost: boolean;
  isBot?: boolean;
  hasAnsweredCurrentRound?: boolean;
  lastRoundAnswerCorrect?: boolean;
}

type ChallengeTopic = 'glyphs' | 'heritage' | 'mixed';
type ArenaPhase = 'setup' | 'waiting' | 'countdown' | 'playing' | 'round_result' | 'game_over';

const AVATARS = [
  { icon: '𓇓', name: 'الفرعون الملكي' },
  { icon: '𓅃', name: 'صقر حورس' },
  { icon: '𓋹', name: 'مفتاح الحياة' },
  { icon: '𓅓', name: 'البومة الحكيمة' },
  { icon: '𓆑', name: 'حية الطريشة' },
  { icon: '𓀀', name: 'الكاتب الجالس' }
];

export const FriendsChallengeArena: React.FC = () => {
  // Setup state
  const [roomCode, setRoomCode] = useState<string>(() => `PHR-${Math.floor(100 + Math.random() * 900)}`);
  const [inputJoinCode, setInputJoinCode] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('الكاتب الماهر');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('𓇓');
  const [selectedTopic, setSelectedTopic] = useState<ChallengeTopic>('mixed');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Arena flow state
  const [phase, setPhase] = useState<ArenaPhase>('setup');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [countdownNum, setCountdownNum] = useState<number>(3);

  // Players
  const [myPlayer, setMyPlayer] = useState<PlayerInfo>({
    id: 'p1',
    name: 'أنا',
    avatar: '𓇓',
    score: 0,
    streak: 0,
    isHost: true
  });

  const [opponent, setOpponent] = useState<PlayerInfo | null>(null);

  // Active match data
  const [activeQuestions, setActiveQuestions] = useState<VersusQuestion[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(15);
  const [mySelectedOptionId, setMySelectedOptionId] = useState<string | null>(null);
  const [opponentSelectedOptionId, setOpponentSelectedOptionId] = useState<string | null>(null);
  const [roundWinnerNote, setRoundWinnerNote] = useState<string>('');

  // Timers & BroadcastChannel
  const roundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const botTimerRef = useRef<NodeJS.Timeout | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  const currentQ = activeQuestions[currentRoundIndex] || VERSUS_QUESTIONS[0];

  // Initialize BroadcastChannel for cross-tab multiplayer sync
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('scribe_versus_channel');
      broadcastChannelRef.current = channel;

      channel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.roomCode !== roomCode) return;

        switch (data.type) {
          case 'JOIN_LOBBY':
            if (data.senderId !== myPlayer.id) {
              setOpponent({
                id: data.senderId,
                name: data.playerName,
                avatar: data.playerAvatar,
                score: 0,
                streak: 0,
                isHost: false,
                isBot: false
              });
              soundFX.playSuccessSound();

              // If I am host, reply with ACK
              channel.postMessage({
                type: 'LOBBY_ACK',
                roomCode,
                senderId: myPlayer.id,
                playerName: myPlayer.name,
                playerAvatar: myPlayer.avatar,
                selectedTopic,
                questionCount
              });
            }
            break;

          case 'LOBBY_ACK':
            if (data.senderId !== myPlayer.id) {
              setOpponent({
                id: data.senderId,
                name: data.playerName,
                avatar: data.playerAvatar,
                score: 0,
                streak: 0,
                isHost: true,
                isBot: false
              });
              setSelectedTopic(data.selectedTopic || 'mixed');
              setQuestionCount(data.questionCount || 5);
              setPhase('waiting');
            }
            break;

          case 'START_MATCH':
            if (data.questions && data.questions.length > 0) {
              setActiveQuestions(data.questions);
              startCountdown();
            }
            break;

          case 'OPPONENT_ANSWER':
            if (data.senderId !== myPlayer.id) {
              setOpponent(prev => prev ? {
                ...prev,
                hasAnsweredCurrentRound: true,
                score: data.newScore,
                streak: data.newStreak,
                lastRoundAnswerCorrect: data.isCorrect
              } : null);
              setOpponentSelectedOptionId(data.optionId);
            }
            break;

          case 'REMATCH_TRIGGER':
            resetToLobby();
            break;
        }
      };

      return () => {
        channel.close();
      };
    }
  }, [roomCode, myPlayer.id, myPlayer.name, myPlayer.avatar, selectedTopic, questionCount]);

  // Round countdown timer
  useEffect(() => {
    if (phase === 'playing') {
      roundTimerRef.current = setInterval(() => {
        setTimeLeftSec((prev) => {
          if (prev <= 1) {
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (roundTimerRef.current) {
      clearInterval(roundTimerRef.current);
    }

    return () => {
      if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    };
  }, [phase, currentRoundIndex]);

  // Simulated smart bot answering behavior when opponent is a bot
  useEffect(() => {
    if (phase === 'playing' && opponent?.isBot && !opponent.hasAnsweredCurrentRound) {
      const botDelayMs = 2500 + Math.random() * 5000; // answers in 2.5 - 7.5 seconds
      botTimerRef.current = setTimeout(() => {
        const correctOpt = currentQ.options.find(o => o.isCorrect);
        // 80% chance bot is correct
        const willBeCorrect = Math.random() < 0.8;
        const chosen = willBeCorrect 
          ? correctOpt 
          : currentQ.options.find(o => !o.isCorrect) || correctOpt;

        const ptsEarned = willBeCorrect ? 25 + Math.floor(Math.random() * 10) : 0;

        setOpponent(prev => prev ? {
          ...prev,
          hasAnsweredCurrentRound: true,
          score: prev.score + ptsEarned,
          streak: willBeCorrect ? prev.streak + 1 : 0,
          lastRoundAnswerCorrect: willBeCorrect
        } : null);

        if (chosen) {
          setOpponentSelectedOptionId(chosen.id);
        }
      }, botDelayMs);
    }

    return () => {
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
    };
  }, [phase, currentRoundIndex, opponent?.isBot, currentQ]);

  // Handle when 15 seconds expire
  const handleTimeExpired = () => {
    if (!mySelectedOptionId) {
      soundFX.playClickSound();
    }
    finishRound();
  };

  const handleCreateRoom = () => {
    soundFX.playAncientChime(520);
    setMyPlayer({
      id: `p-${Date.now()}`,
      name: playerName.trim() || 'الكاتب الأول',
      avatar: selectedAvatar,
      score: 0,
      streak: 0,
      isHost: true
    });
    setPhase('waiting');

    // Broadcast room presence
    broadcastChannelRef.current?.postMessage({
      type: 'ROOM_CREATED',
      roomCode
    });
  };

  const handleJoinExistingRoom = () => {
    const code = inputJoinCode.trim().toUpperCase();
    if (!code) return;

    soundFX.playAncientChime(520);
    setRoomCode(code);
    const newId = `p-${Date.now()}`;
    setMyPlayer({
      id: newId,
      name: playerName.trim() || 'صديق الكاتب',
      avatar: selectedAvatar,
      score: 0,
      streak: 0,
      isHost: false
    });

    // Broadcast join message to find host
    broadcastChannelRef.current?.postMessage({
      type: 'JOIN_LOBBY',
      roomCode: code,
      senderId: newId,
      playerName: playerName.trim() || 'صديق الكاتب',
      playerAvatar: selectedAvatar
    });

    setPhase('waiting');
  };

  const handleAddSmartBotOpponent = () => {
    soundFX.playAncientChime(640);
    setOpponent({
      id: 'bot-amenhotep',
      name: 'الكاتب أمنحتب الحكيم',
      avatar: '𓀀',
      score: 0,
      streak: 0,
      isHost: false,
      isBot: true
    });
  };

  const handleCopyInvite = () => {
    soundFX.playClickSound();
    const shareText = `انضم إلي في تحدي الكتبة الفراعنة! رمز الغرفة: ${roomCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleStartMatch = () => {
    soundFX.playSuccessSound();

    // Select questions according to chosen topic
    let pool = VERSUS_QUESTIONS;
    if (selectedTopic === 'glyphs') {
      pool = VERSUS_QUESTIONS.filter(q => q.type === 'glyphs');
    } else if (selectedTopic === 'heritage') {
      pool = VERSUS_QUESTIONS.filter(q => q.type === 'heritage');
    }

    // Shuffle and pick questionCount
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setActiveQuestions(shuffled);

    // Notify connected opponent
    broadcastChannelRef.current?.postMessage({
      type: 'START_MATCH',
      roomCode,
      questions: shuffled
    });

    startCountdown();
  };

  const startCountdown = () => {
    setPhase('countdown');
    setCountdownNum(3);
    soundFX.playClickSound();

    const timer = setInterval(() => {
      setCountdownNum((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          launchRound(0);
          return 0;
        }
        soundFX.playClickSound();
        return prev - 1;
      });
    }, 900);
  };

  const launchRound = (index: number) => {
    setCurrentRoundIndex(index);
    setTimeLeftSec(15);
    setMySelectedOptionId(null);
    setOpponentSelectedOptionId(null);
    setPhase('playing');
    setRoundWinnerNote('');

    setMyPlayer(prev => ({ ...prev, hasAnsweredCurrentRound: false, lastRoundAnswerCorrect: undefined }));
    setOpponent(prev => prev ? ({ ...prev, hasAnsweredCurrentRound: false, lastRoundAnswerCorrect: undefined }) : null);
  };

  const handleChooseOption = (optionId: string) => {
    if (mySelectedOptionId || phase !== 'playing') return;

    soundFX.playClickSound();
    setMySelectedOptionId(optionId);

    const isCorrect = currentQ.options.find(o => o.id === optionId)?.isCorrect || false;
    const speedBonus = isCorrect ? Math.floor(timeLeftSec * 1.2) : 0;
    const pointsGained = isCorrect ? 25 + speedBonus : 0;

    const newScore = myPlayer.score + pointsGained;
    const newStreak = isCorrect ? myPlayer.streak + 1 : 0;

    if (isCorrect) {
      soundFX.playSuccessSound();
    }

    setMyPlayer(prev => ({
      ...prev,
      score: newScore,
      streak: newStreak,
      hasAnsweredCurrentRound: true,
      lastRoundAnswerCorrect: isCorrect
    }));

    // Broadcast answer to opponent
    broadcastChannelRef.current?.postMessage({
      type: 'OPPONENT_ANSWER',
      roomCode,
      senderId: myPlayer.id,
      optionId,
      isCorrect,
      newScore,
      newStreak
    });

    // If opponent already answered or is bot, we can finish round shortly
    setTimeout(() => {
      finishRound();
    }, 1200);
  };

  const finishRound = () => {
    setPhase('round_result');

    setTimeout(() => {
      if (currentRoundIndex + 1 < activeQuestions.length) {
        launchRound(currentRoundIndex + 1);
      } else {
        // Match Finished
        setPhase('game_over');
        soundFX.playSuccessSound();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      }
    }, 2800);
  };

  const resetToLobby = () => {
    setPhase('waiting');
    setMyPlayer(prev => ({ ...prev, score: 0, streak: 0, hasAnsweredCurrentRound: false }));
    setOpponent(prev => prev ? ({ ...prev, score: 0, streak: 0, hasAnsweredCurrentRound: false }) : null);
    setCurrentRoundIndex(0);
    setMySelectedOptionId(null);
  };

  const handleRematch = () => {
    soundFX.playAncientChime(520);
    broadcastChannelRef.current?.postMessage({
      type: 'REMATCH_TRIGGER',
      roomCode
    });
    resetToLobby();
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* PHASE 1: SETUP (Create / Join Room) */}
      {phase === 'setup' && (
        <div className="bg-[#FAF6ED] border-2 border-amber-800/30 rounded-3xl p-6 sm:p-8 space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 justify-end">
                <Swords className="w-4 h-4 text-amber-700" />
                <span>حلبة مبارزة الكتبة (Scribe Versus Arena)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
                أنشئ غرفة تنافسية وتحدَّ أصدقاءك في الهيروغليفية!
              </h3>
            </div>
            
            <div className="px-3.5 py-1.5 bg-amber-100 rounded-xl border border-amber-300 text-xs font-mono font-bold text-amber-950">
              رمز الغرفة المقترح: {roomCode}
            </div>
          </div>

          {/* Player Profile Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Player Name & Avatar Picker */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-4 shadow-2xs">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">لقبك أو اسمك في المبارزة:</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="اكتب اسمك هنا..."
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700">اختر شعارك الملكي (الختم):</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av.icon}
                      onClick={() => {
                        soundFX.playClickSound();
                        setSelectedAvatar(av.icon);
                      }}
                      className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                        selectedAvatar === av.icon
                          ? 'bg-amber-900 text-white border-amber-950 ring-2 ring-amber-400 scale-105 shadow-xs'
                          : 'bg-stone-50 hover:bg-amber-50 text-stone-900 border-stone-200'
                      }`}
                      title={av.name}
                    >
                      <span className="font-hieroglyphs text-2xl">{av.icon}</span>
                      <span className="text-[10px] truncate max-w-full mt-1 font-medium">{av.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Options & Topic Picker */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-4 shadow-2xs">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700">موضوع المنافسة:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedTopic('glyphs')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedTopic === 'glyphs'
                        ? 'bg-amber-900 text-white border-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 text-xs'
                    }`}
                  >
                    <span className="block font-hieroglyphs text-xl mb-1">𓋹 𓅓</span>
                    <span className="text-xs">ترجمة الرموز</span>
                  </button>

                  <button
                    onClick={() => setSelectedTopic('heritage')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedTopic === 'heritage'
                        ? 'bg-amber-900 text-white border-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 text-xs'
                    }`}
                  >
                    <span className="block text-base mb-1">🌱 🍲</span>
                    <span className="text-xs">الكلمات المشتركة</span>
                  </button>

                  <button
                    onClick={() => setSelectedTopic('mixed')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedTopic === 'mixed'
                        ? 'bg-amber-900 text-white border-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 text-xs'
                    }`}
                  >
                    <span className="block text-base mb-1">⚡ 📜</span>
                    <span className="text-xs">التحدي الشامل</span>
                  </button>
                </div>
              </div>

              {/* Number of questions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">عدد جولات التحدي:</label>
                <div className="flex gap-2">
                  {[5, 10].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        questionCount === cnt ? 'bg-amber-800 text-white border-amber-900' : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {cnt} أسئلة سريعة (15 ثانية لكل سؤال)
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Action Choice: Create Room vs Join Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Create Room Button */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-900 to-stone-900 text-white space-y-3 shadow-md flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base font-display-eg text-amber-200">
                  خيار 1: أنشئ غرفة جديدة وادعُ صديقاً
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  احصل على رمز الغرفة فوراً وشاركه مع صديقك ليخوض التحدي معك في نفس اللحظة.
                </p>
              </div>
              <button
                onClick={handleCreateRoom}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>إنشاء غرفة التحدي ({roomCode})</span>
              </button>
            </div>

            {/* Join Existing Room */}
            <div className="p-5 rounded-2xl bg-white border-2 border-stone-200 space-y-3 flex flex-col justify-between shadow-2xs">
              <div>
                <h4 className="font-bold text-base font-display-eg text-stone-900">
                  خيار 2: انضم لغرفة صديق موجودة
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  أدخل رمز الغرفة الذي أرسله لك صديقك (مثل PHR-782).
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="رمز الغرفة (مثال: PHR-123)"
                  value={inputJoinCode}
                  onChange={(e) => setInputJoinCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm font-mono uppercase bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button
                  onClick={handleJoinExistingRoom}
                  disabled={!inputJoinCode.trim()}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
                >
                  انضم الآن
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* PHASE 2: WAITING LOBBY */}
      {phase === 'waiting' && (
        <div className="bg-[#FAF6ED] border-2 border-amber-800/30 rounded-3xl p-6 sm:p-8 space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>غرفة الانتظار الملكية</span>
              </span>
              <h3 className="text-2xl font-extrabold text-stone-900 font-display-eg">
                رمز الغرفة: <span className="text-amber-900 font-mono tracking-wider">{roomCode}</span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyInvite}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-xs font-bold text-stone-800 transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-700" />}
                <span>{copiedLink ? 'تم نسخ رمز الغرفة!' : 'نسخ رمز الغرفة'}</span>
              </button>
            </div>
          </div>

          {/* Versus Player Matchup Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Player 1 (Me) */}
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-700 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-hieroglyphs text-4xl text-amber-950 shrink-0 shadow-inner">
                {myPlayer.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-800 text-white text-[10px] font-bold">
                    {myPlayer.isHost ? 'منشئ الغرفة' : 'المتحدي'}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    جاهز للمنافسة
                  </span>
                </div>
                <h4 className="text-lg font-bold text-stone-900">{myPlayer.name}</h4>
                <div className="text-xs text-stone-500 font-serif-ar">مستعد لخوض التحدي</div>
              </div>
            </div>

            {/* Player 2 (Friend or Smart Bot) */}
            {opponent ? (
              <div className="bg-white p-6 rounded-2xl border-2 border-amber-700 shadow-sm flex items-center gap-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-hieroglyphs text-4xl text-amber-950 shrink-0 shadow-inner">
                  {opponent.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-700 text-white text-[10px] font-bold">
                      {opponent.isBot ? 'منافس ذكي (Bot)' : 'المتحدي الثاني'}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      انضم للغرفة
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">{opponent.name}</h4>
                  <div className="text-xs text-stone-500 font-serif-ar">جاهز لبدء المسابقة</div>
                </div>
              </div>
            ) : (
              <div className="bg-stone-50/80 p-6 rounded-2xl border-2 border-dashed border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-stone-200 flex items-center justify-center text-stone-400 text-2xl font-bold">
                    ?
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-stone-600">في انتظار انضمام صديقك...</div>
                    <div className="text-[11px] text-stone-400 font-mono">شارك الرمز {roomCode} في نافذة أخرى أو أرسله له</div>
                  </div>
                </div>

                <button
                  onClick={handleAddSmartBotOpponent}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 flex items-center gap-1.5 whitespace-nowrap transition-colors"
                >
                  <Bot className="w-4 h-4 text-amber-800" />
                  <span>تحدَّ الكاتب أمنحتب فوراً</span>
                </button>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-200">
            <button
              onClick={() => setPhase('setup')}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
            >
              <span>← تغيير إعدادات الغرفة</span>
            </button>

            <button
              disabled={!opponent}
              onClick={handleStartMatch}
              className="px-8 py-3 bg-amber-800 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>بدء جولات التحدي الآن!</span>
            </button>
          </div>

        </div>
      )}

      {/* PHASE 3: COUNTDOWN */}
      {phase === 'countdown' && (
        <div className="py-16 text-center space-y-4 bg-stone-950 text-white rounded-3xl p-8 border-4 border-amber-600/60 shadow-xl animate-fadeIn">
          <div className="text-xs font-bold text-amber-400 tracking-wider">
            استعد للمبارزة الفرعونية!
          </div>
          <div className="text-8xl sm:text-9xl font-extrabold text-amber-300 font-mono animate-bounce">
            {countdownNum}
          </div>
          <p className="text-sm text-stone-300 font-serif-ar">
            لديك 15 ثانية لكل سؤال.. الأسرع يحصل على نقاط مضاعفة!
          </p>
        </div>
      )}

      {/* PHASE 4: ACTIVE PLAYING ARENA */}
      {(phase === 'playing' || phase === 'round_result') && (
        <div className="bg-white border-2 border-amber-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-fadeIn">
          
          {/* Live Versus Scoreboard Header */}
          <div className="grid grid-cols-3 items-center bg-[#FAF6EE] p-4 rounded-2xl border border-amber-200">
            
            {/* Player 1 (Me) */}
            <div className="flex items-center gap-3">
              <span className="font-hieroglyphs text-3xl sm:text-4xl p-2 bg-amber-100 rounded-xl border border-amber-300 text-amber-950 shrink-0">
                {myPlayer.avatar}
              </span>
              <div>
                <div className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <span>{myPlayer.name}</span>
                  {myPlayer.streak > 1 && (
                    <span className="flex items-center text-[10px] text-amber-700 font-mono font-bold bg-amber-200/60 px-1 rounded">
                      <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                      {myPlayer.streak}
                    </span>
                  )}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono tabular-nums">
                  {myPlayer.score} نقطة
                </div>
                <div className="text-[10px] text-stone-500">
                  {myPlayer.hasAnsweredCurrentRound ? '✓ تم إرسال الإجابة' : 'يفكر...'}
                </div>
              </div>
            </div>

            {/* Center: Timer & Round Counter */}
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-stone-500">
                الجولة {currentRoundIndex + 1} من {activeQuestions.length}
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
                timeLeftSec <= 5 ? 'text-rose-600 animate-pulse' : 'text-amber-950'
              }`}>
                {timeLeftSec}s
              </div>
              <div className="w-20 mx-auto h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-1000 rounded-full"
                  style={{ width: `${(timeLeftSec / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Player 2 (Opponent) */}
            <div className="flex items-center gap-3 justify-end text-left">
              <div className="text-right">
                <div className="text-xs font-bold text-stone-800 flex items-center justify-end gap-1">
                  {opponent && opponent.streak > 1 && (
                    <span className="flex items-center text-[10px] text-amber-700 font-mono font-bold bg-amber-200/60 px-1 rounded">
                      <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                      {opponent.streak}
                    </span>
                  )}
                  <span>{opponent?.name || 'المنافس'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono tabular-nums">
                  {opponent?.score || 0} نقطة
                </div>
                <div className="text-[10px] text-stone-500">
                  {opponent?.hasAnsweredCurrentRound ? '✓ تم إرسال الإجابة' : 'يفكر...'}
                </div>
              </div>
              <span className="font-hieroglyphs text-3xl sm:text-4xl p-2 bg-amber-100 rounded-xl border border-amber-300 text-amber-950 shrink-0">
                {opponent?.avatar || '𓀀'}
              </span>
            </div>

          </div>

          {/* Question Display Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FAF5E8] to-[#F5EEDB] border-2 border-amber-700/30 text-center space-y-4">
            
            {/* Glyph or Prompt Word Visual */}
            {currentQ.glyphDisplay && (
              <div className="flex justify-center">
                <span className="font-hieroglyphs text-7xl sm:text-8xl text-stone-900 p-4 bg-white/90 rounded-2xl border-2 border-amber-300 shadow-md">
                  {currentQ.glyphDisplay}
                </span>
              </div>
            )}

            {currentQ.promptWord && (
              <div className="inline-block px-5 py-2 rounded-xl bg-amber-900 text-amber-100 font-bold text-xl sm:text-2xl shadow-xs">
                «{currentQ.promptWord}»
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-ar leading-relaxed max-w-2xl mx-auto">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Interactive Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const isChosenByMe = mySelectedOptionId === opt.id;
              const isChosenByOpponent = opponentSelectedOptionId === opt.id;
              const isRoundEnded = phase === 'round_result';

              let style = 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800';

              if (isRoundEnded) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (isChosenByMe) {
                  style = 'bg-rose-50 border-rose-500 text-rose-950';
                } else {
                  style = 'bg-stone-50 border-stone-200 opacity-60';
                }
              } else if (isChosenByMe) {
                style = 'bg-amber-100 border-amber-700 text-amber-950 font-bold ring-2 ring-amber-500';
              }

              return (
                <button
                  key={opt.id}
                  disabled={Boolean(mySelectedOptionId) || isRoundEnded}
                  onClick={() => handleChooseOption(opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-right flex items-center justify-between text-xs sm:text-sm ${style}`}
                >
                  <span className="font-medium leading-snug">{opt.text}</span>
                  
                  {/* Status indicators */}
                  <div className="flex items-center gap-1 shrink-0 mr-2">
                    {isChosenByMe && (
                      <span className="text-[10px] bg-amber-800 text-white px-2 py-0.5 rounded font-bold">
                        إجابتك
                      </span>
                    )}
                    {isRoundEnded && isChosenByOpponent && (
                      <span className="text-[10px] bg-stone-700 text-white px-2 py-0.5 rounded font-bold">
                        المنافس
                      </span>
                    )}
                    {isRoundEnded && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Round Result Explanation Card */}
          {phase === 'round_result' && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>الشرح اللغوي والتأثيلي:</span>
                </span>
                <span className="text-[11px] text-stone-500 font-mono">الانتقال للجولة التالية...</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 font-serif-ar leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

        </div>
      )}

      {/* PHASE 5: GAME OVER / VICTORY PODIUM */}
      {phase === 'game_over' && (
        <div className="bg-[#FAF6ED] border-4 border-amber-800/40 rounded-3xl p-8 sm:p-12 text-center space-y-8 animate-fadeIn">
          
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-900 flex items-center justify-center mx-auto text-4xl shadow-md">
              👑
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display-eg">
              {myPlayer.score > (opponent?.score || 0)
                ? 'مبروك! فزت بلقب كاتب مصر الأول 🏆'
                : myPlayer.score === (opponent?.score || 0)
                ? 'تعادل مذهل بين كبار كتبة دار الحياة! ⚖️'
                : `فاز ${opponent?.name || 'المنافس'} في هذه الجولة الحماسية! 📜`}
            </h3>

            <p className="text-sm text-stone-600 max-w-md mx-auto font-serif-ar">
              مبارزة تاريخية مشرفة في معرفة الرموز الهيروغليفية والكلمات المصرية المتوارثة عبر الأجيال.
            </p>
          </div>

          {/* Final Score Comparison Podium */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            
            {/* Me */}
            <div className={`p-5 rounded-2xl border-2 text-center space-y-2 ${
              myPlayer.score >= (opponent?.score || 0)
                ? 'bg-amber-100/90 border-amber-700 shadow-md ring-2 ring-amber-400'
                : 'bg-white border-stone-200'
            }`}>
              <div className="font-hieroglyphs text-3xl text-amber-950">{myPlayer.avatar}</div>
              <div className="font-bold text-sm text-stone-900">{myPlayer.name}</div>
              <div className="text-3xl font-extrabold font-mono text-amber-900 tabular-nums">
                {myPlayer.score}
              </div>
              <div className="text-[11px] font-bold text-amber-800">
                {myPlayer.score >= (opponent?.score || 0) ? 'الفائز باللقب' : 'الوصيف الملكي'}
              </div>
            </div>

            {/* Opponent */}
            <div className={`p-5 rounded-2xl border-2 text-center space-y-2 ${
              (opponent?.score || 0) >= myPlayer.score
                ? 'bg-amber-100/90 border-amber-700 shadow-md ring-2 ring-amber-400'
                : 'bg-white border-stone-200'
            }`}>
              <div className="font-hieroglyphs text-3xl text-amber-950">{opponent?.avatar || '𓀀'}</div>
              <div className="font-bold text-sm text-stone-900">{opponent?.name || 'المنافس'}</div>
              <div className="text-3xl font-extrabold font-mono text-amber-900 tabular-nums">
                {opponent?.score || 0}
              </div>
              <div className="text-[11px] font-bold text-amber-800">
                {(opponent?.score || 0) >= myPlayer.score ? 'الفائز باللقب' : 'الوصيف الملكي'}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRematch}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>مباراة ثأرية جديدة بنفس الغرفة</span>
            </button>

            <button
              onClick={() => setPhase('setup')}
              className="px-6 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-sm rounded-xl transition-colors"
            >
              إنشاء غرفة جديدة تماماً
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
