import Section from "../components/Section";
import Timeline from "../components/Timeline";
import { motion } from "framer-motion";
import { profile } from "../data";

export default function Experience() {
return (
<Section id="experience" title="Experience">
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
<Timeline items={profile.experience} />
</motion.div>
</Section>
);
}