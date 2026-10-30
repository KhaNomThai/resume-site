import Section from "../components/Section";
import SkillMarker from "../components/SkillMarker";
import { familyLabel, familyOf } from "../config/skillFamilies";
import { skillGroups, type Skill } from "../data";
import { projectCountByTag, useProjectFilter } from "../lib/projectFilter";

/**
 * Skills แบบดัชนีท้ายเล่ม: ชื่อ ....... จำนวนโปรเจกต์ที่ใช้ (แทนเลขหน้า)
 * ไม่มี progress bar แบบ % เพราะไม่มีหน่วยวัดจริง ตัวเลขที่แสดงคือนับจากโปรเจกต์ใน data.ts
 * กลุ่มยังเป็นของเดิมใน data.ts — การจัดกลุ่มใหม่เป็น ML/DL, Data, Full-stack, Languages รอยืนยันใน design/content-proposals.md
 */
export default function SkillsSection() {
  const { setTag } = useProjectFilter();

  const showProjects = (skill: string) => {
    setTag(skill);
    document.getElementById("projects")?.scrollIntoView();
    // ย้าย focus ไปที่สรุปผลการกรอง → ผู้ใช้คีย์บอร์ด/screen reader รู้ว่ากดแล้วเกิดอะไรขึ้น
    document.getElementById("projects-status")?.focus({ preventScroll: true });
  };

  return (
    <Section id="skills" intro="The number is how many of my projects use a skill. Select it to see those projects.">
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="border-b border-margin pb-2 type-title text-ink">{group.title}</h3>
            <ul className="mt-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <SkillRow skill={skill} onSelect={showProjects} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SkillRow({ skill, onSelect }: { skill: Skill; onSelect: (name: string) => void }) {
  const family = familyOf(skill.name);
  const count = projectCountByTag.get(skill.name) ?? 0;

  const name = (
    <>
      {/* ช่องว่างขนาดเดียวกับสัญลักษณ์ → ชื่อทุกแถวเริ่มตรงกันแม้ไม่มีหมวด (Tools) */}
      {family ? <SkillMarker family={family} /> : <span aria-hidden="true" className="size-2.5 shrink-0" />}
      {family && <span className="sr-only">{familyLabel(family)}: </span>}
      <span>{skill.name}</span>
    </>
  );

  if (count === 0) {
    return <span className="flex min-h-11 items-center gap-2 type-body text-ink">{name}</span>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(skill.name)}
      className="group flex min-h-11 w-full items-center gap-2 rounded-control text-left type-body text-ink transition-colors duration-(--duration-fast) hover:text-pen"
    >
      {name}
      {/* เส้นจุดนำสายตา (dot leader) แบบดัชนีท้ายเล่ม พาจากชื่อไปหาตัวเลข */}
      <span aria-hidden="true" className="mx-1 h-0 flex-1 translate-y-1 border-b border-dotted border-stroke group-hover:border-pen" />
      <span className="type-label tabular-nums text-pen underline underline-offset-3">
        {count}
        <span className="sr-only"> {count === 1 ? "project" : "projects"} — show them</span>
      </span>
    </button>
  );
}
