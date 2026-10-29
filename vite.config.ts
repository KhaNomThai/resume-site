import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// deploy บน Vercel ที่ root ("/") — base เป็นค่าเริ่มต้น จึงไม่ต้องตั้ง
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
