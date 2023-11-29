import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import UserService from "./services/user";
import { ROLES } from "./constants/roles";

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

    if (pathname.includes("/admin")) {
      switch (pathname) {
        case "/admin": {
          if (
            [
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN,
              ROLES.MANAGE_USERS,
              ROLES.USER_PROFILE,
            ].includes(userRole)
          ) {
            return NextResponse.redirect(new URL("/admin/users", origin));
          }

          if ([ROLES.MANAGE_EVENTS].includes(userRole)) {
            return NextResponse.redirect(new URL("/admin/events", origin));
          }

          if ([ROLES.MANAGE_TEAMS].includes(userRole)) {
            return NextResponse.redirect(new URL("/admin/teams", origin));
          }

          return NextResponse.redirect(new URL("/not-found", origin));
        }

        case "/admin/events": {
          if (
            ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_EVENTS].includes(
              userRole
            )
          )
            return NextResponse.redirect(new URL("/not-found", origin));

          break;
        }

        case "/admin/teams": {
          if (
            ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGE_TEAMS].includes(
              userRole
            )
          )
            return NextResponse.redirect(new URL("/not-found", origin));

          break;
        }

        case "/admin/users": {
          if (
            ![
              ROLES.SUPER_ADMIN,
              ROLES.ADMIN,
              ROLES.MANAGE_USERS,
              ROLES.USER_PROFILE,
            ].includes(userRole)
          )
            return NextResponse.redirect(new URL("/not-found", origin));

          break;
        }

        default:
          break;
      }
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
