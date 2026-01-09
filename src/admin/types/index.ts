// Admin Types

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';

export interface AdminProduct {
  id: string;
  name: string;
  category: 'cakes' | 'decoration';
  subcategory?: string;
  occasion: string[];
  price: number;
  pricePerLb?: boolean;
  image: string;
  galleryImages?: string[];
  description: string;
  tags: string[];
  available: boolean;
  popular?: boolean;
  sizes?: number[];
  sku?: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

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
  deliveryType: 'delivery' | 'pickup';
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

export interface CustomOrder {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  cakeDetails: string;
  preferredDate?: Date;
  referenceImage?: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
  adminNotes?: string;
  quotedPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  customOrderRequests: number;
}
