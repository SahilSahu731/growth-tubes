"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardNavbar from "@/modules/user/components/DashboardNavbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </AuthGuard>
  );
};

export default UserLayout;
