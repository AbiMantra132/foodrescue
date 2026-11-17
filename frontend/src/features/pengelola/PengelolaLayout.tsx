import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Leaf,
  LayoutDashboard,
  HandHeart,
  Settings,
  Headphones,
  Bell,
  Menu,
  X,
  User,
  ChevronsUpDown,
  CheckCircle2,
  Phone,
  Send,
  MessageCircle,
  LogOut,
} from 'lucide-react';
import { PengelolaProvider, usePengelola } from './PengelolaContext';
import { clearSession } from '../../services/auth';

function LayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };
  const {
    accountData,
    toastMessage,
    isChatModalOpen,
    setIsChatModalOpen,
    isHotlineModalOpen,
    setIsHotlineModalOpen,
  } = usePengelola();

  // Chat Dummy State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Halo Siti Rahmawati! Tim Siaga FoodRescue aktif mendampingi posko. Ada yang bisa kami bantu seputar penjemputan atau penerimaan pangan?',
      time: '14:00',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: 'Pesan Anda telah kami teruskan ke koordinator lapangan posko Kwitang. Mohon tunggu sejenak, tim kami sedang mengecek statusnya.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  const isSurplusActive =
    location.pathname.startsWith('/pengelola/klaim') ||
    location.pathname.startsWith('/pengelola/surplus');

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F3F3FB]">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center shrink-0 shadow-xs">
            <Leaf className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#15803D] text-base leading-tight">
              FoodRescue
            </div>
            <div className="text-[9px] font-semibold text-[#94A3B8] tracking-[0.14em] uppercase leading-tight">
              PENGELOLA PORTAL
            </div>
          </div>
        </div>
      </div>

      {/* Organization Card */}
      <div className="mx-3 mb-4 bg-[#EEF0FF] rounded-xl p-3 border border-indigo-100/40 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-[#0F172A] truncate">
              {accountData.institutionName}
            </div>
            <div className="text-[11px] font-semibold text-[#15803D] flex items-center gap-1 mt-0.5">
              <span>✓</span> Mitra Terverifikasi
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-[#64748B] shrink-0 ml-1" />
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 space-y-1">
        {/* Ringkasan */}
        <NavLink
          to="/pengelola/ringkasan"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive && !isSurplusActive
                ? 'bg-[#15803D] text-white shadow-sm font-semibold'
                : 'text-[#64748B] hover:bg-white hover:text-[#0F172A]'
            }`
          }
        >
          <LayoutDashboard className="w-4.5 h-4.5 shrink-0" />
          <span>Ringkasan</span>
        </NavLink>

        {/* Klaim Surplus */}
        <NavLink
          to="/pengelola/klaim"
          onClick={() => setSidebarOpen(false)}
          className={() =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isSurplusActive
                ? 'bg-[#15803D] text-white shadow-sm font-semibold'
                : 'text-[#64748B] hover:bg-white hover:text-[#0F172A]'
            }`
          }
        >
          <HandHeart className="w-4.5 h-4.5 shrink-0" />
          <span>Klaim Surplus</span>
        </NavLink>

        {/* Pengaturan Akun */}
        <NavLink
          to="/pengelola/pengaturan"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-[#15803D] text-white shadow-sm font-semibold'
                : 'text-[#64748B] hover:bg-white hover:text-[#0F172A]'
            }`
          }
        >
          <Settings className="w-4.5 h-4.5 shrink-0" />
          <span>Pengaturan Akun</span>
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Keluar</span>
        </button>
      </nav>

      {/* Bottom Card */}
      <div className="p-3 mt-auto">
        <div className="pt-3 border-t border-[#E5E7EB]">
          <div className="bg-[#EEF0FF] rounded-xl p-3 border border-indigo-100/50">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F172A] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block animate-pulse" />
              <span>Tim Siaga Respons Aktif</span>
            </div>
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors shadow-xs"
            >
              <Headphones className="w-4 h-4" />
              <span>Bantuan & Kendala</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex font-['Inter',sans-serif] text-[#0F172A] antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#F3F3FB] border-r border-[#E5E7EB] h-screen sticky top-0 overflow-y-auto shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
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
        <header className="bg-white border-b border-[#E5E7EB] h-16 flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-xl text-[#64748B] hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Location status */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-medium">
              <span>📍</span>
              <span className="font-semibold text-[#15803D]">Lokasi:</span>
            </div>
            <span className="text-xs font-bold text-[#0F172A]">Kwitang</span>
            <span className="text-xs text-[#CBD5E1]">/</span>
            <span className="text-xs text-[#64748B] hidden sm:inline">Jakarta Pusat</span>
            <span className="ml-1 sm:ml-2 text-[11px] font-semibold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full whitespace-nowrap">
              ● Siaga Terima Pangan
            </span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bell Icon */}
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="relative w-9 h-9 rounded-full bg-[#EEF0FF] flex items-center justify-center hover:bg-indigo-100 transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 text-[#4F46E5]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F59E0B] ring-2 ring-white" />
            </button>

            <div className="w-px h-6 bg-[#E5E7EB]" />

            {/* Profile info */}
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">
                {accountData.picName}
              </div>
              <div className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                Koordinator Penyaluran
              </div>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#0B3D2E] flex items-center justify-center text-white text-xs font-bold shadow-xs">
              <User className="w-4 h-4 text-white" />
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

      {/* Chat Tim Siaga / Live Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#E5E7EB] flex flex-col h-[520px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 bg-[#15803D] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Tim Siaga FoodRescue</h3>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" /> Online • Siap Koordinasi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F8FD]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#15803D] text-white rounded-br-none'
                        : 'bg-white text-[#0F172A] border border-[#E5E7EB] shadow-xs rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#94A3B8] mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-[#E5E7EB] flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ketik kendala atau pertanyaan..."
                className="flex-1 bg-[#F0F2FA] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hotline Modal */}
      {isHotlineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-[#E5E7EB] p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Hotline Darurat Logistik</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Layanan panggilan langsung untuk hambatan penjemputan kritis armada posko.
              </p>
            </div>
            <div className="bg-[#F0F2FA] rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                Nomor Siaga Bebas Pulsa
              </div>
              <div className="text-xl font-extrabold text-[#15803D] font-mono mt-0.5">
                0800-1-RESCUE
              </div>
              <div className="text-[11px] text-gray-500 mt-1">(0800-1-737283)</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsHotlineModalOpen(false)}
                className="flex-1 bg-[#F0F2FA] hover:bg-slate-200 text-[#0F172A] font-semibold text-xs py-2.5 rounded-xl transition-colors"
              >
                Tutup
              </button>
              <a
                href="tel:08001737283"
                className="flex-1 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Panggil
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PengelolaLayout() {
  return (
    <PengelolaProvider>
      <LayoutInner />
    </PengelolaProvider>
  );
}
export default PengelolaLayout;

