// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
// Placeholder for auth reducer (to be implemented later)
const authReducer = (state = {}) => state;

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;