"use client"

import React, { useEffect } from 'react'
import LoginCard from '@/modules/auth/login-card'
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/dashboard';
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  return (
    <div className='w-full'>
       <LoginCard />
    </div>
  )
}

export default LoginPage
