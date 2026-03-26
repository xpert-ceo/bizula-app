import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar authenticated={false} />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center justify-center px-4 py-10 text-center md:px-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-5xl">You’re Probably Losing Money on Every Sale</h1>
        <p className="mt-5 text-lg text-slate-600 sm:text-2xl">Bizula shows your real profit instantly so you stop guessing.</p>
        <p className="mt-5 text-base font-semibold text-brand">₦1,000 → Get 2 Months (First Payment)</p>
        <p className="text-sm text-slate-500">Then ₦1,000/month</p>
        <Link href="/paywall" className="mt-8 inline-flex rounded-full bg-brand px-8 py-3 text-white shadow-lg transition hover:bg-blue-500">Unlock Bizula (₦1,000)</Link>
      </main>
    </div>
  );
}
