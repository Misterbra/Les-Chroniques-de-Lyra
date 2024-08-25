"use client";

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/Chat';
import YouTubeBackground from '../../components/YouTubeBackground';
import Spline from '@splinetool/react-spline';
import { RootState } from '../../store';

export default function Quest() {
  const user = useSelector((state: RootState) => state.user.name);
  const level = useSelector((state: RootState) => state.user.level);
  const experience = useSelector((state: RootState) => state.user.experience);
  const [currentArea, setCurrentArea] = useState('Vallée des Miroirs');
  const [story, setStory] = useState('');

  useEffect(() => {
    if (user) {
      setStory(`Bienvenue ${user} dans le monde magique de Lyra ! Ici, chaque lieu que tu exploreras représente un domaine d'études ou une carrière potentielle. Ta quête est de découvrir tes passions, développer tes talents et trouver la voie qui te correspond le mieux. Commence ton voyage dans la Vallée des Miroirs pour apprendre à mieux te connaître.`);
    }
  }, [user]);

  const changeArea = (newArea: string) => {
    setCurrentArea(newArea);
    // Mise à jour de l'histoire en fonction de la nouvelle zone
    switch(newArea) {
      case 'Vallée des Miroirs':
        setStory("Dans la Vallée des Miroirs, tu peux explorer tes traits de personnalité et tes compétences. Chaque reflet t'en apprendra plus sur toi-même.");
        break;
      case 'Forêt des Âmes Perdues':
        setStory("La Forêt des Âmes Perdues est remplie de personnes ayant exercé différents métiers. En les aidant, tu découvriras divers parcours professionnels.");
        break;
      case 'Citadelle du Savoir':
        setStory("La Citadelle du Savoir est une immense bibliothèque où tu peux approfondir tes connaissances dans différents domaines d'études.");
        break;
      case 'Temple des Étoiles':
        setStory("Au Temple des Étoiles, tu peux méditer sur tes objectifs de vie et visualiser ton futur professionnel idéal.");
        break;
    }
  };

  return (
    <div className="container text-white">
      <YouTubeBackground videoId="DFuFDdL9sl4" />
      <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-4">
        <h1 className="text-4xl font-bold mb-2">Ton Aventure à Lyra</h1>
        <p className="mb-2">Niveau : {level} | Expérience : {experience}</p>
        <p className="mb-4">{story}</p>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 mb-4 md:mb-0">
          <Spline
            scene="https://prod.spline.design/3azTpDS42ekjpaj5/scene.splinecode" 
            style={{ width: '100%', height: '400px' }}
          />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => changeArea('Vallée des Miroirs')} className="bg-blue-500 text-white p-2 rounded">Vallée des Miroirs</button>
            <button onClick={() => changeArea('Forêt des Âmes Perdues')} className="bg-green-500 text-white p-2 rounded">Forêt des Âmes Perdues</button>
            <button onClick={() => changeArea('Citadelle du Savoir')} className="bg-yellow-500 text-white p-2 rounded">Citadelle du Savoir</button>
            <button onClick={() => changeArea('Temple des Étoiles')} className="bg-purple-500 text-white p-2 rounded">Temple des Étoiles</button>
          </div>
        </div>
        <div className="w-full md:w-3/5 md:ml-4">
          <Chat user={user} currentArea={currentArea} />
        </div>
      </div>
    </div>
  );
}