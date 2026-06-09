import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Satellite, Bell, Settings, LogOut, Menu, X, AlertCircle, CloudRain, Bus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockNotifications = [
  { id: 1, text: 'Acidente na Av. Brasil — trânsito intenso', time: '5 min', icon: <AlertCircle size={14} className="text-red-400" /> },
  { id: 2, text: 'Chuva prevista para às 18h na sua região', time: '12 min', icon: <CloudRain size={14} className="text-yellow-400" /> },
  { id: 3, text: 'Linha 8 do metrô com atraso de 10 min', time: '30 min', icon: <Bus size={14} className="text-blue-400" /> },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-accent)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 text-[var(--color-highlight)] hover:text-white transition-colors">
            <Satellite size={28} />
            <span className="font-bold text-xl tracking-wide">UrbanOrbit</span>
          </Link>

          {/* Links for Landing Page — Desktop */}
          {isLanding && !user && (
            <div className="hidden md:flex items-center gap-8 text-[var(--color-text-light)]">
              <a href="#inicio" className="hover:text-[var(--color-highlight)] transition-colors">Início</a>
              <a href="#como-funciona" className="hover:text-[var(--color-highlight)] transition-colors">Como funciona</a>
              <a href="#sobre" className="hover:text-[var(--color-highlight)] transition-colors">Sobre</a>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Hamburger — Mobile only, Landing page */}
            {isLanding && !user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[var(--color-text-light)] hover:text-[var(--color-highlight)] transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            {isLanding && !user && (
              <Link to="/login" className="px-5 py-2 bg-[var(--color-accent)] hover:bg-opacity-80 text-white rounded-md font-medium transition-all">
                Entrar
              </Link>
            )}

            {user && !isLogin && (
              <div className="flex items-center gap-4">
                {/* Notifications Bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative text-[var(--color-text-light)] hover:text-[var(--color-highlight)] transition-colors"
                    aria-label="Notificações"
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--color-bg-primary)]" />
                  </button>

                  {/* Notification Dropdown */}
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border border-[var(--color-accent)] overflow-hidden" style={{ backgroundColor: '#1A2A4F', zIndex: 60 }}>
                      <div className="px-4 py-3 border-b border-[var(--color-accent)]">
                        <h4 className="text-sm font-bold text-white">Notificações</h4>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {mockNotifications.map((n) => (
                          <div
                            key={n.id}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-bg-primary)] transition-colors cursor-pointer border-b border-[var(--color-accent)] last:border-b-0"
                          >
                            <div className="mt-0.5">{n.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[var(--color-text-light)] leading-snug">{n.text}</p>
                              <p className="text-xs text-gray-400 mt-1">há {n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/alertas"
                        onClick={() => setNotifOpen(false)}
                        className="block text-center py-2.5 text-xs font-medium text-[var(--color-highlight)] hover:text-white transition-colors border-t border-[var(--color-accent)]"
                      >
                        Ver todos os alertas
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/perfil" className="text-[var(--color-text-light)] hover:text-[var(--color-highlight)] transition-colors" aria-label="Configurações">
                  <Settings size={20} />
                </Link>
                <div className="flex items-center gap-2 ml-2 pl-4 border-l border-[var(--color-accent)]">
                  <Link to="/perfil" className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center font-bold text-sm border border-[var(--color-highlight)]">
                    {user.initials}
                  </Link>
                  <button onClick={logout} className="text-[var(--color-text-light)] hover:text-red-400 ml-2" aria-label="Sair">
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown — Landing page only */}
      {isLanding && !user && mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-accent)] bg-[var(--color-bg-primary)]">
          <div className="flex flex-col px-4 py-4 gap-4 text-[var(--color-text-light)]">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-highlight)] transition-colors py-2">Início</a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-highlight)] transition-colors py-2">Como funciona</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-highlight)] transition-colors py-2">Sobre</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
