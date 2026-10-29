import { useEffect, useMemo, useState } from "react";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/Toast";
import { ProjectFilterContext } from "./lib/projectFilter";
import ContactSection from "./sections/ContactSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

/**
 * Pure CSS animation บน transform อย่างเดียว (ทำงานบน compositor, ปิดเองเมื่อ prefers-reduced-motion — ดู index.css)
 * radial-gradient ฟุ้งในตัวอยู่แล้ว ไม่ต้องใช้ filter: blur / mix-blend ที่กิน GPU ทุกเฟรม
 */
function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden">
      <div className="absolute size-[44rem] animate-drift-1 rounded-full bg-[radial-gradient(circle,rgb(79_70_229/0.2),transparent_65%)]" />
      <div className="absolute size-[38rem] animate-drift-2 rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.14),transparent_65%)]" />
      <div className="absolute size-[40rem] animate-drift-3 rounded-full bg-[radial-gradient(circle,rgb(14_165_233/0.1),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: NOISE_SVG }} />
    </div>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tag, setTag] = useState<string | null>(null);
  const projectFilter = useMemo(() => ({ tag, setTag }), [tag]);

  // ⌘K (Mac) / Ctrl+K เปิด-ปิด command palette จากที่ไหนก็ได้
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openPalette = () => setPaletteOpen(true);

  return (
    <ToastProvider>
      <ProjectFilterContext.Provider value={projectFilter}>
        {/* overflow-x-clip (ไม่ใช่ hidden) → ไม่กลายเป็น scroll container จึงไม่ตัดเนื้อหาตอนพิมพ์ */}
        <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-ink text-white print:bg-white print:text-black">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <AnimatedBackground />

          <div className="relative z-10 flex flex-1 flex-col">
            <Navbar onOpenPalette={openPalette} />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              <HeroSection />
              <ProjectsSection />
              <ExperienceSection />
              <SkillsSection />
              <EducationSection />
              <ContactSection />
            </main>
            <Footer onOpenPalette={openPalette} />
          </div>

          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        </div>
      </ProjectFilterContext.Provider>
    </ToastProvider>
  );
}
