'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardText, Button } from '@/components/ui';

interface RecordingVisualizerProps {
  isRecording: boolean;
  recordingTime: number;
  onStop?: () => void;
  onCancel?: () => void;
  className?: string;
}

const RecordingVisualizer: React.FC<RecordingVisualizerProps> = ({
  isRecording,
  recordingTime,
  onStop,
  onCancel,
  className = '',
}) => {
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const { t } = useTranslation();

  // Generate random audio visualization bars
  useEffect(() => {
    if (!isRecording) {
      setAudioLevels([]);
      return;
    }

    const interval = setInterval(() => {
      const newLevels = Array.from({ length: 20 }, () => Math.random() * 100);
      setAudioLevels(newLevels);
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Format recording time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recording-title"
      aria-describedby="recording-description"
    >
      <Card
        variant="default"
        padding="lg"
        className="text-center max-w-md mx-4 border-4 border-red-400 shadow-2xl"
      >
        <div className="mb-6">
          <h2
            id="recording-title"
            className="text-2xl font-bold text-red-600 mb-2"
          >
            🔴 녹음 중...
          </h2>
          <p id="recording-description" className="text-gray-700">
            마이크에 대고 또렷하게 말해보세요
          </p>
        </div>

        {/* Recording Time Display */}
        <div className="mb-6">
          <div
            className="text-3xl font-bold text-red-600 mb-2"
            aria-live="polite"
            aria-label={`녹음 시간: ${formatTime(recordingTime)}`}
          >
            {formatTime(recordingTime)}
          </div>
          <CardText $variant="secondary">녹음 시간</CardText>
        </div>

        {/* Audio Visualization */}
        <div className="mb-6">
          <div
            className="flex items-end justify-center space-x-1 h-16 bg-gray-50 rounded-lg p-2"
            aria-label="음성 입력 레벨 표시"
          >
            {audioLevels.map((level, index) => (
              <div
                key={index}
                className="bg-red-500 rounded-sm transition-all duration-100 ease-out min-h-1"
                style={{
                  height: `${Math.max(level * 0.6, 4)}%`,
                  width: '4px',
                }}
                aria-hidden="true"
              />
            ))}
          </div>
          <CardText $variant="secondary" className="text-sm mt-2">
            🎤 음성 입력 감지 중
          </CardText>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="success"
            onClick={onStop}
            className="px-6 py-3"
            aria-label="녹음 완료"
          >
            <span className="mr-2">✅</span>
            녹음 완료
          </Button>

          <Button
            variant="secondary"
            onClick={onCancel}
            className="px-6 py-3"
            aria-label="녹음 취소"
          >
            <span className="mr-2">❌</span>
            취소
          </Button>
        </div>

        {/* Recording indicator animation */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <CardText $variant="secondary" className="text-sm">
            녹음이 진행 중입니다
          </CardText>
        </div>

        {/* Accessibility announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isRecording && `녹음 진행 중: ${formatTime(recordingTime)}`}
        </div>
      </Card>

      {/* Background overlay */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onCancel}
        aria-hidden="true"
      />
    </div>
  );
};

export default RecordingVisualizer;
