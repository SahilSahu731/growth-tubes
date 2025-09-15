"use client"

import SignupCard from '@/modules/auth/signup-card'
import { useAuthStore } from '@/store/authStore'
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const SignupPage = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className='w-full'>
        <SignupCard />
    </div>
  )
}

export default SignupPage
