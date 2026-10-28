import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizSessionState, UserProgressStore } from '../types/quiz';
import { QuestionCard } from '../components/QuestionCard';
import { ExplanationPanel } from '../components/ExplanationPanel';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { CyberCanvas3D } from '../components/CyberCanvas3D';
import { formatDuration } from '../utils/quiz-engine';
import { Timer, ArrowLeft, Send } from 'lucide-react';

interface QuizPageProps {
  session: QuizSessionState;
  questionsMap: Record<number, Question>;
  progressStore: UserProgressStore;
  onAnswerQuestion: (questionId: number, selectedOptionId: string) => void;
  onToggleBookmark: (questionId: number) => void;
  onNextQuestion: () => void;
  onSelectIndex: (index: number) => void;
  onFinishSession: () => void;
  onExitToHome: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  session,
  questionsMap,
  progressStore,
  onAnswerQuestion,
  onToggleBookmark,
  onNextQuestion,
  onSelectIndex,
  onFinishSession,
  onExitToHome,
}) => {
  const currentQuestionId = session.questionIds[session.currentIndex];
  const currentQuestion = questionsMap[currentQuestionId];
  const currentAnswerRecord = session.userAnswers[currentQuestionId];
  const isConfirmed = !!currentAnswerRecord;
  const isBookmarked = progressStore.bookmarkedQuestionIds.includes(currentQuestionId);

  const isExamMode = session.mode === 'exam';
  const showImmediateFeedback = !isExamMode;

  // 3D Mini Orb state
  const feedback3DState = isConfirmed
    ? currentAnswerRecord.isCorrect
      ? 'correct'
      : 'incorrect'
    : 'idle';

  // Timer logic for Exam mode
  const [remainingSeconds, setRemainingSeconds] = useState<number>(session.timeLimitSeconds || 0);

  useEffect(() => {
    if (!isExamMode || !session.timeLimitSeconds) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
      const remaining = Math.max(0, (session.timeLimitSeconds || 0) - elapsed);
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onFinishSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamMode, session.startTime, session.timeLimitSeconds, onFinishSession]);

  // Keyboard Navigation: 1-4, A-D, Enter, Space
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();
      if (!isConfirmed || isExamMode) {
        if (!currentQuestion) return;
        let targetOptId: string | undefined;
        if (key === 'A' || key === '1') targetOptId = currentQuestion.options[0]?.id;
        if (key === 'B' || key === '2') targetOptId = currentQuestion.options[1]?.id;
        if (key === 'C' || key === '3') targetOptId = currentQuestion.options[2]?.id;
        if (key === 'D' || key === '4') targetOptId = currentQuestion.options[3]?.id;

        if (targetOptId) {
          onAnswerQuestion(currentQuestionId, targetOptId);
        }
      }

      if (isConfirmed && showImmediateFeedback && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onNextQuestion();
      }

      if (key === 'B' && e.shiftKey) {
        onToggleBookmark(currentQuestionId);
      }
    },
    [currentQuestionId, currentQuestion, isConfirmed, isExamMode, onAnswerQuestion, onNextQuestion, onToggleBookmark, showImmediateFeedback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!currentQuestion) {
    return (
      <div className="py-12 text-center text-slate-500">
        Không tìm thấy dữ liệu câu hỏi. Đang quay lại trang chủ...
      </div>
    );
  }

  const answeredCount = Object.keys(session.userAnswers).length;
  const totalCount = session.questionIds.length;
  const isLastQuestion = session.currentIndex === totalCount - 1;

  // Determine current active topology
  const topology =
    currentQuestion.topicId === 'topic-governance-iso'
      ? 'governance'
      : currentQuestion.topicId === 'topic-cryptography'
      ? 'cryptography'
      : 'threats';

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Session Bar */}
      <div className="spatial-glass flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200/80 px-5 py-3.5 dark:border-white/15 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToHome}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Trang chủ
          </button>

          {/* Mini 3D State Orb */}
          <div className="flex items-center gap-2.5 pl-1 border-l border-slate-200 dark:border-white/10">
            <CyberCanvas3D
              isMiniOrb={true}
              topology={topology}
              feedbackState={feedback3DState}
              className="h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15"
            />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {session.mode === 'sequential' && 'Tuần tự (1 → 70)'}
              {session.mode === 'random' && 'Luyện ngẫu nhiên'}
              {session.mode === 'topic' && 'Luyện theo chủ đề'}
              {session.mode === 'incorrect' && 'Ôn câu làm sai'}
              {session.mode === 'bookmarked' && 'Câu đánh dấu'}
              {session.mode === 'exam' && 'Phòng thi thử'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Exam Countdown Timer */}
          {isExamMode && (
            <div
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-mono font-bold border ${
                remainingSeconds < 300
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900 animate-pulse'
                  : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-white/10'
              }`}
            >
              <Timer className="h-4 w-4" />
              {formatDuration(remainingSeconds)}
            </div>
          )}

          {/* Submit Exam Button */}
          <button
            onClick={onFinishSession}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
          >
            <Send className="h-3.5 w-3.5" />
            {isExamMode ? 'Nộp bài thi' : 'Kết thúc'}
          </button>
        </div>
      </div>

      {/* Asymmetric Two-Column Layout: Expanded Question Area (1fr ~78%) + Compact Sticky Sidebar (272px-290px) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_272px] xl:grid-cols-[minmax(0,1fr)_290px] gap-6 items-start">
        {/* Main Question Area */}
        <div className="space-y-4">
          <QuestionCard
            question={currentQuestion}
            selectedOptionId={currentAnswerRecord?.selectedOptionId}
            isConfirmed={isConfirmed}
            onSelectOption={(optId) => onAnswerQuestion(currentQuestionId, optId)}
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(currentQuestionId)}
            showImmediateFeedback={showImmediateFeedback}
            currentIndex={session.currentIndex}
            totalInSession={totalCount}
          />

          {/* Quick Previous / Next Navigation Bar */}
          <div className="spatial-glass flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/10 px-4 py-2.5">
            <button
              disabled={session.currentIndex === 0}
              onClick={() => onSelectIndex(session.currentIndex - 1)}
              className={`rounded-xl border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition ${
                session.currentIndex > 0
                  ? 'border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10'
                  : 'opacity-40 cursor-not-allowed border-slate-200 dark:border-white/10 text-slate-400'
              }`}
            >
              ← Câu trước
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Đã làm: <strong className="text-slate-900 dark:text-white font-bold">{answeredCount}</strong> / {totalCount} câu
            </span>

            <button
              onClick={() => {
                if (isLastQuestion) {
                  onFinishSession();
                } else {
                  onSelectIndex(session.currentIndex + 1);
                }
              }}
              className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition"
            >
              {isLastQuestion ? (isExamMode ? 'Nộp bài thi' : 'Xem kết quả') : 'Câu kế tiếp →'}
            </button>
          </div>

          {/* Immediate Explanation Panel (in Practice Mode) */}
          {showImmediateFeedback && isConfirmed && (
            <ExplanationPanel
              question={currentQuestion}
              selectedOptionId={currentAnswerRecord.selectedOptionId}
              onNextQuestion={isLastQuestion ? onFinishSession : onNextQuestion}
              isLastQuestion={isLastQuestion}
            />
          )}
        </div>

        {/* Compact Side Question Navigator (Sticky on Desktop) */}
        <div className="lg:sticky lg:top-20">
          <QuestionNavigator
            questionIds={session.questionIds}
            currentIndex={session.currentIndex}
            userAnswers={session.userAnswers}
            bookmarkedIds={progressStore.bookmarkedQuestionIds}
            onSelectIndex={onSelectIndex}
            showImmediateFeedback={showImmediateFeedback}
          />
        </div>
      </div>
    </div>
  );
};
