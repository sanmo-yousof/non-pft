import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // If no token => redirect login
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Fetch authenticated user
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const res = await response.json();
    const user = res?.data;
    const role = user?.role;
    // console.log(user);
    // Define allowed routes per role
    const roleRoutes: Record<string, string[]> = {
      admin: ["/admin-dashboard"],
      supporter: ["/supporter-dashboard"],
      walker: [
        "/walker-activity",
        "/walker-dashboard",
        "/walker-support",
        "/walker-team",
      ],
    };

    // Get allowed routes for current role
    const allowedRoutes = roleRoutes[role] || [];

    // Check route access
    const isAllowed = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // If not allowed => redirect unauthorized
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/supporter-dashboard/:path*",
    "/walker-activity/:path*",
    "/walker-dashboard/:path*",
    "/walker-support/:path*",
    "/walker-team/:path*",
  ],
};
