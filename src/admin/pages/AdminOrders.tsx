import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Search, Filter, Eye, Phone, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { AdminHeader } from '../components/AdminHeader';
import { DateRangePicker } from '../components/DateRangePicker';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '../data/mockData';
import { Order, OrderStatus } from '../types';
import { toast } from 'sonner';

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    let matchesDate = true;
    if (dateRange?.from && dateRange?.to) {
      matchesDate = order.createdAt >= dateRange.from && order.createdAt <= dateRange.to;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date() }
        : order
    ));
    toast.success('Order status updated');
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, updatedAt: new Date() });
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Orders" />
      
      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{format(order.createdAt, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {order.items.slice(0, 2).map((item) => (
                          <img
                            key={item.id}
                            src={item.productImage}
                            alt={item.productName}
                            className="h-8 w-8 rounded object-cover"
                          />
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-sm text-muted-foreground">
                            +{order.items.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">Rs {order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {order.deliveryType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Order {selectedOrder.orderNumber}</span>
                    <OrderStatusBadge status={selectedOrder.status} />
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer</h4>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Phone className="h-4 w-4" />
                        {selectedOrder.phone}
                      </p>
                      {selectedOrder.email && (
                        <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Delivery</h4>
                      <Badge variant="outline" className="capitalize mb-2">
                        {selectedOrder.deliveryType}
                      </Badge>
                      <p className="flex items-center gap-2 text-sm mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(selectedOrder.deliveryDate, 'MMM dd, yyyy')}
                        {selectedOrder.deliveryTime && ` at ${selectedOrder.deliveryTime}`}
                      </p>
                      {selectedOrder.address && (
                        <p className="flex items-center gap-2 text-sm mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedOrder.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Items */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                              {item.size && ` • ${item.size} lb`}
                            </p>
                            {item.notes && (
                              <p className="text-sm text-primary mt-1">Note: {item.notes}</p>
                            )}
                          </div>
                          <p className="font-semibold">Rs {item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>Rs {selectedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>Rs {selectedOrder.deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>Rs {selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Order Notes</h4>
                        <p className="text-sm">{selectedOrder.notes}</p>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Status Update */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['pending', 'confirmed', 'processing', 'ready', 'delivered', 'cancelled'] as OrderStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant={selectedOrder.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleStatusChange(selectedOrder.id, status)}
                          className="capitalize"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
