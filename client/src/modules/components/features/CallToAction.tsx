// components/CallToAction.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative w-full py-24 bg-gray-950 text-white font-poppins text-center">
      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Start Your Quest?
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          The path to a better life begins here. Claim your life, one level at a time.
        </p>
        <Button asChild size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-8 py-6 rounded-full">
          <Link href="/signup">Join Growth Tube Today</Link>
        </Button>
      </motion.div>
    </section>
  );
}