'use client';

import { useState, useCallback } from 'react';
import React from 'react';
import ReactHowler from 'react-howler';

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  duration: number;
  currentTime: number;
  error: string | null;
  play: (src: string) => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  HowlerComponent: React.ComponentType;
}

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
    setError(null);
  }, []);

  const play = useCallback(
    (src: string) => {
      if (currentTrack === src && isPlaying) {
        // Already playing this track
        return;
      }

      // Stop current track if playing different one
      if (currentTrack !== src && isPlaying) {
        stop();
      }

      setCurrentTrack(src);
      setIsPlaying(true);
      setError(null);
      setCurrentTime(0);
    },
    [currentTrack, isPlaying, stop]
  );

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setError(null);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
  }, []);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Keep currentTrack for potential replay
  }, []);

  const handleLoad = useCallback(() => {
    setError(null);
  }, []);

  const handleLoadError = useCallback((id: number, error: any) => {
    console.error('Audio load error:', error);
    setError('오디오를 불러올 수 없습니다');
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  const HowlerComponent = useCallback(() => {
    if (!currentTrack) return null;

    return React.createElement(ReactHowler, {
      src: currentTrack,
      playing: isPlaying,
      volume: volume,
      onPlay: handlePlay,
      onPause: handlePause,
      onStop: handleStop,
      onEnd: handleEnd,
      onLoad: handleLoad,
      onLoadError: handleLoadError,
      preload: true,
      html5: true,
      format: ['mp3', 'wav', 'ogg'],
    });
  }, [
    currentTrack,
    isPlaying,
    volume,
    handlePlay,
    handlePause,
    handleStop,
    handleEnd,
    handleLoad,
    handleLoadError,
  ]);

  return {
    isPlaying,
    currentTrack,
    volume,
    duration,
    currentTime,
    error,
    play,
    stop,
    setVolume,
    HowlerComponent,
  };
};
