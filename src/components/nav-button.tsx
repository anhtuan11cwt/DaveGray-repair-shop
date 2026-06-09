import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Props cho NavButton component
type NavButtonProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

// Navigation button - hiển thị icon với label ẩn (cho accessibility)
export default function NavButton({ icon: Icon, label, href }: NavButtonProps) {
  return (
    <Button variant="ghost" size="icon" className="rounded-full" asChild>
      {href ? (
        <Link href={href}>
          <Icon />
          <span className="sr-only">{label}</span>
        </Link>
      ) : (
        <span>
          <Icon />
          <span className="sr-only">{label}</span>
        </span>
      )}
    </Button>
  );
}
