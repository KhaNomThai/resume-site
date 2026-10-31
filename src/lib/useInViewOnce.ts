import { useEffect, useRef, useState } from "react";

/**
 * true ตั้งแต่ครั้งแรกที่ element เข้ามาในจอ แล้วค้างไว้ (ใช้เล่นการขีดปากกาเน้นบนการ์ดครั้งเดียว)
 * ต้องเห็นอย่างน้อย 60% ก่อน การขีดจึงเกิดตอนคนอ่านมองอยู่จริง ไม่ใช่ตอนการ์ดเพิ่งโผล่ขอบจอ
 */
export function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen]);

  return [ref, seen] as const;
}
