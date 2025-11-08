import { motion } from "framer-motion";
import Page from "../components/Page";
import Section, { container, item } from "../components/Section";
import { profile, type Skill } from "../data";

export default function Skills() {
  const grouped = groupByCategory(profile.skills);

  return (
    <Page>
      <Section id="skills" title="Skills">
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, list]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm uppercase tracking-wide text-gray-400">
                {category}
              </h3>

              <motion.ul
                variants={container(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {list.map((s) => (
                  <motion.li
                    key={s.name}
                    variants={item(10)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-full border border-[#1f2a44] bg-[#111a2c] text-gray-200 text-sm font-medium transform-gpu will-change-transform"
                  >
                    {s.name}
                  </motion.li>
                ))}
              </motion.ul>
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

  // เรียงตามตัวอักษร (ไม่ต้องเรียงระดับแล้ว)
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => a.name.localeCompare(b.name));
  }
  return map;
}
