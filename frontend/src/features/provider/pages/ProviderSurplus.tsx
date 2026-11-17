import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Bike,
  ClipboardCheck,
  Heart,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Clock,
  Thermometer,
  CheckCircle2,
  Download,
  Plus,
  FileText,
  X,
} from 'lucide-react';
import { useProvider, SurplusItem, SurplusStatus } from '../ProviderContext';

type FilterKey = 'all' | 'aktif' | 'menunggu' | 'penjemputan' | 'selesai';

const PAGE_SIZE = 6;

// ─────────────────────────── Status Pill ────────────────────────────

function StatusPill({ status }: { status: SurplusStatus }) {
  switch (status) {
    case 'siap-jemput':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" /> Siap Jemput
        </span>
      );
    case 'menunggu-kurir':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF1E0] text-[#B45309]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" /> Menunggu Kurir
        </span>
      );
    case 'dalam-penjemputan':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF0FF] text-[#4338CA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA]" /> Dalam Penjemputan
        </span>
      );
    case 'tersalurkan':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
          <CheckCircle2 className="w-3 h-3" /> Tersalurkan
        </span>
      );
    case 'menunggu-verifikasi':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Menunggu Verifikasi
        </span>
      );
    case 'ditolak':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Ditolak
        </span>
      );
    default:
      return null;
  }
}

// ─────────────────────────── Modals ─────────────────────────────────

function DetailModal({ item, onClose }: { item: SurplusItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-[#64748B] font-mono">{item.batchId}</p>
            <h3 className="text-base font-bold text-[#0F172A] mt-0.5">{item.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#64748B] hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <img src={item.photo} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4" />
        <div className="space-y-2 text-xs">
          {[
            ['Kategori', item.category],
            ['Jumlah', `${item.quantity} ${item.unit}`],
            ['Batas Waktu', item.deadline],
            ['Suhu', item.temperature],
            ['Asal', item.source],
            ...(item.recipient ? [['Penerima', item.recipient]] : []),
            ...(item.recipientTime ? [['Waktu Serah', item.recipientTime]] : []),
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-2">
              <span className="text-[#64748B]">{label}</span>
              <span className="font-semibold text-[#0F172A] text-right">{value}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-5 w-full bg-[#15803D] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#166534] transition-colors">
          Tutup
        </button>
      </div>
    </div>
  );
}

function UbahStokModal({ item, onClose, onSave }: { item: SurplusItem; onClose: () => void; onSave: (qty: number) => void }) {
  const [qty, setQty] = useState(item.quantity);
  const [toast, setToast] = useState(false);

  function handleSave() {
    onSave(qty);
    setToast(true);
    setTimeout(() => { setToast(false); onClose(); }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] bg-[#15803D] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Stok berhasil diperbarui
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-bold text-[#0F172A]">Ubah Stok</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-[#64748B] hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-[#64748B] mb-4">{item.name}</p>
        <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">Jumlah {item.unit}</label>
        <input
          type="number"
          min={0}
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
          className="w-full h-12 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] transition"
        />
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#64748B] hover:bg-gray-50">Batal</button>
          <button onClick={handleSave} className="flex-1 bg-[#15803D] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#166534]">Simpan</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── Surplus Card ───────────────────────────

function SurplusCard({
  item,
  onDetail,
  onUbahStok,
}: {
  item: SurplusItem;
  onDetail: () => void;
  onUbahStok: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 flex gap-4">
      {/* Image with status badge overlay */}
      <div className="relative shrink-0">
        <img
          src={item.photo}
          alt={item.name}
          className="w-[120px] h-[88px] object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2">
          <StatusPill status={item.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-xs font-semibold text-[#B45309]">{item.category}</span>
            <span className="text-xs font-mono text-[#64748B]">• {item.batchId}</span>
          </div>
          <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full shrink-0">
            {item.quantity} {item.unit}
          </span>
        </div>

        <p className="font-bold text-[#0F172A] text-sm mb-2">{item.name}</p>

        {/* Chips */}
        <div className="flex items-center gap-2 flex-wrap mb-2.5">
          <span className="flex items-center gap-1 text-xs text-[#64748B] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" /> {item.deadline}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#64748B] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
            <Thermometer className="w-3 h-3" /> {item.temperature}
          </span>
          {item.status === 'menunggu-kurir' && item.courier && (
            <span className="flex items-center gap-1 text-xs text-[#B45309] bg-[#FFF1E0] px-2 py-0.5 rounded-full font-medium">
              <Bike className="w-3 h-3" /> {item.courier} • {item.courierEta}
            </span>
          )}
          {item.status === 'dalam-penjemputan' && item.courierVehicle && (
            <span className="flex items-center gap-1 text-xs text-[#4338CA] bg-[#EEF0FF] px-2 py-0.5 rounded-full font-medium">
              <Bike className="w-3 h-3" /> {item.courierVehicle}
            </span>
          )}
          {item.status === 'tersalurkan' && item.recipient && (
            <span className="flex items-center gap-1 text-xs text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-medium">
              <CheckCircle2 className="w-3 h-3" /> {item.recipient}
            </span>
          )}
          {item.status === 'tersalurkan' && item.recipientTime && (
            <span className="flex items-center gap-1 text-xs text-[#64748B] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-[#15803D]" /><CheckCircle2 className="w-3 h-3 text-[#15803D] -ml-2" /> {item.recipientTime}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2">
          {(item.status === 'siap-jemput' || item.status === 'menunggu-verifikasi') && (
            <>
              <button onClick={onUbahStok} className="text-xs border border-[#E5E7EB] bg-[#EEF0FF] text-[#4338CA] rounded-lg px-3 py-1.5 font-medium hover:bg-[#E0E7FF] transition-colors">
                Ubah Stok
              </button>
              <button onClick={onDetail} className="text-xs bg-[#15803D] text-white rounded-lg px-3 py-1.5 font-semibold hover:bg-[#166534] transition-colors">
                Detail
              </button>
            </>
          )}
          {item.status === 'menunggu-kurir' && (
            <>
              <button onClick={onDetail} className="text-xs bg-[#FFF1E0] text-[#B45309] border border-[#FDE68A] rounded-lg px-3 py-1.5 font-medium hover:bg-[#FEF3C7] transition-colors">
                Pantau Kurir
              </button>
              <button onClick={onDetail} className="text-xs border border-[#E5E7EB] rounded-lg px-3 py-1.5 font-medium text-[#64748B] hover:bg-gray-50 transition-colors">
                Detail
              </button>
            </>
          )}
          {item.status === 'dalam-penjemputan' && (
            <button onClick={onDetail} className="text-xs border border-[#E5E7EB] rounded-lg px-3 py-1.5 font-medium text-[#64748B] hover:bg-gray-50 transition-colors">
              Lihat Rincian
            </button>
          )}
          {item.status === 'tersalurkan' && (
            <button onClick={onDetail} className="flex items-center gap-1.5 text-xs bg-[#DCFCE7] text-[#15803D] rounded-lg px-3 py-1.5 font-semibold hover:bg-[#BBF7D0] transition-colors">
              <FileText className="w-3.5 h-3.5" /> Bukti Terima
            </button>
          )}
          {item.status === 'ditolak' && (
            <button onClick={onDetail} className="text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-1.5 font-medium hover:bg-red-100 transition-colors">
              Lihat Alasan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── Main Page ──────────────────────────────

export default function ProviderSurplus() {
  const navigate = useNavigate();
  const { surplusList, updateSurplus } = useProvider();

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('deadline');
  const [page, setPage] = useState(1);
  const [detailItem, setDetailItem] = useState<SurplusItem | null>(null);
  const [ubahStokItem, setUbahStokItem] = useState<SurplusItem | null>(null);

  // Stat counts
  const aktifCount = surplusList.filter(i => i.status === 'siap-jemput').length;
  const penjemputanCount = surplusList.filter(i => i.status === 'menunggu-kurir' || i.status === 'dalam-penjemputan').length;
  const tersalurkanCount = surplusList.filter(i => i.status === 'tersalurkan').length;

  // Filter labels with live counts
  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: `Semua (${surplusList.length})` },
    { key: 'aktif', label: `Aktif & Tersedia (${aktifCount})` },
    { key: 'menunggu', label: `Menunggu Kurir (${surplusList.filter(i => i.status === 'menunggu-kurir').length})` },
    { key: 'penjemputan', label: `Dalam Penjemputan (${surplusList.filter(i => i.status === 'dalam-penjemputan').length})` },
    { key: 'selesai', label: `Selesai / Terdistribusi (${tersalurkanCount})` },
  ];

  const filtered = useMemo(() => {
    let list = surplusList;
    if (activeFilter === 'aktif') list = list.filter(i => i.status === 'siap-jemput');
    else if (activeFilter === 'menunggu') list = list.filter(i => i.status === 'menunggu-kurir');
    else if (activeFilter === 'penjemputan') list = list.filter(i => i.status === 'dalam-penjemputan');
    else if (activeFilter === 'selesai') list = list.filter(i => i.status === 'tersalurkan' || i.status === 'ditolak');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.batchId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [surplusList, activeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(key: FilterKey) {
    setActiveFilter(key);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#F8F8FD] p-6">
      {/* Modals */}
      {detailItem && <DetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
      {ubahStokItem && (
        <UbahStokModal
          item={ubahStokItem}
          onClose={() => setUbahStokItem(null)}
          onSave={(qty) => { updateSurplus(ubahStokItem.id, { quantity: qty }); }}
        />
      )}

      {/* Top badge row */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
          <span className="w-4 h-4 rounded bg-[#EEF0FF] flex items-center justify-center">🏪</span>
          <span className="font-semibold text-[#0F172A]">Dapur Grand Bakery</span>
          <span>•</span>
          <span>Outlet Sahid</span>
        </div>
        <span className="text-xs font-semibold text-[#15803D]">● Siaga Penyaluran Aktif</span>
      </div>

      {/* Page heading */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">Surplus Saya</h1>
          <p className="text-sm text-[#64748B] mt-1">Kelola ketersediaan donasi dan status penjemputan mitra.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] bg-white text-[#64748B] rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Ekspor Log
          </button>
          <button
            onClick={() => navigate('/provider/surplus/baru')}
            className="flex items-center gap-1.5 bg-[#15803D] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#166534] transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Surplus Baru
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Aktif Tersedia', value: `${aktifCount} Paket`, icon: <CheckCircle className="w-4 h-4 text-[#15803D]" />, bg: 'bg-[#DCFCE7]' },
          { label: 'Penjemputan', value: `${penjemputanCount} Paket`, icon: <Bike className="w-4 h-4 text-[#B45309]" />, bg: 'bg-[#FFF1E0]' },
          { label: 'Tersalurkan', value: `${tersalurkanCount} Paket`, icon: <ClipboardCheck className="w-4 h-4 text-[#4338CA]" />, bg: 'bg-[#EEF0FF]' },
          { label: 'Terselamatkan', value: '2.840 Porsi', icon: <Heart className="w-4 h-4 text-[#15803D]" />, bg: 'bg-[#DCFCE7]' },
        ].map(({ label, value, icon, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">{label}</span>
              <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center`}>{icon}</div>
            </div>
            <p className="text-xl font-bold text-[#0F172A]">{value}</p>
          </div>
        ))}
      </div>

      {/* Main 2-column layout */}
      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0">
          {/* Search + Sort */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Cari nama makanan, kategori, atau ID batch surplus..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] text-[#0F172A] placeholder-[#9CA3AF]"
              />
            </div>
            <div className="flex items-center gap-1 border border-[#E5E7EB] bg-white rounded-xl px-3 py-2.5 shrink-0">
              <span className="text-xs text-[#64748B] font-medium whitespace-nowrap">Urutkan:</span>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="text-xs text-[#0F172A] font-semibold bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="deadline">Batas Waktu Terdekat</option>
                <option value="name">Nama A–Z</option>
                <option value="quantity">Porsi Terbanyak</option>
              </select>
            </div>
            <button className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] bg-white rounded-xl text-[#64748B] hover:bg-gray-50 transition-colors shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                className={`text-xs px-4 py-1.5 rounded-full font-semibold transition-colors border ${
                  activeFilter === f.key
                    ? 'bg-[#15803D] border-[#15803D] text-white'
                    : 'bg-white border-[#E5E7EB] text-[#64748B] hover:bg-gray-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-3">
            {paged.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-10 text-center text-[#64748B] text-sm">
                Tidak ada surplus yang cocok.
              </div>
            ) : (
              paged.map(item => (
                <SurplusCard
                  key={item.id}
                  item={item}
                  onDetail={() => setDetailItem(item)}
                  onUbahStok={() => setUbahStokItem(item)}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-5">
            <p className="text-sm text-[#64748B]">
              Menampilkan <span className="font-bold text-[#0F172A]">{Math.min(PAGE_SIZE * page, filtered.length)}</span> dari <span className="font-bold text-[#0F172A]">{filtered.length}</span> makanan surplus
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    page === p ? 'bg-[#15803D] text-white' : 'border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-72 shrink-0 flex flex-col gap-4">
          {/* Status Penjemputan Langsung */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0F172A]">Status Penjemputan Langsung</h3>
              <span className="text-xs font-semibold bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full">2 Aktif</span>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden mb-3" style={{ height: 120 }}>
              <svg width="100%" height="120" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="120" fill="#E8F0F8" />
                <line x1="0" y1="60" x2="280" y2="60" stroke="#CBD5E1" strokeWidth="10" />
                <line x1="0" y1="30" x2="280" y2="30" stroke="#D1D5DB" strokeWidth="5" />
                <line x1="70" y1="0" x2="70" y2="120" stroke="#D1D5DB" strokeWidth="5" />
                <line x1="180" y1="0" x2="180" y2="120" stroke="#D1D5DB" strokeWidth="5" />
                <text x="8" y="55" fontSize="7" fill="#6B7280" fontFamily="sans-serif">Jl. Sudirman</text>
                <polyline points="40,60 70,60 180,60 180,30 240,30" stroke="#15803D" strokeWidth="2.5" strokeDasharray="5 2.5" fill="none" strokeLinecap="round" />
                <circle cx="40" cy="60" r="8" fill="#15803D" />
                <text x="40" y="64" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">A</text>
                <circle cx="240" cy="30" r="8" fill="#B45309" />
                <text x="240" y="34" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">B</text>
                {/* Kurir pill */}
                <rect x="85" y="10" width="90" height="14" rx="7" fill="#15803D" opacity="0.9" />
                <text x="130" y="20" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">B 3821 SJK</text>
              </svg>
            </div>

            <div className="bg-[#FFF1E0] rounded-xl px-3 py-2 mb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-[#0F172A]">Kurir FoodRescue #</p>
                  <p className="text-[11px] text-[#64748B]">B 3821 SJK</p>
                </div>
                <span className="text-xs font-bold text-[#B45309] bg-[#FFF1E0] px-2 py-0.5 rounded-full">~8 Menit</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">Jl. Sudirman menuju Dapur Sahid</p>
              <p className="text-[11px] text-[#64748B]">1.4 km lagi</p>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Area Serah Terima: Loading Dock B2</span>
              <span className="font-bold text-[#15803D]">Standby Siap</span>
            </div>
          </div>

          {/* Pedoman Higienitas */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Pedoman Higienitas Serah Terima</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 mb-3">Protokol Keamanan Pangan Resmi</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Label & Jam', desc: 'Batas konsumsi tercantum jelas' },
                { label: 'Segel Higienis', desc: 'Makanan tersegel rapat' },
                { label: 'Suhu Aman', desc: 'Tetap di chiller hingga dijemput' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                  </div>
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0F172A]">{label}:</span> {desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[11px] text-[#64748B]">Standard Audit ISO 22000</span>
              <button className="text-xs text-[#15803D] font-bold hover:underline">Lihat SOP Lengkap ↗</button>
            </div>
          </div>

          {/* Efisiensi Penyaluran */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-[#0F172A]">Efisiensi Penyaluran Hari Ini</h3>
              <span className="text-lg font-bold text-[#15803D]">94.2%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex mt-2 mb-3">
              <div className="h-full bg-[#15803D]" style={{ width: '78%' }} />
              <div className="h-full bg-[#F59E0B]" style={{ width: '16%' }} />
            </div>
            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> Tersalurkan (78%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Siap Dijemput (16%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
