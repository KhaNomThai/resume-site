import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** key เดียวกับสคริปต์ใน index.html ที่ตั้งธีมก่อนหน้าเว็บถูกวาด */
const STORAGE_KEY = "theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // storage ถูกปิด → ถือว่ายังไม่เคยเลือก
    return null;
  }
}

/** token ทุกตัวเปลี่ยนค่าตาม data-theme บน <html> (ดู styles/tokens.css) */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  // แถบเบราว์เซอร์บนมือถือให้ตามธีมที่เลือกจริง ไม่ใช่ตามระบบ
  const paper = getComputedStyle(root).getPropertyValue("--color-paper").trim();
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", paper);
    meta.removeAttribute("media");
  }
}

/** ธีมปัจจุบัน + ตัวสลับ: ผู้ใช้ที่ยังไม่เคยกดเลือก จะได้ธีมตามระบบแบบสด ๆ (เช่น macOS เปลี่ยนเป็นมืดตอนค่ำ) */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (storedTheme()) return;
      const next = e.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // จำค่าไม่ได้ก็ยังสลับธีมในหน้านี้ได้
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}
