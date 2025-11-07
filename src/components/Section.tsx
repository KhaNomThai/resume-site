/* eslint-disable react-refresh/only-export-components */
import { motion, type Variants } from "framer-motion";
export default function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="max-w-5xl mx-auto px-6 py-10">
            <motion.h2
                className="text-xl sm:text-2xl font-semibold tracking-tight mb-6"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
                {title}
            </motion.h2>
            {children}
        </section>
    );
}
export const container = (stagger = 0.08): Variants => ({ hidden: {}, show: { transition: { staggerChildren: stagger } } });
export const item = (y = 16): Variants => ({ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } as const } });