import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Toggle from '../components/Toggle';
import rotasData from '../data/rotas.json';
import { Plus, MapPin, Check } from 'lucide-react';
import loginBg from '../assets/login-bg.png';

const Perfil = () => {
  const { user } = useAuth();
  
  // Estado para os toggles (mock salvando no localStorage)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('urbanOrbit_settings');
    return saved ? JSON.parse(saved) : {
      notifTransito: true,
      notifClima: true,
      notifAtrasos: false,
      privLocalizacao: true,
      privIA: true,
      privHistorico: false
    };
  });

  useEffect(() => {
    localStorage.setItem('urbanOrbit_settings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [saveMsg, setSaveMsg] = useState('');

  const handleSave = () => {
    setSaveMsg('Alterações salvas com sucesso!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleAddRoute = () => {
    alert('Funcionalidade de adicionar rota será implementada em breve.');
  };

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
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 pb-10 p-6">
      {/* Profile Header */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-6 shadow-lg flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-highlight)] flex items-center justify-center text-2xl font-bold text-white">
          {user?.initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{user?.name}</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rotas Salvas */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-[var(--color-accent)] pb-2">Rotas Salvas</h3>
          <div className="space-y-3 mb-6">
            {rotasData.salvas.map(rota => (
              <div key={rota.id} className="flex items-center gap-3 p-3 bg-[var(--color-bg-primary)] rounded-lg hover:border-[var(--color-highlight)] border border-transparent cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-highlight)]">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{rota.nome}</h4>
                  <p className="text-xs text-gray-400">{rota.origem} → {rota.destino}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleAddRoute} className="w-full py-3 border border-dashed border-[var(--color-accent)] rounded-lg text-[var(--color-highlight)] hover:bg-[var(--color-bg-primary)] transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <Plus size={16} />
            Adicionar nova rota
          </button>
        </div>

        {/* Dados Pessoais */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-[var(--color-accent)] pb-2">Dados Pessoais</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="perfil-nome" className="block text-sm text-gray-400 mb-1">Nome Completo</label>
              <input id="perfil-nome" type="text" defaultValue={user?.name} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--color-highlight)]" />
            </div>
            <div>
              <label htmlFor="perfil-cidade" className="block text-sm text-gray-400 mb-1">Cidade Principal</label>
              <input id="perfil-cidade" type="text" defaultValue="São Paulo, SP" className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--color-highlight)]" />
            </div>
            <div>
              <label htmlFor="perfil-modal" className="block text-sm text-gray-400 mb-1">Modal Preferido</label>
              <select id="perfil-modal" className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--color-highlight)]">
                <option style={{ backgroundColor: '#0B1028', color: '#fff' }}>Carro</option>
                <option style={{ backgroundColor: '#0B1028', color: '#fff' }}>Transporte Público</option>
                <option style={{ backgroundColor: '#0B1028', color: '#fff' }}>Bicicleta</option>
                <option style={{ backgroundColor: '#0B1028', color: '#fff' }}>A pé</option>
              </select>
            </div>
            <button type="button" onClick={handleSave} className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors">
              Salvar alterações
            </button>
            {saveMsg && (
              <span className="flex items-center gap-1.5 text-sm text-green-400 font-medium animate-pulse">
                <Check size={16} />
                {saveMsg}
              </span>
            )}
          </form>
        </div>

        {/* Notificações */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-[var(--color-accent)] pb-2">Preferências de Notificação</h3>
          <div className="space-y-2">
            <Toggle label="Alertas de trânsito intensos" checked={settings.notifTransito} onChange={() => handleToggle('notifTransito')} />
            <Toggle label="Avisos climáticos preditivos" checked={settings.notifClima} onChange={() => handleToggle('notifClima')} />
            <Toggle label="Atrasos no meu transporte público" checked={settings.notifAtrasos} onChange={() => handleToggle('notifAtrasos')} />
          </div>
        </div>

        {/* Privacidade (LGPD) */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-[var(--color-accent)] pb-2">Privacidade & Dados</h3>
          <p className="text-xs text-gray-400 mb-4">Gerencie como o UrbanOrbit utiliza seus dados de acordo com a LGPD.</p>
          <div className="space-y-2">
            <Toggle label="Compartilhar localização em tempo real" checked={settings.privLocalizacao} onChange={() => handleToggle('privLocalizacao')} />
            <Toggle label="Contribuir com dados anônimos para a IA" checked={settings.privIA} onChange={() => handleToggle('privIA')} />
            <Toggle label="Salvar histórico de rotas" checked={settings.privHistorico} onChange={() => handleToggle('privHistorico')} />
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Perfil;
