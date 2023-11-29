import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import UserService from "./services/user";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const isLoggedIn = token ? true : false;
  const { origin, pathname } = req.nextUrl;
  let userRole;

  if (pathname === "/not-found") return NextResponse.next();

  if (isLoggedIn) {
    try {
      const { _id: userId } = jwt.decode(token);
      const { user } = await UserService.getUserDetails(userId);
      userRole = user.role;
    } catch (error) {
      return NextResponse.redirect(new URL("/not-found", origin));
    }
    
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard/profile", origin));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/events", origin));
    }
  } else {
    if (pathname.includes("/dashboard") || pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/login", origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
