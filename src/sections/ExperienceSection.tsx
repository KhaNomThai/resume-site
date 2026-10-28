import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import { experience } from "../data";

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const itemShow: Variants["show"] = {
  opacity: 1,
  x: 0,
  y: 0,
  transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.5 },
};
const itemFromRight: Variants = { hidden: { opacity: 0, x: 40, y: 20 }, show: itemShow };
const itemFromLeft: Variants = { hidden: { opacity: 0, x: -40, y: 20 }, show: itemShow };
const bulletList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const bullet: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.6", "end 0.8"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience" eyebrow="My Journey" title="Experience">
      <div ref={timelineRef} className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[1.2rem] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.04]"
        >
          <motion.div
            className="w-full bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-indigo-500/20"
            style={{ height: lineHeight }}
          />
        </div>

        <motion.ol
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {experience.map((it, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.li
                key={it.id}
                variants={isEven ? itemFromRight : itemFromLeft}
                className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-[1.2rem] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center"
                >
                  <motion.div
                    className="absolute size-6 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)" }}
                    animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className="size-3.5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_0_12px_rgba(129,140,248,0.4)]" />
                </div>

                <div className={`flex-1 ml-12 md:ml-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <motion.article
                    whileHover={{ y: -3 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 hover:bg-white/[0.04] hover:border-indigo-500/20 hover:shadow-[0_15px_30px_rgba(99,102,241,0.08)] transition-[background-color,border-color,box-shadow] duration-500"
                  >
                    <p className="mb-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                      {it.period}
                    </p>
                    <h3 className="mb-1 text-lg font-semibold text-white">{it.title}</h3>
                    <p className="mb-3 text-sm font-medium text-indigo-300/80">{it.org}</p>

                    {it.bullets.length > 0 && (
                      <motion.ul variants={bulletList} className="space-y-2 text-sm leading-relaxed text-gray-300">
                        {it.bullets.map((b) => (
                          <motion.li
                            key={b}
                            variants={bullet}
                            className={`flex items-start gap-2 ${isEven ? "md:flex-row-reverse" : ""}`}
                          >
                            <span aria-hidden="true" className="mt-1.5 shrink-0 text-indigo-400/60">▸</span>
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.article>
                </div>

                {/* Spacer for the other side on desktop */}
                <div aria-hidden="true" className="hidden md:block flex-1" />
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
