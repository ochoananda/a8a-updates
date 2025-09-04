import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const form = await req.formData()
  const id = String(form.get("id") || "")
  const c = await prisma.client.findUnique({ where: { id } })
  if (!c) return new Response("Not found", { status: 404 })

  await prisma.client.update({ where: { id }, data: { active: !c.active } })
  return Response.redirect(new URL("/clients", process.env.APP_URL), 302)
}
