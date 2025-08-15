import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">Next.js + JWT + Prisma</h1>
        <div className="space-x-3">
          <Link className="underline" href="/login">Login</Link>
          <Link className="underline" href="/register">Register</Link>
          <Link className="underline" href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </main>
  )
}