import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers, tickets } from "@/lib/db/schema";

export async function getOpenTickets() {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      completed: tickets.completed,
      fullName: customers.fullName,
      email: customers.email,
      phone: customers.phone,
      city: customers.city,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))
    .orderBy(asc(tickets.createdAt));

  return results;
}
