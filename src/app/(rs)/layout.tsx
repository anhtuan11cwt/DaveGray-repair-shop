import type { ReactNode } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import Header from "@/components/header";

// Layout cho route group (rs) - bao gồm Header, Breadcrumbs và nội dung trang
export default function RSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      <div className="animate-slide page-padding py-2">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
