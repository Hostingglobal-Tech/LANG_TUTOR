'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '@/components/LanguagePicker';
import GreetingCard from '@/components/GreetingCard';
import PWAInstaller from '@/components/PWAInstaller';
import { getGreetings } from '@/lib/greetings';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Card, CardTitle, CardText, Button } from '@/components/ui';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { QuizContainer } from '@/components/Quiz';

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const { t } = useTranslation();
  const greetings = getGreetings();
  const { play, isPlaying, currentTrack, error, HowlerComponent } =
    useAudioPlayer();
  const { isOnline, updateAvailable, updateSW } = useServiceWorker();

  const handlePlayAudio = (audioUrl: string) => {
    play(audioUrl);
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      <header className="text-center mb-6 sm:mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-0 text-shadow flex-1">
            🌍 {t('app_title')} 🌍
          </h1>
          <div className="flex-1 flex justify-end">
            <ThemeToggle variant="button" showLabel={false} />
          </div>
        </div>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          {t('app_subtitle')}
        </p>

        {/* 오프라인 상태 표시 */}
        {!isOnline && (
          <Card
            variant="errorBox"
            padding="sm"
            className="mt-4 mx-auto max-w-md"
            role="alert"
            aria-live="polite"
          >
            <CardText $variant="primary">
              📶 오프라인 모드입니다. 일부 기능이 제한될 수 있습니다.
            </CardText>
          </Card>
        )}

        {/* 업데이트 알림 */}
        {updateAvailable && (
          <Card
            variant="successBox"
            padding="sm"
            className="mt-4 mx-auto max-w-md"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center justify-between">
              <CardText $variant="primary" className="mr-3">
                🚀 새로운 버전이 있습니다!
              </CardText>
              <Button
                variant="success"
                onClick={updateSW}
                className="px-3 py-1 text-sm"
                aria-label="앱 업데이트하기"
              >
                업데이트
              </Button>
            </div>
          </Card>
        )}
      </header>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Language Selection Section */}
        <Card variant="default" aria-labelledby="language-section">
          <CardTitle id="language-section">{t('select_language')}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <LanguagePicker
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              className="w-full max-w-md"
            />

            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenQuiz}
              className="w-full sm:w-auto px-6"
              aria-label="퀴즈 모드 시작"
            >
              🎯 퀴즈 도전하기
            </Button>
          </div>
        </Card>

        {/* Greeting Cards Section */}
        <Card variant="default" aria-labelledby="greeting-cards-section">
          <CardTitle id="greeting-cards-section">인사말 카드</CardTitle>

          {/* Welcome Message */}
          <Card variant="welcomeBox" padding="sm" className="text-center mb-6">
            <CardText $variant="accent">{t('welcome_message')}</CardText>
          </Card>

          {/* Audio Error Display */}
          {error && (
            <Card
              variant="errorBox"
              padding="sm"
              className="mb-4 text-center"
              role="alert"
              aria-live="polite"
            >
              <CardText $variant="primary">⚠️ {error}</CardText>
            </Card>
          )}

          {/* Responsive Grid of Greeting Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {greetings.map((greeting) => (
              <GreetingCard
                key={greeting.id}
                greeting={greeting}
                selectedLanguage={selectedLanguage}
                onPlayAudio={handlePlayAudio}
                isCurrentlyPlaying={
                  isPlaying &&
                  currentTrack ===
                    greeting.translations[selectedLanguage]?.audioUrl
                }
                className="h-full"
              />
            ))}
          </div>

          {/* Status Information */}
          <Card
            variant="statusBox"
            padding="sm"
            className="text-center mt-6 sm:mt-8"
          >
            <CardText $variant="primary" className="mb-2">
              선택된 언어: {t(`languages.${selectedLanguage}`)}
            </CardText>
            <CardText $variant="secondary">
              총 {greetings.length}개의 인사말이 준비되어 있습니다!
            </CardText>
          </Card>
        </Card>
      </div>

      {/* Audio Player Component */}
      <HowlerComponent />

      {/* PWA 설치 프롬프트 */}
      <PWAInstaller />

      {/* 퀴즈 모달 */}
      <QuizContainer isOpen={isQuizOpen} onClose={handleCloseQuiz} />
    </div>
  );
}
