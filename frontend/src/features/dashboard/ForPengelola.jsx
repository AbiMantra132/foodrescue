import React, { useState, useMemo } from 'react';
import {
  Package,
  RefreshCw,
  Truck,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Download,
  Recycle,
  Wallet,
  ShieldCheck,
  Scale,
  TrendingUp,
  Bot,
  ArrowUpRight,
  Trophy,
  CheckCircle,
  Info,
  Settings,
  Lock,
  CheckCircle2,
  Calendar,
  Flag,
  Timer,
  Store,
  Leaf,
  Navigation
} from 'lucide-react';
import facilityShowcase from '../../assets/facility-showcase.jpg';
import kitchenSorting from '../../assets/kitchen-sorting.jpg';

export function ForPengelola({
  activeNav,
  setActiveNav,
  showToast,
  setIsAiModalOpen,
  setAiChatInput,
  handleQuickQuestion
}) {
  // ==========================================
  // STATE: HALAMAN "LIMBAH TERSEDIA"
  // ==========================================
  const [selectedFilterLimbah, setSelectedFilterLimbah] = useState('Semua (4)');
  const [sortOptionLimbah, setSortOptionLimbah] = useState('Jarak Terdekat');

  const [limbahItems, setLimbahItems] = useState([
    {
      id: 'lmb-1',
      title: 'Sayuran & Buah Segar Pasar',
      weight: '240 kg',
      priceTag: 'Gratis',
      source: 'Pasar Segar Sejahtera',
      hub: 'Hub Sayur Kota',
      distance: '5 km',
      travelTime: '12 menit',
      pickupTime: 'Hari ini, 15:00 - 17:00',
      suitableFor: 'Kompos Cepat Urai, Pupuk Organik',
      condition: 'Kondisi bersih dalam peti kayu',
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',
      status: 'Tersedia',
    },
    {
      id: 'lmb-2',
      title: 'Sisa Roti Bersih & Bakery',
      weight: '95 kg',
      priceTag: 'Gratis',
      source: 'Toko Roti Prima',
      hub: 'Dapur Produksi',
      distance: '8 km',
      travelTime: '18 menit',
      pickupTime: 'Hari ini, 17:00 - 18:30',
      suitableFor: 'Biogas, Kompos Karbohidrat',
      condition: 'Kemas dalam karung bersih',
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
      status: 'Tersedia',
    },
    {
      id: 'lmb-3',
      title: 'Potongan Sayur & Daun Hijau Segar',
      weight: '180 kg',
      priceTag: 'Gratis',
      source: 'Dapur Katering Berkah',
      hub: 'Prep Kitchen',
      distance: '11 km',
      travelTime: '20 menit',
      pickupTime: 'Besok, 08:30 - 10:30',
      suitableFor: 'Kompos Organik Cepat',
      condition: 'Tersimpan dalam cool box higienis',
      image: kitchenSorting,
      status: 'Tersedia',
    },
    {
      id: 'lmb-4',
      title: 'Ampas Gandum Bersih / Spent Grain',
      weight: '150 kg',
      priceTag: 'Gratis',
      source: 'Pabrik Gandum & Roti Nusantara',
      hub: 'Silo Pengolahan',
      distance: '14 km',
      travelTime: '25 menit',
      pickupTime: 'Besok, 13:00 - 16:00',
      suitableFor: 'Biogas Industri, Kompos Padat',
      condition: 'Wadah karung disediakan tempat',
      image:
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80',
      status: 'Tersedia',
    },
  ]);

  const filteredLimbahItems = useMemo(() => {
    return limbahItems.filter((item) => {
      if (selectedFilterLimbah === 'Bisa Jemput Hari Ini') {
        return item.pickupTime.toLowerCase().includes('hari ini');
      }
      if (selectedFilterLimbah === 'Jarak Terdekat (<10 km)') {
        const distNum = parseFloat(item.distance);
        return distNum < 10;
      }
      if (selectedFilterLimbah === '100% Gratis') {
        return item.priceTag === 'Gratis';
      }
      return true;
    });
  }, [limbahItems, selectedFilterLimbah]);

  const handleTakeLimbah = (id, title) => {
    setLimbahItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Tersedia' ? 'Direservasi' : 'Tersedia';
          showToast(
            nextStatus === 'Direservasi'
              ? `Berhasil mereservasi ${title}! Jadwal jemput ditambahkan ke armada.`
              : `Reservasi ${title} telah dibatalkan.`
          );
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // ==========================================
  // STATE: HALAMAN "LENCANA & PENGHARGAAN"
  // ==========================================
  const [badgeFilter, setBadgeFilter] = useState('Semua (6)');

  const badgeList = [
    {
      id: 'bdg-1',
      title: 'First Pickup',
      status: 'Sudah Dapat',
      description: 'Berhasil memproses limbah pertama dari penyedia.',
      targetLabel: '1 Penjemputan',
      targetProgress: '1/1 Selesai',
      percentage: 100,
      icon: Flag,
      footerNote: '✓ Lencana aktif • Terverifikasi',
    },
    {
      id: 'bdg-2',
      title: 'Fast Responder',
      status: 'Sudah Dapat',
      description: 'Cepat tanggap! Ambil limbah dalam waktu kurang dari 2 jam setelah diinfokan.',
      targetLabel: '5x Ambil Cepat',
      targetProgress: '5/5 Kali',
      percentage: 100,
      icon: Timer,
      footerNote: '✓ Lencana aktif • Dapat info duluan',
    },
    {
      id: 'bdg-3',
      title: 'Reliable Processor',
      status: 'Sudah Dapat',
      description: 'Selalu tepat waktu saat jemput limbah 10 kali berturut-turut tanpa batal.',
      targetLabel: '10 Penjemputan Tepat Waktu',
      targetProgress: '10/10 Selesai',
      percentage: 100,
      icon: Calendar,
      footerNote: '✓ Lencana aktif • Akun terpercaya',
    },
    {
      id: 'bdg-4',
      title: 'Zero Waste Champion',
      status: 'Sudah Dapat',
      description:
        'Bawa wadah, ember, atau karung sendiri saat ambil limbah biar gak nambah sampah.',
      targetLabel: '15x Ambil Wadah Mandiri',
      targetProgress: '15/15 Kali',
      percentage: 100,
      icon: Recycle,
      footerNote: '✓ Lencana aktif • Ramah lingkungan',
    },
    {
      id: 'bdg-5',
      title: 'Capacity Hero',
      status: 'Sedang Dikerjakan',
      description: 'Sudah kumpulkan total 250 kg limbah untuk diproses fasilitasmu.',
      targetLabel: '190/250 kg',
      targetProgress: '76%',
      percentage: 76,
      icon: Scale,
      footerNote: '⏳ Kurang 60 kg lagi untuk dapat lencana ini',
    },
    {
      id: 'bdg-6',
      title: 'Clean Batch Guardian',
      status: 'Sedang Dikerjakan',
      description: 'Selalu cek dan pastikan limbah bersih serta aman sebelum diproses.',
      targetLabel: '5/8 Batch',
      targetProgress: '62%',
      percentage: 62,
      icon: ShieldCheck,
      footerNote: '⏳ Tinggal cek 3 kali jemputan lagi',
    },
  ];

  const filteredBadges = useMemo(() => {
    if (badgeFilter === 'Sudah Dapat (4)') {
      return badgeList.filter((b) => b.status === 'Sudah Dapat');
    }
    if (badgeFilter === 'Sedang Dikerjakan (2)') {
      return badgeList.filter((b) => b.status === 'Sedang Dikerjakan');
    }
    return badgeList;
  }, [badgeFilter]);

  // ==========================================
  // STATE: HALAMAN "AI INSIGHTS"
  // ==========================================
  const [insightsPeriod, setInsightsPeriod] = useState('30 Hari Terakhir');

  const upcomingOpportunities = [
    {
      id: 'opp-1',
      title: 'Potongan Daging & Tulang Sup Segar',
      suitableBadge: 'Cocok: Fasilitas Biogas & Kompos Protein',
      source: 'Grand Fresh Supermarket (6 km)',
      estimate: 'Est. 180 kg (Rawfood/Kaldu)',
      idealTime: 'Besok Pagi, 07:30 - 09:30',
      icon: Package,
    },
    {
      id: 'opp-2',
      title: 'Ampas Gandum & Roti Bersih',
      suitableBadge: 'Cocok: Fasilitas Kompos Organik',
      source: 'Artisan Crust Bakery (8 km)',
      estimate: 'Est. 450 kg (Bersih & Kering)',
      idealTime: 'Hari Ini, 16:00 - 18:30',
      icon: Store,
    },
    {
      id: 'opp-3',
      title: 'Sayuran & Buah Sortiran Segar',
      suitableBadge: 'Cocok: Fasilitas Kompos Cepat Urai',
      source: 'Pasar Induk Berkah (12 km)',
      estimate: 'Est. 650 kg (Segar & Utuh)',
      idealTime: 'Besok Siang, 11:00 - 14:00',
      icon: Leaf,
    },
  ];

  // ==========================================
  // STATE: HALAMAN "PENGATURAN AKUN"
  // ==========================================
  const [settingsPersonName, setSettingsPersonName] = useState('Jamie Morgan');
  const [settingsFacilityName, setSettingsFacilityName] = useState(
    'Fasilitas Pengolahan Hijau Jamie Morgan'
  );
  const [settingsPhone, setSettingsPhone] = useState('+62 812-3456-7890');
  const [settingsEmail, setSettingsEmail] = useState('jamie.morgan@example.com');
  const [settingsAddress, setSettingsAddress] = useState(
    'Kawasan Industri Daur Ulang Mandiri Blok B-12, Surabaya'
  );
  const [settingsNotes, setSettingsNotes] = useState(
    'Pintu timur loading dock armada, siap tampung pikap & truk 3 ton.'
  );

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* VIEW: LIMBAH TERSEDIA                                                     */}
      {/* ========================================================================= */}
      {activeNav === 'Limbah Tersedia' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                  Limbah Tersedia
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#007E68] animate-pulse" />
                  4 Limbah Siap Jemput
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Daftar limbah makanan surplus yang siap dijemput hari ini untuk diproses fasilitasmu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast('Data limbah surplus berhasil diperbarui!')}
              className="border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span> Perbarui Data</span>
            </button>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 pb-1 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111]">
                  Pilihan Limbah Surplus
                </span>
                <span className="bg-[#EAF6EF] text-[#007E68] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  4 Lokasi
                </span>
              </div>

              {/* Filter Pills */}
              {['Semua (4)', 'Bisa Jemput Hari Ini', 'Jarak Terdekat (<10 km)', '100% Gratis'].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedFilterLimbah(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${selectedFilterLimbah === tab
                        ? 'bg-[#007E68] text-white shadow-xs'
                        : 'bg-[#F5F5F4] text-[#6B7280] hover:bg-[#E3F3EA] hover:text-[#007E68]'
                      }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Dropdown urutkan */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-[#6B7280]">Urutkan:</span>
              <select
                value={sortOptionLimbah}
                onChange={(e) => setSortOptionLimbah(e.target.value)}
                className="bg-[#F5F5F4] text-xs font-semibold text-[#111111] px-3 py-1.5 rounded-full border-none focus:outline-none focus:ring-1 focus:ring-[#007E68] cursor-pointer"
              >
                <option value="Jarak Terdekat">Jarak Terdekat</option>
                <option value="Volume Terbesar">Volume Terbesar</option>
                <option value="Jadwal Paling Awal">Jadwal Paling Awal</option>
              </select>
            </div>
          </div>

          {/* MAIN CONTENT GRID: 4 CARD LIMBAH (KIRI) + SIDEBAR JADWAL & BANTUAN (KANAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LIST 4 CARD LIMBAH */}
            <div className="lg:col-span-8 space-y-4">
              {filteredLimbahItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#007E68]/40 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5"
                >
                  {/* Image Thumbnail with Overlay Badges */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Weight Badge (Kiri Atas) */}
                    <div className="absolute top-2.5 left-2.5 bg-black/80 text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      {item.weight}
                    </div>
                    {/* Gratis Badge (Kanan Atas) */}
                    <div className="absolute top-2.5 right-2.5 bg-[#E3F3EA] text-[#007E68] font-bold text-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                      {item.priceTag}
                    </div>
                  </div>

                  {/* Card Info & Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Sub-header Sumber & Hub */}
                      <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-1">
                        <span className="font-semibold text-[#111111]">{item.source}</span>
                        <span>•</span>
                        <span>{item.hub}</span>
                      </div>

                      {/* Judul Limbah */}
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#111111] leading-snug">
                        {item.title}
                      </h3>

                      {/* Meta Pills / Details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5 text-[#007E68]" />
                          <span>
                            {item.distance} ({item.travelTime})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#007E68]" />
                          <span>{item.pickupTime}</span>
                        </div>
                      </div>

                      {/* Info Kecocokan & Kondisi */}
                      <div className="mt-3 p-2.5 rounded-xl bg-[#EAF6EF]/60 border border-[#A7F3D0]/60 text-xs">
                        <div className="text-[#0B3D2E] font-medium">
                          <strong>Cocok untuk:</strong> {item.suitableFor}
                        </div>
                        <div className="text-[#6B7280] text-[11px] mt-0.5">
                          {item.condition}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-4 mt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() =>
                          showToast(`Rute navigasi ke ${item.source} dibuka di peta.`)
                        }
                        className="text-xs font-semibold text-[#007E68] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Lihat Rute</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTakeLimbah(item.id, item.title)}
                        className={`px-5 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${item.status === 'Direservasi'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                            : 'bg-[#007E68] text-white hover:bg-[#0B3D2E]'
                          }`}
                      >
                        <span>
                          {item.status === 'Direservasi' ? '✓ Direservasi' : 'Ambil Limbah'}
                        </span>
                        {item.status !== 'Direservasi' && (
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SIDEBAR JADWAL & BANTUAN ARMADA */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card Jadwal Jemput Armada */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#007E68]" />
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111]">
                      Jadwal Jemput Armada
                    </h3>
                  </div>
                  <span className="bg-[#E3F3EA] text-[#007E68] text-[11px] font-bold px-2 py-0.5 rounded-full">
                    2 Aktif
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {/* Item Jadwal 1 */}
                  <div className="py-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#007E68] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Hari ini, 15:30 WIB
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Driver Berangkat
                      </span>
                    </div>
                    <div>
                      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#111111]">
                        Sayuran Segar Pasar (240 kg)
                      </div>
                      <div className="text-[11px] text-[#6B7280]">Pasar Segar Sejahtera</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Menghubungi Pak Joko - Driver Pikap Armada 1')}
                      className="w-full mt-1 border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] text-xs font-bold py-2 rounded-full transition-colors cursor-pointer"
                    >
                      Hubungi Driver Armada
                    </button>
                  </div>

                  {/* Item Jadwal 2 */}
                  <div className="py-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#6B7280] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Hari ini, 17:15 WIB
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-full">
                        Menunggu Muat
                      </span>
                    </div>
                    <div>
                      <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm text-[#111111]">
                        Roti & Gandum (95 kg)
                      </div>
                      <div className="text-[11px] text-[#6B7280]">Northside Bakery Co.</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Menghubungi manajer gudang Northside Bakery')}
                      className="w-full mt-1 border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] text-xs font-bold py-2 rounded-full transition-colors cursor-pointer"
                    >
                      Hubungi Kontak Pengirim
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <button
                    type="button"
                    onClick={() => showToast('Membuka arsip riwayat seluruh pengambilan')}
                    className="text-xs font-bold text-[#007E68] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Lihat Semua Riwayat Pengambilan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Kecil: Bantuan Armada */}
              <div
                onClick={() =>
                  showToast('Menghubungkan ke koordinator armada pikap relawan terdekat')
                }
                className="p-4 rounded-2xl bg-[#E3F3EA] border border-emerald-200/70 flex items-center gap-3 cursor-pointer hover:bg-[#D5EFE1] transition-all shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#007E68] flex items-center justify-center shrink-0 shadow-2xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#007E68]">
                    🚛 Butuh Bantuan Armada?
                  </div>
                  <div className="text-[#6B7280] mt-0.5">
                    Hubungi relawan jemput terdekat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: REKOMENDASI AI / AI INSIGHTS                                        */}
      {/* ========================================================================= */}
      {activeNav === 'Rekomendasi AI' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#007E68] animate-pulse" />
                Pencocokan Cerdas & Praktis · Live Sync
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                AI Insights
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-3xl">
                Bocoran jadwal surplus makanan layak olah yang cocok dengan kapasitas fasilitasmu. Praktis, hemat, dan langsung jemput!
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
              <select
                value={insightsPeriod}
                onChange={(e) => setInsightsPeriod(e.target.value)}
                className="bg-[#F5F5F4] text-xs font-semibold text-[#111111] px-3.5 py-2 rounded-full border-none focus:outline-none focus:ring-1 focus:ring-[#007E68] cursor-pointer"
              >
                <option value="30 Hari Terakhir">Periode: 30 Hari Terakhir</option>
                <option value="7 Hari Terakhir">Periode: 7 Hari Terakhir</option>
                <option value="Bulan Ini">Periode: Bulan Ini</option>
              </select>

              <button
                type="button"
                onClick={() => showToast('Laporan AI Insights berhasil diunduh (PDF)')}
                className="border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>↓ Download Laporan</span>
              </button>
            </div>
          </div>

          {/* ROW 3 CARD STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Limbah Terselamatkan */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                  LIMBAH TERSELAMATKAN
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111]">
                    42.8 Ton
                  </span>
                  <span className="text-xs font-bold text-[#007E68] bg-[#E3F3EA] px-2 py-0.5 rounded-full">
                    ↑+18%
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1.5">
                  Total tersalurkan — Limbah siap olah untuk fasilitas
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0">
                <Recycle className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Card 2: Biaya Operasional Dihemat */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                  BIAYA OPERASIONAL DIHEMAT
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111]">
                    Rp 78 Juta
                  </span>
                  <span className="text-xs font-bold text-[#007E68] bg-[#E3F3EA] px-2 py-0.5 rounded-full">
                    Hemat ~75%
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1.5">
                  Dampak finansial — Pangkas biaya bahan baku
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Card 3: Tingkat Kecocokan Limbah */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                  TINGKAT KECOCOKAN LIMBAH
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111]">
                    96%
                  </span>
                  <span className="text-xs font-bold text-[#007E68] bg-[#E3F3EA] px-2 py-0.5 rounded-full">
                    Akurasi Terverifikasi
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1.5">
                  Evaluasi AI — Aman dicek sesuai jenis olahan
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* SECTION GRID: PREDIKSI PELUANG (KIRI) + SIDEBAR AI & NOTIF (KANAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* KOLOM KIRI: Peluang Mendatang & Status Kebutuhan */}
            <div className="lg:col-span-8 space-y-6">
              {/* Section Peluang Limbah Surplus Mendatang */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
                      Peluang Limbah Surplus Mendatang (Prediksi 7 Hari)
                    </h2>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Prediksi surplus makanan layak olah siap jemput dengan rekomendasi kapasitas fasilitas.
                    </p>
                  </div>
                  <span className="bg-[#E3F3EA] text-[#007E68] text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    ● Akurasi Model: 96%
                  </span>
                </div>

                <div className="space-y-3.5">
                  {upcomingOpportunities.map((opp) => {
                    const IconComp = opp.icon;
                    return (
                      <div
                        key={opp.id}
                        className="p-4 rounded-xl border border-gray-100 hover:border-[#007E68]/40 bg-[#F8F9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0 mt-0.5">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111]">
                              {opp.title}
                            </div>
                            <div className="mt-1">
                              <span className="inline-block bg-[#E3F3EA] text-[#007E68] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                {opp.suitableBadge}
                              </span>
                            </div>
                            <div className="text-xs text-[#6B7280] mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                              <span>{opp.source}</span>
                              <span>•</span>
                              <span>{opp.estimate}</span>
                            </div>
                            <div className="text-xs text-[#111111] font-semibold mt-1">
                              Waktu Ideal Jemput: {opp.idealTime}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            showToast(`Penjemputan untuk "${opp.title}" berhasil dijadwalkan!`)
                          }
                          className="px-5 py-2 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer self-start sm:self-center"
                        >
                          Jadwalkan Jemput
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: Status Kebutuhan & Ketersediaan Pengolahan */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6 space-y-5">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
                  Status Kebutuhan & Ketersediaan Pengolahan
                </h2>

                {/* Card rekomendasi AI mint */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF6EF] border border-[#A7F3D0]/70 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#007E68] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-[#0B3D2E] leading-relaxed">
                    <strong>Rekomendasi Cerdas AI:</strong> Pasokan surplus makanan pekan ini (daging olahan, roti, & sayur segar) dapat mencukupi hingga <strong>82%</strong> kapasitas pengolahan harian fasilitasmu secara higienis.
                  </div>
                </div>

                {/* 3 Progress Bars */}
                <div className="space-y-4 pt-1">
                  {/* Bar 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-[#111111]">
                        Protein & Kaldu (Daging/Tulang/Ikan) — <span className="text-[#6B7280]">Fasilitas Biogas</span>
                      </span>
                      <span className="text-[#007E68] font-bold">85% Terpenuhi</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#007E68] h-full rounded-full transition-all duration-500"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>

                  {/* Bar 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-[#111111]">
                        Roti, Gandum & Karbohidrat Bersih — <span className="text-[#6B7280]">Fasilitas Kompos</span>
                      </span>
                      <span className="text-[#007E68] font-bold">90% Terpenuhi</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#007E68] h-full rounded-full transition-all duration-500"
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>

                  {/* Bar 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-[#111111]">
                        Sayuran & Buah Segar Bersih — <span className="text-[#6B7280]">Fasilitas Kompos & Cair</span>
                      </span>
                      <span className="text-[#007E68] font-bold">70% Terpenuhi</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#007E68] h-full rounded-full transition-all duration-500"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: Sidebar Konsultasi & Notifikasi */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card Ringkasan Prediksi AI */}
              <div className="bg-[#E3F3EA] rounded-2xl border border-emerald-200/70 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#007E68] text-white flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#0B3D2E]">
                    Prediksi Efisiensi Operasional
                  </h3>
                </div>

                <p className="text-xs text-[#0B3D2E]/80 leading-relaxed">
                  Berdasarkan historis 30 hari terakhir, fasilitas pengolahanmu telah menghemat <strong>Rp 78 Juta</strong> dari biaya bahan baku organik.
                </p>

                <div className="pt-3 border-t border-emerald-200/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0B3D2E]/70 font-medium">Mitra Resto Aktif:</span>
                    <span className="font-bold text-[#0B3D2E]">14 Restoran</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0B3D2E]/70 font-medium">Jadwal Rutin Pekanan:</span>
                    <span className="font-bold text-[#0B3D2E]">8 Penjemputan</span>
                  </div>
                </div>
              </div>

              {/* Box Tanya Asisten AI Cepat */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#007E68]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111]">
                    Konsultasi Cepat AI
                  </h3>
                </div>

                <p className="text-xs text-[#6B7280]">
                  Butuh cek kecocokan jenis limbah atau rute armada jemput tercepat?
                </p>

                <div className="p-3 rounded-xl bg-[#F5F5F4] text-xs text-[#4B5563] italic">
                  "Misal: Apakah ampas tahu aman dicampur limbah organik kering lainnya?"
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAiModalOpen(true);
                    setAiChatInput(
                      'Apakah ampas tahu aman dicampur limbah organik kering lainnya untuk fasilitas pengolahan saya?'
                    );
                  }}
                  className="w-full py-2.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Tanyakan ke AI →</span>
                </button>

                {/* Saran Cepat */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-[#6B7280] block">
                    Saran Cepat:
                  </span>
                  {[
                    'Limbah surplus apa yang aman buat kompos cepat...',
                    'Cari limbah sisa catering terdekat...',
                    'Jadwal jemput sayur sortiran terdekat...',
                  ].map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickQuestion(sug)}
                      className="w-full text-left p-2 rounded-lg bg-[#EAF6EF]/50 hover:bg-[#E3F3EA] text-xs text-[#007E68] font-medium transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{sug}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: LENCANA & PENGHARGAAN                                                */}
      {/* ========================================================================= */}
      {activeNav === 'Penghargaan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold uppercase tracking-wider mb-1.5">
                🏆 PENGHARGAAN KAMU
              </span>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
                Lencana & Penghargaan Kamu
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-3xl">
                Koleksi lencana dari limbah makanan layak olah yang berhasil kamu proses untuk fasilitas pengelolaanmu.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                showToast('Ringkasan lencana pengelola berhasil diunduh (PDF)')
              }
              className="border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>↓ Download Ringkasan</span>
            </button>
          </div>

          {/* ROW 2 CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Badges Pengelola */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6B7280] block mb-1">
                  Badges Pengelola
                </span>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111]">
                  4 / 6 Terbuka
                </div>
                {/* Progress bar */}
                <div className="w-48 bg-gray-100 rounded-full h-2 my-2 overflow-hidden">
                  <div
                    className="bg-[#007E68] h-full rounded-full transition-all duration-500"
                    style={{ width: '66%' }}
                  />
                </div>
                <span className="text-xs font-bold text-[#007E68]">66% Tercapai</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0">
                <Trophy className="w-7 h-7 stroke-[2]" />
              </div>
            </div>

            {/* Card 2: Level Pengelola */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6B7280] block mb-1">
                  Level Pengelola
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111]">
                    Tier 2
                  </span>
                  <span className="bg-[#E3F3EA] text-[#007E68] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Aktif Rutin
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2.5">
                  2 kali proses lagi menuju Tier 3 Mandiri
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* BANNER STATUS */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="inline-flex items-center gap-2 bg-[#007E68] text-white px-4 py-2 rounded-full text-xs font-bold self-start">
              <span>🏭 Pengelola Limbah (Receiver) · 6 Lencana Tersedia</span>
            </div>
            <div className="text-xs text-[#6B7280] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#007E68] shrink-0" />
              <span>Lencana khusus diverifikasi untuk fasilitas pengolahan limbah makanan</span>
            </div>
          </div>

          {/* SECTION: Lencana yang Bisa Kamu Dapatkan */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#111111]">
                  Lencana yang Bisa Kamu Dapatkan
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Dapatkan lencana setiap kali kamu berhasil jemput dan olah limbah untuk fasilitasmu.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-[#F5F5F4] p-1 rounded-full self-start sm:self-auto">
                {['Semua (6)', 'Sudah Dapat (4)', 'Sedang Dikerjakan (2)'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setBadgeFilter(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${badgeFilter === tab
                        ? 'bg-[#007E68] text-white shadow-2xs'
                        : 'text-[#6B7280] hover:text-[#007E68]'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* GRID 6 BADGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredBadges.map((badge) => {
                const IconComp = badge.icon;
                const isEarned = badge.status === 'Sudah Dapat';
                return (
                  <div
                    key={badge.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#007E68]/40 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon + Status Pill */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isEarned
                              ? 'bg-[#E3F3EA] text-[#007E68]'
                              : 'bg-gray-100 text-gray-500'
                            }`}
                        >
                          <IconComp className="w-6 h-6 stroke-[2]" />
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isEarned
                              ? 'bg-[#E3F3EA] text-[#007E68]'
                              : 'bg-amber-100 text-amber-800'
                            }`}
                        >
                          {badge.status}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#111111] mb-1">
                        {badge.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                        {badge.description}
                      </p>
                    </div>

                    {/* Progress Bar & Target */}
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#6B7280]">{badge.targetLabel}</span>
                        <span className={isEarned ? 'text-[#007E68]' : 'text-[#111111]'}>
                          {badge.targetProgress}
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isEarned ? 'bg-[#007E68]' : 'bg-amber-500'
                            }`}
                          style={{ width: `${badge.percentage}%` }}
                        />
                      </div>

                      <div className="text-[11px] font-medium text-[#6B7280] pt-1">
                        {badge.footerNote}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION: Cerita Sukses Pengelola Limbah */}
          <div className="bg-[#EAF6EF] rounded-2xl border border-[#A7F3D0]/70 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Story Text */}
              <div className="lg:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold uppercase tracking-wider">
                  🌱 CERITA MITRA PENGELOLA
                </span>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl sm:text-2xl text-[#0B3D2E]">
                  "Pangkas 75% Biaya Bahan Baku Kompos & Biogas Berkat FoodRescue"
                </h3>
                <p className="text-xs sm:text-sm text-[#0B3D2E]/80 leading-relaxed">
                  Fasilitas pengolahan kami kini mendapatkan pasokan sayuran, roti sisa, dan ampas organik secara rutin dari 14 mitra resto di wilayah sekitar. Armada pikap bergerak terjadwal tanpa khawatir kekurangan bahan baku berkualitas.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#007E68]">
                  <span className="bg-white/80 px-3 py-1 rounded-full shadow-2xs">
                    42.8 Ton Terselamatkan
                  </span>
                  <span className="bg-white/80 px-3 py-1 rounded-full shadow-2xs">
                    🏢 14 Resto Langganan
                  </span>
                </div>
              </div>

              {/* Right Column: Facility Photo & Name Badge */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white/80 aspect-4/3 relative bg-emerald-950">
                  <img
                    src={facilityShowcase}
                    alt="Fasilitas Pengolahan Kompos Hijau"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <div className="bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#111111]">
                        Fasilitas Pengelola Kompos Hijau
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#007E68]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: PENGATURAN AKUN PENGELOLA                                           */}
      {/* ========================================================================= */}
      {activeNav === 'Pengaturan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Breadcrumb kecil */}
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007E68] uppercase tracking-wider">
            <Settings className="w-3.5 h-3.5" />
            <span>PENGATURAN AKUN (PENGELOLA)</span>
          </div>

          {/* Heading besar */}
          <div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
              Informasi Akun Pengelola Limbah
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl">
              Kelola informasi profil dasar, kontak fasilitas, dan data operasional fasilitas pengelola limbah Anda.
            </p>
          </div>

          {/* Card form besar */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 sm:p-8 max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Perubahan profil dan informasi fasilitas berhasil disimpan!');
              }}
              className="space-y-6"
            >
              {/* Status Akun */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8F9FA] border border-gray-100">
                <div>
                  <span className="text-xs text-[#6B7280] block mb-0.5">Status Akun</span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pengelola Limbah - Terverifikasi</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Terkunci otomatis via verifikasi sistem</span>
                </div>
              </div>

              {/* Foto Profil */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center font-bold text-xl border border-emerald-300">
                    JM
                  </div>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#007E68] ring-2 ring-white absolute -bottom-1 -right-1" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => showToast('Pilih foto baru untuk diperbarui')}
                    className="px-4 py-2 rounded-full border border-[#007E68] text-[#007E68] hover:bg-[#EAF6EF] text-xs font-bold transition-colors cursor-pointer"
                  >
                    ↑ Ganti Foto
                  </button>
                  <div className="text-[11px] text-[#6B7280] mt-1">
                    PNG atau JPG, rasio persegi maksimal 2 MB
                  </div>
                </div>
              </div>

              {/* Row 2 kolom: Nama & Fasilitas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nama Akun / Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={settingsPersonName}
                    onChange={(e) => setSettingsPersonName(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nama Fasilitas Pengolahan
                  </label>
                  <input
                    type="text"
                    value={settingsFacilityName}
                    onChange={(e) => setSettingsFacilityName(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2 kolom: No HP & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settingsPhone}
                    onChange={(e) => setSettingsPhone(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Email Operasional
                  </label>
                  <input
                    type="email"
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Alamat Fasilitas */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                  Alamat Fasilitas
                </label>
                <input
                  type="text"
                  value={settingsAddress}
                  onChange={(e) => setSettingsAddress(e.target.value)}
                  required
                  className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Catatan Singkat */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                  Catatan Singkat (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={settingsNotes}
                  onChange={(e) => setSettingsNotes(e.target.value)}
                  placeholder="Pintu gerbang timur, muat kendaraan bak terbuka / pikap kecil."
                  className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition resize-none"
                />
              </div>

              {/* Buttons Batal & Simpan */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => showToast('Perubahan dibatalkan')}
                  className="px-6 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>✓ Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForPengelola;
