import Section from "../components/Section";
import Timeline from "../components/Timeline";
import { motion } from "framer-motion";
import { profile } from "../data";


export default function Education() {
    return (
        <Section id="education" title="Education">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <Timeline items={profile.education} />
            </motion.div>
        </Section>
    );
}