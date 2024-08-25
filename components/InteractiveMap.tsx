import React from 'react';
import { useRouter } from 'next/router';

const InteractiveMap = () => {
  const router = useRouter();

  const areas = [
    { name: 'Vallée des Miroirs', path: '/quest?area=vallee-des-miroirs' },
    { name: 'Forêt des Âmes Perdues', path: '/quest?area=foret-des-ames-perdues' },
    { name: 'Citadelle du Savoir', path: '/quest?area=citadelle-du-savoir' },
    { name: 'Temple des Étoiles', path: '/quest?area=temple-des-etoiles' },
  ];

  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
      <img src="/images/lyra_map.jpg" alt="Carte de Lyra" className="w-full h-full object-cover" />
      {areas.map((area, index) => (
        <button
          key={index}
          className="absolute bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
          style={{
            top: `${20 + index * 20}%`,
            left: `${10 + index * 25}%`,
          }}
          onClick={() => router.push(area.path)}
        >
          {area.name}
        </button>
      ))}
    </div>
  );
};

export default InteractiveMap;