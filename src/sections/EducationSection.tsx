import { m } from "framer-motion";
import Section from "../components/Section";
import { AcademicCapIcon, BadgeCheckIcon } from "../components/icons";
import { certifications, education } from "../data";
import { revealOnView } from "../lib/motion";

const CARD = "rounded-2xl border border-white/[0.07] bg-white/[0.025] transition-colors duration-300 hover:border-white/[0.14]";

export default function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" title="Education & certifications">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {education.map((it) => (
          <m.article key={it.id} {...revealOnView()} className={`${CARD} p-6 md:p-8`}>
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"
              >
                <AcademicCapIcon className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">{it.degree}</h3>
                <p className="mt-1 text-indigo-300">{it.school}</p>
                <p className="mt-1 font-mono text-xs text-gray-400">
                  {it.period}
                  {it.graduation && ` · ${it.graduation}`}
                </p>
              </div>
            </div>

            {it.coursework.length > 0 && (
              <>
                <h4 className="mb-3 mt-7 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">Relevant coursework</h4>
                <ul className="flex flex-wrap gap-2">
                  {it.coursework.map((course) => (
                    <li key={course} className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-sm text-gray-200">
                      {course}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </m.article>
        ))}

        <div className="grid content-start gap-5">
          {certifications.map((cert) => (
            <m.article key={cert.id} {...revealOnView(0.08)} className={`${CARD} p-6`}>
              <p className="flex items-center gap-2 font-mono text-xs text-gray-400">
                <BadgeCheckIcon className="size-5 text-emerald-400" />
                Certification · {cert.year}
              </p>
              <h3 className="mt-4 font-semibold tracking-tight text-white">{cert.title}</h3>
              <p className="mt-1 text-sm text-indigo-300">{cert.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{cert.desc}</p>
            </m.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
