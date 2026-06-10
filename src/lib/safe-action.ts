import * as Sentry from "@sentry/nextjs";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

// Client cho server actions, tự động bắt lỗi và gửi về Sentry
export const actionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError: (error, utils) => {
    const { clientInput, metadata } = utils;

    Sentry.captureException(error, (scope) => {
      scope.clear();
      scope.setContext("server error", {
        message: error.message,
      });
      scope.setContext("metadata", {
        actionName: metadata?.actionName,
      });
      scope.setContext("client input", {
        clientInput,
      });
      return scope;
    });

    if (error.constructor.name === "NeonDbError") {
      return "Lỗi cơ sở dữ liệu. Dữ liệu của bạn chưa được lưu. Bộ phận hỗ trợ đã được thông báo.";
    }

    return error.message;
  },
});
