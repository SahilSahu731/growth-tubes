// components/PricingSection.tsx
"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Plan {
  name: string;
  price: string;
  isPopular: boolean;
  features: string[];
  cta: string;
  link: string;
}

const plans: Plan[] = [
  {
    name: "Free Pioneer",
    price: "$0",
    isPopular: false,
    features: [
      "Access to core life trackers",
      "Limited learning modules",
      "Basic achievement badges",
      "Community forums",
    ],
    cta: "Start Your Free Quest",
    link: "/signup",
  },
  {
    name: "Premium Adventurer",
    price: "$19.99",
    isPopular: true,
    features: [
      "Everything in Free Pioneer",
      "Unlimited skill trees",
      "Full learning library",
      "Advanced analytics",
      "AI goal optimization",
      "Premium customer support",
    ],
    cta: "Choose This Plan",
    link: "/premium",
  },
  {
    name: "Pro Mentor",
    price: "$39.99",
    isPopular: false,
    features: [
      "Everything in Premium Adventurer",
      "1-on-1 coaching calls",
      "Customized learning paths",
      "Exclusive masterclasses",
      "Priority feature requests",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    link: "/contact",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-20 bg-white text-gray-900 font-poppins">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Path to Mastery
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Select the plan that aligns with your quest for personal growth.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative ${plan.isPopular ? "md:scale-105" : ""}`}
            >
              <Card className={`relative flex flex-col items-center p-6 border-2 shadow-lg h-full transition-all duration-300 ${plan.isPopular ? "border-cyan-600 shadow-xl" : "border-gray-200"}`}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-6 w-full">
                  <CardTitle className="text-2xl font-bold mb-1">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-base text-gray-500">/month</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow w-full">
                  <ul className="space-y-4 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <div className="w-full mt-6">
                  <Button asChild className="w-full bg-cyan-600 text-white hover:bg-cyan-700 font-semibold py-6">
                    <Link href={plan.link}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}