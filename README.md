# Kulachart Parnduangkeaw — Portfolio

![Portfolio preview](public/og-image.png)

Personal portfolio and resume of **Kulachart Parnduangkeaw**, a Computer Engineering student at Srinakharinwirot University focused on full-stack development and Data/AI.

**Live site:** https://kulachart-resume-site.vercel.app

## Highlights

- **One source of truth.** All content lives in [`src/data.ts`](src/data.ts). The website and the downloadable PDF CV are both generated from it, so they always match.
- **Quick first impression.** The hero fits the first screen on laptops and phones and finishes animating in under a second.
- **Interactive projects.** Filter projects by technology, or select a skill to jump to the projects that use it.
- **⌘K command palette.** Jump to any section, copy the email, download the CV, or open GitHub/LinkedIn from the keyboard.
- **Accessible.**
  - Semantic landmarks and headings
  - Skip link and visible focus states
  - Screen-reader hints for links that open a new tab
  - Full `prefers-reduced-motion` support
- **Lightweight motion.** Framer Motion loads through `LazyMotion` with only the features in use. Ambient effects are CSS transforms, and nothing animates layout properties.
- **Share-ready.** Open Graph and Twitter cards use a generated preview image, plus JSON-LD structured data.

## Tech stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Framer Motion · Geist font

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
```

## Updating content

1. Edit [`src/data.ts`](src/data.ts). It holds the profile, projects, experience, skills, and education.
2. Regenerate the PDF CV with `npm run cv`. The output is `src/assets/Kulachart-Parnduangkeaw-CV.pdf`.
3. If the headline changed, regenerate the link-preview image with `npm run og`. The output is `public/og-image.png`.

Both scripts render HTML with headless Google Chrome. If Chrome isn't in its default location, set `CHROME_PATH`. They need a Node.js version with built-in TypeScript support (22.18+ or 23.6+).

## Project structure

```
src/
├── data.ts              # all website + CV content
├── config/sections.ts   # section ids/labels shared by nav, ⌘K palette, and scroll-spy
├── sections/            # Hero, Projects, Experience, Skills, Education, Contact
├── components/          # Navbar, CommandPalette, Toast, Section, icons, …
├── lib/                 # hooks and helpers (scroll-spy, clipboard, motion presets, …)
└── assets/              # photos, skill icons (devicon), generated CV
scripts/                 # CV PDF and og:image generators
```

## Deployment

The site is deployed on Vercel with the Vite preset (build command `npm run build`, output `dist/`).
