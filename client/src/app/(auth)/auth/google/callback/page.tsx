"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import { USER_API_ROUTE } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');
        const errorParam = searchParams.get('error');

        // Handle error from backend
        if (errorParam) {
          setError('Authentication failed. Please try again.');
          setTimeout(() => {
            router.push('/login');
          }, 3000);
          return;
        }

        // Validate required parameters
        if (!token || !userId) {
          setError('Missing authentication credentials.');
          setTimeout(() => {
            router.push('/login');
          }, 3000);
          return;
        }

        console.log('Fetching user data...');

        // Fetch user data from backend
        const response = await axios.get(`${USER_API_ROUTE}/auth/google/user/${userId}`);
        
        if (response.data.success) {
          // Store user data in auth store
          login(
            {
              _id: response.data._id,
              username: response.data.username,
              email: response.data.email,
              profilePic: response.data.profilePic,
              bio: response.data.bio,
              role: response.data.role,
              subscription: response.data.subscription,
            },
            token
          );

          console.log('Login successful, redirecting to dashboard...');

          // Redirect to dashboard
          router.push('/dashboard');
        } else {
          throw new Error('Failed to get user data');
        }
      } catch (error: any) { // eslint-disable-line
        console.error('Google OAuth callback error:', error);
        setError(error.response?.data?.message || 'Authentication failed. Please try again.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        {error ? (
          <div className="text-center">
            <div className="mb-4">
              <svg 
                className="mx-auto h-12 w-12 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 text-green-600 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Completing Authentication
            </h2>
            <p className="text-gray-600">Please wait while we log you in...</p>
            <div className="mt-6">
              <div className="flex space-x-2 justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleCallbackPage;