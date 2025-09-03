"use client"

import SignupCard from '@/modules/auth/signup-card'
import { useAuthStore } from '@/store/authStore'
import { redirect } from 'next/navigation';
import React from 'react'

const SignupPage = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) redirect('/user');

  return (
    <div className='w-full'>
        <SignupCard />
    </div>
  )
}

export default SignupPage
