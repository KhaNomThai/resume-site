import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { text: string; delay?: number; speed?: number };

/**
 * ถ้า `text` เปลี่ยนได้ ให้ใส่ key={text} ตอนเรียกใช้ เพื่อ reset state ทั้งหมด
 */
export default function Typewriter({ text, delay = 1000, speed = 60 }: Props) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;

    let i = 0;
    let intervalId: number | undefined;
    let hideCursorId: number | undefined;

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(intervalId);
          hideCursorId = window.setTimeout(() => setCursorVisible(false), 2000);
        }
      }, speed);
    }, delay);

    // เก็บ id ทุกตัวไว้ใน closure เดียว → cleanup ล้างได้ครบ ไม่ว่า effect จะอยู่ขั้นไหน
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
      window.clearTimeout(hideCursorId);
    };
  }, [text, delay, speed, reduceMotion]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {reduceMotion ? text : text.slice(0, count)}
        {cursorVisible && !reduceMotion && (
          <motion.span
            className="inline-block w-[2px] h-[1.1em] bg-indigo-400 ml-0.5 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </span>
    </>
  );
}
