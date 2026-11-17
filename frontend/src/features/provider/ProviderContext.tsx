import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SurplusStatus = 
  | 'siap-jemput' 
  | 'menunggu-kurir' 
  | 'dalam-penjemputan' 
  | 'tersalurkan' 
  | 'menunggu-verifikasi' 
  | 'ditolak';

export interface SurplusItem {
  id: string;
  batchId: string;
  name: string;
  category: string;
  categoryFilter: 'bakery-roti' | 'makanan-berat' | 'segar-buah' | 'makanan-hangat' | 'snack-roti' | 'minuman' | 'bahan-mentah';
  quantity: number;
  unit: string;
  status: SurplusStatus;
  deadline: string; // e.g. "17:00 WIB"
  temperature: string; // e.g. "<25°C" or "4°C Dingin"
  source: string; // asal surplus
  description: string; // kondisi & info penyimpanan
  photo: string; // Unsplash URL
  createdAt: string;
  recipient?: string; // penerima jika tersalurkan
  recipientTime?: string; // jam serah terima
  courier?: string; // nama kurir
  courierEta?: string; // ETA kurir
  courierVehicle?: string; // kendaraan kurir
}

export interface AccountData {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface ProviderContextType {
  surplusList: SurplusItem[];
  addSurplus: (item: Omit<SurplusItem, 'id' | 'batchId' | 'createdAt'>) => void;
  updateSurplus: (id: string, updates: Partial<SurplusItem>) => void;
  accountData: AccountData;
  updateAccount: (data: Partial<AccountData>) => void;
}

const DUMMY_SURPLUS: SurplusItem[] = [
  {
    id: '1', batchId: '#BF-2024-081',
    name: 'Pastry & Viennoiserie Mix', category: 'Bakery & Roti', categoryFilter: 'bakery-roti',
    quantity: 25, unit: 'Porsi', status: 'siap-jemput', deadline: '17:00 WIB', temperature: '<25°C',
    source: 'Buffet Sarapan Hotel', description: 'Roti croissant, pain au chocolat, dan danish dalam kondisi segar. Dikemas food-grade.',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    createdAt: '2024-10-09T06:00:00Z',
  },
  {
    id: '2', batchId: '#BF-2024-082',
    name: 'Bento Ayam Panggang & Lalapan', category: 'Makanan Berat', categoryFilter: 'makanan-berat',
    quantity: 30, unit: 'Porsi', status: 'menunggu-kurir', deadline: '20:00 WIB', temperature: '<4°C Chiller',
    source: 'Buffet Makan Siang Hotel', description: 'Bento box ayam panggang bumbu kuning dengan nasi dan lalapan segar.',
    photo: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80',
    courier: 'Kurir Budi', courierEta: 'ETA 20m', courierVehicle: 'Motor',
    createdAt: '2024-10-09T10:00:00Z',
  },
  {
    id: '3', batchId: '#BF-2024-083',
    name: 'Buah Segar Potong & Salad Bar', category: 'Segar & Buah', categoryFilter: 'segar-buah',
    quantity: 15, unit: 'Porsi', status: 'dalam-penjemputan', deadline: '18:30 WIB', temperature: '2°C–5°C',
    source: 'Buffet Sarapan Hotel', description: 'Buah potong mix (melon, semangka, nanas) dan salad bar dalam container tertutup.',
    photo: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    courierVehicle: 'Van Pendingin #04',
    createdAt: '2024-10-09T08:00:00Z',
  },
  {
    id: '4', batchId: '#BF-2024-079',
    name: 'Sup Krim Jamur & Buffet Menu', category: 'Makanan Hangat', categoryFilter: 'makanan-hangat',
    quantity: 40, unit: 'Porsi', status: 'tersalurkan', deadline: '14:15 WIB', temperature: '>60°C Hangat',
    source: 'Buffet Makan Siang Hotel', description: 'Sup krim jamur dan pilihan buffet hangat dalam container stainless steel berinsulasi.',
    photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    recipient: 'Panti Asuhan Kasih Mandiri', recipientTime: '14:15 WIB',
    createdAt: '2024-10-08T11:00:00Z',
  },
  {
    id: '5', batchId: '#BF-2024-084',
    name: 'Sandwich Gandum Smoked Beef', category: 'Snack & Roti', categoryFilter: 'snack-roti',
    quantity: 18, unit: 'Porsi', status: 'siap-jemput', deadline: '19:00 WIB', temperature: '<24°C',
    source: 'Deli & Snack Counter Hotel', description: 'Sandwich gandum isi smoked beef, keju, selada. Dikemas individual food-grade.',
    photo: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
    createdAt: '2024-10-09T13:00:00Z',
  },
  {
    id: '6', batchId: '#BF-2024-085',
    name: 'Jus Buah Cold-Pressed Aneka Rasa', category: 'Minuman', categoryFilter: 'minuman',
    quantity: 20, unit: 'Botol', status: 'siap-jemput', deadline: 'Besok 10:00 WIB', temperature: '4°C Dingin',
    source: 'Bar & Beverages Hotel', description: 'Jus cold-pressed aneka rasa (jeruk, apel, semangka). Botol tertutup rapat.',
    photo: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    createdAt: '2024-10-09T14:00:00Z',
  },
  // 6 more items for page 2
  {
    id: '7', batchId: '#BF-2024-086',
    name: 'Nasi Goreng Spesial & Telur', category: 'Makanan Berat', categoryFilter: 'makanan-berat',
    quantity: 22, unit: 'Porsi', status: 'menunggu-verifikasi', deadline: '21:00 WIB', temperature: '>60°C Hangat',
    source: 'Buffet Makan Malam Hotel', description: 'Nasi goreng spesial dengan telur mata sapi dan acar timun.',
    photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80',
    createdAt: '2024-10-09T17:00:00Z',
  },
  {
    id: '8', batchId: '#BF-2024-087',
    name: 'Kue Lapis & Jajan Pasar', category: 'Snack & Roti', categoryFilter: 'snack-roti',
    quantity: 35, unit: 'Porsi', status: 'siap-jemput', deadline: '16:00 WIB', temperature: '<25°C',
    source: 'Pastry Kitchen Hotel', description: 'Kue lapis, onde-onde, klepon dalam wadah food-grade tertutup.',
    photo: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80',
    createdAt: '2024-10-09T12:00:00Z',
  },
  {
    id: '9', batchId: '#BF-2024-088',
    name: 'Salad Caesar & Garden Fresh', category: 'Segar & Buah', categoryFilter: 'segar-buah',
    quantity: 12, unit: 'Porsi', status: 'dalam-penjemputan', deadline: '15:30 WIB', temperature: '2°C–5°C',
    source: 'Salad Bar Hotel', description: 'Salad caesar dan garden salad dalam container tertutup dengan dressing terpisah.',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    createdAt: '2024-10-09T09:00:00Z',
  },
  {
    id: '10', batchId: '#BF-2024-089',
    name: 'Roti Tawar & Selai Artisan', category: 'Bakery & Roti', categoryFilter: 'bakery-roti',
    quantity: 16, unit: 'Loaf', status: 'tersalurkan', deadline: '13:00 WIB', temperature: '<25°C',
    source: 'Bakery Hotel', description: 'Roti tawar artisan dengan berbagai pilihan selai buatan sendiri.',
    photo: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80',
    recipient: 'Rumah Singgah Cahaya', recipientTime: '13:00 WIB',
    createdAt: '2024-10-08T08:00:00Z',
  },
  {
    id: '11', batchId: '#BF-2024-090',
    name: 'Smoothie Bowl & Yogurt Parfait', category: 'Minuman', categoryFilter: 'minuman',
    quantity: 14, unit: 'Cup', status: 'siap-jemput', deadline: 'Besok 08:00 WIB', temperature: '4°C Dingin',
    source: 'Health Bar Hotel', description: 'Smoothie bowl dan yogurt parfait dalam cup tertutup. Simpan dingin.',
    photo: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&q=80',
    createdAt: '2024-10-09T15:00:00Z',
  },
  {
    id: '12', batchId: '#BF-2024-091',
    name: 'Ayam Bakar & Sate Lilit', category: 'Makanan Hangat', categoryFilter: 'makanan-hangat',
    quantity: 28, unit: 'Porsi', status: 'menunggu-verifikasi', deadline: '20:30 WIB', temperature: '>60°C Hangat',
    source: 'BBQ Station Hotel', description: 'Ayam bakar dan sate lilit bumbu Bali. Disimpan dalam container pemanas.',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    createdAt: '2024-10-09T18:00:00Z',
  },
];

const DUMMY_ACCOUNT: AccountData = {
  name: 'Grand Sahid Jaya',
  email: 'fnb.operations@sahidjaya.cc',
  phone: '+62 812-3456-7890',
  address: 'Jl. Jenderal Sudirman No. 86, Karet Tengsin, Tanah Abang, Jakarta Pusat',
  description: 'Dapur komersial terpadu dengan standar sertifikasi HACCP & Halal. Memproduksi hidangan banquet dan bakery segar setiap hari dengan pengelolaan surplus terawasi.',
};

const ProviderContext = createContext<ProviderContextType | null>(null);

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [surplusList, setSurplusList] = useState<SurplusItem[]>(DUMMY_SURPLUS);
  const [accountData, setAccountData] = useState<AccountData>(DUMMY_ACCOUNT);

  function addSurplus(item: Omit<SurplusItem, 'id' | 'batchId' | 'createdAt'>) {
    const newItem: SurplusItem = {
      ...item,
      id: String(Date.now()),
      batchId: `#BF-${new Date().getFullYear()}-${String(surplusList.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setSurplusList(prev => [newItem, ...prev]);
  }

  function updateSurplus(id: string, updates: Partial<SurplusItem>) {
    setSurplusList(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }

  function updateAccount(data: Partial<AccountData>) {
    setAccountData(prev => ({ ...prev, ...data }));
  }

  return (
    <ProviderContext.Provider value={{ surplusList, addSurplus, updateSurplus, accountData, updateAccount }}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error('useProvider must be used within ProviderProvider');
  return ctx;
}
