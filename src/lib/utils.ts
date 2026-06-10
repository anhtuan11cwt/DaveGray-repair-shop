import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Hợp nhất class Tailwind, tự động giải quyết xung đột
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
