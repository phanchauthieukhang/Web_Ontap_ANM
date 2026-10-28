import React from 'react';
import { UserAnswerRecord } from '../types/quiz';

interface QuestionNavigatorProps {
  questionIds: number[];
  currentIndex: number;
  userAnswers: Record<number, UserAnswerRecord>;
  bookmarkedIds: number[];
  onSelectIndex: (index: number) => void;
  showImmediateFeedback: boolean;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questionIds,
  currentIndex,
  userAnswers,
  bookmarkedIds,
  onSelectIndex,
  showImmediateFeedback,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Danh sách câu hỏi ({questionIds.length})
        </h3>
        <span className="text-xs font-mono text-slate-400">
          Đang xem: #{questionIds[currentIndex]}
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-1.5 max-h-56 overflow-y-auto pr-1">
        {questionIds.map((qId, idx) => {
          const isCurrent = idx === currentIndex;
          const answerRecord = userAnswers[qId];
          const isAnswered = !!answerRecord;
          const isBookmarked = bookmarkedIds.includes(qId);

          let btnClass = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300';

          if (isAnswered) {
            if (showImmediateFeedback) {
              if (answerRecord.isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-500 text-white font-bold';
              } else {
                btnClass = 'border-rose-500 bg-rose-500 text-white font-bold';
              }
            } else {
              // Exam mode: Just indicate answered
              btnClass = 'border-sky-500 bg-sky-500 text-white font-bold';
            }
          }

          if (isCurrent) {
            btnClass += ' ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900';
          }

          return (
            <button
              key={qId}
              onClick={() => onSelectIndex(idx)}
              className={`relative flex h-8 w-full items-center justify-center rounded-lg border text-xs font-mono transition-all ${btnClass}`}
              title={`Câu ${qId}`}
            >
              {qId}
              {isBookmarked && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 ring-1 ring-white dark:ring-slate-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
