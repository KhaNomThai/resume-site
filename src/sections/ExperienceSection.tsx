import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data";
import ScrollReveal from "../components/ScrollReveal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const timelineItem = (isEven: boolean): Variants => ({
  hidden: { opacity: 0, x: isEven ? 40 : -40, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.5 },
  },
});

const bulletItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Animated vertical line height */
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.8"],
  });
  const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="relative py-32 snap-section scroll-mt-14">
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
            >
              My Journey
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              Experience
            </motion.h2>
          </div>

          <div className="relative">
            {/* Animated vertical timeline line */}
            <div className="absolute left-[1.2rem] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.04]" ref={lineRef}>
              <motion.div
                className="w-full bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-indigo-500/20"
                style={{ height: lineHeight }}
              />
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-12"
            >
              {profile.experience.map((it, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                    variants={timelineItem(isEven)}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[1.2rem] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute w-6 h-6 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)",
                        }}
                        animate={{ scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[0_0_12px_rgba(129,140,248,0.4)]" />
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 ml-12 md:ml-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                      <motion.div
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-500 group"
                        whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(99,102,241,0.08)" }}
                      >
                        {/* Period badge */}
                        <span className="inline-block text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full mb-3">
                          {it.period}
                        </span>
                        <h3 className="font-semibold text-white text-lg mb-1">
                          {it.title}
                        </h3>
                        <p className="text-indigo-300/80 text-sm font-medium mb-3">{it.org}</p>

                        {!!it.bullets?.length && (
                          <motion.ul
                            className={`space-y-2 text-sm text-gray-300 leading-relaxed ${isEven ? "md:text-right" : ""}`}
                            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                          >
                            {it.bullets.map((b, idx) => (
                              <motion.li
                                key={idx}
                                variants={bulletItem}
                                className={`flex items-start gap-2 ${isEven ? "md:flex-row-reverse" : ""}`}
                              >
                                <span className="text-indigo-400/60 mt-1.5 flex-shrink-0">▸</span>
                                <span>{b}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </motion.div>
                    </div>

                    {/* Spacer for the other side on desktop */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
