import React from 'react';
import { UserProgressStore, QuizMode } from '../types/quiz';
import { ModeSelector } from '../components/ModeSelector';
import { ProgressOverview } from '../components/ProgressOverview';
import { CyberCanvas3D } from '../components/CyberCanvas3D';
import { ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

interface HomePageProps {
  progressStore: UserProgressStore;
  onStartMode: (mode: QuizMode, topicId?: string, examConfig?: { questionCount: number; timeMinutes: number }) => void;
  onOpenLibrary: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  progressStore,
  onStartMode,
  onOpenLibrary,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with 3D Cyber Shield Visual */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-4 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Học phần An toàn thông tin • Học kỳ 7
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Nền tảng Ôn tập Trắc nghiệm An toàn thông tin
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Hệ thống hóa toàn bộ 70 câu hỏi từ ngân hàng đề thi chuẩn, tích hợp lời giải thích có căn cứ học thuật, cảnh báo bẫy trắc nghiệm và 6 chế độ luyện tập thông minh.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onStartMode('sequential')}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-lg shadow-emerald-500/20"
            >
              <ShieldCheck className="h-4 w-4" />
              Làm trọn vẹn 70 câu
            </button>
            <button
              onClick={onOpenLibrary}
              className="flex items-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition backdrop-blur-sm"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              Tra cứu bảng so sánh
            </button>
          </div>
        </div>

        {/* 3D Canvas in background */}
        <CyberCanvas3D className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 h-full opacity-60 sm:opacity-90" />
      </div>

      {/* Progress Overview Section */}
      <ProgressOverview progressStore={progressStore} totalQuestions={70} />

      {/* Mode & Topic Selector Section */}
      <ModeSelector
        onStartMode={onStartMode}
        incorrectCount={progressStore.incorrectQuestionIds.length}
        bookmarkedCount={progressStore.bookmarkedQuestionIds.length}
      />
    </div>
  );
};
