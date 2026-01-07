import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import UpsellPopup from '@/components/UpsellPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/useCartStore';
import { useUpsellStore } from '@/stores/useUpsellStore';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart, hasCakes, hasDecorations } = useCartStore();
  const { openUpsell } = useUpsellStore();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    const hasCakeItems = hasCakes();
    const hasDecorationItems = hasDecorations();

    // Show upsell popup based on cart contents
    if (hasCakeItems && !hasDecorationItems) {
      openUpsell('decorations');
    } else if (hasDecorationItems && !hasCakeItems) {
      openUpsell('cakes');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background pb-16 md:pb-0">
          <div className="text-center px-4">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items yet. Let's find something delicious!
            </p>
            <Button asChild size="lg" className="gradient-warm text-primary-foreground rounded-full px-8">
              <Link to="/">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background pb-20 md:pb-0">
        <div className="container-custom section-padding">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemPrice = item.product.pricePerLb && item.selectedSize
                  ? item.product.price * item.selectedSize
                  : item.product.price;
                const totalItemPrice = itemPrice * item.quantity;

                return (
                  <Card key={`${item.product.id}-${item.selectedSize}-${item.isEggless}`} className="overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-4 md:gap-6">
                        {/* Image */}
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-cream"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                            <div>
                              <Link 
                                to={`/product/${item.product.id}`}
                                className="font-display text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {item.product.category === 'cakes' ? item.product.subcategory : 'Decoration'}
                                {item.selectedSize && ` • ${item.selectedSize} lb`}
                              </p>
                              {/* Eggless badge */}
                              {item.isEggless && (
                                <Badge variant="secondary" className="mt-1">
                                  🥚 Eggless
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-lg w-fit">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => updateQuantity(
                                  item.product.id, 
                                  item.quantity - 1, 
                                  item.selectedSize
                                )}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={() => updateQuantity(
                                  item.product.id, 
                                  item.quantity + 1, 
                                  item.selectedSize
                                )}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-display text-xl font-bold text-primary">
                                Rs {totalItemPrice}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-muted-foreground">
                                  Rs {itemPrice} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Continue Shopping */}
              <Button asChild variant="ghost" className="mt-4">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">Rs {getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium text-green-600">Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      Rs {getCartTotal()}
                    </span>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full gradient-warm text-primary-foreground rounded-xl h-12"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Order via WhatsApp for quick confirmation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <UpsellPopup />
    </div>
  );
};

export default Cart;
