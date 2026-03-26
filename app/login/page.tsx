'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Login failed');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow-md">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border p-2" />
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border p-2" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-brand py-2 text-white" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account? <a href="/signup" className="text-brand">Sign up</a>
          </p>
        </form>
      </main>
    </div>
  );
}
