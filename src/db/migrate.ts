import { resolve } from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, "../../.env") });

import { migrate } from "drizzle-orm/neon-http/migrator";

async function main() {
  const { db } = await import("../lib/db");

  try {
    await migrate(db, {
      migrationsFolder: resolve(__dirname, "../../drizzle"),
    });
    console.log("Migration hoàn tất");
  } catch (error) {
    console.error("Migration thất bại:", error);
    process.exit(1);
  }
}

main();
