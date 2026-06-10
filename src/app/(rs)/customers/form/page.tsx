import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";
import CustomerForm from "@/app/(rs)/customers/form/customer-form";
import BackButton from "@/components/back-button";
import { getCurrentUser, getUserPermissions } from "@/lib/auth";
import { getCustomer } from "@/lib/queries/getCustomer";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const { customerId } = await searchParams;

  return {
    title: customerId
      ? `Chỉnh sửa khách hàng #${customerId}`
      : "Thêm khách hàng mới",
  };
}

// Trang form thêm/sửa khách hàng
export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  // Kiểm tra quyền manager/admin
  const user = await getCurrentUser();
  const permissions = user ? await getUserPermissions(user.id) : [];
  const isManager =
    permissions.includes("manager") || permissions.includes("admin");

  if (customerId) {
    let customer: Awaited<ReturnType<typeof getCustomer>>;

    try {
      customer = await getCustomer(Number.parseInt(customerId, 10));
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }

    if (!customer) {
      return (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">
            Không tìm thấy khách hàng có ID {customerId}
          </h2>
          <BackButton title="Quay lại" />
        </div>
      );
    }

    return <CustomerForm customer={customer} isManager={isManager} />;
  }

  return <CustomerForm isManager={isManager} />;
}
