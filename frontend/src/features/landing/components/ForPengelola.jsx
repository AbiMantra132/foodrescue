import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, ArrowRight, ShieldCheck } from 'lucide-react';
import { PENGELOLA_STEPS } from '../data/landingData.js';
import facilityImg from '../../../assets/facility-showcase.jpg';

export function ForPengelola() {
  return (
    <section id="untuk-pengelola" className="py-16 md:py-24 bg-[#EAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Kolom Kiri: Foto Fasilitas Pengolahan Limbah Modern */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl md:rounded-[28px] overflow-hidden shadow-xl border-4 border-white/80 group aspect-[4/3.8]">
              <img
                src={facilityImg}
                alt="Fasilitas pengolahan limbah organik modern FoodRescue"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-[#0B3D2E]">
                <ShieldCheck className="w-4 h-4 text-[#007E68]" />
                <span>Zero-Landfill Processing Standard</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Informasi & Langkah */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F3EA] text-[#007E68] text-[11px] font-extrabold tracking-wider uppercase mb-4 shadow-2xs">
              <Factory className="w-3.5 h-3.5" />
              <span>UNTUK PENGELOLA</span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-4xl text-[#111111] tracking-tight leading-tight mb-6">
              Temukan sumber limbah yang sesuai kapasitas Anda
            </h2>

            {/* List 01/02/03 */}
            <div className="space-y-5 mb-8">
              {PENGELOLA_STEPS.map((step) => (
                <div key={step.num} className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/60 hover:bg-white transition-colors duration-200 border border-white/80 shadow-2xs">
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
              to="/register?role=pengelola"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Cari penyedia terdekat</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForPengelola;
