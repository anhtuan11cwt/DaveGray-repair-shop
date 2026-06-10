import * as Sentry from "@sentry/nextjs";
import type { Metadata } from "next";
import TicketForm from "@/app/(rs)/tickets/form/ticket-form";
import BackButton from "@/components/back-button";
import { getCurrentUser, getUserPermissions } from "@/lib/auth";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { getUsers } from "@/lib/queries/getUsers";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return { title: "Thiếu thông tin phiếu" };
  }

  if (ticketId) {
    return { title: `Phiếu sửa chữa #${ticketId}` };
  }

  return { title: `Phiếu mới cho khách hàng #${customerId}` };
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;

  const user = await getCurrentUser();
  const permissions = user ? await getUserPermissions(user.id) : [];
  const isManager =
    permissions.includes("manager") || permissions.includes("admin");

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

    if (isManager) {
      const allUsers = await getUsers();
      const techs = allUsers.map((u) => ({
        id: u.email,
        description: u.email,
      }));
      techs.unshift({
        id: "new-ticket@example.com",
        description: "new-ticket@example.com",
      });

      return (
        <TicketForm
          customer={customer}
          isEditable={true}
          techs={techs}
          userEmail={user?.email ?? ""}
        />
      );
    }

    return (
      <TicketForm
        customer={customer}
        isEditable={true}
        userEmail={user?.email ?? ""}
      />
    );
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

    if (isManager) {
      const allUsers = await getUsers();
      const techs = allUsers.map((u) => ({
        id: u.email,
        description: u.email,
      }));
      techs.unshift({
        id: "new-ticket@example.com",
        description: "new-ticket@example.com",
      });

      return (
        <TicketForm
          customer={customer}
          ticket={ticket}
          isEditable={true}
          techs={techs}
          userEmail={user?.email ?? ""}
        />
      );
    }

    const isEditable =
      user?.email?.toLowerCase() === ticket.tech?.toLowerCase();

    return (
      <TicketForm
        customer={customer}
        ticket={ticket}
        isEditable={isEditable}
        userEmail={user?.email ?? ""}
      />
    );
  }
}
