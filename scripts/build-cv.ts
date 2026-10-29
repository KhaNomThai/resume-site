/**
 * สร้าง CV PDF (A4 หน้าเดียว) จาก src/data.ts → src/assets/Kulachart-Parnduangkeaw-CV.pdf
 * เว็บกับ CV ใช้ข้อมูลชุดเดียวกัน — แก้ data.ts แล้วรัน `npm run cv` (ต้องมี Google Chrome)
 * ไม่ใส่ที่อยู่บ้าน: ไฟล์นี้ใครก็ดาวน์โหลดจากเว็บได้
 */
import { resolve } from "node:path";
import {
  certifications,
  education,
  githubUrl,
  leadership,
  linkedinUrl,
  profile,
  projects,
  skillGroups,
  work,
  type TimelineItem,
} from "../src/data.ts";
import { ROOT, cvPhotoDataUri, esc, fontFaceCss, renderWithChrome } from "./lib/chrome.ts";

const OUTPUT = resolve(ROOT, "src/assets/Kulachart-Parnduangkeaw-CV.pdf");
/** CV ต้องจบในหน้าเดียว: เอาโปรเจกต์อันดับต้น ๆ และ bullet ของกิจกรรมแค่ไม่กี่ข้อ (ที่เหลืออยู่บนเว็บ) */
const CV_PROJECTS = 5;
const LEADERSHIP_BULLETS = 2;

const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const link = (href: string, text: string) => `<a href="${esc(href)}">${esc(text)}</a>`;

function item(title: string, org: string, period: string, body: string) {
  return `
    <div class="item">
      <div class="item-head">
        <p><span class="title">${title}</span> <span class="org">— ${esc(org)}</span></p>
        <span class="period">${esc(period)}</span>
      </div>
      ${body}
    </div>`;
}

const bullets = (lines: string[]) => `<ul>${lines.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>`;

const timeline = (it: TimelineItem, maxBullets = Infinity) =>
  item(esc(it.title), it.org, it.period, bullets(it.bullets.slice(0, maxBullets)));

const contactLine = [
  esc(profile.location),
  esc(profile.phone),
  link(`mailto:${profile.email}`, profile.email),
  link(profile.siteUrl, shortUrl(profile.siteUrl)),
  link(linkedinUrl, "linkedin.com/in/kulachart-parnduangkeaw"),
  link(githubUrl, shortUrl(githubUrl)),
]
  .map((part) => `<span class="nowrap">${part}</span>`)
  // ต้องมีช่องว่างคั่น ไม่งั้นทั้งบรรทัดตัดไม่ได้ → ล้นขอบ และ Chrome จะย่อทั้งหน้าให้พอดี (ตัวหนังสือเล็กลงทั้ง CV)
  .join(' <span class="sep">·</span> ');

const projectItems = projects
  .slice(0, CV_PROJECTS)
  .map((p) =>
    item(
      link(p.links[0].href, p.title),
      p.category,
      [p.context, p.year].filter(Boolean).join(" · "),
      `<p>${esc(p.desc)}</p><p class="tech">${p.tags.map(esc).join(" · ")}</p>`
    )
  )
  .join("");

const educationItems = [
  ...education.map((e) =>
    item(
      esc(e.degree),
      e.school,
      [e.period, e.graduation].filter(Boolean).join(" · "),
      `<p><span class="label">Coursework:</span> ${e.coursework.map(esc).join(", ")}</p>`
    )
  ),
  ...certifications.map((c) => item(esc(c.title), c.issuer, c.year, "")),
].join("");

const skillLines = skillGroups
  .map((g) => `<p><span class="label">${esc(g.title)}:</span> ${g.skills.map((s) => esc(s.name)).join(", ")}</p>`)
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name)} — CV</title>
<style>
${fontFaceCss()}
@page { size: A4; margin: 10mm 13mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { font-family: "Geist", sans-serif; font-size: 8.7pt; line-height: 1.34; color: #1f2937; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
header { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-bottom: 8px; border-bottom: 1.4px solid #0b1220; }
h1 { font-size: 20pt; line-height: 1.1; letter-spacing: -0.02em; color: #0b1220; font-weight: 650; }
.headline { margin-top: 2px; font-size: 10pt; color: #4338ca; font-weight: 550; }
.contact { margin-top: 5px; font-size: 7.9pt; color: #374151; }
.nowrap { white-space: nowrap; }
.sep { margin: 0 1px; color: #9ca3af; }
.photo { flex: none; width: 21mm; height: 21mm; border-radius: 50%; object-fit: cover; }
section { margin-top: 7px; }
h2 { font-family: "Geist Mono", monospace; font-size: 7.4pt; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #4338ca; padding-bottom: 2px; border-bottom: 0.6px solid #d1d5db; }
section > p { margin-top: 4px; }
.item { break-inside: avoid; margin-top: 4.5px; }
.item-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.title { font-weight: 600; color: #0b1220; }
.org { color: #4b5563; }
.period { flex: none; font-family: "Geist Mono", monospace; font-size: 7.2pt; color: #6b7280; }
/* ห้ามใช้ position กับ li: Chrome จะวาด (และเขียนข้อความลง PDF) ทีหลังเนื้อหาอื่นทั้งหมด
   → ATS ที่อ่านข้อความตามลำดับใน PDF จะเห็น bullet หลุดไปอยู่ท้ายไฟล์ */
ul { list-style: none; }
li { display: flex; gap: 6px; margin-top: 1px; }
li::before { content: ""; flex: none; width: 3.5px; height: 3.5px; margin: 0.55em 0 0 1px; border-radius: 50%; background: #6366f1; }
.tech { margin-top: 1px; font-family: "Geist Mono", monospace; font-size: 7pt; color: #6b7280; }
.label { font-weight: 600; color: #0b1220; }
.skills { display: grid; grid-template-columns: 1fr 1fr; column-gap: 18px; margin-top: 3px; }
.skills p { margin-top: 1.5px; }
</style>
</head>
<body>
  <header>
    <div>
      <h1>${esc(profile.name)}</h1>
      <p class="headline">${esc(profile.role)} · ${esc(profile.focus)}</p>
      <p class="contact">${contactLine}</p>
    </div>
    <img class="photo" src="${cvPhotoDataUri()}" alt="" />
  </header>

  <section><h2>Summary</h2><p>${esc(profile.cvSummary)}</p></section>
  <section><h2>Experience</h2>${work.map((w) => timeline(w)).join("")}</section>
  <section><h2>Projects</h2>${projectItems}</section>
  <section><h2>Leadership &amp; Teaching</h2>${leadership.map((l) => timeline(l, LEADERSHIP_BULLETS)).join("")}</section>
  <section><h2>Education &amp; Certifications</h2>${educationItems}</section>
  <section><h2>Skills</h2><div class="skills">${skillLines}</div></section>
</body>
</html>`;

renderWithChrome(html, [`--print-to-pdf=${OUTPUT}`, "--no-pdf-header-footer"]);
console.log(`CV → ${OUTPUT}`);
