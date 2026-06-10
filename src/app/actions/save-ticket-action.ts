"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { flattenValidationErrors } from "next-safe-action";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { tickets } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  type InsertTicketSchemaType,
  insertTicketSchema,
} from "@/zod-schemas/ticket";

type ReturnType = {
  message: string;
};

// Server action - thêm mới hoặc cập nhật ticket sửa chữa
export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: InsertTicketSchemaType;
    }): Promise<ReturnType> => {
      const user = await getCurrentUser();
      if (!user) {
        redirect("/login");
      }

      // id === "new" => thêm mới, ngược lại => cập nhật
      if (ticket.id === "new") {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech ?? "unassigned",
          })
          .returning({ insertedId: tickets.id });

        return {
          message: `Phiếu #${result[0].insertedId} đã được tạo thành công`,
        };
      }

      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          completed: ticket.completed ?? false,
          tech: ticket.tech ?? "unassigned",
        })
        .where(eq(tickets.id, ticket.id as number))
        .returning({ updatedId: tickets.id });

      return {
        message: `Phiếu #${result[0].updatedId} đã được cập nhật thành công`,
      };
    },
  );
