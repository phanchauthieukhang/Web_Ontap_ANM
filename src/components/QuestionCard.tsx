import React from 'react';
import { Question } from '../types/quiz';
import { Bookmark, AlertCircle, Check, X, Info } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  isConfirmed: boolean;
  onSelectOption: (optionId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  showImmediateFeedback: boolean; // false in exam mode
  currentIndex: number;
  totalInSession: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  isConfirmed,
  onSelectOption,
  isBookmarked,
  onToggleBookmark,
  showImmediateFeedback,
  currentIndex,
  totalInSession,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Top Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-7 items-center justify-center rounded-md bg-emerald-100 px-2.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
            Câu {question.id} / 70
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            (Tiến độ: {currentIndex + 1}/{totalInSession})
          </span>
          {question.questionPolarity === 'negative' && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <AlertCircle className="h-3 w-3" />
              Câu hỏi phủ định
            </span>
          )}
        </div>

        {/* Action Controls: Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition ${
              isBookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
            title="Đánh dấu câu hỏi này để ôn lại sau"
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Đã lưu' : 'Lưu câu này'}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="py-5">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
          {question.displayQuestion}
        </h2>
        {question.originalQuestion !== question.displayQuestion && (
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">
            * Nguyên văn đề gốc: "{question.originalQuestion}"
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2.5 pt-1">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;
          const showAnswerStyle = showImmediateFeedback && isConfirmed;

          let optionStyle = 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-white dark:bg-slate-900';
          let badgeStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          let textStyle = 'text-slate-800 dark:text-slate-200';

          if (isSelected) {
            optionStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500 ring-1 ring-emerald-500';
            badgeStyle = 'bg-emerald-600 text-white';
          }

          if (showAnswerStyle) {
            if (isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/50';
              badgeStyle = 'bg-emerald-600 text-white';
              textStyle = 'text-emerald-950 dark:text-emerald-200 font-medium';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-500 ring-2 ring-rose-500/50';
              badgeStyle = 'bg-rose-600 text-white';
              textStyle = 'text-rose-950 dark:text-rose-200';
            }
          }

          const shortcutLabel = question.answerType === 'boolean' 
            ? (option.id === 'A' ? 'A (Đúng)' : 'B (Sai)')
            : `${String.fromCharCode(65 + idx)}`;

          return (
            <button
              key={option.id}
              disabled={isConfirmed && showImmediateFeedback}
              onClick={() => onSelectOption(option.id)}
              className={`group flex w-full items-start gap-3.5 rounded-xl border p-3.5 sm:p-4 text-left transition-all ${optionStyle} ${
                isConfirmed && showImmediateFeedback ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {/* Option Letter Tag */}
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold font-mono transition-colors ${badgeStyle}`}
              >
                {showAnswerStyle && isCorrect ? (
                  <Check className="h-4 w-4" />
                ) : showAnswerStyle && isSelected && !isCorrect ? (
                  <X className="h-4 w-4" />
                ) : (
                  shortcutLabel[0]
                )}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-0.5">
                <span className={`text-sm sm:text-base leading-snug ${textStyle}`}>
                  {option.text}
                </span>
                {showAnswerStyle && !isCorrect && isSelected && option.distractorRationale && (
                  <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                    {option.distractorRationale}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <span className="flex items-center gap-1">
          <Info className="h-3.5 w-3.5" />
          Phím tắt: Bấm <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">A-D</kbd> hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">1-4</kbd> để chọn nhanh.
        </span>
        <span className="font-mono text-[11px]">
          {question.conceptName}
        </span>
      </div>
    </div>
  );
};
