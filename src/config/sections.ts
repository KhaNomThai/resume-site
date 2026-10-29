/** Single source of truth: Navbar, ⌘K palette, scroll-spy และ <section id> ใช้ค่าชุดเดียวกัน (เรียงตามลำดับบนหน้า) */
export const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** id ของ Hero — ปลายทางของโลโก้และ "Back to top" */
export const TOP_ID = "top";
