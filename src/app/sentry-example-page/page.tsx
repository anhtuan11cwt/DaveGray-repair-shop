"use client";

import { Button } from "@/components/ui/button";

// Trang kiểm tra Sentry - dùng để test error tracking
export default function SentryExamplePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-dvh p-6 text-center">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Trang Kiểm Tra Sentry</h1>
        <p className="text-muted-foreground">
          Nhấp vào nút bên dưới để kích hoạt lỗi thử nghiệm.
        </p>
      </div>

      {/* Nút kích hoạt lỗi test - sẽ gửi exception đến Sentry */}
      <Button
        variant="destructive"
        size="lg"
        onClick={() => {
          throw new Error("Lỗi thử nghiệm Sentry frontend");
        }}
      >
        Kích Hoạt Lỗi
      </Button>
    </div>
  );
}
