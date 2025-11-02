import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') != null,

  setAuth: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  setUserInfo: (userInfo) => {
    set({ user: userInfo});
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));