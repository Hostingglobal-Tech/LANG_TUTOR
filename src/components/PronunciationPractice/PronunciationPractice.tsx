'use client';

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useMicrophone } from '@/hooks/useMicrophone';
import { Button, Card, CardText } from '@/components/ui';
import Countdown from '@/components/Countdown';
import RecordingVisualizer from '@/components/RecordingVisualizer';
import RecordingPlayer from '@/components/RecordingPlayer';

interface PronunciationPracticeProps {
  text: string;
  pronunciation: string;
  audioUrl?: string;
  onAudioEnd?: () => void;
  className?: string;
}

type PracticeState =
  | 'idle'
  | 'playing'
  | 'countdown'
  | 'recording'
  | 'playback';

const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({
  text,
  pronunciation,
  audioUrl,
  onAudioEnd,
  className = '',
}) => {
  const [practiceState, setPracticeState] = useState<PracticeState>('idle');
  const { t } = useTranslation();

  const {
    isRecording,
    hasPermission,
    permissionDenied,
    audioBlob,
    audioUrl: recordedAudioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    requestPermission,
    error,
    recordingTime,
  } = useMicrophone();

  const handleStartPractice = useCallback(async () => {
    try {
      setPracticeState('playing');

      // Play the original audio first
      if (audioUrl) {
        const audio = new Audio(audioUrl);

        audio.addEventListener('ended', () => {
          // Start countdown after audio finishes
          setPracticeState('countdown');
        });

        audio.addEventListener('error', (e) => {
          console.error('Audio playback error:', e);
          // Skip to countdown if audio fails
          setPracticeState('countdown');
        });

        await audio.play();
      } else {
        // No audio URL, skip directly to countdown
        setPracticeState('countdown');
      }
    } catch (error) {
      console.error('Failed to start practice:', error);
      setPracticeState('countdown');
    }
  }, [audioUrl]);

  const handleCountdownComplete = useCallback(async () => {
    setPracticeState('recording');

    // Start recording
    try {
      await startRecording();
    } catch (error) {
      console.error('Failed to start recording:', error);
      setPracticeState('idle');
    }
  }, [startRecording]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
    setPracticeState('playback');
  }, [stopRecording]);

  const handleCancelPractice = useCallback(() => {
    stopRecording();
    clearRecording();
    setPracticeState('idle');
  }, [stopRecording, clearRecording]);

  const handleRetryRecording = useCallback(() => {
    clearRecording();
    setPracticeState('countdown');
  }, [clearRecording]);

  const handleCompletePractice = useCallback(() => {
    clearRecording();
    setPracticeState('idle');
    onAudioEnd?.();
  }, [clearRecording, onAudioEnd]);

  // Request permission on component mount
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return (
    <>
      <Card variant="default" className={`relative ${className}`}>
        <div className="text-center space-y-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              🎯 발음 연습 모드
            </h3>
            <CardText $variant="secondary">
              음성을 듣고 따라 말해보세요
            </CardText>
          </div>

          {/* Text to Practice */}
          <Card variant="translationBox" padding="sm" className="mb-4">
            <div className="text-2xl font-bold text-blue-900 mb-2">{text}</div>
            <div className="text-sm text-blue-800 font-mono">
              [{pronunciation}]
            </div>
          </Card>

          {/* Error Display */}
          {error && (
            <Card variant="errorBox" padding="sm" className="mb-4" role="alert">
              <CardText $variant="primary">⚠️ {error}</CardText>
            </Card>
          )}

          {/* Permission Denied Warning */}
          {permissionDenied && (
            <Card variant="errorBox" padding="sm" className="mb-4" role="alert">
              <CardText $variant="primary" className="mb-2">
                🎤 마이크 권한이 필요합니다
              </CardText>
              <CardText $variant="secondary" className="text-sm">
                브라우저 설정에서 마이크 권한을 허용하면 발음 연습을 할 수
                있어요!
              </CardText>
            </Card>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            {practiceState === 'idle' && (
              <Button
                variant="primary"
                onClick={handleStartPractice}
                className="px-6 py-3"
                aria-label="발음 연습 시작"
              >
                <span className="mr-2">🎤</span>
                발음 연습 시작
              </Button>
            )}

            {practiceState === 'playing' && (
              <Card variant="welcomeBox" padding="sm">
                <CardText $variant="accent">
                  🔊 음성을 듣고 있어요... 잠시만 기다려주세요!
                </CardText>
              </Card>
            )}
          </div>

          {/* Status Information */}
          <div className="text-sm text-gray-600 space-y-1">
            {hasPermission && (
              <CardText $variant="accent">✅ 마이크 준비 완료</CardText>
            )}

            {practiceState !== 'idle' && (
              <CardText $variant="secondary">
                {practiceState === 'playing' && '🔊 음성 재생 중...'}
                {practiceState === 'countdown' && '⏰ 녹음 준비 중...'}
                {practiceState === 'recording' && '🔴 녹음 중...'}
                {practiceState === 'playback' && '🎧 녹음 완료!'}
              </CardText>
            )}
          </div>
        </div>
      </Card>

      {/* Countdown Modal */}
      <Countdown
        initialCount={3}
        isActive={practiceState === 'countdown'}
        onComplete={handleCountdownComplete}
        onCancel={handleCancelPractice}
      />

      {/* Recording Visualizer Modal */}
      <RecordingVisualizer
        isRecording={practiceState === 'recording'}
        recordingTime={recordingTime}
        onStop={handleStopRecording}
        onCancel={handleCancelPractice}
      />

      {/* Recording Player Modal */}
      <RecordingPlayer
        audioUrl={recordedAudioUrl}
        onRetry={handleRetryRecording}
        onClose={handleCompletePractice}
      />
    </>
  );
};

export default PronunciationPractice;
