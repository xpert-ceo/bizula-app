'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function PaywallPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already subscribed
    fetch('/api/sales', { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          router.push('/dashboard');
        }
      })
      .catch(() => {});
  }, [router]);

  async function handlePay() {
    setError('');
    setLoading(true);

    const res = await fetch('/api/pay', { method: 'POST' });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Payment failed');
      return;
    }

    const data = await res.json();
    window.location.href = data.authorizationUrl;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar authenticated={true} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">Unlock Bizula</h1>
        <p className="mt-4 text-center text-lg">Pay ₦1,000 to access Bizula</p>
        <p className="mt-2 text-center text-sm text-slate-500">First payment gives 60 days. Renewals give 30 days.</p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          onClick={handlePay}
          className="mt-6 w-full rounded-lg bg-brand py-3 text-white shadow-lg transition hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay ₦1,000 Now'}
        </button>
      </main>
    </div>
  );
}
