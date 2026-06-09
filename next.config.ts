import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

// Cấu hình Next.js cơ bản
const nextConfig: NextConfig = {};

// Export Next.js config với Sentry integration
export default withSentryConfig(nextConfig, {
  org: "davegray-repair-shop",
  project: "davegray-repair-shop",
  silent: true,
});
