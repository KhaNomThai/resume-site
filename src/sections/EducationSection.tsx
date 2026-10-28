import { motion, type Variants } from "framer-motion";
import Section from "../components/Section";
import { education } from "../data";

// ใช้ variants + custom แทน whileInView ซ้อนกันหลายชั้น — reveal ครั้งเดียวแล้ว stagger ลงไปที่ลูก
const card: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, delay: i * 0.15, delayChildren: 0.2, staggerChildren: 0.1 },
  }),
};
const fadeUp: Variants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
const chipList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const chip: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" } },
};

export default function EducationSection() {
  return (
    <Section id="education" eyebrow="Background" title="Education" accent="blue">
      {education.map((it, i) => (
        // `group` ต้องอยู่บน "บรรพบุรุษ" ของ element ที่ใช้ group-hover: (เดิมอยู่ผิดชั้น glow เลยไม่เคยขึ้น)
        <motion.article
          key={it.id}
          custom={i}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="group relative isolate mx-auto max-w-2xl"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 text-center hover:border-blue-500/20 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)] transition-[border-color,box-shadow] duration-500"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <motion.div
              aria-hidden="true"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-6 inline-flex size-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/15 to-blue-500/15 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-shadow"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-indigo-500/10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <svg className="relative size-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                />
              </svg>
            </motion.div>

            <motion.h3 variants={fadeUp} className="relative mb-2 text-xl md:text-2xl font-bold text-white">
              {it.title}
            </motion.h3>
            <motion.p variants={fadeUp} className="relative text-lg font-medium text-indigo-300">
              {it.org}
            </motion.p>
            <motion.p variants={fadeUp} className="relative mt-1 mb-5 text-sm text-gray-400">
              {it.period}
            </motion.p>

            {it.courses.length > 0 && (
              <motion.ul
                variants={chipList}
                aria-label="Relevant coursework"
                className="relative flex flex-wrap justify-center gap-2"
              >
                {it.courses.map((course) => (
                  <motion.li
                    key={course}
                    variants={chip}
                    whileHover={{ scale: 1.08 }}
                    className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 hover:border-indigo-500/30 transition-colors"
                  >
                    {course}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.article>
      ))}
    </Section>
  );
}
