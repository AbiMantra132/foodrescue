import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { ForProvider } from '../features/dashboard/ForProvider.jsx';
import { ForPengelola } from '../features/dashboard/ForPengelola.jsx';
import { DashboardSidebar } from '../features/dashboard/DashboardSidebar.jsx';
import { DashboardHeader } from '../features/dashboard/DashboardHeader.jsx';
import { AiAssistantModal } from '../features/dashboard/AiAssistantModal.jsx';

export function DashboardPage({ defaultRole }) {
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get('role');
  const savedRole =
    typeof window !== 'undefined' ? localStorage.getItem('foodrescue_active_role') : null;
  const initialRole =
    defaultRole ||
    (queryRole === 'pengelola'
      ? 'pengelola'
      : queryRole === 'penyedia'
      ? 'penyedia'
      : savedRole || 'penyedia');
  const initialNav =
    searchParams.get('nav') || (initialRole === 'penyedia' ? 'Ringkasan' : 'Limbah Tersedia');

  const [activeRole, setActiveRole] = useState(initialRole);
  const [activeNav, setActiveNav] = useState(initialNav);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiChatInput, setAiChatInput] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleRole = () => {
    const nextRole = activeRole === 'penyedia' ? 'pengelola' : 'penyedia';
    setActiveRole(nextRole);
    setActiveNav(nextRole === 'penyedia' ? 'Ringkasan' : 'Limbah Tersedia');
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodrescue_active_role', nextRole);
    }
    showToast(
      `Beralih ke mode ${nextRole === 'penyedia' ? 'Penyedia Makanan' : 'Pengelola Limbah'}`
    );
  };

  const handleSelectRole = (role) => {
    if (activeRole === role) return;
    setActiveRole(role);
    setActiveNav(role === 'penyedia' ? 'Ringkasan' : 'Limbah Tersedia');
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodrescue_active_role', role);
    }
    showToast(
      `Beralih ke mode ${role === 'penyedia' ? 'Penyedia Makanan' : 'Pengelola Limbah'}`
    );
  };

  const handleQuickQuestion = (questionText) => {
    setIsAiModalOpen(true);
    setAiChatInput(questionText);
  };

  return (
    <div className="min-h-screen bg-white flex font-['Inter',sans-serif] text-[#111111] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0B3D2E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-fadeIn border border-emerald-700 text-xs sm:text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#52C4A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigasi & Switcher Role */}
      <DashboardSidebar
        activeRole={activeRole}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onSelectRole={handleSelectRole}
      />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
        <DashboardHeader
          activeRole={activeRole}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onToggleRole={handleToggleRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showToast={showToast}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeRole === 'penyedia' && (
            <ForProvider
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              showToast={showToast}
            />
          )}

          {activeRole === 'pengelola' && (
            <ForPengelola
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              showToast={showToast}
              setIsAiModalOpen={setIsAiModalOpen}
              setAiChatInput={setAiChatInput}
              handleQuickQuestion={handleQuickQuestion}
            />
          )}
        </main>
      </div>

      {/* Floating Action Button & Modal Asisten AI */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onOpen={() => setIsAiModalOpen(true)}
        onClose={() => setIsAiModalOpen(false)}
        chatInput={aiChatInput}
        setChatInput={setAiChatInput}
      />
    </div>
  );
}

export default DashboardPage;
