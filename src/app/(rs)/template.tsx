"use client";

import type { ReactNode } from "react";

// Template cho route group (rs) - thêm animation fade-in khi chuyển trang
export default function RSTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-appear">{children}</div>;
}
