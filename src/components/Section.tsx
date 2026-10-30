import type { ReactNode } from "react";
import { SECTIONS, type SectionId } from "../config/sections";

type Props = {
  id: SectionId;
  /** บรรทัดนำหนึ่งบรรทัดใต้หัวข้อ (ไม่บังคับ) */
  intro?: string;
  children: ReactNode;
};

/**
 * หัว section ชั้นเดียว: ชื่อเดียวกับเมนู (จาก config/sections.ts) + บรรทัดนำถ้ามี
 * เดิมซ้อน 4 ชั้น (เส้นไล่สี, "01 / PROJECTS", หัวข้อกว้าง ๆ, subtitle) คนอ่านต้องผ่าน ~20 คำก่อนเจอเนื้อหา
 * เส้นบน section คือเส้นบรรทัดของหน้าสมุด แบ่งช่วงโดยไม่ต้องใช้กล่อง
 */
export default function Section({ id, intro, children }: Props) {
  const headingId = `${id}-heading`;
  const title = SECTIONS.find((s) => s.id === id)!.label;

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-rule py-12 md:py-16 xl:py-24">
      <div className="page-container">
        <header className="mb-12">
          <h2 id={headingId} className="type-headline text-ink outline-none">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-measure-lead type-lead text-ink-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
