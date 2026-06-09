import React, { useState } from 'react';
import AlertCard from '../components/AlertCard';
import alertasData from '../data/alertas.json';
import { Filter } from 'lucide-react';
import loginBg from '../assets/login-bg.png';

const Alertas = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filters = ['Todos', 'Críticos', 'Trânsito', 'Clima', 'Transporte'];

  const filteredAlerts = alertasData.filter(alerta => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Críticos' && alerta.type === 'crítico') return true;
    if (alerta.category.includes(activeFilter)) return true;
    return false;
  });

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.12,
          filter: 'blur(20px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto p-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Central de Alertas</h1>
          <p className="text-gray-400">
            {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alerta ativo' : 'alertas ativos'} na sua região
          </p>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden flex items-center gap-2 text-sm text-[var(--color-highlight)]">
          <Filter size={16} />
          <span>Filtrar</span>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === filter
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                : 'bg-[var(--color-bg-secondary)] border-[var(--color-accent)] text-gray-400 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alerta => (
            <AlertCard key={alerta.id} alert={alerta} />
          ))
        ) : (
          <div className="text-center py-12 bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl">
            <p className="text-gray-400">Nenhum alerta encontrado para este filtro.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Alertas;
