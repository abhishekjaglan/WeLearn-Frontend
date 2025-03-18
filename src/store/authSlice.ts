import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState } from '../types';

const initialState: AuthState = {
  userId: null,
  token: null,
  isAuthenticated: false,
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userId: string; token: string; name: string; email: string }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      Cookies.remove('userId');
      Cookies.remove('token');
    },
    updateProfile: (state, action: PayloadAction<{ name: string; email: string }>) => {
      if (state.isAuthenticated) {
        state.name = action.payload.name;
        state.email = action.payload.email;
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;