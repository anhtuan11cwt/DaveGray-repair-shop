import { ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { sqlUnaccent } from "@/lib/vietnamese";

export async function getCustomerSearchResults(searchText: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.fullName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`LOWER(${customers.fullName}) LIKE ${`%${searchText.toLowerCase().replace(/\s+/g, "%")}%`}`,
        sql`${sqlUnaccent(customers.fullName)} ILIKE ${`%${searchText}%`}`,
        sql`${sqlUnaccent(customers.city)} ILIKE ${`%${searchText}%`}`,
      ),
    );

  return results;
}
