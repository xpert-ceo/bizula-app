'use client';
import { useEffect, useState } from 'react';

interface SaleRecord {
  _id: string;
  productName: string;
  quantity: number;
  sellingPrice: number;
  costPrice: number;
  adCost: number;
  revenue: number;
  profit: number;
  createdAt: string;
}

export default function AdminSalesPage() {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchSales();
  }, [search, page]);

  async function fetchSales() {
    setLoading(true);
    setError('');

    const params = new URLSearchParams({ page: page.toString(), limit: '20', search });
    const res = await fetch(`/api/admin/sales?${params.toString()}`);
    if (!res.ok) {
      setError('Unable to get sales records');
      setLoading(false);
      return;
    }

    const json = await res.json();
    if (!json.success) {
      setError(json.error || 'Unable to get sales records');
      setLoading(false);
      return;
    }

    setSales(json.data.sales);
    setTotal(json.data.total);
    setLoading(false);
  }

  async function deleteSale(id: string) {
    if (!confirm('Delete this sale?')) return;
    const res = await fetch(`/api/admin/sales?saleId=${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('Delete failed');
      return;
    }
    fetchSales();
  }

  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sales Records</h2>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product" className="rounded border p-2" />
      </div>
      {error && <div className="mb-3 rounded border border-red-200 bg-red-100 p-3 text-red-700">{error}</div>}
      {loading ? (
        <div>Loading sales...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-sm font-semibold">Product</th>
                <th className="px-3 py-2 text-sm font-semibold">Qty</th>
                <th className="px-3 py-2 text-sm font-semibold">Revenue</th>
                <th className="px-3 py-2 text-sm font-semibold">Profit</th>
                <th className="px-3 py-2 text-sm font-semibold">Date</th>
                <th className="px-3 py-2 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td className="px-3 py-2 text-sm">{sale.productName}</td>
                  <td className="px-3 py-2 text-sm">{sale.quantity}</td>
                  <td className="px-3 py-2 text-sm">₦{sale.revenue.toLocaleString()}</td>
                  <td className="px-3 py-2 text-sm">₦{sale.profit.toLocaleString()}</td>
                  <td className="px-3 py-2 text-sm">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-sm">
                    <button onClick={() => deleteSale(sale._id)} className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-end gap-2">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded border px-3 py-1 disabled:opacity-50">
          Prev
        </button>
        <span className="text-sm">Page {page}/{totalPages}</span>
        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded border px-3 py-1 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
