# CLAUDE.md

Portfolio/resume ของ Kulachart (React 19 + TypeScript + Vite 7 + Tailwind v4 + Framer Motion) deploy บน Vercel ที่ https://kulachart-resume-site.vercel.app

## คำสั่ง

```bash
npm run dev     # http://localhost:5173
npm run build   # tsc -b + vite build → dist/
npm run lint
npm run cv      # สร้าง PDF CV → src/assets/Kulachart-Parnduangkeaw-CV.pdf
npm run og      # สร้างรูป link preview → public/og-image.png
npm run check:tokens  # หา class Tailwind default ที่ใช้ไม่ได้หลังต่อ token (Phase 3)
```

`cv` กับ `og` รันไฟล์ `.ts` ด้วย Node ตรงๆ (ต้อง Node 22.18+) และใช้ headless Google Chrome ถ้า Chrome ไม่อยู่ที่ default ให้ตั้ง `CHROME_PATH`

ก่อนบอกว่างานเสร็จ ให้รัน `npm run lint` และ `npm run build` ให้ผ่าน

## กฎที่ต้องจำ

- **เนื้อหาทั้งหมดอยู่ใน [src/data.ts](src/data.ts)** ทั้งเว็บและ PDF CV ใช้ไฟล์นี้ อย่าเขียนข้อความเนื้อหาตายตัวใน component
- แก้ `data.ts` แล้ว hook ใน `.claude/hooks/regen-cv.sh` จะรัน `npm run cv` ให้เอง ถ้าแก้ไฟล์นอก Claude Code ต้องรันเอง และถ้าแก้ `profile.firstName/lastName/role/focus/availability` ต้องรัน `npm run og` ด้วย
- CV ต้องจบใน **A4 หน้าเดียว** ถ้าเพิ่มเนื้อหาแล้วล้น ให้ลด `CV_PROJECTS` หรือ `LEADERSHIP_BULLETS` ใน `scripts/build-cv.ts` เนื้อหาที่ตัดออกยังอยู่บนเว็บ
- **ห้ามใส่ที่อยู่บ้านหรือข้อมูลส่วนตัวเพิ่ม** ทั้งในเว็บและ CV เพราะใครก็ดาวน์โหลด PDF ได้
- id และ label ของ section อยู่ที่ `src/config/sections.ts` ซึ่ง navbar, ⌘K palette และ scroll-spy ใช้ร่วมกัน
- URL ของเว็บเขียนตายตัวไว้ใน `index.html` (OG/JSON-LD) และ `src/data.ts` ถ้าโดเมนเปลี่ยนต้องแก้ทั้งสองที่
- รักษา accessibility ที่มีอยู่: `prefers-reduced-motion`, skip link, focus state, hint สำหรับลิงก์ที่เปิดแท็บใหม่ (`NewTabHint`)
- Framer Motion โหลดผ่าน `LazyMotion` ให้ใช้ `m.*` ไม่ใช่ `motion.*` และห้าม animate property ที่ทำให้ layout เปลี่ยน

## Redesign (branch `redesign`)

กำลังเปลี่ยนเป็นแนว **Lab Notebook** รายละเอียดทั้งหมดอยู่ใน [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) อ่านก่อนแตะเรื่อง UI

- Phase 1 ✅ token ใน `src/styles/tokens.css`
- Phase 2 ✅ logo K สามแบบใน `design/logo/` และหน้า preview `design/logo-preview.html`
- Phase 3 ⏳ import token เข้า `src/index.css` แล้วเปลี่ยน component ให้ใช้ token

เมื่อ token ถูก import แล้ว ค่า default ของ Tailwind (เช่น `bg-indigo-500`, `text-sm`, `rounded-xl`, `shadow-lg`) จะ **ใช้ไม่ได้** ให้ใช้ utility จาก token (`text-ink`, `bg-surface`, `type-body`, `rounded-card` ฯลฯ) ถ้าค่าที่ต้องการไม่มีใน token ให้ถามก่อนเพิ่ม

class ที่ไม่มีใน token **ไม่ error** Tailwind แค่ไม่สร้าง CSS ทำให้ lint/build ผ่านทั้งที่หน้าเว็บพัง ดังนั้นหลังแก้ UI:
1. รัน `npm run check:tokens` (ระหว่าง Phase 3 ใช้เป็น checklist ว่าเหลือไฟล์ไหนบ้าง)
2. เปิดดูใน browser pane ด้วย `.claude/launch.json` (`dev`) ทั้งโหมดสว่างและมืด และที่ความกว้างมือถือ

## สไตล์งาน

- เอกสารและ comment ในโค้ดเขียนเป็นภาษาไทย
- commit message เป็นภาษาอังกฤษ ขึ้นต้นด้วยกริยา เช่น `Phase 3: wire tokens into index.css`
