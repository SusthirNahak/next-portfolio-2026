"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Ecommerce Platform",
    desc: "High-converting Shopify store with custom UX",
  },
  {
    title: "SaaS Dashboard",
    desc: "Next.js dashboard with real-time data",
  },
];

export default function Projects() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12">Selected Work</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-cyan-400">{p.title}</h3>
            <p className="text-gray-400 mt-3">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
