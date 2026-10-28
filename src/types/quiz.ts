export type QuestionPolarity = 'positive' | 'negative';
export type AnswerType = 'single_choice' | 'boolean';

export interface Option {
  id: string; // e.g. "A", "B", "C", "D" or "true", "false"
  text: string;
  isCorrect: boolean;
  distractorRationale?: string; // Căn cứ tại sao phương án này sai trong ngữ cảnh câu hỏi
}

export interface Question {
  id: number; // 1 to 70
  originalQuestion: string;
  displayQuestion: string;
  originalAnswer: string;
  answerType: AnswerType;
  questionPolarity: QuestionPolarity;
  topicId: string;
  topicName: string;
  conceptId: string;
  conceptName: string;
  options: Option[];
  correctOptionId: string;
  explanation: {
    correctRationale: string;
    keyTakeaway: string;
  };
  sourceReferences: string[];
  academicNote?: string;
  reviewStatus: 'verified' | 'academic_caution';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  questionCount: number;
}

export type QuizMode = 
  | 'sequential' // Làm tuần tự 1 -> 70
  | 'random'     // Luyện ngẫu nhiên
  | 'topic'      // Luyện theo chủ đề
  | 'incorrect'  // Ôn câu sai
  | 'bookmarked' // Câu hỏi đánh dấu
  | 'exam';      // Thi thử tính giờ

export interface UserAnswerRecord {
  questionId: number;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizSessionState {
  mode: QuizMode;
  topicId?: string;
  questionIds: number[];
  currentIndex: number;
  userAnswers: Record<number, UserAnswerRecord>;
  bookmarkedIds: number[];
  startTime: number;
  timeLimitSeconds?: number;
  isCompleted: boolean;
}

export interface QuestionStats {
  timesAnswered: number;
  timesCorrect: number;
  lastAnsweredCorrectly?: boolean;
  lastAttemptTimestamp?: number;
}

export interface UserProgressStore {
  version: number;
  bookmarkedQuestionIds: number[];
  incorrectQuestionIds: number[];
  questionStats: Record<number, QuestionStats>;
  completedExams: {
    id: string;
    timestamp: number;
    score: number;
    total: number;
    durationSeconds: number;
  }[];
}
