import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, AlertTriangle, FileText, User } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Mapa', path: '/mapa', icon: <Map size={20} /> },
    { name: 'Alertas', path: '/alertas', icon: <AlertTriangle size={20} /> },
    { name: 'Relatórios', path: '/relatorios', icon: <FileText size={20} /> },
    { name: 'Perfil', path: '/perfil', icon: <User size={20} /> },
  ];

  return (
    <aside className="w-16 md:w-64 bg-[var(--color-bg-primary)] border-r border-[var(--color-accent)] min-h-[calc(100vh-64px)] flex flex-col pt-6 transition-all duration-300">
      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[var(--color-bg-secondary)] text-[var(--color-highlight)]'
                  : 'text-[var(--color-text-light)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-highlight)]'
              }`
            }
          >
            {item.icon}
            <span className="hidden md:block font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
