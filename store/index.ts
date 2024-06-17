import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

// Définir RootState pour l'utiliser dans useSelector
export type RootState = ReturnType<typeof store.getState>;

export default store;
