import React, { useState, useMemo } from 'react';
import { Clock, Store, Search, ArrowRight } from 'lucide-react';

const CATALOG_ITEMS = [
  {
    id: 'roti-artisan',
    title: 'Roti Artisan Aneka Rasa',
    vendor: 'Toko Roti Melati • Menteng',
    categoryChip: 'Roti & Kue',
    categoryFilter: 'Roti & Kue',
    countdown: 'Sisa 03j 15m',
    countdownColor: 'orange', // amber
    specLabel: 'Estimasi Porsi',
    specValue: '~45 Orang',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
  {
    id: 'nasi-kotak',
    title: 'Nasi Kotak Ayam Lengkuas',
    vendor: 'Catering Berkah Utama • Tebet',
    categoryChip: 'Siap Saji',
    categoryFilter: 'Makanan Siap Saji',
    countdown: 'Sisa 01j 45m',
    countdownColor: 'red', // rose
    specLabel: 'Kuantitas',
    specValue: '28 Porsi Siap Makan',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
  {
    id: 'paket-sayur',
    title: 'Paket Sayur Hijau Segar',
    vendor: 'Supermarket Sehat • Kuningan',
    categoryChip: 'Buah & Sayur',
    categoryFilter: 'Buah & Sayur',
    countdown: 'Sisa 06j 00m',
    countdownColor: 'green', // emerald
    specLabel: 'Total Berat',
    specValue: '22 kg Bersih',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
  {
    id: 'nasi-kebuli',
    title: 'Nasi Kebuli Rempah',
    vendor: 'Dapur Barokah Resto • Cikini',
    categoryChip: 'Siap Saji',
    categoryFilter: 'Makanan Siap Saji',
    countdown: 'Sisa 02j 30m',
    countdownColor: 'orange', // amber
    specLabel: 'Estimasi Porsi',
    specValue: '~50 Porsi Hangat',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
];

export function Katalog() {
  const [activeTab, setActiveTab] = useState('Semua Donasi'); // 'Semua Donasi' | 'Tersedia Saja'
  const [selectedPill, setSelectedPill] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filterPills = [
    'Semua',
    'Makanan Siap Saji',
    'Roti & Kue',
    'Buah & Sayur',
  ];

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      // Filter kategori pill
      if (selectedPill !== 'Semua' && item.categoryFilter !== selectedPill) {
        return false;
      }
      // Filter toggle ketersediaan
      if (activeTab === 'Tersedia Saja' && !item.available) {
        return false;
      }
      // Filter teks pencarian (nama makanan atau nama penyedia)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchVendor = item.vendor.toLowerCase().includes(query);
        if (!matchTitle && !matchVendor) {
          return false;
        }
      }
      return true;
    });
  }, [selectedPill, activeTab, searchQuery]);

  return (
    <section id="katalog" className="pt-16 pb-20 border-t border-[#E5E7EB] bg-[#FAFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section: Judul & Segmented Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold tracking-wider text-[#15803D] uppercase mb-1.5">
              KATALOG PILIHAN HARI INI
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mb-2">
              Makanan Segar Siap Jemput
            </h2>
            <p className="font-['Inter',sans-serif] text-sm sm:text-base text-[#64748B]">
              Pilih donasi makanan terverifikasi siap distribusi sebelum tenggat waktu berakhir.
            </p>
          </div>

          {/* Segmented Toggle Kanan */}
          <div className="bg-slate-100 p-1 rounded-xl inline-flex items-center text-xs font-semibold self-start md:self-auto shrink-0 border border-slate-200/50">
            <button
              type="button"
              onClick={() => setActiveTab('Semua Donasi')}
              className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 ${
                activeTab === 'Semua Donasi'
                  ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Semua Donasi
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Tersedia Saja')}
              className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 ${
                activeTab === 'Tersedia Saja'
                  ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tersedia Saja
            </button>
          </div>
        </div>

        {/* Filter Bar (Card putih border tipis, rounded-2xl) */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-2.5 sm:p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          {/* Pills Kategori */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterPills.map((pill) => {
              const isActive = selectedPill === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setSelectedPill(pill)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[#15803D] text-white shadow-2xs font-bold'
                      : 'bg-white border border-[#E5E7EB] hover:border-slate-300 text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Input Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari makanan atau penyedia..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E5E7EB] bg-slate-50/50 hover:bg-white focus:bg-white text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
            />
          </div>
        </div>

        {/* Grid 4 Kolom Card */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E5E7EB] p-8">
            <p className="text-sm font-semibold text-[#0F172A] mb-1">
              Tidak ada makanan yang cocok
            </p>
            <p className="text-xs text-[#64748B]">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori di atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-3 sm:p-3.5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Atas Rounded dengan Chips */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-3 bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Chip Kategori Putih di Kiri Atas */}
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-[#0F172A] text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                      {item.categoryChip}
                    </div>

                    {/* Chip Countdown Berwarna di Kanan Atas */}
                    <div
                      className={`absolute top-2.5 right-2.5 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs backdrop-blur-xs ${
                        item.countdownColor === 'red'
                          ? 'bg-rose-500/90'
                          : item.countdownColor === 'green'
                          ? 'bg-[#15803D]/90'
                          : 'bg-amber-500/90'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.countdown}</span>
                    </div>
                  </div>

                  {/* Judul Makanan */}
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0F172A] tracking-tight mb-1 truncate">
                    {item.title}
                  </h3>

                  {/* Ikon Toko & Nama Penyedia */}
                  <div className="text-xs text-[#64748B] flex items-center gap-1.5 mb-3 truncate">
                    <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.vendor}</span>
                  </div>

                  {/* Kotak Abu Muda (Label Abu Kecil di Kiri, Nilai Bold Hijau di Kanan) */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 flex items-center justify-between text-xs mb-3">
                    <span className="text-[11px] text-[#64748B]">
                      {item.specLabel}
                    </span>
                    <span className="text-xs font-bold text-[#15803D]">
                      {item.specValue}
                    </span>
                  </div>
                </div>

                {/* Tombol Navy Gelap Full-Width */}
                <button
                  type="button"
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-2.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors mt-1"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Katalog;

