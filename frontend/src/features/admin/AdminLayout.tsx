import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Leaf,
  ShieldCheck,
  History,
  Settings,
  Bell,
  Menu,
  X,
  User,
  Search,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { AdminProvider, useAdmin } from './AdminContext';
import { clearSession } from '../../services/auth';

function LayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    queueList,
    profile,
    toastMessage,
    searchFilter,
    setSearchFilter,
  } = useAdmin();

  const isVerifikasiPage = location.pathname.includes('/admin/verifikasi');
  const antreanCount = queueList.length;
  const kritisCount = queueList.filter(q => q.isUrgent).length;

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/admin/verifikasi',
      icon: ShieldCheck,
      label: 'Verifikasi Surplus',
      showBadge: !isVerifikasiPage && antreanCount > 0,
      badgeVal: antreanCount,
    },
    {
      to: '/admin/riwayat',
      icon: History,
      label: 'Riwayat',
      showBadge: false,
    },
    {
      to: '/admin/pengaturan',
      icon: Settings,
      label: 'Pengaturan',
      showBadge: false,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F3F3FB]">
      {/* Logo */}
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center shrink-0 shadow-xs">
            <Leaf className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#15803D] text-base leading-tight">
              FoodRescue
            </div>
            <div className="text-[11px] font-semibold text-[#64748B] tracking-tight leading-tight mt-0.5">
              Admin Verifikator
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label, showBadge, badgeVal }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#15803D] text-white shadow-sm font-semibold'
                  : 'text-[#64748B] hover:bg-white hover:text-[#0F172A]'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span>{label}</span>
            </div>
            {showBadge && (
              <span className="w-5 h-5 rounded-full bg-[#92400E] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {badgeVal}
              </span>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer mt-2"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Keluar</span>
        </button>
      </nav>

      {/* Bottom status */}
      <div className="p-4 mt-auto">
        <div className="pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block" />
            <span>Sistem SLA Siaga</span>
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5">
            v2.4.0 • Wilayah Jabodetabek
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex font-['Inter',sans-serif] text-[#0F172A] antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#F3F3FB] border-r border-[#E5E7EB] h-screen sticky top-0 overflow-y-auto shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 h-full bg-[#F3F3FB] shadow-2xl overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E5E7EB] h-18 flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-xl text-[#64748B] hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Left Topbar Content */}
          <div className="flex-1 min-w-0">
            {isVerifikasiPage ? (
              <div className="flex items-center gap-2.5">
                <span className="bg-[#EEF0FF] text-[#4F46E5] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                  <span>{antreanCount} Menunggu</span>
                </span>
                <span className="bg-[#FFF1E0] text-[#B45309] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                  <span>{kritisCount} Kritis</span>
                </span>
              </div>
            ) : (
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Cari donasi surplus, batch ID, atau mitra..."
                  className="w-full bg-white border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D] shadow-xs"
                />
              </div>
            )}
          </div>

          {/* Right Topbar Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bell Icon with Red Dot */}
            <div className="relative w-9 h-9 rounded-full bg-[#F0F2FA] flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <Bell className="w-4 h-4 text-[#0F172A]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
            </div>

            <div className="w-px h-6 bg-[#E5E7EB]" />

            {/* Profile info */}
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">
                {profile.name}
              </div>
              <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                Verifikator Utama
              </div>
            </div>

            {/* Avatar */}
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover shadow-xs border border-emerald-600"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#0B3D2E] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                <User className="w-4 h-4 text-white" />
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Keluar Akun"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#15803D] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold border border-emerald-600 animate-bounce">
          <CheckCircle2 className="w-4.5 h-4.5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export function AdminLayout() {
  return (
    <AdminProvider>
      <LayoutInner />
    </AdminProvider>
  );
}

export default AdminLayout;

