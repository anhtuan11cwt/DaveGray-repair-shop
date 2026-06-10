import type { ReactNode } from "react";
import Header from "@/components/header";

// Layout cho các trang auth (login/register)
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-dvh overflow-hidden">
      <Header />

      {/* Hiệu ứng nền mờ phía sau form auth */}
      <div className="-z-10 absolute inset-0 overflow-hidden">
        <div className="-top-40 -left-40 absolute bg-primary/10 rounded-full dark:bg-primary/5 w-[500px] h-[500px] blur-3xl" />
        <div className="-bottom-40 -right-40 absolute bg-primary/10 rounded-full dark:bg-primary/5 w-[500px] h-[500px] blur-3xl" />
      </div>

      {/* Form auth căn giữa màn hình */}
      <div className="flex flex-1 justify-center items-center p-4 md:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}
