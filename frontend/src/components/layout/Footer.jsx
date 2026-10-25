import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { FOOTER_COLUMNS } from '../../features/landing/data/landingData.js';
import './layout.css';

export function Footer() {
  return (
    <footer id="misi" className="bg-[#0B3D2E] text-white pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-emerald-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group cursor-pointer inline-flex">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0B3D2E]">
                <Leaf className="w-5 h-5 fill-[#007E68]" />
              </div>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-white tracking-tight">
                Food<span className="text-[#52C4A7]">Rescue</span>
              </span>
            </Link>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-3xl text-white leading-tight mb-3">
              Kurangi limbah, <br />kelola sirkular.
            </h2>
            <p className="text-sm text-emerald-100/70 max-w-sm mb-6 leading-relaxed">
              Platform kecerdasan buatan terdepan yang menghubungkan surplus makanan dari sektor komersial langsung ke fasilitas daur ulang kompos dan biogas.
            </p>

            <div className="flex items-center gap-3">
              <Link
                to="/register?role=penyedia"
                className="px-5 py-2.5 rounded-full bg-[#007E68] hover:bg-[#52C4A7] hover:text-[#0B3D2E] text-white text-xs font-bold transition-all"
              >
                Gabung Jadi Mitra
              </Link>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-full border border-emerald-700 hover:bg-emerald-800 text-emerald-100 text-xs font-bold transition-all"
              >
                Lihat Dashboard
              </Link>
            </div>
          </div>

          {/* Footer Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx}>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-white mb-4 uppercase tracking-wider text-emerald-300">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-xs sm:text-sm text-emerald-100/70 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-200/60">
          <div>© 2026 FoodRescue Indonesia. Gerakan sirkularitas pangan bebas TPA.</div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#terms" className="hover:text-white transition-colors">Ketentuan Layanan</a>
            <a href="#standards" className="hover:text-white transition-colors">Standar Mutu Limbah</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
