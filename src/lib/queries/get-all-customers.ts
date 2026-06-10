import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";

// Lấy tất cả khách hàng, sắp xếp theo ngày tạo tăng dần
export async function getAllCustomers() {
  const results = await db
    .select()
    .from(customers)
    .orderBy(asc(customers.createdAt));

  return results;
}
