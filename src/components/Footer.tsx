import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8DFC9] bg-[#F4EDE0] text-stone-700 py-12 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lg font-bold text-stone-900 font-display-eg">
              <span className="text-amber-800">𓇓</span>
              <span>مدرسة الكاتب المصري</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif-ar">
              مبادرة رقمية تفاعلية تهدف لإعادة إحياء وتيسير تعلم اللغة الهيروغليفية المصرية القديمة للصغار والناشئة والكبار، وإبراز استمراريتها الحية في لساننا العربي والمصري المعاصر.
            </p>
          </div>

          {/* Academic References */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
              المراجع العلمية والمعاجم
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 font-serif-ar">
              <li>· تصنيف سير آلان جاردنر للعلامات (Gardiner's Egyptian Grammar)</li>
              <li>· معجم فالكنر للمصرية القديمة (Faulkner Concise Dictionary)</li>
              <li>· دراسات التأثيل اللغوي للدكتور أحمد كمال باشا ود. عبد الحليم نور الدين</li>
              <li>· معجم الألفاظ القبطية والمصرية العامية للأستاذ أحمد لطفي السيد</li>
            </ul>
          </div>

          {/* Core Values */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
              أقسام المنصة التفاعلية
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">أبجدية الصغار</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">لوحة الرسم والتتبع</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">الخرطوشة الملكية</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">كلمات أجدادنا الحية</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">محلل النقوش الأثرية</span>
              <span className="px-2.5 py-1 rounded-md bg-stone-200/80 text-stone-800 font-medium">امتحان الكاتب الملكي</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            جميع الحقوق التعليمية والتراثية محفوظة © {new Date().getFullYear()} مدرسة الكاتب المصري.
          </div>
          <div className="text-stone-600 font-serif-ar">
            «أعظم ما يتركه الإنسان هو الكلمة التي لا تموت، واسمٌ ينبض في ذاكرة الأجيال»
          </div>
        </div>

      </div>
    </footer>
  );
};
