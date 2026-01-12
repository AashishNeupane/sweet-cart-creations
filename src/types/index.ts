// ============================================
// Shared TypeScript Types & Interfaces
// ============================================

// Product Types
export type ProductCategory = 'cakes' | 'decoration';
export type ProductOccasion = 'birthday' | 'anniversary' | 'wedding';
export type CakeSubcategory = 'vanilla' | 'blackforest' | 'chocolate' | 'whiteforest';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: CakeSubcategory;
  occasion: ProductOccasion[];
  price: number;
  pricePerLb?: boolean;
  image: string;
  galleryImages?: string[];
  description: string;
  tags: string[];
  available: boolean;
  popular?: boolean;
  sizes?: number[];
}

// Category & Filter Types
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CakeFlavor {
  id: string;
  name: string;
}

export interface Occasion {
  id: string;
  name: string;
  icon: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: number;
  isEggless?: boolean;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'pickup';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  size?: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  deliveryType: DeliveryType;
  deliveryDate: Date;
  deliveryTime?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Custom Order Types
export type CustomOrderStatus = 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';

export interface CustomOrder {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  cakeDetails: string;
  preferredDate?: Date;
  referenceImage?: string;
  status: CustomOrderStatus;
  adminNotes?: string;
  quotedPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Admin Types (extends Product for admin-specific fields)
export interface AdminProduct extends Product {
  sku?: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  customOrderRequests: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  subcategory?: CakeSubcategory;
  occasions?: ProductOccasion[];
  priceRange?: [number, number];
  sortBy?: 'popular' | 'newest' | 'price-low' | 'price-high';
}

export interface OrderFilters {
  dateRange?: { from: Date; to: Date };
  status?: OrderStatus | 'all';
}
