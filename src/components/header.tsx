"use client";

import { File, Home, LogIn, UserPlus, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import MobileNav from "@/components/mobile-nav";
import ModeToggle from "@/components/mode-toggle";
import NavButton from "@/components/nav-button";
import NavButtonMenu from "@/components/nav-button-menu";
import { Button } from "@/components/ui/button";

// Header chính - logo, navigation, theme toggle, logout
export default function Header() {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <header className="top-0 z-20 sticky bg-background border-b animate-slide">
      <div className="relative flex justify-between items-center py-4 page-padding">
        {/* Logo + tên cửa hàng */}
        <div className="flex items-center gap-2">
          <NavButton icon={Home} label="Trang chủ" href="/tickets" />
          <h1 className="hidden md:block font-bold text-lg">
            Cửa Hàng Sửa Chữa Máy Tính
          </h1>
        </div>

        {/* Navigation buttons + theme toggle + logout + hamburger */}
        <div className="flex items-center gap-1">
          {isAuthPage ? (
            // Auth pages: login/register buttons
            <div className="hidden sm:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-1 size-4" />
                  Đăng nhập
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/register">
                  <UserPlus className="mr-1 size-4" />
                  Đăng ký
                </Link>
              </Button>
            </div>
          ) : (
            // App pages: tickets + customers nav
            <div className="hidden sm:flex items-center gap-1">
              <NavButton icon={File} label="Phiếu sửa chữa" href="/tickets" />
              <NavButtonMenu
                icon={UsersRound}
                label="Menu khách hàng"
                choices={[
                  { title: "Tìm kiếm khách hàng", href: "/customers" },
                  { title: "Thêm khách hàng", href: "/customers/form" },
                ]}
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
