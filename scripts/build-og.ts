/**
 * สร้างภาพ preview ตอนแชร์ลิงก์ (og:image 1200×630) จาก src/data.ts → public/og-image.png
 * รัน `npm run og` (ต้องมี Google Chrome) — ภาพนี้คือสิ่งแรกที่คนเห็นเมื่อแชร์ลิงก์ใน LinkedIn/LINE/Facebook
 * หน้าตาเดียวกับ hero ของเว็บ (แนว Lab Notebook): สีคือค่าโหมดสว่างใน src/styles/tokens.css
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { highlights, profile } from "../src/data.ts";
import { ROOT, avatarDataUri, esc, fontFaceCss, renderWithChrome } from "./lib/chrome.ts";

const OUTPUT = resolve(ROOT, "public/og-image.png");
/** logo Serif K. ตัวเดียวกับ navbar (ไฟล์ต้นฉบับ) */
const LOGO = readFileSync(resolve(ROOT, "design/logo/k-serif.svg"), "utf8");
/** ขีดปากกาเน้นแค่ 2 ค่าแรก (ตำแหน่งงาน + ผลลัพธ์) ตามกติกาไม่เกิน 2 จุดต่อหน้าจอ */
const MARKED = 2;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
${fontFaceCss()}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body {
  position: relative; display: flex; align-items: center; justify-content: space-between; gap: 56px;
  padding: 0 84px 0 124px;
  font-family: "IBM Plex Sans", sans-serif; color: #141b2b; background: #f6f8fb;
}
/* กระดาษกราฟเริ่มที่เส้น margin สีแดง (x = 96) แล้วจางไปทางขวาล่าง */
body::before {
  content: ""; position: absolute; inset: 0 0 0 96px;
  background-image: linear-gradient(#dce3ed 1px, transparent 1px), linear-gradient(90deg, #dce3ed 1px, transparent 1px);
  background-size: 24px 24px;
  -webkit-mask-image: linear-gradient(135deg, black 35%, transparent 85%);
}
body::after { content: ""; position: absolute; top: 0; bottom: 0; left: 96px; width: 2px; background: #d9464e; }
.text { position: relative; z-index: 1; max-width: 760px; }
.logo { display: block; width: 52px; height: 52px; margin-left: -4px; }
h1 { margin-top: 14px; font-family: "Newsreader", serif; font-weight: 500; font-size: 76px; line-height: 0.98; letter-spacing: -0.015em; }
.role { margin-top: 18px; font-family: "Newsreader", serif; font-weight: 600; font-size: 25px; line-height: 1.25; white-space: nowrap; }
.stamp { display: inline-block; margin-top: 14px; padding: 5px 12px; border: 1.5px solid #7e899a; border-radius: 4px; font-size: 18px; font-weight: 600; }
.facts { display: flex; gap: 32px; margin-top: 30px; white-space: nowrap; }
.fact b { display: block; font-family: "Newsreader", serif; font-weight: 600; font-size: 24px; line-height: 1.2; }
.fact b mark { background: #ffe566; color: #141b2b; padding: 0 4px; border-radius: 2px; }
.fact span { display: block; margin-top: 4px; font-size: 16px; color: #4b5568; }
.side { position: relative; z-index: 1; flex: none; width: 260px; }
.photo { display: block; width: 260px; height: 260px; border-radius: 8px; border: 1px solid #d5dce6; object-fit: cover; }
.url { margin-top: 12px; font-size: 17px; color: #4b5568; }
</style>
</head>
<body>
  <div class="text">
    ${LOGO.replace("<svg ", '<svg class="logo" ')}
    <h1>${esc(profile.firstName)}<br />${esc(profile.lastName)}</h1>
    <p class="role">${esc(profile.role)} · ${esc(profile.focus)}</p>
    <p class="stamp">${esc(profile.availability)}</p>
    <div class="facts">${highlights
      .slice(0, 3)
      .map(
        (h, i) =>
          `<p class="fact"><b>${i < MARKED ? `<mark>${esc(h.value)}</mark>` : esc(h.value)}</b><span>${esc(h.label)}</span></p>`
      )
      .join("")}</div>
  </div>
  <div class="side">
    <img class="photo" src="${avatarDataUri()}" alt="" />
    <p class="url">${esc(profile.siteUrl.replace(/^https?:\/\//, ""))}</p>
  </div>
</body>
</html>`;

renderWithChrome(html, [`--screenshot=${OUTPUT}`, "--window-size=1200,630", "--force-device-scale-factor=1"]);
console.log(`og:image → ${OUTPUT}`);
