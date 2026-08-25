import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { 
  Bell, ArrowUpRight, TrendingUp, CheckCircle2, ChevronRight, Droplets, 
  MapPin, CloudSun, Warehouse, FlaskConical, TrendingDown, DollarSign, 
  Zap, Calendar, Users, Sprout, ArrowRight, ShieldCheck, ChevronDown, Check
} from 'lucide-react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Sen', ton: 34.5 },
  { day: 'Sel', ton: 38.2 },
  { day: 'Rab', ton: 41.0 },
  { day: 'Kam', ton: 39.8 },
  { day: 'Jum', ton: 45.2 },
  { day: 'Sab', ton: 42.8 },
  { day: 'Min', ton: 44.0 },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { blocks, tasks, activeKebun, kebunList, setActiveKebun, notifications } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showEstateModal, setShowEstateModal] = useState(false);
  const [activeActivityModal, setActiveActivityModal] = useState<any>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'Semua') return true;
    if (selectedCategory === 'Panen') return task.kategori === 'PANEN';
    if (selectedCategory === 'Pupuk') return task.kategori === 'PEMUPUKAN';
    if (selectedCategory === 'Perawatan') return task.kategori === 'PERAWATAN';
    return true;
  });

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Top Bar Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <button 
            onClick={() => setShowEstateModal(true)}
            className="flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-400 mb-2 transition-all active:scale-95 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{activeKebun}</span>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-500" />
          </button>
          
          <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
            Selamat pagi,<br />
            <span className="text-emerald-400">Jack Ma</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            25 Agustus 2026 • 08:30 WIB
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div 
            onClick={() => navigate('/profil')}
            className="w-12 h-12 rounded-full border-2 border-emerald-500/40 p-0.5 shadow-lg shadow-emerald-950/50 cursor-pointer active:scale-95 transition-transform overflow-hidden"
          >
            <SmartImage 
              src={ASSET_IMAGES.avatar} 
              alt="Profile" 
              fallbackType="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Hero Plantation Weather & Status Card */}
      <div className="px-6 mt-4">
        <div className="relative w-full h-[190px] rounded-[30px] overflow-hidden shadow-2xl border border-emerald-500/20 group">
          <SmartImage 
            src={ASSET_IMAGES.heroPlantation} 
            alt="Kebun Sawit" 
            fallbackType="hero"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-2 text-xs font-semibold text-slate-200">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>31°C Cerah</span>
              <span className="text-emerald-400">• Lembab 78%</span>
            </div>

            <div className="bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-full text-[10px] tracking-wider uppercase shadow-[0_0_15px_#10B981]">
              ESTATE ONLINE
            </div>
          </div>

          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
            <div>
              <h2 className="text-white text-xl font-extrabold tracking-tight drop-shadow-md">{activeKebun}</h2>
              <p className="text-slate-300 text-xs font-medium mt-0.5 drop-shadow">850 Ha • 6 Divisi • 48 Blok Tanam</p>
            </div>
            
            <div className="flex items-center gap-1 bg-emerald-950/90 border border-emerald-500/40 px-3 py-1.5 rounded-2xl backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-bold">Kondisi Prima</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcut Modules */}
      <div className="px-6 mt-6">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Modul Kebun</h3>
        <div className="grid grid-cols-4 gap-2.5">
          <ShortcutButton 
            title="Gudang" 
            sub="Stok" 
            icon={Warehouse} 
            color="from-blue-600/30 to-blue-500/10 border-blue-500/30 text-blue-400" 
            onClick={() => navigate('/gudang')}
          />
          <ShortcutButton 
            title="Pupuk" 
            sub="Jadwal" 
            icon={FlaskConical} 
            color="from-purple-600/30 to-purple-500/10 border-purple-500/30 text-purple-400" 
            onClick={() => navigate('/pemupukan')}
          />
          <ShortcutButton 
            title="Jual" 
            sub="TBS" 
            icon={TrendingUp} 
            color="from-emerald-600/30 to-emerald-500/10 border-emerald-500/30 text-emerald-400" 
            onClick={() => navigate('/penjualan')}
          />
          <ShortcutButton 
            title="Biaya" 
            sub="Keluar" 
            icon={DollarSign} 
            color="from-amber-600/30 to-amber-500/10 border-amber-500/30 text-amber-400" 
            onClick={() => navigate('/pengeluaran')}
          />
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="mt-6 px-6 flex gap-2.5 overflow-x-auto hide-scrollbar">
        {['Semua', 'Panen', 'Pupuk', 'Perawatan'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Horizontal KPI Cards */}
      <div className="mt-4 px-6 flex gap-3 overflow-x-auto hide-scrollbar snap-x">
        <div className="snap-start shrink-0 w-[150px] bg-slate-900/90 border border-emerald-500/30 rounded-[24px] p-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PANEN HARI INI</p>
          <div className="flex items-baseline gap-1 mt-2">
            <h3 className="text-3xl font-black text-white tracking-tight">42,8</h3>
            <span className="text-xs font-extrabold text-emerald-400">TON</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-3">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8,4% vs kemarin</span>
          </div>
        </div>

        <div className="snap-start shrink-0 w-[150px] bg-slate-900/90 border border-emerald-500/30 rounded-[24px] p-4 shadow-xl relative overflow-hidden">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">TARGET HARIAN</p>
          <div className="flex items-baseline gap-1 mt-2">
            <h3 className="text-3xl font-black text-white tracking-tight">95</h3>
            <span className="text-lg font-bold text-slate-400">%</span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-3">Sisa 2.2 Ton TBS</p>
        </div>

        <div className="snap-start shrink-0 w-[150px] bg-slate-900/90 border border-emerald-500/30 rounded-[24px] p-4 shadow-xl relative overflow-hidden">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">ESTIMASI YIELD</p>
          <div className="flex items-baseline gap-1 mt-2">
            <h3 className="text-3xl font-black text-white tracking-tight">1.82</h3>
            <span className="text-[10px] font-bold text-slate-400">T/Ha</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-3">
            <ArrowUpRight className="w-4 h-4" />
            <span>+2,1% bulan ini</span>
          </div>
        </div>
      </div>

      {/* Production Chart Widget */}
      <div className="px-6 mt-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-[28px] p-5 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400">Grafik Panen Mingguan</p>
              <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">285.5 Ton</h3>
            </div>
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% Target
            </div>
          </div>

          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#091E15', borderColor: '#10B981', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="ton" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTon)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Plantation Activities */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-white">Aktivitas Berjalan</h2>
          <button 
            onClick={() => navigate('/aktivitas')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Semua</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <ActivityItem 
            title="Panen Buah TBS"
            location="Blok A12 • Divisi 1"
            meta="450 Janjang • 12 Pekerja"
            progress={75}
            image={ASSET_IMAGES.harvestPalm}
            onClick={() => setActiveActivityModal({ title: 'Panen Buah TBS', block: 'Blok A12', target: '450 Janjang', workers: '12 Pemanen', progress: 75 })}
          />

          <ActivityItem 
            title="Aplikasi Pupuk NPK"
            location="Blok B04 • Divisi 2"
            meta="18 Ha • Dosis 2.5 Kg/pohon"
            progress={40}
            image={ASSET_IMAGES.fertilizer}
            onClick={() => setActiveActivityModal({ title: 'Aplikasi Pupuk NPK', block: 'Blok B04', target: '18 Hektar', workers: '8 Pekerja', progress: 40 })}
          />
        </div>
      </div>

      {/* Estate Selector Modal */}
      <AnimatePresence>
        {showEstateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-slate-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-lg text-white">Pilih Kebun Operasional</h3>
                <button onClick={() => setShowEstateModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {kebunList.map((kebun) => (
                  <button
                    key={kebun}
                    onClick={() => {
                      setActiveKebun(kebun);
                      setShowEstateModal(false);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left font-bold flex justify-between items-center transition-all ${
                      activeKebun === kebun 
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-md' 
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-extrabold">{kebun}</p>
                        <p className="text-[11px] text-slate-400 font-medium">850 Ha • Riau Province</p>
                      </div>
                    </div>
                    {activeKebun === kebun && <Check className="w-5 h-5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {activeActivityModal && (
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
              className="bg-slate-900 border-t border-emerald-500/30 rounded-t-3xl p-6 w-full max-w-[430px] shadow-2xl text-slate-100"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">DETAIL AKTIVITAS</span>
                  <h3 className="font-extrabold text-xl text-white mt-0.5">{activeActivityModal.title}</h3>
                </div>
                <button onClick={() => setActiveActivityModal(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Lokasi</span>
                  <span className="font-bold text-white">{activeActivityModal.block}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Target Pekerjaan</span>
                  <span className="font-bold text-emerald-400">{activeActivityModal.target}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Alokasi Pekerja</span>
                  <span className="font-bold text-white">{activeActivityModal.workers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progress Pengerjaan</span>
                  <span className="font-bold text-emerald-400">{activeActivityModal.progress}%</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setActiveActivityModal(null);
                    navigate('/panen');
                  }}
                  className="flex-1 bg-emerald-500 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                >
                  Buka Form Panen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShortcutButton({ title, sub, icon: Icon, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-b ${color} border rounded-2xl p-3 flex flex-col items-center justify-center text-center active:scale-95 transition-transform shadow-md`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs font-bold text-white leading-none">{title}</span>
      <span className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</span>
    </button>
  );
}

function ActivityItem({ title, location, meta, progress, image, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/30 rounded-2xl p-3.5 shadow-lg flex items-center gap-3.5 cursor-pointer active:scale-[0.98] transition-all"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-800">
        <SmartImage src={image} alt={title} fallbackType="panen" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-extrabold text-white truncate">{title}</h4>
        <p className="text-xs font-medium text-emerald-400 mt-0.5">{location}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{meta}</p>
      </div>
      <div className="shrink-0 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-slate-950 border border-emerald-500/40 flex items-center justify-center font-black text-xs text-emerald-400 shadow-inner">
          {progress}%
        </div>
      </div>
    </div>
  );
}
