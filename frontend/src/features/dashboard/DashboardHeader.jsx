import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search, Bell, User } from 'lucide-react';

export function DashboardHeader({
  activeRole,
  activeNav,
  setActiveNav,
  onToggleRole,
  searchQuery,
  setSearchQuery,
  showToast
}) {
  return (
    <header className="bg-white border-b border-[#E5E7EB] px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Logo / Trigger */}
        <div className="block md:hidden">
          <Link
            to="/"
            className="w-8 h-8 rounded-lg bg-[#E3F3EA] flex items-center justify-center text-[#007E68]"
            aria-label="Home"
          >
            <Leaf className="w-4 h-4 fill-[#007E68]" />
          </Link>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full max-w-lg">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search surplus produce, organics, pickups..."
            className="w-full bg-[#F5F5F4] text-xs sm:text-sm text-[#111111] rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
          />
        </div>
      </div>

      {/* Nav Mobile Selectors */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto mr-2">
        {activeRole === 'penyedia' ? (
          <>
            <button
              type="button"
              onClick={() => setActiveNav('Ringkasan')}
              className={`px-2 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                activeNav === 'Ringkasan' ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Ringkasan
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('Tambah Makanan')}
              className={`px-2 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                activeNav === 'Tambah Makanan' ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              + Tambah
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('Pengaturan')}
              className={`px-2 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                activeNav === 'Pengaturan' ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Pengaturan
            </button>
          </>
        ) : (
          <>
            {['Limbah Tersedia', 'Rekomendasi AI', 'Penghargaan', 'Pengaturan'].map((nav) => (
              <button
                key={nav}
                type="button"
                onClick={() => setActiveNav(nav)}
                className={`px-2 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                  activeNav === nav ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {nav === 'Limbah Tersedia' ? 'Limbah' : nav === 'Rekomendasi AI' ? 'AI' : nav}
              </button>
            ))}
          </>
        )}
        <button
          type="button"
          onClick={onToggleRole}
          className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#EAF6EF] text-[#007E68] whitespace-nowrap"
        >
          ⇄ {activeRole === 'penyedia' ? 'Pengelola' : 'Penyedia'}
        </button>
      </div>

      {/* Kanan Navbar: Ikon notifikasi + User avatar */}
      <div className="flex items-center gap-3 shrink-0">

        <button
          type="button"
          onClick={() => showToast('Notifikasi: 2 pasokan limbah makanan baru siap dijemput.')}
          aria-label="Notifikasi Baru"
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#007E68] hover:border-[#007E68] transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        <div className="w-9 h-9 rounded-full bg-[#007E68] text-white flex items-center justify-center shadow-xs font-bold text-xs">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
