// ============================================
// Product React Query Hooks
// ============================================

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS, PAGINATION } from '@/constants';
import { 
  getProducts, 
  getProductById, 
  getPopularProducts, 
  getRelatedProducts 
} from '@/api/services/product.api';
import type { ProductFilters } from '@/types';

/**
 * Hook to fetch all products with optional filters
 */
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, filters],
    queryFn: () => getProducts(filters),
  });
};

/**
 * Hook to fetch a single product by ID
 */
export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
};

/**
 * Hook to fetch popular products
 */
export const usePopularProducts = (limit: number = PAGINATION.POPULAR_PRODUCTS_LIMIT) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POPULAR_PRODUCTS, limit],
    queryFn: () => getPopularProducts(limit),
  });
};

/**
 * Hook to fetch related products
 */
export const useRelatedProducts = (
  productId: string | undefined, 
  category: string | undefined,
  limit: number = PAGINATION.RELATED_PRODUCTS_LIMIT
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'related', productId, category],
    queryFn: () => getRelatedProducts(productId!, category!, limit),
    enabled: !!productId && !!category,
  });
};
