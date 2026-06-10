import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { tickets } from "@/lib/db/schema";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("new")]),
  title: (schema) => schema.min(1, "Tiêu đề là bắt buộc"),
  description: (schema) => schema.min(1, "Mô tả là bắt buộc"),
  tech: (schema) => schema.email("Địa chỉ email không hợp lệ"),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type InsertTicketSchemaType = z.input<typeof insertTicketSchema>;
export type SelectTicketSchemaType = z.output<typeof selectTicketSchema>;
