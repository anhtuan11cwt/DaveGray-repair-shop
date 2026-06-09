import { redirect } from "next/navigation";
import { getCurrentUser, getUserPermissions } from "./auth";

// yêu cầu đăng nhập - nếu chưa login thì redirect về /login
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

// yêu cầu permission cụ thể
export async function requirePermission(permissionKey: string) {
  const user = await requireAuth();
  const permissions = await getUserPermissions(user.id);

  if (!permissions.includes(permissionKey)) {
    redirect("/home");
  }

  return user;
}

// lấy user hiện tại hoặc null (dùng cho server components)
export async function getOptionalUser() {
  return getCurrentUser();
}
