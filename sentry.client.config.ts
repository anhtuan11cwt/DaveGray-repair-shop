// Cấu hình Sentry cho client-side
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Khởi tạo Sentry trên client với các tùy chọn sampling
Sentry.init({
  dsn: "https://examplePublicKey@o.ingest.sentry.io/0",
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [],
  ignoreErrors: [/^NEXT_REDIRECT$/],
});
