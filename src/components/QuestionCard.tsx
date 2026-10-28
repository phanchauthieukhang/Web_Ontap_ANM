import React, { useRef, useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { CipherText } from './CipherText';
import { Bookmark, AlertCircle, Check, X, Info } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  isConfirmed: boolean;
  onSelectOption: (optionId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  showImmediateFeedback: boolean;
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Staggered entrance animation on question change
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline();
      tl.from('.anim-question-title', {
        y: 8,
        opacity: 0,
        duration: 0.28,
        ease: 'power3.out',
      });
      tl.from(
        '.anim-option-btn',
        {
          x: -12,
          opacity: 0,
          duration: 0.24,
          stagger: 0.045,
          ease: 'power2.out',
        },
        '-=0.15'
      );
    },
    { dependencies: [question.id], scope: cardRef, revertOnUpdate: true }
  );

  // Listen to keyboard keydown for physical 3D keycap feedback
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', '1', '2', '3', '4'].includes(k)) {
        setActiveKey(k);
      }
    };
    const handleUp = () => setActiveKey(null);

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-sm dark:border-white/10 dark:bg-[#0e0f12] transition-colors"
    >
      {/* Top Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-7 items-center justify-center rounded-lg bg-emerald-100 px-2.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-mono border border-emerald-300 dark:border-emerald-800">
            <CipherText text={`CÂU ${question.id}`} duration={0.3} />
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">
            [{currentIndex + 1} / {totalInSession}]
          </span>
          {question.questionPolarity === 'negative' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse">
              <AlertCircle className="h-3 w-3" />
              Câu hỏi phủ định
            </span>
          )}
        </div>

        {/* Action Controls: Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-medium border transition ${
              isBookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
            title="Đánh dấu câu hỏi này (Shift + B)"
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Đã lưu' : 'Lưu câu'}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="py-5">
        <h2 className="anim-question-title text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
          {question.displayQuestion}
        </h2>
        {question.originalQuestion !== question.displayQuestion && (
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">
            * Nguyên văn đề gốc: "{question.originalQuestion}"
          </div>
        )}
      </div>

      {/* Options List with 3D Keycaps */}
      <div className="space-y-3 pt-1">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;
          const showAnswerStyle = showImmediateFeedback && isConfirmed;

          let optionStyle =
            'border-slate-200/80 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20 bg-slate-50/50 dark:bg-[#121316]';
          let keycapStyle = 'bg-white dark:bg-[#1c1d22] text-slate-800 dark:text-slate-200 shadow-[0_2px_0_#cbd5e1] dark:shadow-[0_2px_0_#2b2d35]';
          let textStyle = 'text-slate-800 dark:text-slate-200';

          if (isSelected) {
            optionStyle = 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-500 ring-1 ring-emerald-500';
            keycapStyle = 'bg-emerald-600 text-white shadow-[0_2px_0_#047857]';
          }

          if (showAnswerStyle) {
            if (isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/50';
              keycapStyle = 'bg-emerald-600 text-white shadow-[0_2px_0_#047857]';
              textStyle = 'text-emerald-950 dark:text-emerald-200 font-semibold';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 dark:border-rose-500 ring-2 ring-rose-500/50';
              keycapStyle = 'bg-rose-600 text-white shadow-[0_2px_0_#be123c]';
              textStyle = 'text-rose-950 dark:text-rose-200';
            }
          }

          const optLetter = String.fromCharCode(65 + idx);
          const isPhysicallyPressed = activeKey === optLetter || activeKey === String(idx + 1);

          return (
            <button
              key={option.id}
              disabled={isConfirmed && showImmediateFeedback}
              onClick={() => onSelectOption(option.id)}
              className={`anim-option-btn group relative flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${optionStyle} ${
                isPhysicallyPressed ? 'translate-y-[1px]' : ''
              } ${isConfirmed && showImmediateFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* 3D Hardware Keycap */}
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold font-mono border border-slate-200/50 dark:border-white/10 transition-all ${keycapStyle} ${
                  isPhysicallyPressed ? 'translate-y-[2px] shadow-none' : ''
                }`}
              >
                {showAnswerStyle && isCorrect ? (
                  <Check className="h-4 w-4" />
                ) : showAnswerStyle && isSelected && !isCorrect ? (
                  <X className="h-4 w-4" />
                ) : (
                  optLetter
                )}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-0.5">
                <span className={`text-sm sm:text-base leading-snug ${textStyle}`}>
                  {option.text}
                </span>
                {showAnswerStyle && !isCorrect && isSelected && option.distractorRationale && (
                  <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
                    {option.distractorRationale}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="mt-5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-white/10">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" />
          Phím tắt: Bấm <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-500 border border-slate-200 dark:border-slate-700">A-D</kbd> hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-500 border border-slate-200 dark:border-slate-700">1-4</kbd> để chọn.
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          {question.conceptName}
        </span>
      </div>
    </div>
  );
};
