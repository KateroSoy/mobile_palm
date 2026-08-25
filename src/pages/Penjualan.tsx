import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Plus, TrendingUp, Briefcase, X, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Penjualan() {
  const { sales, addSale } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    buyer: 'PKS PT Makmur Sawit Jaya',
    beratBersihKg: '',
    hargaPerKg: '3250',
    tanggal: new Date().toISOString().split('T')[0]
  });

  const totalPendapatan = sales.reduce((acc, curr) => acc + (curr.beratBersihKg * curr.hargaPerKg), 0);
  const totalTonase = sales.reduce((acc, curr) => acc + curr.beratBersihKg, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSale({
      buyer: form.buyer,
      beratBersihKg: Number(form.beratBersihKg),
      hargaPerKg: Number(form.hargaPerKg),
      tanggal: form.tanggal
    });
    setShowModal(false);
    setForm({ ...form, beratBersihKg: '' });
  };

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">REVENUE & SALES</span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Penjualan TBS Sawit</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">{sales.length} Kontrak Transaksi PKS</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Jual</span>
        </button>
      </div>

      {/* Hero Revenue Card */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">TOTAL PENJUALAN TBS BULAN INI</span>
          <h2 className="text-4xl font-black text-white tracking-tight">
            Rp {(totalPendapatan / 1000000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} M
          </h2>

          <div className="mt-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>{(totalTonase / 1000).toFixed(1)} Ton TBS Terjual</span>
          </div>
        </div>
      </div>

      {/* Transaction History List */}
      <div className="px-6 mt-6 space-y-3">
        <h2 className="text-base font-black text-white">Riwayat Transaksi PKS</h2>

        {sales.map((sale) => {
          const revenue = sale.beratBersihKg * sale.hargaPerKg;
          return (
            <div 
              key={sale.id} 
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-white truncate">{sale.buyer}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    {sale.beratBersihKg.toLocaleString('id-ID')} Kg @ Rp{sale.hargaPerKg}/Kg
                  </p>
                  <p className="text-xs font-black text-emerald-400 mt-0.5">
                    Rp {revenue.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-black px-2.5 py-1 rounded-full uppercase">
                  LUNAS
                </span>
                <p className="text-[10px] text-slate-400 font-medium mt-1.5">{sale.tanggal}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Record Sale Modal Sheet */}
      <AnimatePresence>
        {showModal && (
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
                <h3 className="font-black text-xl text-white">Catat Transaksi Penjualan</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nama PKS / Pembeli</label>
                  <input
                    type="text" required
                    value={form.buyer}
                    onChange={(e) => setForm({ ...form, buyer: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500"
                    placeholder="PKS PT Makmur Sawit Jaya"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase">Berat Bersih (Kg)</label>
                    <input
                      type="number" required
                      value={form.beratBersihKg}
                      onChange={(e) => setForm({ ...form, beratBersihKg: e.target.value })}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 py-3.5 px-4 rounded-xl text-lg font-black text-white outline-none focus:border-emerald-500"
                      placeholder="18000"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase">Harga / Kg (Rp)</label>
                    <input
                      type="number" required
                      value={form.hargaPerKg}
                      onChange={(e) => setForm({ ...form, hargaPerKg: e.target.value })}
                      className="w-full mt-1 bg-slate-950 border border-slate-800 py-3.5 px-4 rounded-xl text-lg font-black text-white outline-none focus:border-emerald-500"
                      placeholder="3250"
                    />
                  </div>
                </div>

                {form.beratBersihKg && form.hargaPerKg && (
                  <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3.5 flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">Est. Total Pendapatan</span>
                    <span className="text-lg font-black text-emerald-400">
                      Rp {(Number(form.beratBersihKg) * Number(form.hargaPerKg)).toLocaleString('id-ID')}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 mt-2 active:scale-95 transition-transform"
                >
                  Simpan Transaksi Penjualan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
