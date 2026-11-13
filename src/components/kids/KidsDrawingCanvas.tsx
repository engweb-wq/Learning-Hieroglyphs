import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { HieroglyphSign } from '../../types';
import { UNILITERAL_HIEROGLYPHS } from '../../data/hieroglyphsData';
import { soundFX } from '../../utils/soundEffects';

interface KidsDrawingCanvasProps {
  currentSign?: HieroglyphSign | null;
  onSignChange: (sign: HieroglyphSign) => void;
}

export const KidsDrawingCanvas: React.FC<KidsDrawingCanvasProps> = ({
  currentSign,
  onSignChange,
}) => {
  const selectedSign = currentSign || UNILITERAL_HIEROGLYPHS[0];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#1c1917'); // Egyptian Basalt Black
  const [brushSize, setBrushSize] = useState(6);
  const [showGuide, setShowGuide] = useState(true);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [
    { id: '#1c1917', name: 'حبر بازلتي أسود', class: 'bg-[#1c1917]' },
    { id: '#b91c1c', name: 'حجر العقيق الأحمر', class: 'bg-red-700' },
    { id: '#1e3a8a', name: 'حجر اللازورد الأزرق', class: 'bg-blue-900' },
    { id: '#d97706', name: 'المغرة الذهبية', class: 'bg-amber-600' },
    { id: '#15803d', name: 'حجر الملاكيت الأخضر', class: 'bg-green-700' },
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas resolution
    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = 360;

    // Papyrus textured base
    ctx.fillStyle = '#FDF9F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial blank state
    setDrawingHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setHasDrawn(false);
  }, [selectedSign]);

  // Touch & Mouse Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    soundFX.playClickSound();

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();

    // Save state for undo
    setDrawingHistory(prev => [...prev.slice(-10), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FDF9F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setDrawingHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setHasDrawn(false);
  };

  const undoLast = () => {
    if (drawingHistory.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...drawingHistory];
    newHistory.pop(); // Remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setDrawingHistory(newHistory);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundFX.playSuccessSound();

    // Create export canvas with decorative border and name
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height + 70;
    const eCtx = exportCanvas.getContext('2d');
    if (!eCtx) return;

    eCtx.fillStyle = '#F5EEDB';
    eCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw main drawing
    eCtx.drawImage(canvas, 0, 0);

    // Draw footer signature
    eCtx.fillStyle = '#451a03';
    eCtx.font = 'bold 16px Cairo, sans-serif';
    eCtx.textAlign = 'center';
    eCtx.fillText(`رسم الكاتب الصغير: رمز ${selectedSign.meaningAr} [${selectedSign.char}]`, exportCanvas.width / 2, exportCanvas.height - 25);

    const link = document.createElement('a');
    link.download = `hieroglyph-${selectedSign.arabicLetter}-drawing.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E8DFC9] shadow-sm space-y-6">
      
      {/* Header & Quick Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4 text-right">
        <div>
          <div className="text-xs font-semibold text-amber-800">ورشة الكاتب الفرعوني الصغير</div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display-eg">
            لوحة التتبع ورسم الرموز بالفرشاة
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            تتبع خطوط الرمز الذهبي الإرشادي أو أبدع في رسمه بحرية تامة!
          </p>
        </div>

        {/* Quick Letter Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-stone-700 whitespace-nowrap">اختر رمزاً:</label>
          <select
            value={selectedSign.id}
            onChange={(e) => {
              const sign = UNILITERAL_HIEROGLYPHS.find(s => s.id === e.target.value);
              if (sign) onSignChange(sign);
            }}
            className="text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-lg border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700"
          >
            {UNILITERAL_HIEROGLYPHS.map(s => (
              <option key={s.id} value={s.id}>
                {s.char} {s.arabicLetter} - {s.meaningAr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Drawing Stage & Canvas */}
      <div className="relative rounded-xl overflow-hidden border-2 border-amber-800/30 bg-[#FDF9F0] cartouche-shadow flex justify-center items-center">
        
        {/* Soft Background Guide Glyph */}
        {showGuide && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-20 transition-opacity">
            <span className="text-[170px] sm:text-[210px] font-hieroglyphs text-amber-900 leading-none">
              {selectedSign.char}
            </span>
            <span className="text-sm font-semibold text-amber-900 -mt-4">
              خطوط إرشادية لتتبع: {selectedSign.meaningAr}
            </span>
          </div>
        )}

        {/* Interactive Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none w-full"
        />

        {/* Celebration Badge if drawn */}
        {hasDrawn && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-300 shadow-sm flex items-center gap-1.5 text-xs text-amber-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>لوحة فنان فرعوني رائع!</span>
          </div>
        )}
      </div>

      {/* Scribe Tool Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-stone-50 p-4 rounded-xl border border-stone-200">
        
        {/* Color Swatches */}
        <div className="sm:col-span-5 flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-700 whitespace-nowrap">لون الحبر:</span>
          <div className="flex items-center gap-1.5">
            {colors.map(col => (
              <button
                key={col.id}
                onClick={() => setBrushColor(col.id)}
                className={`w-7 h-7 rounded-full ${col.class} transition-transform ${
                  brushColor === col.id ? 'ring-2 ring-offset-2 ring-stone-900 scale-110' : 'hover:scale-105'
                }`}
                title={col.name}
              />
            ))}
          </div>
        </div>

        {/* Brush Size Slider */}
        <div className="sm:col-span-3 flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-700 whitespace-nowrap">سمك القلم:</span>
          <input
            type="range"
            min="2"
            max="18"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full accent-amber-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="sm:col-span-4 flex items-center justify-end gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              showGuide ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-300 text-stone-600'
            }`}
          >
            {showGuide ? 'إخفاء الإرشاد' : 'إظهار الإرشاد'}
          </button>
          
          <button
            onClick={undoLast}
            className="p-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            title="تراجع خطوة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            title="مسح اللوحة"
          >
            <Eraser className="w-4 h-4" />
          </button>

          <button
            onClick={downloadDrawing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-800 hover:bg-amber-700 text-white rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>حفظ رسمتي</span>
          </button>
        </div>

      </div>

    </div>
  );
};
