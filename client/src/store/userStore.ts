import { create } from 'zustand';
import axios from 'axios';
import { ADMIN_API_ROUTE } from '@/lib/constants';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: (token: string) => Promise<void>;
  updateUserStatus: (id: string, isActive: boolean, token: string) => Promise<void>;
  updateUserRole: (id: string, role: string, token: string) => Promise<void>;
  deleteUser: (id: string, token: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${ADMIN_API_ROUTE}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ users: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch users', isLoading: false });
    }
  },

  updateUserStatus: async (id, isActive, token) => {
    try {
      await axios.patch(`${ADMIN_API_ROUTE}/users/${id}/status`, { isActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchUsers(token);
    } catch (error: any) {
      throw error;
    }
  },

  updateUserRole: async (id, role, token) => {
    try {
      await axios.patch(`${ADMIN_API_ROUTE}/users/${id}/role`, { role }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchUsers(token);
    } catch (error: any) {
      throw error;
    }
  },

  deleteUser: async (id, token) => {
    try {
      await axios.delete(`${ADMIN_API_ROUTE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchUsers(token);
    } catch (error: any) {
      throw error;
    }
  },
}));