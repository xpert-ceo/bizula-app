'use client';
import { useEffect, useState } from 'react';

interface AdminUser {
  _id: string;
  email: string;
  role: string;
  isSubscribed: boolean;
  subscriptionExpiry: string;
  referralCode: string;
  referralCredits: number;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  async function fetchUsers() {
    setLoading(true);
    setError('');

    const params = new URLSearchParams({ page: page.toString(), limit: '20', search });
    const res = await fetch(`/api/admin/users?${params.toString()}`);
    if (!res.ok) {
      setError('Unable to load users');
      setLoading(false);
      return;
    }

    const json = await res.json();
    if (!json.success) {
      setError(json.error || 'Unable to load users');
      setLoading(false);
      return;
    }

    setUsers(json.data.users);
    setTotal(json.data.total);
    setLoading(false);
  }

  async function modifyUser(userId: string, updates: any) {
    setIsUpdating(true);
    const res = await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, ...updates }) });
    if (!res.ok) {
      alert('Action failed');
      setIsUpdating(false);
      return;
    }
    await fetchUsers();
    setIsUpdating(false);
  }

  async function deleteUser(userId: string) {
    if (!confirm('Delete this user permanently?')) return;

    const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Delete failed');
      return;
    }
    await fetchUsers();
  }

  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search email / referral code / role"
          className="w-full max-w-md rounded border p-2"
        />
      </div>

      {error && <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-red-700">{error}</div>}

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold">Email</th>
                <th className="px-4 py-2 text-sm font-semibold">Role</th>
                <th className="px-4 py-2 text-sm font-semibold">Subscribed</th>
                <th className="px-4 py-2 text-sm font-semibold">Referral</th>
                <th className="px-4 py-2 text-sm font-semibold">Created</th>
                <th className="px-4 py-2 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-sm">{user.email}</td>
                  <td className="px-4 py-2 text-sm">{user.role}</td>
                  <td className="px-4 py-2 text-sm">{user.isSubscribed ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 text-sm">{user.referralCode}</td>
                  <td className="px-4 py-2 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-sm space-x-1">
                    <button disabled={isUpdating} onClick={() => modifyUser(user._id, { action: user.isSubscribed ? 'suspend' : 'activate' })} className="rounded bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-700 disabled:opacity-50">
                      {user.isSubscribed ? 'Suspend' : 'Activate'}
                    </button>
                    <button onClick={() => {
                      const pwd = prompt('Enter new password (8+ char)');
                      if (!pwd || pwd.length < 8) return alert('Password must be 8+ chars');
                      modifyUser(user._id, { resetPassword: pwd });
                    }} className="rounded bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700">
                      Reset Password
                    </button>
                    <button onClick={() => deleteUser(user._id)} className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm">
        <p>{total} user(s) total</p>
        <div className="space-x-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded border px-3 py-1 disabled:opacity-50">Previous</button>
          <span>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
