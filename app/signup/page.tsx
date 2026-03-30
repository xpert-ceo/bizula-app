'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, referralCode: referralCode || undefined })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Signup failed');
      return;
    }

    setSuccess('Account created. Please log in.');

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow-md">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border p-2" />
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border p-2" />
          <label className="block text-sm font-medium">Referral Code (Optional)</label>
          <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())} placeholder="Enter referral code" className="w-full rounded-lg border p-2" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <button type="submit" className="w-full rounded-lg bg-brand py-2 text-white" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p className="text-center text-sm text-slate-500">
            Already have an account? <a href="/login" className="text-brand">Login</a>
          </p>
        </form>
      </main>
    </div>
  );
}
