import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  _id: string;
  username: string;
  profilePic?: string;
  email: string;
  role?: 'user' | 'creator' | 'admin';
  bio?: string;
  subscription?: {
    isActive: boolean;
    plan: 'free' | 'monthly' | 'yearly';
    startDate?: string;
    endDate?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  // set user only (useful when server sets httpOnly cookie and client fetches /me)
  setUser: (user: User | null) => void;
  // set token only (useful for email/password login where token is returned to client)
  setToken: (token: string | null) => void;
  // Fetch /me from server (credentials included) to initialize auth when token is httpOnly cookie
  initFromCookie: () => Promise<void>;
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
      setUser: (user) => set({ user, isAuthenticated: !!user, isAdmin: !!user && user.role === 'admin' }),
      setToken: (token) => set({ token }),
      initFromCookie: async () => {
        // Only run in browser
        if (typeof window === 'undefined') return;
        try {
          const server = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '');
          if (!server) return;
          const res = await fetch(`${server}/me`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!res.ok) return;
          const data = await res.json();
          // expecting data.user or raw user
          const user = data.user || data;
          set({ user, isAuthenticated: true, isAdmin: user?.role === 'admin' });
        } catch (err) {
          // silent fail — user remains unauthenticated
          console.warn('initFromCookie failed', err);
        }
      },
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