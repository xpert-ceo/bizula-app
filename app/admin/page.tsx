'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newSignups: number;
  totalSales: number;
  totalRevenue: number;
  totalProfit: number;
  popularProduct: { _id: string; totalProfit: number; salesVolume: number } | null;
  avgProfit: number;
}

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/analytics');
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Analytics failed');
        setAnalytics(json.data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <div className="p-8">Loading admin overview...</div>;
  }

  if (error || !analytics) {
    return <div className="p-8 text-red-600">{error || 'No analytics available'}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin dashboard</h2>
      <p className="mt-1 text-gray-600">Summary of Bizula activity and system health.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total users</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{analytics.totalUsers}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Active subscriptions</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{analytics.activeUsers}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">New signups (7d)</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{analytics.newSignups}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total sales</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{analytics.totalSales}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total revenue</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">₦{analytics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total profit</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">₦{analytics.totalProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <h3 className="text-lg font-semibold">Most profitable product</h3>
          <p className="mt-2 text-slate-700">{analytics.popularProduct?._id ?? 'No records yet'}</p>
          <p className="mt-1 text-sm text-gray-500">Profit: ₦{analytics.popularProduct?.totalProfit?.toLocaleString() ?? 0}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <h3 className="text-lg font-semibold">Avg profit per sale</h3>
          <p className="mt-2 text-slate-700">₦{analytics.avgProfit.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
