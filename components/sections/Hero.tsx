"use client";

import { motion } from "framer-motion";
import CodeEditor from "@/components/three/CodeEditor";
// import FloatingSphere from "@/components/three/FloatingSphere";
import FloatingSocials from "@/components/effects/FloatingSocials";
import MagneticButton from "@/components/effects/MagneticButton";
import MouseGlow from "@/components/effects/MouseGlow";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* CURSOR GLOW */}
      <MouseGlow />

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020617] to-[#020617]" />

      {/* FLOATING SPHERE */}
      {/* <div className="absolute right-[-150px] bottom-[-150px] w-[600px] h-[600px] opacity-40 pointer-events-none">
        <FloatingSphere />
      </div> */}

      {/* SOCIAL LINKS */}
      <FloatingSocials />

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="max-w-xl">
          {/* ===== BADGE ===== */}
          <motion.a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            whileHover={{ scale: 1.05 }}
            className="relative inline-flex items-center mb-6 group"
          >
            {/* ROTATING BORDER */}
            <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-spin-slow opacity-70 group-hover:opacity-100" />

            {/* INNER */}
            <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 group-hover:border-cyan-400/30 transition-all">
              {/* PULSE DOT */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>

              <span className="text-sm text-gray-300 group-hover:text-white transition">
                Available for Freelance
              </span>
            </div>
          </motion.a>

          {/* ===== TITLE ===== */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Susthir
            </span>
          </motion.h1>

          {/* ===== SUBTITLE ===== */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-gray-300"
          >
            <span className="text-cyan-400">Next.js</span> Developer •
            <span className="text-blue-400"> WordPress</span> •
            <span className="text-purple-400"> Shopify</span>
          </motion.h2>

          {/* ===== DESCRIPTION ===== */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-400 leading-relaxed"
          >
            I craft{" "}
            <span className="text-cyan-400">high-performance web apps</span>,
            build{" "}
            <span className="text-blue-400">scalable eCommerce platforms</span>,
            and deliver{" "}
            <span className="text-purple-400">
              conversion-driven experiences
            </span>
            .
            <br />
            <br />
            Helping brands grow with fast, modern, and user-focused digital
            solutions.
          </motion.p>

          {/* ===== BUTTONS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <MagneticButton>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20">
                View Projects
              </button>
            </MagneticButton>

            <MagneticButton>
              <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
                Contact Me
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ===== RIGHT (EDITOR) ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex justify-center"
        >
          <div className="w-[420px]">
            <CodeEditor />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
