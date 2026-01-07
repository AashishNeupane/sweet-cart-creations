import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: number;
  isEggless?: boolean;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: number, isEggless?: boolean) => void;
  removeFromCart: (productId: string, selectedSize?: number) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: number) => void;
  updateEggless: (productId: string, isEggless: boolean, selectedSize?: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string, selectedSize?: number) => boolean;
  hasCakes: () => boolean;
  hasDecorations: () => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1, selectedSize, isEggless = false) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize &&
              item.isEggless === isEggless
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, quantity, selectedSize, isEggless }],
          };
        });
      },

      removeFromCart: (productId, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.selectedSize === selectedSize)
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedSize) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, selectedSize);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      updateEggless: (productId, isEggless, selectedSize) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedSize === selectedSize
              ? { ...item, isEggless }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemPrice =
            item.product.pricePerLb && item.selectedSize
              ? item.product.price * item.selectedSize
              : item.product.price;
          return total + itemPrice * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (productId, selectedSize) => {
        const { items } = get();
        return items.some(
          (item) =>
            item.product.id === productId && item.selectedSize === selectedSize
        );
      },

      hasCakes: () => {
        const { items } = get();
        return items.some((item) => item.product.category === 'cakes');
      },

      hasDecorations: () => {
        const { items } = get();
        return items.some((item) => item.product.category === 'decoration');
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
