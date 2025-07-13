'use client';

import React from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { lightTheme, globalStyles } from '@/styles/theme';

// Create global styles component
const GlobalStyle = createGlobalStyle`
  ${globalStyles}
`;

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
