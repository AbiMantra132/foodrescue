import React from 'react';

export function Badge({
  children,
  variant = 'mint',
  className = '',
  ...props
}) {
  const variantClass = variant === 'dark' ? 'badge-pill-dark' : 'badge-pill';
  return (
    <span className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
