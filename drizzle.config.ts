import { resolve } from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load .env.local
dotenv.config({ path: resolve(__dirname, ".env.local") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
