import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data";
import ScrollReveal from "../components/ScrollReveal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.6 },
  },
};

const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 14 } },
};

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" ref={ref} className="relative py-32 snap-section scroll-mt-14">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
        style={{ width: lineWidth }}
      />

      <ScrollReveal>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-purple-400 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What I've Built
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            Projects
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6"
        >
          {profile.projects.map((p, idx) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 transform-gpu will-change-transform transition-all duration-500 relative overflow-hidden"
              variants={cardItem}
              whileHover={{
                y: -6,
                scale: 1.02,
                borderColor: "rgba(168,85,247,0.3)",
                boxShadow: "0 25px 50px rgba(99,102,241,0.12), 0 0 0 1px rgba(168,85,247,0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700" />

              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Project number */}
              <div className="absolute top-4 right-6 text-6xl font-bold text-white/[0.03] group-hover:text-indigo-500/[0.06] transition-colors duration-500 select-none">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-white text-xl group-hover:text-indigo-300 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <motion.svg
                    className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 flex-shrink-0 mt-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                    whileHover={{ x: 3, y: -3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </motion.svg>
                </div>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5">{p.desc}</p>

                {/* Animated tags */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
                >
                  {p.tags?.map((t) => (
                    <motion.span
                      key={t}
                      variants={tagItem}
                      className="text-xs rounded-full px-3 py-1 bg-white/[0.05] text-gray-300 border border-white/[0.08] group-hover:border-indigo-500/20 group-hover:text-indigo-200 transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
      </ScrollReveal>
    </section>
  );
}
