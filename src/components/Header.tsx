import React from 'react';
import { Shield, Moon, Sun, RotateCcw, BookOpen } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetProgress: () => void;
  onOpenLibrary: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onResetProgress,
  onOpenLibrary,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg block leading-tight">
              Ôn tập An toàn thông tin
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Hệ thống 70 câu hỏi chuẩn hóa & Giải thích học thuật
            </span>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Library of Concepts */}
          <button
            onClick={onOpenLibrary}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            title="Tra cứu nhanh Bảng so sánh và Hồ sơ kiến thức"
          >
            <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Tra cứu kiến thức</span>
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={onResetProgress}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition"
            title="Xóa và đặt lại tiến độ học tập (có xác nhận)"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden md:inline">Đặt lại tiến độ</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Chuyển chế độ sáng tối"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
