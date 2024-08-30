"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapData {
  cityCoordinates: { lat: number; lng: number };
  locations: Array<{
    name: string;
    description: string;
    coordinates: { lat: number; lng: number };
    emoji: string;
    relatedInterests: string[];
  }>;
}

const DynamicMap: React.FC<{ mapData: MapData }> = ({ mapData }) => {
  const customIcon = (emoji: string) => new L.DivIcon({
    html: `<div style="font-size: 24px;">${emoji}</div>`,
    className: 'custom-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer 
      center={[mapData.cityCoordinates.lat, mapData.cityCoordinates.lng]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapData.locations.map((location, index) => (
        <Marker 
          key={index}
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={customIcon(location.emoji)}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{location.name}</h3>
              <p>{location.description}</p>
              <p className="mt-2 font-semibold">Lié à tes intérêts :</p>
              <ul className="list-disc list-inside">
                {location.relatedInterests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DynamicMap;