import * as Sentry from "@sentry/nextjs";
import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomer";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

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

    console.log("customer", customer);
    return (
      <h2 className="text-2xl font-bold">Chỉnh sửa thông tin khách hàng</h2>
    );
  }

  return <h2 className="text-2xl font-bold">Thêm khách hàng mới</h2>;
}
