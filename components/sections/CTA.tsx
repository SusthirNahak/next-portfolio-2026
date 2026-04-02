"use client";

export default function CTA() {
return ( <section className="py-32 bg-black">


  <div className="max-w-5xl mx-auto px-6">
    <div
      className="
      rounded-3xl p-16 text-center
      bg-gradient-to-br from-[#0f172a] to-[#020617]
      border border-white/10
      relative overflow-hidden
    "
    >
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Interested in Working Together?
      </h2>

      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Let’s build something impactful, scalable, and high-performance.
      </p>

      <button
        className="
        px-8 py-4 rounded-full 
        bg-cyan-500 hover:bg-cyan-400
        text-black font-semibold
        shadow-lg shadow-cyan-500/30
        transition
      "
      >
        Start Your Project
      </button>
    </div>
  </div>

</section>


);
}
