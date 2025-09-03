// components/GamificationElements.tsx
"use client";

import { motion } from "framer-motion";
import { Medal, Flame, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function GamificationElements() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-black py-20 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Level Up Your Life
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our gamified reward system keeps you motivated and accountable.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-center p-8 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-500 transition-colors duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="bg-cyan-500 p-4 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">XP Points</h3>
            <p className="text-gray-400">Earn experience points by completing tasks and hitting goals. The more you do, the faster you level up.</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center p-8 rounded-lg bg-gray-900 border border-gray-700 hover:border-pink-500 transition-colors duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-pink-500 p-4 rounded-full mb-4">
              <Flame className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Streaks</h3>
            <p className="text-gray-400">Maintain daily and weekly consistency to earn streak bonuses and build unbreakable habits.</p>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center p-8 rounded-lg bg-gray-900 border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-purple-500 p-4 rounded-full mb-4">
                    <Medal className="h-8 w-8 text-black" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white border-gray-700">
                  <p>Master of Habit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="text-2xl font-semibold mb-2">Achievements</h3>
            <p className="text-gray-400">Unlock special badges and rewards for reaching major milestones on your journey.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}