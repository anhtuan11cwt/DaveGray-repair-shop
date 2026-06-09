import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";

export async function getCustomer(id: number) {
  const result = await db.select().from(customers).where(eq(customers.id, id));
  return result[0];
}
