import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  PlusCircle,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  Check,
  X,
  AlertTriangle,
  QrCode,
  FileText,
  Eye,
  Info,
  CheckSquare,
  MessageSquare,
  Phone,
  ShieldCheck,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { usePengelola, ClaimItem, ClaimStatus } from '../PengelolaContext';

export function PengelolaKlaim() {
  const navigate = useNavigate();
  const {
    claimsList,
    cancelClaim,
    setIsChatModalOpen,
    setIsHotlineModalOpen,
  } = usePengelola();

  // Filters
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyToday, setOnlyToday] = useState(true);

  // Modals
  const [activeQrModal, setActiveQrModal] = useState<ClaimItem | null>(null);
  const [activeDetailModal, setActiveDetailModal] = useState<ClaimItem | null>(null);
  const [activeCancelModal, setActiveCancelModal] = useState<ClaimItem | null>(null);
  const [isHigieneModalOpen, setIsHigieneModalOpen] = useState(false);

  // Filtered claims
  const filteredClaims = useMemo(() => {
    return claimsList.filter(claim => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        claim.id.toLowerCase().includes(q) ||
        claim.title.toLowerCase().includes(q) ||
        claim.provider.toLowerCase().includes(q) ||
        claim.batchId.toLowerCase().includes(q);

      // Status
      let matchStatus = true;
      if (selectedFilter === 'siap-ambil') matchStatus = claim.status === 'siap-ambil';
      else if (selectedFilter === 'pending') matchStatus = claim.status === 'pending';
      else if (selectedFilter === 'selesai') matchStatus = claim.status === 'selesai';
      else if (selectedFilter === 'dibatalkan') matchStatus = claim.status === 'dibatalkan';

      // Date
      const matchDate = !onlyToday || claim.date === 'Hari Ini';

      return matchSearch && matchStatus && matchDate;
    });
  }, [claimsList, searchQuery, selectedFilter, onlyToday]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: claimsList.length,
      siapAmbil: claimsList.filter(c => c.status === 'siap-ambil').length,
      pending: claimsList.filter(c => c.status === 'pending').length,
      selesai: claimsList.filter(c => c.status === 'selesai').length,
      dibatalkan: claimsList.filter(c => c.status === 'dibatalkan').length,
    };
  }, [claimsList]);

  const handleDownloadLog = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Batch,Judul,Mitra,Porsi,Status\n' +
      claimsList.map(c => `"${c.id}","${c.batchId}","${c.title}","${c.provider}","${c.portion}","${c.statusLabel}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `log_klaim_surplus_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmCancelClaim = () => {
    if (!activeCancelModal) return;
    cancelClaim(activeCancelModal.id);
    setActiveCancelModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Klaim Surplus Saya
          </h1>
          <span className="bg-[#DCFCE7] text-[#15803D] font-bold text-xs px-2.5 py-1 rounded-full">
            {claimsList.length} Aktif & Riwayat
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleDownloadLog}
            className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>🕘</span>
            <span>Unduh Log</span>
          </button>
          <button
            onClick={() => navigate('/pengelola/ringkasan')}
            className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Cari Makanan Tersedia</span>
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setSelectedFilter('Semua')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedFilter === 'Semua'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Semua {counts.all}
          </button>

          <button
            onClick={() => setSelectedFilter('siap-ambil')}
            className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
              selectedFilter === 'siap-ambil'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span>Disetujui / Siap Ambil</span>
            <span className="text-[11px] opacity-80">{counts.siapAmbil}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
              selectedFilter === 'pending'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span>Pending</span>
            <span className="text-[11px] opacity-80">{counts.pending}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('selesai')}
            className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
              selectedFilter === 'selesai'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
            <span>Selesai Diterima</span>
            <span className="text-[11px] opacity-80">{counts.selesai}</span>
          </button>

          <button
            onClick={() => setSelectedFilter('dibatalkan')}
            className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-colors ${
              selectedFilter === 'dibatalkan'
                ? 'bg-[#15803D] text-white font-semibold shadow-xs'
                : 'bg-[#F0F2FA] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span>Dibatalkan</span>
            <span className="text-[11px] opacity-80">{counts.dibatalkan}</span>
          </button>
        </div>

        {/* Right Search & Date */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari ID klaim / mitra..."
              className="bg-[#F0F2FA] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] w-48 sm:w-56 focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
            />
          </div>

          <button
            onClick={() => setOnlyToday(!onlyToday)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              onlyToday
                ? 'bg-[#F0F2FA] text-[#0F172A] border-gray-300'
                : 'bg-white text-gray-400 border-gray-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Hari Ini</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Claims List (8 cols) + Right Info Panels (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left List */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {filteredClaims.map(claim => {
            // Determine strip and badge styling
            let borderStripColor = 'border-l-[#15803D]';
            let badgeBg = 'bg-[#DCFCE7] text-[#15803D]';

            if (claim.status === 'pending') {
              borderStripColor = 'border-l-[#F59E0B]';
              badgeBg = 'bg-[#FFF1E0] text-[#B45309]';
            } else if (claim.status === 'selesai') {
              borderStripColor = 'border-l-[#0F766E]';
              badgeBg = 'bg-[#CCFBF1] text-[#0F766E]';
            } else if (claim.status === 'dibatalkan') {
              borderStripColor = 'border-l-[#EF4444]';
              badgeBg = 'bg-[#FEE2E2] text-[#B91C1C]';
            }

            return (
              <div
                key={claim.id}
                className={`bg-white rounded-2xl border border-[#E5E7EB] border-l-4 ${borderStripColor} shadow-xs p-4 sm:p-5 overflow-hidden transition-shadow hover:shadow-sm`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-gray-100 font-mono text-xs font-bold text-[#0F172A] px-2 py-0.5 rounded">
                      {claim.id}
                    </span>
                    <span className="text-xs text-[#64748B]">
                      • Batch {claim.batchId}
                    </span>
                    {claim.timeAgo && (
                      <span className="text-xs text-[#94A3B8]">• {claim.timeAgo}</span>
                    )}
                    {claim.distributedBadge && (
                      <span className="text-xs font-semibold text-[#15803D]">
                        • {claim.distributedBadge}
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeBg}`}>
                    {claim.statusLabel}
                  </span>
                </div>

                {/* Content Row */}
                <div className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={claim.image}
                      alt={claim.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-[#0F172A] leading-snug truncate">
                        {claim.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5 truncate">{claim.provider}</p>
                      <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1 flex-wrap">
                        <span className="text-[#15803D] font-bold">{claim.portion} Porsi</span>
                        {claim.deadline && <span>• Batas: {claim.deadline}</span>}
                        {claim.hygiene && <span>• Higiene: {claim.hygiene}</span>}
                        {claim.temperature && <span>• {claim.temperature}</span>}
                        {claim.volunteer && <span>• {claim.volunteer}</span>}
                        {claim.co2Saved && <span>• {claim.co2Saved}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {claim.distance && (
                      <span className="text-xs font-medium text-[#64748B] block">
                        {claim.distance}
                      </span>
                    )}
                    {claim.receivedTime && (
                      <span className="text-xs text-[#64748B] block">
                        {claim.receivedTime}
                      </span>
                    )}
                    {claim.cancelType && (
                      <span className="text-xs font-semibold text-red-500 block">
                        {claim.cancelType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Warning bar for cancelled */}
                {claim.reason && (
                  <div className="bg-[#F8F9FE] rounded-xl p-2.5 text-xs text-[#64748B] flex items-center gap-2 mb-3 border border-red-100">
                    <Info className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{claim.reason}</span>
                  </div>
                )}

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-xs">
                    {claim.pickupPoint && (
                      <span className="text-[#15803D] font-medium flex items-center gap-1">
                        {claim.pickupPoint}
                      </span>
                    )}
                    {claim.note && (
                      <span className="text-[#64748B] italic">{claim.note}</span>
                    )}
                    {claim.receiptNo && (
                      <span className="text-[#0F766E] font-medium">{claim.receiptNo}</span>
                    )}
                    {claim.closedTime && (
                      <span className="text-[#94A3B8]">{claim.closedTime}</span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    {claim.status === 'siap-ambil' && (
                      <>
                        <button
                          onClick={() => setActiveDetailModal(claim)}
                          className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => setActiveQrModal(claim)}
                          className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Verifikasi</span>
                        </button>
                      </>
                    )}

                    {claim.status === 'pending' && (
                      <>
                        <button
                          onClick={() => setActiveCancelModal(claim)}
                          className="text-red-600 hover:text-red-700 text-xs font-semibold px-2.5 py-1.5 transition-colors"
                        >
                          Batalkan
                        </button>
                        <button
                          onClick={() => setActiveDetailModal(claim)}
                          className="bg-[#F0F2FA] hover:bg-slate-200 text-[#0F172A] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Detail
                        </button>
                      </>
                    )}

                    {claim.status === 'selesai' && (
                      <button
                        onClick={() => setActiveDetailModal(claim)}
                        className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                        <span>Bukti Terima</span>
                      </button>
                    )}

                    {claim.status === 'dibatalkan' && (
                      <button
                        onClick={() => setActiveDetailModal(claim)}
                        className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Rincian
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredClaims.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E7EB]">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-[#0F172A]">Tidak ada riwayat klaim</h3>
              <p className="text-xs text-[#64748B] mt-1">Tidak ada item yang sesuai dengan filter atau kata kunci pencarian.</p>
            </div>
          )}
        </div>

        {/* Right Side Info Panels (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Prosedur Penjemputan Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Prosedur Penjemputan</h3>
                <p className="text-[11px] text-[#64748B]">3 langkah serah terima</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <p className="text-xs text-[#0F172A] leading-snug pt-0.5">
                  Tunjukkan ID Klaim ke staf dapur
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <p className="text-xs text-[#0F172A] leading-snug pt-0.5">
                  Cek segel kemasan & suhu makanan
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <p className="text-xs text-[#0F172A] leading-snug pt-0.5">
                  Konfirmasi penerimaan di aplikasi
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsHigieneModalOpen(true)}
              className="w-full bg-[#F0F2FA] hover:bg-[#E2E8F0] text-[#0F172A] font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>📄</span>
              <span>Panduan Higiene</span>
            </button>
          </div>

          {/* Kapasitas Harian Penerima Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                KAPASITAS HARIAN PENERIMA
              </span>
              <span className="text-xs font-semibold text-[#15803D]">
                Tersedia 45 Porsi
              </span>
            </div>

            {/* Donut Progress SVG */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#15803D"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.62)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xl font-extrabold text-[#0F172A]">62%</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-1 border-t border-gray-100">
              <h4 className="font-bold text-sm text-[#0F172A]">
                Kwitang (Pusat Penyaluran)
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">70 / 115 porsi tersalurkan</p>
            </div>
          </div>

          {/* Bantuan Operasional Card */}
          <div className="bg-[#F0F2FA] rounded-2xl p-5 border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-xs text-[#0F172A]">Bantuan Operasional</h4>
            </div>

            <p className="text-xs text-[#64748B]">
              Kendala keterlambatan penjemputan atau kemasan rusak?
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="bg-white hover:bg-slate-50 text-[#0F172A] font-bold text-xs py-2 rounded-xl border border-gray-200 shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Live Chat</span>
              </button>
              <button
                onClick={() => setIsHotlineModalOpen(true)}
                className="bg-white hover:bg-slate-50 text-[#0F172A] font-bold text-xs py-2 rounded-xl border border-gray-200 shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Hotline</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-white rounded-xl p-3.5 border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
          <span>Audit Sistem FoodRescue Terverifikasi</span>
        </div>
        <div>
          <span>Porsi Terselamatkan: </span>
          <strong className="text-[#0F172A]">110</strong>
          <span className="mx-2">•</span>
          <span>Status: </span>
          <span className="text-[#15803D] font-bold">● Normal</span>
        </div>
      </div>

      {/* QR Code Verification Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E7EB] text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#0F172A]">Verifikasi Serah Terima</h3>
              <button
                onClick={() => setActiveQrModal(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Tunjukkan QR Code ini kepada petugas dapur <strong>{activeQrModal.provider}</strong> untuk validasi fisik donasi.
            </p>

            {/* Dummy QR Code Visual */}
            <div className="w-48 h-48 mx-auto bg-[#F8F9FD] p-3 rounded-2xl border-2 border-dashed border-[#15803D] flex flex-col items-center justify-center">
              <div className="grid grid-cols-6 gap-1.5 w-full h-full p-2 bg-white rounded-xl">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xs ${
                      idx % 2 === 0 || idx % 5 === 0 ? 'bg-[#0F172A]' : 'bg-emerald-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#F0F2FA] rounded-xl p-3">
              <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">
                ID KLAIM
              </div>
              <div className="font-mono text-base font-extrabold text-[#15803D]">
                {activeQrModal.id}
              </div>
              <div className="text-xs text-[#0F172A] font-semibold mt-1">
                {activeQrModal.title} ({activeQrModal.portion} Porsi)
              </div>
            </div>

            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
            >
              Selesai Ditunjukkan
            </button>
          </div>
        </div>
      )}

      {/* Detail / Bukti Terima Modal */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0F172A]">Rincian & Bukti Klaim</h3>
              <button
                onClick={() => setActiveDetailModal(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F8F8FD] rounded-xl p-4 space-y-2 text-xs border border-gray-200">
              <div className="flex justify-between">
                <span className="text-[#64748B]">ID Klaim:</span>
                <span className="font-mono font-bold text-[#0F172A]">{activeDetailModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Batch:</span>
                <span className="font-mono text-[#0F172A]">{activeDetailModal.batchId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Makanan:</span>
                <span className="font-bold text-[#0F172A]">{activeDetailModal.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Donatur / Mitra:</span>
                <span className="font-semibold text-[#0F172A]">{activeDetailModal.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Jumlah Alokasi:</span>
                <span className="font-bold text-[#15803D]">{activeDetailModal.portion} Porsi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Status:</span>
                <span className="font-bold text-[#0F172A]">{activeDetailModal.statusLabel}</span>
              </div>
              {activeDetailModal.receiptNo && (
                <div className="flex justify-between">
                  <span className="text-[#64748B]">No. Berita Acara:</span>
                  <span className="font-bold text-[#0F766E]">{activeDetailModal.receiptNo}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-[#EEF0FF] rounded-xl text-xs text-[#4F46E5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Dokumen serah terima tersimpan permanen di cloud audit log FoodRescue.</span>
            </div>

            <button
              onClick={() => setActiveDetailModal(null)}
              className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {activeCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E7EB] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#0F172A]">Batalkan Klaim Ini?</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Apakah Anda yakin ingin membatalkan klaim untuk <strong>{activeCancelModal.title}</strong>? Porsi donasi akan dikembalikan ke katalog umum.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveCancelModal(null)}
                className="flex-1 bg-[#F0F2FA] text-[#0F172A] text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-200"
              >
                Kembali
              </button>
              <button
                onClick={confirmCancelClaim}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Ya, Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panduan Higiene Modal */}
      {isHigieneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0F172A]">Panduan Higiene & SOP Logistik</h3>
              <button
                onClick={() => setIsHigieneModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#64748B] space-y-2.5 max-h-80 overflow-y-auto">
              <div className="p-3 bg-[#F0F2FA] rounded-xl text-[#0F172A]">
                <h4 className="font-bold text-xs mb-1">1. Pemeriksaan Suhu & Segel</h4>
                <p>Pastikan wadah pangan tertutup rapat dan berada pada ambang suhu aman: makanan hangat &gt;60°C atau makanan dingin &lt;4°C.</p>
              </div>
              <div className="p-3 bg-[#F0F2FA] rounded-xl text-[#0F172A]">
                <h4 className="font-bold text-xs mb-1">2. Waktu Maksimal Penyaluran</h4>
                <p>Makanan siap saji harus telah didistribusikan kepada warga penerima maksimal 3 jam sejak serah terima di lokasi donatur.</p>
              </div>
              <div className="p-3 bg-[#F0F2FA] rounded-xl text-[#0F172A]">
                <h4 className="font-bold text-xs mb-1">3. Perlengkapan Armada Transit</h4>
                <p>Relawan wajib mengenakan sarung tangan food-grade dan menggunakan cooler box / insulated thermal bag saat transit.</p>
              </div>
            </div>

            <button
              onClick={() => setIsHigieneModalOpen(false)}
              className="w-full bg-[#15803D] text-white font-bold text-xs py-2.5 rounded-xl hover:bg-[#166534]"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PengelolaKlaim;

