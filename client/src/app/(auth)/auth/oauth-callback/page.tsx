"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import { USER_API_ROUTE } from '@/lib/constants';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userId = searchParams.get('userId');
      const error = searchParams.get('error');

      if (error) {
        router.push(`/login?error=${error}`);
        return;
      }

      if (token && userId) {
        try {
          const response = await axios.get(`${USER_API_ROUTE}/auth/google/user/${userId}`);
          
          login(
            {
              _id: response.data._id,
              username: response.data.username,
              email: response.data.email,
              role: response.data.role,
            },
            token
          );

          router.push('/dashboard');
        } catch (error) {
          console.error('Failed to get user data:', error);
          router.push('/login?error=authentication_failed');
        }
      } else {
        router.push('/login?error=missing_credentials');
      }
    };

    handleCallback();
  }, [searchParams, router, login]);

  return (<div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Processing authentication...</p>
    </div>
  );
}
