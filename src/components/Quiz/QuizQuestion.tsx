'use client';

import React, { useState, useCallback } from 'react';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { getLanguageName, getGreetingById } from '@/lib/quiz';
import { Card, CardTitle, CardText, Button } from '@/components/ui';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: string) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { play, isPlaying } = useAudioPlayer();

  const greeting = getGreetingById(question.greetingId);

  const handleOptionClick = useCallback(
    (option: string) => {
      if (showFeedback) return;

      setSelectedAnswer(option);
      setShowFeedback(true);

      // 1.5초 후 다음 문제로
      setTimeout(() => {
        onAnswer(option);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 1500);
    },
    [showFeedback, onAnswer]
  );

  const handlePlayAudio = useCallback(() => {
    if (question.audioUrl) {
      play(question.audioUrl);
    }
  }, [question.audioUrl, play]);

  const renderQuestionContent = () => {
    if (question.type === 'meaning-to-language') {
      return (
        <div className="text-center mb-6">
          <CardText className="text-2xl font-bold mb-2">
            &ldquo;{question.koreanMeaning}&rdquo;
          </CardText>
          <CardText className="text-lg text-gray-600">
            이 한국어 인사말은 어떤 언어로 표현될까요?
          </CardText>
        </div>
      );
    } else if (question.type === 'audio-to-language') {
      return (
        <div className="text-center mb-6">
          <Button
            variant="playButton"
            size="lg"
            onClick={handlePlayAudio}
            className="mb-4"
            disabled={isPlaying}
            aria-label="음성 재생"
          >
            <span className="text-2xl mr-2">{isPlaying ? '🔊' : '🎵'}</span>
            {isPlaying ? '재생 중...' : '음성 듣기'}
          </Button>
          <CardText className="text-lg text-gray-600">
            들려주는 인사말은 어떤 언어인가요?
          </CardText>
        </div>
      );
    }
  };

  const getOptionFeedback = (option: string) => {
    if (!showFeedback) return '';

    const isCorrect = option === question.correctLanguage;
    const isSelected = option === selectedAnswer;

    if (isSelected && isCorrect) {
      return '✅ 정답!';
    } else if (isSelected && !isCorrect) {
      return '❌ 틀렸어요';
    } else if (!isSelected && isCorrect) {
      return '✅ 정답은 여기예요!';
    }
    return '';
  };

  const getOptionStyle = (option: string) => {
    if (!showFeedback) return 'secondary';

    const isCorrect = option === question.correctLanguage;
    const isSelected = option === selectedAnswer;

    if (isSelected && isCorrect) return 'success';
    if (isSelected && !isCorrect) return 'error';
    if (!isSelected && isCorrect) return 'success';
    return 'secondary';
  };

  return (
    <Card variant="default" className="p-6">
      <div className="mb-4">
        <CardText className="text-sm text-gray-500 mb-2">
          문제 {questionNumber} / {totalQuestions}
        </CardText>
        {greeting && (
          <CardText className="text-lg font-medium">
            인사말: {greeting.korean}
          </CardText>
        )}
      </div>

      {renderQuestionContent()}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={getOptionStyle(option) as any}
            size="lg"
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
            className="p-4 h-auto flex flex-col"
            aria-label={`선택지: ${getLanguageName(option)}`}
          >
            <span className="text-lg font-medium mb-1">
              {getLanguageName(option)}
            </span>
            {greeting?.translations[option] && (
              <span className="text-sm opacity-80">
                {greeting.translations[option].text}
              </span>
            )}
            {showFeedback && (
              <span className="text-sm mt-2 font-bold">
                {getOptionFeedback(option)}
              </span>
            )}
          </Button>
        ))}
      </div>

      {showFeedback && greeting && (
        <Card variant="translationBox" className="mt-6 p-4">
          <CardText className="text-center">
            <strong>정답:</strong> {getLanguageName(question.correctLanguage)} -
            &ldquo;
            {greeting.translations[question.correctLanguage]?.text}&rdquo;
          </CardText>
        </Card>
      )}
    </Card>
  );
};
