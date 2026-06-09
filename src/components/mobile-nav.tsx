"use client";

import { File, Home, Menu, UsersRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Danh sách navigation links cho mobile menu
const navLinks = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: File, label: "Tickets", href: "/tickets" },
  { icon: UsersRound, label: "Customers", href: "/customers" },
];

// Mobile navigation component - hamburger menu cho thiết bị di động
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nút hamburger - chỉ hiển thị trên mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden rounded-full"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Dropdown menu trên mobile */}
      {open && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-background border-b shadow-md z-10 page-padding py-4 flex flex-col gap-1">
          <div className="pt-2 border-t mt-1 flex flex-col gap-1">
            {navLinks.map(({ icon: Icon, label, href }) => (
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
