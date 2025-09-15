import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  _id: string;
  username: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true, 
        isAdmin: user.role === 'admin' 
      }),
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isAdmin: false 
      }),
    }),
    {
      name: 'auth-storage', // unique name for the item in localStorage
      storage: createJSONStorage(() => localStorage), // tells Zustand to use localStorage
    }
  )
);