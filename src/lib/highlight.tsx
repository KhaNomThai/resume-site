import type { CSSProperties, ReactNode } from "react";

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** ระยะห่างระหว่างการขีดแต่ละครั้ง: เหมือนคนขีดทีละจุด ไม่ใช่พร้อมกันทั้งหมด */
const STAGGER_MS = 280;
const FIRST_DELAY_MS = 240;

/**
 * ครอบวลีที่กำหนดด้วย <mark> แล้วเล่นการขีดปากกาเน้นตอนโหลดหน้า (utility mark-swipe ใน index.css)
 * วลีต้องเป็นข้อความที่อยู่ใน text จริง — ถ้าหาไม่เจอ (เช่นแก้ summary แล้วลืมแก้ summaryMarks) จะเตือนใน dev
 */
export function highlightPhrases(text: string, phrases: readonly string[] = []): ReactNode[] {
  if (import.meta.env.DEV) {
    for (const phrase of phrases) {
      if (!text.includes(phrase)) console.warn(`highlightPhrases: ไม่พบ "${phrase}" ในข้อความ`);
    }
  }
  if (phrases.length === 0) return [text];

  let markIndex = 0;
  return text.split(new RegExp(`(${phrases.map(escapeRegExp).join("|")})`)).map((part, i) => {
    if (!phrases.includes(part)) return part;
    const style: CSSProperties = { "--swipe-delay": `${FIRST_DELAY_MS + markIndex++ * STAGGER_MS}ms` };
    return (
      <mark key={i} className="mark-swipe" style={style}>
        {part}
      </mark>
    );
  });
}
