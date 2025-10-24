"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, token, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAuthenticated || !token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/check`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success && data.isAdmin) {
            setUser(data.user);
            setIsAdmin(true);
          } else {
            router.push('/dashboard');
            return;
          }
        } else {
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Admin check error:', error);
        router.push('/dashboard');
        return;
      }
      
      setIsLoading(false);
    };

    checkAdmin();
  }, [isAuthenticated, token, router, setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}