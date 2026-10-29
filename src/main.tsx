import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* LazyMotion + m.* โหลดแค่ feature ที่ใช้ (animation, hover/tap, inView) แทน motion.* ตัวเต็ม → bundle เล็กลง
        strict: ถ้าเผลอใช้ motion.* จะ error ทันที */}
    <LazyMotion features={domAnimation} strict>
      {/* ผู้ใช้ที่ตั้ง "Reduce motion" ใน OS จะไม่เห็น transform animation ของ framer-motion */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>
);
