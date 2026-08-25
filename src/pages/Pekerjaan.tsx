import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { CheckCircle2, Circle, Plus, X, Calendar, ClipboardCheck, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';

export function Pekerjaan() {
  const { tasks, blocks, updateTaskStatus, addTask } = useAppContext();
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const [newTaskForm, setNewTaskForm] = useState({
    kategori: 'PANEN',
    blokId: blocks[0]?.id || 'b1',
    target: '450 Janjang TBS',
    tanggal: format(new Date(), 'yyyy-MM-dd')
  });

  const filteredTasks = tasks.filter(t => {
    if (filterCategory === 'Semua') return true;
    if (filterCategory === 'Selesai') return t.status === 'Selesai';
    return t.kategori === filterCategory;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Selesai').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...newTaskForm,
      status: 'Belum Mulai'
    });
    setShowAddTaskModal(false);
  };

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">TASK MANAGEMENT</span>
          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">Aktivitas & Tugas</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            {format(new Date(), 'dd MMMM yyyy', { locale: id })}
          </p>
        </div>

        <button
          onClick={() => setShowAddTaskModal(true)}
          className="w-11 h-11 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Progress Ring Summary Card */}
      <div className="px-6 mt-4">
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 shadow-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">PROGRES TUGAS KEBUAN</span>
            <h2 className="text-xl font-black text-white mt-1">{completedTasks} dari {totalTasks} Selesai</h2>
            <p className="text-xs text-slate-400 font-medium mt-1">Status real-time divisi operasional</p>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#1E293B" strokeWidth="6" fill="none" />
              <circle 
                cx="32" cy="32" r="26" 
                stroke="#10B981" strokeWidth="6" fill="none" 
                strokeDasharray="163" 
                strokeDashoffset={163 - (163 * (completionPercentage / 100))} 
                strokeLinecap="round" 
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-emerald-400">
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-5 px-6 flex gap-2 overflow-x-auto hide-scrollbar">
        {['Semua', 'PANEN', 'PEMUPUKAN', 'PERAWATAN', 'Selesai'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              filterCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task Cards List */}
      <div className="px-6 mt-5 space-y-3">
        {filteredTasks.map(task => {
          const block = blocks.find(b => b.id === task.blokId);
          const isDone = task.status === 'Selesai';
          const getImage = () => {
            if (task.kategori === 'PANEN') return ASSET_IMAGES.harvestPalm;
            if (task.kategori === 'PEMUPUKAN') return ASSET_IMAGES.fertilizer;
            return ASSET_IMAGES.tools;
          };

          return (
            <motion.div
              key={task.id}
              layout
              className={`bg-slate-900/90 border rounded-3xl p-4 shadow-xl flex items-center justify-between transition-all ${
                isDone ? 'border-slate-800/60 opacity-60' : 'border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-2xl overflow-hidden shrink-0 border border-slate-800">
                  <SmartImage src={getImage()} alt={task.kategori} fallbackType="task" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{task.kategori}</span>
                  <h3 className={`text-sm font-black truncate ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>
                    {block?.name || 'Blok Kebun'}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{task.target}</p>
                </div>
              </div>

              <button
                onClick={() => updateTaskStatus(task.id, isDone ? 'Belum Mulai' : 'Selesai')}
                className="p-2 shrink-0 active:scale-90 transition-transform text-emerald-400"
              >
                {isDone ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <Circle className="w-8 h-8 text-slate-700 hover:text-emerald-400 transition-colors" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Add Task Modal Sheet */}
      <AnimatePresence>
        {showAddTaskModal && (
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
                <h3 className="font-black text-xl text-white">Buat Tugas Operasional</h3>
                <button onClick={() => setShowAddTaskModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Kategori Pekerjaan</label>
                  <select
                    value={newTaskForm.kategori}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, kategori: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500"
                  >
                    <option value="PANEN">PANEN</option>
                    <option value="PEMUPUKAN">PEMUPUKAN</option>
                    <option value="PERAWATAN">PERAWATAN</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Pilih Blok Tanam</label>
                  <select
                    value={newTaskForm.blokId}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, blokId: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500"
                  >
                    {blocks.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.divisi})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase">Target & Deskripsi Tugas</label>
                  <input
                    type="text" required
                    value={newTaskForm.target}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, target: e.target.value })}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 py-3 px-4 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500"
                    placeholder="Contoh: 450 Janjang TBS • Tim Panen 1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/30 mt-4 active:scale-95 transition-transform"
                >
                  Tambahkan Tugas Baru
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
