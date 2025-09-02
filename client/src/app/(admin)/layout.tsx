import { AdminSidebar } from '@/modules/admin/components/AdminSidebar'
import { Sidebar } from '@/modules/user/components/Sidebar'
import React from 'react'

const AdminLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex gap-2'>
       <div>
            <AdminSidebar />
       </div>
       <main>
        {children}
       </main>
    </div>
  )
}

export default AdminLayout
