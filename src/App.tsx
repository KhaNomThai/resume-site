import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";

/**
 * Animated background with continuously moving blobs.
 * Pure CSS animations — always alive regardless of scroll.
 */
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blob 1: indigo — drifts upper-left area */}
      <div
        className="absolute w-[36rem] h-[36rem] rounded-full mix-blend-screen filter blur-[140px] animate-drift-1"
        style={{ background: "radial-gradient(circle, hsla(240, 60%, 50%, 0.22), transparent 70%)" }}
      />

      {/* Blob 2: purple — drifts right area */}
      <div
        className="absolute w-[30rem] h-[30rem] rounded-full mix-blend-screen filter blur-[120px] animate-drift-2"
        style={{ background: "radial-gradient(circle, hsla(270, 55%, 50%, 0.18), transparent 70%)" }}
      />

      {/* Blob 3: blue — drifts bottom area */}
      <div
        className="absolute w-[32rem] h-[32rem] rounded-full mix-blend-screen filter blur-[130px] animate-drift-3"
        style={{ background: "radial-gradient(circle, hsla(220, 60%, 45%, 0.16), transparent 70%)" }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-dvh text-white bg-[#0b1220] overflow-x-hidden flex flex-col">
      <AnimatedBackground />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <style>{`@media print { nav, footer { display: none !important } section { page-break-inside: avoid } body { background: white !important; color: black !important } }`}</style>
    </div>
  );
}