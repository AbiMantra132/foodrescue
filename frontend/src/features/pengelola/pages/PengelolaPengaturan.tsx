import React, { useState } from 'react';
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Save,
  Lock,
  Eye,
  EyeOff,
  Shield,
  FileText,
  Radio,
  Check,
  X,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { usePengelola, PengelolaAccount } from '../PengelolaContext';

export function PengelolaPengaturan() {
  const { accountData, updateAccount, showToast } = usePengelola();

  // Form State
  const [formData, setFormData] = useState<PengelolaAccount>({ ...accountData });

  // Password State
  const [currentPassword, setCurrentPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Modal Ajukan Tiket
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketReason, setTicketReason] = useState('');

  const handleChange = (field: keyof PengelolaAccount, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount(formData);
    showToast('Perubahan tersimpan');
  };

  const handleResetProfile = () => {
    setFormData({ ...accountData });
    showToast('Form dikembalikan ke data awal');
  };

  const handleUpdatePassword = () => {
    setPasswordError(null);
    if (!newPassword || newPassword.length < 8) {
      setPasswordError('Kata sandi baru minimal 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setNewPassword('');
    setConfirmPassword('');
    showToast('Kata sandi berhasil diperbarui');
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketReason.trim()) return;
    setIsTicketModalOpen(false);
    setTicketReason('');
    showToast('Pengajuan tiket perluasan area berhasil dikirim ke Admin');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-1">
            <span className="text-[#64748B]">Beranda</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#15803D] font-bold">Pengaturan Akun</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Pengaturan Akun
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Kelola profil organisasi penerima, kontak penanggung jawab, dan preferensi penyaluran pangan darurat.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#EEF0FF] px-3.5 py-1.5 rounded-xl border border-indigo-100/60 flex items-center gap-2">
            <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">
              ID Lembaga
            </span>
            <span className="font-mono font-bold text-xs text-[#0F172A]">
              {accountData.institutionId}
            </span>
          </div>
          <div className="bg-[#DCFCE7] text-[#15803D] font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>✓</span> Mitra Terverifikasi
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left (8 cols) + Security & Legal Right (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Form Profile */}
        <div className="col-span-12 lg:col-span-8">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-5"
          >
            {/* Header section */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#15803D]" />
                <h2 className="font-bold text-base text-[#0F172A]">
                  Identitas Yayasan & Penanggung Jawab
                </h2>
              </div>
              <span className="text-xs text-[#64748B]">Update: {accountData.lastUpdated}</span>
            </div>

            {/* Row 1: Nama Lembaga & Nama PIC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#0F172A]">
                    Nama Lembaga / Yayasan
                  </label>
                  <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Resmi
                  </span>
                </div>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={e => handleChange('institutionName', e.target.value)}
                    className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#0F172A]">
                    Nama Penanggung Jawab (PIC)
                  </label>
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                    Koordinator
                  </span>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.picName}
                    onChange={e => handleChange('picName', e.target.value)}
                    className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & No. HP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#0F172A]">
                    Email Resmi Akun
                  </label>
                  <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    🔒 Terkunci
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.officialEmail}
                    readOnly
                    className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-24 py-2.5 text-xs text-[#64748B] cursor-not-allowed"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    Terverifikasi
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">Hubungi bantuan untuk ubah domain.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#0F172A]">
                    Kontak Aktif / WhatsApp
                  </label>
                  <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Siaga
                  </span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                </div>
                <p className="text-[11px] text-[#64748B] mt-1">
                  Nomor koordinasi donatur sebelum kurir berangkat.
                </p>
              </div>
            </div>

            {/* Row 3: Alamat Titik Penyaluran & Dapur Transit */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Alamat Titik Penyaluran & Dapur Transit
                </label>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                  Hub Utama
                </span>
              </div>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  className="w-full bg-[#F0F2FA] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D] resize-none"
                />
              </div>
            </div>

            {/* Row 4: Kapasitas Harian Box */}
            <div className="bg-[#F0F2FA] rounded-xl p-3.5 border border-[#E5E7EB] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#15803D]" />
                  <span className="text-xs font-bold text-[#0F172A]">
                    Kapasitas Harian Distribusi Pangan
                  </span>
                </div>
                <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded">
                  Standar Logistik
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <input
                  type="text"
                  value={formData.dailyCapacity}
                  onChange={e => handleChange('dailyCapacity', e.target.value)}
                  className="bg-white rounded-lg px-3 py-1.5 text-xs font-bold text-[#0F172A] w-44 border border-gray-200 focus:ring-2 focus:ring-[#15803D]"
                />
                <span className="text-[11px] text-[#64748B]">
                  Batas maksimal surplus pangan layak santap (&lt; 3 jam pasca-pengambilan).
                </span>
              </div>
            </div>

            {/* Row 5: Deskripsi Profil Lembaga */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Deskripsi Profil Lembaga
                </label>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                  Tampil ke Donatur
                </span>
              </div>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                className="w-full bg-[#F0F2FA] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D] resize-none"
              />
              <p className="text-[11px] text-[#64748B] mt-1">
                Ditampilkan pada tanda terima digital bagi mitra hotel & katering.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleResetProfile}
                className="bg-[#F0F2FA] hover:bg-slate-200 text-[#0F172A] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Keamanan Akun & Legalitas */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Card Keamanan Akun */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#15803D]" />
                <h3 className="font-bold text-sm text-[#0F172A]">Keamanan Akun</h3>
              </div>
              <Shield className="w-4 h-4 text-gray-300" />
            </div>

            <div className="space-y-3">
              {/* Kata Sandi Saat Ini */}
              <div>
                <label className="text-xs font-medium text-[#64748B] block mb-1">
                  Kata Sandi Saat Ini
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#F0F2FA] rounded-xl pl-9 pr-9 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Kata Sandi Baru */}
              <div>
                <label className="text-xs font-medium text-[#64748B] block mb-1">
                  Kata Sandi Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min. 8 karakter kombinasi"
                    className="w-full bg-[#F0F2FA] rounded-xl pl-9 pr-9 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Kata Sandi Baru */}
              <div>
                <label className="text-xs font-medium text-[#64748B] block mb-1">
                  Konfirmasi Kata Sandi Baru
                </label>
                <div className="relative">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full bg-[#F0F2FA] rounded-xl pl-9 pr-9 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                  {passwordError}
                </div>
              )}

              <button
                type="button"
                onClick={handleUpdatePassword}
                className="w-full bg-[#EEF0FF] hover:bg-indigo-100 text-[#15803D] font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🔄</span>
                <span>Perbarui Kata Sandi</span>
              </button>
            </div>
          </div>

          {/* Card Legalitas & Wilayah Kerja */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#15803D]" />
                <h3 className="font-bold text-sm text-[#0F172A]">Legalitas & Wilayah Kerja</h3>
              </div>
              <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
                Sah & Aktif
              </span>
            </div>

            {/* Document list */}
            <div className="space-y-2.5">
              <div className="bg-[#F0F2FA] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">Akta Pendirian Yayasan</h4>
                    <p className="text-[11px] text-gray-500">No. AHU-0019284.AH.01.04</p>
                  </div>
                </div>
                <span className="text-[#15803D] font-bold text-xs">✓ Valid</span>
              </div>

              <div className="bg-[#F0F2FA] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">SK Kemenkumham RI</h4>
                    <p className="text-[11px] text-gray-500">Terverifikasi 2024–2029</p>
                  </div>
                </div>
                <span className="text-[#15803D] font-bold text-xs">✓ Aktif</span>
              </div>
            </div>

            {/* Cakupan Radius Pangan */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                  <Radio className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Cakupan Radius Pangan</span>
                </div>
                <span className="text-[11px] text-[#64748B]">Maks. 5 km</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {['Senen', 'Johar Baru', 'Cempaka Putih'].map(kec => (
                  <span
                    key={kec}
                    className="bg-[#EEF0FF] text-[#0F172A] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span>{kec}</span>
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-[#64748B] pt-0.5 leading-snug">
                Notifikasi surplus disinkronkan otomatis berdasar lokasi donatur terdekat.
              </p>
            </div>

            {/* Alert hijau muda */}
            <div className="bg-[#DCFCE7] rounded-xl p-3 flex items-center justify-between text-xs text-[#15803D]">
              <span className="font-medium">ⓘ Perluasan area penerima manfaat?</span>
              <button
                type="button"
                onClick={() => setIsTicketModalOpen(true)}
                className="font-bold underline hover:text-[#166534]"
              >
                Ajukan Tiket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ajukan Tiket */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0F172A]">Tiket Perluasan Wilayah</h3>
              <button
                onClick={() => setIsTicketModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Ajukan perluasan cakupan kelurahan atau kecamatan distribusi logistik pangan posko Anda. Tim FoodRescue akan memvalidasi armada transit dalam 1x24 jam.
            </p>

            <form onSubmit={handleSubmitTicket} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#0F172A] block mb-1">
                  Kecamatan / Area Tambahan yang Diajukan
                </label>
                <textarea
                  rows={3}
                  required
                  value={ticketReason}
                  onChange={e => setTicketReason(e.target.value)}
                  placeholder="Contoh: Menteng, Gambir, Kemayoran (karena adanya penambahan 2 posko satelit)..."
                  className="w-full bg-[#F0F2FA] rounded-xl p-3 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="flex-1 bg-[#F0F2FA] text-[#0F172A] text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PengelolaPengaturan;

