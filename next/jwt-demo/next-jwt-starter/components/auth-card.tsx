'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AuthCard(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">{props.title}</CardTitle>
        </CardHeader>
        <CardContent>{props.children}</CardContent>
      </Card>
    </div>
  )
}