import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import User from '@/models/User';
import Sale from '@/models/Sale';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: NextRequest) {
  const adminOrResponse = await requireAdmin(request);
  if (!(adminOrResponse as any)._id) {
    return adminOrResponse as NextResponse;
  }

  await connect();

  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isSubscribed: true });
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newSignups = await User.countDocuments({ createdAt: { $gte: weekAgo } });

  const salesAggr = await Sale.aggregate([
    {
      $group: {
        _id: null,
        salesCount: { $sum: 1 },
        totalRevenue: { $sum: '$revenue' },
        totalProfit: { $sum: '$profit' }
      }
    }
  ]);

  const salesByDay = await Sale.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        totalProfit: { $sum: '$profit' }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
    { $limit: 7 }
  ]);

  const popularProduct = await Sale.aggregate([
    {
      $group: {
        _id: '$productName',
        totalProfit: { $sum: '$profit' },
        salesVolume: { $sum: '$quantity' }
      }
    },
    { $sort: { totalProfit: -1 } },
    { $limit: 1 }
  ]);

  const avgProfitRow = await Sale.aggregate([
    {
      $group: {
        _id: null,
        avgProfit: { $avg: '$profit' }
      }
    }
  ]);

  return NextResponse.json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      newSignups,
      totalSales: salesAggr[0]?.salesCount ?? 0,
      totalRevenue: salesAggr[0]?.totalRevenue ?? 0,
      totalProfit: salesAggr[0]?.totalProfit ?? 0,
      salesByDay,
      popularProduct: popularProduct[0] || null,
      avgProfit: avgProfitRow[0]?.avgProfit ?? 0
    }
  });
}
