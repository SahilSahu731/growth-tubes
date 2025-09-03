"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Check if the user is not authenticated
    if (!isAuthenticated) {
      // Redirect to the login page
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Render the children only if the user is authenticated
  return isAuthenticated ? <>{children}</> : null;
}