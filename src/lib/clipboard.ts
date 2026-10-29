/** คืน false ถ้าคัดลอกไม่ได้จริง ๆ — ผู้เรียกควรแสดงข้อความนั้นให้ผู้ใช้คัดลอกเอง */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return legacyCopy(text);
  }
}

/**
 * สำรองสำหรับ in-app browser (เช่น LINE, Facebook) ที่ปิด Clipboard API ไว้
 * execCommand เลิกแนะนำแล้วแต่ยังรองรับทุกเบราว์เซอร์ และยังอยู่ในช่วง user activation ของการคลิกเดิม
 */
function legacyCopy(text: string) {
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
    previous?.focus({ preventScroll: true });
  }
}
