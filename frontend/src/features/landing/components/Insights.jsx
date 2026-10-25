import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { AI_INSIGHTS_ARTICLES } from '../data/landingData.js';

export function Insights() {
  return (
    <section className="py-16 md:py-24 bg-[#EAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3F3EA] text-[#007E68] text-[11px] font-extrabold tracking-wider uppercase mb-3 select-none shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI INSIGHTS</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl sm:text-4xl text-[#111111] tracking-tight mb-3">
            Inovasi & Pengetahuan Sirkular
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Eksplorasi bagaimana kecerdasan buatan merevolusi pemanfaatan sisa makanan menjadi energi dan kompos bernilai tinggi.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AI_INSIGHTS_ARTICLES.map((article, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl md:rounded-[20px] overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={article.img}
                  alt={article.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#007E68] tracking-wider uppercase shadow-xs">
                  {article.tag}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#6B7280] block mb-2">
                    {article.date}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#007E68] transition-colors leading-snug mb-2.5">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {article.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#007E68]">
                  <span>Baca selengkapnya</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Insights;
