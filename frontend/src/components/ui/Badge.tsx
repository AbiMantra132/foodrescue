import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: 'mint' | 'dark' | string;
  className?: string;
  [key: string]: any;
}

export function Badge({
  children,
  variant = 'mint',
  className = '',
  ...props
}: BadgeProps) {
  const variantClass = variant === 'dark' ? 'badge-pill-dark' : 'badge-pill';
  return (
    <span className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export default Badge;
