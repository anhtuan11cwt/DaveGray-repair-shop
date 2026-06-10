import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getUsers() {
  return db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users);
}
