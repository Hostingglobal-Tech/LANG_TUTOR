'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseServiceWorkerReturn {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  registerSW: () => Promise<void>;
  updateSW: () => Promise<void>;
  error: string | null;
}

export const useServiceWorker = (): UseServiceWorkerReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  // 브라우저 지원 여부 확인
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      setIsSupported(true);
    }
  }, []);

  // 온라인/오프라인 상태 감지
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 초기 상태 설정
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Service Worker 등록
  const registerSW = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      setError('Service Worker를 지원하지 않는 브라우저입니다.');
      return;
    }

    try {
      const reg = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      setRegistration(reg);
      setIsRegistered(true);
      setError(null);

      console.log('Service Worker 등록 성공:', reg.scope);

      // 업데이트 감지
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              console.log('새로운 Service Worker 버전이 감지되었습니다.');
              setUpdateAvailable(true);
            }
          });
        }
      });

      // Service Worker 상태 변경 감지
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          window.location.reload();
          refreshing = true;
        }
      });
    } catch (err) {
      console.error('Service Worker 등록 실패:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Service Worker 등록에 실패했습니다.'
      );
      setIsRegistered(false);
    }
  }, [isSupported]);

  // Service Worker 업데이트
  const updateSW = async (): Promise<void> => {
    if (!registration) {
      setError('등록된 Service Worker가 없습니다.');
      return;
    }

    try {
      await registration.update();

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      setUpdateAvailable(false);
      console.log('Service Worker 업데이트 완료');
    } catch (err) {
      console.error('Service Worker 업데이트 실패:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Service Worker 업데이트에 실패했습니다.'
      );
    }
  };

  // 자동 등록
  useEffect(() => {
    if (isSupported && process.env.NODE_ENV === 'production') {
      registerSW();
    }
  }, [isSupported, registerSW]);

  return {
    isSupported,
    isRegistered,
    isOnline,
    updateAvailable,
    registerSW,
    updateSW,
    error,
  };
};
