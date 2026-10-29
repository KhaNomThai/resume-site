/**
 * ไอคอนเก็บในโปรเจกต์เอง (src/assets/skills, ที่มา: devicon) แทนการโหลดจาก CDN ทีละไฟล์
 * ไฟล์เล็กกว่า 4 KB ถูก Vite inline เข้า bundle → ไม่มี request เพิ่ม และไม่พังถ้า CDN ล่ม
 * บางไฟล์ปรับสีให้สว่างขึ้นเพื่อให้เห็นบนพื้นมืด (mysql, pandas, java, unity, scikitlearn)
 */
const ICONS = import.meta.glob<string>("../assets/skills/*.svg", { eager: true, import: "default" });

type Props = { icon?: string; size?: number };

/** Icon เป็น decoration — ชื่อ skill แสดงเป็นข้อความข้าง ๆ อยู่แล้ว จึงใช้ alt="" */
export default function SkillIcon({ icon, size = 18 }: Props) {
  const src = icon ? ICONS[`../assets/skills/${icon}.svg`] : undefined;

  if (!src) {
    if (import.meta.env.DEV && icon) console.warn(`SkillIcon: ไม่พบไฟล์ src/assets/skills/${icon}.svg`);
    // chip ที่ไม่มีโลโก้ (เช่น "Machine Learning") ใช้จุดสีแทน ให้แนวเดียวกับตัวอื่น
    return <span aria-hidden="true" className="mx-[5px] size-2 shrink-0 rounded-full bg-indigo-400/80" />;
  }

  return <img src={src} alt="" width={size} height={size} decoding="async" className="shrink-0" />;
}
