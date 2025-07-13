'use client';

import React from 'react';
import {
  StyledButton,
  ButtonIcon,
  ButtonText,
  ButtonTextMobile,
} from './Button.styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'playButton';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isPlaying?: boolean;
  icon?: React.ReactNode;
  mobileText?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isPlaying = false,
  icon,
  mobileText,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isPlaying={isPlaying}
      {...props}
    >
      {icon && <ButtonIcon>{icon}</ButtonIcon>}

      {mobileText ? (
        <>
          <ButtonText $hideOnMobile>{children}</ButtonText>
          <ButtonTextMobile>{mobileText}</ButtonTextMobile>
        </>
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </StyledButton>
  );
};

export default Button;
