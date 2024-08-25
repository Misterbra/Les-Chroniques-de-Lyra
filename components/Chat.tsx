import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addExperience, addQuest, addTrait, addInsight, addPotentialCareer, addExploredDomain, updateSkill } from '../store/userSlice';
import quests from '../components/quests';
import { RootState } from '../store';

type Props = {
  user: string;
  currentArea: string;
};

type MessageType = {
  role: string;
  content: string;
};

const getInitialMessages = (user: string, currentArea: string): MessageType[] => [
  {
    role: 'system',
    content: `Tu es Elyan, un guide bienveillant et inspirant du monde fantastique de Lyra. Ta mission est d'aider ${user}, un jeune étudiant, à découvrir ses passions et à explorer différentes voies professionnelles. Lyra est un monde de merveilles où chaque lieu représente un domaine d'étude ou une carrière potentielle. Actuellement, vous êtes dans ${currentArea}.

Dans tes réponses, intègre des éléments de Lyra et spécifiquement de ${currentArea} pour rendre l'expérience immersive. Utilise un ton encourageant et enthousiaste, comme un mentor qui guide l'utilisateur dans un voyage de découverte personnelle et professionnelle.

Pose des questions réflexives et offre des conseils pratiques pour aider l'utilisateur à explorer ses intérêts, ses compétences et ses valeurs en lien avec ${currentArea}. Guide l'utilisateur à travers différents aspects de ce domaine et les carrières potentielles associées.

Garde tes réponses concises et adaptées à un jeune public. Tu peux aborder tous les sujets de manière appropriée pour les jeunes.`,
  },
  {
    role: 'assistant',
    content: `Salut ${user} ! Bienvenue dans ${currentArea}. C'est un endroit fascinant de Lyra qui nous en apprendra beaucoup sur toi et tes possibilités de carrière. Que voudrais-tu explorer ici ?`,
  },
];

export default function Chat({ user, currentArea }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getInitialMessages(user, currentArea).filter(msg => msg.role !== 'system'));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const completedQuests = useSelector((state: RootState) => state.user.quests);
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages).filter((msg: MessageType) => msg.role !== 'system'));
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, isMounted]);

  useEffect(() => {
    // Add a new message when the area changes
    const areaChangeMessage = {
      role: 'assistant',
      content: `Nous voici dans ${currentArea}. Cet endroit est parfait pour explorer ${getAreaFocus(currentArea)}. Que voudrais-tu savoir à ce sujet ?`
    };
    setMessages(prevMessages => [...prevMessages, areaChangeMessage]);
  }, [currentArea]);

  const getAreaFocus = (area: string): string => {
    switch(area) {
      case 'Vallée des Miroirs':
        return "tes traits de personnalité et tes compétences";
      case 'Forêt des Âmes Perdues':
        return "différents parcours professionnels";
      case 'Citadelle du Savoir':
        return "divers domaines d'études";
      case 'Temple des Étoiles':
        return "tes objectifs de vie et ton futur professionnel idéal";
      default:
        return "de nouvelles opportunités";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkForQuestTriggers = (content: string) => {
    quests.forEach((quest) => {
      if (quest.trigger.some(trigger => content.toLowerCase().includes(trigger)) && !completedQuests.includes(quest.name)) {
        dispatch(addExperience(quest.experienceGain));
        dispatch(addQuest(quest.name));
        quest.potentialCareers.forEach(career => dispatch(addPotentialCareer(career)));
        dispatch(addExploredDomain(quest.name));
        quest.skills.forEach(skill => dispatch(updateSkill({ skill, level: 1 })));
        const questMessage = { role: 'assistant', content: quest.message };
        setMessages(prevMessages => [...prevMessages, questMessage]);
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
      const response = await axios.post('/api/groq', {
        model: 'mixtral-8x7b-32768',
        messages: [...getInitialMessages(user, currentArea), ...updatedMessages],
        max_tokens: 280,
        temperature: 0.7
      });

      const botMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content.replace(/```/g, '').trim(),
      };

      checkForQuestTriggers(botMessage.content);

      const traits = extractTraits(botMessage.content);
      const insights = extractInsights(botMessage.content);

      traits.forEach(trait => dispatch(addTrait(trait)));
      insights.forEach(insight => dispatch(addInsight(insight)));

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error interacting with API:', error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    setMessages(getInitialMessages(user, currentArea).filter(msg => msg.role !== 'system'));
    localStorage.removeItem('chatMessages');
  };

  const extractTraits = (content: string): string[] => {
    const traits = ["Curieux", "Créatif", "Analytique", "Communicatif", "Organisé", "Leader", "Empathique", "Persévérant"];
    return traits.filter(trait => content.toLowerCase().includes(trait.toLowerCase()));
  };

  const extractInsights = (content: string): string[] => {
    const insights = [
      "J'aime résoudre des problèmes complexes.",
      "La créativité est importante pour moi.",
      "Je m'intéresse aux nouvelles technologies.",
      "Aider les autres me motive.",
      "J'apprécie le travail en équipe.",
      "J'aime apprendre de nouvelles choses.",
      "Je suis à l'aise pour parler en public.",
      "Je suis capable de bien gérer mon temps."
    ];
    return insights.filter(insight => content.toLowerCase().includes(insight.toLowerCase()));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="chat-container bg-gray-800 p-4 rounded mb-4">
      <div className="messages max-h-64 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
            <p className={`p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-700 text-white'}`}>
              <strong>{message.role === 'user' ? 'Toi' : 'Elyan'}:</strong> {message.content}
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
          placeholder="Écris ta réponse ici..."
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