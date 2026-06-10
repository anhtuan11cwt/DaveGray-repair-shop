import { eq, ilike, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers, tickets } from "@/lib/db/schema";

export async function getTicketSearchResults(searchText: string) {
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
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.description, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.fullName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
      ),
    );

  return results;
}
