"use client"

import HeroSection from "@/modules/home/components/hero-section";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
    useEffect(() => {
      if (isAuthenticated) {
        redirect('/dashboard');
      }
    }, [isAuthenticated]);

  return (
    <div className="">
        <HeroSection />
    </div>
  );
}
