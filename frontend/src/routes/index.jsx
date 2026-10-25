import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { LandingPage } from '../pages/LandingPage.jsx';
import { RegisterProvider } from '../pages/RegisterProvider.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/register" element={<RegisterProvider />} />
      <Route path="/register-provider" element={<RegisterProvider />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/provider" element={<DashboardPage defaultRole="penyedia" />} />
      <Route path="/dashboard/pengelola" element={<DashboardPage defaultRole="pengelola" />} />
      <Route path="/provider" element={<DashboardPage defaultRole="penyedia" />} />
      <Route path="/provider/dashboard" element={<DashboardPage defaultRole="penyedia" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
