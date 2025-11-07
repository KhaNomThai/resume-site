import { motion } from "framer-motion";
import Page from "../components/Page.tsx";
import Section, { container } from "../components/Section";
import Timeline from "../components/Timeline";
import { profile } from "../data";

export default function Education() {
    return (
        <Page>
            <Section id="education" title="Education">
                <motion.div
                    variants={container()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <Timeline items={profile.education} />
                </motion.div>
            </Section>
        </Page>
    );
}
