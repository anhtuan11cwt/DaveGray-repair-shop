"use client";

import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
}

// Nút quay lại trang trước
export default function BackButton({
  title,
  className,
  variant = "default",
  ...props
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
      {...props}
    >
      {title}
    </Button>
  );
}
