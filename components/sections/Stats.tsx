"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Clients" },
  { value: "3+", label: "Years Exp" },
  { value: "100+", label: "Commits" },
];

export default function Stats() {
  return (
    <section className="py-28 bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.05 }}
            className="
              p-8 rounded-2xl 
              bg-gradient-to-br from-[#0f172a] to-[#020617]
              border border-white/10
              backdrop-blur-xl
              shadow-lg
              hover:shadow-cyan-500/20
              transition
            "
          >
            <h3 className="text-4xl font-bold text-cyan-400 mb-2">
              {item.value}
            </h3>
            <p className="text-gray-400">{item.label}</p>

            {/* glow line */}
            <div className="mt-4 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent opacity-50" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
