import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy:{ createdAt:"desc" }})
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Clients</h1>

      <form action="/api/clients/add" method="post" className="flex gap-2">
        <input name="name" placeholder="Name" className="border p-2 flex-1" />
        <input name="email" placeholder="email@dominio.com" className="border p-2 flex-1" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <ul className="divide-y">
        {clients.map(c=>(
          <li key={c.id} className="py-2 flex justify-between items-center">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">{c.email} {c.active ? "" : "(inactive)"}</div>
            </div>
            <form action="/api/clients/toggle" method="post">
              <input type="hidden" name="id" value={c.id} />
              <button className="text-sm px-3 py-1 border rounded">
                {c.active ? "Deactivate" : "Activate"}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
