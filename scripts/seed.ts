import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema";

// Load .env.local
dotenv.config({ path: resolve(__dirname, "../.env.local") });

// Kết nối database
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL chưa được thiết lập trong biến môi trường");
}
const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Bắt đầu seed data...");

  // Tạo permissions
  console.log("Tạo permissions...");
  const permissionsData = [
    { key: "admin", name: "Quản trị viên" },
    { key: "manager", name: "Quản lý" },
    { key: "user", name: "Người dùng" },
  ];

  for (const perm of permissionsData) {
    const existing = await db.query.permissions.findFirst({
      where: eq(schema.permissions.key, perm.key),
    });

    if (!existing) {
      await db.insert(schema.permissions).values(perm);
      console.log(`  Đã tạo permission: ${perm.key}`);
    } else {
      console.log(`  Permission ${perm.key} đã tồn tại`);
    }
  }

  // Tạo admin user mặc định
  console.log("\nTạo admin user mặc định...");
  const adminEmail = "admin@repairshop.com";
  const adminPassword = "admin123";

  const existingAdmin = await db.query.users.findFirst({
    where: eq(schema.users.email, adminEmail),
  });

  if (!existingAdmin) {
    // Hash password
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    // Tạo user
    const [newUser] = await db
      .insert(schema.users)
      .values({
        name: "Admin",
        email: adminEmail,
        passwordHash,
      })
      .returning({ id: schema.users.id });

    // Gán quyền admin
    const adminPermission = await db.query.permissions.findFirst({
      where: eq(schema.permissions.key, "admin"),
    });

    if (adminPermission) {
      await db.insert(schema.userPermissions).values({
        userId: newUser.id,
        permissionId: adminPermission.id,
      });
    }

    console.log(`  Đã tạo admin user: ${adminEmail}`);
    console.log(`  Mật khẩu: ${adminPassword}`);
  } else {
    console.log(`  Admin user ${adminEmail} đã tồn tại`);
  }

  console.log("\nSeed data hoàn thành!");
  console.log("\nLưu ý:");
  console.log("  - Đăng nhập bằng: admin@repairshop.com / admin123");
  console.log("  - Nên đổi mật khẩu sau lần đăng nhập đầu tiên");
}

// Chạy seed
seed().catch((error) => {
  console.error("Lỗi seed data:", error);
  process.exit(1);
});
