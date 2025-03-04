import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { userId: null as string | null, isAuthenticated: false },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;