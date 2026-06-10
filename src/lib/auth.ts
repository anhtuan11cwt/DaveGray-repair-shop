import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import { permissions, sessions, userPermissions, users } from "./db/schema";

const SESSION_COOKIE_NAME = "session_token";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

// Lấy secret key JWT từ biến môi trường
function getSecret() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

// Tạo JWT session token
export async function createSessionToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

// Xác thực JWT session token
export async function verifySessionToken(
  token: string,
): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return { userId: payload.userId as number };
  } catch {
    return null;
  }
}

// Tạo session mới: lưu vào DB + set cookie
export async function createSession(userId: number): Promise<string> {
  const token = await createSessionToken(userId);
  const cookieStore = await cookies();

  // Lưu session vào DB
  await db.insert(sessions).values({
    id: token,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000),
  });

  // Set cookie httpOnly
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return token;
}

// Lấy session hiện tại từ cookie và verify
export async function getSession(): Promise<{
  token: string;
  userId: number;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) return null;

  // Kiểm tra session còn tồn tại trong DB không
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, token),
  });

  if (!session) return null;

  return { token, userId: payload.userId };
}

// Xóa session khỏi DB và cookie (đăng xuất)
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.id, token));
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}

// Lấy thông tin user từ session hiện tại
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

// Lấy danh sách permission keys của user
export async function getUserPermissions(userId: number): Promise<string[]> {
  const result = await db
    .select({ key: permissions.key })
    .from(userPermissions)
    .innerJoin(permissions, eq(userPermissions.permissionId, permissions.id))
    .where(eq(userPermissions.userId, userId));

  return result.map((r) => r.key);
}

// Kiểm tra user có permission cụ thể không
export async function hasPermission(
  userId: number,
  permissionKey: string,
): Promise<boolean> {
  const perms = await getUserPermissions(userId);
  return perms.includes(permissionKey);
}

// So sánh password với hash
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.hash(password, 12);
}
