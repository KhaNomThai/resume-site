import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import avatarImg from "../assets/profile-320.webp";
import { SECTIONS } from "../config/sections";
import { profile } from "../data";

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 print:hidden"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
    >
      <motion.div
        aria-hidden="true"
        className="h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500"
        style={{ scaleX: progress }}
      />

      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled ? "bg-[#0b1220]/85 border-white/5 backdrop-blur-xl" : "bg-[#0b1220]/40 border-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* <a href="#..."> แทน <button onClick={scrollIntoView}>: smooth scroll มาจาก CSS,
              URL มี #hash แชร์ได้, ทำงานได้แม้ JS ยังไม่โหลด */}
          <a href="#hero" className="group flex shrink-0 items-center gap-2.5 rounded-full">
            <img
              src={avatarImg}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-indigo-500/40 group-hover:scale-110 transition"
            />
            <span className="sr-only sm:not-sr-only font-semibold text-white group-hover:text-indigo-300 transition-colors">
              {profile.shortName}
            </span>
          </a>

          {/* min-w-0 + overflow-x-auto: จอแคบเลื่อนเมนูได้ แทนที่จะโดนตัดหาย */}
          <nav aria-label="Main" className="min-w-0 overflow-x-auto [scrollbar-width:none]">
            <ul className="flex items-center gap-0.5">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block whitespace-nowrap rounded-full px-2.5 sm:px-3 py-1.5 text-sm leading-none text-gray-400 hover:text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
