// Cấu hình Sentry cho edge runtime
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Khởi tạo Sentry trên edge runtime
Sentry.init({
  dsn: "https://examplePublicKey@o.ingest.sentry.io/0",
  tracesSampleRate: 1,
  debug: false,
});
