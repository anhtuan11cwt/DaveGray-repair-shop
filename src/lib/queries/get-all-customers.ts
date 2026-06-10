import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";

export async function getAllCustomers() {
  const results = await db
    .select()
    .from(customers)
    .orderBy(asc(customers.createdAt));

  return results;
}
