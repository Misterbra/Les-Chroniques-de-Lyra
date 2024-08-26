"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Définition des icônes personnalisées pour chaque zone
const customIcon = (iconUrl: string) => new L.Icon({
  iconUrl: iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const areas = [
  { 
    name: 'Vallée des Miroirs', 
    path: '/quest?area=vallee-des-miroirs',
    description: "Un lieu d'introspection et de découverte de soi.",
    coordinates: [51.505, -0.09],
    icon: customIcon('/images/mirror-icon.png')
  },
  { 
    name: 'Forêt des Âmes Perdues', 
    path: '/quest?area=foret-des-ames-perdues',
    description: "Un endroit mystérieux pour explorer différentes voies de carrière.",
    coordinates: [51.51, -0.1],
    icon: customIcon('/images/forest-icon.png')
  },
  { 
    name: 'Citadelle du Savoir', 
    path: '/quest?area=citadelle-du-savoir',
    description: "Une immense bibliothèque pour approfondir vos connaissances.",
    coordinates: [51.515, -0.09],
    icon: customIcon('/images/citadel-icon.png')
  },
  { 
    name: 'Temple des Étoiles', 
    path: '/quest?area=temple-des-etoiles',
    description: "Un lieu de méditation pour réfléchir à vos objectifs de vie.",
    coordinates: [51.52, -0.08],
    icon: customIcon('/images/temple-icon.png')
  },
];

const InteractiveMap = () => {
  const router = useRouter();
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  if (!mapLoaded) {
    return <div>Chargement de la carte...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {areas.map((area, index) => (
          <Marker 
            key={index} 
            position={area.coordinates} 
            icon={area.icon}
            eventHandlers={{
              click: () => setActiveArea(area.name),
              mouseover: (e: L.LeafletMouseEvent) => e.target.openPopup(),
              mouseout: (e: L.LeafletMouseEvent) => e.target.closePopup(),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{area.name}</h3>
                <p className="text-sm">{area.description}</p>
                <button 
                  onClick={() => router.push(area.path)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Explorer
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
};

const AreaInfo = ({ area }: { area: typeof areas[0] | null }) => {
  const router = useRouter();
  
  if (!area) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-md mt-4"
    >
      <h2 className="text-2xl font-bold mb-2">{area.name}</h2>
      <p className="text-gray-600 mb-4">{area.description}</p>
      <button 
        onClick={() => router.push(area.path)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Commencer l'exploration
      </button>
    </motion.div>
  );
};

export default function MapPage() {
  const [selectedArea, setSelectedArea] = useState<typeof areas[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Carte Interactive de Lyra</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <InteractiveMap />
        </div>
        <div>
          <AreaInfo area={selectedArea} />
        </div>
      </div>
    </div>
  );
}