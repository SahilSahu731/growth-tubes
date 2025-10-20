"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, token, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (hasCheckedRef.current) return;
      hasCheckedRef.current = true;
      
      if (!isAuthenticated || !token) {
        router.push('/login');
        return;
      }

      try {
        console.log('Calling admin check API...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/check`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Admin API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Admin API response data:', data);
          
          if (data.success && data.isAdmin && data.user.role === 'admin') {
            router.push('/admin/dashboard');
            console.log('User role:', data.user.role);
            setUser(data.user);
            setIsLoading(false);
          } else {
            console.log('User is not admin, redirecting to dashboard');
            router.push('/dashboard');
          }
        } else {
          console.log('Admin API failed, redirecting to dashboard');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Admin check failed:', error);
        router.push('/dashboard');
      }
    };

    checkAdminAccess();
  }, [isAuthenticated, token, user?.role, router, setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user?.role === 'admin' ? <>{children}</> : null;
}