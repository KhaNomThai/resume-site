import { useEffect, useId, useMemo, useRef, useState, type ComponentType, type KeyboardEvent, type SVGProps } from "react";
import { SECTIONS, TOP_ID } from "../config/sections";
import { githubUrl, linkedinUrl, profile, repoUrl } from "../data";
import { CV_FILENAME, CV_URL } from "../lib/cv";
import { useCopyEmail } from "../lib/useCopyEmail";
import {
  ArrowUpIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  HashIcon,
  LinkedInIcon,
  MailIcon,
  SearchIcon,
} from "./icons";

type Command = {
  id: string;
  label: string;
  /** ข้อความเล็กด้านขวา (ประเภท/ปลายทาง) — ใช้ค้นหาได้ด้วย */
  hint: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  run: () => void;
  /** เปิดแท็บใหม่: บอก screen reader แบบเดียวกับ NewTabHint ของลิงก์ทั่วไป */
  external?: boolean;
};

/** เลื่อนไปที่ section แล้วย้าย focus ไปที่หัวข้อ → Tab ถัดไปเริ่มจากตรงนั้น และ screen reader อ่านชื่อ section */
function goTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  history.pushState(null, "", `#${id}`);
  target.scrollIntoView();
  // หาหัวข้อจาก aria-labelledby ของ section: hero ใช้ id "hero-heading" ไม่ใช่ "top-heading" ตามแบบของ section อื่น
  const headingId = target.getAttribute("aria-labelledby");
  const heading = headingId ? document.getElementById(headingId) : null;
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadCv() {
  const a = document.createElement("a");
  a.href = CV_URL;
  a.download = CV_FILENAME;
  a.click();
}

type Props = { open: boolean; onClose: () => void };

/** ⌘K / Ctrl+K — ใช้ <dialog> ของเบราว์เซอร์: trap focus, ปิดด้วย Esc และคืน focus ให้ปุ่มที่เปิดให้เอง */
export default function CommandPalette({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const copyEmail = useCopyEmail();

  const commands = useMemo<Command[]>(
    () => [
      ...SECTIONS.map(({ id, label }) => ({
        id: `go-${id}`,
        label,
        hint: "Section",
        Icon: HashIcon,
        run: () => goTo(id),
      })),
      { id: "go-top", label: "Back to top", hint: "Section", Icon: ArrowUpIcon, run: () => goTo(TOP_ID) },
      { id: "copy-email", label: "Copy email address", hint: profile.email, Icon: CopyIcon, run: copyEmail },
      {
        id: "send-email",
        label: "Send an email",
        hint: "Action",
        Icon: MailIcon,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      { id: "download-cv", label: "Download resume (PDF)", hint: "Action", Icon: DownloadIcon, run: downloadCv },
      {
        id: "github",
        label: "GitHub",
        hint: `@${profile.github}`,
        Icon: GitHubIcon,
        run: () => openExternal(githubUrl),
        external: true,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "Profile",
        Icon: LinkedInIcon,
        run: () => openExternal(linkedinUrl),
        external: true,
      },
      {
        id: "source",
        label: "View source code",
        hint: "GitHub",
        Icon: CodeIcon,
        run: () => openExternal(repoUrl),
        external: true,
      },
    ],
    [copyEmail]
  );

  const q = query.trim().toLowerCase();
  const results = q ? commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q)) : commands;
  const active = results[Math.min(activeIndex, results.length - 1)];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // เลื่อนรายการที่เลือกให้อยู่ในกรอบเสมอเมื่อกดลูกศร
  useEffect(() => {
    if (active) document.getElementById(`${listId}-${active.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  // ทั้ง Esc, คลิกพื้นหลัง และ dialog.close() จบที่ event "close" นี้ทางเดียว
  const handleClose = () => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  };

  const run = (command: Command) => {
    dialogRef.current?.close(); // คืน focus ก่อน แล้วค่อยทำคำสั่ง (เช่นย้าย focus ไป section)
    command.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (Math.min(i, results.length - 1) + step + results.length) % results.length);
    } else if (e.key === "Enter" && active) {
      e.preventDefault();
      run(active);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
      // ลอยเหนือหน้า → shadow-overlay; ฉากหลังใช้สี paper โปร่ง จึงจางเนื้อหาได้ทั้งโหมดสว่างและมืดโดยไม่ต้องมีสีใหม่
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-rule bg-surface p-0 text-ink shadow-overlay backdrop:bg-paper/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-rule px-4">
        <SearchIcon className="size-5 shrink-0 text-ink-muted" />
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active ? `${listId}-${active.id}` : undefined}
          aria-label="Search commands"
          placeholder="Jump to a section or run a command…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
          className="h-14 min-w-0 flex-1 bg-transparent type-body text-ink outline-none placeholder:text-ink-muted"
        />
        <kbd className="hidden rounded-tag border border-rule px-1.5 py-0.5 type-caption text-ink-muted sm:inline">Esc</kbd>
      </div>

      <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[min(24rem,55vh)] overflow-y-auto p-2">
        {results.map((command) => {
          const selected = command === active;
          return (
            <li
              key={command.id}
              id={`${listId}-${command.id}`}
              role="option"
              aria-selected={selected}
              onPointerMove={() => setActiveIndex(results.indexOf(command))}
              onClick={() => run(command)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-3 type-small ${
                selected ? "bg-paper text-ink" : "text-ink-muted"
              }`}
            >
              <command.Icon className="size-4 shrink-0" />
              <span className="flex-1 truncate">
                {command.label}
                {command.external && <span className="sr-only"> (opens in a new tab)</span>}
              </span>
              <span className="max-w-[45%] truncate type-caption text-ink-muted">{command.hint}</span>
            </li>
          );
        })}
      </ul>
      {results.length === 0 && (
        <p className="px-4 pb-8 pt-6 type-small text-ink-muted">No results for “{query}”. Try a section name, “email” or “resume”.</p>
      )}

      <div aria-hidden="true" className="flex gap-4 border-t border-rule px-4 py-3 type-caption text-ink-muted">
        <span>
          <kbd>↑</kbd> <kbd>↓</kbd> to navigate
        </span>
        <span>
          <kbd>↵</kbd> to select
        </span>
        <span>
          <kbd>esc</kbd> to close
        </span>
      </div>
    </dialog>
  );
}
