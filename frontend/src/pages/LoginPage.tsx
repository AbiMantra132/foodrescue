import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sun,
  ArrowLeft,
  ArrowRight,
  LockOpen,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { authenticateUser, setSession, getPortalPathForRole, Role } from '../services/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Email & Password Validation
  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password.length >= 8;
  }, [password]);

  const isFormValid = useMemo(() => {
    return isEmailValid && isPasswordValid;
  }, [isEmailValid, isPasswordValid]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setAuthError(null);

    if (!isFormValid || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      const authResult = authenticateUser(email, password);

      if (!authResult.success || !authResult.user) {
        setIsLoading(false);
        setAuthError(authResult.error || 'Email atau kata sandi tidak cocok. Silakan coba lagi.');
        return;
      }

      // Simpan sesi autentikasi pengguna
      setSession(authResult.user);
      setIsLoading(false);

      // Arahkan ke portal sesuai role pengguna yang terdaftar
      const redirectPath = getPortalPathForRole(authResult.user.role);
      navigate(redirectPath, { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#ECFDF3]/40 via-[#F8F9FC] to-[#F8F9FC] font-['Inter',sans-serif] text-[#0F172A] antialiased">
      {/* ========================================================================= */}
      {/* 1. HEADER (di atas card, container lebar dengan padding samping besar)     */}
      {/* ========================================================================= */}
      <header className="w-full pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Kiri: Logo Kotak Hijau + Ikon Matahari/Sun + Teks & Sub */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer" aria-label="FoodRescue Beranda">
            <div className="w-10 h-10 rounded-xl bg-[#15803D] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105">
              <Sun className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl text-[#0F172A] tracking-tight leading-none">
                FoodRescue
              </span>
              <span className="text-xs text-[#64748B] mt-1 leading-none font-medium">
                Portal Penyedia Surplus
              </span>
            </div>
          </Link>

          {/* Kanan: Link Kembali ke Langkah 1 */}
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Kembali ke Langkah 1</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CARD LOGIN (center horizontal, lebar ±560px, jarak lega)              */}
      {/* ========================================================================= */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-[560px] w-full bg-white rounded-3xl p-8 sm:p-12 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04),0_20px_25px_-5px_rgba(0,0,0,0.02)] border border-[#E5E7EB]/80">
          
          {/* Paling atas: kotak ikon hijau muda rounded-2xl (±64px) dengan ikon gembok terbuka */}
          <div className="w-16 h-16 rounded-2xl bg-[#ECFDF3] border border-[#DCFCE7] flex items-center justify-center text-[#15803D] mx-auto mb-6 shadow-xs">
            <LockOpen className="w-7 h-7 text-[#15803D] stroke-[2.2]" />
          </div>

          {/* Judul & Subjudul Center */}
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-[26px] text-[#0F172A] tracking-tight text-center mb-1.5">
            Masuk ke Portal
          </h1>
          <p className="font-['Inter',sans-serif] text-xs sm:text-sm text-[#64748B] text-center mb-8">
            Portal Penyaluran Surplus Pangan FoodRescue
          </p>

          {/* Form Login */}
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Input 1: Email Organisasi */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-[#0F172A] mb-2"
              >
                Email Organisasi
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#15803D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="contoh: operasional@mitra.id"
                  className={`w-full h-14 pl-12 pr-4 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:outline-none focus:ring-1 transition-all ${
                    touched.email && !isEmailValid
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                  }`}
                />
              </div>
              {touched.email && !isEmailValid && (
                <p className="text-[11px] text-rose-500 mt-1.5 pl-1">
                  {!email.trim() ? 'Email organisasi wajib diisi' : 'Format email tidak valid'}
                </p>
              )}
            </div>

            {/* Input 2: Kata Sandi & Lupa kata sandi */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-semibold text-[#0F172A]"
                >
                  Kata Sandi
                </label>
                <a
                  href="#lupa-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Silakan hubungi admin atau email ke rescue@foodrescue.id untuk reset kata sandi akun organisasi Anda.');
                  }}
                  className="text-xs sm:text-sm font-medium text-[#0F172A] hover:text-[#15803D] transition-colors"
                >
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#15803D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Masukkan kata sandi"
                  className={`w-full h-14 pl-12 pr-12 bg-white border rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B]/60 focus:outline-none focus:ring-1 transition-all ${
                    touched.password && !isPasswordValid
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-[#E5E7EB] focus:border-[#15803D] focus:ring-[#15803D]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors p-1"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {touched.password && !isPasswordValid && (
                <p className="text-[11px] text-rose-500 mt-1.5 pl-1">
                  {!password ? 'Kata sandi wajib diisi' : 'Kata sandi minimal 8 karakter'}
                </p>
              )}
              {authError && (
                <div className="mt-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            {/* Checkbox Ingat Saya */}
            <div className="flex items-center gap-2.5 mb-6">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E5E7EB] text-[#15803D] focus:ring-[#15803D] cursor-pointer accent-[#15803D]"
              />
              <label
                htmlFor="rememberMe"
                className="text-xs sm:text-sm text-[#64748B] cursor-pointer select-none"
              >
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Tombol Masuk ke Portal */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs ${
                isFormValid
                  ? 'bg-[#15803D] text-white hover:bg-[#166534] border border-transparent shadow-sm'
                  : 'bg-white hover:bg-[#15803D] text-[#0F172A] hover:text-white border border-[#E5E7EB] hover:border-[#15803D]'
              }`}
            >
              <span>{isLoading ? 'Memverifikasi Akun...' : 'Masuk ke Portal'}</span>
              {!isLoading && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </button>
          </form>

          {/* Dua Baris Teks Link Registrasi */}
          <div className="mt-8 pt-2 space-y-2.5 text-center text-xs sm:text-sm text-[#0F172A]">
            <div>
              Daftar sebagai mitra?{' '}
              <Link
                to="/register/penyedia"
                className="text-[#15803D] font-bold underline hover:text-[#166534] transition-colors"
              >
                Daftar Akun Baru
              </Link>
            </div>
            <div>
              Daftar sebagai pengelola ?{' '}
              <Link
                to="/register/pengelola"
                className="text-[#15803D] font-bold underline hover:text-[#166534] transition-colors"
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>

          {/* Enkripsi Berstandar Industri 256-bit */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#15803D] stroke-[2.2]" />
            <span>Enkripsi Berstandar Industri 256-bit</span>
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. FOOTER (putih, garis pemisah tipis di atas, 4 kolom)                   */}
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
                      to="/register?role=penyedia"
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

export default LoginPage;

