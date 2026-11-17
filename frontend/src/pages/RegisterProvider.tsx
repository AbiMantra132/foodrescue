import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Sun,
  ArrowLeft,
  ArrowRight,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  LockOpen,
  Shield,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { saveRegisteredAccount, Role } from '../services/auth';

export interface RegisterFlowProps {
  role?: Role;
}

export function RegisterFlow({ role: propRole }: RegisterFlowProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Tentukan role dari prop > path (/register/pengelola) > search param (?role=pengelola) > default 'penyedia'
  const activeRole: Role = useMemo(() => {
    if (propRole) return propRole;
    if (location.pathname.includes('pengelola')) return 'pengelola';
    if (location.pathname.includes('penyedia')) return 'penyedia';
    if (searchParams.get('role') === 'pengelola') return 'pengelola';
    if (searchParams.get('role') === 'penyedia') return 'penyedia';
    return 'penyedia';
  }, [propRole, location.pathname, searchParams]);

  // Step state: 1 atau 2
  const [step, setStep] = useState<1 | 2>(1);

  // Form Data Gabungan Langkah 1 + Langkah 2
  // Catatan: field 'description' digunakan bersama untuk Langkah 1 & 2 sehingga tersinkronisasi
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    password: '',
    confirmPassword: '',
    agreement: true, // Default tercentang sesuai screenshot 2
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedStep1, setTouchedStep1] = useState(false);
  const [touchedStep2, setTouchedStep2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top saat ganti step
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Validasi Langkah 1
  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  }, [formData.email]);

  const isPhoneValid = useMemo(() => {
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    return cleanPhone.length >= 10;
  }, [formData.phone]);

  const isStep1Valid = useMemo(() => {
    return (
      formData.name.trim().length >= 2 &&
      isEmailValid &&
      isPhoneValid &&
      formData.address.trim().length >= 5
    );
  }, [formData.name, isEmailValid, isPhoneValid, formData.address]);

  // Validasi Langkah 2
  const isPasswordValid = useMemo(() => {
    return formData.password.length >= 8;
  }, [formData.password]);

  const isConfirmMatch = useMemo(() => {
    return formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  }, [formData.password, formData.confirmPassword]);

  const isStep2Valid = useMemo(() => {
    return isPasswordValid && isConfirmMatch && formData.agreement;
  }, [isPasswordValid, isConfirmMatch, formData.agreement]);

  // Password Strength Score (0 to 4)
  const passwordStrength = useMemo(() => {
    if (!formData.password) return 0;
    let score = 0;
    if (formData.password.length >= 8) score++;
    if (/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password)) score++;
    if (/[0-9]/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;
    return score;
  }, [formData.password]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedStep1(true);
    if (!isStep1Valid) return;
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedStep2(true);
    if (!isStep2Valid || isSubmitting) return;

    setIsSubmitting(true);

    // Simpan akun terdaftar ke database akun localStorage
    saveRegisteredAccount({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: activeRole,
    });

    setToastMessage('Registrasi berhasil! Mengarahkan ke halaman login...');

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/login?role=${activeRole}&email=${encodeURIComponent(formData.email)}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#ECFDF3]/40 via-[#F8F9FC] to-[#F8F9FC] font-['Inter',sans-serif] text-[#0F172A] antialiased">
      
      {/* Toast Notifikasi Berhasil */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#15803D] text-white px-6 py-3.5 rounded-2xl shadow-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm flex items-center gap-2.5 animate-bounce">
          <Check className="w-5 h-5 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HEADER HALAMAN (Dipakai bersama oleh kedua langkah)                    */}
      {/* ========================================================================= */}
      <header className="w-full pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          
          {/* Kiri: Logo Kotak Hijau + Ikon Sun + Teks & Sub Dinamis */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer" aria-label="FoodRescue Beranda">
            <div className="w-10 h-10 rounded-xl bg-[#15803D] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105">
              <Sun className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl text-[#0F172A] tracking-tight leading-none">
                FoodRescue
              </span>
              <span className="text-xs text-[#64748B] mt-1 leading-none font-medium">
                {activeRole === 'pengelola'
                  ? 'Portal Pengelola & Penerima'
                  : 'Portal Penyedia Surplus'}
              </span>
            </div>
          </Link>

          {/* Kanan: Navigasi Balik Dinamis per Langkah */}
          {step === 1 ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              <span>Kembali ke Masuk</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              <span>Kembali ke Langkah 1</span>
            </button>
          )}

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CARD UTAMA REGISTER (Center horizontal, lebar ±650px)                 */}
      {/* ========================================================================= */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-[650px] w-full bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04),0_20px_25px_-5px_rgba(0,0,0,0.02)] border border-[#E5E7EB]/80">
          
          {/* Card Atas: Kotak Ikon Hijau Muda (±72px) Dinamis */}
          <div className="w-[72px] h-[72px] rounded-2xl bg-[#ECFDF3] border border-[#DCFCE7] flex items-center justify-center text-[#15803D] mx-auto mb-6 shadow-xs">
            {step === 1 ? (
              <Building2 className="w-8 h-8 text-[#15803D] stroke-[2]" />
            ) : (
              <LockOpen className="w-8 h-8 text-[#15803D] stroke-[2.2]" />
            )}
          </div>

          {/* Judul & Subjudul Center */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-[28px] text-[#0F172A] tracking-tight text-center mb-1.5">
            {step === 1
              ? activeRole === 'pengelola'
                ? 'Daftar Akun Pengelola'
                : 'Daftar Akun Penyedia'
              : 'Keamanan Akun & Profil'}
          </h1>
          <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#64748B] text-center mb-6">
            {step === 1
              ? activeRole === 'pengelola'
                ? 'Langkah 1 dari 2: Informasi Kontak & Alamat Lembaga / Komunitas'
                : 'Langkah 1 dari 2: Informasi Kontak & Alamat Lokasi'
              : 'Langkah 2 dari 2: Kata Sandi & Konfirmasi Registrasi'}
          </p>

          {/* ========================================================================= */}
          {/* STEPPER DINAMIS                                                           */}
          {/* ========================================================================= */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              {/* Stepper Kiri */}
              <div className="flex items-center gap-2">
                {step === 1 ? (
                  <div className="w-5 h-5 rounded-full bg-[#15803D] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#ECFDF3] border border-[#DCFCE7] text-[#15803D] text-[11px] font-bold flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3] text-[#15803D]" />
                  </div>
                )}
                <span className="font-bold text-[#15803D]">
                  {step === 1 ? 'Kontak & Alamat' : 'Kontak & Alamat Selesai'}
                </span>
              </div>

              {/* Stepper Kanan: pada Langkah 1 Penyedia adalah "Kata Sandi & Profil", Langkah 2 adalah "Kata Sandi & Keamanan" */}
              <div className="flex items-center gap-2">
                {step === 1 ? (
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-[#64748B] text-[11px] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#15803D] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                )}
                <span
                  className={
                    step === 2
                      ? 'text-[#15803D] font-bold'
                      : 'text-[#64748B] font-medium'
                  }
                >
                  {step === 1
                    ? activeRole === 'penyedia'
                      ? 'Kata Sandi & Profil'
                      : 'Kata Sandi & Keamanan'
                    : 'Kata Sandi & Keamanan'}
                </span>
              </div>
            </div>

            {/* Progress Bar Stepper */}
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#15803D] rounded-full transition-all duration-300 ${
                  step === 1 ? 'w-1/2' : 'w-full'
                }`}
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* KONTEN LANGKAH 1: KONTAK & ALAMAT                                         */}
          {/* ========================================================================= */}
          {step === 1 && (
            <form onSubmit={handleNextStep} noValidate>
              
              {/* Banner Role */}
              <div className="bg-[#ECFDF3] border border-[#DCFCE7] px-4 py-3 rounded-xl flex items-center justify-between mb-6 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
                  <span className="text-xs sm:text-sm font-medium text-[#0F172A]">Peran Sistem:</span>
                </div>
                <div className="bg-white border border-[#DCFCE7] px-3 py-1 rounded-lg shadow-2xs text-[11px] font-extrabold text-[#15803D] tracking-wider uppercase">
                  {activeRole === 'pengelola' ? 'ROLE: PENGELOLA' : 'ROLE: PENYEDIA'}
                </div>
              </div>

              {/* Field 1: Nama PIC / Penanggung Jawab */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  Nama PIC / Penanggung Jawab
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={
                      activeRole === 'pengelola'
                        ? 'Siti Rahmawati (Yayasan Berkah Pangan)'
                        : 'Budi Santoso'
                    }
                    className={`w-full h-14 pl-12 pr-4 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      touchedStep1 && formData.name.trim().length < 2
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                </div>
                {touchedStep1 && formData.name.trim().length < 2 && (
                  <p className="text-[11px] text-rose-500 mt-1 pl-1">Nama penanggung jawab wajib diisi.</p>
                )}
              </div>

              {/* Field 2: Email Organisasi (Login) */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  Email Organisasi (Login)
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                    placeholder={
                      activeRole === 'pengelola'
                        ? 'operasional@berkahpangan.org'
                        : 'operasional@dapurmakmur.co.id'
                    }
                    className={`w-full h-14 pl-12 pr-4 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      touchedStep1 && !isEmailValid
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1 pl-1">
                  Gunakan huruf kecil untuk alamat email organisasi aktif.
                </p>
                {touchedStep1 && !isEmailValid && (
                  <p className="text-[11px] text-rose-500 mt-0.5 pl-1">Format email tidak valid.</p>
                )}
              </div>

              {/* Field 3: Nomor Telepon Operasional (WhatsApp/Call) */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  Nomor Telepon Operasional (WhatsApp/Call)
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={activeRole === 'pengelola' ? '081234567890' : '081289004512'}
                    className={`w-full h-14 pl-12 pr-4 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      touchedStep1 && !isPhoneValid
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1 pl-1">
                  {activeRole === 'pengelola'
                    ? 'Dihubungi oleh tim logistik & relawan saat koordinasi penyaluran.'
                    : 'Dihubungi oleh relawan & sistem verifikasi saat koordinasi surplus.'}
                </p>
                {touchedStep1 && !isPhoneValid && (
                  <p className="text-[11px] text-rose-500 mt-0.5 pl-1">Nomor telepon minimal 10 digit angka.</p>
                )}
              </div>

              {/* Field 4: Alamat Lengkap Titik Distribusi / Penjemputan */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  {activeRole === 'pengelola'
                    ? 'Alamat Lengkap Titik Distribusi / Penyaluran'
                    : 'Alamat Lengkap Lokasi Surplus Pangan'}
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={
                      activeRole === 'pengelola'
                        ? 'Jl. Kramat Raya No. 45, Kwitang, Senen, Jakarta Pusat 10420'
                        : 'Jl. Teuku Cik Ditiro No. 42, RT 01 / RW 02, Menteng, Jakarta Pusat 10310'
                    }
                    className={`w-full min-h-[96px] pl-12 pr-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 resize-none transition-all ${
                      touchedStep1 && formData.address.trim().length < 5
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1 pl-1">
                  {activeRole === 'pengelola'
                    ? 'Titik penjemputan logistik makanan atau dapur umum komunitas.'
                    : 'Titik penjemputan logistik makanan oleh relawan.'}
                </p>
                {touchedStep1 && formData.address.trim().length < 5 && (
                  <p className="text-[11px] text-rose-500 mt-0.5 pl-1">Alamat lengkap wajib diisi.</p>
                )}
              </div>

              {/* Field 5: Deskripsi Profil (Lembaga untuk Pengelola, Usaha/Dapur untuk Penyedia) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {activeRole === 'pengelola'
                      ? 'Deskripsi Profil Lembaga / Fasilitas Distribusi'
                      : 'Deskripsi Profil Usaha / Fasilitas Dapur'}
                  </label>
                  <span className="text-xs text-[#94A3B8]">Opsional</span>
                </div>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={
                      activeRole === 'pengelola'
                        ? 'Pusat distribusi bantuan pangan dan dapur umum melayani 3 panti asuhan dan warga pra-sejahtera terverifikasi.'
                        : 'Restoran hidangan nusantara bersertifikat laik higiene dengan fasilitas chiller standar industri.'
                    }
                    className="w-full min-h-[96px] pl-12 pr-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] resize-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1 pl-1">
                  {activeRole === 'pengelola'
                    ? 'Membantu tim kurir dan verifikator mengecek kesiapan fasilitas penyimpanan/distribusi.'
                    : 'Membantu tim logistik dan relawan memverifikasi kelayakan fasilitas.'}
                </p>
              </div>

              {/* Tombol Lanjut ke Pengaturan Kata Sandi */}
              <button
                type="submit"
                className="w-full h-14 sm:h-[60px] rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white shadow-xs transition-all mt-6 cursor-pointer"
              >
                <span>Lanjut ke Pengaturan Kata Sandi</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Garis Pemisah Tipis & Link Masuk */}
              <div className="w-full border-t border-[#E5E7EB] my-6"></div>
              <div className="text-center text-xs sm:text-sm text-[#64748B]">
                {activeRole === 'pengelola' ? (
                  <>
                    Sudah memiliki akun pengelola?{' '}
                    <Link to="/login" className="text-[#15803D] font-bold hover:underline transition-colors">
                      Masuk ke Portal
                    </Link>
                  </>
                ) : (
                  <>
                    Sudah memiliki akun mitra penyedia?{' '}
                    <Link to="/login" className="text-[#15803D] font-bold hover:underline transition-colors">
                      Masuk ke Portal
                    </Link>
                  </>
                )}
              </div>

            </form>
          )}

          {/* ========================================================================= */}
          {/* KONTEN LANGKAH 2: KEAMANAN AKUN & PROFIL                                  */}
          {/* ========================================================================= */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} noValidate>
              
              {/* Field 1: Kata Sandi (Ikon gembok terbuka LockOpen di kiri) */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <LockOpen className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="P@ssw0rdSurplus2025"
                    className={`w-full h-14 pl-12 pr-12 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      touchedStep2 && !isPasswordValid
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Subtil Password Strength Meter */}
                {formData.password.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1.5 px-1">
                    <div className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= 1 ? 'bg-amber-400' : 'bg-slate-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= 3 ? 'bg-[#15803D]' : 'bg-slate-200'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= 4 ? 'bg-[#15803D]' : 'bg-slate-200'}`} />
                  </div>
                )}

                <p className="text-[11px] text-[#94A3B8] mt-1 pl-1">
                  Gunakan kombinasi minimal 8 karakter untuk keamanan akun portal.
                </p>
                {touchedStep2 && !isPasswordValid && (
                  <p className="text-[11px] text-rose-500 mt-0.5 pl-1">Kata sandi minimal 8 karakter.</p>
                )}
              </div>

              {/* Field 2: Konfirmasi Kata Sandi */}
              <div className="mb-5">
                <label className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-1.5">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Shield className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="P@ssw0rdSurplus2025"
                    className={`w-full h-14 pl-12 pr-12 bg-[#F9FAFB] border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      touchedStep2 && !isConfirmMatch
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {touchedStep2 && !isConfirmMatch && (
                  <p className="text-[11px] text-rose-500 mt-1 pl-1">Konfirmasi kata sandi tidak cocok.</p>
                )}
              </div>

              {/* Field 3 (KHUSUS PENYEDIA): Deskripsi Profil Usaha / Fasilitas Dapur (Tersinkron dengan Langkah 1) */}
              {activeRole === 'penyedia' && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                      Deskripsi Profil Usaha / Fasilitas Dapur
                    </label>
                    <span className="text-xs text-[#94A3B8]">Opsional</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Restoran hidangan nusantara bersertifikat laik higiene dengan fasilitas chiller standar industri."
                    className="w-full min-h-[76px] px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:bg-white focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] resize-none transition-all"
                  />
                </div>
              )}

              {/* Field 4: Checkbox Persetujuan Higienitas & Protokol */}
              <div className="flex items-start gap-3 my-6">
                <input
                  id="agreement"
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E7EB] text-[#15803D] accent-[#15803D] cursor-pointer mt-0.5 shrink-0"
                />
                <label
                  htmlFor="agreement"
                  className="text-xs text-[#64748B] leading-relaxed cursor-pointer select-none"
                >
                  Menyetujui komitmen kepatuhan standar kelayakan higienitas pangan dan protokol penjemputan resmi FoodRescue.
                </label>
              </div>

              {/* Tombol 2 Kolom: Kembali & Selesaikan Registrasi */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 h-14 sm:h-[60px] rounded-xl border border-[#E5E7EB] bg-white hover:bg-slate-50 text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={!isStep2Valid || isSubmitting}
                  className="w-2/3 h-14 sm:h-[60px] rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>{isSubmitting ? 'Mendaftarkan Akun...' : 'Selesaikan Registrasi'}</span>
                  {!isSubmitting && <Check className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </div>

              {/* Garis Pemisah Tipis & Info is_active */}
              <div className="w-full border-t border-[#E5E7EB] my-6"></div>
              <div className="text-center text-xs text-[#64748B]">
                Akun langsung aktif dengan status default{' '}
                <span className="px-2 py-0.5 rounded bg-[#ECFDF3] border border-[#DCFCE7] text-[#15803D] font-mono text-xs font-bold">
                  is_active: true
                </span>{' '}
                setelah submisi.
              </div>

            </form>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. FOOTER HALAMAN (Identik dengan Footer Login & Screenshot)              */}
      {/* ========================================================================= */}
      <footer className="w-full bg-white border-t border-[#E5E7EB] pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          
          {/* 4 Kolom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
            
            {/* Kolom 1: Logo, Deskripsi, Hotline */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 group cursor-pointer inline-flex" aria-label="FoodRescue Beranda">
                <div className="w-9 h-9 rounded-xl bg-[#15803D] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Sun className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl text-[#0F172A] tracking-tight">
                  FoodRescue
                </span>
              </Link>

              <p className="font-['Inter',sans-serif] text-xs text-[#64748B] leading-relaxed mt-4 mb-5 max-w-sm">
                Sistem digital penyaluran surplus pangan komersial ke lembaga sosial dan komunitas penerima terverifikasi di Indonesia.
              </p>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF3] border border-[#DCFCE7] text-xs font-semibold text-[#15803D]">
                <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
                <span>Hotline Siaga: 0800-1-RESCUE (Bebas Pulsa)</span>
              </div>
            </div>

            {/* Kolom 2: PLATFORM */}
            <div className="lg:col-span-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4">
                PLATFORM
              </div>
              <ul className="space-y-2.5">
                {['Katalog Makanan', 'Cara Kerja', 'Standar Higienitas', 'Laporan Dampak'].map((item) => (
                  <li key={item}>
                    <a
                      href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: KEMITRAAN */}
            <div className="lg:col-span-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4">
                KEMITRAAN
              </div>
              <ul className="space-y-2.5">
                {['Portal Donatur Resto', 'Komunitas Penerima', 'Relawan Distribusi', 'Panduan Keamanan'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/register/penyedia"
                      className="text-xs sm:text-sm text-[#64748B] hover:text-[#0F172A] transition-colors block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 4: LAYANAN DARURAT */}
            <div className="lg:col-span-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4">
                LAYANAN DARURAT
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                Tersedia kuota jemput cepat untuk surplus besar &gt;100 porsi di wilayah Jabodetabek.
              </p>
              <a
                href="mailto:rescue@foodrescue.id"
                className="text-sm font-bold text-[#15803D] hover:underline mb-1.5 block"
              >
                rescue@foodrescue.id
              </a>
              <div className="text-xs text-[#64748B]">
                Senin - Minggu: 07:00 - 23:00 WIB
              </div>
            </div>

          </div>

          {/* Baris Bawah */}
          <div className="border-t border-[#E5E7EB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>
              © 2025 FoodRescue Indonesia. Sistem Logistik Surplus Pangan Terintegrasi.
            </div>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-[#0F172A] transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#terms" className="hover:text-[#0F172A] transition-colors">
                Syarat &amp; Ketentuan
              </a>
              <a href="#standards" className="hover:text-[#0F172A] transition-colors">
                Keamanan Pangan
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export { RegisterFlow as RegisterProvider };
export default RegisterFlow;
