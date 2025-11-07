import { motion } from "framer-motion";
import Page from "../components/Page.tsx";
import Section, { container, item } from "../components/Section";
import { profile } from "../data";

export default function Projects() {
    return (
        <Page>
            <Section id="projects" title="Projects">
                <motion.div
                    variants={container()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid gap-4"
                >
                    {profile.projects.map((p) => (
                        <motion.a
                            key={p.title}
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-2xl border border-[#1f2a44] bg-[#111a2c] p-5"
                            variants={item(10)}
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.995 }}
                            transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-medium text-white text-lg">{p.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags?.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs rounded-full border border-[#1f2a44] px-2 py-0.5 text-gray-300"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-300">{p.desc}</p>
                        </motion.a>
                    ))}
                </motion.div>
            </Section>
        </Page>
    );
}
