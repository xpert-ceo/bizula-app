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
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Logo />
        <nav className="space-x-3 text-sm font-medium text-slate-700">
          <Link href="/">Home</Link>
          {!authenticated && <Link href="/signup">Sign Up</Link>}
          {!authenticated && <Link href="/login">Login</Link>}
          {authenticated && <Link href="/dashboard">Dashboard</Link>}
          {authenticated && <button onClick={handleLogout} className="text-slate-700 hover:text-slate-900">Logout</button>}
        </nav>
      </div>
    </header>
  );
}
