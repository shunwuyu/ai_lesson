'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard } from '/components/auth-card';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirect = sp.get('redirect') || '/dashboard';

  const [emailOrUsername, setID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.replace(redirect);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Sign in">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="id">Email or Username</Label>
          <Input id="id" value={emailOrUsername} onChange={e=>setID(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <Button variant="outline" className="w-full" type="button" onClick={() => router.push('/register')}>
          Create an account
        </Button>
      </form>
    </AuthCard>
  );
}
