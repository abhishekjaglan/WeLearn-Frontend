// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState } from '../types';

const initialState: AuthState = {
  userId: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userId: string; token: string }>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('userId');
      Cookies.remove('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;