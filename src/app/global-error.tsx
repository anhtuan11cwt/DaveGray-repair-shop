"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

// Global error boundary cấp root layout
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  // Gửi lỗi đến Sentry
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <NextError statusCode={500} />
      </body>
    </html>
  );
}
