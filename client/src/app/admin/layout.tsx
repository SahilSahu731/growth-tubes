"use client";

import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 lg:ml-0 p-4 lg:p-8">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </AdminGuard>
  );
};

export default AdminLayout;