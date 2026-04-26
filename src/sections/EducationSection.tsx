import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data";
import ScrollReveal from "../components/ScrollReveal";

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" ref={ref} className="relative py-32 snap-section scroll-mt-14">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        style={{ width: lineWidth }}
      />

      <ScrollReveal>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-blue-400 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Background
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            Education
          </motion.h2>
        </div>

        {profile.education.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.85, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.15 }}
            className="relative max-w-2xl mx-auto"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <motion.div
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 text-center relative overflow-hidden hover:border-blue-500/20 transition-all duration-500"
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(59,130,246,0.08)" }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }} />

              {/* Education icon — clean design */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-blue-500/15 border border-indigo-500/20 mb-6 relative"
                whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Soft glow behind */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-indigo-500/10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <svg className="w-8 h-8 text-indigo-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </motion.div>

              <motion.h3
                className="font-bold text-white text-xl md:text-2xl mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {it.title}
              </motion.h3>
              <motion.p
                className="text-indigo-300 font-medium text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {it.org}
              </motion.p>
              <motion.p
                className="text-sm text-gray-400 mt-1 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {it.period}
              </motion.p>

              {!!it.bullets?.length && (
                <motion.div
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {it.bullets[0].split(", ").map((subject, idx) => (
                    <motion.span
                      key={idx}
                      className="text-xs rounded-full px-3 py-1.5 bg-white/[0.04] text-gray-300 border border-white/[0.06]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.08, borderColor: "rgba(99,102,241,0.3)" }}
                    >
                      {subject.trim()}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
      </ScrollReveal>
    </section>
  );
}
