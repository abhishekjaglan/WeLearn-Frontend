// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;