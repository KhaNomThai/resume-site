import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { profile } from "../data";
import profileImg from "../assets/profile.jpg";

/* ── Typewriter effect ── */
function Typewriter({ text, delay = 1000 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <motion.span
          className="inline-block w-[2px] h-[1.1em] bg-indigo-400 ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

/* ── Tech stack marquee ── */
const TECH_ICONS = [
  { name: "React", folder: "react", file: "react-original" },
  { name: "TypeScript", folder: "typescript", file: "typescript-original" },
  { name: "JavaScript", folder: "javascript", file: "javascript-original" },
  { name: "Python", folder: "python", file: "python-original" },
  { name: "Java", folder: "java", file: "java-original" },
  { name: "Tailwind", folder: "tailwindcss", file: "tailwindcss-original" },
  { name: "Node.js", folder: "nodejs", file: "nodejs-original" },
  { name: "Firebase", folder: "firebase", file: "firebase-original" },
  { name: "Git", folder: "git", file: "git-original" },
  { name: "Figma", folder: "figma", file: "figma-original" },
];

function TechMarquee() {
  const icons = [...TECH_ICONS, ...TECH_ICONS]; // duplicate for seamless loop
  return (
    <div className="w-full max-w-lg overflow-hidden relative py-4">
      <motion.div
        className="flex items-center gap-8"
        animate={{ x: [0, -(TECH_ICONS.length * 56)] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((t, i) => (
          <div key={i} className="flex-shrink-0 flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${t.folder}/${t.file}.svg`}
              alt={t.name}
              width={24}
              height={24}
              loading="lazy"
              className="border-0 outline-none"
              style={{ border: "none" }}
            />
            <span className="text-xs text-gray-400 whitespace-nowrap">{t.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Floating decorative shapes ── */
function Shapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
        animate={{ x: [-50, 50, -50], opacity: [0, 0.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-24 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        animate={{ x: [30, -30, 30], opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden snap-section"
    >
      <Shapes />

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-5xl mx-auto px-6 w-full transform-gpu"
      >
        <div className="flex flex-col items-center text-center gap-6 py-16">
          {/* ── Profile Image ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
          >
            <div
              className="absolute -inset-3 rounded-full opacity-40"
              style={{
                background: "conic-gradient(from 180deg, rgba(99,102,241,0.5), rgba(168,85,247,0.35), rgba(59,130,246,0.4), rgba(99,102,241,0.5))",
              }}
            />
            <div className="absolute -inset-3 rounded-full bg-[#0b1220]/80" />
            <motion.div
              className="absolute -inset-5 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={profileImg}
              alt={`Portrait of ${profile.name}`}
              className="relative size-32 md:size-40 rounded-full ring-2 ring-white/15 object-cover shadow-2xl"
              whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          </motion.div>

          {/* ── Name ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
              {profile.name}
            </h1>
          </motion.div>

          {/* ── Role with Typewriter ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/50" />
            <p className="text-lg md:text-2xl text-indigo-300 font-medium">
              <Typewriter text={profile.role} delay={900} />
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-400/50" />
          </motion.div>

          {/* ── Location ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-sm text-gray-400 flex items-center justify-center gap-1.5 -mt-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
            {profile.location}
          </motion.p>

          {/* ── Summary ── */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300 font-light"
          >
            {profile.summary}
          </motion.p>

          {/* ── Tech Stack Marquee ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-2"
          >
            <TechMarquee />
          </motion.div>

          {/* ── Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5, ease: "easeOut" }}
            className="flex gap-4 mt-2"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium transition-shadow shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
              <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              className="group px-7 py-3.5 rounded-full border border-white/15 text-white font-medium transition-colors flex items-center gap-2"
              href={`https://www.linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
              <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </motion.a>
          </motion.div>

          {/* ── Scroll indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <div className="w-5 h-8 rounded-full border border-gray-600/30 flex justify-center pt-1.5">
                <motion.div
                  className="w-0.5 h-1.5 rounded-full bg-gray-400/50"
                  animate={{ y: [0, 5, 0], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
