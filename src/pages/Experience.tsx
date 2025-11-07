import { motion } from "framer-motion";
import Page from "../components/Page.tsx";
import Section, { container } from "../components/Section";
import Timeline from "../components/Timeline";
import { profile } from "../data";

export default function Experience() {
    return (
        <Page>
            <Section id="experience" title="Experience">
                <motion.div
                    variants={container()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {/* Timeline ภายในมี motion.li พร้อม variants อยู่แล้ว */}
                    <Timeline items={profile.experience} />
                </motion.div>
            </Section>
        </Page>
    );
}
