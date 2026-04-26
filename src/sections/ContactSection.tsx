import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data";
import ScrollReveal from "../components/ScrollReveal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardSlide = (i: number): Variants => ({
  hidden: { opacity: 0, x: 40 + i * 10, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 16, mass: 0.5 },
  },
});

const contactItems = [
  {
    label: "Location",
    value: profile.address,
    href: "https://maps.app.goo.gl/fzGmUcjpDZtsVkXE8",
    color: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400",
    borderHover: "hover:border-rose-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone?.replace(/\s+/g, "")}`,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: profile.github,
    href: `https://github.com/${profile.github}`,
    color: "from-gray-500/20 to-gray-400/20",
    iconColor: "text-gray-300",
    borderHover: "hover:border-gray-400/30",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Kulachart",
    href: `https://www.linkedin.com/in/${profile.linkedin}`,
    color: "from-blue-600/20 to-blue-500/20",
    iconColor: "text-blue-500",
    borderHover: "hover:border-blue-500/30",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.2"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="contact" ref={ref} className="relative py-32 snap-section scroll-mt-14">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        style={{ width: lineWidth }}
      />

      <ScrollReveal>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs tracking-[0.3em] uppercase text-emerald-400 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Feel free to reach out anytime.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-3"
        >
          {contactItems.map((c, i) => (
            <motion.a
              key={c.label}
              variants={cardSlide(i)}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              className={`group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] ${c.borderHover} transition-all duration-300 relative overflow-hidden`}
              whileHover={{ x: 6, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center ${c.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>
              <div className="relative z-10 min-w-0 flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{c.label}</p>
                <p className="text-white truncate">{c.value}</p>
              </div>
              <motion.svg
                className="relative z-10 w-4 h-4 text-gray-600 group-hover:text-white/60 transition-colors flex-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                initial={false}
                animate={{}}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </motion.svg>
            </motion.a>
          ))}
        </motion.div>
      </div>
      </ScrollReveal>
    </section>
  );
}
