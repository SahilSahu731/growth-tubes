"use client";

import { Sidebar, MobileHeader } from '@/modules/user/components/Sidebar'
import React, { useState } from 'react'

const UserLayout = ({children} : {children: React.ReactNode}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />
      
      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Mobile Header - only shows on mobile */}
        <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        {/* Page Content */}
        <main className='flex-1 p-4 md:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default UserLayout 