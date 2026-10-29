import { createContext, useContext } from "react";

export type ShowToast = (message: string) => void;

export const ToastContext = createContext<ShowToast>(() => {});

/** แสดงข้อความสั้น ๆ มุมล่าง (อ่านออกเสียงผ่าน role="status") */
export const useToast = () => useContext(ToastContext);
