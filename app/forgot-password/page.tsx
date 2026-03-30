'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Email is required');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    setLoading(false);

    const data = await res.json();
    setMessage(data.message);

    if (res.ok && data.resetToken) {
      // For development only - show token
      setMessage(`${data.message}\n\nDev Token: ${data.resetToken}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow-md">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border p-2" required />
          </div>
          {message && <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded">{message}</p>}
          <button type="submit" className="w-full rounded-lg bg-brand py-2 text-white" disabled={loading}>
            {loading ? 'Sending...' : 'Request Password Reset'}
          </button>
          <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800">
            💡 <strong>MVP Note:</strong> Our admin will review your request and send you a reset code to your email.
          </div>
          <p className="text-center text-sm text-slate-500">
            <a href="/login" className="text-brand hover:underline">Back to login</a>
          </p>
        </form>
      </main>
    </div>
  );
}