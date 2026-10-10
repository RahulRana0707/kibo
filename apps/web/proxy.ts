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

  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    // A session cookie that no longer maps to a session means it expired.
    const hadSession = request.cookies
      .getAll()
      .some((cookie) => cookie.name.endsWith("better-auth.session_token"))
    const loginUrl = new URL("/login", request.url)
    if (hadSession) {
      loginUrl.searchParams.set("session", "expired")
    }
    return NextResponse.redirect(loginUrl)
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
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}
