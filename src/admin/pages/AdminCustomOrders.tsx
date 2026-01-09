import { useState } from 'react';
import { Search, Eye, Phone, Calendar, Image, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { mockCustomOrders } from '../data/mockData';
import { CustomOrder } from '../types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type CustomOrderStatus = CustomOrder['status'];

const statusConfig: Record<CustomOrderStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-800' },
  contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Quoted', className: 'bg-purple-100 text-purple-800' },
  confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', className: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
};

export function AdminCustomOrders() {
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(mockCustomOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');

  const getFilteredOrders = (status?: string) => {
    return customOrders.filter((order) => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery);
      const matchesStatus = !status || status === 'all' || order.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const handleStatusChange = (orderId: string, newStatus: CustomOrderStatus) => {
    setCustomOrders(customOrders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus, 
            adminNotes: adminNotes || order.adminNotes,
            quotedPrice: quotedPrice ? parseFloat(quotedPrice) : order.quotedPrice,
            updatedAt: new Date() 
          }
        : order
    ));
    toast.success('Custom order updated');
    setSelectedOrder(null);
  };

  const openOrderDetails = (order: CustomOrder) => {
    setSelectedOrder(order);
    setAdminNotes(order.adminNotes || '');
    setQuotedPrice(order.quotedPrice?.toString() || '');
  };

  const tabs = [
    { value: 'all', label: 'All', count: customOrders.length },
    { value: 'new', label: 'New', count: customOrders.filter(o => o.status === 'new').length },
    { value: 'contacted', label: 'Contacted', count: customOrders.filter(o => o.status === 'contacted').length },
    { value: 'quoted', label: 'Quoted', count: customOrders.filter(o => o.status === 'quoted').length },
    { value: 'confirmed', label: 'Confirmed', count: customOrders.filter(o => o.status === 'confirmed').length },
  ];

  return (
    <div className="min-h-screen">
      <AdminHeader title="Custom Orders" />
      
      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search custom orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                {tab.label}
                <Badge variant="secondary" className="ml-1">
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Preferred Date</TableHead>
                      <TableHead>Quote</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredOrders(activeTab).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm line-clamp-2">{order.cakeDetails}</p>
                            {order.referenceImage && (
                              <Badge variant="outline" className="mt-1 gap-1">
                                <Image className="h-3 w-3" />
                                Has Image
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.preferredDate 
                            ? format(order.preferredDate, 'MMM dd, yyyy')
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          {order.quotedPrice 
                            ? `Rs ${order.quotedPrice.toLocaleString()}`
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge className={cn('font-medium', statusConfig[order.status].className)}>
                            {statusConfig[order.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(order.createdAt, 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {getFilteredOrders(activeTab).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No custom orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Custom Order Request</span>
                    <Badge className={cn('font-medium', statusConfig[selectedOrder.status].className)}>
                      {statusConfig[selectedOrder.status].label}
                    </Badge>
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
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferred Date</h4>
                      {selectedOrder.preferredDate ? (
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(selectedOrder.preferredDate, 'MMMM dd, yyyy')}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">Not specified</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Cake Details */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Cake Details
                    </h4>
                    <p className="text-sm bg-muted/50 p-4 rounded-lg">{selectedOrder.cakeDetails}</p>
                  </div>

                  {/* Reference Image */}
                  {selectedOrder.referenceImage && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        Reference Image
                      </h4>
                      <img
                        src={selectedOrder.referenceImage}
                        alt="Reference"
                        className="max-w-xs rounded-lg border"
                      />
                    </div>
                  )}

                  <Separator />

                  {/* Admin Section */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quotedPrice">Quoted Price (Rs)</Label>
                      <Input
                        id="quotedPrice"
                        type="number"
                        value={quotedPrice}
                        onChange={(e) => setQuotedPrice(e.target.value)}
                        placeholder="Enter quoted price"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminNotes">Admin Notes</Label>
                      <Textarea
                        id="adminNotes"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add notes about this order..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Status Update */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(statusConfig) as CustomOrderStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant={selectedOrder.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleStatusChange(selectedOrder.id, status)}
                        >
                          {statusConfig[status].label}
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
