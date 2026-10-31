# CLAUDE.md

Portfolio/resume ของ Kulachart (React 19 + TypeScript + Vite 7 + Tailwind v4 + Framer Motion) deploy บน Vercel ที่ https://kulachart-resume-site.vercel.app ทุกครั้งที่ push เข้า `main` เว็บจริงจะ deploy ทันที

## คำสั่ง

```bash
npm run dev           # http://localhost:5173
npm run build         # tsc -b + vite build → dist/
npm run lint
npm run check:tokens  # หา class ค่า default ของ Tailwind ที่ token ปิดไว้ (lint/build จับให้ไม่ได้)
npm run cv            # สร้าง PDF CV → src/assets/Kulachart-Parnduangkeaw-CV.pdf
npm run og            # สร้างรูป link preview → public/og-image.png
```

`cv`, `og` และ `check:tokens` รันไฟล์ `.ts` ด้วย Node ตรงๆ (ต้อง Node 22.18+) ส่วน `cv` กับ `og` ใช้ headless Google Chrome ถ้า Chrome ไม่อยู่ที่ default ให้ตั้ง `CHROME_PATH`

ก่อนบอกว่างานเสร็จ ให้รัน `npm run lint`, `npm run build` และ `npm run check:tokens` ให้ผ่าน

## กฎที่ต้องจำ

- **เนื้อหาทั้งหมดอยู่ใน [src/data.ts](src/data.ts)** ทั้งเว็บและ PDF CV ใช้ไฟล์นี้ อย่าเขียนข้อความเนื้อหาตายตัวใน component (บรรทัดนำของ section อยู่ใน `sectionIntros`)
- แก้ `data.ts` แล้ว hook ใน `.claude/hooks/regen-cv.sh` จะรัน `npm run cv` ให้เอง ถ้าแก้ไฟล์นอก Claude Code ต้องรันเอง
- รัน `npm run og` ด้วยเมื่อแก้สิ่งที่อยู่ในรูป OG:
  - ช่อง `profile`: firstName, lastName, focus, role, school, availability, siteUrl
  - 3 อันแรกของ `highlights`
  - รูป `src/assets/profile-640.webp`
  - สีใน `tokens.css` (สีในรูป OG คัดลอกไว้ใน `scripts/build-og.ts`)
- CV ต้องจบใน **A4 หน้าเดียว** ถ้าเพิ่มเนื้อหาแล้วล้น ให้ลด `CV_PROJECTS` หรือ `LEADERSHIP_BULLETS` ใน `scripts/build-cv.ts` เนื้อหาที่ตัดออกยังอยู่บนเว็บ
- PDF ที่สร้างใหม่โดยเนื้อหาไม่เปลี่ยนจะต่างจากเดิมแค่วันที่ใน metadata ไม่ต้อง commit ให้คืนไฟล์ด้วย `git checkout -- src/assets/Kulachart-Parnduangkeaw-CV.pdf`
- **ห้ามใส่ที่อยู่บ้านหรือข้อมูลส่วนตัวเพิ่ม** ทั้งในเว็บและ CV เพราะใครก็ดาวน์โหลด PDF ได้
- id และ label ของ section อยู่ที่ `src/config/sections.ts` ซึ่ง navbar, ⌘K palette และ scroll-spy ใช้ร่วมกัน
- URL ของเว็บเขียนตายตัวไว้ใน `index.html` (OG/JSON-LD) และ `src/data.ts` ถ้าโดเมนเปลี่ยนต้องแก้ทั้งสองที่
- skill หรือ tag ใหม่ใน `data.ts` ต้องเพิ่มใน `src/config/skillFamilies.ts` ด้วย ไม่อย่างนั้นถูกนับเป็น Tools โดยไม่มีอะไรเตือน ถ้าอยากให้มี logo ให้เพิ่มใน `src/config/skillLogos.ts`
- รักษา accessibility ที่มีอยู่: `prefers-reduced-motion`, skip link, focus state, hint สำหรับลิงก์ที่เปิดแท็บใหม่ (`NewTabHint`)
- Framer Motion โหลดผ่าน `LazyMotion` ให้ใช้ `m.*` ไม่ใช่ `motion.*` และห้าม animate property ที่ทำให้ layout เปลี่ยน

## Design system

แนว **Lab Notebook** รายละเอียดและเหตุผลของทุก token อยู่ใน [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) อ่านก่อนแตะเรื่อง UI

- token ทั้งหมดอยู่ที่ `src/styles/tokens.css` (import ใน `src/index.css`) ค่า default ของ Tailwind ในหมวดสี ขนาดตัวอักษร ฟอนต์ มุม และเงา (เช่น `bg-indigo-500`, `text-sm`, `rounded-xl`, `shadow-lg`) ถูกปิดไว้จึง **ใช้ไม่ได้** ให้ใช้ utility จาก token (`text-ink`, `bg-surface`, `type-body`, `rounded-card` ฯลฯ) ถ้าค่าที่ต้องการไม่มีใน token ให้ถามก่อนเพิ่ม
- class ที่ไม่มีใน token **ไม่ error** Tailwind แค่ไม่สร้าง CSS lint/build จึงผ่านทั้งที่หน้าเว็บพัง ดังนั้นหลังแก้ UI:
  1. รัน `npm run check:tokens`
  2. เปิดดูใน browser pane ด้วย `.claude/launch.json` (`dev`) ทั้งโหมดสว่างและมืด และที่ความกว้างมือถือ
- โหมดมืดเปลี่ยนค่า token เองตาม `data-theme` บน `<html>` ไม่ต้องเขียน `dark:` ถ้าไม่จำเป็นจริง
- ถ้าเปลี่ยนฟอนต์หรือไฟล์ฟอนต์ ต้องคำนวณ `size-adjust` ของฟอนต์สำรองใน `tokens.css` ใหม่ และแก้ชื่อไฟล์ใน `preloadFonts` ของ `vite.config.ts` ไม่อย่างนั้นหน้าจะกระโดดตอนฟอนต์โหลด (CLS) โดยที่ lint/build ยังผ่าน
- logo คือ **Serif K.** (`design/logo/k-serif*.svg`) กติกาการใช้อยู่ในหัวข้อ Logo ของ DESIGN_SYSTEM.md ห้ามลบ `design/logo/k-serif.svg` เพราะ `npm run og` อ่านไฟล์นี้
- `design/` เก็บบันทึกการตัดสินใจ ไฟล์ logo และรายงานก่อน/หลัง (`design/phase4-report.md`) ไม่ได้ถูก build เข้าเว็บ
- CV PDF มีดีไซน์ของตัวเองที่ใช้ฟอนต์ Geist แยกจากเว็บ จึงยังต้องมี `@fontsource-variable/geist` และ `geist-mono` ใน devDependencies

## เนื้อหาที่ยังรอข้อมูล

ข้อมูลที่เจ้าของต้องเติมเองมี `TODO` กำกับไว้ใน [src/data.ts](src/data.ts) (หาด้วย `git grep -n TODO -- src/data.ts`) ห้ามเดาหรือแต่งตัวเลขเอง

- `work`: ตัวเลขจริงใน bullet ของงานที่ Botnoi (ขนาด dataset, metric ก่อน/หลัง, จำนวนโมเดล) ถ้าเปิดเผยได้
- `education`: ยืนยันปีที่คาดว่าจะจบ (`Expected 2028`) และใส่ GPA ถ้าอยากแสดง

## สไตล์งาน

- เอกสารและ comment ในโค้ดเขียนเป็นภาษาไทย อธิบายว่า "ทำไม" มากกว่า "ทำอะไร" และไม่เล่าว่าโค้ดเคยเป็นแบบไหน
- commit message เป็นภาษาอังกฤษ ขึ้นต้นด้วยกริยา เช่น `Wire tokens into index.css`
