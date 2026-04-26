/**
 * SkillIcon – renders real multi-color logos from the devicon CDN.
 * Falls back to react-icons single-color for those not covered by devicon.
 */

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Maps normalised skill name → [devicon folder, filename, devicon color icon] */
const DEVICON_MAP: Record<string, [string, string]> = {
  html:       ["html5",       "html5-original"],
  css:        ["css3",        "css3-original"],
  javascript: ["javascript",  "javascript-original"],
  react:      ["react",       "react-original"],
  typescript: ["typescript",  "typescript-original"],
  tailwind:   ["tailwindcss", "tailwindcss-original"],
  firebase:   ["firebase",    "firebase-original"],
  nodejs:     ["nodejs",      "nodejs-original"],
  python:     ["python",      "python-original"],
  java:       ["java",        "java-original"],
  cpp:        ["cplusplus",   "cplusplus-original"],
  c:          ["c",           "c-original"],
  git:        ["git",         "git-original"],
  figma:      ["figma",       "figma-original"],
  mysql:      ["mysql",       "mysql-original"],
  vscode:     ["vscode",      "vscode-original"],
};

function normalize(raw: string) {
  let key = raw.trim().toLowerCase();
  key = key.replace(/[.\-/\s]+/g, "");

  if (key.includes("c++") || key === "c/c++") key = "cpp";
  if (key === "node" || key === "nodejs" || key === "node.js") key = "nodejs";
  if (key === "visualstudiocode" || key === "vscode") key = "vscode";
  if (key === "html5") key = "html";
  if (key === "css3") key = "css";
  if (key === "tailwindcss") key = "tailwind";
  if (key === "firebase") key = "firebase";
  if (key === "figma") key = "figma";
  if (key === "mysql") key = "mysql";

  return key;
}

export default function SkillIcon({ name, size = 22 }: { name: string; size?: number }) {
  const key = normalize(name);
  const entry = DEVICON_MAP[key];

  if (entry) {
    const [folder, file] = entry;
    const url = `${DEVICON_BASE}/${folder}/${file}.svg`;
    return (
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className="flex-shrink-0 border-0 outline-none"
        loading="lazy"
        style={{ width: size, height: size, border: "none" }}
      />
    );
  }

  // Fallback: initials badge
  const initials = name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span
      aria-label={name}
      className="inline-flex items-center justify-center rounded-full bg-[#1f2a44] text-[10px] font-semibold text-gray-200 flex-shrink-0"
      style={{ width: size, height: size }}
      title={name}
    >
      {initials}
    </span>
  );
}
