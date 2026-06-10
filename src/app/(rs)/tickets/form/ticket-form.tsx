"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SelectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  type InsertTicketSchemaType,
  insertTicketSchema,
  type SelectTicketSchemaType,
} from "@/zod-schemas/ticket";

type Props = {
  customer: SelectCustomerSchemaType;
  ticket?: SelectTicketSchemaType;
};

export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: InsertTicketSchemaType = {
    id: ticket?.id ?? "new",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm({
    mode: "onBlur" as const,
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  async function submitForm(data: InsertTicketSchemaType) {
    console.log(data);
  }

  const ticketLabel = ticket?.id
    ? `Chỉnh sửa phiếu #${ticket.id}`
    : "Tạo phiếu sửa chữa mới";

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-2xl">{ticketLabel}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tech"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email kỹ thuật viên</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">
            {ticket?.id ? "Cập nhật phiếu" : "Tạo phiếu"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
