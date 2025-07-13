'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
} from './Modal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // 모달이 열릴 때 포커스 관리
  useEffect(() => {
    if (isOpen) {
      // 현재 포커스된 요소 저장
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // 모달에 포커스 설정
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // 바디 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 이전에 포커스된 요소로 복원
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }

      // 바디 스크롤 복원
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // 오버레이 클릭으로 모달 닫기
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer
        ref={modalRef}
        $size={size}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
      >
        {title && (
          <ModalHeader>
            <ModalTitle id="modal-title">{title}</ModalTitle>
            <ModalCloseButton
              onClick={onClose}
              aria-label="모달 닫기"
              type="button"
            >
              ✕
            </ModalCloseButton>
          </ModalHeader>
        )}

        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  // 포털을 사용하여 body에 렌더링
  return createPortal(modalContent, document.body);
};
