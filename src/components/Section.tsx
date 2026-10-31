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
          {/* w-fit: เส้นขีดใต้ยาวเท่าชื่อหัวข้อ */}
          <h2 id={headingId} className="relative w-fit type-headline text-ink outline-none">
            {title}
            {/* เส้นปากกาแดงขีดใต้หัวข้อแบบมือขีด วาดตัวเองตอนเลื่อนมาเห็น (heading-scribble ใน index.css)
                non-scaling-stroke: เส้นหนาเท่ากันทุกหัวข้อแม้ svg ถูกยืดตามความยาวชื่อ */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full overflow-visible"
            >
              <path
                d="M2 8C40 3 78 11 118 6s62-2 80 1"
                pathLength={1}
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="heading-scribble"
              />
            </svg>
          </h2>
          {intro && <p className="mt-3 max-w-measure-lead type-lead text-ink-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
