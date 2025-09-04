import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8">
      {/* Logo */}
      <div className="mx-auto mb-6 h-32 w-auto">
        <Image
          src="/logo.png"
          alt="A8A Logo"
          width={256}
          height={128}
          priority
          className="h-32 w-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a A8A Updates</h1>
      <p className="text-lg text-gray-600 mb-8">
        Audios y actualizaciones exclusivas para clientes.
      </p>

      {/* Navigation buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/upload"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Subir Audio
        </Link>
        <Link
          href="/audio"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Ver Audios
        </Link>
        <Link
          href="/subscribe"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Suscribirse
        </Link>
      </div>

      <p className="mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} A8A
      </p>
    </div>
  );
}

