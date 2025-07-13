'use client';

// 성능 모니터링 유틸리티

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface WebVitalsCallback {
  (metric: PerformanceMetrics): void;
}

// Web Vitals 메트릭 수집
export function getWebVitals(callback: WebVitalsCallback): void {
  const metrics: PerformanceMetrics = {};

  // FCP (First Contentful Paint)
  try {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(
      (entry) => entry.name === 'first-contentful-paint'
    );
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
    }
  } catch (error) {
    console.warn('FCP 측정 실패:', error);
  }

  // LCP (Largest Contentful Paint)
  try {
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
        callback(metrics);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  } catch (error) {
    console.warn('LCP 측정 실패:', error);
  }

  // FID (First Input Delay)
  try {
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime;
          callback(metrics);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    }
  } catch (error) {
    console.warn('FID 측정 실패:', error);
  }

  // CLS (Cumulative Layout Shift)
  try {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.cls = clsValue;
            callback(metrics);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  } catch (error) {
    console.warn('CLS 측정 실패:', error);
  }

  // TTFB (Time to First Byte)
  try {
    const navigationEntry = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb =
        navigationEntry.responseStart - navigationEntry.requestStart;
    }
  } catch (error) {
    console.warn('TTFB 측정 실패:', error);
  }

  // 즉시 사용 가능한 메트릭 반환
  callback(metrics);
}

// 번들 크기 분석
export function getBundleSize(): Promise<number> {
  return new Promise((resolve) => {
    try {
      const resourceEntries = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];
      let totalSize = 0;

      resourceEntries.forEach((entry) => {
        if (
          entry.name.includes('/_next/static/') ||
          entry.name.includes('.js')
        ) {
          totalSize += entry.transferSize || 0;
        }
      });

      resolve(totalSize);
    } catch (error) {
      console.warn('번들 크기 측정 실패:', error);
      resolve(0);
    }
  });
}

// 메모리 사용량 측정
export function getMemoryUsage(): any {
  try {
    const memoryInfo = (performance as any).memory;
    if (memoryInfo) {
      return {
        usedJSHeapSize: memoryInfo.usedJSHeapSize,
        totalJSHeapSize: memoryInfo.totalJSHeapSize,
        jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
      };
    }
  } catch (error) {
    console.warn('메모리 사용량 측정 실패:', error);
  }
  return null;
}

// 네트워크 정보
export function getNetworkInfo(): any {
  try {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };
    }
  } catch (error) {
    console.warn('네트워크 정보 측정 실패:', error);
  }
  return null;
}

// 성능 리포트 생성
export function generatePerformanceReport(): Promise<any> {
  return new Promise((resolve) => {
    const report: any = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: {},
      bundleSize: 0,
      memory: null,
      network: null,
    };

    // Web Vitals 수집
    getWebVitals((metrics) => {
      report.metrics = metrics;
    });

    // 번들 크기
    getBundleSize().then((size) => {
      report.bundleSize = size;
    });

    // 메모리 사용량
    report.memory = getMemoryUsage();

    // 네트워크 정보
    report.network = getNetworkInfo();

    // 2초 후 리포트 완성
    setTimeout(() => {
      resolve(report);
    }, 2000);
  });
}

// 성능 점수 계산 (Lighthouse 스타일)
export function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  let score = 100;

  // FCP 점수 (1.8초 이하 = 100점)
  if (metrics.fcp) {
    if (metrics.fcp > 3000) score -= 30;
    else if (metrics.fcp > 1800) score -= 15;
  }

  // LCP 점수 (2.5초 이하 = 100점)
  if (metrics.lcp) {
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;
  }

  // FID 점수 (100ms 이하 = 100점)
  if (metrics.fid) {
    if (metrics.fid > 300) score -= 20;
    else if (metrics.fid > 100) score -= 10;
  }

  // CLS 점수 (0.1 이하 = 100점)
  if (metrics.cls) {
    if (metrics.cls > 0.25) score -= 20;
    else if (metrics.cls > 0.1) score -= 10;
  }

  return Math.max(0, score);
}

// 성능 모니터링 시작
export function startPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;

  console.log('🚀 성능 모니터링을 시작합니다...');

  getWebVitals((metrics) => {
    const score = calculatePerformanceScore(metrics);
    console.log('📊 성능 메트릭:', {
      metrics,
      score: `${score}/100`,
    });

    // 로컬스토리지에 성능 데이터 저장 (개발 목적)
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem(
        'performance-metrics',
        JSON.stringify({
          ...metrics,
          score,
          timestamp: new Date().toISOString(),
        })
      );
    }
  });
}

// 리소스 로딩 시간 측정
export function measureResourceLoadTime(resourceUrl: string): number {
  try {
    const resourceEntries = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];
    const resource = resourceEntries.find((entry) =>
      entry.name.includes(resourceUrl)
    );

    if (resource) {
      return resource.responseEnd - resource.requestStart;
    }
  } catch (error) {
    console.warn('리소스 로딩 시간 측정 실패:', error);
  }
  return 0;
}
