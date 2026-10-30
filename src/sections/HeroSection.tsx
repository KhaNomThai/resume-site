import avatar320 from "../assets/profile-320.webp";
import avatar640 from "../assets/profile-640.webp";
import NewTabHint from "../components/NewTabHint";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from "../components/icons";
import { TOP_ID } from "../config/sections";
import { githubUrl, highlights, linkedinUrl, profile } from "../data";
import { CV_FILENAME, CV_URL } from "../lib/cv";
import { highlightPhrases } from "../lib/highlight";
import { linkProps } from "../lib/links";

/** ปุ่มรอง: พื้นบัตรคำ ขอบ stroke (ขอบ control ต้องได้ 3:1) */
const LINE_BUTTON =
  "inline-flex h-11 items-center gap-2 rounded-control border border-stroke bg-surface px-4 type-label text-ink transition-colors duration-(--duration-fast) hover:border-ink";

/**
 * หน้าแรกของสมุด: ภายใน 5 วินาทีต้องบอกได้ว่าเป็นใคร (ชื่อ) ทำอะไร (role + summary) และมองหางานอะไร (availability)
 * ลำดับตามที่ recruiter สแกน: ชื่อ → ตำแหน่ง → งานที่หา → หลักฐาน (ถูกขีดเน้น) → ปุ่ม → ตัวเลขสรุป
 * motion มีอย่างเดียว คือปากกาเน้นขีดผ่านหลักฐานสองจุดตอนโหลด (ไม่มี fade-in ของข้อความ)
 */
export default function HeroSection() {
  return (
    <section id={TOP_ID} aria-labelledby="hero-heading" className="relative isolate pt-(--nav-height)">
      <div aria-hidden="true" className="hero-grid -z-10 print:hidden" />

      <div className="page-container pb-16 pt-12 md:pb-24 md:pt-16 xl:pt-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <div>
            <h1 id="hero-heading" className="type-display text-ink">
              {/* แยกบรรทัดตามชื่อ-นามสกุล: "Parnduangkeaw" เป็นคำเดียว ตัดกลางคำไม่ได้ */}
              <span className="block">{profile.firstName}</span>
              <span className="block">{profile.lastName}</span>
            </h1>

            <p className="mt-6 type-title text-ink">
              {profile.role}, {profile.school}
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {/* งานที่มองหา: กรอบบางแบบตราประทับ ให้เห็นแยกจากข้อความรอบข้าง โดยไม่ต้องใช้สีสถานะ */}
              <li className="rounded-tag border border-stroke px-2 py-1 type-label text-ink">{profile.availability}</li>
              <li className="flex items-center gap-1 type-small text-ink-muted">
                <MapPinIcon className="size-4" />
                {profile.location}
              </li>
            </ul>

            <p className="mt-6 max-w-measure-lead type-lead text-ink">
              {highlightPhrases(profile.summary, profile.summaryMarks)}
            </p>

            {/* ปุ่มหลักคือสิ่งที่ recruiter อยากกดที่สุด: resume (เดิมเป็น "View projects") */}
            <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
              <a
                href={CV_URL}
                download={CV_FILENAME}
                className="inline-flex h-11 items-center gap-2 rounded-control bg-pen px-4 type-label text-on-pen transition-colors duration-(--duration-fast) hover:bg-pen-hover"
              >
                <DownloadIcon className="size-4" />
                Download resume (PDF)
              </a>
              <a {...linkProps(githubUrl)} className={LINE_BUTTON}>
                <GitHubIcon className="size-4" />
                GitHub
                <NewTabHint href={githubUrl} />
              </a>
              <a {...linkProps(linkedinUrl)} className={LINE_BUTTON}>
                <LinkedInIcon className="size-4" />
                LinkedIn
                <NewTabHint href={linkedinUrl} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 px-2 type-label text-pen underline underline-offset-3 transition-colors duration-(--duration-fast) hover:text-pen-hover"
              >
                <MailIcon className="size-4" />
                Email
              </a>
            </div>
          </div>

          {/* รูปอยู่ข้างขวาเฉพาะจอใหญ่: บนจอเล็กเดิมรูปอยู่บนสุดและดันชื่อลงไปถึง 35% ของจอ */}
          <figure className="hidden lg:block">
            <img
              src={avatar320}
              srcSet={`${avatar320} 320w, ${avatar640} 640w`}
              sizes="240px"
              alt={`Portrait of ${profile.name}`}
              width={240}
              height={240}
              fetchPriority="high"
              className="aspect-square w-full rounded-card border border-rule object-cover"
            />
          </figure>
        </div>

        {/* ตัวเลขสรุป: dt/dd ตามความหมาย แต่สลับลำดับที่ตาเห็น ค่าจึงอยู่บน */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 border-t border-rule md:mt-16 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col-reverse justify-end gap-1 pt-4 pb-2">
              <dt className="type-small text-ink-muted">{h.label}</dt>
              <dd className="type-title text-ink">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
