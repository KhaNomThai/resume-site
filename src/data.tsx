export type SkillLevel = 1 | 2 | 3 | 4 | 5;
export type Skill = {
    name: string;
    level: SkillLevel;                 // ระดับ 1–5 (แทนเปอร์เซ็นต์)
    years?: number;
    lastUsed?: string;                 // "Present" หรือปีล่าสุดที่ใช้
    projects?: number;
    category?: "Core" | "Frontend" | "Backend" | "Mobile" | "Data/AI" | "Tools";
};
export type Project = { title: string; link?: string; desc: string; tags?: string[] };
export type TimelineItem = { title: string; org: string; period: string; bullets?: string[] };

export const profile = {
    name: "Kulachart Parnduangkeaw",
    role: "Computer Engineer Student",
    location: "Pathum Thani, Thailand",
    address: "61/6, Moo 7, Lamlukka, Pathum Thani, 12150, Thailand",
    phone: "080-091-2939",
    email: "kulachart2014@gmail.com",
    github: "KhaNomThai",
    linkedin: "kulachart-parnduangkeaw-247b47395",
    summary:
        "กระผมเป็นนิสิตในหลักสูตรวิศวกรรมคอมพิวเตอร์ ที่หลงใหลในการพัฒนาโปรแกรม และเทคโนโลยีใหม่ ๆ สนใจงานด้าน Software Development และชอบสร้างสิ่งที่ช่วยให้ผู้คนใช้ชีวิตสะดวกขึ้น ผ่านการออกแบบ และเขียนโค้ดด้วยความใส่ใจในรายละเอียด มีความสนใจในทางฝั่ง Frontend และกำลังศึกษาเพิ่มเติมในระบบ Backend ชอบทำโปรเจกต์จริง และมักจะออกแบบระบบให้เรียบง่าย แต่มีประสิทธิภาพ",
    skills: [
        { name: "Python", level: 4, category: "Data/AI", lastUsed: "2025" },
        { name: "Java", level: 4, category: "Core", lastUsed: "2025" },
        { name: "C/C++", level: 3, category: "Core", lastUsed: "2024" },
        { name: "React", level: 5, category: "Frontend", lastUsed: "Present" },
        { name: "TypeScript", level: 4, category: "Frontend", lastUsed: "Present" },
        { name: "JavaScript", level: 4, category: "Core", lastUsed: "Present" },
        { name: "Tailwind", level: 4, category: "Frontend", lastUsed: "Present" },
        { name: "Firebase", level: 3, category: "Backend", lastUsed: "2025" },
    ] as Skill[],
    projects: [
        {
            title: "Visualization of Prim’s Algorithm",
            link: "https://github.com/KhaNomThai/project-cpe101",
            desc: "สื่อการเรียนรู้แสดงขั้นตอนการทำงานของ Prim’s Algorithm ในรูปแบบ Interactive Web Application",
            tags: ["HTML", "Javascript", "CSS"],
        },
        {
            title: "BrainFit Application",
            link: "https://github.com/KhaNomThai/BrainFit",
            desc: "แอปพลิเคชันฝึกสมองบนมือถือ ช่วยพัฒนาทักษะการคิดวิเคราะห์ และความจำ",
            tags: ["React Native", "Expo", "Firestore"],
        },
        {
            title: "My Resume Website",
            link: "https://github.com/KhaNomThai/resume-site",
            desc: "เว็บไซต์แสดงประวัติส่วนตัว และผลงานต่าง ๆ",
            tags: ["React", "TypeScript", "Tailwind"],
        },
    ] as Project[],
    experience: [
        {
            title: "Computer Engineering Student Leader",
            org: "SWU CPE",
            period: "2024 – Present",
            bullets: [
                "เป็นตัวแทนนิสิตภาควิชาวิศวกรรมคอมพิวเตอร์ในการประชุม และกิจกรรมของคณะ",
                "ประสานงานระหว่างนิสิต และอาจารย์ภายในภาควิชา เพื่อให้การดำเนินงานเป็นไปได้อย่างราบรื่น",
                "วางแผน และจัดกิจกรรมต่าง ๆ ภายในภาควิชา เช่น การประชุม กิจกรรมเสริมทักษะ และโครงการเสริมสร้างนิสิต",
                "สนับสนุนการบริหารจัดการด้านวิชาการ และกิจกรรมของนิสิตในภาควิชา",
                "ส่งเสริมความร่วมมือ และสร้างความสามัคคีระหว่างนิสิตภาควิศวกรรมคอมพิวเตอร์",
            ],

        },
        {
            title: "Metaverse Presentation Assistant",
            org: "SWU",
            period: "2025",
            bullets: [
                "ทำหน้าที่เป็นผู้ช่วยวิทยากรบรรยายให้ความรู้เกี่ยวกับเทคโนโลยี Metaverse และแนวโน้มการประยุกต์ใช้ในอนาคต",
                "นำเสนอแนวคิดเกี่ยวกับโลกเสมือนจริง (Virtual World) และการเชื่อมต่อระหว่างเทคโนโลยี VR, AR และ AI",
                "ถ่ายทอดความรู้ และประสบการณ์เพื่อส่งเสริมความเข้าใจด้านเทคโนโลยีสมัยใหม่ให้กับนักศึกษา",
                "สร้างสื่อการนำเสนอ และตัวอย่างเชิงโต้ตอบเพื่อให้ผู้เข้าร่วมเข้าใจเนื้อหาได้ง่ายและมีส่วนร่วมมากขึ้น",
            ],

        },
    ] as TimelineItem[],
    education: [
        {
            title: "Bachelor of Engineering (Computer Engineering)",
            org: "Srinakharinwirot University (SWU)",
            period: "2024 – Present",
            bullets: ["Software Development, Database, Computer Architecture, Electronics, AI"],
        },
    ] as TimelineItem[],
};