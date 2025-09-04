export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const form = await req.formData()
  const key = String(form.get("key") || "")
  const adminKey = process.env.ADMIN_KEY

  if (!adminKey) {
    return new NextResponse("Server misconfigured: ADMIN_KEY missing", { status: 500 })
  }

  if (key !== adminKey) {
    return new NextResponse("Invalid key", { status: 401 })
  }

  const res = NextResponse.redirect(new URL("/upload", req.url))
  res.cookies.set("a8a_admin", "ok", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}


