import { prisma } from "@/lib/prisma"

export default async function AudioList() {
  const items = await prisma.audio.findMany({ orderBy:{ createdAt:"desc" }})
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Audios</h1>
      <ul className="space-y-3">
        {items.map(a=>(
          <li key={a.id} className="border rounded p-3 flex justify-between">
            <div><div className="font-medium">{a.title}</div></div>
            <a className="text-blue-600" href={`/audio/${a.id}`}>Open</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
