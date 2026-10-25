import React from 'react';

export function Card({
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`card-base ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
