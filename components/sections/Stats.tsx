"use client";

import Reveal from "@/components/effects/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/effects/Stagger";

export default function Stats() {
  const stats = [
    { value: "20+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
    { value: "3+", label: "Years Experience" },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <Reveal>
          <h2 className="text-center text-3xl font-semibold mb-16 text-white">
            Trusted by Clients Worldwide
          </h2>
        </Reveal>

        {/* STATS GRID */}
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="relative group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500">
                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl" />

                  {/* CONTENT */}
                  <h3 className="text-4xl font-bold text-cyan-400">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-gray-400">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
