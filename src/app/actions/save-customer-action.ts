"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { flattenValidationErrors } from "next-safe-action";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  type InsertCustomerSchemaType,
  insertCustomerSchema,
} from "@/zod-schemas/customer";

type ReturnType = {
  message: string;
};

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" })
  .schema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: InsertCustomerSchemaType;
    }): Promise<ReturnType> => {
      const user = await getCurrentUser();
      if (!user) {
        redirect("/login");
      }

      if (customer.id === 0) {
        const result = await db
          .insert(customers)
          .values({
            fullName: customer.fullName,
            address1: customer.address1,
            address2: customer.address2?.trim() ?? null,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            phone: customer.phone,
            email: customer.email,
            notes: customer.notes?.trim() ?? null,
            active: customer.active ?? true,
          })
          .returning({ insertedId: customers.id });

        return {
          message: `Khách hàng #${result[0].insertedId} đã được tạo thành công`,
        };
      }

      const result = await db
        .update(customers)
        .set({
          fullName: customer.fullName,
          address1: customer.address1,
          address2: customer.address2?.trim() ?? null,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          phone: customer.phone,
          email: customer.email,
          notes: customer.notes?.trim() ?? null,
          active: customer.active ?? true,
        })
        .where(eq(customers.id, customer.id as number))
        .returning({ updatedId: customers.id });

      return {
        message: `Khách hàng #${result[0].updatedId} đã được cập nhật thành công`,
      };
    },
  );
