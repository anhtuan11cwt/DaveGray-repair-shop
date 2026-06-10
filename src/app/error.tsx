"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Error boundary cho các trang con
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Gửi lỗi đến Sentry khi component mount
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
      <h2 className="font-bold text-2xl">Đã xảy ra lỗi!</h2>
      <p className="text-muted-foreground">
        Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-md text-primary-foreground"
      >
        Thử lại
      </button>
    </div>
  );
}
