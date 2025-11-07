import { motion, type Variants } from "framer-motion";

const page: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="transform-gpu will-change-transform"
      variants={page}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
}
