import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JournalEntry {
  date: string;
  content: string;
}

interface UserState {
  name: string;
  level: number;
  experience: number;
  quests: string[];
  traits: string[];
  insights: string[];
  potentialCareers: string[];
  exploredDomains: string[];
  skills: { [key: string]: number };
  journalEntries: JournalEntry[];
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return {
        name: '',
        level: 1,
        experience: 0,
        quests: [],
        traits: [],
        insights: [],
        potentialCareers: [],
        exploredDomains: [],
        skills: {},
        journalEntries: [],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      name: '',
      level: 1,
      experience: 0,
      quests: [],
      traits: [],
      insights: [],
      potentialCareers: [],
      exploredDomains: [],
      skills: {},
      journalEntries: [],
    };
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (err) {
    // Ignore write errors
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
    addExperience: (state, action: PayloadAction<number>) => {
      state.experience += action.payload;
      if (state.experience >= state.level * 100) {
        state.level += 1;
        state.experience -= (state.level - 1) * 100;
      }
      saveState(state);
    },
    addQuest: (state, action: PayloadAction<string>) => {
      if (!state.quests.includes(action.payload)) {
        state.quests.push(action.payload);
        saveState(state);
      }
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
    addPotentialCareer: (state, action: PayloadAction<string>) => {
      if (!state.potentialCareers.includes(action.payload)) {
        state.potentialCareers.push(action.payload);
        saveState(state);
      }
    },
    addExploredDomain: (state, action: PayloadAction<string>) => {
      if (!state.exploredDomains.includes(action.payload)) {
        state.exploredDomains.push(action.payload);
        saveState(state);
      }
    },
    updateSkill: (state, action: PayloadAction<{ skill: string; level: number }>) => {
      state.skills[action.payload.skill] = action.payload.level;
      saveState(state);
    },
    addJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
      state.journalEntries.push(action.payload);
      saveState(state);
    },
    resetProgress: (state) => {
      state.level = 1;
      state.experience = 0;
      state.quests = [];
      state.traits = [];
      state.insights = [];
      state.potentialCareers = [];
      state.exploredDomains = [];
      state.skills = {};
      state.journalEntries = [];
      saveState(state);
    },
  },
});

export const {
  setName,
  addExperience,
  addQuest,
  addTrait,
  addInsight,
  addPotentialCareer,
  addExploredDomain,
  updateSkill,
  addJournalEntry,
  resetProgress
} = userSlice.actions;

export default userSlice.reducer;