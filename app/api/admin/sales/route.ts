import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import Sale from '@/models/Sale';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: NextRequest) {
  const adminOrResponse = await requireAdmin(request);
  if (!(adminOrResponse as any)._id) {
    return adminOrResponse as NextResponse;
  }

  const url = new URL(request.url);
  const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), 100);
  const search = url.searchParams.get('search') || '';

  await connect();

  const query: any = {};
  if (search) {
    query.productName = new RegExp(search, 'i');
  }

  const total = await Sale.countDocuments(query);
  const sales = await Sale.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalRevenue = await Sale.aggregate([{ $group: { _id: null, sum: { $sum: '$revenue' }, profit: { $sum: '$profit' } } }]);

  return NextResponse.json({
    success: true,
    data: {
      sales,
      total,
      page,
      limit,
      totalRevenue: totalRevenue[0] || { sum: 0, profit: 0 }
    }
  });
}

export async function PATCH(request: NextRequest) {
  const adminOrResponse = await requireAdmin(request);
  if (!(adminOrResponse as any)._id) {
    return adminOrResponse as NextResponse;
  }

  await connect();
  const body = await request.json();
  const { saleId, productName, sellingPrice, costPrice, quantity, adCost } = body;

  if (!saleId) {
    return NextResponse.json({ success: false, error: 'saleId is required' }, { status: 400 });
  }

  const sale = await Sale.findById(saleId);
  if (!sale) {
    return NextResponse.json({ success: false, error: 'Sale not found' }, { status: 404 });
  }

  if (productName) sale.productName = productName;
  if (typeof sellingPrice === 'number') sale.sellingPrice = sellingPrice;
  if (typeof costPrice === 'number') sale.costPrice = costPrice;
  if (typeof quantity === 'number') sale.quantity = quantity;
  if (typeof adCost === 'number') sale.adCost = adCost;

  sale.revenue = sale.sellingPrice * sale.quantity;
  sale.profit = (sale.sellingPrice - sale.costPrice - sale.adCost) * sale.quantity;

  await sale.save();

  return NextResponse.json({ success: true, data: { sale } });
}

export async function DELETE(request: NextRequest) {
  const adminOrResponse = await requireAdmin(request);
  if (!(adminOrResponse as any)._id) {
    return adminOrResponse as NextResponse;
  }

  await connect();
  const url = new URL(request.url);
  const saleId = url.searchParams.get('saleId');

  if (!saleId) {
    return NextResponse.json({ success: false, error: 'saleId is required' }, { status: 400 });
  }

  await Sale.findByIdAndDelete(saleId);
  return NextResponse.json({ success: true, data: { saleId } });
}
