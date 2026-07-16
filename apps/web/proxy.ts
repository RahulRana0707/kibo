import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL ?? "http://localhost:4000"

async function getProxySession(request: NextRequest) {
  try {
    const response = await fetch(new URL("/auth/session", API_URL), {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as { user?: { id?: string } } | null
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const session = await getProxySession(request)

  const protectedRoutes = [
    "/analytics",
    "/bots",
    "/dashboard",
    "/integrations",
    "/knowledge-base",
    "/settings",
  ]
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect logged-in users away from auth routes to the dashboard
  const isAuthRoute =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup"
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/analytics/:path*",
    "/bots/:path*",
    "/dashboard/:path*",
    "/integrations/:path*",
    "/knowledge-base/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
}
