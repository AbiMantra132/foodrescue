import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AdminBatchStatus =
  | 'belum_diperiksa'
  | 'sedang_ditinjau'
  | 'revisi_foto'
  | 'disetujui'
  | 'ditolak';

export interface AdminQueueItem {
  id: string;
  code: string;
  title: string;
  partner: string;
  partnerTier: string;
  partnerInitial: string;
  distance: string;
  portionInfo: string;
  portion: number;
  weight: string;
  priceInfo: string;
  isRedPrice?: boolean;
  timeRemaining: string;
  remainingHours: number;
  isUrgent: boolean;
  isRevision?: boolean;
  status: AdminBatchStatus;
  footerStatus: string;
  footerColor?: string;
  actionBtnText: string;
  photoTime: string;
  image: string;
  consumptionDeadline: string;
  storage: string;
  category?: string;
  rejectionReason?: string;
  revisionNote?: string;
  submittedAt?: string;
  checklist: {
    packaging: boolean;
    visualAroma: boolean;
    timeRemaining: boolean;
  };
}

export interface AdminHistoryItem {
  id: string;
  code: string;
  category: string;
  title: string;
  detail: string;
  partner: string;
  partnerCity: string;
  timeString: string;
  responseTimeSLA: string;
  status: 'disetujui' | 'ditolak';
  statusLabel: string;
  image: string;
  notes?: string;
  isRedDetail?: boolean;
}

export interface AdminProfile {
  name: string;
  nip: string;
  email: string;
  phone: string;
  shift: string;
  authority: string;
  avatarUrl?: string;
  nodeStatus: string;
}

export interface AdminContextType {
  queueList: AdminQueueItem[];
  historyList: AdminHistoryItem[];
  selectedItem: AdminQueueItem | null;
  setSelectedItem: (item: AdminQueueItem | null) => void;
  selectForInspection: (item: AdminQueueItem) => void;
  toggleChecklist: (key: 'packaging' | 'visualAroma' | 'timeRemaining') => void;
  approveBatch: (item: AdminQueueItem) => void;
  rejectBatch: (item: AdminQueueItem, reason: string, notes: string) => void;
  requestRevision: (item: AdminQueueItem, notes: string) => void;
  refreshQueue: () => void;
  profile: AdminProfile;
  updateProfile: (data: Partial<AdminProfile>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
}

const INITIAL_QUEUE: AdminQueueItem[] = [
  {
    id: 'FB-8841',
    code: '#FB-8841',
    title: 'Roti Pastry Artisan Aneka Rasa',
    partner: 'Bakery Artisan Senopati',
    partnerTier: 'Gold Partner',
    partnerInitial: 'B',
    distance: '2.4 km',
    portionInfo: '35 Porsi (12 Kg)',
    portion: 35,
    weight: '12 Kg',
    priceInfo: 'Gratis',
    timeRemaining: 'Sisa 3.5 Jam',
    remainingHours: 3.5,
    isUrgent: true,
    status: 'sedang_ditinjau',
    footerStatus: 'Sedang Ditinjau',
    footerColor: 'text-amber-800',
    actionBtnText: 'Buka Inspeksi',
    photoTime: 'Foto: 17:15 WIB',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    consumptionDeadline: 'Hari ini, 21:00 WIB',
    storage: 'Suhu Ruang (≤25°C)',
    category: 'Kering / Roti',
    checklist: { packaging: true, visualAroma: true, timeRemaining: true },
  },
  {
    id: 'FB-8840',
    code: '#FB-8840',
    title: 'Nasi Kotak Ayam Bakar Bumbu Rujak',
    partner: 'Katering Berkah Rasa',
    partnerTier: 'Silver Partner',
    partnerInitial: 'K',
    distance: '3.8 km',
    portionInfo: '50 Box (25 Kg)',
    portion: 50,
    weight: '25 Kg',
    priceInfo: 'Subsidi Rp 10.000',
    timeRemaining: 'Sisa 4.2 Jam',
    remainingHours: 4.2,
    isUrgent: true,
    status: 'belum_diperiksa',
    footerStatus: 'Belum Diperiksa',
    actionBtnText: 'Tinjau',
    photoTime: 'Foto: 16:45 WIB',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    consumptionDeadline: 'Hari ini, 20:30 WIB',
    storage: 'Insulated Warmer Box (>60°C)',
    category: 'Makanan Matang',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8839',
    code: '#FB-8839',
    title: 'Salad Sayur Organik Fresh Bowl',
    partner: 'Hotel Grand Melia Kitchen',
    partnerTier: 'Diamond Partner',
    partnerInitial: 'H',
    distance: '1.8 km',
    portionInfo: '20 Bowl (8 Kg)',
    portion: 20,
    weight: '8 Kg',
    priceInfo: 'Rp 12.000',
    timeRemaining: 'Sisa 8 Jam',
    remainingHours: 8.0,
    isUrgent: false,
    status: 'belum_diperiksa',
    footerStatus: 'Suhu Chiller 4°C',
    actionBtnText: 'Tinjau',
    photoTime: 'Foto: 15:30 WIB',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    consumptionDeadline: 'Hari ini, 23:30 WIB',
    storage: 'Chiller Pendingin (4°C)',
    category: 'Hasil Bumi Segar',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8838',
    code: '#FB-8838',
    title: 'Paket Buah Potong Segar Tropis',
    partner: 'Supermarket Segar Sejahtera',
    partnerTier: 'Gold Partner',
    partnerInitial: 'S',
    distance: '4.1 km',
    portionInfo: '15 Pack (6 Kg)',
    portion: 15,
    weight: '6 Kg',
    priceInfo: 'Foto label buram',
    isRedPrice: true,
    timeRemaining: 'Revisi Foto',
    remainingHours: 7.5,
    isUrgent: false,
    isRevision: true,
    status: 'revisi_foto',
    footerStatus: 'Pesan Terkirim',
    actionBtnText: 'Detail',
    photoTime: 'Foto: 14:10 WIB',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80',
    consumptionDeadline: 'Hari ini, 22:00 WIB',
    storage: 'Cold Storage (4°C)',
    category: 'Buah & Olahan',
    revisionNote: 'Foto cap tanggal buram dan tidak terbaca jelas pada segel plastik kemasan luar.',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8837',
    code: '#FB-8837',
    title: 'Aneka Dimsum & Baozi Hangat',
    partner: 'Imperial Kitchen Thamrin',
    partnerTier: 'Gold Partner',
    partnerInitial: 'I',
    distance: '2.9 km',
    portionInfo: '30 Porsi (10 Kg)',
    portion: 30,
    weight: '10 Kg',
    priceInfo: 'Gratis',
    timeRemaining: 'Sisa 6 Jam',
    remainingHours: 6.0,
    isUrgent: false,
    status: 'belum_diperiksa',
    footerStatus: 'Belum Diperiksa',
    actionBtnText: 'Tinjau',
    photoTime: 'Foto: 15:00 WIB',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
    consumptionDeadline: 'Hari ini, 21:00 WIB',
    storage: 'Steamer Box (>60°C)',
    category: 'Makanan Matang',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8836',
    code: '#FB-8836',
    title: 'Croissant Cokelat & Danish Keju',
    partner: 'Bakery Delice Senopati',
    partnerTier: 'Silver Partner',
    partnerInitial: 'B',
    distance: '3.1 km',
    portionInfo: '25 Porsi (8 Kg)',
    portion: 25,
    weight: '8 Kg',
    priceInfo: 'Gratis',
    timeRemaining: 'Sisa 7 Jam',
    remainingHours: 7.0,
    isUrgent: false,
    status: 'belum_diperiksa',
    footerStatus: 'Belum Diperiksa',
    actionBtnText: 'Tinjau',
    photoTime: 'Foto: 14:30 WIB',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    consumptionDeadline: 'Hari ini, 22:00 WIB',
    storage: 'Suhu Ruang (≤25°C)',
    category: 'Kering / Roti',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8835B',
    code: '#FB-8835',
    title: 'Sandwich Gandum Smoked Beef',
    partner: 'Hotel Borobudur Deli',
    partnerTier: 'Diamond Partner',
    partnerInitial: 'H',
    distance: '1.5 km',
    portionInfo: '18 Porsi (5 Kg)',
    portion: 18,
    weight: '5 Kg',
    priceInfo: 'Gratis',
    timeRemaining: 'Sisa 9 Jam',
    remainingHours: 9.0,
    isUrgent: false,
    status: 'belum_diperiksa',
    footerStatus: 'Belum Diperiksa',
    actionBtnText: 'Tinjau',
    photoTime: 'Foto: 13:45 WIB',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80',
    consumptionDeadline: 'Besok, 08:00 WIB',
    storage: 'Chiller Pendingin (4°C)',
    category: 'Kering / Roti',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
  {
    id: 'FB-8834',
    code: '#FB-8834',
    title: 'Jus Buah Cold-Pressed Aneka Rasa',
    partner: 'FreshMart Sudirman',
    partnerTier: 'Gold Partner',
    partnerInitial: 'F',
    distance: '2.2 km',
    portionInfo: '24 Botol (12 Liter)',
    portion: 24,
    weight: '12 Liter',
    priceInfo: 'Foto label tanggal kabur',
    isRedPrice: true,
    timeRemaining: 'Revisi Foto',
    remainingHours: 8.5,
    isUrgent: false,
    isRevision: true,
    status: 'revisi_foto',
    footerStatus: 'Pesan Terkirim',
    actionBtnText: 'Detail',
    photoTime: 'Foto: 13:10 WIB',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80',
    consumptionDeadline: 'Hari ini, 23:00 WIB',
    storage: 'Cold Chiller (2°C)',
    category: 'Minuman / Olahan',
    revisionNote: 'Mohon upload ulang foto cap kedaluwarsa botol minuman.',
    checklist: { packaging: false, visualAroma: false, timeRemaining: false },
  },
];

const INITIAL_PROFILE: AdminProfile = {
  name: 'Rafi Pratama',
  nip: 'ADM-VRF-092',
  email: 'rafi.verifikator@foodrescue.id',
  phone: '+62 812-3456-7890',
  shift: 'Shift Pagi',
  authority: 'Otoritas Validasi Kelas A • Wilayah Sentral Jakarta',
  nodeStatus: 'Terhubung Cloud Node 04',
};

// Generate 142 total history items (128 approved, 14 rejected)
function generateInitialHistory(): AdminHistoryItem[] {
  const top6: AdminHistoryItem[] = [
    {
      id: 'h-1',
      code: '#FB-8835',
      category: 'Kering / Roti',
      title: 'Roti Gandum & Pastry Mix',
      detail: '14 Box • Kemasan Kedap Kertas Kraft',
      partner: 'Bakery Artisan Senopati',
      partnerCity: 'Jakarta Selatan',
      timeString: 'Hari ini, 15:40 WIB',
      responseTimeSLA: '9 mnt respon SLA',
      status: 'disetujui',
      statusLabel: '✓ Disetujui & Tayang',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
      notes: 'Lolos uji inspeksi kemasan dan masa edar.',
    },
    {
      id: 'h-2',
      code: '#FB-8832',
      category: 'Makanan Matang',
      title: 'Paket Nasi Kotak Ayam Panggang',
      detail: '45 Porsi • Termal Panas 68°C',
      partner: 'Dapur Berkah Resto',
      partnerCity: 'Tangerang Selatan',
      timeString: 'Hari ini, 14:15 WIB',
      responseTimeSLA: '14 mnt respon SLA',
      status: 'disetujui',
      statusLabel: '✓ Disetujui & Tayang',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
      notes: 'Suhu termal panas sesuai standar SOP HACCP.',
    },
    {
      id: 'h-3',
      code: '#FB-8829',
      category: 'Susu & Olahan',
      title: 'Susu UHT & Dairy Mix',
      detail: 'Segel Karton Robek / Cacat',
      partner: 'Minimarket Prima Mart',
      partnerCity: 'Jakarta Pusat',
      timeString: 'Hari ini, 13:02 WIB',
      responseTimeSLA: '6 mnt respon SLA',
      status: 'ditolak',
      statusLabel: '⊗ Ditolak (Kemasan Rusak)',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
      isRedDetail: true,
      notes: 'Kemasan primer karton sobek berisiko kontaminasi.',
    },
    {
      id: 'h-4',
      code: '#FB-8824',
      category: 'Hasil Bumi Segar',
      title: 'Sayuran Segar Hidroponik',
      detail: '22 Kg • Suhu Ruang Dingin 12°C',
      partner: 'Supermarket Segar Sejahtera',
      partnerCity: 'Jakarta Barat',
      timeString: 'Hari ini, 11:20 WIB',
      responseTimeSLA: '8 mnt respon SLA',
      status: 'disetujui',
      statusLabel: '✓ Disetujui & Tayang',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
      notes: 'Kondisi sayuran sangat segar dan bebas busuk.',
    },
    {
      id: 'h-5',
      code: '#FB-8818',
      category: 'Buah & Olahan',
      title: 'Buah Potong Segar Tropis',
      detail: '30 Cup • Cold Storage Active',
      partner: 'Hotel Gran Melia Catering',
      partnerCity: 'Jakarta Selatan',
      timeString: 'Kemarin, 19:10 WIB',
      responseTimeSLA: '18 mnt respon SLA',
      status: 'disetujui',
      statusLabel: '✓ Disetujui & Tayang',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
      notes: 'Disimpan dalam chiller container food-grade.',
    },
    {
      id: 'h-6',
      code: '#FB-8812',
      category: 'Pencuci Mulut',
      title: 'Puding & Dessert Jar Mix',
      detail: 'Kadaluarsa H-0 / Tidak Ada Best Before',
      partner: 'Kafe Senja Cikini',
      partnerCity: 'Jakarta Pusat',
      timeString: 'Kemarin, 16:30 WIB',
      responseTimeSLA: '11 mnt respon SLA',
      status: 'ditolak',
      statusLabel: '⊗ Ditolak (Label Kadaluarsa)',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80',
      isRedDetail: true,
      notes: 'Masa kedaluwarsa melewati ambang batas toleransi.',
    },
  ];

  // Tambahkan 136 item berikutnya (124 approved, 12 rejected)
  const categories = ['Kering / Roti', 'Makanan Matang', 'Hasil Bumi Segar', 'Buah & Olahan', 'Minuman'];
  const partners = [
    { name: 'Hotel Grand Hyatt Dapur', city: 'Jakarta Pusat' },
    { name: 'Resto Padang Merdeka', city: 'Jakarta Timur' },
    { name: 'Catering Sari Rasa', city: 'Jakarta Selatan' },
    { name: 'Super Indo Express', city: 'Jakarta Utara' },
    { name: 'Toko Roti Mawar Senopati', city: 'Jakarta Selatan' },
  ];

  const items: AdminHistoryItem[] = [...top6];
  let rejectedCount = 2; // already 2 rejected in top 6 (total target: 14)
  let approvedCount = 4; // already 4 approved in top 6 (total target: 128)

  for (let i = 7; i <= 142; i++) {
    const isRejected = rejectedCount < 14 && (i % 11 === 0 || i > 130);
    if (isRejected) rejectedCount++;
    else approvedCount++;

    const p = partners[i % partners.length];
    const cat = categories[i % categories.length];
    const codeNum = 8800 - i;
    const minutes = 5 + (i % 20);

    items.push({
      id: `h-${i}`,
      code: `#FB-${codeNum}`,
      category: cat,
      title: isRejected ? `Menu Surplus Batch #${codeNum}` : `Paket Pangan Sehat #${codeNum}`,
      detail: isRejected ? 'Wadah Bocor / Segel Terbuka' : `${15 + (i % 35)} Porsi • Kemasan Tertutup`,
      partner: p.name,
      partnerCity: p.city,
      timeString: `${2 + (i % 25)} hari lalu, ${10 + (i % 12)}:${10 + (i % 45)} WIB`,
      responseTimeSLA: `${minutes} mnt respon SLA`,
      status: isRejected ? 'ditolak' : 'disetujui',
      statusLabel: isRejected ? '⊗ Ditolak (Kemasan Rusak)' : '✓ Disetujui & Tayang',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
      isRedDetail: isRejected,
      notes: isRejected ? 'Gagal verifikasi fisik pada segel kontainer.' : 'Telah diverifikasi sesuai SOP standar.',
    });
  }

  return items;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [queueList, setQueueList] = useState<AdminQueueItem[]>(() => {
    const saved = localStorage.getItem('foodrescue_admin_queue');
    return saved ? JSON.parse(saved) : INITIAL_QUEUE;
  });

  const [historyList, setHistoryList] = useState<AdminHistoryItem[]>(() => {
    const saved = localStorage.getItem('foodrescue_admin_history');
    return saved ? JSON.parse(saved) : generateInitialHistory();
  });

  const [selectedItem, setSelectedItem] = useState<AdminQueueItem | null>(() => {
    return queueList[0] || null;
  });

  const [profile, setProfile] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem('foodrescue_admin_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('foodrescue_admin_queue', JSON.stringify(queueList));
  }, [queueList]);

  useEffect(() => {
    localStorage.setItem('foodrescue_admin_history', JSON.stringify(historyList));
  }, [historyList]);

  useEffect(() => {
    localStorage.setItem('foodrescue_admin_profile', JSON.stringify(profile));
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const selectForInspection = (item: AdminQueueItem) => {
    // Ubah status belum_diperiksa jadi sedang_ditinjau
    const updated = queueList.map(q => {
      if (q.id === item.id) {
        return {
          ...q,
          status: q.status === 'belum_diperiksa' ? ('sedang_ditinjau' as const) : q.status,
          footerStatus: q.status === 'belum_diperiksa' ? 'Sedang Ditinjau' : q.footerStatus,
          footerColor: 'text-amber-800',
        };
      }
      return q;
    });

    setQueueList(updated);
    const curr = updated.find(q => q.id === item.id) || item;
    setSelectedItem(curr);
  };

  const toggleChecklist = (key: 'packaging' | 'visualAroma' | 'timeRemaining') => {
    if (!selectedItem) return;
    const newChecklist = {
      ...selectedItem.checklist,
      [key]: !selectedItem.checklist[key],
    };
    const updatedItem = {
      ...selectedItem,
      checklist: newChecklist,
    };
    setSelectedItem(updatedItem);
    setQueueList(prev => prev.map(q => (q.id === updatedItem.id ? updatedItem : q)));
  };

  const approveBatch = (item: AdminQueueItem) => {
    // 1. Hapus dari queue
    const remainingQueue = queueList.filter(q => q.id !== item.id);
    setQueueList(remainingQueue);

    // 2. Tambah ke Riwayat
    const newHistoryItem: AdminHistoryItem = {
      id: 'h-' + Date.now(),
      code: item.code,
      category: item.category || 'Surplus Pangan',
      title: item.title,
      detail: `${item.portionInfo} • Kemasan Tersegel Lolos Uji`,
      partner: item.partner,
      partnerCity: 'Jakarta Pusat',
      timeString: `Hari ini, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      responseTimeSLA: '12 mnt respon SLA',
      status: 'disetujui',
      statusLabel: '✓ Disetujui & Tayang',
      image: item.image,
      notes: 'Lolos seluruh 3 kriteria kurasi higienitas.',
    };
    setHistoryList(prev => [newHistoryItem, ...prev]);

    // 3. Set item berikutnya di queue
    setSelectedItem(remainingQueue[0] || null);

    showToast(`Batch ${item.code} disetujui dan diterbitkan ke pengelola`);
  };

  const rejectBatch = (item: AdminQueueItem, reason: string, notes: string) => {
    const remainingQueue = queueList.filter(q => q.id !== item.id);
    setQueueList(remainingQueue);

    const newHistoryItem: AdminHistoryItem = {
      id: 'h-' + Date.now(),
      code: item.code,
      category: item.category || 'Surplus Pangan',
      title: item.title,
      detail: `${reason} • Catatan: ${notes || 'Tidak memenuhi SOP'}`,
      partner: item.partner,
      partnerCity: 'Jakarta Pusat',
      timeString: `Hari ini, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      responseTimeSLA: '10 mnt respon SLA',
      status: 'ditolak',
      statusLabel: `⊗ Ditolak (${reason})`,
      image: item.image,
      isRedDetail: true,
      notes: notes,
    };
    setHistoryList(prev => [newHistoryItem, ...prev]);

    setSelectedItem(remainingQueue[0] || null);
    showToast(`Batch ${item.code} ditolak (${reason})`);
  };

  const requestRevision = (item: AdminQueueItem, notes: string) => {
    const updated = queueList.map(q => {
      if (q.id === item.id) {
        return {
          ...q,
          status: 'revisi_foto' as const,
          footerStatus: 'Pesan Terkirim',
          actionBtnText: 'Detail',
          priceInfo: notes || 'Foto label buram',
          isRedPrice: true,
          timeRemaining: 'Revisi Foto',
          isRevision: true,
          revisionNote: notes,
        };
      }
      return q;
    });

    setQueueList(updated);
    const curr = updated.find(q => q.id === item.id) || null;
    setSelectedItem(curr);
    showToast(`Permintaan revisi foto dikirim ke ${item.partner}`);
  };

  const refreshQueue = () => {
    setQueueList(INITIAL_QUEUE);
    setSelectedItem(INITIAL_QUEUE[0]);
    showToast('Data diperbarui');
  };

  const updateProfile = (data: Partial<AdminProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <AdminContext.Provider
      value={{
        queueList,
        historyList,
        selectedItem,
        setSelectedItem,
        selectForInspection,
        toggleChecklist,
        approveBatch,
        rejectBatch,
        requestRevision,
        refreshQueue,
        profile,
        updateProfile,
        toastMessage,
        showToast,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

