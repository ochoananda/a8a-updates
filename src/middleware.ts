import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  // Allow admin login routes without checks
  const pathname = req.nextUrl.pathname
  if (pathname === "/admin-login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next()
  }

  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) {
    return new NextResponse("Server misconfigured: ADMIN_KEY missing", { status: 500 })
  }

  // Already authenticated via cookie?
  const cookieOk = req.cookies.get("a8a_admin")?.value === "ok"
  if (cookieOk) return NextResponse.next()

  // Support one-time login via ?admin=KEY
  const urlKey = req.nextUrl.searchParams.get("admin")
  if (urlKey && urlKey === adminKey) {
    const cleanUrl = new URL(req.nextUrl.toString())
    cleanUrl.searchParams.delete("admin")

    const res = NextResponse.redirect(cleanUrl)
    res.cookies.set("a8a_admin", "ok", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  }

  return new NextResponse("Unauthorized. Go to /admin-login", { status: 401 })
}

export const config = {
  matcher: [
    "/upload",
    "/clients",
    "/api/clients/:path*",
    "/api/uploads/:path*",
    "/api/audio/publish",
    "/api/audio/notify/:path*",
  ],
}

