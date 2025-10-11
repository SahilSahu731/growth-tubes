export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const USER_API_ROUTE = `${API_BASE_URL}/api/users`;
export const CATEGORY_API_ROUTE = `${API_BASE_URL}/api/categories`;
export const ROADMAP_API_ROUTE = `${API_BASE_URL}/api/roadmaps`;
export const ADMIN_API_ROUTE = `${API_BASE_URL}/api/admin`;