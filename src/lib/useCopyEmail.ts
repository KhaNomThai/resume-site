import { useCallback } from "react";
import { profile } from "../data";
import { copyText } from "./clipboard";
import { useToast } from "./toast";

/** คัดลอกอีเมลแล้วแจ้งผลด้วย toast — ถ้าคัดลอกไม่ได้ก็ยังโชว์อีเมลให้เห็น */
export function useCopyEmail() {
  const toast = useToast();
  return useCallback(async () => {
    const ok = await copyText(profile.email);
    toast(ok ? "Email copied to clipboard" : `Couldn't copy — email: ${profile.email}`);
  }, [toast]);
}
