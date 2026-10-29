import { m } from "framer-motion";
import Section from "../components/Section";
import SkillIcon from "../components/SkillIcon";
import { skillGroups, type Skill } from "../data";
import { revealOnView } from "../lib/motion";
import { projectCountByTag, useProjectFilter } from "../lib/projectFilter";

export default function SkillsSection() {
  const { setTag } = useProjectFilter();

  const showProjects = (skill: string) => {
    setTag(skill);
    document.getElementById("projects")?.scrollIntoView();
    // ย้าย focus ไปที่สรุปผลการกรอง → ผู้ใช้คีย์บอร์ด/screen reader รู้ว่ากดแล้วเกิดอะไรขึ้น
    document.getElementById("projects-status")?.focus({ preventScroll: true });
  };

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I work with"
      subtitle="Skills with a number are used in my projects — select one to see them."
    >
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          // กลุ่มแรกกว้าง 2 ช่อง → grid เต็มพอดีทั้งจอ 2 และ 3 คอลัมน์
          <m.div key={group.title} {...revealOnView(i * 0.05)} className={i === 0 ? "md:col-span-2" : undefined}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <SkillChip skill={skill} onSelect={showProjects} />
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </Section>
  );
}

function SkillChip({ skill, onSelect }: { skill: Skill; onSelect: (name: string) => void }) {
  const count = projectCountByTag.get(skill.name) ?? 0;

  if (count === 0) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 text-sm text-gray-300">
        <SkillIcon icon={skill.icon} />
        {skill.name}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(skill.name)}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 text-sm text-white transition-colors hover:border-indigo-400/50 hover:bg-indigo-500/10"
    >
      <SkillIcon icon={skill.icon} />
      {skill.name}
      <span aria-hidden="true" className="rounded-md bg-indigo-400/15 px-1.5 py-px font-mono text-[11px] text-indigo-200">
        {count}
      </span>
      <span className="sr-only">
        : show {count} {count === 1 ? "project" : "projects"}
      </span>
    </button>
  );
}
