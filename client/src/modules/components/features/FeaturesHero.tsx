// components/FeaturesHero.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, TrendingUp, Users, Medal } from "lucide-react";

export default function FeaturesHero() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center bg-white text-gray-900 font-poppins overflow-hidden">
      
      {/* Background Grid Pattern (Optional) */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      {/* Main Content & Title */}
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center justify-center h-full">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
            HUMAN.
          </h1>
          <h1 className="text-6xl md:text-8xl font-black mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
            UPGRADE.
          </h1>
        </div>
        
        <p className="text-lg md:text-2xl text-gray-600 my-8 max-w-xl mx-auto">
          Growth Tube is the ultimate operating system for the next version of you.
        </p>
        
        <Button asChild size="lg" className="bg-cyan-600 text-white hover:bg-cyan-700 font-bold px-8 py-6 rounded-full shadow-lg">
          <Link href="#modules">
            Begin Simulation <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* "Shattered" Advantages - Top Left */}
      <div className="absolute top-[10vh] left-[5vw] p-6 max-w-sm border-2 border-gray-200 rounded-2xl shadow-lg bg-white/50 backdrop-blur-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300">
        <Brain className="h-8 w-8 text-cyan-600 mb-3" />
        <h3 className="text-lg font-bold">Adaptive Progress</h3>
        <p className="text-sm text-gray-500 mt-1">AI-driven insights to tailor your growth path.</p>
      </div>

      {/* "Shattered" Advantages - Top Right */}
      <div className="absolute top-[15vh] right-[5vw] p-6 max-w-sm border-2 border-gray-200 rounded-2xl shadow-lg bg-white/50 backdrop-blur-sm transform rotate-6 hover:rotate-0 transition-transform duration-300">
        <Medal className="h-8 w-8 text-purple-600 mb-3" />
        <h3 className="text-lg font-bold">Gamified Rewards</h3>
        <p className="text-sm text-gray-500 mt-1">Unlock achievements and level up your life.</p>
      </div>

      {/* "Shattered" Advantages - Bottom Left */}
      <div className="absolute bottom-[10vh] left-[8vw] p-6 max-w-sm border-2 border-gray-200 rounded-2xl shadow-lg bg-white/50 backdrop-blur-sm transform rotate-5 hover:rotate-0 transition-transform duration-300">
        <Users className="h-8 w-8 text-pink-600 mb-3" />
        <h3 className="text-lg font-bold">Community & Support</h3>
        <p className="text-sm text-gray-500 mt-1">Connect with a network of pioneers on the same quest.</p>
      </div>

      {/* "Shattered" Advantages - Bottom Right */}
      <div className="absolute bottom-[20vh] right-[10vw] p-6 max-w-sm border-2 border-gray-200 rounded-2xl shadow-lg bg-white/50 backdrop-blur-sm transform -rotate-4 hover:rotate-0 transition-transform duration-300">
        <TrendingUp className="h-8 w-8 text-yellow-600 mb-3" />
        <h3 className="text-lg font-bold">Data-Driven Growth</h3>
        <p className="text-sm text-gray-500 mt-1">Visualized progress and insights to keep you on track.</p>
      </div>
    </section>
  );
}