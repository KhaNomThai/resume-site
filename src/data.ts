/**
 * เนื้อหาทั้งหมดของเว็บอยู่ไฟล์นี้ — แก้ข้อมูลที่นี่ที่เดียว ไม่ต้องแตะ component
 * CV PDF ก็ generate จากไฟล์นี้ (`npm run cv`) → เว็บกับ CV ตรงกันเสมอ
 * ใช้ type annotation (ไม่ใช้ `as`) เพื่อให้ TypeScript ฟ้องเมื่อลืม field ที่ required หรือพิมพ์ชื่อ field ผิด
 * ห้าม import asset ของ Vite ในไฟล์นี้ — สคริปต์ CV รันไฟล์นี้ด้วย Node ตรง ๆ
 */

export type Skill = {
  name: string;
  /** ชื่อไฟล์ใน src/assets/skills (ไม่ต้องมี .svg) — ไม่ใส่ = chip ข้อความล้วน เช่นหัวข้อความรู้ */
  icon?: string;
};
export type SkillGroup = { title: string; skills: Skill[] };

export type ProjectLinkKind = "code" | "demo" | "notebook";
export type ProjectLink = { kind: ProjectLinkKind; href: string };
export type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  /** บริบทของงาน เช่น วิชา/งานแข่ง/ขนาดทีม */
  context?: string;
  desc: string;
  /** ตัวเลขเด่น — ใส่เฉพาะค่าที่วัดได้จริงและอ้างอิงได้ใน repo */
  metric?: { value: string; label: string };
  /** เทคที่ชื่อตรงกับ skill → ปุ่ม skill ใช้กรองโปรเจกต์ได้ */
  tags: string[];
  /** ลิงก์แรก = ลิงก์หลักของการ์ด (คลิกได้ทั้งใบ) */
  links: ProjectLink[];
};
export type TimelineItem = { id: string; title: string; org: string; period: string; bullets: string[] };
export type Certification = { id: string; title: string; issuer: string; year: string; desc: string };
export type EducationItem = {
  id: string;
  degree: string;
  school: string;
  period: string;
  graduation?: string;
  coursework: string[];
};
export type Highlight = { value: string; label: string };
export type ContactKind = "email" | "linkedin" | "github" | "phone";
export type ContactLink = { kind: ContactKind; label: string; value: string; href: string };

export const profile = {
  name: "Kulachart Parnduangkeaw",
  firstName: "Kulachart",
  lastName: "Parnduangkeaw",
  role: "Computer Engineering Student",
  school: "Srinakharinwirot University",
  focus: "Full-Stack & Data/AI",
  availability: "Open to Data/AI & full-stack internships",
  /** แสดงแค่ระดับจังหวัด — ไม่เปิดเผยบ้านเลขที่บนเว็บสาธารณะ (รวมถึง CV PDF ที่ให้ดาวน์โหลดด้วย) */
  location: "Pathum Thani, Thailand",
  phone: "+66 80 091 2939",
  email: "kulachart.parn@gmail.com",
  github: "KhaNomThai",
  linkedin: "kulachart-parnduangkeaw-247b47395",
  /** ต้องตรงกับ canonical / og:url ใน index.html */
  siteUrl: "https://kulachart-resume-site.vercel.app",
  summary:
    "I build full-stack web apps and machine-learning systems — from a skin-cancer classifier benchmarked on 25,000+ images to the runner-status checker for SWU Run Together 2026. Data Science Intern at Botnoi Group (2026).",
  /** CV ไม่ใช้สรรพนาม "I" ตามธรรมเนียมเรซูเม่ */
  cvSummary:
    "Computer Engineering student building full-stack web apps and machine-learning systems. Data Science Intern at Botnoi Group (2026). Built a deep-learning skin-cancer screening system (0.91 AUC-ROC), a flood-monitoring platform for the DOH Hackathon, and the runner-status checker for SWU Run Together 2026. Seeking Data/AI or full-stack internship opportunities.",
};

export const githubUrl = `https://github.com/${profile.github}`;
export const linkedinUrl = `https://www.linkedin.com/in/${profile.linkedin}`;
export const repoUrl = `${githubUrl}/resume-site`;

export const contacts: ContactLink[] = [
  { kind: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { kind: "linkedin", label: "LinkedIn", value: "in/kulachart-parnduangkeaw", href: linkedinUrl },
  { kind: "github", label: "GitHub", value: `@${profile.github}`, href: githubUrl },
  { kind: "phone", label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
];

/** กลุ่มแรกกว้าง 2 คอลัมน์บนจอใหญ่ — ลำดับนี้จัดให้ grid ไม่มีช่องว่างทั้งจอ 2 และ 3 คอลัมน์ */
export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Data",
    skills: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Machine Learning" },
      { name: "Deep Learning" },
      { name: "Computer Vision" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
      { name: "C/C++", icon: "cplusplus" },
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      { name: "React", icon: "react" },
      { name: "React Native", icon: "reactnative" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
    ],
  },
  {
    title: "Backend & Cloud",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Firebase", icon: "firebase" },
      { name: "MySQL", icon: "mysql" },
      { name: "Google Cloud", icon: "googlecloud" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "Figma", icon: "figma" },
      { name: "Unity", icon: "unity" },
    ],
  },
];

/** เรียงจากผลงานที่แข็งที่สุดก่อน — recruiter มักอ่านแค่ 2–3 อันแรก. ข้อมูลอ้างอิงจาก README ของแต่ละ repo */
export const projects: Project[] = [
  {
    id: "skin-cancer-screening",
    title: "Skin Cancer Screening & Classification",
    category: "Deep Learning",
    year: "2026",
    context: "CPE310 Healthcare AI",
    desc: "8-class skin-lesion classifier trained on ISIC 2019 (25,331 images). Benchmarked ResNet50, EfficientNet-B3, and DenseNet121 with class-weighted loss; the best model reaches 0.91 AUC-ROC for cancer screening and 89.6% top-2 accuracy, served through a Gradio clinical UI.",
    metric: { value: "0.91", label: "AUC-ROC on 3,800 unseen test images" },
    tags: ["Python", "PyTorch", "scikit-learn", "Pandas", "Deep Learning", "Computer Vision", "Gradio"],
    links: [{ kind: "code", href: "https://github.com/KhaNomThai/Healthcare-AI-System" }],
  },
  {
    id: "smart-flood-ai",
    title: "Smart Flood AI",
    category: "Computer Vision",
    year: "2026",
    context: "DOH Hackathon · Team of 2",
    desc: "Real-time flood monitoring command center for the Department of Highways hackathon. Zero-shot Grounding DINO finds cars and wheels in CCTV footage to estimate water depth, feeding a Next.js dashboard with flood-aware routing and LINE OA alerts.",
    tags: ["Python", "PyTorch", "OpenCV", "FastAPI", "Next.js", "Firebase", "Computer Vision"],
    links: [{ kind: "code", href: "https://github.com/Panupong-xD/DOH_Hackathon" }],
  },
  {
    id: "wellync",
    title: "WELLYNC",
    category: "Healthcare · GenAI",
    year: "2026",
    context: "True Innovation competition · Team",
    desc: "Chronic-care prototype connecting patients, caregivers, and doctors — multi-factor early-warning alerts, PDPA-aligned consent, and Gemini-powered tools that read device screens, analyze meals, and draft care plans.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Generative AI"],
    links: [
      { kind: "demo", href: "https://true-innovation-mockup.vercel.app" },
      { kind: "code", href: "https://github.com/Panupong-xD/True-innovation-mock" },
    ],
  },
  {
    id: "swu-run-checker",
    title: "SWU Run Together 2026",
    category: "Web App",
    year: "2026",
    context: "SWU Athletics Club · Team of 2",
    desc: "Registration and order-status checker for a university running event. Runners search by phone number to get a digital BIB with their package, shirt size, and payment status, read live from Google Form responses.",
    tags: ["React", "JavaScript", "Vite", "Google Sheets"],
    links: [{ kind: "code", href: "https://github.com/Panupong-xD/SwuRun_Register" }],
  },
  {
    id: "brainfit",
    title: "BrainFit",
    category: "Mobile App",
    year: "2025",
    context: "Team of 5",
    desc: "Cross-platform brain-training app for iOS and Android with memory and logic mini-games, using Google Sheets as a lightweight backend to track each player's progress.",
    tags: ["React Native", "Expo", "JavaScript", "Google Sheets"],
    links: [{ kind: "code", href: "https://github.com/KhaNomThai/BrainFit" }],
  },
  {
    id: "employment-gap-analysis",
    title: "Employment Data Gap Analysis",
    category: "Data Analysis",
    context: "Research project",
    desc: "Research project that applies machine learning to find gaps in employment data for the Computer Engineering field.",
    tags: ["Python", "Machine Learning", "Data Analysis"],
    links: [
      {
        kind: "notebook",
        href: "https://colab.research.google.com/drive/1ujTiV7eldCGr3nbqe19WRiARRDcbeWFs?usp=sharing",
      },
    ],
  },
  {
    id: "prim-visualizer",
    title: "Prim's Algorithm Visualizer",
    category: "Algorithms",
    year: "2024",
    context: "CPE101 course project",
    desc: "Interactive tool that builds a Minimum Spanning Tree step by step — add or remove nodes and edges, then watch edge selection and the total cost update in real time.",
    tags: ["JavaScript", "D3.js", "HTML", "CSS"],
    links: [
      { kind: "demo", href: "https://khanomthai.github.io/project-cpe101/" },
      { kind: "code", href: "https://github.com/KhaNomThai/project-cpe101" },
    ],
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    category: "Web App",
    year: "2026",
    desc: "The site you're on. One typed data file drives both the website and the PDF CV; built with React 19, Tailwind CSS v4, and Framer Motion, with keyboard and reduced-motion support.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: [{ kind: "code", href: repoUrl }],
  },
];

/** ตัวเลข/จุดเด่นใต้ชื่อใน Hero — อ่านจบได้ในไม่กี่วินาที */
export const highlights: Highlight[] = [
  { value: "Data Science Intern", label: "Botnoi Group · 2026" },
  { value: "0.91 AUC-ROC", label: "Skin-cancer screening model" },
  { value: `${projects.length} projects`, label: "Web · Mobile · AI" },
  { value: "Student Leader", label: "SWU Computer Engineering" },
];

/** งานสายเทค — เรียงล่าสุดก่อน. `id` ต้องไม่ซ้ำ (ใช้เป็น React key) */
export const work: TimelineItem[] = [
  {
    id: "botnoi-data-science-intern",
    title: "Data Science Intern",
    org: "Botnoi Group",
    // TODO: ใส่เดือน (เช่น "Jun – Aug 2026") และตัวเลขจริงใน bullet: ขนาด dataset, metric ก่อน/หลัง, จำนวนโมเดล
    period: "2026",
    bullets: [
      "Developed, trained, and evaluated machine learning models for real-world business use cases.",
      "Cleaned and preprocessed complex datasets and engineered features that improved model accuracy.",
      "Worked with engineering and product teams to deliver AI-powered solutions and data-driven insights.",
      "Applied best practices in data-pipeline design and model-deployment workflows.",
    ],
  },
];

/** กิจกรรม/ภาวะผู้นำ — แยกจาก `work` เพื่อให้ประสบการณ์ฝึกงานเด่นที่สุด */
export const leadership: TimelineItem[] = [
  {
    id: "cpe-student-leader",
    title: "Computer Engineering Student Leader",
    org: "Dept. of Computer Engineering, SWU",
    period: "2024 – Present",
    bullets: [
      "Represent Computer Engineering students at faculty meetings and university events as the main link between students and faculty.",
      "Plan and run workshops, meetings, and student-development programs for the department.",
      "Coordinate academic affairs and student activities to build a stronger department community.",
    ],
  },
  {
    id: "robotics-teaching-assistant",
    title: "Robotics Teaching Assistant",
    org: "Srinakharinwirot University",
    period: "2026",
    bullets: [
      "Taught robotics and programming fundamentals to high-school students in hands-on sessions.",
      "Prepared and maintained the robotics equipment and ran live robot-programming demos.",
      "Guided students through club activities to build their problem-solving skills.",
    ],
  },
  {
    id: "metaverse-presentation-assistant",
    title: "Metaverse Presentation Assistant",
    org: "Srinakharinwirot University",
    period: "2025",
    bullets: [
      "Assisted a lecture on Metaverse technology, explaining how VR, AR, and AI work together in virtual worlds.",
      "Built interactive slides and live demos to keep the audience engaged.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "google-cloud-genai",
    title: "Google Cloud, Big Data & GenAI Training",
    issuer: "Google Cloud",
    year: "2026",
    desc: "Certified training in Google Cloud Platform fundamentals, Big Data, and Generative AI, with hands-on labs in cloud data processing, storage, and ML services.",
  },
];

export const education: EducationItem[] = [
  {
    id: "swu-cpe",
    degree: "Bachelor of Engineering in Computer Engineering",
    school: "Srinakharinwirot University (SWU)",
    period: "2024 – Present",
    // TODO: ตรวจปีจบ (หลักสูตร 4 ปี เริ่ม 2024) และเพิ่ม GPA ถ้าอยากโชว์
    graduation: "Expected 2028",
    coursework: [
      "Software Development",
      "Database Systems",
      "Artificial Intelligence",
      "Healthcare AI Systems",
      "Computer Architecture",
      "Electronics",
    ],
  },
];
