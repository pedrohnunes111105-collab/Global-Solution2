import React, { useState } from 'react';
import MapView from '../components/MapView';
import Toggle from '../components/Toggle';
import { Search, MapPin, Navigation } from 'lucide-react';
import rotasData from '../data/rotas.json';
import alertasData from '../data/alertas.json';

const Mapa = () => {
  const [layers, setLayers] = useState({
    transito: true,
    satelite: false,
    onibus: true,
    clima: true,
  });

  const [origem, setOrigem] = useState('Av. Paulista, 1000');
  const [destino, setDestino] = useState('Faria Lima, 3000');
  const [isSearching, setIsSearching] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(rotasData.sugerida);
  const [routeStats, setRouteStats] = useState({ tempo: '38 min', dist: '6.2 km' });

  // Rotas de mentira para simular o mapa atualizando
  const mockRoutes = [
    rotasData.sugerida,
    [[-23.5605, -46.6433], [-23.5650, -46.6500], [-23.5715, -46.6650], [-23.5800, -46.6700]],
    [[-23.5405, -46.6233], [-23.5450, -46.6300], [-23.5515, -46.6450], [-23.5600, -46.6500]],
    [[-23.5805, -46.6833], [-23.5750, -46.6700], [-23.5615, -46.6650], [-23.5500, -46.6400]],
  ];

  const handleToggle = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    if (!origem || !destino) return;
    setIsSearching(true);
    
    setTimeout(() => {
      // Pega uma rota aleatória
      const randomIdx = Math.floor(Math.random() * mockRoutes.length);
      setCurrentRoute(mockRoutes[randomIdx]);
      
      // Gera dados aleatórios para simulação
      const tempos = ['25 min', '42 min', '18 min', '55 min', '31 min', '12 min'];
      const dists = ['4.1 km', '7.8 km', '3.2 km', '10.5 km', '5.6 km', '2.8 km'];
      
      setRouteStats({
        tempo: tempos[Math.floor(Math.random() * tempos.length)],
        dist: dists[Math.floor(Math.random() * dists.length)]
      });
      
      setIsSearching(false);
    }, 800); // tempo de loading falso
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Map Area */}
      <div className="flex-1 h-[50vh] md:h-full relative rounded-xl overflow-hidden shadow-lg border border-[var(--color-accent)]">
        <MapView 
          markers={alertasData} 
          route={currentRoute} 
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
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-highlight)]"
              />
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-highlight)]" />
              <input 
                type="text" 
                placeholder="Destino" 
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-highlight)]"
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full py-2 bg-[var(--color-accent)] hover:bg-opacity-80 text-white rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
            >
              <Navigation size={16} />
              {isSearching ? 'Calculando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {/* Route Info */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-4 shadow-lg">
          <h3 className="text-white font-bold mb-4">Rota Sugerida</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Tempo estimado:</span>
            <span className="text-white font-bold">{routeStats.tempo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Distância:</span>
            <span className="text-white font-bold">{routeStats.dist}</span>
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
