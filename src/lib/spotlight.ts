import type { PointerEvent } from "react";

/**
 * อัปเดตตำแหน่งแสง (--x, --y) ตามเมาส์ผ่าน CSS variable ตรง ๆ
 * ไม่ใช้ React state → ไม่ re-render ทุกครั้งที่เมาส์ขยับ
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}
