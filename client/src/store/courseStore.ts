import { create } from 'zustand';
import axios from 'axios';
import { COURSE_API_ROUTE } from '@/lib/constants';

interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
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
  levels: any[];
  pricing: {
    type: string;
    amount: number;
    currency: string;
  };
  tags: string[];
  skillLevel: string;
  enrollmentCount: number;
  rating: {
    average: number;
    count: number;
  };
  status: string;
  isFeatured: boolean;
  totalDuration: number;
  totalResources: number;
  createdAt: string;
}

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  createCourse: (data: any, token: string) => Promise<void>;
  updateCourse: (id: string, data: any, token: string) => Promise<void>;
  deleteCourse: (id: string, token: string) => Promise<void>;
  toggleCourseStatus: (id: string, status: string, token: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(COURSE_API_ROUTE);
      set({ courses: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch courses', isLoading: false });
    }
  },

  createCourse: async (data, token) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Creating course with data:', data);
      const response = await axios.post(COURSE_API_ROUTE, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Course created:', response.data);
      await get().fetchCourses();
      set({ isLoading: false });
    } catch (error: any) {
      console.error('Create course error:', error.response?.data || error.message);
      set({ error: error.response?.data?.message || 'Failed to create course', isLoading: false });
      throw error;
    }
  },

  updateCourse: async (id, data, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${COURSE_API_ROUTE}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCourses();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update course', isLoading: false });
      throw error;
    }
  },

  deleteCourse: async (id, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${COURSE_API_ROUTE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCourses();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete course', isLoading: false });
      throw error;
    }
  },

  toggleCourseStatus: async (id, status, token) => {
    set({ isLoading: true, error: null });
    try {
      await axios.patch(`${COURSE_API_ROUTE}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await get().fetchCourses();
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update course status', isLoading: false });
      throw error;
    }
  },
}));