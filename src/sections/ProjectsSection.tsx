import { AnimatePresence, m } from "framer-motion";
import { useId, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import { ArrowUpRightIcon, CodeIcon, GlobeIcon, NotebookIcon } from "../components/icons";
import { projects, type Project, type ProjectLinkKind } from "../data";
import { linkProps } from "../lib/links";
import { revealOnView } from "../lib/motion";
import { projectCountByTag, useProjectFilter } from "../lib/projectFilter";
import { trackSpotlight } from "../lib/spotlight";

const LINKS: Record<ProjectLinkKind, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = {
  code: { label: "Code", Icon: CodeIcon },
  demo: { label: "Live demo", Icon: GlobeIcon },
  notebook: { label: "Notebook", Icon: NotebookIcon },
};

/** ตัวกรองหลัก = tag ที่มีอย่างน้อย 2 โปรเจกต์ (เรียงตามจำนวน) — ข้อมูล static คำนวณครั้งเดียว */
const FILTER_TAGS = [...projectCountByTag]
  .filter(([, count]) => count >= 2)
  .sort((a, b) => b[1] - a[1])
  .map(([tag]) => tag);

/** มือถือแสดงก่อนแค่นี้ (การ์ดเรียงคอลัมน์เดียว หน้าจะยาวมาก) — จอ md ขึ้นไปแสดงครบเสมอ */
const MOBILE_PREVIEW = 4;

export default function ProjectsSection() {
  const { tag, setTag } = useProjectFilter();
  const [showAll, setShowAll] = useState(false);
  const listId = useId();
  const visible = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  const collapsible = tag === null && visible.length > MOBILE_PREVIEW;
  // tag ที่เลือกมาจากปุ่มใน Skills อาจไม่อยู่ในแถบหลัก → ต่อท้ายให้เห็นว่ากำลังกรองอะไร
  const filterTags = tag && !FILTER_TAGS.includes(tag) ? [...FILTER_TAGS, tag] : FILTER_TAGS;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      subtitle="Deep learning, computer vision, and full-stack work — from course projects to hackathons and real events."
      width="wide"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between print:hidden">
        {/* มือถือ: เลื่อนแนวนอน (ขอบขวาจางบอกว่ายังมีต่อ) / จอใหญ่: ตัดบรรทัดปกติ */}
        <div
          role="group"
          aria-label="Filter projects by technology"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
        >
          <FilterChip pressed={tag === null} onClick={() => setTag(null)}>
            All
          </FilterChip>
          {filterTags.map((t) => (
            <FilterChip key={t} pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              {t}
              <span aria-hidden="true" className="font-mono text-[11px] opacity-60">
                {projectCountByTag.get(t)}
              </span>
            </FilterChip>
          ))}
        </div>
        <p id="projects-status" tabIndex={-1} aria-live="polite" className="shrink-0 font-mono text-xs text-gray-400 outline-none">
          {tag ? `${visible.length} of ${projects.length} projects use ${tag}` : `${projects.length} projects`}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={tag ?? "all"}
          id={listId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((project, i) => {
            // ใบแรกกว้าง 2 ช่องบนจอ 3 คอลัมน์ → 8 ใบเต็ม 3 แถวพอดี ไม่มีช่องโหว่
            const featured = i === 0 && tag === null;
            const collapsed = collapsible && !showAll && i >= MOBILE_PREVIEW;
            return (
              <li
                key={project.id}
                className={`${featured ? "lg:col-span-2" : ""} ${collapsed ? "max-md:hidden print:block!" : ""}`}
              >
                <ProjectCard project={project} featured={featured} delay={(i % 3) * 0.06} />
              </li>
            );
          })}
        </m.ul>
      </AnimatePresence>

      {collapsible && (
        <div className="mt-6 flex justify-center md:hidden print:hidden">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={listId}
            onClick={() => setShowAll((v) => !v)}
            className="h-11 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
          >
            {showAll ? "Show fewer projects" : `Show all ${projects.length} projects`}
          </button>
        </div>
      )}
    </Section>
  );
}

function FilterChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors ${
        pressed
          ? "border-indigo-300/60 bg-indigo-400/15 text-white"
          : "border-white/10 text-gray-300 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project, featured, delay }: { project: Project; featured: boolean; delay: number }) {
  const { title, category, year, context, desc, metric, tags, links } = project;
  const [primary] = links;

  return (
    <m.article
      {...revealOnView(delay, 24)}
      onPointerMove={trackSpotlight}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors duration-300 hover:border-white/[0.15] md:p-7"
    >
      {/* แสงตามเมาส์: ตำแหน่งมาจาก --x/--y ที่ trackSpotlight ตั้งให้ (แทนการขยายการ์ดที่ทำให้ตัวหนังสือเบลอ) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgb(129_140_248/0.14),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <p className="flex items-center justify-between gap-3 font-mono text-xs">
        <span className="text-indigo-300">{category}</span>
        {year && <span className="text-gray-500">{year}</span>}
      </p>

      <h3 className={`mt-3 font-semibold tracking-tight text-white ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
        {/* "Stretched link": ::after คลุมทั้งการ์ด → คลิกได้ทั้งใบ แต่ accessible name = ชื่อโปรเจกต์อย่างเดียว */}
        <a
          {...linkProps(primary.href)}
          className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-indigo-400"
        >
          {title}
          <NewTabHint href={primary.href} />
        </a>
      </h3>
      {context && <p className="mt-1 text-sm text-gray-400">{context}</p>}

      {metric && (
        <p className="mt-5 flex items-baseline gap-3">
          <span className="text-4xl font-semibold tracking-tight text-white">{metric.value}</span>
          <span className="text-sm text-gray-400">{metric.label}</span>
        </p>
      )}

      <p className={`mt-4 leading-relaxed text-gray-400 ${featured ? "max-w-3xl text-base" : "text-sm"}`}>{desc}</p>

      <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-gray-300"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* z-10 ให้อยู่เหนือ ::after ของ stretched link → ลิงก์รองยังกดได้ */}
      <div className="relative z-10 mt-auto pt-5">
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4">
          {links.map(({ kind, href }) => {
            const { label, Icon } = LINKS[kind];
            return (
              <a
                key={href}
                {...linkProps(href)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-white"
              >
                <Icon className="size-4" />
                {label}
                <ArrowUpRightIcon className="size-3 opacity-60" />
                <NewTabHint href={href} />
              </a>
            );
          })}
        </div>
      </div>
    </m.article>
  );
}
