import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/components/I18nProvider';
import AccessibilityProvider from '@/components/AccessibilityProvider';
import SkipNavigation from '@/components/SkipNavigation';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '다국어 인사말 학습',
  description: '초등학교 1,2학년을 위한 다국어 인사말 학습 서비스',
  keywords: ['교육', '다국어', '인사말', '초등학생', '언어학습'],
  authors: [{ name: 'ENG_TUTOR Team' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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
