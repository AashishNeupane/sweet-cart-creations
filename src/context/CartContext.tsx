import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: number) => void;
  removeFromCart: (productId: string, selectedSize?: number) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string, selectedSize?: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bakery-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, selectedSize?: number) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedSize }];
    });

    toast({
      title: "Added to cart!",
      description: `${product.name}${selectedSize ? ` (${selectedSize} lb)` : ''} added to your cart.`,
    });
  };

  const removeFromCart = (productId: string, selectedSize?: number) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize)
    ));

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setItems(prev => prev.map(item => 
      item.product.id === productId && item.selectedSize === selectedSize
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.product.pricePerLb && item.selectedSize
        ? item.product.price * item.selectedSize
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string, selectedSize?: number) => {
    return items.some(
      item => item.product.id === productId && item.selectedSize === selectedSize
    );
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
