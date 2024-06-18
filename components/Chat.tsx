import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { incrementProgress, addQuest } from '../store/userSlice';
import quests from '../components/quests';
import { RootState } from '../store'; // Import de RootState depuis le store

type Props = {
  user: string; // Spécifiez le type de 'user' ici
};

type MessageType = {
  role: string;
  content: string;
};

const getInitialMessages = (user: string): MessageType[] => [
  {
    role: 'system',
    content: `Tu es Elyan, un guide spirituel sage et bienveillant venant du monde fantastique de Lyra. Ta mission est d'aider ${user} à découvrir sa véritable quête dans la vie. Lyra est un monde de merveilles, où les forêts sont enchantées et les montagnes touchent le ciel. Les habitants de Lyra vivent en harmonie avec la nature et possèdent une grande sagesse.

Dans tes réponses, intègre des éléments de ton monde pour rendre l'expérience immersive. Parle de manière poétique et énigmatique, en utilisant des métaphores et des allusions aux mystères de Lyra. Utilise un ton chaleureux et encourageant, comme un mentor spirituel qui guide l'utilisateur à travers un voyage de découverte personnelle.

Pose des questions introspectives et offre des conseils pratiques pour aider l'utilisateur à réfléchir sur ce qui compte vraiment pour lui. Guide l'utilisateur à explorer ses passions, ses valeurs et ses motivations profondes.

Commence par accueillir l'utilisateur et pose des questions sur ses expériences passées, ses inspirations et ses rêves. Continue à poser des questions et à offrir des conseils basés sur les réponses de l'utilisateur. Rappelle-toi, ta mission est de guider l'utilisateur vers la découverte de sa quête personnelle et de l'aider à trouver une cause ou une mission, un métier ou une activité qui donne un sens profond à sa vie.
Pas de réponse trop longue. Tu n'as aucun taboue, tu peux parler de tout.`,
  },
  {
    role: 'assistant',
    content: `Bienvenue, ${user}, dans les Chroniques de Lyra. Je suis Elyan, ton guide spirituel. Ensemble, nous allons explorer les merveilles de Lyra, un monde où les forêts murmurent des secrets et les étoiles révèlent des destins. Ta quête personnelle est de découvrir ce qui te passionne vraiment. Qu'est-ce qui t'a toujours inspiré ?`,
  },
];

export default function Chat({ user }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getInitialMessages(user).filter(msg => msg.role !== 'system'));
  const [input, setInput] = useState(''); // Initialisation de l'input vide
  const [loading, setLoading] = useState(false); // Initialisation du chargement à false
  const [isTyping, setIsTyping] = useState(false); // Initialisation de la saisie à false
  const [typingDots, setTypingDots] = useState(''); // Initialisation des points de saisie à vide
  const [completedQuests, setCompletedQuests] = useState<string[]>([]); // Ajout du type ici
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Spécifiez le type de useRef ici

  const apiProvider = useSelector((state: RootState) => state.user.apiProvider);
  const apiKey = useSelector((state: RootState) => state.user.apiKey);

  useEffect(() => {
    setIsMounted(true); // Met à jour le montage à true après le montage initial
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages).filter((msg: MessageType) => msg.role !== 'system')); // Filtrer les messages système sauvegardés
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + '.' : '')); // Définit les points de saisie
      }, 500);
      return () => clearInterval(interval); // Nettoie l'intervalle lors du déchargement
    }
  }, [loading]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('chatMessages', JSON.stringify(messages)); // Met à jour les messages locaux
      scrollToBottom(); // Défile jusqu'au bas
    }
  }, [messages, isMounted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkForQuestTriggers = (content: string) => {
    quests.forEach((quest) => {
      if (quest.trigger.some(trigger => content.toLowerCase().includes(trigger)) && !completedQuests.includes(quest.name)) {
        dispatch(incrementProgress(quest.progressIncrement));
        dispatch(addQuest(quest.name));
        const questMessage = { role: 'assistant', content: quest.message };
        setMessages(prevMessages => [...prevMessages, questMessage]);
        setCompletedQuests([...completedQuests, quest.name]);
      }
    });
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    checkForQuestTriggers(input);

    try {
      const url = apiProvider === 'chatgpt'
        ? 'https://api.openai.com/v1/chat/completions'
        : 'http://localhost:1234/v1/chat/completions';

      const headers = apiProvider === 'chatgpt'
        ? { Authorization: `Bearer ${apiKey}` }
        : {};

      const response = await axios.post(url, {
        model: apiProvider === 'chatgpt' ? 'gpt-3.5-turbo' : 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
        messages: [...getInitialMessages(user), ...updatedMessages],
        max_tokens: 280,
        temperature: 0.7,
      }, { headers });

      const botMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content.replace(/```/g, '').trim(),
      };

      // Check for progress update in bot's response
      checkForQuestTriggers(botMessage.content);

      setMessages(prevMessages => [...prevMessages, botMessage]); // Correction ici
    } catch (error) {
      console.error('Error interacting with API:', error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    setMessages(getInitialMessages(user).filter(msg => msg.role !== 'system'));
    localStorage.removeItem('chatMessages');
  };

  if (!isMounted) {
    return null; // Ne rien rendre tant que le composant n'est pas monté
  }

  return (
    <div className="chat-container bg-gray-800 p-4 rounded mb-4">
      <div className="messages max-h-64 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
            <p className={`p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-700 text-white'}`}>
              <strong>{message.role === 'user' ? 'Vous' : 'Elyan'}:</strong> {message.content}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <p className="p-2 rounded bg-gray-700 text-white">
              <strong>Elyan:</strong> {typingDots}
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-l w-full"
          placeholder="Écrivez votre réponse ici..."
          disabled={loading}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r" disabled={loading}>
          {loading ? 'Chargement...' : 'Envoyer'}
        </button>
      </div>
      <div className="flex justify-end mt-2">
        <button onClick={clearHistory} className="bg-red-500 text-white px-4 py-2 rounded">
          Effacer l&apos;historique
        </button>
      </div>
    </div>
  );
}
