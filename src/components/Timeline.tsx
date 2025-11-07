import { motion } from "framer-motion";
import type { TimelineItem } from "../data";
import { item } from "./Section";

export default function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <ol className="relative ps-5 border-s border-[#1f2a44]">
            {items.map((it, i) => (
                <motion.li key={i} className="mb-6 ms-2" variants={item(10)}>
                    <span className="absolute -start-1.5 mt-1.5 size-3 rounded-full bg-white/90" />
                    <h3 className="font-medium">{it.title} — {it.org}</h3>
                    <p className="text-sm text-gray-400">{it.period}</p>
                    {!!it.bullets?.length && (
                        <ul className="list-disc ms-5 mt-2 space-y-1 text-sm text-gray-300">
                            {it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                        </ul>
                    )}
                </motion.li>
            ))}
        </ol>
    );
}