/**
 * หมวดของ skill: บอกด้วยรูปทรงแบบ marker ในกราฟขาวดำ (● ■ ▲ ◆) ไม่ใช้สี — ดูหัวข้อ "สัญลักษณ์หมวด skill" ใน DESIGN_SYSTEM.md
 * ลำดับใน SKILL_FAMILIES คือลำดับที่ใช้ทุกที่ (legend, tag ในการ์ด, รายการ skill)
 */
export const SKILL_FAMILIES = [
  { id: "ml", label: "ML / DL" },
  { id: "data", label: "Data" },
  { id: "stack", label: "Full-stack" },
  { id: "lang", label: "Languages" },
] as const;

export type SkillFamilyId = (typeof SKILL_FAMILIES)[number]["id"];

/**
 * skill และ tag ของโปรเจกต์ → หมวด (ใช้ชื่อตรงกับ data.ts)
 * เป็นข้อเสนอที่รอเจ้าของยืนยัน (design/content-proposals.md) ชื่อที่ไม่อยู่ในตารางนี้ถือเป็น Tools ซึ่งไม่มีสัญลักษณ์
 */
const FAMILY_OF: Readonly<Record<string, SkillFamilyId>> = {
  PyTorch: "ml",
  "scikit-learn": "ml",
  OpenCV: "ml",
  "Machine Learning": "ml",
  "Deep Learning": "ml",
  "Computer Vision": "ml",
  "Generative AI": "ml",
  Pandas: "data",
  NumPy: "data",
  "Data Analysis": "data",
  "D3.js": "data",
  "Google Sheets": "data",
  React: "stack",
  "React Native": "stack",
  "Next.js": "stack",
  "Node.js": "stack",
  FastAPI: "stack",
  Gradio: "stack",
  Firebase: "stack",
  MySQL: "stack",
  "Google Cloud": "stack",
  "Tailwind CSS": "stack",
  HTML: "stack",
  CSS: "stack",
  Vite: "stack",
  Expo: "stack",
  "Framer Motion": "stack",
  Python: "lang",
  TypeScript: "lang",
  JavaScript: "lang",
  Java: "lang",
  "C/C++": "lang",
};

export const familyOf = (name: string): SkillFamilyId | undefined => FAMILY_OF[name];

export const familyLabel = (id: SkillFamilyId) => SKILL_FAMILIES.find((f) => f.id === id)!.label;

export type FamilyGroup = { family?: SkillFamilyId; names: string[] };

/** จัด tag ของโปรเจกต์เป็นกลุ่มตามลำดับหมวด (คงลำดับเดิมภายในกลุ่ม) และต่อท้ายด้วยกลุ่มที่ไม่มีหมวด */
export function groupByFamily(names: readonly string[]): FamilyGroup[] {
  const groups: FamilyGroup[] = SKILL_FAMILIES.map(({ id }) => ({
    family: id,
    names: names.filter((name) => familyOf(name) === id),
  }));
  groups.push({ names: names.filter((name) => !familyOf(name)) });
  return groups.filter((group) => group.names.length > 0);
}
