/** Pin เวอร์ชันเสมอ — @latest เปลี่ยนได้ทุกเมื่อ ถ้า devicon rename ไฟล์ icon จะพังเงียบ ๆ */
const DEVICON_BASE = "https://cdn.jsdelivr.net/npm/devicon@2.18.0/icons";

type Props = { name: string; icon?: string; size?: number };

/** Icon เป็น decoration — ชื่อ skill แสดงเป็นข้อความข้าง ๆ อยู่แล้ว จึงใช้ alt="" */
export default function SkillIcon({ name, icon, size = 22 }: Props) {
  if (icon) {
    return (
      <img
        src={`${DEVICON_BASE}/${icon}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className="shrink-0"
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#1f2a44] text-[10px] font-semibold text-gray-200"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}
