import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import SkillIcon from "../components/SkillIcon";
import ScrollReveal from "../components/ScrollReveal";
import { profile, type Skill } from "../data";

const container = (stagger = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const cardReveal = (i: number): Variants => ({
  hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      mass: 0.4,
      delay: i * 0.03,
    },
  },
});

const categoryReveal: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

function groupByCategory(skills: Skill[]) {
  const map: Record<string, Skill[]> = {};
  for (const s of skills) {
    const k = s.category ?? "Other";
    (map[k] ??= []).push(s);
  }
  return map;
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const grouped = groupByCategory(profile.skills);
  const categoryOrder = ["Frontend", "Backend", "Core", "Data/AI", "Mobile", "Tools", "Other"];
  const orderedGroups = categoryOrder
    .filter((c) => grouped[c])
    .map((c) => [c, grouped[c]] as [string, Skill[]]);

  return (
    <section id="skills" ref={ref} className="relative py-32 snap-section scroll-mt-14">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
        style={{ width: lineWidth }}
      />

      <ScrollReveal>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-xs tracking-[0.3em] uppercase text-indigo-400 mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              What I Work With
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: "spring" }}
            >
              Skills & Technologies
            </motion.h2>
          </div>

          <div className="space-y-12">
            {orderedGroups.map(([category, list]) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container(0.04)}
              >
                <motion.h3
                  variants={categoryReveal}
                  className="mb-5 text-xs font-semibold tracking-[0.2em] text-indigo-400/80 uppercase flex items-center gap-3"
                >
                  <span className="h-px flex-1 max-w-8 bg-indigo-500/30" />
                  {category}
                </motion.h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {list.map((s, i) => (
                    <motion.div
                      key={s.name}
                      variants={cardReveal(i)}
                      whileHover={{
                        scale: 1.06,
                        y: -4,
                        boxShadow: "0 10px 30px rgba(99,102,241,0.15)",
                        borderColor: "rgba(99,102,241,0.4)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="group flex items-center gap-3 h-14 px-4
                        rounded-xl border border-white/[0.06] bg-white/[0.03]
                        text-gray-100 text-sm font-medium
                        transform-gpu will-change-transform hover:bg-white/[0.07] transition-all duration-300 cursor-default relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 flex items-center gap-3">
                        <SkillIcon name={s.name} />
                        <span className="truncate">{s.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
