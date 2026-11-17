import React from 'react';
import { Leaf, Building2, Store, Flame } from 'lucide-react';

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Big Stat */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold uppercase tracking-wider mb-6">
          <Leaf className="w-4 h-4 fill-[#007E68]" />
          <span>DAMPAK KUMULATIF CIRCULAR ECONOMY</span>
        </div>

        <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-5xl sm:text-7xl lg:text-8xl text-[#007E68] tracking-tight leading-none mb-4">
          18,420 TONS
        </div>

        <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl sm:text-3xl text-[#111111] mb-4">
          Limbah organik berhasil dialihkan dari TPA
        </h3>

        <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto mb-16 leading-relaxed">
          Melalui jaringan AI Matching cerdas, surplus makanan diolah secara produktif menjadi pupuk kompos bio-organik dan energi biogas bersih terbarukan.
        </p>

        {/* 3 Secondary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] mb-1">
              850+
            </div>
            <div className="text-xs sm:text-sm text-[#6B7280]">
              Fasilitas Pengolah Terhubung
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center mx-auto mb-3">
              <Store className="w-5 h-5" />
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] mb-1">
              1,420+
            </div>
            <div className="text-xs sm:text-sm text-[#6B7280]">
              Restoran & UMKM Aktif
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center mx-auto mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] mb-1">
              42.8k
            </div>
            <div className="text-xs sm:text-sm text-[#6B7280]">
              Ton CO₂e Emisi Dicegah
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
