"use client";
import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full z-10"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
      }}
    />
  );
}
