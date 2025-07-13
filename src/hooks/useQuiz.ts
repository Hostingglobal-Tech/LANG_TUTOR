'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  QuizSession,
  QuizAnswer,
  QuizConfig,
  DEFAULT_QUIZ_CONFIG,
  QuizResult,
} from '@/types/quiz';
import { createQuizSession, calculateQuizResult } from '@/lib/quiz';

interface UseQuizReturn {
  session: QuizSession | null;
  currentQuestion: QuizSession['questions'][0] | null;
  isQuizActive: boolean;
  isQuizComplete: boolean;
  result: QuizResult | null;
  questionStartTime: number | null;

  startQuiz: (config?: QuizConfig) => void;
  answerQuestion: (selectedAnswer: string) => void;
  skipQuestion: () => void;
  restartQuiz: () => void;
  endQuiz: () => void;
}

export const useQuiz = (): UseQuizReturn => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(
    null
  );

  const isQuizActive = session !== null && !session.completedAt;
  const isQuizComplete = session !== null && session.completedAt !== undefined;
  const currentQuestion =
    session?.questions[session.currentQuestionIndex] || null;

  // 새 문제 시작 시 시간 기록
  useEffect(() => {
    if (currentQuestion && isQuizActive) {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, isQuizActive]);

  // 퀴즈 시작
  const startQuiz = useCallback((config: QuizConfig = DEFAULT_QUIZ_CONFIG) => {
    const newSession = createQuizSession(config);
    setSession(newSession);
    setResult(null);
    setQuestionStartTime(Date.now());
  }, []);

  // 문제 답변
  const answerQuestion = useCallback(
    (selectedAnswer: string) => {
      if (!session || !currentQuestion || !questionStartTime) return;

      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
      const isCorrect = selectedAnswer === currentQuestion.correctLanguage;

      const answer: QuizAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
        timeSpent,
        answeredAt: new Date(),
      };

      const updatedAnswers = [...session.answers, answer];
      const updatedScore = session.score + (isCorrect ? 1 : 0);

      // 다음 문제로 이동 또는 퀴즈 완료
      if (session.currentQuestionIndex < session.questions.length - 1) {
        setSession({
          ...session,
          answers: updatedAnswers,
          score: updatedScore,
          currentQuestionIndex: session.currentQuestionIndex + 1,
        });
      } else {
        // 퀴즈 완료
        const completedSession: QuizSession = {
          ...session,
          answers: updatedAnswers,
          score: updatedScore,
          completedAt: new Date(),
        };
        setSession(completedSession);

        // 결과 계산
        const quizResult = calculateQuizResult(completedSession);
        setResult(quizResult);
      }
    },
    [session, currentQuestion, questionStartTime]
  );

  // 문제 건너뛰기
  const skipQuestion = useCallback(() => {
    if (!session || !currentQuestion || !questionStartTime) return;

    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: '',
      isCorrect: false,
      timeSpent,
      answeredAt: new Date(),
    };

    const updatedAnswers = [...session.answers, answer];

    // 다음 문제로 이동 또는 퀴즈 완료
    if (session.currentQuestionIndex < session.questions.length - 1) {
      setSession({
        ...session,
        answers: updatedAnswers,
        currentQuestionIndex: session.currentQuestionIndex + 1,
      });
    } else {
      // 퀴즈 완료
      const completedSession: QuizSession = {
        ...session,
        answers: updatedAnswers,
        completedAt: new Date(),
      };
      setSession(completedSession);

      // 결과 계산
      const quizResult = calculateQuizResult(completedSession);
      setResult(quizResult);
    }
  }, [session, currentQuestion, questionStartTime]);

  // 퀴즈 재시작
  const restartQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  // 퀴즈 종료
  const endQuiz = useCallback(() => {
    if (session && !session.completedAt) {
      const completedSession: QuizSession = {
        ...session,
        completedAt: new Date(),
      };
      setSession(completedSession);

      const quizResult = calculateQuizResult(completedSession);
      setResult(quizResult);
    }
  }, [session]);

  return {
    session,
    currentQuestion,
    isQuizActive,
    isQuizComplete,
    result,
    questionStartTime,
    startQuiz,
    answerQuestion,
    skipQuestion,
    restartQuiz,
    endQuiz,
  };
};
