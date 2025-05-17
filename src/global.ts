
// Type definitions for our application

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  primeEligible: boolean;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

// Service URLs - these would be configured based on your deployment environment
export const API_BASE_URL = 'http://localhost:3001';
export const API_ENDPOINTS = {
  products: '/products',
  product: (id: string) => `/products/${id}`,
  categories: '/categories',
  category: (category: string) => `/products/category/${category}`,
  search: (query: string) => `/products/search?q=${query}`,
  cart: '/cart',
  checkout: '/checkout',
};
