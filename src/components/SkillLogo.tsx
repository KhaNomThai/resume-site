import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { BrandLogo } from "../config/skillLogos";

type BrandLogos = Readonly<Record<string, BrandLogo>>;

/** skill ที่ใช้ logo เดียวกับอีกตัว */
const SAME_LOGO_AS: Readonly<Record<string, string>> = { "React Native": "React" };

/**
 * path ของ logo แบรนด์หนัก ~13 KB (gzip) และ Skills อยู่ลึกลงไปหลายจอ จึงแยกเป็น chunk ที่โหลดหลังหน้าเว็บขึ้นแล้ว
 * ระหว่างรอ ช่อง logo ว่างไว้ (ช่องกว้างคงที่ใน SkillRow) layout จึงไม่ขยับตอน logo มาถึง
 */
let loaded: BrandLogos | null = null;
let loading: Promise<BrandLogos> | null = null;

function useBrandLogos() {
  const [logos, setLogos] = useState(loaded);
  useEffect(() => {
    if (logos) return;
    let alive = true;
    loading ??= import("../config/skillLogos").then((m) => (loaded = m.BRAND_LOGOS));
    loading.then((l) => alive && setLogos(l));
    return () => {
      alive = false;
    };
  }, [logos]);
  return logos;
}

/**
 * skill ที่ไม่มี logo ใน Simple Icons (Matplotlib, Seaborn) และ skill ที่เป็นแนวคิด ไม่ใช่ผลิตภัณฑ์
 * วาดเป็นเส้นหมึก 1.75px บน grid 24 ให้หนักพอ ๆ กับ logo แบบทึบข้างเคียง
 */
/** สีของไอคอนที่วาดเอง: Matplotlib/Seaborn ใช้สีหลักของโลโก้จริง ส่วนแนวคิดไม่มีแบรนด์ จึงใช้สี pen */
const DRAWN_HEX: Readonly<Record<string, string>> = { Matplotlib: "11557C", Seaborn: "4C72B0" };

const DRAWN: Readonly<Record<string, ReactNode>> = {
  // แกนกราฟ + เส้นข้อมูล: หน้าที่หลักของ Matplotlib
  Matplotlib: (
    <>
      <path d="M3.5 3v17.5H21" />
      <path d="m6.5 16 4-5 3.5 3 6-8" />
    </>
  ),
  // เส้นโค้งการแจกแจงทับแท่ง histogram: กราฟที่คนใช้ Seaborn ทำบ่อยที่สุด
  Seaborn: (
    <>
      <path d="M3 20.5h18" />
      <path d="M3 18c3 0 4-11 9-11s6 11 9 11" />
      <path d="M8 20.5v-6M12 20.5V9.5M16 20.5v-6" opacity="0.5" />
    </>
  ),
  // โครงข่ายเล็ก ๆ 2-2-1 โหนด: โมเดลที่เรียนรู้ความสัมพันธ์จากข้อมูล
  "Machine Learning": (
    <>
      <circle cx="4" cy="7" r="1.75" />
      <circle cx="4" cy="17" r="1.75" />
      <circle cx="12" cy="7" r="1.75" />
      <circle cx="12" cy="17" r="1.75" />
      <circle cx="20" cy="12" r="1.75" />
      <path d="M5.75 7h4.5M5.75 17h4.5M5.5 8.2l5 7.6M5.5 15.8l5-7.6M13.6 8l4.8 3M13.6 16l4.8-3" />
    </>
  ),
  // ชั้นซ้อนกันหลายชั้น: "deep"
  "Deep Learning": (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  // ตา + กรอบตรวจจับวัตถุ
  "Computer Vision": (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

/** contrast ระหว่างสองสี (WCAG) ใช้ตัดสินว่าสีแบรนด์มองเห็นบนกระดาษของแต่ละโหมดหรือไม่ */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const PAPER_LIGHT = luminance("f6f8fb");
const PAPER_DARK = luminance("14171c");

/**
 * สีแบรนด์แยกตามโหมด: สีที่กลืนกับกระดาษ (เช่น Unity สีขาวบนพื้นสว่าง, NumPy น้ำเงินเข้มบนพื้นมืด)
 * ใช้ ink แทน logo จึงไม่กลืนหายไปกับพื้น (ค่า paper ต้องตรงกับ --color-paper ใน tokens.css)
 */
function brandVars(hex: string) {
  const lum = luminance(hex);
  return {
    "--brand-light": contrast(lum, PAPER_LIGHT) < 1.2 ? "var(--color-ink)" : `#${hex}`,
    "--brand-dark": contrast(lum, PAPER_DARK) < 2 ? "var(--color-ink)" : `#${hex}`,
  } as CSSProperties;
}

/**
 * logo ของ skill (ตกแต่ง ชื่อ skill เป็นข้อความอยู่ข้าง ๆ เสมอ)
 * เป็นสีแบรนด์ต้นฉบับ ส่วนไอคอนที่วาดเองใช้สีของโลโก้จริงถ้ามี ไม่มีก็ใช้สี pen (utility skill-logo ใน index.css)
 */
export default function SkillLogo({ name, className = "" }: { name: string; className?: string }) {
  const logos = useBrandLogos();
  const brand = logos?.[SAME_LOGO_AS[name] ?? name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" style={brandVars(brand.hex)} className={`skill-logo fill-current ${className}`}>
        <path d={brand.path} />
      </svg>
    );
  }
  const drawn = DRAWN[name];
  if (!drawn) return null; // logo แบรนด์ยังโหลดไม่เสร็จ หรือ skill นี้ไม่มี logo
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={DRAWN_HEX[name] ? brandVars(DRAWN_HEX[name]) : undefined}
      className={`skill-logo fill-none stroke-current ${className}`}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawn}
    </svg>
  );
}
