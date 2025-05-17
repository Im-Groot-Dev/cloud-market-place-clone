
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../global';
import { useCart } from '../hooks';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Display only the first 50 characters of the description
  const truncatedDescription = product.description.length > 70 
    ? `${product.description.substring(0, 70)}...` 
    : product.description;
  
  // Format price with 2 decimal places and comma separators
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="product-card flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-sm md:text-base line-clamp-2 hover:text-blue-600">{product.title}</h3>
        </Link>
        
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <p className="text-lg font-bold mt-1">{formattedPrice}</p>
        
        {product.primeEligible && (
          <div className="flex items-center mt-1">
            <span className="text-xs text-blue-600">Prime</span>
            <span className="text-xs text-gray-600 ml-1">Free Delivery</span>
          </div>
        )}
        
        <p className="text-gray-500 text-sm mt-2 mb-4 flex-1">
          {truncatedDescription}
        </p>
        
        <Button 
          onClick={() => addToCart(product)}
          className="btn-amazon-primary mt-auto"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
