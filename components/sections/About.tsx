"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const skills = [
  {
    icon: "⬡",
    color: "cyan",
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: "⬡",
    color: "blue",
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    icon: "⬡",
    color: "teal",
    title: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    icon: "⬡",
    color: "sky",
    title: "Tools",
    items: ["GitHub", "Postman", "VS Code"],
  },
];

const glowMap: Record<string, string> = {
  cyan: "rgba(0,255,255,0.8)",
  blue: "rgba(0,160,255,0.8)",
  teal: "rgba(0,220,200,0.8)",
  sky: "rgba(120,200,255,0.8)",
};

function HexIcon({ color }: { color: string }) {
  return (
    <div className="relative w-9 h-9 mb-3" style={{ perspective: "120px" }}>
      {/* Pulse ring */}
      <div
        className="absolute inset-[-4px] rounded-full border animate-ping"
        style={{
          borderColor: glowMap[color],
          opacity: 0.3,
          animationDuration: "2.5s",
        }}
      />
      {/* 3D hex */}
      <motion.div
        className="w-full h-full flex items-center justify-center text-xl"
        animate={{ rotateY: [0, 20, 0, -20, 0], rotateX: [0, 8, 12, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          rotateY: 360,
          transition: { duration: 1, repeat: Infinity, ease: "linear" },
        }}
        style={{
          transformStyle: "preserve-3d",
          filter: `drop-shadow(0 0 8px ${glowMap[color]}) drop-shadow(0 0 20px ${glowMap[color].replace("0.8", "0.4")})`,
        }}
      >
        ⬡
      </motion.div>
    </div>
  );
}

function SkillCard({ sk }: { sk: (typeof skills)[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-60, 60], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotY = useSpring(useTransform(x, [-80, 80], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{
        y: -7,
        scale: 1.02,
        borderColor: "rgba(0,255,255,0.3)",
        boxShadow:
          "0 16px 40px rgba(0,255,255,0.1), inset 0 0 30px rgba(0,255,255,0.03)",
      }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative p-6 rounded-xl border border-cyan-400/10 bg-gradient-to-br from-white/[0.025] to-cyan-400/[0.015] overflow-hidden group transition-colors duration-300"
    >
      {/* Glow bloom */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/8 to-blue-400/8 transition-opacity duration-350 rounded-xl" />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/40 rounded-tl-xl group-hover:w-12 group-hover:h-12 transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-400/25 rounded-br-xl group-hover:w-12 group-hover:h-12 transition-all duration-300" />

      <HexIcon color={sk.color} />

      <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-[1.5px] mb-3 relative z-10">
        {sk.title}
      </h3>

      <div className="flex flex-wrap gap-1.5 relative z-10">
        {sk.items.map((t, j) => (
          <motion.span
            key={j}
            whileHover={{ scale: 1.08 }}
            className="text-[11px] px-3 py-1 rounded-full border border-cyan-400/13 bg-cyan-400/6 text-[#6ec6ce] hover:bg-cyan-400/14 hover:border-cyan-400/30 hover:text-[#b0f0f8] transition-all duration-200 cursor-default"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="relative py-32 px-6 bg-[#050b14] overflow-hidden">
      <div className="absolute -top-40 left-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
      <div className="absolute top-20 right-[-120px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-teal-400/10 blur-[120px] rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 max-w-2xl mx-auto"
      >
        <span className="text-[11px] tracking-[4px] uppercase text-cyan-400/60 block mb-4">
          WHO I AM
        </span>
        <h2 className="font-['Syne'] text-6xl font-extrabold mb-6">
          <span className="text-white">About </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300">
            Me
          </span>
        </h2>
        <p className="text-[#7aa4ae] text-[15px] leading-relaxed">
          I build{" "}
          <span className="text-cyan-400">high-performance web apps</span>,
          scalable systems, and{" "}
          <span className="text-blue-400">conversion-focused experiences</span>.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[#89b6c2] leading-[1.9] mb-6">
            I turn{" "}
            <span className="text-cyan-300 font-medium">
              ideas into real-world products
            </span>
            . My approach blends performance, scalability, and modern UI/UX.
          </p>
          <p className="text-[#5f8b96] leading-[1.9] mb-10">
            From pixel-perfect frontends to robust backends — I build{" "}
            <span className="text-cyan-300 font-medium">
              complete, production-ready systems
            </span>
            .
          </p>

          {/* Badge with sweep */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 mb-12 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="w-[6px] h-[6px] bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#00ffff] flex-shrink-0" />
            <span className="relative z-10 text-sm tracking-wide">
              Available for Freelance Projects
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            {[
              { v: "3+", l: "Years" },
              { v: "20+", l: "Projects" },
              { v: "10+", l: "Clients" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(0,255,255,0.3)",
                  boxShadow: "0 12px 28px rgba(0,255,255,0.12)",
                }}
                className="flex-1 p-5 rounded-xl border border-cyan-400/10 bg-gradient-to-br from-white/[0.02] to-cyan-400/[0.02] text-center transition-all duration-300"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: i * 0.1 + 0.3 }}
                  className="text-3xl font-bold text-cyan-400 block mb-1"
                  style={{ textShadow: "0 0 20px rgba(0,255,255,0.5)" }}
                >
                  {s.v}
                </motion.span>
                <span className="text-xs text-[#5f8b96] uppercase tracking-[2px]">
                  {s.l}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-5"
        >
          {skills.map((sk, i) => (
            <SkillCard key={i} sk={sk} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
