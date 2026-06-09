import * as Sentry from "@sentry/nextjs";

// Đăng ký Sentry config theo từng runtime environment
export async function register() {
  // Runtime Node.js - dùng cho server-side rendering
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  // Runtime Edge - dùng cho middleware và edge functions
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Bắt bắt lỗi request và gửi đến Sentry
export const onRequestError = Sentry.captureRequestError;
