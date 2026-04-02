"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Syntax-highlighted code lines (raw HTML strings) ─────────────────────
const CODE_LINES = [
  `<span class="cmt">// ✦ Susthir — Full Stack Developer</span>`,
  ``,
  `<span class="kw">import</span> <span class="op">{</span> <span class="fn">motion</span> <span class="op">}</span> <span class="kw">from</span> <span class="str">"framer-motion"</span><span class="op">;</span>`,
  `<span class="kw">import</span> <span class="op">{</span> <span class="fn">NextJS</span><span class="op">,</span> <span class="fn">Shopify</span> <span class="op">}</span> <span class="kw">from</span> <span class="str">"@skills"</span><span class="op">;</span>`,
  ``,
  `<span class="kw">const</span> <span class="cls">Developer</span> <span class="op">=</span> <span class="op">()</span> <span class="op">=></span> <span class="op">{</span>`,
  `  <span class="kw">const</span> <span class="var">skills</span> <span class="op">=</span> <span class="op">[</span>`,
  `    <span class="str">"Next.js"</span><span class="op">,</span> <span class="str">"React"</span><span class="op">,</span>`,
  `    <span class="str">"WordPress"</span><span class="op">,</span> <span class="str">"Shopify"</span>`,
  `  <span class="op">];</span>`,
  ``,
  `  <span class="kw">return</span> <span class="op">(</span>`,
  `    <span class="op">&lt;</span><span class="tag">motion.div</span>`,
  `      <span class="attr">animate</span><span class="op">={{</span> <span class="prop">scale</span><span class="op">:</span> <span class="num">1</span><span class="op">,</span> <span class="prop">y</span><span class="op">:</span> <span class="num">0</span> <span class="op">}}</span>`,
  `      <span class="attr">className</span><span class="op">=</span><span class="str">"hero"</span>`,
  `    <span class="op">&gt;</span>`,
  `      <span class="op">&lt;</span><span class="tag">h1</span><span class="op">&gt;</span><span class="cyan">Susthir</span><span class="op">&lt;/</span><span class="tag">h1</span><span class="op">&gt;</span>`,
  `    <span class="op">&lt;/</span><span class="tag">motion.div</span><span class="op">&gt;</span>`,
  `  <span class="op">);</span>`,
  `<span class="op">};</span>`,
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function getPlainLength(html: string): number {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, "").length;
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent?.length ?? 0;
}

function clipHtmlToChars(html: string, maxChars: number): string {
  let charCount = 0;
  let result = "";
  let i = 0;
  const openTags: string[] = [];

  while (i < html.length && charCount < maxChars) {
    if (html[i] === "<") {
      const tagEnd = html.indexOf(">", i);
      if (tagEnd === -1) break;
      const tag = html.slice(i, tagEnd + 1);
      result += tag;
      if (!tag.startsWith("</") && !tag.endsWith("/>")) {
        const name = tag.match(/<(\w+)/)?.[1];
        if (name) openTags.push(name);
      } else if (tag.startsWith("</")) {
        openTags.pop();
      }
      i = tagEnd + 1;
    } else if (html[i] === "&") {
      const entityEnd = html.indexOf(";", i);
      if (entityEnd !== -1 && entityEnd - i < 8) {
        result += html.slice(i, entityEnd + 1);
        charCount++;
        i = entityEnd + 1;
      } else {
        result += html[i];
        charCount++;
        i++;
      }
    } else {
      result += html[i];
      charCount++;
      i++;
    }
  }

  for (let t = openTags.length - 1; t >= 0; t--) {
    result += `</${openTags[t]}>`;
  }
  return result;
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function CodeEditor() {
  const [displayLines, setDisplayLines] = useState<string[]>(
    Array(CODE_LINES.length).fill("")
  );
  const [activeLine, setActiveLine] = useState(0);
  const [col, setCol] = useState(1);
  const [showCursorOnLine, setShowCursorOnLine] = useState(0);

  const stateRef = useRef({
    phase: "typing" as "typing" | "pause" | "erasing",
    line: 0,
    char: 0,
    pauseCount: 0,
  });

  useEffect(() => {
    const TYPING_SPEED = 38;
    const PAUSE_FRAMES = 90;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      const s = stateRef.current;

      if (s.phase === "pause") {
        s.pauseCount++;
        if (s.pauseCount > PAUSE_FRAMES) {
          s.phase = "erasing";
          s.pauseCount = 0;
        }
        timer = setTimeout(step, 16);
        return;
      }

      if (s.phase === "erasing") {
        setDisplayLines((prev) => {
          const next = [...prev];
          if (s.line > 0) {
            next[s.line] = "";
            s.line--;
            s.char = getPlainLength(CODE_LINES[s.line]);
          } else {
            if (s.char > 0) {
              s.char--;
              next[s.line] = clipHtmlToChars(CODE_LINES[s.line], s.char);
            } else {
              s.phase = "typing";
              s.line = 0;
              s.char = 0;
            }
          }
          return next;
        });
        setActiveLine(s.line);
        setShowCursorOnLine(s.line);
        setCol(s.char + 1);
        timer = setTimeout(step, s.phase === "erasing" ? 10 : TYPING_SPEED);
        return;
      }

      // TYPING
      if (s.line >= CODE_LINES.length) {
        s.phase = "pause";
        timer = setTimeout(step, 16);
        return;
      }

      const raw = CODE_LINES[s.line];

      if (raw === "") {
        setDisplayLines((prev) => {
          const next = [...prev];
          next[s.line] = "";
          return next;
        });
        s.line++;
        s.char = 0;
        setActiveLine(s.line);
        setShowCursorOnLine(s.line);
        timer = setTimeout(step, TYPING_SPEED * 2);
        return;
      }

      const lineLen = getPlainLength(raw);

      if (s.char <= lineLen) {
        const partial = clipHtmlToChars(raw, s.char);
        setDisplayLines((prev) => {
          const next = [...prev];
          next[s.line] = partial;
          return next;
        });
        setActiveLine(s.line);
        setShowCursorOnLine(s.line);
        setCol(s.char + 1);

        if (s.char < lineLen) {
          s.char++;
        } else {
          s.line++;
          s.char = 0;
        }
      }

      timer = setTimeout(step, TYPING_SPEED);
    }

    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, []);

  const minimap = Array.from({ length: CODE_LINES.length }, (_, i) => ({
    width: 20 + ((i * 13 + 7) % 30),
    isCyan: i % 5 === 0 || i % 7 === 2,
  }));

  return (
    <motion.div
      className="relative w-[480px]"
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── AMBIENT GLOW ── */}
      <motion.div
        className="absolute inset-[-40px] pointer-events-none z-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── EDITOR SHELL ── */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 0 1px rgba(34,211,238,0.05), 0 25px 50px rgba(0,0,0,0.8), 0 0 80px rgba(34,211,238,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
          background: "#0d1117",
        }}
      >
        {/* Corner accents */}
        {["tl", "tr", "bl", "br"].map((c) => (
          <span
            key={c}
            className="absolute pointer-events-none z-20"
            style={{
              width: 16,
              height: 16,
              top: c.includes("t") ? -1 : "auto",
              bottom: c.includes("b") ? -1 : "auto",
              left: c.includes("l") ? -1 : "auto",
              right: c.includes("r") ? -1 : "auto",
              borderTop: c.includes("t") ? "2px solid rgba(34,211,238,0.5)" : "none",
              borderBottom: c.includes("b") ? "2px solid rgba(34,211,238,0.5)" : "none",
              borderLeft: c.includes("l") ? "2px solid rgba(34,211,238,0.5)" : "none",
              borderRight: c.includes("r") ? "2px solid rgba(34,211,238,0.5)" : "none",
            }}
          />
        ))}

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)",
          }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* ── TITLE BAR ── */}
        <div
          className="flex items-center justify-between px-4 py-3 relative"
          style={{
            background: "linear-gradient(180deg, #161b27 0%, #0f1520 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* After line glow */}
          <div
            className="absolute bottom-0 left-4 right-4 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(59,130,246,0.3), transparent)",
            }}
          />

          {/* Traffic lights */}
          <div className="flex gap-[7px]">
            {[
              { bg: "#ff5f57", shadow: "rgba(255,95,87,0.5)" },
              { bg: "#febc2e", shadow: "rgba(254,188,46,0.5)" },
              { bg: "#28c840", shadow: "rgba(40,200,64,0.5)" },
            ].map((dot, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: dot.bg,
                  boxShadow: `0 0 6px ${dot.shadow}`,
                }}
              />
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 absolute left-1/2 -translate-x-1/2">
            {["portfolio.tsx", "utils.ts"].map((tab, i) => (
              <div
                key={tab}
                className="text-[11px] px-3 py-1 rounded-md font-mono"
                style={
                  i === 0
                    ? {
                        background: "rgba(34,211,238,0.08)",
                        color: "#22d3ee",
                        border: "1px solid rgba(34,211,238,0.15)",
                      }
                    : { color: "#475569" }
                }
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Running badge */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            running
          </div>
        </div>

        {/* ── EDITOR BODY ── */}
        <div className="flex" style={{ height: 300 }}>
          {/* Line numbers */}
          <div
            className="w-11 py-4 flex flex-col items-center font-mono text-[11px] select-none"
            style={{
              background: "rgba(0,0,0,0.2)",
              borderRight: "1px solid rgba(255,255,255,0.04)",
              lineHeight: "20px",
              gap: 0,
            }}
          >
            {CODE_LINES.map((_, i) => (
              <div
                key={i}
                className="w-full text-center transition-colors duration-150"
                style={{
                  height: 20,
                  lineHeight: "20px",
                  color: i === activeLine ? "#22d3ee" : "#2d3748",
                  background:
                    i === activeLine ? "rgba(34,211,238,0.05)" : "transparent",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1 py-4 px-3 overflow-hidden relative">
            {/* Active line bg */}
            <div
              className="absolute left-0 right-0 h-5 transition-all duration-150 pointer-events-none"
              style={{
                top: 16 + activeLine * 20,
                background: "rgba(34,211,238,0.04)",
                borderLeft: "2px solid rgba(34,211,238,0.4)",
              }}
            />

            {displayLines.map((html, i) => (
              <div
                key={i}
                className="code-line font-mono text-[12.5px] whitespace-pre"
                style={{ height: 20, lineHeight: "20px" }}
              >
                <span dangerouslySetInnerHTML={{ __html: html }} />
                {i === showCursorOnLine && (
                  <span className="code-cursor" />
                )}
              </div>
            ))}
          </div>

          {/* Minimap */}
          <div
            className="w-12 py-4 px-1 opacity-40"
            style={{
              background: "rgba(0,0,0,0.3)",
              borderLeft: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            {minimap.map((m, i) => (
              <div
                key={i}
                className="h-[2px] mb-[3px] rounded-sm"
                style={{
                  width: m.width,
                  background: m.isCyan
                    ? "rgba(34,211,238,0.25)"
                    : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── STATUS BAR ── */}
        <div
          className="flex items-center justify-between px-4 py-1.5 font-mono text-[10px]"
          style={{
            background: "linear-gradient(180deg, #0a0f1a 0%, #060b14 100%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            color: "#3d4f69",
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "#7c9fd4" }}>⎇ main</span>
            <span>TypeScript React</span>
            <span style={{ color: "#4ec9b0" }}>TS 5.0</span>
          </div>
          <span>
            Ln {activeLine + 1}, Col {col}
          </span>
        </div>
      </div>

      {/* ── SYNTAX HIGHLIGHT STYLES ── */}
      <style>{`
        .code-line .cmt { color: #546e7a; font-style: italic; }
        .code-line .kw  { color: #c792ea; }
        .code-line .fn  { color: #82aaff; }
        .code-line .str { color: #c3e88d; }
        .code-line .num { color: #f78c6c; }
        .code-line .type{ color: #ffcb6b; }
        .code-line .cls { color: #ffcb6b; }
        .code-line .var { color: #eeffff; }
        .code-line .op  { color: #89ddff; }
        .code-line .prop{ color: #f07178; }
        .code-line .tag { color: #f07178; }
        .code-line .attr{ color: #c792ea; }
        .code-line .cyan{ color: #22d3ee; }
        .code-cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          vertical-align: middle;
          margin-left: 1px;
          background: #22d3ee;
          box-shadow: 0 0 6px rgba(34,211,238,0.8);
          animation: cursorBlink 1s step-end infinite;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}