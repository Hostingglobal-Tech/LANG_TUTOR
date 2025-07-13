// Quiz type definitions

export type QuizType = 'meaning-to-language' | 'audio-to-language';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  greetingId: string;
  correctLanguage: string;
  options: string[]; // Language codes
  audioUrl?: string; // For audio-to-language questions
  koreanMeaning?: string; // For meaning-to-language questions
  timeLimit?: number; // Optional time limit in seconds
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // Time in seconds
  answeredAt: Date;
}

export interface QuizSession {
  id: string;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  startedAt: Date;
  completedAt?: Date;
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
}

export interface QuizResult {
  sessionId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number; // Total time in seconds
  message: string;
  emoji: string;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface QuizConfig {
  questionsPerSession: number;
  enableTimer: boolean;
  defaultTimePerQuestion: number; // seconds
  showFeedbackImmediately: boolean;
  allowSkip: boolean;
  randomizeOptions: boolean;
  quizTypes: QuizType[];
}

export const DEFAULT_QUIZ_CONFIG: QuizConfig = {
  questionsPerSession: 5,
  enableTimer: false,
  defaultTimePerQuestion: 30,
  showFeedbackImmediately: true,
  allowSkip: false,
  randomizeOptions: true,
  quizTypes: ['meaning-to-language', 'audio-to-language'],
};
