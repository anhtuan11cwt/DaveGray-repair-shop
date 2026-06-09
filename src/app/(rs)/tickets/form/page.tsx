import * as Sentry from "@sentry/nextjs";
import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">
          Thiếu mã khách hàng hoặc mã phiếu sửa chữa
        </h2>
        <BackButton title="Quay lại" />
      </div>
    );
  }

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

    if (!customer.active) {
      return (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">
            Khách hàng có ID {customerId} không hoạt động
          </h2>
          <BackButton title="Quay lại" />
        </div>
      );
    }

    console.log("customer", customer);
    return <h2 className="text-2xl font-bold">Tạo phiếu sửa chữa mới</h2>;
  }

  if (ticketId) {
    let ticket: Awaited<ReturnType<typeof getTicket>>;

    try {
      ticket = await getTicket(Number.parseInt(ticketId, 10));
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }

    if (!ticket) {
      return (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">
            Không tìm thấy phiếu sửa chữa có ID {ticketId}
          </h2>
          <BackButton title="Quay lại" />
        </div>
      );
    }

    let customer: Awaited<ReturnType<typeof getCustomer>>;

    try {
      customer = await getCustomer(ticket.customerId);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }

    console.log("ticket", ticket);
    console.log("customer", customer);
    return <h2 className="text-2xl font-bold">Chỉnh sửa phiếu sửa chữa</h2>;
  }
}
