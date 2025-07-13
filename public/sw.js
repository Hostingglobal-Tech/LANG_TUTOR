// Service Worker for 안녕 세계 - 다국어 인사 학습 서비스
// PWA 오프라인 지원 및 캐싱 전략

const CACHE_NAME = 'hello-world-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// 캐시할 정적 리소스 목록
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  // Next.js 정적 자산들은 빌드 후 자동으로 추가됨
];

// 캐시하지 않을 URL 패턴
const EXCLUDE_URLS = [
  '/api/',
  '/_next/webpack-hmr',
  '/_next/static/chunks/webpack',
  '/sw.js',
];

// URL이 제외 목록에 있는지 확인
function shouldExcludeFromCache(url) {
  return EXCLUDE_URLS.some(pattern => url.includes(pattern));
}

// 네트워크 우선 전략 (동적 콘텐츠용)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok && !shouldExcludeFromCache(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('오프라인 상태입니다.', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// 캐시 우선 전략 (정적 자산용)
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Cache and network failed:', error);
    return new Response('리소스를 찾을 수 없습니다.', {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Cache installation failed:', error);
      })
  );
  
  // 새 Service Worker를 즉시 활성화
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // 현재 버전이 아닌 캐시 삭제
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // 모든 클라이언트에서 새 Service Worker 제어
        return self.clients.claim();
      })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 같은 도메인의 요청만 처리
  if (url.origin !== location.origin) {
    return;
  }
  
  // 제외 URL 패턴 확인
  if (shouldExcludeFromCache(request.url)) {
    return;
  }
  
  event.respondWith(
    (async () => {
      // HTML 페이지: 네트워크 우선
      if (request.destination === 'document') {
        return networkFirst(request);
      }
      
      // 정적 자산: 캐시 우선
      if (request.destination === 'script' || 
          request.destination === 'style' ||
          request.destination === 'image' ||
          request.url.includes('/_next/static/')) {
        return cacheFirst(request);
      }
      
      // 오디오 파일: 네트워크 우선 (발음 파일)
      if (request.destination === 'audio') {
        return networkFirst(request);
      }
      
      // 기타: 네트워크 우선
      return networkFirst(request);
    })()
  );
});

// 백그라운드 동기화 (나중에 확장 가능)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 백그라운드에서 수행할 작업
      doBackgroundSync()
    );
  }
});

// 푸시 알림 처리 (나중에 확장 가능)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : '새로운 인사말을 확인해보세요!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: '학습하기',
        icon: '/icons/action-explore.png',
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/icons/action-close.png',
      },
    ],
  };
  
  event.waitUntil(
    self.registration.showNotification('안녕 세계', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 백그라운드 동기화 함수
async function doBackgroundSync() {
  try {
    // 오프라인에서 저장된 데이터 동기화 등의 작업
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// 에러 처리
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error occurred:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled promise rejection:', event.reason);
});