import { motion } from "framer-motion";
import type { Skill } from "../data";

export default function SkillChip({ s }: { s: Skill }) {
  return (
    <motion.div
      className="rounded-xl border border-[#1f2a44] bg-[#111a2c] px-4 py-3 flex items-center justify-between gap-4"
      whileHover={{ y: -1, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <div className="min-w-0">
        <div className="font-medium text-white">{s.name}</div>
        <div className="text-xs text-gray-400">
          {s.years ? `${s.years}+ yrs` : ""}{s.years && (s.lastUsed || s.projects) ? " • " : ""}
          {s.lastUsed ? `last: ${s.lastUsed}` : ""}{s.lastUsed && s.projects ? " • " : ""}
          {s.projects ? `${s.projects} proj` : ""}
        </div>
      </div>
      <DotMeter value={s.level} />
    </motion.div>
  );
}

function DotMeter({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < value;
        return <div key={i} className={`size-2.5 rounded-full ${active ? "bg-indigo-400" : "bg-[#1f2a44]"}`} />;
      })}
    </div>
  );
}
