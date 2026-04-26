import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import profileImg from "../assets/profile.jpg";

const links = [
  { to: "hero", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "experience", label: "Experience" },
  { to: "education", label: "Education" },
  { to: "contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });
  const [scrolled, setScrolled] = useState(false);

  /* Track if user has scrolled past hero */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
    >
      {/* แถบ progress */}
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500"
        style={{ scaleX: progress }}
      />

      <motion.div
        className="border-b transition-all duration-300"
        animate={{
          backgroundColor: scrolled ? "rgba(11,18,32,0.85)" : "rgba(11,18,32,0.4)",
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between">
            {/* Logo — profile photo + name */}
            <button
              onClick={() => handleClick("hero")}
              className="flex items-center gap-2.5 group"
            >
              <motion.img
                src={profileImg}
                alt="Profile"
                className="size-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-indigo-500/40 transition-all"
                whileHover={{ scale: 1.1 }}
              />
              <span className="font-semibold text-base text-white select-none hidden sm:inline group-hover:text-indigo-300 transition-colors">
                Kulachart
              </span>
            </button>

            {/* เมนู with active indicator */}
            <nav>
              <ul className="flex items-center gap-0.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <button
                      onClick={() => handleClick(l.to)}
                      className="relative inline-flex items-center rounded-full outline-none px-3 py-1.5 text-sm leading-none select-none cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      {/* Hover glow */}
                      <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
                      <span className="relative">{l.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
