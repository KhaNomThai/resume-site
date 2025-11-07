import { motion } from "framer-motion";
import Page from "../components/Page.tsx";
import { profile } from "../data";
import profileImg from "../assets/profile.jpg";

export default function Home() {
  return (
    <Page>
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          {/* รูปโปรไฟล์ */}
          <motion.img
            src={profileImg}
            alt={`Portrait of ${profile.name}`}
            className="size-32 md:size-40 rounded-full ring-2 ring-[#1f2a44] object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />

          {/* ข้อมูลส่วนตัว */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="flex-1 text-center md:text-right"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="text-gray-300">{profile.role}</p>
            <p className="text-sm text-gray-400">{profile.location}</p>
          </motion.div>
        </div>

        <motion.p
          className="mt-8 text-base leading-relaxed text-gray-200 max-w-3xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {profile.summary}
        </motion.p>

        <ul className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
          <li>
            <a
              className="underline"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="underline"
              href={`https://www.linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </header>
    </Page>
  );
}