# รายงาน Audit โปรเจกต์ resume-site (31 ต.ค. 2026)

ตรวจโค้ด dependency ไฟล์ comment เอกสาร และการตั้งค่า Claude Code ทั้งหมดบน `main` ตาม `CLAUDE.md` และ `DESIGN_SYSTEM.md`

- **จุดเริ่ม:** tag `pre-audit-20261031` (commit `19d2c2b`) ย้อนกลับได้ด้วย `git reset --hard pre-audit-20261031`
- **push แล้ว** หลังเจ้าของ review (Vercel deploy `main` อัตโนมัติ) รวม commit หลัง review ที่อยู่ในหัวข้อท้ายรายงาน

| Commit | Phase | เรื่อง |
|---|---|---|
| `c3e392f` | 1 | แก้ bug เล็ก ๆ และลบ dead code |
| `8f23959` | 2 | `npm audit fix` แบบไม่ข้าม major |
| `b15fa63` | 4 | เขียน comment ใหม่ให้อธิบายเหตุผล ตัดประวัติ redesign |
| `cc313e5` | 5 | README และ DESIGN_SYSTEM ให้ตรงกับโค้ด |
| `e117655` | 6 | CLAUDE.md, hook และ permission |

Phase 3 ไม่มี commit เพราะไม่มีไฟล์ไหนต้องลบ ส่วน Phase 7 เป็นข้อเสนอเท่านั้น

## ผลก่อน/หลัง

| ตรวจ | ก่อน (`pre-audit-20261031`) | หลัง |
|---|---|---|
| `npm run lint` | ผ่าน | ผ่าน |
| `npm run build` | ผ่าน | ผ่าน |
| `npm run check:tokens` | ผ่าน (0 จุด) | ผ่าน (0 จุด) |
| `npm audit` | 23 (high 7, moderate 14, low 2) | 12 (moderate ทั้งหมด อยู่ในชุด ESLint ที่ใช้ตอนพัฒนาเท่านั้น) |
| JS หลัก (gzip) | 103.87 KB | 103.97 KB (+0.1 KB จาก hint ใน ⌘K และการจัดการ chunk โหลดไม่สำเร็จ) |
| CSS (gzip) | 8.35 KB | 8.35 KB |
| CV PDF | A4 หน้าเดียว | A4 หน้าเดียว เนื้อหาเหมือนเดิม (ต่างแค่วันที่ใน metadata จึงไม่ได้ commit ไฟล์ใหม่) |
| หน้าตาเว็บ | — | เหมือนเดิม (เทียบทีละ pixel ต่างแค่จุดที่ขึ้นกับจังหวะ animation ดูหัวข้อ Phase 8) |

## Phase 1: โค้ด

### bug ที่แก้ (behavior เปลี่ยน)

1. **⌘K "Back to top" ไม่ย้าย focus** คำสั่งนี้หาหัวข้อที่ id `top-heading` แต่หัวข้อของ hero คือ `hero-heading` focus จึงกลับไปที่ปุ่มค้นหาแทนที่จะไปอยู่ที่ชื่อ ตอนนี้หาหัวข้อจาก `aria-labelledby` ของ section จึงถูกทุก section และใส่ `outline-none` ให้ชื่อใน hero แบบเดียวกับหัว section อื่น ทดสอบในเบราว์เซอร์แล้ว focus ไปที่ `hero-heading`
2. **คำสั่งเปิดลิงก์ใน ⌘K ไม่บอกว่าจะเปิดแท็บใหม่** GitHub, LinkedIn และ "View source code" มีข้อความสำหรับ screen reader "(opens in a new tab)" แล้ว เหมือนลิงก์ภายนอกอื่นทั้งเว็บ (มองไม่เห็นบนจอ)
3. **โหลด logo ของ skill ไม่สำเร็จแล้ว error ซ้ำ ๆ** ถ้า chunk `skillLogos` โหลดไม่ได้ (เช่นเน็ตหลุด) ทุกแถวของ skill (~30 แถว) จะมี unhandled promise rejection ตอนนี้จับ error ไว้ แสดงแค่ไอคอนที่วาดเอง และลองโหลดใหม่ครั้งหน้าที่ component ถูก mount

### ปรับโค้ดโดยไม่เปลี่ยนหน้าตา

- **เนื้อหาออกจาก component:** บรรทัดนำของ Projects, Skills และ Contact เคยเขียนตายตัวใน component ย้ายไปไว้ที่ `sectionIntros` ใน `data.ts` แล้ว (บรรทัดของ Contact ยังพูดซ้ำกับ `profile.availability` ตอนนี้อยู่ไฟล์เดียวกันจึงแก้คู่กันได้)
- **type ของลิงก์โปรเจกต์:** `links` ต้องมีอย่างน้อย 1 ลิงก์ (`[ProjectLink, ...ProjectLink[]]`) เพราะการ์ดและ CV อ่าน `links[0]` ถ้าลืมใส่ลิงก์ TypeScript จะฟ้องแทนที่จะพังตอนรัน
- **ตัด type assertion:**
  - เพิ่ม `src/types/css.d.ts` ให้ `style` รับ CSS custom property (`--brand-light`, `--swipe-delay`) ได้ จึงเลิก `as CSSProperties` ได้ 3 จุด
  - เปลี่ยน `e.target as Node` ใน Navbar เป็น `instanceof Node`
- **ลบ dead code:**
  - ไอคอนที่ไม่มีใครใช้ 4 ตัว: `ArrowUpRightIcon`, `ArrowRightIcon`, `ArrowDownIcon`, `AcademicCapIcon`
  - `position: relative` บน `<html>` ที่มีไว้ให้ `useScroll` ของ framer-motion ซึ่งไม่ได้ใช้แล้ว

### ตรวจแล้วไม่ต้องแก้

- **กฎของโปรเจกต์:** ใช้ `m.*` ทุกจุด ไม่มี `motion.*` และไม่มี class ค่า default ของ Tailwind (`check:tokens` = 0)
- **animation ไม่แตะ layout:** ขยับแค่ `translate`, `scale`, `rotate`, `opacity`, `background-size`, `stroke-dashoffset` และสี
- **ไม่มี memory leak:**
  - event listener ทุกตัวมี cleanup (scroll, keydown, pointer, matchMedia)
  - IntersectionObserver ทุกตัว disconnect
  - timer ของ toast ถูก clear
  - requestAnimationFrame ใน hero ถูก cancel
- **hook dependency:** ถูกทุกจุด (`useMemo`/`useCallback`/`useEffect`) และ `SPY_IDS` เป็นค่าคงที่ระดับ module ตามที่ comment กำกับไว้
- **accessibility ยังครบ:**
  - `prefers-reduced-motion` ปิด motion ทั้ง CSS และ framer-motion
  - skip link ไปที่ `#main`
  - focus ring เดียวกันทั้งเว็บ
  - `NewTabHint` ครบทุกลิงก์ภายนอก
- **ข้อมูล:** ตรวจด้วยสคริปต์แล้ว
  - skill และ tag ทุกตัวมีหมวด (ยกเว้น Git, Figma, Unity ที่ตั้งใจให้เป็น Tools)
  - skill ทุกตัวมี logo
  - `summaryMarks` ตรงกับ `summary`
  - id โปรเจกต์ไม่ซ้ำ
- **TypeScript:**
  - ไม่มี `any`
  - `as const` 4 จุดเป็นการใช้ปกติ
  - non-null `!` เหลือ 3 จุด ไม่เสี่ยงเพราะ type รับประกันว่ามีค่า:
    - `getElementById("root")!` ใน `main.tsx`
    - `SECTIONS.find(...)!` ใน `Section.tsx` (id เป็น type `SectionId`)
    - `SKILL_FAMILIES.find(...)!` ใน `skillFamilies.ts` (id เป็น type `SkillFamilyId`)
- **export ที่ใช้แค่ในไฟล์ตัวเอง** (ไม่ใช่ dead code):
  - type ของ `data.ts`: `ProjectLink`, `EducationItem`, `Highlight`, `ContactLink` เก็บ export ไว้เพราะเป็น schema ของเนื้อหา
  - `Theme`, `ShowToast`, `ProjectFilter`, `FamilyGroup` เป็น type ของค่าที่ฟังก์ชันคืน

### เจอแต่ไม่ได้แก้ในรอบแรก (แก้แล้วหลัง review ดูท้ายรายงาน)

- **ปากกาเน้นใน hero โหมดมืด:** ข้อความใน `<mark>` ใช้สี `on-marker` (หมึกเข้ม) ตั้งแต่ก่อนแถบเหลืองมาถึง ในโหมดมืดวลี "25,000+ images" และ "Data Science Intern at Botnoi Group (2026)" จึงมองไม่เห็นราว 0.2–0.5 วินาทีแรก (contrast ≈ 1:1 บนพื้น paper) แล้วค่อยโผล่ตามแถบเหลือง `mark-pending` ของการ์ดแก้ปัญหานี้ไว้แล้วด้วย `color: inherit` แต่ `mark-swipe` ของ hero ยังไม่ได้ทำ ถ้าตกลง แก้ได้ด้วยการให้สีข้อความเปลี่ยนเป็น `on-marker` พร้อมกับแถบเหลือง

## Phase 2: Dependencies

### Geist: ไม่ได้ลบ เพราะยังใช้อยู่

ข้อสันนิษฐานว่า `@fontsource-variable/geist` และ `geist-mono` ไม่ได้ใช้นั้นไม่ถูก grep เจอว่า **CV PDF ยังใช้อยู่**:
- `scripts/lib/chrome.ts` ฝังไฟล์ `geist-latin-wght-normal.woff2` และ `geist-mono-latin-wght-normal.woff2`
- `scripts/build-cv.ts` ตั้ง `font-family: "Geist"` และ `"Geist Mono"` (CV ยังเป็นดีไซน์ชุดก่อน redesign)

ถ้าลบ `npm run cv` จะพัง จึงเก็บไว้ ถ้าอยากลบ ต้องออกแบบ CV ใหม่ให้ใช้ Newsreader + IBM Plex Sans ก่อน (ดู Phase 7)

### package อื่น

ทุก package ถูกใช้จริง และไม่ได้ลบ `tailwindcss` ตามที่สั่ง (ใช้ผ่าน `@import` ใน CSS และ `@tailwindcss/vite`) ส่วน `@types/node`, `@types/react` และ `@types/react-dom` ถูกใช้ผ่าน tsconfig แม้ grep ใน `import` จะไม่เจอ

### npm audit

รัน `npm audit fix` (ไม่ใส่ `--force`) ทุกอย่างจึงอยู่ในช่วงเวอร์ชันของ `package.json` เดิม:
- Vite ขึ้นจาก 7.3.2 เป็น 7.3.7 และ ESLint จาก 9.39.1 เป็น 9.39.5
- ที่เหลือเป็น package ลูก เช่น postcss, nanoid, esbuild, js-yaml, brace-expansion
- ผล: high และ low หายหมด จาก 23 เหลือ 12

ที่เหลือ 12 รายการเป็น moderate ทั้งหมด มาจาก `minimatch` ในชุด ESLint / typescript-eslint บวก `eslint-plugin-react-refresh` ซึ่งยังไม่มีเวอร์ชันแก้ ทั้งหมดใช้ตอนรัน lint เท่านั้น ไม่ถูก build เข้าเว็บ แก้ได้ด้วยการอัปเกรด ESLint เป็น 10 (major)

### package ที่มี major ใหม่ (ไม่ได้อัปเกรด)

| Package | ตอนนี้ | major ล่าสุด | หมายเหตุ |
|---|---|---|---|
| `vite` | 7.3.7 | 8.3.5 | ต้องอัปเกรด `@vitejs/plugin-react` เป็น 6 พร้อมกัน |
| `@vitejs/plugin-react` | 5.1.0 | 6.1.2 | |
| `typescript` | 5.9.3 | 7.0.2 | ตัว compiler ใหม่ ควรทดสอบแยก |
| `framer-motion` | 12.23.24 | 14.9.0 | ดูข้อเสนอเลิกใช้ใน Phase 7 ก่อนตัดสินใจอัปเกรด |
| `eslint`, `@eslint/js` | 9.39.x | 10.x | ปิด audit ที่เหลือได้ |
| `eslint-plugin-react-hooks` | 5.2.0 | 7.1.1 | มีกฎของ React Compiler เพิ่ม อาจมี warning ใหม่ |
| `eslint-plugin-react-refresh` | 0.4.26 | 0.5.7 | |
| `globals` | 16.5.0 | 17.13.0 | |
| `@types/node` | 24.x | 26.x | ควรตรงกับ Node ที่ใช้รันจริง |

ยังมีเวอร์ชันใหม่ในช่วงเดิมที่ `npm update` ทำได้โดยไม่ข้าม major เช่น Tailwind 4.1.16 เป็น 4.3.3 และ React 19.2.0 เป็น 19.3.1 ผมไม่ได้ทำ เพราะไม่ใช่การแก้ช่องโหว่ และควรเปิดดูหน้าเว็บหลังอัปเกรด

## Phase 3: ไฟล์ที่ไม่ได้ใช้

ทุกไฟล์ใน `src/`, `public/` และ `scripts/` มีที่อ้างถึง (ตรวจด้วย grep ทั้งโปรเจกต์ รวม `index.html`, config และเอกสาร) จึงไม่ได้ลบอะไร

### `design/` (ตอนตรวจ ก่อนเจ้าของเลือกให้ลบ)

| กลุ่ม | ไฟล์ | ขนาด | ใครอ้างถึง |
|---|---|---|---|
| logo ที่ใช้จริง | `logo/k-serif.svg`, `-dark`, `-mono`, `-favicon` (4 ไฟล์) | 4.6 KB | `npm run og` อ่าน `k-serif.svg` และเป็นต้นฉบับของ favicon กับ `Logo.tsx` |
| logo ที่ไม่ได้เลือก | 6 แบบ × 4 ไฟล์ (`k-cell`, `k-curves`, `k-marker`, `k-scatter`, `k-sign`, `k-split`) | 27.1 KB | `logo-preview.html` |
| หน้าเทียบ logo | `logo-preview.html` | 55.5 KB | `DESIGN_SYSTEM.md` (บันทึกการตัดสินใจ) |
| รายงานก่อน/หลัง | `phase4-report.md` + `phase4/*.webp` (7 รูป) | 31 KB + 1.02 MB | ลิงก์จาก `DESIGN_SYSTEM.md` 1 จุด |
| ข้อเสนอเนื้อหา | `content-proposals.md` | 15.6 KB | ไม่มี |

ทางเลือก:

| ทางเลือก | ผล |
|---|---|
| **A. เก็บไว้ตามเดิม** (ผมแนะนำ) | รวมแค่ 1.2 MB และไม่ถูก build เข้าเว็บ เป็นหลักฐานการตัดสินใจที่ใช้ตอบคำถามในสัมภาษณ์ได้ |
| B. ย้ายไป `design/archive/` | ย้าย logo ที่ไม่ได้เลือก + `logo-preview.html` + `content-proposals.md` (ต้องย้ายคู่กัน เพราะ preview อ้างถึงไฟล์ logo แบบ relative) ส่วน `k-serif*.svg` ต้องอยู่ที่เดิม ถ้าย้าย `phase4-report.md` ต้องแก้ลิงก์ใน `DESIGN_SYSTEM.md` |
| C. ลบ | ลด repo ได้ราว 1.1 MB (ส่วนใหญ่คือรูปใน `phase4/`) แต่เสียบันทึกการตัดสินใจ ห้ามลบ `k-serif*.svg` |

หมายเหตุ: `content-proposals.md` เล่าว่าจะเลิกแสดง logo ของ skill และลบ `src/assets/skills/` ซึ่งตอนนั้นทำจริง แต่หลังจากนั้นเว็บกลับมาใช้ logo สีแบรนด์ (จาก Simple Icons ใน `src/config/skillLogos.ts`) ถ้าเก็บไฟล์นี้ไว้ อาจเพิ่มหมายเหตุสั้น ๆ ว่าข้อนี้เปลี่ยนภายหลัง

## Phase 4: Comment

- **ภาษา:** ภาษาไทยตาม `CLAUDE.md` (ช่องเลือกภาษาในคำสั่งเว้นว่างไว้ ผมจึงยึด CLAUDE.md)
- **สิ่งที่เปลี่ยน:**
  - comment ที่เล่าว่าเคยเป็นแบบไหน ("เดิม…", "Phase 1/3", "แนว A/C", "ยังไม่ได้ออกแบบใหม่") เปลี่ยนเป็นเหตุผลว่าทำไมโค้ดเป็นแบบนี้ ทั้งใน `HeroSection`, `Section`, `ContactSection`, `ProjectsSection`, `ExperienceSection`, `tokens.css`, `check-tokens.ts`, `build-og.ts` และ `chrome.ts`
  - แก้ comment ที่ไม่ตรงกับโค้ดแล้ว:
    - เงา `shadow-overlay` ถูกใช้มากกว่า palette กับ toast
    - `dark:` ไม่มี component ไหนใช้
    - comment ของ print ใน `index.css` อ้าง animation ที่เลื่อนแล้วโผล่ ซึ่งไม่มีแล้ว
    - ที่มาของไอคอนใน `icons.tsx`
  - ย้าย doc comment ที่ลอยอยู่ใน `SkillLogo.tsx` ไปไว้เหนือโค้ดที่มันอธิบาย
  - เพิ่มเหตุผลที่คนนอกต้องรู้:
    - สีใน `build-og.ts` คัดลอกจาก tokens ต้องแก้คู่กัน
    - ทำไม Geist ยังต้องอยู่
    - tag ใหม่ที่ลืมเพิ่มใน `skillFamilies.ts` จะไม่มีอะไรเตือน
- **TODO ใน `src/data.ts` (ไม่ได้แตะ):**
  - บรรทัด 269 (`work`): ใส่ตัวเลขจริงใน bullet ของงานที่ Botnoi ถ้าเปิดเผยได้ (ขนาด dataset, metric ก่อน/หลัง, จำนวนโมเดล)
  - บรรทัด 332 (`education`): ตรวจปีจบ (`Expected 2028`) และเพิ่ม GPA ถ้าอยากแสดง

## Phase 5: เอกสาร

- **README:**
  - แก้ tech stack (Newsreader + IBM Plex Sans แทน Geist)
  - แก้ project structure (ไม่มี devicon ใน assets และไม่มี motion presets) และเพิ่ม `styles/`, `config/`, `types/`, `design/`
  - เพิ่ม `check:tokens`, `preview` และลิงก์ไป `DESIGN_SYSTEM.md`
  - บอกว่าต้องใช้ Node 22.18+ และระบุว่าแก้ช่องไหนแล้วต้องรัน `npm run og`
- **ทดสอบ Getting started จริง:** clone ใหม่แล้วรัน `npm install`, `lint`, `build`, `check:tokens` และ `dev` (ได้ HTTP 200) ผ่านทั้งหมดบน Node 26
- **DESIGN_SYSTEM.md เทียบกับ `tokens.css`:**
  - ค่าที่ตรงกันทุกตัว:
    - สีทั้ง 14 token ทั้งสองโหมด
    - contrast ทุกตัวเลขในตาราง (คำนวณใหม่ด้วยสูตร WCAG)
    - ขนาด/ระยะบรรทัด/น้ำหนักของ `type-*` ทั้ง 9 แบบ
    - มุม, duration, easing, ค่า layout
    - ขนาดไฟล์ฟอนต์
  - ที่แก้:
    - หมวด Data ขาด Matplotlib และ Seaborn
    - บอกที่ใช้จริงของ `shadow-overlay` และ `--duration-base`
    - กำกับ token ที่ยังไม่มีโค้ดอ้างถึง (`--gutter`, `--key-size`, `--target-min`, `ease-in`, `ease-in-out`) ว่าค่าเท่ากับ class ที่ใช้อยู่
    - เปลี่ยนกล่องสถานะ Phase เป็นข้อความถาวร (หัวข้อ "บันทึกการตัดสินใจ" ยังเก็บไว้)
- **`design/*.md`:** ลิงก์รูปทั้ง 7 รูปใน `phase4-report.md` และ path อื่นถูกต้อง เจอแค่ข้อความเล่าประวัติเรื่อง `src/assets/skills/` ใน `content-proposals.md` (ดู Phase 3)

## Phase 6: ไฟล์สำหรับ AI

- **`CLAUDE.md`:**
  - เปลี่ยนส่วน "Redesign (branch `redesign`)" เป็น "Design system" ที่เป็นกติกาถาวร เก็บกฎสำคัญไว้ครบ:
    - ใช้ token เท่านั้น
    - รัน `check:tokens` และเปิดดูทั้งโหมดสว่าง/มืด/มือถือหลังแก้ UI
    - กติกาฟอนต์สำรองและ preload กัน CLS
    - logo ที่ `npm run og` อ่าน
    - เหตุผลที่ยังมี Geist
  - เพิ่มส่วน "เนื้อหาที่ยังรอข้อมูล" ชี้ไปที่ TODO ใน `data.ts`
  - เพิ่มกฎ:
    - รายการช่องที่ต้องรัน `og` ให้ครบ (เดิมขาด school, siteUrl, highlights และรูป)
    - skill ใหม่ต้องเพิ่มใน `skillFamilies.ts`
    - PDF ที่ต่างแค่วันที่ไม่ต้อง commit
  - เพิ่ม `check:tokens` ในรายการที่ต้องผ่านก่อนบอกว่างานเสร็จ
- **`.claude/settings.json`:**
  - เพิ่ม `npm run dev`, `npm run preview`, `npm audit` และ `npm outdated`
  - เปลี่ยน `git branch:*` เป็นเฉพาะคำสั่งอ่าน (`git branch`, `-a`, `-vv`, `--show-current`) เพราะแบบเดิมอนุญาต `git branch -D` ให้ลบ branch ได้โดยไม่ถาม
  - ที่ยังกว้างอยู่และปล่อยไว้: `npx eslint:*` (ทำ `--fix` ได้ แต่แก้แค่ไฟล์ที่อยู่ใน git) และ `npx tsc:*`
- **`.claude/hooks/regen-cv.sh`:** ทดสอบแล้ว:
  - แก้ไฟล์อื่นจะจบทันที (exit 0)
  - แก้ `src/data.ts` จะรัน `npm run cv` และส่ง JSON ที่ถูกต้องกลับมา
  - ข้อความของ hook แก้ให้รายการช่องของ `og` ครบ และบอกเรื่อง PDF ที่ต่างแค่วันที่
  - `jq` มีอยู่ในเครื่อง (ถ้าไม่มี hook จะไม่ทำงานแบบเงียบ ๆ)

### workflow ที่ควรทำเป็น skill / slash command (เสนอ)

1. **`/update-content`:** แก้ `data.ts` → `npm run cv` → ตรวจว่า PDF ยังเป็น A4 หน้าเดียว → รัน `npm run og` ถ้าแก้ช่องที่อยู่ในรูป OG → ถ้า PDF ต่างแค่วันที่ให้คืนไฟล์ → `lint` + `build`
2. **`/check-ui`:** `lint` → `build` → `check:tokens` → เปิดเว็บด้วย `.claude/launch.json` ดูโหมดสว่าง/มืดที่ 1440 และ 375 px
3. **`/pre-push`:** checklist ก่อน push เพราะ push เข้า `main` = deploy ทันที (สามข้อข้างบน + `git log origin/main..HEAD` ให้เห็นว่ากำลังจะ deploy อะไร)

## Phase 7: ข้อเสนอ (ข้อ 1, 2, 5 และ 6 ทำแล้วหลัง review)

1. **GitHub Actions** รัน `npm ci`, `lint`, `build` และ `check:tokens` ทุก push/PR บน Node 22 ส่วน `cv`/`og` ต้องใช้ Chrome ถ้าจะใส่ใน CI ใช้ Chrome ของ runner ได้ แล้วเพิ่มขั้นตรวจว่า PDF ยังเป็นหน้าเดียว ข้อนี้สำคัญเพราะ Vercel deploy `main` ทันทีโดยไม่มีด่านกั้น
2. **ระบุเวอร์ชัน Node** `"engines": { "node": ">=22.18" }` ใน `package.json` และ `.nvmrc` (`22`) ระวังว่า Vercel ใช้ `engines` เลือกเวอร์ชัน Node ตอน build ด้วย
3. **ออกแบบ CV ใหม่ให้ใช้ Newsreader + IBM Plex Sans** CV จะเข้าชุดกับเว็บ และลบ Geist ออกได้ 2 package
4. **เลิกใช้ framer-motion** ตอนนี้เหลือใช้แค่ toast เข้า/ออก และการจางตอนเปลี่ยนตัวกรอง ซึ่งทำด้วย CSS ได้ วัดแล้ว framer-motion หนัก 25.9 KB (gzip) หรือราว 1 ใน 4 ของ JS ที่โหลดตอนเปิดหน้า (104 KB) เป็นการเปลี่ยน architecture จึงเสนอก่อน
5. **แก้ปากกาเน้นใน hero โหมดมืด** (ข้อในหัวข้อ Phase 1 ที่เจอแต่ไม่ได้แก้)
6. **ลบ branch ที่ merge แล้ว** `redesign`, `ux-polish` และ `portfolio-redesign` ทั้งในเครื่องและบน GitHub
7. **ใช้ token ที่ยังไม่มีคนอ้างถึง** (`--target-min`, `--key-size`, `--gutter`) หรือเอาออกจากระบบให้ชัดว่าไม่ใช้
8. **CV ที่ build ซ้ำได้ผลเดิม** ให้ hook ข้ามการเขียนไฟล์ถ้าข้อความใน PDF ไม่เปลี่ยน จะไม่มี diff ที่ต่างแค่วันที่ให้ต้องคืนเอง

## Phase 8: ตรวจผล

- **lint, build, check:tokens:** ผ่านเท่ากับ baseline ไม่มีอะไรพังเพิ่ม
- **`npm run cv`:** ได้ PDF ขนาด A4 (595 × 842 pt) 1 หน้า ข้อความเหมือนเดิม ต่างจากไฟล์ใน git แค่ 10 byte ซึ่งเป็นวันที่ใน metadata จึงคืนไฟล์เดิม
- **หน้าตาเว็บ:**
  - **วิธีตรวจ:** build ทั้ง `pre-audit-20261031` และโค้ดปัจจุบัน ถ่ายทั้งหน้าด้วย headless Chrome 4 แบบ (1440 px และ 375 px × โหมดสว่างและมืด) แล้วเทียบทีละ pixel
  - **ผล:** เหมือนกันทุก pixel ทั้ง 4 แบบ ยกเว้นจุดที่ขึ้นกับจังหวะ animation ด้านล่าง
  - **จุดต่างที่เจอเป็นจังหวะ animation ไม่ใช่การเปลี่ยนแปลงจริง:**
    - ปากกาเน้นบนตัวเลข 0.91 ของการ์ด และเส้นใต้เมนู ต่างกันในบางรอบ
    - ยืนยันโดยถ่ายซ้ำ 3 รอบ และเปลี่ยนเวลารอ: เวอร์ชันใหม่เองก็ไม่ขีดเมื่อรอนานขึ้น ส่วนเวอร์ชันเก่าก็ไม่ขีดเมื่อรอ 3 และ 15 วินาที
    - สาเหตุคือ IntersectionObserver ใน headless ทำงานไม่ตรงเวลา
- **เปิดด้วย `.claude/launch.json` (`dev`):**
  - port 5173 ถูก dev server ของแชทอื่นใช้อยู่ จึงรันที่ 5174
  - เปิดดูโหมดสว่างที่ desktop และโหมดมืดที่ 375 px ไม่มี error ใน console
  - ⌘K "Back to top" ย้าย focus ไป `hero-heading` จริง และคำสั่ง GitHub/LinkedIn/source มี "(opens in a new tab)"

## หลัง review: สิ่งที่ตัดสินใจและทำแล้ว

เจ้าของให้ลบไฟล์ใน `design/` ที่ไม่ได้ใช้ และให้ตัดสินใจข้อที่เหลือเอง

| เรื่อง | ตัดสินใจ | ผล |
|---|---|---|
| `design/` | ลบส่วนที่ไม่ได้ใช้ | ลบ logo 6 แบบที่ไม่ได้เลือก, `logo-preview.html`, `phase4-report.md` พร้อมรูป 7 รูป และ `content-proposals.md` (ราว 1.1 MB) เก็บ `design/logo/k-serif*.svg` ไว้เพราะ `npm run og` อ่าน และเป็นต้นฉบับของ favicon กับ `Logo.tsx` แก้ลิงก์ในเอกสารแล้ว |
| ปากกาเน้นใน hero โหมดมืด | แก้ | แอนิเมชันเริ่มจากสีหมึกรอบข้างแล้วเปลี่ยนเป็น `on-marker` พร้อมแถบเหลือง ตรวจด้วยภาพหน้าจอก่อนและหลังการขีดแล้ว โหมดสว่างหน้าตาเหมือนเดิม |
| GitHub Actions | เพิ่ม | `.github/workflows/ci.yml` รัน lint, `check:tokens` และ build ทุก push/PR |
| เวอร์ชัน Node | `.nvmrc` = 22 | ไม่ใส่ `engines` ใน `package.json` เพราะ Vercel ใช้ค่านั้นเลือก Node ตอน build ค่าแบบ `>=` อาจทำให้ build บน Node major ใหม่โดยไม่ได้ตั้งใจ |
| branch ที่ merge แล้ว | ลบ | `redesign`, `ux-polish`, `portfolio-redesign` ทั้งในเครื่องและบน GitHub (เฉพาะที่ merge เข้า `main` แล้ว) |
| Geist | เก็บไว้ | ออกแบบ CV ใหม่ต้องจัดหน้าให้ยังเป็น A4 หน้าเดียว และเปลี่ยนหน้าตาไฟล์ที่ส่งให้บริษัทจริง จึงไม่ทำในรอบ audit |
| framer-motion | เก็บไว้ | ตัดออกได้ราว 26 KB (gzip) แต่ต้องเขียน toast และการกรองใหม่ เป็นงาน architecture แยกต่างหาก |
| อัปเกรด major | ยังไม่ทำ | audit ที่เหลือ 12 รายการเป็นเครื่องมือ lint ไม่ได้อยู่ในเว็บ ควรอัปเกรดเป็นงานแยกที่ทดสอบได้เต็มที่ |
| token ที่ยังไม่มีโค้ดอ้างถึง | เก็บไว้ | เป็นค่าใน design system ที่เอกสารอธิบายไว้แล้วว่าเท่ากับ class ที่ใช้อยู่ |
