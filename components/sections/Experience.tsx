"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin safely for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    role: "Software Engineer",
    company: "Qtonix Software Pvt Ltd",
    duration: "Oct 2025–Present",
    accent: "#22d3ee", // cyan
    tag: "Current",
    points: [
      "Working on scalable backend systems",
      "Building REST APIs",
      "Improving DB performance",
    ],
  },
  {
    role: "Software Developer",
    company: "Wilyfox Media",
    duration: "Oct 2024–Jul 2025",
    accent: "#60a5fa", // blue
    tag: "9 months",
    points: [
      "Built MERN stack apps",
      "Reusable UI components",
      "Client projects delivery",
    ],
  },
  {
    role: "Software Engineer",
    company: "Greet Labs",
    duration: "Feb 2024–Aug 2024",
    accent: "#a78bfa", // violet
    tag: "6 months",
    points: ["Frontend development", "API integration", "UI optimization"],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Increase end distance to ensure Card 3 has time to finish
          end: `+=${experiences.length * 40}%`,
          scrub: 1,
          pin: true, // This keeps the section locked while cards move
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (index === 0 || !card) return;

        tl.fromTo(
          card,
          {
            y: "100vh",
            opacity: 0,
            scale: 0.9,
          },
          {
            // Each card stops 25px lower than the previous one to show the stack
            y: index * 25,
            opacity: 1,
            scale: 1 - index * 0.02, // Slightly smaller scale for depth
            ease: "none",
          },
          // This delay ensures Card 2 starts after Card 1 is "settled"
          index === 1 ? ">" : "+=0.5",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#070d1a] relative w-full text-white">
      {/* Header Section */}
      <div className="pt-24 pb-12 flex flex-col items-center justify-center z-10 relative">
        <span className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-2">
          Career Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          Work Experience
        </h2>
        {/* Animated Underline Divider */}
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
      </div>

      {/* Scroll Area: Height dynamically sets the total scrollable distance */}
      <div
        ref={containerRef}
        style={{ height: `${experiences.length * 40}vh` }}
        className="relative w-full"
      >
        {/* Sticky Inner Container */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 pt-24 pb-12">
          <div className="relative w-full max-w-4xl h-[500px]">
            {experiences.map((exp, index) => {
              const cardNumber = String(index + 1).padStart(2, "0");
              const totalCards = String(experiences.length).padStart(2, "0");

              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="absolute w-full shadow-2xl origin-top"
                  style={{
                    backgroundColor: "#0a0f1c",
                    border: `1px solid ${exp.accent}25`,
                    borderRadius: "16px",
                    // Dynamic Z-Index so new cards are ALWAYS on top
                    zIndex: index + 10,
                    // Starting position for the "peek" look
                    top: 0,
                  }}
                >
                  {/* Radial Gradient Tint Top-Left */}
                  <div
                    className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none rounded-tl-[16px]"
                    style={{
                      background: `radial-gradient(circle at top left, ${exp.accent}, transparent 70%)`,
                    }}
                  />

                  {/* Watermark Number Bottom-Right */}
                  <div className="absolute -bottom-6 -right-2 text-[180px] font-black leading-none opacity-[0.03] pointer-events-none select-none">
                    {cardNumber}
                  </div>

                  <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
                    {/* Top Row: Counter & Badge */}
                    <div className="flex justify-between items-center mb-8">
                      <div
                        className="font-mono text-sm md:text-base font-medium tracking-widest"
                        style={{ color: exp.accent }}
                      >
                        {cardNumber} / {totalCards}
                      </div>
                      <div
                        className="px-3 py-1 text-xs md:text-sm font-semibold rounded-full bg-opacity-10 backdrop-blur-sm"
                        style={{
                          color: exp.accent,
                          backgroundColor: `${exp.accent}15`,
                        }}
                      >
                        {exp.tag}
                      </div>
                    </div>

                    {/* Middle Section: Role, Company, Duration */}
                    <div className="mb-6">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {exp.role}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span
                          className="text-xl font-medium"
                          style={{ color: exp.accent }}
                        >
                          @ {exp.company}
                        </span>
                        <span className="hidden sm:inline text-slate-500">
                          •
                        </span>
                        <span className="text-slate-400 font-mono text-sm">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    {/* Gradient Divider */}
                    <div
                      className="w-full h-[1px] mb-8 opacity-30"
                      style={{
                        background: `linear-gradient(to right, ${exp.accent}, transparent)`,
                      }}
                    />

                    {/* Bottom Section: Bullet Points (3-Column Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                      {exp.points.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-[#111827] bg-opacity-50 p-4 rounded-xl border border-white/5 backdrop-blur-sm transition-colors hover:border-white/10"
                        >
                          <svg
                            className="w-5 h-5 mt-0.5 shrink-0"
                            style={{ color: exp.accent }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                          <span className="text-sm text-slate-300 leading-snug">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
