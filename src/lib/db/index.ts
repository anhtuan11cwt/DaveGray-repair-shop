import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Load biến môi trường khi dev
if (process.env.NODE_ENV === "development") {
  const dotenv = await import("dotenv");
  dotenv.config({ path: ".env" });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}
const sql = neon(databaseUrl);

// Khởi tạo Drizzle ORM với schema
export const db = drizzle(sql, { schema });
