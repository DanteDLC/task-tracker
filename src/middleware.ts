import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/landing-page"];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  // console.log("middleware", token);
  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/landing-page", request.url));
  }
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
