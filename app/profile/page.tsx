"use client";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store'; // Importez RootState depuis votre store

export default function Profile() {
  const userName = useSelector((state: RootState) => state.user.name);
  const progress = useSelector((state: RootState) => state.user.progress);
  const quests = useSelector((state: RootState) => state.user.quests);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(userName);
  }, [userName]);

  return (
    <div className="container text-white">
      <h1 className="text-4xl font-bold mb-4">Profil de {name}</h1>
      <p className="mb-4">Points accumulés dans votre quête : {progress}</p>
      <p className="mb-4">Quêtes découvertes :</p>
      <ul>
        {quests.length > 0 ? (
          quests.map((quest: string, index: number) => (
            <li key={index} className="mb-2">
              {quest}
            </li>
          ))
        ) : (
          <p>Aucune pour le moment.</p>
        )}
      </ul>
    </div>
  );
}
