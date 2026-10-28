import { motion } from "framer-motion";
import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="relative py-16 print:hidden">
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* บนพื้น #0b1220: gray-600 ≈ 2.5:1, gray-500 ≈ 3.9:1 → ต่ำกว่า 4.5:1 (WCAG AA) จึงใช้ gray-400 */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="mt-1 text-xs text-gray-400">Built with React · Framer Motion · Tailwind CSS</p>
      </motion.div>
    </footer>
  );
}
