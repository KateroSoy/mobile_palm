import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { MobileShell } from './components/layout/MobileShell';
import { Dashboard } from './pages/Dashboard';
import { Kebun } from './pages/Kebun';
import { Panen } from './pages/Panen';
import { Pekerjaan } from './pages/Pekerjaan';
import { Profil } from './pages/Profil';
import { Gudang } from './pages/Gudang';
import { Pemupukan } from './pages/Pemupukan';
import { Pengeluaran } from './pages/Pengeluaran';
import { Penjualan } from './pages/Penjualan';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MobileShell />}>
            <Route index element={<Dashboard />} />
            <Route path="kebun" element={<Kebun />} />
            <Route path="panen/*" element={<Panen />} />
            <Route path="aktivitas" element={<Pekerjaan />} />
            <Route path="gudang" element={<Gudang />} />
            <Route path="pemupukan" element={<Pemupukan />} />
            <Route path="pengeluaran" element={<Pengeluaran />} />
            <Route path="penjualan" element={<Penjualan />} />
            <Route path="profil" element={<Profil />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
