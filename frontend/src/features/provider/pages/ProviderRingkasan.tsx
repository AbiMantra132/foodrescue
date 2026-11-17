import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Archive,
  Heart,
  ShieldCheck,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle2,
  Bike,
  Download,
  Plus,
  MapPin,
  Leaf,
} from 'lucide-react';
import { useProvider } from '../ProviderContext';
import type { SurplusItem } from '../ProviderContext';

// ─────────────────────────── Status Badge ───────────────────────────

function StatusBadge({ status }: { status: SurplusItem['status'] }) {
  switch (status) {
    case 'siap-jemput':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-[#15803D] shadow-sm border border-[#DCFCE7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] inline-block" />
          Siap Dijemput
        </span>
      );
    case 'menunggu-kurir':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF1E0] text-[#B45309]">
          ⏳ Menunggu Kurir
        </span>
      );
    case 'dalam-penjemputan':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EEF0FF] text-[#4338CA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA] inline-block" />
          Dalam Penjemputan
        </span>
      );
    case 'tersalurkan':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
          <CheckCircle2 className="w-3 h-3" /> Tersalurkan
        </span>
      );
    case 'menunggu-verifikasi':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
          Menunggu Verifikasi
        </span>
      );
    default:
      return null;
  }
}

// ─────────────────────────── Static Map ─────────────────────────────

function StatusPenjemputanMap() {
  return (
    <div className="rounded-xl overflow-hidden mb-3" style={{ height: 160 }}>
      <svg width="100%" height="160" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="160" fill="#EEF2F7" />
        {/* Streets */}
        <rect x="0" y="0" width="320" height="160" fill="#E8F0F8" />
        <line x1="0" y1="80" x2="320" y2="80" stroke="#CBD5E1" strokeWidth="12" />
        <line x1="0" y1="40" x2="320" y2="40" stroke="#D1D5DB" strokeWidth="6" />
        <line x1="0" y1="120" x2="320" y2="120" stroke="#D1D5DB" strokeWidth="6" />
        <line x1="80" y1="0" x2="80" y2="160" stroke="#D1D5DB" strokeWidth="6" />
        <line x1="200" y1="0" x2="200" y2="160" stroke="#D1D5DB" strokeWidth="6" />
        <line x1="280" y1="0" x2="280" y2="160" stroke="#D1D5DB" strokeWidth="4" />
        {/* Sudirman label */}
        <text x="10" y="74" fontSize="8" fill="#6B7280" fontFamily="sans-serif">Jl. Sudirman</text>
        {/* Route */}
        <polyline
          points="50,80 80,80 200,80 200,40 280,40"
          stroke="#15803D" strokeWidth="3" strokeDasharray="6 3" fill="none" strokeLinecap="round"
        />
        {/* Route pill */}
        <rect x="90" y="58" width="120" height="16" rx="8" fill="#15803D" opacity="0.9" />
        <text x="150" y="69" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">● Rute Langsung • Sudirman</text>
        {/* Start pin – Dapur Sahid */}
        <circle cx="50" cy="80" r="10" fill="#15803D" />
        <text x="50" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">A</text>
        {/* End pin – Dock B2 */}
        <circle cx="280" cy="40" r="10" fill="#0F172A" />
        <text x="280" y="44" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">B2</text>
        {/* Dock B2 label */}
        <rect x="225" y="10" width="70" height="16" rx="4" fill="white" opacity="0.9" />
        <text x="260" y="21" textAnchor="middle" fill="#0F172A" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Dock B2</text>
      </svg>
    </div>
  );
}

// ─────────────────────────── Detail Modal ───────────────────────────

function DetailModal({ item, onClose }: { item: SurplusItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-[#64748B] font-mono">{item.batchId}</p>
            <h3 className="text-base font-bold text-[#0F172A] mt-0.5">{item.name}</h3>
          </div>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#0F172A] text-lg font-bold px-1">✕</button>
        </div>
        <img src={item.photo} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4" />
        <div className="space-y-2 text-xs text-[#64748B]">
          <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Kategori</span><span>{item.category}</span></div>
          <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Jumlah</span><span>{item.quantity} {item.unit}</span></div>
          <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Batas Waktu</span><span>{item.deadline}</span></div>
          <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Suhu</span><span>{item.temperature}</span></div>
          <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Asal</span><span>{item.source}</span></div>
          {item.recipient && <div className="flex justify-between"><span className="font-semibold text-[#0F172A]">Penerima</span><span>{item.recipient}</span></div>}
        </div>
        <button onClick={onClose} className="mt-5 w-full bg-[#15803D] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#166534] transition-colors">
          Tutup
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Main Page ──────────────────────────────

export default function ProviderRingkasan() {
  const navigate = useNavigate();
  const { surplusList } = useProvider();
  const [modalItem, setModalItem] = useState<SurplusItem | null>(null);

  // Stats from live data
  const aktifCount = surplusList.filter(s => s.status === 'siap-jemput' || s.status === 'menunggu-kurir' || s.status === 'dalam-penjemputan' || s.status === 'menunggu-verifikasi').length;
  const tersalurkanPorsi = surplusList
    .filter(s => s.status === 'tersalurkan')
    .reduce((acc, s) => acc + s.quantity, 0);

  // Active surplus needing action (first 2)
  const activeSurplus = surplusList
    .filter(s => s.status === 'siap-jemput' || s.status === 'menunggu-kurir')
    .slice(0, 2);

  // Recent activity
  const recentActivity = [
    { id: 'r1', icon: '✓', name: '35 Porsi Roti Tawar Gandum & Cake', sub: 'Panti Asuhan Kasih Mandiri • 14:20 WIB', status: 'Tersalurkan', statusCls: 'bg-[#DCFCE7] text-[#15803D]', iconEl: <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> },
    { id: 'r2', icon: '🏍', name: '20 Porsi Paket Nasi Kotak Ayam Panggang', sub: 'Posko Dapur Umum Kwitang • 15:05 WIB', status: 'Di Perjalanan', statusCls: 'bg-[#EEF0FF] text-[#4338CA]', iconEl: <Bike className="w-4 h-4 text-[#4338CA]" /> },
    { id: 'r3', icon: '✓', name: '15 Porsi Salad Buah Segar & Dressing', sub: 'Komunitas Lansia Sejahtera Salemba • 12:45 WIB', status: 'Tersalurkan', statusCls: 'bg-[#DCFCE7] text-[#15803D]', iconEl: <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> },
    { id: 'r4', icon: '✓', name: '58 Porsi Hidangan Prasmanan Breakfast', sub: 'Rumah Singgah Sahabat Anak Senen • 10:30 WIB', status: 'Tersalurkan', statusCls: 'bg-[#DCFCE7] text-[#15803D]', iconEl: <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FD] p-6">
      {/* Detail Modal */}
      {modalItem && <DetailModal item={modalItem} onClose={() => setModalItem(null)} />}

      {/* Badge breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-[#64748B] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block" />
          Dapur Grand Bakery
        </span>
        <span className="text-[#D1D5DB]">•</span>
        <span className="text-xs text-[#64748B]">Outlet Sahid</span>
      </div>

      {/* Page heading */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">Ringkasan Operasional</h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-xl">
            Ringkasan distribusi donasi pangan aktif, status penyaluran terkini, dan kepatuhan standar hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] bg-white text-[#64748B] rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Ekspor Laporan
          </button>
          <button
            onClick={() => navigate('/provider/surplus/baru')}
            className="flex items-center gap-1.5 bg-[#15803D] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#166534] transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Surplus Baru
          </button>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] mb-6" />

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[#64748B] font-medium">Paket Aktif Hari Ini</p>
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
              <Archive className="w-4.5 h-4.5 text-[#15803D]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">{aktifCount} <span className="text-base font-semibold">Batch</span></p>
          <p className="text-xs text-[#64748B] mt-1">Siap jemput & dalam proses</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[#64748B] font-medium">Tersalurkan Pekan Ini</p>
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
              <Heart className="w-4.5 h-4.5 text-[#15803D]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0F172A]">128 <span className="text-base font-semibold">Porsi</span></p>
          <p className="text-xs text-[#15803D] mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% tepat waktu terserap
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[#64748B] font-medium">Kepatuhan Standar</p>
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-[#15803D]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#15803D]">Grade A <span className="text-base font-normal text-[#64748B]">(100/100)</span></p>
          <p className="text-xs text-[#64748B] mt-1">Suhu & kemasan terverifikasi</p>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="flex-[2] min-w-0 flex flex-col gap-6">

          {/* Surplus Aktif Membutuhkan Tindakan */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0F172A]">Surplus Aktif Membutuhkan Tindakan</h2>
                <span className="text-xs bg-[#EEF0FF] text-[#4338CA] font-semibold px-2.5 py-0.5 rounded-full">3 Batch</span>
              </div>
              <Link to="/provider/surplus" className="flex items-center gap-1 text-sm text-[#15803D] font-medium hover:underline">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Card A: Pastry */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80"
                    alt="Croissant & Pastry"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full text-xs font-semibold text-[#15803D] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] inline-block" />
                      Siap Dijemput
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-1 bg-[#0F172A]/80 text-white px-2 py-0.5 rounded-full text-xs">
                      <Clock className="w-3 h-3" /> s/d 16:30 WIB
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-[#0F172A]">Croissant & Pastry Sarapan</h3>
                    <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-semibold px-2 py-0.5 rounded-full shrink-0">18 Porsi</span>
                  </div>
                  <p className="text-xs text-[#64748B] mb-3">Sisa sarapan hotel • Kemasan individual…</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Kurir di perjalanan (3 km)
                    </span>
                    <button
                      onClick={() => setModalItem(surplusList[0] || null)}
                      className="text-xs bg-[#EEF0FF] text-[#4338CA] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#E0E7FF] transition-colors shrink-0"
                    >
                      Detail Batch
                    </button>
                  </div>
                </div>
              </div>

              {/* Card B: Bento */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80"
                    alt="Bento Banquet"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 bg-[#FFF1E0] px-2.5 py-1 rounded-full text-xs font-semibold text-[#B45309]">
                      ⏳ Menunggu Kurir
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-1 bg-[#0F172A]/80 text-white px-2 py-0.5 rounded-full text-xs">
                      <Clock className="w-3 h-3" /> s/d 17:15 WIB
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-[#0F172A]">Paket Bento Banquet Siang</h3>
                    <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-semibold px-2 py-0.5 rounded-full shrink-0">24 Porsi</span>
                  </div>
                  <p className="text-xs text-[#64748B] mb-3">Katering acara seminar • Suhu terjaga 62°C</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#64748B] flex items-center gap-1">
                      <Bike className="w-3.5 h-3.5" /> Menunggu penugasan relawan
                    </span>
                    <button
                      onClick={() => setModalItem(surplusList[1] || null)}
                      className="text-xs bg-[#EEF0FF] text-[#4338CA] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#E0E7FF] transition-colors shrink-0"
                    >
                      Detail Batch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aktivitas Penyaluran Terbaru */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="text-base font-bold text-[#0F172A]">Aktivitas Penyaluran Terbaru</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Histori proses serah terima dan status konfirmasi penerima.</p>
              </div>
              <span className="text-xs text-[#64748B] font-medium shrink-0">Update Otomatis</span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    {item.iconEl}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">{item.name}</p>
                    <p className="text-xs text-[#64748B]">{item.sub}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${item.statusCls}`}>
                    {item.id === 'r2' ? (
                      <span className="flex items-center gap-1"><Bike className="w-3 h-3" /> {item.status}</span>
                    ) : (
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {item.status}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#E5E7EB] pt-4 flex items-center justify-between gap-4 text-xs text-[#64748B] flex-wrap">
            <span className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#15803D]" />
              Setiap paket donasi yang Anda salurkan menyelamatkan rata-rata 3,5 kg makanan dari TPA lokal.
            </span>
            <span className="flex items-center gap-3 shrink-0">
              <a href="#" className="hover:text-[#15803D]">Pusat Bantuan Mitra</a>
              <span>•</span>
              <a href="#" className="hover:text-[#15803D]">Syarat Layanan Higienitas</a>
              <span>•</span>
              <span>Versi Portal v2.4.1</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-72 shrink-0 flex flex-col gap-5">

          {/* Status Penjemputan Langsung */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block" />
                Status Penjemputan Langsung
              </h3>
              <span className="text-xs font-semibold text-[#64748B]">ETA ~8 Mnt</span>
            </div>

            <StatusPenjemputanMap />

            {/* Kurir info */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-[#64748B] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#0F172A]">Kurir Joko W. (FoodRescue)</p>
                  <p className="text-[11px] text-[#64748B]">Honda Beat • B 3821 SJK</p>
                </div>
              </div>
              <span className="text-xs font-semibold bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full shrink-0">Siaga B2</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Titik Tunggu Penjemputan:</span>
              <span className="font-semibold text-[#0F172A]">Loading Dock B2 (Satpam Siaga)</span>
            </div>
          </div>

          {/* Pedoman Higienitas Serah Terima */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-sm font-bold text-[#0F172A]">Pedoman Higienitas Serah Terima</h3>
              <span className="text-[11px] text-[#64748B] font-medium shrink-0">SOP Berlaku</span>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {[
                'Label tanggal, jenis makanan, dan jam konsumsi tercantum jelas.',
                'Segel higienis primer rapat & wadah food-grade tidak rusak.',
                'Suhu aman chiller (< 4°C) atau hot-holding (> 60°C) terjaga.',
                'Sesuai standar verifikasi keselamatan pangan ISO 22000.',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tingkat Penyerapan */}
          <div className="bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7] shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-[#0F172A]">Tingkat Penyerapan Hari Ini</h3>
              <span className="text-lg font-bold text-[#15803D]">94.2%</span>
            </div>
            <div className="w-full h-2.5 bg-[#DCFCE7] rounded-full overflow-hidden mt-2 mb-3">
              <div className="h-full bg-[#15803D] rounded-full" style={{ width: '94.2%' }} />
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Semua makanan layak konsumsi telah dialokasikan ke panti asuhan dan posko terverifikasi dalam radius 6 km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
