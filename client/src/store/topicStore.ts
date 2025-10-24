import { create } from 'zustand';
import axios from 'axios';

interface Topic {
  _id: string;
  name: string;
  slug: string;
  description: string;
  parent_topic_id?: {
    _id: string;
    name: string;
  };
  icon?: string;
  color?: string;
  is_featured: boolean;
  resource_count: number;
  level: number;
  tags: string[];
  views: number;
  is_active: boolean;
  seo: {
    title?: string;
    keywords?: string[];
    meta_description?: string;
  };
  createdAt: string;
}

interface TopicFormData {
  name: string;
  description: string;
  parent_topic_id: string;
  icon: string;
  color: string;
  is_featured: boolean;
  tags: string[];
  seo: {
    title: string;
    keywords: string[];
    meta_description: string;
  };
}

interface TopicStore {
  topics: Topic[];
  parentTopics: Topic[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchTopics: (token: string) => Promise<void>;
  fetchParentTopics: (token: string) => Promise<void>;
  createTopic: (token: string, data: TopicFormData) => Promise<void>;
  updateTopic: (token: string, id: string, data: Partial<TopicFormData>) => Promise<void>;
  deleteTopic: (token: string, id: string) => Promise<void>;
  clearError: () => void;
}

export const useTopicStore = create<TopicStore>((set, get) => ({
  topics: [],
  parentTopics: [],
  loading: false,
  error: null,

  fetchTopics: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      set({ topics: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch topics', loading: false });
    }
  },

  fetchParentTopics: async (token: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const parentTopics = response.data.filter((topic: Topic) => topic.level === 1);
      set({ parentTopics });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch parent topics' });
    }
  },

  createTopic: async (token: string, data: TopicFormData) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/create`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Refresh topics after creation
      await get().fetchTopics(token);
      await get().fetchParentTopics(token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create topic', loading: false });
    }
  },

  updateTopic: async (token: string, id: string, data: Partial<TopicFormData>) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Refresh topics after update
      await get().fetchTopics(token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update topic', loading: false });
    }
  },

  deleteTopic: async (token: string, id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topics/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      // Remove topic from state
      set(state => ({
        topics: state.topics.filter(topic => topic._id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete topic', loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));