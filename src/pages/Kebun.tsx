import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Search, ChevronRight, MapPin, Trees, Calendar, ArrowUpRight, X, Sprout, AlertCircle, Play } from 'lucide-react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Kebun() {
  const navigate = useNavigate();
  const { blocks, activeKebun } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [selectedBlockDetail, setSelectedBlockDetail] = useState<any>(null);

  const filteredBlocks = blocks.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          block.divisi.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'Produktif') return matchesSearch && (block.produksiTon / block.luasHa) > 18;
    if (selectedFilter === 'Perlu Panen') return matchesSearch && (block.name === 'Blok A12' || block.name === 'Blok C01');
    if (selectedFilter === 'Perlu Pupuk') return matchesSearch && (block.name === 'Blok B04' || block.name === 'Blok B02');
    return matchesSearch;
  });

  const totalLuas = blocks.reduce((sum, b) => sum + b.luasHa, 0);
  const totalPohon = blocks.reduce((sum, b) => sum + b.jumlahPohon, 0);

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Page Header */}
      <div className="px-6 pt-6 pb-2">
        <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">ESTATE MANAGEMENT</span>
        <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Daftar Blok Kebun</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">{activeKebun} • {blocks.length} Blok Terdaftar</p>
      </div>

      {/* Summary KPI Banner */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 rounded-3xl p-4 shadow-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold">Total Luas & Pohon</p>
              <h3 className="text-lg font-black text-white">{totalLuas.toFixed(1)} Ha • {totalPohon.toLocaleString('id-ID')} Batang</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-6 mt-5">
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama blok, divisi..." 
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 py-3.5 pl-11 pr-4 rounded-2xl text-xs font-semibold text-white placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mt-4 px-6 flex gap-2 overflow-x-auto hide-scrollbar">
        {['Semua', 'Produktif', 'Perlu Panen', 'Perlu Pupuk'].map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              selectedFilter === filter 
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Block List */}
      <div className="px-6 mt-5 space-y-3.5">
        {filteredBlocks.map(block => {
          const yieldHa = (block.produksiTon / block.luasHa).toFixed(1);
          const isHarvestNeeded = block.name === 'Blok A12' || block.name === 'Blok C01';

          return (
            <div 
              key={block.id}
              onClick={() => setSelectedBlockDetail(block)}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-3.5 shadow-xl flex items-center gap-3.5 cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="w-20 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-800 relative">
                <SmartImage src={ASSET_IMAGES.palmBlock} alt={block.name} fallbackType="blok" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 bg-slate-950/80 text-emerald-400 text-[9px] font-black px-1.5 py-0.5 rounded-md">
                  {block.divisi}
                </span>
              </div>

              <div className="flex-1 py-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-black text-white truncate">{block.name}</h3>
                  {isHarvestNeeded && (
                    <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      Panen
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {block.luasHa} Ha • {block.jumlahPohon.toLocaleString('id-ID')} Pohon
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Tanam {block.tahunTanam} • Pupuk: {block.terakhirDipupuk}
                </p>
                
                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2">
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-500 uppercase">Yield Ton/Ha</span>
                    <p className="text-xs font-black text-emerald-400">{yieldHa} T/Ha</p>
                  </div>
                  
                  <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Block Detail Modal */}
      <AnimatePresence>
        {selectedBlockDetail && (
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
              className="bg-slate-900 border-t border-emerald-500/30 rounded-t-3xl p-6 w-full max-w-[430px] shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto hide-scrollbar"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">INFORMASI DETIL BLOK</span>
                  <h3 className="font-black text-2xl text-white mt-0.5">{selectedBlockDetail.name}</h3>
                </div>
                <button onClick={() => setSelectedBlockDetail(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Block Overview Specs */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Luas Areal</span>
                  <p className="text-base font-black text-white mt-1">{selectedBlockDetail.luasHa} Hektar</p>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Populasi Pohon</span>
                  <p className="text-base font-black text-emerald-400 mt-1">{selectedBlockDetail.jumlahPohon.toLocaleString('id-ID')} Batang</p>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Tahun Tanam</span>
                  <p className="text-base font-black text-white mt-1">{selectedBlockDetail.tahunTanam}</p>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Varietas Bibit</span>
                  <p className="text-base font-black text-emerald-400 mt-1">DxP Socfindo</p>
                </div>
              </div>

              {/* Simulated Interactive Tree Grid Map */}
              <div className="bg-slate-950/80 p-4 rounded-3xl border border-slate-800 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-emerald-400" /> Visualisasi Kesehatan Pohon Blok
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">Grid 5x5</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const statusColor = i % 7 === 0 ? 'bg-amber-500' : i % 11 === 0 ? 'bg-orange-500' : 'bg-emerald-500';
                    return (
                      <div 
                        key={i} 
                        className={`h-8 rounded-xl ${statusColor} opacity-85 flex items-center justify-center text-[9px] font-black text-slate-950 shadow-sm`}
                      >
                        P{i+1}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around items-center mt-3 text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Sehat (84%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Matang (12%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Perlu Pupuk (4%)</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedBlockDetail(null);
                    navigate('/panen');
                  }}
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  Mulai Panen Blok Ini
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
