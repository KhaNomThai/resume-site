import { motion, type Variants } from "framer-motion";
import type { TimelineItem } from "../data";
import { container, item } from "./Section";

// อนิเมชันของ จุดแต่ละรายการ
const dotV: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    x: -6,
    filter: "blur(2px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      mass: 0.35,
    },
  },
  hover: {
    scale: 1.25,
    boxShadow: "0 0 0 4px rgba(159,183,255,0.15)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <motion.ol
      className="relative ps-5 border-s border-[#1f2a44]"
      variants={container(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.55 }}
    >
      {items.map((it, i) => (
        <motion.li
          key={i}
          className="mb-6 ms-2 transform-gpu will-change-transform"
          variants={item(10)}
          layout
          whileHover="hover" // ทำให้จุดเด้งเมื่อ hover
        >
          {/* วงแหวน pulse */}
          <motion.span
            aria-hidden
            className="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(159,183,255,0.35) 0%, rgba(159,183,255,0.0) 70%)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.6, 1.6, 2.2],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* จุดหลัก */}
          <motion.span
            variants={dotV}
            className="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full bg-white/90 shadow-[0_0_0_2px_rgba(31,42,68,0.8)]"
          />

          {/* เนื้อหา */}
          <h3 className="font-medium text-white">
            {it.title} — {it.org}
          </h3>
          <p className="text-sm text-gray-400">{it.period}</p>

          {!!it.bullets?.length && (
            <ul className="list-disc ms-5 mt-2 space-y-1 text-sm text-gray-300">
              {it.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}