import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  FileText,
  TrendingUp,
  Package
} from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { StatCard } from '../components/StatCard';
import { DateRangePicker } from '../components/DateRangePicker';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockOrders, mockDashboardStats } from '../data/mockData';
import { format } from 'date-fns';

export function AdminDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const stats = mockDashboardStats;
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="min-h-screen">
      <AdminHeader title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Date Filter */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Overview</h2>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value={`Rs ${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={Clock}
          />
          <StatCard
            title="Completed Orders"
            value={stats.completedOrders}
            icon={CheckCircle}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Custom Order Requests"
            value={stats.customOrderRequests}
            icon={FileText}
          />
          <StatCard
            title="Avg. Order Value"
            value={`Rs ${Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatCard
            title="Products"
            value={24}
            icon={Package}
          />
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{format(order.createdAt, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{order.items.length} items</TableCell>
                    <TableCell className="font-semibold">Rs {order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
