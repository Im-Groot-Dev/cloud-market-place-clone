
import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../global';
import { getMockProducts } from '../mock-data';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [electronicsProducts, setElectronicsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch from API
    // For now we're using mock data
    const allProducts = getMockProducts();
    
    // Filter products for different sections
    setFeaturedProducts(allProducts.filter(p => p.rating >= 4.5).slice(0, 5));
    setDealsProducts(allProducts.filter(p => p.primeEligible).slice(0, 5));
    setElectronicsProducts(allProducts.filter(p => p.category === 'electronics').slice(0, 5));
    
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />
      
      <div className="container mx-auto p-4">
        <ProductGrid products={featuredProducts} title="Featured Products" />
        <ProductGrid products={dealsProducts} title="Today's Deals" />
        <ProductGrid products={electronicsProducts} title="Top Electronics" />
      </div>
    </div>
  );
};

export default Index;
