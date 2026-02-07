import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import userServices from "./services/user.service";
import { UserRole } from "./types/userRole";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = await userServices.getSession();
  const user = res.data?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/dashboard") {
    if (user.role === UserRole.ADMIN)
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    if (user.role === UserRole.TUTOR)
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin-dashboard") && user.role !== UserRole.ADMIN) {
    const fallback =
      user.role === UserRole.TUTOR ? "/tutor-dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  if (pathname.startsWith("/tutor-dashboard") && user.role !== UserRole.TUTOR) {
    const fallback =
      user.role === UserRole.ADMIN ? "/admin-dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
  ],
};
