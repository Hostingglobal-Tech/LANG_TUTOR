'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent } from '@/components/ui';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallerProps {
  className?: string;
}

const PWAInstaller: React.FC<PWAInstallerProps> = ({ className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // PWA 설치 가능 이벤트 리스너
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // 설치 프롬프트 표시 조건 확인
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches;
      const hasBeenDismissed = localStorage.getItem('pwa-install-dismissed');

      if (!isStandalone && !hasBeenDismissed) {
        setShowInstallPrompt(true);
      }
    };

    // PWA 설치 완료 이벤트 리스너
    const handleAppInstalled = () => {
      console.log('PWA가 성공적으로 설치되었습니다');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 이미 설치된 상태인지 확인
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;

    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('사용자가 PWA 설치를 허용했습니다');
      } else {
        console.log('사용자가 PWA 설치를 거부했습니다');
        localStorage.setItem('pwa-install-dismissed', 'true');
      }

      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('PWA 설치 중 오류 발생:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // 이미 설치되었거나 프롬프트를 표시하지 않는 경우
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}
      role="dialog"
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-description"
    >
      <Card
        variant="default"
        padding="md"
        className="border-2 border-blue-500 shadow-lg bg-white"
      >
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl" aria-hidden="true">
                📱
              </div>
              <div>
                <h3
                  id="pwa-install-title"
                  className="font-bold text-gray-900 text-sm"
                >
                  앱으로 설치하기
                </h3>
                <p
                  id="pwa-install-description"
                  className="text-xs text-gray-600 mt-1"
                >
                  홈 화면에 추가하여 더 편리하게 이용하세요
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="primary"
                onClick={handleInstallClick}
                className="px-4 py-2 text-sm"
                aria-label="앱 설치하기"
              >
                설치
              </Button>
              <Button
                variant="secondary"
                onClick={handleDismiss}
                className="px-3 py-2 text-sm"
                aria-label="설치 안내 닫기"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstaller;
