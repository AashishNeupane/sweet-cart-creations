import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ShareButton from '@/components/ShareButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';
import { useToast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCartStore();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || 1
  );
  const [quantity, setQuantity] = useState(1);
  const [isEggless, setIsEggless] = useState(false);

  // Generate consistent random rating for each product based on id
  const rating = useMemo(() => {
    if (!product) return '4.5';
    const seed = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (4 + (seed % 10) / 10).toFixed(1);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pb-16 md:pb-0">
          <div className="text-center">
            <p className="text-6xl mb-4">😕</p>
            <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const currentPrice = product.pricePerLb 
    ? product.price * selectedSize 
    : product.price;

  const totalPrice = currentPrice * quantity;

  const handleSizeChange = (increment: number) => {
    const newSize = selectedSize + increment;
    if (product.sizes && newSize >= 1 && newSize <= Math.max(...product.sizes)) {
      setSelectedSize(newSize);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, product.category === 'cakes' ? selectedSize : undefined, isEggless);
    toast({
      title: 'Added to Cart! 🎉',
      description: `${product.name}${product.category === 'cakes' ? ` (${selectedSize} lb)` : ''} added to your cart.`,
    });
  };

  // For decoration items, add with quantity 1 directly
  const handleQuickAddToCart = () => {
    addToCart(product, 1, product.category === 'cakes' ? 1 : undefined, false);
    toast({
      title: 'Added to Cart! 🎉',
      description: `${product.name} added to your cart.`,
    });
  };

  // Show decoration items in related products for cakes and vice versa
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category !== product.category)
    .slice(0, 4);

  const alreadyInCart = isInCart(product.id, product.category === 'cakes' ? selectedSize : undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background pb-20 md:pb-0">
        {/* Breadcrumb */}
        <div className="bg-cream">
          <div className="container-custom px-4 py-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>

        {/* Product Section */}
        <section className="container-custom section-padding !py-8 md:!py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <ProductGallery
              mainImage={product.image}
              galleryImages={product.galleryImages}
              productName={product.name}
            />

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="uppercase text-xs">
                  {product.category === 'cakes' ? product.subcategory : 'Decoration'}
                </Badge>
                {product.popular && (
                  <Badge className="bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
                {!product.available && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              {/* Name & Share */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>
                <ShareButton 
                  productName={product.name} 
                  productUrl={`/product/${product.id}`}
                  variant="button"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${
                        star <= Math.floor(Number(rating)) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">{rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Occasions */}
              <div className="flex items-center gap-4 py-4 border-y border-border">
                <span className="text-sm font-medium">Perfect for:</span>
                <div className="flex gap-3">
                  {product.occasion.map(occ => (
                    <Link
                      key={occ}
                      to={`/shop?occasion=${occ}`}
                      className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                    >
                      {occ === 'birthday' && '🎉'}
                      {occ === 'anniversary' && '💕'}
                      {occ === 'wedding' && '💒'}
                      <span className="capitalize">{occ}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Eggless Option (for cakes only) */}
              {product.category === 'cakes' && (
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥚</span>
                    <div>
                      <Label htmlFor="eggless" className="font-medium">Eggless Option</Label>
                      <p className="text-sm text-muted-foreground">Make it 100% vegetarian</p>
                    </div>
                  </div>
                  <Switch
                    id="eggless"
                    checked={isEggless}
                    onCheckedChange={setIsEggless}
                  />
                </div>
              )}

              {/* Size Selector (for cakes) with +/- buttons */}
              {product.category === 'cakes' && product.sizes && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Select Size (pounds)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg bg-background">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSizeChange(-1)}
                        disabled={selectedSize <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-16 text-center font-semibold text-lg">{selectedSize} lb</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSizeChange(1)}
                        disabled={selectedSize >= Math.max(...product.sizes!)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Rs {product.price}/lb
                    </span>
                  </div>
                  {/* Size quick select */}
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        {size} lb
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium text-muted-foreground">Rs</span>
                  <span className="font-display text-3xl font-bold text-primary">
                    {totalPrice}
                  </span>
                  {product.pricePerLb && (
                    <span className="text-muted-foreground">
                      (Rs {product.price}/lb × {selectedSize} lb × {quantity})
                    </span>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg rounded-xl gradient-warm text-primary-foreground"
                  onClick={product.category === 'decoration' ? handleQuickAddToCart : handleAddToCart}
                  disabled={!product.available}
                >
                  {alreadyInCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Add More to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products - Show opposite category */}
        {relatedProducts.length > 0 && (
          <section className="container-custom section-padding !pt-0">
            <h2 className="font-display text-2xl font-bold mb-8">
              {product.category === 'cakes' ? 'Complete Your Party with Decorations' : 'Add a Delicious Cake'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default ProductDetails;
