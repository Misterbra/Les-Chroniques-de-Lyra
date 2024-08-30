import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { unlockActivity, completeActivity, addExperience } from '../store/userSlice';
import { RootState } from '../store';

// Import the Activity type directly from userSlice
import { Activity } from '../store/userSlice';

interface ActivityListProps {
  currentArea: string;
  onActivityComplete: (activity: Activity) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ currentArea, onActivityComplete }) => {
  const activities = useSelector((state: RootState) => state.user.activities);
  const userLevel = useSelector((state: RootState) => state.user.level);
  const dispatch = useDispatch();

  // Add a null check before filtering
  const filteredActivities = activities?.filter((activity: Activity) => activity.area === currentArea) || [];

  const handleActivityClick = (activity: Activity) => {
    if (!activity.isUnlocked && userLevel >= activity.requiredLevel) {
      dispatch(unlockActivity(activity.id));
    } else if (activity.isUnlocked && !activity.isCompleted) {
      dispatch(completeActivity(activity.id));
      dispatch(addExperience(activity.experienceReward));
      onActivityComplete(activity);
    }
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Activités disponibles</h2>
      <AnimatePresence>
        {filteredActivities.map((activity: Activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 mb-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activity.isCompleted
                ? 'bg-green-600'
                : activity.isUnlocked
                ? 'bg-blue-600 hover:bg-blue-700'
                : userLevel >= activity.requiredLevel
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            onClick={() => handleActivityClick(activity)}
          >
            <h3 className="font-bold mb-2">{activity.name}</h3>
            <p className="text-sm">{activity.description}</p>
            <p className="mt-2 text-xs">
              {activity.isCompleted
                ? 'Complétée'
                : activity.isUnlocked
                ? 'En cours'
                : userLevel >= activity.requiredLevel
                ? 'Disponible'
                : `Débloquée au niveau ${activity.requiredLevel}`}
            </p>
            {!activity.isCompleted && (
              <p className="mt-1 text-xs">Récompense : {activity.experienceReward} XP</p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ActivityList;