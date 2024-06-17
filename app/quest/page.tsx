"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/Chat';
import YouTubeBackground from '../../components/YouTubeBackground';
import Spline from '@splinetool/react-spline';
import { RootState } from '../../store'; // Importez RootState depuis votre store

export default function Quest() {
  const user = useSelector((state: RootState) => state.user.name);
  const [story, setStory] = useState('');

  useEffect(() => {
    if (user) {
      setStory(`Bienvenue ${user}, vous avez été choisi pour une quête personnelle. Ensemble, nous allons explorer ce qui donne un véritable sens à votre vie et comment vous pouvez contribuer à une cause plus grande que vous-même.`);
    }
  }, [user]);

  return (
    <div className="container text-white">
      <YouTubeBackground videoId="DFuFDdL9sl4" /> {/* Remplacez par votre ID de vidéo YouTube */}
      <h1 className="text-4xl font-bold mb-4">Votre Quête</h1>
      <p className="mb-4">{story}</p>
      
      <div className="flex">
        <div className="w-2/5">
          <Spline
            scene="https://prod.spline.design/3azTpDS42ekjpaj5/scene.splinecode" 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="w-2/3 ml-4">
          <Chat user={user} />
        </div>
      </div>
    </div>
  );
}
