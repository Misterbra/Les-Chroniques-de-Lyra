import React from 'react';

interface LevelDisplayProps {
  level: number;
  experience: number;
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({ level, experience }) => {
  // Calculate the experience needed for the next level
  const nextLevelExperience = Math.pow((level + 1 - 1), 2) * 100;
  const currentLevelExperience = Math.pow((level - 1), 2) * 100;
  const experienceForCurrentLevel = experience - currentLevelExperience;
  const experienceNeededForNextLevel = nextLevelExperience - currentLevelExperience;
  const progressPercentage = (experienceForCurrentLevel / experienceNeededForNextLevel) * 100;

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-2">Niveau {level}</div>
      <div className="mb-2">{experience} XP / {nextLevelExperience} XP</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LevelDisplay;