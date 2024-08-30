"use client";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { Activity } from '../../store/userSlice';  // Update the import path if necessary
import { FaUser, FaMap, FaStar, FaLightbulb, FaBriefcase, FaCode, FaTasks, FaCity } from 'react-icons/fa';
import LevelDisplay from '../../components/LevelDisplay';

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        variants={itemVariants}
      >
        Aventures de {name} à Lyra
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-400" /> Niveau d'Exploration
          </h2>
          <LevelDisplay level={user.level} experience={user.experience} />
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCity className="mr-2 text-pink-400" /> Ta Ville d'Exploration
          </h2>
          <p>{user.city || "Tu n'as pas encore choisi de ville d'exploration"}</p>
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaMap className="mr-2 text-green-400" /> Lieux Découverts
          </h2>
          
          {user.discoveredLocations && user.discoveredLocations.length > 0 ? (
            <ul className="list-disc list-inside">
              {user.discoveredLocations.map((location, index) => (
                <li key={index} className="mb-2">{location.name}</li>
              ))}
            </ul>
          ) : (
            <p>Tu n'as pas encore découvert de lieux spécifiques. Continue ton exploration !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaStar className="mr-2 text-yellow-400" /> Tes Super-Pouvoirs
          </h2>
          {user.traits && user.traits.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.traits.map((trait, index) => (
                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{trait}</span>
              ))}
            </div>
          ) : (
            <p>Découvre tes talents uniques en explorant Lyra !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaLightbulb className="mr-2 text-orange-400" /> Découvertes Clés
          </h2>
          {user.insights && user.insights.length > 0 ? (
            <ul className="space-y-2">
              {user.insights.map((insight, index) => (
                <li key={index} className="italic">&quot;{insight}&quot;</li>
              ))}
            </ul>
          ) : (
            <p>Tes conversations avec Elyan te mèneront à des révélations passionnantes !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-purple-400" /> Domaines de Carrière
          </h2>
          {user.careerDomains && user.careerDomains.length > 0 ? (
            <ul className="list-disc list-inside">
              {user.careerDomains.map((domain, index) => (
                <li key={index} className="mb-2">{domain}</li>
              ))}
            </ul>
          ) : (
            <p>Continue ton voyage pour découvrir des domaines de carrière passionnants !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCode className="mr-2 text-red-400" /> Compétences Acquises
          </h2>
          {user.skills && Object.keys(user.skills).length > 0 ? (
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(user.skills).map(([skill, level], index) => (
                <li key={index} className="flex items-center">
                  <span className="font-semibold mr-2">{skill}:</span>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{width: `${(level / 10) * 100}%`}}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Développe tes compétences en relevant des défis !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaTasks className="mr-2 text-indigo-400" /> Activités en Cours
          </h2>
          {user.activities && user.activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.activities.map((activity: Activity, index) => (
                <motion.div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    activity.isCompleted 
                      ? 'bg-green-600' 
                      : activity.isUnlocked 
                      ? 'bg-blue-600' 
                      : 'bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="font-bold mb-2">{activity.name}</h3>
                  <p className="text-sm mb-2">{activity.description}</p>
                  <p className="text-xs">
                    {activity.isCompleted 
                      ? 'Complétée' 
                      : activity.isUnlocked 
                      ? 'En cours' 
                      : `Débloquée au niveau ${activity.requiredLevel}`
                    }
                  </p>
                  {!activity.isCompleted && (
                    <p className="text-xs mt-1">Récompense : {activity.experienceReward} XP</p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <p>Explore Lyra pour débloquer des activités passionnantes !</p>
          )}
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2 mt-8" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Prochaines Étapes</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Explore une nouvelle zone de Lyra qui t'intrigue</li>
            <li>Discute avec Elyan de tes découvertes et de tes ambitions</li>
            <li>Utilise tes super-pouvoirs pour relever de nouveaux défis</li>
            <li>Approfondis tes connaissances sur les domaines de carrière qui t'attirent</li>
            <li>Complète les activités en cours pour gagner de l'expérience</li>
          </ul>
        </motion.div>

        <motion.div className="md:col-span-2 text-center mt-8" variants={itemVariants}>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {/* Rediriger vers la page de conversation */}}
          >
            Commencer une Nouvelle Conversation
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}