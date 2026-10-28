import React, { useState } from 'react';
import { QuizSessionState, Question } from '../types/quiz';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatDuration } from '../utils/quiz-engine';

interface ResultPageProps {
  session: QuizSessionState;
  questionsMap: Record<number, Question>;
  onRetryIncorrect: (incorrectIds: number[]) => void;
  onRestartSameMode: () => void;
  onGoHome: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  session,
  questionsMap,
  onRetryIncorrect,
  onRestartSameMode,
  onGoHome,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  const durationSeconds = Math.max(1, Math.floor((Date.now() - session.startTime) / 1000));
  const total = session.questionIds.length;

  let correctCount = 0;
  let incorrectCount = 0;
  const incorrectIds: number[] = [];

  session.questionIds.forEach((qId) => {
    const record = session.userAnswers[qId];
    if (record) {
      if (record.isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
        incorrectIds.push(qId);
      }
    } else {
      // Unanswered counts as incorrect in final tally
      incorrectCount++;
      incorrectIds.push(qId);
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const isPassed = percentage >= 70; // 70% threshold

  const displayedQuestionIds = session.questionIds.filter((qId) => {
    const record = session.userAnswers[qId];
    if (filterType === 'all') return true;
    if (filterType === 'correct') return record && record.isCorrect;
    if (filterType === 'incorrect') return !record || !record.isCorrect;
    return true;
  });

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Result Score Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center transition-colors">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-4 shadow-sm">
          <Award className="h-8 w-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {session.mode === 'exam' ? 'Kết quả Kỳ thi Thử Mô phỏng' : 'Tổng kết Phiên Luyện tập'}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isPassed
            ? 'Xuất sắc! Bạn đã đạt yêu cầu chuẩn kiến thức an toàn thông tin.'
            : 'Cần ôn tập thêm! Hãy xem kỹ lời giải và luyện lại các câu chưa đúng.'}
        </p>

        {/* Big Score Display */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
            {percentage}%
          </span>
          <div className="text-left border-l border-slate-200 dark:border-slate-800 pl-3">
            <span className="text-lg font-bold text-slate-900 dark:text-white block font-mono">
              {correctCount} / {total}
            </span>
            <span className="text-xs text-slate-400 font-medium">câu trả lời đúng</span>
          </div>
        </div>

        {/* Summary Metric Chips */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="rounded-xl bg-emerald-50/70 p-3 text-center dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> Đúng
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 font-mono">
              {correctCount}
            </div>
          </div>

          <div className="rounded-xl bg-rose-50/70 p-3 text-center dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
            <div className="flex items-center justify-center gap-1 text-rose-700 dark:text-rose-400 text-xs font-semibold">
              <XCircle className="h-3.5 w-3.5" /> Sai / Bỏ qua
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-rose-700 dark:text-rose-400 font-mono">
              {incorrectCount}
            </div>
          </div>

          <div className="rounded-xl bg-slate-100/70 p-3 text-center dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5" /> Thời gian
            </div>
            <div className="mt-1 text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 font-mono">
              {formatDuration(durationSeconds)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {incorrectCount > 0 && (
            <button
              onClick={() => onRetryIncorrect(incorrectIds)}
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-rose-700 transition"
            >
              <AlertTriangle className="h-4 w-4" />
              Luyện lại {incorrectCount} câu làm sai
            </button>
          )}

          <button
            onClick={onRestartSameMode}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Làm lại lượt mới
          </button>

          <button
            onClick={onGoHome}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </button>
        </div>
      </div>

      {/* Review List & Filter Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Chi tiết các câu hỏi trong phiên
          </h2>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl dark:bg-slate-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Tất cả ({total})
            </button>
            <button
              onClick={() => setFilterType('incorrect')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterType === 'incorrect'
                  ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-900 dark:text-rose-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Sai ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterType('correct')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                filterType === 'correct'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Đúng ({correctCount})
            </button>
          </div>
        </div>

        {/* Question Cards Accordion */}
        <div className="mt-5 space-y-3">
          {displayedQuestionIds.map((qId) => {
            const question = questionsMap[qId];
            if (!question) return null;

            const record = session.userAnswers[qId];
            const isCorrect = record && record.isCorrect;
            const isExpanded = expandedQuestionId === qId;
            const selectedOpt = question.options.find((o) => o.id === record?.selectedOptionId);
            const correctOpt = question.options.find((o) => o.id === question.correctOptionId);

            return (
              <div
                key={qId}
                className={`rounded-xl border transition-all ${
                  isCorrect
                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    : 'border-rose-200 dark:border-rose-950/60 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : qId)}
                  className="flex cursor-pointer items-start justify-between gap-3 p-4 select-none"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-mono font-bold mt-0.5 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 font-mono mr-1.5">
                        Câu {question.id}:
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {question.displayQuestion}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 text-slate-400">
                    <span className="text-xs font-medium hidden sm:inline">
                      {isExpanded ? 'Thu gọn' : 'Xem giải thích'}
                    </span>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-850/30 text-xs sm:text-sm">
                    {/* User Selection vs Correct Answer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-xs text-slate-400 font-medium block mb-1">
                          Lựa chọn của bạn:
                        </span>
                        <span className={`font-semibold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                          {selectedOpt ? `${selectedOpt.text}` : 'Chưa trả lời'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-xs text-slate-400 font-medium block mb-1">
                          Đáp án đúng của đề:
                        </span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {correctOpt?.text}
                        </span>
                      </div>
                    </div>

                    {/* Rationale */}
                    <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                      <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                        Căn cứ giải thích:
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {question.explanation.correctRationale}
                      </p>
                    </div>

                    {question.academicNote && (
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-300">
                        <strong>Lưu ý học thuật:</strong> {question.academicNote}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
