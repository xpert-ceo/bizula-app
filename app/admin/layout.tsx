'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const res = await fetch('/api/admin/check');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="flex min-h-screen items-center justify-center">Access Denied</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b">
          <Logo />
        </div>
        <nav className="mt-8">
          <Link href="/admin" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
            Users
          </Link>
          <Link href="/admin/sales" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
            Sales Records
          </Link>
          <Link href="/admin/analytics" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
            Analytics
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}