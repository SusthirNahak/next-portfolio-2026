const steps = [
  "Discovery & Strategy",
  "Design & Wireframes",
  "Development",
  "Launch & Optimization",
];

export default function Process() {
  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl font-bold mb-12">My Process</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5"
          >
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}
