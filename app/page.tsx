"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setName, setCity } from '@/store/userSlice';

export default function Home() {
  const [name, setNameState] = useState('');
  const [city, setCityState] = useState('');
  const [playing, setPlaying] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log("Autoplay was prevented:", error);
        setPlaying(false);
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setName(name));
    dispatch(setCity(city));
    router.push('/conversation');
  };

  const togglePlayPause = () => {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setPlaying(true);
      } else {
        videoElement.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">Bienvenue dans les Chroniques de Lyra</h1>
      
      <div className="mb-8 text-center relative">
        <video id="video" width="100%" height="auto" loop>
          <source src="/Clip_Lyra.mp4" type="video/mp4" />
          Ton navigateur ne supporte pas la vidéo.
        </video>
        <label className="switch absolute bottom-4 right-4">
          <input type="checkbox" className="input__check" onChange={togglePlayPause} checked={playing} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="mb-8 text-lg leading-relaxed text-center italic">
        <p className="mb-4">
          Les Chroniques de Lyra est une aventure fantastique conçue pour t&apos;aider à explorer tes passions et à découvrir des carrières passionnantes. 
          Notre objectif est de t&apos;aider à trouver ta voie, une direction qui t&apos;inspire et te motive chaque jour.
        </p>
        <p className="mb-4">
          À travers des interactions immersives avec le monde magique de Lyra et ses habitants, tu seras guidé 
          par Elyan, un mentor bienveillant, pour explorer tes intérêts, tes talents et tes rêves. 
          Ensemble, vous découvrirez des domaines d&apos;études et des métiers qui correspondent à ta personnalité unique.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Entre ton prénom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setNameState(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-lg">Entre ta ville :</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCityState(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Commencer l&apos;aventure
        </button>
      </form>

      <div className="mt-4 text-center">
        <button onClick={() => setShowTutorial(!showTutorial)} className="bg-gray-700 text-white px-4 py-2 rounded">
          {showTutorial ? "Cacher le guide" : "Afficher le guide"}
        </button>
      </div>

      {showTutorial && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Comment explorer les Chroniques de Lyra</h2>
          <ol className="list-decimal list-inside text-lg leading-relaxed">
            <li className="mb-2">
              <strong>Entre ton prénom :</strong> Commence par entrer ton prénom pour personnaliser ton aventure.
            </li>
            <li className="mb-2">
              <strong>Démarre ton voyage :</strong> Clique sur &quot;Commencer l&apos;aventure&quot; pour entrer dans le monde magique de Lyra.
            </li>
            <li className="mb-2">
              <strong>Discute avec Elyan :</strong> Ton guide Elyan t&apos;aidera à explorer différents domaines et métiers. Sois ouvert et honnête dans tes réponses !
            </li>
            <li className="mb-2">
              <strong>Explore tes intérêts :</strong> Au fil de tes conversations, tu découvriras de nouvelles passions et compétences.
            </li>
            <li className="mb-2">
              <strong>Découvre des carrières :</strong> Petit à petit, tu découvriras des métiers qui correspondent à ta personnalité et tes intérêts.
            </li>
          </ol>
          <p className="mt-4">
            Souviens-toi, il n&apos;y a pas de mauvaises réponses. Sois toi-même et profite de cette aventure pour en apprendre plus sur toi et ton avenir !
          </p>
        </div>
      )}
    </div>
  );
}