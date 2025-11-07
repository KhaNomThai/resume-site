import { motion, useReducedMotion } from "framer-motion";
export default function SkillBar({ name, level }: { name: string; level: number }) {
    const prefersReduced = useReducedMotion();
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>{name}</span>
                <span className="tabular-nums text-gray-400 dark:text-gray-400">{level}%</span>
            </div>
            <div className="h-2 rounded bg-[#1f2a44] overflow-hidden">
                <motion.div
                    className="h-2 rounded"
                    style={{ background: "linear-gradient(90deg,#9fb7ff,#6a83ff)" }}
                    initial={{ width: prefersReduced ? level + "%" : 0 }}
                    whileInView={{ width: level + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" as const }}
                />
            </div>
        </div>
    );
}