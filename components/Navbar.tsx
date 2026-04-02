'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

export default function Navbar({ authenticated }: { authenticated: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-base font-bold text-slate-900">Bizula</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/faq">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          {!authenticated && (
            <>
              <Link href="/login" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
                Login
              </Link>
              <Link href="/signup" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Get Started
              </Link>
            </>
          )}
          {authenticated && (
            <>
              <Link href="/dashboard" className="rounded-md border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">Dashboard</Link>
              <button onClick={handleLogout} className="rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
