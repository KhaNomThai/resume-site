import { motion, type Variants } from "framer-motion";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import SkillIcon from "../components/SkillIcon";
import { skillsByCategory } from "../data";
import { linkProps } from "../lib/links";

// Variants เป็นค่าคงที่ระดับ module; stagger มาจาก parent อย่างเดียว ไม่ซ้อน delay ที่ child
const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const heading: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 16 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.4 } },
};

export default function SkillsSection() {
  return (
    <Section id="skills" eyebrow="What I Work With" title="Skills & Technologies">
      <div className="space-y-12">
        {skillsByCategory.map(({ category, items }) => (
          <motion.div
            key={category}
            variants={group}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={heading}
              className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
            >
              <span aria-hidden="true" className="h-px max-w-8 flex-1 bg-indigo-500/30" />
              {category}
            </motion.h3>

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((s) => (
                <motion.li key={s.name} variants={card}>
                  {/* CSS transition เฉพาะสี/เงา; transform ให้ framer-motion คุมคนเดียว */}
                  <motion.a
                    {...linkProps(s.url)}
                    whileHover={{ scale: 1.06, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative isolate flex h-14 items-center gap-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 text-sm font-medium text-gray-100 hover:border-indigo-500/40 hover:bg-white/[0.07] hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] transition-[background-color,border-color,box-shadow] duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <SkillIcon name={s.name} icon={s.icon} />
                    <span className="truncate">{s.name}</span>
                    <NewTabHint href={s.url} />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
