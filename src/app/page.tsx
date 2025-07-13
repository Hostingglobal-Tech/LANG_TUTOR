'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '@/components/LanguagePicker';
import GreetingCard from '@/components/GreetingCard';
import { getGreetings } from '@/lib/greetings';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Card, CardTitle, CardText } from '@/components/ui';

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const { t } = useTranslation();
  const greetings = getGreetings();
  const { play, isPlaying, currentTrack, error, HowlerComponent } =
    useAudioPlayer();

  const handlePlayAudio = (audioUrl: string) => {
    play(audioUrl);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      <header className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-shadow">
          🌍 {t('app_title')} 🌍
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          {t('app_subtitle')}
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Language Selection Section */}
        <Card variant="default" aria-labelledby="language-section">
          <CardTitle id="language-section">{t('select_language')}</CardTitle>
          <div className="flex justify-center">
            <LanguagePicker
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              className="w-full max-w-md"
            />
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
    </div>
  );
}
