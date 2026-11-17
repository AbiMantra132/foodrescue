import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, Package, PlusCircle, Settings, 
  Bell, ChevronRight, Headphones, MessageCircle, Zap, 
  Building2, Menu, X, LogOut
} from 'lucide-react';
import { ProviderProvider, useProvider } from './ProviderContext';
import { clearSession } from '../../services/auth';

function LayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { accountData } = useProvider();

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const isSettings = location.pathname.includes('/pengaturan');

  const navItems = [
    { to: '/provider/ringkasan', icon: LayoutDashboard, label: 'Ringkasan' },
    { to: '/provider/surplus', icon: Package, label: 'Surplus Saya', end: true },
    { to: '/provider/surplus/baru', icon: PlusCircle, label: 'Tambah Surplus Baru' },
    { to: '/provider/pengaturan', icon: Settings, label: 'Pengaturan Akun' },
  ];

  const profileSub = isSettings ? 'Penyedia Surplus Pangan' : 'F&B Partner';
  const topbarName = isSettings ? 'Grand Sahid Jaya' : 'Grand Sahid Jaya Hotel';
  const topbarSub = isSettings ? 'Penyedia Terverifikasi' : 'Mitra Terverifikasi';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#15803D] text-base leading-tight">FoodRescue</div>
            <div className="text-[9px] font-semibold text-[#94A3B8] tracking-[0.14em] uppercase leading-tight">PROVIDER PORTAL</div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="mx-3 mb-4 bg-white rounded-xl p-3 border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#EEF0FF] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#4F46E5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[#0F172A] truncate">Grand Sahid Jaya</div>
            <div className="text-xs text-[#64748B] truncate">{profileSub}</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#15803D] text-white shadow-sm'
                  : 'text-[#64748B] hover:bg-white hover:text-[#0F172A]'
              }`
            }
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            {label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Keluar</span>
        </button>
      </nav>

      {/* Bantuan */}
      <div className="mx-3 mt-4 mb-5">
        <div className="bg-[#FFF1E0] rounded-xl p-3.5">
          <div className="flex items-center gap-2 mb-1.5">
            <Headphones className="w-4 h-4 text-[#B45309]" />
            <span className="text-xs font-bold text-[#0F172A]">Bantuan & Kendala</span>
          </div>
          <div className="text-[11px] text-[#B45309] font-semibold mb-1">● Tim Siaga Aktif</div>
          <p className="text-[11px] text-[#92400E] mb-3 leading-snug">
            Tim operasional FoodRescue siap bantu kendala kurir atau proses serah terima.
          </p>
          <button className="w-full flex items-center justify-between bg-[#15803D] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#166534] transition-colors">
            <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> Buka Chat Tim Siaga</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          {!isSettings && (
            <button className="w-full mt-2 flex items-center justify-between text-[#B45309] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#FEF3C7] transition-colors">
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Lihat Solusi Cepat</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#F3F3FB] border-r border-[#E5E7EB] h-screen sticky top-0 overflow-y-auto shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 h-full bg-[#F3F3FB] shadow-xl overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
          <button className="lg:hidden p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs font-semibold text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded-full whitespace-nowrap">
              ● Outlet Aktif: Dapur Utama Sahid
            </span>
            <span className="text-[#D1D5DB] hidden sm:block">/</span>
            <span className="text-xs text-[#64748B] hidden sm:block">Zona Penjemputan Jakarta Pusat</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="relative p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full" />
            </button>
            <div className="w-px h-6 bg-[#E5E7EB]" />
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">{topbarName}</div>
              <div className="text-[11px] text-[#15803D] flex items-center gap-1 justify-end">
                <span>✓</span> {topbarSub}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#15803D] flex items-center justify-center text-white text-xs font-bold">
              GS
            </div>
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
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function ProviderLayout() {
  return (
    <ProviderProvider>
      <LayoutInner />
    </ProviderProvider>
  );
}
