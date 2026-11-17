import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Kiri: Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="FoodRescue Beranda">
          <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[17px] text-[#0F172A] tracking-tight leading-tight">
              FoodRescue
            </span>
            <span className="text-[9px] font-bold text-[#15803D] tracking-[0.16em] uppercase leading-tight mt-0.5">
              PENYELAMAT PANGAN
            </span>
          </div>
        </Link>

        {/* Tengah: Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-bold text-[#0F172A] hover:text-[#15803D] transition-colors"
          >
            Beranda
          </a>
          <a
            href="#katalog"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Katalog
          </a>
          <a
            href="#cara-kerja"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Cara Kerja
          </a>
          <a
            href="#higienitas"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Higienitas
          </a>
          <a
            href="#tentang-kami"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Tentang Kami
          </a>
        </nav>

        {/* Kanan: Masuk & Tombol Donasikan Makanan */}
        <div className="hidden sm:flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#0F172A] hover:text-[#15803D] transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register?role=penyedia"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm shadow-xs transition-all duration-150"
          >
            <span>Daftar Akun</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/register?role=penyedia"
            className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#15803D] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs"
          >
            <span>Daftar</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2.5">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-bold text-[#0F172A] bg-slate-50"
            >
              Beranda
            </a>
            <a
              href="#katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
            >
              Katalog
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
            >
              Cara Kerja
            </a>
            <a
              href="#higienitas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
            >
              Higienitas
            </a>
            <a
              href="#tentang-kami"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
            >
              Tentang Kami
            </a>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#0F172A]"
            >
              Masuk
            </Link>
            <Link
              to="/register?role=penyedia"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#15803D] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-xs"
            >
              <span>Daftar Akun</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
