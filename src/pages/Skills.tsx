import { motion } from "framer-motion";
import Page from "../components/Page.tsx";
import Section, { container, item } from "../components/Section";
import SkillBar from "../components/SkillBar";
import { profile } from "../data";

export default function SkillsPage() {
  return (
    <Page>
      <Section id="skills" title="Skills">
        <motion.div
          variants={container()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 gap-5"
        >
          {profile.skills.map((s) => (
            <motion.div key={s.name} variants={item()}>
              <SkillBar name={s.name} level={s.level} />
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </Page>
  );
}
