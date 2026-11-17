import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Headphones,
  CheckCircle,
  Store,
} from 'lucide-react';
import { useProvider, AccountData } from '../ProviderContext';

export default function ProviderPengaturan() {
  const { accountData, updateAccount } = useProvider();

  const [formData, setFormData] = useState<AccountData>({ ...accountData });
  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Password modal state
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwError, setPwError] = useState('');

  function handleChange(field: keyof AccountData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(f => ({ ...f, [field]: e.target.value }));
    };
  }

  function handleSave() {
    updateAccount(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCancel() {
    setFormData({ ...accountData });
  }

  function handlePasswordSave() {
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      setPwError('Semua field wajib diisi.');
      return;
    }
    if (pwForm.newPw.length < 8) {
      setPwError('Kata sandi baru minimal 8 karakter.');
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    setPwError('');
    setShowPasswordModal(false);
    setPwForm({ current: '', newPw: '', confirm: '' });
  }

  const inputCls = 'w-full h-14 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] transition';
  const inputNoPadCls = 'w-full h-14 px-4 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] transition';

  return (
    <div className="min-h-screen bg-[#F8F8FD] p-6">
      {/* Toast */}
      {saved && (
        <div className="fixed top-4 right-4 z-50 bg-[#15803D] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Perubahan berhasil disimpan
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] p-6">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Ubah Kata Sandi</h2>

            {pwError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-2.5">
                {pwError}
              </div>
            )}

            {(['current', 'newPw', 'confirm'] as const).map((field) => {
              const labels = { current: 'Kata Sandi Saat Ini', newPw: 'Kata Sandi Baru', confirm: 'Konfirmasi Kata Sandi Baru' };
              return (
                <div key={field} className="mb-4">
                  <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">{labels[field]}</label>
                  <div className="relative">
                    <input
                      type={showPw[field] ? 'text' : 'password'}
                      value={pwForm[field]}
                      onChange={e => setPwForm(f => ({ ...f, [field]: e.target.value }))}
                      className="w-full h-12 px-4 pr-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(s => ({ ...s, [field]: !s[field] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                    >
                      {showPw[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowPasswordModal(false); setPwError(''); setPwForm({ current: '', newPw: '', confirm: '' }); }}
                className="flex-1 border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#64748B] hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordSave}
                className="flex-1 bg-[#15803D] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#166534] transition-colors"
              >
                Simpan Kata Sandi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <span>Pengaturan</span>
        <span>›</span>
        <span className="font-semibold text-[#0F172A]">Pengaturan Akun</span>
      </nav>

      {/* Page heading */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">Pengaturan Akun</h1>
          <p className="text-sm text-[#64748B] mt-1">Kelola identitas akun pengguna, profil organisasi, dan kredensial akses.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCancel}
            className="border border-[#E5E7EB] bg-white text-[#64748B] rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-[#15803D] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#166534] transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="flex gap-6 items-start">
        {/* LEFT COLUMN (2/3) */}
        <div className="flex-[2] min-w-0 flex flex-col gap-5">

          {/* CARD 1: Data Akun & Profil */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 className="text-base font-bold text-[#0F172A]">Data Akun & Profil</h2>
              <span className="flex items-center gap-1 border border-[#15803D] text-[#15803D] text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                <CheckCircle className="w-3 h-3" /> Penyedia Terverifikasi
              </span>
            </div>
            <p className="text-xs text-[#64748B] mb-5">Informasi identitas entitas mitra dan kontak resmi terdaftar.</p>
            <div className="border-t border-[#E5E7EB] mb-5" />

            {/* Row 1: Nama + Peran */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                  Nama Lengkap / Organisasi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className={inputCls}
                  />
                </div>
                <p className="text-xs text-[#64748B] mt-1">Sesuai nama entitas terdaftar (maks. 150 karakter)</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">Peran (Role)</label>
                <div className="h-14 flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4">
                  <Store className="w-4 h-4 text-[#64748B] shrink-0" />
                  <span className="text-sm text-[#0F172A] font-medium">Penyedia</span>
                  <span className="ml-auto text-xs bg-[#DCFCE7] text-[#15803D] font-bold px-2 py-0.5 rounded-md">AKTIF</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">Role sistem: Penyedia Surplus Pangan</p>
              </div>
            </div>

            {/* Row 2: Email + Telepon */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className={`${inputCls} bg-[#F9FAFB] cursor-not-allowed opacity-70`}
                  />
                </div>
                <p className="text-xs text-[#64748B] mt-1">Email login utama akun penyedia</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    className={inputCls}
                  />
                </div>
                <p className="text-xs text-[#64748B] mt-1">WhatsApp operasional aktif untuk koordinasi penjemputan</p>
              </div>
            </div>

            {/* Row 3: Alamat Lengkap */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                <textarea
                  value={formData.address}
                  onChange={handleChange('address')}
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#15803D]/25 focus:border-[#15803D] transition resize-none"
                />
              </div>
              <p className="text-xs text-[#64748B] mt-1">Alamat fisik lokasi serah terima / loading dock surplus makanan</p>
            </div>

            {/* Row 4: Deskripsi Profil */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-[#0F172A]">Deskripsi Profil</label>
                <span className="text-xs text-[#64748B]">Opsional</span>
              </div>
              <textarea
                value={formData.description}
                onChange={handleChange('description')}
                rows={4}
                className={`${inputNoPadCls} h-auto py-3 resize-none`}
              />
              <p className="text-xs text-[#64748B] mt-1">Keterangan fasilitas, standar higienitas dapur, dan jenis surplus</p>
            </div>
          </div>

          {/* CARD 2: Kata Sandi & Kredensial */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
            <h2 className="text-base font-bold text-[#0F172A] mb-1">Kata Sandi & Kredensial</h2>
            <p className="text-xs text-[#64748B] mb-5">Pengaturan otentikasi login akun penyedia.</p>
            <div className="border-t border-[#E5E7EB] mb-5" />

            {/* Password row */}
            <div className="flex items-center justify-between gap-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 mb-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#64748B] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Kata Sandi</p>
                  <p className="text-sm text-[#64748B] tracking-widest">• • • • • • • • • • •</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="border border-[#E5E7EB] bg-white text-sm font-medium text-[#0F172A] px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
              >
                Ubah Kata Sandi
              </button>
            </div>

            {/* Security banner */}
            <div className="flex items-center gap-3 bg-[#ECFDF5] border border-[#DCFCE7] rounded-xl px-4 py-3">
              <ShieldCheck className="w-5 h-5 text-[#15803D] shrink-0" />
              <p className="text-xs text-[#15803D] font-medium">
                Kata sandi dienkripsi dengan standar industri (Hash Bcrypt) untuk keamanan data transaksi.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="w-72 shrink-0 flex flex-col gap-4">

          {/* Card 1: Profile Summary */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] flex items-center justify-center mb-3">
                <Building2 className="w-7 h-7 text-[#15803D]" />
              </div>
              <p className="font-bold text-[#0F172A] text-sm">{formData.name}</p>
              <p className="text-xs text-[#15803D] font-medium mt-0.5">✓ Role Penyedia Pangan</p>
            </div>

            <div className="border-t border-[#E5E7EB] mb-3" />

            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Status Verifikasi', value: 'Terverifikasi', valueClass: 'text-[#15803D] font-bold' },
                { label: 'Zona Wilayah', value: 'Jakarta Pusat', valueClass: 'text-[#0F172A]' },
                { label: 'Kemitraan', value: 'Aktif sejak Jan 2024', valueClass: 'text-[#0F172A]' },
              ].map(({ label, value, valueClass }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#64748B]">{label}</span>
                  <span className={`text-xs ${valueClass}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Bantuan Akun */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFF1E0] flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 text-[#B45309]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Bantuan Akun</h3>
                <p className="text-[11px] text-[#B45309] font-semibold">● Tim Siaga 24/7</p>
              </div>
            </div>
            <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
              Butuh perubahan data nama legalitas usaha atau bantuan serah terima donasi pangan?
            </p>
            <button className="w-full flex items-center justify-between bg-[#15803D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#166534] transition-colors">
              <span>💬 Hubungi Tim Siaga</span>
              <span>›</span>
            </button>
          </div>

          {/* Version */}
          <p className="text-center text-xs text-[#64748B]">FoodRescue Portal v2.4.1 • Penyedia</p>
        </div>
      </div>
    </div>
  );
}

