import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  ShieldCheck,
  CheckCircle,
  Headphones,
  MessageCircle,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  Upload,
  ChevronRight,
} from 'lucide-react';
import { useProvider } from '../ProviderContext';

const DEFAULT_PHOTO_URL = 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80';
const DEFAULT_PHOTO_NAME = 'foto_makanan/batch-sahid-202410-09.jpg';

type Category = 'matang' | 'mentah';

interface FormState {
  nama: string;
  asal: string;
  berat: string;
  kondisi: string;
}

export default function ProviderTambahSurplus() {
  const navigate = useNavigate();
  const { addSurplus } = useProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({ nama: '', asal: '', berat: '', kondisi: '' });
  const [category, setCategory] = useState<Category>('matang');
  const [charCount, setCharCount] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(DEFAULT_PHOTO_URL);
  const [photoName, setPhotoName] = useState(DEFAULT_PHOTO_NAME);
  const [errors, setErrors] = useState<Partial<FormState & { photo: string }>>({});
  const [toast, setToast] = useState(false);

  function handleNamaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.slice(0, 150);
    setForm(f => ({ ...f, nama: val }));
    setCharCount(val.length);
    if (val) setErrors(err => ({ ...err, nama: undefined }));
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      if (e.target.value) setErrors(err => ({ ...err, [field]: undefined }));
    };
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(err => ({ ...err, photo: 'Format harus JPG, PNG, atau WebP.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(err => ({ ...err, photo: 'Ukuran file maksimal 5 MB.' }));
      return;
    }
    setErrors(err => ({ ...err, photo: undefined }));
    setPhotoName(file.name);
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  }

  function handleRemovePhoto() {
    setPhotoUrl('');
    setPhotoName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.nama) newErrors.nama = 'Nama makanan wajib diisi.';
    if (!form.asal) newErrors.asal = 'Asal surplus wajib diisi.';
    if (!form.berat) newErrors.berat = 'Berat makanan wajib diisi.';
    if (!form.kondisi) newErrors.kondisi = 'Kondisi penyimpanan wajib diisi.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePublish() {
    if (!validate()) return;
    addSurplus({
      name: form.nama,
      category: category === 'matang' ? 'Makanan Matang' : 'Bahan Mentah',
      categoryFilter: category === 'matang' ? 'makanan-hangat' : 'bahan-mentah',
      quantity: parseFloat(form.berat) || 1,
      unit: 'Kg',
      status: 'menunggu-verifikasi',
      deadline: '20:00 WIB',
      temperature: category === 'matang' ? '>60°C Hangat' : '<10°C',
      source: form.asal,
      description: form.kondisi,
      photo: photoUrl || DEFAULT_PHOTO_URL,
    });
    setToast(true);
    setTimeout(() => {
      setToast(false);
      navigate('/provider/surplus');
    }, 1500);
  }

  function handleCancel() {
    if (window.confirm('Batalkan pengisian form? Data yang diisi akan hilang.')) {
      navigate('/provider/surplus');
    }
  }

  const inputCls = (err?: string) =>
    `w-full h-14 px-4 bg-[#F9FAFB] border ${err ? 'border-red-400' : 'border-[#E5E7EB]'} rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 ${err ? 'focus:ring-red-300' : 'focus:ring-[#15803D]/25'} focus:border-[#15803D] transition`;

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#15803D] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Surplus berhasil dipublikasikan!
        </div>
      )}

      <div className="p-6 pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
          <span className="flex items-center gap-1">🗄 Surplus Saya</span>
          <span>/</span>
          <span className="text-[#15803D] font-semibold">Tambah Surplus Baru</span>
        </nav>

        {/* Page heading */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Tambah Surplus<br />Makanan
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 border border-[#E5E7EB] bg-white text-[#64748B] rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              ✕ Batal
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 bg-[#15803D] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#166534] transition-colors"
            >
              ⬆ Publikasikan
            </button>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="flex gap-6 items-start">
          {/* LEFT COLUMN (2/3) */}
          <div className="flex-[2] min-w-0 flex flex-col gap-5">

            {/* CARD 1: Informasi Pangan */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <h2 className="text-base font-bold text-[#0F172A]">Informasi Pangan</h2>
              </div>
              <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
                Lengkapi detail surplus makanan untuk verifikasi standar higienitas dan penjadwalan kurir penjemputan mitra.
              </p>

              {/* Nama Makanan */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-[#0F172A]">
                    Nama Makanan <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-[#64748B]">{charCount} / 150</span>
                </div>
                <input
                  type="text"
                  value={form.nama}
                  onChange={handleNamaChange}
                  maxLength={150}
                  placeholder="Contoh: Nasi Kotak Ayam Panggang Madu, Roti Croissant & Viennoiserie"
                  className={inputCls(errors.nama)}
                />
                {errors.nama ? (
                  <p className="text-xs text-red-500 mt-1">{errors.nama}</p>
                ) : (
                  <p className="text-xs text-[#64748B] mt-1">Tuliskan nama hidangan atau bahan makanan secara spesifik beserta variannya.</p>
                )}
              </div>

              {/* Kategori Surplus */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-[#0F172A] block mb-2">
                  Kategori Surplus <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Makanan Matang */}
                  <button
                    type="button"
                    onClick={() => setCategory('matang')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      category === 'matang'
                        ? 'border-[#15803D] bg-[#EEF0FF]'
                        : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${category === 'matang' ? 'border-[#15803D] bg-[#15803D]' : 'border-[#D1D5DB] bg-white'}`}>
                      {category === 'matang' && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                        🍽 Makanan Matang
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">Siap konsumsi, higienis & terbungkus</div>
                    </div>
                  </button>

                  {/* Bahan Mentah */}
                  <button
                    type="button"
                    onClick={() => setCategory('mentah')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      category === 'mentah'
                        ? 'border-[#15803D] bg-[#EEF0FF]'
                        : 'border-[#E5E7EB] bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${category === 'mentah' ? 'border-[#15803D] bg-[#15803D]' : 'border-[#D1D5DB] bg-white'}`}>
                      {category === 'mentah' && <span className="w-2 h-2 rounded-full bg-white inline-block" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                        🥦 Bahan Mentah
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">Sayur, buah, atau bahan segar yang masih layak olah</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Two-column row: Asal & Berat */}
              <div className="grid grid-cols-2 gap-4">
                {/* Asal Surplus */}
                <div>
                  <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                    Asal Surplus Makanan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.asal}
                    onChange={handleChange('asal')}
                    placeholder="Contoh: Buffet Sarapan Hotel, Event Bal"
                    className={inputCls(errors.asal)}
                  />
                  {errors.asal ? (
                    <p className="text-xs text-red-500 mt-1">{errors.asal}</p>
                  ) : (
                    <p className="text-xs text-[#64748B] mt-1">Contoh: Buffet breakfast, event banquet, atau sisa over-prep dapur.</p>
                  )}
                </div>

                {/* Berat Makanan */}
                <div>
                  <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                    Berat Makanan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.berat}
                      onChange={handleChange('berat')}
                      placeholder="Contoh: 12.50"
                      className={`${inputCls(errors.berat)} pr-14`}
                      min="0"
                      step="0.01"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#E5E7EB] text-[#64748B] text-xs font-semibold px-2.5 py-1 rounded-lg">
                      Kg
                    </span>
                  </div>
                  {errors.berat ? (
                    <p className="text-xs text-red-500 mt-1">{errors.berat}</p>
                  ) : (
                    <p className="text-xs text-[#64748B] mt-1">Perkiraan total berat bersih donasi (minimal 1,00 kg untuk penjemputan gratis kurir).</p>
                  )}
                </div>
              </div>
            </div>

            {/* CARD 2: Kondisi Higienitas & Foto */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#15803D]" />
                </div>
                <h2 className="text-base font-bold text-[#0F172A]">Kondisi Higienitas & Foto</h2>
              </div>
              <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
                Unggah foto kemasan asli dan kondisi makanan untuk verifikasi cepat oleh tim pengawas FoodRescue.
              </p>

              {/* Kondisi & Informasi Penyimpanan */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-[#0F172A] block mb-1.5">
                  Kondisi & Informasi Penyimpanan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.kondisi}
                  onChange={handleChange('kondisi')}
                  rows={4}
                  placeholder="Deskripsikan kondisi makanan, suhu simpan, wadah, dan alergen..."
                  className={`w-full px-4 py-3 bg-[#F9FAFB] border ${errors.kondisi ? 'border-red-400' : 'border-[#E5E7EB]'} rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 ${errors.kondisi ? 'focus:ring-red-300' : 'focus:ring-[#15803D]/25'} focus:border-[#15803D] transition resize-none`}
                />
                {errors.kondisi ? (
                  <p className="text-xs text-red-500 mt-1">{errors.kondisi}</p>
                ) : (
                  <p className="text-xs text-[#64748B] mt-1">Jelaskan suhu penyimpanan (chilled/frozen/ambient), batas aman konsumsi, serta potensi alergen (kacang, gluten, susu, dsb.).</p>
                )}
              </div>

              {/* Foto Makanan */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#0F172A]">
                    Foto Makanan (Bukti Higienitas) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-[#64748B]">JPG, PNG, WebP • Maks 5 MB</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {photoUrl ? (
                  /* Photo preview state */
                  <div className="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-4">
                    <div className="flex gap-4 items-start">
                      {/* Thumbnail */}
                      <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ width: 160, height: 120 }}>
                        <img
                          src={photoUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-2">
                          <span className="flex items-center gap-1 text-white text-xs font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" /> Pratinjau Foto
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <ImageIcon className="w-4 h-4 text-[#64748B] shrink-0" />
                          <span className="text-xs text-[#0F172A] font-medium truncate">{photoName}</span>
                          <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-semibold px-2 py-0.5 rounded-full shrink-0">Siap</span>
                        </div>

                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1.5 border border-[#15803D] text-[#15803D] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#ECFDF5] transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Ganti Foto
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="flex items-center gap-1.5 border border-red-300 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Empty/dropzone state */
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed ${errors.photo ? 'border-red-400 bg-red-50' : 'border-[#D1D5DB] bg-[#F9FAFB]'} rounded-xl p-10 flex flex-col items-center gap-3 hover:border-[#15803D] hover:bg-[#ECFDF5] transition-colors group`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EEF0FF] flex items-center justify-center group-hover:bg-[#DCFCE7] transition-colors">
                      <Upload className="w-6 h-6 text-[#4F46E5] group-hover:text-[#15803D] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0F172A]">Klik atau seret foto ke sini</p>
                      <p className="text-xs text-[#64748B] mt-1">JPG, PNG, WebP — Maksimal 5 MB</p>
                    </div>
                  </button>
                )}

                {errors.photo && (
                  <p className="text-xs text-red-500 mt-1">{errors.photo}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (1/3) */}
          <div className="w-72 shrink-0 flex flex-col gap-4">

            {/* Card 1: Panduan Kepatuhan Pangan */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-[#0F172A]">Panduan Kepatuhan Pangan</h3>
                <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-semibold px-2 py-0.5 rounded-full shrink-0">Wajib</span>
              </div>
              <p className="text-xs text-[#15803D] font-medium mb-4">ISO 22000 & SOP FoodRescue</p>

              <div className="flex flex-col gap-3">
                {[
                  { title: 'Kemasan Higienis', desc: 'Wadah food-grade tertutup rapat dan bersih.' },
                  { title: 'Batas Konsumsi', desc: 'Makanan matang berjarak maksimal 4–6 jam dari waktu masak.' },
                  { title: 'Kontrol Suhu', desc: 'Simpan di chiller (<4°C) atau penghangat sebelum diserahterimakan.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3 bg-[#EEF0FF] rounded-xl p-3">
                    <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#15803D]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0F172A]">{title}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Perlu Bantuan Form? */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF1E0] flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4 text-[#B45309]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Perlu Bantuan Form?</h3>
                  <p className="text-[11px] text-[#15803D] font-semibold">● Tim Siaga Sedang Online</p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                Butuh bantuan penjemputan armada roda empat, kontainer berinsulasi dingin khusus (&gt;50 kg), atau penyesuaian jadwal serah terima? Tim siaga FoodRescue siap mendampingi.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-[#15803D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#166534] transition-colors">
                <MessageCircle className="w-4 h-4" />
                Buka Chat Tim Siaga
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (sticky) */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-[#E5E7EB] px-6 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            Protokol Logistik Terverifikasi
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="border border-[#E5E7EB] bg-white text-[#64748B] rounded-xl px-5 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-[#15803D] text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-[#166534] transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Publikasikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

