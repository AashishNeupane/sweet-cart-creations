// ============================================
// Product API Service
// ============================================

import type { Product, ProductFilters } from '@/types';
import { MOCK_PRODUCTS } from '@/constants/mock-data';
import axiosInstance from '../axios';

// Simulate API delay for development
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all products
 * @param filters - Optional filters for products
 */
export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/products', { params: filters });
  // return response.data;

  await simulateDelay();
  
  let result = [...MOCK_PRODUCTS];

  if (filters) {
    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Subcategory filter
    if (filters.subcategory) {
      result = result.filter(p => p.subcategory === filters.subcategory);
    }

    // Occasion filter
    if (filters.occasions && filters.occasions.length > 0) {
      result = result.filter(p => 
        p.occasion.some(o => filters.occasions!.includes(o))
      );
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(p => 
        p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'popular':
          result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
          break;
        case 'newest':
          // Assuming order in array is newest first
          break;
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
      }
    }
  }

  return result;
};

/**
 * Fetch a single product by ID
 * @param id - Product ID
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/products/${id}`);
  // return response.data;

  await simulateDelay();
  return MOCK_PRODUCTS.find(p => p.id === id) || null;
};

/**
 * Fetch popular products
 * @param limit - Number of products to fetch
 */
export const getPopularProducts = async (limit: number = 4): Promise<Product[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/products/popular', { params: { limit } });
  // return response.data;

  await simulateDelay();
  return MOCK_PRODUCTS.filter(p => p.popular).slice(0, limit);
};

/**
 * Fetch related products
 * @param productId - Current product ID
 * @param category - Product category
 * @param limit - Number of products to fetch
 */
export const getRelatedProducts = async (
  productId: string, 
  category: string, 
  limit: number = 4
): Promise<Product[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/products/${productId}/related`, { params: { limit } });
  // return response.data;

  await simulateDelay();
  // Show opposite category items as related
  return MOCK_PRODUCTS
    .filter(p => p.id !== productId && p.category !== category)
    .slice(0, limit);
};

/**
 * Fetch products by category
 * @param category - Product category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/products/category/${category}`);
  // return response.data;

  await simulateDelay();
  return MOCK_PRODUCTS.filter(p => p.category === category);
};

/**
 * Fetch products by occasion
 * @param occasion - Occasion type
 */
export const getProductsByOccasion = async (occasion: string): Promise<Product[]> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get(`/products/occasion/${occasion}`);
  // return response.data;

  await simulateDelay();
  return MOCK_PRODUCTS.filter(p => p.occasion.includes(occasion as any));
};

// Export axios instance for custom requests
export { axiosInstance };
