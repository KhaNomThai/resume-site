import { m, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import avatarImg from "../assets/profile-320.webp";
import { SECTIONS, TOP_ID } from "../config/sections";
import { profile } from "../data";
import { CV_FILENAME, CV_URL } from "../lib/cv";
import { EASE_OUT } from "../lib/motion";
import { PALETTE_SHORTCUT } from "../lib/platform";
import { useActiveSection } from "../lib/useActiveSection";
import { CloseIcon, DownloadIcon, MenuIcon, SearchIcon } from "./icons";

/** ค่าคงที่ระดับ module → observer ของ scroll-spy ไม่ถูกสร้างใหม่ทุก render */
const SPY_IDS = [TOP_ID, ...SECTIONS.map((s) => s.id)];

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  const active = useActiveSection(SPY_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // เมนูมือถือ: ปิดเมื่อกด Esc หรือแตะนอก header
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <m.header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 print:hidden"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <m.div
        aria-hidden="true"
        className="h-0.5 origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400"
        style={{ scaleX: progress }}
      />

      <div
        className={`border-b transition-[background-color,border-color] duration-300 ${
          solid ? "border-white/[0.06] bg-ink/85 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href={`#${TOP_ID}`} onClick={closeMenu} className="group flex shrink-0 items-center gap-2.5 rounded-full">
            <img
              src={avatarImg}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover ring-2 ring-white/10 transition group-hover:ring-indigo-400/50"
            />
            <span className="font-semibold tracking-tight text-white">{profile.firstName}</span>
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-full px-3 py-1.5 text-sm transition-colors ${
                        isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-keyshortcuts="Meta+K Control+K"
              className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-white"
            >
              <SearchIcon className="size-4" />
              <span className="sr-only">Search and quick actions</span>
              <kbd aria-hidden="true" className="hidden text-xs sm:inline">
                {PALETTE_SHORTCUT}
              </kbd>
            </button>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              className="hidden h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-indigo-100 lg:flex"
            >
              <DownloadIcon className="size-4" />
              Resume
              <span className="sr-only">(PDF)</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-gray-200 transition-colors hover:border-white/20 md:hidden"
            >
              {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>

        {/* render ไว้ตลอด (ซ่อนด้วย hidden) → aria-controls ชี้ไปยัง element ที่มีอยู่จริง */}
        <nav id="mobile-menu" aria-label="Mobile" hidden={!menuOpen} className="border-t border-white/[0.06] px-4 pb-4 pt-2 md:hidden">
          <ul className="grid gap-1">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  aria-current={active === id ? "true" : undefined}
                  className={`block rounded-xl px-3 py-3 text-base transition-colors ${
                    active === id ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CV_URL}
            download={CV_FILENAME}
            onClick={closeMenu}
            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-ink"
          >
            <DownloadIcon className="size-4" />
            Download CV
            <span className="sr-only">(PDF)</span>
          </a>
        </nav>
      </div>
    </m.header>
  );
}
