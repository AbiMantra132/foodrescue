import React from 'react';

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const variantClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  const combinedClass = `btn ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
