import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ArrowRight, Leaf, TrendingUp } from 'lucide-react';
import { PENYEDIA_STEPS } from '../data/landingData.js';
import kitchenImg from '../../../assets/kitchen-sorting.jpg';

export function ForProviders() {
  return (
    <section id="untuk-penyedia" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Kolom Kiri: Informasi & Langkah */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F3EA] text-[#007E68] text-[11px] font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
              <Store className="w-3.5 h-3.5" />
              <span>UNTUK PENYEDIA</span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-4xl text-[#111111] tracking-tight leading-tight mb-6">
              Ubah limbah jadi nilai, bukan beban
            </h2>

            {/* List 01/02/03 */}
            <div className="space-y-5 mb-8">
              {PENYEDIA_STEPS.map((step) => (
                <div key={step.num} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F8F9FA] hover:bg-[#EAF6EF]/60 transition-colors duration-200 border border-gray-100 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#007E68] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#111111] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/register?role=penyedia"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Daftarkan limbah pertama Anda</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Kolom Kanan: Foto Dapur Restoran & Floating Card */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-2xl md:rounded-[28px] overflow-hidden shadow-xl border-4 border-gray-100/80 group aspect-[4/3.8]">
              <img
                src={kitchenImg}
                alt="Staff restoran menyortir sisa makanan ke wadah terpisah"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Card: 4.8 ton limbah terkelola bulan ini */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#E3F3EA] flex items-center justify-center text-[#007E68]">
                    <Leaf className="w-5 h-5 fill-[#007E68]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#007E68] tracking-wider uppercase block">
                      IMPAK PENYEDIA AKTIF
                    </span>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#111111]">
                      Artisan Bakery & Resto
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-[#6B7280]">Total Terkelola:</span>
                  <div className="flex items-center gap-1 font-bold text-[#007E68] text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>4.8 ton limbah terkelola bulan ini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForProviders;
