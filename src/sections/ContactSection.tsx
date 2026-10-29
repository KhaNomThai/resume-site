import { m } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import { CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/icons";
import { contacts, profile, type ContactKind } from "../data";
import { linkProps } from "../lib/links";
import { revealOnView } from "../lib/motion";
import { trackSpotlight } from "../lib/spotlight";
import { useCopyEmail } from "../lib/useCopyEmail";

/** Presentation (icon) แยกจาก data — data.ts เก็บแค่ข้อมูลจริง */
const ICONS: Record<ContactKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  phone: PhoneIcon,
};

/** อีเมลมีปุ่มใหญ่ของตัวเองแล้ว รายการด้านล่างจึงไม่ต้องซ้ำ */
const OTHER_CONTACTS = contacts.filter((c) => c.kind !== "email");

export default function ContactSection() {
  const copyEmail = useCopyEmail();

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      subtitle="I'm open to Data/AI and full-stack internship opportunities. Email is the fastest way to reach me."
      width="narrow"
    >
      <m.address
        {...revealOnView()}
        onPointerMove={trackSpotlight}
        className="group relative isolate block overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 text-center not-italic md:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(480px_circle_at_var(--x,50%)_var(--y,0%),rgb(129_140_248/0.12),transparent_50%)]"
        />

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">Email</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-2 inline-block break-all text-2xl font-semibold tracking-tight text-white decoration-indigo-400/60 underline-offset-8 hover:underline md:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-indigo-100"
          >
            <MailIcon className="size-4" />
            Send an email
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
          >
            <CopyIcon className="size-4" />
            Copy email
          </button>
        </div>

        <ul className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {OTHER_CONTACTS.map((c) => {
            const Icon = ICONS[c.kind];
            return (
              <li key={c.kind}>
                <a
                  {...linkProps(c.href)}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.16] hover:bg-white/[0.05]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-gray-200">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-gray-400">{c.label}</span>
                    <span className="block truncate text-sm text-white">{c.value}</span>
                  </span>
                  <NewTabHint href={c.href} />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-400">
          <MapPinIcon className="size-4" />
          {profile.location}
        </p>
      </m.address>
    </Section>
  );
}
