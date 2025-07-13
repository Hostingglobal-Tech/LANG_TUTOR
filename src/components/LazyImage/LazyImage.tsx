'use client';

import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjZTVlN2ViIi8+Cjwvc3ZnPgo=',
  blurDataURL,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer를 사용한 lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트에서 50px 전에 미리 로드
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  const imageStyles: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyles: React.CSSProperties = {
    width: width || '100%',
    height: height || '200px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 0 : 1,
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width || '100%',
        height: height || '200px',
      }}
    >
      {/* 플레이스홀더 */}
      {!isLoaded && !hasError && (
        <div style={placeholderStyles} aria-hidden="true">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(10px)',
                transform: 'scale(1.1)',
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <span className="text-xs">이미지 로딩 중...</span>
            </div>
          )}
        </div>
      )}

      {/* 에러 상태 */}
      {hasError && (
        <div
          style={placeholderStyles}
          className="bg-gray-100 text-gray-500"
          role="img"
          aria-label="이미지 로드 실패"
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-8 h-8 mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 11.71 10.3c-.39-.39-1.03-.39-1.42 0L6 14.59 4 12.59V5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1zm-3 6.42l2 2V19c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-6.58l2 2 2.29-2.3L11.59 16l2.3-2.29 2.3 2.29L18 11.42z" />
            </svg>
            <span className="text-xs">이미지 로드 실패</span>
          </div>
        </div>
      )}

      {/* 실제 이미지 */}
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={imageStyles}
          loading={loading}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </div>
  );
};

export default LazyImage;
