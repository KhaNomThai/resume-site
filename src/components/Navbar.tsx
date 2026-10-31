import { useEffect, useRef, useState } from "react";
import { SECTIONS, TOP_ID } from "../config/sections";
import { profile } from "../data";
import { CV_FILENAME, CV_URL } from "../lib/cv";
import { PALETTE_SHORTCUT } from "../lib/platform";
import { useTheme } from "../lib/theme";
import { useActiveSection } from "../lib/useActiveSection";
import Logo from "./Logo";
import { CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./icons";

/** ค่าคงที่ระดับ module → observer ของ scroll-spy ไม่ถูกสร้างใหม่ทุก render */
const SPY_IDS = [TOP_ID, ...SECTIONS.map((s) => s.id)];

/** ปุ่มไอคอนในแถบบน: 44×44px ตาม --target-min กดง่ายบนจอสัมผัส */
const ICON_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors duration-(--duration-fast) hover:bg-surface hover:text-ink";

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const active = useActiveSection(SPY_IDS);
  const { theme, toggle } = useTheme();

  // ด้านบนสุดแถบโปร่งให้เห็นกระดาษกราฟของ hero พอเลื่อนลงจึงมีพื้นและเส้นแบ่ง
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const dark = theme === "dark";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-(--duration-base) print:hidden ${
        solid ? "border-rule bg-paper" : "border-transparent"
      }`}
    >
      <div className="page-container flex h-(--nav-height) items-center justify-between gap-3">
        {/* lockup ตาม DESIGN_SYSTEM.md: logo 32px + ชื่อ serif 500 ขนาด 21px ห่าง space-3 */}
        <a href={`#${TOP_ID}`} onClick={closeMenu} className="flex shrink-0 items-center gap-3 rounded-control text-ink">
          <Logo className="size-8" />
          <span className="font-serif text-21 font-medium leading-7">{profile.firstName}</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="block rounded-control px-3 py-2 type-small text-ink-muted decoration-margin decoration-2 underline-offset-8 transition-colors duration-(--duration-fast) hover:text-ink aria-[current=true]:text-ink aria-[current=true]:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={onOpenPalette} aria-keyshortcuts="Meta+K Control+K" className={ICON_BUTTON}>
            <SearchIcon className="size-5" />
            <span className="sr-only">Search and quick actions ({PALETTE_SHORTCUT})</span>
          </button>
          {/* toggle button: aria-pressed บอกสถานะ ส่วนชื่อปุ่มคงที่ ("Dark theme") ตามแนวทาง WAI-ARIA */}
          <button type="button" onClick={toggle} aria-pressed={dark} className={ICON_BUTTON}>
            {dark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
            <span className="sr-only">Dark theme</span>
          </button>
          <a
            href={CV_URL}
            download={CV_FILENAME}
            className="ml-2 hidden h-11 items-center gap-2 rounded-control bg-pen px-4 type-label text-on-pen transition-colors duration-(--duration-fast) hover:bg-pen-hover sm:inline-flex"
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
            className={`${ICON_BUTTON} lg:hidden`}
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* render ไว้ตลอด (ซ่อนด้วย hidden) → aria-controls ชี้ไปยัง element ที่มีอยู่จริง */}
      <nav id="mobile-menu" aria-label="Mobile" hidden={!menuOpen} className="border-t border-rule lg:hidden">
        <div className="page-container pb-4 pt-2">
          <ul className="grid">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={closeMenu}
                  aria-current={active === id ? "true" : undefined}
                  className="flex min-h-11 items-center rounded-control px-3 type-body text-ink hover:bg-surface aria-[current=true]:font-semibold"
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
            className="mt-3 flex h-11 items-center justify-center gap-2 rounded-control bg-pen type-label text-on-pen sm:hidden"
          >
            <DownloadIcon className="size-4" />
            Download resume (PDF)
          </a>
        </div>
      </nav>
    </header>
  );
}
