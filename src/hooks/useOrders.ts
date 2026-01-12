// ============================================
// Order React Query Hooks
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { 
  getOrders, 
  getOrderById, 
  getOrderByNumber,
  createOrder,
  updateOrderStatus,
  getCustomOrders,
  getCustomOrderById,
  createCustomOrder,
  updateCustomOrder,
  getDashboardStats
} from '@/api/services/order.api';
import type { Order, CustomOrder, OrderFilters } from '@/types';

/**
 * Hook to fetch all orders with optional filters
 */
export const useOrders = (filters?: OrderFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, filters],
    queryFn: () => getOrders(filters),
  });
};

/**
 * Hook to fetch a single order by ID
 */
export const useOrder = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });
};

/**
 * Hook to fetch order by order number (for tracking)
 */
export const useOrderByNumber = (orderNumber: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, 'number', orderNumber],
    queryFn: () => getOrderByNumber(orderNumber!),
    enabled: !!orderNumber,
  });
};

/**
 * Hook to create a new order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

/**
 * Hook to update order status
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) => 
      updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER, variables.id] });
    },
  });
};

/**
 * Hook to fetch all custom orders
 */
export const useCustomOrders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOM_ORDERS],
    queryFn: getCustomOrders,
  });
};

/**
 * Hook to fetch a single custom order
 */
export const useCustomOrder = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CUSTOM_ORDERS, id],
    queryFn: () => getCustomOrderById(id!),
    enabled: !!id,
  });
};

/**
 * Hook to create a custom order
 */
export const useCreateCustomOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCustomOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CUSTOM_ORDERS] });
    },
  });
};

/**
 * Hook to update a custom order
 */
export const useUpdateCustomOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomOrder> }) => 
      updateCustomOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CUSTOM_ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CUSTOM_ORDERS, variables.id] });
    },
  });
};

/**
 * Hook to fetch dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_STATS],
    queryFn: getDashboardStats,
  });
};
