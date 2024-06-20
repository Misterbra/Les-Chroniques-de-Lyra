"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setName, setApiProvider } from '../store/userSlice';

export default function Home() {
  const [name, setNameState] = useState('');
  const [apiProvider, setApiProviderState] = useState('llama3');
  const [apiKey, setApiKey] = useState('');
  const [playing, setPlaying] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setName(name));
    dispatch(setApiProvider({ provider: apiProvider, key: apiKey }));
    router.push('/quest');
  };

  const togglePlayPause = () => {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    if (playing) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">Bienvenue dans les Chroniques de Lyra</h1>
      
      <div className="mb-8 text-center relative">
        <video id="video" width="100%" height="auto">
          <source src="/Clip_Lyra.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <label className="switch absolute bottom-4 right-4">
          <input type="checkbox" className="input__check" onChange={togglePlayPause} checked={playing} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="mb-8 text-lg leading-relaxed text-center italic">
        <p className="mb-4">
          Les Chroniques de Lyra est un projet qui mélange aventure fantastique et introspection personnelle. 
          Notre objectif est de vous aider à découvrir votre véritable quête dans la vie, une mission qui vous dépasse 
          et vous motive chaque jour à vous lever avec passion et détermination.
        </p>
        <p className="mb-4">
          À travers des interactions immersives avec le monde magique de Lyra et ses habitants, vous serez guidé 
          par Elyan, un sage spirituel, pour explorer vos valeurs, vos passions et vos motivations profondes. 
          Ensemble, vous découvrirez comment vous pouvez contribuer à une cause plus grande que vous-même et trouver 
          un sens profond à votre existence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Entrez votre nom :</label>
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
          <label className="block text-lg">Choisissez votre fournisseur d&apos;API :</label>
          <select
            value={apiProvider}
            onChange={(e) => setApiProviderState(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-full"
          >
            <option value="llama3">Llama3 en local avec LM Studio | Port : 1234</option>
            <option value="chatgpt">ChatGPT (API)</option>
          </select>
        </div>
        {apiProvider === 'chatgpt' && (
          <div>
            <label htmlFor="apiKey" className="block text-lg">Entrez votre clé API ChatGPT :</label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded w-full"
              required
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Commencer l&apos;aventure
        </button>
      </form>

      <div className="mt-4 text-center">
  <button onClick={() => setShowTutorial(!showTutorial)} className="bg-gray-700 text-white px-4 py-2 rounded">
    {showTutorial ? "Cacher le tutoriel" : "Afficher le tutoriel"}
  </button>
</div>

{showTutorial && (
  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Comment configurer Llama3 avec LM Studio</h2>
    <ol className="list-decimal list-inside text-lg leading-relaxed">
      <li className="mb-2">
        <strong>Téléchargez LM Studio :</strong> Allez sur le <a href="https://lmstudio.ai/" target="_blank" className="text-blue-400 underline">site web de LM Studio</a> et téléchargez la dernière version du logiciel. LM Studio vous permet d&apos;exécuter des modèles d&apos;IA sur votre ordinateur local gratuitement.
      </li>
      <li className="mb-2">
        <strong>Installez LM Studio :</strong> Suivez les instructions d&apos;installation fournies sur le site web pour configurer LM Studio sur votre ordinateur.
      </li>
      <li className="mb-2">
        <strong>Lancez LM Studio :</strong> Ouvrez LM Studio et accédez à la section de configuration du serveur.
      </li>
      <li className="mb-2">
        <strong>Configurez Llama3 :</strong> Sélectionnez Llama3 comme modèle que vous souhaitez utiliser. Assurez-vous de configurer le port sur 1234. Cela vous permet d&apos;exécuter le modèle d&apos;IA localement sur votre ordinateur sans aucun coût.
      </li>
      <li className="mb-2">
        <strong>Démarrez le serveur :</strong> Cliquez sur le bouton &apos;Démarrer le serveur&apos; pour lancer le serveur Llama3. Vous devriez voir un message de confirmation indiquant que le serveur est en cours d&apos;exécution.
      </li>
      <li className="mb-2">
        <strong>Connectez votre application : </strong> Dans la configuration de l&apos;application, sélectionnez &apos;Llama3 localement avec LM Studio&apos; et assurez-vous que le port est réglé sur 1234.
      </li>
    </ol>
    <h2 className="text-2xl font-bold mb-4 mt-8">Utilisation de l&apos;API ChatGPT</h2>
    <ol className="list-decimal list-inside text-lg leading-relaxed">
      <li className="mb-2">
        <strong>Inscrivez-vous à OpenAI :</strong> Allez sur le <a href="https://beta.openai.com/signup/" target="_blank" className="text-blue-400 underline">site web d&apos;OpenAI</a> et inscrivez-vous pour obtenir une clé API gratuite.
      </li>
      <li className="mb-2">
        <strong>Obtenez votre clé API :</strong> Une fois inscrit, vous recevrez une clé API que vous pouvez utiliser pour accéder à l&apos;API ChatGPT.
      </li>
      <li className="mb-2">
        <strong>Entrez la clé API :</strong> Dans le formulaire ci-dessus, sélectionnez &apos;ChatGPT (API)&apos; et entrez votre clé API. Cela vous permet d&apos;utiliser le modèle ChatGPT sans avoir besoin d&apos;un ordinateur puissant, car tous les calculs sont effectués sur les serveurs d&apos;OpenAI.
      </li>
    </ol>
    <p className="mt-4">
      Les deux options sont gratuites. Exécuter Llama3 localement avec LM Studio est idéal si vous avez un ordinateur puissant et que vous préférez tout garder sur votre machine. Utiliser l&apos;API ChatGPT est parfait si vous voulez économiser des ressources et laisser OpenAI gérer les calculs.
    </p>
  </div>
)}

    </div>
  );
}
