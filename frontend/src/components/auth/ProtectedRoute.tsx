import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getSession, getPortalPathForRole, Role } from '../../services/auth';

interface ProtectedRouteProps {
  allowedRole: Role;
}

export function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const session = getSession();
  const location = useLocation();

  if (!session) {
    // Pengguna belum login → arahkan ke Login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (session.role !== allowedRole) {
    // Role tidak cocok → arahkan ke portal yang berhak bagi role tersebut (bukan default ke penyedia)
    const targetPath = getPortalPathForRole(session.role);
    return <Navigate to={targetPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

