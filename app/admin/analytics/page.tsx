'use client';
import { useEffect, useState } from 'react';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/analytics').then(async (res) => {
      if (!res.ok) {
        setError('Failed to load analytics');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? 'Failed to load analytics');
      } else {
        setStats(data.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="mt-1 text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Total Profit</p>
          <p className="mt-1 text-2xl font-bold">₦{stats.totalProfit.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Avg Profit per sale</p>
          <p className="mt-1 text-2xl font-bold">₦{stats.avgProfit.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-6 rounded-lg border bg-white p-4">
        <h3 className="text-lg font-semibold">Best performing day</h3>
        {stats.salesByDay?.length ? (
          <ul className="mt-3 space-y-2">
            {stats.salesByDay.slice(0, 7).map((entry: any) => {
              const date = new Date(entry._id.year, entry._id.month - 1, entry._id.day);
              return (
                <li key={`${entry._id.year}-${entry._id.month}-${entry._id.day}`} className="flex justify-between">
                  <span>{date.toDateString()}</span>
                  <span>₦{entry.totalProfit.toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No sale data available.</p>
        )}
      </div>
    </div>
  );
}
