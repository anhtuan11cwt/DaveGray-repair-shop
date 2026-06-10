import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Kết nối Neon Postgres using Neon HTTP driver
if (process.env.NODE_ENV === "development") {
  const dotenv = await import("dotenv");
  dotenv.config({ path: ".env" });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}
const sql = neon(databaseUrl);

// Tạo Drizzle instance với schema
export const db = drizzle(sql, { schema });
