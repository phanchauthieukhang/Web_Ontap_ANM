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
    <aside className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0e0f12] transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/10">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Danh sách câu hỏi ({questionIds.length})
          </h3>
        </div>
        <span className="rounded-lg bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          Câu #{questionIds[currentIndex]}
        </span>
      </div>

      {/* Mini Progress Bar & Counters */}
      <div className="my-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Tiến độ: <strong className="font-mono text-slate-900 dark:text-white">{answeredCount}/{questionIds.length}</strong>
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{progressPct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Status Legend / Live Counters */}
        {showImmediateFeedback ? (
          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-mono">
            <div className="flex items-center justify-center gap-1 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 py-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              <span>{correctCount} Đúng</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 py-1.5 text-rose-700 dark:text-rose-400 font-semibold">
              <XCircle className="h-3 w-3" />
              <span>{incorrectCount} Sai</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 py-1.5 text-amber-700 dark:text-amber-400 font-semibold">
              <Bookmark className="h-3 w-3" />
              <span>{bookmarkedIds.length} Lưu</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-sky-500 inline-block" /> Đã chọn ({answeredCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm border border-slate-300 dark:border-white/20 inline-block" /> Chưa làm ({questionIds.length - answeredCount})
            </span>
          </div>
        )}
      </div>

      {/* Question Number Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[calc(100vh-320px)] min-h-[180px] overflow-y-auto pr-1 pt-1">
        {questionIds.map((qId, idx) => {
          const isCurrent = idx === currentIndex;
          const answerRecord = userAnswers[qId];
          const isAnswered = !!answerRecord;
          const isBookmarked = bookmarkedIds.includes(qId);

          let btnClass =
            'border-slate-200/80 bg-slate-50/70 text-slate-700 hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-[#141519] dark:text-slate-300 dark:hover:bg-white/10';

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
            btnClass += ' ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-[#0e0f12] scale-[1.03]';
          }

          return (
            <button
              key={qId}
              ref={isCurrent ? activeBtnRef : null}
              onClick={() => onSelectIndex(idx)}
              className={`relative flex h-9 w-full items-center justify-center rounded-xl border text-xs font-mono transition-colors ${btnClass}`}
              title={`Câu ${qId}`}
            >
              {qId}
              {isBookmarked && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-[#0e0f12]" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
