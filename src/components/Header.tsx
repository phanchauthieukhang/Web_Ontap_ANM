import React from 'react';
import { Shield, Moon, Sun, RotateCcw, BookOpen, Search } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetProgress: () => void;
  onOpenLibrary: () => void;
  onOpenCommandPalette: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onResetProgress,
  onOpenLibrary,
  onOpenCommandPalette,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#07080a]/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg block leading-tight">
                An toàn thông tin
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                PRO 3D
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Hệ thống 70 câu hỏi chuẩn hóa & Interactive Lab
            </span>
          </div>
        </button>

        {/* Center / Action: Quick Command Palette Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100/80 hover:bg-slate-200/80 dark:bg-[#121316] dark:hover:bg-[#18191c] border border-slate-200/60 dark:border-white/10 transition shadow-inner"
            title="Mở thanh lệnh tìm kiếm nhanh 70 câu hỏi"
          >
            <Search className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Tìm nhanh câu hỏi...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Library */}
          <button
            onClick={onOpenLibrary}
            className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 transition"
            title="Tra cứu nhanh Bảng so sánh và Hồ sơ kiến thức"
          >
            <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden lg:inline">Tra cứu</span>
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={onResetProgress}
            className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/50 transition"
            title="Xóa và đặt lại tiến độ học tập (có xác nhận)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Chuyển chế độ sáng tối"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
