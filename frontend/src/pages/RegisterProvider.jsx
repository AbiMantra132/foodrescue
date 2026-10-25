import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Store,
  Factory,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Leaf,
  Recycle,
  Check,
  ArrowRight,
  Star,
  CheckCircle2,
  Scale,
  Building2
} from 'lucide-react';
import facilityImage from '../assets/facility-showcase.jpg';

export function RegisterProvider() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'pengelola' ? 'pengelola' : 'penyedia';

  const [selectedRole, setSelectedRole] = useState(initialRole);

  // Penyedia Fields
  const [providerName, setProviderName] = useState('');
  const [providerEmail, setProviderEmail] = useState('');

  // Pengelola Fields
  const [facilityName, setFacilityName] = useState('');
  const [facilityEmail, setFacilityEmail] = useState('');
  const [processingType, setProcessingType] = useState('Kompos Organik');
  const [dailyCapacity, setDailyCapacity] = useState('');

  // Password & UI States
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Password Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!password) {
      return { score: 0, percentage: 0, isStrong: false };
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let percentage = 0;
    if (score === 1) percentage = 25;
    else if (score === 2) percentage = 50;
    else if (score === 3) percentage = 75;
    else if (score === 4) percentage = 92;

    return {
      score,
      percentage,
      isStrong: score >= 4,
    };
  }, [password]);

  // Validation
  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const isFormValid = useMemo(() => {
    if (password.length < 8) return false;

    if (selectedRole === 'penyedia') {
      return providerName.trim().length >= 2 && isEmailValid(providerEmail);
    } else {
      return (
        facilityName.trim().length >= 2 &&
        isEmailValid(facilityEmail) &&
        dailyCapacity.trim().length > 0
      );
    }
  }, [selectedRole, providerName, providerEmail, facilityName, facilityEmail, dailyCapacity, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row font-['Inter',sans-serif] text-[#111111] antialiased">
      {/* ========================================================================= */}
      {/* KOLOM KIRI — FORM (±45% width, responsive split-screen)                   */}
      {/* ========================================================================= */}
      <section className="w-full lg:w-[46%] xl:w-[44%] min-h-screen bg-white flex flex-col justify-between px-6 py-8 sm:px-12 sm:py-10 md:px-14 lg:px-12 xl:px-16 2xl:px-20 z-10 border-r border-gray-100/70">
        <div>
          {/* 1. Header row */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="FoodRescue Homepage">
              <div className="w-9 h-9 rounded-xl bg-[#E3F3EA] flex items-center justify-center text-[#007E68] shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5 h-5 fill-[#007E68]" />
              </div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg sm:text-xl text-[#111111] tracking-tight">
                Food<span className="text-[#007E68]">Rescue</span>
              </span>
            </Link>
          </div>

          {/* 2. Heading section */}
          <div className="mb-5 sm:mb-6">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl lg:text-[32px] text-[#111111] tracking-tight leading-tight mb-2">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-md">
              Choose your role to connect food surplus directly with responsible waste management.
            </p>
          </div>

          {/* 3. Role selector — HANYA 2 CARD (Penyedia & Pengelola) */}
          <div className="grid grid-cols-2 gap-3 mb-5 sm:mb-6" role="radiogroup" aria-label="Pilih Role Akun">
            {/* Card 1: Penyedia */}
            <div
              onClick={() => setSelectedRole('penyedia')}
              role="radio"
              aria-checked={selectedRole === 'penyedia'}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedRole('penyedia')}
              className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] border ${selectedRole === 'penyedia'
                ? 'border-2 border-[#007E68] bg-[#E3F3EA] shadow-xs ring-1 ring-[#007E68]/15'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                }`}
            >
              <div className="flex justify-between items-start w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedRole === 'penyedia' ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  <Store className="w-4 h-4 stroke-[2.2]" />
                </div>
                {selectedRole === 'penyedia' && (
                  <div className="w-5 h-5 rounded-full bg-[#007E68] flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="mt-2.5">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111] leading-tight">
                  Penyedia
                </div>
                <div className="text-[11px] text-[#6B7280] leading-tight mt-0.5">
                  Restoran, UMKM, Industri Kuliner
                </div>
              </div>
            </div>

            {/* Card 2: Pengelola */}
            <div
              onClick={() => setSelectedRole('pengelola')}
              role="radio"
              aria-checked={selectedRole === 'pengelola'}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedRole('pengelola')}
              className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] border ${selectedRole === 'pengelola'
                ? 'border-2 border-[#007E68] bg-[#E3F3EA] shadow-xs ring-1 ring-[#007E68]/15'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
                }`}
            >
              <div className="flex justify-between items-start w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedRole === 'pengelola' ? 'bg-[#007E68] text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  <Factory className="w-4 h-4 stroke-[2.2]" />
                </div>
                {selectedRole === 'pengelola' && (
                  <div className="w-5 h-5 rounded-full bg-[#007E68] flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="mt-2.5">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#111111] leading-tight">
                  Pengelola
                </div>
                <div className="text-[11px] text-[#6B7280] leading-tight mt-0.5">
                  Kompos, Biogas, Daur Ulang Pangan
                </div>
              </div>
            </div>
          </div>

          {/* 4. Form Fields Dinamis */}
          {isSubmitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-[#E3F3EA]/70 p-6 text-center my-4 animate-fadeIn">
              <div className="w-12 h-12 bg-[#007E68] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#0B3D2E] mb-1">
                Pendaftaran Berhasil!
              </h3>
              <p className="text-xs sm:text-sm text-[#0B3D2E]/80 mb-4 max-w-sm mx-auto">
                Selamat datang di FoodRescue sebagai{' '}
                <strong>{selectedRole === 'penyedia' ? 'Penyedia Limbah' : 'Fasilitas Pengelola'}</strong>. Silakan cek email Anda untuk verifikasi dan mulai pencocokan AI.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 bg-[#007E68] text-white text-xs font-bold rounded-full hover:bg-[#0B3D2E] transition-colors"
                >
                  Buka Dashboard →
                </Link>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold text-[#007E68] hover:underline"
                >
                  Daftar akun lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Conditional Fields: PENYEDIA */}
              {selectedRole === 'penyedia' ? (
                <>
                  <div>
                    <label htmlFor="providerName" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Full Name / Business Name
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="providerName"
                        type="text"
                        value={providerName}
                        onChange={(e) => setProviderName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins / Artisan Bakery"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-11 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                      />
                      <div className="absolute right-3.5 pointer-events-none text-[#9CA3AF]">
                        <Store className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="providerEmail" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Business / Work Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="providerEmail"
                        type="email"
                        value={providerEmail}
                        onChange={(e) => setProviderEmail(e.target.value)}
                        placeholder="sarah@bakerykitchen.org"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-11 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                      />
                      <div className="absolute right-3.5 pointer-events-none text-[#9CA3AF]">
                        <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Conditional Fields: PENGELOLA */
                <>
                  <div>
                    <label htmlFor="facilityName" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Facility Name
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="facilityName"
                        type="text"
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        placeholder="e.g. PT Kompos Hijau Mandiri"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-11 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                      />
                      <div className="absolute right-3.5 pointer-events-none text-[#9CA3AF]">
                        <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="facilityEmail" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                      Business / Facility Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="facilityEmail"
                        type="email"
                        value={facilityEmail}
                        onChange={(e) => setFacilityEmail(e.target.value)}
                        placeholder="operations@komposhijau.id"
                        required
                        className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-11 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                      />
                      <div className="absolute right-3.5 pointer-events-none text-[#9CA3AF]">
                        <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="processingType" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                        Jenis Pengolahan
                      </label>
                      <select
                        id="processingType"
                        value={processingType}
                        onChange={(e) => setProcessingType(e.target.value)}
                        className="w-full bg-[#F5F5F4] text-[#111111] text-xs sm:text-sm rounded-xl px-3.5 py-3 sm:py-3.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs cursor-pointer"
                      >
                        <option value="Kompos Organik">Kompos Organik</option>
                        <option value="Biogas & Energi">Biogas & Energi</option>
                        <option value="Daur Ulang Industri">Daur Ulang Industri</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="dailyCapacity" className="block text-xs sm:text-sm font-semibold text-[#111111] mb-1.5">
                        Kapasitas Olah (kg/hari)
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="dailyCapacity"
                          type="number"
                          value={dailyCapacity}
                          onChange={(e) => setDailyCapacity(e.target.value)}
                          placeholder="e.g. 1500"
                          required
                          className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-10 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                        />
                        <div className="absolute right-3 pointer-events-none text-[#9CA3AF]">
                          <Scale className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Password Field (Keduanya) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="text-xs sm:text-sm font-semibold text-[#111111]">
                    Password
                  </label>
                  {passwordStrength.isStrong && (
                    <span className="text-[10px] sm:text-[11px] font-extrabold text-[#007E68] tracking-wider uppercase flex items-center gap-1">
                      STRONG SECURITY
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secure password"
                    required
                    className="w-full bg-[#F5F5F4] text-[#111111] placeholder:text-[#9CA3AF] text-xs sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 pr-11 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-[#9CA3AF] hover:text-[#111111] transition-colors p-0.5 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Bar */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex-1 flex gap-1.5">
                    <div
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 1 ? 'bg-[#007E68]' : 'bg-gray-200'
                        }`}
                    />
                    <div
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 2 ? 'bg-[#007E68]' : 'bg-gray-200'
                        }`}
                    />
                    <div
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 3 ? 'bg-[#007E68]' : 'bg-gray-200'
                        }`}
                    />
                    <div
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength.score >= 4 ? 'bg-[#52C4A7]' : 'bg-gray-200'
                        }`}
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#007E68] min-w-[28px] text-right tabular-nums">
                    {passwordStrength.percentage}%
                  </span>
                </div>
              </div>

              {/* 5. Tombol Submit Pill */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-[#007E68] hover:bg-[#0B3D2E] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#007E68] active:scale-[0.99] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 mt-5 cursor-pointer"
              >
                <span>{isLoading ? 'Creating account...' : 'Create Free Account'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              </button>
            </form>
          )}
        </div>

        {/* 6. Footer Form */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 pt-5 mt-4 border-t border-gray-100 text-xs sm:text-sm text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <span>Already have an account?</span>
            <a
              href="#login"
              className="text-[#007E68] font-bold hover:underline hover:text-[#0B3D2E] transition-colors"
            >
              Log in here
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <ShieldCheck className="w-4 h-4 text-[#007E68]" />
            <span>256-bit ISO Certified</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* KOLOM KANAN — SHOWCASE (Fasilitas Daur Ulang Modern & Clean)               */}
      {/* ========================================================================= */}
      <section className="hidden lg:flex lg:w-[54%] xl:w-[56%] bg-gradient-to-br from-[#F4FAF6] via-[#EAF6EF] to-[#DDF0E6] p-8 xl:p-10 2xl:p-12 flex-col justify-between items-center relative overflow-hidden select-none">
        {/* Decorative Ambient Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E3F3EA] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#007E68]/10 blur-3xl opacity-60 pointer-events-none" />

        {/* Main Photo Showcase Wrapper */}
        <div className="relative w-full max-w-[480px] xl:max-w-[510px] my-auto">
          <div className="rounded-[28px] xl:rounded-[34px] overflow-hidden shadow-2xl relative aspect-[4/4.8] bg-emerald-950/10 border-4 border-white/70">
            <img
              src={facilityImage}
              alt="Staff fasilitas pengolahan limbah organik modern FoodRescue"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />

            {/* Gradient Scrim for Readability */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Top-Right Badge: Active Facilities Connected */}
            <div className="absolute top-5 right-5 xl:top-6 xl:right-6 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full shadow-lg border border-white/70 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007E68] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#007E68]" />
              </span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#0B3D2E] tracking-tight whitespace-nowrap">
                850+ Active Facilities Connected
              </span>
            </div>

            {/* Floating Testimonial Card */}
            <div className="absolute bottom-5 left-5 right-5 xl:bottom-6 xl:left-6 xl:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl xl:rounded-[22px] p-5 shadow-xl border border-white/80">
              <div className="flex justify-between items-center mb-1">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl xl:text-[34px] font-extrabold text-[#0B3D2E] tracking-tight leading-none">
                  −38%
                </span>
                <div className="flex items-center gap-1 text-amber-400" aria-label="5 stars rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="text-[10px] xl:text-[11px] font-extrabold tracking-wider text-[#007E68] uppercase mb-1.5">
                DISPOSAL COST REDUCTION
              </div>

              <p className="text-xs xl:text-[13px] text-[#4B5563] leading-relaxed mb-3.5 font-normal">
                “Pasokan limbah organik terverifikasi kini datang tepat waktu setiap hari sesuai kapasitas komposter pabrik kami tanpa biaya perantara.”
              </p>

              <div className="flex items-center gap-2.5 pt-1 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#007E68] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  B
                </div>
                <div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs xl:text-sm text-[#111111] leading-tight">
                    Bambang Wijaya
                  </div>
                  <div className="text-[10px] xl:text-[11px] text-[#6B7280] leading-tight">
                    Fasilitas Biogas Agro Mandiri • Karawang
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Showcase Bar */}
        <div className="w-full max-w-[480px] xl:max-w-[510px] flex justify-between items-center text-xs xl:text-[13px] text-[#0B3D2E] pt-3 px-1">
          <div className="flex items-center gap-2 font-medium">
            <Leaf className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#007E68] fill-[#007E68]/20" />
            <span>Zero-landfill certified process</span>
          </div>
          <span className="font-bold text-[#0B3D2E]">
            2.4k tons diverted this month
          </span>
        </div>
      </section>
    </div>
  );
}

export default RegisterProvider;
