/**
 * สร้างภาพ preview ตอนแชร์ลิงก์ (og:image 1200×630) จาก src/data.ts → public/og-image.png
 * รัน `npm run og` (ต้องมี Google Chrome) — ภาพนี้คือสิ่งแรกที่คนเห็นเมื่อแชร์ลิงก์ใน LinkedIn/LINE/Facebook
 */
import { resolve } from "node:path";
import { highlights, profile } from "../src/data.ts";
import { ROOT, avatarDataUri, esc, fontFaceCss, renderWithChrome } from "./lib/chrome.ts";

const OUTPUT = resolve(ROOT, "public/og-image.png");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
${fontFaceCss()}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body {
  position: relative; display: flex; align-items: center; justify-content: space-between; gap: 56px; padding: 0 84px;
  font-family: "Geist", sans-serif; color: #fff;
  background:
    radial-gradient(ellipse 60% 70% at 85% 20%, rgb(99 102 241 / 0.32), transparent 70%),
    radial-gradient(ellipse 50% 60% at 10% 100%, rgb(14 165 233 / 0.16), transparent 70%),
    #0b1220;
}
body::before {
  content: ""; position: absolute; inset: 0;
  background-image: linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 40% 50%, black, transparent);
}
.text { position: relative; max-width: 700px; }
.badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 999px; border: 1px solid rgb(52 211 153 / 0.3); background: rgb(52 211 153 / 0.08); color: #6ee7b7; font-size: 20px; font-weight: 500; }
.badge i { width: 10px; height: 10px; border-radius: 50%; background: #34d399; }
h1 { margin-top: 26px; font-size: 76px; line-height: 1.02; letter-spacing: -0.03em; font-weight: 650; }
h1 span { display: block; background: linear-gradient(90deg, #a5b4fc, #c4b5fd, #7dd3fc); -webkit-background-clip: text; color: transparent; padding-bottom: 6px; }
.role { margin-top: 18px; font-family: "Geist Mono", monospace; font-size: 22px; color: #c7d2fe; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
.chip { padding: 9px 16px; border-radius: 12px; border: 1px solid rgb(255 255 255 / 0.1); background: rgb(255 255 255 / 0.05); font-size: 19px; color: #e5e7eb; }
.chip b { font-weight: 600; color: #fff; }
.avatar { position: relative; flex: none; width: 300px; height: 300px; border-radius: 50%; padding: 5px; background: conic-gradient(from 0deg, #818cf8, #c084fc, #38bdf8, #818cf8); box-shadow: 0 0 120px rgb(99 102 241 / 0.35); }
.avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 7px solid #0b1220; }
.url { position: absolute; left: 84px; bottom: 40px; font-family: "Geist Mono", monospace; font-size: 18px; color: #9ca3af; }
</style>
</head>
<body>
  <div class="text">
    <p class="badge"><i></i>${esc(profile.availability)}</p>
    <h1>${esc(profile.firstName)}<span>${esc(profile.lastName)}</span></h1>
    <p class="role">${esc(profile.role)} · ${esc(profile.focus)}</p>
    <div class="chips">${highlights
      .slice(0, 3)
      .map((h) => `<span class="chip"><b>${esc(h.value)}</b> · ${esc(h.label)}</span>`)
      .join("")}</div>
  </div>
  <div class="avatar"><img src="${avatarDataUri()}" alt="" /></div>
  <p class="url">${esc(profile.siteUrl.replace(/^https?:\/\//, ""))}</p>
</body>
</html>`;

renderWithChrome(html, [`--screenshot=${OUTPUT}`, "--window-size=1200,630", "--force-device-scale-factor=1"]);
console.log(`og:image → ${OUTPUT}`);
