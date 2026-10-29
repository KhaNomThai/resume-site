import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "../components/Section";
import { leadership, work, type TimelineItem } from "../data";
import { revealOnView } from "../lib/motion";

/**
 * Timeline คอลัมน์เดียว ข้อความชิดซ้ายเสมอ (เดิมสลับซ้าย-ขวาและจัดชิดขวา อ่านยาก)
 * ตำแหน่งเส้น/จุด: มือถือ 7px จากซ้าย, จอ md อยู่กลางช่องว่างระหว่างคอลัมน์วันที่ (10rem) กับเนื้อหา
 */
const LINE_X = "left-[7px] md:left-[11.5rem]";

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.75", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" eyebrow="Experience" title="Work & leadership">
      <div ref={timelineRef} className="relative">
        <div aria-hidden="true" className={`absolute bottom-4 top-9 w-px bg-white/[0.08] ${LINE_X}`}>
          {/* เส้นเติมตามการเลื่อน: scaleY แทน height → ไม่ต้องคำนวณ layout ใหม่ทุกเฟรม */}
          <m.div
            className="size-full origin-top bg-gradient-to-b from-indigo-400 via-violet-400 to-sky-400/40"
            style={{ scaleY: reduceMotion ? 1 : lineScale }}
          />
        </div>

        <TimelineGroup title="Work" items={work} />
        <TimelineGroup title="Leadership & Teaching" items={leadership} className="mt-14" />
      </div>
    </Section>
  );
}

function TimelineGroup({ title, items, className }: { title: string; items: TimelineItem[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="mb-6 pl-8 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 md:pl-[13rem]">{title}</h3>
      <ol className="space-y-6">
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
    <m.li {...revealOnView()} className="relative pl-8 md:grid md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0">
      {/* -translate-x-1/2 ทุกขนาดจอ → จุดอยู่กึ่งกลางเส้นพอดี (เดิมใส่แค่ md: บนมือถือเลยเยื้อง) */}
      <span aria-hidden="true" className={`absolute top-[5px] flex size-3.5 -translate-x-1/2 items-center justify-center ${LINE_X}`}>
        {current && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/50 motion-reduce:animate-none" />
        )}
        <span className={`relative size-2.5 rounded-full ring-4 ring-ink ${current ? "bg-emerald-400" : "bg-indigo-400"}`} />
      </span>

      <p className="font-mono text-xs leading-6 text-gray-400 md:text-right">
        {item.period}
        {current && <span className="ml-2 text-emerald-300 md:ml-0 md:block">Current</span>}
      </p>

      <article className="mt-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors duration-300 hover:border-white/[0.14] md:mt-0 md:p-6">
        <h4 className="text-lg font-semibold tracking-tight text-white">{item.title}</h4>
        <p className="mt-0.5 text-sm text-indigo-300">{item.org}</p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-300">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-indigo-400/80" />
              {bullet}
            </li>
          ))}
        </ul>
      </article>
    </m.li>
  );
}
