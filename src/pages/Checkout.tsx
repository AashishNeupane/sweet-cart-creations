import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_NUMBER } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number is too long'),
  deliveryOption: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  deliveryTime: z.string().min(1, 'Please select a delivery time'),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    deliveryOption: 'delivery',
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checkout
            </p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `🎂 *Sweet Delights Bakery - New Order*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Delivery: ${formData.deliveryOption === 'delivery' ? 'Home Delivery' : 'Pickup'}\n`;
    
    if (formData.deliveryOption === 'delivery' && formData.address) {
      message += `Address: ${formData.address}\n`;
    }
    
    message += `Date: ${formData.deliveryDate}\n`;
    message += `Time: ${formData.deliveryTime}\n\n`;

    message += `*Order Items:*\n`;
    message += `${'─'.repeat(20)}\n`;

    items.forEach(item => {
      const itemPrice = item.product.pricePerLb && item.selectedSize
        ? item.product.price * item.selectedSize
        : item.product.price;
      const totalItemPrice = itemPrice * item.quantity;

      message += `• ${item.product.name}`;
      if (item.selectedSize) {
        message += ` (${item.selectedSize} lb)`;
      }
      message += `\n  Qty: ${item.quantity} × ₹${itemPrice} = ₹${totalItemPrice}\n`;
    });

    message += `${'─'.repeat(20)}\n`;
    message += `*Total: ₹${getCartTotal()}*\n\n`;

    if (formData.notes) {
      message += `*Special Notes:*\n${formData.notes}\n`;
    }

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with required address if delivery is selected
    const dataToValidate = {
      ...formData,
      address: formData.deliveryOption === 'delivery' 
        ? formData.address 
        : undefined,
    };

    try {
      // Basic validation
      const result = checkoutSchema.safeParse(dataToValidate);
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: 'Please check your details',
          description: 'Some required fields are missing or invalid.',
          variant: 'destructive',
        });
        return;
      }

      // Additional address validation for delivery
      if (formData.deliveryOption === 'delivery' && (!formData.address || formData.address.trim().length < 10)) {
        setErrors(prev => ({ ...prev, address: 'Please enter a valid address (at least 10 characters)' }));
        return;
      }

      // Generate WhatsApp link and open
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Clear cart and redirect
      clearCart();
      toast({
        title: 'Order Sent! 🎉',
        description: 'Your order has been sent via WhatsApp. We\'ll confirm shortly!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container-custom section-padding">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/cart" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </Button>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customer Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Options */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-6">Delivery Options</h2>
                    
                    <RadioGroup
                      value={formData.deliveryOption}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryOption: value }))}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="cursor-pointer flex-1">
                          <span className="font-medium">Home Delivery</span>
                          <p className="text-sm text-muted-foreground">We'll deliver to your address</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="cursor-pointer flex-1">
                          <span className="font-medium">Store Pickup</span>
                          <p className="text-sm text-muted-foreground">Pick up from our store</p>
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.deliveryOption === 'delivery' && (
                      <div className="mt-6 space-y-2 animate-fade-in">
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your full delivery address"
                          rows={3}
                          className={errors.address ? 'border-destructive' : ''}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Date & Time */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-6">Preferred Date & Time</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date *
                        </Label>
                        <Input
                          id="deliveryDate"
                          name="deliveryDate"
                          type="date"
                          min={today}
                          value={formData.deliveryDate}
                          onChange={handleChange}
                          className={errors.deliveryDate ? 'border-destructive' : ''}
                        />
                        {errors.deliveryDate && (
                          <p className="text-sm text-destructive">{errors.deliveryDate}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deliveryTime" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Time *
                        </Label>
                        <Input
                          id="deliveryTime"
                          name="deliveryTime"
                          type="time"
                          value={formData.deliveryTime}
                          onChange={handleChange}
                          className={errors.deliveryTime ? 'border-destructive' : ''}
                        />
                        {errors.deliveryTime && (
                          <p className="text-sm text-destructive">{errors.deliveryTime}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-6">Special Instructions</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special requests? E.g., 'Happy Birthday' message, eggless preference, etc."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6">
                      {items.map(item => {
                        const itemPrice = item.product.pricePerLb && item.selectedSize
                          ? item.product.price * item.selectedSize
                          : item.product.price;

                        return (
                          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.selectedSize && `${item.selectedSize} lb • `}
                                Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-medium text-primary">
                                ₹{itemPrice * item.quantity}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-baseline mb-6">
                      <span className="font-display text-lg font-semibold">Total</span>
                      <span className="font-display text-2xl font-bold text-primary">
                        ₹{getCartTotal()}
                      </span>
                    </div>

                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full gradient-warm text-primary-foreground rounded-xl h-14 text-lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Order via WhatsApp
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      You'll be redirected to WhatsApp to confirm your order
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
