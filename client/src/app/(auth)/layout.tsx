import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-3 py-5 bg-white shadow-xl border-b border-gray-100">
        <div className="flex items-center gap-3 ml-8">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={"/logo.svg"} alt="Logo" width={32} height={32} />
            <h2 className="text-2xl font-bold text-primary">Growth Tubes</h2>
          </Link>
        </div>
      </div>
      <main className="flex w-full">
            {children}
      </main>
    </div>
  );
};

export default AuthLayout;
