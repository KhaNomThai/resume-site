import { profile, repoUrl } from "../data";
import { linkProps } from "../lib/links";
import { PALETTE_SHORTCUT } from "../lib/platform";
import NewTabHint from "./NewTabHint";

export default function Footer({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <footer className="border-t border-white/[0.06] print:hidden">
      {/* บนพื้น ink: gray-500 ≈ 3.9:1 ต่ำกว่า 4.5:1 (WCAG AA) จึงใช้ gray-400 */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-center text-sm text-gray-400 md:flex-row md:justify-between md:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React, TypeScript, Tailwind CSS &amp; Framer Motion ·{" "}
          <a {...linkProps(repoUrl)} className="text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline">
            Source code
            <NewTabHint href={repoUrl} />
          </a>
        </p>
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden items-center gap-2 rounded-full px-2 py-1 transition-colors hover:text-white md:inline-flex"
        >
          Press
          <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-xs text-gray-300">{PALETTE_SHORTCUT}</kbd>
          for quick actions
        </button>
      </div>
    </footer>
  );
}
