"use client";

import { useState } from "react";
import Reveal from "@/components/effects/Reveal";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "All",
  "Dental",
  "EdTech",
  "Commercial",
  "Plugins",
  "Portals",
];

const projects = [
  {
    title: "Dental Clinic Website",
    category: "Dental",
    desc: "High-converting clinic website with WhatsApp integration.",
    image: "/projects/dental.png",
    tech: ["React", "Next.js"],
  },
  {
    title: "Course Platform",
    category: "EdTech",
    desc: "Online learning system with dashboard & payments.",
    image: "/projects/dental.png",
    tech: ["React", "Next.js"],
  },
  {
    title: "Business Website",
    category: "Commercial",
    desc: "Corporate site with modern UI & lead funnels.",
    image: "/projects/dental.png",
    tech: ["React", "Next.js"],
  },
  {
    title: "WordPress Plugin",
    category: "Plugins",
    desc: "Custom plugin with dynamic features.",
    image: "/projects/dental.png",
    tech: ["React", "Next.js"],
  },
  {
    title: "Exam Portal",
    category: "Portals",
    desc: "Test system with real-time evaluation.",
    image: "/projects/dental.png",
    tech: ["React", "Next.js"],
  },
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="relative py-28 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-14">
            My <span className="text-cyan-400">Work</span>
          </h2>
        </Reveal>

        {/* Tabs */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm border transition-all duration-300
                  ${
                    active === cat
                      ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                      : "text-gray-300 border-white/10 hover:border-cyan-400 hover:text-white"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ✅ GRID FIXED (no Stagger wrapper issue) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0b1220] z-10 group-hover:z-50"
              >
                {/* IMAGE */}
                <div className="relative h-[180px] overflow-hidden">
                  <motion.img
                    src={project.image}
                    className="w-full object-cover"
                    initial={{ y: 0, scale: 1 }}
                    whileHover={{ y: "-50%", scale: 1.05 }}
                    transition={{ duration: 1.2 }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* CONTENT (ALWAYS VISIBLE) */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {project.title}
                  </h3>

                  <p className="text-sm text-cyan-400 mb-3">
                    {project.category}
                  </p>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {project.desc}
                  </p>

                  {/* TAGS (ALWAYS VISIBLE) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 border border-white/10 rounded text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* BUTTON (ALWAYS VISIBLE) */}
                  <button className="w-full text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-md py-2 text-gray-300 transition">
                    View Details →
                  </button>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 rounded-xl border border-cyan-400/0 group-hover:border-cyan-400/40 transition duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
