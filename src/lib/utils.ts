import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Hợp nhất các class name Tailwind CSS, giải quyết conflict giữa các class
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
