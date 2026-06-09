import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

// Các route công khai - không cần đăng nhập
const publicRoutes = ["/", "/login", "/register"];

// Proxy kiểm tra xác thực
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cho phép các file tĩnh và API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session_token")?.value;

  // Nếu đã đăng nhập và đang truy cập /login hoặc /register => redirect về /home
  if (token && (pathname === "/login" || pathname === "/register")) {
    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/home", request.url));
    } catch {
      // Token không hợp lệ, cho phép truy cập login/register
    }
  }

  // Cho phép các route công khai (chưa đăng nhập)
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Nếu không có token, redirect về login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token không hợp lệ, redirect về login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Cấu hình matcher - áp dụng proxy cho các routes cụ thể
export const config = {
  matcher: [
    /*
     * Match tất cả routes ngoại trừ:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
