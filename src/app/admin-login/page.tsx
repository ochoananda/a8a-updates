export default function AdminLogin() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        action="/api/admin/login"
        method="post"
        className="w-full max-w-sm space-y-4 border rounded-2xl p-6"
      >
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>
        <input
          type="password"
          name="key"
          placeholder="Enter admin key"
          className="border rounded w-full p-2"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 text-white py-2"
        >
          Sign in
        </button>
        <p className="text-xs text-gray-500 text-center">
          You’ll stay signed in for 7 days on this device.
        </p>
      </form>
    </main>
  )
}

