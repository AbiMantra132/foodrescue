import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Store, ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Glow gradient hijau lembut di pojok kanan atas latar */}
      <div 
        className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-emerald-100/50 blur-3xl -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Teks & Statistik */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badge pill hijau muda dengan ikon sprout kecil */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF3] border border-[#DCFCE7] text-[#15803D] text-xs font-semibold w-fit mb-6 shadow-2xs">
              <Sprout className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
              <span>Gerakan Penyelamatan Makanan</span>
            </div>

            {/* H1 besar 2 baris */}
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] tracking-tight text-[#0F172A] mb-5">
              Selamatkan Makanan,<br />
              <span className="text-[#15803D]">Bagikan Kebaikan.</span>
            </h1>

            {/* Paragraf deskripsi */}
            <p className="font-['Inter',sans-serif] text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mb-8">
              Menghubungkan restoran, katering, dan toko pangan dengan pengelola terpercaya untuk mendistribusikan makanan berlebih yang masih prima.
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#katalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-sm hover:shadow transition-all duration-150"
              >
                <span>Eksplorasi Katalog Makanan</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <Link
                to="/register?role=penyedia"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E5E7EB] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-2xs transition-all duration-150"
              >
                <Store className="w-4 h-4 text-[#64748B]" />
                <span>Jadi Mitra Donatur</span>
              </Link>
            </div>

            {/* Garis pemisah tipis */}
            <div className="w-full border-t border-[#E5E7EB] pt-8">
              {/* 2 statistik berdampingan */}
              <div className="grid grid-cols-2 gap-8 max-w-md">
                {/* Stat 1 */}
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight flex items-baseline">
                    84<span className="text-[#15803D] ml-0.5">+</span>
                  </div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#0F172A] mt-1">
                    Mitra Penyedia
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 leading-snug">
                    Restoran, Hotel &amp; Katering Aktif
                  </div>
                </div>

                {/* Stat 2 */}
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                    38
                  </div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#0F172A] mt-1">
                    Lembaga Pengelola
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 leading-snug">
                    Penyalur Resmi &amp; Terverifikasi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Foto Portrait & Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-[420px] mx-auto lg:ml-auto">
              
              {/* Foto portrait tinggi rounded-3xl */}
              <div className="relative rounded-[28px] overflow-hidden border border-slate-900/10 shadow-2xl aspect-[3/4] bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
                  alt="Suasana toko roti artisan dengan pekerja bakery dan aneka roti segar di meja kayu"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient gelap di bagian bawah foto dengan badge & teks putih */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex flex-col justify-end p-6 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-300 text-[10px] font-semibold w-fit mb-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Update Real-time</span>
                  </div>
                  <p className="text-xs text-white/95 font-medium leading-relaxed">
                    Donasi roti segar dari 12 mitra bakery langsung hari ini.
                  </p>
                </div>
              </div>

              {/* Floating card putih rounded-2xl menempel di kiri bawah foto (menimpa tepi foto) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#E5E7EB] max-w-[280px] sm:max-w-[310px] z-20 flex items-start gap-3.5 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-[#ECFDF3] border border-[#DCFCE7] flex items-center justify-center text-[#15803D] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#15803D] stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#0F172A] leading-snug">
                    100% Lolos Uji Higienitas
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-snug mt-1">
                    Suhu &amp; segel kemasan terkurasi ketat sebelum didistribusikan
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
