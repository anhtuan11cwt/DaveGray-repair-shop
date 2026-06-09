"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

// Nút đăng xuất - sử dụng server action
export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      toast.success("Đăng xuất thành công");
      router.push("/login");
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      title="Đăng xuất"
      aria-label="Đăng xuất"
      disabled={isPending}
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5" />
    </Button>
  );
}
