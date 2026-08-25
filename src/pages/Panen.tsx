import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Plus, Camera, X, ArrowRight, CheckCircle2, Zap, RotateCw, Layers, Scale, Sparkles, Filter, Check } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';

export function Panen() {
  const { harvests, blocks, addHarvest } = useAppContext();
  const [isScanning, setIsScanning] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const [formData, setFormData] = useState({
    tanggal: format(new Date(), 'yyyy-MM-dd'),
    blokId: blocks.find(b => b.name === 'Blok A12')?.id || blocks[0]?.id || 'b1',
    mandor: 'Pak Budi',
    pekerja: 'Tim Panen 1 (6 org)',
    jumlahJanjang: '450',
    beratTBSKg: '9720',
    looseFruitKg: '180',
    kualitas: 'Matang',
    catatan: 'BJR 21.6 kg, kualitas baik'
  });

  const bjr = formData.jumlahJanjang && formData.beratTBSKg && Number(formData.jumlahJanjang) > 0
    ? (Number(formData.beratTBSKg) / Number(formData.jumlahJanjang)).toFixed(2)
    : '0.00';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addHarvest({
      ...formData,
      jumlahJanjang: Number(formData.jumlahJanjang),
      beratTBSKg: Number(formData.beratTBSKg),
      looseFruitKg: Number(formData.looseFruitKg),
    });
    
    setIsFormOpen(false);
    setIsScanning(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2200);
  };

  const totalTodayTon = harvests.reduce((acc, h) => acc + h.beratTBSKg, 0) / 1000;
  const totalTodayJanjang = harvests.reduce((acc, h) => acc + h.jumlahJanjang, 0);

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Top Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">HARVEST MONITORING</span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Catatan Panen</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsScanning(true)}
            className="bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform"
          >
            <Camera className="w-4 h-4" />
            <span>AI Scan</span>
          </button>
        </div>
      </div>

      {/* Hero Summary Card */}
      <div className="px-6 mt-4">
        <div className="relative w-full h-[210px] rounded-[30px] overflow-hidden shadow-2xl border border-emerald-500/20">
          <SmartImage 
            src={ASSET_IMAGES.harvestPalm} 
            alt="Hasil Panen" 
            fallbackType="panen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-xs font-bold text-emerald-400">Total Panen Hari Ini</span>
            <h2 className="text-3xl font-black text-white leading-none mt-1">
              {totalTodayTon > 0 ? totalTodayTon.toFixed(1) : '42.8'} Ton
            </h2>
            <p className="text-slate-300 text-xs font-semibold mt-1">
              {totalTodayJanjang > 0 ? totalTodayJanjang.toLocaleString('id-ID') : '1,984'} Janjang TBS Total
            </p>
          </div>
        </div>

        {/* 3 Metrics Pills */}
        <div className="grid grid-cols-3 gap-2.5 mt-3.5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">RATA BJR</span>
            <h3 className="text-base font-black text-emerald-400 mt-0.5">21.6 <span className="text-[10px]">Kg</span></h3>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">BLOK AKTIF</span>
            <h3 className="text-base font-black text-white mt-0.5">8 Blok</h3>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-center">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">PEMAMANEN</span>
            <h3 className="text-base font-black text-emerald-400 mt-0.5">42 Orang</h3>
          </div>
        </div>
      </div>

      {/* Riwayat Panen List */}
      <div className="px-6 mt-6 space-y-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-black text-white">Riwayat Realisasi Panen</h2>
          <span className="text-xs text-slate-400 font-bold">{harvests.length} Transaksi</span>
        </div>

        {harvests.map(harvest => {
          const block = blocks.find(b => b.id === harvest.blokId);
          const itemBjr = (harvest.beratTBSKg / harvest.jumlahJanjang).toFixed(1);

          return (
            <div 
              key={harvest.id} 
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{block?.name || 'Blok Panen'}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {harvest.jumlahJanjang} Janjang • {harvest.beratTBSKg.toLocaleString('id-ID')} Kg
                  </p>
                  <p className="text-[10px] text-emerald-400 font-bold mt-0.5">
                    BJR: {itemBjr} Kg • {harvest.pekerja}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full">
                  {harvest.kualitas}
                </span>
                <p className="text-[10px] text-slate-400 font-medium mt-1">{harvest.tanggal}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Notification Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl max-w-xs">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_25px_#10B981]">
                <CheckCircle2 className="w-10 h-10 text-slate-950 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-white">Data Panen Saved!</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Realisasi panen berhasil dicatat dalam database kebun.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen AI Scanner Overlay View */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="relative flex-1">
              <SmartImage 
                src={ASSET_IMAGES.harvestPalm} 
                alt="Scanner View" 
                fallbackType="panen"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${torchOn ? 'opacity-90 brightness-125' : 'opacity-60'}`}
              />
              <div className="absolute inset-0 bg-slate-950/40" />

              {/* Top Controls */}
              <div className="absolute top-6 inset-x-6 flex justify-between items-center z-20">
                <button 
                  onClick={() => setIsScanning(false)}
                  className="w-11 h-11 bg-slate-950/70 backdrop-blur-md border border-slate-700 rounded-full flex items-center justify-center text-white active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md px-4 py-2 rounded-full text-emerald-400 text-xs font-black flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>AI DETECTOR ACTIVE</span>
                </div>

                <button 
                  onClick={() => setTorchOn(!torchOn)}
                  className={`w-11 h-11 backdrop-blur-md border rounded-full flex items-center justify-center active:scale-95 ${
                    torchOn ? 'bg-amber-500 border-amber-400 text-slate-950' : 'bg-slate-950/70 border-slate-700 text-white'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                </button>
              </div>

              {/* AI Target Box overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-[280px] h-[280px] border-2 border-emerald-400/50 rounded-3xl relative animate-pulse">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-2xl" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-2xl" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-2xl" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-2xl" />

                  {/* AI Detection Label */}
                  <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-md shadow-md">
                    JANJANG TBS MATANG 100% • Est. 22.5 Kg
                  </div>
                </div>
              </div>

              {/* Bottom Floating Bar */}
              <div className="absolute bottom-8 inset-x-6 z-20">
                <div className="bg-slate-900/90 backdrop-blur-2xl border border-emerald-500/40 rounded-3xl p-5 shadow-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase">LOKASI DETEKSI</span>
                    <h3 className="text-base font-black text-white">Blok A12 • Sungai Hijau</h3>
                    <p className="text-xs text-slate-300 font-medium">Estimasi 450 Janjang TBS</p>
                  </div>

                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_25px_#10B981] active:scale-95 transition-transform"
                  >
                    <ArrowRight className="w-7 h-7 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Form Sheet Modal */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="absolute inset-x-0 bottom-0 bg-slate-900 border-t border-emerald-500/40 rounded-t-3xl z-30 max-h-[90vh] overflow-y-auto hide-scrollbar p-6 text-slate-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-black text-white">Input Data Hasil Panen</h2>
                    <button onClick={() => setIsFormOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase">Pilih Blok</label>
                      <select
                        value={formData.blokId}
                        onChange={(e) => setFormData({ ...formData, blokId: e.target.value })}
                        className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500"
                      >
                        {blocks.map(b => (
                          <option key={b.id} value={b.id}>{b.name} ({b.divisi})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Jumlah Janjang</label>
                        <input
                          type="number" required
                          value={formData.jumlahJanjang}
                          onChange={(e) => setFormData({ ...formData, jumlahJanjang: e.target.value })}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-base font-black text-white outline-none focus:border-emerald-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase">Total Berat (Kg)</label>
                        <input
                          type="number" required
                          value={formData.beratTBSKg}
                          onChange={(e) => setFormData({ ...formData, beratTBSKg: e.target.value })}
                          className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-base font-black text-white outline-none focus:border-emerald-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3.5 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Kalkulasi BJR Rata-rata</span>
                      <span className="text-lg font-black text-emerald-400">{bjr} Kg / Janjang</span>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Kualitas Buah</label>
                      <div className="flex gap-2">
                        {['Matang', 'Mengkal', 'Mentah', 'Lewat'].map(qual => (
                          <button
                            key={qual}
                            type="button"
                            onClick={() => setFormData({ ...formData, kualitas: qual })}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              formData.kualitas === qual
                                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                                : 'bg-slate-950 border border-slate-800 text-slate-400'
                            }`}
                          >
                            {qual}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 mt-4 active:scale-95 transition-transform"
                    >
                      Simpan Transaksi Panen
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
