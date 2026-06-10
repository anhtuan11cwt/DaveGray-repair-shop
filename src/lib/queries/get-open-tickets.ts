import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers, tickets } from "@/lib/db/schema";

export async function getOpenTickets() {
  const results = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      fullName: customers.fullName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false));

  return results;
}
