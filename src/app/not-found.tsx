import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Không Tìm Thấy Trang",
};

// Trang 404 - hiển thị khi route không tồn tại
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mx-auto min-h-dvh p-6 text-center">
      <h1 className="font-extrabold text-9xl tracking-tight text-primary/10">
        404
      </h1>
      <div className="space-y-2">
        <h2 className="font-bold text-3xl">Trang không tồn tại</h2>
        <p className="text-muted-foreground">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/tickets">Quay về trang chủ</Link>
      </Button>
    </div>
  );
}
