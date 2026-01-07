import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 1);
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const currentPrice = product.pricePerLb 
    ? product.price * selectedSize 
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.category === 'cakes' && !showSizeSelector) {
      setShowSizeSelector(true);
      return;
    }
    
    addToCart(product, 1, product.category === 'cakes' ? selectedSize : undefined);
    setShowSizeSelector(false);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden card-hover border-0 shadow-soft bg-card">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.popular && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Popular
              </Badge>
            )}
            {!product.available && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          {product.available && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                className="h-10 w-10 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {product.category === 'cakes' ? product.subcategory : 'Decoration'}
          </p>

          {/* Name */}
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Size Selector for Cakes */}
          {showSizeSelector && product.category === 'cakes' && product.sizes && (
            <div 
              className="mb-3 p-3 bg-muted rounded-lg animate-scale-in"
              onClick={(e) => e.preventDefault()}
            >
              <p className="text-xs font-medium mb-2">Select Size (lb)</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size} lb
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                className="w-full mt-3"
                onClick={handleAddToCart}
              >
                Add to Cart - ₹{currentPrice}
              </Button>
            </div>
          )}

          {/* Price */}
          {!showSizeSelector && (
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.pricePerLb && (
                  <span className="text-sm text-muted-foreground">/lb</span>
                )}
              </div>
              
              {/* Occasion Icons */}
              <div className="flex gap-1">
                {product.occasion.includes('birthday') && <span className="text-sm">🎉</span>}
                {product.occasion.includes('anniversary') && <span className="text-sm">💕</span>}
                {product.occasion.includes('wedding') && <span className="text-sm">💒</span>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
