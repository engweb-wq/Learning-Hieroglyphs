import React, { useState, useEffect, useRef } from 'react';
import {
  Hammer,
  Volume2,
  VolumeX,
  RotateCcw,
  Undo2,
  Download,
  Sun,
  Grid,
  Sparkles,
  Flame,
  Eye,
  Trash2,
  Type,
  Layers
} from 'lucide-react';
import {
  UNILITERAL_HIEROGLYPHS,
  convertNameToHieroglyphs
} from '../../data/hieroglyphsData';
import { StoneType } from '../../data/stoneCarvingData';
import { soundFX } from '../../utils/soundEffects';
import { scribeAudio } from '../../utils/speechSynthesisService';
import { studentProgress } from '../../utils/studentProgressService';

type ReliefStyle = 'sunken' | 'raised' | 'gold';
type PaletteTab = 'alphabet' | 'sacred' | 'arabic_word';

interface EngravingGlyphItem {
  id: string;
  char: string;
  gardiner: string;
  meaningAr: string;
  pronunciationAr: string;
}

interface CarvedMark {
  id: string;
  xPercent: number;
  yPercent: number;
  char: string;
  gardiner: string;
  meaningAr: string;
  pronunciationAr: string;
  depth: 1 | 2 | 3; // Repeat clicks deepen relief carving
  relief: ReliefStyle;
  sizePx: number;
}

interface ImpactEffect {
  id: number;
  x: number;
  y: number;
  lightColor: string;
  rippleColor: string;
}

interface StoneParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isSpark: boolean;
  opacity: number;
}

const STONE_MATERIALS: Record<
  StoneType,
  {
    id: StoneType;
    nameAr: string;
    originAr: string;
    bgStyle: string;
    borderStyle: string;
    textBaseColor: string;
    highlightColor: string;
    shadowColor: string;
    dustColor: string;
    sparkColor: string;
    rippleColor: string;
    canvasFill: string;
  }
> = {
  limestone: {
    id: 'limestone',
    nameAr: 'الحجر الجيري (جيري طرة)',
    originAr: 'محاجر طرة والمعصرة',
    bgStyle: 'linear-gradient(145deg, #EFE9DA 0%, #E5DCC6 50%, #D9CEB4 100%)',
    borderStyle: '#C4B596',
    textBaseColor: '#6D5D43',
    highlightColor: '#FFFDF7',
    shadowColor: '#4A3D28',
    dustColor: '#F5EFE2',
    sparkColor: '#FBBF24',
    rippleColor: 'rgba(217, 119, 6, 0.75)',
    canvasFill: '#E6DEC8'
  },
  sandstone: {
    id: 'sandstone',
    nameAr: 'الحجر الرملي النوبي',
    originAr: 'جبل السلسلة والكرنك',
    bgStyle: 'linear-gradient(145deg, #DFBE8A 0%, #CEA366 52%, #BC8B4A 100%)',
    borderStyle: '#966A31',
    textBaseColor: '#5B3C14',
    highlightColor: '#FDE8C4',
    shadowColor: '#3A2306',
    dustColor: '#EBD1A5',
    sparkColor: '#FCD34D',
    rippleColor: 'rgba(245, 158, 11, 0.85)',
    canvasFill: '#CFA468'
  },
  granite: {
    id: 'granite',
    nameAr: 'الجرانيت الوردي (أسوان)',
    originAr: 'محاجر أسوان والمسلات',
    bgStyle: 'linear-gradient(145deg, #B57970 0%, #9E6158 55%, #844C44 100%)',
    borderStyle: '#65352E',
    textBaseColor: '#3F1D18',
    highlightColor: '#F0BDB5',
    shadowColor: '#210C09',
    dustColor: '#D69990',
    sparkColor: '#FEF08A',
    rippleColor: 'rgba(251, 191, 36, 0.9)',
    canvasFill: '#9B5F56'
  },
  basalt: {
    id: 'basalt',
    nameAr: 'البازلت الأسود الملكي',
    originAr: 'أبو رواش والفيوم',
    bgStyle: 'linear-gradient(145deg, #323236 0%, #232327 52%, #17171A 100%)',
    borderStyle: '#4B4B52',
    textBaseColor: '#7C7C85',
    highlightColor: '#D4D4D8',
    shadowColor: '#050507',
    dustColor: '#71717A',
    sparkColor: '#FDE047',
    rippleColor: 'rgba(250, 204, 21, 0.9)',
    canvasFill: '#242428'
  }
};

const SACRED_CARVING_SYMBOLS: EngravingGlyphItem[] = [
  { id: 'sac-ankh', char: '𓋹', gardiner: 'S34', meaningAr: 'عنخ (الحياة والخلود)', pronunciationAr: 'عنخ' },
  { id: 'sac-hotep', char: '𓊵', gardiner: 'R4', meaningAr: 'حتب (السلام والرضا)', pronunciationAr: 'حُتُب' },
  { id: 'sac-nefer', char: '𓄤', gardiner: 'F35', meaningAr: 'نفر (الجمال والكمال)', pronunciationAr: 'نِفِر' },
  { id: 'sac-ra', char: '𓇳', gardiner: 'N5', meaningAr: 'رع (الشمس والنور)', pronunciationAr: 'رَع' },
  { id: 'sac-wedjat', char: '𓂀', gardiner: 'D10', meaningAr: 'أوجات (عين حورس الحامية)', pronunciationAr: 'أوجات' },
  { id: 'sac-kheper', char: '𓆣', gardiner: 'L1', meaningAr: 'خبر (الجعران والتجدد)', pronunciationAr: 'خِپِر' },
  { id: 'sac-maat', char: '𓆄', gardiner: 'H6', meaningAr: 'ماعت (الحق والعدل)', pronunciationAr: 'مَاعَت' },
  { id: 'sac-neter', char: '𓊹', gardiner: 'R8', meaningAr: 'نثر (القداسة والطهارة)', pronunciationAr: 'نِتِر' },
  { id: 'sac-djed', char: '𓊽', gardiner: 'R11', meaningAr: 'جد (الثبات والعمود الفقري)', pronunciationAr: 'جِد' },
  { id: 'sac-was', char: '𓌀', gardiner: 'S40', meaningAr: 'واس (السلطان والسيادة)', pronunciationAr: 'وَاس' },
  { id: 'sac-per', char: '𓉐', gardiner: 'O1', meaningAr: 'بر (البيت والمعبد)', pronunciationAr: 'بِر' },
  { id: 'sac-horus', char: '𓅃', gardiner: 'G5', meaningAr: 'حور (صقر السماء)', pronunciationAr: 'حُور' },
  { id: 'sac-ib', char: '𓄣', gardiner: 'F34', meaningAr: 'إب (القلب والضمير)', pronunciationAr: 'إِب' },
  { id: 'sac-mw', char: '𓈗', gardiner: 'N35A', meaningAr: 'مو (ماء النيل)', pronunciationAr: 'مُو' },
  { id: 'sac-shenu-l', char: '𓍹', gardiner: 'V11A', meaningAr: 'بداية الخرطوشة الملكية', pronunciationAr: 'شنو' },
  { id: 'sac-shenu-r', char: '𓍺', gardiner: 'V11B', meaningAr: 'نهاية الخرطوشة الملكية', pronunciationAr: 'شنو' }
];

const ALPHABET_CARVING_ITEMS: EngravingGlyphItem[] = UNILITERAL_HIEROGLYPHS.map((sign) => ({
  id: sign.id,
  char: sign.char,
  gardiner: sign.gardiner,
  meaningAr: `${sign.arabicLetter} (${sign.meaningAr})`,
  pronunciationAr: sign.soundPronunciation || sign.arabicLetter
}));

export const StoneEngravingStudio: React.FC = () => {
  // Slab & Tool Configuration
  const [stoneType, setStoneType] = useState<StoneType>('limestone');
  const [reliefStyle, setReliefStyle] = useState<ReliefStyle>('sunken');
  const [paletteTab, setPaletteTab] = useState<PaletteTab>('alphabet');
  const [selectedGlyph, setSelectedGlyph] = useState<EngravingGlyphItem>(ALPHABET_CARVING_ITEMS[7]); // Owl (m)
  const [chiselSize, setChiselSize] = useState<number>(54);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(false);

  // Audio & Lighting Controls
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speakOnCarve, setSpeakOnCarve] = useState<boolean>(true);
  const [torchAngle, setTorchAngle] = useState<number>(135);
  const [torchFollowerEnabled, setTorchFollowerEnabled] = useState<boolean>(true);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number; inside: boolean }>({
    x: 50,
    y: 45,
    inside: false
  });

  // Arabic Name / Phrase Engraving Queue
  const [arabicStampInput, setArabicStampInput] = useState<string>('مصر');
  const [stampQueueIndex, setStampQueueIndex] = useState<number>(0);
  const convertedArabicSigns = convertNameToHieroglyphs(arabicStampInput);

  // Engraved Marks & Interactive Visual FX State
  const [carvedMarks, setCarvedMarks] = useState<CarvedMark[]>([
    {
      id: 'initial-1',
      xPercent: 72,
      yPercent: 48,
      char: '𓋹',
      gardiner: 'S34',
      meaningAr: 'عنخ (الحياة والخلود)',
      pronunciationAr: 'عنخ',
      depth: 3,
      relief: 'sunken',
      sizePx: 60
    },
    {
      id: 'initial-2',
      xPercent: 50,
      yPercent: 48,
      char: '𓅱',
      gardiner: 'G43',
      meaningAr: 'و (فرخ السمان)',
      pronunciationAr: 'واو',
      depth: 3,
      relief: 'sunken',
      sizePx: 60
    },
    {
      id: 'initial-3',
      xPercent: 28,
      yPercent: 48,
      char: '𓊵',
      gardiner: 'R4',
      meaningAr: 'حتب (السلام والرضا)',
      pronunciationAr: 'حُتُب',
      depth: 3,
      relief: 'sunken',
      sizePx: 60
    }
  ]);

  const [impacts, setImpacts] = useState<ImpactEffect[]>([]);
  const [particles, setParticles] = useState<StoneParticle[]>([]);
  const [slabRecoil, setSlabRecoil] = useState<boolean>(false);
  const [selectedMarkId, setSelectedMarkId] = useState<string | null>(null);
  const [isRecitingTablet, setIsRecitingTablet] = useState<boolean>(false);
  const [milestoneAwarded, setMilestoneAwarded] = useState<boolean>(false);

  const slabRef = useRef<HTMLDivElement>(null);
  const activeStone = STONE_MATERIALS[stoneType];

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      scribeAudio.stop();
    };
  }, []);

  // Particle simulation tick
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.45,
            opacity: p.opacity - 0.045
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 28);
    return () => clearInterval(timer);
  }, [particles.length]);

  // Spawn visual soundwave ripples, torchlight impact burst & sparks at (clickX, clickY)
  const triggerStrikeEffects = (clickX: number, clickY: number, spokenText?: string) => {
    const now = Date.now();

    // 1. Acoustic Sound
    if (soundEnabled) {
      soundFX.playChiselAndMalletCombo(stoneType);
      if (speakOnCarve && spokenText) {
        scribeAudio.speakText(spokenText, {
          id: `carve-${now}`,
          rate: 1.05
        });
      }
    }

    // 2. Slab Tactile Tremor (compositor transform)
    setSlabRecoil(true);
    setTimeout(() => setSlabRecoil(false), 110);

    // 3. Visual Soundwave & Light Flash at (clickX, clickY)
    const impactId = now + Math.random();
    setImpacts((prev) => [
      ...prev.slice(-6),
      {
        id: impactId,
        x: clickX,
        y: clickY,
        lightColor: activeStone.sparkColor,
        rippleColor: activeStone.rippleColor
      }
    ]);
    setTimeout(() => {
      setImpacts((prev) => prev.filter((imp) => imp.id !== impactId));
    }, 700);

    // 4. Stone Chips + Bronze Light Sparks
    const spawned: StoneParticle[] = Array.from({ length: 14 }).map((_, i) => {
      const isSpark = i % 3 === 0;
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
      const speed = isSpark ? 3.5 + Math.random() * 4.5 : 2 + Math.random() * 3.5;
      return {
        id: now + i + Math.random(),
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.2,
        size: isSpark ? Math.random() * 4 + 2 : Math.random() * 5 + 3,
        color: isSpark ? activeStone.sparkColor : activeStone.dustColor,
        isSpark,
        opacity: 1
      };
    });
    setParticles((prev) => [...prev.slice(-30), ...spawned]);
  };

  // Handle clicking directly on the virtual stone slab to engrave the active glyph
  const handleSlabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slabRef.current) return;
    const rect = slabRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let xPercent = Math.max(8, Math.min(92, (clickX / rect.width) * 100));
    let yPercent = Math.max(14, Math.min(86, (clickY / rect.height) * 100));

    if (snapToGrid) {
      xPercent = Math.round(xPercent / 12.5) * 12.5;
      yPercent = Math.round(yPercent / 25) * 25;
      xPercent = Math.max(12.5, Math.min(87.5, xPercent));
      yPercent = Math.max(25, Math.min(75, yPercent));
    }

    // Determine glyph to carve (either Arabic Word queue or selected palette symbol)
    let glyphToCarve: EngravingGlyphItem = selectedGlyph;
    if (paletteTab === 'arabic_word' && convertedArabicSigns.length > 0) {
      const sign = convertedArabicSigns[stampQueueIndex % convertedArabicSigns.length];
      glyphToCarve = {
        id: sign.id,
        char: sign.char,
        gardiner: sign.gardiner,
        meaningAr: `${sign.arabicLetter} (${sign.meaningAr})`,
        pronunciationAr: sign.soundPronunciation || sign.arabicLetter
      };
      setStampQueueIndex((prev) => (prev + 1) % convertedArabicSigns.length);
    }

    triggerStrikeEffects(clickX, clickY, glyphToCarve.pronunciationAr);

    const newMark: CarvedMark = {
      id: `mark-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      xPercent,
      yPercent,
      char: glyphToCarve.char,
      gardiner: glyphToCarve.gardiner,
      meaningAr: glyphToCarve.meaningAr,
      pronunciationAr: glyphToCarve.pronunciationAr,
      depth: 2,
      relief: reliefStyle,
      sizePx: chiselSize
    };

    const nextMarks = [...carvedMarks, newMark];
    setCarvedMarks(nextMarks);
    setSelectedMarkId(newMark.id);

    // Award scribe points once user actively engraves 5+ new marks in a session
    if (!milestoneAwarded && nextMarks.length >= 8) {
      setMilestoneAwarded(true);
      studentProgress.addPoints(25, `نقش لوحة هيروغليفية على ${activeStone.nameAr}`, 'استوديو النقش الحجري');
    }
  };

  // Handle clicking an already-carved mark to deepen its relief (1 -> 2 -> 3)
  const handleMarkClick = (e: React.MouseEvent<HTMLButtonElement>, mark: CarvedMark) => {
    e.stopPropagation();
    if (!slabRef.current) return;
    const rect = slabRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    triggerStrikeEffects(clickX, clickY, mark.pronunciationAr);
    setSelectedMarkId(mark.id);

    setCarvedMarks((prev) =>
      prev.map((m) =>
        m.id === mark.id
          ? {
              ...m,
              depth: m.depth === 3 ? 3 : ((m.depth + 1) as 1 | 2 | 3),
              relief: reliefStyle
            }
          : m
      )
    );
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slabRef.current || !torchFollowerEnabled) return;
    const rect = slabRef.current.getBoundingClientRect();
    setPointerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      inside: true
    });
  };

  const handleUndo = () => {
    if (carvedMarks.length === 0) return;
    soundFX.playClickSound();
    setCarvedMarks((prev) => prev.slice(0, -1));
    setSelectedMarkId(null);
  };

  const handleClearSlab = () => {
    soundFX.playStonePolish();
    setCarvedMarks([]);
    setSelectedMarkId(null);
    setImpacts([]);
    setParticles([]);
  };

  const handleDeleteMark = (id: string) => {
    soundFX.playClickSound();
    setCarvedMarks((prev) => prev.filter((m) => m.id !== id));
    if (selectedMarkId === id) setSelectedMarkId(null);
  };

  const handleReciteTablet = () => {
    if (isRecitingTablet) {
      scribeAudio.stop();
      setIsRecitingTablet(false);
      return;
    }
    if (carvedMarks.length === 0) return;

    soundFX.playAncientChime(540);
    setIsRecitingTablet(true);
    const ordered = [...carvedMarks].sort((a, b) => a.yPercent - b.yPercent || b.xPercent - a.xPercent);
    const script = `نقش على ${activeStone.nameAr}: ${ordered.map((m) => m.pronunciationAr).join('، ')}`;
    scribeAudio.speakText(script, {
      id: 'tablet-recitation',
      rate: 0.9,
      onEnd: () => setIsRecitingTablet(false),
      onError: () => setIsRecitingTablet(false)
    });
  };

  // Export engraved slab to high-res PNG image
  const handleDownloadPng = () => {
    soundFX.playSuccessSound();
    const canvas = document.createElement('canvas');
    const width = 1000;
    const height = 620;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Stone background
    ctx.fillStyle = activeStone.canvasFill;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle mineral grain texture
    for (let i = 0; i < 1600; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
      ctx.fillRect(Math.random() * width, Math.random() * height, 2.5, 2.5);
    }

    // 3. Chiseled Outer Stele Border
    ctx.strokeStyle = activeStone.borderStyle;
    ctx.lineWidth = 10;
    ctx.strokeRect(24, 24, width - 48, height - 48);
    ctx.strokeStyle = activeStone.shadowColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // 4. Directional Lighting Calculus from torchAngle
    const rad = (torchAngle * Math.PI) / 180;
    const dx = Math.cos(rad) * 3;
    const dy = Math.sin(rad) * 3;

    // 5. Render each carved hieroglyph mark
    carvedMarks.forEach((mark) => {
      const cx = (mark.xPercent / 100) * width;
      const cy = (mark.yPercent / 100) * height;
      const fontSize = Math.round(mark.sizePx * 1.45);
      ctx.font = `${fontSize}px "Noto Sans Egyptian Hieroglyphs", "Segoe UI Historic", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (mark.relief === 'gold') {
        ctx.fillStyle = activeStone.shadowColor;
        ctx.fillText(mark.char, cx + dx, cy + dy);
        ctx.fillStyle = '#F59E0B';
        ctx.fillText(mark.char, cx, cy);
      } else if (mark.relief === 'raised') {
        ctx.fillStyle = activeStone.shadowColor;
        ctx.fillText(mark.char, cx + dx * 1.3, cy + dy * 1.3);
        ctx.fillStyle = activeStone.highlightColor;
        ctx.fillText(mark.char, cx - dx * 0.4, cy - dy * 0.4);
        ctx.fillStyle = activeStone.textBaseColor;
        ctx.fillText(mark.char, cx, cy);
      } else {
        // Sunken relief
        ctx.fillStyle = activeStone.highlightColor;
        ctx.fillText(mark.char, cx + dx, cy + dy);
        ctx.fillStyle = activeStone.shadowColor;
        ctx.fillText(mark.char, cx - dx * 0.6, cy - dy * 0.6);
        ctx.fillStyle = activeStone.textBaseColor;
        ctx.fillText(mark.char, cx, cy);
      }
    });

    const link = document.createElement('a');
    link.download = `egyptian-stone-engraving-${stoneType}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Compute CSS textShadow bevel from torchAngle & carving depth
  const getReliefStyleProps = (mark: CarvedMark): React.CSSProperties => {
    const rad = (torchAngle * Math.PI) / 180;
    const depthFactor = mark.depth * 0.9;
    const dx = Math.cos(rad) * depthFactor;
    const dy = Math.sin(rad) * depthFactor;

    if (mark.relief === 'gold') {
      return {
        color: '#F59E0B',
        textShadow: `${dx}px ${dy}px 2px ${activeStone.shadowColor}, 0 0 10px rgba(251, 191, 36, 0.35)`
      };
    }
    if (mark.relief === 'raised') {
      return {
        color: activeStone.textBaseColor,
        textShadow: `${dx * 1.4}px ${dy * 1.4}px 2px ${activeStone.shadowColor}, ${-dx * 0.5}px ${-dy * 0.5}px 1px ${activeStone.highlightColor}`
      };
    }
    // Sunken Relief
    return {
      color: activeStone.textBaseColor,
      textShadow: `${-dx}px ${-dy}px 2px ${activeStone.shadowColor}, ${dx * 0.8}px ${dy * 0.8}px 1px ${activeStone.highlightColor}`
    };
  };

  const selectedMark = carvedMarks.find((m) => m.id === selectedMarkId) || null;

  return (
    <div id="stone-engraving-studio" className="space-y-8 text-right" dir="rtl">
      {/* Studio Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-2">
            <span>ورشة النحات الملكي</span>
            <span aria-hidden="true">·</span>
            <span>محاكاة النقش على الحجر بالصوت والضوء</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg text-balance">
            استوديو نقش الهيروغليفية على اللوح الحجري الافتراضي
          </h2>
          <p className="text-sm text-stone-600 font-serif-ar leading-relaxed">
            اختر نوع الحجر الأثري والحرف أو الرمز المقدس، ثم انقر على أي موضع في اللوح الحجري لتجربة ضربات الإزميل مع موجات الصوت البصرية، وميض الضوء، وتطاير شظايا الصخر. أعد النقر على أي رمز محفور لتعميق نقشه!
          </p>
        </div>

        {/* Clean Unboxed Stats Summary (Tabular Numerals) */}
        <div className="flex items-center gap-6 shrink-0 border-t lg:border-t-0 lg:border-r border-[#E8DFC9] pt-4 lg:pt-0 lg:pr-6">
          <div>
            <div className="text-xs text-stone-500 font-medium">الرموز المنقوشة</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              {carvedMarks.length}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">الخامة المختارة</div>
            <div className="text-sm font-bold text-amber-900">{activeStone.originAr}</div>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* PRIMARY ZONE (7 Cols): Virtual Stone Slab + Sound & LightFX */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Top Action & Stone Material Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3">
            {/* Stone Material Selector */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="اختر نوع الحجر">
              {(Object.keys(STONE_MATERIALS) as StoneType[]).map((stKey) => {
                const st = STONE_MATERIALS[stKey];
                const isActive = stoneType === stKey;
                return (
                  <button
                    key={stKey}
                    type="button"
                    onClick={() => {
                      soundFX.playClickSound();
                      setStoneType(stKey);
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${
                      isActive
                        ? 'bg-stone-900 text-amber-200 shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {st.nameAr.split(' ')[0]} {st.nameAr.split(' ')[1]}
                  </button>
                );
              })}
            </div>

            {/* Utility Toggles (Grid, Sound, Voice) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setSnapToGrid((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap shrink-0 ${
                  snapToGrid
                    ? 'bg-amber-800 text-white border-amber-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                aria-pressed={snapToGrid}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>محاذاة السطور</span>
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap shrink-0 ${
                  soundEnabled
                    ? 'bg-amber-50 text-amber-950 border-amber-300'
                    : 'bg-stone-100 text-stone-500 border-stone-200'
                }`}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-700" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'الصوت مفعّل' : 'صامت'}</span>
              </button>
            </div>
          </div>

          {/* THE VIRTUAL STONE TABLET CANVAS */}
          <div
            ref={slabRef}
            onClick={handleSlabClick}
            onMouseMove={handlePointerMove}
            onMouseLeave={() => setPointerPos((prev) => ({ ...prev, inside: false }))}
            role="application"
            aria-label="اللوح الحجري الافتراضي لنقش الحروف الهيروغليفية"
            className="relative w-full min-h-[420px] sm:min-h-[470px] rounded-3xl overflow-hidden cursor-crosshair select-none shadow-lg transition-transform duration-100"
            style={{
              background: activeStone.bgStyle,
              border: `6px solid ${activeStone.borderStyle}`,
              transform: slabRecoil ? 'translate3d(2px, 2px, 0) scale(0.997)' : 'translate3d(0, 0, 0) scale(1)'
            }}
          >
            {/* Subtle Engraved Stele Inner Border */}
            <div
              className="absolute inset-4 rounded-2xl pointer-events-none"
              style={{
                border: `2px solid ${activeStone.shadowColor}44`,
                boxShadow: `inset 0 0 28px ${activeStone.shadowColor}33`
              }}
            />

            {/* Optional Monumental Register Guidelines */}
            {snapToGrid && (
              <div className="absolute inset-6 pointer-events-none flex flex-col justify-evenly opacity-30">
                <div className="border-b border-dashed" style={{ borderColor: activeStone.shadowColor }} />
                <div className="border-b border-dashed" style={{ borderColor: activeStone.shadowColor }} />
                <div className="border-b border-dashed" style={{ borderColor: activeStone.shadowColor }} />
              </div>
            )}

            {/* Dynamic Raking Torchlight Spotlight Following Cursor */}
            {torchFollowerEnabled && pointerPos.inside && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                style={{
                  background: `radial-gradient(240px circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(253, 224, 71, 0.22), rgba(245, 158, 11, 0.06) 45%, transparent 72%)`
                }}
              />
            )}

            {/* Empty Prompt Hint */}
            {carvedMarks.length === 0 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center space-y-2"
                style={{ color: activeStone.textBaseColor }}
              >
                <Hammer className="w-10 h-10 opacity-70" />
                <div className="text-base font-bold font-display-eg">
                  انقر في أي مكان على اللوح الحجري لنقش الرمز المختار
                </div>
                <div className="text-xs opacity-80 font-serif-ar">
                  كل ضربة تطلق وميض الضوء وموجات الصوت الأثرية
                </div>
              </div>
            )}

            {/* Rendered Carved Hieroglyphic Marks */}
            {carvedMarks.map((mark) => {
              const isMarkSelected = selectedMarkId === mark.id;
              return (
                <button
                  key={mark.id}
                  type="button"
                  onClick={(e) => handleMarkClick(e, mark)}
                  title={`${mark.meaningAr} — انقر لتعميق النقش (العمق الحالي: ${mark.depth}/3)`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 font-hieroglyphs leading-none transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg px-1 ${
                    isMarkSelected ? 'ring-2 ring-amber-400/70' : ''
                  }`}
                  style={{
                    left: `${mark.xPercent}%`,
                    top: `${mark.yPercent}%`,
                    fontSize: `${mark.sizePx}px`,
                    ...getReliefStyleProps(mark)
                  }}
                >
                  {mark.char}
                </button>
              );
            })}

            {/* Visual Soundwave Ripples + Chisel Light Flashes on Click */}
            {impacts.map((imp) => (
              <React.Fragment key={imp.id}>
                {/* Radial Chisel Impact Light Flash */}
                <div
                  className="absolute pointer-events-none w-28 h-28 rounded-full animate-chisel-flash"
                  style={{
                    left: imp.x,
                    top: imp.y,
                    background: `radial-gradient(circle, ${imp.lightColor}CC 0%, rgba(251, 191, 36, 0.35) 45%, transparent 72%)`
                  }}
                />
                {/* Primary Acoustic Soundwave Ring */}
                <div
                  className="absolute pointer-events-none w-24 h-24 rounded-full border-2 animate-soundwave-ripple"
                  style={{
                    left: imp.x,
                    top: imp.y,
                    borderColor: imp.rippleColor
                  }}
                />
                {/* Secondary Echo Soundwave Ring */}
                <div
                  className="absolute pointer-events-none w-16 h-16 rounded-full border animate-soundwave-ripple"
                  style={{
                    left: imp.x,
                    top: imp.y,
                    borderColor: imp.lightColor,
                    animationDelay: '70ms'
                  }}
                />
              </React.Fragment>
            ))}

            {/* Stone Chips & Bronze Sparks Physics Layer */}
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: 0,
                  top: 0,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  boxShadow: p.isSpark ? `0 0 8px ${p.color}` : 'none',
                  transform: `translate3d(${p.x}px, ${p.y}px, 0)`
                }}
              />
            ))}
          </div>

          {/* Selected Mark Inspector & Bottom Action Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFC9] space-y-4">
            {/* Torchlight & Chisel Sliders with explicit numeric units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span>زاوية ضوء الشعلة الجانبية:</span>
                  </span>
                  <span className="font-mono tabular-nums text-amber-900">{torchAngle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={torchAngle}
                  onChange={(e) => setTorchAngle(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                  aria-label="زاوية ضوء الشعلة الجانبية"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5 text-amber-600" />
                    <span>حجم نقش الإزميل:</span>
                  </span>
                  <span className="font-mono tabular-nums text-amber-900">{chiselSize}px</span>
                </div>
                <input
                  type="range"
                  min={34}
                  max={84}
                  step={2}
                  value={chiselSize}
                  onChange={(e) => setChiselSize(Number(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                  aria-label="حجم نقش الإزميل"
                />
              </div>
            </div>

            {/* Selected Carved Mark Quick Actions */}
            {selectedMark && (
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-hieroglyphs text-2xl text-stone-900">{selectedMark.char}</span>
                  <span className="font-bold text-stone-900">{selectedMark.meaningAr}</span>
                  <span className="text-stone-400" aria-hidden="true">·</span>
                  <span className="font-mono text-stone-600 tabular-nums">
                    {selectedMark.gardiner} · العمق {selectedMark.depth}/3
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scribeAudio.speakText(selectedMark.pronunciationAr, { id: `read-${selectedMark.id}` })}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>نطق الحرف</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMark(selectedMark.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>إزالة الرمز</span>
                  </button>
                </div>
              </div>
            )}

            {/* Primary Canvas Actions */}
            <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleReciteTablet}
                  disabled={carvedMarks.length === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 disabled:opacity-40 ${
                    isRecitingTablet
                      ? 'bg-rose-700 text-white'
                      : 'bg-amber-800 hover:bg-amber-700 text-white'
                  }`}
                >
                  {isRecitingTablet ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isRecitingTablet ? 'إيقاف التلاوة' : 'قراءة اللوح صوتياً'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={carvedMarks.length === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-bold transition-colors whitespace-nowrap shrink-0 disabled:opacity-40"
                >
                  <Download className="w-4 h-4" />
                  <span>حفظ كصورة PNG</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={carvedMarks.length === 0}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors whitespace-nowrap shrink-0 disabled:opacity-40"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>تراجع</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearSlab}
                  disabled={carvedMarks.length === 0}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-rose-100 hover:text-rose-800 text-stone-700 text-xs font-bold transition-colors whitespace-nowrap shrink-0 disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تجديد اللوح</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROL & PALETTE ZONE (5 Cols): Hieroglyph Chisel Selector & Relief Styles */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Relief Carving Style & Lighting Options */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>أسلوب النحت وتأثيرات الإضاءة</span>
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sunken' as ReliefStyle, label: 'نقش غائر' },
                { id: 'raised' as ReliefStyle, label: 'نقش بارز' },
                { id: 'gold' as ReliefStyle, label: 'تذهيب ملكي' }
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    soundFX.playClickSound();
                    setReliefStyle(style.id);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                    reliefStyle === style.id
                      ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setTorchFollowerEnabled((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  torchFollowerEnabled
                    ? 'bg-amber-50 text-amber-950 border-amber-300'
                    : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>إضاءة الشعلة المتحركة</span>
              </button>

              <button
                type="button"
                onClick={() => setSpeakOnCarve((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  speakOnCarve
                    ? 'bg-amber-50 text-amber-950 border-amber-300'
                    : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>نطق الرمز عند النقش</span>
              </button>
            </div>
          </div>

          {/* Hieroglyphic Chisel Palette */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] space-y-4">
            {/* Palette Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setPaletteTab('alphabet');
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  paletteTab === 'alphabet' ? 'bg-amber-800 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                الحروف (24)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setPaletteTab('sacred');
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  paletteTab === 'sacred' ? 'bg-amber-800 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                الرموز المقدسة
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClickSound();
                  setPaletteTab('arabic_word');
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  paletteTab === 'arabic_word' ? 'bg-amber-800 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                نقش كلمة عربية
              </button>
            </div>

            {/* Tab 1 & 2: Glyph Grid */}
            {(paletteTab === 'alphabet' || paletteTab === 'sacred') && (
              <>
                {/* Currently Armed Chisel Glyph */}
                <div className="p-3.5 rounded-xl bg-[#FAF5E8] border border-amber-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-3xl font-hieroglyphs text-stone-900 shrink-0">
                      {selectedGlyph.char}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-amber-950">{selectedGlyph.meaningAr}</div>
                      <div className="text-[11px] font-mono text-amber-800">
                        {selectedGlyph.gardiner} · النطق: {selectedGlyph.pronunciationAr}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scribeAudio.speakText(selectedGlyph.pronunciationAr, { id: `preview-${selectedGlyph.id}` })}
                    className="p-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white transition-colors shrink-0"
                    aria-label={`استمع لنطق ${selectedGlyph.meaningAr}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Clickable Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pl-1">
                  {(paletteTab === 'alphabet' ? ALPHABET_CARVING_ITEMS : SACRED_CARVING_SYMBOLS).map((item) => {
                    const isActive = selectedGlyph.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          soundFX.playClickSound();
                          setSelectedGlyph(item);
                        }}
                        className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 ${
                          isActive
                            ? 'bg-amber-900 text-white border-amber-950 ring-2 ring-amber-400'
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-900 border-stone-200'
                        }`}
                      >
                        <span className="text-2xl font-hieroglyphs leading-tight">{item.char}</span>
                        <span className={`text-[10px] font-bold truncate max-w-full ${isActive ? 'text-amber-200' : 'text-stone-600'}`}>
                          {item.pronunciationAr}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Tab 3: Arabic Word to Sequential Hieroglyph Engraving Queue */}
            {paletteTab === 'arabic_word' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="arabic-stamp-input" className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-amber-700" />
                    <span>اكتب اسماً أو كلمة عربية لنقش حروفها تباعاً:</span>
                  </label>
                  <input
                    id="arabic-stamp-input"
                    type="text"
                    value={arabicStampInput}
                    onChange={(e) => {
                      setArabicStampInput(e.target.value);
                      setStampQueueIndex(0);
                    }}
                    placeholder="مثال: مصر، سلام، توت، مريم..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm font-bold text-right"
                  />
                </div>

                {/* Quick Sample Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {['مصر', 'سلام', 'نور', 'مريم', 'أحمد'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        soundFX.playClickSound();
                        setArabicStampInput(preset);
                        setStampQueueIndex(0);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-xs font-bold text-stone-800 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Queue Preview */}
                {convertedArabicSigns.length > 0 ? (
                  <div className="p-4 rounded-xl bg-[#FAF5E8] border border-amber-200 space-y-2">
                    <div className="text-xs font-bold text-amber-900">
                      انقر على اللوح الحجري لنقش الحرف المحدد بالتتابع ({stampQueueIndex + 1} / {convertedArabicSigns.length}):
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center py-1">
                      {convertedArabicSigns.map((sign, idx) => {
                        const isNext = idx === stampQueueIndex % convertedArabicSigns.length;
                        return (
                          <button
                            key={`${sign.id}-${idx}`}
                            type="button"
                            onClick={() => setStampQueueIndex(idx)}
                            className={`px-2.5 py-1.5 rounded-xl border text-center transition-all ${
                              isNext
                                ? 'bg-amber-800 text-white border-amber-950 ring-2 ring-amber-400 scale-105'
                                : 'bg-white text-stone-800 border-amber-200'
                            }`}
                          >
                            <div className="text-2xl font-hieroglyphs">{sign.char}</div>
                            <div className={`text-[10px] font-bold ${isNext ? 'text-amber-200' : 'text-stone-500'}`}>
                              {sign.arabicLetter}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 text-center">
                    أدخل حروفاً عربية لتظهر رموزها الهيروغليفية الجاهزة للنقش.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
