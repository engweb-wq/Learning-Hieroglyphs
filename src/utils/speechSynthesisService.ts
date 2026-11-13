/**
 * ScribeAudioSynthesizer - Complete Web Audio & Speech Synthesis Service
 * Provides audio playback and phonetic speech synthesis for Ancient Egyptian Hieroglyphs
 * Supports multilingual pronunciation (Arabic, English, French, and pure Phonetic)
 */

import { ALPHABET_SPEECH_DATA, SpeechLanguage } from '../data/alphabetSpeechData';

export interface PlayAudioOptions {
  id?: string;
  mode?: 'kids' | 'adults' | 'word';
  lang?: SpeechLanguage;
  includeSampleWord?: boolean;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

class ScribeAudioSynthesizer {
  private audioCtx: AudioContext | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;
  private activeId: string | null = null;
  private currentLanguage: SpeechLanguage = 'ar';
  private listeners: Set<(id: string | null) => void> = new Set();

  constructor() {
    this.initVoices();
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const load = () => {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) {
        this.voicesLoaded = true;
      }
    };

    load();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  public subscribe(listener: (id: string | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private setActiveId(id: string | null) {
    this.activeId = id;
    this.listeners.forEach(fn => fn(id));
  }

  public getActiveId(): string | null {
    return this.activeId;
  }

  public isPlaying(id: string): boolean {
    return this.activeId === id;
  }

  public setPreferredLanguage(lang: SpeechLanguage) {
    this.currentLanguage = lang;
  }

  public getPreferredLanguage(): SpeechLanguage {
    return this.currentLanguage;
  }

  /**
   * Generates acoustic phonetic consonant articulatory burst via Web Audio API
   * Simulates the exact physical acoustic properties of the Egyptian phoneme
   */
  public playPhoneticAcoustic(arabicLetter: string, transliteration: string) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // 1. Ancient temple chime harmonic background
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(520, t);
      bellOsc.frequency.exponentialRampToValueAtTime(390, t + 0.5);
      bellGain.gain.setValueAtTime(0.12, t);
      bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);
      bellOsc.start(t);
      bellOsc.stop(t + 0.6);

      // 2. Consonant Formant Synthesis
      const letter = arabicLetter.trim();

      // Plosives (B, P, T, D, Q, K, G)
      if (['ب', 'پ', 'ت', 'د', 'ق', 'ك', 'ج', 'ط'].includes(letter)) {
        const popOsc = ctx.createOscillator();
        const popGain = ctx.createGain();
        popOsc.type = 'triangle';
        const baseFreq = ['ب', 'پ'].includes(letter) ? 180 : ['ق', 'ك'].includes(letter) ? 320 : 250;
        popOsc.frequency.setValueAtTime(baseFreq, t);
        popOsc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
        popGain.gain.setValueAtTime(0.25, t);
        popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        popOsc.connect(popGain);
        popGain.connect(ctx.destination);
        popOsc.start(t);
        popOsc.stop(t + 0.09);
      }
      // Nasals (M, N)
      else if (['م', 'ن'].includes(letter)) {
        const nasalOsc = ctx.createOscillator();
        const nasalGain = ctx.createGain();
        nasalOsc.type = 'sine';
        nasalOsc.frequency.setValueAtTime(letter === 'م' ? 220 : 280, t);
        nasalGain.gain.setValueAtTime(0.01, t);
        nasalGain.gain.linearRampToValueAtTime(0.2, t + 0.05);
        nasalGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        nasalOsc.connect(nasalGain);
        nasalGain.connect(ctx.destination);
        nasalOsc.start(t);
        nasalOsc.stop(t + 0.4);
      }
      // Fricatives (F, S, Z, Sh, Kh, H, Heth)
      else if (['ف', 'س', 'ز', 'ش', 'خ', 'خـ', 'ح', 'هـ'].includes(letter)) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        const freq = ['س', 'ز'].includes(letter) ? 1200 : ['ش'].includes(letter) ? 900 : 450;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      }
      // Trill (R)
      else if (letter === 'ر') {
        const trillOsc = ctx.createOscillator();
        const trillGain = ctx.createGain();
        trillOsc.type = 'triangle';
        trillOsc.frequency.setValueAtTime(260, t);
        trillGain.gain.setValueAtTime(0.2, t);
        trillGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        trillOsc.connect(trillGain);
        trillGain.connect(ctx.destination);
        trillOsc.start(t);
        trillOsc.stop(t + 0.35);
      }
      // Vowels & Glottals (Alef, Ayin, Yod, Waw)
      else {
        const vocalOsc = ctx.createOscillator();
        const vocalGain = ctx.createGain();
        vocalOsc.type = 'sine';
        vocalOsc.frequency.setValueAtTime(letter === 'ع' ? 190 : 330, t);
        vocalGain.gain.setValueAtTime(0.18, t);
        vocalGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        vocalOsc.connect(vocalGain);
        vocalGain.connect(ctx.destination);
        vocalOsc.start(t);
        vocalOsc.stop(t + 0.3);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Helper to select the best browser voice for a specific locale
   */
  private getBestVoiceForLocale(locale: string): SpeechSynthesisVoice | undefined {
    if (!this.voicesLoaded) {
      this.voices = window.speechSynthesis.getVoices();
    }
    const cleanLocale = locale.toLowerCase().split('-')[0];

    // Priority 1: Exact match (e.g. ar-EG, fr-FR, en-US)
    let matched = this.voices.find(v => v.lang.toLowerCase() === locale.toLowerCase());
    if (matched) return matched;

    // Priority 2: Prefix match (e.g. ar*, en*, fr*)
    matched = this.voices.find(v => v.lang.toLowerCase().startsWith(cleanLocale));
    if (matched) return matched;

    // Priority 3: Name match
    matched = this.voices.find(v => {
      const name = v.name.toLowerCase();
      if (cleanLocale === 'ar') return name.includes('arabic') || name.includes('maged') || name.includes('tarik') || name.includes('laila');
      if (cleanLocale === 'fr') return name.includes('french') || name.includes('français') || name.includes('thomas') || name.includes('audrey');
      if (cleanLocale === 'en') return name.includes('english') || name.includes('samantha') || name.includes('daniel') || name.includes('alex');
      return false;
    });

    return matched;
  }

  /**
   * Stop any currently ongoing speech synthesis
   */
  public stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.setActiveId(null);
  }

  /**
   * Speak hieroglyphic sign with phonetic precision and multilingual speech synthesis
   */
  public speakSign(sign: {
    id: string;
    arabicLetter: string;
    arabicSound: string;
    meaningAr: string;
    gardiner: string;
    transliteration: string;
    kidMnemonicAr?: string;
  }, options?: PlayAudioOptions) {
    this.stop();
    const id = options?.id || sign.id;
    this.setActiveId(id);

    // 1. Play phonetic acoustic formant & chime
    this.playPhoneticAcoustic(sign.arabicLetter, sign.transliteration);

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      options?.onEnd?.();
      this.setActiveId(null);
      return;
    }

    try {
      const targetLang = options?.lang || this.currentLanguage;
      const speechData = ALPHABET_SPEECH_DATA[sign.id];

      let speechText = '';
      let targetLocale = 'ar-EG';
      let speechRate = options?.rate || (options?.mode === 'kids' ? 0.95 : 0.9);
      let speechPitch = options?.pitch || (options?.mode === 'kids' ? 1.05 : 1.0);

      if (speechData) {
        if (targetLang === 'en') {
          targetLocale = 'en-US';
          speechText = options?.mode === 'kids'
            ? speechData.speechScripts.en_kids
            : speechData.speechScripts.en_adults;
        } else if (targetLang === 'fr') {
          targetLocale = 'fr-FR';
          speechText = options?.mode === 'kids'
            ? speechData.speechScripts.fr_kids
            : speechData.speechScripts.fr_adults;
        } else if (targetLang === 'phonetic') {
          targetLocale = 'ar-EG';
          speechRate = 0.85;
          speechText = speechData.speechScripts.phonetic;
        } else {
          // Default: Arabic
          targetLocale = 'ar-EG';
          speechText = options?.mode === 'kids'
            ? speechData.speechScripts.ar_kids
            : speechData.speechScripts.ar_adults;
        }
      } else {
        // Fallback for custom or non-uniliteral signs
        if (options?.mode === 'kids') {
          speechText = `حرف ${sign.arabicLetter}. صوته ${sign.arabicSound}. مثل ${sign.meaningAr}!`;
        } else {
          speechText = `حرف ${sign.arabicLetter}.. رمزه الأكاديمي ${sign.gardiner}.. ينطق ${sign.arabicSound}.. ويمثل ${sign.meaningAr}`;
        }
      }

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = targetLocale;
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;

      const voice = this.getBestVoiceForLocale(targetLocale);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onError?.(e);
      };

      // Slight delay so the opening bell / acoustic formant sounds crisp before speech starts
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 70);

    } catch (err) {
      this.setActiveId(null);
      options?.onError?.(err);
    }
  }

  /**
   * Dedicated method to pronounce only the sample word in ancient Egyptian
   */
  public speakSampleWord(signId: string, options?: PlayAudioOptions) {
    const speechData = ALPHABET_SPEECH_DATA[signId];
    if (!speechData) return;

    this.stop();
    const id = options?.id || `word-${signId}`;
    this.setActiveId(id);

    this.playPhoneticAcoustic(speechData.arabicLetter, speechData.transliteration);

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      options?.onEnd?.();
      this.setActiveId(null);
      return;
    }

    try {
      const targetLang = options?.lang || this.currentLanguage;
      let speechText = '';
      let targetLocale = 'ar-EG';

      if (targetLang === 'en') {
        targetLocale = 'en-US';
        speechText = `Egyptian word: ${speechData.sampleWord.readingEn}, transliterated as ${speechData.sampleWord.transliteration}, meaning: ${speechData.sampleWord.meaningEn}.`;
      } else if (targetLang === 'fr') {
        targetLocale = 'fr-FR';
        speechText = `Mot égyptien: ${speechData.sampleWord.readingFr}, translittéré ${speechData.sampleWord.transliteration}, signifiant: ${speechData.sampleWord.meaningFr}.`;
      } else {
        targetLocale = 'ar-EG';
        speechText = `كلمة مصرية قديمة: ${speechData.sampleWord.readingAr}.. ونقحرتها: ${speechData.sampleWord.transliteration}.. وتعني: ${speechData.sampleWord.meaningAr}.`;
      }

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = targetLocale;
      utterance.rate = 0.9;

      const voice = this.getBestVoiceForLocale(targetLocale);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onError?.(e);
      };

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 70);

    } catch (err) {
      this.setActiveId(null);
      options?.onError?.(err);
    }
  }

  /**
   * Speak freeform text with audio effects
   */
  public speakText(text: string, options?: PlayAudioOptions) {
    this.stop();
    const id = options?.id || 'text';
    this.setActiveId(id);

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      options?.onEnd?.();
      this.setActiveId(null);
      return;
    }

    try {
      const targetLang = options?.lang || 'ar';
      const targetLocale = targetLang === 'en' ? 'en-US' : targetLang === 'fr' ? 'fr-FR' : 'ar-EG';

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLocale;
      utterance.rate = options?.rate || 0.92;

      const voice = this.getBestVoiceForLocale(targetLocale);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (this.activeId === id) {
          this.setActiveId(null);
        }
        options?.onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      this.setActiveId(null);
      options?.onError?.(err);
    }
  }
}

export const scribeAudio = new ScribeAudioSynthesizer();
