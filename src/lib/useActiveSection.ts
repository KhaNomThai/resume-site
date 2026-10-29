import { useEffect, useState } from "react";

/**
 * Scroll-spy: คืน id ของ section ที่พาดผ่านแถบบาง ๆ กลางจอ (ใช้ไฮไลต์เมนู)
 * `ids` ต้องเป็นค่าคงที่ (ประกาศระดับ module) ไม่งั้น observer จะถูกสร้างใหม่ทุก render
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
