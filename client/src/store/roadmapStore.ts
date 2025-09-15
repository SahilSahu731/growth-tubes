import { create } from 'zustand';
import axios from 'axios';
import { ROADMAP_API_ROUTE } from '@/lib/constants';

interface Roadmap {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  slug: string;
  thumbnail: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    color: string;
  };
  creator: {
    _id: string;
    username: string;
    email: string;
  };
  nodes: any[];
  connections: any[];
  difficulty: string;
  estimatedDuration: string;
  tags: string[];
  viewTypes: string[];
  defaultView: string;
  followersCount: number;
  forksCount: number;
  rating: {
    average: number;
    count: number;
  };
  status: string;
  isFeatured: boolean;
  isOfficial: boolean;
  version: string;
  createdAt: string;
}

interface RoadmapState {
  roadmaps: Roadmap[];
  isLoading: boolean;
  error: string | null;
  fetchRoadmaps: () => Promise<void>;
  createRoadmap: (data: any, token: string) => Promise<void>;
  updateRoadmap: (id: string, data: any, token: string) => Promise<void>;
  deleteRoadmap: (id: string, token: string) => Promise<void>;
  toggleRoadmapStatus: (id: string, status: string, token: string) => Promise<void>;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  roadmaps: [],
  isLoading: false,
  error: null,

  fetchRoadmaps: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(ROADMAP_API_ROUTE);
      set({ roadmaps: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch roadmaps', isLoading: false });
    }
  },

  createRoadmap: async (data, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(ROADMAP_API_ROUTE, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create roadmap', isLoading: false });
      throw error;
    }
  },

  updateRoadmap: async (id, data, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${ROADMAP_API_ROUTE}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update roadmap', isLoading: false });
      throw error;
    }
  },

  deleteRoadmap: async (id, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${ROADMAP_API_ROUTE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete roadmap', isLoading: false });
      throw error;
    }
  },

  toggleRoadmapStatus: async (id, status, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`${ROADMAP_API_ROUTE}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update roadmap status', isLoading: false });
      throw error;
    }
  },

  addLevel: async (roadmapId, levelData, token) => {
    try {
      const response = await axios.post(`${ROADMAP_API_ROUTE}/${roadmapId}/levels`, levelData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update the specific roadmap in state
      set(state => ({
        roadmaps: state.roadmaps.map(r => r._id === roadmapId ? response.data : r)
      }));
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  addNode: async (roadmapId, levelId, nodeData, token) => {
    try {
      const response = await axios.post(`${ROADMAP_API_ROUTE}/${roadmapId}/levels/${levelId}/nodes`, nodeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        roadmaps: state.roadmaps.map(r => r._id === roadmapId ? response.data : r)
      }));
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  addTopic: async (roadmapId, levelId, nodeId, topicData, token) => {
    try {
      const response = await axios.post(`${ROADMAP_API_ROUTE}/${roadmapId}/levels/${levelId}/nodes/${nodeId}/topics`, topicData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        roadmaps: state.roadmaps.map(r => r._id === roadmapId ? response.data : r)
      }));
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
}));