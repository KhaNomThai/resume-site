import Section from "../components/Section";
import { BadgeCheckIcon } from "../components/icons";
import { certifications, education } from "../data";

/** บัตรคำเดียวกับการ์ดโปรเจกต์: พื้น surface ขอบ rule เส้นแดงใต้ชื่อ */
const CARD = "rounded-card border border-rule bg-surface p-6";

export default function EducationSection() {
  return (
    <Section id="education">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {education.map((it) => (
          <article key={it.id} className={`reveal ${CARD} md:p-8`}>
            <h3 className="border-b border-margin pb-2 type-title text-ink">{it.degree}</h3>
            <p className="mt-3 type-body text-ink">{it.school}</p>
            <p className="mt-1 type-small tabular-nums text-ink-muted">
              {it.period}
              {it.graduation && `, ${it.graduation}`}
            </p>

            {it.coursework.length > 0 && (
              <>
                <h4 className="mt-6 type-label text-ink-muted">Relevant coursework</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {it.coursework.map((course) => (
                    <li key={course} className="rounded-tag border border-rule px-2 py-1 type-small text-ink">
                      {course}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}

        <div className="grid content-start gap-6">
          {certifications.map((cert) => (
            <article key={cert.id} className={`reveal ${CARD}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-margin pb-2">
                <h3 className="type-title text-ink">{cert.title}</h3>
                <span className="type-caption tabular-nums text-ink-muted">{cert.year}</span>
              </div>
              <p className="mt-3 flex items-center gap-1 type-small text-ink-muted">
                <BadgeCheckIcon className="size-4" />
                Certification, {cert.issuer}
              </p>
              <p className="mt-3 type-body text-ink">{cert.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
