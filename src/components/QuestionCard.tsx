import React, { useRef, useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { CipherText } from './CipherText';
import { Bookmark, AlertCircle, Check, X, Info, Sparkles } from 'lucide-react';
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

  // Staggered entrance animation on question change (explicit fromTo for React 18 StrictMode safety)
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline();
      tl.fromTo(
        '.anim-question-title',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.26,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
      tl.fromTo(
        '.anim-option-btn',
        { y: 14, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.26,
          stagger: 0.045,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
        '-=0.16'
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

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  // Independent 3D Tilt for each Option Pod
  const handlePodMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - (y / rect.height)) * 8;
      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        duration: 0.22,
        ease: 'power2.out',
      });
    }
  };

  const handlePodMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <div ref={cardRef} className="space-y-4">
      {/* =========================================================
          PART 1: FLOATING HOLOGRAM QUESTION STAGE
          ========================================================= */}
      <div
        onMouseMove={handleCardMouseMove}
        className="spatial-glass spotlight-card hud-corners rounded-3xl border border-slate-200/80 dark:border-white/15 p-6 sm:p-7 transition-colors"
      >
        {/* Top Metadata Telemetry Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-7 items-center justify-center rounded-lg bg-emerald-500/20 px-3 text-xs font-bold text-emerald-700 dark:text-emerald-300 font-mono border border-emerald-400/40 shadow-sm shadow-emerald-500/10">
              <CipherText text={`CÂU ${question.id}`} duration={0.3} />
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 font-mono bg-white/40 dark:bg-white/5 px-2.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-white/10">
              {currentIndex + 1} / {totalInSession}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-mono text-sky-700 dark:text-sky-300 border border-sky-500/25">
              <Sparkles className="h-3 w-3" />
              {question.conceptName}
            </span>
            {question.questionPolarity === 'negative' && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300 border border-amber-400/50 animate-pulse">
                <AlertCircle className="h-3.5 w-3.5" />
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
                  ? 'border-amber-400/70 bg-amber-500/20 text-amber-800 dark:text-amber-300 shadow-sm shadow-amber-500/15'
                  : 'border-slate-300/70 dark:border-white/15 bg-white/40 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-amber-400/50'
              }`}
              title="Đánh dấu câu hỏi này (Shift + B)"
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Đã lưu' : 'Lưu câu'}</span>
            </button>
          </div>
        </div>

        {/* Question Prompt Typography */}
        <div className="relative z-10 pt-5 pb-1">
          <h2 className="anim-question-title text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed tracking-tight drop-shadow-sm">
            {question.displayQuestion}
          </h2>
          {question.originalQuestion !== question.displayQuestion && (
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">
              * Nguyên văn đề gốc: "{question.originalQuestion}"
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          PART 2: FLOATING 2x2 SPATIAL OPTION MATRIX PODS
          (Sleek inline pods — no wasted top header row)
          ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;
          const showAnswerStyle = showImmediateFeedback && isConfirmed;

          let podStyle =
            'crystal-pod border-slate-200/80 hover:border-emerald-400/60 dark:border-white/15 dark:hover:border-emerald-400/60';
          let keycapStyle =
            'bg-white/80 dark:bg-white/10 text-slate-900 dark:text-white border-slate-300/80 dark:border-white/20 shadow-[0_3px_0_rgba(148,163,184,0.5)] dark:shadow-[0_3px_0_rgba(0,0,0,0.6)]';
          let textStyle = 'text-slate-800 dark:text-slate-100 font-medium';
          let badgeLabel = '';
          let badgeClass = '';

          if (isSelected) {
            podStyle =
              'crystal-pod border-sky-400 dark:border-sky-400 ring-2 ring-sky-500/40 shadow-lg shadow-sky-500/15 !bg-sky-500/15';
            keycapStyle = 'bg-sky-500 text-white border-sky-300 shadow-[0_3px_0_#0369a1]';
            textStyle = 'text-slate-950 dark:text-white font-bold';
            badgeLabel = 'ĐÃ CHỌN';
            badgeClass = 'text-sky-600 dark:text-sky-300 bg-sky-500/15 border-sky-500/30';
          }

          if (showAnswerStyle) {
            if (isCorrect) {
              podStyle =
                'crystal-pod scanline-effect border-emerald-400 dark:border-emerald-400 ring-2 ring-emerald-500/60 shadow-xl shadow-emerald-500/20 !bg-emerald-500/20';
              keycapStyle = 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_3px_0_#047857]';
              textStyle = 'text-emerald-950 dark:text-white font-bold';
              badgeLabel = 'ĐÚNG ✓';
              badgeClass = 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30';
            } else if (isSelected && !isCorrect) {
              podStyle =
                'crystal-pod border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/50 shadow-xl shadow-rose-500/20 !bg-rose-500/20';
              keycapStyle = 'bg-rose-500 text-white border-rose-300 shadow-[0_3px_0_#be123c]';
              textStyle = 'text-rose-950 dark:text-rose-100 font-semibold';
              badgeLabel = 'SAI ✗';
              badgeClass = 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/30';
            } else {
              podStyle = 'crystal-pod border-slate-200/40 dark:border-white/5 opacity-40';
            }
          }

          const optLetter = String.fromCharCode(65 + idx);
          const isPhysicallyPressed = activeKey === optLetter || activeKey === String(idx + 1);

          return (
            <button
              key={option.id}
              disabled={isConfirmed && showImmediateFeedback}
              onClick={() => onSelectOption(option.id)}
              onMouseMove={handlePodMouseMove}
              onMouseLeave={handlePodMouseLeave}
              className={`anim-option-btn spotlight-card hud-corners group relative flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-colors ${podStyle} ${
                isPhysicallyPressed ? 'translate-y-[1px]' : ''
              } ${isConfirmed && showImmediateFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {/* 3D Keycap inline on the left */}
              <div
                className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black font-mono border transition-colors ${keycapStyle} ${
                  isPhysicallyPressed ? 'translate-y-[2px] shadow-none' : ''
                }`}
              >
                {showAnswerStyle && isCorrect ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : showAnswerStyle && isSelected && !isCorrect ? (
                  <X className="h-4 w-4 stroke-[3]" />
                ) : (
                  optLetter
                )}
              </div>

              {/* Option Text & Distractor Rationale */}
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm sm:text-base leading-snug block ${textStyle}`}>
                    {option.text}
                  </span>
                  {badgeLabel && (
                    <span
                      className={`flex-shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${badgeClass}`}
                    >
                      {badgeLabel}
                    </span>
                  )}
                </div>

                {showAnswerStyle && !isCorrect && isSelected && option.distractorRationale && (
                  <p className="mt-2 text-xs text-rose-700 dark:text-rose-200 font-medium bg-rose-500/15 rounded-xl px-3 py-2 border border-rose-500/30">
                    {option.distractorRationale}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Floating Keyboard Hint Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-emerald-500" />
          Phím tắt cơ học:{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10 font-mono text-[10px] text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-white/15">
            A-D
          </kbd>{' '}
          hoặc{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10 font-mono text-[10px] text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-white/15">
            1-4
          </kbd>{' '}
          • Nhấn{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10 font-mono text-[10px] text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-white/15">
            Enter
          </kbd>{' '}
          qua câu kế tiếp
        </span>
        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
          {question.topicName}
        </span>
      </div>
    </div>
  );
};
