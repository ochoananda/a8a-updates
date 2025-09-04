export default function AdminLogin() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        action="/api/admin/login"
        method="post"
        className="w-full max-w-sm space-y-4 border rounded-2xl p-6"
      >
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>
        <input
          type="password"
          name="key"
          placeholder="Enter admin key"
          className="border rounded w-full p-2"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 text-white py-2"
        >
          Sign in
        </button>
        <p className="text-xs text-gray-500 text-center">
          You’ll stay signed in for 7 days on this device.
        </p>
      </form>
    </main>
  )
}
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) {
    return new NextResponse("Server misconfigured: ADMIN_KEY missing", { status: 500 })
  }

  // already authenticated via cookie?
  const cookieOk = req.cookies.get("a8a_admin")?.value === "ok"
  if (cookieOk) return NextResponse.next()

  // allow one-time ?admin=KEY to set cookie
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

  // otherwise block
  return new NextResponse("Unauthorized", { status: 401 })
}

// only run on protected routes
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

