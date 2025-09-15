"use client"

import React, { useEffect } from 'react'
import LoginCard from '@/modules/auth/login-card'
import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';

const LoginPage = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className='w-full'>
       <LoginCard />
    </div>
  )
}

export default LoginPage
