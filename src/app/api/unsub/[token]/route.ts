import { prisma } from "@/lib/prisma"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const client = await prisma.client.findFirst({ where: { unsubToken: token, active: true } })
  if (!client) return new Response("Invalid or already unsubscribed.", { status: 400 })

  await prisma.client.update({ where: { id: client.id }, data: { active: false } })
  const html = `<!doctype html><meta charset="utf-8"><div style="font:16px system-ui;padding:24px">
  ✅ Has sido dado de baja. Si fue un error, responde a este correo para volver a activarte.</div>`
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } })
}
