import React from 'react';
import { UserProgressStore } from '../types/quiz';
import { CheckCircle2, AlertCircle, Bookmark, Percent, Award } from 'lucide-react';

interface ProgressOverviewProps {
  progressStore: UserProgressStore;
  totalQuestions: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  progressStore,
  totalQuestions = 70,
}) => {
  const answeredIds = Object.keys(progressStore.questionStats).map(Number);
  const totalAnswered = answeredIds.length;
  const incorrectCount = progressStore.incorrectQuestionIds.length;
  const bookmarkedCount = progressStore.bookmarkedQuestionIds.length;

  // Correct calculation
  const totalAttempts = Object.values(progressStore.questionStats).reduce(
    (acc, curr) => acc + curr.timesAnswered,
    0
  );
  const totalCorrectAttempts = Object.values(progressStore.questionStats).reduce(
    (acc, curr) => acc + curr.timesCorrect,
    0
  );
  const accuracyRate = totalAttempts > 0 ? Math.round((totalCorrectAttempts / totalAttempts) * 100) : 0;
  const completionPercentage = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <div className="spatial-glass rounded-3xl border border-slate-200/80 p-5 sm:p-6 dark:border-white/15">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-white/10">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Tiến độ học tập tổng thể
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Dữ liệu lưu trữ cục bộ trên trình duyệt (localStorage an toàn, không cần tài khoản)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {totalAnswered}/{totalQuestions} câu đã học ({completionPercentage}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 dark:bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Đã làm
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {totalAnswered} <span className="text-xs font-normal text-slate-400">/ {totalQuestions}</span>
          </div>
        </div>

        <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3.5 dark:border-rose-950/40 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-medium">
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            Cần ôn lại (Sai)
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono">
            {incorrectCount}
          </div>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3.5 dark:border-amber-950/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-medium">
            <Bookmark className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Đã đánh dấu
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {bookmarkedCount}
          </div>
        </div>

        <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-3.5 dark:border-sky-950/40 dark:bg-sky-950/20">
          <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 text-xs font-medium">
            <Percent className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            Tỷ lệ đúng
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400 font-mono">
            {accuracyRate}%
          </div>
        </div>
      </div>
    </div>
  );
};
