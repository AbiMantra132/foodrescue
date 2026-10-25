import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import kitchenImg from '../../../assets/kitchen-sorting.jpg';
import truckImg from '../../../assets/logistics-truck.jpg';
import facilityImg from '../../../assets/facility-showcase.jpg';

export function Hero() {
  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Center Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F3EA] text-[#007E68] text-[11px] font-extrabold tracking-wider uppercase mb-5 select-none shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-POWERED WASTE MATCHING</span>
        </div>

        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-[#111111] tracking-tight leading-[1.15] mb-5">
          Kurangi limbah, <br className="hidden sm:inline" />
          <span className="text-[#007E68]">kelola lebih cerdas.</span>
        </h1>

        <p className="font-['Inter',sans-serif] text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-8">
          FoodRescue menghubungkan sumber limbah makanan dari restoran, UMKM, dan industri kuliner dengan fasilitas pengelolaan kompos dan biogas terdekat secara otomatis via AI matching.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/register?role=penyedia"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] shadow-md hover:shadow-lg transition-all duration-200 text-center"
          >
            Daftar sebagai Penyedia
          </Link>
          <Link
            to="/register?role=pengelola"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#EAF6EF] text-[#007E68] border-1.5 border-[#007E68] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-[15px] transition-all duration-200 text-center shadow-xs"
          >
            Daftar sebagai Pengelola
          </Link>
        </div>
      </div>

      {/* Visual Showcase: 3 Rounded Photos + Smartphone Mockup with Map */}
      <div className="relative mt-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Photo 1: Kitchen Sorting */}
          <div className="md:col-span-3 rounded-2xl md:rounded-[22px] overflow-hidden shadow-lg border border-gray-100 group relative aspect-[4/3] md:aspect-[3/4]">
            <img
              src={kitchenImg}
              alt="Dapur restoran profesional menyortir sisa makanan"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold">01. Sumber Limbah Restoran</span>
            </div>
          </div>

          {/* Center Smartphone Mockup */}
          <div className="md:col-span-6 flex justify-center py-2 z-10">
            <div className="w-full max-w-[320px] rounded-[36px] bg-[#111111] p-3 shadow-2xl border-4 border-gray-800">
              <div className="rounded-[28px] overflow-hidden bg-[#F8F9FA] relative border border-gray-200">
                {/* Phone Header */}
                <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <MapPin className="w-3.5 h-3.5 text-[#007E68]" />
                    <span>Fasilitas terdekat</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E3F3EA] text-[#007E68] font-bold">
                    GPS Aktif
                  </span>
                </div>

                {/* Stylized Vector Map */}
                <div className="h-64 bg-[#E8F1EC] relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 300 260" fill="none">
                    {/* Blocks */}
                    <rect x="20" y="20" width="80" height="60" rx="10" fill="#D5E4DC" />
                    <rect x="120" y="15" width="90" height="75" rx="10" fill="#DBE8E1" />
                    <rect x="230" y="25" width="60" height="80" rx="10" fill="#D5E4DC" />
                    <rect x="30" y="110" width="100" height="70" rx="10" fill="#DBE8E1" />
                    <rect x="150" y="120" width="120" height="65" rx="10" fill="#D5E4DC" />
                    <rect x="40" y="200" width="120" height="50" rx="10" fill="#DBE8E1" />
                    <rect x="180" y="200" width="100" height="50" rx="10" fill="#D5E4DC" />

                    {/* Water / Green Belt */}
                    <path d="M0 80 Q 90 95, 140 140 T 300 130" stroke="#BFE0E2" strokeWidth="14" fill="none" />

                    {/* Roads */}
                    <path d="M0 100 H300 M140 0 V260 M220 0 V260" stroke="#FFFFFF" strokeWidth="6" />

                    {/* Connection route */}
                    <path d="M70 140 L140 100 L220 160" stroke="#007E68" strokeWidth="3" strokeDasharray="5 5" />

                    {/* Restaurant Origin Marker */}
                    <circle cx="70" cy="140" r="10" fill="#111111" />
                    <circle cx="70" cy="140" r="4" fill="#FFFFFF" />

                    {/* Facility Destination Pin */}
                    <circle cx="220" cy="160" r="12" fill="#007E68" />
                    <circle cx="220" cy="160" r="5" fill="#FFFFFF" />
                  </svg>

                  {/* Mockup Floating Card: BEST MATCH */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-emerald-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-[#007E68] tracking-wider uppercase">
                        BEST MATCH • 2.4 KM
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-[#E3F3EA] px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-[#007E68]" /> 98% Match
                      </span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#111111]">
                      Pengelola Kompos Hijau
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      Kapasitas kosong: 1.2 Ton/hari • Pickup 16:30
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo 2 & 3: Logistics & Waste Processing Facility */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group relative aspect-[4/2.6]">
              <img
                src={truckImg}
                alt="Truk logistik limbah ramah lingkungan"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-semibold">02. Logistik Limbah Terjadwal</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group relative aspect-[4/2.6]">
              <img
                src={facilityImg}
                alt="Fasilitas pengolahan limbah organik dan kompos"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-semibold">03. Fasilitas Kompos & Biogas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
