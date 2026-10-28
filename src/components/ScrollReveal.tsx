import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; offset?: number };

/**
 * Scroll-linked fade/slide สำหรับเนื้อหาใน section
 * หมายเหตุ: <MotionConfig reducedMotion="user"> ไม่ครอบคลุม style ที่ผูกกับ scroll
 * จึงต้องเช็ค useReducedMotion() เองตรงนี้
 */
export default function ScrollReveal({ children, className, offset = 50 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const enterOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0, 0.2], [offset, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);
  const exitOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.3]);
  const exitY = useTransform(scrollYProgress, [0.85, 1], [0, -20]);

  const opacity = useTransform(() => Math.min(enterOpacity.get(), exitOpacity.get()));
  const y = useTransform(() => enterY.get() + exitY.get());

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
