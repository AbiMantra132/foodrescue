import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Search,
  Building2,
  Clock,
  Trash2,
  Headphones,
  Leaf,
  ShoppingBag,
  Check,
  ChevronRight,
  X,
  AlertCircle,
} from 'lucide-react';
import { usePengelola, SurplusItem } from '../PengelolaContext';

export function PengelolaRingkasan() {
  const navigate = useNavigate();
  const {
    surplusList,
    selectedCartItem,
    setSelectedCartItem,
    createClaim,
    remainingQuota,
    setIsChatModalOpen,
  } = usePengelola();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);

  // Modal Ubah Alokasi State
  const [isEditPortionModalOpen, setIsEditPortionModalOpen] = useState(false);
  const [editPortionValue, setEditPortionValue] = useState<number>(25);
  const [portionError, setPortionError] = useState<string | null>(null);

  // Filtered surplus list
  const filteredSurplus = useMemo(() => {
    return surplusList.filter(item => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q);

      // Category
      const matchCat =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      // Radius
      const matchRadius =
        selectedRadius === null || item.distance <= selectedRadius;

      return matchSearch && matchCat && matchRadius;
    });
  }, [surplusList, searchQuery, selectedCategory, selectedRadius]);

  const handleSelectToClaim = (item: SurplusItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultQty = Math.min(item.portion, remainingQuota > 0 ? remainingQuota : item.portion);
    setSelectedCartItem({
      surplus: item,
      portion: defaultQty,
    });
  };

  const handleConfirmClaimNow = () => {
    if (!selectedCartItem) return;
    const res = createClaim(selectedCartItem.surplus, selectedCartItem.portion);
    if (res.success) {
      navigate('/pengelola/klaim');
    } else if (res.message) {
      setPortionError(res.message);
    }
  };

  const handleOpenEditPortion = () => {
    if (!selectedCartItem) return;
    setEditPortionValue(selectedCartItem.portion);
    setPortionError(null);
    setIsEditPortionModalOpen(true);
  };

  const handleSaveEditedPortion = () => {
    if (!selectedCartItem) return;
    if (editPortionValue < 1) {
      setPortionError('Jumlah porsi minimal 1');
      return;
    }
    if (editPortionValue > selectedCartItem.surplus.portion) {
      setPortionError(`Maksimal stok tersedia adalah ${selectedCartItem.surplus.portion} porsi`);
      return;
    }
    if (editPortionValue > remainingQuota) {
      setPortionError(`Melebihi sisa kuota harian (${remainingQuota} porsi)`);
      return;
    }

    setSelectedCartItem({
      ...selectedCartItem,
      portion: editPortionValue,
    });
    setIsEditPortionModalOpen(false);
    setPortionError(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D] mb-1">
            <Store className="w-4 h-4 text-[#15803D]" />
            <span>Katalog Surplus Pangan Tersedia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Eksplorasi Donasi Makanan Sekitar Posko
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Pilih donasi makanan layak konsumsi dari mitra penyedia di sekitar posko/yayasan Anda.
          </p>
        </div>

        {/* Kapasitas Posko Pill */}
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs">
            <span>📋</span>
            <span>Kapasitas Posko: {remainingQuota} / 150 Porsi Tersisa</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#E5E7EB]" />

      {/* Filter Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari nama makanan, mitra resto/hotel, atau area..."
            className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
          />
        </div>

        {/* Kategori & Radius Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Kategori */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-[#0F172A] mr-1">Kategori:</span>
            {['Semua', 'Siap Saji', 'Roti & Pastry', 'Sayur & Buah'].map(cat => {
              const count = cat === 'Semua' ? 18 : surplusList.filter(s => s.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                    isActive
                      ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                      : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {cat === 'Semua' ? `Semua (${count})` : cat}
                </button>
              );
            })}
          </div>

          <div className="w-px h-5 bg-[#E5E7EB] hidden xl:block" />

          {/* Radius */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#0F172A] mr-1">Radius:</span>
            <button
              onClick={() => setSelectedRadius(selectedRadius === 3 ? null : 3)}
              className={`px-3 py-1.5 rounded-full font-medium border transition-colors ${
                selectedRadius === 3
                  ? 'bg-[#15803D] text-white border-[#15803D] font-semibold'
                  : 'border-[#E5E7EB] text-[#64748B] hover:text-[#0F172A] bg-white'
              }`}
            >
              &lt; 3 km
            </button>
            <button
              onClick={() => setSelectedRadius(selectedRadius === 5 ? null : 5)}
              className={`px-3 py-1.5 rounded-full font-medium border transition-colors ${
                selectedRadius === 5
                  ? 'bg-[#15803D] text-white border-[#15803D] font-semibold'
                  : 'border-[#E5E7EB] text-[#64748B] hover:text-[#0F172A] bg-white'
              }`}
            >
              &lt; 5 km
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Grid + Right Panel */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: 2 Columns of Cards */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSurplus.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/pengelola/surplus/${item.id}`)}
                className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Photo Header */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Chip Top Left */}
                  <div className="absolute top-3 left-3 bg-[#15803D] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <span>✓</span> {item.partnerType}
                  </div>
                  {/* Chip Bottom Right */}
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {item.portion} Porsi
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Distance */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-[#0F172A] leading-snug group-hover:text-[#15803D] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="shrink-0 bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {item.distanceText}
                      </span>
                    </div>

                    {/* Provider & Area */}
                    <div className="flex items-center gap-1 text-xs text-[#64748B] mt-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                      <span className="truncate">{item.provider} • {item.area}</span>
                    </div>
                  </div>

                  {/* Deadline & Temp */}
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#64748B]">
                      <span>🕓</span>
                      <span>Batas: {item.deadline}</span>
                    </div>
                    <span className="text-[#15803D] font-semibold text-[11px]">
                      {item.temperatureInfo}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={e => handleSelectToClaim(item, e)}
                    className="w-full mt-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>✓</span> Pilih & Klaim
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSurplus.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E7EB]">
              <Store className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#0F172A]">Tidak ada donasi makanan ditemukan</h3>
              <p className="text-xs text-[#64748B] mt-1">Coba sesuaikan kata kunci pencarian, filter kategori, atau radius lokasi Anda.</p>
            </div>
          )}
        </div>

        {/* Right Panel: Pilihan Klaim Terpilih */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Card Pilihan Klaim Terpilih */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#15803D] flex items-center justify-center text-white">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-sm text-[#0F172A]">Pilihan Klaim Terpilih</h2>
              </div>
              <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {selectedCartItem ? '1 Item Dipilih' : '0 Item Dipilih'}
              </span>
            </div>

            {selectedCartItem ? (
              <div className="mt-4 space-y-4">
                {/* Item Box */}
                <div className="bg-[#EEF0FF] rounded-xl p-3.5 border border-indigo-100/50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-[#0F172A] leading-tight">
                        {selectedCartItem.surplus.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {selectedCartItem.surplus.provider} • {selectedCartItem.surplus.distanceText}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCartItem(null)}
                      className="text-[#64748B] hover:text-red-500 p-1 rounded-lg transition-colors"
                      title="Hapus pilihan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-indigo-200/50">
                    <span className="text-[#64748B]">Jumlah Alokasi:</span>
                    <span className="text-[#15803D] font-bold">{selectedCartItem.portion} Porsi</span>
                  </div>

                  <div className="bg-white/80 rounded-lg p-2.5 mt-2.5 text-[11px] text-[#64748B] flex items-center justify-between">
                    <span>Tenggat Pengambilan: Hari ini, {selectedCartItem.surplus.deadline}</span>
                  </div>
                </div>

                {/* Sisa Kuota Harian Posko */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Sisa Kuota Harian Posko:</span>
                    <span className="font-bold text-[#0F172A]">
                      {Math.max(0, remainingQuota - selectedCartItem.portion)} Porsi Tersisa
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#15803D] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(((150 - (remainingQuota - selectedCartItem.portion)) / 150) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-right text-[11px] text-[#64748B]">
                    {150 - (remainingQuota - selectedCartItem.portion)} dari 150 porsi terisi hari ini
                  </div>
                </div>

                {portionError && (
                  <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-2.5 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{portionError}</span>
                  </div>
                )}

                {/* Konfirmasi Klaim Button */}
                <button
                  onClick={handleConfirmClaimNow}
                  className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>➤</span> Konfirmasi Klaim Sekarang
                </button>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#64748B]">Verifikasi instan via posko</span>
                  <button
                    onClick={handleOpenEditPortion}
                    className="text-[#15803D] font-semibold hover:underline"
                  >
                    Ubah Alokasi
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#64748B]">
                <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p>Belum ada donasi yang dipilih.</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">
                  Klik <strong>"Pilih & Klaim"</strong> pada salah satu kartu donasi di sebelah kiri.
                </p>
              </div>
            )}
          </div>

          {/* Card Butuh Bantuan Koordinasi */}
          <div className="bg-[#F0F2FA] rounded-2xl p-4 flex items-center justify-between border border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#0F172A]">Butuh Bantuan Koordinasi?</h4>
                <p className="text-[11px] text-[#64748B]">Hubungi tim operasional penerimaan pangan.</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatModalOpen(true)}
              className="text-[#15803D] font-bold text-xs hover:underline whitespace-nowrap pl-2"
            >
              Chat Bantuan
            </button>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-white rounded-xl p-3.5 border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#15803D] shrink-0" />
          <span>Makanan terverifikasi higienis di bawah naungan FoodRescue Indonesia.</span>
        </div>
        <div className="font-medium">
          <span>SOP Penerimaan</span>
          <span className="mx-2">•</span>
          <span>Pedoman Pangan Layak</span>
        </div>
      </div>

      {/* Modal Ubah Alokasi */}
      {isEditPortionModalOpen && selectedCartItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#0F172A]">Ubah Jumlah Alokasi</h3>
              <button
                onClick={() => setIsEditPortionModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs text-[#64748B] mb-2">{selectedCartItem.surplus.title}</p>
              <div className="flex items-center justify-between gap-3 bg-[#F0F2FA] p-2.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setEditPortionValue(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-lg font-bold text-[#0F172A]">{editPortionValue}</span>
                  <span className="text-xs text-[#64748B]"> / {selectedCartItem.surplus.portion} Porsi</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditPortionValue(prev =>
                      Math.min(selectedCartItem.surplus.portion, remainingQuota, prev + 1)
                    )
                  }
                  className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <p className="text-[11px] text-[#64748B] mt-2">
                Sisa kuota harian posko Anda saat ini: <strong>{remainingQuota} porsi</strong>
              </p>
            </div>

            {portionError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                {portionError}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditPortionModalOpen(false)}
                className="flex-1 bg-[#F0F2FA] text-[#0F172A] text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEditedPortion}
                className="flex-1 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PengelolaRingkasan;

