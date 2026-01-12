// ============================================
// Order API Service
// ============================================

import type { Order, CustomOrder, DashboardStats, OrderFilters } from '@/types';
import { MOCK_ORDERS, MOCK_CUSTOM_ORDERS, MOCK_DASHBOARD_STATS } from '@/constants/mock-data';
import axiosInstance from '../axios';

// Simulate API delay for development
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all orders
 * @param filters - Optional filters for orders
 */
export const getOrders = async (filters?: OrderFilters): Promise<Order[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/orders', { params: filters });
  // return response.data;

  await simulateDelay();
  
  let result = [...MOCK_ORDERS];

  if (filters) {
    // Date range filter
    if (filters.dateRange) {
      result = result.filter(order =>
        order.createdAt >= filters.dateRange!.from && 
        order.createdAt <= filters.dateRange!.to
      );
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      result = result.filter(order => order.status === filters.status);
    }
  }

  return result;
};

/**
 * Fetch a single order by ID
 * @param id - Order ID
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/orders/${id}`);
  // return response.data;

  await simulateDelay();
  return MOCK_ORDERS.find(o => o.id === id) || null;
};

/**
 * Fetch order by order number
 * @param orderNumber - Order number
 */
export const getOrderByNumber = async (orderNumber: string): Promise<Order | null> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/orders/number/${orderNumber}`);
  // return response.data;

  await simulateDelay();
  return MOCK_ORDERS.find(o => o.orderNumber === orderNumber) || null;
};

/**
 * Create a new order
 * @param orderData - Order data
 */
export const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/orders', orderData);
  // return response.data;

  await simulateDelay(500);
  
  const newOrder: Order = {
    ...orderData,
    id: String(MOCK_ORDERS.length + 1),
    orderNumber: `ORD-2024-${String(MOCK_ORDERS.length + 1).padStart(3, '0')}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newOrder;
};

/**
 * Update order status
 * @param id - Order ID
 * @param status - New status
 */
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.patch(`/orders/${id}/status`, { status });
  // return response.data;

  await simulateDelay();
  
  const order = MOCK_ORDERS.find(o => o.id === id);
  if (!order) throw new Error('Order not found');
  
  return { ...order, status, updatedAt: new Date() };
};

/**
 * Fetch all custom orders
 */
export const getCustomOrders = async (): Promise<CustomOrder[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/custom-orders');
  // return response.data;

  await simulateDelay();
  return [...MOCK_CUSTOM_ORDERS];
};

/**
 * Fetch a single custom order by ID
 * @param id - Custom order ID
 */
export const getCustomOrderById = async (id: string): Promise<CustomOrder | null> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/custom-orders/${id}`);
  // return response.data;

  await simulateDelay();
  return MOCK_CUSTOM_ORDERS.find(o => o.id === id) || null;
};

/**
 * Create a new custom order request
 * @param orderData - Custom order data
 */
export const createCustomOrder = async (orderData: Omit<CustomOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<CustomOrder> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/custom-orders', orderData);
  // return response.data;

  await simulateDelay(500);
  
  const newOrder: CustomOrder = {
    ...orderData,
    id: String(MOCK_CUSTOM_ORDERS.length + 1),
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newOrder;
};

/**
 * Update custom order
 * @param id - Custom order ID
 * @param data - Update data
 */
export const updateCustomOrder = async (id: string, data: Partial<CustomOrder>): Promise<CustomOrder> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.patch(`/custom-orders/${id}`, data);
  // return response.data;

  await simulateDelay();
  
  const order = MOCK_CUSTOM_ORDERS.find(o => o.id === id);
  if (!order) throw new Error('Custom order not found');
  
  return { ...order, ...data, updatedAt: new Date() };
};

/**
 * Fetch dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/dashboard/stats');
  // return response.data;

  await simulateDelay();
  return { ...MOCK_DASHBOARD_STATS };
};

// Export axios instance for custom requests
export { axiosInstance };
