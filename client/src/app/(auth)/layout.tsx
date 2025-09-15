import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <div className="w-3/5 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <div className="text-center text-white">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Growth Tubes</h1>
          <p className="text-xl opacity-90">Learn, Practice, Excel</p>
        </div>
      </div>
      <div className="w-2/5 flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
