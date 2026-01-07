import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpsellStore } from '@/stores/useUpsellStore';
import { useCartStore } from '@/stores/useCartStore';
import { products } from '@/data/products';

const decorationSuggestions = [
  { name: 'Balloons', id: 'birthday-balloon-set', icon: '🎈' },
  { name: 'Candles', id: 'birthday-banner-candles', icon: '🕯️' },
  { name: 'Spray', id: 'anniversary-banner', icon: '✨' },
  { name: 'Birthday Cap', id: 'birthday-banner-candles', icon: '🎩' },
];

const cakeSuggestions = [
  { name: 'Vanilla Cake', id: 'vanilla-cake', icon: '🍰' },
  { name: 'Black Forest', id: 'blackforest-cake', icon: '🍫' },
  { name: 'Chocolate Cake', id: 'chocolate-cake', icon: '🎂' },
  { name: 'White Forest', id: 'whiteforest-cake', icon: '🧁' },
];

const UpsellPopup = () => {
  const navigate = useNavigate();
  const { isOpen, upsellType, closeUpsell } = useUpsellStore();
  const { addToCart } = useCartStore();

  const suggestions = upsellType === 'decorations' ? decorationSuggestions : cakeSuggestions;
  const title = upsellType === 'decorations' 
    ? 'Add Decoration Items?' 
    : 'Add a Cake?';
  const subtitle = upsellType === 'decorations'
    ? 'Make your celebration complete with these decoration items!'
    : 'Complete your celebration with a delicious cake!';

  const handleAddItems = (selectedIds: string[]) => {
    selectedIds.forEach((id) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        const size = product.category === 'cakes' ? 1 : undefined;
        addToCart(product, 1, size);
      }
    });
    closeUpsell();
    navigate('/checkout');
  };

  const handleSkip = () => {
    closeUpsell();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeUpsell();
    navigate('/shop');
  };

  const handleQuickAdd = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const size = product.category === 'cakes' ? 1 : undefined;
      addToCart(product, 1, size);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeUpsell}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">
            {upsellType === 'decorations' ? '🎈' : '🎂'} {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-muted-foreground mb-6">{subtitle}</p>

        {/* Suggestion Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {suggestions.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleQuickAdd(item.id)}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                  {product && (
                    <p className="text-xs text-primary font-semibold">
                      ₹{product.price}{product.pricePerLb ? '/lb' : ''}
                    </p>
                  )}
                </div>
                <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSkip}
            className="w-full gradient-warm text-primary-foreground"
            size="lg"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Skip & Checkout
          </Button>

          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="w-full"
            size="lg"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellPopup;
