import { AnimatePresence, m } from "framer-motion";
import { useId, useState, type ComponentType, type CSSProperties, type ReactNode, type SVGProps } from "react";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import SkillMarker, { SkillLegend } from "../components/SkillMarker";
import { CodeIcon, GlobeIcon, NotebookIcon } from "../components/icons";
import { familyLabel, groupByFamily } from "../config/skillFamilies";
import { projects, type Project, type ProjectLinkKind } from "../data";
import { linkProps } from "../lib/links";
import { projectCountByTag, useProjectFilter } from "../lib/projectFilter";
import { useInViewOnce } from "../lib/useInViewOnce";

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
  // tag ที่เลือกมาจากรายการใน Skills อาจไม่อยู่ในแถบหลัก → ต่อท้ายให้เห็นว่ากำลังกรองอะไร
  const filterTags = tag && !FILTER_TAGS.includes(tag) ? [...FILTER_TAGS, tag] : FILTER_TAGS;

  return (
    <Section
      id="projects"
      intro="Deep learning, computer vision, and full-stack work — from course projects to hackathons and real events."
    >
      {/* legend อธิบายสัญลักษณ์ครั้งเดียว ก่อนถึงการ์ดที่ใช้มัน */}
      <SkillLegend className="mb-6" />

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between print:hidden">
        {/* มือถือ: เลื่อนแนวนอน (ขอบขวาจางบอกว่ายังมีต่อ) / จอใหญ่: ตัดบรรทัดปกติ */}
        <div
          role="group"
          aria-label="Filter projects by technology"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
        >
          <FilterChip pressed={tag === null} onClick={() => setTag(null)}>
            All
          </FilterChip>
          {filterTags.map((t) => (
            <FilterChip key={t} pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              {t}
              <span aria-hidden="true" className="type-caption tabular-nums opacity-80">
                {projectCountByTag.get(t)}
              </span>
            </FilterChip>
          ))}
        </div>
        <p id="projects-status" tabIndex={-1} aria-live="polite" className="shrink-0 type-small text-ink-muted outline-none">
          {tag ? `${visible.length} of ${projects.length} projects use ${tag}` : `${projects.length} projects`}
        </p>
      </div>

      {/* เปลี่ยนตัวกรอง = motion ที่ตอบการกระทำของผู้ใช้ จึงยังมี (จางสั้น ๆ ไม่มีการเลื่อนตำแหน่ง) */}
      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={tag ?? "all"}
          id={listId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((project, i) => {
            // ใบแรกกว้าง 2 ช่องบนจอ 3 คอลัมน์ → 8 ใบเต็ม 3 แถวพอดี ไม่มีช่องโหว่
            const featured = i === 0 && tag === null;
            const collapsed = collapsible && !showAll && i >= MOBILE_PREVIEW;
            return (
              <li key={project.id} className={`${featured ? "xl:col-span-2" : ""} ${collapsed ? "max-md:hidden print:block!" : ""}`}>
                <ProjectCard project={project} featured={featured} />
              </li>
            );
          })}
        </m.ul>
      </AnimatePresence>

      {collapsible && (
        <div className="mt-6 md:hidden print:hidden">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={listId}
            onClick={() => setShowAll((v) => !v)}
            className="h-11 w-full rounded-control border border-stroke bg-surface px-4 type-label text-ink transition-colors duration-(--duration-fast) hover:border-ink"
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
      className="flex h-11 shrink-0 items-center gap-2 rounded-control border border-stroke bg-surface px-4 type-label text-ink transition-colors duration-(--duration-fast) hover:border-ink aria-pressed:border-pen aria-pressed:bg-pen aria-pressed:text-on-pen"
    >
      {children}
    </button>
  );
}

/**
 * บัตรคำ: พื้นขาว ขอบบาง เส้นแดงใต้ชื่อเหมือนบัตรคำจริง ไม่มีเงา (ของที่วางราบบนกระดาษ)
 * ทั้งใบคลิกได้ด้วย stretched link ของชื่อ ส่วนลิงก์รองอยู่ชั้นบนจึงยังกดแยกได้
 */
function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const { title, category, year, context, desc, problem, approach, result, metric, tags, links } = project;
  const [primary] = links;
  const structured = Boolean(problem && approach);
  const meta = [category, context].filter(Boolean).join(", ");

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-rule bg-surface p-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-margin pb-2">
        <h3 className="type-title text-ink">
          {/* "Stretched link": ::after คลุมทั้งการ์ด → คลิกได้ทั้งใบ แต่ accessible name = ชื่อโปรเจกต์อย่างเดียว */}
          <a
            {...linkProps(primary.href)}
            className="decoration-pen decoration-2 underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0 after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
          >
            {title}
            <NewTabHint href={primary.href} />
          </a>
        </h3>
        {year && <span className="type-caption tabular-nums text-ink-muted">{year}</span>}
      </div>
      {meta && <p className="mt-2 type-small text-ink-muted">{meta}</p>}

      {/* problem → approach → result: ใช้เมื่อมีข้อมูลครบ ระหว่างนี้แสดงคำอธิบายเดิม (ไม่มีป้าย) + ผลลัพธ์ */}
      {!structured && <p className={`mt-4 type-body text-ink ${featured ? "md:max-w-measure" : ""}`}>{desc}</p>}
      <dl className={`mt-4 grid gap-3 empty:hidden ${featured ? "md:max-w-measure" : ""}`}>
        {structured && (
          <>
            <Field label="Problem">{problem}</Field>
            <Field label="Approach">{approach}</Field>
          </>
        )}
        {(metric || result) && (
          <Field label="Result">
            {metric && <ResultMark value={metric.value} />} {metric?.label}
            {result && <span className="block">{result}</span>}
          </Field>
        )}
      </dl>

      <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-4 type-small text-ink">
        {groupByFamily(tags).map(({ family, names }) => (
          <li key={family ?? "other"} className="flex items-center gap-1">
            {family && <SkillMarker family={family} />}
            {family && <span className="sr-only">{familyLabel(family)}: </span>}
            {names.join(", ")}
          </li>
        ))}
      </ul>

      {/* z-10 ให้อยู่เหนือ ::after ของ stretched link → ลิงก์รองยังกดได้ */}
      <div className="relative z-10 mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
        {links.map(({ kind, href }) => {
          const { label, Icon } = LINKS[kind];
          return (
            <a
              key={href}
              {...linkProps(href)}
              className="inline-flex min-h-11 items-center gap-1 type-label text-pen underline underline-offset-3 transition-colors duration-(--duration-fast) hover:text-pen-hover"
            >
              <Icon className="size-4" />
              {label}
              <NewTabHint href={href} />
            </a>
          );
        })}
      </div>
    </article>
  );
}

/** หัวข้อช่อง (sans 600 สีรอง) ซ้อนบนเนื้อหา — การ์ดแคบ 3 คอลัมน์จึงไม่ต้องแบ่งคอลัมน์ป้าย */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label text-ink-muted">{label}</dt>
      <dd className="mt-1 type-body text-ink">{children}</dd>
    </div>
  );
}

/** ตัวเลขผลลัพธ์: ปากกาเน้นขีดผ่านครั้งแรกที่การ์ดเข้ามาในจอ (ช้ากว่าใน hero คือ --duration-slow) */
function ResultMark({ value }: { value: string }) {
  const [ref, seen] = useInViewOnce<HTMLElement>();
  const style = { "--swipe-duration": "var(--duration-slow)" } as CSSProperties;
  return (
    <mark ref={ref} style={style} className={`type-metric ${seen ? "mark-swipe" : "mark-pending"}`}>
      {value}
    </mark>
  );
}
