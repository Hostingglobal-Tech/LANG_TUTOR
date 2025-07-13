'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardText, Button } from '@/components/ui';

interface RecordingPlayerProps {
  audioUrl: string | null;
  onPlaybackEnd?: () => void;
  onRetry?: () => void;
  onClose?: () => void;
  className?: string;
}

const RecordingPlayer: React.FC<RecordingPlayerProps> = ({
  audioUrl,
  onPlaybackEnd,
  onRetry,
  onClose,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { t } = useTranslation();

  const handlePlay = () => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onPlaybackEnd?.();
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      setIsPlaying(false);
    });

    setIsPlaying(true);
    audio.play().catch((error) => {
      console.error('Audio play failed:', error);
      setIsPlaying(false);
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recording-player-title"
      aria-describedby="recording-player-description"
    >
      <Card
        variant="default"
        padding="lg"
        className="text-center max-w-md mx-4 border-4 border-green-400 shadow-2xl"
      >
        <div className="mb-6">
          <h2
            id="recording-player-title"
            className="text-2xl font-bold text-green-600 mb-2"
          >
            🎉 녹음 완료!
          </h2>
          <p id="recording-player-description" className="text-gray-700">
            당신의 발음을 들어보세요
          </p>
        </div>

        {/* Audio Player */}
        <div className="mb-6">
          <div className="mb-4">
            <div
              className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="재생 진행률"
            >
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <CardText $variant="secondary" className="text-sm">
              {formatTime(currentTime)}
            </CardText>
            <Button
              variant={isPlaying ? 'secondary' : 'success'}
              onClick={handlePlay}
              disabled={isPlaying}
              className="px-6 py-3"
              aria-label={isPlaying ? '재생 중' : '녹음 재생'}
            >
              {isPlaying ? (
                <>
                  <span className="mr-2">⏸️</span>
                  재생 중...
                </>
              ) : (
                <>
                  <span className="mr-2">▶️</span>내 발음 듣기
                </>
              )}
            </Button>
            <CardText $variant="secondary" className="text-sm">
              {formatTime(duration)}
            </CardText>
          </div>

          {/* Playback animation */}
          {isPlaying && (
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            onClick={onRetry}
            className="px-6 py-3"
            aria-label="다시 녹음하기"
          >
            <span className="mr-2">🔄</span>
            다시 녹음
          </Button>

          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6 py-3"
            aria-label="녹음 완료하고 닫기"
          >
            <span className="mr-2">✅</span>
            완료
          </Button>
        </div>

        {/* Feedback Message */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <CardText $variant="accent" className="text-sm">
            🌟 잘했어요! 계속 연습하면 더 좋아질 거예요!
          </CardText>
        </div>

        {/* Accessibility announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isPlaying
            ? '녹음된 음성이 재생 중입니다'
            : '녹음이 완료되었습니다. 재생 버튼을 눌러 들어보세요'}
        </div>
      </Card>

      {/* Background overlay */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

export default RecordingPlayer;
