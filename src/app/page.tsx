// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* If you add /public/logo.png, it will show here */}
          <img
            src="/logo.png"
            alt="A8A"
            className="h-16 w-auto"
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none' }}
          />
 export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="A8A Logo"
        className="h-32 w-auto mx-auto mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a A8A Updates</h1>
      <p className="text-lg text-gray-600 mb-8">
        Audios y actualizaciones exclusivas para clientes.
      </p>

      {/* Navigation buttons */}
      <div className="flex space-x-4">
        <a
          href="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Subir Audio
        </a>
        <a
          href="/audio"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Ver Audios
        </a>
        <a
          href="/subscribe"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Suscribirse
        </a>
      </div>
    </div>
  )
}
}


