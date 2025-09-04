import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const form = await req.formData()
  const name = String(form.get("name")||"").trim()
  const email = String(form.get("email")||"").trim().toLowerCase()
  if (!name || !email) return new Response("Missing", { status: 400 })

  await prisma.client.upsert({
    where: { email },
    update: { name, active: true },
    create: { name, email }
  })

  return Response.redirect(new URL("/clients", process.env.APP_URL), 302)
}
