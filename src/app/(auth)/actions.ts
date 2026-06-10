"use server";

import { eq } from "drizzle-orm";
import {
  createSession,
  deleteSession,
  getCurrentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { permissions, userPermissions, users } from "@/lib/db/schema";

type ActionState = {
  error: string | null;
  success: boolean;
};

// Server action đăng nhập
export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Vui lòng nhập email và mật khẩu", success: false };
  }

  // Tìm user theo email (lowercase, trim)
  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase().trim()),
  });

  if (!user) {
    return { error: "Email hoặc mật khẩu không đúng", success: false };
  }

  // Kiểm tra mật khẩu
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return { error: "Email hoặc mật khẩu không đúng", success: false };
  }

  // Tạo session đăng nhập
  await createSession(user.id);
  return { error: null, success: true };
}

// Server action đăng ký tài khoản mới
export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: "Vui lòng điền đầy đủ thông tin", success: false };
  }

  if (password !== confirmPassword) {
    return { error: "Mật khẩu xác nhận không khớp", success: false };
  }

  if (password.length < 6) {
    return { error: "Mật khẩu phải có ít nhất 6 ký tự", success: false };
  }

  // Kiểm tra email đã tồn tại
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase().trim()),
  });

  if (existingUser) {
    return { error: "Email đã được sử dụng", success: false };
  }

  // Tạo user mới + gán quyền user mặc định
  const passwordHash = await hashPassword(password);
  const [newUser] = await db
    .insert(users)
    .values({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    })
    .returning({ id: users.id });

  // Gán quyền 'user' mặc định
  const userPermission = await db.query.permissions.findFirst({
    where: eq(permissions.key, "user"),
  });

  if (userPermission) {
    await db.insert(userPermissions).values({
      userId: newUser.id,
      permissionId: userPermission.id,
    });
  }

  // Tạo session
  await createSession(newUser.id);
  return { error: null, success: true };
}

// Server action đăng xuất
export async function logoutAction() {
  await deleteSession();
}

// Lấy thông tin user hiện tại (dùng cho client components)
export async function getCurrentUserAction() {
  return getCurrentUser();
}
