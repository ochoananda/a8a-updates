export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-6 text-center">
        <h1 className="text-3xl font-semibold">A8A Updates</h1>
        <p className="text-gray-600">
          Sube audios, compártelos con tus clientes y gestiona suscriptores.
        </p>

        <div className="flex gap-3 justify-center">
          <a className="px-4 py-2 rounded bg-blue-600 text-white" href="/upload">
            Upload audio
          </a>
          <a className="px-4 py-2 rounded border" href="/audio">
            View audios
          </a>
          <a className="px-4 py-2 rounded border" href="/subscribe">
            Subscribe
          </a>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} A8A
        </p>
      </div>
    </main>
  )
}

