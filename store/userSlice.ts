import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  progress: number;
  quests: string[];
  apiProvider: string;
  apiKey: string;
  completedQuests: string[];
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return {
        name: '',
        progress: 0,
        quests: [],
        apiProvider: 'llama3', // Default to Llama3
        apiKey: '', // Store API key if using ChatGPT
        completedQuests: [], // Track completed quests
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      name: '',
      progress: 0,
      quests: [],
      apiProvider: 'llama3', // Default to Llama3
      apiKey: '', // Store API key if using ChatGPT
      completedQuests: [], // Track completed quests
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
    incrementProgress: (state, action: PayloadAction<number>) => {
      state.progress += action.payload;
      saveState(state);
    },
    addQuest: (state, action: PayloadAction<string>) => {
      if (!state.completedQuests.includes(action.payload)) {
        state.quests.push(action.payload);
        state.completedQuests.push(action.payload);
        saveState(state);
      }
    },
    setApiProvider: (state, action: PayloadAction<{ provider: string; key: string }>) => {
      state.apiProvider = action.payload.provider;
      state.apiKey = action.payload.key;
      saveState(state);
    },
    resetProgress: (state) => {
      state.progress = 0;
      state.quests = [];
      state.completedQuests = [];
      saveState(state);
    },
  },
});

export const { setName, incrementProgress, addQuest, setApiProvider, resetProgress } = userSlice.actions;
export default userSlice.reducer;
