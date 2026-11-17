import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Leaf } from 'lucide-react';

export function KomitmenHigienitas() {
  return (
    <section id="higienitas" className="py-16 sm:py-20 bg-[#FAFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container Rounded-3xl Gradient Gelap */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#0B2A1F] to-[#06140E] text-white shadow-2xl relative overflow-hidden border border-emerald-950/40">
          
          {/* Subtle Ambient Glow Effect */}
          <div 
            className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Kolom Kiri: Informasi Higienitas & 3 Kotak */}
            <div className="lg:col-span-7">
              {/* Badge outline tipis */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standar Keamanan Pangan</span>
              </div>

              {/* H2 Putih */}
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
                Komitmen Higienitas Tanpa Kompromi
              </h2>

              {/* Paragraf Putih Transparan */}
              <p className="font-['Inter',sans-serif] text-emerald-100/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Setiap makanan berlebih disalurkan dengan protokol ketat: suhu panas &gt;60°C atau dingin &lt;5°C, kemasan tertutup steril, dan batas edar maksimal 4 jam.
              </p>

              {/* 3 Kotak Kecil Transparan Border Tipis Berjajar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Kotak 1 */}
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-emerald-400 mb-1 block">
                    Suhu Aman
                  </span>
                  <span className="text-[11px] text-slate-300/80 leading-snug block">
                    Monitoring ketat saat pengambilan
                  </span>
                </div>

                {/* Kotak 2 */}
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-emerald-400 mb-1 block">
                    Segel Bersih
                  </span>
                  <span className="text-[11px] text-slate-300/80 leading-snug block">
                    Food-grade dan bebas kontaminasi
                  </span>
                </div>

                {/* Kotak 3 */}
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-emerald-400 mb-1 block">
                    Cepat Saji
                  </span>
                  <span className="text-[11px] text-slate-300/80 leading-snug block">
                    Rute distribusi instan terjadwal
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Card Glass */}
            <div className="lg:col-span-5">
              <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col">
                {/* Ikon hijau di kotak rounded */}
                <div className="w-12 h-12 rounded-xl bg-[#15803D] flex items-center justify-center text-white mb-5 shadow-sm">
                  <Leaf className="w-6 h-6 text-white stroke-[2.2]" />
                </div>

                {/* Judul putih bold */}
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-white mb-3 leading-snug">
                  Punya Surplus Pangan Hari Ini?
                </h3>

                {/* Teks Deskripsi */}
                <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Bergabunglah sebagai mitra restoran, hotel, atau katering. Kurangi limbah dan bantu masyarakat secara nyata.
                </p>

                {/* Tombol hijau terang full-width */}
                <Link
                  to="/register?role=penyedia"
                  className="w-full bg-[#15803D] hover:bg-[#166534] text-white py-3.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-md transition-all text-center block"
                >
                  Daftar Jadi Mitra Donatur
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default KomitmenHigienitas;

