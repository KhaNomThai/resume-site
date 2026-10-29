import { m } from "framer-motion";
import type { ReactNode } from "react";
import { SECTIONS, type SectionId } from "../config/sections";
import { EASE_OUT } from "../lib/motion";

const WIDTHS = { narrow: "max-w-3xl", default: "max-w-5xl", wide: "max-w-6xl" } as const;

type Props = {
  id: SectionId;
  /** ป้ายเล็กเหนือหัวข้อ — ใช้ชื่อเดียวกับเมนู */
  eyebrow: string;
  title: string;
  subtitle?: string;
  width?: keyof typeof WIDTHS;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, subtitle, width = "default", children }: Props) {
  const headingId = `${id}-heading`;
  const number = String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <section id={id} aria-labelledby={headingId} className="relative py-20 md:py-28">
      <div className={`${WIDTHS[width]} mx-auto px-6`}>
        <m.header
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* เส้นวาดออกจากซ้าย: scaleX (compositor) แทนการอนิเมต width ที่ต้องคำนวณ layout ทุกเฟรม */}
          <m.div
            aria-hidden="true"
            className="mb-6 h-px origin-left bg-gradient-to-r from-indigo-400/70 via-white/10 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-indigo-300">
            <span aria-hidden="true" className="text-gray-500">
              {number} /{" "}
            </span>
            {eyebrow}
          </p>
          <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight text-white outline-none md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">{subtitle}</p>}
        </m.header>
        {children}
      </div>
    </section>
  );
}
