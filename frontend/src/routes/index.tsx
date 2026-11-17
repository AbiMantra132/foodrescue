import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterProvider } from '../pages/RegisterProvider';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProviderLayout } from '../features/provider/ProviderLayout';
import ProviderRingkasan from '../features/provider/pages/ProviderRingkasan';
import ProviderSurplus from '../features/provider/pages/ProviderSurplus';
import ProviderTambahSurplus from '../features/provider/pages/ProviderTambahSurplus';
import ProviderPengaturan from '../features/provider/pages/ProviderPengaturan';
import { PengelolaLayout } from '../features/pengelola/PengelolaLayout';
import PengelolaRingkasan from '../features/pengelola/pages/PengelolaRingkasan';
import PengelolaDetail from '../features/pengelola/pages/PengelolaDetail';
import PengelolaKlaim from '../features/pengelola/pages/PengelolaKlaim';
import PengelolaPengaturan from '../features/pengelola/pages/PengelolaPengaturan';
import { AdminLayout } from '../features/admin/AdminLayout';
import AdminVerifikasi from '../features/admin/pages/AdminVerifikasi';
import AdminPengaturan from '../features/admin/pages/AdminPengaturan';
import AdminRiwayat from '../features/admin/pages/AdminRiwayat';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterProvider />} />
      <Route path="/register-provider" element={<RegisterProvider />} />
      <Route path="/register/penyedia" element={<RegisterProvider role="penyedia" />} />
      <Route path="/register/pengelola" element={<RegisterProvider role="pengelola" />} />
      <Route path="/dashboard/provider" element={<Navigate to="/provider/ringkasan" replace />} />
      <Route path="/dashboard/pengelola" element={<Navigate to="/pengelola/ringkasan" replace />} />

      {/* Admin Verifikator Portal (Khusus Role Admin) */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/verifikasi" replace />} />
          <Route path="verifikasi" element={<AdminVerifikasi />} />
          <Route path="riwayat" element={<AdminRiwayat />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>
        <Route path="/dashboard" element={<Navigate to="/admin/verifikasi" replace />} />
      </Route>

      {/* Provider Portal (Khusus Role Penyedia) */}
      <Route element={<ProtectedRoute allowedRole="penyedia" />}>
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<Navigate to="/provider/ringkasan" replace />} />
          <Route path="ringkasan" element={<ProviderRingkasan />} />
          <Route path="surplus" element={<ProviderSurplus />} />
          <Route path="surplus/baru" element={<ProviderTambahSurplus />} />
          <Route path="pengaturan" element={<ProviderPengaturan />} />
        </Route>
      </Route>

      {/* Pengelola Portal (Khusus Role Pengelola) */}
      <Route element={<ProtectedRoute allowedRole="pengelola" />}>
        <Route path="/pengelola" element={<PengelolaLayout />}>
          <Route index element={<Navigate to="/pengelola/ringkasan" replace />} />
          <Route path="ringkasan" element={<PengelolaRingkasan />} />
          <Route path="surplus/:id" element={<PengelolaDetail />} />
          <Route path="klaim" element={<PengelolaKlaim />} />
          <Route path="pengaturan" element={<PengelolaPengaturan />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
