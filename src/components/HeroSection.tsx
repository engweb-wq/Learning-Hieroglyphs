import React from 'react';
import { BookOpen, Sparkles, Languages, Users, Award, History, Scroll, Video, Trophy, Eye, GraduationCap, Hammer, Mic, Compass, Puzzle, BookOpenCheck, Volume2, Sun } from 'lucide-react';
import { AudienceMode } from '../types';

interface HeroSectionProps {
  currentMode: AudienceMode;
  onSelectMode: (mode: AudienceMode) => void;
  onStartCartouche: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentMode,
  onSelectMode,
  onStartCartouche,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#E8DFC9] bg-gradient-to-b from-[#F5EEDB] to-[#FAF7F0] pt-10 pb-12 sm:pt-14 sm:pb-16">
      {/* Subtle Egyptian decorative background accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none text-9xl font-hieroglyphs leading-none flex flex-wrap gap-12 overflow-hidden justify-center text-amber-950">
        𓋹 𓊵 𓄤 𓇳 𓌻 𓎟 𓉐 𓅓 𓃀 𓆑 𓈖 𓂋 𓈙 𓋹
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Clean unboxed category kicker without pill badge */}
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-amber-800 uppercase flex items-center gap-2">
              <span>حضارة 5000 عام حية في لساننا اليوم</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>لغة الفراعنة بين يديك</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-[1.25] tracking-tight font-display-eg text-balance">
              تعلم اللغة الهيروغليفية المصرية القديمة
              <span className="block mt-2 text-amber-800">
                واكتشف كلمات أجدادنا التي لا نزال ننطقها يومياً!
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl text-pretty font-serif-ar">
              منصة تفاعلية ممتعة ومبسطة مصممة خصيصاً للصغار والكبار معاً: استمع للنطق الصوتي الأصيل، ارسم الرموز بالفرشاة، اصنع خرطوشتك الملكية، وتعرف على الكلمات اليومية المشتركة مثل «فول مدمس»، «تاتا»، «كاني وماني»، و«وحوي يا وحوي».
            </p>

            {/* Mode selection segmented control in hero */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-stone-500 mb-2">اختر مسار التعلم المفضل لديك:</div>
              <div className="inline-flex p-1.5 bg-stone-200/80 rounded-xl border border-stone-300 gap-1.5 max-w-full overflow-x-auto">
                <button
                  onClick={() => onSelectMode('progress')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'progress'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>لوحة تقدم الكاتب 🏆</span>
                </button>

                <button
                  onClick={() => onSelectMode('dictionary')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'dictionary'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>القاموس المصور (50 كلمة)</span>
                </button>

                <button
                  onClick={() => onSelectMode('shared_roots')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'shared_roots'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Languages className="w-4 h-4 text-amber-300" />
                  <span>قاموس الجذور العربية</span>
                </button>

                <button
                  onClick={() => onSelectMode('video_dict')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'video_dict'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Video className="w-4 h-4 text-amber-300" />
                  <span>قاموس الفيديو التفاعلي 🎬</span>
                </button>

                <button
                  onClick={() => onSelectMode('scanner')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'scanner'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Eye className="w-4 h-4 text-amber-300" />
                  <span>ماسح النقوش 👁️</span>
                </button>

                <button
                  onClick={() => onSelectMode('tutor')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'tutor'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>المعلم عمر سليم 🎓</span>
                </button>

                <button
                  onClick={() => onSelectMode('stone_engraving')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'stone_engraving'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Hammer className="w-4 h-4 text-amber-300" />
                  <span>لوح النقش الحجري</span>
                </button>

                <button
                  onClick={() => onSelectMode('games')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'games'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>ألعاب التعلم التفاعلية</span>
                </button>

                <button
                  onClick={() => onSelectMode('pronunciation')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'pronunciation'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Mic className="w-4 h-4 text-amber-300" />
                  <span>تحدي النطق</span>
                </button>

                <button
                  onClick={() => onSelectMode('artifacts')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'artifacts'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>مستكشف القطع الأثرية</span>
                </button>

                <button
                  onClick={() => onSelectMode('riddles')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'riddles'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Puzzle className="w-4 h-4 text-amber-300" />
                  <span>ركن الألغاز اليومي</span>
                </button>

                <button
                  onClick={() => onSelectMode('grammar')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'grammar'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4 text-amber-300" />
                  <span>دليل القواعد المبسط</span>
                </button>

                <button
                  onClick={() => onSelectMode('sound_library')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'sound_library'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>المكتبة الصوتية</span>
                </button>

                <button
                  onClick={() => onSelectMode('rebirth_journey')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'rebirth_journey'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>رحلة البعث (كتاب الموتى)</span>
                </button>

                <button
                  onClick={() => onSelectMode('heritage')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'heritage'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Languages className="w-4 h-4 text-amber-300" />
                  <span>الكلمات الحية المشتركة</span>
                </button>

                <button
                  onClick={() => onSelectMode('timeline')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'timeline'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <History className="w-4 h-4 text-amber-300" />
                  <span>خريطة زمنية للغة</span>
                </button>

                <button
                  onClick={() => onSelectMode('timemachine')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'timemachine'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>آلة الزمن ⏳</span>
                </button>

                <button
                  onClick={() => onSelectMode('papyri')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'papyri'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Scroll className="w-4 h-4 text-amber-300" />
                  <span>معرض البرديات 📜</span>
                </button>

                <button
                  onClick={() => onSelectMode('kids')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'kids'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>عالم الصغار</span>
                </button>

                <button
                  onClick={() => onSelectMode('adults')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    currentMode === 'adults'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>أكاديمية الكبار</span>
                </button>
              </div>
            </div>

            {/* Quick Proof Metrics adjacent to claims */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E8DFC9]/70 text-right">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-mono tabular-nums">50</div>
                <div className="text-xs text-stone-600 font-medium">كلمة مصورة بالصوت</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-mono tabular-nums">3</div>
                <div className="text-xs text-stone-600 font-medium">ألعاب تفاعلية بنقاط ورتب</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-mono tabular-nums">35+</div>
                <div className="text-xs text-stone-600 font-medium">جذر مشترك مع لساننا العربي</div>
              </div>
            </div>

          </div>

          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-800/20 shadow-xl bg-amber-950">
              <img
                src="/src/assets/images/hero_hieroglyph_papyrus_1794200391875.jpg"
                alt="بردية مصرية قديمة منقوشة بالهيروغليفية والذهب واللازورد"
                className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-5 text-right">
                <span className="text-amber-300 font-hieroglyphs text-3xl mb-1">𓋹 𓊵 𓄤 𓆓 𓅓</span>
                <p className="text-white text-sm font-semibold font-serif-ar leading-snug">
                  «مَن قرأ الهيروغليفية استمع لنبض أجداده عبر آلاف السنين»
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-amber-200/80">
                  <span>بردية فرعونية ملكية مذهبة</span>
                  <button
                    onClick={onStartCartouche}
                    className="text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-md transition-colors"
                  >
                    جرّب كتابة اسمك الآن
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
