import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Kulachart Parnduangkeaw
        </p>
        <p className="text-xs text-gray-700 mt-1">
          Built with React · Framer Motion · Tailwind CSS
        </p>
      </motion.div>
    </footer>
  );
}