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

  // Staggered entrance animation on question change (using explicit fromTo to remain 100% safe under React 18 StrictMode)
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline();
      tl.fromTo(
        '.anim-question-title',
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
      tl.fromTo(
        '.anim-option-btn',
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.22,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="spatial-glass spotlight-card rounded-3xl border border-slate-200/80 p-6 sm:p-8 dark:border-white/15 transition-colors"
    >
      {/* Top Metadata Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 items-center justify-center rounded-lg bg-emerald-500/15 px-3 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-mono border border-emerald-400/40 dark:border-emerald-500/40 shadow-sm shadow-emerald-500/10">
            <CipherText text={`CÂU ${question.id}`} duration={0.3} />
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">
            [{currentIndex + 1} / {totalInSession}]
          </span>
          <span className="hidden sm:inline-flex items-center rounded-lg bg-slate-100/80 dark:bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/10">
            {question.topicName}
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
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
              isBookmarked
                ? 'border-amber-400/60 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/60 dark:text-amber-300 shadow-sm shadow-amber-500/10'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5'
            }`}
            title="Đánh dấu câu hỏi này (Shift + B)"
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Đã lưu' : 'Lưu câu'}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="relative z-10 py-6">
        <h2 className="anim-question-title text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed tracking-tight">
          {question.displayQuestion}
        </h2>
        {question.originalQuestion !== question.displayQuestion && (
          <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">
            * Nguyên văn đề gốc: "{question.originalQuestion}"
          </div>
        )}
      </div>

      {/* Options List with 3D Tactile Keycaps */}
      <div className="relative z-10 space-y-3.5 pt-1">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;
          const showAnswerStyle = showImmediateFeedback && isConfirmed;

          let optionStyle =
            'border-slate-200/90 hover:border-emerald-500/50 dark:border-white/10 dark:hover:border-emerald-400/50 bg-white/70 dark:bg-[#13161f]/80 hover:bg-white dark:hover:bg-[#181c28] shadow-sm';
          let keycapStyle =
            'bg-slate-100 dark:bg-[#1e2230] text-slate-800 dark:text-slate-200 shadow-[0_3px_0_#cbd5e1] dark:shadow-[0_3px_0_#090b10]';
          let textStyle = 'text-slate-800 dark:text-slate-100';

          if (isSelected) {
            optionStyle =
              'border-sky-500 bg-sky-50/70 dark:bg-sky-950/35 dark:border-sky-400 ring-1 ring-sky-500/60 shadow-lg shadow-sky-500/10';
            keycapStyle = 'bg-sky-600 text-white shadow-[0_3px_0_#0369a1]';
            textStyle = 'text-sky-950 dark:text-sky-100 font-semibold';
          }

          if (showAnswerStyle) {
            if (isCorrect) {
              optionStyle =
                'scanline-effect border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/45 dark:border-emerald-400 ring-2 ring-emerald-500/60 shadow-lg shadow-emerald-500/15';
              keycapStyle = 'bg-emerald-500 text-white shadow-[0_3px_0_#047857]';
              textStyle = 'text-emerald-950 dark:text-emerald-100 font-bold';
            } else if (isSelected && !isCorrect) {
              optionStyle =
                'border-rose-500 bg-rose-50/90 dark:bg-rose-950/45 dark:border-rose-500 ring-2 ring-rose-500/50 shadow-lg shadow-rose-500/15';
              keycapStyle = 'bg-rose-600 text-white shadow-[0_3px_0_#be123c]';
              textStyle = 'text-rose-950 dark:text-rose-200 font-medium';
            } else {
              optionStyle =
                'border-slate-200/50 dark:border-white/5 bg-slate-50/40 dark:bg-[#0d0f14]/50 opacity-55';
            }
          }

          const optLetter = String.fromCharCode(65 + idx);
          const isPhysicallyPressed = activeKey === optLetter || activeKey === String(idx + 1);

          return (
            <button
              key={option.id}
              disabled={isConfirmed && showImmediateFeedback}
              onClick={() => onSelectOption(option.id)}
              className={`anim-option-btn group relative flex w-full items-start gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-colors ${optionStyle} ${
                isPhysicallyPressed ? 'translate-y-[1px]' : ''
              } ${isConfirmed && showImmediateFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* 3D Hardware Keycap */}
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold font-mono border border-slate-200/60 dark:border-white/15 transition-colors ${keycapStyle} ${
                  isPhysicallyPressed ? 'translate-y-[2px] shadow-none' : ''
                }`}
              >
                {showAnswerStyle && isCorrect ? (
                  <Check className="h-4 w-4 stroke-[2.5]" />
                ) : showAnswerStyle && isSelected && !isCorrect ? (
                  <X className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  optLetter
                )}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-1">
                <span className={`text-base sm:text-[17px] leading-relaxed block ${textStyle}`}>
                  {option.text}
                </span>
                {showAnswerStyle && !isCorrect && isSelected && option.distractorRationale && (
                  <p className="mt-2 text-xs sm:text-sm text-rose-600 dark:text-rose-300 font-medium bg-rose-500/10 rounded-xl px-3 py-2 border border-rose-500/20">
                    {option.distractorRationale}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-200/70 dark:border-white/10">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-emerald-500" />
          Phím tắt: Bấm{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
            A-D
          </kbd>{' '}
          hoặc{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
            1-4
          </kbd>{' '}
          để chọn nhanh.
        </span>
        <span className="font-mono text-[11px] text-emerald-600/80 dark:text-emerald-400/80">
          {question.conceptName}
        </span>
      </div>
    </div>
  );
};
