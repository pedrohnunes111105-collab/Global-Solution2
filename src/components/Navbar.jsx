import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Satellite, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  return (
    <nav className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-accent)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 text-[var(--color-highlight)] hover:text-white transition-colors">
            <Satellite size={28} />
            <span className="font-bold text-xl tracking-wide">UrbanOrbit</span>
          </Link>

          {/* Links for Landing Page */}
          {isLanding && !user && (
            <div className="hidden md:flex items-center gap-8 text-[var(--color-text-light)]">
              <a href="#inicio" className="hover:text-[var(--color-highlight)] transition-colors">Início</a>
              <a href="#como-funciona" className="hover:text-[var(--color-highlight)] transition-colors">Como funciona</a>
              <a href="#sobre" className="hover:text-[var(--color-highlight)] transition-colors">Sobre</a>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isLanding && !user && (
              <Link to="/login" className="px-5 py-2 bg-[var(--color-accent)] hover:bg-opacity-80 text-white rounded-md font-medium transition-all">
                Entrar
              </Link>
            )}

            {user && !isLogin && (
              <div className="flex items-center gap-4">
                <button className="text-[var(--color-text-light)] hover:text-[var(--color-highlight)] transition-colors" aria-label="Notificações">
                  <Bell size={20} />
                </button>
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
    </nav>
  );
};

export default Navbar;
