import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Asterisk } from 'lucide-react';

export function Footer() {
  const platformLinks = [
    'Tentang Kami',
    'Katalog Makanan',
    'Alur Penyedian',
    'Standar Higienitas & Keamanan',
    'Laporan Dampak Lingkungan',
    'Peta Sebaran Mitra',
  ];

  const kemitraanLinks = [
    'Donatur Restoran & Hotel',
    'Katering & Ritel Makanan',
    'Relawan Logistik & Penjemput',
    'Panti Asuhan & Komunitas Penerima',
    'Program CSR Perusahaan',
  ];

  return (
    <footer id="tentang-kami" className="bg-white border-t border-[#E5E7EB] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4 Kolom Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">

          {/* Kolom 1: Brand & Hotline */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer inline-flex" aria-label="FoodRescue Beranda">
              <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center text-white shrink-0 shadow-xs">
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

            <p className="font-['Inter',sans-serif] text-xs text-[#64748B] leading-relaxed mt-4 mb-5 max-w-sm">
              Sistem terintegrasi logistik pangan berlebih komersial di Indonesia. Menghubungkan surplus sektor perhotelan, resto, dan katering ke jaringan komunitas penerima terverifikasi secara aman dan higienis.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF3] border border-[#DCFCE7] text-xs font-semibold text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
              <span>Hotline Siaga: 0800-1-RESCUE (Bebas Pulsa – Siap Jemput Logistik)</span>
            </div>
          </div>

          {/* Kolom 2: PLATFORM */}
          <div className="lg:col-span-2">
            <div className="text-xs font-bold tracking-wider text-[#15803D] uppercase flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span>
              <span>PLATFORM</span>
            </div>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#katalog"
                    className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: KEMITRAAN */}
          <div className="lg:col-span-3">
            <div className="text-xs font-bold tracking-wider text-[#15803D] uppercase flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span>
              <span>KEMITRAAN</span>
            </div>
            <ul className="space-y-2.5">
              {kemitraanLinks.map((link) => (
                <li key={link}>
                  <Link
                    to="/register?role=penyedia"
                    className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Card LAYANAN DARURAT */}
          <div className="lg:col-span-3">
            <div className="bg-slate-50/70 border border-[#E5E7EB] rounded-2xl p-5 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Asterisk className="w-4 h-4 text-[#15803D] stroke-[2.5]" />
                  <span>LAYANAN DARURAT</span>
                </div>
                <p className="font-['Inter',sans-serif] text-xs text-[#64748B] leading-relaxed mb-4">
                  Tersedia armada penjemputan cepat untuk surplus berlebih (&gt;100 porsi) di Jabodetabek dengan penanganan rantai dingin.
                </p>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  EMAIL RESPONS CEPAT
                </div>
                <a
                  href="mailto:rescue@foodrescue.id"
                  className="font-['Inter',sans-serif] text-sm font-bold text-[#15803D] hover:underline mb-4 block"
                >
                  rescue@foodrescue.id
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-[#64748B]">
                <span>Waktu Tanggap:</span>
                <span className="font-bold text-[#0F172A]">&lt; 45 Menit (07:00 - 23:00 WIB)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Baris Bawah */}
        <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            © 2025 FoodRescue Indonesia. Sistem Logistik Surplus Pangan Terintegrasi.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#0F172A] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#terms" className="hover:text-[#0F172A] transition-colors">
              Syarat &amp; Ketentuan
            </a>
            <a href="#standards" className="hover:text-[#0F172A] transition-colors">
              Panduan Higienitas
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
