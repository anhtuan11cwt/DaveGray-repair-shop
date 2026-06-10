import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema";

// Load .env
dotenv.config({ path: resolve(__dirname, "../.env") });

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

  // Tạo customers
  console.log("\nTạo customers...");
  const customersData = [
    {
      fullName: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0901123456",
      address1: "123 Nguyễn Huệ",
      address2: null,
      city: "Hồ Chí Minh",
      state: "SG",
      zip: "70000",
      notes: "Khách hàng thân thiết, thích liên lạc qua email",
      active: true,
    },
    {
      fullName: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phone: "0902234567",
      address1: "456 Lê Lợi",
      address2: "P. 7",
      city: "Hà Nội",
      state: "HN",
      zip: "10000",
      notes: "Khách hàng thường xuyên - hạng vàng",
      active: true,
    },
    {
      fullName: "Lê Hoàng Cường",
      email: "lehoangcuong@email.com",
      phone: "0903345678",
      address1: "789 Trần Hưng Đạo",
      address2: null,
      city: "Đà Nẵng",
      state: "DN",
      zip: "50000",
      notes: "Quản lý văn phòng cho công ty địa phương",
      active: true,
    },
    {
      fullName: "Phạm Thị Dung",
      email: "phamthidung@email.com",
      phone: "0904456789",
      address1: "321 Võ Văn Tần",
      address2: "Tòa nhà An Bình",
      city: "Cần Thơ",
      state: "CT",
      zip: "90000",
      notes: "Khách hàng mới - được giới thiệu bởi chị Bình",
      active: true,
    },
    {
      fullName: "Hoàng Văn Em",
      email: "hoangvanem@email.com",
      phone: "0905567890",
      address1: "654 Nguyễn Trãi",
      address2: null,
      city: "Hải Phòng",
      state: "HP",
      zip: "18000",
      notes: "Khách hàng VIP - không xếp lịch cuối tuần",
      active: true,
    },
  ];

  const customerIds: number[] = [];
  for (const c of customersData) {
    const existing = await db.query.customers.findFirst({
      where: eq(schema.customers.email, c.email),
    });
    if (!existing) {
      const [inserted] = await db
        .insert(schema.customers)
        .values(c)
        .returning({ id: schema.customers.id });
      customerIds.push(inserted.id);
      console.log(`  Đã tạo customer: ${c.fullName}`);
    } else {
      customerIds.push(existing.id);
      console.log(`  Customer ${c.fullName} đã tồn tại`);
    }
  }

  // Tạo tickets
  console.log("\nTạo tickets...");
  const ticketsData = [
    {
      customerId: customerIds[0],
      title: "Thay màn hình - iPhone 14",
      description:
        "Khách làm rơi điện thoại, màn hình bị nứt. Cần thay màn hình mới.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[0],
      title: "Thay pin - MacBook Pro",
      description: "Pin bị phồng, cần thay gấp để đảm bảo an toàn.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[0],
      title: "Phục hồi dữ liệu - ổ cứng gắn ngoài",
      description: "Ổ cứng không quay, cần phục hồi ảnh gia đình.",
      completed: true,
      tech: "unassigned",
    },
    {
      customerId: customerIds[1],
      title: "Diệt virus - laptop Windows",
      description: "Laptop bị nhiễm mã độc, chạy rất chậm.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[1],
      title: "Thay bàn phím - Dell XPS",
      description: "Một số phím không hoạt động, bị đổ nước.",
      completed: true,
      tech: "unassigned",
    },
    {
      customerId: customerIds[2],
      title: "Cài đặt mạng - văn phòng",
      description: "Cần cấu hình router mới và wifi an toàn cho 15 nhân viên.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[2],
      title: "Máy in không kết nối được",
      description: "Máy in văn phòng báo trạng thái ngoại tuyến, lỗi mạng.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[2],
      title: "Bảo trì máy chủ",
      description: "Kiểm tra và vệ sinh máy chủ định kỳ hàng quý.",
      completed: true,
      tech: "unassigned",
    },
    {
      customerId: customerIds[3],
      title: "Build PC mới",
      description: "Khách tự build PC gaming - đã có sẵn linh kiện.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[3],
      title: "Hiệu chỉnh màn hình",
      description: "Màn hình chỉnh sửa ảnh chuyên nghiệp cần hiệu chỉnh màu.",
      completed: true,
      tech: "unassigned",
    },
    {
      customerId: customerIds[4],
      title: "Vào nước - iPhone 15",
      description: "Điện thoại rơi xuống hồ bơi, không lên nguồn.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[4],
      title: "iMac chạy chậm",
      description: "iMac chạy rất chậm sau khi cập nhật macOS mới nhất.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[4],
      title: "Nâng cấp ổ cứng - PlayStation 5",
      description: "Nâng cấp SSD nội bộ lên 2TB.",
      completed: true,
      tech: "unassigned",
    },
    {
      customerId: customerIds[4],
      title: "Lắp đặt nhà thông minh",
      description: "Cấu hình đèn thông minh, máy điều hòa và camera an ninh.",
      completed: false,
      tech: "unassigned",
    },
    {
      customerId: customerIds[4],
      title: "Thiết lập sao lưu dữ liệu",
      description: "Cài đặt sao lưu đám mây tự động cho tất cả thiết bị.",
      completed: false,
      tech: "unassigned",
    },
  ];

  for (const t of ticketsData) {
    const existing = await db.query.tickets.findFirst({
      where: eq(schema.tickets.title, t.title),
    });
    if (!existing) {
      await db.insert(schema.tickets).values(t);
      console.log(`  Đã tạo ticket: ${t.title}`);
    } else {
      console.log(`  Ticket "${t.title}" đã tồn tại`);
    }
  }

  console.log("\nSeed data hoàn thành!");
  console.log("\nLưu ý:");
  console.log("  - Đăng nhập bằng: admin@repairshop.com / admin123");
  console.log("  - Nên đổi mật khẩu sau lần đăng nhập đầu tiên");
}

seed().catch((error) => {
  console.error("Lỗi seed data:", error);
  process.exit(1);
});
