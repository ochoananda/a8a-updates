kimport { prisma } from "@/lib/prisma"
import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const audio = await prisma.audio.findUnique({ where: { id } })
  if (!audio) return new Response("Not found", { status: 404 })

  const subs = await prisma.subscriber.findMany({ where: { status: "active" } })
  const clients = await prisma.client.findMany({ where: { active: true } })

  const listenUrl = `${process.env.APP_URL}/audio/${audio.id}`

  for (const email of [...subs.map(s => s.email), ...clients.map(c => c.email)]) {
    const client = clients.find(c => c.email === email)
    const unsubLink = client
      ? `${process.env.APP_URL}/api/unsub/${client.unsubToken}`
      : `${process.env.APP_URL}`

    try {
      await sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL!,
        subject: `Nuevo audio: ${audio.title}`,
        html: `<p>Nuevo audio disponible: <strong>${audio.title}</strong></p>
               <p><a href="${listenUrl}">▶️ Escuchar ahora</a></p>
               <hr/>
               <p style="font-size:12px;color:#666">Para dejar de recibir estos correos,
               <a href="${unsubLink}">haz clic aquí</a>.</p>`
      })
    } catch (e: unknown) {
      const err = e as { code?: number; response?: { body?: unknown } }
      console.error("SENDGRID ERROR", err?.code, err?.response?.body)
      return new Response("Email failed", { status: 500 })
    }
  }

  await prisma.audio.update({
    where: { id: audio.id },
    data: { notifiedAt: new Date() }
  })

  return new Response("ok")
}

