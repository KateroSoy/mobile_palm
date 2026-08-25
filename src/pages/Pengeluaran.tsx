import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Plus, Receipt, DollarSign, X, ArrowDownRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Pengeluaran() {
  const { expenses, addExpense } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    kategori: 'Tenaga Kerja',
    lokasi: 'Kebun Sungai Hijau',
    nominal: '',
    keterangan: '',
    tanggal: new Date().toISOString().split('T')[0]
  });

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.nominal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      ...form,
      nominal: Number(form.nominal)
    });
    setShowModal(false);
    setForm({ ...form, nominal: '', keterangan: '' });
  };

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">EXPENSE TRACKER</span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Biaya Operasional</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">{expenses.length} Transaksi Tercatat</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Catat Biaya</span>
        </button>
      </div>

      {/* Hero Expense Card */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-400 uppercase">TOTAL OPERASIONAL BULAN INI</span>
              <h2 className="text-3xl font-black text-white leading-tight mt-0.5">
                Rp {totalExpense.toLocaleString('id-ID')}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses History List */}
      <div className="px-6 mt-6 space-y-3">
        <h2 className="text-base font-black text-white">Riwayat Pengeluaran</h2>

        {expenses.map(item => (
          <div 
            key={item.id} 
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black shrink-0">
                <ArrowDownRight className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">{item.kategori}</span>
                <h3 className="text-sm font-black text-white truncate">{item.keterangan || 'Biaya Operasional'}</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{item.lokasi} • {item.tanggal}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-base font-black text-white">
                Rp {item.nominal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expense Modal Sheet */}
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
              className="bg-slate-900 border-t border-amber-500/40 rounded-t-3xl p-6 w-full max-w-[430px] shadow-2xl text-slate-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-xl text-white">Catat Pengeluaran Baru</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Kategori Biaya</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-amber-500"
                  >
                    <option value="Tenaga Kerja">Tenaga Kerja (Gaji / Upah BHL)</option>
                    <option value="BBM & Olah">BBM & Perawatan Mesin</option>
                    <option value="Pupuk & Alat">Pupuk & Peralatan Dodos</option>
                    <option value="Lainnya">Lain-lain</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Nominal Biaya (Rp)</label>
                  <input
                    type="number" required
                    value={form.nominal}
                    onChange={(e) => setForm({ ...form, nominal: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3.5 px-4 rounded-xl text-lg font-black text-white outline-none focus:border-amber-500"
                    placeholder="15000000"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Keterangan / Keperluan</label>
                  <input
                    type="text" required
                    value={form.keterangan}
                    onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-amber-500"
                    placeholder="Contoh: Upah Panen Periode 2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-amber-500/30 mt-2 active:scale-95 transition-transform"
                >
                  Simpan Biaya Operasional
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
