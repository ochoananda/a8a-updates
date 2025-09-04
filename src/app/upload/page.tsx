'use client'
import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")

  async function handleUpload() {
    if (!file) return alert("Choose an audio file")
    // 1) Get S3 presigned form
    const presign = await fetch("/api/uploads/presign", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ filename:file.name, mime:file.type })
    }).then(r=>r.json())

    // 2) Upload direct to S3
    const form = new FormData()
    Object.entries(presign.fields).forEach(([k,v])=>form.append(k, v as string))
    form.append("file", file)
    const up = await fetch(presign.url, { method:"POST", body: form })
    if (!up.ok) return alert("S3 upload failed")

    // 3) Publish in app (DB row + signed URL)
    const pub = await fetch("/api/audio/publish", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ title: title || file.name.replace(/\.[^/.]+$/, ""), key: presign.key })
    }).then(r=>r.json())

    // Go to audio page
    window.location.href = `/audio/${pub.audio.id}`
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Upload new audio</h1>
      <input className="border p-2 w-full" placeholder="Title (optional)" value={title} onChange={e=>setTitle(e.target.value)} />
      <input type="file" accept="audio/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpload}>Upload</button>
    </div>
  )
}
