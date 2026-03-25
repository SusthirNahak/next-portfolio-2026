const testimonials = [
  {
    name: "Client Name",
    text: "Susthir delivered beyond expectations. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">What Clients Say</h2>

      {testimonials.map((t, i) => (
        <div
          key={i}
          className="p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-gray-300">"{t.text}"</p>
          <h4 className="mt-4 text-cyan-400">{t.name}</h4>
        </div>
      ))}
    </section>
  );
}
