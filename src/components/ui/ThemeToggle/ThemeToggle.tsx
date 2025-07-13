'use client';

import React from 'react';
import { useTheme } from '../../../providers/ThemeProvider';
import { Button } from '../Button/Button';
import {
  ToggleContainer,
  IconContainer,
  ThemeIcon,
  ToggleLabel,
  SystemIndicator,
} from './ThemeToggle.styled';

interface ThemeToggleProps {
  variant?: 'button' | 'switch';
  showLabel?: boolean;
  showSystemIndicator?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  showLabel = true,
  showSystemIndicator = true,
  className,
}) => {
  const { isDarkMode, toggleTheme, systemTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  if (variant === 'button') {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={handleToggle}
        aria-label={`${isDarkMode ? '라이트' : '다크'} 모드로 변경`}
        className={className}
      >
        <IconContainer>
          <ThemeIcon $isDarkMode={isDarkMode}>
            {isDarkMode ? '🌙' : '☀️'}
          </ThemeIcon>
        </IconContainer>
        {showLabel && (
          <ToggleLabel>{isDarkMode ? '라이트 모드' : '다크 모드'}</ToggleLabel>
        )}
      </Button>
    );
  }

  return (
    <ToggleContainer
      role="switch"
      aria-checked={isDarkMode}
      aria-label={`테마 전환: 현재 ${isDarkMode ? '다크' : '라이트'} 모드`}
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={className}
    >
      <IconContainer>
        <ThemeIcon $isDarkMode={isDarkMode}>
          {isDarkMode ? '🌙' : '☀️'}
        </ThemeIcon>
      </IconContainer>

      {showLabel && (
        <ToggleLabel>{isDarkMode ? '다크 모드' : '라이트 모드'}</ToggleLabel>
      )}

      {showSystemIndicator && systemTheme && (
        <SystemIndicator>
          시스템: {systemTheme === 'dark' ? '🌙' : '☀️'}
        </SystemIndicator>
      )}
    </ToggleContainer>
  );
};

export default ThemeToggle;
