import React from 'react';
import { Question } from '../types/quiz';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, BookMarked, ArrowRight } from 'lucide-react';

interface ExplanationPanelProps {
  question: Question;
  selectedOptionId?: string;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  question,
  selectedOptionId,
  onNextQuestion,
  isLastQuestion,
}) => {
  const isCorrect = selectedOptionId === question.correctOptionId;
  const correctOption = question.options.find((o) => o.id === question.correctOptionId);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Result Status Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
              <XCircle className="h-5 w-5" />
            </div>
          )}
          <div>
            <h3 className={`font-bold text-base ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đáp án chuẩn: <span className="font-semibold text-slate-900 dark:text-white font-mono">{correctOption?.text}</span>
            </p>
          </div>
        </div>

        {/* Next Question CTA */}
        <button
          onClick={onNextQuestion}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        >
          {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Rationale and Explanations */}
      <div className="mt-4 space-y-3.5">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Giải thích chi tiết:
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {question.explanation.correctRationale}
          </p>
        </div>

        {/* Key takeaway */}
        <div className="rounded-xl bg-emerald-50/60 p-3.5 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1">
            <BookMarked className="h-4 w-4" />
            Điểm cốt lõi cần nhớ:
          </div>
          <p className="text-xs sm:text-sm font-medium text-emerald-900 dark:text-emerald-300">
            {question.explanation.keyTakeaway}
          </p>
        </div>

        {/* Academic Caution if present */}
        {question.academicNote && (
          <div className="rounded-xl bg-amber-50/70 p-3.5 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Lưu ý học thuật & Cảnh báo bẫy thi cử:
            </div>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
              {question.academicNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
