import { motion } from "framer-motion";
import type { TimelineItem } from "../data";
import { container, item } from "./Section";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <motion.ol
      className="relative ps-5 border-s border-[#1f2a44]"
      variants={container(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {items.map((it, i) => (
        <motion.li
          key={i}
          className="mb-6 ms-2 transform-gpu will-change-transform"
          variants={item(10)}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          layout
        >
          <motion.span
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            className="absolute -start-1.5 mt-1.5 size-3 rounded-full bg-white/90 shadow-[0_0_0_2px_rgba(31,42,68,0.8)]"
          />
          <h3 className="font-medium">{it.title} — {it.org}</h3>
          <p className="text-sm text-gray-400">{it.period}</p>
          {!!it.bullets?.length && (
            <ul className="list-disc ms-5 mt-2 space-y-1 text-sm text-gray-300">
              {it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}