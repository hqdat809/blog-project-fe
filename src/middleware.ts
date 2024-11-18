import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/profile"];
const authPaths = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Chưa đăng nhập thì không cho vào private paths
  if (
    privatePaths.some((path: string) => pathname.startsWith(path)) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (
    authPaths.some((path: string) => pathname.startsWith(path)) &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/api/logout"],
};
