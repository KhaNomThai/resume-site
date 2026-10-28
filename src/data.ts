/**
 * เนื้อหาทั้งหมดของเว็บอยู่ไฟล์นี้ — แก้ข้อมูลที่นี่ที่เดียว ไม่ต้องแตะ component
 * ใช้ type annotation (ไม่ใช้ `as`) เพื่อให้ TypeScript ฟ้องเมื่อลืม field ที่ required หรือพิมพ์ชื่อ field ผิด
 */

export const SKILL_CATEGORIES = ["Frontend", "Backend", "Core", "Data/AI", "Tools"] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export type Skill = {
  name: string;
  category: SkillCategory;
  url: string;
  /** devicon path "<folder>/<file>" — ดูชื่อได้ที่ https://devicon.dev */
  icon?: string;
};
export type Project = { title: string; desc: string; link?: string; tags: string[] };
export type TimelineItem = { id: string; title: string; org: string; period: string; bullets: string[] };
export type EducationItem = { id: string; title: string; org: string; period: string; courses: string[] };
export type ContactKind = "location" | "phone" | "email" | "github" | "linkedin";
export type ContactLink = { kind: ContactKind; label: string; value: string; href: string };

export const profile = {
  name: "Kulachart Parnduangkeaw",
  shortName: "Kulachart",
  role: "Computer Engineer Student",
  location: "Pathum Thani, Thailand",
  phone: "+66 80 091 2939",
  email: "kulachart.parn@gmail.com",
  github: "KhaNomThai",
  linkedin: "kulachart-parnduangkeaw-247b47395",
  summary:
    "A dedicated Computer Engineering student with a strong interest in full-stack software development and a passion for turning data into value through Data and AI. I have hands-on experience building web applications, covering everything from UI design to deployment. Currently, I am expanding my skills in backend architecture while working on research projects that involve statistics and machine learning. I am always eager to learn new technologies and looking for an internship where I can apply my engineering skills in a real-world setting.",
};

export const githubUrl = `https://github.com/${profile.github}`;
export const linkedinUrl = `https://www.linkedin.com/in/${profile.linkedin}`;

/** แสดงแค่ระดับจังหวัด — ไม่เปิดเผยบ้านเลขที่บนเว็บสาธารณะ */
export const contacts: ContactLink[] = [
  {
    kind: "location",
    label: "Location",
    value: profile.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`,
  },
  { kind: "phone", label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { kind: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { kind: "github", label: "GitHub", value: profile.github, href: githubUrl },
  { kind: "linkedin", label: "LinkedIn", value: profile.shortName, href: linkedinUrl },
];

export const skills: Skill[] = [
  { name: "Python", category: "Data/AI", url: "https://www.python.org/", icon: "python/python-original" },
  { name: "Java", category: "Core", url: "https://dev.java/", icon: "java/java-original" },
  { name: "C/C++", category: "Core", url: "https://isocpp.org/", icon: "cplusplus/cplusplus-original" },
  { name: "HTML", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: "html5/html5-original" },
  { name: "CSS", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: "css3/css3-original" },
  { name: "JavaScript", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "javascript/javascript-original" },
  { name: "React", category: "Frontend", url: "https://react.dev/", icon: "react/react-original" },
  { name: "TypeScript", category: "Frontend", url: "https://www.typescriptlang.org/", icon: "typescript/typescript-original" },
  { name: "Tailwind", category: "Frontend", url: "https://tailwindcss.com/", icon: "tailwindcss/tailwindcss-original" },
  { name: "MySQL", category: "Backend", url: "https://www.mysql.com/", icon: "mysql/mysql-original" },
  { name: "Firebase", category: "Backend", url: "https://firebase.google.com/", icon: "firebase/firebase-original" },
  { name: "Node.js", category: "Backend", url: "https://nodejs.org/", icon: "nodejs/nodejs-original" },
  { name: "VS Code", category: "Tools", url: "https://code.visualstudio.com/", icon: "vscode/vscode-original" },
  { name: "Git", category: "Tools", url: "https://git-scm.com/", icon: "git/git-original" },
  { name: "Figma", category: "Tools", url: "https://www.figma.com/", icon: "figma/figma-original" },
  { name: "Pandas", category: "Data/AI", url: "https://pandas.pydata.org/", icon: "pandas/pandas-original" },
  { name: "NumPy", category: "Data/AI", url: "https://numpy.org/", icon: "numpy/numpy-original" },
  { name: "OpenCV", category: "Data/AI", url: "https://opencv.org/", icon: "opencv/opencv-original" },
  { name: "PyTorch", category: "Data/AI", url: "https://pytorch.org/", icon: "pytorch/pytorch-original" },
];

/** ข้อมูล static → group ครั้งเดียวตอนโหลด module ไม่ต้องคำนวณใหม่ทุก render */
export const skillsByCategory = SKILL_CATEGORIES.map((category) => ({
  category,
  items: skills.filter((s) => s.category === category),
})).filter((group) => group.items.length > 0);

export const projects: Project[] = [
  {
    title: "Visualization of Prim's Algorithm",
    link: "https://github.com/KhaNomThai/project-cpe101",
    desc: "An interactive web app that walks users through each step of Prim's Algorithm. Built as an educational tool for learning graph theory.",
    tags: ["HTML", "JavaScript", "CSS"],
  },
  {
    title: "BrainFit Application",
    link: "https://github.com/KhaNomThai/BrainFit",
    desc: "A mobile app designed to sharpen analytical thinking and memory through fun and engaging brain exercises.",
    tags: ["React Native", "Expo", "Firestore"],
  },
  {
    title: "My Resume Website",
    link: "https://github.com/KhaNomThai/resume-site",
    desc: "A personal portfolio website that highlights my profile, projects, and professional experience.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Employment Data Gap Analysis",
    link: "https://colab.research.google.com/drive/1ujTiV7eldCGr3nbqe19WRiARRDcbeWFs?usp=sharing",
    desc: "A research project that uses machine learning to analyze employment data gaps in the computer engineering field.",
    tags: ["Python", "Machine Learning", "Data Analysis"],
  },
  {
    title: "Water Level Detection (DOH Hackathon)",
    link: "https://github.com/Panupong-xD/DOH_Hackathon",
    desc: "A hackathon project for the Department of Highways. Uses AI and computer vision to estimate water levels by analyzing how much a vehicle's wheels are submerged.",
    tags: ["Python", "AI", "Computer Vision"],
  },
  {
    title: "SWU Run Register",
    link: "https://github.com/Panupong-xD/SwuRun_Register",
    desc: "A full-stack runner registration web platform built for the SWU Run Together 2026 event — handling participant sign-ups, bib number assignment, and race-day data management.",
    tags: ["Full-Stack", "Web App"],
  },
  {
    title: "WELLYNC (True Innovation)",
    link: "https://github.com/Panupong-xD/True-innovation-mock",
    desc: "A chronic care management platform featuring predictive AI health analytics to help patients and caregivers monitor conditions, track vital signs, and receive early-warning insights.",
    tags: ["AI", "Healthcare", "Full-Stack"],
  },
  {
    title: "Skin Cancer Screening & Classification",
    link: "https://github.com/KhaNomThai/CPE310-Healthcare-AI-System",
    desc: "A Deep Learning system powered by ResNet-50 that classifies skin lesion images to assist in early skin cancer detection and screening.",
    tags: ["Python", "Deep Learning", "Computer Vision"],
  },
];

/** `id` ต้องไม่ซ้ำ — ใช้เป็น React key จึงเพิ่ม/ลบ/สลับลำดับรายการได้ปลอดภัย */
export const experience: TimelineItem[] = [
  {
    id: "cpe-student-leader",
    title: "Computer Engineering Student Leader",
    org: "SWU CPE",
    period: "2024 – Present",
    bullets: [
      "Represented the Computer Engineering department at faculty meetings and university events.",
      "Served as the main point of contact between students and faculty to keep operations running smoothly.",
      "Planned and organized workshops, meetings, and student development programs for the department.",
      "Helped manage academic affairs and student activities within the department.",
      "Built a sense of teamwork and community among Computer Engineering students.",
    ],
  },
  {
    id: "metaverse-presentation-assistant",
    title: "Metaverse Presentation Assistant",
    org: "SWU",
    period: "2025",
    bullets: [
      "Helped deliver a talk on Metaverse technology and its potential future uses.",
      "Explained key concepts about virtual worlds and how VR, AR, and AI work together.",
      "Shared insights on modern tech trends to help students stay informed.",
      "Prepared interactive slides and live demos to keep the audience engaged.",
    ],
  },
  {
    id: "robotics-teaching-assistant",
    title: "Robotics Teaching Assistant",
    org: "SWU",
    period: "2026",
    bullets: [
      "Taught basic robotics concepts to high school students as a teaching assistant.",
      "Prepared and maintained all robotics equipment used in hands-on sessions.",
      "Guided students through club activities, helping them develop problem-solving skills.",
      "Ran live demos of robot programming to spark student curiosity and understanding.",
    ],
  },
  {
    id: "botnoi-data-science-intern",
    title: "Data Science Intern",
    org: "Botnoi Group",
    period: "2026",
    bullets: [
      "Developed, trained, and evaluated Machine Learning models for real-world business applications.",
      "Preprocessed complex datasets and engineered meaningful features to boost model accuracy and performance.",
      "Collaborated cross-functionally with engineering and product teams to deliver AI-powered solutions and actionable data-driven insights.",
      "Applied best practices in data pipeline design and model deployment workflows.",
    ],
  },
  {
    id: "google-cloud-training",
    title: "Google Cloud, Big Data & GenAI Training",
    org: "Google Cloud",
    period: "2026",
    bullets: [
      "Completed certified training in Google Cloud Platform fundamentals, Big Data technologies, and Generative AI.",
      "Gained hands-on experience with cloud-based data processing, storage, and machine learning services.",
      "Learned to leverage GenAI tools and APIs for building intelligent applications.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "swu-cpe",
    title: "Bachelor of Engineering (Computer Engineering)",
    org: "Srinakharinwirot University (SWU)",
    period: "2024 – Present",
    courses: ["Software Development", "Database", "Computer Architecture", "Electronics", "AI"],
  },
];
