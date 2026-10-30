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
        <div className="relative flex min-h-dvh flex-col overflow-x-clip bg-paper text-ink">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-control focus:bg-pen focus:px-4 focus:py-3 focus:type-label focus:text-on-pen"
          >
            Skip to content
          </a>
          {/* เส้น margin สีแดงของหน้าสมุด: อยู่เหนือ navbar (z สูงกว่า) เส้นจึงต่อกันตลอดหน้า และไม่รับการคลิก */}
          <div aria-hidden="true" className="margin-line z-[60] print:hidden" />

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

          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        </div>
      </ProjectFilterContext.Provider>
    </ToastProvider>
  );
}
