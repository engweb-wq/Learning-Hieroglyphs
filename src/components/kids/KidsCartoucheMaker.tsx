import React, { useState } from 'react';
import { Download, Sparkles, Volume2, Crown, RefreshCw } from 'lucide-react';
import { convertNameToHieroglyphs } from '../../data/hieroglyphsData';
import { soundFX } from '../../utils/soundEffects';

interface KidsCartoucheMakerProps {
  onClose?: () => void;
}

export const KidsCartoucheMaker: React.FC<KidsCartoucheMakerProps> = () => {
  const [userName, setUserName] = useState('مريم');
  const [cartoucheTheme, setCartoucheTheme] = useState<'gold' | 'lapis' | 'stone'>('gold');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  const hieroglyphs = convertNameToHieroglyphs(userName);

  const sampleNames = ['أحمد', 'مريم', 'عمر', 'نور', 'يوسف', 'سارة', 'توت', 'مصر'];

  const handleSelectSample = (name: string) => {
    setUserName(name);
    soundFX.playAncientChime(640);
  };

  const handleDownloadCartouche = () => {
    soundFX.playSuccessSound();
    
    // Create an offscreen canvas to render high-res royal badge
    const canvas = document.createElement('canvas');
    const width = 600;
    const height = orientation === 'vertical' ? 800 : 400;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Papyrus
    ctx.fillStyle = '#F5EEDB';
    ctx.fillRect(0, 0, width, height);

    // Decorative outer border
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Header title
    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 24px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('الخرطوشة الملكية الفرعونية', width / 2, 60);

    ctx.fillStyle = '#78350f';
    ctx.font = '20px Cairo, sans-serif';
    ctx.fillText(`اسم الملك المعظم: ${userName}`, width / 2, 95);

    // Draw Cartouche Oval
    ctx.save();
    ctx.strokeStyle = cartoucheTheme === 'lapis' ? '#1E3A8A' : '#D4AF37';
    ctx.lineWidth = 12;
    ctx.fillStyle = '#FFFDF8';

    if (orientation === 'vertical') {
      const cWidth = 220;
      const cHeight = Math.max(340, hieroglyphs.length * 75 + 100);
      const cX = (width - cWidth) / 2;
      const cY = 130;

      // Draw rounded rect oval
      ctx.beginPath();
      ctx.roundRect(cX, cY, cWidth, cHeight, 100);
      ctx.fill();
      ctx.stroke();

      // Base bar (Shenu loop)
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(cX - 15, cY + cHeight - 6, cWidth + 30, 16);

      // Hieroglyphs text
      ctx.fillStyle = '#1C1917';
      ctx.font = '48px "Noto Sans Egyptian Hieroglyphs", sans-serif';
      hieroglyphs.forEach((h, idx) => {
        ctx.fillText(h.char, width / 2, cY + 80 + idx * 70);
      });

    } else {
      const cWidth = Math.max(380, hieroglyphs.length * 60 + 120);
      const cHeight = 160;
      const cX = (width - cWidth) / 2;
      const cY = 140;

      ctx.beginPath();
      ctx.roundRect(cX, cY, cWidth, cHeight, 80);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(cX + cWidth - 6, cY - 10, 16, cHeight + 20);

      ctx.fillStyle = '#1C1917';
      ctx.font = '48px "Noto Sans Egyptian Hieroglyphs", sans-serif';
      const text = hieroglyphs.map(h => h.char).join(' ');
      ctx.fillText(text, width / 2, cY + 95);
    }
    ctx.restore();

    // Footer note
    ctx.fillStyle = '#92400e';
    ctx.font = '14px Cairo, sans-serif';
    ctx.fillText('مدرسة الكاتب المصري · صانع الخراطيش الملكية', width / 2, height - 35);

    const link = document.createElement('a');
    link.download = `cartouche-${userName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div id="cartouche" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-sm space-y-8 text-right">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 justify-end">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>ختم الفراعنة والملوك العظام</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display-eg">
            صانع الخرطوشة الملكية التفاعلي
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            اكتب اسمك أو اسم من تحب بالعربية وشاهد كيف كان يخلده الكاتب الفرعوني داخل الإطار المقدس (الشنو)!
          </p>
        </div>

        {/* Download Action */}
        <button
          onClick={handleDownloadCartouche}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>تنزيل الخرطوشة كصورة</span>
        </button>
      </div>

      {/* Input & Customizer Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-900 block">
              اكتب اسمك بالعربية:
            </label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                maxLength={15}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="مثال: أحمد، مريم، كريم..."
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 bg-stone-50 text-stone-900 font-bold text-lg focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-right"
              />
              {userName && (
                <button
                  onClick={() => setUserName('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          {/* Sample quick names */}
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-stone-500">أسماء شائعة للتجربة:</div>
            <div className="flex flex-wrap gap-1.5">
              {sampleNames.map(name => (
                <button
                  key={name}
                  onClick={() => handleSelectSample(name)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-800 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation switch */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              اتجاه كتابة الخرطوشة:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setOrientation('vertical')}
                className={`p-2.5 text-xs font-bold rounded-lg border transition-all ${
                  orientation === 'vertical'
                    ? 'bg-amber-800 text-white border-amber-800'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                عمودي (مثل نقوش الأهرام والمعابد)
              </button>
              <button
                onClick={() => setOrientation('horizontal')}
                className={`p-2.5 text-xs font-bold rounded-lg border transition-all ${
                  orientation === 'horizontal'
                    ? 'bg-amber-800 text-white border-amber-800'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                أفقي (شريط حائطي)
              </button>
            </div>
          </div>

          {/* Theme selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              طراز الإطار الملكي:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setCartoucheTheme('gold')}
                className={`p-2 text-xs font-bold rounded-lg border text-center transition-all ${
                  cartoucheTheme === 'gold'
                    ? 'bg-amber-100 border-amber-600 text-amber-950 ring-1 ring-amber-500'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                الذهب الخالص
              </button>
              <button
                onClick={() => setCartoucheTheme('lapis')}
                className={`p-2 text-xs font-bold rounded-lg border text-center transition-all ${
                  cartoucheTheme === 'lapis'
                    ? 'bg-blue-100 border-blue-600 text-blue-950 ring-1 ring-blue-500'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                اللازورد الملكي
              </button>
              <button
                onClick={() => setCartoucheTheme('stone')}
                className={`p-2 text-xs font-bold rounded-lg border text-center transition-all ${
                  cartoucheTheme === 'stone'
                    ? 'bg-stone-200 border-stone-500 text-stone-900 ring-1 ring-stone-400'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                الحجر الرملي
              </button>
            </div>
          </div>

          {/* Educational Note about Cartouche */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-stone-700 space-y-1.5">
            <div className="font-bold text-amber-900">ما هي الخرطوشة (شنو - Shenu)؟</div>
            <p className="leading-relaxed">
              الإطار البيضاوي ذو العقدة السفلية كان يرمز في مصر القديمة إلى حبل كوني لا نهائي يحيط باسم الملك لحمايته من كل الشرور والحسد، ويؤكد سيادته على كل ما تدور حوله الشمس!
            </p>
          </div>

        </div>

        {/* Display Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl bg-[#FAF5E9] border-2 border-dashed border-amber-700/30 min-h-[460px]">
          
          {hieroglyphs.length === 0 ? (
            <div className="text-center text-stone-500 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
              <div className="text-sm font-bold">اكتب اسمك بالعربية في الحقل المقابل</div>
              <p className="text-xs">لتظهر خريطتك الهيروغليفية الملكية هنا فوراً</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-6">
              
              {/* The Actual Rendered Cartouche Frame */}
              <div
                className={`relative transition-all duration-300 flex items-center justify-center ${
                  orientation === 'vertical'
                    ? 'py-8 px-6 min-w-[200px] max-w-[240px] rounded-full flex-col'
                    : 'px-8 py-5 min-h-[140px] rounded-full flex-row'
                } ${
                  cartoucheTheme === 'gold'
                    ? 'bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-8 border-[#D4AF37] cartouche-shadow'
                    : cartoucheTheme === 'lapis'
                    ? 'bg-gradient-to-b from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE] border-8 border-[#1E3A8A] shadow-xl'
                    : 'bg-stone-100 border-8 border-stone-400 shadow-md'
                }`}
              >
                {/* Traditional Bottom Tie Knot / Shenu bar */}
                {orientation === 'vertical' ? (
                  <div className={`absolute -bottom-3 w-[120%] h-4 rounded-sm border-2 ${
                    cartoucheTheme === 'gold' ? 'bg-[#D4AF37] border-[#B8860B]' :
                    cartoucheTheme === 'lapis' ? 'bg-[#1E3A8A] border-[#172554]' :
                    'bg-stone-500 border-stone-600'
                  }`} />
                ) : (
                  <div className={`absolute -left-3 h-[120%] w-4 rounded-sm border-2 ${
                    cartoucheTheme === 'gold' ? 'bg-[#D4AF37] border-[#B8860B]' :
                    cartoucheTheme === 'lapis' ? 'bg-[#1E3A8A] border-[#172554]' :
                    'bg-stone-500 border-stone-600'
                  }`} />
                )}

                {/* Glyphs inside */}
                <div className={`flex items-center justify-center gap-3 ${
                  orientation === 'vertical' ? 'flex-col py-2' : 'flex-row'
                }`}>
                  {hieroglyphs.map((glyph, idx) => (
                    <div
                      key={idx}
                      className="group/item flex flex-col items-center justify-center p-1 relative"
                      title={`${glyph.arabicLetter}: ${glyph.meaningAr}`}
                    >
                      <span className="text-4xl sm:text-5xl font-hieroglyphs text-stone-900 hover:scale-125 transition-transform duration-200 select-none">
                        {glyph.char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Signs Breakdown Table */}
              <div className="w-full bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-2">
                <div className="text-xs font-bold text-stone-700">تحليل حروف اسمك بالرموز الفرعونية:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {hieroglyphs.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-100 text-xs">
                      <span className="text-2xl font-hieroglyphs text-amber-900">{h.char}</span>
                      <div className="truncate">
                        <div className="font-bold text-stone-900">{h.arabicLetter} = {h.meaningAr}</div>
                        <div className="text-[10px] text-stone-500 font-mono">[{h.gardiner}]</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
