# ข้อเสนอเรื่องเนื้อหา (Phase 3)

Phase 3 เปลี่ยนแค่หน้าตา ข้อความและข้อมูลของคุณใน `src/data.ts` ยังเหมือนเดิมทุกตัวอักษร (เพิ่มแค่ field ใหม่ที่ยังว่างหรือใช้เฉพาะบนเว็บ ดูท้ายไฟล์) ข้อเสนอด้านล่างเรียงจากสิ่งที่ช่วย recruiter มากที่สุด ตอบกลับด้วยเลขข้อที่ตกลง เช่น "ใช้ 1B, 2, 3 ยกเว้น WELLYNC" แล้วผมจะแก้ `data.ts` ให้ (CV PDF สร้างใหม่อัตโนมัติ และถ้าข้อ 1 เปลี่ยน จะรัน `npm run og` ด้วย)

ข้อที่ต้องใช้ข้อมูลจากคุณ (ผมเดาตัวเลขเองไม่ได้) มีป้าย **ต้องการข้อมูล**

## 1. บรรทัดตำแหน่งใน hero

ตอนนี้บรรทัดแรกใต้ชื่อคือ "Computer Engineering Student, Srinakharinwirot University" ซึ่งไม่มีคำว่า data หรือ ML เลย ทั้งที่เป็นสายงานที่สมัคร recruiter จะรู้ว่าคุณหางานอะไรจากกรอบ "Open to Data/AI & full-stack internships" ข้างล่างเท่านั้น

| ตัวเลือก | `profile.role` | ข้อดี |
|---|---|---|
| A | `Data Science & ML · Computer Engineering Student` | บอกสายงานก่อน ตามด้วยสถานะ |
| B | `Computer Engineering Student in Data Science & ML` | ยังขึ้นต้นด้วยสถานะนักศึกษาเหมือนเดิม |
| คงเดิม | `Computer Engineering Student` | |

ค่านี้ใช้ใน hero, รูป OG, หัว CV PDF (`role · focus`) และ `jobTitle` ใน JSON-LD ของ `index.html`

## 2. summary ให้ขึ้นต้นด้วยงาน ML

ข้อเท็จจริงเดิมทั้งหมด แค่สลับให้ ML มาก่อน เพราะคนอ่านจำคำแรก ๆ ของประโยคได้ดีที่สุด

- **ตอนนี้:** I build full-stack web apps and machine-learning systems — from a skin-cancer classifier benchmarked on 25,000+ images to …
- **เสนอ:** I build machine-learning systems and the full-stack apps around them — from a skin-cancer classifier benchmarked on 25,000+ images to the runner-status checker for SWU Run Together 2026. Data Science Intern at Botnoi Group (2026).

วลีที่ถูกขีดเน้น (`summaryMarks`) ยังใช้ได้เหมือนเดิม

## 3. การ์ดโปรเจกต์แบบ problem → approach → result

การ์ดรองรับสามช่องนี้แล้ว (`problem`, `approach`, `result` ใน type `Project`) แต่ยังว่างทุกโปรเจกต์ จึงแสดงคำอธิบายเดิมไปก่อน ข้อความข้างล่างแบ่งจากคำอธิบายเดิมของคุณ ส่วนที่ผมเรียบเรียงใหม่มีเครื่องหมาย *(เรียบเรียง)* ช่วยเช็คว่ายังตรงกับความจริง

| โปรเจกต์ | Problem | Approach | Result |
|---|---|---|---|
| Skin Cancer Screening & Classification | Screen skin lesions for cancer across 8 classes (ISIC 2019, 25,331 images). *(เรียบเรียง)* | Benchmarked ResNet50, EfficientNet-B3 and DenseNet121 with class-weighted loss; served the best model through a Gradio clinical UI. | metric เดิม (0.91 AUC-ROC on 3,800 unseen test images) + "89.6% top-2 accuracy." |
| Smart Flood AI | Estimate flood depth from Department of Highways CCTV in real time. *(เรียบเรียง)* | Zero-shot Grounding DINO finds cars and wheels in the footage to estimate water depth, feeding a Next.js command center with flood-aware routing and LINE OA alerts. | **ต้องการข้อมูล** เช่น ความคลาดเคลื่อนของความลึกที่วัดได้ จำนวนกล้อง หรือผลการแข่ง |
| WELLYNC | Connect chronic-care patients, caregivers and doctors in one place. *(เรียบเรียง)* | Multi-factor early-warning alerts, PDPA-aligned consent, and Gemini-powered tools that read device screens, analyze meals and draft care plans. | **ต้องการข้อมูล** เช่น ผลในงาน True Innovation |
| SWU Run Together 2026 | Runners needed to check their registration and order status for a university running event. *(เรียบเรียง)* | A React app that searches by phone number and reads live Google Form responses. | Each runner gets a digital BIB with their package, shirt size and payment status. **ต้องการข้อมูล:** จำนวนนักวิ่งที่ใช้ |
| BrainFit | Brain training on both iOS and Android. *(เรียบเรียง)* | React Native (Expo) app with memory and logic mini-games, using Google Sheets as a lightweight backend. | Tracks each player's progress. **ต้องการข้อมูล:** จำนวนผู้เล่นหรือเกม |
| Employment Data Gap Analysis | Find gaps in employment data for the Computer Engineering field. | **ต้องการข้อมูล:** ใช้ข้อมูลอะไร โมเดลอะไร | **ต้องการข้อมูล** |
| Prim's Algorithm Visualizer | Make Minimum Spanning Tree construction easy to follow. *(เรียบเรียง)* | Interactive D3.js tool: add or remove nodes and edges, then watch edge selection step by step. | The total cost updates in real time. |
| This Portfolio | Keep the website and the PDF CV in sync. *(เรียบเรียง)* | One typed data file drives both; React 19, Tailwind CSS v4 and Framer Motion. | Keyboard and reduced-motion support. |

โปรเจกต์ที่ยังไม่มีข้อมูลครบ ผมแนะนำให้ใส่แค่ problem + approach ก่อน การ์ดจะแสดงสองช่องนี้และข้ามช่อง result ไปเอง

## 4. จัดกลุ่ม skill ใหม่เป็น 4 หมวด

brief ขอให้กลุ่ม skill เป็น ML/DL, Data, Full-Stack, Languages ตอนนี้ `skillGroups` ยังเป็น 5 กลุ่มเดิม (AI & Data, Languages, Frontend & Mobile, Backend & Cloud, Tools) เว็บแสดงสัญลักษณ์หมวดหน้า skill แต่ละตัวไปก่อนแล้ว ถ้าตกลง ผมจะจัดกลุ่มใน `data.ts` ใหม่ตามนี้ ซึ่งจะเปลี่ยนหัวข้อ skill ใน CV ด้วย

| หมวด | skill |
|---|---|
| ● ML / DL | PyTorch, scikit-learn, OpenCV, Machine Learning, Deep Learning, Computer Vision |
| ■ Data | Pandas, NumPy |
| ▲ Full-stack | React, React Native, Tailwind CSS, HTML, CSS, Node.js, Firebase, MySQL, Google Cloud |
| ◆ Languages | Python, TypeScript, JavaScript, Java, C/C++ |
| Tools | Git, Figma, Unity |

ตารางนี้คือ `src/config/skillFamilies.ts` ด้วย (ใช้กับ tag ในการ์ด) ถ้าอยากย้าย skill ไหน เช่น ให้ Google Sheets เป็น Full-stack แทน Data บอกได้เลย

หมวด Data มีแค่ 2 skill ซึ่งบางกว่าสายที่สมัคร ถ้าคุณใช้ SQL, Matplotlib, Seaborn, Jupyter หรือเครื่องมืออื่นที่ Botnoi จริง ควรเพิ่ม **(ต้องการข้อมูล)**

## 5. เพิ่ม tag ที่มีอยู่แล้วในคำอธิบาย

ถ้านับ tag ของ 8 โปรเจกต์ตอนนี้ได้ Full-stack 15, ML/DL 9, Languages 8, Data 5 portfolio จึงดูเอนไปทาง full-stack มากกว่าสายที่สมัคร เทคต่อไปนี้อยู่ในคำอธิบายแล้วแต่ไม่อยู่ใน tag:

- Smart Flood AI: เพิ่ม `Grounding DINO`
- WELLYNC: เพิ่ม `Gemini`
- Skin Cancer Screening: ถ้าใช้ transfer learning จริง เพิ่ม `Transfer Learning` **(ต้องการข้อมูล)**

## 6. ตัวเลขในงาน internship ที่ Botnoi

`data.ts` มี TODO ค้างไว้ว่า bullet ของ Data Science Intern ยังไม่มีตัวเลข recruiter สาย DS ให้น้ำหนักกับตัวเลขมาก เช่น ขนาด dataset, metric ก่อนและหลัง, จำนวนโมเดลที่ deploy และช่วงเดือนที่ฝึกงาน **(ต้องการข้อมูล)**

## 7. ตัวเลขสรุปใต้ hero

ช่อง "8 projects / Web · Mobile · AI" อ่อนที่สุดในสี่ช่อง เพราะจำนวนโปรเจกต์ไม่ได้บอกคุณภาพ ตัวเลือกที่ใช้ข้อมูลที่มีอยู่แล้ว:

- "89.6% top-2 accuracy" / "Skin-lesion classifier"
- "25,331 images" / "ISIC 2019 training set"
- "DOH Hackathon" / "Smart Flood AI, team of 2"

## 8. สิ่งที่ผมเปลี่ยนไปแล้วใน Phase 3 (ข้อความ UI ไม่ใช่เนื้อหาของคุณ)

ถ้าอยากได้แบบเดิมคืน บอกได้เลย

- หัว section ใช้ชื่อเดียวกับเมนู ("Projects") แทนหัวข้อกว้าง ๆ เดิม ("Things I've built", "Work & leadership", "Tools I work with", "Education & certifications", "Let's work together") เพราะ audit พบว่าหัวข้อซ้อน 4 ชั้น
- ปุ่มหลักใน hero เปลี่ยนจาก "View projects" เป็น "Download resume (PDF)" และทุกที่เรียกไฟล์นี้ว่า "resume" (เดิมมีทั้ง Resume และ CV)
- บรรทัดอธิบายของ Skills เปลี่ยนให้ตรงกับหน้าตาใหม่ (ตัวเลขคือจำนวนโปรเจกต์ที่ใช้ skill นั้น)
- โลโก้เทคโนโลยีหลายสีของ skill ไม่แสดงแล้ว เพราะจะแย่งสายตากับปากกาเน้น ถ้าตกลง ผมจะลบ field `icon` และไฟล์ใน `src/assets/skills/` (22 ไฟล์) ทิ้ง

## 9. งานต่อที่แนะนำ (นอก brief)

- **CV PDF** ยังเป็นดีไซน์เดิม (Geist, หัวข้อสีม่วงตัวพิมพ์ใหญ่) ควรออกแบบใหม่ให้เป็นแนว Lab Notebook ให้เข้าชุดกับเว็บและรูป OG

## field ที่เพิ่มใน data.ts ระหว่าง Phase 3

- `profile.summaryMarks`: วลีใน summary ที่ hero ขีดด้วยปากกาเน้น (ใช้แค่บนเว็บ)
- `Project.problem`, `Project.approach`, `Project.result`: ช่องของการ์ดแบบ problem → approach → result (ยังว่าง รอข้อ 3)
