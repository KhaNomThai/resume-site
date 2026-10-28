import { isExternal } from "../lib/links";

/** บอก screen reader ว่าลิงก์นี้จะเปิดแท็บใหม่ — ใช้คู่กับ linkProps() */
export default function NewTabHint({ href }: { href: string }) {
  return isExternal(href) ? <span className="sr-only"> (opens in a new tab)</span> : null;
}
