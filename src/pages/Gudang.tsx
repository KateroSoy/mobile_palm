import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Search, Plus, Minus, Warehouse, AlertTriangle, X, Check } from 'lucide-react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';
import { motion, AnimatePresence } from 'motion/react';

export function Gudang() {
  const { inventory, updateStock, addInventoryItem } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeItemModal, setActiveItemModal] = useState<any>(null);
  const [restockQty, setRestockQty] = useState('100');

  const getImage = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('pupuk') || lower.includes('npk') || lower.includes('urea') || lower.includes('kcl') || lower.includes('dolo')) {
      return ASSET_IMAGES.fertilizer;
    }
    if (lower.includes('solar') || lower.includes('bbm') || lower.includes('diesel')) {
      return ASSET_IMAGES.fuel;
    }
    return ASSET_IMAGES.tools;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === 'Semua') return matchesSearch;
    if (selectedCategory === 'Pupuk') return matchesSearch && item.nama.toLowerCase().includes('pupuk');
    if (selectedCategory === 'Chemical') return matchesSearch && (item.nama.toLowerCase().includes('herbi') || item.nama.toLowerCase().includes('chem'));
    if (selectedCategory === 'BBM') return matchesSearch && (item.nama.toLowerCase().includes('solar') || item.nama.toLowerCase().includes('bbm'));
    return matchesSearch;
  });

  const lowStockItems = inventory.filter(item => item.stok <= item.minimumStok);

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeItemModal && restockQty) {
      updateStock(activeItemModal.id, activeItemModal.stok + Number(restockQty));
      setActiveItemModal(null);
    }
  };

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">INVENTORY LOGISTICS</span>
        <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Gudang & Stok Material</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">{inventory.length} Item Material Terdaftar</p>
      </div>

      {/* Low Stock Warning Alert Banner */}
      {lowStockItems.length > 0 && (
        <div className="px-6 mt-4">
          <div className="bg-gradient-to-r from-red-950/80 to-slate-900 border border-red-500/40 rounded-3xl p-4 shadow-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white">{lowStockItems.length} Stok Menipis!</h4>
              <p className="text-[11px] text-slate-300 font-medium">
                {lowStockItems.map(i => i.nama).join(', ')} di bawah batas minimum.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="px-6 mt-5">
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari barang, pupuk, solar..." 
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 py-3.5 pl-11 pr-4 rounded-2xl text-xs font-semibold text-white placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 px-6 flex gap-2 overflow-x-auto hide-scrollbar">
        {['Semua', 'Pupuk', 'Chemical', 'BBM'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inventory Items Grid */}
      <div className="px-6 mt-5 grid grid-cols-2 gap-3">
        {filteredInventory.map(item => {
          const isLowStock = item.stok <= item.minimumStok;
          return (
            <div 
              key={item.id} 
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/30 rounded-3xl p-3.5 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-[105px] rounded-2xl overflow-hidden mb-3 bg-slate-950 border border-slate-800">
                  <SmartImage 
                    src={getImage(item.nama)} 
                    alt={item.nama} 
                    fallbackType="gudang"
                    className="w-full h-full object-cover"
                  />
                  {isLowStock && (
                    <span className="absolute top-2 left-2 bg-red-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
                      STOK LOW
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-black text-white leading-tight line-clamp-2">{item.nama}</h3>
              </div>

              <div className="mt-3 border-t border-slate-800/80 pt-2 flex items-end justify-between">
                <div>
                  <p className={`text-base font-black ${isLowStock ? 'text-red-400' : 'text-emerald-400'}`}>
                    {item.stok.toLocaleString('id-ID')} <span className="text-[10px] font-bold text-slate-400">{item.satuan}</span>
                  </p>
                  <p className="text-[9px] text-slate-500 font-bold">Min: {item.minimumStok.toLocaleString('id-ID')}</p>
                </div>

                <button 
                  onClick={() => {
                    setActiveItemModal(item);
                    setRestockQty('100');
                  }}
                  className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-[0_0_10px_rgba(16,185,129,0.4)] active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restock Item Modal */}
      <AnimatePresence>
        {activeItemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end justify-center p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-slate-900 border-t border-emerald-500/40 rounded-t-3xl p-6 w-full max-w-[430px] shadow-2xl text-slate-100"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">RESTOCK STOK MATERIAL</span>
                  <h3 className="font-black text-lg text-white mt-0.5">{activeItemModal.nama}</h3>
                </div>
                <button onClick={() => setActiveItemModal(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 mb-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Stok Saat Ini</span>
                <span className="font-black text-emerald-400 text-base">{activeItemModal.stok.toLocaleString('id-ID')} {activeItemModal.satuan}</span>
              </div>

              <form onSubmit={handleRestockSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Tambah Jumlah Stok ({activeItemModal.satuan})</label>
                  <input
                    type="number" required
                    value={restockQty}
                    onChange={(e) => setRestockQty(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3.5 px-4 rounded-xl text-lg font-black text-white outline-none focus:border-emerald-500"
                    placeholder="100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
                >
                  Konfirmasi Restock Material
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
