"use client";
import { motion } from "framer-motion";

const ITEMS = [
  { k: "name", v: "SUSTHIR" },
  { k: "sep" },
  { k: "tag", v: "NEXT.JS · WORDPRESS · SHOPIFY" },
  { k: "sep" },
  { k: "name", v: "SUSTHIR" },
  { k: "sep" },
  { k: "tag", v: "FULLSTACK ENGINEER" },
  { k: "sep" },
  { k: "name", v: "SUSTHIR" },
  { k: "sep" },
  { k: "tag", v: "SUSTHIR.DEV" },
  { k: "sep" },
];

function Seg() {
  return (
    <>
      {ITEMS.map((it, i) => {
        if (it.k === "name")
          return (
            <span
              key={i}
              className="inline-block px-10 text-[48px] font-black tracking-[10px] uppercase select-none"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "transparent",
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0) 0%, rgba(0,255,255,0.6) 35%, rgba(180,255,255,0.9) 50%, rgba(0,255,255,0.6) 65%, rgba(0,255,255,0) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s ease-in-out infinite",
                filter: "drop-shadow(0 0 12px rgba(0,255,255,0.35))",
                transform: "skewX(-3deg)",
              }}
            >
              {it.v}
            </span>
          );
        if (it.k === "tag")
          return (
            <span
              key={i}
              className="inline-block px-6 font-mono text-[11px] tracking-[4px] uppercase"
              style={{
                color: "rgba(0,200,200,0.4)",
                transform: "skewX(-3deg)",
              }}
            >
              {it.v}
            </span>
          );
        return (
          <span key={i} className="inline-flex items-center px-2.5">
            <span
              className="w-[6px] h-[6px] rotate-45"
              style={{
                background: "rgba(0,255,255,0.5)",
                boxShadow:
                  "0 0 6px rgba(0,255,255,0.6), 0 0 14px rgba(0,255,255,0.25)",
              }}
            />
          </span>
        );
      })}
    </>
  );
}

export default function VisualStrip() {
  return (
    <section className="relative w-full h-[110px] overflow-hidden bg-[#04090f]">
      {/* Aurora oil-slick bg */}
      <div
        className="absolute inset-[-40%_-20%] opacity-70"
        style={{
          background:
            "conic-gradient(from 200deg at 40% 60%, #00ffff08, #006b6b22, #0ff2, #001a2a44, #00ffff08, #006b6b22, #0ff2, #001a2a44, #00ffff08)",
          filter: "blur(18px)",
          animation: "auroraRot 18s linear infinite",
        }}
      />
      <div
        className="absolute inset-[-30%_-10%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,255,200,0.08), transparent 70%), radial-gradient(ellipse 60% 80% at 20% 70%, rgba(0,180,255,0.06), transparent 70%)",
          animation: "auroraShift 9s ease-in-out infinite alternate",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
        }}
      />

      {/* Ticker */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          <Seg />
          <Seg />
        </motion.div>
      </div>

      {/* Light streaks */}
      <div
        className="absolute top-1/2 h-px w-[30%] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,255,255,0.6), transparent)",
          animation: "streakShoot 5s ease-in-out infinite",
          filter: "blur(0.5px)",
        }}
      />

      {/* Chrome lines */}
      <div
        className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(to right, transparent 10%, rgba(0,255,255,0.8) 40%, rgba(180,255,255,1) 50%, rgba(0,255,255,0.8) 60%, transparent 90%)",
          animation: "linePulse 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,255,255,0.35) 25%, rgba(0,255,255,0.35) 75%, transparent)",
        }}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04090f] via-transparent to-[#04090f] pointer-events-none" />

      <style>{`
        @keyframes shimmer { 0% { background-position: 150% 0; } 100% { background-position: -150% 0; } }
        @keyframes auroraRot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes auroraShift { from { transform: translate(-5%,0) scale(1); } to { transform: translate(5%,5%) scale(1.08); } }
        @keyframes streakShoot { 0% { left:-30%; opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { left:120%; opacity:0; } }
        @keyframes linePulse { 0%,100% { opacity:0.7; } 50% { opacity:1; } }
      `}</style>
    </section>
  );
}
