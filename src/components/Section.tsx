import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import type { SectionId } from "../config/sections";

/** เขียน class เต็ม ๆ เท่านั้น — Tailwind scan หา string ตรง ๆ, `via-${color}-500` จะไม่ถูก generate */
const ACCENTS = {
  indigo: { line: "via-indigo-500/40", eyebrow: "text-indigo-400" },
  purple: { line: "via-purple-500/40", eyebrow: "text-purple-400" },
  blue: { line: "via-blue-500/40", eyebrow: "text-blue-400" },
  emerald: { line: "via-emerald-500/40", eyebrow: "text-emerald-400" },
} as const;

type Props = {
  id: SectionId;
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: keyof typeof ACCENTS;
  narrow?: boolean;
  children: ReactNode;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, type: "spring" as const },
});

export default function Section({ id, eyebrow, title, subtitle, accent = "indigo", narrow, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingId = `${id}-heading`;
  const colors = ACCENTS[accent];

  return (
    <section id={id} ref={ref} aria-labelledby={headingId} className="relative py-32 scroll-mt-14">
      <motion.div
        aria-hidden="true"
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent ${colors.line} to-transparent`}
        style={{ width: lineWidth }}
      />

      <ScrollReveal>
        <div className={`${narrow ? "max-w-3xl" : "max-w-5xl"} mx-auto px-6`}>
          <header className="text-center mb-16">
            <motion.p className={`text-xs tracking-[0.3em] uppercase mb-3 ${colors.eyebrow}`} {...fadeUp(0.1)}>
              {eyebrow}
            </motion.p>
            <motion.h2 id={headingId} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight" {...fadeUp(0.15)}>
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p className="mt-3 text-lg text-gray-400" {...fadeUp(0.2)}>
                {subtitle}
              </motion.p>
            )}
          </header>
          {children}
        </div>
      </ScrollReveal>
    </section>
  );
}
