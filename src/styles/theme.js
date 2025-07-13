// Light Theme Configuration for Multilingual Greetings App
// Child-friendly color palette for elementary school students (grades 1-2)

export const lightTheme = {
  // Primary color palette - Child-friendly and accessible
  colors: {
    // Main brand colors
    primary: {
      50: '#eff6ff', // Very light blue
      100: '#dbeafe', // Light blue
      200: '#bfdbfe', // Lighter blue
      300: '#93c5fd', // Medium light blue
      400: '#60a5fa', // Medium blue
      500: '#3b82f6', // Main blue
      600: '#2563eb', // Darker blue
      700: '#1d4ed8', // Dark blue
      800: '#1e40af', // Very dark blue
      900: '#1e3a8a', // Deepest blue
    },

    // Secondary colors - Warm and friendly
    secondary: {
      50: '#f0fdf4', // Very light green
      100: '#dcfce7', // Light green
      200: '#bbf7d0', // Lighter green
      300: '#86efac', // Medium light green
      400: '#4ade80', // Medium green
      500: '#22c55e', // Main green
      600: '#16a34a', // Darker green
      700: '#15803d', // Dark green
      800: '#166534', // Very dark green
      900: '#14532d', // Deepest green
    },

    // Accent colors - Playful and engaging
    accent: {
      purple: '#a855f7', // Purple for variety
      pink: '#ec4899', // Pink for warmth
      orange: '#f97316', // Orange for energy
      yellow: '#eab308', // Yellow for joy
      red: '#ef4444', // Red for alerts
    },

    // Neutral colors - High contrast for accessibility
    neutral: {
      0: '#ffffff', // Pure white
      50: '#f9fafb', // Off white
      100: '#f3f4f6', // Very light gray
      200: '#e5e7eb', // Light gray
      300: '#d1d5db', // Medium light gray
      400: '#9ca3af', // Medium gray
      500: '#6b7280', // Medium dark gray
      600: '#4b5563', // Dark gray
      700: '#374151', // Very dark gray
      800: '#1f2937', // Almost black
      900: '#111827', // Near black
    },

    // Semantic colors for UI states
    success: '#10b981', // Green for success
    warning: '#f59e0b', // Amber for warnings
    error: '#ef4444', // Red for errors
    info: '#3b82f6', // Blue for information
  },

  // Typography system
  typography: {
    // Font families optimized for readability
    fontFamily: {
      primary: "'Inter', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      secondary: "'Comic Neue', 'Arial', sans-serif", // Child-friendly fallback
      mono: "'JetBrains Mono', 'Courier New', monospace",
    },

    // Font sizes with good readability
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px - minimum for accessibility
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },

    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line heights for optimal readability
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing system (8pt grid)
  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // Border radius for friendly, rounded interfaces
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    base: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px', // Perfect circle
  },

  // Shadows for depth and elevation
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Component-specific styling
  components: {
    // Button variants
    button: {
      primary: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        borderColor: '#2563eb',
        hoverBackgroundColor: '#1d4ed8',
        focusRingColor: '#93c5fd',
      },
      secondary: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        borderColor: '#d1d5db',
        hoverBackgroundColor: '#e5e7eb',
        focusRingColor: '#93c5fd',
      },
      success: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        borderColor: '#10b981',
        hoverBackgroundColor: '#059669',
        focusRingColor: '#86efac',
      },
    },

    // Card styling
    card: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      hoverShadowColor: 'rgba(0, 0, 0, 0.15)',
    },

    // Input styling
    input: {
      backgroundColor: '#ffffff',
      borderColor: '#d1d5db',
      focusBorderColor: '#2563eb',
      focusRingColor: '#93c5fd',
      placeholderColor: '#9ca3af',
    },
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation and transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

// Global styles for the light theme
export const globalStyles = `
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px; /* Ensure 16px base for accessibility */
    scroll-behavior: smooth;
  }

  body {
    font-family: ${lightTheme.typography.fontFamily.primary};
    background: linear-gradient(135deg, ${lightTheme.colors.primary[50]} 0%, ${lightTheme.colors.secondary[50]} 100%);
    color: ${lightTheme.colors.neutral[800]};
    line-height: ${lightTheme.typography.lineHeight.normal};
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 3px solid ${lightTheme.colors.primary[500]};
    outline-offset: 2px;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  *:focus-visible {
    outline: 3px solid ${lightTheme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      background: ${lightTheme.colors.neutral[0]};
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Print styles */
  @media print {
    body {
      background: white;
      color: black;
    }
  }
`;

export default lightTheme;
