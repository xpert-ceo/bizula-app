'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'enter-code' | 'reset-password'>('enter-code');

  async function handleSubmitCode(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!email || !resetCode) {
      setMessage('Please enter your email and reset code');
      return;
    }

    // In MVP, we just verify the format and proceed
    // The actual verification happens during password reset
    setStep('reset-password');
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setMessage('Please enter and confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, resetCode, newPassword })
    });

    setLoading(false);

    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Password reset successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setMessage(data.message || 'Password reset failed');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Reset Password</h1>

        {step === 'enter-code' && (
          <form onSubmit={handleSubmitCode} className="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow-md">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reset Code</label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                className="w-full rounded-lg border p-2 uppercase"
                placeholder="e.g., ABC123"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Check your email for the reset code sent by our admin</p>
            </div>
            {message && <p className="text-sm text-red-600 bg-red-50 p-3 rounded">{message}</p>}
            <button type="submit" className="w-full rounded-lg bg-brand py-2 text-white">
              Continue
            </button>
            <p className="text-center text-sm text-slate-500">
              <a href="/login" className="text-brand hover:underline">Back to login</a>
            </p>
          </form>
        )}

        {step === 'reset-password' && (
          <form onSubmit={handleResetPassword} className="mt-6 w-full space-y-4 rounded-xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-600">
              Email: <strong>{email}</strong> | Reset Code: <strong>{resetCode}</strong>
            </p>
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border p-2"
                required
              />
            </div>
            {message && (
              <p className={`text-sm p-3 rounded ${message.includes('✅') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {message}
              </p>
            )}
            <button type="submit" className="w-full rounded-lg bg-brand py-2 text-white" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('enter-code');
                setMessage('');
              }}
              className="w-full rounded-lg border border-slate-300 py-2 text-slate-700"
            >
              Back
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
