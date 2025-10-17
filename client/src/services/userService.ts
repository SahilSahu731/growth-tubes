import { UserProfileResponse } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getUserProfile = async (token: string): Promise<UserProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};