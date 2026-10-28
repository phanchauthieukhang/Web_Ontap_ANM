import React, { useEffect, useRef } from 'react';
import { UserAnswerRecord } from '../types/quiz';
import { LayoutGrid, CheckCircle2, XCircle, Bookmark } from 'lucide-react';

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
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active question button into view inside the sidebar grid
  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Compute live session counters
  let answeredCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  questionIds.forEach((qId) => {
    const rec = userAnswers[qId];
    if (rec) {
      answeredCount++;
      if (rec.isCorrect) correctCount++;
      else incorrectCount++;
    }
  });

  const progressPct = questionIds.length > 0 ? Math.round((answeredCount / questionIds.length) * 100) : 0;

  return (
    <aside className="spatial-glass rounded-3xl border border-slate-200/80 p-4 dark:border-white/15 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <LayoutGrid className="h-3.5 w-3.5 text-emerald-500" />
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Câu hỏi ({questionIds.length})
          </h3>
        </div>
        <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          #{questionIds[currentIndex]}
        </span>
      </div>

      {/* Mini Progress Bar & Counters */}
      <div className="my-3 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 dark:text-slate-400">
            Tiến độ: <strong className="font-mono text-slate-900 dark:text-white">{answeredCount}/{questionIds.length}</strong>
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{progressPct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Status Legend / Live Counters */}
        {showImmediateFeedback ? (
          <div className="grid grid-cols-3 gap-1 pt-0.5 text-[10px] font-mono">
            <div className="flex items-center justify-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 py-1 text-emerald-700 dark:text-emerald-300 font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              <span>{correctCount}</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-lg bg-rose-500/10 border border-rose-500/25 py-1 text-rose-700 dark:text-rose-300 font-semibold">
              <XCircle className="h-3 w-3" />
              <span>{incorrectCount}</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/25 py-1 text-amber-700 dark:text-amber-300 font-semibold">
              <Bookmark className="h-3 w-3" />
              <span>{bookmarkedIds.length}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-sky-500 inline-block" /> Đã chọn ({answeredCount})
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm border border-slate-300 dark:border-white/20 inline-block" /> Còn ({questionIds.length - answeredCount})
            </span>
          </div>
        )}
      </div>

      {/* Question Number Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 max-h-[calc(100vh-310px)] min-h-[160px] overflow-y-auto pr-1 pt-0.5">
        {questionIds.map((qId, idx) => {
          const isCurrent = idx === currentIndex;
          const answerRecord = userAnswers[qId];
          const isAnswered = !!answerRecord;
          const isBookmarked = bookmarkedIds.includes(qId);

          let btnClass =
            'border-slate-200/80 bg-white/60 text-slate-700 hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/10';

          if (isAnswered) {
            if (showImmediateFeedback) {
              if (answerRecord.isCorrect) {
                btnClass = 'border-emerald-500 bg-emerald-500/90 text-white font-bold shadow-sm shadow-emerald-500/20';
              } else {
                btnClass = 'border-rose-500 bg-rose-500/90 text-white font-bold shadow-sm shadow-rose-500/20';
              }
            } else {
              // Exam mode: Just indicate answered
              btnClass = 'border-sky-500 bg-sky-500/90 text-white font-bold shadow-sm shadow-sky-500/20';
            }
          }

          if (isCurrent) {
            btnClass += ' ring-2 ring-emerald-400 ring-offset-1 dark:ring-offset-[#0c0e14]';
          }

          return (
            <button
              key={qId}
              ref={isCurrent ? activeBtnRef : null}
              onClick={() => onSelectIndex(idx)}
              className={`relative flex h-8 w-full items-center justify-center rounded-lg border text-[11px] font-mono transition-colors ${btnClass}`}
              title={`Câu ${qId}`}
            >
              {qId}
              {isBookmarked && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-white dark:ring-[#0c0e14]" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
