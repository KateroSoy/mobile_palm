import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Block, Harvest, Task, Fertilizer, InventoryItem, Expense, Sale } from '../types';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'harvest' | 'stock' | 'task' | 'finance';
  read: boolean;
}

interface AppState {
  activeKebun: string;
  kebunList: string[];
  blocks: Block[];
  harvests: Harvest[];
  tasks: Task[];
  fertilizers: Fertilizer[];
  inventory: InventoryItem[];
  expenses: Expense[];
  sales: Sale[];
  notifications: NotificationItem[];
}

interface AppContextType extends AppState {
  setActiveKebun: (kebun: string) => void;
  
  // Harvest actions
  addHarvest: (harvest: Omit<Harvest, 'id'>) => void;
  updateHarvest: (id: string, harvest: Omit<Harvest, 'id'>) => void;
  deleteHarvest: (id: string) => void;
  
  // Task actions
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  
  // Inventory actions
  updateStock: (id: string, newStok: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  
  // Fertilizer actions
  addFertilizer: (fert: Omit<Fertilizer, 'id'>) => void;
  
  // Finance actions
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  
  // Notification actions
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const initialState: AppState = {
  activeKebun: 'Kebun Sungai Hijau',
  kebunList: ['Kebun Sungai Hijau', 'Kebun Bukit Raya', 'Kebun Rawa Indah'],
  blocks: [
    { id: 'b1', name: 'Blok A12', divisi: 'Divisi 1', kebun: 'Kebun Sungai Hijau', luasHa: 28.5, tahunTanam: 2016, jumlahPohon: 3850, produksiTon: 580, terakhirDipupuk: '2024-02-10' },
    { id: 'b2', name: 'Blok B04', divisi: 'Divisi 2', kebun: 'Kebun Sungai Hijau', luasHa: 32.0, tahunTanam: 2017, jumlahPohon: 4320, produksiTon: 620, terakhirDipupuk: '2024-02-15' },
    { id: 'b3', name: 'Blok A03', divisi: 'Divisi 1', kebun: 'Kebun Sungai Hijau', luasHa: 25.0, tahunTanam: 2015, jumlahPohon: 3400, produksiTon: 490, terakhirDipupuk: '2024-01-20' },
    { id: 'b4', name: 'Blok C01', divisi: 'Divisi 3', kebun: 'Kebun Sungai Hijau', luasHa: 40.0, tahunTanam: 2019, jumlahPohon: 5400, produksiTon: 710, terakhirDipupuk: '2024-02-01' },
    { id: 'b5', name: 'Blok B02', divisi: 'Divisi 2', kebun: 'Kebun Sungai Hijau', luasHa: 30.0, tahunTanam: 2018, jumlahPohon: 4100, produksiTon: 540, terakhirDipupuk: '2024-01-12' },
    { id: 'b6', name: 'Blok C05', divisi: 'Divisi 3', kebun: 'Kebun Sungai Hijau', luasHa: 35.5, tahunTanam: 2020, jumlahPohon: 4800, produksiTon: 640, terakhirDipupuk: '2024-02-18' },
  ],
  harvests: [
    { id: 'h1', tanggal: '2026-08-25', blokId: 'b1', mandor: 'Pak Budi', pekerja: 'Tim Panen 1 (6 org)', jumlahJanjang: 450, beratTBSKg: 9720, looseFruitKg: 180, kualitas: 'Matang', catatan: 'BJR 21.6 kg, buah segar' },
    { id: 'h2', tanggal: '2026-08-24', blokId: 'b2', mandor: 'Heri Supriyanto', pekerja: 'Tim Panen 2 (5 org)', jumlahJanjang: 380, beratTBSKg: 8200, looseFruitKg: 120, kualitas: 'Matang', catatan: 'Jalur piringan bersih' },
    { id: 'h3', tanggal: '2026-08-23', blokId: 'b4', mandor: 'Pak Budi', pekerja: 'Tim Panen 3 (4 org)', jumlahJanjang: 520, beratTBSKg: 11440, looseFruitKg: 210, kualitas: 'Mengkal', catatan: 'Pengangkutan lancar' },
  ],
  tasks: [
    { id: 't1', kategori: 'PANEN', blokId: 'b1', target: '450 Janjang • Tim Panen 1', status: 'Berjalan', tanggal: '2026-08-25' },
    { id: 't2', kategori: 'PEMUPUKAN', blokId: 'b2', target: '18 Ha • Pupuk NPK 15-15-15', status: 'Berjalan', tanggal: '2026-08-25' },
    { id: 't3', kategori: 'PERAWATAN', blokId: 'b3', target: 'Pembersihan Piringan & Pasar Pikul', status: 'Belum Mulai', tanggal: '2026-08-25' },
    { id: 't4', kategori: 'PANEN', blokId: 'b4', target: 'Target 500 Janjang', status: 'Selesai', tanggal: '2026-08-24' },
  ],
  fertilizers: [
    { id: 'f1', blokId: 'b2', jenisPupuk: 'NPK 15-15-15', dosisPerPohonKg: 2.5, tanggalAplikasi: '2026-08-22', status: 'Berjalan' },
    { id: 'f2', blokId: 'b1', jenisPupuk: 'Urea Subur', dosisPerPohonKg: 1.8, tanggalAplikasi: '2026-08-18', status: 'Selesai' },
    { id: 'f3', blokId: 'b4', jenisPupuk: 'KCl Kanada', dosisPerPohonKg: 2.0, tanggalAplikasi: '2026-08-28', status: 'Belum Mulai' },
  ],
  inventory: [
    { id: 'i1', nama: 'Pupuk NPK 15-15-15', stok: 850, satuan: 'Kg', minimumStok: 1000 },
    { id: 'i2', nama: 'Pupuk Urea Subur', stok: 2500, satuan: 'Kg', minimumStok: 1500 },
    { id: 'i3', nama: 'Pupuk KCl Kanada', stok: 1200, satuan: 'Kg', minimumStok: 1000 },
    { id: 'i4', nama: 'Pupuk Dolomite', stok: 5000, satuan: 'Kg', minimumStok: 2000 },
    { id: 'i5', nama: 'Herbisida Roundup 20L', stok: 45, satuan: 'Liter', minimumStok: 50 },
    { id: 'i6', nama: 'Solar B35 Diesel', stok: 1500, satuan: 'Liter', minimumStok: 500 },
  ],
  expenses: [
    { id: 'e1', tanggal: '2026-08-22', kategori: 'Tenaga Kerja', lokasi: 'Blok A12', nominal: 18500000, keterangan: 'Upah Panen & Muat Periode 2' },
    { id: 'e2', tanggal: '2026-08-20', kategori: 'BBM & Olah', lokasi: 'Gudang Pusat', nominal: 4200000, keterangan: 'Isi Solar 500 Liter Tractor' },
    { id: 'e3', tanggal: '2026-08-15', kategori: 'Pupuk & Alat', lokasi: 'Kebun Sungai Hijau', nominal: 12500000, keterangan: 'Beli NPK & Alat Dodos' },
  ],
  sales: [
    { id: 's1', tanggal: '2026-08-24', buyer: 'PKS PT Makmur Sawit Jaya', beratBersihKg: 18450, hargaPerKg: 3250 },
    { id: 's2', tanggal: '2026-08-22', buyer: 'PKS PT Nusantara Palm Mill', beratBersihKg: 24300, hargaPerKg: 3280 },
    { id: 's3', tanggal: '2026-08-19', buyer: 'PKS PT Golden Oil Plantations', beratBersihKg: 19800, hargaPerKg: 3220 },
  ],
  notifications: [
    { id: 'n1', title: 'Panen Selesai', message: 'Blok A12 berhasil dipanen 450 Janjang (9.72 Ton)', time: '10 mnt lalu', type: 'harvest', read: false },
    { id: 'n2', title: 'Stok Pupuk NPK Rendah', message: 'Sisa stok NPK 850 Kg (Min target: 1,000 Kg)', time: '1 jam lalu', type: 'stock', read: false },
    { id: 'n3', title: 'Pembayaran Diterima', message: 'PKS PT Makmur Sawit Jaya menyetorkan Rp 59,962,500', time: '3 jam lalu', type: 'finance', read: false },
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setActiveKebun = (kebun: string) => {
    setState(prev => ({ ...prev, activeKebun: kebun }));
  };

  const addHarvest = (harvest: Omit<Harvest, 'id'>) => {
    const newId = 'h_' + Date.now();
    const newHarvest = { ...harvest, id: newId };
    const newNotification: NotificationItem = {
      id: 'n_' + Date.now(),
      title: 'Panen Baru Dicatat',
      message: `${harvest.jumlahJanjang} Janjang (${harvest.beratTBSKg} Kg) di Blok ${state.blocks.find(b => b.id === harvest.blokId)?.name || ''}`,
      time: 'Baru saja',
      type: 'harvest',
      read: false,
    };
    setState(prev => ({
      ...prev,
      harvests: [newHarvest, ...prev.harvests],
      notifications: [newNotification, ...prev.notifications]
    }));
  };

  const updateHarvest = (id: string, harvest: Omit<Harvest, 'id'>) => {
    setState(prev => ({
      ...prev,
      harvests: prev.harvests.map(h => h.id === id ? { ...harvest, id } : h)
    }));
  };

  const deleteHarvest = (id: string) => {
    setState(prev => ({
      ...prev,
      harvests: prev.harvests.filter(h => h.id !== id)
    }));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newId = 't_' + Date.now();
    setState(prev => ({
      ...prev,
      tasks: [{ ...task, id: newId }, ...prev.tasks]
    }));
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, status } : t)
    }));
  };

  const updateStock = (id: string, newStok: number) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.map(item => item.id === id ? { ...item, stok: Math.max(0, newStok) } : item)
    }));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newId = 'i_' + Date.now();
    setState(prev => ({
      ...prev,
      inventory: [...prev.inventory, { ...item, id: newId }]
    }));
  };

  const addFertilizer = (fert: Omit<Fertilizer, 'id'>) => {
    const newId = 'f_' + Date.now();
    setState(prev => ({
      ...prev,
      fertilizers: [{ ...fert, id: newId }, ...prev.fertilizers]
    }));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newId = 'e_' + Date.now();
    setState(prev => ({
      ...prev,
      expenses: [{ ...expense, id: newId }, ...prev.expenses]
    }));
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newId = 's_' + Date.now();
    setState(prev => ({
      ...prev,
      sales: [{ ...sale, id: newId }, ...prev.sales]
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const clearNotifications = () => {
    setState(prev => ({ ...prev, notifications: [] }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setActiveKebun,
        addHarvest,
        updateHarvest,
        deleteHarvest,
        addTask,
        updateTaskStatus,
        updateStock,
        addInventoryItem,
        addFertilizer,
        addExpense,
        addSale,
        markNotificationAsRead,
        clearNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
