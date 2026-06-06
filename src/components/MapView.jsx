import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView = ({ markers = [], route = null, layers = {} }) => {
  const defaultCenter = [-23.5505, -46.6333]; // São Paulo
  const zoom = 13;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[var(--color-accent)]">
      <MapContainer center={defaultCenter} zoom={zoom} style={{ height: '100%', width: '100%', backgroundColor: '#0B1028' }}>
        
        {/* Camada Base (Satélite ou Mapa Padrão com tema escuro) */}
        {layers.satelite ? (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          />
        )}

        {/* Camada de Trânsito Mockada (se ativada) */}
        {layers.transito && route && (
          <Polyline positions={route} color="#ff4444" weight={4} dashArray="5, 10" />
        )}

        {/* Rota Sugerida (se não for camada de trânsito puramente) */}
        {route && !layers.transito && (
          <Polyline positions={route} color="#A6B6FF" weight={5} dashArray="10, 10" />
        )}

        {/* Marcadores */}
        {markers.map((marker, idx) => {
          let color = 'blue';
          if (marker.type === 'acidente') color = 'red';
          if (marker.type === 'chuva') color = 'gold';

          // Filtra baseado nas layers (se houver lógica de filtro no mapa em si)
          if (marker.type === 'clima' && layers.clima === false) return null;
          if (marker.type === 'onibus' && layers.onibus === false) return null;

          return (
            <Marker key={idx} position={marker.position} icon={customIcon(color)}>
              <Popup>
                <div className="text-gray-800 font-sans">
                  <strong>{marker.title}</strong>
                  <p className="text-sm m-0 mt-1">{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
