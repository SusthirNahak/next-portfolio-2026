import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import About from "@/components/sections/About";
import OpenSource from "@/components/sections/OpenSource";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";
import VisualStrip from "@/components/sections/VisualStrip";
import AIChatBot from "@/components/sections/AIChatBot";
export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <VisualStrip />
      <About />

      <Experience />
      <Projects />
      <OpenSource />

      <Skills />

      <Testimonials />
      <CTA />
      <Footer />
      <AIChatBot />
    </main>
  );
}
