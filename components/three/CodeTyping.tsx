"use client";

import { useEffect, useState } from "react";

const codeLines = [
  `<span class="text-purple-400">const</span> <span class="text-cyan-400">developer</span> = {`,
  `  <span class="text-cyan-300">name</span>: <span class="text-green-400">"Susthir"</span>,`,
  `  <span class="text-cyan-300">role</span>: <span class="text-green-400">"Fullstack Software Engineer"</span>,`,
  `  <span class="text-cyan-300">experience</span>: <span class="text-orange-400">3</span>,`,
  `  <span class="text-cyan-300">skills</span>: [<span class="text-green-400">"Next.js"</span>, <span class="text-green-400">"WordPress"</span>, <span class="text-green-400">"Shopify"</span>],`,
  `  <span class="text-cyan-300">available</span>: <span class="text-blue-400">true</span>,`,
  `};`,
  ``,
  `<span class="text-cyan-400">developer</span>.<span class="text-yellow-400">susthirDev</span>();`,
];

export default function CodeTyping() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, codeLines[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, 400);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setDisplayedLines([]);
        setLineIndex(0);
      }, 2000);
    }
  }, [lineIndex]);

  return (
    <div className="text-sm font-mono leading-6">
      {displayedLines.map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  );
}
