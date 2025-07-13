import styled, { css } from 'styled-components';

// Button variant styles
const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[700]};
      border-color: ${({ theme }) => theme.colors.primary[700]};
      transform: translateY(-1px);
    }

    &:focus {
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[200]};
    }
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[800]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[300]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.neutral[200]};
      border-color: ${({ theme }) => theme.colors.neutral[400]};
      transform: translateY(-1px);
    }

    &:focus {
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[200]};
    }
  `,

  success: css`
    background-color: ${({ theme }) => theme.colors.secondary[600]};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.secondary[600]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary[700]};
      border-color: ${({ theme }) => theme.colors.secondary[700]};
      transform: translateY(-1px);
    }

    &:focus {
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.secondary[200]};
    }
  `,

  playButton: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent.purple},
      ${({ theme }) => theme.colors.primary[500]}
    );
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.accent.purple},
        ${({ theme }) => theme.colors.primary[600]}
      );
      transform: scale(1.05);
    }

    &:focus {
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accent.purple}40;
    }
  `,

  error: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.error};

    &:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
      transform: translateY(-1px);
    }

    &:focus {
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
    }
  `,
};

// Button size styles
const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => theme.spacing[2]}
      ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    min-height: 36px;
    min-width: 36px;
  `,

  md: css`
    padding: ${({ theme }) => theme.spacing[3]}
      ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    min-height: 44px;
    min-width: 44px;
  `,

  lg: css`
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    min-height: 48px;
    min-width: 48px;
  `,
};

interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'success' | 'playButton' | 'error';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $isPlaying?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};

  /* Typography */
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-align: center;
  text-decoration: none;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  /* Layout */
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  /* Transitions */
  transition: all ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeInOut};

  /* Apply variant styles */
  ${({ $variant = 'primary' }) => buttonVariants[$variant]}

  /* Apply size styles */
  ${({ $size = 'md' }) => buttonSizes[$size]}
  
  /* Full width option */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  
  /* Playing animation for audio buttons */
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      animation: pulse 1.5s ease-in-out infinite;

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
    `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border-width: 3px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;

    &:hover:not(:disabled) {
      transform: none;
    }
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.2em;
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1em;
  }
`;

export const ButtonText = styled.span<{ $hideOnMobile?: boolean }>`
  ${({ $hideOnMobile }) =>
    $hideOnMobile &&
    css`
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: none;
      }
    `}
`;

export const ButtonTextMobile = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline;
  }
`;
