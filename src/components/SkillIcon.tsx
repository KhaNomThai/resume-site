import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiFirebase,
  SiNodedotjs, SiPython, SiC, SiCplusplus, SiGit, SiFigma,
  SiHtml5, SiCss3, SiMysql
} from "react-icons/si";

type IconEntry = {
  Icon: React.ComponentType<{ size?: string | number; color?: string }>;
  color: string;
  url: string;
};

const ICONS: Record<string, IconEntry> = {
  react:      { Icon: SiReact,       color: "#61DAFB", url: "https://react.dev/" },
  typescript: { Icon: SiTypescript,  color: "#3178C6", url: "https://www.typescriptlang.org/" },
  javascript: { Icon: SiJavascript,  color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  tailwind:   { Icon: SiTailwindcss, color: "#38BDF8", url: "https://tailwindcss.com/" },
  firebase:   { Icon: SiFirebase,    color: "#FFCA28", url: "https://firebase.google.com/" },
  nodejs:     { Icon: SiNodedotjs,   color: "#68A063", url: "https://nodejs.org/" },
  python:     { Icon: SiPython,      color: "#3776AB", url: "https://www.python.org/" },
  java:       { Icon: FaJava,        color: "#007396", url: "https://www.java.com/" },
  cpp:        { Icon: SiCplusplus,   color: "#00599C", url: "https://isocpp.org/" },
  c:          { Icon: SiC,           color: "#00599C", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  git:        { Icon: SiGit,         color: "#F05032", url: "https://git-scm.com/" },
  figma:      { Icon: SiFigma,       color: "#F24E1E", url: "https://www.figma.com/" },
  html:       { Icon: SiHtml5,       color: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  css:        { Icon: SiCss3,        color: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  mysql:      { Icon: SiMysql,       color: "#4479A1", url: "https://www.mysql.com/" },
  vscode:     { Icon: VscVscode, color: "#007ACC", url: "https://code.visualstudio.com/" },
};

function normalize(raw: string) {
  let key = raw.trim().toLowerCase();
  key = key.replace(/[.\-/\s]+/g, "");

  if (key.includes("c++")) key = "cpp";
  if (key === "c/c++") key = "cpp";
  if (key === "node" || key === "nodejs") key = "nodejs";
  if (key === "visualstudiocode" || key === "vscode") key = "vscode";
  if (key === "html5") key = "html";
  if (key === "css3") key = "css";

  return key;
}

export default function SkillIcon({ name, size = 22 }: { name: string; size?: number }) {
  const key = normalize(name);
  const entry = ICONS[key];

  if (!entry) {
    const initials = name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
    return (
      <span
        aria-label={name}
        className="inline-flex items-center justify-center size-6 rounded-full bg-[#1f2a44] text-[10px] font-semibold text-gray-200"
        title={name}
      >
        {initials}
      </span>
    );
  }

  const { Icon, color, url } = entry;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
      <Icon size={size} color={color} />
    </a>
  );
}
