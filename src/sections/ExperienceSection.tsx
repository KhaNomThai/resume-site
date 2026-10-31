import Section from "../components/Section";
import { leadership, work, type TimelineItem } from "../data";

/**
 * บันทึกเรียงตามเวลาแบบสมุด: วันที่อยู่คอลัมน์ซ้าย เนื้อหาอยู่ขวา แต่ละรายการคั่นด้วยเส้นบรรทัด
 * ไม่ใส่เส้น timeline ที่เติมตามการเลื่อนหรือจุดกะพริบ เพราะเป็น motion ที่ไม่ได้ตอบการกระทำของผู้ใช้ (ดู Motion ใน DESIGN_SYSTEM.md)
 */
export default function ExperienceSection() {
  return (
    <Section id="experience">
      <TimelineGroup title="Work" items={work} />
      <TimelineGroup title="Leadership & Teaching" items={leadership} className="mt-16" />
    </Section>
  );
}

function TimelineGroup({ title, items, className = "" }: { title: string; items: TimelineItem[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="mb-2 type-label text-ink-muted">{title}</h3>
      <ol className="border-t border-rule">
        {items.map((item) => (
          <TimelineEntry key={item.id} item={item} />
        ))}
      </ol>
    </div>
  );
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const current = item.period.includes("Present");

  return (
    <li className="reveal grid gap-2 border-b border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
      <p className="type-small tabular-nums text-ink-muted">
        {item.period}
        {current && <span className="ml-2 type-label text-ink md:ml-0 md:block">Current</span>}
      </p>
      <div>
        <h4 className="type-title text-ink">{item.title}</h4>
        <p className="mt-1 type-body text-ink-muted">{item.org}</p>
        <ul className="mt-3 max-w-measure space-y-2 type-body text-ink">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              {/* ขีดสั้นแบบจดโน้ต แทนจุดสี */}
              <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-ink-muted" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
