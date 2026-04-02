"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Lisa Redfern",
    role: "Product Manager",
    text: "Working with Susthir was a game-changer. Clean code, fast delivery, and amazing UI sense.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Alex Rivera",
    role: "CTO",
    text: "Highly professional and extremely reliable. Delivered beyond expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sofia Patel",
    role: "Founder",
    text: "Amazing experience. The product quality and performance were top-notch.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Carlos Gomez",
    role: "Head of R&D",
    text: "Strong technical skills and great communication throughout the project.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Linda Wu",
    role: "VP Operations",
    text: "Efficiency and execution were outstanding. Would definitely work again.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* BACKGROUND GLOW */}{" "}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-3xl" />
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">
          Client <span className="text-cyan-400">Feedback</span>
        </h2>

        {/* MAIN CARD */}
        <div className="relative flex justify-center items-center">
          {/* LEFT AVATARS */}
          <div className="hidden md:flex flex-col gap-6 absolute left-0">
            {testimonials.slice(1, 3).map((t, i) => (
              <img
                key={i}
                src={t.image}
                className="w-14 h-14 rounded-full opacity-40 blur-[1px] hover:opacity-100 hover:blur-0 transition"
              />
            ))}
          </div>

          {/* RIGHT AVATARS */}
          <div className="hidden md:flex flex-col gap-6 absolute right-0">
            {testimonials.slice(3, 5).map((t, i) => (
              <img
                key={i}
                src={t.image}
                className="w-14 h-14 rounded-full opacity-40 blur-[1px] hover:opacity-100 hover:blur-0 transition"
              />
            ))}
          </div>

          {/* CENTER CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-xl p-8 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-[0_0_60px_rgba(0,255,255,0.1)]"
          >
            <img
              src={testimonials[0].image}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-cyan-400"
            />

            <h3 className="text-xl font-semibold">{testimonials[0].name}</h3>
            <p className="text-sm text-gray-400 mb-4">{testimonials[0].role}</p>

            <p className="text-gray-300 leading-relaxed">
              “{testimonials[0].text}”
            </p>
          </motion.div>
        </div>

        {/* SLIDER ROWS */}
        <div className="mt-20 space-y-6 overflow-hidden">
          {/* ROW 1 */}
          <div className="flex gap-6 animate-scroll">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[250px] p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg"
              >
                <p className="text-sm text-gray-300">{t.text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <img src={t.image} className="w-8 h-8 rounded-full" />
                  <span className="text-xs text-gray-400">{t.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2 (reverse) */}
          <div className="flex gap-6 animate-scroll-reverse">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[250px] p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg"
              >
                <p className="text-sm text-gray-300">{t.text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <img src={t.image} className="w-8 h-8 rounded-full" />
                  <span className="text-xs text-gray-400">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
