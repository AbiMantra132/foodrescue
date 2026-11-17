import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Search,
  Check,
  X,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Building2,
  CheckSquare,
  Square,
  ChevronDown,
} from 'lucide-react';
import { useAdmin, AdminQueueItem } from '../AdminContext';

export function AdminVerifikasi() {
  const {
    queueList,
    selectedItem,
    selectForInspection,
    toggleChecklist,
    approveBatch,
    rejectBatch,
    requestRevision,
    refreshQueue,
  } = useAdmin();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'Menunggu' | 'Mendesak'>('Semua');
  const [visibleCount, setVisibleCount] = useState(4);

  // Modal Tolak / Revisi
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Kemasan Rusak');
  const [rejectNotes, setRejectNotes] = useState('');
  const [rejectError, setRejectError] = useState<string | null>(null);

  // Counts
  const antreanCount = queueList.length;
  const mendesakCount = queueList.filter(q => q.isUrgent).length;
  const menungguCount = queueList.filter(q => q.status === 'belum_diperiksa').length;

  // Filtered queue
  const filteredQueue = useMemo(() => {
    return queueList.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.partner.toLowerCase().includes(q);

      let matchFilter = true;
      if (selectedFilter === 'Menunggu') matchFilter = item.status === 'belum_diperiksa';
      else if (selectedFilter === 'Mendesak') matchFilter = item.isUrgent;

      return matchSearch && matchFilter;
    });
  }, [queueList, searchQuery, selectedFilter]);

  const displayedQueue = filteredQueue.slice(0, visibleCount);

  // Check if current item's checklist is complete
  const isChecklistComplete =
    selectedItem?.checklist.packaging &&
    selectedItem?.checklist.visualAroma &&
    selectedItem?.checklist.timeRemaining;

  const handleApprove = () => {
    if (!selectedItem || !isChecklistComplete) return;
    approveBatch(selectedItem);
  };

  const handleConfirmReject = () => {
    if (!selectedItem) return;
    if (!rejectNotes.trim()) {
      setRejectError('Catatan verifikator wajib diisi.');
      return;
    }
    rejectBatch(selectedItem, rejectReason, rejectNotes);
    setIsRejectModalOpen(false);
    setRejectNotes('');
    setRejectError(null);
  };

  const handleConfirmRevision = () => {
    if (!selectedItem) return;
    if (!rejectNotes.trim()) {
      setRejectError('Catatan revisi wajib diisi agar mitra mengetahui bagian yang perlu diperbaiki.');
      return;
    }
    requestRevision(selectedItem, rejectNotes);
    setIsRejectModalOpen(false);
    setRejectNotes('');
    setRejectError(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Verifikasi Surplus
          </h1>
          <span className="bg-[#FFF1E0] text-[#B45309] font-bold text-xs px-3 py-1 rounded-full">
            {antreanCount} Perlu Review
          </span>
        </div>

        <button
          onClick={refreshQueue}
          className="bg-[#EEF0FF] hover:bg-indigo-100 text-[#0F172A] font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>Segarkan</span>
        </button>
      </div>

      {/* 3 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Antrean */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Antrean</div>
            <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
              {antreanCount} Batch
            </div>
          </div>
          <span className="bg-[#FFF1E0] text-[#B45309] text-[11px] font-bold px-2.5 py-1 rounded-md">
            {mendesakCount} Mendesak
          </span>
        </div>

        {/* Rata-rata Waktu SLA */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Rata-rata Waktu SLA</div>
            <div className="text-2xl font-extrabold text-[#15803D] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
              12 Mnt
            </div>
          </div>
          <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2.5 py-1 rounded-md">
            Target &lt;30 Mnt
          </span>
        </div>

        {/* Selesai Hari Ini */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Selesai Hari Ini</div>
            <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
              24 Batch
            </div>
          </div>
          <span className="bg-gray-100 text-[#64748B] text-[11px] font-bold px-2.5 py-1 rounded-md">
            21 Disetujui
          </span>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari donasi atau mitra..."
            className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedFilter('Semua')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              selectedFilter === 'Semua'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedFilter('Menunggu')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              selectedFilter === 'Menunggu'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Menunggu ({menungguCount})
          </button>
          <button
            onClick={() => setSelectedFilter('Mendesak')}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              selectedFilter === 'Mendesak'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Mendesak ({mendesakCount})
          </button>
        </div>
      </div>

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Queue List (8 cols) */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-[#0F172A]">Daftar Antrean</span>
            <span className="text-[#64748B]">
              {displayedQueue.length} dari {filteredQueue.length}
            </span>
          </div>

          <div className="space-y-3.5">
            {displayedQueue.map(item => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => selectForInspection(item)}
                  className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer shadow-xs hover:shadow-sm ${
                    isSelected ? 'border-[#15803D] ring-1 ring-[#15803D]' : 'border-[#E5E7EB]'
                  }`}
                >
                  {/* Top Row: Code + Time */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9]">
                    <span
                      className={`font-mono font-bold text-xs ${
                        isSelected ? 'text-[#15803D]' : 'text-[#0F172A]'
                      }`}
                    >
                      {item.code}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                        item.isRevision
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : item.isUrgent
                          ? 'bg-[#FFF1E0] text-[#B45309]'
                          : 'bg-[#EEF0FF] text-[#4F46E5]'
                      }`}
                    >
                      {item.timeRemaining}
                    </span>
                  </div>

                  {/* Body: Thumbnail + Details */}
                  <div className="py-3 flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm text-[#0F172A] truncate leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5 truncate">
                        {item.partner} • {item.distance}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1.5 flex-wrap">
                        <span className="text-[#15803D] font-bold">{item.portionInfo}</span>
                        <span>•</span>
                        <span className={item.isRedPrice ? 'text-red-500 font-medium' : ''}>
                          {item.priceInfo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                    <span
                      className={`font-medium flex items-center gap-1.5 ${
                        item.footerColor || 'text-[#64748B]'
                      }`}
                    >
                      {item.status === 'sedang_ditinjau' && (
                        <span className="w-2 h-2 rounded-full bg-amber-700 inline-block" />
                      )}
                      <span>{item.footerStatus}</span>
                    </span>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        selectForInspection(item);
                      }}
                      className={`font-bold px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        item.actionBtnText === 'Buka Inspeksi'
                          ? 'bg-[#15803D] hover:bg-[#166534] text-white shadow-xs'
                          : 'bg-[#EEF0FF] hover:bg-indigo-100 text-[#0F172A]'
                      }`}
                    >
                      {item.actionBtnText}
                    </button>
                  </div>
                </div>
              );
            })}

            {displayedQueue.length < filteredQueue.length && (
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="w-full py-2.5 text-xs font-semibold text-[#15803D] bg-white border border-[#E5E7EB] rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
              >
                Tampilkan lebih banyak antrean
              </button>
            )}

            {filteredQueue.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#E5E7EB] text-[#64748B] text-xs">
                Tidak ada antrean donasi yang sesuai filter.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Panel Inspeksi (5 cols) */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5">
          {selectedItem ? (
            <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4 sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#0F172A]">
                    {selectedItem.code}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                </div>
                <span className="text-xs text-[#64748B]">Verifikator: Rafi</span>
              </div>

              {/* Big Photo */}
              <div className="relative rounded-2xl overflow-hidden h-44 bg-slate-900 border border-gray-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#0F172A] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  {selectedItem.photoTime}
                </span>
              </div>

              {/* Partner Bar Lavender */}
              <div className="bg-[#EEF0FF] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#4F46E5] text-white font-bold text-xs flex items-center justify-center">
                    {selectedItem.partnerInitial}
                  </div>
                  <span className="font-bold text-xs text-[#0F172A]">
                    {selectedItem.partner}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#15803D]">
                  {selectedItem.partnerTier}
                </span>
              </div>

              {/* Batas Konsumsi & Penyimpanan Side-by-side */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#EEF0FF] rounded-xl p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-[#64748B] tracking-wider">
                    BATAS KONSUMSI
                  </div>
                  <div className="font-bold text-xs text-[#B45309]">
                    {selectedItem.consumptionDeadline}
                  </div>
                </div>

                <div className="bg-[#EEF0FF] rounded-xl p-3 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-[#64748B] tracking-wider">
                    PENYIMPANAN
                  </div>
                  <div className="font-bold text-xs text-[#0F172A]">
                    {selectedItem.storage}
                  </div>
                </div>
              </div>

              {/* Checklist Kelayakan */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  CHECKLIST KELAYAKAN
                </div>

                <div className="space-y-2">
                  <div
                    onClick={() => toggleChecklist('packaging')}
                    className="bg-[#EEF0FF] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-[#0F172A]">
                      Kemasan Rapat & Tersegel
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedItem.checklist.packaging
                          ? 'bg-[#15803D] text-white'
                          : 'border border-gray-300 bg-white'
                      }`}
                    >
                      {selectedItem.checklist.packaging && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleChecklist('visualAroma')}
                    className="bg-[#EEF0FF] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-[#0F172A]">
                      Kondisi Visual & Aroma Baik
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedItem.checklist.visualAroma
                          ? 'bg-[#15803D] text-white'
                          : 'border border-gray-300 bg-white'
                      }`}
                    >
                      {selectedItem.checklist.visualAroma && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleChecklist('timeRemaining')}
                    className="bg-[#EEF0FF] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-[#0F172A]">
                      Waktu Sisa Pengambilan Cukup (&gt;2 Jam)
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedItem.checklist.timeRemaining
                          ? 'bg-[#15803D] text-white'
                          : 'border border-gray-300 bg-white'
                      }`}
                    >
                      {selectedItem.checklist.timeRemaining && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Tolak & Setujui */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(true)}
                  className="w-1/3 bg-[#FEE2E2] hover:bg-red-200 text-[#B91C1C] font-bold text-xs py-3 rounded-xl transition-colors text-center"
                >
                  ✕ Tolak
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={!isChecklistComplete}
                  className="w-2/3 bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Setujui & Terbitkan</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#E5E7EB] text-[#64748B] text-xs">
              Pilih salah satu item antrean untuk memulai inspeksi.
            </div>
          )}
        </div>
      </div>

      {/* Modal Tolak / Minta Revisi */}
      {isRejectModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-base text-[#0F172A]">
                  Tolak / Minta Revisi Batch
                </h3>
              </div>
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Tentukan alasan ketidaksesuaian kurasi untuk <strong>{selectedItem.code} ({selectedItem.title})</strong>.
            </p>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-[#0F172A] block">Pilih Alasan Utama:</label>
              {[
                'Kemasan Rusak',
                'Label Kadaluarsa',
                'Foto Buram / Label Tidak Terbaca',
                'Suhu Tidak Aman',
                'Lainnya',
              ].map(reason => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={reason}
                    checked={rejectReason === reason}
                    onChange={() => setRejectReason(reason)}
                    className="text-[#15803D] focus:ring-[#15803D]"
                  />
                  <span className="text-[#0F172A]">{reason}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0F172A] block mb-1">
                Catatan Verifikator (Wajib):
              </label>
              <textarea
                rows={3}
                value={rejectNotes}
                onChange={e => setRejectNotes(e.target.value)}
                placeholder="Jelaskan detail ketidaksesuaian atau instruksi foto yang diperlukan mitra..."
                className="w-full bg-[#F0F2FA] rounded-xl p-3 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D] resize-none"
              />
            </div>

            {rejectError && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {rejectError}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmRevision}
                className="flex-1 bg-[#EEF0FF] hover:bg-indigo-100 text-[#4F46E5] text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Minta Revisi Foto
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 bg-[#FEE2E2] hover:bg-red-200 text-[#B91C1C] text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Tolak Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVerifikasi;

