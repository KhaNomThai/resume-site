/**
 * หา class ของ Tailwind ที่ไม่มีแล้วหลัง import src/styles/tokens.css
 * tokens.css ล้าง namespace color/font/text/radius/shadow ทิ้ง class พวกนี้จึงไม่ error แต่ไม่สร้าง CSS (หน้าเว็บพังเงียบ ๆ)
 * ระหว่าง Phase 3 ใช้เป็น checklist ว่าเหลือที่ไหนต้องย้ายไปใช้ token: `npm run check:tokens`
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const TARGETS = ["src", "index.html"];
// ไฟล์นิยาม token เอง: comment ยกตัวอย่าง class ที่ห้ามใช้
const SKIP = new Set(["src/styles/tokens.css"]);

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_UTILS =
  "bg|text|border(?:-[xytrblse])?|ring|ring-offset|outline|fill|stroke|from|via|to|decoration|divide|placeholder|accent|caret|shadow|inset-shadow";

const RULES: { name: string; pattern: string; hint: string }[] = [
  { name: "สี default", pattern: `(?:${COLOR_UTILS})-(?:(?:${PALETTE})-\\d{2,3}|white|black)`, hint: "ink, ink-muted, pen, surface, paper, rule, stroke, marker" },
  { name: "สี arbitrary", pattern: `(?:${COLOR_UTILS})-\\[#[0-9a-fA-F]{3,8}\\]`, hint: "ใช้ token สีแทนค่า hex" },
  { name: "ขนาดตัวอักษร default", pattern: "text-(?:xs|sm|base|lg|[2-9]?xl)", hint: "type-* หรือ text-12…text-72" },
  { name: "ฟอนต์ default", pattern: "font-mono", hint: "font-sans หรือ font-serif" },
  { name: "มุม default", pattern: "rounded(?:-[trblse]{1,2})?-(?:xs|sm|md|lg|[2-4]?xl)", hint: "rounded-tag, rounded-control, rounded-card" },
  { name: "เงา default", pattern: "(?:inset-)?shadow-(?:2xs|xs|sm|md|lg|[2]?xl)", hint: "shadow-overlay (เฉพาะของที่ลอย)" },
];

// ไม่ให้ติดกับคำที่ยาวกว่า เช่น `context-sm`; ข้างหน้าเป็น variant ได้ (`md:text-sm`) ข้างหลังเป็น opacity ได้ (`bg-white/50`)
const compiled = RULES.map((rule) => ({ ...rule, re: new RegExp(`(?<![\\w-])${rule.pattern}(?![\\w-])`, "g") }));

function* files(path: string): Generator<string> {
  const full = join(ROOT, path);
  if (/\.(tsx?|html|css)$/.test(path)) {
    if (!SKIP.has(path)) yield full;
    return;
  }
  for (const entry of readdirSync(full, { withFileTypes: true })) {
    if (entry.isDirectory() ? entry.name === "assets" : !/\.(tsx?|html|css)$/.test(entry.name)) continue;
    yield* files(join(path, entry.name));
  }
}

let count = 0;
for (const target of TARGETS) {
  for (const file of files(target)) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        for (const { name, re, hint } of compiled) {
          for (const match of line.matchAll(re)) {
            count++;
            console.log(`${relative(ROOT, file)}:${i + 1}  ${match[0]}  (${name} → ${hint})`);
          }
        }
      });
  }
}

if (count > 0) {
  console.log(`\nเจอ ${count} จุดที่ยังไม่ใช้ token`);
  process.exit(1);
}
console.log("ทุก class ใช้ token แล้ว");
