# Design System

เอกสารนี้อธิบาย token ทุกตัวใน [`src/styles/tokens.css`](src/styles/tokens.css) ว่าคืออะไร ใช้ตรงไหน และทำไมถึงเป็นค่านี้

> **สถานะ (Phase 1):** token ในไฟล์ตอนนี้เป็นแนว **C · Legend** ซึ่งผมแนะนำ และยังรอเลือก direction
> ไฟล์ยังไม่ถูก import เข้าเว็บ Phase 3 จะต่อเข้ากับ `src/index.css` และเปลี่ยน component ให้ใช้ token ชุดนี้
> ถ้าเลือกแนว A หรือ B ชื่อ token และโครงสร้างไฟล์จะเหมือนเดิม เปลี่ยนแค่ค่า (ดูหัวข้อสุดท้าย)

## Direction ที่เสนอ

| | A · Lab Notebook | B · Syntax | C · Legend (แนะนำ) |
|---|---|---|---|
| แก่น | สมุดบันทึกการทดลอง | code editor | figure ที่มี legend |
| สิ่งที่คนจำได้ | ปากกาเน้นสีเหลืองบนผลลัพธ์ | ตัวเลขสีอำพันทุกที่ | legend 4 สี + แถบสี่เหลี่ยมบนการ์ด |
| ตัวอักษร | Newsreader + IBM Plex Sans | Martian Mono + Instrument Sans | Archivo ครอบครัวเดียว |
| ทำไมเหมาะกับสาย DS | งาน DS เกิดใน notebook และจบด้วยการรายงานผล | ตัวเลขทุกตัวเด่นแบบ number literal | data viz คือภาษาของงาน DS เว็บจึงแสดงทักษะนี้เอง |
| ความเสี่ยง | ดูเป็นสายวิชาการ, ใกล้หน้า blog | dark + mono เป็นภาพจำของ dev portfolio | ถ้าใส่สีเกินหน้าที่จะดูเป็นของเล่น |

เหตุผลที่แนะนำ C:

1. **ตรงกับสายที่สมัครที่สุด** การอ่าน legend และ encoding เป็นทักษะของคนทำ data คนอ่านเห็นทักษะนี้จากตัวเว็บ ไม่ต้องเชื่อจากรายการ skill
2. **สีมีหน้าที่** ทุกครั้งที่สีปรากฏ มันตอบว่า "นี่เป็นงานด้านไหน" ต่างจาก gradient ของเว็บเดิมที่มีไว้ตกแต่ง
3. **ข้อมูลซื่อตรง** แถบบนการ์ดคำนวณจาก tag จริง จึงไม่มี progress bar แบบ % ที่ brief ไม่ต้องการ
4. **คนตาบอดสีใช้ได้** palette มาจาก Okabe–Ito และผ่านการจำลองการมองเห็นทั้ง 3 แบบ

## หลักของระบบ

1. **สีคือข้อมูล** hue มีไว้บอกหมวด skill 4 หมวดเท่านั้น ส่วนอื่นทั้งหมดเป็น `ink` บน `paper`
2. **Legend มาก่อน** hero แนะนำ legend ครั้งเดียว หลังจากนั้นทุกที่ใช้สีเดิมในความหมายเดิม
3. **ครอบครัวเดียว หลายความกว้าง** แยกลำดับชั้นด้วยแกนความกว้างของ Archivo แทนการเพิ่มฟอนต์
4. **สี่เหลี่ยมคือข้อมูล มุมมนคือสิ่งที่กดได้** รูปทรงบอกหน้าที่ก่อนจะอ่านตัวหนังสือ
5. **ตัวเลขต้องมีหน่วยและบริบท** "0.91" ต้องตามด้วย "AUC-ROC on 3,800 unseen test images" เสมอ
6. **Motion ตอบผู้ใช้** มี sequence เดียวตอนโหลด ที่เหลือเกิดจากสิ่งที่ผู้ใช้ทำ

## ใช้กับ Tailwind v4 อย่างไร

Tailwind v4 ไม่มี `tailwind.config.js` แล้ว ค่าใน `@theme` จะกลายเป็น utility ให้เอง:

```html
<article class="bg-surface rounded-card p-6">
  <h3 class="type-title text-ink">Skin Cancer Screening &amp; Classification</h3>
  <p class="type-small text-ink-muted">CPE310 Healthcare AI, 2026</p>
  <span class="inline-block size-3 rounded-mark bg-ml" aria-hidden="true"></span>
</article>
```

- `--color-ink` → `text-ink`, `bg-ink`, `border-ink`, `outline-ink`
- `--radius-card` → `rounded-card` และ `--container-page` → `max-w-page`
- `type-*` เป็น utility ที่รวมขนาด ระยะบรรทัด น้ำหนัก และความกว้างไว้ใน class เดียว และเปลี่ยนตามจอให้เอง
- duration ไม่มี namespace ใน Tailwind จึงเรียกผ่าน arbitrary value: `duration-(--duration-fast) ease-out`
- ไฟล์ล้างค่า default ของ Tailwind ใน namespace ที่ระบบคุมเอง (`--color-*: initial` ฯลฯ) ดังนั้น `bg-indigo-500`, `text-sm`, `rounded-xl`, `shadow-lg` จะ **ไม่มี** ให้ใช้ ถ้าต้องการค่าที่ไม่มีใน token แปลว่าควรคุยกันว่าจะเพิ่ม token หรือไม่
- `@theme static` ทำให้ตัวแปรทุกตัวอยู่ที่ `:root` เสมอ เรียก `var(--color-ml)` จาก SVG หรือ inline style ได้

**โหมดมืด:** ใส่ `data-theme="dark"` ที่ `<html>` แล้ว token ทุกตัวเปลี่ยนค่าเอง component ส่วนใหญ่จึงไม่ต้องเขียน `dark:` เลย ปุ่มสลับธีมใน Phase 3 จะตั้งค่านี้ก่อน paint ตามที่ผู้ใช้เลือกหรือตามระบบ ส่วน `dark:` ใช้เฉพาะกรณีอย่างสลับไฟล์ภาพ

> ทำไมไม่ใช้ `light-dark()` ของ CSS: Tailwind 4.1 ส่งฟังก์ชันนี้ออกไปตรงๆ โดยไม่แปลง แต่ Safari ก่อน 17.5 (เช่น iPhone X ที่ค้างอยู่ iOS 16) ไม่รู้จัก สีทั้งเว็บจะหาย จึงแยกเป็นสองบล็อกแทน

## สี

ทุกคู่ผ่าน WCAG 2.2 AA: ข้อความ 4.5:1 ขึ้นไป ขอบ control, focus ring และ mark ที่มีความหมาย 3:1 ขึ้นไป

| Token | Light | Dark | ใช้กับ | Contrast (light / dark) |
|---|---|---|---|---|
| `paper` | `#ffffff` | `#000000` | พื้นหน้า | — |
| `surface` | `#f3f3f3` | `#161616` | พื้นการ์ด, panel, command palette | — |
| `rule` | `#e0e0e0` | `#2a2a2a` | เส้นแบ่งแถวข้อมูล, เส้นใต้ nav (ตกแต่งเท่านั้น) | — |
| `stroke` | `#858585` | `#7a7a7a` | ขอบปุ่มรอง, chip กรอง, input | 3.7 / 4.9 บน paper |
| `ink` | `#000000` | `#e8e8e8` | ข้อความทุกชนิด, พื้นปุ่มหลัก | 21 / 17.1 บน paper |
| `ink-muted` | `#595959` | `#a0a0a0` | ข้อความรอง: บริบท วันที่ จำนวน | 6.3 / 6.9 บน surface |
| `ink-hover` | `#333333` | `#ffffff` | พื้นปุ่มหลักตอน hover | on-ink 12.6 / 21 |
| `on-ink` | `#ffffff` | `#000000` | ข้อความบนพื้น `ink` | 21 / 17.1 |
| `focus` | `#000000` | `#e8e8e8` | วงแหวน focus 2px ห่าง 2px | 18.9 / 14.8 บน surface |
| `highlight` | `#f0e442` | `#f0e442` | `::selection` เท่านั้น | on-highlight 15.9 |
| `on-highlight` | `#000000` | `#000000` | ข้อความที่ถูกเลือก | — |

**สีหมวด skill** มาจาก Okabe–Ito ใช้เป็นพื้นของ mark เท่านั้น (legend key, หน่วยในแถบ, ช่อง matrix, key หน้า tag) ห้ามใช้กับตัวอักษร พื้นใหญ่ หรือของตกแต่ง และต้องมีข้อความกำกับทุกครั้ง

| หมวด | Token | Light | Dark | ต่ำสุดบน surface | skill ในหมวด (ข้อเสนอ) |
|---|---|---|---|---|---|
| ML / DL | `ml` | `#d55e00` | `#d55e00` | 3.5 / 4.7 | PyTorch, scikit-learn, OpenCV, Machine Learning, Deep Learning, Computer Vision, Generative AI |
| Data | `data` | `#00619a` | `#56b4e9` | 6.0 / 7.8 | Pandas, NumPy, Data Analysis, D3.js, Google Sheets |
| Full-stack | `stack` | `#009e73` | `#009e73` | 3.1 / 5.3 | React, React Native, Next.js, Node.js, FastAPI, Gradio, Firebase, MySQL, Google Cloud, Tailwind CSS, HTML, CSS, Vite, Expo, Framer Motion |
| Languages | `lang` | `#c66ba2` | `#cc79a7` | 3.1 / 5.9 | Python, TypeScript, JavaScript, Java, C/C++ |
| Tools | ไม่มีสี | สี่เหลี่ยมโปร่งขอบ `stroke` | | | Git, Figma, Unity |

- เรียงหมวดตามลำดับในตารางเสมอ
- ผมปรับค่า Okabe–Ito สองจุดในโหมดสว่าง: `data` เข้มขึ้นจาก `#0072b2` ให้คนตาบอดสีแดง (protanopia) ยังแยกจาก `lang` ได้ และ `lang` เข้มขึ้นจาก `#cc79a7` ให้ได้ 3:1 บน `surface`
- ตรวจด้วยการจำลองการมองเห็นแบบ protanopia, deuteranopia และ tritanopia (matrix ของ Machado 2009) แล้ววัดระยะสีด้วย CIEDE2000 ทุกคู่ห่างกันอย่างน้อย 12.0 ในโหมดสว่าง และ 12.1 ในโหมดมืด (เกณฑ์ที่ตั้งไว้คือ 10)

## ตัวอักษร

ฟอนต์เดียวคือ **Archivo** (Google Fonts, Omnibus-Type) แบบ variable ที่มีแกนน้ำหนัก 100–900 และแกนความกว้าง 62–125% Phase 3 จะติดตั้งแบบ self-host:

```bash
npm i @fontsource-variable/archivo
```

แล้ว import `@fontsource-variable/archivo/wdth.css` ซึ่งมีแกนความกว้างด้วย (`index.css` ของแพ็กเกจมีแค่แกนน้ำหนัก) self-host ดีกว่าลิงก์ Google Fonts เพราะไม่ต้องต่อ DNS/TLS ไปอีกโดเมน ไฟล์ latin หนัก 90 KB แทน Geist + Geist Mono ที่รวมกัน 52 KB

ขนาดเลือกจาก classic scale ใน *The Elements of Typographic Style* ของ Robert Bringhurst (12, 14, 16, 18, 21, 24, 36, 48, 60, 72) ซึ่งเป็นลำดับขนาดที่ช่างเรียงพิมพ์ใช้กันมาหลายร้อยปี แต่ละขั้นต่างกันพอให้ตาเห็นลำดับชั้นชัด

| Class | < 768px | ≥ 768px | ≥ 1280px | น้ำหนัก | ความกว้าง | ใช้กับ |
|---|---|---|---|---|---|---|
| `type-display` | 36/36 | 60/56 | 72/68 | 800 | 112.5% → 125% | ชื่อใน hero เท่านั้น |
| `type-headline` | 24/28 | 36/40 | | 750 | 112.5% | หัว section (h2) |
| `type-title` | 21/28 | | | 700 | 100% | ชื่อการ์ดและ timeline (h3) |
| `type-lead` | 18/28 | 21/32 | | 400 | 100% | summary ใน hero, บรรทัดนำ |
| `type-body` | 16/24 | | | 400 | 100% | ย่อหน้า, รายการ |
| `type-small` | 14/20 | | | 400 | 100% | บริบท, วันที่, ลิงก์รอง |
| `type-label` | 14/20 | | | 600 | 87.5% | legend, ชื่อช่อง Problem/Approach/Result, tag, ปุ่ม |
| `type-metric` | 36/36 | 48/48 | | 700 | 75% + tabular | ตัวเลขผลลัพธ์ |
| `type-caption` | 12/16 | | | 500 | 87.5% | จำนวนข้าง legend, หัว matrix |

(ตัวเลข = ขนาด/ระยะบรรทัด เป็น px)

- **ความกว้างคือลำดับชั้น** 125% (expanded) เป็นเสียงของเว็บ 100% ใช้อ่าน 87.5% (semi-condensed) ใช้กับ label และ 75% (condensed) ใช้กับตัวเลข ซึ่งประหยัดที่และวางซ้อนกันได้ ชื่อ "Parnduangkeaw" ที่ 72px กว้าง 702px เมื่อขยาย เทียบกับ 586px เมื่อกว้างปกติ
- **ตัวเลขใช้ tabular figures** ทุกหลักกว้างเท่ากัน ("111" กับ "000" กว้างเท่ากันที่ 68px) ตัวเลขที่วางซ้อนกันจึงตรงหลัก
- **บรรทัดยาวไม่เกิน 66 ตัวอักษร** (`max-w-measure`) ตามที่ Bringhurst แนะนำ 45–75 ตัว ส่วน lead ไม่เกิน 56 ตัว (`max-w-measure-lead`)
- **ไม่มีอะไรเล็กกว่า 12px** (เว็บเดิมมีข้อความ 11px อยู่ 62 จุด)
- **sentence case ทุกที่** ตัวพิมพ์ใหญ่ทั้งคำอ่านช้ากว่า เพราะคำเสียรูปร่างที่ตาใช้จำ
- ไม่ใช้ monospace กับ label และไม่เน้นคำเดียวในหัวข้อด้วยสีหรือตัวเอียง

## ระยะห่าง

ฐาน 4px ใช้ spacing เดิมของ Tailwind แต่จำกัดให้ใช้แค่ 10 ขั้น ตัวเลขในชื่อ token ตรงกับ class (`space-6` = `p-6` = 24px) จึงไม่ต้องแปลง

| Token | px | ใช้กับ |
|---|---|---|
| `space-1` | 4 | legend key ถึง label, icon ถึงข้อความในลิงก์ |
| `space-2` | 8 | ระหว่าง tag, icon ถึงข้อความในปุ่ม |
| `space-3` | 12 | padding แนวตั้งของปุ่ม (12 + บรรทัด 20 = 44px), ระหว่าง legend item |
| `space-4` | 16 | ขอบหน้า < 768px, ระหว่างแถวในการ์ด |
| `space-6` | 24 | padding การ์ด, gutter |
| `space-8` | 32 | ขอบหน้า ≥ 768px, ระหว่างการ์ด |
| `space-12` | 48 | ขอบหน้า ≥ 1280px, หัว section ถึงเนื้อหา |
| `space-16` | 64 | ระยะระหว่าง section < 768px, ระหว่างบล็อกใน hero |
| `space-24` | 96 | ระยะระหว่าง section ≥ 768px |
| `space-32` | 128 | ระยะระหว่าง section ≥ 1280px |

ทำไมต้องจำกัด: เว็บเดิมมี padding การ์ด 5 ค่าที่ต่างกันนิดเดียว ตาเห็นว่า "ไม่ตรง" แต่บอกไม่ได้ว่าทำไม ขั้นที่ห่างกันชัดทำให้ระยะทุกจุดดูตั้งใจ

## Layout

| ตัวแปร | ค่า | ใช้กับ |
|---|---|---|
| `max-w-page` | 1200px | ความกว้างเดียวของทุก section, nav, footer |
| `max-w-measure` / `max-w-measure-lead` | 66ch / 56ch | บรรทัดยาวสุดของ body / lead |
| `--gutter` | 24px | ช่องระหว่างคอลัมน์: 4 คอลัมน์ < 768px, 8 คอลัมน์ ≥ 768px, 12 คอลัมน์ ≥ 1280px |
| `--margin-sm` / `-md` / `-lg` | 16 / 32 / 48px | ขอบซ้ายขวาของหน้า |
| `--nav-height` | 64px | ความสูง nav และ `scroll-margin-top` ของ section |
| `--key-size` | 12px | legend key, tag key (หน่วยในแถบใช้ 10px) |
| `--unit-gap` | 2px | ช่องระหว่างหน่วยในแถบและช่องใน matrix |
| `--target-min` | 44px | ขนาดเล็กสุดของสิ่งที่กดได้ |

- container เดียวทั้งเว็บ ขอบซ้ายของเนื้อหาจึงตรงกันทุก section (เว็บเดิมสลับ 3 ความกว้าง)
- จัดชิดซ้าย ปล่อยขวาไม่เสมอ ไม่จัดกึ่งกลางย่อหน้า เพราะตาต้องหาจุดเริ่มบรรทัดใหม่ทุกครั้ง
- ทดสอบที่ 375, 768 และ 1440px ใช้ breakpoint เดิมของ Tailwind (`md` = 768px, `xl` = 1280px)

## มุม

| Token | ค่า | ใช้กับ |
|---|---|---|
| `rounded-mark` | 0 | mark ที่เป็นข้อมูล: legend key, หน่วยในแถบ, ช่อง matrix |
| `rounded-control` | 6px | สิ่งที่กดได้: ปุ่ม, chip กรอง, input, ปุ่มสลับธีม |
| `rounded-card` | 12px | กล่องที่เปิดอ่าน: การ์ดโปรเจกต์, command palette, toast |

รูปทรงเป็นสัญญาณแรกที่ตาจับได้ ก่อนสีและตัวหนังสือ ถ้าทุกอย่างมนเท่ากันหมด (แบบเว็บเดิม) คนอ่านต้องอ่านเพื่อรู้ว่าอะไรกดได้

## เงา

| Utility | Light | Dark | ใช้กับ |
|---|---|---|---|
| `shadow-overlay` | เส้นขอบดำ 6% + เงา 18% | เส้นขอบขาว 12% + เงาดำ 80% | command palette, toast |

การ์ดวางราบบน `paper` โดยไม่มีเงา เงามีไว้บอกว่า "สิ่งนี้ลอยอยู่เหนือหน้า" ถ้าใส่ทุกการ์ดเงาจะหมดความหมาย โหมดมืดต้องมีเส้นขอบสว่าง เพราะเงาทำพื้นดำให้ดำกว่าเดิมไม่ได้

`shadow-overlay` เป็น `@utility` ที่อ่าน `var(--shadow-overlay)` ไม่ได้อยู่ใน `@theme` เพราะ Tailwind ฝังค่าของ `@theme` ลงใน class `shadow-*` ตอน build ทำให้โหมดมืดเปลี่ยนค่าไม่ได้

## Motion

| Token | ค่า | ใช้กับ |
|---|---|---|
| `--duration-fast` | 120ms | hover, press |
| `--duration-base` | 200ms | เมนู, command palette, การกรองโปรเจกต์ |
| `--duration-slow` | 360ms | แถบและ matrix ขยายเข้าที่ครั้งแรกที่เลื่อนมาเห็น |
| `--duration-intro` | 720ms | sequence เดียวตอนโหลด: legend key ใน hero เติมสีจากซ้ายไปขวา |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | ของที่เข้ามาหรือตอบการกระทำ |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | ย้ายระหว่างสองตำแหน่ง เช่นการ์ดจัดใหม่หลังกรอง |
| `ease-in` | `cubic-bezier(0.55, 0, 1, 0.45)` | ของที่ออกจากจอเท่านั้น |

- **มี sequence เดียวตอนโหลด** สิ่งที่ขยับจะดึงสายตาเสมอ จึงใช้ motion กับสิ่งที่อยากให้เห็นก่อน คือ legend ซึ่งเป็นกุญแจอ่านทั้งเว็บ
- ข้อความไม่ fade-in ตอนเลื่อน มีแค่ mark ที่เป็นข้อมูลที่ขยายเข้าที่ครั้งแรก
- ไม่มี loop ที่เล่นตลอดเวลา (เว็บเดิมมี blob, วงแหวนหมุน, ping และลูกศร bounce)
- `ease-out` เริ่มเร็วแล้วค่อยหยุด จึงรู้สึกว่าตอบทันที ส่วน `ease-in` ใช้กับของที่ออก เพราะตอนนั้นผู้ใช้ไม่ได้มองแล้ว
- ผู้ใช้ที่ตั้ง `prefers-reduced-motion` จะเห็นสถานะสุดท้ายทันที ไม่มี transform และไม่มี sequence

## Accessibility

- ข้อความทุกคู่ผ่าน 4.5:1 และขอบ control, focus ring, mark ผ่าน 3:1 ในทั้งสองโหมด (ตารางในหัวข้อสี)
- สีไม่เคยเป็นช่องทางเดียว: ลิงก์มีขีดเส้นใต้, mark มี label หรือ `aria-label`, หมวดมีชื่อกำกับ
- focus ring ใช้ `focus` หนา 2px ห่าง 2px บนทุก element ที่ focus ได้
- สิ่งที่กดได้สูงอย่างน้อย `--target-min` (44px)
- ตัวอักษรเล็กสุด 12px และบรรทัดยาวไม่เกิน 66 ตัว

## ทำ / ไม่ทำ

| ทำ | ไม่ทำ |
|---|---|
| `<span class="size-3 rounded-mark bg-ml"></span> PyTorch` | `<span class="text-ml">PyTorch</span>` (สีหมวดกับตัวอักษร) |
| `type-title` | `text-21 font-bold` (แยกชิ้นเองแล้วลืมระยะบรรทัด) |
| ลิงก์ `text-ink underline underline-offset-3` | ลิงก์ที่ต่างแค่สี |
| การ์ด `bg-surface rounded-card` | การ์ดที่มีเงาและขอบสีด้านซ้าย |
| "Download resume (PDF)" | "DOWNLOAD CV →" |

## ถ้าเลือกแนว A หรือ B

ชื่อ token กลาง (`paper`, `surface`, `rule`, `stroke`, `ink`, `ink-muted`, `focus`) คงเดิม เปลี่ยนแค่ค่า ฟอนต์ และ token ประจำแนว

**A · Lab Notebook** ฟอนต์ Newsreader + IBM Plex Sans, มุม 4 / 6 / 8px

| Token | Light | Dark |
|---|---|---|
| `paper` | `#f6f8fb` | `#14171c` |
| `surface` | `#ffffff` | `#1b1f26` |
| `grid` (กระดาษกราฟ, ตกแต่ง) | `#dce3ed` | `#252a33` |
| `rule` | `#d5dce6` | `#2c323c` |
| `stroke` | `#7e899a` | `#6b7585` |
| `ink` | `#141b2b` | `#e8ecf3` |
| `ink-muted` | `#4b5568` | `#a4adbd` |
| `pen` (ลิงก์, ปุ่มหลัก) / `on-pen` | `#2343c4` / `#ffffff` | `#8ca6ff` / `#101521` |
| `marker` (`<mark>`) / `on-marker` | `#ffe566` / `#141b2b` | `#e9cf52` / `#141b2b` |
| `margin` (เส้น margin) | `#d9464e` | `#e36c72` |

**B · Syntax** ฟอนต์ Martian Mono + Instrument Sans, มุม 4 / 6 / 8px

| Token | Light | Dark |
|---|---|---|
| `paper` | `#f8f9fb` | `#15171c` |
| `surface` | `#ffffff` | `#1c1f26` |
| `rule` | `#e3e6eb` | `#2a2e37` |
| `stroke` | `#828b9c` | `#6a7384` |
| `ink` | `#1b1f27` | `#e4e7ed` |
| `comment` (ข้อความรอง) | `#5a6475` | `#8f99ab` |
| `fn` (ลิงก์, ปุ่มหลัก) / `on-fn` | `#1f5cc8` / `#ffffff` | `#74b0ff` / `#0f1626` |
| `num` (ตัวเลข) | `#a14e00` | `#ffb561` |
| `type` (tag) | `#0b7267` | `#5ed3bf` |

ทุกค่าในสองตารางนี้ผ่านเกณฑ์ contrast เดียวกับแนว C แล้ว
