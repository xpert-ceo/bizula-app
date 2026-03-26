'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Sale {
  _id: string;
  productName: string;
  profit: number;
  revenue: number;
  quantity: number;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productName: '',
    sellingPrice: '',
    costPrice: '',
    quantity: '',
    adCost: ''
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    const res = await fetch('/api/sales');
    if (res.ok) {
      const data = await res.json();
      setSales(data.sales);
    } else {
      router.push('/paywall');
    }
    setLoading(false);
  }

  async function handleAddSale(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);

    const sp = parseFloat(formData.sellingPrice);
    const cp = parseFloat(formData.costPrice);
    const q = parseInt(formData.quantity);
    const ac = parseFloat(formData.adCost);

    if (!formData.productName || isNaN(sp) || isNaN(cp) || isNaN(q) || isNaN(ac) || sp < 0 || cp < 0 || q <= 0 || ac < 0) {
      alert('Invalid input data');
      setAdding(false);
      return;
    }

    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: formData.productName,
        sellingPrice: sp,
        costPrice: cp,
        quantity: q,
        adCost: ac
      })
    });

    setAdding(false);

    if (res.ok) {
      setFormData({ productName: '', sellingPrice: '', costPrice: '', quantity: '', adCost: '' });
      fetchSales();
    } else {
      const data = await res.json();
      alert(data.message || 'Failed to add sale');
    }
  }

  const today = new Date().toDateString();
  const todaySales = sales.filter(s => new Date(s.createdAt).toDateString() === today);
  const revenueToday = todaySales.reduce((sum, s) => sum + s.revenue, 0);
  const profitToday = todaySales.reduce((sum, s) => sum + s.profit, 0);
  const totalSales = todaySales.length;

  const bestProduct = sales.reduce((best, s) => {
    const bestProfit = best ? best.profit : 0;
    return s.profit > bestProfit ? s : best;
  }, null as Sale | null);

  const isProfitable = profitToday > 0;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar authenticated={true} />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-semibold">Revenue Today</h3>
            <p className="text-2xl font-bold text-green-600">₦{revenueToday.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-semibold">Profit Today</h3>
            <p className={`text-2xl font-bold ${profitToday >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₦{profitToday.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">{totalSales}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Add Sale</h2>
          <form onSubmit={handleAddSale} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="rounded-lg border p-2"
              required
            />
            <input
              type="number"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
              className="rounded-lg border p-2"
              required
            />
            <input
              type="number"
              placeholder="Cost Price"
              value={formData.costPrice}
              onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
              className="rounded-lg border p-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="rounded-lg border p-2"
              required
            />
            <input
              type="number"
              placeholder="Ad Cost"
              value={formData.adCost}
              onChange={(e) => setFormData({ ...formData, adCost: e.target.value })}
              className="rounded-lg border p-2"
              required
            />
            <button type="submit" className="rounded-lg bg-brand py-2 text-white" disabled={adding}>
              {adding ? 'Adding...' : '+ Add Sale'}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Sales</h2>
          <div className="mt-4 space-y-2">
            {sales.map((sale) => (
              <div key={sale._id} className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                <div>
                  <p className="font-semibold">{sale.productName}</p>
                  <p className="text-sm text-slate-500">Revenue: ₦{sale.revenue.toLocaleString()} | Quantity: {sale.quantity}</p>
                </div>
                <p className={`font-bold ${sale.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₦{sale.profit.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-slate-50 p-4">
          <h2 className="text-xl font-semibold">Insights</h2>
          <p className="mt-2">You made ₦{profitToday.toLocaleString()} today</p>
          {bestProduct && <p>Your best product is {bestProduct.productName}</p>}
          <p className={`font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '🔥 You are profitable today' : '⚠️ You are losing money today'}
          </p>
        </div>
      </main>
    </div>
  );
}
