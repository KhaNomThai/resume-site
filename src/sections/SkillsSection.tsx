import Section from "../components/Section";
import SkillLogo from "../components/SkillLogo";
import SkillMarker from "../components/SkillMarker";
import { familyLabel, familyOf, type SkillFamilyId } from "../config/skillFamilies";
import { skillGroups, type Skill, type SkillGroup } from "../data";
import { projectCountByTag, useProjectFilter } from "../lib/projectFilter";

/**
 * Skills แบบดัชนีท้ายเล่ม: ชื่อ ....... จำนวนโปรเจกต์ที่ใช้ (แทนเลขหน้า)
 * ไม่มี progress bar แบบ % เพราะไม่มีหน่วยวัดจริง ตัวเลขที่แสดงคือนับจากโปรเจกต์ใน data.ts
 * กลุ่มใน data.ts เรียงตามหมวด (ML / DL, Data, Full-stack, Languages, Tools) สัญลักษณ์ของหมวดจึงอยู่ที่หัวกลุ่มครั้งเดียว
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
        {skillGroups.map((group) => {
          const family = groupFamily(group);
          return (
            <div key={group.title} className="reveal">
              <h3 className="flex items-center gap-2 border-b border-margin pb-2 type-title text-ink">
                {family && <SkillMarker family={family} className="size-3" />}
                {group.title}
              </h3>
              <ul className="mt-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    {/* กลุ่มที่ทุก skill อยู่หมวดเดียวกันไม่ต้องใส่สัญลักษณ์ซ้ำทุกแถว */}
                    <SkillRow skill={skill} showMarker={!family} onSelect={showProjects} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/** หมวดของทั้งกลุ่ม ถ้าทุก skill ในกลุ่มอยู่หมวดเดียวกัน (Tools ไม่มีหมวด → undefined) */
function groupFamily(group: SkillGroup): SkillFamilyId | undefined {
  const first = familyOf(group.skills[0]?.name ?? "");
  return first && group.skills.every((skill) => familyOf(skill.name) === first) ? first : undefined;
}

function SkillRow({ skill, showMarker, onSelect }: { skill: Skill; showMarker: boolean; onSelect: (name: string) => void }) {
  const family = familyOf(skill.name);
  const count = projectCountByTag.get(skill.name) ?? 0;

  const name = (
    <>
      {showMarker && family && <SkillMarker family={family} />}
      {showMarker && family && <span className="sr-only">{familyLabel(family)}: </span>}
      {/* ช่อง logo กว้างคงที่ ชื่อ skill ทุกแถวจึงเริ่มตรงกันแม้บางตัวไม่มี logo */}
      <span className="flex size-6 shrink-0 items-center justify-center">
        <SkillLogo name={skill.name} className="size-5" />
      </span>
      <span>{skill.name}</span>
    </>
  );

  if (count === 0) {
    return <span className="group flex min-h-11 items-center gap-3 type-body text-ink">{name}</span>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(skill.name)}
      className="group flex min-h-11 w-full items-center gap-3 rounded-control text-left type-body text-ink transition-colors duration-(--duration-fast) hover:text-pen"
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
