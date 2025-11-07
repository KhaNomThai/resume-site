import { NavLink } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.25 });

  return (
    <div className="sticky top-0 z-40">
      {/* แถบ progress ตอนสกรอลล์ */}
      <motion.div
        className="h-0.5 origin-left bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500"
        style={{ scaleX: progress }}
      />

      <div className="backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,18,32,0.75)] bg-[rgba(11,18,32,0.9)] border-b border-[#1f2a44] shadow-[0_1px_0_0_rgba(31,42,68,0.6)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-gradient-to-br from-indigo-400/80 to-indigo-600/80 shadow-inner" />
              <span className="font-semibold text-lg text-white select-none">Kulachart Parnduangkeaw</span>
            </div>

            {/* เมนู: แคปซูลครอบข้อความพอดี + ไม่มีสกรอลล์บาร์ */}
            <nav className="relative">
              <ul className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[80vw] md:max-w-none">
                {links.map((l) => (
                  <li key={l.to} className="relative">
                    <NavLink to={l.to} end={l.exact}>
                      {({ isActive }) => (
                        <span
                          className={[
                            "relative inline-flex items-center rounded-full",
                            "px-4 py-2 text-base md:text-lg leading-none select-none transition-colors",
                            isActive ? "text-white" : "text-gray-300 hover:text-white/90",
                          ].join(" ")}
                        >
                          {/* Active pill ติดแนบพอดีกับตัวหนังสือ */}
                          {isActive && (
                            <motion.span
                              layoutId="nav-active-pill"
                              className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-inset ring-white/10"
                              transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.3 }}
                            />
                          )}
                          {l.label}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
