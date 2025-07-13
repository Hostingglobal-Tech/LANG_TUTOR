import styled, { css } from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeInOut};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
    border-color: ${({ theme }) => theme.colors.primary[300]};
    transform: translateY(-1px);
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }

    &:active {
      transform: none;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing[6]};
  height: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[100]},
    ${({ theme }) => theme.colors.secondary[100]}
  );
  transition: all ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeInOut};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ThemeIcon = styled.span<{ $isDarkMode: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  display: block;
  animation: ${({ $isDarkMode }) => ($isDarkMode ? 'moonGlow' : 'sunShine')} 2s
    ease-in-out infinite alternate;

  @keyframes sunShine {
    0% {
      transform: scale(1) rotate(0deg);
      filter: brightness(1);
    }
    100% {
      transform: scale(1.1) rotate(5deg);
      filter: brightness(1.2);
    }
  }

  @keyframes moonGlow {
    0% {
      transform: scale(1);
      filter: brightness(0.9);
    }
    100% {
      transform: scale(1.05);
      filter: brightness(1.1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ToggleLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[700]};
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const SystemIndicator = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutral[500]};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
