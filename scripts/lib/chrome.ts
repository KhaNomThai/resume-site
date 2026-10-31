import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const ROOT = resolve(import.meta.dirname, "../..");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

function findChrome() {
  const found = CHROME_CANDIDATES.find((path) => path !== undefined && existsSync(path));
  if (!found) throw new Error("ไม่พบ Chrome — ตั้ง env CHROME_PATH ให้ชี้ไปที่ไฟล์ Chrome/Chromium");
  return found;
}

/**
 * เขียน HTML ลงไฟล์ชั่วคราวแล้วให้ Chrome headless render ตาม flags (print-to-pdf / screenshot)
 * ใช้ user-data-dir ชั่วคราว → ไม่ชนกับ Chrome ที่เปิดใช้งานอยู่
 */
export function renderWithChrome(html: string, flags: string[]) {
  const dir = mkdtempSync(join(tmpdir(), "resume-site-"));
  const file = join(dir, "page.html");
  writeFileSync(file, html);
  try {
    execFileSync(
      findChrome(),
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        "--virtual-time-budget=3000",
        `--user-data-dir=${join(dir, "profile")}`,
        ...flags,
        pathToFileURL(file).href,
      ],
      { stdio: "pipe" }
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const dataUri = (path: string, mime: string) =>
  `data:${mime};base64,${readFileSync(resolve(ROOT, path)).toString("base64")}`;

/**
 * ฝังฟอนต์เป็น base64 → render ได้ทันทีไม่ต้องรอโหลดไฟล์
 * Newsreader + IBM Plex Sans เป็นชุดเดียวกับเว็บ (ใช้กับรูป OG) ส่วน CV PDF มีดีไซน์ของตัวเองที่ใช้ Geist / Geist Mono
 * Geist จึงยังต้องอยู่ใน devDependencies ถ้าเปลี่ยน CV ไปใช้ฟอนต์ของเว็บเมื่อไร ลบสองแพ็กเกจนั้นได้
 */
export function fontFaceCss() {
  const face = (family: string, path: string, weight = "100 900") =>
    `@font-face { font-family: "${family}"; font-weight: ${weight}; src: url(${dataUri(path, "font/woff2")}) format("woff2"); }`;
  return [
    face("Newsreader", "node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2", "200 800"),
    face("IBM Plex Sans", "node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2", "100 700"),
    face("Geist", "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"),
    face("Geist Mono", "node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"),
  ].join("\n");
}

/** PDF เก็บ JPEG ได้ตรง ๆ (WebP จะถูกแปลงเป็น bitmap ไม่บีบอัด ไฟล์ใหญ่หลายร้อย KB) */
export const cvPhotoDataUri = () => dataUri("scripts/assets/cv-photo.jpg", "image/jpeg");
export const avatarDataUri = () => dataUri("src/assets/profile-640.webp", "image/webp");

/** escape ข้อความก่อนแทรกลง HTML */
export const esc = (text: string) =>
  text.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch] ?? ch);
