import styled, { css } from 'styled-components';

// Card variant styles
const cardVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
    box-shadow: ${({ theme }) => theme.boxShadow.base};

    &:hover {
      box-shadow: ${({ theme }) => theme.boxShadow.lg};
      border-color: ${({ theme }) => theme.colors.primary[300]};
    }
  `,

  greeting: css`
    background-color: ${({ theme }) => theme.colors.neutral[0]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
    box-shadow: ${({ theme }) => theme.boxShadow.md};

    &:hover {
      box-shadow: ${({ theme }) => theme.boxShadow.xl};
      border-color: ${({ theme }) => theme.colors.primary[400]};
      transform: translateY(-2px);
    }

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.primary[500]};
      box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[200]};
    }
  `,

  translationBox: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary[50]},
      ${({ theme }) => theme.colors.secondary[50]}
    );
    border: 2px solid ${({ theme }) => theme.colors.primary[200]};
    box-shadow: inset 0 1px 3px ${({ theme }) => theme.colors.primary[100]};
  `,

  statusBox: css`
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  `,

  welcomeBox: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary[100]},
      ${({ theme }) => theme.colors.accent.purple}20
    );
    border: 2px solid ${({ theme }) => theme.colors.primary[300]};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  `,

  errorBox: css`
    background-color: ${({ theme }) => theme.colors.neutral[50]};
    border: 2px solid ${({ theme }) => theme.colors.error};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  `,

  successBox: css`
    background-color: ${({ theme }) => theme.colors.secondary[50]};
    border: 2px solid ${({ theme }) => theme.colors.secondary[400]};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  `,
};

interface StyledCardProps {
  $variant?: keyof typeof cardVariants;
  $padding?: 'sm' | 'md' | 'lg';
  $interactive?: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  /* Base card styles */
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  position: relative;

  /* Transitions */
  transition: all ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeInOut};

  /* Apply variant styles */
  ${({ $variant = 'default' }) => cardVariants[$variant]}

  /* Padding options */
  ${({ $padding = 'md', theme }) => {
    const paddingMap = {
      sm: theme.spacing[4],
      md: theme.spacing[6],
      lg: theme.spacing[8],
    };
    return css`
      padding: ${paddingMap[$padding]};
    `;
  }}
  
  /* Interactive cards */
  ${({ $interactive }) =>
    $interactive &&
    css`
      cursor: pointer;

      &:focus {
        outline: 3px solid ${({ theme }) => theme.colors.primary[500]};
        outline-offset: 2px;
      }
    `}
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border-width: 3px;
    box-shadow: none;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const CardSubtitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing[4]};
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

export const CardBadge = styled.span<{ $variant?: 'difficulty' | 'category' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[3]};
  z-index: ${({ theme }) => theme.zIndex.base + 1};

  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid transparent;

  ${({ $variant }) =>
    $variant === 'difficulty' &&
    css`
      right: ${({ theme }) => theme.spacing[3]};
    `}

  ${({ $variant }) =>
    $variant === 'category' &&
    css`
      left: ${({ theme }) => theme.spacing[3]};
      background-color: ${({ theme }) => theme.colors.primary[100]};
      color: ${({ theme }) => theme.colors.primary[800]};
      border-color: ${({ theme }) => theme.colors.primary[200]};
    `}
`;

export const CardIcon = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

export const CardText = styled.p<{
  $variant?: 'primary' | 'secondary' | 'accent';
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  ${({ $variant = 'primary', theme }) => {
    const variantStyles = {
      primary: css`
        color: ${theme.colors.neutral[800]};
        font-size: ${theme.typography.fontSize.base};
      `,
      secondary: css`
        color: ${theme.colors.neutral[600]};
        font-size: ${theme.typography.fontSize.sm};
      `,
      accent: css`
        color: ${theme.colors.primary[800]};
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.medium};
      `,
    };
    return variantStyles[$variant];
  }}
`;
