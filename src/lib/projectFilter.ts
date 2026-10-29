import { createContext, useContext } from "react";
import { projects } from "../data";

export type ProjectFilter = {
  /** tag ที่เลือกอยู่ (null = แสดงทุกโปรเจกต์) */
  tag: string | null;
  setTag: (tag: string | null) => void;
};

/** แชร์ตัวกรองระหว่าง Skills (ปุ่ม skill) กับ Projects (แถบกรอง) */
export const ProjectFilterContext = createContext<ProjectFilter>({ tag: null, setTag: () => {} });

export const useProjectFilter = () => useContext(ProjectFilterContext);

/** ข้อมูล static → นับครั้งเดียวตอนโหลด module */
export const projectCountByTag: ReadonlyMap<string, number> = projects
  .flatMap((p) => p.tags)
  .reduce((counts, tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1), new Map<string, number>());
