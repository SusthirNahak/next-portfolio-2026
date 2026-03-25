"use client";

import CodeTyping from "./CodeTyping";

export default function CodeEditor() {
  return (
    <div className="w-[460px] h-[300px] rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <span className="text-xs text-gray-400">developer.tsx</span>
      </div>

      {/* BODY */}
      <div className="flex h-full">
        {/* SIDEBAR */}
        <div className="w-10 bg-[#020617] border-r border-white/5 flex flex-col items-center py-3 gap-4 text-gray-500 text-xs">
          <span>📁</span>
          <span>🔍</span>
          <span>⚙️</span>
        </div>

        {/* CODE AREA */}
        <div className="flex-1 p-4 overflow-hidden">
          <CodeTyping />
        </div>
      </div>
    </div>
  );
}
