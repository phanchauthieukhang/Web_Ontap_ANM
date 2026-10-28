import { Question, Option } from '../types/quiz';

/**
 * Fisher-Yates shuffle algorithm for array elements
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffle options of a single question while keeping option IDs consistent
 */
export function shuffleQuestionOptions(question: Question): Question {
  // If boolean question (True/False), do not shuffle to keep standard layout (A: Đúng, B: Sai)
  if (question.answerType === 'boolean') {
    return question;
  }
  return {
    ...question,
    options: shuffleArray(question.options)
  };
}

/**
 * Check if selected option is correct based on question data
 */
export function evaluateAnswer(question: Question, selectedOptionId: string): boolean {
  return selectedOptionId === question.correctOptionId;
}

/**
 * Format time in seconds to mm:ss format
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
