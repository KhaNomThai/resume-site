/**
 * ให้ style ของ React รับ CSS custom property ได้ (เช่น `--brand-light`, `--swipe-delay`)
 * CSSProperties ของ React ไม่รู้จักชื่อที่ขึ้นต้นด้วย `--` จึงต้อง cast `as CSSProperties` ทุกที่
 * ซึ่งปิดการตรวจ type ของ property อื่นในก้อนเดียวกันไปด้วย ประกาศเพิ่มที่นี่ที่เดียวแทน
 */
export {};

declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
