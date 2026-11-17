import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Thermometer,
  Info,
  HandHeart,
  MessageCircle,
  ExternalLink,
  Plus,
  Minus,
  Check,
  X,
  Navigation,
  ZoomIn,
  ZoomOut,
  Croissant,
} from 'lucide-react';
import { usePengelola } from '../PengelolaContext';

export function PengelolaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    surplusList,
    createClaim,
    remainingQuota,
    setIsChatModalOpen,
  } = usePengelola();

  // Find surplus item by ID or default to pastry
  const item = surplusList.find(s => s.id === id) || surplusList[0];

  const [portion, setPortion] = useState<number>(15);
  const [agreed, setAgreed] = useState<boolean>(true);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const maxPortion = item.portion;
  const estWeight = (portion * 0.22).toFixed(1);
  const targetMin = portion;
  const targetMax = Math.round(portion * 1.33);

  const handleConfirm = () => {
    if (!agreed || portion < 1) return;
    const res = createClaim(item, portion);
    if (res.success) {
      navigate('/pengelola/klaim');
    } else if (res.message) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header / Breadcrumb Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/pengelola/ringkasan')}
            className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] hover:bg-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Surplus</span>
          </button>
          <span className="text-xs text-[#CBD5E1]">/</span>
          <span className="text-xs text-[#64748B]">Katalog Surplus</span>
          <span className="text-xs text-[#CBD5E1]">/</span>
          <span className="text-xs font-bold text-[#0F172A]">{item.title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-[#DCFCE7] text-[#15803D] font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block" />
            Tersedia untuk Diklaim
          </span>
          <span className="bg-gray-100 text-[#64748B] font-mono text-xs px-2.5 py-1 rounded-md font-medium">
            ID: {item.code}
          </span>
        </div>
      </div>

      {/* Main Grid: Detail + Right Allocation Summary */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Hero Photo Card */}
          <div className="relative rounded-3xl overflow-hidden h-72 md:h-84 shadow-sm bg-slate-900">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

            {/* Top Left Chips */}
            <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
              <span className="bg-white text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <span>🥐</span> Bakery & Pastry
              </span>
              <span className="bg-[#15803D] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <span>✓</span> Terverifikasi Higienis
              </span>
            </div>

            {/* Top Right Chip */}
            <div className="absolute top-4 right-4">
              <span className="bg-[#FFF1E0] text-[#B45309] font-bold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span>🕓</span> Batas Ambil: Hari ini {item.deadline}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#15803D] text-white text-xs font-extrabold px-2.5 py-1 rounded-md tracking-wide">
                    GRATIS • 100% DONASI
                  </span>
                  <span className="text-xs text-white/90 font-medium">
                    Est. Nilai {item.estPrice}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                  {item.title}
                </h1>
              </div>

              {/* Rating Chip */}
              <div className="shrink-0 bg-black/60 backdrop-blur-xs text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
                <span>★</span> {item.rating} <span className="text-white/70 font-normal">({item.reviewCount} ulasan)</span>
              </div>
            </div>
          </div>

          {/* Donor Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-[#0F172A] truncate">
                    {item.providerFullName}
                  </h3>
                  <span className="text-[#15803D] font-bold text-xs">✓</span>
                </div>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{item.address}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="bg-[#EEF0FF] hover:bg-indigo-100 text-[#4F46E5] text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Rute Lokasi</span>
              </button>
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="bg-[#EEF0FF] hover:bg-indigo-100 text-[#4F46E5] text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Staf</span>
              </button>
            </div>
          </div>

          {/* 4 Mini Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white rounded-2xl p-3.5 border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>TOTAL JUMLAH</span>
              </div>
              <div className="text-base font-bold text-[#0F172A] mt-1.5">{item.portion} Porsi</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Estimasi bobot {item.totalWeight}</div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>HIGIENITAS</span>
              </div>
              <div className="text-base font-bold text-[#0F172A] mt-1.5">{item.hygieneGrade}</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Kemasan segel & uji suhu</div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <Thermometer className="w-3.5 h-3.5 text-orange-600" />
                <span>PENYIMPANAN</span>
              </div>
              <div className="text-base font-bold text-[#0F172A] mt-1.5">{item.storage}</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Wadah kedap tertutup</div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>WAKTU MASAK</span>
              </div>
              <div className="text-base font-bold text-[#0F172A] mt-1.5">{item.cookTime}</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Batch sarapan hotel</div>
            </div>
          </div>

          {/* Card Informasi Alergen & Sertifikasi */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#4F46E5]" />
                <h3 className="font-bold text-sm text-[#0F172A]">Informasi Alergen & Sertifikasi</h3>
              </div>
              <span className="text-xs text-[#64748B]">Standar BPOM</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {item.allergens.map((alg, i) => (
                <span
                  key={i}
                  className="bg-[#EEF0FF] text-[#4F46E5] font-medium px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <span>🌾</span> {alg}
                </span>
              ))}
              <span className="bg-[#DCFCE7] text-[#15803D] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <span>✓</span> Halal MUI
              </span>
              <span className="bg-[#FFF1E0] text-[#B45309] font-semibold px-3 py-1 rounded-full">
                Bebas Pengawet Kimia
              </span>
            </div>
          </div>

          {/* Card Lokasi & Peta Penjemputan */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#15803D]" />
                <h3 className="font-bold text-sm text-[#0F172A]">Lokasi & Peta Penjemputan</h3>
              </div>
              <span className="bg-[#DCFCE7] text-[#15803D] font-semibold text-xs px-2.5 py-0.5 rounded-md">
                {item.distanceText} dari Yayasan
              </span>
            </div>

            {/* Stylized Static Map */}
            <div className="relative rounded-2xl overflow-hidden h-64 bg-[#EAF2EC] border border-[#E5E7EB]">
              {/* Map Illustration SVG */}
              <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="none">
                {/* Background block shapes */}
                <rect x="0" y="0" width="600" height="260" fill="#EAF2E9" />
                <rect x="40" y="20" width="160" height="100" rx="8" fill="#DDECE0" />
                <rect x="220" y="20" width="180" height="80" rx="8" fill="#DDECE0" />
                <rect x="420" y="30" width="150" height="110" rx="8" fill="#DDECE0" />
                <rect x="50" y="160" width="140" height="80" rx="8" fill="#DDECE0" />
                <rect x="230" y="170" width="170" height="70" rx="8" fill="#DDECE0" />
                <rect x="430" y="170" width="150" height="70" rx="8" fill="#DDECE0" />

                {/* Roads */}
                <path d="M 0 140 Q 300 130 600 145" stroke="#FFF7D6" strokeWidth="26" fill="none" />
                <path d="M 210 0 L 210 260" stroke="#FFF7D6" strokeWidth="22" fill="none" />
                <path d="M 410 0 L 410 260" stroke="#FFF7D6" strokeWidth="20" fill="none" />
                <path d="M 0 140 Q 300 130 600 145" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 6" fill="none" />

                {/* Route Path Green Dashed */}
                <path
                  d="M 120 210 L 210 140 L 320 135"
                  stroke="#15803D"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  fill="none"
                />
              </svg>

              {/* Pill Top Left */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0F172A] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                <span>Gerbang Muat Siap</span>
              </div>

              {/* Pill Top Right */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#0F172A] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <span>⚠️</span>
                <span>Rute Tercepat: 6 Mnt</span>
              </div>

              {/* Center Marker Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Marker icon */}
                <div className="w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center shadow-lg border-2 border-white mb-1.5 animate-bounce">
                  <Building2 className="w-4 h-4" />
                </div>
                {/* Info Card on Map */}
                <div className="bg-white rounded-xl p-2.5 shadow-md border border-gray-200 text-center whitespace-nowrap">
                  <div className="text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1">
                    <span>{item.providerFullName}</span>
                    <span className="text-[#15803D]">✓</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    {item.pickupLocation}
                  </div>
                </div>
              </div>

              {/* Pill Bottom Left */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                <span className="bg-white/95 backdrop-blur-xs text-[#0F172A] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  👤 PIC: {item.pic}
                </span>
                <span className="text-[11px] font-bold text-[#15803D] px-1">
                  Yayasan (Mulai)
                </span>
              </div>

              {/* Bottom Right Controls */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <div className="bg-white rounded-lg shadow-xs flex border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="p-1.5 hover:bg-gray-100 text-[#0F172A]"
                    title="Perbesar"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px bg-gray-200" />
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="p-1.5 hover:bg-gray-100 text-[#0F172A]"
                    title="Perkecil"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="bg-white shadow-xs rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#15803D]" />
                  <span>Buka Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ringkasan Alokasi Klaim (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4 sticky top-20">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-[#0F172A]">Ringkasan Alokasi Klaim</h2>
              <span className="bg-[#DCFCE7] text-[#15803D] font-bold text-xs px-2.5 py-0.5 rounded-full">
                ✓ Bebas Biaya
              </span>
            </div>

            {/* Sub */}
            <div className="text-xs text-[#64748B]">
              Biaya Pangan:{' '}
              <span className="text-[#15803D] font-bold">Gratis (Rp0)</span>
            </div>

            <div className="h-px bg-[#F1F5F9]" />

            {/* Stepper Section */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-[#64748B]">Jumlah Porsi Klaim</span>
                <button
                  onClick={() => setPortion(Math.min(maxPortion, remainingQuota))}
                  className="text-[#15803D] font-bold hover:underline"
                >
                  Ambil Semua ({maxPortion} Porsi)
                </button>
              </div>

              <div className="bg-[#F0F2FA] rounded-xl p-2.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPortion(prev => Math.max(1, prev - 1))}
                  disabled={portion <= 1}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#0F172A]">{portion}</span>
                  <span className="text-xs text-[#64748B]"> / {maxPortion} Porsi</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPortion(prev => Math.min(maxPortion, remainingQuota, prev + 1))}
                  disabled={portion >= Math.min(maxPortion, remainingQuota)}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Dynamic Estimation Box */}
            <div className="bg-[#F8F9FE] rounded-xl p-3.5 border border-[#E5E7EB] space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <span>👥</span> Target Penerima
                </span>
                <span className="font-bold text-[#0F172A]">
                  {targetMin}–{targetMax} Paket Distribusi
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <span>⚖️</span> Estimasi Berat
                </span>
                <span className="font-bold text-[#0F172A]">±{estWeight} kg</span>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#64748B]">Kapasitas Harian Yayasan</span>
                  <span className="text-[#15803D] font-bold">
                    Tersedia kuota {remainingQuota} porsi
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#15803D] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((portion / 60) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#64748B] mt-1.5">
                  Telah mengklaim {portion} dari 60 kapasitas maksimal hari ini.
                </p>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-[#0F172A] cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 rounded-sm border-gray-300 text-[#15803D] focus:ring-[#15803D] w-4 h-4"
              />
              <span className="leading-snug">
                Yayasan bersedia menjemput sesuai batas waktu (
                <strong>{item.deadline}</strong>) dan mematuhi SOP keamanan pangan.
              </span>
            </label>

            {errorMsg && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            {/* Buttons */}
            <button
              onClick={handleConfirm}
              disabled={!agreed || portion < 1}
              className="w-full bg-[#15803D] hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <HandHeart className="w-4 h-4" />
              <span>Konfirmasi & Ambil Surplus</span>
            </button>

            <button
              onClick={() => setIsChatModalOpen(true)}
              className="w-full bg-[#F0F2FA] hover:bg-[#E5E7EB] text-[#0F172A] font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#15803D]" />
              <span>Chat Penyedia / PIC Dapur</span>
            </button>

            <p className="text-[11px] text-center text-[#94A3B8] leading-tight">
              ID Penjemputan otomatis diterbitkan ke dasbor armada setelah konfirmasi.
            </p>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Rute & Titik Penjemputan Logistik</h3>
                <p className="text-xs text-[#64748B]">{item.providerFullName} • {item.address}</p>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-80 bg-slate-100 relative border border-gray-200">
              <iframe
                title="Google Maps Dummy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.495267156942!2d106.81881707586884!3d-6.198202993789517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f421a3eecde5%3A0xe54e3f4214ba4874!2sGrand%20Sahid%20Jaya%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="bg-[#F0F2FA] rounded-xl p-3 text-xs text-[#0F172A] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#15803D]">Instruksi Akses: </span>
                <span>Masuk melalui Gerbang Timur Jalan Sudirman, arahkan kendaraan ke Loading Dock B1. PIC: {item.pic}.</span>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="bg-[#15803D] text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#166534] shrink-0 ml-3"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PengelolaDetail;

