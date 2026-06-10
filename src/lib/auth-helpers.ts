import { redirect } from "next/navigation";
import { getCurrentUser, getUserPermissions } from "./auth";

// Yêu cầu đăng nhập, redirect về /login nếu chưa đăng nhập
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

// Yêu cầu có permission cụ thể, redirect về /home nếu không có quyền
export async function requirePermission(permissionKey: string) {
  const user = await requireAuth();
  const permissions = await getUserPermissions(user.id);

  if (!permissions.includes(permissionKey)) {
    redirect("/home");
  }

  return user;
}

// Lấy user hiện tại hoặc null (dùng cho server components không yêu cầu auth)
export async function getOptionalUser() {
  return getCurrentUser();
}
