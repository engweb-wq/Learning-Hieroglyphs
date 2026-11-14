// Interactive Ancient Egyptian Sound Library & Web Audio Synthesizer

export type SoundInteractionProfile = 'balanced' | 'temple' | 'carving';

export type SoundEffectId =
  | 'chisel_limestone'
  | 'mallet_chisel_combo'
  | 'stone_polish'
  | 'temple_sistrum'
  | 'temple_gong'
  | 'stone_door_slide'
  | 'papyrus_rustle'
  | 'task_fanfare';

export interface SoundCatalogItem {
  id: SoundEffectId;
  titleAr: string;
  categoryAr: string;
  category: 'carving' | 'temple' | 'learning';
  descriptionAr: string;
  usageTriggerAr: string;
  hieroglyph: string;
}

export interface SoundSettings {
  enabled: boolean;
  volume: number; // 0 to 1
  profile: SoundInteractionProfile;
  ambientPlaying: boolean;
}

export const SOUND_LIBRARY_CATALOG: SoundCatalogItem[] = [
  {
    id: 'chisel_limestone',
    titleAr: 'طرق الإزميل البرونزي على الحجر',
    categoryAr: 'الحفر والنحت',
    category: 'carving',
    descriptionAr: 'نبرة معدنية حادة لإزميل النحات تعقبها شظايا احتكاك الحجر الجيري.',
    usageTriggerAr: 'يُشغَّل عند النقر على الأزرار أو نحت الرموز',
    hieroglyph: '𓍏'
  },
  {
    id: 'mallet_chisel_combo',
    titleAr: 'مطرقة الأكاسيا مع الإزميل',
    categoryAr: 'الحفر والنحت',
    category: 'carving',
    descriptionAr: 'ضربة مطرقة خشبية عميقة تتبعها رنة الإزميل في قلب الصخر.',
    usageTriggerAr: 'يُشغَّل عند النقش العميق وتركيب الكلمات',
    hieroglyph: '𓌋'
  },
  {
    id: 'stone_polish',
    titleAr: 'صقل الحجر برمل الكوارتز',
    categoryAr: 'الحفر والنحت',
    category: 'carving',
    descriptionAr: 'حفيف رملي ناعم يحاكي تنعيم اللوح الحجري بعد اكتمال النقش.',
    usageTriggerAr: 'يُشغَّل عند تنعيم اللوح أو مسح المسودة',
    hieroglyph: '𓈙'
  },
  {
    id: 'temple_sistrum',
    titleAr: 'شخشيخة المعبد (السستروم المقدس)',
    categoryAr: 'أجواء المعابد',
    category: 'temple',
    descriptionAr: 'رنين أقراص النحاس المتناغمة في أروقة معبد الكرنك ودندرة.',
    usageTriggerAr: 'يُشغَّل عند كشف التلميحات والانتقال بين العصور',
    hieroglyph: '𓏣'
  },
  {
    id: 'temple_gong',
    titleAr: 'جرس المعبد البرونزي العميق',
    categoryAr: 'أجواء المعابد',
    category: 'temple',
    descriptionAr: 'موجة برونزية دافئة ذات صدى طويل تحاكي قاعات الأعمدة الحجرية.',
    usageTriggerAr: 'يُشغَّل عند فتح القطع الأثرية والبرديات',
    hieroglyph: '𓉟'
  },
  {
    id: 'stone_door_slide',
    titleAr: 'انزلاق بوابة المعبد الحجرية',
    categoryAr: 'أجواء المعابد',
    category: 'temple',
    descriptionAr: 'هدير احتكاك الجرانيت عند انفتاح بوابة قدس الأقداس.',
    usageTriggerAr: 'يُشغَّل عند حل طلاسم المعبد أو الانتقال لمحور رئيسي',
    hieroglyph: '𓉐'
  },
  {
    id: 'papyrus_rustle',
    titleAr: 'حفيف لفافة البردي الملكي',
    categoryAr: 'مهام التعلم',
    category: 'learning',
    descriptionAr: 'همس ألياف البردي الجافة عند بسط المخطوطة أو قلب البطاقة.',
    usageTriggerAr: 'يُشغَّل عند تقليب البطاقات وتصفح الدروس',
    hieroglyph: '𓏛'
  },
  {
    id: 'task_fanfare',
    titleAr: 'ترنيمة إتمام المهمة التعليمية',
    categoryAr: 'مهام التعلم',
    category: 'learning',
    descriptionAr: 'تآلف خماسي مصري قديم مع رنين احتفالي عند إنجاز المهام وكسب النقاط.',
    usageTriggerAr: 'يُشغَّل تلقائياً عند إتمام الدروس والألغاز والاختبارات',
    hieroglyph: '𓋹'
  }
];

const SETTINGS_STORAGE_KEY = 'egyptian_scribe_sound_settings_v1';

class SoundFXManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private settings: SoundSettings;
  private listeners: Set<(settings: SoundSettings) => void> = new Set();
  private lastPlayedAt: Record<string, number> = {};

  // Ambient Temple Soundscape nodes
  private ambientNodes: {
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    windNoise: AudioBufferSourceNode;
    ambientGain: GainNode;
    shimmerTimer: ReturnType<typeof setInterval>;
  } | null = null;

  constructor() {
    this.settings = this.loadSettings();
  }

  private loadSettings(): SoundSettings {
    const defaults: SoundSettings = {
      enabled: true,
      volume: 0.72,
      profile: 'balanced',
      ambientPlaying: false
    };
    if (typeof window === 'undefined') return defaults;
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : true,
          volume: typeof parsed.volume === 'number' ? Math.max(0, Math.min(1, parsed.volume)) : 0.72,
          profile:
            parsed.profile === 'temple' || parsed.profile === 'carving' || parsed.profile === 'balanced'
              ? parsed.profile
              : 'balanced',
          ambientPlaying: false // always start ambient paused on fresh page load
        };
      }
    } catch {
      // ignore storage failure
    }
    return defaults;
  }

  private saveSettings() {
    if (typeof window === 'undefined') return;
    try {
      const toStore = {
        enabled: this.settings.enabled,
        volume: this.settings.volume,
        profile: this.settings.profile
      };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // ignore
    }
  }

  private notify() {
    const snapshot = { ...this.settings };
    this.listeners.forEach((fn) => fn(snapshot));
  }

  public subscribe(listener: (settings: SoundSettings) => void): () => void {
    this.listeners.add(listener);
    listener({ ...this.settings });
    return () => this.listeners.delete(listener);
  }

  public getSettings(): SoundSettings {
    return { ...this.settings };
  }

  public setEnabled(enabled: boolean) {
    this.settings.enabled = enabled;
    if (!enabled && this.settings.ambientPlaying) {
      this.stopAmbientTemple();
    }
    this.syncMasterGain();
    this.saveSettings();
    this.notify();
  }

  public setVolume(volume: number) {
    this.settings.volume = Math.max(0, Math.min(1, volume));
    this.syncMasterGain();
    this.saveSettings();
    this.notify();
  }

  public setProfile(profile: SoundInteractionProfile) {
    this.settings.profile = profile;
    this.saveSettings();
    this.notify();
    if (this.settings.enabled) {
      this.playInteractiveButtonSound(true);
    }
  }

  private syncMasterGain() {
    if (!this.ctx || !this.masterGain) return;
    const targetGain = this.settings.enabled ? this.settings.volume : 0;
    this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.02);
  }

  private getContextAndOutput(): { ctx: AudioContext; out: AudioNode } | null {
    if (!this.settings.enabled) return null;
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.settings.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (!this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.settings.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    return { ctx: this.ctx, out: this.masterGain };
  }

  private shouldThrottle(key: string, minIntervalMs: number): boolean {
    const now = performance.now();
    const last = this.lastPlayedAt[key] || 0;
    if (now - last < minIntervalMs) return true;
    this.lastPlayedAt[key] = now;
    return false;
  }

  /**
   * Adaptive UI interaction sound triggered on button clicks across learning views
   */
  public playInteractiveButtonSound(force = false) {
    if (!this.settings.enabled) return;
    if (!force && this.shouldThrottle('ui_btn', 85)) return;

    if (this.settings.profile === 'carving') {
      this.playStoneTap();
    } else if (this.settings.profile === 'temple') {
      this.playSistrumTouch();
    } else {
      // Balanced alternates softly between gentle stone chisel touch and reed tap
      this.playClickSound();
    }
  }

  /**
   * Play any catalogued sound by ID (used by Interactive Sound Library studio)
   */
  public playSoundById(id: SoundEffectId) {
    switch (id) {
      case 'chisel_limestone':
        this.playChiselStrike('limestone');
        break;
      case 'mallet_chisel_combo':
        this.playChiselAndMalletCombo('sandstone');
        break;
      case 'stone_polish':
        this.playStonePolish();
        break;
      case 'temple_sistrum':
        this.playSistrumShake();
        break;
      case 'temple_gong':
        this.playTempleGong();
        break;
      case 'stone_door_slide':
        this.playStoneDoorSlide();
        break;
      case 'papyrus_rustle':
        this.playPapyrusRustle();
        break;
      case 'task_fanfare':
        this.playTaskCompletedFanfare();
        break;
    }
  }

  // Subtle carved limestone tap for buttons in 'carving' mode
  public playStoneTap() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1180, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.045);

      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(out);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Subtle sistrum metallic shimmer for buttons in 'temple' mode
  public playSistrumTouch() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      [1580, 2120].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.015);
        gain.gain.setValueAtTime(0.055, now + idx * 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(out);
        osc.start(now + idx * 0.015);
        osc.stop(now + 0.15);
      });
    } catch {
      // ignore
    }
  }

  // Full Sistrum Ritual Rattle (Ancient Egyptian temple percussion)
  public playSistrumShake() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const hits = [0, 0.07, 0.14, 0.22];
      hits.forEach((offset, idx) => {
        const t = now + offset;
        [1760, 2349, 3136].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq * (idx % 2 === 0 ? 1 : 1.03), t);
          gain.gain.setValueAtTime(0.07, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          osc.connect(gain);
          gain.connect(out);
          osc.start(t);
          osc.stop(t + 0.19);
        });
      });
    } catch {
      // ignore
    }
  }

  // Deep Bronze Temple Gong
  public playTempleGong() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const partials = [
        { freq: 146.8, amp: 0.28, dur: 2.1 },
        { freq: 220.0, amp: 0.16, dur: 1.7 },
        { freq: 293.7, amp: 0.11, dur: 1.4 },
        { freq: 440.0, amp: 0.06, dur: 1.0 }
      ];
      partials.forEach((p) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);
        osc.frequency.exponentialRampToValueAtTime(p.freq * 0.985, now + p.dur);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(p.amp, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.dur);

        osc.connect(gain);
        gain.connect(out);
        osc.start(now);
        osc.stop(now + p.dur);
      });
    } catch {
      // ignore
    }
  }

  // Papyrus Scroll Rustle
  public playPapyrusRustle() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const duration = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1900, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      src.start(now);
      src.stop(now + duration);
    } catch {
      // ignore
    }
  }

  // Ancient Temple Sistrum / Bell Chime
  playAncientChime(freq = 520) {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(out);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Success Celebration Sound (with deduplication cooldown)
  playSuccessSound() {
    if (this.shouldThrottle('success_chime', 320)) return;
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(out);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // Layered Temple Task Completion Fanfare
  playTaskCompletedFanfare() {
    if (this.shouldThrottle('task_fanfare', 450)) return;
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const pentatonic = [392.0, 493.88, 587.33, 783.99, 987.77];
      pentatonic.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === pentatonic.length - 1 ? 'sine' : 'triangle';
        const t = now + idx * 0.075;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.connect(gain);
        gain.connect(out);
        osc.start(t);
        osc.stop(t + 0.56);
      });
    } catch {
      // ignore
    }
  }

  // Gentle Click / Reed Pen touch
  playClickSound() {
    if (this.shouldThrottle('click_fx', 55)) return;
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(out);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // Heavy Temple Stone Door Sliding Sound
  playStoneDoorSlide() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(45, ctx.currentTime + 1.2);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(75, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(out);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.2);
      osc2.stop(ctx.currentTime + 1.2);
    } catch {
      // ignore
    }
  }

  // Ancient Mystery Temple Rumble / Lock Mechanism Click
  playTempleRumble() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(out);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // ignore
    }
  }

  // Bronze Chisel Strike on Stone (Sharp metallic ring + stone fracture noise)
  playChiselStrike(stoneType: 'limestone' | 'sandstone' | 'granite' | 'basalt' = 'limestone') {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;

      const metallicOsc = ctx.createOscillator();
      const metallicGain = ctx.createGain();
      const baseFreq = stoneType === 'granite' || stoneType === 'basalt' ? 1850 : 1420;

      metallicOsc.type = 'triangle';
      metallicOsc.frequency.setValueAtTime(baseFreq, now);
      metallicOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.09);

      metallicGain.gain.setValueAtTime(0.22, now);
      metallicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      metallicOsc.connect(metallicGain);
      metallicGain.connect(out);
      metallicOsc.start(now);
      metallicOsc.stop(now + 0.1);

      const bufferSize = Math.floor(ctx.sampleRate * 0.07);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(stoneType === 'granite' ? 2400 : 1100, now);
      filter.Q.setValueAtTime(3.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.26, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(out);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  // Wooden Acacia Mallet Thud
  playMalletThud() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

      osc.connect(gain);
      gain.connect(out);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }

  // Authentic Combination: Mallet Striking Chisel into Stone
  playChiselAndMalletCombo(stoneType: 'limestone' | 'sandstone' | 'granite' | 'basalt' = 'limestone') {
    this.playMalletThud();
    this.playChiselStrike(stoneType);
  }

  // Smoothing & Polishing Stone with Quartz Sand
  playStonePolish() {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const bufferSize = Math.floor(ctx.sampleRate * 0.25);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(950, now + 0.12);
      filter.frequency.linearRampToValueAtTime(500, now + 0.25);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(out);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  /**
   * Continuous Meditative Ancient Temple Ambient Soundscape
   */
  public startAmbientTemple() {
    if (this.ambientNodes) return;
    if (!this.settings.enabled) {
      this.settings.enabled = true;
    }
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;

    try {
      const now = ctx.currentTime;
      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, now);
      ambientGain.gain.linearRampToValueAtTime(0.09, now + 1.2);
      ambientGain.connect(out);

      // Warm temple harmonic fifth drone (D2 + A2)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(73.42, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.0, now);

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(220, now);

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      droneFilter.connect(ambientGain);

      // Soft desert courtyard breeze (looped filtered pink-ish noise)
      const windLen = ctx.sampleRate * 3;
      const windBuf = ctx.createBuffer(1, windLen, ctx.sampleRate);
      const windData = windBuf.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < windLen; i++) {
        const white = Math.random() * 2 - 1;
        windData[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = windData[i];
      }

      const windNoise = ctx.createBufferSource();
      windNoise.buffer = windBuf;
      windNoise.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(360, now);
      windFilter.Q.setValueAtTime(1.4, now);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.28, now);

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(ambientGain);

      osc1.start(now);
      osc2.start(now);
      windNoise.start(now);

      // Subtle periodic distant temple bell shimmer every ~6.5 seconds
      const shimmerTimer = setInterval(() => {
        if (!this.settings.enabled || !this.settings.ambientPlaying) return;
        const notes = [440, 523.25, 587.33, 659.25];
        const picked = notes[Math.floor(Math.random() * notes.length)];
        this.playSistrumShimmerSoft(picked);
      }, 6500);

      this.ambientNodes = { osc1, osc2, windNoise, ambientGain, shimmerTimer };
      this.settings.ambientPlaying = true;
      this.notify();
    } catch {
      // ignore
    }
  }

  private playSistrumShimmerSoft(freq: number) {
    const audio = this.getContextAndOutput();
    if (!audio) return;
    const { ctx, out } = audio;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 2.4);
      osc.connect(gain);
      gain.connect(out);
      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // ignore
    }
  }

  public stopAmbientTemple() {
    if (!this.ambientNodes) {
      if (this.settings.ambientPlaying) {
        this.settings.ambientPlaying = false;
        this.notify();
      }
      return;
    }

    const { osc1, osc2, windNoise, ambientGain, shimmerTimer } = this.ambientNodes;
    clearInterval(shimmerTimer);
    try {
      if (this.ctx) {
        const now = this.ctx.currentTime;
        ambientGain.gain.setTargetAtTime(0.0001, now, 0.15);
      }
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
          windNoise.stop();
        } catch {
          // ignore
        }
      }, 300);
    } catch {
      // ignore
    }

    this.ambientNodes = null;
    this.settings.ambientPlaying = false;
    this.notify();
  }

  public toggleAmbientTemple() {
    if (this.settings.ambientPlaying) {
      this.stopAmbientTemple();
    } else {
      this.startAmbientTemple();
    }
  }

  // Speak Arabic text using Web Speech API
  speakArabic(text: string, rate = 0.9) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find((v) => v.lang.includes('ar-EG') || v.lang.startsWith('ar'));
      if (arVoice) {
        utterance.voice = arVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // fallback
    }
  }
}

export const soundFX = new SoundFXManager();
