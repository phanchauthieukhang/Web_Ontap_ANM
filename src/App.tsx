import React, { useState, useEffect, useMemo } from 'react';
import { Question, QuizMode, QuizSessionState, UserProgressStore } from './types/quiz';
import questionsRaw from './data/questions.json';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { KnowledgeLibraryModal } from './components/KnowledgeLibraryModal';
import {
  loadProgressStore,
  recordQuestionAttempt,
  toggleBookmark,
  resetAllProgress
} from './utils/storage';
import { shuffleArray, shuffleQuestionOptions, evaluateAnswer } from './utils/quiz-engine';

export const App: React.FC = () => {
  // Theme dark/light state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Questions Database map
  const questionsMap = useMemo<Record<number, Question>>(() => {
    const map: Record<number, Question> = {};
    (questionsRaw as Question[]).forEach((q) => {
      map[q.id] = q;
    });
    return map;
  }, []);

  // Persistent Progress Store
  const [progressStore, setProgressStore] = useState<UserProgressStore>(() => loadProgressStore());

  // App Page state: 'home' | 'quiz' | 'result'
  const [currentPage, setCurrentPage] = useState<'home' | 'quiz' | 'result'>('home');
  const [activeSession, setActiveSession] = useState<QuizSessionState | null>(null);

  // Modal Library State
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);

  // Start a Quiz Mode
  const handleStartMode = (
    mode: QuizMode,
    topicId?: string,
    examConfig?: { questionCount: number; timeMinutes: number }
  ) => {
    let questionIds: number[] = [];

    if (mode === 'sequential') {
      // 1 to 70
      questionIds = (questionsRaw as Question[]).map((q) => q.id);
    } else if (mode === 'random') {
      questionIds = shuffleArray((questionsRaw as Question[]).map((q) => q.id));
    } else if (mode === 'topic' && topicId) {
      questionIds = (questionsRaw as Question[])
        .filter((q) => q.topicId === topicId)
        .map((q) => q.id);
    } else if (mode === 'incorrect') {
      questionIds = [...progressStore.incorrectQuestionIds];
      if (questionIds.length === 0) {
        alert('Hiện bạn chưa có câu hỏi nào bị trả lời sai!');
        return;
      }
    } else if (mode === 'bookmarked') {
      questionIds = [...progressStore.bookmarkedQuestionIds];
      if (questionIds.length === 0) {
        alert('Hiện bạn chưa đánh dấu câu hỏi nào!');
        return;
      }
    } else if (mode === 'exam') {
      const allIds = (questionsRaw as Question[]).map((q) => q.id);
      const count = examConfig?.questionCount || 40;
      questionIds = shuffleArray(allIds).slice(0, count);
    }

    const session: QuizSessionState = {
      mode,
      topicId,
      questionIds,
      currentIndex: 0,
      userAnswers: {},
      bookmarkedIds: [...progressStore.bookmarkedQuestionIds],
      startTime: Date.now(),
      timeLimitSeconds: mode === 'exam' ? (examConfig?.timeMinutes || 30) * 60 : undefined,
      isCompleted: false,
    };

    setActiveSession(session);
    setCurrentPage('quiz');
  };

  // Handle User Answer
  const handleAnswerQuestion = (questionId: number, selectedOptionId: string) => {
    if (!activeSession) return;
    const question = questionsMap[questionId];
    if (!question) return;

    const isCorrect = evaluateAnswer(question, selectedOptionId);

    // Update in-session answers
    const updatedAnswers = {
      ...activeSession.userAnswers,
      [questionId]: {
        questionId,
        selectedOptionId,
        isCorrect,
        timestamp: Date.now(),
      },
    };

    setActiveSession({
      ...activeSession,
      userAnswers: updatedAnswers,
    });

    // Record into persistent progress store immediately
    const updatedStore = recordQuestionAttempt(questionId, isCorrect, progressStore);
    setProgressStore(updatedStore);
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex < activeSession.questionIds.length - 1) {
      setActiveSession({
        ...activeSession,
        currentIndex: activeSession.currentIndex + 1,
      });
    } else {
      handleFinishSession();
    }
  };

  // Handle Question Index Jump
  const handleSelectIndex = (index: number) => {
    if (!activeSession) return;
    if (index >= 0 && index < activeSession.questionIds.length) {
      setActiveSession({
        ...activeSession,
        currentIndex: index,
      });
    }
  };

  // Handle Toggle Bookmark
  const handleToggleBookmark = (questionId: number) => {
    const updatedStore = toggleBookmark(questionId, progressStore);
    setProgressStore(updatedStore);
  };

  // Handle Finish Session
  const handleFinishSession = () => {
    if (!activeSession) return;
    setActiveSession({
      ...activeSession,
      isCompleted: true,
    });
    setCurrentPage('result');
  };

  // Handle Reset Progress with confirmation
  const handleResetProgress = () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập, danh sách câu sai và câu đánh dấu không?'
    );
    if (confirmed) {
      const fresh = resetAllProgress();
      setProgressStore(fresh);
      alert('Đã đặt lại tiến độ học tập thành công!');
    }
  };

  // Handle Retry only incorrect questions from Result Page
  const handleRetryIncorrect = (incorrectIds: number[]) => {
    if (incorrectIds.length === 0) return;
    const session: QuizSessionState = {
      mode: 'incorrect',
      questionIds: [...incorrectIds],
      currentIndex: 0,
      userAnswers: {},
      bookmarkedIds: [...progressStore.bookmarkedQuestionIds],
      startTime: Date.now(),
      isCompleted: false,
    };
    setActiveSession(session);
    setCurrentPage('quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Universal Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onResetProgress={handleResetProgress}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onGoHome={() => setCurrentPage('home')}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentPage === 'home' && (
          <HomePage
            progressStore={progressStore}
            onStartMode={handleStartMode}
            onOpenLibrary={() => setIsLibraryOpen(true)}
          />
        )}

        {currentPage === 'quiz' && activeSession && (
          <QuizPage
            session={activeSession}
            questionsMap={questionsMap}
            progressStore={progressStore}
            onAnswerQuestion={handleAnswerQuestion}
            onToggleBookmark={handleToggleBookmark}
            onNextQuestion={handleNextQuestion}
            onSelectIndex={handleSelectIndex}
            onFinishSession={handleFinishSession}
            onExitToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'result' && activeSession && (
          <ResultPage
            session={activeSession}
            questionsMap={questionsMap}
            onRetryIncorrect={handleRetryIncorrect}
            onRestartSameMode={() => handleStartMode(activeSession.mode, activeSession.topicId)}
            onGoHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* Knowledge Library Modal */}
      <KnowledgeLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <p>
            Hệ thống Ôn tập Trắc nghiệm An toàn thông tin • Biên soạn theo chuẩn ngân hàng 70 câu hỏi và hệ thống hóa học thuật.
          </p>
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            Dữ liệu hoạt động 100% Offline • LocalStorage Version 1.0 • Không phụ thuộc AI API khi làm bài
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
