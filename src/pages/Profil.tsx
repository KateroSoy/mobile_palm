import React, { useState } from 'react';
import { Settings, Bell, Lock, HelpCircle, Info, LogOut, ChevronRight, MapPin, Trees, Warehouse, TrendingUp, DollarSign, X, CheckCircle2 } from 'lucide-react';
import { SmartImage, ASSET_IMAGES } from '../assets/images';
import { useAppContext } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Profil() {
  const navigate = useNavigate();
  const { activeKebun, kebunList, setActiveKebun, notifications } = useAppContext();
  const [showEstateModal, setShowEstateModal] = useState(false);
  const [activeModalInfo, setActiveModalInfo] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pb-28 text-slate-100 selection:bg-emerald-500">
      {/* Executive Header Card */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-b-[36px] border-b border-emerald-500/20 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500/40 p-1 shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-3 overflow-hidden relative">
            <SmartImage 
              src={ASSET_IMAGES.avatar} 
              alt="Profile Avatar" 
              fallbackType="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            OWNER & MANAGING DIRECTOR
          </span>
          <h1 className="text-2xl font-black text-white">Jack Ma</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">PT Palma Nusantara Indonesia</p>
        </div>

        {/* Plantation Stats Quick Summary */}
        <div className="grid grid-cols-3 gap-2 mt-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase">LUAS AREAL</span>
            <p className="text-sm font-black text-white mt-0.5">850 Ha</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase">TOTAL BLOK</span>
            <p className="text-sm font-black text-emerald-400 mt-0.5">48 Blok</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase">DIVISI</span>
            <p className="text-sm font-black text-white mt-0.5">6 Divisi</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-6 mt-6 space-y-2.5">
        <MenuRow 
          icon={MapPin} 
          label="Pilih Kebun Aktif" 
          value={activeKebun} 
          onClick={() => setShowEstateModal(true)} 
        />
        <MenuRow 
          icon={Bell} 
          label="Notifikasi Sistem" 
          badge={unreadCount > 0 ? `${unreadCount} Baru` : undefined} 
          onClick={() => setActiveModalInfo('All system notifications are functioning correctly.')} 
        />
        <MenuRow 
          icon={Warehouse} 
          label="Kelola Gudang & Material" 
          onClick={() => navigate('/gudang')} 
        />
        <MenuRow 
          icon={TrendingUp} 
          label="Laporan Penjualan TBS" 
          onClick={() => navigate('/penjualan')} 
        />
        <MenuRow 
          icon={DollarSign} 
          label="Catatan Biaya Operasional" 
          onClick={() => navigate('/pengeluaran')} 
        />
        <MenuRow 
          icon={Lock} 
          label="Keamanan Perangkat & PIN" 
          onClick={() => setActiveModalInfo('Biometric PIN Lock is active.')} 
        />
        <MenuRow 
          icon={HelpCircle} 
          label="Bantuan & FAQ" 
          onClick={() => setActiveModalInfo('PALM MOBILE v2.0 Enterprise Suite. Support 24/7.')} 
        />
        <MenuRow 
          icon={Info} 
          label="Tentang PALM MOBILE v2.0" 
          onClick={() => setActiveModalInfo('PALM.MOBILE v2.0. Built with React, Vite & TailwindCSS.')} 
        />

        <div className="pt-2">
          <MenuRow 
            icon={LogOut} 
            label="Keluar dari Aplikasi" 
            isDestructive 
            onClick={() => setActiveModalInfo('Demo Mode: Session locked.')} 
          />
        </div>
      </div>

      {/* Estate Switcher Modal */}
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
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Popup Modal */}
      <AnimatePresence>
        {activeModalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 w-full max-w-xs shadow-2xl text-slate-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-white mb-2">Informasi Sistem</h3>
              <p className="text-xs text-slate-300 font-medium mb-4">{activeModalInfo}</p>
              <button
                onClick={() => setActiveModalInfo(null)}
                className="w-full bg-emerald-500 text-slate-950 font-black py-2.5 rounded-xl shadow-md"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuRow({ icon: Icon, label, value, badge, isDestructive, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-slate-900/90 border hover:border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between shadow-lg active:scale-98 transition-all ${
        isDestructive ? 'border-red-500/30 text-red-400' : 'border-slate-800 text-white'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`p-2.5 rounded-xl ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-slate-950 text-emerald-400 border border-slate-800'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-extrabold text-xs">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {value && <span className="text-xs font-bold text-emerald-400">{value}</span>}
        {badge && (
          <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className={`w-4 h-4 ${isDestructive ? 'text-red-400' : 'text-slate-500'}`} />
      </div>
    </button>
  );
}
