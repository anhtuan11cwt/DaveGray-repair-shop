import { File, Home, UsersRound } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import ModeToggle from "@/components/mode-toggle";
import NavButton from "@/components/nav-button";

// Header chính của ứng dụng - chứa navigation và theme toggle
export default function Header() {
  return (
    <header className="top-0 z-20 sticky bg-background border-b animate-slide">
      <div className="relative flex justify-between items-center page-padding py-4">
        {/* Logo / Home */}
        <div className="flex items-center gap-2">
          <NavButton icon={Home} label="Home" href="/home" />
          <h1 className="hidden md:block font-bold text-lg">
            Cửa Hàng Sửa Chữa Máy Tính
          </h1>
        </div>

        {/* Bên phải: nav buttons + ModeToggle + hamburger menu */}
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex items-center gap-1">
            <NavButton icon={File} label="Tickets" href="/tickets" />
            <NavButton icon={UsersRound} label="Customers" href="/customers" />
          </div>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
