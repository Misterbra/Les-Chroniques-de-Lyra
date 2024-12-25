"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { RootState } from '@/store';
import { addExperience, addInsight, addTrait, addCareerDomain } from '@/store/userSlice';
import axios from 'axios';
import LevelDisplay from '@/components/LevelDisplay';

export default function Conversation() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [exchangeCount, setExchangeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showMapButton, setShowMapButton] = useState(false);
  const name = useAppSelector((state: RootState) => state.user.name);
  const city = useAppSelector((state: RootState) => state.user.city);
  const experience = useAppSelector((state: RootState) => state.user.experience);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Initialise la conversation
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: `Bonjour ${name} ! Je suis Elyan, ton guide dans cette aventure. Je vois que tu habites à ${city}. J'aimerais mieux te connaître pour pouvoir te guider vers des lieux et des opportunités qui correspondent à tes intérêts. Parle-moi un peu de toi : quelles sont tes passions, tes hobbies ?` }
    ]);
  }, [name, city]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Vérifie si on peut montrer le bouton de la carte
  useEffect(() => {
    if (exchangeCount >= 15) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        setShowMapButton(true);
      }
    }
  }, [exchangeCount, messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setExchangeCount(prev => prev + 1);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/conversation', {
        messages: [...messages, userMessage],
        city: city,
        exchangeCount: exchangeCount + 1
      });

      const assistantMessage = { role: 'assistant', content: response.data.message };
      setMessages(prev => [...prev, assistantMessage]);

      // Gestion des points d'expérience et autres données
      if (response.data.experienceGained) {
        dispatch(addExperience(response.data.experienceGained));
      }
      if (response.data.insights) {
        response.data.insights.forEach((insight: string) => dispatch(addInsight(insight)));
      }
      if (response.data.traits) {
        response.data.traits.forEach((trait: string) => dispatch(addTrait(trait)));
      }
      if (response.data.careerDomains) {
        response.data.careerDomains.forEach((domain: string) => dispatch(addCareerDomain(domain)));
      }

      // Vérifie si c'est le moment de suggérer la carte
      if (exchangeCount + 1 >= 15 && !showMapButton) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Je pense que nous avons eu une conversation très enrichissante ! Je peux maintenant te proposer des lieux intéressants à visiter dans ta ville qui correspondent à tes intérêts. Veux-tu découvrir la carte interactive que j'ai préparée pour toi ?"
        }]);
        setShowMapButton(true);
      }

    } catch (error) {
      console.error('Erreur lors de la communication avec l\'API :', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Désolé, j'ai rencontré une erreur. Peux-tu réessayer ?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishConversation = async () => {
    try {
      const response = await axios.post('/api/analyzeConversation', {
        messages,
        city,
        experience
      });
      
      // Ajoute un message de conclusion
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Super ! J'ai préparé une carte personnalisée avec des lieux qui correspondent à tes intérêts dans ta ville. Tu vas pouvoir découvrir des endroits passionnants qui t'aideront dans ton parcours !"
      }]);

      // Redirige vers la carte avec les données
      router.push(`/map?data=${encodeURIComponent(JSON.stringify(response.data))}`);
    } catch (error) {
      console.error('Erreur lors de l\'analyse de la conversation :', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <LevelDisplay level={Math.floor(Math.sqrt(experience / 100)) + 1} experience={experience} />
      
      <div className="mb-4 mt-4">
        <h2 className="text-2xl font-bold mb-2">Conversation avec Elyan</h2>
        <div className="h-96 overflow-y-auto border p-4 rounded">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                {msg.content}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow mr-2 p-2 border rounded bg-gray-700 text-white"
          placeholder="Tape ta réponse ici..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage} 
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>

      {showMapButton && (
        <button 
          onClick={handleFinishConversation}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Découvrir la carte interactive
        </button>
      )}
    </div>
  );
}