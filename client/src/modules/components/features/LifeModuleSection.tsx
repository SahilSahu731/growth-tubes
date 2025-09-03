// components/LifeModuleSection.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Briefcase, BookOpen, Wallet } from "lucide-react";

interface ModuleItem {
  title: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  imageSrc: string;
}

const moduleData: ModuleItem[] = [
  {
    title: "Health Hub 🏃‍♂️",
    icon: Dumbbell,
    description: "Battle bosses by hitting health goals. Track fitness, nutrition, and mental health with gamified challenges.",
    features: ["Fitness tracking with workout game challenges", "Nutrition logging with recipe suggestions", "Sleep optimization with bedtime streaks", "Mental health check-ins and meditation quests"],
    imageSrc: "https://images.unsplash.com/photo-1549476140-192c00220c19?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Career Command Center 💼",
    icon: Briefcase,
    description: "Level up your professional skills. Manage projects, set goals, and unlock achievements on your career path.",
    features: ["Goal setting and project management", "Skill development roadmaps", "Networking relationship tracker", "Income/expense optimization"],
    imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Learning Laboratory 📚",
    icon: BookOpen,
    description: "Conquer knowledge quests and skill challenges. Our adaptive engine helps you learn faster and retain more.",
    features: ["Personalized learning paths", "Micro-learning modules (5-15 min)", "Knowledge retention quests", "Skill application challenges"],
    imageSrc: "https://images.unsplash.com/photo-1543269826-b844f0b2401f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Financial Fortress 💰",
    icon: Wallet,
    description: "Your financial health is a game to be won. Track budgets, learn investing, and conquer debt with powerful tools.",
    features: ["Budget tracking and optimization", "Investment learning modules", "Debt payoff game challenges", "Savings goal visualization"],
    imageSrc: "https://images.unsplash.com/photo-1616401037748-1296a29df14d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

export default function LifeModuleSection() {
  return (
    <section id="modules" className="w-full py-20 bg-white text-gray-900 font-poppins">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Forge Your Own Path
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose your skill trees and start your journey.
        </motion.p>

        {moduleData.map((tab, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="my-16"
          >
            <Card className="bg-white border-gray-200 text-gray-900 shadow-md">
              <div className={`grid md:grid-cols-2 gap-8 text-left ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <CardHeader className="p-6">
                  <div className="flex items-center mb-4">
                    <tab.icon className="h-8 w-8 text-cyan-600 mr-3" />
                    <CardTitle className="text-3xl font-bold">{tab.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 mt-2">{tab.description}</CardDescription>
                  <CardContent className="p-0 mt-4">
                    <ul className="list-none space-y-3">
                      {tab.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-700 flex items-start">
                          <span className="text-cyan-600 mr-2 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CardHeader>

                <div className="relative w-full h-64 md:h-auto overflow-hidden rounded-b-lg md:rounded-lg">
                  <img src={tab.imageSrc} alt={`${tab.title} visual`} className="object-cover w-full h-full" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}