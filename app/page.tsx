import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* HERO */}
      <Hero />

      {/* STATS */}
      <Stats />

      {/* PROCESS */}
      <Process />

      {/* PROJECTS */}
      <Projects />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA */}
      <CTA />
    </main>
  );
}
