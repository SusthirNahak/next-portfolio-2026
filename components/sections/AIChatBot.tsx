"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const SUGGESTED = ["Experience", "Projects", "Skills", "Open Source"];

const SYSTEM_PROMPT = `You are Susthir's AI portfolio assistant — sharp, confident, and a little playful.
Susthir is a Full Stack Developer specializing in Next.js, React, WordPress, and Shopify.
He builds high-performance web apps, scalable eCommerce platforms, and conversion-driven experiences.
Tech stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, WordPress, Shopify, Framer Motion, GSAP, Three.js.
He is available for freelance work. Keep answers concise (2-4 sentences max). Be enthusiastic about his work.
If asked anything unrelated to Susthir or web dev, redirect warmly back to his portfolio.`;

// ─── Dancing Orb (pure CSS/SVG, no Three.js needed) ───────────────────────
function DancingOrb({ isThinking }: { isThinking: boolean }) {
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-1 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Core orb */}
      <motion.div
        className="absolute inset-2 rounded-full overflow-hidden"
        animate={
          isThinking
            ? { scale: [1, 1.15, 0.9, 1.1, 1], rotate: [0, 10, -10, 5, 0] }
            : { y: [0, -4, 0, -2, 0], rotate: [0, 3, 0, -3, 0] }
        }
        transition={{
          duration: isThinking ? 0.8 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "conic-gradient(from 0deg, #8b5cf6, #22d3ee, #3b82f6, #a855f7, #8b5cf6)",
          boxShadow:
            "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(34,211,238,0.3)",
        }}
      >
        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Liquid blobs */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-cyan-300/60"
          style={{ top: "20%", left: "20%" }}
          animate={{
            x: [0, 4, -2, 0],
            y: [0, -3, 4, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-purple-200/60"
          style={{ bottom: "25%", right: "20%" }}
          animate={{
            x: [0, -3, 2, 0],
            y: [0, 3, -2, 0],
            scale: [1, 0.7, 1.2, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </motion.div>

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "20px 0px",
          marginTop: "-3px",
          marginLeft: "-3px",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        data-orbit
      />
    </div>
  );
}

// ─── Typing indicator ──────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-purple-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}
    >
      {!isUser && (
        <div
          className="w-6 h-6 rounded-full flex-shrink-0 mb-0.5 overflow-hidden"
          style={{
            background:
              "conic-gradient(from 0deg, #8b5cf6, #22d3ee, #3b82f6, #8b5cf6)",
            boxShadow: "0 0 8px rgba(139,92,246,0.5)",
          }}
        ></div>
      )}
      <div
        className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
        style={
          isUser
            ? {
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#fff",
                borderBottomRightRadius: 4,
                boxShadow: "0 4px 15px rgba(124,58,237,0.35)",
              }
            : {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
                borderBottomLeftRadius: 4,
                backdropFilter: "blur(10px)",
              }
        }
      >
        {msg.content}
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full flex-shrink-0 mb-0.5 flex items-center justify-center text-[10px] font-bold bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          U
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm Susthir's AI assistant. Ask me anything about his skills, projects, or experience!",
      id: "init",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  async function sendMessage(text: string) {
    if (!text.trim() || isThinking) return;
    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply =
        data?.content?.[0]?.text ?? "Hmm, something went wrong. Try again!";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, id: Date.now().toString() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Hit a snag. Check your connection and try again.",
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <>
      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .chatbot-root * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
        .chatbot-scroll::-webkit-scrollbar { width: 4px; }
        .chatbot-scroll::-webkit-scrollbar-track { background: transparent; }
        .chatbot-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 4px; }
        .chatbot-input::placeholder { color: rgba(148,163,184,0.5); }
        .chatbot-input:focus { outline: none; }
        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(34,211,238,0.3); }
          50% { box-shadow: 0 0 30px rgba(139,92,246,0.9), 0 0 60px rgba(34,211,238,0.5); }
        }
      `}</style>

      <div className="chatbot-root">
        {/* ── CHAT PANEL ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
                transformOrigin: "bottom right",
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-5 z-50 w-[360px] flex flex-col"
              style={{
                height: 520,
                borderRadius: 20,
                background:
                  "linear-gradient(145deg, rgba(10,10,30,0.97) 0%, rgba(15,8,40,0.97) 100%)",
                border: "1px solid rgba(139,92,246,0.2)",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                overflow: "hidden",
              }}
            >
              {/* Ambient background */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -40,
                    left: -40,
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* ── HEADER ── */}
              <div
                className="relative z-10 flex items-center gap-3 px-4 py-3.5"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <DancingOrb isThinking={isThinking} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm tracking-tight">
                    Susthir's AI
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <span className="text-[11px] text-emerald-400/80">
                      {isThinking ? "Thinking..." : "Online · Instant reply"}
                    </span>
                  </div>
                </div>
                {/* Minimize */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                  style={{ color: "rgba(148,163,184,0.6)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                  style={{ color: "rgba(148,163,184,0.6)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 2l10 10M12 2L2 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* ── MESSAGES ── */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 chatbot-scroll">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 items-end"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #8b5cf6, #22d3ee, #3b82f6, #8b5cf6)",
                      }}
                    />
                    <div
                      className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── SUGGESTED TOPICS ── */}
              <div
                className="relative z-10 px-4 pb-2 flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {SUGGESTED.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => sendMessage(topic)}
                    className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: "rgba(196,181,253,0.9)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* ── INPUT ── */}
              <div className="relative z-10 px-4 pb-4">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    boxShadow: input
                      ? "0 0 0 2px rgba(139,92,246,0.15)"
                      : "none",
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Ask me anything..."
                    className="chatbot-input flex-1 bg-transparent text-sm text-slate-200 min-w-0"
                    style={{ fontSize: 13.5 }}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isThinking}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background:
                        input.trim() && !isThinking
                          ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                          : "rgba(255,255,255,0.06)",
                      boxShadow:
                        input.trim() && !isThinking
                          ? "0 4px 15px rgba(124,58,237,0.4)"
                          : "none",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M12 7L2 2l2.5 5L2 12l10-5z"
                        fill="white"
                        fillOpacity={input.trim() && !isThinking ? 1 : 0.3}
                      />
                    </svg>
                  </motion.button>
                </div>
                <p
                  className="text-center mt-2 text-[10px]"
                  style={{ color: "rgba(100,116,139,0.6)" }}
                >
                  Susthir's Portfolio AI
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FAB TRIGGER BUTTON ── */}
        <motion.button
          onClick={() => setIsOpen((o) => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)",
            boxShadow:
              "0 8px 32px rgba(124,58,237,0.5), 0 0 0 1px rgba(139,92,246,0.3)",
          }}
        >
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(139,92,246,0.4)" }}
            animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(34,211,238,0.3)" }}
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  d="M11 2C6.03 2 2 5.8 2 10.5c0 2.1.82 4.02 2.17 5.5L3 20l4.5-1.3C8.9 19.54 9.93 19.75 11 19.75 15.97 19.75 20 15.95 20 11.25 20 6.55 15.97 2.75 11 2.75z"
                  fill="white"
                />
                <circle cx="8" cy="11" r="1" fill="rgba(124,58,237,0.8)" />
                <circle cx="11" cy="11" r="1" fill="rgba(124,58,237,0.8)" />
                <circle cx="14" cy="11" r="1" fill="rgba(124,58,237,0.8)" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
