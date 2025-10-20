"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, token, setUser } = useAuthStore();

  useEffect(() => {
    const checkAdmin = async () => {
      console.log('Admin layout checking...');
      
      if (!isAuthenticated || !token) {
        router.push('/login');
        return;
      }

      try {
        console.log('Calling admin API from layout...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/check`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Admin API response:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Admin data:', data);
          
          if (data.success && data.isAdmin) {
            router.push('/admin/dashboard');
            setUser(data.user);
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Admin check error:', error);
        router.push('/dashboard');
      }
    };

    checkAdmin();
  }, [isAuthenticated, token, router, setUser]);

  return <>{children}</>;
}