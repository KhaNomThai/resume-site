import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wraps a section's inner content to add scroll-driven parallax:
 * - Fade + slide up + scale on enter
 * - Subtle fade + slide on exit (when scrolling past)
 */
export default function ScrollReveal({
  children,
  className = "",
  offset = 50,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enter animation (section scrolls into view from bottom)
  const enterOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0, 0.2], [offset, 0]);
  const enterScale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  // Exit animation (section scrolls out of view at top)
  const exitOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.3]);
  const exitY = useTransform(scrollYProgress, [0.85, 1], [0, -20]);

  // Combine enter + exit
  const opacity = useTransform(() => Math.min(enterOpacity.get(), exitOpacity.get()));
  const y = useTransform(() => enterY.get() + exitY.get());

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale: enterScale }}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
