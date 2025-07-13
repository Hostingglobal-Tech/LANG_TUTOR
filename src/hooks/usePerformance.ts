'use client';

import { useEffect, useState } from 'react';
import {
  getWebVitals,
  calculatePerformanceScore,
  getBundleSize,
} from '@/utils/performance';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  score: number;
  bundleSize: number;
  isLoading: boolean;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

export const usePerformance = (): UsePerformanceReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [score, setScore] = useState(0);
  const [bundleSize, setBundleSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Web Vitals 수집
    getWebVitals((newMetrics) => {
      setMetrics(newMetrics);
      const newScore = calculatePerformanceScore(newMetrics);
      setScore(newScore);
      setIsLoading(false);
    });

    // 번들 크기 측정
    getBundleSize().then((size) => {
      setBundleSize(size);
    });
  }, []);

  // 성능 등급 계산
  const getGrade = (score: number): 'A' | 'B' | 'C' | 'D' | 'F' => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return {
    metrics,
    score,
    bundleSize,
    isLoading,
    grade: getGrade(score),
  };
};
