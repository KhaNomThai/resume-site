import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ToastContext } from "../lib/toast";
import { CheckIcon } from "./icons";

const DURATION_MS = 2400;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((message: string) => {
    window.clearTimeout(timer.current);
    // id ใหม่ทุกครั้ง → ข้อความเดิมซ้ำก็ยังเล่น animation ใหม่
    setToast({ id: Date.now(), message });
    timer.current = window.setTimeout(() => setToast(null), DURATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {/* live region ต้อง render ไว้ตั้งแต่แรก screen reader ถึงจะอ่านข้อความที่ใส่เข้ามาทีหลัง */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 print:hidden"
      >
        <AnimatePresence>
          {toast && (
            // toast ลอยเหนือหน้า จึงมีเงา shadow-overlay ตามกติกาเงาของระบบ (ของที่วางราบบนกระดาษไม่มีเงา)
            <m.p
              key={toast.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-center gap-2 rounded-card border border-rule bg-surface px-4 py-3 type-small text-ink shadow-overlay"
            >
              <CheckIcon className="size-4 text-pen" />
              {toast.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
