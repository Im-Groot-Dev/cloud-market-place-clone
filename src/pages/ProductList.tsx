
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../global';
import { getMockProducts } from '../mock-data';

const ProductList = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const pageTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}` 
    : searchQuery 
      ? `Search Results: "${searchQuery}"` 
      : "All Products";

  useEffect(() => {
    // In a real app, we would fetch from API
    // For now we're using mock data
    const allProducts = getMockProducts();
    
    let filteredProducts = allProducts;
    
    // Filter by category if provided
    if (category) {
      filteredProducts = allProducts.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = allProducts.filter(
        p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }
    
    setProducts(filteredProducts);
    setLoading(false);
  }, [category, searchQuery]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
        <div className="bg-white p-8 rounded-md shadow-sm text-center">
          <h2 className="text-xl mb-2">No products found</h2>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductList;
