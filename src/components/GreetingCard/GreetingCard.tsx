'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Greeting, GreetingTranslation } from '@/types';
import {
  Button,
  Card,
  CardBadge,
  CardIcon,
  CardContent,
  CardFooter,
} from '@/components/ui';
import PronunciationPractice from '@/components/PronunciationPractice';

interface GreetingCardProps {
  greeting: Greeting;
  selectedLanguage: string;
  onPlayAudio?: (audioUrl: string) => void;
  isCurrentlyPlaying?: boolean;
  className?: string;
}

const getCategoryEmoji = (category: Greeting['category']): string => {
  const emojiMap = {
    basic: '👋',
    polite: '🙏',
    time_based: '🌅',
    farewell: '👋',
    apology: '😔',
    response: '😊',
    introduction: '🤝',
    inquiry: '❓',
  };
  return emojiMap[category] || '💬';
};

const getDifficultyColor = (difficulty: 1 | 2 | 3): string => {
  const colorMap = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-red-100 text-red-800',
  };
  return colorMap[difficulty];
};

export default function GreetingCard({
  greeting,
  selectedLanguage,
  onPlayAudio,
  isCurrentlyPlaying = false,
  className = '',
}: GreetingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const { t } = useTranslation();

  const translation: GreetingTranslation | undefined =
    greeting.translations[selectedLanguage];

  if (!translation) {
    return null;
  }

  const handlePlayAudio = () => {
    if (onPlayAudio && translation.audioUrl) {
      onPlayAudio(translation.audioUrl);
    }
  };

  const difficultyLabel = t(`difficulties.${greeting.difficulty}`);
  const categoryLabel = t(`categories.${greeting.category}`);

  return (
    <>
      <Card
        variant="greeting"
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-label={`${greeting.korean} 인사말 카드`}
      >
        {/* Difficulty Badge */}
        <CardBadge
          $variant="difficulty"
          className={getDifficultyColor(greeting.difficulty)}
          aria-label={`난이도: ${difficultyLabel}`}
        >
          {difficultyLabel}
        </CardBadge>

        {/* Category Badge */}
        <CardBadge
          $variant="category"
          aria-label={`카테고리: ${categoryLabel}`}
        >
          {categoryLabel}
        </CardBadge>

        <CardContent>
          {/* Main Illustration */}
          <div className="text-center mb-4 sm:mb-6">
            <CardIcon aria-label={greeting.situation}>
              {getCategoryEmoji(greeting.category)}
            </CardIcon>

            {/* Korean Text */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {greeting.korean}
            </h3>

            {/* Situation Context */}
            <p className="text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
              {greeting.situation}
            </p>
          </div>

          {/* Translation Section */}
          <Card
            variant="translationBox"
            padding="sm"
            className="text-center mb-4 sm:mb-6"
          >
            {/* Foreign Language Text */}
            <div
              className="text-lg sm:text-2xl font-semibold text-blue-900 mb-2 leading-tight"
              dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
              lang={selectedLanguage}
            >
              {translation.text}
            </div>

            {/* Pronunciation Guide */}
            <div className="text-sm text-blue-800 mb-2 sm:mb-3 font-mono break-words">
              [{translation.pronunciation}]
            </div>

            {/* Notes */}
            {translation.notes && (
              <div className="text-xs text-blue-700 italic leading-relaxed">
                {translation.notes}
              </div>
            )}
          </Card>
        </CardContent>

        <CardFooter>
          <div className="flex gap-2 sm:gap-3 justify-center w-full">
            <Button
              variant="playButton"
              onClick={handlePlayAudio}
              disabled={!translation.audioUrl}
              isPlaying={isCurrentlyPlaying}
              aria-label={`${greeting.korean} 발음 듣기${isCurrentlyPlaying ? ' - 재생 중' : ''}`}
              icon={isCurrentlyPlaying ? '🔊' : '🎵'}
              mobileText={isCurrentlyPlaying ? '재생' : '듣기'}
              className="flex-1"
            >
              {isCurrentlyPlaying ? '재생 중...' : t('play_audio')}
            </Button>

            <Button
              variant="secondary"
              onClick={() => setShowPracticeMode(true)}
              disabled={!translation.audioUrl}
              aria-label={`${greeting.korean} 발음 연습하기`}
              icon="🎤"
              mobileText="연습"
              className="flex-1"
            >
              발음 연습
            </Button>
          </div>

          {/* Playing Animation */}
          {isCurrentlyPlaying && (
            <div className="mt-2 flex justify-center items-center space-x-1">
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          )}
        </CardFooter>

        {/* Tags */}
        {greeting.tags && greeting.tags.length > 0 && (
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-1 sm:gap-2">
            {greeting.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Interactive Hover Effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl pointer-events-none" />
        )}
      </Card>

      {/* Pronunciation Practice Modal */}
      {showPracticeMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="practice-modal-title"
        >
          <div className="max-w-md w-full">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowPracticeMode(false)}
                className="
                w-8 h-8 bg-white rounded-full flex items-center justify-center
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              "
                aria-label="발음 연습 모드 닫기"
              >
                ✕
              </button>
            </div>

            <PronunciationPractice
              text={translation.text}
              pronunciation={translation.pronunciation}
              audioUrl={translation.audioUrl}
              onAudioEnd={() => setShowPracticeMode(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
