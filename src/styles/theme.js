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

// Dark Theme Configuration for Multilingual Greetings App
// Child-friendly dark color palette with high contrast and eye comfort
const darkTheme = {
  // Primary color palette - Softer blues for dark mode
  colors: {
    // Main brand colors (adjusted for dark backgrounds)
    primary: {
      50: '#0f172a', // Very dark blue (inverted)
      100: '#1e293b', // Dark blue
      200: '#334155', // Medium dark blue
      300: '#475569', // Medium blue
      400: '#64748b', // Light blue
      500: '#94a3b8', // Main light blue
      600: '#cbd5e1', // Lighter blue
      700: '#e2e8f0', // Very light blue
      800: '#f1f5f9', // Almost white blue
      900: '#f8fafc', // Near white
    },

    // Secondary colors - Soft greens for comfort
    secondary: {
      50: '#0f1a14', // Very dark green
      100: '#16302b', // Dark green
      200: '#1f4037', // Medium dark green
      300: '#2d5a47', // Medium green
      400: '#4ade80', // Accent green (kept bright)
      500: '#34d399', // Main green
      600: '#6ee7b7', // Light green
      700: '#a7f3d0', // Very light green
      800: '#d1fae5', // Almost white green
      900: '#ecfdf5', // Near white green
    },

    // Accent colors - Vibrant but eye-friendly
    accent: {
      purple: '#c084fc', // Softer purple
      pink: '#f472b6', // Softer pink
      orange: '#fb923c', // Softer orange
      yellow: '#fbbf24', // Softer yellow
      red: '#f87171', // Softer red
    },

    // Neutral colors - Dark theme neutrals
    neutral: {
      0: '#0f172a', // Dark background
      50: '#1e293b', // Very dark gray
      100: '#334155', // Dark gray
      200: '#475569', // Medium dark gray
      300: '#64748b', // Medium gray
      400: '#94a3b8', // Light gray
      500: '#cbd5e1', // Very light gray
      600: '#e2e8f0', // Almost white
      700: '#f1f5f9', // Near white
      800: '#f8fafc', // Very light
      900: '#ffffff', // Pure white (for text)
    },

    // Semantic colors for dark mode
    success: '#34d399', // Bright green for visibility
    warning: '#fbbf24', // Bright amber
    error: '#f87171', // Soft red
    info: '#60a5fa', // Bright blue
  },

  // Typography system (same as light theme)
  typography: {
    fontFamily: {
      primary: "'Inter', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      secondary: "'Comic Neue', 'Arial', sans-serif",
      mono: "'JetBrains Mono', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing system (same as light theme)
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  // Border radius (same as light theme)
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },

  // Dark mode shadows (more subtle)
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },

  // Component-specific styling for dark mode
  components: {
    button: {
      primary: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        borderColor: '#3b82f6',
        hoverBackgroundColor: '#2563eb',
        focusRingColor: '#93c5fd',
      },
      secondary: {
        backgroundColor: '#374151',
        color: '#f9fafb',
        borderColor: '#4b5563',
        hoverBackgroundColor: '#4b5563',
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
    card: {
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      hoverShadowColor: 'rgba(0, 0, 0, 0.6)',
    },
    input: {
      backgroundColor: '#374151',
      borderColor: '#4b5563',
      focusBorderColor: '#3b82f6',
      focusRingColor: '#93c5fd',
      placeholderColor: '#9ca3af',
    },
  },

  // Breakpoints (same as light theme)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation (same as light theme)
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

  // Z-index (same as light theme)
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

// Global styles for dark theme
export const darkGlobalStyles = `
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${darkTheme.typography.fontFamily.primary};
    background: linear-gradient(135deg, ${darkTheme.colors.neutral[50]} 0%, ${darkTheme.colors.neutral[100]} 100%);
    color: ${darkTheme.colors.neutral[800]};
    line-height: ${darkTheme.typography.lineHeight.normal};
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  /* Focus styles for dark mode */
  *:focus {
    outline: 3px solid ${darkTheme.colors.primary[500]};
    outline-offset: 2px;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  *:focus-visible {
    outline: 3px solid ${darkTheme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      background: ${darkTheme.colors.neutral[0]};
      color: ${darkTheme.colors.neutral[900]};
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

  /* Print styles (force light theme for printing) */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
  }
`;

export default lightTheme;
export { darkTheme };
