import { getUserFromCookie } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const user = getUserFromCookie()
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {user ? (
        <>
          <p className="text-sm opacity-80">
            Hello, <span className="font-medium">{user.username}</span> ({user.email}) — role: {user.role}
          </p>
          <form action="/api/auth/logout" method="post">
            <Button type="submit">Logout</Button>
          </form>
        </>
      ) : (
        <p>Please login.</p>
      )}
    </main>
  )
}