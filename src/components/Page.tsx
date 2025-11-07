import { motion, type Variants } from "framer-motion";

const pageVariants: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {children}
        </motion.main>
    );
}