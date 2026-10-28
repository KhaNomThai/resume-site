import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import avatarImg from "../assets/profile-320.webp";
// import ผ่าน Vite → ได้ URL ที่มี hash + base path (/resume-site/) ถูกต้องอัตโนมัติ
import cvPdf from "../assets/Kulachart-Parnduangkeaw-CV.pdf";
import NewTabHint from "../components/NewTabHint";
import SkillIcon from "../components/SkillIcon";
import Typewriter from "../components/Typewriter";
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MapPinIcon } from "../components/icons";
import { githubUrl, linkedinUrl, profile, skills } from "../data";
import { linkProps } from "../lib/links";

const fadeIn = (delay: number, y = 0, duration = 0.5) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: "easeOut" as const },
});

const MARQUEE_MASK = "linear-gradient(to right, transparent, black 15%, black 85%, transparent)";

/**
 * CSS animation แทน framer-motion loop → หยุดได้ตอน hover/focus (WCAG 2.2.2)
 * และหยุดเองเมื่อ prefers-reduced-motion
 * ชุดที่ 2 มีไว้ทำ seamless loop เท่านั้น → aria-hidden + tabIndex=-1
 */
function TechMarquee() {
  return (
    <div
      className="group relative w-full max-w-lg overflow-hidden py-4"
      style={{ maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${skills.length * 2.5}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex items-center">
            {skills.map((s) => (
              <li key={s.name} className="mr-8 shrink-0">
                <a
                  {...linkProps(s.url)}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="flex items-center gap-2 opacity-60 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                >
                  <SkillIcon name={s.name} icon={s.icon} size={24} />
                  <span className="text-xs text-gray-300 whitespace-nowrap">{s.name}</span>
                  <NewTabHint href={s.url} />
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Shapes() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none print:hidden">
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

function Avatar() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(99,102,241,0.5), rgba(168,85,247,0.35), rgba(59,130,246,0.4), rgba(99,102,241,0.5))",
        }}
      />
      <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-[#0b1220]/80" />
      <motion.div
        aria-hidden="true"
        className="absolute -inset-5 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* LCP image: ระบุขนาด (กัน layout shift) + fetchPriority="high" */}
      <motion.img
        src={avatarImg}
        alt={`Portrait of ${profile.name}`}
        width={160}
        height={160}
        fetchPriority="high"
        className="relative size-32 md:size-40 rounded-full ring-2 ring-white/15 object-cover shadow-2xl"
        whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
    </motion.div>
  );
}

type SocialButtonProps = { href: string; icon: ReactNode; label: string; primary?: boolean };

function SocialButton({ href, icon, label, primary }: SocialButtonProps) {
  return (
    <motion.a
      {...linkProps(href)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white ${
        primary
          ? "bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/25 hover:shadow-[0_16px_32px_rgba(99,102,241,0.3)] transition-shadow"
          : "border border-white/15 hover:bg-white/[0.06] transition-colors"
      }`}
    >
      {icon}
      {label}
      <ArrowUpRightIcon className="size-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
      <NewTabHint href={href} />
    </motion.a>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      <Shapes />

      <motion.div style={{ y, opacity, scale }} className="max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-6 py-16">
          <Avatar />

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500"
          >
            {profile.name}
          </motion.h1>

          <motion.div {...fadeIn(0.8)} className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/50" />
            <p className="text-lg md:text-2xl text-indigo-300 font-medium">
              <Typewriter key={profile.role} text={profile.role} delay={900} />
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-400/50" />
          </motion.div>

          <motion.p {...fadeIn(1.1)} className="-mt-2 flex items-center justify-center gap-1.5 text-sm text-gray-400">
            <MapPinIcon className="size-3.5" />
            {profile.location}
          </motion.p>

          <motion.p
            {...fadeIn(1.3, 15, 0.6)}
            className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300 font-light"
          >
            {profile.summary}
          </motion.p>

          <motion.div {...fadeIn(1.5, 0, 0.8)} className="mt-2 flex w-full justify-center print:hidden">
            <TechMarquee />
          </motion.div>

          <motion.div {...fadeIn(1.7, 20)} className="mt-2 flex flex-wrap justify-center gap-4 print:hidden">
            <SocialButton href={githubUrl} icon={<GitHubIcon className="size-4" />} label="GitHub" primary />
            <SocialButton href={linkedinUrl} icon={<LinkedInIcon className="size-4" />} label="LinkedIn" />
            <motion.a
              href={cvPdf}
              download="Kulachart-Parnduangkeaw-CV.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition-colors"
            >
              <DownloadIcon className="size-4" />
              Download CV
              <span className="sr-only">(PDF)</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator (decorative) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 print:hidden"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-8 w-5 justify-center rounded-full border border-gray-600/30 pt-1.5"
            >
              <motion.div
                className="h-1.5 w-0.5 rounded-full bg-gray-400/50"
                animate={{ y: [0, 5, 0], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
