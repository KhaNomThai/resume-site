import { motion } from "framer-motion";
import Page from "../components/Page";
import Section, { container, item } from "../components/Section";
import SkillChip from "../components/SkillChip.tsx";
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

              <motion.div
                variants={container(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {list.map((s) => (
                  <motion.div key={s.name} variants={item(10)}>
                    <SkillChip s={s} />
                  </motion.div>
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

  // เรียงจากระดับสูง → ต่ำ
  for (const k of Object.keys(map)) {
    map[k].sort(
      (a, b) => b.level - a.level || a.name.localeCompare(b.name)
    );
  }
  return map;
}
