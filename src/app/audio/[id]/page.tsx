import { prisma } from "@/lib/prisma"

export default async function AudioPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const audio = await prisma.audio.findUnique({ where: { id } })
  if (!audio) return <div className="p-6">Not found</div>

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{audio.title}</h1>
      <audio controls src={audio.publicUrl ?? ""} style={{ width: "100%" }} />
      <form action={`/api/audio/notify/${audio.id}`} method="post">
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Notify clients
        </button>
      </form>
      <p className="text-sm text-gray-500">
        {audio.notifiedAt
          ? `Notified: ${new Date(audio.notifiedAt).toDateString()}`
          : "Not notified yet"}
      </p>
    </div>
  )
}

