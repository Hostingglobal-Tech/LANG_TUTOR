'use client';

import React from 'react';
import { Card, CardText } from '@/components/ui';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  score,
}) => {
  const percentage = (current / total) * 100;

  return (
    <Card variant="statusBox" className="p-4">
      <div className="flex items-center justify-between mb-3">
        <CardText className="font-medium">
          진행상황: {current} / {total}
        </CardText>
        <CardText className="font-medium text-green-600">
          점수: {score}점
        </CardText>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`퀴즈 진행상황: ${current}문제 중 ${total}문제 완료`}
        />
      </div>

      <div className="flex justify-between mt-2">
        <CardText className="text-sm text-gray-600">시작</CardText>
        <CardText className="text-sm text-gray-600">완료</CardText>
      </div>
    </Card>
  );
};
