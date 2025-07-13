'use client';

import React from 'react';
import { QuizResult as QuizResultType } from '@/types/quiz';
import { Card, CardTitle, CardText, Button } from '@/components/ui';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
  onClose: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  onRestart,
  onClose,
}) => {
  const getResultColor = () => {
    if (result.percentage >= 80) return 'success';
    if (result.percentage >= 60) return 'primary';
    return 'secondary';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }
    return `${remainingSeconds}초`;
  };

  return (
    <div className="space-y-6">
      {/* 결과 애니메이션 */}
      <Card variant="welcomeBox" className="text-center p-8">
        <div className="mb-6">
          <span
            className="text-8xl animate-bounce"
            role="img"
            aria-label="결과 이모지"
          >
            {result.emoji}
          </span>
        </div>

        <CardTitle className="text-3xl mb-4">퀴즈 완료!</CardTitle>

        <CardText className="text-xl mb-6">{result.message}</CardText>
      </Card>

      {/* 점수 상세 */}
      <Card variant="default" className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <CardText className="text-3xl font-bold text-green-600">
              {result.score}
            </CardText>
            <CardText className="text-sm text-gray-600">맞힌 문제</CardText>
          </div>

          <div>
            <CardText className="text-3xl font-bold text-blue-600">
              {result.percentage}%
            </CardText>
            <CardText className="text-sm text-gray-600">정답률</CardText>
          </div>

          <div>
            <CardText className="text-3xl font-bold text-purple-600">
              {result.totalQuestions}
            </CardText>
            <CardText className="text-sm text-gray-600">총 문제</CardText>
          </div>

          <div>
            <CardText className="text-3xl font-bold text-orange-600">
              {formatTime(result.timeSpent)}
            </CardText>
            <CardText className="text-sm text-gray-600">소요 시간</CardText>
          </div>
        </div>
      </Card>

      {/* 격려 메시지 */}
      <Card variant="translationBox" className="p-6">
        <div className="text-center">
          <CardText className="text-lg mb-4">
            {result.percentage === 100
              ? '🎉 완벽해요! 모든 언어를 잘 알고 계시네요!'
              : result.percentage >= 80
                ? '⭐ 정말 잘했어요! 거의 완벽해요!'
                : result.percentage >= 60
                  ? '😊 좋아요! 많이 배우셨네요!'
                  : result.percentage >= 40
                    ? '💪 괜찮아요! 조금만 더 연습하면 돼요!'
                    : '🌱 처음이니까 괜찮아요! 계속 배워봐요!'}
          </CardText>

          {result.percentage < 100 && (
            <CardText className="text-gray-600">
              틀린 문제들을 다시 살펴보고 연습해보세요!
            </CardText>
          )}
        </div>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onRestart}
          className="px-8"
        >
          다시 도전하기
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={onClose}
          className="px-8"
        >
          끝내기
        </Button>
      </div>
    </div>
  );
};
