import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

export function AiAssistantModal({
  isOpen,
  onClose,
  onOpen,
  chatInput,
  setChatInput
}) {
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI FoodRescue untuk Pengelola Limbah & Penyedia. Saya siap membantu menganalisis kesesuaian jenis limbah makanan, rekomendasi komposisi bahan baku kompos & biogas, serta rute jemput armada tercepat.',
    },
  ]);

  const handleSendAiMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setAiChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply =
        'Berdasarkan kapasitas fasilitas pengolahan Anda, pasokan limbah organik terdekat sangat stabil. Rasio C/N dari sisa roti dan sayur hari ini seimbang untuk mempercepat maturasi kompos dalam 14 hari.';
      const low = userText.toLowerCase();
      if (low.includes('ampas tahu') || low.includes('organik kering')) {
        reply =
          'Ampas tahu sangat kaya protein dan nitrogen. Sangat aman dan ideal dicampur limbah organik kering (ampas gandum/daun kering) dengan rasio 1:2 agar kelembapan terjaga dan aerasi kompos tetap optimal tanpa bau menyengat.';
      } else if (low.includes('catering') || low.includes('nasi')) {
        reply =
          'Limbah nasi dan lauk katering Surya memiliki potensi biogas tinggi (metana hingga 68%). Pastikan diproses dalam digester anaerob dalam 24 jam setelah penjemputan.';
      } else if (low.includes('sayur') || low.includes('jemput')) {
        reply =
          'Pasokan 150 kg sayur hijau dari Supermarket Hijau berjarak 5 km siap dijemput sebelum 17:00. Armada pikap dapat menghemat waktu tempuh 15 menit melalui rute Bypass.';
      }
      setAiChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2.5 hover:scale-105 transition-all cursor-pointer border-2 border-white/60"
        aria-label="Tanya Asisten AI"
      >
        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#52C4A7]" />
        <span>Tanya Asisten AI</span>
        <span className="w-2 h-2 rounded-full bg-[#52C4A7] animate-ping" />
      </button>

      {/* Modal Dialog AI Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[600px] overflow-hidden border border-gray-100">
            {/* Header Dialog */}
            <div className="p-4 sm:p-5 bg-[#007E68] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#52C4A7]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm sm:text-base">
                    Asisten AI FoodRescue
                  </h3>
                  <div className="text-[10px] text-[#E3F3EA] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C4A7]" />
                    Online • AI Waste Matching Model v3
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 bg-[#F8F9FA]">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#007E68] text-white rounded-br-xs'
                        : 'bg-white text-[#111111] shadow-xs border border-gray-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions Chips */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setChatInput(
                    'Apakah ampas tahu aman dicampur limbah organik kering lainnya?'
                  );
                }}
                className="px-2.5 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] hover:bg-[#007E68] hover:text-white transition-colors whitespace-nowrap font-medium cursor-pointer"
              >
                Ampas tahu + organik kering
              </button>
              <button
                type="button"
                onClick={() => {
                  setChatInput(
                    'Kapan perkiraan armada jemput tiba di Toko Roti Prima?'
                  );
                }}
                className="px-2.5 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] hover:bg-[#007E68] hover:text-white transition-colors whitespace-nowrap font-medium cursor-pointer"
              >
                Jadwal armada penjemput
              </button>
              <button
                type="button"
                onClick={() => {
                  setChatInput(
                    'Berapa estimasi nilai recovery kompos dari 95 kg roti?'
                  );
                }}
                className="px-2.5 py-1 rounded-full bg-[#E3F3EA] text-[#007E68] hover:bg-[#007E68] hover:text-white transition-colors whitespace-nowrap font-medium cursor-pointer"
              >
                Potensi recovery kompos
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendAiMessage}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tanyakan jadwal armada, jenis limbah, atau kapasitas fasilitas..."
                className="flex-1 bg-[#F5F5F4] text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-transparent focus:border-[#007E68] focus:bg-white focus:outline-none transition"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#007E68] hover:bg-[#0B3D2E] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AiAssistantModal;
