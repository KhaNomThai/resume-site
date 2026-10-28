import { motion, type Variants } from "framer-motion";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import { ArrowUpRightIcon } from "../components/icons";
import { projects, type Project } from "../data";
import { linkProps } from "../lib/links";

// Variants เป็นค่าคงที่ระดับ module → ไม่ถูกสร้าง object ใหม่ทุก render
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.18 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.6 } },
};
const tagList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const tag: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 14 } },
};

export default function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="What I've Built" title="Projects" accent="purple">
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6"
      >
        {projects.map((project, i) => (
          <motion.li key={project.title} variants={card}>
            <ProjectCard project={project} index={i} />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

function ProjectCard({ project: { title, desc, link, tags }, index }: { project: Project; index: number }) {
  return (
    // CSS transition เฉพาะ border/shadow; transform ให้ framer-motion คุมคนเดียว
    <motion.article
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative isolate overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 transition-[border-color,box-shadow] duration-500 hover:border-purple-500/30 hover:shadow-[0_25px_50px_rgba(99,102,241,0.12),0_0_0_1px_rgba(168,85,247,0.2)]"
    >
      {/* Decorations: อยู่หลังเนื้อหา (-z-10 ภายใน isolate) และซ่อนจาก screen reader */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-colors duration-700"
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 top-0 right-0 size-24 rounded-bl-full bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <span
        aria-hidden="true"
        className="absolute -z-10 top-4 right-6 select-none text-6xl font-bold text-white/[0.03] group-hover:text-indigo-500/[0.06] transition-colors duration-500 print:hidden"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
          {link ? (
            // "Stretched link": ::after คลุมทั้งการ์ด → คลิกได้ทั้งใบ แต่ accessible name = ชื่อโปรเจกต์อย่างเดียว
            <a
              {...linkProps(link)}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-400"
            >
              {title}
              <NewTabHint href={link} />
            </a>
          ) : (
            title
          )}
        </h3>
        {link && (
          <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        )}
      </div>

      <p className="mb-5 text-sm md:text-base leading-relaxed text-gray-400">{desc}</p>

      <motion.ul variants={tagList} aria-label="Tech stack" className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <motion.li
            key={t}
            variants={tag}
            className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-xs text-gray-300 group-hover:border-indigo-500/20 group-hover:text-indigo-200 transition-colors"
          >
            {t}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}
