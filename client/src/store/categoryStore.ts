import { create } from 'zustand';
import axios from 'axios';
import { CATEGORY_API_ROUTE } from '@/lib/constants';

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdBy: {
    username: string;
  };
  createdAt: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (data: Omit<Category, '_id' | 'createdBy' | 'createdAt' | 'isActive'>, token: string) => Promise<void>;
  updateCategory: (id: string, data: Omit<Category, '_id' | 'createdBy' | 'createdAt' | 'isActive'>, token: string) => Promise<void>;
  deleteCategory: (id: string, token: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(CATEGORY_API_ROUTE);
      set({ categories: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch categories', isLoading: false });
    }
  },

  createCategory: async (data, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(CATEGORY_API_ROUTE, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCategories();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create category', isLoading: false });
      throw error;
    }
  },

  updateCategory: async (id, data, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${CATEGORY_API_ROUTE}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCategories();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update category', isLoading: false });
      throw error;
    }
  },

  deleteCategory: async (id, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${CATEGORY_API_ROUTE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCategories();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete category', isLoading: false });
      throw error;
    }
  },
}));