import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers, tickets } from "@/lib/db/schema";
import { sqlUnaccent } from "@/lib/vietnamese";

// Tìm kiếm ticket theo tiêu đề và thông tin khách hàng, hỗ trợ tìm không dấu
export async function getTicketSearchResults(searchText: string) {
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
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(customers.fullName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        sql`LOWER(${customers.fullName}) LIKE ${`%${searchText.toLowerCase().replace(/\s+/g, "%")}%`}`,
        sql`${sqlUnaccent(tickets.title)} ILIKE ${`%${searchText}%`}`,
        sql`${sqlUnaccent(customers.fullName)} ILIKE ${`%${searchText}%`}`,
        sql`${sqlUnaccent(customers.city)} ILIKE ${`%${searchText}%`}`,
      ),
    )
    .orderBy(asc(tickets.createdAt));

  return results;
}

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;
