"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { saveTicketAction } from "@/app/actions/save-ticket-action";
import DisplayServerActionResponse from "@/components/display-server-action-response";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextareaWithLabel } from "@/components/inputs/TextareaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { SelectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  type InsertTicketSchemaType,
  insertTicketSchema,
  type SelectTicketSchemaType,
} from "@/zod-schemas/ticket";

type Props = {
  customer: SelectCustomerSchemaType;
  ticket?: SelectTicketSchemaType;
  isEditable: boolean;
  techs?: { id: string; description: string }[];
  userEmail: string;
};

export default function TicketForm({
  customer,
  ticket,
  isEditable,
  techs,
}: Props) {
  const isManager = Array.isArray(techs);

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

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess: ({ data }) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: () => {
      toast.error("Lưu thất bại");
    },
  });

  async function submitForm(data: InsertTicketSchemaType) {
    executeSave(data);
  }

  const ticketLabel = ticket?.id
    ? isEditable
      ? `Chỉnh sửa phiếu #${ticket.id}`
      : `Xem phiếu #${ticket.id}`
    : "Tạo phiếu sửa chữa mới";

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-2xl">{ticketLabel}</h2>
      <DisplayServerActionResponse result={saveResult} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 w-full">
            <InputWithLabel<InsertTicketSchemaType>
              fieldTitle="Tiêu đề"
              nameInSchema="title"
              disabled={!isEditable}
            />
            {isManager ? (
              <SelectWithLabel<InsertTicketSchemaType>
                fieldTitle="Email kỹ thuật viên"
                nameInSchema="tech"
                data={techs}
              />
            ) : (
              <InputWithLabel<InsertTicketSchemaType>
                fieldTitle="Email kỹ thuật viên"
                nameInSchema="tech"
                disabled
              />
            )}
            {ticket?.id ? (
              <CheckboxWithLabel<InsertTicketSchemaType>
                fieldTitle="Hoàn thành"
                nameInSchema="completed"
                message="Có"
                disabled={!isEditable}
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-4 w-full">
            <TextareaWithLabel<InsertTicketSchemaType>
              fieldTitle="Mô tả"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="default"
                  className="w-3/4"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Đang lưu...
                    </>
                  ) : ticket?.id ? (
                    "Cập nhật phiếu"
                  ) : (
                    "Tạo phiếu"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Đặt lại
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
      <div className="mt-4 space-y-2">
        <h3 className="font-bold">Thông tin khách hàng</h3>
        <hr className="w-4/5" />
        <p>{customer.fullName}</p>
        <p>
          {customer.address1}
          {customer.address2 ? `, ${customer.address2}` : ""}
        </p>
        <p>
          {customer.city}, {customer.state} {customer.zip}
        </p>
        <hr className="w-4/5" />
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
      </div>
    </div>
  );
}
