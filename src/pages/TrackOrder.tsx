import { useState } from 'react';
import { Search, Package, MapPin, Calendar, CheckCircle, Clock, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/admin/data/mockData';
import { format } from 'date-fns';

const maskName = (name: string) => {
  if (name.length <= 5) return name.slice(0, 2) + '***';
  return name.slice(0, 5) + '***';
};

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Package },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'ready', label: 'Ready', icon: Package },
  { key: 'delivered', label: 'Delivered', icon: Truck },
];

const getStatusIndex = (status: string) => {
  const index = statusSteps.findIndex(s => s.key === status);
  return index === -1 ? 0 : index;
};

const TrackOrder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      const order = mockOrders.find(
        (o) => 
          o.orderNumber.toLowerCase() === searchQuery.toLowerCase() ||
          o.phone === searchQuery
      );

      if (order) {
        setSearchedOrder(order);
      } else {
        setSearchedOrder(null);
        setError('Order not found. Please check your order number or phone number.');
      }
      setIsSearching(false);
    }, 500);
  };

  const currentStatusIndex = searchedOrder ? getStatusIndex(searchedOrder.status) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background pb-20 md:pb-0">
        <div className="bg-cream section-padding !py-12">
          <div className="container-custom">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Track Your Order
            </h1>
            <p className="text-muted-foreground mb-6">
              Enter your order number or phone number to track your order status
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Search Form */}
          <Card className="max-w-xl mx-auto mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Order number (e.g., ORD-001) or phone number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" disabled={!searchQuery.trim() || isSearching}>
                  {isSearching ? 'Searching...' : 'Track'}
                </Button>
              </form>
              {error && (
                <p className="text-destructive text-sm mt-3">{error}</p>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          {searchedOrder && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              {/* Order Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Order {searchedOrder.orderNumber}
                    </CardTitle>
                    <Badge 
                      variant={searchedOrder.status === 'delivered' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {searchedOrder.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {format(searchedOrder.createdAt, 'MMMM dd, yyyy')}
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Status Timeline */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between relative">
                      {/* Progress Line */}
                      <div className="absolute top-4 left-0 right-0 h-1 bg-muted z-0">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ 
                            width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` 
                          }}
                        />
                      </div>
                      
                      {statusSteps.map((step, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        return (
                          <div 
                            key={step.key} 
                            className="flex flex-col items-center z-10"
                          >
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                isCompleted 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                            >
                              <step.icon className="h-4 w-4" />
                            </div>
                            <span className={`text-xs mt-2 text-center max-w-[60px] ${
                              isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Customer & Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer</h4>
                      <p className="font-medium">{maskName(searchedOrder.customerName)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Delivery Type</h4>
                      <Badge variant="outline" className="capitalize">
                        {searchedOrder.deliveryType}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Expected Date</h4>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(searchedOrder.deliveryDate, 'MMMM dd, yyyy')}
                        {searchedOrder.deliveryTime && ` at ${searchedOrder.deliveryTime}`}
                      </p>
                    </div>
                    {searchedOrder.address && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Delivery Location</h4>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {searchedOrder.address}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchedOrder.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                      >
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
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!searchedOrder && !error && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Track Your Order</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter your order number or the phone number used during checkout to see your order status and details.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default TrackOrder;