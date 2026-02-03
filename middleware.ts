import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, type UserRole } from "./lib/auth/roles";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const target = protectedRoutes.find((route) => route.pattern.test(pathname));
  if (!target) return NextResponse.next();

  const cookieRole = req.cookies.get("ca_role")?.value;
  const headerRole = req.headers.get("x-mock-role");
  const role = (cookieRole || headerRole) as UserRole | undefined;

  if (!role || !target.allowed.includes(role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/cliente/acceso";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/administrativo/:path*",
    "/panel/:path*",
    "/cliente/panel/:path*",
    "/clientes/:path*",
  ],
};
