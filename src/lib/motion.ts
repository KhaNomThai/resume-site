import type { Transition } from "framer-motion";

/** easeOutQuint-ish: เข้าเร็วแล้วค่อย ๆ หยุด — ใช้ทั้งเว็บให้จังหวะเดียวกัน */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** fade + เลื่อนขึ้นเล็กน้อยเมื่อเลื่อนมาถึง (เล่นครั้งเดียว) */
export function revealOnView(delay = 0, y = 16) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: EASE_OUT, delay } satisfies Transition,
  };
}
