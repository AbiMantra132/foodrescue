import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function Card({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={`card-base ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
