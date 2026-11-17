import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SurplusItem {
  id: string;
  code: string;
  batchId: string;
  partnerType: 'Hotel Mitra' | 'Restoran' | 'Supermarket' | 'Katering' | 'Toko Roti';
  title: string;
  portion: number;
  totalPortion: number;
  distance: number;
  distanceText: string;
  provider: string;
  providerFullName: string;
  area: string;
  address: string;
  deadline: string;
  temperatureInfo: string;
  category: 'Siap Saji' | 'Roti & Pastry' | 'Sayur & Buah';
  image: string;
  status: 'Terverifikasi';
  rating: string;
  reviewCount: number;
  estPrice: string;
  totalWeight: string;
  hygieneGrade: string;
  storage: string;
  cookTime: string;
  allergens: string[];
  certifications: string[];
  pic: string;
  pickupLocation: string;
}

export type ClaimStatus = 'siap-ambil' | 'pending' | 'selesai' | 'dibatalkan';

export interface ClaimItem {
  id: string;
  batchId: string;
  timeAgo?: string;
  distributedBadge?: string;
  status: ClaimStatus;
  statusLabel: string;
  title: string;
  provider: string;
  portion: number;
  deadline?: string;
  temperature?: string;
  hygiene?: string;
  distance?: string;
  pickupPoint?: string;
  volunteer?: string;
  co2Saved?: string;
  receivedTime?: string;
  receiptNo?: string;
  cancelType?: string;
  reason?: string;
  closedTime?: string;
  note?: string;
  image: string;
  canCancel?: boolean;
  hasQr?: boolean;
  date: string;
}

export interface SelectedCartItem {
  surplus: SurplusItem;
  portion: number;
}

export interface PengelolaAccount {
  institutionName: string;
  picName: string;
  officialEmail: string;
  phone: string;
  address: string;
  dailyCapacity: string;
  description: string;
  institutionId: string;
  lastUpdated: string;
}

export interface PengelolaContextType {
  surplusList: SurplusItem[];
  selectedCartItem: SelectedCartItem | null;
  setSelectedCartItem: (item: SelectedCartItem | null) => void;
  claimsList: ClaimItem[];
  accountData: PengelolaAccount;
  updateAccount: (data: Partial<PengelolaAccount>) => void;
  createClaim: (surplus: SurplusItem, portion: number) => { success: boolean; message?: string };
  cancelClaim: (id: string) => void;
  remainingQuota: number;
  totalQuota: number;
  dailyDistributed: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  isHotlineModalOpen: boolean;
  setIsHotlineModalOpen: (open: boolean) => void;
}

const INITIAL_SURPLUS: SurplusItem[] = [
  {
    id: 'pastry-croissant',
    code: 'FRS-89241',
    batchId: '#FB-1042',
    partnerType: 'Hotel Mitra',
    title: 'Pastry & Croissant Sarapan',
    portion: 25,
    totalPortion: 25,
    distance: 1.2,
    distanceText: '1.2 km',
    provider: 'Dapur Grand Sahid',
    providerFullName: 'Dapur Grand Sahid Jaya',
    area: 'Tanah Abang',
    address: 'Jl. Jend. Sudirman No. 86, Jakarta Pusat',
    deadline: '17:00 WIB',
    temperatureInfo: 'Suhu Kamar Bersih',
    category: 'Roti & Pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    status: 'Terverifikasi',
    rating: '4.9',
    reviewCount: 128,
    estPrice: 'Rp35.000/porsi',
    totalWeight: '±5.5 kg',
    hygieneGrade: 'Grade A',
    storage: 'Suhu Ruang',
    cookTime: 'Hari ini, 06:30 WIB',
    allergens: ['Gandum & Gluten', 'Susu & Mentega', 'Telur'],
    certifications: ['Halal MUI', 'Bebas Pengawet Kimia'],
    pic: 'Sdr. Danang',
    pickupLocation: 'Basement 1, Lobby Logistik Pintu Timur',
  },
  {
    id: 'bento-ayam',
    code: 'FRS-89242',
    batchId: '#FB-1045',
    partnerType: 'Restoran',
    title: 'Bento Ayam Panggang Teriyaki',
    portion: 30,
    totalPortion: 30,
    distance: 2.4,
    distanceText: '2.4 km',
    provider: 'Restoran Rasa Nusantara',
    providerFullName: 'Restoran Rasa Nusantara Senen',
    area: 'Senen',
    address: 'Jl. Senen Raya No. 12, Senen, Jakarta Pusat',
    deadline: '20:00 WIB',
    temperatureInfo: 'Wadah Segel Rapat',
    category: 'Siap Saji',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    status: 'Terverifikasi',
    rating: '4.8',
    reviewCount: 94,
    estPrice: 'Rp28.000/porsi',
    totalWeight: '±9.0 kg',
    hygieneGrade: 'Grade A',
    storage: 'Suhu Ruang',
    cookTime: 'Hari ini, 11:30 WIB',
    allergens: ['Kedelai', 'Wijen'],
    certifications: ['Halal MUI'],
    pic: 'Ibu Linda',
    pickupLocation: 'Pintu Samping Parkir Restoran',
  },
  {
    id: 'sayur-buah',
    code: 'FRS-89243',
    batchId: '#FB-1046',
    partnerType: 'Supermarket',
    title: 'Paket Sayur Segar & Buah Potong',
    portion: 18,
    totalPortion: 18,
    distance: 3.1,
    distanceText: '3.1 km',
    provider: 'FreshMart Sudirman',
    providerFullName: 'FreshMart Sudirman Setiabudi',
    area: 'Setiabudi',
    address: 'Jl. Jend. Sudirman Kav. 24, Jakarta Selatan',
    deadline: '18:30 WIB',
    temperatureInfo: 'Suhu Dingin <4°C',
    category: 'Sayur & Buah',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
    status: 'Terverifikasi',
    rating: '4.7',
    reviewCount: 62,
    estPrice: 'Rp22.000/porsi',
    totalWeight: '±6.2 kg',
    hygieneGrade: 'Grade A',
    storage: 'Chiller Pendingin',
    cookTime: 'Hari ini, 07:00 WIB',
    allergens: ['Bebas Alergen Utama'],
    certifications: ['Organik Terverifikasi'],
    pic: 'Bpk. Hendra',
    pickupLocation: 'Loading Dock Barat Supermarket',
  },
  {
    id: 'nasi-kotak',
    code: 'FRS-89244',
    batchId: '#FB-1047',
    partnerType: 'Katering',
    title: 'Nasi Kotak Ayam Bakar Madu',
    portion: 40,
    totalPortion: 40,
    distance: 1.8,
    distanceText: '1.8 km',
    provider: 'Catering Berkah Jaya',
    providerFullName: 'Catering Berkah Jaya Matraman',
    area: 'Matraman',
    address: 'Jl. Matraman Raya No. 90, Jakarta Timur',
    deadline: '19:00 WIB',
    temperatureInfo: 'Porsi Hangat',
    category: 'Siap Saji',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
    status: 'Terverifikasi',
    rating: '4.9',
    reviewCount: 110,
    estPrice: 'Rp30.000/porsi',
    totalWeight: '±14.0 kg',
    hygieneGrade: 'Grade A',
    storage: 'Insulated Thermal Box',
    cookTime: 'Hari ini, 12:00 WIB',
    allergens: ['Unggas', 'Madu'],
    certifications: ['Halal MUI'],
    pic: 'Ibu Ratna',
    pickupLocation: 'Dapur Transit Lantai Dasar',
  },
  {
    id: 'roti-gandum',
    code: 'FRS-89245',
    batchId: '#FB-1048',
    partnerType: 'Toko Roti',
    title: 'Roti Gandum & Baguette Artisan',
    portion: 35,
    totalPortion: 35,
    distance: 2.7,
    distanceText: '2.7 km',
    provider: 'Bakery Delice Senopati',
    providerFullName: 'Bakery Delice Artisan Senopati',
    area: 'Kebayoran',
    address: 'Jl. Senopati No. 41, Kebayoran Baru, Jakarta Selatan',
    deadline: '21:00 WIB',
    temperatureInfo: 'Segel Higienis',
    category: 'Roti & Pastry',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    status: 'Terverifikasi',
    rating: '4.8',
    reviewCount: 85,
    estPrice: 'Rp25.000/porsi',
    totalWeight: '±8.5 kg',
    hygieneGrade: 'Grade A',
    storage: 'Suhu Ruang',
    cookTime: 'Hari ini, 08:00 WIB',
    allergens: ['Gandum & Gluten'],
    certifications: ['Bebas Pengawet'],
    pic: 'Chef Antoine',
    pickupLocation: 'Kasir Samping Toko Roti',
  },
  {
    id: 'dimsum-bao',
    code: 'FRS-89246',
    batchId: '#FB-1049',
    partnerType: 'Restoran',
    title: 'Dimsum & Bao Hangat',
    portion: 20,
    totalPortion: 20,
    distance: 3.5,
    distanceText: '3.5 km',
    provider: 'Imperial Kitchen',
    providerFullName: 'Imperial Kitchen & Dimsum Thamrin',
    area: 'Thamrin',
    address: 'Plaza Thamrin Lantai 3, Jl. MH Thamrin, Jakarta Pusat',
    deadline: '17:30 WIB',
    temperatureInfo: 'Siap Konsumsi',
    category: 'Siap Saji',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
    status: 'Terverifikasi',
    rating: '4.9',
    reviewCount: 142,
    estPrice: 'Rp32.000/porsi',
    totalWeight: '±6.0 kg',
    hygieneGrade: 'Grade A',
    storage: 'Steamer Insulasi Hangat',
    cookTime: 'Hari ini, 13:00 WIB',
    allergens: ['Udang', 'Ayam', 'Gluten'],
    certifications: ['Halal MUI'],
    pic: 'Bpk. Kevin',
    pickupLocation: 'Pintu Penerimaan Barang Basah Mall',
  },
];

const INITIAL_CLAIMS: ClaimItem[] = [
  {
    id: '#CLM-8801',
    batchId: '#FB-1042',
    status: 'siap-ambil',
    statusLabel: '● Disetujui / Siap Ambil',
    title: 'Pastry & Croissant Sarapan',
    provider: 'Dapur Grand Sahid',
    portion: 25,
    deadline: '17:00 WIB',
    hygiene: 'Grade A',
    distance: '1.2 km',
    pickupPoint: '📍 Lobby Logistik Pintu Timur',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    hasQr: true,
    date: 'Hari Ini',
  },
  {
    id: '#CLM-8805',
    batchId: '#FB-1045',
    timeAgo: '18 mnt lalu',
    status: 'pending',
    statusLabel: '⏳ Menunggu Konfirmasi',
    title: 'Bento Ayam Panggang Teriyaki',
    provider: 'Restoran Rasa Nusantara',
    portion: 30,
    deadline: '20:00 WIB',
    temperature: 'Suhu Ruang',
    distance: '2.4 km',
    note: 'Menunggu verifikasi dapur donatur',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    canCancel: true,
    date: 'Hari Ini',
  },
  {
    id: '#CLM-8798',
    batchId: '#FB-1039',
    distributedBadge: 'Tersalur 12 KK',
    status: 'selesai',
    statusLabel: '✓ Selesai Diterima',
    title: 'Buah Segar & Salad Sehat',
    provider: 'Hotel Borobudur Kitchen',
    portion: 15,
    volunteer: 'Relawan: Budi S.',
    co2Saved: '-18.5 kg CO₂e',
    receivedTime: 'Diterima 14:15',
    receiptNo: '🧾 BA Serah Terima #BA-0922',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    date: 'Hari Ini',
  },
  {
    id: '#CLM-8782',
    batchId: '#FB-1033',
    status: 'dibatalkan',
    statusLabel: '⊗ Dibatalkan',
    title: 'Sup Sayur & Menu Prasmanan',
    provider: 'Catering Berkah Jaya • 40 Porsi',
    portion: 40,
    cancelType: 'Batal Otomatis',
    reason: 'Melewati batas waktu aman konsumsi (safety threshold).',
    closedTime: 'Ditutup 11:30 WIB',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    date: 'Hari Ini',
  },
];

const INITIAL_ACCOUNT: PengelolaAccount = {
  institutionName: 'Yayasan Berkah Pangan',
  picName: 'Siti Rahmawati',
  officialEmail: 'koordinator@berkahpangan.com',
  phone: '+62 813-2244-8890',
  address: 'Jl. Kramat Raya No. 45, Kwitang, Senen, Jakarta Pusat 10420',
  dailyCapacity: '60 Porsi / Hari',
  description: 'Lembaga nirlaba yang berfokus mendistribusikan makanan layak santap kepada komunitas dhuafa, panti asuhan, dan pekerja informal di Jakarta Pusat.',
  institutionId: 'YBP-JKT-042',
  lastUpdated: '12 Apr 2025',
};

const PengelolaContext = createContext<PengelolaContextType | null>(null);

export function PengelolaProvider({ children }: { children: ReactNode }) {
  const [surplusList, setSurplusList] = useState<SurplusItem[]>(() => {
    const saved = localStorage.getItem('foodrescue_pengelola_surplus');
    return saved ? JSON.parse(saved) : INITIAL_SURPLUS;
  });

  const [claimsList, setClaimsList] = useState<ClaimItem[]>(() => {
    const saved = localStorage.getItem('foodrescue_pengelola_claims');
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  const [accountData, setAccountData] = useState<PengelolaAccount>(() => {
    const saved = localStorage.getItem('foodrescue_pengelola_account');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNT;
  });

  const [selectedCartItem, setSelectedCartItem] = useState<SelectedCartItem | null>(() => {
    return {
      surplus: INITIAL_SURPLUS[0],
      portion: 25,
    };
  });

  const [remainingQuota, setRemainingQuota] = useState(45);
  const totalQuota = 150;
  const dailyDistributed = 70; // 70 / 115 porsi tersalurkan

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('foodrescue_pengelola_surplus', JSON.stringify(surplusList));
  }, [surplusList]);

  useEffect(() => {
    localStorage.setItem('foodrescue_pengelola_claims', JSON.stringify(claimsList));
  }, [claimsList]);

  useEffect(() => {
    localStorage.setItem('foodrescue_pengelola_account', JSON.stringify(accountData));
  }, [accountData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updateAccount = (data: Partial<PengelolaAccount>) => {
    setAccountData(prev => ({ ...prev, ...data }));
  };

  const createClaim = (surplus: SurplusItem, portion: number): { success: boolean; message?: string } => {
    if (portion > remainingQuota) {
      return { success: false, message: `Alokasi (${portion} porsi) melebihi sisa kuota harian (${remainingQuota} porsi).` };
    }
    if (portion > surplus.portion) {
      return { success: false, message: `Porsi yang diminta (${portion}) melebihi stok donasi yang tersedia (${surplus.portion}).` };
    }

    const newClaimId = `#CLM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newClaim: ClaimItem = {
      id: newClaimId,
      batchId: surplus.batchId,
      timeAgo: 'Baru saja',
      status: 'pending',
      statusLabel: '⏳ Menunggu Konfirmasi',
      title: surplus.title,
      provider: surplus.provider,
      portion: portion,
      deadline: surplus.deadline,
      temperature: surplus.storage,
      distance: surplus.distanceText,
      note: 'Menunggu verifikasi dapur donatur',
      image: surplus.image,
      canCancel: true,
      hasQr: true,
      date: 'Hari Ini',
    };

    setClaimsList(prev => [newClaim, ...prev]);

    // Update surplus portion
    setSurplusList(prev => prev.map(item => {
      if (item.id === surplus.id) {
        const newPortion = Math.max(0, item.portion - portion);
        return { ...item, portion: newPortion };
      }
      return item;
    }));

    // Update remaining quota
    setRemainingQuota(prev => Math.max(0, prev - portion));

    // Clear cart or update if same surplus
    if (selectedCartItem && selectedCartItem.surplus.id === surplus.id) {
      setSelectedCartItem(null);
    }

    showToast('Klaim berhasil dibuat');
    return { success: true };
  };

  const cancelClaim = (id: string) => {
    const claim = claimsList.find(c => c.id === id);
    if (!claim) return;

    setClaimsList(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: 'dibatalkan',
          statusLabel: '⊗ Dibatalkan',
          cancelType: 'Dibatalkan Pengelola',
          reason: 'Dibatalkan oleh pihak yayasan / posko',
          closedTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          canCancel: false,
        };
      }
      return c;
    }));

    // Restore surplus portion and quota
    setRemainingQuota(prev => Math.min(totalQuota, prev + claim.portion));
    setSurplusList(prev => prev.map(item => {
      if (item.title === claim.title) {
        return { ...item, portion: item.portion + claim.portion };
      }
      return item;
    }));

    showToast(`Klaim ${id} berhasil dibatalkan`);
  };

  return (
    <PengelolaContext.Provider
      value={{
        surplusList,
        selectedCartItem,
        setSelectedCartItem,
        claimsList,
        accountData,
        updateAccount,
        createClaim,
        cancelClaim,
        remainingQuota,
        totalQuota,
        dailyDistributed,
        toastMessage,
        showToast,
        isChatModalOpen,
        setIsChatModalOpen,
        isHotlineModalOpen,
        setIsHotlineModalOpen,
      }}
    >
      {children}
    </PengelolaContext.Provider>
  );
}

export function usePengelola() {
  const ctx = useContext(PengelolaContext);
  if (!ctx) throw new Error('usePengelola must be used within PengelolaProvider');
  return ctx;
}

