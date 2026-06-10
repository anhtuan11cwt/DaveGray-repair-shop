import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { tickets } from "@/lib/db/schema";

// Lấy thông tin ticket theo ID
export async function getTicket(id: number) {
  const result = await db.select().from(tickets).where(eq(tickets.id, id));
  return result[0];
}
