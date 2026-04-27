export type Skill = {
    name: string;
    category?: "Core" | "Frontend" | "Backend" | "Data/AI" | "Tools";
    url?: string;
};
type Project = { title: string; link?: string; desc: string; tags?: string[] };
type TimelineItem = { title: string; org: string; period: string; bullets?: string[] };

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
        { name: "Python", category: "Data/AI", url: "https://www.python.org/" },
        { name: "Java", category: "Core", url: "https://dev.java/" },
        { name: "C/C++", category: "Core", url: "https://isocpp.org/" },
        { name: "HTML", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "JavaScript", category: "Frontend", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "React", category: "Frontend", url: "https://react.dev/" },
        { name: "TypeScript", category: "Frontend", url: "https://www.typescriptlang.org/" },
        { name: "Tailwind", category: "Frontend", url: "https://tailwindcss.com/" },
        { name: "MySQL", category: "Backend", url: "https://www.mysql.com/" },
        { name: "Firebase", category: "Backend", url: "https://firebase.google.com/" },
        { name: "Node.js", category: "Backend", url: "https://nodejs.org/" },
        { name: "VS Code", category: "Tools", url: "https://code.visualstudio.com/" },
        { name: "Git", category: "Tools", url: "https://git-scm.com/" },
        { name: "Figma", category: "Tools", url: "https://www.figma.com/" },
        { name: "Pandas", category: "Data/AI", url: "https://pandas.pydata.org/" },
        { name: "NumPy", category: "Data/AI", url: "https://numpy.org/" },
        { name: "OpenCV", category: "Data/AI", url: "https://opencv.org/" },
        { name: "PyTorch", category: "Data/AI", url: "https://pytorch.org/" },
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
        {
            title: "Employment Data Gap Analysis",
            link: "https://colab.research.google.com/drive/1ujTiV7eldCGr3nbqe19WRiARRDcbeWFs?usp=sharing",
            desc: "โปรเจกต์วิจัยขนาดเล็กเกี่ยวกับการวิเคราะห์ช่องว่างข้อมูลการได้งานของสายวิศวกรรมคอมพิวเตอร์ โดยใช้ Machine Learning",
            tags: ["Python", "Machine Learning", "Data Analysis"],
        },
        {
            title: "Water Level Detection (DOH Hackathon)",
            link: "https://github.com/Panupong-xD/DOH_Hackathon",
            desc: "ผลงานจากการแข่งขัน Hackathon ของกรมทางหลวง เป็นระบบที่ใช้ AI ตรวจจับระดับความสูงของน้ำโดยประเมินจากล้อรถยนต์",
            tags: ["Python", "AI", "Computer Vision"],
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
        {
            title: "Robotics Teaching Assistant",
            org: "SWU",
            period: "2026",
            bullets: [
                "ปฏิบัติหน้าที่เป็นผู้ช่วยสอน (Teaching Assistant) แนะนำ และให้ความรู้พื้นฐานด้านวิทยาการหุ่นยนต์ (Robotics) แก่นักเรียนระดับมัธยมศึกษาตอนปลาย",
                "จัดเตรียม ตั้งค่า และดูแลรักษาอุปกรณ์หุ่นยนต์ เพื่อใช้เป็นสื่อการเรียนการสอนเชิงปฏิบัติการให้พร้อมใช้งานอย่างมีประสิทธิภาพ",
                "ช่วยเหลืออาจารย์ผู้สอนในการดูแลและให้คำปรึกษานักเรียนระหว่างการทำกิจกรรมชมรม เพื่อส่งเสริมทักษะการแก้ปัญหาและการลงมือปฏิบัติจริง",
                "สาธิตการทำงาน และแนวทางการเขียนโปรแกรมควบคุมหุ่นยนต์ เพื่อสร้างความเข้าใจและกระตุ้นความสนใจให้กับผู้เรียน",
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