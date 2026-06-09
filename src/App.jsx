import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mapa from './pages/Mapa';
import Alertas from './pages/Alertas';
import Perfil from './pages/Perfil';
import Relatorios from './pages/Relatorios';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center text-white">Carregando...</div>;
  
  return user ? (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  ) : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Landing /></>} />
      <Route path="/login" element={<><Navbar /><Login /></>} />
      
      {/* Rotas Protegidas */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/mapa" element={<PrivateRoute><Mapa /></PrivateRoute>} />
      <Route path="/alertas" element={<PrivateRoute><Alertas /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      
      {/* Relatórios */}
      <Route path="/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute>} />
      
      {/* Redirect de qualquer rota não encontrada para a Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
