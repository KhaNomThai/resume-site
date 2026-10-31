/**
 * โลโก้ Serif K. (ต้นฉบับ: design/logo/k-serif.svg) ฝังเป็น SVG inline แทนการโหลดไฟล์
 * ตัว K ใช้ currentColor (กำหนดด้วย text-*) ส่วนจุดใช้สี pen → เปลี่ยนตามธีมเองโดยไม่ต้องสลับไฟล์
 * เป็นของตกแต่ง: ชื่อที่วางข้าง ๆ คือ accessible name ของลิงก์
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M44.36 49.92 48.24 51.11V52H28.99V51.1L33.52 50L18 31.93H14.77V29.87H18.02L36.98 14.12L31.85 12.9V12H44.65V12.9L39.75 14.12L20.21 30.21L24.45 26.53ZM17.26 14.1V49.87L21.93 51.1V52H4V51.1L8.67 49.87V14.1L4 12.91V12H21.93V12.9Z"
      />
      <circle cx="55" cy="49" r="4" className="fill-pen" />
    </svg>
  );
}
