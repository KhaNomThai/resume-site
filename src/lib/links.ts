export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** ลิงก์ http(s) เปิดแท็บใหม่ + rel ครบ; mailto:/tel:/#anchor เปิดในหน้าเดิม */
export function linkProps(href: string) {
  return isExternal(href)
    ? ({ href, target: "_blank", rel: "noopener noreferrer" } as const)
    : { href };
}
