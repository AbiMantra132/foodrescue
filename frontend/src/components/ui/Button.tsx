import React from 'react';

export interface ButtonProps extends React.AllHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | string;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<any>) => void;
  [key: string]: any;
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  const variantClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  const combinedClass = `btn ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export default Button;
