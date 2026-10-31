import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * ใส่ <link rel="preload"> ให้ไฟล์ฟอนต์ (เฉพาะตอน build เพราะชื่อไฟล์มี hash)
 * เว็บนี้เป็น SPA: ถ้าไม่ preload เบราว์เซอร์จะรู้ว่าต้องใช้ฟอนต์ก็ต่อเมื่อ React วาดข้อความแล้ว
 * ฟอนต์จึงมาถึงช้ากว่าการวาดครั้งแรกเสมอ → preload ให้โหลดคู่ไปกับ JS ตั้งแต่อ่าน HTML
 * ใส่เฉพาะ subset latin ที่เนื้อหาภาษาอังกฤษใช้จริง (subset อื่นใน CSS ของ fontsource โหลดเมื่อเจออักษรนั้นเท่านั้น)
 */
function preloadFonts(names: string[]): Plugin {
  let base = '/'
  return {
    name: 'preload-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(_html, ctx) {
      return Object.keys(ctx.bundle ?? {})
        .filter((file) => file.endsWith('.woff2') && names.some((name) => file.includes(name)))
        .map((file) => ({
          tag: 'link',
          // crossorigin จำเป็น: เบราว์เซอร์โหลดฟอนต์แบบ CORS ถ้า preload ไม่มี attribute นี้จะโหลดซ้ำสองรอบ
          attrs: { rel: 'preload', href: base + file, as: 'font', type: 'font/woff2', crossorigin: true },
          injectTo: 'head',
        }))
    },
  }
}

// https://vite.dev/config/
// deploy บน Vercel ที่ root ("/") — base เป็นค่าเริ่มต้น จึงไม่ต้องตั้ง
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadFonts(['newsreader-latin-opsz-normal', 'ibm-plex-sans-latin-wght-normal']),
  ],
})
