import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Location {
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  emoji: string;
  relatedInterests: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  area: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  experienceReward: number;
  requiredLevel: number;
}

export interface UserState {
  name: string;
  city: string;
  level: number;
  experience: number;
  traits: string[];
  insights: string[];
  careerDomains: string[];
  skills: { [key: string]: number };
  journalEntries: JournalEntry[];
  discoveredLocations: Location[];
  activities: Activity[];
}

interface JournalEntry {
  date: string;
  content: string;
}

const getInitialState = (): UserState => ({
  name: '',
  city: '',
  level: 1,
  experience: 0,
  traits: [],
  insights: [],
  careerDomains: [],
  skills: {},
  journalEntries: [],
  discoveredLocations: [],
  activities: [],
});

const calculateLevelFromExperience = (experience: number): number => {
  return Math.floor(Math.sqrt(experience / 100)) + 1;
};

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      console.log('No state found in localStorage, returning initial state');
      return getInitialState();
    }
    const parsedState = JSON.parse(serializedState);
    console.log('Loaded state from localStorage:', parsedState);

    // Convert old state structure to new structure
    const updatedState: UserState = {
      name: parsedState.name || '',
      city: parsedState.city || '',
      level: parsedState.level || 1,
      experience: parsedState.experience || 0,
      traits: parsedState.traits || [],
      insights: parsedState.insights || [],
      careerDomains: parsedState.careerDomains || [],
      skills: parsedState.skills || {},
      journalEntries: parsedState.journalEntries || [],
      discoveredLocations: parsedState.discoveredLocations || [],
      activities: parsedState.activities || [],
    };

    // Recalculate level based on experience if necessary
    if (!updatedState.level || updatedState.level === 1) {
      updatedState.level = calculateLevelFromExperience(updatedState.experience);
    }

    console.log('Updated state:', updatedState);
    return updatedState;
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return getInitialState();
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
    console.log('State saved to localStorage:', state);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState: UserState = loadState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      saveState(state);
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      saveState(state);
    },
    addExperience: (state, action: PayloadAction<number>) => {
      state.experience += action.payload;
      state.level = calculateLevelFromExperience(state.experience);
      saveState(state);
    },
    addTrait: (state, action: PayloadAction<string>) => {
      if (!state.traits.includes(action.payload)) {
        state.traits.push(action.payload);
        saveState(state);
      }
    },
    addInsight: (state, action: PayloadAction<string>) => {
      if (!state.insights.includes(action.payload)) {
        state.insights.push(action.payload);
        saveState(state);
      }
    },
    addCareerDomain: (state, action: PayloadAction<string>) => {
      if (!state.careerDomains.includes(action.payload)) {
        state.careerDomains.push(action.payload);
        saveState(state);
      }
    },
    addSkill: (state, action: PayloadAction<{ skill: string; points: number }>) => {
      const { skill, points } = action.payload;
      if (state.skills[skill]) {
        state.skills[skill] += points;
      } else {
        state.skills[skill] = points;
      }
      saveState(state);
    },
    addJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.journalEntries.push(action.payload);
      saveState(state);
    },
    addDiscoveredLocation: (state, action: PayloadAction<Location>) => {
      if (!state.discoveredLocations.some(loc => loc.name === action.payload.name)) {
        state.discoveredLocations.push(action.payload);
        saveState(state);
      }
    },
    updateDiscoveredLocation: (state, action: PayloadAction<{ name: string; updates: Partial<Location> }>) => {
      const index = state.discoveredLocations.findIndex(loc => loc.name === action.payload.name);
      if (index !== -1) {
        state.discoveredLocations[index] = { ...state.discoveredLocations[index], ...action.payload.updates };
        saveState(state);
      }
    },
    removeDiscoveredLocation: (state, action: PayloadAction<string>) => {
      state.discoveredLocations = state.discoveredLocations.filter(loc => loc.name !== action.payload);
      saveState(state);
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      if (!state.activities.some(activity => activity.id === action.payload.id)) {
        state.activities.push(action.payload);
        saveState(state);
      }
    },
    unlockActivity: (state, action: PayloadAction<string>) => {
      const activity = state.activities.find(a => a.id === action.payload);
      if (activity) {
        activity.isUnlocked = true;
        saveState(state);
      }
    },
    completeActivity: (state, action: PayloadAction<string>) => {
      const activity = state.activities.find(a => a.id === action.payload);
      if (activity && !activity.isCompleted) {
        activity.isCompleted = true;
        state.experience += activity.experienceReward;
        state.level = calculateLevelFromExperience(state.experience);
        saveState(state);
      }
    },
    resetProgress: (state) => {
      Object.assign(state, getInitialState());
      saveState(state);
    },
  },
});

export const {
  setName,
  setCity,
  addExperience,
  addTrait,
  addInsight,
  addCareerDomain,
  addSkill,
  addJournalEntry,
  addDiscoveredLocation,
  updateDiscoveredLocation,
  removeDiscoveredLocation,
  addActivity,
  unlockActivity,
  completeActivity,
  resetProgress
} = userSlice.actions;

// Sélecteurs
export const selectName = (state: RootState) => state.user.name;
export const selectCity = (state: RootState) => state.user.city;
export const selectLevel = (state: RootState) => state.user.level;
export const selectExperience = (state: RootState) => state.user.experience;
export const selectTraits = (state: RootState) => state.user.traits;
export const selectInsights = (state: RootState) => state.user.insights;
export const selectCareerDomains = (state: RootState) => state.user.careerDomains;
export const selectSkills = (state: RootState) => state.user.skills;
export const selectJournalEntries = (state: RootState) => state.user.journalEntries;
export const selectDiscoveredLocations = (state: RootState) => state.user.discoveredLocations;
export const selectActivities = (state: RootState) => state.user.activities;

// Sélecteurs dérivés
export const selectUnlockedActivities = (state: RootState) => 
  state.user.activities.filter(activity => activity.isUnlocked);

export const selectCompletedActivities = (state: RootState) => 
  state.user.activities.filter(activity => activity.isCompleted);

export const selectAvailableActivities = (state: RootState) => 
  state.user.activities.filter(activity => !activity.isCompleted && activity.requiredLevel <= state.user.level);

export const selectTotalSkillPoints = (state: RootState) => 
  Object.values(state.user.skills).reduce((sum, points) => sum + points, 0);

export default userSlice.reducer;

// Fonction pour obtenir l'état actuel (utile pour le débogage)
export const getCurrentState = (): UserState => {
  const serializedState = localStorage.getItem('user');
  if (serializedState === null) {
    console.log('No state found in localStorage');
    return getInitialState();
  }
  const currentState = JSON.parse(serializedState);
  console.log('Current state:', currentState);
  return currentState;
};