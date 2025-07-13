import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import SkipNavigation from '@/components/SkipNavigation';
import ThemeProvider from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '안녕 세계 - 다국어 인사 학습 서비스',
  description:
    '초등학생을 위한 재미있는 다국어 인사말 학습 웹앱입니다. 영어, 일본어, 중국어, 프랑스어, 스페인어 등 다양한 언어의 인사말을 배우고 발음 연습을 할 수 있습니다.',
  keywords: [
    '교육',
    '다국어',
    '인사말',
    '초등학생',
    '언어학습',
    'PWA',
    '발음연습',
  ],
  authors: [{ name: 'ENG_TUTOR Team' }],
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '안녕 세계',
  },
  openGraph: {
    title: '안녕 세계 - 다국어 인사 학습 서비스',
    description: '초등학생을 위한 재미있는 다국어 인사말 학습 웹앱',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '안녕 세계 - 다국어 인사 학습 서비스',
    description: '초등학생을 위한 재미있는 다국어 인사말 학습 웹앱',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/icons/icon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="128x128"
          href="/icons/icon-128x128.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="384x384"
          href="/icons/icon-384x384.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="안녕 세계" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <SkipNavigation />
        <ThemeProvider>
          <AccessibilityProvider>
            <I18nProvider>
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
            </I18nProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
