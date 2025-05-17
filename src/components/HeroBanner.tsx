
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-r from-blue-800 to-blue-900 mb-8 overflow-hidden">
      {/* Banner Content */}
      <div className="container mx-auto h-full flex flex-col justify-center px-4 relative z-10">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Welcome to Amazon Clone
        </h1>
        <p className="text-white text-xl md:text-2xl mb-6 max-w-lg">
          Shop millions of products with fast, free delivery and exclusive deals!
        </p>
        <div className="flex space-x-4">
          <Button asChild className="btn-amazon-primary">
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/deals">Today's Deals</Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amazon-secondary opacity-10 skew-x-12 -translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Product displays - would be images in a real implementation */}
      <div className="absolute right-10 bottom-10 w-56 h-56 bg-white/10 rounded-lg backdrop-blur-sm hidden md:block"></div>
      <div className="absolute right-52 bottom-20 w-32 h-32 bg-white/5 rounded-lg backdrop-blur-sm hidden md:block"></div>
    </div>
  );
};

export default HeroBanner;
