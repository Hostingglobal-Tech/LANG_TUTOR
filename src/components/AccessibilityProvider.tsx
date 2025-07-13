'use client';

import React, { useEffect } from 'react';

// Only load axe-core in development and browser environment
const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      import('@axe-core/react')
        .then((axe) => {
          import('react-dom').then((ReactDOM) => {
            axe.default(React, ReactDOM, 1000);
          });
        })
        .catch((error) => {
          console.warn('Failed to load axe-core:', error);
        });
    }
  }, []);

  return <>{children}</>;
};

export default AccessibilityProvider;
