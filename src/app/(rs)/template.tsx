"use client";

import type { ReactNode } from "react";

// Template với animation fade-in khi chuyển trang
export default function RSTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-appear">{children}</div>;
}
