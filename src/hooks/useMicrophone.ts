'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseMicrophoneReturn {
  isRecording: boolean;
  hasPermission: boolean;
  permissionDenied: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
  requestPermission: () => Promise<boolean>;
  error: string | null;
  recordingTime: number;
}

export const useMicrophone = (): UseMicrophoneReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      setPermissionDenied(false);

      // Check if MediaRecorder is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('이 브라우저에서는 마이크 기능을 지원하지 않습니다.');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      setHasPermission(true);
      return true;
    } catch (err) {
      console.warn('Microphone permission denied:', err);
      setPermissionDenied(true);
      setHasPermission(false);

      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError(
            '마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.'
          );
        } else if (err.name === 'NotFoundError') {
          setError(
            '마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요.'
          );
        } else {
          setError('마이크에 접근할 수 없습니다: ' + err.message);
        }
      } else {
        setError('마이크에 접근할 수 없습니다.');
      }
      return false;
    }
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
    try {
      setError(null);

      // Request permission if not already granted
      if (!hasPermission || !streamRef.current) {
        const granted = await requestPermission();
        if (!granted) return;
      }

      // Check if stream is still active
      if (streamRef.current && !streamRef.current.active) {
        const granted = await requestPermission();
        if (!granted) return;
      }

      if (!streamRef.current) {
        setError('마이크 스트림을 가져올 수 없습니다.');
        return;
      }

      // Clear previous recording
      chunksRef.current = [];
      setAudioBlob(null);
      setAudioUrl(null);

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4',
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType,
        });
        setAudioBlob(blob);

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('녹음 중 오류가 발생했습니다.');
        setIsRecording(false);
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Start recording error:', err);
      setError('녹음을 시작할 수 없습니다.');
      setIsRecording(false);
    }
  }, [hasPermission, requestPermission]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setHasPermission(false);
    }
  }, [isRecording]);

  const clearRecording = useCallback(() => {
    setAudioBlob(null);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    setRecordingTime(0);
    chunksRef.current = [];
  }, [audioUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return {
    isRecording,
    hasPermission,
    permissionDenied,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    requestPermission,
    error,
    recordingTime,
  };
};
