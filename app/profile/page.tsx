"use client";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Carnet d&lsquo;Aventures de {name}</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Niveau d&lsquo;Exploration</h2>
        <p className="text-xl">Niveau {user.level}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(user.experience / (user.level * 100)) * 100}%`}}></div>
        </div>
        <p className="mt-1">Points d&lsquo;expérience : {user.experience} / {user.level * 100}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Domaines Explorés</h2>
        {user.quests.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.quests.map((quest, index) => (
              <li key={index} className="mb-1">{quest}</li>
            ))}
          </ul>
        ) : (
          <p>Tu n&lsquo;as pas encore exploré de domaines. De nombreuses aventures t&lsquo;attendent !</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Tes Super-Pouvoirs</h2>
        {user.traits.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.traits.map((trait, index) => (
              <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{trait}</span>
            ))}
          </div>
        ) : (
          <p>Continue ton aventure pour découvrir tes super-pouvoirs uniques !</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Découvertes Importantes</h2>
        {user.insights.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.insights.map((insight, index) => (
              <li key={index} className="mb-1 italic">&quot;{insight}&quot;</li>
            ))}
          </ul>
        ) : (
          <p>Tes conversations avec Elyan te mèneront à des découvertes passionnantes sur toi-même et ton avenir !</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Métiers Qui Pourraient t&lsquo;Intéresser</h2>
        {user.potentialCareers && user.potentialCareers.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.potentialCareers.map((career, index) => (
              <li key={index} className="mb-1">{career}</li>
            ))}
          </ul>
        ) : (
          <p>Continue ton exploration pour découvrir des métiers passionnants qui correspondent à tes intérêts !</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Prochaines Étapes</h2>
        <p>Voici quelques suggestions pour continuer ton aventure :</p>
        <ul className="list-disc list-inside mt-2">
          <li>Explore un nouveau domaine qui t&lsquo;intrigue</li>
          <li>Discute avec Elyan de tes passions et de tes rêves</li>
          <li>Réfléchis à comment tes super-pouvoirs peuvent t&lsquo;aider dans différents métiers</li>
          <li>Fais des recherches sur les métiers qui t&lsquo;intéressent</li>
        </ul>
      </div>
    </div>
  );
}