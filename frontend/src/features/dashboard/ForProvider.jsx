import React, { useState } from 'react';
import {
  PlusCircle,
  Settings,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Camera,
  Calendar,
  Lock,
  Recycle,
  Share2,
  PhoneCall,
  Lightbulb,
  ShieldCheck,
  Package
} from 'lucide-react';

export function ForProvider({ activeNav, setActiveNav, showToast }) {
  // ==========================================
  // STATE: FORM & LIST DATA PENYEDIA (PROVIDER)
  // ==========================================
  // Form State: Posting Makanan Surplus Kilat (Ringkasan)
  const [quickWasteType, setQuickWasteType] = useState('Roti / Bakery');
  const [quickWeight, setQuickWeight] = useState('40');
  const [quickTime, setQuickTime] = useState('18:00 - 20:00 WIB');

  // Form State: Tambah Makanan Surplus Lengkap
  const [addFoodName, setAddFoodName] = useState('');
  const [addCategory, setAddCategory] = useState('Roti / Bakery');
  const [addWeight, setAddWeight] = useState('');
  const [addCondition, setAddCondition] = useState('Layak Diproses Fasilitas Pengelola');
  const [addReadyTime, setAddReadyTime] = useState('Hari ini (16:00 - 19:00 WIB)');
  const [addDeadlineTime, setAddDeadlineTime] = useState('Hari ini, 21:00 WIB');
  const [addLocationNotes, setAddLocationNotes] = useState('');

  // Mock Data: Makanan Surplus Yang Sedang Disediakan
  const [activeSurplusItems, setActiveSurplusItems] = useState([
    {
      id: 'itm-1',
      title: 'Sisa Roti Tawar & Gandum',
      weight: '95 kg',
      status: 'Menunggu Armada Jemput',
      condition: 'Kondisi: Bersih dalam kemasan karung rapi untuk fasilitas pengelola',
      subText: 'Relawan Armada Surya — Estimasi tiba: Hari ini, 17:00 WIB',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'itm-2',
      title: 'Ampas Adonan & Roti Manis',
      weight: '60 kg',
      status: 'Siap Diambil',
      condition: 'Kondisi: Kering dalam boks higienis tertutup',
      subText: 'Belum ada penjemput — Tersedia untuk fasilitas pengelola terdekat',
      img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  // Settings State: Provider
  const [providerPersonName, setProviderPersonName] = useState('Budi Santoso');
  const [providerBusinessName, setProviderBusinessName] = useState('Toko Roti Prima');
  const [providerPhone, setProviderPhone] = useState('+62 812-8899-7711');
  const [providerEmail, setProviderEmail] = useState('info@tokorotiprima.com');
  const [providerAddress, setProviderAddress] = useState(
    'Jl. Surya Kencana No. 45, Kebayoran Baru, Jakarta Selatan'
  );
  const [providerNotes, setProviderNotes] = useState(
    'Loading dock pintu samping, muat mobil boks / pikap kecil.'
  );

  // Handler: Tambah Posting Cepat (Ringkasan)
  const handleQuickPost = (e) => {
    e.preventDefault();
    if (!quickWeight.trim()) return;

    const newItem = {
      id: `itm-${Date.now()}`,
      title: `Surplus ${quickWasteType}`,
      weight: `${quickWeight} kg`,
      status: 'Siap Diambil',
      condition: 'Kondisi: Siap diambil untuk diproses fasilitas pengelola terdekat',
      subText: 'Belum ada penjemput — Tersedia untuk fasilitas pengelola terdekat',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
    };

    setActiveSurplusItems((prev) => [newItem, ...prev]);
    showToast(`Berhasil memposting donasi ${quickWeight} kg ${quickWasteType}!`);
  };

  // Handler: Form Tambah Makanan Lengkap
  const handleAddFoodSubmit = (e) => {
    e.preventDefault();
    if (!addFoodName.trim() || !addWeight.trim()) {
      showToast('Mohon lengkapi nama makanan dan estimasi berat.');
      return;
    }

    const newItem = {
      id: `itm-${Date.now()}`,
      title: addFoodName,
      weight: `${addWeight} kg`,
      status: 'Siap Diambil',
      condition: `Kondisi: ${addCondition}`,
      subText: `Waktu: ${addReadyTime} — Siap untuk fasilitas pengelola terdekat`,
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
    };

    setActiveSurplusItems((prev) => [newItem, ...prev]);
    showToast(`Info makanan surplus "${addFoodName}" berhasil dikirim!`);
    setActiveNav('Ringkasan');
    setAddFoodName('');
    setAddWeight('');
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* VIEW: RINGKASAN PENYEDIA                                                  */}
      {/* ========================================================================= */}
      {activeNav === 'Ringkasan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Heading */}
          <div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
              Halo, Toko Roti Prima
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl">
              Kelola dan posting makanan surplus yang siap dijemput untuk diproses oleh fasilitas pengelola limbah terdekat.
            </p>
          </div>

          {/* 2. Row 2 card statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6B7280] block mb-1">
                  Donasi Aktif Siap Jemput
                </span>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl text-[#111111]">
                  {activeSurplusItems.length} donasi siap diangkut
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E3F3EA] flex items-center justify-center text-[#007E68] shrink-0">
                <Package className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6B7280] block mb-1">
                  Total Limbah Tersalurkan
                </span>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-2xl sm:text-3xl text-[#111111]">
                  1.250 kg bulan ini
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E3F3EA] flex items-center justify-center text-[#007E68] shrink-0">
                <Recycle className="w-6 h-6 stroke-[2]" />
              </div>
            </div>
          </div>

          {/* 3 & 4. Grid 2 Kolom: Card Kiri Posting Kilat & Card Kanan Makanan Sedang Disediakan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Card Kiri: Posting Makanan Surplus Kilat */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#007E68]" />
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#111111]">
                    Posting Makanan Surplus Kilat
                  </h2>
                </div>
                <span className="bg-[#E3F3EA] text-[#007E68] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Cepat & Mudah
                </span>
              </div>

              <p className="text-xs text-[#6B7280] mb-4">
                Ada sisa bahan makanan hari ini? Masukkan jenis, berat, dan jadwal penjemputan.
              </p>

              <form onSubmit={handleQuickPost} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Jenis Limbah / Makanan
                  </label>
                  <select
                    value={quickWasteType}
                    onChange={(e) => setQuickWasteType(e.target.value)}
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition cursor-pointer"
                  >
                    <option value="Roti / Bakery">Roti / Bakery</option>
                    <option value="Sayuran & Buah Segar">Sayuran & Buah Segar</option>
                    <option value="Nasi & Karbohidrat">Nasi & Karbohidrat</option>
                    <option value="Ampas Olahan Organik">Ampas Olahan Organik</option>
                    <option value="Potongan Daging & Tulang Sup">Potongan Daging & Tulang Sup</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Estimasi Berat (kg)
                    </label>
                    <input
                      type="number"
                      value={quickWeight}
                      onChange={(e) => setQuickWeight(e.target.value)}
                      placeholder="Contoh: 40"
                      required
                      className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Jadwal Penjemputan
                    </label>
                    <input
                      type="text"
                      value={quickTime}
                      onChange={(e) => setQuickTime(e.target.value)}
                      placeholder="18:00 - 20:00 WIB"
                      className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span> Posting Donasi Kilat</span>
                </button>
              </form>
            </div>

            {/* Card Kanan: Makanan Sedang Disediakan */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#007E68]" />
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#111111]">
                    Makanan Sedang Disediakan
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('Tambah Makanan')}
                  className="text-xs font-bold text-[#007E68] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>+ Tambah Baru</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {activeSurplusItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-[#007E68]/30 bg-[#F8F9FA] transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111]">
                            {item.title}
                          </h3>
                          <div className="text-xs text-[#007E68] font-bold mt-0.5">
                            {item.weight}
                          </div>
                          <div className="text-[11px] text-[#6B7280] mt-0.5">
                            {item.condition}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${item.status === 'Siap Diambil'
                            ? 'bg-[#E3F3EA] text-[#007E68]'
                            : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        ● {item.status}
                      </span>
                    </div>

                    {/* Sub-Row Bawah */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-gray-200/60 text-xs">
                      <div className="flex items-center gap-1.5 text-[#6B7280]">
                        {idx === 0 ? (
                          <Truck className="w-4 h-4 text-[#007E68]" />
                        ) : (
                          <Clock className="w-4 h-4 text-[#6B7280]" />
                        )}
                        <span>{item.subText}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {idx === 0 ? (
                          <button
                            type="button"
                            onClick={() => showToast('Menghubungkan ke armada driver via WhatsApp...')}
                            className="bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Hubungi Distributor</span>
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => showToast('Membuka modal edit surplus')}
                              className="border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full bg-white transition-colors cursor-pointer"
                            >
                              Ubah
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast('Tautan listing berhasil disalin!')}
                              className="bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs font-bold px-3.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Share2 className="w-3 h-3" />
                              <span>Bagikan</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: TAMBAH MAKANAN SURPLUS                                              */}
      {/* ========================================================================= */}
      {activeNav === 'Tambah Makanan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 1. Heading */}
          <div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
              Tambah Makanan Surplus 🍲
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl">
              Kirim informasi makanan atau bahan surplus yang siap disalurkan untuk diproses fasilitas pengelola limbah terdekat.
            </p>
          </div>

          {/* Grid Form Utama (Kiri) + Sidebar Tips & Dampak (Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Utama */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 sm:p-8">
              <form onSubmit={handleAddFoodSubmit} className="space-y-5">
                {/* Nama / Jenis Makanan */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nama / Jenis Makanan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={addFoodName}
                    onChange={(e) => setAddFoodName(e.target.value)}
                    placeholder="Contoh: Roti Tawar Sisa Produksi, Sayuran Campur, Ampas Tahu"
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>

                {/* Pilih Cepat 5 Pill */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#6B7280]">Pilih Cepat:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Roti / Bakery', 'Sayur / Buah', 'Ampas Olahan', 'Nasi / Karbohidrat', 'Lainnya'].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setAddCategory(cat);
                            if (!addFoodName) setAddFoodName(cat);
                          }}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${addCategory === cat
                              ? 'bg-[#007E68] text-white shadow-xs'
                              : 'bg-[#E3F3EA] text-[#007E68] hover:bg-[#A7F3D0]/60'
                            }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Row 2 kolom: Jumlah / Estimasi Berat & Kondisi Makanan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Jumlah / Estimasi Berat <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={addWeight}
                        onChange={(e) => setAddWeight(e.target.value)}
                        placeholder="Contoh: 45"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 pr-10 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                      />
                      <span className="absolute right-3.5 text-xs text-[#6B7280] font-bold pointer-events-none">
                        kg
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Kondisi Makanan <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addCondition}
                      onChange={(e) => setAddCondition(e.target.value)}
                      className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition cursor-pointer"
                    >
                      <option value="Layak Diproses Fasilitas Pengelola">
                        Layak Diproses Fasilitas Pengelola
                      </option>
                      <option value="Segar & Terpilah Bebas Kontaminan">
                        Segar & Terpilah Bebas Kontaminan
                      </option>
                      <option value="Kering Siap Daur Ulang / Kompos">
                        Kering Siap Daur Ulang / Kompos
                      </option>
                      <option value="Sisa Olahan Dapur Harian">Sisa Olahan Dapur Harian</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 kolom: Waktu Siap Diambil & Batas Akhir Penjemputan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Waktu Siap Diambil <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={addReadyTime}
                        onChange={(e) => setAddReadyTime(e.target.value)}
                        placeholder="Hari ini (16:00 - 19:00 WIB)"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 pl-10 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Batas Akhir Penjemputan
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={addDeadlineTime}
                        onChange={(e) => setAddDeadlineTime(e.target.value)}
                        placeholder="Hari ini, 21:00 WIB"
                        className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 pl-10 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                      />
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Foto Makanan Dropzone */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Foto Makanan (Opsional)
                  </label>
                  <div
                    onClick={() => showToast('Pilih foto bahan surplus untuk diunggah')}
                    className="border-2 border-dashed border-[#A7F3D0] bg-[#E3F3EA]/30 hover:bg-[#E3F3EA]/60 transition-colors rounded-2xl p-8 text-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#007E68] mx-auto mb-3 shadow-2xs">
                      <Camera className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#111111] mb-1">
                      Klik atau seret foto makanan ke sini
                    </div>
                    <div className="text-[11px] text-[#6B7280]">
                      Format JPG, PNG maksimal 5 MB untuk dokumentasi armada
                    </div>
                  </div>
                </div>

                {/* Lokasi Spesifik & Catatan Tambahan */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Lokasi Spesifik & Catatan Tambahan
                  </label>
                  <textarea
                    rows={3}
                    value={addLocationNotes}
                    onChange={(e) => setAddLocationNotes(e.target.value)}
                    placeholder="Contoh: Diambil di loading dock pintu samping toko. Bawa wadah atau karung sendiri jika perlu tambahan."
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition resize-none"
                  />
                </div>

                {/* Footer Form */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => showToast('Draft postingan berhasil disimpan secara lokal.')}
                    className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    Simpan Draft
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>➤ Kirim Info Makanan</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Kanan: Tips Distribusi & Dampak */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#E3F3EA] text-[#007E68] flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base text-[#111111]">
                    Tips Distribusi Limbah
                  </h3>
                </div>

                <ul className="space-y-3.5 text-xs text-[#4B5563]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#007E68] shrink-0 mt-0.5" />
                    <span>Pastikan bahan tidak berlendir, tidak berjamur hitam, dan higienis untuk diproses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#007E68] shrink-0 mt-0.5" />
                    <span>Beri label tanggal produksi/sisa hari ini pada wadah atau boks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#007E68] shrink-0 mt-0.5" />
                    <span>Fasilitas pengelola terdekat akan otomatis menerima notifikasi dan siap mengambil sesuai jadwal.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#E3F3EA] rounded-2xl border border-emerald-200/60 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#007E68]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#0B3D2E]">
                    Dampak Surplus Anda
                  </h3>
                </div>
                <p className="text-xs text-[#0B3D2E]/90 leading-relaxed">
                  <strong>Toko Roti Prima</strong> telah membantu mencegah <strong>1.250 kg</strong> limbah makanan terbuang dan menyalurkannya ke fasilitas pengelola terverifikasi bulan ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: PENGATURAN AKUN PENYEDIA                                            */}
      {/* ========================================================================= */}
      {activeNav === 'Pengaturan' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Breadcrumb kecil */}
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007E68] uppercase tracking-wider">
            <Settings className="w-3.5 h-3.5" />
            <span>PENGATURAN AKUN (PENYEDIA)</span>
          </div>

          {/* Heading besar */}
          <div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
              Informasi Akun Penyedia Makanan
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl">
              Kelola informasi profil toko/dapur, kontak operasional, dan data lokasi penjemputan makanan surplus Anda.
            </p>
          </div>

          {/* Card form besar */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 sm:p-8 max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Perubahan profil toko dan informasi penjemputan berhasil disimpan!');
              }}
              className="space-y-6"
            >
              {/* Status Akun */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8F9FA] border border-gray-100">
                <div>
                  <span className="text-xs text-[#6B7280] block mb-0.5">Status Akun</span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Penyedia Makanan - Terverifikasi</span>
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
                    TP
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

              {/* Row 2 kolom: Nama & Toko */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nama Akun / Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={providerPersonName}
                    onChange={(e) => setProviderPersonName(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                    Nama Toko / Usaha Penyedia
                  </label>
                  <input
                    type="text"
                    value={providerBusinessName}
                    onChange={(e) => setProviderBusinessName(e.target.value)}
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
                    value={providerPhone}
                    onChange={(e) => setProviderPhone(e.target.value)}
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
                    value={providerEmail}
                    onChange={(e) => setProviderEmail(e.target.value)}
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                  Alamat Toko / Dapur (Titik Jemput)
                </label>
                <input
                  type="text"
                  value={providerAddress}
                  onChange={(e) => setProviderAddress(e.target.value)}
                  required
                  className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl p-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Catatan Singkat */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                  Catatan Loading Dock / Titik Jemput Armada
                </label>
                <textarea
                  rows={3}
                  value={providerNotes}
                  onChange={(e) => setProviderNotes(e.target.value)}
                  placeholder="Loading dock pintu samping, muat mobil boks / pikap kecil."
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

export default ForProvider;
