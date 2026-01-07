import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[1] || product?.sizes?.[0] || 1
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">😕</p>
            <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = product.pricePerLb 
    ? product.price * selectedSize 
    : product.price;

  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, product.category === 'cakes' ? selectedSize : undefined);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const alreadyInCart = isInCart(product.id, product.category === 'cakes' ? selectedSize : undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
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
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

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

              {/* Name */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

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

              {/* Size Selector (for cakes) */}
              {product.category === 'cakes' && product.sizes && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Select Size (pounds)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 rounded-lg border-2 transition-all font-medium ${
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
                  <span className="font-display text-3xl font-bold text-primary">
                    ₹{totalPrice}
                  </span>
                  {product.pricePerLb && (
                    <span className="text-muted-foreground">
                      (₹{product.price}/lb × {selectedSize} lb × {quantity})
                    </span>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg rounded-xl gradient-warm text-primary-foreground"
                  onClick={handleAddToCart}
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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container-custom section-padding !pt-0">
            <h2 className="font-display text-2xl font-bold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
