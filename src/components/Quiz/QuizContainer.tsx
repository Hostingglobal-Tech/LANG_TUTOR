'use client';

import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { Card, CardTitle, CardText, Button } from '@/components/ui';
import { ProgressBar } from './ProgressBar';
import { Modal } from '@/components/ui/Modal';

interface QuizContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    session,
    currentQuestion,
    isQuizActive,
    isQuizComplete,
    result,
    startQuiz,
    answerQuestion,
    restartQuiz,
    endQuiz,
  } = useQuiz();

  const handleClose = () => {
    if (isQuizActive) {
      endQuiz();
    }
    onClose();
  };

  const handleStartQuiz = () => {
    startQuiz();
  };

  const handleRestartQuiz = () => {
    restartQuiz();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="🎯 인사말 퀴즈"
      size="large"
    >
      {!session && !isQuizComplete && (
        <Card variant="welcomeBox" className="text-center p-8">
          <div className="mb-6">
            <span className="text-6xl">🎮</span>
          </div>
          <CardTitle className="mb-4">퀴즈를 시작해볼까요?</CardTitle>
          <CardText className="mb-6">
            다양한 언어의 인사말을 얼마나 잘 알고 있는지 확인해보세요!
            <br />총 5문제가 준비되어 있어요.
          </CardText>
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartQuiz}
            className="px-8"
          >
            퀴즈 시작하기
          </Button>
        </Card>
      )}

      {isQuizActive && currentQuestion && session && (
        <div className="space-y-6">
          <ProgressBar
            current={session.currentQuestionIndex + 1}
            total={session.totalQuestions}
            score={session.score}
          />

          <QuizQuestion
            question={currentQuestion}
            questionNumber={session.currentQuestionIndex + 1}
            totalQuestions={session.totalQuestions}
            onAnswer={answerQuestion}
          />
        </div>
      )}

      {isQuizComplete && result && (
        <QuizResult
          result={result}
          onRestart={handleRestartQuiz}
          onClose={handleClose}
        />
      )}
    </Modal>
  );
};
