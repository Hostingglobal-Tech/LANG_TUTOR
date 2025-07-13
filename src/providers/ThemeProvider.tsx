'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import lightTheme, {
  darkTheme,
  globalStyles,
  darkGlobalStyles,
} from '../styles/theme.js';
import { createGlobalStyle } from 'styled-components';

// 글로벌 스타일 컴포넌트 생성
const GlobalStyle = createGlobalStyle<{ $isDarkMode: boolean }>`
  ${({ $isDarkMode }) => ($isDarkMode ? darkGlobalStyles : globalStyles)}
`;

// 테마 컨텍스트 타입 정의
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark' | null;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 테마 컨텍스트 훅
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 로컬 스토리지 키
const THEME_STORAGE_KEY = 'hello-world-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark' | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // 클라이언트 마운트 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 시스템 테마 감지
  useEffect(() => {
    if (!isClient) return;

    const detectSystemTheme = () => {
      if (window.matchMedia) {
        const isDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setSystemTheme(isDark ? 'dark' : 'light');
        return isDark;
      }
      return false;
    };

    // 초기 시스템 테마 감지
    const systemIsDark = detectSystemTheme();

    // 로컬 스토리지에서 사용자 설정 불러오기
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // 저장된 설정이 없으면 시스템 테마 사용
      setIsDarkMode(systemIsDark);
    }

    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');

      // 사용자가 명시적으로 설정하지 않았다면 시스템 테마 따르기
      const currentSavedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!currentSavedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, [isClient]);

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // 로컬 스토리지에 사용자 선택 저장
    if (isClient) {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    }
  };

  // HTML 클래스 업데이트 (다른 스타일링과의 호환성을 위해)
  useEffect(() => {
    if (!isClient) return;

    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode, isClient]);

  // 현재 테마 선택
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    systemTheme,
  };

  // 클라이언트 마운트 전에는 기본 테마로 렌더링
  if (!isClient) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <StyledThemeProvider theme={lightTheme}>
          <GlobalStyle $isDarkMode={false} />
          {children}
        </StyledThemeProvider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyle $isDarkMode={isDarkMode} />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
