"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiWordpress,
  SiShopify,
  SiGraphql,
} from "react-icons/si";

const skills = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiExpress, name: "Express" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiWordpress, name: "WordPress" },
  { icon: SiShopify, name: "Shopify" },
  { icon: SiGraphql, name: "GraphQL" },
];

export default function Skills() {
  return (
    <section className="py-32 bg-[#020617] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white">
          My <span className="text-cyan-400">Skills</span>
        </h2>
        <p className="text-gray-400 mt-4">Technologies I work with daily</p>
      </div>

      {/* FLOATING SLIDER */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...skills, ...skills].map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={i}
                className="group w-28 h-28 flex flex-col items-center justify-center
                rounded-2xl border border-white/10 
                bg-white/5 backdrop-blur-xl
                hover:border-cyan-400 transition
                hover:scale-110"
              >
                <Icon className="text-3xl text-cyan-400 mb-2 group-hover:scale-125 transition" />
                <span className="text-xs text-gray-300">{skill.name}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] pointer-events-none" />
      </div>
    </section>
  );
}
