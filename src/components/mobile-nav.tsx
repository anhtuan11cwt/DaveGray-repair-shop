"use client";

import { File, Home, LogIn, Menu, UserPlus, UsersRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const authLinks = [
  { icon: LogIn, label: "Đăng nhập", href: "/login" },
  { icon: UserPlus, label: "Đăng ký", href: "/register" },
];

const navLinks = [
  { icon: Home, label: "Trang chủ", href: "/home" },
  { icon: File, label: "Phiếu sửa chữa", href: "/tickets" },
  { icon: UsersRound, label: "Khách hàng", href: "/customers" },
];

type MobileNavProps = {
  isAuthPage?: boolean;
};

export default function MobileNav({ isAuthPage }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const links = isAuthPage ? authLinks : navLinks;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden rounded-full"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {open && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-background border-b shadow-md z-10 page-padding py-4 flex flex-col gap-1">
          <div className="pt-2 border-t mt-1 flex flex-col gap-1">
            {links.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
