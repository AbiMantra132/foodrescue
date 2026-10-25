import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Store,
  Factory,
  LayoutGrid,
  PlusCircle,
  Settings,
  Package,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

export function DashboardSidebar({
  activeRole,
  activeNav,
  setActiveNav,
  onSelectRole
}) {
  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col justify-between shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen z-30">
      <div>
        {/* Logo FoodRescue + sub-label Sistem Operasional */}
        <div className="p-5 border-b border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="FoodRescue Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E3F3EA] flex items-center justify-center text-[#007E68] transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 fill-[#007E68]" />
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#111111] tracking-tight leading-none block">
                Food<span className="text-[#007E68]">Rescue</span>
              </span>
              <span className="text-[10px] text-[#6B7280] font-medium tracking-wide">
                Sistem Operasional
              </span>
            </div>
          </Link>

          {/* Segmented Switcher Role */}
          <div className="mt-3.5 bg-[#F5F5F4] p-1 rounded-xl flex items-center text-xs font-bold border border-gray-200">
            <button
              type="button"
              onClick={() => onSelectRole('penyedia')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRole === 'penyedia'
                  ? 'bg-[#007E68] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Penyedia</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectRole('pengelola')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeRole === 'pengelola'
                  ? 'bg-[#007E68] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>Pengelola</span>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          {activeRole === 'penyedia' ? (
            /* Menu PENYEDIA */
            <>
              <button
                type="button"
                onClick={() => setActiveNav('Ringkasan')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Ringkasan'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Ringkasan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('Tambah Makanan')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Tambah Makanan'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tambah Makanan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('Pengaturan')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Pengaturan'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan</span>
              </button>
            </>
          ) : (
            /* Menu PENGELOLA */
            <>
              <button
                type="button"
                onClick={() => setActiveNav('Limbah Tersedia')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Limbah Tersedia'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Limbah Tersedia</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeNav === 'Limbah Tersedia'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E3F3EA] text-[#007E68]'
                  }`}
                >
                  4 Baru
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('Rekomendasi AI')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Rekomendasi AI'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Rekomendasi AI</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('Penghargaan')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Penghargaan'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Penghargaan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav('Pengaturan')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                  activeNav === 'Pengaturan'
                    ? 'bg-[#007E68] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#EAF6EF] hover:text-[#007E68]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Pengaturan</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Card profil di bawah sidebar */}
      <div className="p-4 border-t border-gray-100 m-3 rounded-2xl bg-[#EAF6EF]/50 border border-[#E5E7EB] shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E3F3EA] text-[#007E68] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-300">
            {activeRole === 'penyedia' ? 'TP' : 'JM'}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#111111] truncate flex items-center gap-1">
              <span>{activeRole === 'penyedia' ? 'Toko Roti Prima' : 'Jamie Morgan'}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#007E68] shrink-0" />
            </div>
            <div className="text-[10px] text-[#6B7280] truncate">
              {activeRole === 'penyedia' ? 'Penyedia Surplus' : 'Fasilitas Pengolahan Hijau'}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
