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
        "A dedicated Computer Engineering student with a strong interest in full-stack software development and a passion for turning data into value through Data and AI. I have hands-on experience building web applications, covering everything from UI design to deployment. Currently, I am expanding my skills in backend architecture while working on research projects that involve statistics and machine learning. I am always eager to learn new technologies and looking for an internship where I can apply my engineering skills in a real-world setting.",
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
            title: "Visualization of Prim's Algorithm",
            link: "https://github.com/KhaNomThai/project-cpe101",
            desc: "An interactive web app that walks users through each step of Prim's Algorithm. Built as an educational tool for learning graph theory.",
            tags: ["HTML", "Javascript", "CSS"],
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
    ] as Project[],
    experience: [
        {
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