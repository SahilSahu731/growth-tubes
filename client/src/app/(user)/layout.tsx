"use client";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/modules/user/components/Sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default UserLayout;
