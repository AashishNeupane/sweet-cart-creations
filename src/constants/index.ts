// ============================================
// Application Constants
// ============================================

import type { Category, CakeFlavor, Occasion } from '@/types';

// WhatsApp Configuration
export const WHATSAPP_NUMBER = '9779851234567';

// Categories
export const CATEGORIES: Category[] = [
  { id: 'cakes', name: 'Cakes', icon: '🎂' },
  { id: 'decoration', name: 'Decorations', icon: '🎈' },
];

// Cake Flavors
export const CAKE_FLAVORS: CakeFlavor[] = [
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'blackforest', name: 'Black Forest' },
  { id: 'chocolate', name: 'Chocolate' },
  { id: 'whiteforest', name: 'White Forest' },
];

// Occasions
export const OCCASIONS: Occasion[] = [
  { id: 'birthday', name: 'Birthday', icon: '🎉' },
  { id: 'anniversary', name: 'Anniversary', icon: '💕' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
];

// Price Range
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 2000,
  STEP: 50,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  POPULAR_PRODUCTS_LIMIT: 4,
  RELATED_PRODUCTS_LIMIT: 4,
};

// Order Status Labels
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Custom Order Status Labels
export const CUSTOM_ORDER_STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CUSTOM_ORDERS: '/custom-orders',
  DASHBOARD: '/dashboard',
};

// Query Keys for React Query
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  POPULAR_PRODUCTS: 'popular-products',
  ORDERS: 'orders',
  ORDER: 'order',
  CUSTOM_ORDERS: 'custom-orders',
  DASHBOARD_STATS: 'dashboard-stats',
} as const;
