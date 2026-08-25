import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, ScanLine, Map, User, Bell, X, CheckCheck, Sprout, Warehouse, TrendingUp, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { SmartImage } from '../../assets/images';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Aktivitas', path: '/aktivitas', icon: ClipboardList },
  { name: 'Panen', path: '/panen', icon: ScanLine, isCenter: true },
  { name: 'Kebun', path: '/kebun', icon: Map },
  { name: 'Profil', path: '/profil', icon: User },
];

export function MobileShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, clearNotifications } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const hideNavPaths = ['/panen/scan'];
  const showNav = !hideNavPaths.some(p => location.pathname.includes(p));

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#07130C] text-slate-100 font-sans p-0 md:p-6 selection:bg-emerald-500 selection:text-white">
      {/* Container simulating high-end smartphone screen */}
      <div className="w-full max-w-[430px] bg-slate-900/90 backdrop-blur-2xl h-screen md:h-[92vh] md:rounded-[44px] md:shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col border-x md:border border-emerald-900/30">
        
        {/* Top Status & Notch Bar Simulation */}
        <div className="bg-slate-950/60 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between z-30 shrink-0 border-b border-emerald-900/20 text-xs font-semibold text-emerald-400/90 tracking-wider">
          <div className="flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-extrabold text-white tracking-widest text-[11px]">PALM.MOBILE 2.0</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-full hover:bg-emerald-950/60 transition-colors text-slate-300 active:scale-95"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-ping" />
              )}
            </button>
            <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              PRO
            </span>
          </div>
        </div>

        {/* Notification Overlay Drawer */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-11 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-2xl border-b border-emerald-500/30 p-5 shadow-2xl rounded-b-3xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Notifikasi Sistem</h3>
                  {unreadCount > 0 && (
                    <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto hide-scrollbar pr-1">
                {notifications.length === 0 ? (
                  <p className="text-center text-xs text-slate-500 py-6">Tidak ada notifikasi.</p>
                ) : (
                  notifications.map(item => (
                    <div
                      key={item.id}
                      onClick={() => markNotificationAsRead(item.id)}
                      className={cn(
                        "p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3",
                        item.read 
                          ? "bg-slate-950/40 border-slate-800 text-slate-400" 
                          : "bg-emerald-950/40 border-emerald-500/30 text-slate-100 shadow-sm"
                      )}
                    >
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug">{item.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <button 
                    onClick={clearNotifications}
                    className="text-slate-400 hover:text-red-400 transition-colors font-medium"
                  >
                    Hapus semua
                  </button>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCheck className="w-4 h-4" /> Terupdate
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-32 bg-slate-950/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Bottom Glass Navigation Dock */}
        <AnimatePresence>
          {showNav && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute bottom-5 inset-x-5 z-40 pointer-events-none"
            >
              <div className="bg-slate-900/90 backdrop-blur-2xl rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-5 py-3.5 flex items-center justify-between pointer-events-auto border border-emerald-500/25">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  const Icon = item.icon;

                  if (item.isCenter) {
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className="relative -top-7 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 w-15 h-15 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.5)] shrink-0 active:scale-90 transition-transform border-4 border-slate-900 font-extrabold"
                        aria-label="Panen Quick Scan"
                      >
                        <Icon className="w-7 h-7 text-slate-950 stroke-[2.8]" />
                      </NavLink>
                    );
                  }

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex flex-col items-center gap-1 transition-all relative py-1 px-3 rounded-2xl",
                        isActive ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 transition-transform", isActive ? "scale-110 stroke-[2.5]" : "stroke-[1.8]")} />
                      <span className="text-[10px] font-semibold tracking-tight">{item.name}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="active-dock-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -bottom-1 shadow-[0_0_8px_#10B981]"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
