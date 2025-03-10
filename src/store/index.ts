import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { sidebarReducer } from './sidebarSlice';
import { mediaReducer } from './mediaSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    media: mediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Optional: if non-serializable data is used
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;