import React, { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Hammer,
  Landmark,
  Sparkles,
  Play,
  Sliders,
  Radio,
  CheckCircle2,
  Music2
} from 'lucide-react';
import {
  soundFX,
  SOUND_LIBRARY_CATALOG,
  SoundEffectId,
  SoundInteractionProfile,
  SoundSettings
} from '../../utils/soundEffects';

type FilterCategory = 'all' | 'carving' | 'temple' | 'learning';

const PROFILE_OPTIONS: {
  id: SoundInteractionProfile;
  titleAr: string;
  subtitleAr: string;
  sampleDescriptionAr: string;
  hieroglyph: string;
}[] = [
  {
    id: 'balanced',
    titleAr: 'النمط المتوازن (افتراضي)',
    subtitleAr: 'نقرة قلم البوص الهادئة',
    sampleDescriptionAr: 'نقرة واضحة ومريحة عند التصفح، مع الحفاظ على المؤثرات الحجرية في الاستوديو.',
    hieroglyph: '𓏞'
  },
  {
    id: 'carving',
    titleAr: 'الحفر والنحت على الحجر',
    subtitleAr: 'إزميل برونزي على الحجر الجيري',
    sampleDescriptionAr: 'يحوّل كل نقرة على الأزرار التعليمية إلى ضربة إزميل خفيفة في ورشة النحات الملكي.',
    hieroglyph: '𓍏'
  },
  {
    id: 'temple',
    titleAr: 'أجواء المعابد القديمة',
    subtitleAr: 'رنين السستروم الفرعوني المقدس',
    sampleDescriptionAr: 'يضفي همس أقراص السستروم النحاسية على تفاعلاتك وكأنك في أروقة الكرنك.',
    hieroglyph: '𓏣'
  }
];

export const SoundLibraryStudio: React.FC = () => {
  const [settings, setSettings] = useState<SoundSettings>(soundFX.getSettings());
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [playingEffectId, setPlayingEffectId] = useState<SoundEffectId | null>(null);

  useEffect(() => {
    const unsubscribe = soundFX.subscribe(setSettings);
    return unsubscribe;
  }, []);

  const filteredEffects =
    activeCategory === 'all'
      ? SOUND_LIBRARY_CATALOG
      : SOUND_LIBRARY_CATALOG.filter((item) => item.category === activeCategory);

  const handlePlayCatalogItem = (id: SoundEffectId) => {
    if (!settings.enabled) {
      soundFX.setEnabled(true);
    }
    soundFX.playSoundById(id);
    setPlayingEffectId(id);
    window.setTimeout(() => {
      setPlayingEffectId((prev) => (prev === id ? null : prev));
    }, 950);
  };

  const volumePercent = Math.round(settings.volume * 100);

  return (
    <section className="space-y-8 text-right" dir="rtl">
      {/* Editorial Section Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#F5EEDB] via-[#FAF7F0] to-amber-50 border border-[#E8DFC9] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-amber-800 tracking-wider flex items-center gap-2">
              <Music2 className="w-4 h-4 text-amber-700" />
              <span>استوديو الصوتيات التفاعلي</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>محاكاة حية بتقنية Web Audio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
              المكتبة الصوتية لأجواء المعابد والحفر على الحجر
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif-ar">
              تعمل هذه المكتبة في الخلفية مع جميع مكونات المنصة: استمع لنقرات الإزميل أو رنين السستروم عند الضغط على الأزرار، واحتفل بنغمات المعبد التلقائية فور إتمام الدروس والألعاب والألغاز، أو شغّل أجواء المعبد الهادئة أثناء المذاكرة.
            </p>
          </div>

          {/* Master Audio Status & Controls Card */}
          <div className="bg-white border border-[#E8DFC9] rounded-2xl p-5 min-w-[280px] lg:min-w-[330px] shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {settings.enabled ? (
                  <Volume2 className="w-5 h-5 text-emerald-700" />
                ) : (
                  <VolumeX className="w-5 h-5 text-stone-400" />
                )}
                <div>
                  <div className="text-sm font-bold text-stone-900">
                    {settings.enabled ? 'المؤثرات الصوتية مفعّلة' : 'الصوت مكتوم حالياً'}
                  </div>
                  <div className="text-xs text-stone-500">
                    متصل تلقائياً بجميع الأزرار والمهام
                  </div>
                </div>
              </div>

              <button
                type="button"
                data-sound="none"
                onClick={() => {
                  const next = !settings.enabled;
                  soundFX.setEnabled(next);
                  if (next) {
                    soundFX.playInteractiveButtonSound(true);
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  settings.enabled
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                }`}
              >
                {settings.enabled ? 'إيقاف مؤقت' : 'تفعيل الصوت'}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-700" />
                  <span>مستوى شدة الصوت العام</span>
                </span>
                <span className="font-mono tabular-nums text-amber-900">{volumePercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={volumePercent}
                aria-label="مستوى شدة الصوت العام"
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  if (!settings.enabled && val > 0) {
                    soundFX.setEnabled(true);
                  }
                  soundFX.setVolume(val);
                }}
                className="w-full accent-amber-800 cursor-pointer"
              />
            </div>

            {/* Ambient Temple Soundscape Toggle */}
            <div className="pt-2 border-t border-stone-100">
              <button
                type="button"
                data-sound="none"
                onClick={() => soundFX.toggleAmbientTemple()}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-right transition-all ${
                  settings.ambientPlaying
                    ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-sm'
                    : 'bg-[#FAF7F0] hover:bg-amber-50 text-stone-800 border-[#E8DFC9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio
                    className={`w-4 h-4 shrink-0 ${
                      settings.ambientPlaying ? 'text-amber-300 animate-pulse' : 'text-amber-800'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold">
                      {settings.ambientPlaying
                        ? 'أجواء المعبد قيد التشغيل الآن'
                        : 'تشغيل أجواء المعبد الهادئة'}
                    </div>
                    <div
                      className={`text-[11px] ${
                        settings.ambientPlaying ? 'text-amber-200' : 'text-stone-500'
                      }`}
                    >
                      نسيم الفناء الحجري ورنين السستروم المتباعد للمذاكرة
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/10 shrink-0">
                  {settings.ambientPlaying ? 'إيقاف' : 'استماع'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction Profile Selector */}
      <div className="rounded-3xl bg-white border border-[#E8DFC9] p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display-eg">
              طابع التفاعل الصوتي للأزرار عبر المنصة
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              اختر الصوت الذي تسمعه تلقائياً عند الضغط على أي زر في الدروس والألعاب والقاموس
            </p>
          </div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>يُحفظ تفضيلك تلقائياً</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROFILE_OPTIONS.map((opt) => {
            const isSelected = settings.profile === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                data-sound="none"
                onClick={() => {
                  if (!settings.enabled) soundFX.setEnabled(true);
                  soundFX.setProfile(opt.id);
                }}
                className={`text-right rounded-2xl p-5 border transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50 border-amber-700 ring-1 ring-amber-700 shadow-xs'
                    : 'bg-[#FAF7F0]/70 hover:bg-[#FAF7F0] border-[#E8DFC9]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-stone-900">{opt.titleAr}</div>
                    <div className="text-xs font-semibold text-amber-800 mt-0.5">
                      {opt.subtitleAr}
                    </div>
                  </div>
                  <span className="font-hieroglyphs text-3xl text-amber-900 leading-none select-none">
                    {opt.hieroglyph}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{opt.sampleDescriptionAr}</p>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/70 text-xs font-bold">
                  <span className={isSelected ? 'text-emerald-800' : 'text-stone-500'}>
                    {isSelected ? 'النمط النشط حالياً ✓' : 'انقر للتجربة والتفعيل'}
                  </span>
                  <Play className="w-3.5 h-3.5 text-amber-800" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Soundboard Catalog Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display-eg">
              لوحة استعراض المؤثرات الصوتية الأصيلة (8 مؤثرات)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              استكشف كل مؤثر صوتي مُولَّد رقمياً واستمع لدوره داخل تجربة التعلم
            </p>
          </div>

          {/* Category Filter Bar */}
          <div className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F5EEDB] border border-[#E8DFC9] rounded-xl">
            {[
              { id: 'all' as FilterCategory, label: 'الكل (8)', icon: Sparkles },
              { id: 'carving' as FilterCategory, label: 'الحفر والنحت', icon: Hammer },
              { id: 'temple' as FilterCategory, label: 'أجواء المعابد', icon: Landmark },
              { id: 'learning' as FilterCategory, label: 'مهام التعلم', icon: Music2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEffects.map((item) => {
            const isPlaying = playingEffectId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all bg-white ${
                  isPlaying
                    ? 'border-amber-600 ring-2 ring-amber-400/50 shadow-md -translate-y-0.5'
                    : 'border-[#E8DFC9] hover:border-amber-400 shadow-xs'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-amber-800">{item.categoryAr}</span>
                    <span className="font-hieroglyphs text-3xl text-amber-900 leading-none select-none">
                      {item.hieroglyph}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 leading-snug">
                    {item.titleAr}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.descriptionAr}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="text-[11px] font-medium text-stone-500 leading-snug">
                    {item.usageTriggerAr}
                  </div>
                  <button
                    type="button"
                    data-sound="none"
                    onClick={() => handlePlayCatalogItem(item.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors ${
                      isPlaying
                        ? 'bg-emerald-700 text-white'
                        : 'bg-amber-800 hover:bg-amber-900 text-white'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isPlaying ? 'جارٍ التشغيل...' : 'تشغيل المؤثر'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
