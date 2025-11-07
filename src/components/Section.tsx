/* eslint-disable react-refresh/only-export-components */
import { motion, type Variants } from "framer-motion";

export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-6 py-10">
      <motion.h2
        className="text-xl sm:text-2xl font-semibold tracking-tight mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 110, damping: 18 }}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

export const container = (stagger = 0.08): Variants => ({
  hidden: { opacity: 1 },
  show: { transition: { staggerChildren: stagger } },
});

export const item = (y = 14): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.4 },
  },
});
