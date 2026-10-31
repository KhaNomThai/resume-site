import type { ComponentType, SVGProps } from "react";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import { CopyIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/icons";
import { contacts, profile, sectionIntros, type ContactKind } from "../data";
import { linkProps } from "../lib/links";
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

/** อีเมลยาวบนจอแคบให้ตัดบรรทัดได้หลัง @ เท่านั้น (ผ่าน <wbr>) ไม่ใช่กลางคำแบบ "gmail.co / m" ที่ break-all ทำ */
const [EMAIL_USER, EMAIL_DOMAIN] = profile.email.split("@");

export default function ContactSection() {
  const copyEmail = useCopyEmail();

  return (
    <Section id="contact" intro={sectionIntros.contact}>
      <address className="grid gap-12 not-italic lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="type-label text-ink-muted">Email</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 inline-block font-serif text-24 font-medium leading-8 text-pen underline decoration-2 underline-offset-4 transition-colors duration-(--duration-fast) hover:text-pen-hover md:text-36 md:leading-11"
          >
            {EMAIL_USER}@<wbr />
            {EMAIL_DOMAIN}
          </a>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-control bg-pen px-4 type-label text-on-pen transition-colors duration-(--duration-fast) hover:bg-pen-hover"
            >
              <MailIcon className="size-4" />
              Send an email
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-11 items-center gap-2 rounded-control border border-stroke bg-surface px-4 type-label text-ink transition-colors duration-(--duration-fast) hover:border-ink"
            >
              <CopyIcon className="size-4" />
              Copy email
            </button>
          </div>

          <p className="mt-6 flex items-center gap-1 type-small text-ink-muted">
            <MapPinIcon className="size-4" />
            {profile.location}
          </p>
        </div>

        <ul className="border-t border-rule">
          {OTHER_CONTACTS.map((c) => {
            const Icon = ICONS[c.kind];
            return (
              <li key={c.kind} className="border-b border-rule">
                <a {...linkProps(c.href)} className="group flex min-h-11 items-center gap-4 py-4">
                  <Icon className="size-5 shrink-0 text-ink-muted" />
                  <span className="min-w-0">
                    <span className="block type-small text-ink-muted">{c.label}</span>
                    <span className="block truncate type-body text-pen underline underline-offset-3 group-hover:text-pen-hover">
                      {c.value}
                    </span>
                  </span>
                  <NewTabHint href={c.href} />
                </a>
              </li>
            );
          })}
        </ul>
      </address>
    </Section>
  );
}
