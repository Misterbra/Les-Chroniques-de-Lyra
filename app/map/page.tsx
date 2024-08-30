"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const DynamicMap = dynamic(() => import('../../components/DynamicMap'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>
});

const InteractiveMap: React.FC = () => {
  const [mapData, setMapData] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get('data');
    console.log('Données reçues:', data);
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        console.log('Données parsées:', parsedData);
        setMapData(parsedData);
      } catch (error) {
        console.error('Erreur lors du parsing des données:', error);
      }
    }
  }, [searchParams]);

  if (!mapData) {
    return <div>Chargement de la carte... (Vérifiez la console pour les logs)</div>;
  }

  if (!mapData.cityCoordinates || !mapData.locations) {
    return <div>Données de carte invalides. Veuillez vérifier le format des données.</div>;
  }

  return (
    <div className="h-screen w-full">
      <DynamicMap mapData={mapData} />
    </div>
  );
};

export default InteractiveMap;