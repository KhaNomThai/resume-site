import { motion } from "framer-motion";
import Page from "../components/Page";
import Section, { container, item } from "../components/Section";
import SkillIcon from "../components/SkillIcon";
import { profile, type Skill } from "../data";

export default function Skills() {
  const grouped = groupByCategory(profile.skills);

  // ลำดับหมวดที่อยากให้โชว์ก่อน-หลัง (แก้ได้ตามใจ)
  const categoryOrder = ["Frontend", "Backend", "Core", "Data/AI", "Mobile", "Tools", "Other"];

  const orderedGroups = categoryOrder
    .filter((c) => grouped[c])
    .map((c) => [c, grouped[c]] as [string, Skill[]]);

  return (
    <Page>
      <Section id="skills" title="Skills">
        <div className="space-y-8">
          {orderedGroups.map(([category, list]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-300 uppercase">
                {category}
              </h3>

              <motion.div
                variants={container(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {list.map((s) => (
                  <motion.a
                    key={s.name}
                    variants={item(8)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={normalizeSkillUrl(s.name)} // 👈 ฟังก์ชันลิงก์
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 h-12 sm:h-14 px-3 
             rounded-lg border border-[#1f2a44] bg-[#111a2c] 
             text-gray-100 text-sm sm:text-base font-medium 
             transform-gpu will-change-transform shadow-sm hover:bg-[#1a2540]"
                  >
                    <SkillIcon name={s.name} />
                    <span className="truncate">{s.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}

// === Utility ===
function groupByCategory(skills: Skill[]) {
  const map: Record<string, Skill[]> = {};
  for (const s of skills) {
    const k = s.category ?? "Other";
    (map[k] ??= []).push(s);
  }

  return map;
}

function normalizeSkillUrl(name: string) {
  const key = name.trim().toLowerCase().replace(/[.\-/\s]+/g, "");
  const urls: Record<string, string> = {
    react: "https://react.dev/",
    typescript: "https://www.typescriptlang.org/",
    javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    tailwind: "https://tailwindcss.com/",
    firebase: "https://firebase.google.com/",
    nodejs: "https://nodejs.org/",
    python: "https://www.python.org/",
    java: "https://www.java.com/",
    cpp: "https://isocpp.org/",
    git: "https://git-scm.com/",
    figma: "https://www.figma.com/",
    html: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    mysql: "https://www.mysql.com/",
    vscode: "https://code.visualstudio.com/",
  };
  return urls[key] || "#";
}
