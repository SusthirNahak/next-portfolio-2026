"use client";

import { motion } from "framer-motion";
import FloatingSphere from "@/components/three/FloatingSphere";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-between px-10">
      {/* LEFT CONTENT */}
      <div className="max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight"
        >
          Hi, I'm <span className="text-indigo-400">Susthir</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-2xl text-gray-300"
        >
          Next.js Developer • WordPress • Shopify
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-gray-400"
        >
          I build scalable web applications, high-performance websites, and
          real-world digital solutions for clients worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-6 py-3 bg-indigo-500 rounded-lg">
            View Projects
          </button>

          <button className="px-6 py-3 border border-white/20 rounded-lg">
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* RIGHT SIDE (3D coming next) */}
      <div className="w-[400px] h-[400px] hidden md:block">
        <FloatingSphere />
      </div>
    </section>
  );
}
