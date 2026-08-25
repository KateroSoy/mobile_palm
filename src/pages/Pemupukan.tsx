import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { FlaskConical, Plus, X, Calendar, Calculator, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Pemupukan() {
  const { fertilizers, blocks, addFertilizer } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    blokId: blocks[0]?.id || 'b1',
    jenisPupuk: 'NPK 15-15-15',
    dosisPerPohonKg: 2.5,
    tanggalAplikasi: new Date().toISOString().split('T')[0],
  });

  const selectedBlock = blocks.find(b => b.id === form.blokId) || blocks[0];
  const calculatedTotalKg = selectedBlock ? selectedBlock.jumlahPohon * form.dosisPerPohonKg : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFertilizer({
      ...form,
      status: 'Berjalan'
    });
    setShowModal(false);
  };

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">FERTILIZATION SCHEDULER</span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Jadwal Pemupukan</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">{fertilizers.length} Program Aplikasi Terjadwal</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Buat Jadwal</span>
        </button>
      </div>

      {/* Dose Calculator Banner */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-r from-purple-950/80 to-slate-900 border border-purple-500/30 rounded-3xl p-4 shadow-xl flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">Kalkulator Dosis Dosis Dosis Pupuk</h4>
            <p className="text-[11px] text-slate-300 font-medium mt-0.5">
              Standar kebun: 2.5 Kg NPK / pohon • Rekomendasi 2x / tahun
            </p>
          </div>
        </div>
      </div>

      {/* Fertilizer Program Cards List */}
      <div className="px-6 mt-5 space-y-3.5">
        {fertilizers.map(fert => {
          const block = blocks.find(b => b.id === fert.blokId);
          const totalKebutuhan = block ? (block.jumlahPohon * fert.dosisPerPohonKg) : 0;

          return (
            <div 
              key={fert.id} 
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-black">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{fert.jenisPupuk}</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Aplikasi: {fert.tanggalAplikasi}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 text-[10px] font-black rounded-full ${
                  fert.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  fert.status === 'Berjalan' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {fert.status}
                </span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Lokasi Blok</span>
                  <p className="font-bold text-white mt-0.5">{block?.name || 'Blok Tanam'}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Dosis / Pohon</span>
                  <p className="font-bold text-purple-400 mt-0.5">{fert.dosisPerPohonKg} Kg / pohon</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Jumlah Pohon</span>
                  <p className="font-bold text-white mt-0.5">{block?.jumlahPohon.toLocaleString('id-ID')} Pohon</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Total Kebutuhan</span>
                  <p className="font-black text-emerald-400 mt-0.5">{totalKebutuhan.toLocaleString('id-ID')} Kg</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Modal */}
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
              className="bg-slate-900 border-t border-purple-500/40 rounded-t-3xl p-6 w-full max-w-[430px] shadow-2xl text-slate-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-xl text-white">Buat Jadwal Pemupukan</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Pilih Blok</label>
                  <select
                    value={form.blokId}
                    onChange={(e) => setForm({ ...form, blokId: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-purple-500"
                  >
                    {blocks.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.divisi})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Jenis Pupuk</label>
                  <select
                    value={form.jenisPupuk}
                    onChange={(e) => setForm({ ...form, jenisPupuk: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-purple-500"
                  >
                    <option value="NPK 15-15-15">NPK 15-15-15</option>
                    <option value="Urea Subur">Urea Subur</option>
                    <option value="KCl Kanada">KCl Kanada</option>
                    <option value="Dolomite">Dolomite</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Dosis (Kg / Pohon)</label>
                  <input
                    type="number" step="0.1" required
                    value={form.dosisPerPohonKg}
                    onChange={(e) => setForm({ ...form, dosisPerPohonKg: Number(e.target.value) })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3.5 px-4 rounded-xl text-lg font-black text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="bg-purple-950/50 border border-purple-500/30 rounded-2xl p-3.5 flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold">Est. Total Kebutuhan</span>
                  <span className="text-lg font-black text-purple-400">{calculatedTotalKg.toLocaleString('id-ID')} Kg</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-purple-600/30 mt-2 active:scale-95 transition-transform"
                >
                  Simpan Jadwal Pemupukan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
