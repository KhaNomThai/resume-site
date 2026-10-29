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
            <m.p
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141c2e]/95 px-4 py-2.5 text-sm text-white shadow-xl shadow-black/40 backdrop-blur"
            >
              <CheckIcon className="size-4 text-emerald-400" />
              {toast.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
