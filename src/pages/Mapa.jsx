import React, { useState } from 'react';
import MapView from '../components/MapView';
import Toggle from '../components/Toggle';
import { Search, MapPin } from 'lucide-react';
import rotasData from '../data/rotas.json';
import alertasData from '../data/alertas.json';

const Mapa = () => {
  const [layers, setLayers] = useState({
    transito: true,
    satelite: false,
    onibus: true,
    clima: true,
  });

  const handleToggle = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Map Area */}
      <div className="flex-1 h-[50vh] md:h-full relative rounded-xl overflow-hidden shadow-lg border border-[var(--color-accent)]">
        <MapView 
          markers={alertasData} 
          route={rotasData.sugerida} 
          layers={layers}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-[280px] flex-shrink-0 flex flex-col gap-4">
        {/* Search */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-4 shadow-lg">
          <h3 className="text-white font-bold mb-4">Buscar Rota</h3>
          <div className="space-y-3">
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Origem" 
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-highlight)]"
                defaultValue="Av. Paulista, 1000"
              />
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-highlight)]" />
              <input 
                type="text" 
                placeholder="Destino" 
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-highlight)]"
                defaultValue="Faria Lima, 3000"
              />
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-4 shadow-lg">
          <h3 className="text-white font-bold mb-4">Rota Sugerida</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Tempo estimado:</span>
            <span className="text-white font-bold">38 min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Distância:</span>
            <span className="text-white font-bold">6.2 km</span>
          </div>
        </div>

        {/* Layers */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-4 shadow-lg flex-1">
          <h3 className="text-white font-bold mb-4">Camadas</h3>
          <div className="space-y-1">
            <Toggle label="Trânsito (tempo real)" checked={layers.transito} onChange={() => handleToggle('transito')} />
            <Toggle label="Satélite" checked={layers.satelite} onChange={() => handleToggle('satelite')} />
            <Toggle label="Corredores de Ônibus" checked={layers.onibus} onChange={() => handleToggle('onibus')} />
            <Toggle label="Radar Climático" checked={layers.clima} onChange={() => handleToggle('clima')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
