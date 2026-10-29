import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import avatar320 from "../assets/profile-320.webp";
import avatar640 from "../assets/profile-640.webp";
import { ArrowDownIcon, ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from "../components/icons";
import { TOP_ID } from "../config/sections";
import { githubUrl, highlights, linkedinUrl, profile } from "../data";
import { CV_FILENAME, CV_URL } from "../lib/cv";
import { isExternal, linkProps } from "../lib/links";
import { EASE_OUT } from "../lib/motion";

/** ทุกอย่างขึ้นครบภายใน ~0.8 วินาที — คนเปิดเว็บเห็นปุ่มหลักทันที */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE_OUT, delay },
});

function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] print:hidden"
    />
  );
}

function Avatar() {
  return (
    <div className="relative size-28 sm:size-32 lg:size-60">
      <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-indigo-500/20 blur-3xl print:hidden" />
      {/* วงแหวนไล่สีหมุนช้า ๆ: CSS rotate บน compositor, หยุดเองเมื่อ prefers-reduced-motion */}
      <div
        aria-hidden="true"
        className="absolute -inset-[3px] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#818cf8,#c084fc,#38bdf8,#818cf8)] print:hidden"
      />
      {/* LCP image: ระบุขนาด (กัน layout shift) + fetchPriority="high" + srcSet ให้คมบนจอ Retina */}
      <img
        src={avatar320}
        srcSet={`${avatar320} 320w, ${avatar640} 640w`}
        sizes="(min-width: 1024px) 240px, 128px"
        alt={`Portrait of ${profile.name}`}
        width={240}
        height={240}
        fetchPriority="high"
        className="relative size-full rounded-full object-cover ring-4 ring-ink"
      />
    </div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      {...linkProps(href)}
      aria-label={isExternal(href) ? `${label} (opens in a new tab)` : label}
      title={label}
      className="flex size-11 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </a>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // จางลงตอนเลื่อนผ่าน — ไม่ขยับตำแหน่ง (เดิม parallax ดันเนื้อหาลงไปโดนขอบ section ตัด)
  const fade = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section
      id={TOP_ID}
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pb-14 pt-24"
    >
      <Backdrop />

      <m.div style={reduceMotion ? undefined : { opacity: fade }} className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="text-center lg:text-left">
            <m.p
              {...enter(0)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 text-xs font-medium text-emerald-300"
            >
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </m.p>

            <m.h1
              {...enter(0.05)}
              id="hero-heading"
              // มือถือ 40px: "Parnduangkeaw" เป็นคำเดียวตัดบรรทัดไม่ได้ — 48px จะล้นจอกว้าง 375px
              className="mt-5 text-[2.5rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              {/* แยกบรรทัดชัดเจน → gradient ไล่สีในแต่ละบรรทัด ไม่จางทั้งบรรทัดตอนตัดคำ */}
              <span className="block text-white">{profile.firstName}</span>
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text pb-1 text-transparent">
                {profile.lastName}
              </span>
            </m.h1>

            <m.div {...enter(0.1)} className="mt-4 space-y-1.5">
              <p className="font-mono text-sm text-indigo-200/90">
                {profile.role} · {profile.school}
              </p>
              <p className="flex items-center justify-center gap-1.5 text-sm text-gray-400 lg:justify-start">
                <MapPinIcon className="size-4" />
                {profile.location}
              </p>
            </m.div>

            <m.p
              {...enter(0.15)}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg lg:mx-0"
            >
              {profile.summary}
            </m.p>

            <m.div
              {...enter(0.2)}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 print:hidden lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-indigo-100"
              >
                View projects
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={CV_URL}
                download={CV_FILENAME}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
              >
                <DownloadIcon className="size-4" />
                Download CV
                <span className="sr-only">(PDF)</span>
              </a>
              <div className="flex gap-2">
                <IconLink href={githubUrl} label="GitHub">
                  <GitHubIcon className="size-[18px]" />
                </IconLink>
                <IconLink href={linkedinUrl} label="LinkedIn">
                  <LinkedInIcon className="size-[18px]" />
                </IconLink>
                <IconLink href={`mailto:${profile.email}`} label="Email">
                  <MailIcon className="size-5" />
                </IconLink>
              </div>
            </m.div>
          </div>

          <m.div {...enter(0.1)} className="order-first mx-auto lg:order-none">
            <Avatar />
          </m.div>
        </div>

        <m.dl
          {...enter(0.3)}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:mt-14 lg:grid-cols-4"
        >
          {highlights.map((h) => (
            // dt/dd ตามลำดับความหมาย แต่สลับลำดับที่ตาเห็น → ตัวเลขเด่นอยู่บน
            <div key={h.label} className="flex flex-col-reverse justify-end gap-1 bg-ink/90 p-4 sm:p-5">
              <dt className="text-xs text-gray-400">{h.label}</dt>
              <dd className="text-base font-semibold tracking-tight text-white sm:text-lg">{h.value}</dd>
            </div>
          ))}
        </m.dl>
      </m.div>

      {/* อยู่นอก wrapper ที่มี transform → ตำแหน่งไม่กระโดด และซ่อนบนจอเตี้ยที่ไม่มีที่ว่าง */}
      <a
        href="#projects"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center justify-center rounded-full p-2 text-gray-500 transition-colors hover:text-white [@media(min-height:860px)]:flex print:hidden"
      >
        <ArrowDownIcon className="size-5 animate-bounce motion-reduce:animate-none" />
        <span className="sr-only">Scroll to projects</span>
      </a>
    </section>
  );
}
