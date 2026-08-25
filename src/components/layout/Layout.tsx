import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Tractor, 
  ClipboardList, 
  FlaskConical, 
  Warehouse, 
  Receipt, 
  TrendingUp, 
  Menu,
  X,
  Sprout
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Kebun', path: '/kebun', icon: Map },
  { name: 'Panen', path: '/panen', icon: Tractor },
  { name: 'Pekerjaan', path: '/pekerjaan', icon: ClipboardList },
  { name: 'Pemupukan', path: '/pemupukan', icon: FlaskConical },
  { name: 'Gudang', path: '/gudang', icon: Warehouse },
  { name: 'Pengeluaran', path: '/pengeluaran', icon: Receipt },
  { name: 'Penjualan', path: '/penjualan', icon: TrendingUp },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-full",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-emerald-700">
            <Sprout className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">PALM APP</span>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-700" : "text-gray-400")} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center h-16 px-4 bg-white border-b border-gray-200 lg:hidden shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 text-emerald-700">
            <Sprout className="w-5 h-5" />
            <span className="text-lg font-bold">PALM APP</span>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
