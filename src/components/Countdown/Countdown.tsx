'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardText } from '@/components/ui';

interface CountdownProps {
  initialCount?: number;
  onComplete?: () => void;
  onCancel?: () => void;
  isActive: boolean;
  className?: string;
}

const Countdown: React.FC<CountdownProps> = ({
  initialCount = 3,
  onComplete,
  onCancel,
  isActive,
  className = '',
}) => {
  const [count, setCount] = useState(initialCount);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isActive) {
      setCount(initialCount);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isActive, initialCount]);

  useEffect(() => {
    if (!isVisible || !isActive) return;

    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (count === 0) {
      // Countdown finished
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [count, isVisible, isActive, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="countdown-title"
      aria-describedby="countdown-description"
    >
      <Card
        variant="default"
        padding="lg"
        className="text-center max-w-sm mx-4 border-4 border-blue-400 shadow-2xl"
      >
        <div className="mb-4">
          <h2
            id="countdown-title"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            🎙️ 발음 연습 준비
          </h2>
          <p id="countdown-description" className="text-gray-700">
            음성이 끝나면 따라 말해보세요!
          </p>
        </div>

        {count > 0 ? (
          <div className="py-8">
            <div
              className={`
                text-6xl font-bold text-blue-600 mb-4 
                transform transition-all duration-300 
                ${count <= 1 ? 'scale-125 text-red-500' : 'scale-100'}
              `}
              aria-live="polite"
              aria-label={`${count}초 후 녹음 시작`}
            >
              {count}
            </div>
            <CardText $variant="secondary" className="text-lg">
              {count}초 후 녹음이 시작됩니다
            </CardText>
          </div>
        ) : (
          <div className="py-8">
            <div className="text-4xl font-bold text-green-600 mb-4 animate-pulse">
              🎤 시작!
            </div>
            <CardText $variant="accent" className="text-lg">
              지금 따라 말해보세요!
            </CardText>
          </div>
        )}

        {/* Cancel Button */}
        {count > 0 && onCancel && (
          <div className="mt-6">
            <button
              onClick={onCancel}
              className="
                px-4 py-2 text-sm font-medium text-gray-600 
                bg-gray-100 rounded-lg border border-gray-300
                hover:bg-gray-200 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200
              "
              aria-label="발음 연습 취소"
            >
              취소
            </button>
          </div>
        )}

        {/* Accessibility announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {count > 0
            ? `발음 연습이 ${count}초 후에 시작됩니다`
            : '발음 연습이 시작되었습니다. 지금 따라 말해보세요'}
        </div>
      </Card>

      {/* Background overlay for accessibility */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onCancel}
        aria-hidden="true"
      />
    </div>
  );
};

export default Countdown;
