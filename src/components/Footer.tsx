import { profile, repoUrl } from "../data";
import { linkProps } from "../lib/links";
import { PALETTE_SHORTCUT } from "../lib/platform";
import NewTabHint from "./NewTabHint";

export default function Footer({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <footer className="border-t border-rule print:hidden">
      <div className="page-container flex flex-col gap-3 py-8 type-small text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React, TypeScript, Tailwind CSS and Framer Motion.{" "}
          {/* ลิงก์กลางประโยค: ขีดเส้นใต้เสมอ ไม่บอกด้วยสีอย่างเดียว (axe: link-in-text-block) */}
          <a
            {...linkProps(repoUrl)}
            className="text-pen underline underline-offset-3 transition-colors duration-(--duration-fast) hover:text-pen-hover"
          >
            Source code
            <NewTabHint href={repoUrl} />
          </a>
        </p>
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden min-h-11 items-center gap-2 rounded-control text-left transition-colors duration-(--duration-fast) hover:text-ink md:inline-flex"
        >
          Press
          <kbd className="rounded-tag border border-stroke px-1.5 py-0.5 type-caption text-ink">{PALETTE_SHORTCUT}</kbd>
          for quick actions
        </button>
      </div>
    </footer>
  );
}
