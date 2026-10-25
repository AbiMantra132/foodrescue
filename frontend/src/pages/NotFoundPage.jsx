import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h1 style={{ fontSize: '72px', color: 'var(--color-primary)', fontWeight: 700 }}>404</h1>
      <h2 style={{ fontSize: '28px', margin: '16px 0 24px', color: 'var(--color-text-main)' }}>Page not found</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
