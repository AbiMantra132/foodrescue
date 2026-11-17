import React, { useState, useMemo } from 'react';
import {
  Download,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Building2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdmin, AdminHistoryItem } from '../AdminContext';

export function AdminRiwayat() {
  const { historyList, showToast } = useAdmin();

  // Filters
  const [selectedTab, setSelectedTab] = useState<'Semua' | 'disetujui' | 'ditolak'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30 Hari Terakhir');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal Detail Catatan Log
  const [activeLogItem, setActiveLogItem] = useState<AdminHistoryItem | null>(null);

  // Counts
  const totalCount = historyList.length;
  const approvedCount = historyList.filter(h => h.status === 'disetujui').length;
  const rejectedCount = historyList.filter(h => h.status === 'ditolak').length;

  // Filtered List
  const filteredHistory = useMemo(() => {
    return historyList.filter(item => {
      // Tab filter
      if (selectedTab !== 'Semua' && item.status !== selectedTab) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.partner.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [historyList, selectedTab, searchQuery]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const handleDownloadReport = () => {
    const csvRows = [
      'ID,Batch,Kategori,Makanan,Detail,Mitra Donatur,Kota,Waktu,Respon SLA,Status,Catatan',
      ...filteredHistory.map(
        h =>
          `"${h.id}","${h.code}","${h.category}","${h.title}","${h.detail}","${h.partner}","${h.partnerCity}","${h.timeString}","${h.responseTimeSLA}","${h.statusLabel}","${h.notes || ''}"`
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laporan_verifikasi_surplus_${selectedPeriod.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan riwayat kurasi berhasil diunduh');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span className="font-bold text-[#15803D] uppercase tracking-wider">
              AUDIT LOG & KURASI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Riwayat Verifikasi
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Log keputusan kelayakan higienitas pangan dan pemenuhan standar SLA wilayah Jabodetabek.
          </p>
        </div>

        {/* Right dropdown & button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <select
            value={selectedPeriod}
            onChange={e => {
              setSelectedPeriod(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
          >
            <option value="7 Hari Terakhir">📅 7 Hari Terakhir</option>
            <option value="30 Hari Terakhir">📅 30 Hari Terakhir</option>
            <option value="90 Hari Terakhir">📅 90 Hari Terakhir</option>
          </select>

          <button
            onClick={handleDownloadReport}
            className="bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A] font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* 3 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Batch Selesai */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Total Batch Selesai</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
                {totalCount}
              </span>
              <span className="text-xs text-[#64748B]">batch terperiksa</span>
            </div>
            <div className="text-xs font-semibold text-[#15803D] mt-2">
              ↗ +18.4% vs bulan lalu
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Tingkat Kelayakan Pangan */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Tingkat Kelayakan Pangan</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
                90.1%
              </span>
              <span className="bg-[#15803D] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                {approvedCount} Lolos
              </span>
            </div>
            <div className="text-xs text-[#64748B] mt-2">
              {rejectedCount} batch ditolak higienitas / kemasan
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Waktu Respon Verifikator */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Waktu Respon Verifikator</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
                11.4
              </span>
              <span className="text-xs text-[#64748B]">menit / batch</span>
            </div>
            <div className="text-xs font-semibold text-[#15803D] mt-2">
              ✓ Target SLA &lt; 30 menit terpenuhi (99.2%)
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#FFF1E0] text-[#B45309] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Segmented Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Segmented Tabs */}
        <div className="inline-flex bg-[#F0F2FA] p-1 rounded-xl gap-1 text-xs">
          <button
            onClick={() => {
              setSelectedTab('Semua');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTab === 'Semua'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Semua ({totalCount})
          </button>
          <button
            onClick={() => {
              setSelectedTab('disetujui');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTab === 'disetujui'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Disetujui ({approvedCount})
          </button>
          <button
            onClick={() => {
              setSelectedTab('ditolak');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTab === 'ditolak'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Ditolak ({rejectedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari ID batch, nama makanan..."
            className="bg-white border border-[#E5E7EB] rounded-xl pl-9 pr-9 py-2 text-xs text-[#0F172A] w-64 sm:w-72 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
          />
          <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer" />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FE] text-[#64748B] text-[10px] uppercase font-bold tracking-wider border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3.5 px-4">BATCH & PRATINJAU</th>
                <th className="py-3.5 px-4">SURPLUS MAKANAN</th>
                <th className="py-3.5 px-4">MITRA DONATUR</th>
                <th className="py-3.5 px-4">WAKTU & RESPON</th>
                <th className="py-3.5 px-4">STATUS KURASI</th>
                <th className="py-3.5 px-4 text-right">RINCIAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#0F172A]">
              {displayedItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* BATCH & PRATINJAU */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-11 h-11 rounded-lg object-cover shrink-0 border border-gray-100"
                      />
                      <div>
                        <div className="font-mono font-bold text-xs text-[#0F172A]">
                          {item.code}
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">{item.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* SURPLUS MAKANAN */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-xs leading-snug">{item.title}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        item.isRedDetail ? 'text-rose-600 font-semibold' : 'text-[#64748B]'
                      }`}
                    >
                      {item.detail}
                    </div>
                  </td>

                  {/* MITRA DONATUR */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                      <span>{item.partner}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{item.partnerCity}</div>
                  </td>

                  {/* WAKTU & RESPON */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs text-[#0F172A]">{item.timeString}</div>
                    <div className="text-[11px] text-[#15803D] font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                      <span>{item.responseTimeSLA}</span>
                    </div>
                  </td>

                  {/* STATUS KURASI */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        item.status === 'disetujui'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEE2E2] text-[#B91C1C]'
                      }`}
                    >
                      {item.statusLabel}
                    </span>
                  </td>

                  {/* RINCIAN */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveLogItem(item)}
                      className="bg-[#EEF0FF] hover:bg-indigo-100 text-[#0F172A] font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Catatan Log
                    </button>
                  </td>
                </tr>
              ))}

              {displayedItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#64748B] text-xs">
                    Tidak ada data riwayat yang sesuai dengan pencarian atau filter tab.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Pagination */}
        <div className="p-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <div>
            Menampilkan {filteredHistory.length > 0 ? startIndex + 1 : 0} -{' '}
            {Math.min(startIndex + itemsPerPage, filteredHistory.length)} dari {filteredHistory.length} data kurasi
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded-md border border-[#E5E7EB] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
            >
              ‹ Sebelumnya
            </button>

            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#15803D] text-white'
                    : 'border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A]'
                }`}
              >
                {page}
              </button>
            ))}

            {totalPages > 3 && (
              <>
                <span className="px-1 text-gray-400">…</span>
                <button
                  onClick={() => setCurrentPage(15)}
                  className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                    currentPage === 15
                      ? 'bg-[#15803D] text-white'
                      : 'border border-[#E5E7EB] hover:bg-slate-50 text-[#0F172A]'
                  }`}
                >
                  15
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded-md border border-[#E5E7EB] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
            >
              Berikutnya ›
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail Catatan Log */}
      {activeLogItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#0F172A]">
                  {activeLogItem.code}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    activeLogItem.status === 'disetujui'
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#FEE2E2] text-[#B91C1C]'
                  }`}
                >
                  {activeLogItem.statusLabel}
                </span>
              </div>
              <button
                onClick={() => setActiveLogItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F8F8FD] rounded-xl p-4 space-y-2.5 text-xs border border-gray-200">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Nama Makanan:</span>
                <span className="font-bold text-[#0F172A]">{activeLogItem.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Mitra Donatur:</span>
                <span className="font-semibold text-[#0F172A]">{activeLogItem.partner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Waktu Verifikasi:</span>
                <span className="font-mono text-[#0F172A]">{activeLogItem.timeString}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Waktu Respon SLA:</span>
                <span className="font-semibold text-[#15803D]">{activeLogItem.responseTimeSLA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Verifikator:</span>
                <span className="font-semibold text-[#0F172A]">Rafi Pratama (ADM-VRF-092)</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#0F172A]">Catatan Keputusan:</span>
              <p className="text-xs text-[#64748B] bg-[#F0F2FA] rounded-xl p-3 leading-relaxed">
                {activeLogItem.notes || activeLogItem.detail}
              </p>
            </div>

            <div className="p-3 bg-[#EEF0FF] rounded-xl text-xs text-[#4F46E5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Log audit terenkripsi permanen pada database node FoodRescue Jabodetabek.</span>
            </div>

            <button
              onClick={() => setActiveLogItem(null)}
              className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRiwayat;

