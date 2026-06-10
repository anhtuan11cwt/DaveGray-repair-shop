import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { customers } from "@/lib/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  fullName: (schema) => schema.min(1, "Họ và tên là bắt buộc"),
  address1: (schema) => schema.min(1, "Địa chỉ là bắt buộc"),
  city: (schema) => schema.min(1, "Thành phố là bắt buộc"),
  state: (schema) => schema.length(2, "Tỉnh/Thành phố phải có đúng hai ký tự"),
  email: (schema) => schema.email("Địa chỉ email không hợp lệ"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Mã bưu chính không hợp lệ. Sử dụng năm chữ số hoặc năm chữ số theo sau là dấu gạch ngang và bốn chữ số",
    ),
  phone: (schema) =>
    schema.regex(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomerSchemaType = z.input<typeof insertCustomerSchema>;
export type SelectCustomerSchemaType = z.output<typeof selectCustomerSchema>;
