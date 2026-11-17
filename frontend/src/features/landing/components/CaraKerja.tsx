import React from 'react';
import { ClipboardList, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Daftarkan Donasi',
    desc: 'Restoran memasukkan rincian porsi, foto, dan batas waktu konsumsi yang aman.',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'Kurasi Higienitas',
    desc: 'Pemeriksaan suhu simpan dan standar segel kemasan oleh kurator sistem.',
  },
  {
    num: '03',
    icon: HeartHandshake,
    title: 'Klaim Pengelola',
    desc: 'Panti asuhan atau dapur umum terverifikasi mengonfirmasi kuota yang dibutuhkan.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Penjemputan & Distribusi',
    desc: 'Serah terima higienis dengan QR code dan segera dibagikan sebelum batas waktu.',
  },
];

export function CaraKerja() {
  return (
    <section id="cara-kerja" className="py-20 border-t border-b border-[#E5E7EB] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Center-Aligned */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider text-[#15803D] uppercase mb-2">
            ALUR RINGKAS &amp; TRANSPARAN
          </div>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mb-3">
            Cara Kerja FoodRescue
          </h2>
          <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#64748B]">
            Proses penyaluran terpercaya langsung dari penyedia makanan ke komunitas penerima.
          </p>
        </div>

        {/* Grid 4 Card Sejajar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col items-start"
              >
                {/* Nomor besar abu sangat muda font mono */}
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-200 mb-4 select-none">
                  {step.num}
                </div>

                {/* Ikon dalam kotak hijau muda */}
                <div className="w-11 h-11 rounded-xl bg-[#ECFDF3] border border-[#DCFCE7] flex items-center justify-center text-[#15803D] mb-5 shrink-0">
                  <IconComponent className="w-5 h-5 text-[#15803D] stroke-[2.2]" />
                </div>

                {/* Judul Bold */}
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#0F172A] mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Deskripsi Abu-abu */}
                <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CaraKerja;

