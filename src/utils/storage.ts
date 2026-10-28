import { UserProgressStore } from '../types/quiz';

const STORAGE_KEY = 'anm_quiz_user_progress_v1';
const CURRENT_VERSION = 1;

export function getDefaultProgressStore(): UserProgressStore {
  return {
    version: CURRENT_VERSION,
    bookmarkedQuestionIds: [],
    incorrectQuestionIds: [],
    questionStats: {},
    completedExams: []
  };
}

/**
 * Safely load progress store from localStorage
 */
export function loadProgressStore(): UserProgressStore {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return getDefaultProgressStore();
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultProgressStore();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return getDefaultProgressStore();
    }
    return {
      version: parsed.version || CURRENT_VERSION,
      bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [],
      incorrectQuestionIds: Array.isArray(parsed.incorrectQuestionIds) ? parsed.incorrectQuestionIds : [],
      questionStats: parsed.questionStats && typeof parsed.questionStats === 'object' ? parsed.questionStats : {},
      completedExams: Array.isArray(parsed.completedExams) ? parsed.completedExams : []
    };
  } catch (err) {
    console.warn('Failed to parse localStorage progress, using default store:', err);
    return getDefaultProgressStore();
  }
}

/**
 * Safely save progress store to localStorage
 */
export function saveProgressStore(store: UserProgressStore): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

/**
 * Record a question attempt in the store
 */
export function recordQuestionAttempt(
  questionId: number,
  isCorrect: boolean,
  currentStore: UserProgressStore
): UserProgressStore {
  const updated = { ...currentStore };
  const currentStat = updated.questionStats[questionId] || {
    timesAnswered: 0,
    timesCorrect: 0
  };

  const newStat = {
    timesAnswered: currentStat.timesAnswered + 1,
    timesCorrect: currentStat.timesCorrect + (isCorrect ? 1 : 0),
    lastAnsweredCorrectly: isCorrect,
    lastAttemptTimestamp: Date.now()
  };

  updated.questionStats = {
    ...updated.questionStats,
    [questionId]: newStat
  };

  // Manage incorrect question IDs
  const incorrectSet = new Set(updated.incorrectQuestionIds);
  if (!isCorrect) {
    incorrectSet.add(questionId);
  } else {
    // If answered correctly now, keep in history but can remove from immediate review if preferred
    // In our requirement: "Không tự xóa toàn bộ lịch sử sai chỉ vì người dùng trả lời đúng một lần."
    // So we retain stat, but we can leave it in incorrect list or mark corrected.
  }
  updated.incorrectQuestionIds = Array.from(incorrectSet);

  saveProgressStore(updated);
  return updated;
}

/**
 * Toggle bookmark state for a question
 */
export function toggleBookmark(questionId: number, currentStore: UserProgressStore): UserProgressStore {
  const updated = { ...currentStore };
  const set = new Set(updated.bookmarkedQuestionIds);
  if (set.has(questionId)) {
    set.delete(questionId);
  } else {
    set.add(questionId);
  }
  updated.bookmarkedQuestionIds = Array.from(set);
  saveProgressStore(updated);
  return updated;
}

/**
 * Reset all progress data with confirmation
 */
export function resetAllProgress(): UserProgressStore {
  const fresh = getDefaultProgressStore();
  saveProgressStore(fresh);
  return fresh;
}
