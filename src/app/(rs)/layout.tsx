import type { ReactNode } from "react";
import Header from "@/components/header";

// Layout cho route group (rs) - bao gồm Header và nội dung trang
export default function RSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      <div className="animate-slide page-padding py-2">{children}</div>
    </div>
  );
}
