import React, { useState, useEffect } from 'react';
import { Feather, Sparkles, Award, Trophy, Eye, GraduationCap, Crown, Landmark } from 'lucide-react';
import { AudienceMode } from '../types';
import { studentProgress } from '../utils/studentProgressService';

interface HeaderProps {
  currentMode: AudienceMode;
  onSelectMode: (mode: AudienceMode) => void;
  onOpenCartouche: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onSelectMode, onOpenCartouche }) => {
  const [totalPoints, setTotalPoints] = useState<number>(() => studentProgress.getProgress().totalScribePoints);

  useEffect(() => {
    const unsubscribe = studentProgress.subscribe((data) => {
      setTotalPoints(data.totalScribePoints);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold tracking-tight text-amber-950 font-display-eg whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-700/10 border border-amber-600/30 flex items-center justify-center text-amber-800">
            𓇓
          </span>
          <span>مدرسة الكاتب المصري</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-700">
          <button
            onClick={() => onSelectMode('progress')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'progress' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>لوحة تقدم الكاتب</span>
          </button>
          <button
            onClick={() => onSelectMode('dictionary')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'dictionary' || currentMode === 'shared_roots'
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            القاموس المصور
          </button>
          <button
            onClick={() => onSelectMode('games')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'games' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            ألعاب الكاتب
          </button>
          <button
            onClick={() => onSelectMode('heritage')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'heritage' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            الكلمات الحية
          </button>
          <button
            onClick={() => onSelectMode('papyri')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'papyri' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            معرض البرديات
          </button>
          <button
            onClick={() => onSelectMode('video_dict')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'video_dict' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            قاموس الفيديو
          </button>
          <button
            onClick={() => onSelectMode('scanner')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'scanner' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>ماسح النقوش</span>
          </button>
          <button
            onClick={() => onSelectMode('tutor')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'tutor' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>المعلم عمر سليم</span>
          </button>
          <button
            onClick={() => onSelectMode('timeline')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              currentMode === 'timeline' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            الخريطة الزمنية
          </button>
          <button
            onClick={() => onSelectMode('timemachine')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'timemachine' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>آلة الزمن ⏳</span>
          </button>
          <button
            onClick={() => onSelectMode('pharaohs')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'pharaohs' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>ملوك مصر</span>
          </button>
          <button
            onClick={() => onSelectMode('architecture')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
              currentMode === 'architecture' 
                ? 'border-amber-700 text-amber-900 font-bold' 
                : 'border-transparent hover:text-amber-800 hover:border-amber-300'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-600" />
            <span>العمارة المصرية</span>
          </button>
        </nav>

        {/* Zone 3: Scribe Points Badge & Cartouche Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Live Student Scribe Points Pill */}
          <button
            onClick={() => onSelectMode('progress')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-2xs ${
              currentMode === 'progress'
                ? 'bg-amber-900 text-white border-amber-950'
                : 'bg-amber-100/90 hover:bg-amber-200 text-amber-950 border-amber-300'
            }`}
            title="انقر لفتح لوحة تقدم الكاتب والرتب والأوسمة"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono tabular-nums">{totalPoints}</span>
            <span className="text-[10px] text-amber-800 hidden sm:inline">نقطة كاتب</span>
          </button>

          <button
            onClick={onOpenCartouche}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">صانع الخرطوشة</span>
            <span className="sm:hidden">الخرطوشة</span>
          </button>
        </div>

      </div>
    </header>
  );
};
