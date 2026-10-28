import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizSessionState, UserProgressStore } from '../types/quiz';
import { QuestionCard } from '../components/QuestionCard';
import { ExplanationPanel } from '../components/ExplanationPanel';
import { QuestionNavigator } from '../components/QuestionNavigator';
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
      // Don't intercept if modifier keys pressed
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();
      if (!isConfirmed || isExamMode) {
        if (key === 'A' || key === '1') onAnswerQuestion(currentQuestionId, 'A');
        if (key === 'B' || key === '2') onAnswerQuestion(currentQuestionId, 'B');
        if (key === 'C' || key === '3') onAnswerQuestion(currentQuestionId, 'C');
        if (key === 'D' || key === '4') onAnswerQuestion(currentQuestionId, 'D');
      }

      if (isConfirmed && showImmediateFeedback && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onNextQuestion();
      }

      if (key === 'B' && e.shiftKey) {
        onToggleBookmark(currentQuestionId);
      }
    },
    [currentQuestionId, isConfirmed, isExamMode, onAnswerQuestion, onNextQuestion, onToggleBookmark, showImmediateFeedback]
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

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Top Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToHome}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </button>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {session.mode === 'sequential' && 'Chế độ Làm tuần tự (1 → 70)'}
            {session.mode === 'random' && 'Chế độ Luyện ngẫu nhiên'}
            {session.mode === 'topic' && 'Chế độ Luyện theo chủ đề'}
            {session.mode === 'incorrect' && 'Chế độ Ôn câu làm sai'}
            {session.mode === 'bookmarked' && 'Chế độ Câu hỏi đánh dấu'}
            {session.mode === 'exam' && 'Phòng thi thử mô phỏng'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Exam Countdown Timer */}
          {isExamMode && (
            <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-mono font-bold border ${
              remainingSeconds < 300 
                ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900 animate-pulse'
                : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
            }`}>
              <Timer className="h-4 w-4" />
              {formatDuration(remainingSeconds)}
            </div>
          )}

          {/* Submit Exam Button */}
          <button
            onClick={onFinishSession}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition"
          >
            <Send className="h-3.5 w-3.5" />
            {isExamMode ? 'Nộp bài thi' : 'Kết thúc phiên'}
          </button>
        </div>
      </div>

      {/* Main Question Card */}
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

      {/* Immediate Explanation Panel (in Practice Mode) */}
      {showImmediateFeedback && isConfirmed && (
        <ExplanationPanel
          question={currentQuestion}
          selectedOptionId={currentAnswerRecord.selectedOptionId}
          onNextQuestion={isLastQuestion ? onFinishSession : onNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}

      {/* Exam Mode Navigation Actions */}
      {isExamMode && (
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={session.currentIndex === 0}
            onClick={() => onSelectIndex(session.currentIndex - 1)}
            className={`rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold transition ${
              session.currentIndex > 0
                ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                : 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800'
            }`}
          >
            ← Câu trước
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Đã làm: <strong className="text-slate-900 dark:text-white font-mono">{answeredCount}</strong> / {totalCount} câu
          </span>

          <button
            onClick={() => {
              if (isLastQuestion) {
                onFinishSession();
              } else {
                onSelectIndex(session.currentIndex + 1);
              }
            }}
            className="rounded-xl bg-emerald-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition"
          >
            {isLastQuestion ? 'Nộp bài thi' : 'Câu kế tiếp →'}
          </button>
        </div>
      )}

      {/* Fast Question Navigator Drawer / Grid */}
      <QuestionNavigator
        questionIds={session.questionIds}
        currentIndex={session.currentIndex}
        userAnswers={session.userAnswers}
        bookmarkedIds={progressStore.bookmarkedQuestionIds}
        onSelectIndex={onSelectIndex}
        showImmediateFeedback={showImmediateFeedback}
      />
    </div>
  );
};
