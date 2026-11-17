import React, { useState, useRef } from 'react';
import {
  UserCheck,
  Shield,
  CheckCircle2,
  Lock,
  Camera,
  Info,
  Check,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';
import { useAdmin, AdminProfile } from '../AdminContext';

export function AdminPengaturan() {
  const { profile, updateProfile, showToast } = useAdmin();

  // Form states
  const [formData, setFormData] = useState<AdminProfile>({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState('currentpassword123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);

  const handleProfileChange = (field: keyof AdminProfile, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    showToast('Perubahan tersimpan');
  };

  const handleResetProfile = () => {
    setFormData({ ...profile });
    showToast('Data dikembalikan ke nilai awal');
  };

  const handleUpdatePassword = () => {
    setPassError(null);
    if (!newPassword || newPassword.length < 8) {
      setPassError('Kata sandi baru minimal 8 karakter unik.');
      return;
    }
    // Wajib kombinasi huruf besar, angka, dan simbol
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    if (!hasUpperCase || !hasNumber || !hasSpecial) {
      setPassError('Kata sandi wajib mengandung kombinasi huruf besar, angka, dan simbol.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setNewPassword('');
    setConfirmPassword('');
    showToast('Kata sandi berhasil diperbarui');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: url }));
      updateProfile({ avatarUrl: url });
      showToast('Foto profil berhasil diperbarui');
    }
  };

  const handleDownloadSOP = () => {
    const textContent =
      'PANDUAN OPERASIONAL STANDAR (SOP) KURASI HIGIENITAS FOODRESCUE INDONESIA v2.4\n\n' +
      '1. Kemasan Primer Rapat & Tersegel Utuh (bebas kontaminasi luar).\n' +
      '2. Foto Wajib Menampilkan Label Waktu / Tanggal produksi.\n' +
      '3. Masa Layak Konsumsi Minimal 2 Jam pasca persetujuan admin.\n\n' +
      'Diterbitkan oleh Tim Manajemen Logistik & Kualitas FoodRescue Jabodetabek.';
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SOP_Kurasi_Pangan_FoodRescue_v2.4.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Panduan SOP berhasil diunduh');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-1">
            <span className="font-bold text-[#15803D] uppercase tracking-wider">
              KONFIGURASI SISTEM
            </span>
            <span className="text-[#64748B]">• SLA Jabodetabek Siaga</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Pengaturan Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Kelola preferensi akun verifikator dan kriteria kurasi pangan
          </p>
        </div>

        <div className="shrink-0">
          <span className="bg-[#EEF0FF] text-[#4F46E5] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span>Status Akun: {profile.nodeStatus}</span>
          </span>
        </div>
      </div>

      <div className="h-px bg-[#E5E7EB]" />

      {/* Main Grid: Form Left (8 cols) + Info Right (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Card Profil Verifikator */}
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#0F172A]">
                    Profil Verifikator
                  </h2>
                  <p className="text-[11px] text-[#64748B]">
                    Identitas resmi dalam rantai pengawasan pangan surplus
                  </p>
                </div>
              </div>
              <span className="bg-[#DCFCE7] text-[#15803D] text-xs font-semibold px-2.5 py-1 rounded-full">
                ✓ Aktif Terverifikasi
              </span>
            </div>

            {/* Profile Avatar Box Lavender */}
            <div className="bg-[#EEF0FF] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {formData.avatarUrl ? (
                  <img
                    src={formData.avatarUrl}
                    alt={formData.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#15803D] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    RP
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0F172A]">{formData.name}</span>
                    <span className="bg-white text-[#0F172A] text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                      {formData.shift}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{formData.authority}</p>
                </div>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-gray-500" />
                  <span>Ganti Foto</span>
                </button>
              </div>
            </div>

            {/* Fields 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleProfileChange('name', e.target.value)}
                  className="w-full bg-[#F0F2FA] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  ID Petugas / NIP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nip}
                    readOnly
                    className="w-full bg-[#F0F2FA] rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-[#64748B] cursor-not-allowed"
                  />
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Alamat Email Resmi
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleProfileChange('email', e.target.value)}
                  className="w-full bg-[#F0F2FA] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0F172A] block mb-1.5">
                  Nomor WhatsApp Siaga
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => handleProfileChange('phone', e.target.value)}
                  className="w-full bg-[#F0F2FA] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={handleResetProfile}
                className="bg-[#F0F2FA] hover:bg-slate-200 text-[#0F172A] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>💾</span>
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>

          {/* Card Keamanan Akun & Kredensial */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F1F5F9]">
              <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base text-[#0F172A]">
                  Keamanan Akun & Kredensial
                </h2>
                <p className="text-[11px] text-[#64748B]">
                  Pembaruan rutin kata sandi berkala untuk perlindungan data logistik
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* Kata Sandi Saat Ini */}
              <div>
                <label className="text-xs font-medium text-[#64748B] block mb-1">
                  Kata Sandi Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#F0F2FA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
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

              {/* Kata Sandi Baru & Konfirmasi 2 Kolom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-medium text-[#64748B] block mb-1">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Minimal 8 karakter unik"
                      className="w-full bg-[#F0F2FA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
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

                <div>
                  <label className="text-xs font-medium text-[#64748B] block mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi baru"
                      className="w-full bg-[#F0F2FA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#15803D]"
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
              </div>

              {/* Bar Lavender Info Kata Sandi */}
              <div className="bg-[#EEF0FF] rounded-xl p-3 flex items-start gap-2 text-xs text-[#0F172A]">
                <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#64748B] leading-relaxed">
                  Kata sandi wajib mengandung kombinasi huruf besar, angka, dan simbol. Terakhir diperbarui 42 hari yang lalu.
                </span>
              </div>

              {passError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {passError}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Perbarui Kata Sandi</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Card Kriteria Kurasi Standar */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Kriteria Kurasi Standar</h3>
                <p className="text-[11px] text-[#64748B]">
                  Checklist mandatori verifikasi keamanan pangan
                </p>
              </div>
              <span className="bg-[#EEF0FF] text-[#4F46E5] text-[11px] font-bold px-2 py-0.5 rounded">
                SOP v2.4
              </span>
            </div>

            {/* 3 Lavender Boxes with Checkmark */}
            <div className="space-y-3">
              <div className="bg-[#EEF0FF] rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#15803D] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">
                    Kemasan Primer Rapat & Tersegel Utuh
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    Wadah bebas dari keretakan, kebocoran, atau paparan kontaminasi luar.
                  </p>
                </div>
              </div>

              <div className="bg-[#EEF0FF] rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#15803D] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">
                    Foto Wajib Menampilkan Label Waktu / Tanggal
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    Mitra harus menyertakan foto cap waktu produksi atau label kemasan.
                  </p>
                </div>
              </div>

              <div className="bg-[#EEF0FF] rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#15803D] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">
                    Masa Layak Konsumsi Minimal 2 Jam
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    Waktu konsumsi tersisa minimal 2 jam terhitung sejak lolos verifikasi admin.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
              <span className="text-[#64748B] text-[11px]">
                🔄 Pembaruan SOP: Versi 2.4 (Aktif)
              </span>
              <button
                type="button"
                onClick={handleDownloadSOP}
                className="font-bold text-[#15803D] hover:underline cursor-pointer"
              >
                Unduh Panduan →
              </button>
            </div>
          </div>

          {/* Card Tingkat Akurasi Verifikasi */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#0F172A]">Tingkat Akurasi Verifikasi</h4>
                <p className="text-[11px] text-[#64748B]">99.4% lolos audit higienitas bulanan</p>
              </div>
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] font-bold text-xs px-2.5 py-1 rounded-md">
              Tier 1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPengaturan;

