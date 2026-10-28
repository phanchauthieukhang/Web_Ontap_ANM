import { describe, it, expect } from 'vitest';
import questionsData from '../src/data/questions.json';
import { shuffleArray, shuffleQuestionOptions, evaluateAnswer } from '../src/utils/quiz-engine';
import { getDefaultProgressStore, recordQuestionAttempt, toggleBookmark } from '../src/utils/storage';
import { Question } from '../src/types/quiz';

describe('Questions Bank Integrity', () => {
  it('should have exactly 70 questions', () => {
    expect(questionsData.length).toBe(70);
  });

  it('should have sequential IDs from 1 to 70', () => {
    questionsData.forEach((q, idx) => {
      expect(q.id).toBe(idx + 1);
    });
  });

  it('each question should have exactly one correct option matching correctOptionId', () => {
    questionsData.forEach((q) => {
      const correctOpts = q.options.filter((o) => o.isCorrect);
      expect(correctOpts.length).toBe(1);
      expect(correctOpts[0].id).toBe(q.correctOptionId);
    });
  });

  it('Question 1 must be boolean with exactly 2 options', () => {
    const q1 = questionsData[0];
    expect(q1.id).toBe(1);
    expect(q1.answerType).toBe('boolean');
    expect(q1.options.length).toBe(2);
    expect(q1.correctOptionId).toBe('A');
  });

  it('Question 20 must preserve academic caution and original answer', () => {
    const q20 = questionsData.find((q) => q.id === 20);
    expect(q20).toBeDefined();
    expect(q20?.reviewStatus).toBe('academic_caution');
    expect(q20?.academicNote).toBeDefined();
    expect(q20?.originalAnswer).toContain('Ba ( mã hóa khóa đối xứng , mã hóa khóa công khai , hàm băm )');
  });

  it('Question 53 should preserve original answer and clean display', () => {
    const q53 = questionsData.find((q) => q.id === 53);
    expect(q53).toBeDefined();
    expect(q53?.originalAnswer).toBe('a) Layered Security Model');
    const correctOpt = q53?.options.find((o) => o.isCorrect);
    expect(correctOpt?.text).toBe('Layered Security Model');
  });
});

describe('Quiz Engine Utilities', () => {
  it('shuffleArray preserves element set and length', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled.length).toBe(5);
    expect(new Set(shuffled)).toEqual(new Set(array));
  });

  it('shuffleQuestionOptions does not shuffle boolean questions', () => {
    const q1 = questionsData[0] as unknown as Question;
    const shuffledQ1 = shuffleQuestionOptions(q1);
    expect(shuffledQ1.options[0].text).toBe('Đúng');
    expect(shuffledQ1.options[1].text).toBe('Sai');
  });

  it('evaluateAnswer accurately checks correctness', () => {
    const q2 = questionsData[1] as unknown as Question;
    expect(evaluateAnswer(q2, q2.correctOptionId)).toBe(true);
    expect(evaluateAnswer(q2, 'B')).toBe(false);
  });
});

describe('Storage & Progress Tracking', () => {
  it('records question attempts and calculates stats correctly', () => {
    const store = getDefaultProgressStore();
    const updated = recordQuestionAttempt(5, true, store);
    expect(updated.questionStats[5].timesAnswered).toBe(1);
    expect(updated.questionStats[5].timesCorrect).toBe(1);
    expect(updated.questionStats[5].lastAnsweredCorrectly).toBe(true);

    const updatedFail = recordQuestionAttempt(5, false, updated);
    expect(updatedFail.questionStats[5].timesAnswered).toBe(2);
    expect(updatedFail.questionStats[5].timesCorrect).toBe(1);
    expect(updatedFail.questionStats[5].lastAnsweredCorrectly).toBe(false);
    expect(updatedFail.incorrectQuestionIds).toContain(5);
  });

  it('toggles bookmarks reliably', () => {
    let store = getDefaultProgressStore();
    store = toggleBookmark(10, store);
    expect(store.bookmarkedQuestionIds).toContain(10);
    store = toggleBookmark(10, store);
    expect(store.bookmarkedQuestionIds).not.toContain(10);
  });
});
