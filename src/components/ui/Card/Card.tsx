'use client';

import React from 'react';
import {
  StyledCard,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardFooter,
  CardBadge,
  CardIcon,
  CardText,
} from './Card.styled';

// Main Card component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'greeting'
    | 'translationBox'
    | 'statusBox'
    | 'welcomeBox'
    | 'errorBox'
    | 'successBox';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  children,
  ...props
}) => {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $interactive={interactive}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

// Export all card components
export default Card;
export {
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardFooter,
  CardBadge,
  CardIcon,
  CardText,
};
