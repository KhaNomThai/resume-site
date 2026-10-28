import { motion, type Variants } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import NewTabHint from "../components/NewTabHint";
import Section from "../components/Section";
import { ChevronRightIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/icons";
import { contacts, type ContactKind } from "../data";
import { linkProps } from "../lib/links";

type ContactStyle = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  icon: string;
  border: string;
};

/** Presentation (icon/สี) แยกจาก data — data.ts เก็บแค่ข้อมูลจริง */
const STYLES: Record<ContactKind, ContactStyle> = {
  location: { Icon: MapPinIcon, gradient: "from-rose-500/20 to-orange-500/20", icon: "text-rose-400", border: "hover:border-rose-500/30" },
  phone: { Icon: PhoneIcon, gradient: "from-emerald-500/20 to-teal-500/20", icon: "text-emerald-400", border: "hover:border-emerald-500/30" },
  email: { Icon: MailIcon, gradient: "from-blue-500/20 to-cyan-500/20", icon: "text-blue-400", border: "hover:border-blue-500/30" },
  github: { Icon: GitHubIcon, gradient: "from-gray-500/20 to-gray-400/20", icon: "text-gray-300", border: "hover:border-gray-400/30" },
  linkedin: { Icon: LinkedInIcon, gradient: "from-blue-600/20 to-blue-500/20", icon: "text-blue-500", border: "hover:border-blue-500/30" },
};

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: 40 + i * 10, y: 10 }),
  show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 16, mass: 0.5 } },
};

export default function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Let's Connect"
      title="Get in Touch"
      subtitle="Feel free to reach out anytime."
      accent="emerald"
      narrow
    >
      <address className="not-italic">
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-3"
        >
          {contacts.map((c, i) => {
            const { Icon, gradient, icon, border } = STYLES[c.kind];
            return (
              <motion.li key={c.kind} custom={i} variants={item}>
                <motion.a
                  {...linkProps(c.href)}
                  whileHover={{ x: 6 }}
                  className={`group relative isolate flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${border} transition-[background-color,border-color,box-shadow] duration-300`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] ${icon} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{c.label}</p>
                    <p className="truncate text-white">{c.value}</p>
                  </div>
                  <ChevronRightIcon className="size-4 shrink-0 text-gray-500 group-hover:text-white/60 transition-colors" />
                  <NewTabHint href={c.href} />
                </motion.a>
              </motion.li>
            );
          })}
        </motion.ul>
      </address>
    </Section>
  );
}
