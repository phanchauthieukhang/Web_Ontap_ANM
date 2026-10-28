import React, { useRef } from 'react';
import { Question } from '../types/quiz';
import { CryptoInteractiveLab } from './CryptoInteractiveLab';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, BookMarked, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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
  const panelRef = useRef<HTMLDivElement>(null);
  const isCorrect = selectedOptionId === question.correctOptionId;
  const correctOption = question.options.find((o) => o.id === question.correctOptionId);

  // Smooth expanding animation with GSAP (explicit fromTo for React 18 StrictMode safety)
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        panelRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );
    },
    { dependencies: [question.id], scope: panelRef, revertOnUpdate: true }
  );

  return (
    <div
      ref={panelRef}
      className="spatial-glass hud-corners mt-4 rounded-3xl border border-slate-200/70 p-5 sm:p-7 dark:border-white/15 transition-colors"
    >
      {/* Result Status Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              <XCircle className="h-6 w-6" />
            </div>
          )}
          <div>
            <h3
              className={`font-bold text-base sm:text-lg ${
                isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
              }`}
            >
              {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đáp án chuẩn của đề:{' '}
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {correctOption?.text}
              </span>
            </p>
          </div>
        </div>

        {/* Next Question CTA */}
        <button
          onClick={onNextQuestion}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        >
          {isLastQuestion ? 'Xem kết quả' : 'Câu tiếp theo (Enter)'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Rationale and Explanations */}
      <div className="mt-5 space-y-3.5">
        <div className="crystal-pod rounded-2xl p-4 border border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Căn cứ giải thích chi tiết:
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {question.explanation.correctRationale}
          </p>
        </div>

        {/* Key Takeaway */}
        <div className="rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            <BookMarked className="h-4 w-4" />
            Điểm cốt lõi cần nhớ:
          </div>
          <p className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-200">
            {question.explanation.keyTakeaway}
          </p>
        </div>

        {/* Academic Caution if present */}
        {question.academicNote && (
          <div className="rounded-2xl bg-amber-500/10 p-4 border border-amber-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Lưu ý học thuật & Cảnh báo bẫy thi cử:
            </div>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              {question.academicNote}
            </p>
          </div>
        )}

        {/* Dynamic Signature Lab Injection */}
        <CryptoInteractiveLab questionId={question.id} />
      </div>
    </div>
  );
};
