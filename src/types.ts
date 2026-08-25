export type Status = 'Belum Mulai' | 'Berjalan' | 'Selesai';

export interface Block {
  id: string;
  name: string;
  divisi: string;
  kebun: string;
  luasHa: number;
  tahunTanam: number;
  jumlahPohon: number;
  produksiTon: number;
  terakhirDipupuk: string;
}

export interface Harvest {
  id: string;
  tanggal: string;
  blokId: string;
  mandor: string;
  pekerja: string;
  jumlahJanjang: number;
  beratTBSKg: number;
  looseFruitKg: number;
  kualitas: string;
  catatan: string;
}

export interface Task {
  id: string;
  kategori: string;
  blokId: string;
  target: string;
  status: Status;
  tanggal: string;
}

export interface Fertilizer {
  id: string;
  blokId: string;
  jenisPupuk: string;
  dosisPerPohonKg: number;
  tanggalAplikasi: string;
  status: Status;
}

export interface InventoryItem {
  id: string;
  nama: string;
  stok: number;
  satuan: string;
  minimumStok: number;
}

export interface Expense {
  id: string;
  tanggal: string;
  kategori: string;
  lokasi: string;
  nominal: number;
  keterangan: string;
}

export interface Sale {
  id: string;
  tanggal: string;
  buyer: string;
  beratBersihKg: number;
  hargaPerKg: number;
}
