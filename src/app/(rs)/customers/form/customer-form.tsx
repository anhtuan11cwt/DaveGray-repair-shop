"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { saveCustomerAction } from "@/app/actions/save-customer-action";
import DisplayServerActionResponse from "@/components/display-server-action-response";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextareaWithLabel } from "@/components/inputs/TextareaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { statesArray } from "@/constants/statesArray";
import {
  type InsertCustomerSchemaType,
  insertCustomerSchema,
  type SelectCustomerSchemaType,
} from "@/zod-schemas/customer";

type Props = {
  customer?: SelectCustomerSchemaType;
  isManager: boolean;
};

// Form thêm/sửa khách hàng
export default function CustomerForm({ customer, isManager }: Props) {
  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id ?? 0,
    fullName: customer?.fullName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
    active: customer?.active ?? true,
  };

  const form = useForm({
    mode: "onBlur" as const,
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess: ({ data }) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: () => {
      toast.error("Lưu thất bại");
    },
  });

  async function submitForm(data: InsertCustomerSchemaType) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold text-2xl">
        {customer?.id
          ? `Chỉnh sửa khách hàng #${customer.id}`
          : "Thêm khách hàng mới"}
      </h2>
      <DisplayServerActionResponse result={saveResult} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 w-full">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Họ và tên"
              nameInSchema="fullName"
            />
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Địa chỉ"
              nameInSchema="address1"
            />
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Địa chỉ dòng 2"
              nameInSchema="address2"
            />
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Thành phố"
              nameInSchema="city"
            />
            <SelectWithLabel<InsertCustomerSchemaType>
              fieldTitle="Tỉnh/Thành phố"
              nameInSchema="state"
              data={statesArray}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Mã bưu chính"
              nameInSchema="zip"
              placeholder="12345 hoặc 12345-6789"
            />
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Số điện thoại"
              nameInSchema="phone"
              placeholder="0123456789"
            />
            <TextareaWithLabel<InsertCustomerSchemaType>
              fieldTitle="Ghi chú"
              nameInSchema="notes"
              className="h-40"
            />
            {isManager && customer?.id ? (
              <CheckboxWithLabel<InsertCustomerSchemaType>
                fieldTitle="Hoạt động"
                nameInSchema="active"
                message="Có"
              />
            ) : null}
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
                ) : customer?.id ? (
                  "Cập nhật khách hàng"
                ) : (
                  "Tạo khách hàng"
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
          </div>
        </form>
      </Form>
    </div>
  );
}
