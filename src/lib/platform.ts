const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/** ข้อความปุ่มลัดเปิด command palette ให้ตรงกับระบบที่ใช้อยู่ */
export const PALETTE_SHORTCUT = isApple ? "⌘K" : "Ctrl K";
