"use client";

import { File, Home, LogIn, UserPlus, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import MobileNav from "@/components/mobile-nav";
import ModeToggle from "@/components/mode-toggle";
import NavButton from "@/components/nav-button";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <header className="top-0 z-20 sticky bg-background border-b animate-slide">
      <div className="relative flex justify-between items-center page-padding py-4">
        {/* Logo / Home */}
        <div className="flex items-center gap-2">
          <NavButton icon={Home} label="Trang chủ" href="/home" />
          <h1 className="hidden md:block font-bold text-lg">
            Cửa Hàng Sửa Chữa Máy Tính
          </h1>
        </div>

        {/* Bên phải: nav buttons + ModeToggle + Logout + hamburger menu */}
        <div className="flex items-center gap-1">
          {isAuthPage ? (
            <div className="hidden sm:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="size-4 mr-1" />
                  Đăng nhập
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/register">
                  <UserPlus className="size-4 mr-1" />
                  Đăng ký
                </Link>
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1">
              <NavButton icon={File} label="Phiếu sửa chữa" href="/tickets" />
              <NavButton
                icon={UsersRound}
                label="Khách hàng"
                href="/customers"
              />
            </div>
          )}
          <ModeToggle />
          {!isAuthPage && <LogoutButton />}
          <MobileNav isAuthPage={isAuthPage} />
        </div>
      </div>
    </header>
  );
}
