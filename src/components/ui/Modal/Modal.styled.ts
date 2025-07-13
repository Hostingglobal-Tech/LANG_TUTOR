import styled, { css, keyframes } from 'styled-components';

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeOut};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

interface ModalContainerProps {
  $size: 'small' | 'medium' | 'large' | 'fullscreen';
}

const sizeStyles = {
  small: css`
    max-width: 400px;
    width: 100%;
  `,
  medium: css`
    max-width: 600px;
    width: 100%;
  `,
  large: css`
    max-width: 800px;
    width: 100%;
  `,
  fullscreen: css`
    max-width: 95vw;
    max-height: 95vh;
    width: 100%;
    height: 100%;
  `,
};

export const ModalContainer = styled.div<ModalContainerProps>`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.boxShadow.xl};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} ${({ theme }) => theme.animation.duration.normal}
    ${({ theme }) => theme.animation.easing.easeOut};

  ${({ $size }) => sizeStyles[$size]}

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.spacing[2]};
    max-height: calc(100vh - ${({ theme }) => theme.spacing[4]});
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[6]}
    ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
  flex: 1;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.neutral[500]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.animation.duration.fast}
    ${({ theme }) => theme.animation.easing.easeOut};
  margin-left: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`;

export const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  overflow-y: auto;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }

  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[400]};
  }
`;
